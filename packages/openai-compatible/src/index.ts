import {
  bearerAuth,
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

export interface CompatibleChatArgs {
  messages: JsonObject[];
  apiKey?: SecretInput;
  model: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  tools?: JsonObject[];
  toolChoice?: Json;
  responseFormat?: JsonObject;
  extraBody?: JsonObject;
}

export interface CompatibleEmbeddingsArgs {
  input: string | string[];
  apiKey?: SecretInput;
  model: string;
  baseUrl?: string;
  dimensions?: number;
  extraBody?: JsonObject;
}

export interface CompatibleResponsesArgs {
  input: string | JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  instructions?: string;
  maxOutputTokens?: number;
  tools?: JsonObject[];
  extraBody?: JsonObject;
}

export interface CompatibleCompletionsArgs {
  prompt: string | string[];
  apiKey?: SecretInput;
  model: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stop?: string | string[];
  stream?: boolean;
  extraBody?: JsonObject;
}

export interface CompatibleRerankArgs {
  query: string;
  documents: Array<string | JsonObject>;
  apiKey?: SecretInput;
  model: string;
  baseUrl?: string;
  topN?: number;
  returnDocuments?: boolean;
  rankFields?: string[];
  extraBody?: JsonObject;
}

export interface MiniMaxEmbeddingsArgs {
  texts: string[];
  apiKey?: SecretInput;
  groupId?: SecretInput;
  model?: string;
  baseUrl?: string;
  type?: "db" | "query";
  stripNewLines?: boolean;
  batchSize?: number;
  extraBody?: JsonObject;
}

export interface HuggingFaceEmbeddingsArgs {
  input: string | string[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  endpointUrl?: string;
  providerSegment?: string;
  normalize?: boolean;
  promptName?: string;
  truncate?: boolean;
  truncationDirection?: "left" | "right";
  extraBody?: JsonObject;
}

export interface PremAiEmbeddingsArgs extends CompatibleEmbeddingsArgs {
  projectId: string | number;
}

export interface GitHubModelsChatArgs extends CompatibleChatArgs {
  apiVersion?: string;
}

export interface GitHubModelsEmbeddingsArgs extends CompatibleEmbeddingsArgs {
  apiVersion?: string;
}

async function chatCompletions(
  provider: string,
  defaultBaseUrl: string,
  args: CompatibleChatArgs,
  chidori: ChidoriRuntime,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, `${provider} API key`);
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    messages: args.messages as Json,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    top_p: args.topP,
    tools: args.tools,
    tool_choice: args.toolChoice,
    response_format: args.responseFormat,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/chat/completions`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

function githubModelsHeaders(apiKey: string, apiVersion?: string): Record<string, string> {
  return jsonHeaders({
    ...bearerAuth(apiKey),
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": apiVersion ?? "2026-03-10",
  });
}

async function githubModelsChatCompletions(args: GitHubModelsChatArgs, chidori: ChidoriRuntime): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "GitHub Models token");
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    messages: args.messages as Json,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    top_p: args.topP,
    tools: args.tools,
    tool_choice: args.toolChoice,
    response_format: args.responseFormat,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://models.github.ai/inference"}/chat/completions`, {
    method: "POST",
    headers: githubModelsHeaders(apiKey, args.apiVersion),
    body,
  });
}

async function githubModelsEmbeddings(args: GitHubModelsEmbeddingsArgs, chidori: ChidoriRuntime): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "GitHub Models token");
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    input: args.input,
    dimensions: args.dimensions,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://models.github.ai/inference"}/embeddings`, {
    method: "POST",
    headers: githubModelsHeaders(apiKey, args.apiVersion),
    body,
  });
}

async function completions(
  provider: string,
  defaultBaseUrl: string,
  args: CompatibleCompletionsArgs,
  chidori: ChidoriRuntime,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, `${provider} API key`);
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    prompt: args.prompt as Json,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    top_p: args.topP,
    stop: args.stop as Json | undefined,
    stream: args.stream,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/completions`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

async function embeddings(
  provider: string,
  defaultBaseUrl: string,
  args: CompatibleEmbeddingsArgs,
  chidori: ChidoriRuntime,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, `${provider} API key`);
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    input: args.input,
    dimensions: args.dimensions,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/embeddings`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

async function rerank(
  provider: string,
  defaultBaseUrl: string,
  args: CompatibleRerankArgs,
  chidori: ChidoriRuntime,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, `${provider} API key`);
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    query: args.query,
    documents: args.documents as Json,
    top_n: args.topN,
    return_documents: args.returnDocuments,
    rank_fields: args.rankFields,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/rerank`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

async function miniMaxEmbeddings(args: MiniMaxEmbeddingsArgs, chidori: ChidoriRuntime): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "MiniMax API key");
  const groupId = await resolveSecret(args.groupId, chidori, "MiniMax group ID");
  const batchSize = Math.max(1, Math.trunc(args.batchSize ?? 512));
  const texts = args.stripNewLines === false ? args.texts : args.texts.map((text) => text.replace(/\n/g, " "));
  const batches: string[][] = [];
  for (let index = 0; index < texts.length; index += batchSize) {
    batches.push(texts.slice(index, index + batchSize));
  }

  const vectors: Json[] = [];
  const responses: Json[] = [];
  for (const batch of batches) {
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "embo-01",
      texts: batch,
      type: args.type ?? "db",
    }) as JsonObject;
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${args.baseUrl ?? "https://api.minimax.chat/v1"}/embeddings`, { GroupId: groupId }),
      {
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body,
      },
    );
    responses.push(response);
    if (Array.isArray(response.vectors)) {
      vectors.push(...response.vectors);
    }
  }

  return { vectors, responses };
}

function huggingFaceModelPath(model: string): string {
  return model.split("/").map((segment) => encodeURIComponent(segment)).join("/");
}

async function huggingFaceEmbeddings(args: HuggingFaceEmbeddingsArgs, chidori: ChidoriRuntime): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Hugging Face token");
  const model = args.model ?? "BAAI/bge-base-en-v1.5";
  const url = args.endpointUrl ?? `${args.baseUrl ?? "https://router.huggingface.co"}/${args.providerSegment ?? "hf-inference"}/models/${huggingFaceModelPath(model)}/pipeline/feature-extraction`;
  const response = await requestJson<Json>(chidori, url, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body: compactObject({
      ...(args.extraBody ?? {}),
      inputs: args.input,
      normalize: args.normalize,
      prompt_name: args.promptName,
      truncate: args.truncate,
      truncation_direction: args.truncationDirection,
    }) as JsonObject,
  });
  return {
    embeddings: response,
    model,
  };
}

async function premAiEmbeddings(args: PremAiEmbeddingsArgs, chidori: ChidoriRuntime): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "PremAI API key");
  const body = compactObject({
    ...(args.extraBody ?? {}),
    project_id: args.projectId,
    model: args.model,
    input: args.input,
    dimensions: args.dimensions,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://studio.premai.io/api/v1"}/embeddings`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

async function responses(
  provider: string,
  defaultBaseUrl: string,
  args: CompatibleResponsesArgs,
  chidori: ChidoriRuntime,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, `${provider} API key`);
  const body = compactObject({
    ...(args.extraBody ?? {}),
    model: args.model,
    input: args.input as Json,
    instructions: args.instructions,
    max_output_tokens: args.maxOutputTokens,
    tools: args.tools,
  }) as JsonObject;
  return requestJson<JsonObject>(chidori, `${args.baseUrl ?? defaultBaseUrl}/responses`, {
    method: "POST",
    headers: jsonHeaders(bearerAuth(apiKey)),
    body,
  });
}

const chatParameters = {
  type: "object" as const,
  properties: {
    messages: { type: "array" as const, items: { type: "object" as const, additionalProperties: true } },
    apiKey: { description: "Provider API key or Chidori memory secret reference." },
    model: { type: "string" as const },
    baseUrl: { type: "string" as const },
    temperature: { type: "number" as const },
    maxTokens: { type: "integer" as const },
    topP: { type: "number" as const },
    tools: { type: "array" as const, items: { type: "object" as const, additionalProperties: true } },
    toolChoice: { description: "OpenAI-compatible tool_choice value." },
    responseFormat: { type: "object" as const, additionalProperties: true },
    extraBody: { type: "object" as const, additionalProperties: true },
  },
  required: ["messages", "model"],
};

const embeddingParameters = {
  type: "object" as const,
  properties: {
    input: { description: "Text or text array to embed." },
    apiKey: { description: "Provider API key or Chidori memory secret reference." },
    model: { type: "string" as const },
    baseUrl: { type: "string" as const },
    dimensions: { type: "integer" as const },
    extraBody: { type: "object" as const, additionalProperties: true },
  },
  required: ["input", "model"],
};

const completionParameters = {
  type: "object" as const,
  properties: {
    prompt: { description: "Text prompt or prompt array for OpenAI-compatible completions." },
    apiKey: { description: "Provider API key or Chidori memory secret reference." },
    model: { type: "string" as const },
    baseUrl: { type: "string" as const },
    temperature: { type: "number" as const },
    maxTokens: { type: "integer" as const },
    topP: { type: "number" as const },
    stop: { description: "Stop sequence or sequence array." },
    stream: { type: "boolean" as const },
    extraBody: { type: "object" as const, additionalProperties: true },
  },
  required: ["prompt", "model"],
};

const rerankParameters = {
  type: "object" as const,
  properties: {
    query: { type: "string" as const },
    documents: {
      type: "array" as const,
      items: { description: "Document string or JSON object to rank." },
    },
    apiKey: { description: "Provider API key or Chidori memory secret reference." },
    model: { type: "string" as const },
    baseUrl: { type: "string" as const },
    topN: { type: "integer" as const },
    returnDocuments: { type: "boolean" as const },
    rankFields: { type: "array" as const, items: { type: "string" as const } },
    extraBody: { type: "object" as const, additionalProperties: true },
  },
  required: ["query", "documents", "model"],
};

export const xaiChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "xai_chat_completions_create",
    description: "Create an xAI chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("xAI", "https://api.x.ai/v1", args, chidori),
);

export const fireworksChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "fireworks_chat_completions_create",
    description: "Create a Fireworks AI chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Fireworks AI", "https://api.fireworks.ai/inference/v1", args, chidori),
);

export const fireworksCompletionsTool = defineTool<CompatibleCompletionsArgs, JsonObject>(
  {
    name: "fireworks_completions_create",
    description: "Create a Fireworks AI text completion using the OpenAI-compatible API.",
    parameters: completionParameters,
  },
  (args, chidori) => completions("Fireworks AI", "https://api.fireworks.ai/inference/v1", args, chidori),
);

export const fireworksEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "fireworks_embeddings_create",
    description: "Create Fireworks AI embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("Fireworks AI", "https://api.fireworks.ai/inference/v1", args, chidori),
);

export const togetherChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "together_chat_completions_create",
    description: "Create a Together AI chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Together AI", "https://api.together.ai/v1", args, chidori),
);

export const togetherCompletionsTool = defineTool<CompatibleCompletionsArgs, JsonObject>(
  {
    name: "together_completions_create",
    description: "Create a Together AI text completion using the OpenAI-compatible API.",
    parameters: completionParameters,
  },
  (args, chidori) => completions("Together AI", "https://api.together.ai/v1", args, chidori),
);

export const togetherEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "together_embeddings_create",
    description: "Create Together AI embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("Together AI", "https://api.together.ai/v1", args, chidori),
);

export const togetherRerankTool = defineTool<CompatibleRerankArgs, JsonObject>(
  {
    name: "together_rerank",
    description: "Rerank documents by relevance to a query using Together AI.",
    parameters: rerankParameters,
  },
  (args, chidori) => rerank("Together AI", "https://api.together.ai/v1", args, chidori),
);

export const deepSeekChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "deepseek_chat_completions_create",
    description: "Create a DeepSeek chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("DeepSeek", "https://api.deepseek.com/v1", args, chidori),
);

export const huggingFaceChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "huggingface_chat_completions_create",
    description: "Create a Hugging Face Inference Providers chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Hugging Face", "https://router.huggingface.co/v1", args, chidori),
);

export const huggingFaceEmbeddingsTool = defineTool<HuggingFaceEmbeddingsArgs, JsonObject>(
  {
    name: "huggingface_embeddings_create",
    description: "Create Hugging Face Inference feature-extraction embeddings.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text or text array to embed." },
        apiKey: { description: "Hugging Face token or Chidori memory secret reference." },
        model: { type: "string", default: "BAAI/bge-base-en-v1.5" },
        baseUrl: { type: "string", default: "https://router.huggingface.co" },
        endpointUrl: { type: "string", description: "Full feature-extraction endpoint URL. Overrides baseUrl/model routing." },
        providerSegment: { type: "string", default: "hf-inference" },
        normalize: { type: "boolean" },
        promptName: { type: "string" },
        truncate: { type: "boolean" },
        truncationDirection: { type: "string", enum: ["left", "right"] },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input"],
    },
  },
  huggingFaceEmbeddings,
);

export const deepInfraChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "deepinfra_chat_completions_create",
    description: "Create a DeepInfra chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("DeepInfra", "https://api.deepinfra.com/v1/openai", args, chidori),
);

export const deepInfraEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "deepinfra_embeddings_create",
    description: "Create DeepInfra embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("DeepInfra", "https://api.deepinfra.com/v1/openai", args, chidori),
);

export const zhipuAiChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "zhipuai_chat_completions_create",
    description: "Create a ZhipuAI GLM chat completion using the OpenAI-compatible BigModel API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("ZhipuAI", "https://open.bigmodel.cn/api/paas/v4", args, chidori),
);

export const zhipuAiEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "zhipuai_embeddings_create",
    description: "Create ZhipuAI GLM embeddings using the OpenAI-compatible BigModel API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("ZhipuAI", "https://open.bigmodel.cn/api/paas/v4", args, chidori),
);

export const moonshotChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "moonshot_chat_completions_create",
    description: "Create a Moonshot AI Kimi chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Moonshot AI", "https://api.moonshot.ai/v1", args, chidori),
);

export const dashScopeChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "dashscope_chat_completions_create",
    description: "Create an Alibaba Cloud Model Studio DashScope chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("DashScope", "https://dashscope-intl.aliyuncs.com/compatible-mode/v1", args, chidori),
);

export const dashScopeEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "dashscope_embeddings_create",
    description: "Create Alibaba Cloud Model Studio DashScope embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("DashScope", "https://dashscope-intl.aliyuncs.com/compatible-mode/v1", args, chidori),
);

export const tencentHunyuanChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "tencent_hunyuan_chat_completions_create",
    description: "Create a Tencent Hunyuan chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Tencent Hunyuan", "https://api.hunyuan.cloud.tencent.com/v1", args, chidori),
);

export const tencentHunyuanEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "tencent_hunyuan_embeddings_create",
    description: "Create Tencent Hunyuan embeddings using the OpenAI-compatible API.",
    parameters: {
      type: "object",
      properties: {
        ...embeddingParameters.properties,
        model: { type: "string", default: "hunyuan-embedding" },
        baseUrl: { type: "string", default: "https://api.hunyuan.cloud.tencent.com/v1" },
      },
      required: ["input"],
    },
  },
  (args, chidori) => embeddings("Tencent Hunyuan", "https://api.hunyuan.cloud.tencent.com/v1", {
    ...args,
    model: args.model ?? "hunyuan-embedding",
  }, chidori),
);

export const volcengineDoubaoChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "volcengine_doubao_chat_completions_create",
    description: "Create a ByteDance Volcengine Ark / Doubao chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Volcengine Doubao", "https://ark.cn-beijing.volces.com/api/v3", args, chidori),
);

export const volcengineDoubaoEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "volcengine_doubao_embeddings_create",
    description: "Create ByteDance Volcengine Ark / Doubao embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("Volcengine Doubao", "https://ark.cn-beijing.volces.com/api/v3", args, chidori),
);

export const volcengineDoubaoResponsesTool = defineTool<CompatibleResponsesArgs, JsonObject>(
  {
    name: "volcengine_doubao_responses_create",
    description: "Create a ByteDance Volcengine Ark / Doubao response using the OpenAI-compatible Responses API.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text input or OpenAI Responses API input items." },
        apiKey: { description: "Volcengine Ark API key or Chidori memory secret reference." },
        model: { type: "string", description: "Volcengine Ark endpoint or model name." },
        baseUrl: { type: "string", default: "https://ark.cn-beijing.volces.com/api/v3" },
        instructions: { type: "string" },
        maxOutputTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input", "model"],
    },
  },
  (args, chidori) => responses("Volcengine Doubao", "https://ark.cn-beijing.volces.com/api/v3", args, chidori),
);

export const miniMaxChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "minimax_chat_completions_create",
    description: "Create a MiniMax chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("MiniMax", "https://api.minimax.io/v1", args, chidori),
);

export const miniMaxEmbeddingsTool = defineTool<MiniMaxEmbeddingsArgs, JsonObject>(
  {
    name: "minimax_embeddings_create",
    description: "Create MiniMax embeddings using the MiniMax embeddings API.",
    parameters: {
      type: "object",
      properties: {
        texts: { type: "array", items: { type: "string" } },
        apiKey: { description: "MiniMax API key or Chidori memory secret reference." },
        groupId: { description: "MiniMax Group ID or Chidori memory secret reference." },
        model: { type: "string", default: "embo-01" },
        baseUrl: { type: "string", default: "https://api.minimax.chat/v1" },
        type: { type: "string", enum: ["db", "query"], default: "db" },
        stripNewLines: { type: "boolean", default: true },
        batchSize: { type: "integer", default: 512 },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["texts"],
    },
  },
  miniMaxEmbeddings,
);

export const novitaChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "novita_chat_completions_create",
    description: "Create a Novita AI chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Novita AI", "https://api.novita.ai/openai/v1", args, chidori),
);

export const friendliChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "friendli_chat_completions_create",
    description: "Create a Friendli chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Friendli", "https://api.friendli.ai/serverless/v1", args, chidori),
);

export const sambaNovaChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "sambanova_chat_completions_create",
    description: "Create a SambaNova chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("SambaNova", "https://api.sambanova.ai/v1", args, chidori),
);

export const sambaNovaCompletionsTool = defineTool<CompatibleCompletionsArgs, JsonObject>(
  {
    name: "sambanova_completions_create",
    description: "Create a SambaNova text completion using the OpenAI-compatible API.",
    parameters: completionParameters,
  },
  (args, chidori) => completions("SambaNova", "https://api.sambanova.ai/v1", args, chidori),
);

export const sambaNovaEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "sambanova_embeddings_create",
    description: "Create SambaNova embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("SambaNova", "https://api.sambanova.ai/v1", args, chidori),
);

export const premAiChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "premai_chat_completions_create",
    description: "Create a PremAI chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("PremAI", "https://studio.premai.io/api/v1", args, chidori),
);

export const premAiEmbeddingsTool = defineTool<PremAiEmbeddingsArgs, JsonObject>(
  {
    name: "premai_embeddings_create",
    description: "Create PremAI embeddings for a project.",
    parameters: {
      type: "object",
      properties: {
        ...embeddingParameters.properties,
        projectId: { description: "PremAI project ID." },
        baseUrl: { type: "string", default: "https://studio.premai.io/api/v1" },
      },
      required: ["input", "model", "projectId"],
    },
  },
  premAiEmbeddings,
);

export const upstageChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "upstage_chat_completions_create",
    description: "Create an Upstage Solar chat completion using the OpenAI-compatible API.",
    parameters: {
      type: "object",
      properties: {
        ...chatParameters.properties,
        baseUrl: { type: "string", default: "https://api.upstage.ai/v1" },
      },
      required: ["messages", "model"],
    },
  },
  (args, chidori) => chatCompletions("Upstage", "https://api.upstage.ai/v1", args, chidori),
);

export const upstageEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "upstage_embeddings_create",
    description: "Create Upstage Solar embeddings using the OpenAI-compatible API.",
    parameters: {
      type: "object",
      properties: {
        ...embeddingParameters.properties,
        baseUrl: { type: "string", default: "https://api.upstage.ai/v1/solar" },
      },
      required: ["input", "model"],
    },
  },
  (args, chidori) => embeddings("Upstage", "https://api.upstage.ai/v1/solar", args, chidori),
);

export const githubModelsChatCompletionsTool = defineTool<GitHubModelsChatArgs, JsonObject>(
  {
    name: "github_models_chat_completions_create",
    description: "Create a GitHub Models chat completion through the Models inference API.",
    parameters: {
      type: "object",
      properties: {
        ...chatParameters.properties,
        baseUrl: { type: "string", default: "https://models.github.ai/inference" },
        apiVersion: { type: "string", default: "2026-03-10" },
      },
      required: ["messages", "model"],
    },
  },
  githubModelsChatCompletions,
);

export const githubModelsEmbeddingsTool = defineTool<GitHubModelsEmbeddingsArgs, JsonObject>(
  {
    name: "github_models_embeddings_create",
    description: "Create embeddings through the GitHub Models embeddings API.",
    parameters: {
      type: "object",
      properties: {
        ...embeddingParameters.properties,
        baseUrl: { type: "string", default: "https://models.github.ai/inference" },
        apiVersion: { type: "string", default: "2026-03-10" },
      },
      required: ["input", "model"],
    },
  },
  githubModelsEmbeddings,
);

export const cerebrasChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "cerebras_chat_completions_create",
    description: "Create a Cerebras chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("Cerebras", "https://api.cerebras.ai/v1", args, chidori),
);

export const nvidiaNimChatCompletionsTool = defineTool<CompatibleChatArgs, JsonObject>(
  {
    name: "nvidia_nim_chat_completions_create",
    description: "Create an NVIDIA NIM chat completion using the OpenAI-compatible API.",
    parameters: chatParameters,
  },
  (args, chidori) => chatCompletions("NVIDIA NIM", "https://integrate.api.nvidia.com/v1", args, chidori),
);

export const nvidiaNimEmbeddingsTool = defineTool<CompatibleEmbeddingsArgs, JsonObject>(
  {
    name: "nvidia_nim_embeddings_create",
    description: "Create NVIDIA NIM embeddings using the OpenAI-compatible API.",
    parameters: embeddingParameters,
  },
  (args, chidori) => embeddings("NVIDIA NIM", "https://integrate.api.nvidia.com/v1", args, chidori),
);

export const nvidiaNimResponsesTool = defineTool<CompatibleResponsesArgs, JsonObject>(
  {
    name: "nvidia_nim_responses_create",
    description: "Create an NVIDIA NIM response using the OpenAI-compatible Responses API.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text input or OpenAI Responses API input items." },
        apiKey: { description: "NVIDIA API key or Chidori memory secret reference." },
        model: { type: "string", description: "NVIDIA NIM model name." },
        baseUrl: { type: "string", default: "https://integrate.api.nvidia.com/v1" },
        instructions: { type: "string" },
        maxOutputTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input", "model"],
    },
  },
  (args, chidori) => responses("NVIDIA NIM", "https://integrate.api.nvidia.com/v1", args, chidori),
);

export const perplexityResponsesTool = defineTool<CompatibleResponsesArgs, JsonObject>(
  {
    name: "perplexity_responses_create",
    description: "Create a Perplexity Agent API response using the OpenAI-compatible Responses API.",
    parameters: {
      type: "object",
      properties: {
        input: { description: "Text input or OpenAI Responses API input items." },
        apiKey: { description: "Perplexity API key or Chidori memory secret reference." },
        model: { type: "string", description: "Perplexity or third-party model name." },
        baseUrl: { type: "string", default: "https://api.perplexity.ai/v1" },
        instructions: { type: "string" },
        maxOutputTokens: { type: "integer" },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["input"],
    },
  },
  (args, chidori) => responses("Perplexity", "https://api.perplexity.ai/v1", args, chidori),
);

export const openAICompatibleTools = {
  xaiChatCompletions: xaiChatCompletionsTool,
  fireworksChatCompletions: fireworksChatCompletionsTool,
  fireworksCompletions: fireworksCompletionsTool,
  fireworksEmbeddings: fireworksEmbeddingsTool,
  togetherChatCompletions: togetherChatCompletionsTool,
  togetherCompletions: togetherCompletionsTool,
  togetherEmbeddings: togetherEmbeddingsTool,
  togetherRerank: togetherRerankTool,
  deepSeekChatCompletions: deepSeekChatCompletionsTool,
  huggingFaceChatCompletions: huggingFaceChatCompletionsTool,
  huggingFaceEmbeddings: huggingFaceEmbeddingsTool,
  deepInfraChatCompletions: deepInfraChatCompletionsTool,
  deepInfraEmbeddings: deepInfraEmbeddingsTool,
  zhipuAiChatCompletions: zhipuAiChatCompletionsTool,
  zhipuAiEmbeddings: zhipuAiEmbeddingsTool,
  moonshotChatCompletions: moonshotChatCompletionsTool,
  dashScopeChatCompletions: dashScopeChatCompletionsTool,
  dashScopeEmbeddings: dashScopeEmbeddingsTool,
  tencentHunyuanChatCompletions: tencentHunyuanChatCompletionsTool,
  tencentHunyuanEmbeddings: tencentHunyuanEmbeddingsTool,
  volcengineDoubaoChatCompletions: volcengineDoubaoChatCompletionsTool,
  volcengineDoubaoEmbeddings: volcengineDoubaoEmbeddingsTool,
  volcengineDoubaoResponses: volcengineDoubaoResponsesTool,
  miniMaxChatCompletions: miniMaxChatCompletionsTool,
  miniMaxEmbeddings: miniMaxEmbeddingsTool,
  novitaChatCompletions: novitaChatCompletionsTool,
  friendliChatCompletions: friendliChatCompletionsTool,
  sambaNovaChatCompletions: sambaNovaChatCompletionsTool,
  sambaNovaCompletions: sambaNovaCompletionsTool,
  sambaNovaEmbeddings: sambaNovaEmbeddingsTool,
  premAiChatCompletions: premAiChatCompletionsTool,
  premAiEmbeddings: premAiEmbeddingsTool,
  upstageChatCompletions: upstageChatCompletionsTool,
  upstageEmbeddings: upstageEmbeddingsTool,
  githubModelsChatCompletions: githubModelsChatCompletionsTool,
  githubModelsEmbeddings: githubModelsEmbeddingsTool,
  cerebrasChatCompletions: cerebrasChatCompletionsTool,
  nvidiaNimChatCompletions: nvidiaNimChatCompletionsTool,
  nvidiaNimEmbeddings: nvidiaNimEmbeddingsTool,
  nvidiaNimResponses: nvidiaNimResponsesTool,
  perplexityResponses: perplexityResponsesTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getOpenAICompatibleEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "OPENAI_COMPATIBLE_API_KEY", description: "Provider API key for OpenAI-compatible endpoints." },
    { name: "GITHUB_MODELS_TOKEN", description: "GitHub Models token." },
    { name: "MINIMAX_API_KEY", description: "MiniMax API key." },
    { name: "MINIMAX_GROUP_ID", description: "MiniMax group ID." },
    { name: "HUGGINGFACE_API_TOKEN", description: "Hugging Face token." },
    { name: "PREMAI_API_KEY", description: "PremAI API key." },
  ];
}

export const openAICompatibleIntegrationSpec = {
  environmentVariables: getOpenAICompatibleEnvironmentVariables,
} satisfies IntegrationSpec;
