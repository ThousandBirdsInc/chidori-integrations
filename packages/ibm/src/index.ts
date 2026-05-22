import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface IbmWatsonxAuthArgs {
  serviceUrl: string;
  accessToken?: SecretInput;
  version?: string;
  projectId?: string;
  spaceId?: string;
}

export interface IbmWatsonxChatArgs extends IbmWatsonxAuthArgs {
  modelId: string;
  messages: JsonObject[];
  parameters?: JsonObject;
  tools?: JsonObject[];
  toolChoice?: Json;
  extraBody?: JsonObject;
}

export interface IbmWatsonxEmbeddingsArgs extends IbmWatsonxAuthArgs {
  modelId: string;
  inputs: string[];
  truncateInputTokens?: number;
  parameters?: JsonObject;
  extraBody?: JsonObject;
}

function watsonxUrl(args: IbmWatsonxAuthArgs, path: string): string {
  return withQuery(`${args.serviceUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`, {
    version: args.version ?? "2024-05-01",
  });
}

function scopeBody(args: IbmWatsonxAuthArgs): JsonObject {
  return compactObject({
    project_id: args.projectId,
    space_id: args.spaceId,
  }) as JsonObject;
}

export const ibmWatsonxChatTool = defineTool<IbmWatsonxChatArgs, JsonObject>(
  {
    name: "ibm_watsonx_chat",
    description: "Create an IBM watsonx.ai chat response.",
    parameters: {
      type: "object",
      properties: {
        serviceUrl: { type: "string", description: "watsonx.ai service URL, e.g. https://us-south.ml.cloud.ibm.com." },
        accessToken: { description: "IBM bearer access token or Chidori memory secret reference." },
        version: { type: "string", default: "2024-05-01" },
        projectId: { type: "string" },
        spaceId: { type: "string" },
        modelId: { type: "string", description: "watsonx.ai model ID." },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        parameters: { type: "object", additionalProperties: true },
        tools: { type: "array", items: { type: "object", additionalProperties: true } },
        toolChoice: { description: "watsonx.ai tool choice value." },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["serviceUrl", "modelId", "messages"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "IBM access token");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      ...scopeBody(args),
      model_id: args.modelId,
      messages: args.messages as Json,
      parameters: args.parameters,
      tools: args.tools,
      tool_choice: args.toolChoice,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, watsonxUrl(args, "ml/v1/text/chat"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body,
    });
  },
);

export const ibmWatsonxEmbeddingsTool = defineTool<IbmWatsonxEmbeddingsArgs, JsonObject>(
  {
    name: "ibm_watsonx_embeddings",
    description: "Create embeddings with IBM watsonx.ai.",
    parameters: {
      type: "object",
      properties: {
        serviceUrl: { type: "string", description: "watsonx.ai service URL, e.g. https://us-south.ml.cloud.ibm.com." },
        accessToken: { description: "IBM bearer access token or Chidori memory secret reference." },
        version: { type: "string", default: "2024-05-01" },
        projectId: { type: "string" },
        spaceId: { type: "string" },
        modelId: { type: "string", description: "watsonx.ai embedding model ID." },
        inputs: { type: "array", items: { type: "string" } },
        truncateInputTokens: { type: "integer" },
        parameters: { type: "object", additionalProperties: true },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["serviceUrl", "modelId", "inputs"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "IBM access token");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      ...scopeBody(args),
      model_id: args.modelId,
      inputs: args.inputs,
      truncate_input_tokens: args.truncateInputTokens,
      parameters: args.parameters,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, watsonxUrl(args, "ml/v1/text/embeddings"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(accessToken)),
      body,
    });
  },
);

export const ibmTools = {
  watsonxChat: ibmWatsonxChatTool,
  watsonxEmbeddings: ibmWatsonxEmbeddingsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getIBMEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "IBM_ACCESS_TOKEN", description: "IBM access token." },
  ];
}

export const ibmIntegrationSpec = {
  environmentVariables: getIBMEnvironmentVariables,
} satisfies IntegrationSpec;
