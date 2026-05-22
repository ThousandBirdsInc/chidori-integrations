export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

export type JsonObject = { [key: string]: Json };

export interface JsonSchema {
  type?: "object" | "array" | "string" | "number" | "integer" | "boolean" | "null";
  description?: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
  enum?: Json[];
  default?: Json;
  additionalProperties?: boolean | JsonSchema;
  [keyword: string]: unknown;
}

export interface ChidoriToolDefinition {
  name: string;
  description: string;
  parameters: JsonSchema & { type: "object" };
}

export interface ChidoriHttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  body?: Json | string;
  timeoutMs?: number;
}

export interface ChidoriHttpResponse {
  status: number;
  headers: Record<string, string>;
  body: Json | string | null;
}

export interface ChidoriRuntime {
  http(url: string, options?: ChidoriHttpRequestOptions): Promise<ChidoriHttpResponse>;
  tool<TArgs extends JsonObject = JsonObject, TResult extends Json = Json>(
    name: string,
    args?: TArgs,
  ): Promise<TResult>;
  memory<T extends Json = Json>(
    action: "get" | "set" | "delete" | "list" | "clear",
    key?: string,
    value?: T,
    options?: JsonObject,
  ): Promise<T | Json[] | null>;
  log(message: string, fields?: JsonObject): Promise<void>;
}

export interface ChidoriToolModule<TArgs extends object = JsonObject, TResult extends Json = Json> {
  tool: ChidoriToolDefinition;
  run(args: TArgs, chidori: ChidoriRuntime): Promise<TResult>;
}

export interface ChidoriEnvironmentVariable {
  name: string;
  description: string;
  required?: boolean;
}

export interface ChidoriIntegrationSpec {
  environmentVariables(): readonly ChidoriEnvironmentVariable[];
}

export type SecretInput =
  | string
  | {
      value: string;
    }
  | {
      memoryKey: string;
    };

export function defineTool<TArgs extends object, TResult extends Json>(
  tool: ChidoriToolDefinition,
  run: (args: TArgs, chidori: ChidoriRuntime) => Promise<TResult>,
): ChidoriToolModule<TArgs, TResult> {
  return { tool, run };
}

export async function resolveSecret(
  secret: SecretInput | undefined,
  chidori: ChidoriRuntime,
  label = "API key",
): Promise<string> {
  if (typeof secret === "string") {
    return secret;
  }
  if (secret && "value" in secret) {
    return secret.value;
  }
  if (secret && "memoryKey" in secret) {
    const value = await chidori.memory<string>("get", secret.memoryKey);
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    throw new Error(`${label} memory key did not resolve to a string`);
  }
  throw new Error(`${label} is required`);
}

export function bearerAuth(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export function jsonHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return {
    "content-type": "application/json",
    ...headers,
  };
}

export function withQuery(url: string, query?: Record<string, string | number | boolean | undefined>): string {
  if (!query) {
    return url;
  }
  const params = Object.entries(query).filter((entry): entry is [string, string | number | boolean] => {
    return entry[1] !== undefined;
  });
  if (params.length === 0) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  const encoded = params
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
  return `${url}${separator}${encoded}`;
}

export async function requestJson<T extends Json = Json>(
  chidori: ChidoriRuntime,
  url: string,
  options: ChidoriHttpRequestOptions,
): Promise<T> {
  const response = await chidori.http(url, options);
  if (response.status < 200 || response.status >= 300) {
    const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
    throw new Error(`HTTP ${response.status} from ${url}: ${detail}`);
  }
  if (typeof response.body === "string") {
    return JSON.parse(response.body) as T;
  }
  return response.body as T;
}

export function compactObject<T extends Record<string, unknown>>(input: T): T {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      output[key] = value;
    }
  }
  return output as T;
}
