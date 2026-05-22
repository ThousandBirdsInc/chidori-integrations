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

export interface WriterChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stop?: string[];
  stream?: boolean;
  tools?: JsonObject[];
  toolChoice?: Json;
  responseFormat?: JsonObject;
  extraBody?: JsonObject;
}

function writerUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "https://api.writer.com/v1"}/${path.replace(/^\//, "")}`;
}

export const writerChatTool = defineTool<WriterChatArgs, JsonObject>(
  {
    name: "writer_chat_create",
    description: "Create a Writer AI Studio chat completion.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Writer API key or Chidori memory secret reference." },
        model: { type: "string", default: "palmyra-x5" },
        baseUrl: { type: "string", default: "https://api.writer.com/v1" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        topP: { type: "number" },
        stop: { type: "array", items: { type: "string" } },
        stream: { type: "boolean" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: { description: "Writer tool choice value." },
        responseFormat: { type: "object", additionalProperties: true },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Writer API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "palmyra-x5",
      messages: args.messages as Json,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      top_p: args.topP,
      stop: args.stop,
      stream: args.stream,
      tools: args.tools,
      tool_choice: args.toolChoice,
      response_format: args.responseFormat,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, writerUrl(args.baseUrl, "chat"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const writerTools = {
  chat: writerChatTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getWriterEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "WRITER_API_KEY", description: "Writer API key." },
  ];
}

export const writerIntegrationSpec = {
  environmentVariables: getWriterEnvironmentVariables,
} satisfies IntegrationSpec;
