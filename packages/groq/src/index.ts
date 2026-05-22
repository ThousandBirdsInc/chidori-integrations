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

export interface GroqChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
}

export const groqChatCompletionsTool = defineTool<GroqChatArgs, JsonObject>(
  {
    name: "groq_chat_completions_create",
    description: "Create a Groq chat completion.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Groq API key or Chidori memory secret reference." },
        model: { type: "string", default: "llama-3.1-8b-instant" },
        baseUrl: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Groq API key");
    const body = compactObject({
      model: args.model ?? "llama-3.1-8b-instant",
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://api.groq.com/openai/v1"}/chat/completions`, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const groqTools = {
  chatCompletions: groqChatCompletionsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getGroqEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "GROQ_API_KEY", description: "Groq API key." },
  ];
}

export const groqIntegrationSpec = {
  environmentVariables: getGroqEnvironmentVariables,
} satisfies IntegrationSpec;
