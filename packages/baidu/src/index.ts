import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriRuntime,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

const DEFAULT_TOKEN_URL = "https://aip.baidubce.com/oauth/2.0/token";
const DEFAULT_QIANFAN_BASE_URL = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop";

export interface BaiduQianfanAuthArgs {
  accessToken?: SecretInput;
  apiKey?: SecretInput;
  secretKey?: SecretInput;
  tokenUrl?: string;
}

export interface BaiduQianfanAccessTokenCreateArgs {
  apiKey?: SecretInput;
  secretKey?: SecretInput;
  tokenUrl?: string;
}

export interface BaiduQianfanChatCompletionsArgs extends BaiduQianfanAuthArgs {
  messages: JsonObject[];
  model?: string;
  baseUrl?: string;
  endpoint?: string;
  temperature?: number;
  topP?: number;
  penaltyScore?: number;
  topK?: number;
  stop?: string[];
  system?: string;
  userId?: string;
  userSetting?: JsonObject;
  disableSearch?: boolean;
  enableCitation?: boolean;
  requestId?: string;
  tools?: JsonObject[];
  toolChoice?: Json;
  maxOutputTokens?: number;
  stream?: boolean;
  extraBody?: JsonObject;
}

export interface BaiduQianfanEmbeddingsArgs extends BaiduQianfanAuthArgs {
  input: string | string[];
  model?: string;
  baseUrl?: string;
  endpoint?: string;
  userId?: string;
  extraBody?: JsonObject;
}

function qianfanEndpointUrl(baseUrl: string | undefined, endpoint: string, accessToken: string): string {
  const root = (baseUrl ?? DEFAULT_QIANFAN_BASE_URL).replace(/\/+$/, "");
  const path = endpoint.replace(/^\/+/, "");
  return withQuery(`${root}/${path}`, { access_token: accessToken });
}

async function qianfanAccessToken(args: BaiduQianfanAuthArgs, chidori: ChidoriRuntime): Promise<string> {
  if (args.accessToken) {
    return resolveSecret(args.accessToken, chidori, "Baidu Qianfan access token");
  }

  const apiKey = await resolveSecret(args.apiKey, chidori, "Baidu Qianfan API key");
  const secretKey = await resolveSecret(args.secretKey, chidori, "Baidu Qianfan secret key");
  const response = await requestJson<JsonObject>(
    chidori,
    withQuery(args.tokenUrl ?? DEFAULT_TOKEN_URL, {
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: secretKey,
    }),
    { method: "POST" },
  );

  if (typeof response.access_token !== "string" || response.access_token.length === 0) {
    throw new Error("Baidu Qianfan token response did not include access_token");
  }
  return response.access_token;
}

export const baiduQianfanAccessTokenCreateTool = defineTool<BaiduQianfanAccessTokenCreateArgs, JsonObject>(
  {
    name: "baidu_qianfan_access_token_create",
    description: "Exchange a Baidu Qianfan API key and secret key for an access token.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Baidu Qianfan API key or Chidori memory secret reference." },
        secretKey: { description: "Baidu Qianfan secret key or Chidori memory secret reference." },
        tokenUrl: { type: "string", default: DEFAULT_TOKEN_URL },
      },
    },
  },
  async (args, chidori) => {
    const accessToken = await qianfanAccessToken(args, chidori);
    return { accessToken };
  },
);

export const baiduQianfanChatCompletionsTool = defineTool<BaiduQianfanChatCompletionsArgs, JsonObject>(
  {
    name: "baidu_qianfan_chat_completions_create",
    description: "Create a Baidu Qianfan chat completion.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Baidu Qianfan access token or Chidori memory secret reference." },
        apiKey: { description: "Baidu Qianfan API key, used when accessToken is not supplied." },
        secretKey: { description: "Baidu Qianfan secret key, used when accessToken is not supplied." },
        tokenUrl: { type: "string", default: DEFAULT_TOKEN_URL },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        model: { type: "string" },
        baseUrl: { type: "string", default: DEFAULT_QIANFAN_BASE_URL },
        endpoint: { type: "string", default: "chat/completions" },
        temperature: { type: "number" },
        topP: { type: "number" },
        penaltyScore: { type: "number" },
        topK: { type: "integer" },
        stop: { type: "array", items: { type: "string" } },
        system: { type: "string" },
        userId: { type: "string" },
        userSetting: { type: "object", additionalProperties: true },
        disableSearch: { type: "boolean" },
        enableCitation: { type: "boolean" },
        requestId: { type: "string" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: { description: "Baidu Qianfan tool choice value." },
        maxOutputTokens: { type: "integer" },
        stream: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    const accessToken = await qianfanAccessToken(args, chidori);
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model,
      messages: args.messages as Json,
      temperature: args.temperature,
      top_p: args.topP,
      penalty_score: args.penaltyScore,
      top_k: args.topK,
      stop: args.stop,
      system: args.system,
      user_id: args.userId,
      user_setting: args.userSetting,
      disable_search: args.disableSearch,
      enable_citation: args.enableCitation,
      request_id: args.requestId,
      tools: args.tools,
      tool_choice: args.toolChoice,
      max_output_tokens: args.maxOutputTokens,
      stream: args.stream,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      qianfanEndpointUrl(args.baseUrl, args.endpoint ?? "chat/completions", accessToken),
      {
        method: "POST",
        headers: jsonHeaders(),
        body,
      },
    );
  },
);

export const baiduQianfanEmbeddingsTool = defineTool<BaiduQianfanEmbeddingsArgs, JsonObject>(
  {
    name: "baidu_qianfan_embeddings_create",
    description: "Create Baidu Qianfan embeddings.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Baidu Qianfan access token or Chidori memory secret reference." },
        apiKey: { description: "Baidu Qianfan API key, used when accessToken is not supplied." },
        secretKey: { description: "Baidu Qianfan secret key, used when accessToken is not supplied." },
        tokenUrl: { type: "string", default: DEFAULT_TOKEN_URL },
        input: {
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
        model: { type: "string" },
        baseUrl: { type: "string", default: DEFAULT_QIANFAN_BASE_URL },
        endpoint: { type: "string", default: "embeddings/embedding-v1" },
        userId: { type: "string" },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const accessToken = await qianfanAccessToken(args, chidori);
    const body = compactObject({
      ...(args.extraBody ?? {}),
      input: Array.isArray(args.input) ? args.input : [args.input],
      model: args.model,
      user_id: args.userId,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      qianfanEndpointUrl(args.baseUrl, args.endpoint ?? "embeddings/embedding-v1", accessToken),
      {
        method: "POST",
        headers: jsonHeaders(),
        body,
      },
    );
  },
);

export const baiduQianfanTools = {
  accessTokenCreate: baiduQianfanAccessTokenCreateTool,
  chatCompletions: baiduQianfanChatCompletionsTool,
  embeddings: baiduQianfanEmbeddingsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getBaiduQianfanEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "BAIDU_QIANFAN_ACCESS_TOKEN", description: "Baidu Qianfan access token." },
    { name: "BAIDU_QIANFAN_API_KEY", description: "Baidu Qianfan API key." },
    { name: "BAIDU_QIANFAN_SECRET_KEY", description: "Baidu Qianfan secret key." },
  ];
}

export const baiduQianfanIntegrationSpec = {
  environmentVariables: getBaiduQianfanEnvironmentVariables,
} satisfies IntegrationSpec;
