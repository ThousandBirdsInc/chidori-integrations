import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface JigsawStackAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
}

export interface JigsawStackAiSearchArgs extends JigsawStackAuthArgs {
  query: string;
  aiOverview?: boolean;
  safeSearch?: "moderate" | "strict" | "off";
  spellCheck?: boolean;
  byoUrls?: string[];
  countryCode?: string;
  autoScrape?: boolean;
  maxResults?: number;
}

export interface JigsawStackAiScrapeArgs extends JigsawStackAuthArgs {
  url: string;
  elementPrompts?: string[];
  rootElementSelector?: string;
  gotoOptions?: JsonObject;
  waitFor?: JsonObject | string;
  pagePosition?: number;
  sizePreset?: "desktop" | "mobile" | "tablet";
  isMessy?: boolean;
  scale?: number;
}

export interface JigsawStackVocrArgs extends JigsawStackAuthArgs {
  url?: string;
  fileStoreKey?: string;
  prompt?: string | string[] | JsonObject;
  fineGrained?: boolean;
  pageRange?: number[];
}

export interface JigsawStackSpeechToTextArgs extends JigsawStackAuthArgs {
  url?: string;
  fileStoreKey?: string;
  language?: string;
  translate?: boolean;
  bySpeaker?: boolean;
  webhookUrl?: string;
  batchSize?: number;
  chunkDuration?: number;
}

export interface JigsawStackTextToSqlArgs extends JigsawStackAuthArgs {
  prompt: string;
  sqlSchema?: string;
  database?: "postgresql" | "mysql" | "sqlite";
  fileStoreKey?: string;
}

function jigsawBaseUrl(args: JigsawStackAuthArgs): string {
  return (args.baseUrl ?? "https://api.jigsawstack.com").replace(/\/+$/, "");
}

async function jigsawHeaders(args: JigsawStackAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const apiKey = await resolveSecret(args.apiKey, chidori, "JigsawStack API key");
  return jsonHeaders({ "x-api-key": apiKey });
}

export const jigsawStackAiSearchTool = defineTool<JigsawStackAiSearchArgs, JsonObject>(
  {
    name: "jigsawstack_ai_search",
    description: "Search the web with JigsawStack AI Search.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "JigsawStack API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.jigsawstack.com" },
        aiOverview: { type: "boolean", default: true },
        safeSearch: { type: "string", enum: ["moderate", "strict", "off"], default: "moderate" },
        spellCheck: { type: "boolean", default: true },
        byoUrls: { type: "array", items: { type: "string" } },
        countryCode: { type: "string" },
        autoScrape: { type: "boolean", default: true },
        maxResults: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jigsawBaseUrl(args)}/v1/web/search`, {
      method: "POST",
      headers: await jigsawHeaders(args, chidori),
      body: compactObject({
        query: args.query,
        ai_overview: args.aiOverview,
        safe_search: args.safeSearch,
        spell_check: args.spellCheck,
        byo_urls: args.byoUrls,
        country_code: args.countryCode,
        auto_scrape: args.autoScrape,
        max_results: args.maxResults,
      }) as JsonObject,
    });
  },
);

export const jigsawStackAiScrapeTool = defineTool<JigsawStackAiScrapeArgs, JsonObject>(
  {
    name: "jigsawstack_ai_scrape",
    description: "Extract structured web content with JigsawStack AI Scrape.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to scrape." },
        apiKey: { description: "JigsawStack API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.jigsawstack.com" },
        elementPrompts: { type: "array", items: { type: "string" } },
        rootElementSelector: { type: "string" },
        gotoOptions: { type: "object", additionalProperties: true },
        waitFor: { description: "Wait condition object or selector string." },
        pagePosition: { type: "integer" },
        sizePreset: { type: "string", enum: ["desktop", "mobile", "tablet"] },
        isMessy: { type: "boolean" },
        scale: { type: "number" },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jigsawBaseUrl(args)}/v1/ai/scrape`, {
      method: "POST",
      headers: await jigsawHeaders(args, chidori),
      body: compactObject({
        url: args.url,
        element_prompts: args.elementPrompts,
        root_element_selector: args.rootElementSelector,
        goto_options: args.gotoOptions,
        wait_for: args.waitFor as Json | undefined,
        page_position: args.pagePosition,
        size_preset: args.sizePreset,
        is_messy: args.isMessy,
        scale: args.scale,
      }) as JsonObject,
    });
  },
);

export const jigsawStackVocrTool = defineTool<JigsawStackVocrArgs, JsonObject>(
  {
    name: "jigsawstack_vocr",
    description: "Extract OCR and visual context from images or PDFs with JigsawStack vOCR.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Image or PDF URL." },
        fileStoreKey: { type: "string", description: "JigsawStack file storage key." },
        apiKey: { description: "JigsawStack API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.jigsawstack.com" },
        prompt: { description: "String, string array, or structured prompt for extraction." },
        fineGrained: { type: "boolean" },
        pageRange: { type: "array", items: { type: "integer" } },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jigsawBaseUrl(args)}/v1/vocr`, {
      method: "POST",
      headers: await jigsawHeaders(args, chidori),
      body: compactObject({
        url: args.url,
        file_store_key: args.fileStoreKey,
        prompt: args.prompt as Json | undefined,
        fine_grained: args.fineGrained,
        page_range: args.pageRange,
      }) as JsonObject,
    });
  },
);

export const jigsawStackSpeechToTextTool = defineTool<JigsawStackSpeechToTextArgs, JsonObject>(
  {
    name: "jigsawstack_speech_to_text",
    description: "Transcribe audio or video with JigsawStack Speech to Text.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Audio or video URL." },
        fileStoreKey: { type: "string", description: "JigsawStack file storage key." },
        apiKey: { description: "JigsawStack API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.jigsawstack.com" },
        language: { type: "string" },
        translate: { type: "boolean", default: false },
        bySpeaker: { type: "boolean", default: false },
        webhookUrl: { type: "string" },
        batchSize: { type: "integer", default: 30 },
        chunkDuration: { type: "integer", default: 3 },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jigsawBaseUrl(args)}/v1/ai/transcribe`, {
      method: "POST",
      headers: await jigsawHeaders(args, chidori),
      body: compactObject({
        url: args.url,
        file_store_key: args.fileStoreKey,
        language: args.language,
        translate: args.translate,
        by_speaker: args.bySpeaker,
        webhook_url: args.webhookUrl,
        batch_size: args.batchSize,
        chunk_duration: args.chunkDuration,
      }) as JsonObject,
    });
  },
);

export const jigsawStackTextToSqlTool = defineTool<JigsawStackTextToSqlArgs, JsonObject>(
  {
    name: "jigsawstack_text_to_sql",
    description: "Generate SQL from natural language and schema with JigsawStack Text to SQL.",
    parameters: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "Natural language SQL request." },
        sqlSchema: { type: "string", description: "Database schema DDL." },
        database: { type: "string", enum: ["postgresql", "mysql", "sqlite"] },
        fileStoreKey: { type: "string", description: "JigsawStack file storage key for schema." },
        apiKey: { description: "JigsawStack API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.jigsawstack.com" },
      },
      required: ["prompt"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jigsawBaseUrl(args)}/v1/ai/sql`, {
      method: "POST",
      headers: await jigsawHeaders(args, chidori),
      body: compactObject({
        prompt: args.prompt,
        sql_schema: args.sqlSchema,
        database: args.database,
        file_store_key: args.fileStoreKey,
      }) as JsonObject,
    });
  },
);

export const jigsawStackTools = {
  aiSearch: jigsawStackAiSearchTool,
  aiScrape: jigsawStackAiScrapeTool,
  vocr: jigsawStackVocrTool,
  speechToText: jigsawStackSpeechToTextTool,
  textToSql: jigsawStackTextToSqlTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getJigsawStackEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "JIGSAWSTACK_API_KEY", description: "JigsawStack API key." },
  ];
}

export const jigsawStackIntegrationSpec = {
  environmentVariables: getJigsawStackEnvironmentVariables,
} satisfies IntegrationSpec;
