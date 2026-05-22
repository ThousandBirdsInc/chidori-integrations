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

export interface CohereChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
}

export interface CohereEmbedArgs {
  texts: string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  inputType?: "search_document" | "search_query" | "classification" | "clustering";
  embeddingTypes?: string[];
}

export interface CohereRerankArgs {
  query: string;
  documents: string[] | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topN?: number;
  returnDocuments?: boolean;
}

function cohereUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.cohere.com"}/${path.replace(/^\//, "")}`;
}

export const cohereChatTool = defineTool<CohereChatArgs, JsonObject>(
  {
    name: "cohere_chat_create",
    description: "Create a Cohere chat response.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Cohere API key or Chidori memory secret reference." },
        model: { type: "string", default: "command-r-plus" },
        baseUrl: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Cohere API key");
    const body = compactObject({
      model: args.model ?? "command-r-plus",
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, cohereUrl(args.baseUrl, "v2/chat"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const cohereEmbedTool = defineTool<CohereEmbedArgs, JsonObject>(
  {
    name: "cohere_embed",
    description: "Create Cohere embeddings.",
    parameters: {
      type: "object",
      properties: {
        texts: { type: "array", items: { type: "string" } },
        apiKey: { description: "Cohere API key or Chidori memory secret reference." },
        model: { type: "string", default: "embed-v4.0" },
        baseUrl: { type: "string" },
        inputType: { type: "string" },
        embeddingTypes: { type: "array", items: { type: "string" } },
      },
      required: ["texts"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Cohere API key");
    const body = compactObject({
      model: args.model ?? "embed-v4.0",
      texts: args.texts,
      input_type: args.inputType,
      embedding_types: args.embeddingTypes,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, cohereUrl(args.baseUrl, "v2/embed"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const cohereRerankTool = defineTool<CohereRerankArgs, JsonObject>(
  {
    name: "cohere_rerank",
    description: "Rerank documents with Cohere.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        documents: { type: "array", items: { description: "Text or JSON document." } },
        apiKey: { description: "Cohere API key or Chidori memory secret reference." },
        model: { type: "string", default: "rerank-v3.5" },
        baseUrl: { type: "string" },
        topN: { type: "integer" },
        returnDocuments: { type: "boolean" },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Cohere API key");
    const body = compactObject({
      model: args.model ?? "rerank-v3.5",
      query: args.query,
      documents: args.documents as Json,
      top_n: args.topN,
      return_documents: args.returnDocuments,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, cohereUrl(args.baseUrl, "v2/rerank"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const cohereTools = {
  chat: cohereChatTool,
  embed: cohereEmbedTool,
  rerank: cohereRerankTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getCohereEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "COHERE_API_KEY", description: "Cohere API key." },
  ];
}

export const cohereIntegrationSpec = {
  environmentVariables: getCohereEnvironmentVariables,
} satisfies IntegrationSpec;
