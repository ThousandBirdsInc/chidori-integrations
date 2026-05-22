import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface AnthropicMessage {
  role: "user" | "assistant";
  content: string | JsonObject[];
}

export interface AnthropicMessagesArgs {
  messages: AnthropicMessage[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  tools?: JsonObject[];
  anthropicVersion?: string;
}

const defaultBaseUrl = "https://api.anthropic.com/v1";
const defaultVersion = "2023-06-01";

export const anthropicMessagesTool = defineTool<AnthropicMessagesArgs, JsonObject>(
  {
    name: "anthropic_messages_create",
    description: "Create an Anthropic Claude message.",
    parameters: {
      type: "object",
      properties: {
        messages: {
          type: "array",
          description: "Anthropic message list.",
          items: { type: "object", additionalProperties: true },
        },
        apiKey: {
          description: "Anthropic API key or Chidori memory secret reference.",
        },
        model: {
          type: "string",
          description: "Anthropic model name.",
          default: "claude-3-5-sonnet-latest",
        },
        baseUrl: {
          type: "string",
          description: "Anthropic-compatible base URL.",
        },
        system: {
          type: "string",
          description: "Optional system prompt.",
        },
        maxTokens: {
          type: "integer",
          description: "Maximum output tokens.",
          default: 1024,
        },
        temperature: {
          type: "number",
          description: "Sampling temperature.",
        },
        tools: {
          type: "array",
          description: "Anthropic tool definitions.",
          items: { type: "object", additionalProperties: true },
        },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Anthropic API key");
    const body = compactObject({
      model: args.model ?? "claude-3-5-sonnet-latest",
      messages: args.messages as unknown as Json,
      system: args.system,
      max_tokens: args.maxTokens ?? 1024,
      temperature: args.temperature,
      tools: args.tools,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/messages`, {
      method: "POST",
      headers: jsonHeaders({
        "x-api-key": apiKey,
        "anthropic-version": args.anthropicVersion ?? defaultVersion,
      }),
      body,
    });
  },
);

export const anthropicTools = {
  messagesCreate: anthropicMessagesTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAnthropicEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ANTHROPIC_API_KEY", description: "Anthropic API key." },
  ];
}

export const anthropicIntegrationSpec = {
  environmentVariables: getAnthropicEnvironmentVariables,
} satisfies IntegrationSpec;
