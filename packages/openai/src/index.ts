import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type ChidoriRuntime,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface OpenAIResponsesArgs {
  input: string | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  instructions?: string;
  temperature?: number;
  maxOutputTokens?: number;
  metadata?: JsonObject;
}

export interface OpenAIEmbeddingsArgs {
  input: string | string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  dimensions?: number;
  user?: string;
}

export interface OpenAIImagesGenerateArgs {
  prompt: string;
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  n?: number;
  size?: "1024x1024" | "1536x1024" | "1024x1536" | "256x256" | "512x512" | "1792x1024" | "1024x1792" | "auto";
  quality?: "low" | "medium" | "high" | "standard" | "hd" | "auto";
  background?: "transparent" | "opaque" | "auto";
  outputFormat?: "png" | "jpeg" | "webp";
  outputCompression?: number;
  responseFormat?: "url" | "b64_json";
  style?: "vivid" | "natural";
  user?: string;
  moderation?: "low" | "auto";
}

const defaultBaseUrl = "https://api.openai.com/v1";

export const openAIResponsesTool = defineTool<OpenAIResponsesArgs, JsonObject>(
  {
    name: "openai_responses_create",
    description: "Create an OpenAI response for text or message input.",
    parameters: {
      type: "object",
      properties: {
        input: {
          description: "Text input or OpenAI Responses API input items.",
        },
        apiKey: {
          description: "OpenAI API key or Chidori memory secret reference.",
        },
        model: {
          type: "string",
          description: "OpenAI model name.",
          default: "gpt-4.1-mini",
        },
        baseUrl: {
          type: "string",
          description: "OpenAI-compatible base URL.",
        },
        instructions: {
          type: "string",
          description: "Optional system or developer instructions.",
        },
        temperature: {
          type: "number",
          description: "Sampling temperature.",
        },
        maxOutputTokens: {
          type: "integer",
          description: "Maximum output tokens.",
        },
        metadata: {
          type: "object",
          description: "Provider metadata.",
          additionalProperties: true,
        },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenAI API key");
    const body = compactObject({
      model: args.model ?? "gpt-4.1-mini",
      input: args.input as Json,
      instructions: args.instructions,
      temperature: args.temperature,
      max_output_tokens: args.maxOutputTokens,
      metadata: args.metadata,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/responses`, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const openAIEmbeddingsTool = defineTool<OpenAIEmbeddingsArgs, JsonObject>(
  {
    name: "openai_embeddings_create",
    description: "Create OpenAI embeddings for text input.",
    parameters: {
      type: "object",
      properties: {
        input: {
          description: "Text or text array to embed.",
        },
        apiKey: {
          description: "OpenAI API key or Chidori memory secret reference.",
        },
        model: {
          type: "string",
          description: "Embedding model.",
          default: "text-embedding-3-small",
        },
        baseUrl: {
          type: "string",
          description: "OpenAI-compatible base URL.",
        },
        dimensions: {
          type: "integer",
          description: "Optional embedding dimension count for supported models.",
        },
        user: {
          type: "string",
          description: "Stable end-user identifier.",
        },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenAI API key");
    const body = compactObject({
      model: args.model ?? "text-embedding-3-small",
      input: args.input,
      dimensions: args.dimensions,
      user: args.user,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/embeddings`, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const openAIImagesGenerateTool = defineTool<OpenAIImagesGenerateArgs, JsonObject>(
  {
    name: "openai_images_generate",
    description: "Generate images with OpenAI Image API models such as GPT Image and DALL-E.",
    parameters: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Image generation prompt.",
        },
        apiKey: {
          description: "OpenAI API key or Chidori memory secret reference.",
        },
        model: {
          type: "string",
          description: "Image model name.",
          default: "gpt-image-1",
        },
        baseUrl: {
          type: "string",
          description: "OpenAI-compatible base URL.",
        },
        n: {
          type: "integer",
          description: "Number of images to generate.",
          default: 1,
        },
        size: {
          type: "string",
          enum: ["1024x1024", "1536x1024", "1024x1536", "256x256", "512x512", "1792x1024", "1024x1792", "auto"],
          default: "1024x1024",
        },
        quality: {
          type: "string",
          enum: ["low", "medium", "high", "standard", "hd", "auto"],
        },
        background: {
          type: "string",
          enum: ["transparent", "opaque", "auto"],
        },
        outputFormat: {
          type: "string",
          enum: ["png", "jpeg", "webp"],
        },
        outputCompression: {
          type: "integer",
          description: "Compression level for supported output formats.",
        },
        responseFormat: {
          type: "string",
          enum: ["url", "b64_json"],
          description: "DALL-E response format for models that support it.",
        },
        style: {
          type: "string",
          enum: ["vivid", "natural"],
          description: "DALL-E 3 style.",
        },
        user: {
          type: "string",
          description: "Stable end-user identifier.",
        },
        moderation: {
          type: "string",
          enum: ["low", "auto"],
        },
      },
      required: ["prompt"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenAI API key");
    const body = compactObject({
      model: args.model ?? "gpt-image-1",
      prompt: args.prompt,
      n: args.n ?? 1,
      size: args.size ?? "1024x1024",
      quality: args.quality,
      background: args.background,
      output_format: args.outputFormat,
      output_compression: args.outputCompression,
      response_format: args.responseFormat,
      style: args.style,
      user: args.user,
      moderation: args.moderation,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/images/generations`, {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const openAITools = {
  responsesCreate: openAIResponsesTool,
  embeddingsCreate: openAIEmbeddingsTool,
  imagesGenerate: openAIImagesGenerateTool,
};

export async function createOpenAIEmbedding(
  input: string | string[],
  chidori: ChidoriRuntime,
  options: Omit<OpenAIEmbeddingsArgs, "input"> = {},
): Promise<JsonObject> {
  return openAIEmbeddingsTool.run({ ...options, input }, chidori);
}

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getOpenAIEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "OPENAI_API_KEY", description: "OpenAI API key." },
  ];
}

export const openAIIntegrationSpec = {
  environmentVariables: getOpenAIEnvironmentVariables,
} satisfies IntegrationSpec;
