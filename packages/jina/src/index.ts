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

export interface JinaEmbeddingsArgs {
  input: string | string[] | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  task?: "retrieval.query" | "retrieval.passage" | "text-matching" | "code.query" | "code.passage";
  dimensions?: number;
  embeddingType?: string | string[];
  lateChunking?: boolean;
  truncate?: boolean;
  returnMultivector?: boolean;
  extraBody?: JsonObject;
}

export interface JinaRerankArgs {
  query: string;
  documents: string[] | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topN?: number;
  returnDocuments?: boolean;
  maxChunksPerDoc?: number;
  extraBody?: JsonObject;
}

function jinaUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.jina.ai"}/${path.replace(/^\//, "")}`;
}

export const jinaEmbeddingsTool = defineTool<JinaEmbeddingsArgs, JsonObject>(
  {
    name: "jina_embeddings_create",
    description: "Create embeddings with Jina AI.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text, text array, or multimodal input objects to embed." },
        apiKey: { description: "Jina API key or Chidori memory secret reference." },
        model: { type: "string", default: "jina-embeddings-v4" },
        baseUrl: { type: "string" },
        task: {
          type: "string",
          enum: ["retrieval.query", "retrieval.passage", "text-matching", "code.query", "code.passage"],
        },
        dimensions: { type: "integer" },
        embeddingType: {
          description: "Embedding format, such as float, base64, binary, or ubinary. Jina also accepts arrays.",
        },
        lateChunking: { type: "boolean" },
        truncate: { type: "boolean" },
        returnMultivector: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Jina API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "jina-embeddings-v4",
      input: args.input as Json,
      task: args.task,
      dimensions: args.dimensions,
      embedding_type: args.embeddingType as Json | undefined,
      late_chunking: args.lateChunking,
      truncate: args.truncate,
      return_multivector: args.returnMultivector,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, jinaUrl(args.baseUrl, "v1/embeddings"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const jinaRerankTool = defineTool<JinaRerankArgs, JsonObject>(
  {
    name: "jina_rerank",
    description: "Rerank documents with Jina AI.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        documents: { type: "array", items: { description: "Text or JSON document." } },
        apiKey: { description: "Jina API key or Chidori memory secret reference." },
        model: { type: "string", default: "jina-reranker-v2-base-multilingual" },
        baseUrl: { type: "string" },
        topN: { type: "integer" },
        returnDocuments: { type: "boolean" },
        maxChunksPerDoc: { type: "integer" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Jina API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "jina-reranker-v2-base-multilingual",
      query: args.query,
      documents: args.documents as Json,
      top_n: args.topN,
      return_documents: args.returnDocuments,
      max_chunks_per_doc: args.maxChunksPerDoc,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, jinaUrl(args.baseUrl, "v1/rerank"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const jinaTools = {
  embeddings: jinaEmbeddingsTool,
  rerank: jinaRerankTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getJinaEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "JINA_API_KEY", description: "Jina API key." },
  ];
}

export const jinaIntegrationSpec = {
  environmentVariables: getJinaEnvironmentVariables,
} satisfies IntegrationSpec;
