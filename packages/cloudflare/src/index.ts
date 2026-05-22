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

export interface CloudflareAuthArgs {
  accountId: string;
  apiToken?: SecretInput;
  baseUrl?: string;
  gatewayId?: string;
}

export interface CloudflareAiRunArgs extends CloudflareAuthArgs {
  model: string;
  provider?: string;
  input?: JsonObject;
  directModelPath?: boolean;
}

export interface CloudflareAiGatewayChatArgs extends CloudflareAuthArgs {
  model: string;
  messages: JsonObject[];
  provider?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: JsonObject[];
  extraBody?: JsonObject;
}

export interface CloudflareAiGatewayResponsesArgs extends CloudflareAuthArgs {
  input: string | JsonObject[];
  model: string;
  provider?: string;
  instructions?: string;
  maxOutputTokens?: number;
  tools?: JsonObject[];
  extraBody?: JsonObject;
}

function cloudflareBase(args: CloudflareAuthArgs): string {
  return `${args.baseUrl ?? "https://api.cloudflare.com/client/v4"}/accounts/${encodeURIComponent(args.accountId)}/ai`;
}

async function cloudflareHeaders(args: CloudflareAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.apiToken, chidori, "Cloudflare API token");
  return jsonHeaders({
    ...bearerAuth(token),
    ...(args.gatewayId ? { "cf-aig-gateway-id": args.gatewayId } : {}),
  });
}

export const cloudflareAiRunTool = defineTool<CloudflareAiRunArgs, JsonObject>(
  {
    name: "cloudflare_ai_run",
    description: "Run a Cloudflare Workers AI or AI Gateway model through the universal AI run endpoint.",
    parameters: {
      type: "object",
      properties: {
        accountId: { type: "string", description: "Cloudflare account ID." },
        apiToken: { description: "Cloudflare API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.cloudflare.com/client/v4" },
        gatewayId: { type: "string", description: "Optional AI Gateway ID." },
        model: { type: "string", description: "Cloudflare model name." },
        provider: { type: "string", description: "Optional provider override." },
        input: { type: "object", additionalProperties: true },
        directModelPath: { type: "boolean", description: "Use /ai/run/{model} instead of envelope body." },
      },
      required: ["accountId", "model"],
    },
  },
  async (args, chidori) => {
    const url = args.directModelPath
      ? `${cloudflareBase(args)}/run/${encodeURIComponent(args.model)}`
      : `${cloudflareBase(args)}/run`;
    const body = args.directModelPath
      ? args.input ?? {}
      : compactObject({
          model: args.model,
          provider: args.provider,
          input: args.input ?? {},
        }) as JsonObject;
    return requestJson<JsonObject>(chidori, url, {
      method: "POST",
      headers: await cloudflareHeaders(args, chidori),
      body,
    });
  },
);

export const cloudflareAiGatewayChatCompletionsTool = defineTool<CloudflareAiGatewayChatArgs, JsonObject>(
  {
    name: "cloudflare_ai_gateway_chat_completions_create",
    description: "Create an OpenAI-compatible chat completion through Cloudflare AI Gateway.",
    parameters: {
      type: "object",
      properties: {
        accountId: { type: "string" },
        apiToken: { description: "Cloudflare API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.cloudflare.com/client/v4" },
        gatewayId: { type: "string" },
        model: { type: "string" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        provider: { type: "string" },
        temperature: { type: "number" },
        maxTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["accountId", "model", "messages"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${cloudflareBase(args)}/v1/chat/completions`, {
      method: "POST",
      headers: await cloudflareHeaders(args, chidori),
      body: compactObject({
        ...(args.extraBody ?? {}),
        model: args.model,
        provider: args.provider,
        messages: args.messages as Json,
        temperature: args.temperature,
        max_tokens: args.maxTokens,
        tools: args.tools,
      }) as JsonObject,
    });
  },
);

export const cloudflareAiGatewayResponsesTool = defineTool<CloudflareAiGatewayResponsesArgs, JsonObject>(
  {
    name: "cloudflare_ai_gateway_responses_create",
    description: "Create an OpenAI-compatible response through Cloudflare AI Gateway.",
    parameters: {
      type: "object",
      properties: {
        accountId: { type: "string" },
        apiToken: { description: "Cloudflare API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.cloudflare.com/client/v4" },
        gatewayId: { type: "string" },
        input: { description: "Text input or OpenAI Responses API input items." },
        model: { type: "string" },
        provider: { type: "string" },
        instructions: { type: "string" },
        maxOutputTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["accountId", "input", "model"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${cloudflareBase(args)}/v1/responses`, {
      method: "POST",
      headers: await cloudflareHeaders(args, chidori),
      body: compactObject({
        ...(args.extraBody ?? {}),
        model: args.model,
        provider: args.provider,
        input: args.input as Json,
        instructions: args.instructions,
        max_output_tokens: args.maxOutputTokens,
        tools: args.tools,
      }) as JsonObject,
    });
  },
);

export const cloudflareTools = {
  aiRun: cloudflareAiRunTool,
  aiGatewayChatCompletions: cloudflareAiGatewayChatCompletionsTool,
  aiGatewayResponses: cloudflareAiGatewayResponsesTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getCloudflareEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "CLOUDFLARE_ACCOUNT_ID", description: "Cloudflare account ID." },
    { name: "CLOUDFLARE_API_TOKEN", description: "Cloudflare API token." },
    { name: "CLOUDFLARE_AI_GATEWAY_ID", description: "Optional Cloudflare AI Gateway ID." },
  ];
}

export const cloudflareIntegrationSpec = {
  environmentVariables: getCloudflareEnvironmentVariables,
} satisfies IntegrationSpec;
