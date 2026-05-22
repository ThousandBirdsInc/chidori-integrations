import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface DatabricksAuthArgs {
  token?: SecretInput;
  workspaceUrl?: string;
}

export interface DatabricksEndpointArgs extends DatabricksAuthArgs {
  endpointName: string;
  invocationUrl?: string;
}

export interface DatabricksServingInvokeArgs extends DatabricksEndpointArgs {
  body: JsonObject;
}

export interface DatabricksChatCompletionsArgs extends DatabricksEndpointArgs {
  messages: JsonObject[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  stop?: string | string[];
  n?: number;
  tools?: JsonObject[];
  toolChoice?: Json;
  responseFormat?: JsonObject;
  stream?: boolean;
}

export interface DatabricksCompletionsArgs extends DatabricksEndpointArgs {
  prompt: string | string[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  stop?: string | string[];
  stream?: boolean;
  errorBehavior?: "truncate" | "error";
}

export interface DatabricksEmbeddingsArgs extends DatabricksEndpointArgs {
  input: string | string[];
  instruction?: string;
  dimensions?: number;
}

export interface DatabricksVectorSearchQueryArgs extends DatabricksAuthArgs {
  indexName: string;
  queryText?: string;
  queryVector?: number[];
  columns?: string[];
  filters?: JsonObject | string;
  numResults?: number;
  debugLevel?: number;
  reranker?: JsonObject;
  scoreThreshold?: number;
}

export interface DatabricksVectorSearchNextPageArgs extends DatabricksAuthArgs {
  indexName: string;
  pageToken: string;
}

function workspaceBaseUrl(args: DatabricksAuthArgs): string {
  return (args.workspaceUrl ?? "https://dbc.example.cloud.databricks.com").replace(/\/+$/, "");
}

async function databricksHeaders(args: DatabricksAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Databricks token");
  return jsonHeaders(bearerAuth(token));
}

function servingInvocationUrl(args: DatabricksEndpointArgs): string {
  if (args.invocationUrl) {
    return args.invocationUrl;
  }
  return `${workspaceBaseUrl(args)}/serving-endpoints/${encodeURIComponent(args.endpointName)}/invocations`;
}

function servingEndpointUrl(args: DatabricksEndpointArgs): string {
  return `${workspaceBaseUrl(args)}/api/2.0/serving-endpoints/${encodeURIComponent(args.endpointName)}`;
}

function vectorSearchUrl(args: DatabricksAuthArgs, indexName: string, suffix: "query" | "query-next-page"): string {
  return `${workspaceBaseUrl(args)}/api/2.0/vector-search/indexes/${encodeURIComponent(indexName)}/${suffix}`;
}

export const databricksServingEndpointGetTool = defineTool<DatabricksEndpointArgs, JsonObject>(
  {
    name: "databricks_serving_endpoint_get",
    description: "Get Databricks Model Serving endpoint metadata, including route-optimized invocation URL when present.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        endpointName: { type: "string" },
      },
      required: ["endpointName"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, servingEndpointUrl(args), {
    method: "GET",
    headers: await databricksHeaders(args, chidori),
  }),
);

export const databricksServingInvokeTool = defineTool<DatabricksServingInvokeArgs, JsonObject>(
  {
    name: "databricks_serving_invoke",
    description: "Invoke a Databricks Model Serving endpoint with a caller-supplied JSON body.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        endpointName: { type: "string" },
        invocationUrl: { type: "string" },
        body: { type: "object", additionalProperties: true },
      },
      required: ["endpointName", "body"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, servingInvocationUrl(args), {
    method: "POST",
    headers: await databricksHeaders(args, chidori),
    body: args.body,
  }),
);

export const databricksChatCompletionsTool = defineTool<DatabricksChatCompletionsArgs, JsonObject>(
  {
    name: "databricks_chat_completions_create",
    description: "Create an OpenAI-compatible chat completion through a Databricks Model Serving endpoint.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        endpointName: { type: "string" },
        invocationUrl: { type: "string" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        maxTokens: { type: "integer" },
        temperature: { type: "number" },
        topP: { type: "number" },
        topK: { type: "integer" },
        stop: {},
        n: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: {},
        responseFormat: { type: "object", additionalProperties: true },
        stream: { type: "boolean" },
      },
      required: ["endpointName", "messages"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, servingInvocationUrl(args), {
    method: "POST",
    headers: await databricksHeaders(args, chidori),
    body: compactObject({
      messages: args.messages,
      max_tokens: args.maxTokens,
      temperature: args.temperature,
      top_p: args.topP,
      top_k: args.topK,
      stop: args.stop,
      n: args.n,
      tools: args.tools,
      tool_choice: args.toolChoice,
      response_format: args.responseFormat,
      stream: args.stream,
    }) as JsonObject,
  }),
);

export const databricksCompletionsTool = defineTool<DatabricksCompletionsArgs, JsonObject>(
  {
    name: "databricks_completions_create",
    description: "Create a text completion through a Databricks Model Serving endpoint.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        endpointName: { type: "string" },
        invocationUrl: { type: "string" },
        prompt: {},
        maxTokens: { type: "integer" },
        temperature: { type: "number" },
        topP: { type: "number" },
        topK: { type: "integer" },
        stop: {},
        stream: { type: "boolean" },
        errorBehavior: { type: "string", enum: ["truncate", "error"] },
      },
      required: ["endpointName", "prompt"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, servingInvocationUrl(args), {
    method: "POST",
    headers: await databricksHeaders(args, chidori),
    body: compactObject({
      prompt: args.prompt,
      max_tokens: args.maxTokens,
      temperature: args.temperature,
      top_p: args.topP,
      top_k: args.topK,
      stop: args.stop,
      stream: args.stream,
      error_behavior: args.errorBehavior,
    }) as JsonObject,
  }),
);

export const databricksEmbeddingsTool = defineTool<DatabricksEmbeddingsArgs, JsonObject>(
  {
    name: "databricks_embeddings_create",
    description: "Create embeddings through a Databricks Model Serving endpoint.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        endpointName: { type: "string" },
        invocationUrl: { type: "string" },
        input: {},
        instruction: { type: "string" },
        dimensions: { type: "integer" },
      },
      required: ["endpointName", "input"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, servingInvocationUrl(args), {
    method: "POST",
    headers: await databricksHeaders(args, chidori),
    body: compactObject({
      input: args.input,
      instruction: args.instruction,
      dimensions: args.dimensions,
    }) as JsonObject,
  }),
);

export const databricksVectorSearchQueryTool = defineTool<DatabricksVectorSearchQueryArgs, JsonObject>(
  {
    name: "databricks_vector_search_query",
    description: "Query a Databricks Vector Search index by text or vector.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        indexName: { type: "string" },
        queryText: { type: "string" },
        queryVector: { type: "array", items: { type: "number" } },
        columns: { type: "array", items: { type: "string" } },
        filters: {},
        numResults: { type: "integer" },
        debugLevel: { type: "integer" },
        reranker: { type: "object", additionalProperties: true },
        scoreThreshold: { type: "number" },
      },
      required: ["indexName"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, vectorSearchUrl(args, args.indexName, "query"), {
    method: "GET",
    headers: await databricksHeaders(args, chidori),
    body: compactObject({
      query_text: args.queryText,
      query_vector: args.queryVector,
      columns: args.columns,
      filters: args.filters,
      num_results: args.numResults,
      debug_level: args.debugLevel,
      reranker: args.reranker,
      score_threshold: args.scoreThreshold,
    }) as JsonObject,
  }),
);

export const databricksVectorSearchNextPageTool = defineTool<DatabricksVectorSearchNextPageArgs, JsonObject>(
  {
    name: "databricks_vector_search_next_page",
    description: "Fetch the next page of Databricks Vector Search query results.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Databricks PAT or OAuth token, or Chidori memory secret reference." },
        workspaceUrl: { type: "string", default: "https://dbc.example.cloud.databricks.com" },
        indexName: { type: "string" },
        pageToken: { type: "string" },
      },
      required: ["indexName", "pageToken"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, vectorSearchUrl(args, args.indexName, "query-next-page"), {
    method: "GET",
    headers: await databricksHeaders(args, chidori),
    body: { page_token: args.pageToken },
  }),
);

export const databricksTools = {
  servingEndpointGet: databricksServingEndpointGetTool,
  servingInvoke: databricksServingInvokeTool,
  chatCompletions: databricksChatCompletionsTool,
  completions: databricksCompletionsTool,
  embeddings: databricksEmbeddingsTool,
  vectorSearchQuery: databricksVectorSearchQueryTool,
  vectorSearchNextPage: databricksVectorSearchNextPageTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getDatabricksEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "DATABRICKS_TOKEN", description: "Databricks PAT or OAuth token." },
    { name: "DATABRICKS_WORKSPACE_URL", description: "Databricks workspace URL." },
  ];
}

export const databricksIntegrationSpec = {
  environmentVariables: getDatabricksEnvironmentVariables,
} satisfies IntegrationSpec;
