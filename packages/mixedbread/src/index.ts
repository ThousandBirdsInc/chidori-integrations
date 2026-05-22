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

export interface MixedbreadRerankArgs {
  query: string;
  input: Array<string | JsonObject>;
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topK?: number;
  returnInput?: boolean;
  rankFields?: string[];
  rewriteQuery?: boolean;
  extraBody?: JsonObject;
}

function mixedbreadUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.mixedbread.com"}/${path.replace(/^\//, "")}`;
}

export const mixedbreadRerankTool = defineTool<MixedbreadRerankArgs, JsonObject>(
  {
    name: "mixedbread_rerank",
    description: "Rerank documents by relevance to a query using Mixedbread AI.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        input: { type: "array", items: { description: "Document string or JSON object to rank." } },
        apiKey: { description: "Mixedbread API key or Chidori memory secret reference." },
        model: { type: "string", default: "mixedbread-ai/mxbai-rerank-large-v2" },
        baseUrl: { type: "string" },
        topK: { type: "integer" },
        returnInput: { type: "boolean" },
        rankFields: { type: "array", items: { type: "string" } },
        rewriteQuery: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["query", "input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Mixedbread API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "mixedbread-ai/mxbai-rerank-large-v2",
      query: args.query,
      input: args.input as Json,
      top_k: args.topK,
      return_input: args.returnInput,
      rank_fields: args.rankFields,
      rewrite_query: args.rewriteQuery,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, mixedbreadUrl(args.baseUrl, "v1/reranking"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const mixedbreadTools = {
  rerank: mixedbreadRerankTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getMixedbreadEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "MIXEDBREAD_API_KEY", description: "Mixedbread API key." },
  ];
}

export const mixedbreadIntegrationSpec = {
  environmentVariables: getMixedbreadEnvironmentVariables,
} satisfies IntegrationSpec;
