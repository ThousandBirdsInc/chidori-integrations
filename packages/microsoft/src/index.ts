import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface MicrosoftGraphAuthArgs {
  accessToken?: SecretInput;
  baseUrl?: string;
}

export interface MicrosoftGraphRequestArgs extends MicrosoftGraphAuthArgs {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  query?: JsonObject;
  body?: JsonObject;
}

export interface MicrosoftGraphMailboxArgs extends MicrosoftGraphAuthArgs {
  userId?: string;
}

export interface MicrosoftGraphListMessagesArgs extends MicrosoftGraphMailboxArgs {
  folderId?: string;
  top?: number;
  skip?: number;
  filter?: string;
  search?: string;
  select?: string[];
  orderBy?: string[];
}

export interface MicrosoftGraphSendMailArgs extends MicrosoftGraphMailboxArgs {
  message: JsonObject;
  saveToSentItems?: boolean;
}

export interface MicrosoftGraphListCalendarEventsArgs extends MicrosoftGraphMailboxArgs {
  calendarId?: string;
  startDateTime?: string;
  endDateTime?: string;
  top?: number;
  filter?: string;
  select?: string[];
  orderBy?: string[];
}

export interface MicrosoftGraphCreateCalendarEventArgs extends MicrosoftGraphMailboxArgs {
  calendarId?: string;
  event: JsonObject;
}

export interface MicrosoftGraphListDriveChildrenArgs extends MicrosoftGraphAuthArgs {
  userId?: string;
  driveId?: string;
  itemId?: string;
  top?: number;
  select?: string[];
}

function graphBaseUrl(args: MicrosoftGraphAuthArgs): string {
  return (args.baseUrl ?? "https://graph.microsoft.com/v1.0").replace(/\/+$/, "");
}

async function graphHeaders(args: MicrosoftGraphAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.accessToken, chidori, "Microsoft Graph access token");
  return jsonHeaders(bearerAuth(token));
}

function ownerPath(args: { userId?: string }): string {
  return args.userId ? `/users/${encodeURIComponent(args.userId)}` : "/me";
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

function queryObject(input: JsonObject | undefined): Record<string, string | number | boolean | undefined> | undefined {
  if (!input) {
    return undefined;
  }
  const output: Record<string, string | number | boolean | undefined> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      output[key] = value;
    }
  }
  return output;
}

async function graphRequest<T extends Json>(
  args: MicrosoftGraphAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await graphHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  const url = path.startsWith("http") ? path : `${graphBaseUrl(args)}${path.startsWith("/") ? path : `/${path}`}`;
  return requestJson<T>(chidori, withQuery(url, options.query), requestOptions);
}

export const microsoftGraphRequestTool = defineTool<MicrosoftGraphRequestArgs, Json>(
  {
    name: "microsoft_graph_request",
    description: "Run a Microsoft Graph REST request with caller-provided path, query, and JSON body.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        method: { type: "string", enum: ["GET", "POST", "PATCH", "PUT", "DELETE"] },
        path: { type: "string" },
        query: { type: "object", additionalProperties: true },
        body: { type: "object", additionalProperties: true },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => {
    const options: {
      method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
      query?: Record<string, string | number | boolean | undefined>;
      body?: JsonObject;
    } = {};
    if (args.method) {
      options.method = args.method;
    }
    const query = queryObject(args.query);
    if (query) {
      options.query = query;
    }
    if (args.body) {
      options.body = args.body;
    }
    return graphRequest<Json>(args, chidori, args.path, options);
  },
);

export const microsoftGraphListMessagesTool = defineTool<MicrosoftGraphListMessagesArgs, JsonObject>(
  {
    name: "microsoft_graph_messages_list",
    description: "List Outlook messages from Microsoft Graph.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        userId: { type: "string" },
        folderId: { type: "string" },
        top: { type: "integer" },
        skip: { type: "integer" },
        filter: { type: "string" },
        search: { type: "string" },
        select: { type: "array", items: { type: "string" } },
        orderBy: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    const path = args.folderId
      ? `${ownerPath(args)}/mailFolders/${encodeURIComponent(args.folderId)}/messages`
      : `${ownerPath(args)}/messages`;
    return graphRequest<JsonObject>(args, chidori, path, {
      query: {
        "$top": args.top,
        "$skip": args.skip,
        "$filter": args.filter,
        "$search": args.search,
        "$select": csv(args.select),
        "$orderby": csv(args.orderBy),
      },
    });
  },
);

export const microsoftGraphSendMailTool = defineTool<MicrosoftGraphSendMailArgs, Json>(
  {
    name: "microsoft_graph_mail_send",
    description: "Send mail through Microsoft Graph using a caller-provided message object.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        userId: { type: "string" },
        message: { type: "object", additionalProperties: true },
        saveToSentItems: { type: "boolean" },
      },
      required: ["message"],
    },
  },
  async (args, chidori) => {
    return graphRequest<Json>(args, chidori, `${ownerPath(args)}/sendMail`, {
      method: "POST",
      body: compactObject({
        message: args.message,
        saveToSentItems: args.saveToSentItems,
      }) as JsonObject,
    });
  },
);

export const microsoftGraphListCalendarEventsTool = defineTool<MicrosoftGraphListCalendarEventsArgs, JsonObject>(
  {
    name: "microsoft_graph_calendar_events_list",
    description: "List Microsoft Graph calendar events or calendarView items.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        userId: { type: "string" },
        calendarId: { type: "string" },
        startDateTime: { type: "string" },
        endDateTime: { type: "string" },
        top: { type: "integer" },
        filter: { type: "string" },
        select: { type: "array", items: { type: "string" } },
        orderBy: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    const calendarPath = args.calendarId ? `/calendars/${encodeURIComponent(args.calendarId)}` : "/calendar";
    const path = args.startDateTime && args.endDateTime
      ? `${ownerPath(args)}${calendarPath}/calendarView`
      : `${ownerPath(args)}${calendarPath}/events`;
    return graphRequest<JsonObject>(args, chidori, path, {
      query: {
        startDateTime: args.startDateTime,
        endDateTime: args.endDateTime,
        "$top": args.top,
        "$filter": args.filter,
        "$select": csv(args.select),
        "$orderby": csv(args.orderBy),
      },
    });
  },
);

export const microsoftGraphCreateCalendarEventTool = defineTool<MicrosoftGraphCreateCalendarEventArgs, JsonObject>(
  {
    name: "microsoft_graph_calendar_event_create",
    description: "Create a Microsoft Graph calendar event.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        userId: { type: "string" },
        calendarId: { type: "string" },
        event: { type: "object", additionalProperties: true },
      },
      required: ["event"],
    },
  },
  async (args, chidori) => {
    const calendarPath = args.calendarId ? `/calendars/${encodeURIComponent(args.calendarId)}` : "/calendar";
    return graphRequest<JsonObject>(args, chidori, `${ownerPath(args)}${calendarPath}/events`, {
      method: "POST",
      body: args.event,
    });
  },
);

export const microsoftGraphListDriveChildrenTool = defineTool<MicrosoftGraphListDriveChildrenArgs, JsonObject>(
  {
    name: "microsoft_graph_drive_children_list",
    description: "List Microsoft Graph OneDrive or SharePoint drive item children.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Microsoft Graph access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://graph.microsoft.com/v1.0" },
        userId: { type: "string" },
        driveId: { type: "string" },
        itemId: { type: "string" },
        top: { type: "integer" },
        select: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    const driveRoot = args.driveId
      ? `/drives/${encodeURIComponent(args.driveId)}`
      : `${ownerPath(args)}/drive`;
    const itemPath = args.itemId ? `/items/${encodeURIComponent(args.itemId)}` : "/root";
    return graphRequest<JsonObject>(args, chidori, `${driveRoot}${itemPath}/children`, {
      query: {
        "$top": args.top,
        "$select": csv(args.select),
      },
    });
  },
);

export const microsoftTools = {
  graphRequest: microsoftGraphRequestTool,
  listMessages: microsoftGraphListMessagesTool,
  sendMail: microsoftGraphSendMailTool,
  listCalendarEvents: microsoftGraphListCalendarEventsTool,
  createCalendarEvent: microsoftGraphCreateCalendarEventTool,
  listDriveChildren: microsoftGraphListDriveChildrenTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getMicrosoftEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "MICROSOFT_GRAPH_ACCESS_TOKEN", description: "Microsoft Graph access token." },
  ];
}

export const microsoftIntegrationSpec = {
  environmentVariables: getMicrosoftEnvironmentVariables,
} satisfies IntegrationSpec;
