import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface BrowserbaseAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
}

export interface BrowserbaseSessionCreateArgs extends BrowserbaseAuthArgs {
  projectId?: string;
  extensionId?: string;
  browserSettings?: JsonObject;
  timeout?: number;
  keepAlive?: boolean;
  proxies?: boolean | Json[];
  region?: "us-west-2" | "us-east-1" | "eu-central-1" | "ap-southeast-1";
  userMetadata?: JsonObject;
}

export interface BrowserbaseSessionsListArgs extends BrowserbaseAuthArgs {
  status?: "PENDING" | "RUNNING" | "ERROR" | "TIMED_OUT" | "COMPLETED";
  q?: string;
}

export interface BrowserbaseSessionIdArgs extends BrowserbaseAuthArgs {
  sessionId: string;
}

export interface BrowserbaseSessionCloseArgs extends BrowserbaseSessionIdArgs {
  projectId?: string;
}

export interface BrowserbaseFetchArgs extends BrowserbaseAuthArgs {
  url: string;
  allowRedirects?: boolean;
  allowInsecureSsl?: boolean;
  proxies?: boolean;
  format?: "raw" | "markdown" | "json";
  schema?: JsonObject;
}

export interface BrowserbaseSearchArgs extends BrowserbaseAuthArgs {
  query: string;
  numResults?: number;
}

function browserbaseBaseUrl(args: BrowserbaseAuthArgs): string {
  return (args.baseUrl ?? "https://api.browserbase.com/v1").replace(/\/+$/, "");
}

async function browserbaseHeaders(args: BrowserbaseAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Browserbase API key");
  return jsonHeaders({ "X-BB-API-Key": apiKey });
}

function sessionCreateBody(args: BrowserbaseSessionCreateArgs): JsonObject {
  return compactObject({
    projectId: args.projectId,
    extensionId: args.extensionId,
    browserSettings: args.browserSettings,
    timeout: args.timeout,
    keepAlive: args.keepAlive,
    proxies: args.proxies,
    region: args.region,
    userMetadata: args.userMetadata,
  }) as JsonObject;
}

export const browserbaseCreateSessionTool = defineTool<BrowserbaseSessionCreateArgs, JsonObject>(
  {
    name: "browserbase_session_create",
    description: "Create a Browserbase browser session and return its connection URLs.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        projectId: { type: "string" },
        extensionId: { type: "string" },
        browserSettings: { type: "object", additionalProperties: true },
        timeout: { type: "integer", description: "Session timeout in seconds." },
        keepAlive: { type: "boolean" },
        proxies: {
          description: "Proxy configuration. Use true for Browserbase default proxy or an array of proxy objects.",
        },
        region: { type: "string", enum: ["us-west-2", "us-east-1", "eu-central-1", "ap-southeast-1"] },
        userMetadata: { type: "object", additionalProperties: true },
      },
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/sessions`, {
      method: "POST",
      headers: await browserbaseHeaders(args, chidori),
      body: sessionCreateBody(args),
    });
  },
);

export const browserbaseListSessionsTool = defineTool<BrowserbaseSessionsListArgs, Json>(
  {
    name: "browserbase_sessions_list",
    description: "List Browserbase sessions, optionally filtered by status or user metadata query.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        status: { type: "string", enum: ["PENDING", "RUNNING", "ERROR", "TIMED_OUT", "COMPLETED"] },
        q: { type: "string" },
      },
    },
  },
  async (args, chidori) => {
    const url = withQuery(`${browserbaseBaseUrl(args)}/sessions`, {
      status: args.status,
      q: args.q,
    });
    return requestJson<Json>(chidori, url, {
      method: "GET",
      headers: await browserbaseHeaders(args, chidori),
    });
  },
);

export const browserbaseGetSessionTool = defineTool<BrowserbaseSessionIdArgs, JsonObject>(
  {
    name: "browserbase_session_get",
    description: "Get a Browserbase session, including connection URLs when available.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        sessionId: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/sessions/${encodeURIComponent(args.sessionId)}`, {
      method: "GET",
      headers: await browserbaseHeaders(args, chidori),
    });
  },
);

export const browserbaseCloseSessionTool = defineTool<BrowserbaseSessionCloseArgs, JsonObject>(
  {
    name: "browserbase_session_close",
    description: "Request release of an active Browserbase session.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        sessionId: { type: "string" },
        projectId: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/sessions/${encodeURIComponent(args.sessionId)}`, {
      method: "POST",
      headers: await browserbaseHeaders(args, chidori),
      body: compactObject({
        status: "REQUEST_RELEASE",
        projectId: args.projectId,
      }) as JsonObject,
    });
  },
);

export const browserbaseGetSessionLiveUrlsTool = defineTool<BrowserbaseSessionIdArgs, JsonObject>(
  {
    name: "browserbase_session_live_urls_get",
    description: "Get Browserbase live debugging URLs for a session.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        sessionId: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/sessions/${encodeURIComponent(args.sessionId)}/debug`, {
      method: "GET",
      headers: await browserbaseHeaders(args, chidori),
    });
  },
);

export const browserbaseListSessionLogsTool = defineTool<BrowserbaseSessionIdArgs, Json>(
  {
    name: "browserbase_session_logs_list",
    description: "List Browserbase protocol logs for a session.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        sessionId: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<Json>(chidori, `${browserbaseBaseUrl(args)}/sessions/${encodeURIComponent(args.sessionId)}/logs`, {
      method: "GET",
      headers: await browserbaseHeaders(args, chidori),
    });
  },
);

export const browserbaseGetSessionRecordingTool = defineTool<BrowserbaseSessionIdArgs, Json>(
  {
    name: "browserbase_session_recording_get",
    description: "Get Browserbase rrweb recording events for a session.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        sessionId: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<Json>(chidori, `${browserbaseBaseUrl(args)}/sessions/${encodeURIComponent(args.sessionId)}/recording`, {
      method: "GET",
      headers: await browserbaseHeaders(args, chidori),
    });
  },
);

export const browserbaseFetchTool = defineTool<BrowserbaseFetchArgs, JsonObject>(
  {
    name: "browserbase_fetch",
    description: "Fetch a page through Browserbase infrastructure without creating an interactive browser session.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        url: { type: "string" },
        allowRedirects: { type: "boolean" },
        allowInsecureSsl: { type: "boolean" },
        proxies: { type: "boolean" },
        format: { type: "string", enum: ["raw", "markdown", "json"] },
        schema: { type: "object", additionalProperties: true },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/fetch`, {
      method: "POST",
      headers: await browserbaseHeaders(args, chidori),
      body: compactObject({
        url: args.url,
        allowRedirects: args.allowRedirects,
        allowInsecureSsl: args.allowInsecureSsl,
        proxies: args.proxies,
        format: args.format,
        schema: args.schema,
      }) as JsonObject,
    });
  },
);

export const browserbaseSearchTool = defineTool<BrowserbaseSearchArgs, JsonObject>(
  {
    name: "browserbase_search",
    description: "Search the web with Browserbase Search for browser-agent reconnaissance and retrieval.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com/v1" },
        query: { type: "string" },
        numResults: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${browserbaseBaseUrl(args)}/search`, {
      method: "POST",
      headers: await browserbaseHeaders(args, chidori),
      body: compactObject({
        query: args.query,
        numResults: args.numResults,
      }) as JsonObject,
    });
  },
);

export const browserTools = {
  createSession: browserbaseCreateSessionTool,
  listSessions: browserbaseListSessionsTool,
  getSession: browserbaseGetSessionTool,
  closeSession: browserbaseCloseSessionTool,
  getSessionLiveUrls: browserbaseGetSessionLiveUrlsTool,
  listSessionLogs: browserbaseListSessionLogsTool,
  getSessionRecording: browserbaseGetSessionRecordingTool,
  fetch: browserbaseFetchTool,
  search: browserbaseSearchTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getBrowserEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "BROWSERBASE_API_KEY", description: "Browserbase API key." },
  ];
}

export const browserIntegrationSpec = {
  environmentVariables: getBrowserEnvironmentVariables,
} satisfies IntegrationSpec;
