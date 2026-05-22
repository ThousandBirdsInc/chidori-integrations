import {
  bearerAuth,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ZendeskAuthArgs {
  subdomain?: string;
  baseUrl?: string;
  email?: string;
  apiToken?: SecretInput;
  oauthToken?: SecretInput;
}

export interface ZendeskPageArgs extends ZendeskAuthArgs {
  page?: number;
  perPage?: number;
}

export interface ZendeskSearchArgs extends ZendeskPageArgs {
  query: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ZendeskListTicketsArgs extends ZendeskPageArgs {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ZendeskTicketIdArgs extends ZendeskAuthArgs {
  ticketId: number | string;
}

export interface ZendeskTicketInputArgs extends ZendeskAuthArgs {
  ticket: JsonObject;
  async?: boolean;
}

export interface ZendeskUpdateTicketArgs extends ZendeskTicketIdArgs {
  ticket: JsonObject;
}

export interface ZendeskListTicketCommentsArgs extends ZendeskPageArgs {
  ticketId: number | string;
  includeInlineImages?: boolean;
}

export interface ZendeskListUsersArgs extends ZendeskPageArgs {
  role?: "end-user" | "agent" | "admin";
}

export interface ZendeskCreateOrUpdateUserArgs extends ZendeskAuthArgs {
  user: JsonObject;
}

function zendeskBaseUrl(args: ZendeskAuthArgs): string {
  if (args.baseUrl) {
    return args.baseUrl.replace(/\/+$/, "");
  }
  if (!args.subdomain) {
    throw new Error("Zendesk subdomain or baseUrl is required");
  }
  return `https://${args.subdomain}.zendesk.com/api/v2`;
}

async function zendeskHeaders(args: ZendeskAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  if (args.oauthToken) {
    return jsonHeaders(bearerAuth(await resolveSecret(args.oauthToken, chidori, "Zendesk OAuth token")));
  }
  if (!args.email) {
    throw new Error("Zendesk email is required when using apiToken auth");
  }
  const apiToken = await resolveSecret(args.apiToken, chidori, "Zendesk API token");
  return jsonHeaders({
    Authorization: `Basic ${base64Encode(`${args.email}/token:${apiToken}`)}`,
  });
}

function base64Encode(input: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const bytes = utf8Bytes(input);
  let output = "";
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1] ?? 0;
    const third = bytes[index + 2] ?? 0;
    const combined = (first << 16) | (second << 8) | third;
    output += alphabet.charAt((combined >> 18) & 63);
    output += alphabet.charAt((combined >> 12) & 63);
    output += index + 1 < bytes.length ? alphabet.charAt((combined >> 6) & 63) : "=";
    output += index + 2 < bytes.length ? alphabet.charAt(combined & 63) : "=";
  }
  return output;
}

function utf8Bytes(input: string): number[] {
  const bytes: number[] = [];
  for (const char of input) {
    const code = char.codePointAt(0) ?? 0;
    if (code <= 0x7f) {
      bytes.push(code);
    } else if (code <= 0x7ff) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code <= 0xffff) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return bytes;
}

function pageQuery(args: ZendeskPageArgs) {
  return {
    page: args.page,
    per_page: args.perPage,
  };
}

async function zendeskRequest<T extends JsonObject>(
  args: ZendeskAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await zendeskHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${zendeskBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const zendeskSearchTool = defineTool<ZendeskSearchArgs, JsonObject>(
  {
    name: "zendesk_search",
    description: "Search Zendesk tickets, users, organizations, or groups.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        query: { type: "string" },
        sortBy: { type: "string" },
        sortOrder: { type: "string", enum: ["asc", "desc"] },
        page: { type: "integer" },
        perPage: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, "/search.json", {
      query: {
        query: args.query,
        sort_by: args.sortBy,
        sort_order: args.sortOrder,
        ...pageQuery(args),
      },
    });
  },
);

export const zendeskListTicketsTool = defineTool<ZendeskListTicketsArgs, JsonObject>(
  {
    name: "zendesk_tickets_list",
    description: "List Zendesk Support tickets.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        sortBy: { type: "string" },
        sortOrder: { type: "string", enum: ["asc", "desc"] },
        page: { type: "integer" },
        perPage: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, "/tickets.json", {
      query: {
        sort_by: args.sortBy,
        sort_order: args.sortOrder,
        ...pageQuery(args),
      },
    });
  },
);

export const zendeskGetTicketTool = defineTool<ZendeskTicketIdArgs, JsonObject>(
  {
    name: "zendesk_ticket_get",
    description: "Get a Zendesk Support ticket by ID.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        ticketId: { type: "string" },
      },
      required: ["ticketId"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, `/tickets/${encodeURIComponent(String(args.ticketId))}.json`);
  },
);

export const zendeskCreateTicketTool = defineTool<ZendeskTicketInputArgs, JsonObject>(
  {
    name: "zendesk_ticket_create",
    description: "Create a Zendesk Support ticket.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        ticket: { type: "object", additionalProperties: true },
        async: { type: "boolean" },
      },
      required: ["ticket"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, "/tickets.json", {
      method: "POST",
      query: { async: args.async },
      body: { ticket: args.ticket },
    });
  },
);

export const zendeskUpdateTicketTool = defineTool<ZendeskUpdateTicketArgs, JsonObject>(
  {
    name: "zendesk_ticket_update",
    description: "Update a Zendesk Support ticket or add a ticket comment.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        ticketId: { type: "string" },
        ticket: { type: "object", additionalProperties: true },
      },
      required: ["ticketId", "ticket"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, `/tickets/${encodeURIComponent(String(args.ticketId))}.json`, {
      method: "PUT",
      body: { ticket: args.ticket },
    });
  },
);

export const zendeskListTicketCommentsTool = defineTool<ZendeskListTicketCommentsArgs, JsonObject>(
  {
    name: "zendesk_ticket_comments_list",
    description: "List comments for a Zendesk Support ticket.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        ticketId: { type: "string" },
        includeInlineImages: { type: "boolean" },
        page: { type: "integer" },
        perPage: { type: "integer" },
      },
      required: ["ticketId"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, `/tickets/${encodeURIComponent(String(args.ticketId))}/comments.json`, {
      query: {
        include_inline_images: args.includeInlineImages,
        ...pageQuery(args),
      },
    });
  },
);

export const zendeskListUsersTool = defineTool<ZendeskListUsersArgs, JsonObject>(
  {
    name: "zendesk_users_list",
    description: "List Zendesk Support users.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        role: { type: "string", enum: ["end-user", "agent", "admin"] },
        page: { type: "integer" },
        perPage: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, "/users.json", {
      query: {
        role: args.role,
        ...pageQuery(args),
      },
    });
  },
);

export const zendeskCreateOrUpdateUserTool = defineTool<ZendeskCreateOrUpdateUserArgs, JsonObject>(
  {
    name: "zendesk_user_create_or_update",
    description: "Create or update a Zendesk Support user, matched by unique identity such as email.",
    parameters: {
      type: "object",
      properties: {
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        user: { type: "object", additionalProperties: true },
      },
      required: ["user"],
    },
  },
  async (args, chidori) => {
    return zendeskRequest(args, chidori, "/users/create_or_update.json", {
      method: "POST",
      body: { user: args.user },
    });
  },
);

export const zendeskTools = {
  search: zendeskSearchTool,
  listTickets: zendeskListTicketsTool,
  getTicket: zendeskGetTicketTool,
  createTicket: zendeskCreateTicketTool,
  updateTicket: zendeskUpdateTicketTool,
  listTicketComments: zendeskListTicketCommentsTool,
  listUsers: zendeskListUsersTool,
  createOrUpdateUser: zendeskCreateOrUpdateUserTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getZendeskEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ZENDESK_SUBDOMAIN", description: "Zendesk subdomain." },
    { name: "ZENDESK_EMAIL", description: "Zendesk email for API token auth." },
    { name: "ZENDESK_API_TOKEN", description: "Zendesk API token." },
    { name: "ZENDESK_OAUTH_TOKEN", description: "Zendesk OAuth token." },
  ];
}

export const zendeskIntegrationSpec = {
  environmentVariables: getZendeskEnvironmentVariables,
} satisfies IntegrationSpec;
