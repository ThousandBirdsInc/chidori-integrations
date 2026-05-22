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

export interface AzureOpenAIChatArgs {
  endpoint: string;
  deployment: string;
  messages: JsonObject[];
  apiKey?: SecretInput;
  apiVersion?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
}

export interface AzureOpenAIEmbeddingsArgs {
  endpoint: string;
  deployment: string;
  input: string | string[];
  apiKey?: SecretInput;
  apiVersion?: string;
  dimensions?: number;
  user?: string;
}

export interface AzureDynamicSessionsBaseArgs {
  poolManagementEndpoint: string;
  bearerToken?: SecretInput;
  identifier: string;
  apiVersion?: string;
  operationId?: string;
  timeoutMs?: number;
}

export interface AzureDynamicSessionsExecuteArgs extends AzureDynamicSessionsBaseArgs {
  code: string;
  codeInputType?: "inline";
  executionType?: "synchronous";
  properties?: JsonObject;
}

export interface AzureDynamicSessionsFilesListArgs extends AzureDynamicSessionsBaseArgs {}

function azureDeploymentUrl(args: { endpoint: string; deployment: string; apiVersion?: string }, suffix: string): string {
  const endpoint = args.endpoint.replace(/\/$/, "");
  return withQuery(`${endpoint}/openai/deployments/${encodeURIComponent(args.deployment)}/${suffix}`, {
    "api-version": args.apiVersion ?? "2024-02-15-preview",
  });
}

function azureDynamicSessionsUrl(args: AzureDynamicSessionsBaseArgs, path: "executions" | "files"): string {
  return withQuery(`${args.poolManagementEndpoint.replace(/\/+$/, "")}/${path}`, {
    "api-version": args.apiVersion ?? "2025-10-02-preview",
    identifier: args.identifier,
  });
}

async function azureDynamicSessionsHeaders(
  args: AzureDynamicSessionsBaseArgs,
  chidori: Parameters<typeof resolveSecret>[1],
): Promise<Record<string, string>> {
  const token = await resolveSecret(args.bearerToken, chidori, "Azure Dynamic Sessions bearer token");
  return jsonHeaders(compactObject({
    ...bearerAuth(token),
    "operation-id": args.operationId,
  }) as Record<string, string>);
}

export const azureOpenAIChatCompletionsTool = defineTool<AzureOpenAIChatArgs, JsonObject>(
  {
    name: "azure_openai_chat_completions_create",
    description: "Create an Azure OpenAI chat completion.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "Azure OpenAI resource endpoint." },
        deployment: { type: "string", description: "Azure OpenAI deployment name." },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Azure OpenAI API key or Chidori memory secret reference." },
        apiVersion: { type: "string", default: "2024-02-15-preview" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["endpoint", "deployment", "messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Azure OpenAI API key");
    const body = compactObject({
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, azureDeploymentUrl(args, "chat/completions"), {
      method: "POST",
      headers: jsonHeaders({ "api-key": apiKey }),
      body,
    });
  },
);

export const azureOpenAIEmbeddingsTool = defineTool<AzureOpenAIEmbeddingsArgs, JsonObject>(
  {
    name: "azure_openai_embeddings_create",
    description: "Create Azure OpenAI embeddings.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string" },
        deployment: { type: "string" },
        input: { description: "Text or text array to embed." },
        apiKey: { description: "Azure OpenAI API key or Chidori memory secret reference." },
        apiVersion: { type: "string", default: "2024-02-15-preview" },
        dimensions: { type: "integer" },
        user: { type: "string" },
      },
      required: ["endpoint", "deployment", "input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Azure OpenAI API key");
    const body = compactObject({
      input: args.input,
      dimensions: args.dimensions,
      user: args.user,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, azureDeploymentUrl(args, "embeddings"), {
      method: "POST",
      headers: jsonHeaders({ "api-key": apiKey }),
      body,
    });
  },
);

export const azureDynamicSessionsExecuteTool = defineTool<AzureDynamicSessionsExecuteArgs, JsonObject>(
  {
    name: "azure_dynamic_sessions_execute",
    description: "Run code in an Azure Container Apps Dynamic Sessions code interpreter session.",
    parameters: {
      type: "object",
      properties: {
        poolManagementEndpoint: {
          type: "string",
          description: "Session pool management endpoint through the sessionPools/{name} path.",
        },
        bearerToken: { description: "Microsoft Entra bearer token or Chidori memory secret reference." },
        identifier: { type: "string", description: "Session identifier to create or reuse." },
        apiVersion: { type: "string", default: "2025-10-02-preview" },
        operationId: { type: "string" },
        code: { type: "string" },
        codeInputType: { type: "string", enum: ["inline"], default: "inline" },
        executionType: { type: "string", enum: ["synchronous"], default: "synchronous" },
        properties: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["poolManagementEndpoint", "identifier", "code"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      azureDynamicSessionsUrl(args, "executions"),
      compactObject({
        method: "POST",
        headers: await azureDynamicSessionsHeaders(args, chidori),
        body: {
          properties: compactObject({
            ...(args.properties ?? {}),
            codeInputType: args.codeInputType ?? "inline",
            executionType: args.executionType ?? "synchronous",
            code: args.code,
          }) as JsonObject,
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azureDynamicSessionsFilesListTool = defineTool<AzureDynamicSessionsFilesListArgs, JsonObject>(
  {
    name: "azure_dynamic_sessions_files_list",
    description: "List files in an Azure Container Apps Dynamic Sessions code interpreter session.",
    parameters: {
      type: "object",
      properties: {
        poolManagementEndpoint: {
          type: "string",
          description: "Session pool management endpoint through the sessionPools/{name} path.",
        },
        bearerToken: { description: "Microsoft Entra bearer token or Chidori memory secret reference." },
        identifier: { type: "string", description: "Session identifier." },
        apiVersion: { type: "string", default: "2025-10-02-preview" },
        operationId: { type: "string" },
        timeoutMs: { type: "integer" },
      },
      required: ["poolManagementEndpoint", "identifier"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      azureDynamicSessionsUrl(args, "files"),
      compactObject({
        method: "GET",
        headers: await azureDynamicSessionsHeaders(args, chidori),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azureTools = {
  openAIChatCompletions: azureOpenAIChatCompletionsTool,
  openAIEmbeddings: azureOpenAIEmbeddingsTool,
  dynamicSessionsExecute: azureDynamicSessionsExecuteTool,
  dynamicSessionsFilesList: azureDynamicSessionsFilesListTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAzureEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "AZURE_OPENAI_ENDPOINT", description: "Azure OpenAI resource endpoint." },
    { name: "AZURE_OPENAI_API_KEY", description: "Azure OpenAI API key." },
    { name: "AZURE_DYNAMIC_SESSIONS_BEARER_TOKEN", description: "Azure Dynamic Sessions bearer token." },
  ];
}

export const azureIntegrationSpec = {
  environmentVariables: getAzureEnvironmentVariables,
} satisfies IntegrationSpec;
