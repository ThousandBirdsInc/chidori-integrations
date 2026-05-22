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

export interface Ai21ChatCompletionsArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stop?: string[];
  tools?: JsonObject[];
  toolChoice?: Json;
  responseFormat?: JsonObject;
  extraBody?: JsonObject;
}

function ai21Url(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.ai21.com"}/${path.replace(/^\//, "")}`;
}

export const ai21ChatCompletionsTool = defineTool<Ai21ChatCompletionsArgs, JsonObject>(
  {
    name: "ai21_chat_completions_create",
    description: "Create an AI21 Jamba chat completion.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "AI21 API key or Chidori memory secret reference." },
        model: { type: "string", default: "jamba-large" },
        baseUrl: { type: "string", default: "https://api.ai21.com" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        topP: { type: "number" },
        stop: { type: "array", items: { type: "string" } },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: { description: "AI21 tool choice value." },
        responseFormat: { type: "object", additionalProperties: true },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "AI21 API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "jamba-large",
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      top_p: args.topP,
      stop: args.stop,
      tools: args.tools,
      tool_choice: args.toolChoice,
      response_format: args.responseFormat,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, ai21Url(args.baseUrl, "studio/v1/chat/completions"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const ai21Tools = {
  chatCompletions: ai21ChatCompletionsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAI21EnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "AI21_API_KEY", description: "AI21 API key." },
  ];
}

export const ai21IntegrationSpec = {
  environmentVariables: getAI21EnvironmentVariables,
} satisfies IntegrationSpec;
