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

export interface MistralChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
  stream?: boolean;
}

export interface MistralEmbeddingsArgs {
  input: string | string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
}

function mistralUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.mistral.ai"}/${path.replace(/^\//, "")}`;
}

export const mistralChatCompletionsTool = defineTool<MistralChatArgs, JsonObject>(
  {
    name: "mistral_chat_completions_create",
    description: "Create a Mistral chat completion.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Mistral API key or Chidori memory secret reference." },
        model: { type: "string", default: "mistral-small-latest" },
        baseUrl: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        stream: { type: "boolean" },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Mistral API key");
    const body = compactObject({
      model: args.model ?? "mistral-small-latest",
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      tools: args.tools,
      stream: args.stream,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, mistralUrl(args.baseUrl, "v1/chat/completions"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const mistralEmbeddingsTool = defineTool<MistralEmbeddingsArgs, JsonObject>(
  {
    name: "mistral_embeddings_create",
    description: "Create Mistral embeddings.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text or text array to embed." },
        apiKey: { description: "Mistral API key or Chidori memory secret reference." },
        model: { type: "string", default: "mistral-embed" },
        baseUrl: { type: "string" },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Mistral API key");
    const body = compactObject({
      model: args.model ?? "mistral-embed",
      input: args.input,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, mistralUrl(args.baseUrl, "v1/embeddings"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const mistralTools = {
  chatCompletions: mistralChatCompletionsTool,
  embeddings: mistralEmbeddingsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getMistralEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "MISTRAL_API_KEY", description: "Mistral API key." },
  ];
}

export const mistralIntegrationSpec = {
  environmentVariables: getMistralEnvironmentVariables,
} satisfies IntegrationSpec;
