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

export interface OpenRouterChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
  siteUrl?: string;
  appName?: string;
}

export const openRouterChatCompletionsTool = defineTool<OpenRouterChatArgs, JsonObject>(
  {
    name: "openrouter_chat_completions_create",
    description: "Create a chat completion with OpenRouter.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "OpenRouter API key or Chidori memory secret reference." },
        model: { type: "string", description: "OpenRouter model slug." },
        baseUrl: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        siteUrl: { type: "string", description: "Optional HTTP-Referer attribution." },
        appName: { type: "string", description: "Optional X-Title attribution." },
      },
      required: ["messages", "model"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenRouter API key");
    const headers = jsonHeaders({
      ...bearerAuth(apiKey),
      ...(args.siteUrl ? { "HTTP-Referer": args.siteUrl } : {}),
      ...(args.appName ? { "X-Title": args.appName } : {}),
    });
    const body = compactObject({
      model: args.model,
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      tools: args.tools,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://openrouter.ai/api/v1"}/chat/completions`, {
      method: "POST",
      headers,
      body,
    });
  },
);

export const openRouterTools = {
  chatCompletions: openRouterChatCompletionsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getOpenRouterEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "OPENROUTER_API_KEY", description: "OpenRouter API key." },
  ];
}

export const openRouterIntegrationSpec = {
  environmentVariables: getOpenRouterEnvironmentVariables,
} satisfies IntegrationSpec;
