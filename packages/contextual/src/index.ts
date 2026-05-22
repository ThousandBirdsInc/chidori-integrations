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

export interface ContextualRerankArgs {
  query: string;
  documents: string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topN?: number;
  instruction?: string;
  metadata?: string[];
  extraBody?: JsonObject;
}

function contextualUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.contextual.ai/v1"}/${path.replace(/^\//, "")}`;
}

export const contextualRerankTool = defineTool<ContextualRerankArgs, JsonObject>(
  {
    name: "contextual_rerank",
    description: "Rerank documents with Contextual AI's instruction-following reranker.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        documents: { type: "array", items: { type: "string" } },
        apiKey: { description: "Contextual AI API key or Chidori memory secret reference." },
        model: { type: "string", default: "ctxl-rerank-v2-instruct-multilingual" },
        baseUrl: { type: "string" },
        topN: { type: "integer" },
        instruction: { type: "string" },
        metadata: { type: "array", items: { type: "string" } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Contextual AI API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      query: args.query,
      documents: args.documents,
      model: args.model ?? "ctxl-rerank-v2-instruct-multilingual",
      top_n: args.topN,
      instruction: args.instruction,
      metadata: args.metadata,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, contextualUrl(args.baseUrl, "rerank"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const contextualTools = {
  rerank: contextualRerankTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getContextualEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "CONTEXTUAL_API_KEY", description: "Contextual AI API key." },
  ];
}

export const contextualIntegrationSpec = {
  environmentVariables: getContextualEnvironmentVariables,
} satisfies IntegrationSpec;
