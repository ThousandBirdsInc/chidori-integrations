import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface NomicTextEmbeddingsArgs {
  texts: string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  taskType?: "search_document" | "search_query" | "classification" | "clustering";
  dimensionality?: number;
  extraBody?: JsonObject;
}

function nomicUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api-atlas.nomic.ai"}/${path.replace(/^\//, "")}`;
}

export const nomicTextEmbeddingsTool = defineTool<NomicTextEmbeddingsArgs, JsonObject>(
  {
    name: "nomic_text_embeddings_create",
    description: "Create text embeddings with the Nomic Atlas Embedding API.",
    parameters: {
      type: "object",
      properties: {
        texts: { type: "array", items: { type: "string" } },
        apiKey: { description: "Nomic API key or Chidori memory secret reference." },
        model: { type: "string", default: "nomic-embed-text-v1.5" },
        baseUrl: { type: "string", default: "https://api-atlas.nomic.ai" },
        taskType: {
          type: "string",
          enum: ["search_document", "search_query", "classification", "clustering"],
        },
        dimensionality: { type: "integer", description: "Output dimensionality for Matryoshka-capable models." },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["texts"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Nomic API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "nomic-embed-text-v1.5",
      texts: args.texts,
      task_type: args.taskType,
      dimensionality: args.dimensionality,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, nomicUrl(args.baseUrl, "v1/embedding/text"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const nomicTools = {
  textEmbeddings: nomicTextEmbeddingsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getNomicEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "NOMIC_API_KEY", description: "Nomic API key." },
  ];
}

export const nomicIntegrationSpec = {
  environmentVariables: getNomicEnvironmentVariables,
} satisfies IntegrationSpec;
