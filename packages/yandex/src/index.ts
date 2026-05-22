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

type YandexAuthType = "bearer" | "api-key";

export interface YandexAuthArgs {
  credential?: SecretInput;
  authType?: YandexAuthType;
  folderId?: string;
  baseUrl?: string;
}

export interface YandexFoundationCompletionArgs extends YandexAuthArgs {
  messages: JsonObject[];
  modelUri?: string;
  modelName?: string;
  modelVersion?: string;
  stream?: boolean;
  temperature?: number;
  maxTokens?: number;
  reasoningMode?: "DISABLED" | "ENABLED_HIDDEN";
  tools?: JsonObject[];
  jsonObject?: boolean;
  jsonSchema?: JsonObject;
  parallelToolCalls?: boolean;
  toolChoice?: JsonObject;
  extraBody?: JsonObject;
}

export interface YandexFoundationTextEmbeddingArgs extends YandexAuthArgs {
  text: string | string[];
  modelUri?: string;
  modelName?: string;
  modelVersion?: string;
  dim?: number;
  extraBody?: JsonObject;
}

function yandexAuthHeaders(credential: string, authType?: YandexAuthType, folderId?: string): Record<string, string> {
  const authHeaders = authType === "api-key"
    ? { Authorization: `Api-Key ${credential}` }
    : bearerAuth(credential);
  return folderId
    ? jsonHeaders({ ...authHeaders, "x-folder-id": folderId })
    : jsonHeaders(authHeaders);
}

function yandexBaseUrl(baseUrl: string | undefined): string {
  return (baseUrl ?? "https://llm.api.cloud.yandex.net").replace(/\/+$/, "");
}

function yandexCompletionModelUri(args: YandexFoundationCompletionArgs): string {
  if (args.modelUri) {
    return args.modelUri;
  }
  if (!args.folderId) {
    throw new Error("Yandex folderId is required when modelUri is not provided");
  }
  return `gpt://${args.folderId}/${args.modelName ?? "yandexgpt"}/${args.modelVersion ?? "latest"}`;
}

function yandexEmbeddingModelUri(args: YandexFoundationTextEmbeddingArgs): string {
  if (args.modelUri) {
    return args.modelUri;
  }
  if (!args.folderId) {
    throw new Error("Yandex folderId is required when modelUri is not provided");
  }
  return `emb://${args.folderId}/${args.modelName ?? "text-search-query"}/${args.modelVersion ?? "latest"}`;
}

export const yandexFoundationCompletionTool = defineTool<YandexFoundationCompletionArgs, JsonObject>(
  {
    name: "yandex_foundation_completion_create",
    description: "Create a Yandex Cloud AI Studio Foundation Models completion.",
    parameters: {
      type: "object",
      properties: {
        credential: { description: "Yandex IAM token/API key or Chidori memory secret reference." },
        authType: { type: "string", enum: ["bearer", "api-key"], default: "bearer" },
        folderId: { type: "string", description: "Yandex Cloud folder ID, used for model URI and optional x-folder-id header." },
        baseUrl: { type: "string", default: "https://llm.api.cloud.yandex.net" },
        modelUri: { type: "string", description: "Full Yandex model URI, for example gpt://folder/yandexgpt/latest." },
        modelName: { type: "string", default: "yandexgpt" },
        modelVersion: { type: "string", default: "latest" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        stream: { type: "boolean" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        reasoningMode: { type: "string", enum: ["DISABLED", "ENABLED_HIDDEN"] },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        jsonObject: { type: "boolean" },
        jsonSchema: { type: "object", additionalProperties: true },
        parallelToolCalls: { type: "boolean" },
        toolChoice: { type: "object", additionalProperties: true },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const credential = await resolveSecret(args.credential, chidori, "Yandex credential");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      modelUri: yandexCompletionModelUri(args),
      completionOptions: compactObject({
        stream: args.stream,
        temperature: args.temperature,
        maxTokens: args.maxTokens === undefined ? undefined : String(args.maxTokens),
        reasoningOptions: args.reasoningMode ? { mode: args.reasoningMode } : undefined,
      }),
      messages: args.messages as Json,
      tools: args.tools,
      jsonObject: args.jsonObject,
      jsonSchema: args.jsonSchema ? { schema: args.jsonSchema } : undefined,
      parallelToolCalls: args.parallelToolCalls,
      toolChoice: args.toolChoice,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      `${yandexBaseUrl(args.baseUrl)}/foundationModels/v1/completion`,
      {
        method: "POST",
        headers: yandexAuthHeaders(credential, args.authType, args.folderId),
        body,
      },
    );
  },
);

export const yandexFoundationTextEmbeddingTool = defineTool<YandexFoundationTextEmbeddingArgs, JsonObject>(
  {
    name: "yandex_foundation_text_embedding_create",
    description: "Create Yandex Cloud AI Studio text embeddings.",
    parameters: {
      type: "object",
      properties: {
        credential: { description: "Yandex IAM token/API key or Chidori memory secret reference." },
        authType: { type: "string", enum: ["bearer", "api-key"], default: "bearer" },
        folderId: { type: "string", description: "Yandex Cloud folder ID, used for model URI and optional x-folder-id header." },
        baseUrl: { type: "string", default: "https://llm.api.cloud.yandex.net" },
        modelUri: { type: "string", description: "Full Yandex embedding model URI, for example emb://folder/text-search-query/latest." },
        modelName: { type: "string", default: "text-search-query" },
        modelVersion: { type: "string", default: "latest" },
        text: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
        dim: { type: "integer" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["text"],
    },
  },
  async (args, chidori) => {
    const credential = await resolveSecret(args.credential, chidori, "Yandex credential");
    const texts = Array.isArray(args.text) ? args.text : [args.text];
    const responses: Json[] = [];
    for (const text of texts) {
      responses.push(await requestJson<JsonObject>(
        chidori,
        `${yandexBaseUrl(args.baseUrl)}/foundationModels/v1/textEmbedding`,
        {
          method: "POST",
          headers: yandexAuthHeaders(credential, args.authType, args.folderId),
          body: compactObject({
            ...(args.extraBody ?? {}),
            modelUri: yandexEmbeddingModelUri(args),
            text,
            dim: args.dim === undefined ? undefined : String(args.dim),
          }) as JsonObject,
        },
      ));
    }
    return {
      embeddings: responses.map((response) => isJsonObject(response) ? response.embedding ?? null : null),
      responses,
    };
  },
);

function isJsonObject(value: Json): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export const yandexTools = {
  completion: yandexFoundationCompletionTool,
  textEmbedding: yandexFoundationTextEmbeddingTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getYandexEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "YANDEX_CREDENTIAL", description: "Yandex API key or IAM token credential." },
  ];
}

export const yandexIntegrationSpec = {
  environmentVariables: getYandexEnvironmentVariables,
} satisfies IntegrationSpec;
