import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type ChidoriRuntime,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ComposioAuthArgs {
  apiKey?: SecretInput;
  orgApiKey?: SecretInput;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface ComposioToolsListArgs extends ComposioAuthArgs {
  toolkitSlug?: string;
  toolSlugs?: string[];
  authConfigIds?: string[];
  important?: boolean;
  tags?: string[];
  scopes?: string[];
  query?: string;
  includeDeprecated?: boolean;
  toolkitVersions?: string;
  limit?: number;
  cursor?: string;
}

export interface ComposioToolGetArgs extends ComposioAuthArgs {
  toolSlug: string;
  version?: string;
  toolkitVersions?: string;
}

export interface ComposioToolExecuteArgs extends ComposioAuthArgs {
  toolSlug: string;
  connectedAccountId?: string;
  userId?: string;
  entityId?: string;
  version?: string;
  arguments?: JsonObject;
  text?: string;
  customAuthParams?: JsonObject;
  customConnectionData?: JsonObject;
  llmGatewayHeaders?: JsonObject;
}

export interface ComposioProxyParameter {
  name: string;
  value: string;
  type?: "header" | "query";
  in?: "header" | "query";
}

export interface ComposioProxyExecuteArgs extends ComposioAuthArgs {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  connectedAccountId?: string;
  body?: JsonObject;
  binaryBody?: JsonObject;
  parameters?: ComposioProxyParameter[];
  customConnectionData?: JsonObject;
}

function composioBaseUrl(baseUrl?: string): string {
  const root = (baseUrl ?? "https://backend.composio.dev/api/v3.1").replace(/\/$/, "");
  return root.match(/\/api\/v3(\.1)?$/) ? root : `${root}/api/v3.1`;
}

async function composioHeaders(
  args: ComposioAuthArgs & { llmGatewayHeaders?: JsonObject },
  chidori: ChidoriRuntime,
  includeJson = false,
): Promise<Record<string, string>> {
  const headers = includeJson ? jsonHeaders() : {};
  if (args.orgApiKey) {
    headers["x-org-api-key"] = await resolveSecret(args.orgApiKey, chidori, "Composio organization API key");
  } else {
    headers["x-api-key"] = await resolveSecret(args.apiKey, chidori, "Composio API key");
  }
  if (args.llmGatewayHeaders) {
    headers["x-llm-gateway-headers"] = JSON.stringify(args.llmGatewayHeaders);
  }
  return headers;
}

function commaList(values: string[] | undefined): string | undefined {
  return values && values.length > 0 ? values.join(",") : undefined;
}

export const composioToolsListTool = defineTool<ComposioToolsListArgs, JsonObject>(
  {
    name: "composio_tools_list",
    description: "List Composio tools with optional toolkit, slug, tag, scope, and text filters.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Composio project API key or Chidori memory secret reference." },
        orgApiKey: { description: "Composio organization API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://backend.composio.dev/api/v3.1" },
        toolkitSlug: { type: "string", description: "Toolkit slug to filter by, for example github." },
        toolSlugs: { type: "array", items: { type: "string" } },
        authConfigIds: { type: "array", items: { type: "string" } },
        important: { type: "boolean" },
        tags: { type: "array", items: { type: "string" } },
        scopes: { type: "array", items: { type: "string" } },
        query: { type: "string", description: "Full-text search query." },
        includeDeprecated: { type: "boolean" },
        toolkitVersions: { type: "string", description: "Toolkit version selector, for example latest." },
        limit: { type: "integer" },
        cursor: { type: "string" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    withQuery(`${composioBaseUrl(args.baseUrl)}/tools`, compactObject({
      toolkit_slug: args.toolkitSlug,
      tool_slugs: commaList(args.toolSlugs),
      auth_config_ids: commaList(args.authConfigIds),
      important: args.important,
      tags: commaList(args.tags),
      scopes: commaList(args.scopes),
      query: args.query,
      include_deprecated: args.includeDeprecated,
      toolkit_versions: args.toolkitVersions,
      limit: args.limit,
      cursor: args.cursor,
    })),
    compactObject({
      method: "GET",
      headers: await composioHeaders(args, chidori),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const composioToolGetTool = defineTool<ComposioToolGetArgs, JsonObject>(
  {
    name: "composio_tool_get",
    description: "Get Composio tool metadata by slug.",
    parameters: {
      type: "object",
      properties: {
        toolSlug: { type: "string", description: "Composio tool slug." },
        apiKey: { description: "Composio project API key or Chidori memory secret reference." },
        orgApiKey: { description: "Composio organization API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://backend.composio.dev/api/v3.1" },
        version: { type: "string" },
        toolkitVersions: { type: "string", description: "Toolkit version selector, for example latest." },
        timeoutMs: { type: "integer" },
      },
      required: ["toolSlug"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    withQuery(`${composioBaseUrl(args.baseUrl)}/tools/${encodeURIComponent(args.toolSlug)}`, compactObject({
      version: args.version,
      toolkit_versions: args.toolkitVersions,
    })),
    compactObject({
      method: "GET",
      headers: await composioHeaders(args, chidori),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const composioToolExecuteTool = defineTool<ComposioToolExecuteArgs, JsonObject>(
  {
    name: "composio_tool_execute",
    description: "Execute a Composio tool by slug using structured arguments or a natural-language task.",
    parameters: {
      type: "object",
      properties: {
        toolSlug: { type: "string", description: "Composio tool slug." },
        apiKey: { description: "Composio project API key or Chidori memory secret reference." },
        orgApiKey: { description: "Composio organization API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://backend.composio.dev/api/v3.1" },
        connectedAccountId: { type: "string" },
        userId: { type: "string" },
        entityId: { type: "string", description: "Deprecated Composio entity ID for older flows." },
        version: { type: "string" },
        arguments: { type: "object", additionalProperties: true },
        text: { type: "string", description: "Natural-language execution request, mutually exclusive with arguments." },
        customAuthParams: { type: "object", additionalProperties: true },
        customConnectionData: { type: "object", additionalProperties: true },
        llmGatewayHeaders: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["toolSlug"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${composioBaseUrl(args.baseUrl)}/tools/execute/${encodeURIComponent(args.toolSlug)}`,
    compactObject({
      method: "POST",
      headers: await composioHeaders(args, chidori, true),
      body: compactObject({
        connected_account_id: args.connectedAccountId,
        user_id: args.userId,
        entity_id: args.entityId,
        version: args.version,
        arguments: args.arguments,
        text: args.text,
        custom_auth_params: args.customAuthParams,
        custom_connection_data: args.customConnectionData,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const composioProxyExecuteTool = defineTool<ComposioProxyExecuteArgs, JsonObject>(
  {
    name: "composio_proxy_execute",
    description: "Proxy an authenticated HTTP request through Composio connected account credentials.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "Absolute URL or path relative to the connected account API base." },
        method: { type: "string", enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"] },
        apiKey: { description: "Composio project API key or Chidori memory secret reference." },
        orgApiKey: { description: "Composio organization API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://backend.composio.dev/api/v3.1" },
        connectedAccountId: { type: "string" },
        body: { type: "object", additionalProperties: true },
        binaryBody: { type: "object", additionalProperties: true },
        parameters: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              value: { type: "string" },
              type: { type: "string", enum: ["header", "query"] },
              in: { type: "string", enum: ["header", "query"] },
            },
            required: ["name", "value"],
          },
        },
        customConnectionData: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["endpoint", "method"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${composioBaseUrl(args.baseUrl)}/tools/execute/proxy`,
    compactObject({
      method: "POST",
      headers: await composioHeaders(args, chidori, true),
      body: compactObject({
        connected_account_id: args.connectedAccountId,
        endpoint: args.endpoint,
        method: args.method,
        body: args.body,
        binary_body: args.binaryBody,
        parameters: args.parameters as unknown as Json,
        custom_connection_data: args.customConnectionData,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const composioTools = [
  composioToolsListTool,
  composioToolGetTool,
  composioToolExecuteTool,
  composioProxyExecuteTool,
];

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getComposioEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "COMPOSIO_API_KEY", description: "Composio project API key." },
    { name: "COMPOSIO_ORG_API_KEY", description: "Optional Composio organization API key." },
  ];
}

export const composioIntegrationSpec = {
  environmentVariables: getComposioEnvironmentVariables,
} satisfies IntegrationSpec;
