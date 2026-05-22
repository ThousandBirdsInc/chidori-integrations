import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ElevenLabsTextToSpeechArgs {
  text: string;
  voiceId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  modelId?: string;
  outputFormat?: string;
  enableLogging?: boolean;
  optimizeStreamingLatency?: 0 | 1 | 2 | 3 | 4;
  languageCode?: string;
  voiceSettings?: JsonObject;
  pronunciationDictionaryLocators?: JsonObject[];
  seed?: number;
  previousText?: string;
  nextText?: string;
  previousRequestIds?: string[];
  nextRequestIds?: string[];
  applyTextNormalization?: "auto" | "on" | "off";
  applyLanguageTextNormalization?: boolean;
  timeoutMs?: number;
}

export interface ElevenLabsVoicesListArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  nextPageToken?: string;
  pageSize?: number;
  search?: string;
  sort?: "created_at_unix" | "name";
  sortDirection?: "asc" | "desc";
  voiceType?: "personal" | "community" | "default" | "workspace" | "non-default" | "non-community" | "saved";
  category?: "premade" | "cloned" | "generated" | "professional";
  fineTuningState?: "draft" | "not_verified" | "not_started" | "queued" | "fine_tuning" | "fine_tuned" | "failed" | "delayed";
  collectionId?: string;
  includeTotalCount?: boolean;
  voiceIds?: string[];
  timeoutMs?: number;
}

function elevenLabsUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.elevenlabs.io").replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function responseHeader(headers: Record<string, string>, name: string): string | undefined {
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  return undefined;
}

function stringifyAudioBody(value: Json | string | null): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null) {
    return "";
  }
  return JSON.stringify(value);
}

export const elevenLabsTextToSpeechTool = defineTool<ElevenLabsTextToSpeechArgs, JsonObject>(
  {
    name: "elevenlabs_text_to_speech",
    description: "Convert text to speech with ElevenLabs and return the Chidori HTTP audio body as a string.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string", description: "Text to convert to speech." },
        voiceId: { type: "string", description: "ElevenLabs voice ID." },
        apiKey: { description: "ElevenLabs API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.elevenlabs.io" },
        modelId: { type: "string", default: "eleven_multilingual_v2" },
        outputFormat: { type: "string", default: "mp3_44100_128" },
        enableLogging: { type: "boolean", default: true },
        optimizeStreamingLatency: { type: "integer", enum: [0, 1, 2, 3, 4] },
        languageCode: { type: "string", description: "ISO 639-1 language code." },
        voiceSettings: { type: "object", additionalProperties: true },
        pronunciationDictionaryLocators: { type: "array", items: { type: "object", additionalProperties: true } },
        seed: { type: "integer" },
        previousText: { type: "string" },
        nextText: { type: "string" },
        previousRequestIds: { type: "array", items: { type: "string" } },
        nextRequestIds: { type: "array", items: { type: "string" } },
        applyTextNormalization: { type: "string", enum: ["auto", "on", "off"] },
        applyLanguageTextNormalization: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
      required: ["text", "voiceId"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "ElevenLabs API key");
    const requestOptions: ChidoriHttpRequestOptions = {
      method: "POST",
      headers: jsonHeaders({
        "xi-api-key": apiKey,
        accept: "audio/mpeg",
      }),
      body: compactObject({
        text: args.text,
        model_id: args.modelId ?? "eleven_multilingual_v2",
        language_code: args.languageCode,
        voice_settings: args.voiceSettings,
        pronunciation_dictionary_locators: args.pronunciationDictionaryLocators as Json | undefined,
        seed: args.seed,
        previous_text: args.previousText,
        next_text: args.nextText,
        previous_request_ids: args.previousRequestIds,
        next_request_ids: args.nextRequestIds,
        apply_text_normalization: args.applyTextNormalization,
        apply_language_text_normalization: args.applyLanguageTextNormalization,
      }) as JsonObject,
    };
    if (args.timeoutMs !== undefined) {
      requestOptions.timeoutMs = args.timeoutMs;
    }
    const response = await chidori.http(
      withQuery(elevenLabsUrl(args.baseUrl, `v1/text-to-speech/${encodeURIComponent(args.voiceId)}`), {
        output_format: args.outputFormat ?? "mp3_44100_128",
        enable_logging: args.enableLogging,
        optimize_streaming_latency: args.optimizeStreamingLatency,
      }),
      requestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`ElevenLabs text-to-speech failed with HTTP ${response.status}: ${stringifyAudioBody(response.body)}`);
    }
    return compactObject({
      audioContent: stringifyAudioBody(response.body),
      contentType: responseHeader(response.headers, "content-type"),
      requestId: responseHeader(response.headers, "request-id") ?? responseHeader(response.headers, "x-request-id"),
      voiceId: args.voiceId,
      modelId: args.modelId ?? "eleven_multilingual_v2",
      outputFormat: args.outputFormat ?? "mp3_44100_128",
    }) as JsonObject;
  },
);

export const elevenLabsVoicesListTool = defineTool<ElevenLabsVoicesListArgs, JsonObject>(
  {
    name: "elevenlabs_voices_list",
    description: "List ElevenLabs voices with search, filtering, and pagination.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "ElevenLabs API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.elevenlabs.io" },
        nextPageToken: { type: "string" },
        pageSize: { type: "integer", default: 10 },
        search: { type: "string" },
        sort: { type: "string", enum: ["created_at_unix", "name"] },
        sortDirection: { type: "string", enum: ["asc", "desc"] },
        voiceType: { type: "string", enum: ["personal", "community", "default", "workspace", "non-default", "non-community", "saved"] },
        category: { type: "string", enum: ["premade", "cloned", "generated", "professional"] },
        fineTuningState: { type: "string", enum: ["draft", "not_verified", "not_started", "queued", "fine_tuning", "fine_tuned", "failed", "delayed"] },
        collectionId: { type: "string" },
        includeTotalCount: { type: "boolean", default: true },
        voiceIds: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "ElevenLabs API key");
    const requestOptions: ChidoriHttpRequestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        "xi-api-key": apiKey,
      },
    };
    if (args.timeoutMs !== undefined) {
      requestOptions.timeoutMs = args.timeoutMs;
    }
    return requestJson<JsonObject>(
      chidori,
      withQuery(elevenLabsUrl(args.baseUrl, "v2/voices"), {
        next_page_token: args.nextPageToken,
        page_size: args.pageSize,
        search: args.search,
        sort: args.sort,
        sort_direction: args.sortDirection,
        voice_type: args.voiceType,
        category: args.category,
        fine_tuning_state: args.fineTuningState,
        collection_id: args.collectionId,
        include_total_count: args.includeTotalCount,
        voice_ids: args.voiceIds?.join(","),
      }),
      requestOptions,
    );
  },
);

export const elevenLabsTools = {
  textToSpeech: elevenLabsTextToSpeechTool,
  voicesList: elevenLabsVoicesListTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getElevenLabsEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ELEVENLABS_API_KEY", description: "ElevenLabs API key." },
  ];
}

export const elevenLabsIntegrationSpec = {
  environmentVariables: getElevenLabsEnvironmentVariables,
} satisfies IntegrationSpec;
