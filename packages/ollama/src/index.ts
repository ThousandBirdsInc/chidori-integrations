import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  type Json,
  type JsonObject,
} from "@chidori/integrations-core";

export interface OllamaChatArgs {
  messages: JsonObject[];
  model: string;
  baseUrl?: string;
  options?: JsonObject;
  format?: JsonObject | string;
  keepAlive?: string;
}

export interface OllamaGenerateArgs {
  prompt: string;
  model: string;
  baseUrl?: string;
  system?: string;
  template?: string;
  context?: number[];
  options?: JsonObject;
  format?: JsonObject | string;
  keepAlive?: string;
}

export interface OllamaEmbedArgs {
  input: string | string[];
  model: string;
  baseUrl?: string;
  truncate?: boolean;
  options?: JsonObject;
  keepAlive?: string;
}

function ollamaUrl(baseUrl: string | undefined, path: string): string {
  return `${baseUrl ?? "http://localhost:11434"}/${path.replace(/^\//, "")}`;
}

export const ollamaChatTool = defineTool<OllamaChatArgs, JsonObject>(
  {
    name: "ollama_chat",
    description: "Create a local Ollama chat response.",
    parameters: {
      type: "object",
      properties: {
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        model: { type: "string" },
        baseUrl: { type: "string", default: "http://localhost:11434" },
        options: { type: "object", additionalProperties: true },
        format: { description: "Ollama response format." },
        keepAlive: { type: "string" },
      },
      required: ["messages", "model"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      model: args.model,
      messages: args.messages as Json,
      stream: false,
      options: args.options,
      format: args.format as Json | undefined,
      keep_alive: args.keepAlive,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, ollamaUrl(args.baseUrl, "api/chat"), {
      method: "POST",
      headers: jsonHeaders(),
      body,
    });
  },
);

export const ollamaGenerateTool = defineTool<OllamaGenerateArgs, JsonObject>(
  {
    name: "ollama_generate",
    description: "Generate text with a local Ollama model.",
    parameters: {
      type: "object",
      properties: {
        prompt: { type: "string" },
        model: { type: "string" },
        baseUrl: { type: "string", default: "http://localhost:11434" },
        system: { type: "string" },
        template: { type: "string" },
        context: { type: "array", items: { type: "integer" } },
        options: { type: "object", additionalProperties: true },
        format: { description: "Ollama response format." },
        keepAlive: { type: "string" },
      },
      required: ["prompt", "model"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      model: args.model,
      prompt: args.prompt,
      stream: false,
      system: args.system,
      template: args.template,
      context: args.context,
      options: args.options,
      format: args.format as Json | undefined,
      keep_alive: args.keepAlive,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, ollamaUrl(args.baseUrl, "api/generate"), {
      method: "POST",
      headers: jsonHeaders(),
      body,
    });
  },
);

export const ollamaEmbedTool = defineTool<OllamaEmbedArgs, JsonObject>(
  {
    name: "ollama_embed",
    description: "Create embeddings with a local Ollama model.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text or text array to embed." },
        model: { type: "string" },
        baseUrl: { type: "string", default: "http://localhost:11434" },
        truncate: { type: "boolean" },
        options: { type: "object", additionalProperties: true },
        keepAlive: { type: "string" },
      },
      required: ["input", "model"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      model: args.model,
      input: args.input,
      truncate: args.truncate,
      options: args.options,
      keep_alive: args.keepAlive,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, ollamaUrl(args.baseUrl, "api/embed"), {
      method: "POST",
      headers: jsonHeaders(),
      body,
    });
  },
);

export const ollamaTools = {
  chat: ollamaChatTool,
  generate: ollamaGenerateTool,
  embed: ollamaEmbedTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getOllamaEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "OLLAMA_BASE_URL", description: "Ollama server base URL." },
  ];
}

export const ollamaIntegrationSpec = {
  environmentVariables: getOllamaEnvironmentVariables,
} satisfies IntegrationSpec;
