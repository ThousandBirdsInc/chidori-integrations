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

export interface VoyageEmbeddingsArgs {
  input: string | string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  inputType?: "query" | "document";
  truncation?: boolean;
  outputDimension?: number;
  outputDtype?: "float" | "int8" | "uint8" | "binary" | "ubinary";
  encodingFormat?: "float" | "base64" | "ubinary";
}

export interface VoyageRerankArgs {
  query: string;
  documents: string[] | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topK?: number;
  truncation?: boolean;
  returnDocuments?: boolean;
}

function voyageUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.voyageai.com"}/${path.replace(/^\//, "")}`;
}

export const voyageEmbeddingsTool = defineTool<VoyageEmbeddingsArgs, JsonObject>(
  {
    name: "voyage_embeddings_create",
    description: "Create embeddings with Voyage AI.",
    parameters: {
      type: "object",
      properties: {
        input: {
          description: "A string or array of strings to embed.",
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
        apiKey: { description: "Voyage AI API key or Chidori memory secret reference." },
        model: { type: "string", default: "voyage-3-large" },
        baseUrl: { type: "string" },
        inputType: { type: "string", enum: ["query", "document"] },
        truncation: { type: "boolean" },
        outputDimension: { type: "integer" },
        outputDtype: { type: "string", enum: ["float", "int8", "uint8", "binary", "ubinary"] },
        encodingFormat: { type: "string", enum: ["float", "base64", "ubinary"] },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Voyage AI API key");
    const body = compactObject({
      input: args.input as Json,
      model: args.model ?? "voyage-3-large",
      input_type: args.inputType,
      truncation: args.truncation,
      output_dimension: args.outputDimension,
      output_dtype: args.outputDtype,
      encoding_format: args.encodingFormat,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, voyageUrl(args.baseUrl, "v1/embeddings"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const voyageRerankTool = defineTool<VoyageRerankArgs, JsonObject>(
  {
    name: "voyage_rerank",
    description: "Rerank documents with Voyage AI.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        documents: { type: "array", items: { description: "Text or JSON document." } },
        apiKey: { description: "Voyage AI API key or Chidori memory secret reference." },
        model: { type: "string", default: "rerank-2.5" },
        baseUrl: { type: "string" },
        topK: { type: "integer" },
        truncation: { type: "boolean" },
        returnDocuments: { type: "boolean" },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Voyage AI API key");
    const body = compactObject({
      query: args.query,
      documents: args.documents as Json,
      model: args.model ?? "rerank-2.5",
      top_k: args.topK,
      truncation: args.truncation,
      return_documents: args.returnDocuments,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, voyageUrl(args.baseUrl, "v1/rerank"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const voyageTools = {
  embeddings: voyageEmbeddingsTool,
  rerank: voyageRerankTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getVoyageEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "VOYAGE_API_KEY", description: "Voyage AI API key." },
  ];
}

export const voyageIntegrationSpec = {
  environmentVariables: getVoyageEnvironmentVariables,
} satisfies IntegrationSpec;
