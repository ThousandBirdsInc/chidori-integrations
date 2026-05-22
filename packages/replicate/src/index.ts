import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type ChidoriHttpRequestOptions,
  type ChidoriRuntime,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ReplicatePredictionBaseArgs {
  apiToken?: SecretInput;
  baseUrl?: string;
  preferWait?: boolean | number;
  cancelAfter?: string;
  timeoutMs?: number;
}

export interface ReplicatePredictionCreateArgs extends ReplicatePredictionBaseArgs {
  version: string;
  input: JsonObject;
  webhook?: string;
  webhookEventsFilter?: string[];
  stream?: boolean;
  extraBody?: JsonObject;
}

export interface ReplicateOfficialModelPredictionCreateArgs extends ReplicatePredictionBaseArgs {
  modelOwner: string;
  modelName: string;
  input: JsonObject;
  webhook?: string;
  webhookEventsFilter?: string[];
  stream?: boolean;
  extraBody?: JsonObject;
}

export interface ReplicateDeploymentPredictionCreateArgs extends ReplicatePredictionBaseArgs {
  deploymentOwner: string;
  deploymentName: string;
  input: JsonObject;
  webhook?: string;
  webhookEventsFilter?: string[];
  stream?: boolean;
  extraBody?: JsonObject;
}

export interface ReplicatePredictionReadArgs {
  predictionId: string;
  apiToken?: SecretInput;
  baseUrl?: string;
  timeoutMs?: number;
}

function replicateBaseUrl(baseUrl?: string): string {
  const root = (baseUrl ?? "https://api.replicate.com/v1").replace(/\/$/, "");
  return root.endsWith("/v1") ? root : `${root}/v1`;
}

function preferHeader(preferWait: boolean | number | undefined): string | undefined {
  if (preferWait === true) {
    return "wait";
  }
  if (typeof preferWait === "number") {
    return `wait=${preferWait}`;
  }
  return undefined;
}

async function replicateHeaders(
  args: ReplicatePredictionBaseArgs | ReplicatePredictionReadArgs,
  chidori: ChidoriRuntime,
  json = false,
): Promise<Record<string, string>> {
  const token = await resolveSecret(args.apiToken, chidori, "Replicate API token");
  const headers = json ? jsonHeaders(bearerAuth(token)) : bearerAuth(token);
  if ("preferWait" in args) {
    const prefer = preferHeader(args.preferWait);
    if (prefer) {
      headers.Prefer = prefer;
    }
    if (args.cancelAfter) {
      headers["Cancel-After"] = args.cancelAfter;
    }
  }
  return headers;
}

function predictionBody(
  args: {
    input: JsonObject;
    webhook?: string;
    webhookEventsFilter?: string[];
    stream?: boolean;
    extraBody?: JsonObject;
  },
  version?: string,
): JsonObject {
  return compactObject({
    ...(args.extraBody ?? {}),
    version,
    input: args.input,
    webhook: args.webhook,
    webhook_events_filter: args.webhookEventsFilter,
    stream: args.stream,
  }) as JsonObject;
}

export const replicatePredictionCreateTool = defineTool<ReplicatePredictionCreateArgs, JsonObject>(
  {
    name: "replicate_prediction_create",
    description: "Create a Replicate prediction for a community model version.",
    parameters: {
      type: "object",
      properties: {
        version: { type: "string", description: "Replicate model version ID." },
        input: { type: "object", additionalProperties: true },
        apiToken: { description: "Replicate API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.replicate.com/v1" },
        preferWait: { description: "Set true for Prefer: wait, or a number for Prefer: wait=n seconds." },
        cancelAfter: { type: "string", description: "Cancel-After duration, for example 30s, 5m, or 1h30m." },
        webhook: { type: "string" },
        webhookEventsFilter: { type: "array", items: { type: "string" } },
        stream: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["version", "input"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, `${replicateBaseUrl(args.baseUrl)}/predictions`, compactObject({
      method: "POST",
      headers: await replicateHeaders(args, chidori, true),
      body: predictionBody(args, args.version),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions),
);

export const replicateOfficialModelPredictionCreateTool = defineTool<ReplicateOfficialModelPredictionCreateArgs, JsonObject>(
  {
    name: "replicate_official_model_prediction_create",
    description: "Create a Replicate prediction using an official model endpoint.",
    parameters: {
      type: "object",
      properties: {
        modelOwner: { type: "string" },
        modelName: { type: "string" },
        input: { type: "object", additionalProperties: true },
        apiToken: { description: "Replicate API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.replicate.com/v1" },
        preferWait: { description: "Set true for Prefer: wait, or a number for Prefer: wait=n seconds." },
        cancelAfter: { type: "string", description: "Cancel-After duration, for example 30s, 5m, or 1h30m." },
        webhook: { type: "string" },
        webhookEventsFilter: { type: "array", items: { type: "string" } },
        stream: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["modelOwner", "modelName", "input"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${replicateBaseUrl(args.baseUrl)}/models/${encodeURIComponent(args.modelOwner)}/${encodeURIComponent(args.modelName)}/predictions`,
    compactObject({
      method: "POST",
      headers: await replicateHeaders(args, chidori, true),
      body: predictionBody(args),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const replicateDeploymentPredictionCreateTool = defineTool<ReplicateDeploymentPredictionCreateArgs, JsonObject>(
  {
    name: "replicate_deployment_prediction_create",
    description: "Create a Replicate prediction using a deployment endpoint.",
    parameters: {
      type: "object",
      properties: {
        deploymentOwner: { type: "string" },
        deploymentName: { type: "string" },
        input: { type: "object", additionalProperties: true },
        apiToken: { description: "Replicate API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.replicate.com/v1" },
        preferWait: { description: "Set true for Prefer: wait, or a number for Prefer: wait=n seconds." },
        cancelAfter: { type: "string", description: "Cancel-After duration, for example 30s, 5m, or 1h30m." },
        webhook: { type: "string" },
        webhookEventsFilter: { type: "array", items: { type: "string" } },
        stream: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["deploymentOwner", "deploymentName", "input"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${replicateBaseUrl(args.baseUrl)}/deployments/${encodeURIComponent(args.deploymentOwner)}/${encodeURIComponent(args.deploymentName)}/predictions`,
    compactObject({
      method: "POST",
      headers: await replicateHeaders(args, chidori, true),
      body: predictionBody(args),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const replicatePredictionGetTool = defineTool<ReplicatePredictionReadArgs, JsonObject>(
  {
    name: "replicate_prediction_get",
    description: "Get the current state of a Replicate prediction.",
    parameters: {
      type: "object",
      properties: {
        predictionId: { type: "string" },
        apiToken: { description: "Replicate API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.replicate.com/v1" },
        timeoutMs: { type: "integer" },
      },
      required: ["predictionId"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${replicateBaseUrl(args.baseUrl)}/predictions/${encodeURIComponent(args.predictionId)}`,
    compactObject({
      method: "GET",
      headers: await replicateHeaders(args, chidori),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const replicatePredictionCancelTool = defineTool<ReplicatePredictionReadArgs, JsonObject>(
  {
    name: "replicate_prediction_cancel",
    description: "Cancel a Replicate prediction.",
    parameters: {
      type: "object",
      properties: {
        predictionId: { type: "string" },
        apiToken: { description: "Replicate API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.replicate.com/v1" },
        timeoutMs: { type: "integer" },
      },
      required: ["predictionId"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(
    chidori,
    `${replicateBaseUrl(args.baseUrl)}/predictions/${encodeURIComponent(args.predictionId)}/cancel`,
    compactObject({
      method: "POST",
      headers: await replicateHeaders(args, chidori),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  ),
);

export const replicateTools = {
  predictionCreate: replicatePredictionCreateTool,
  officialModelPredictionCreate: replicateOfficialModelPredictionCreateTool,
  deploymentPredictionCreate: replicateDeploymentPredictionCreateTool,
  predictionGet: replicatePredictionGetTool,
  predictionCancel: replicatePredictionCancelTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getReplicateEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "REPLICATE_API_TOKEN", description: "Replicate API token." },
  ];
}

export const replicateIntegrationSpec = {
  environmentVariables: getReplicateEnvironmentVariables,
} satisfies IntegrationSpec;
