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

export interface AlephAlphaBaseArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  hosting?: "aleph-alpha";
  nice?: boolean;
  tags?: string[];
  timeoutMs?: number;
}

export interface AlephAlphaCompletionArgs extends AlephAlphaBaseArgs {
  model: string;
  prompt?: string | JsonObject[];
  maximumTokens?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  n?: number;
  stopSequences?: string[];
  rawCompletion?: boolean;
  extraBody?: JsonObject;
}

export interface AlephAlphaChatArgs extends AlephAlphaBaseArgs {
  model: string;
  messages: JsonObject[];
  maximumTokens?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  streamOptions?: JsonObject;
  steeringConcepts?: string[];
  responseFormat?: JsonObject;
  tools?: JsonObject[];
  toolChoice?: "auto" | "required" | "none" | JsonObject;
  parallelToolCalls?: boolean;
  extraBody?: JsonObject;
}

export interface AlephAlphaEmbeddingsArgs extends AlephAlphaBaseArgs {
  model: string;
  input: string | string[] | number[] | number[][];
  dimensions?: number;
  encodingFormat?: "float" | "base64";
  extraBody?: JsonObject;
}

function alephAlphaUrl(baseUrl: string | undefined, path: string, nice?: boolean): string {
  return withQuery(`${(baseUrl ?? "https://api.aleph-alpha.com").replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`, {
    nice: nice ? "true" : undefined,
  });
}

function alephAlphaPrompt(prompt: string | JsonObject[] | undefined): Json {
  if (Array.isArray(prompt)) {
    return prompt as Json;
  }
  return [{ type: "text", data: prompt ?? "" }];
}

async function alephAlphaHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders(bearerAuth(await resolveSecret(apiKey, chidori, "Aleph Alpha API key")));
}

export const alephAlphaCompleteTool = defineTool<AlephAlphaCompletionArgs, JsonObject>(
  {
    name: "aleph_alpha_complete",
    description: "Generate a text completion with Aleph Alpha / Pharia inference.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Aleph Alpha API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.aleph-alpha.com" },
        model: { type: "string", description: "Aleph Alpha model name, for example pharia-1-llm-7b-control." },
        prompt: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "object", additionalProperties: true } },
          ],
          description: "Prompt text or Aleph Alpha prompt items.",
        },
        maximumTokens: { type: "integer" },
        temperature: { type: "number" },
        topK: { type: "integer" },
        topP: { type: "number" },
        n: { type: "integer" },
        stopSequences: { type: "array", items: { type: "string" } },
        rawCompletion: { type: "boolean" },
        hosting: { type: "string", enum: ["aleph-alpha"] },
        nice: { type: "boolean", default: false },
        tags: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "integer" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["model"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      alephAlphaUrl(args.baseUrl, "complete", args.nice),
      compactObject({
        method: "POST",
        headers: await alephAlphaHeaders(args.apiKey, chidori),
        body: compactObject({
          ...(args.extraBody ?? {}),
          model: args.model,
          prompt: alephAlphaPrompt(args.prompt),
          maximum_tokens: args.maximumTokens,
          temperature: args.temperature,
          top_k: args.topK,
          top_p: args.topP,
          n: args.n,
          stop_sequences: args.stopSequences,
          raw_completion: args.rawCompletion,
          hosting: args.hosting,
          tags: args.tags,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const alephAlphaChatTool = defineTool<AlephAlphaChatArgs, JsonObject>(
  {
    name: "aleph_alpha_chat",
    description: "Create a chat response with Aleph Alpha / Pharia inference.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Aleph Alpha API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.aleph-alpha.com" },
        model: { type: "string" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        maximumTokens: { type: "integer" },
        temperature: { type: "number" },
        topK: { type: "integer" },
        topP: { type: "number" },
        streamOptions: { type: "object", additionalProperties: true },
        steeringConcepts: { type: "array", items: { type: "string" } },
        responseFormat: { type: "object", additionalProperties: true },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: { description: "auto, required, none, or a provider-specific tool choice object." },
        parallelToolCalls: { type: "boolean" },
        hosting: { type: "string", enum: ["aleph-alpha"] },
        nice: { type: "boolean", default: false },
        tags: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "integer" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["model", "messages"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      alephAlphaUrl(args.baseUrl, "chat", args.nice),
      compactObject({
        method: "POST",
        headers: await alephAlphaHeaders(args.apiKey, chidori),
        body: compactObject({
          ...(args.extraBody ?? {}),
          model: args.model,
          messages: args.messages as Json,
          maximum_tokens: args.maximumTokens,
          temperature: args.temperature,
          top_k: args.topK,
          top_p: args.topP,
          stream_options: args.streamOptions,
          steering_concepts: args.steeringConcepts,
          response_format: args.responseFormat,
          tools: args.tools,
          tool_choice: args.toolChoice as Json | undefined,
          parallel_tool_calls: args.parallelToolCalls,
          hosting: args.hosting,
          tags: args.tags,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const alephAlphaEmbeddingsTool = defineTool<AlephAlphaEmbeddingsArgs, JsonObject>(
  {
    name: "aleph_alpha_embeddings",
    description: "Create OpenAI-compatible embeddings with Aleph Alpha / Pharia inference.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Aleph Alpha API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.aleph-alpha.com" },
        model: { type: "string" },
        input: {
          oneOf: [
            { type: "string" },
            { type: "array" },
          ],
        },
        dimensions: { type: "integer" },
        encodingFormat: { type: "string", enum: ["float", "base64"] },
        hosting: { type: "string", enum: ["aleph-alpha"] },
        nice: { type: "boolean", default: false },
        tags: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "integer" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["model", "input"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      alephAlphaUrl(args.baseUrl, "embeddings", args.nice),
      compactObject({
        method: "POST",
        headers: await alephAlphaHeaders(args.apiKey, chidori),
        body: compactObject({
          ...(args.extraBody ?? {}),
          model: args.model,
          input: args.input as Json,
          dimensions: args.dimensions,
          encoding_format: args.encodingFormat,
          hosting: args.hosting,
          tags: args.tags,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const alephAlphaTools = {
  complete: alephAlphaCompleteTool,
  chat: alephAlphaChatTool,
  embeddings: alephAlphaEmbeddingsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAlephAlphaEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ALEPH_ALPHA_API_KEY", description: "Aleph Alpha API key." },
  ];
}

export const alephAlphaIntegrationSpec = {
  environmentVariables: getAlephAlphaEnvironmentVariables,
} satisfies IntegrationSpec;
