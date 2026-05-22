import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface PagerDutyAuthArgs {
  apiToken?: SecretInput;
  baseUrl?: string;
  fromEmail?: string;
}

export interface PagerDutyListIncidentsArgs extends PagerDutyAuthArgs {
  since?: string;
  until?: string;
  statuses?: string[];
  serviceIds?: string[];
  teamIds?: string[];
  userIds?: string[];
  urgencies?: string[];
  timeZone?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
}

export interface PagerDutyIncidentIdArgs extends PagerDutyAuthArgs {
  incidentId: string;
}

export interface PagerDutyUpdateIncidentArgs extends PagerDutyIncidentIdArgs {
  incident: JsonObject;
}

export interface PagerDutyCreateIncidentNoteArgs extends PagerDutyIncidentIdArgs {
  content: string;
}

export interface PagerDutyListServicesArgs extends PagerDutyAuthArgs {
  query?: string;
  teamIds?: string[];
  include?: string[];
  limit?: number;
  offset?: number;
}

export interface PagerDutyListUsersArgs extends PagerDutyAuthArgs {
  query?: string;
  teamIds?: string[];
  include?: string[];
  limit?: number;
  offset?: number;
}

export interface PagerDutySendEventArgs {
  routingKey?: SecretInput;
  eventAction: "trigger" | "acknowledge" | "resolve";
  dedupKey?: string;
  payload?: JsonObject;
  images?: JsonObject[];
  links?: JsonObject[];
  client?: string;
  clientUrl?: string;
  baseUrl?: string;
}

function pagerDutyBaseUrl(args: PagerDutyAuthArgs): string {
  return (args.baseUrl ?? "https://api.pagerduty.com").replace(/\/+$/, "");
}

function pagerDutyEventsUrl(args: PagerDutySendEventArgs): string {
  return `${(args.baseUrl ?? "https://events.pagerduty.com").replace(/\/+$/, "")}/v2/enqueue`;
}

async function pagerDutyHeaders(args: PagerDutyAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const apiToken = await resolveSecret(args.apiToken, chidori, "PagerDuty REST API token");
  const headers: Record<string, string> = {
    Authorization: `Token token=${apiToken}`,
    Accept: "application/vnd.pagerduty+json;version=2",
  };
  if (args.fromEmail) {
    headers.From = args.fromEmail;
  }
  return jsonHeaders(headers);
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

async function pagerDutyRequest<T extends JsonObject>(
  args: PagerDutyAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "PUT" | "POST";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await pagerDutyHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${pagerDutyBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const pagerDutyListIncidentsTool = defineTool<PagerDutyListIncidentsArgs, JsonObject>(
  {
    name: "pagerduty_incidents_list",
    description: "List PagerDuty incidents.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        since: { type: "string" },
        until: { type: "string" },
        statuses: { type: "array", items: { type: "string" } },
        serviceIds: { type: "array", items: { type: "string" } },
        teamIds: { type: "array", items: { type: "string" } },
        userIds: { type: "array", items: { type: "string" } },
        urgencies: { type: "array", items: { type: "string" } },
        timeZone: { type: "string" },
        sortBy: { type: "string" },
        limit: { type: "integer" },
        offset: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, "/incidents", {
      query: {
        since: args.since,
        until: args.until,
        statuses: csv(args.statuses),
        service_ids: csv(args.serviceIds),
        team_ids: csv(args.teamIds),
        user_ids: csv(args.userIds),
        urgencies: csv(args.urgencies),
        time_zone: args.timeZone,
        sort_by: args.sortBy,
        limit: args.limit,
        offset: args.offset,
      },
    });
  },
);

export const pagerDutyGetIncidentTool = defineTool<PagerDutyIncidentIdArgs, JsonObject>(
  {
    name: "pagerduty_incident_get",
    description: "Get a PagerDuty incident by ID.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        incidentId: { type: "string" },
      },
      required: ["incidentId"],
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, `/incidents/${encodeURIComponent(args.incidentId)}`);
  },
);

export const pagerDutyUpdateIncidentTool = defineTool<PagerDutyUpdateIncidentArgs, JsonObject>(
  {
    name: "pagerduty_incident_update",
    description: "Update a PagerDuty incident status, urgency, escalation level, title, or assignees.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        incidentId: { type: "string" },
        incident: { type: "object", additionalProperties: true },
      },
      required: ["incidentId", "incident"],
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, `/incidents/${encodeURIComponent(args.incidentId)}`, {
      method: "PUT",
      body: { incident: args.incident },
    });
  },
);

export const pagerDutyCreateIncidentNoteTool = defineTool<PagerDutyCreateIncidentNoteArgs, JsonObject>(
  {
    name: "pagerduty_incident_note_create",
    description: "Create a note on a PagerDuty incident.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        incidentId: { type: "string" },
        content: { type: "string" },
      },
      required: ["incidentId", "content"],
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, `/incidents/${encodeURIComponent(args.incidentId)}/notes`, {
      method: "POST",
      body: { note: { content: args.content } },
    });
  },
);

export const pagerDutyListServicesTool = defineTool<PagerDutyListServicesArgs, JsonObject>(
  {
    name: "pagerduty_services_list",
    description: "List PagerDuty services.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        query: { type: "string" },
        teamIds: { type: "array", items: { type: "string" } },
        include: { type: "array", items: { type: "string" } },
        limit: { type: "integer" },
        offset: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, "/services", {
      query: {
        query: args.query,
        team_ids: csv(args.teamIds),
        include: csv(args.include),
        limit: args.limit,
        offset: args.offset,
      },
    });
  },
);

export const pagerDutyListUsersTool = defineTool<PagerDutyListUsersArgs, JsonObject>(
  {
    name: "pagerduty_users_list",
    description: "List PagerDuty users.",
    parameters: {
      type: "object",
      properties: {
        apiToken: { description: "PagerDuty REST API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.pagerduty.com" },
        fromEmail: { type: "string" },
        query: { type: "string" },
        teamIds: { type: "array", items: { type: "string" } },
        include: { type: "array", items: { type: "string" } },
        limit: { type: "integer" },
        offset: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return pagerDutyRequest(args, chidori, "/users", {
      query: {
        query: args.query,
        team_ids: csv(args.teamIds),
        include: csv(args.include),
        limit: args.limit,
        offset: args.offset,
      },
    });
  },
);

export const pagerDutySendEventTool = defineTool<PagerDutySendEventArgs, JsonObject>(
  {
    name: "pagerduty_event_send",
    description: "Send a PagerDuty Events API v2 trigger, acknowledge, or resolve event.",
    parameters: {
      type: "object",
      properties: {
        routingKey: { description: "PagerDuty Events API v2 routing key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://events.pagerduty.com" },
        eventAction: { type: "string", enum: ["trigger", "acknowledge", "resolve"] },
        dedupKey: { type: "string" },
        payload: { type: "object", additionalProperties: true },
        images: { type: "array", items: { type: "object", additionalProperties: true } },
        links: { type: "array", items: { type: "object", additionalProperties: true } },
        client: { type: "string" },
        clientUrl: { type: "string" },
      },
      required: ["eventAction"],
    },
  },
  async (args, chidori) => {
    const routingKey = await resolveSecret(args.routingKey, chidori, "PagerDuty Events API routing key");
    return requestJson<JsonObject>(chidori, pagerDutyEventsUrl(args), {
      method: "POST",
      headers: jsonHeaders(),
      body: compactObject({
        routing_key: routingKey,
        event_action: args.eventAction,
        dedup_key: args.dedupKey,
        payload: args.payload,
        images: args.images,
        links: args.links,
        client: args.client,
        client_url: args.clientUrl,
      }) as JsonObject,
    });
  },
);

export const pagerDutyTools = {
  listIncidents: pagerDutyListIncidentsTool,
  getIncident: pagerDutyGetIncidentTool,
  updateIncident: pagerDutyUpdateIncidentTool,
  createIncidentNote: pagerDutyCreateIncidentNoteTool,
  listServices: pagerDutyListServicesTool,
  listUsers: pagerDutyListUsersTool,
  sendEvent: pagerDutySendEventTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getPagerDutyEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "PAGERDUTY_API_TOKEN", description: "PagerDuty REST API token." },
    { name: "PAGERDUTY_ROUTING_KEY", description: "PagerDuty Events API routing key." },
  ];
}

export const pagerDutyIntegrationSpec = {
  environmentVariables: getPagerDutyEnvironmentVariables,
} satisfies IntegrationSpec;
