import {
  bearerAuth,
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

export interface VectorSimilarityRetrieverArgs {
  query: string;
  embeddingToolName?: string;
  embeddingArgs?: JsonObject;
  embeddingInputKey?: string;
  embeddingResponsePath?: string;
  vectorStoreToolName: string;
  vectorStoreArgs?: JsonObject;
  vectorArgKey?: string;
  topK?: number;
}

export interface HydeRetrieverArgs {
  query: string;
  generatorToolName: string;
  retrieverToolName: string;
  generatorArgs?: JsonObject;
  generatorInputKey?: string;
  generatorResponsePath?: string;
  promptTemplate?: string;
  retrieverArgs?: JsonObject;
  retrieverQueryKey?: string;
  metadata?: JsonObject;
  includeHypotheticalDocument?: boolean;
}

export interface FormatDocumentsArgs {
  documents: JsonObject[];
  contentPath?: string;
  metadataPath?: string;
  separator?: string;
  includeMetadata?: boolean;
}

export interface RerankDocumentsArgs {
  query: string;
  documents: JsonObject[];
  rerankToolName?: string;
  rerankArgs?: JsonObject;
  contentPath?: string;
  metadataPath?: string;
  inputKey?: string;
  limitArgKey?: string;
  topK?: number;
  documentInputMode?: "strings" | "objects";
  metadata?: JsonObject;
}

export interface Bm25RetrieverArgs {
  query: string;
  documents: JsonObject[];
  topK?: number;
  contentPath?: string;
  metadataPath?: string;
  metadata?: JsonObject;
  k1?: number;
  b?: number;
  minScore?: number;
  includeZeroScores?: boolean;
  caseSensitive?: boolean;
}

export interface TimeWeightedRetrieverArgs {
  query: string;
  documents: JsonObject[];
  topK?: number;
  contentPath?: string;
  metadataPath?: string;
  timestampPath?: string;
  importancePath?: string;
  baseScorePath?: string;
  now?: string;
  decayRate?: number;
  timeUnit?: "hour" | "day";
  relevanceWeight?: number;
  recencyWeight?: number;
  importanceWeight?: number;
  baseScoreWeight?: number;
  metadata?: JsonObject;
  k1?: number;
  b?: number;
  includeZeroScores?: boolean;
  caseSensitive?: boolean;
}

export interface MetalRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  clientId?: SecretInput;
  indexId: string;
  baseUrl?: string;
  limit?: number;
  filters?: JsonObject;
  idsOnly?: boolean;
  embedding?: number[];
  imageUrl?: string;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AlchemystContextRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  similarityThreshold?: number;
  minimumSimilarityThreshold?: number;
  scope?: "internal" | "external" | string;
  topK?: number;
  filter?: JsonObject;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AzionEdgeSqlRetrieverArgs {
  query: string;
  token?: SecretInput;
  databaseId: string;
  baseUrl?: string;
  searchType?: "similarity" | "fts" | "hybrid";
  vectorTable?: string;
  ftsTable?: string;
  vectorIndex?: string;
  queryVector?: number[];
  embeddingToolName?: string;
  embeddingArgs?: JsonObject;
  embeddingInputKey?: string;
  embeddingResponsePath?: string;
  contentColumn?: string;
  idColumn?: string;
  metadataColumns?: string[];
  similarityK?: number;
  ftsK?: number;
  statement?: string;
  extraStatements?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DriaRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  contractId: string;
  mode?: "search" | "query" | "fetch";
  searchUrl?: string;
  apiUrl?: string;
  topK?: number;
  rerank?: boolean;
  level?: number;
  field?: string;
  queryVector?: number[];
  embeddingToolName?: string;
  embeddingArgs?: JsonObject;
  embeddingInputKey?: string;
  embeddingResponsePath?: string;
  ids?: number[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ChaindeskRetrieverArgs {
  query: string;
  datastoreId?: string;
  datastoreUrl?: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  topK?: number;
  filters?: JsonObject;
  customIds?: string[];
  datasourceIds?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ChatGptPluginRetrieverArgs {
  query: string;
  baseUrl: string;
  bearerToken?: SecretInput;
  topK?: number;
  filter?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DappierAiRecommendationsRetrieverArgs {
  query: string;
  dataModelId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  similarityTopK?: number;
  ref?: string;
  numArticlesRef?: number;
  searchAlgorithm?: "most_recent" | "semantic" | "most_recent_semantic" | "trending" | string;
  page?: number;
  numResults?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ValyuSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  maxNumResults?: number;
  searchType?: "all" | "web" | "proprietary" | "news";
  maxPrice?: number;
  relevanceThreshold?: number;
  includedSources?: string[];
  excludedSources?: string[];
  sourceBiases?: JsonObject;
  instructions?: string;
  responseLength?: "short" | "medium" | "large" | "max" | number;
  startDate?: string;
  endDate?: string;
  countryCode?: string;
  fastMode?: boolean;
  urlOnly?: boolean;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface PerplexitySearchRetrieverArgs {
  query: string | string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  country?: string;
  maxResults?: number;
  maxTokens?: number;
  maxTokensPerPage?: number;
  searchLanguageFilter?: string[];
  searchDomainFilter?: string[];
  lastUpdatedAfterFilter?: string;
  lastUpdatedBeforeFilter?: string;
  searchAfterDateFilter?: string;
  searchBeforeDateFilter?: string;
  searchRecencyFilter?: "hour" | "day" | "week" | "month" | "year";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface BraveSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  count?: number;
  country?: string;
  searchLang?: string;
  uiLang?: string;
  offset?: number;
  safesearch?: "off" | "moderate" | "strict";
  freshness?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface BingWebSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  count?: number;
  offset?: number;
  market?: string;
  safeSearch?: "Off" | "Moderate" | "Strict";
  freshness?: string;
  responseFilter?: string[];
  promote?: string[];
  textDecorations?: boolean;
  textFormat?: "Raw" | "HTML";
  setLang?: string;
  cc?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface GoogleSerperSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  endpoint?: "search" | "images" | "videos" | "places" | "news" | "shopping" | "scholar" | "patents" | "autocomplete";
  gl?: string;
  hl?: string;
  location?: string;
  num?: number;
  page?: number;
  tbs?: string;
  autocorrect?: boolean;
  type?: string;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SerpApiSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  engine?: string;
  location?: string;
  googleDomain?: string;
  gl?: string;
  hl?: string;
  num?: number;
  start?: number;
  device?: "desktop" | "tablet" | "mobile";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface TavilySearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  maxResults?: number;
  searchDepth?: "basic" | "advanced" | "fast" | "ultra-fast";
  chunksPerSource?: number;
  topic?: "general" | "news" | "finance";
  timeRange?: "day" | "week" | "month" | "year" | "d" | "w" | "m" | "y";
  startDate?: string;
  endDate?: string;
  includeRawContent?: boolean | "markdown" | "text";
  includeDomains?: string[];
  excludeDomains?: string[];
  country?: string;
  safeSearch?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ExaSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  numResults?: number;
  type?: "keyword" | "neural" | "auto";
  includeDomains?: string[];
  excludeDomains?: string[];
  category?: string;
  startPublishedDate?: string;
  endPublishedDate?: string;
  contents?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ArxivSearchRetrieverArgs {
  query?: string;
  idList?: string[];
  baseUrl?: string;
  start?: number;
  maxResults?: number;
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";
  sortOrder?: "ascending" | "descending";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface WikipediaSearchRetrieverArgs {
  query: string;
  baseUrl?: string;
  restBaseUrl?: string;
  limit?: number;
  language?: string;
  fetchSummaries?: boolean;
  redirect?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface PubMedSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  retMax?: number;
  retStart?: number;
  sort?: "relevance" | "pub_date" | "Author" | "JournalName";
  field?: string;
  dateType?: "crdt" | "edat" | "pdat" | "mdat" | string;
  relDate?: number;
  minDate?: string;
  maxDate?: string;
  tool?: string;
  email?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface LinkupSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  depth?: "fast" | "standard" | "deep";
  includeDomains?: string[];
  excludeDomains?: string[];
  fromDate?: string | null;
  toDate?: string | null;
  includeImages?: boolean;
  includeSources?: boolean;
  maxResults?: number;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface MojeekSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  excludedWords?: string;
  start?: number;
  count?: number;
  site?: string;
  since?: string;
  before?: string;
  regionBoost?: string;
  regionBoostWeight?: number;
  regionRestrict?: string;
  languageBoost?: string;
  languageBoostWeight?: number;
  languageRestrict?: string;
  includeDate?: boolean;
  includeCrawledDate?: boolean;
  includeSize?: boolean;
  dateWeight?: 0 | 100;
  titleLength?: number;
  snippetLength?: number;
  safeSearch?: boolean;
  includeDomains?: string[];
  excludeDomains?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ParallelSearchRetrieverArgs {
  objective?: string;
  searchQueries?: string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  mode?: "basic" | "advanced";
  maxCharsTotal?: number;
  sessionId?: string;
  clientModel?: string;
  advancedSettings?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface NimbleSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  locale?: string;
  country?: string;
  outputFormat?: "plain_text" | "markdown" | "simplified_html";
  maxResults?: number;
  focus?: "general" | "news" | "location" | "coding" | "geo" | "shopping" | "social" | "academic";
  contentType?: string[];
  searchDepth?: "lite" | "fast" | "deep";
  includeAnswer?: boolean;
  includeDomains?: string[];
  excludeDomains?: string[];
  startDate?: string;
  endDate?: string;
  timeRange?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface YouComSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  count?: number;
  freshness?: "day" | "week" | "month" | "year" | string;
  country?: string;
  language?: string;
  includeDomains?: string[];
  excludeDomains?: string[];
  livecrawl?: "never" | "fallback" | "always";
  livecrawlFormats?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SemanticScholarSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  fields?: string[];
  limit?: number;
  offset?: number;
  bulk?: boolean;
  token?: string;
  sort?: string;
  publicationTypes?: string[];
  openAccessPdf?: boolean;
  minCitationCount?: number;
  publicationDateOrYear?: string;
  year?: string;
  venue?: string[];
  fieldsOfStudy?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface GoogleScholarSearchRetrieverArgs {
  query?: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  cites?: string;
  cluster?: string;
  yearLow?: number;
  yearHigh?: number;
  scisbd?: 0 | 1 | 2;
  hl?: string;
  lr?: string;
  start?: number;
  num?: number;
  asSdt?: string;
  safe?: "active" | "off";
  filter?: 0 | 1;
  asVis?: 0 | 1;
  asRr?: 0 | 1;
  async?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SearxngSearchRetrieverArgs {
  query: string;
  baseUrl: string;
  categories?: string[];
  engines?: string[];
  language?: string;
  pageNumber?: number;
  timeRange?: "day" | "week" | "month" | "year";
  safesearch?: 0 | 1 | 2;
  imageProxy?: boolean;
  autocomplete?: string;
  enabledPlugins?: string[];
  disabledPlugins?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface StackExchangeSearchRetrieverArgs {
  query: string;
  site?: string;
  baseUrl?: string;
  apiKey?: SecretInput;
  tagged?: string[];
  notTagged?: string[];
  accepted?: boolean;
  answers?: number;
  body?: string;
  closed?: boolean;
  migrated?: boolean;
  notice?: boolean;
  title?: string;
  user?: number;
  url?: string;
  views?: number;
  wiki?: boolean;
  fromDate?: number;
  toDate?: number;
  min?: number;
  max?: number;
  sort?: "activity" | "creation" | "votes" | "relevance";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
  filter?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DuckDuckGoInstantAnswerRetrieverArgs {
  query: string;
  baseUrl?: string;
  noHtml?: boolean;
  noRedirect?: boolean;
  skipDisambiguation?: boolean;
  pretty?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface WolframAlphaQueryRetrieverArgs {
  input: string;
  appId?: SecretInput;
  baseUrl?: string;
  format?: string;
  assumptions?: string;
  scanners?: string;
  podIndex?: string;
  includePodId?: string;
  excludePodId?: string;
  podState?: string;
  units?: "metric" | "nonmetric";
  reinterpret?: boolean;
  translation?: boolean;
  timeout?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface VespaRetrieverArgs {
  baseUrl: string;
  token?: SecretInput;
  headers?: Record<string, string>;
  yql?: string;
  query?: string;
  hits?: number;
  offset?: number;
  ranking?: JsonObject | string;
  body?: JsonObject;
  contentField?: string;
  titleField?: string;
  urlField?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface MeilisearchRetrieverArgs {
  baseUrl: string;
  indexUid: string;
  apiKey?: SecretInput;
  q?: string;
  vector?: number[];
  hybrid?: JsonObject;
  filter?: Json | Json[];
  limit?: number;
  offset?: number;
  attributesToRetrieve?: string[];
  attributesToSearchOn?: string[];
  showRankingScore?: boolean;
  retrieveVectors?: boolean;
  sort?: string[];
  matchingStrategy?: "last" | "all" | "frequency" | string;
  body?: JsonObject;
  contentField?: string;
  titleField?: string;
  urlField?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SupabaseHybridRetrieverArgs {
  query: string;
  projectUrl: string;
  serviceRoleKey?: SecretInput;
  queryEmbedding?: number[];
  embeddingToolName?: string;
  embeddingArgs?: JsonObject;
  embeddingInputKey?: string;
  embeddingResponsePath?: string;
  similarityQueryName?: string;
  keywordQueryName?: string;
  similarityK?: number;
  keywordK?: number;
  filter?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ZepCloudGraphSearchRetrieverArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  userId?: string;
  groupId?: string;
  graphId?: string;
  scope?: "edges" | "nodes" | "episodes" | "observations" | "thread_summaries" | "auto";
  reranker?: "rrf" | "mmr" | "node_distance" | "episode_mentions" | "cross_encoder";
  limit?: number;
  maxCharacters?: number;
  mmrLambda?: number;
  centerNodeUuid?: string;
  bfsOriginNodeUuids?: string[];
  searchFilters?: JsonObject;
  minFactRating?: number;
  returnRawResults?: boolean;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ZepMemoryRetrieverArgs {
  query: string;
  sessionId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  topK?: number;
  searchScope?: "messages" | "summary" | "facts";
  searchType?: "similarity" | "mmr";
  mmrLambda?: number;
  filter?: JsonObject;
  minScore?: number;
  minFactRating?: number;
  extraBody?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AwsSignedToolArgs {
  authorization?: SecretInput;
  amzDate?: string;
  securityToken?: SecretInput;
  headers?: Record<string, string>;
}

export interface BedrockKnowledgeBaseRetrieverArgs extends AwsSignedToolArgs {
  knowledgeBaseId: string;
  query: string;
  awsToolName?: string;
  region?: string;
  endpoint?: string;
  retrievalConfiguration?: JsonObject;
  guardrailConfiguration?: JsonObject;
  nextToken?: string;
  metadata?: JsonObject;
}

export interface AmazonKendraRetrieveRetrieverArgs extends AwsSignedToolArgs {
  indexId: string;
  queryText: string;
  awsToolName?: string;
  region?: string;
  endpoint?: string;
  attributeFilter?: JsonObject;
  documentRelevanceOverrideConfigurations?: JsonObject[];
  pageNumber?: number;
  pageSize?: number;
  requestedDocumentAttributes?: string[];
  userContext?: JsonObject;
  metadata?: JsonObject;
}

export interface AmazonKendraQueryRetrieverArgs extends AwsSignedToolArgs {
  indexId: string;
  queryText: string;
  awsToolName?: string;
  region?: string;
  endpoint?: string;
  attributeFilter?: JsonObject;
  collapseConfiguration?: JsonObject;
  documentRelevanceOverrideConfigurations?: JsonObject[];
  facets?: JsonObject[];
  pageNumber?: number;
  pageSize?: number;
  queryResultTypeFilter?: "DOCUMENT" | "QUESTION_ANSWER" | "ANSWER";
  requestedDocumentAttributes?: string[];
  sortingConfiguration?: JsonObject;
  sortingConfigurations?: JsonObject[];
  spellCorrectionConfiguration?: JsonObject;
  userContext?: JsonObject;
  visitorId?: string;
  metadata?: JsonObject;
}

export type RetrievedDocument = JsonObject & {
  pageContent: string;
  metadata: JsonObject;
};

function resolveJsonPointer(input: Json, pointer: string): Json {
  if (pointer === "") {
    return input;
  }
  const parts = pointer.split("/").slice(1).map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
  let current: Json = input;
  for (const part of parts) {
    if (Array.isArray(current)) {
      current = current[Number(part)] ?? null;
    } else if (current !== null && typeof current === "object") {
      current = current[part] ?? null;
    } else {
      return null;
    }
  }
  return current;
}

function setJsonField(input: JsonObject, key: string, value: Json): JsonObject {
  return {
    ...input,
    [key]: value,
  };
}

function requireNumberArray(value: Json, label: string): number[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "number")) {
    throw new Error(`${label} must resolve to a number array`);
  }
  return value as number[];
}

function stringifyValue(value: Json): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null || value === undefined) {
    return "";
  }
  return JSON.stringify(value);
}

function bm25Tokens(text: string, caseSensitive = false): string[] {
  const normalized = caseSensitive ? text : text.toLowerCase();
  return normalized.match(/[\p{L}\p{N}_]+/gu) ?? [];
}

function bm25Metadata(value: Json): JsonObject {
  return isJsonObject(value) ? value : {};
}

export function loadBm25Documents(args: Bm25RetrieverArgs): RetrievedDocument[] {
  const contentPath = args.contentPath ?? "/pageContent";
  const metadataPath = args.metadataPath ?? "/metadata";
  const topK = args.topK ?? 4;
  const k1 = args.k1 ?? 1.5;
  const b = args.b ?? 0.75;
  const tokenizedDocuments = args.documents.map((document) => {
    const pageContent = stringifyValue(resolveJsonPointer(document, contentPath));
    return {
      pageContent,
      tokens: bm25Tokens(pageContent, args.caseSensitive),
    };
  });
  const documentCount = tokenizedDocuments.length;
  if (documentCount === 0 || topK <= 0) {
    return [];
  }
  const averageLength = tokenizedDocuments.reduce((sum, document) => sum + document.tokens.length, 0) / documentCount || 1;
  const documentFrequency = new Map<string, number>();
  for (const document of tokenizedDocuments) {
    for (const token of new Set(document.tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
  }
  const queryTokens = bm25Tokens(args.query, args.caseSensitive);
  const scores = tokenizedDocuments.map((document, index) => {
    const termFrequency = new Map<string, number>();
    for (const token of document.tokens) {
      termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1);
    }
    const score = queryTokens.reduce((sum, token) => {
      const frequency = termFrequency.get(token) ?? 0;
      if (frequency === 0) {
        return sum;
      }
      const frequencyInDocuments = documentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + (documentCount - frequencyInDocuments + 0.5) / (frequencyInDocuments + 0.5));
      const denominator = frequency + k1 * (1 - b + b * (document.tokens.length / averageLength));
      return sum + idf * ((frequency * (k1 + 1)) / denominator);
    }, 0);
    return { index, score };
  });
  const minScore = args.minScore ?? 0;
  return scores
    .filter((result) => args.includeZeroScores ? result.score >= minScore : result.score > minScore)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, topK)
    .map((result) => {
      const input = args.documents[result.index]!;
      const tokenizedDocument = tokenizedDocuments[result.index]!;
      return {
        pageContent: tokenizedDocument.pageContent,
        metadata: {
          ...bm25Metadata(resolveJsonPointer(input, metadataPath)),
          ...(args.metadata ?? {}),
          source: "bm25",
          score: result.score,
          documentIndex: result.index,
        },
      };
    });
}

function jsonNumber(value: Json | undefined): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function jsonDateMs(value: Json | undefined): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value > 10_000_000_000 ? value : value * 1000;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function loadTimeWeightedDocuments(args: TimeWeightedRetrieverArgs): RetrievedDocument[] {
  const contentPath = args.contentPath ?? "/pageContent";
  const metadataPath = args.metadataPath ?? "/metadata";
  const timestampPath = args.timestampPath ?? "/metadata/lastAccessedAt";
  const importancePath = args.importancePath ?? "/metadata/importance";
  const baseScorePath = args.baseScorePath ?? "/metadata/score";
  const topK = args.topK ?? 4;
  if (args.documents.length === 0 || topK <= 0) {
    return [];
  }
  const nowMs = jsonDateMs(args.now ?? new Date().toISOString()) ?? Date.now();
  const unitMs = (args.timeUnit ?? "hour") === "day" ? 86_400_000 : 3_600_000;
  const decayRate = args.decayRate ?? 0.01;
  const relevanceWeight = args.relevanceWeight ?? 1;
  const recencyWeight = args.recencyWeight ?? 1;
  const importanceWeight = args.importanceWeight ?? 1;
  const baseScoreWeight = args.baseScoreWeight ?? 1;
  const bm25Docs = loadBm25Documents(compactObject({
    query: args.query,
    documents: args.documents,
    topK: args.documents.length,
    contentPath,
    metadataPath,
    k1: args.k1,
    b: args.b,
    includeZeroScores: true,
    caseSensitive: args.caseSensitive,
  }) as Bm25RetrieverArgs);
  const relevanceByIndex = new Map<number, number>();
  for (const document of bm25Docs) {
    const index = jsonNumber(document.metadata.documentIndex);
    if (index !== undefined) {
      relevanceByIndex.set(index, jsonNumber(document.metadata.score) ?? 0);
    }
  }
  const ranked = args.documents.map((document, index) => {
    const pageContent = stringifyValue(resolveJsonPointer(document, contentPath));
    const ageUnits = Math.max(0, (nowMs - (jsonDateMs(resolveJsonPointer(document, timestampPath)) ?? nowMs)) / unitMs);
    const recencyScore = Math.pow(1 - decayRate, ageUnits);
    const relevanceScore = relevanceByIndex.get(index) ?? 0;
    const importanceScore = jsonNumber(resolveJsonPointer(document, importancePath)) ?? 0;
    const baseScore = jsonNumber(resolveJsonPointer(document, baseScorePath)) ?? 0;
    const score = (relevanceWeight * relevanceScore)
      + (recencyWeight * recencyScore)
      + (importanceWeight * importanceScore)
      + (baseScoreWeight * baseScore);
    return {
      index,
      pageContent,
      score,
      relevanceScore,
      recencyScore,
      importanceScore,
      baseScore,
      ageUnits,
    };
  });
  return ranked
    .filter((result) => result.pageContent.trim().length > 0)
    .filter((result) => args.includeZeroScores ? result.score >= 0 : result.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, topK)
    .map((result, rank) => ({
      pageContent: result.pageContent,
      metadata: compactObject({
        ...bm25Metadata(resolveJsonPointer(args.documents[result.index]!, metadataPath)),
        ...(args.metadata ?? {}),
        source: "time_weighted",
        score: result.score,
        relevanceScore: result.relevanceScore,
        recencyScore: result.recencyScore,
        importanceScore: result.importanceScore,
        baseScore: result.baseScore,
        ageUnits: result.ageUnits,
        rank,
        documentIndex: result.index,
      }) as JsonObject,
    }));
}

async function metalHeaders(args: Pick<MetalRetrieverArgs, "apiKey" | "clientId">, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders({
    "x-metal-api-key": await resolveSecret(args.apiKey, chidori, "Metal API key"),
    "x-metal-client-id": await resolveSecret(args.clientId, chidori, "Metal client ID"),
  });
}

function metalSearchItems(response: JsonObject): JsonObject[] {
  if (Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  if (isJsonObject(response.data) && Array.isArray(response.data.data)) {
    return response.data.data.filter(isJsonObject);
  }
  if (Array.isArray(response.results)) {
    return response.results.filter(isJsonObject);
  }
  if (Array.isArray(response.documents)) {
    return response.documents.filter(isJsonObject);
  }
  return [];
}

function metalScore(item: JsonObject): number | undefined {
  return numberField(item, "score")
    ?? numberField(item, "similarity")
    ?? numberField(item, "distance")
    ?? numberField(item, "cosineDistance");
}

export function loadMetalSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return metalSearchItems(response).flatMap((item, index) => {
    const itemMetadata = isJsonObject(item.metadata) ? item.metadata : {};
    const pageContent = stringifyValue(item.text ?? item.content ?? item.pageContent ?? itemMetadata.text ?? itemMetadata.content ?? item.id ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...itemMetadata,
        ...metadata,
        source: "metal",
        id: typeof item.id === "string" || typeof item.id === "number" ? item.id : undefined,
        score: metalScore(item),
        createdAt: stringField(item, "createdAt") ?? stringField(item, "created_at"),
        updatedAt: stringField(item, "updatedAt") ?? stringField(item, "updated_at"),
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function alchemystContextItems(response: JsonObject): JsonObject[] {
  if (Array.isArray(response.contexts)) {
    return response.contexts.filter(isJsonObject);
  }
  if (Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  if (Array.isArray(response.results)) {
    return response.results.filter(isJsonObject);
  }
  if (Array.isArray(response.documents)) {
    return response.documents.filter(isJsonObject);
  }
  return [];
}

export function loadAlchemystContextDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return alchemystContextItems(response).flatMap((item, index) => {
    const itemMetadata = isJsonObject(item.metadata) ? item.metadata : {};
    const pageContent = stringifyValue(item.content ?? item.text ?? item.pageContent ?? item.chunk ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...itemMetadata,
        ...metadata,
        source: "alchemyst_context",
        id: typeof item.id === "string" || typeof item.id === "number" ? item.id : undefined,
        documentId: stringField(item, "document_id") ?? stringField(item, "documentId") ?? stringField(itemMetadata, "document_id") ?? stringField(itemMetadata, "documentId"),
        fileName: stringField(item, "file_name") ?? stringField(item, "fileName") ?? stringField(itemMetadata, "file_name") ?? stringField(itemMetadata, "fileName"),
        contextType: stringField(item, "context_type") ?? stringField(item, "contextType") ?? stringField(itemMetadata, "context_type") ?? stringField(itemMetadata, "contextType"),
        alchemystSource: stringField(item, "source"),
        scope: stringField(item, "scope"),
        score: numberField(item, "score") ?? numberField(item, "similarity") ?? numberField(item, "similarity_score"),
        createdAt: stringField(item, "created_at") ?? stringField(item, "createdAt"),
        updatedAt: stringField(item, "updated_at") ?? stringField(item, "updatedAt"),
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function quoteSqlIdentifier(identifier: string): string {
  const parts = identifier.split(".");
  if (parts.length === 0 || parts.some((part) => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(part))) {
    throw new Error(`Invalid SQL identifier: ${identifier}`);
  }
  return parts.map((part) => `"${part.replaceAll("\"", "\"\"")}"`).join(".");
}

function sqlStringLiteral(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function azionVectorLiteral(vector: number[]): string {
  if (vector.some((value) => !Number.isFinite(value))) {
    throw new Error("queryVector values must be finite numbers");
  }
  return sqlStringLiteral(JSON.stringify(vector));
}

function positiveInteger(value: number | undefined, fallback: number, label: string): number {
  const resolved = value ?? fallback;
  if (!Number.isInteger(resolved) || resolved <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
  return resolved;
}

function azionColumnRef(alias: string, column: string): string {
  return `${quoteSqlIdentifier(alias)}.${quoteSqlIdentifier(column)}`;
}

function azionSelectColumns(args: AzionEdgeSqlRetrieverArgs, alias: string): string {
  const idColumn = args.idColumn ?? "id";
  const contentColumn = args.contentColumn ?? "page_content";
  const metadataColumns = args.metadataColumns ?? [];
  return [
    `${azionColumnRef(alias, idColumn)} AS "id"`,
    `${azionColumnRef(alias, contentColumn)} AS "page_content"`,
    ...metadataColumns.map((column) => `${azionColumnRef(alias, column)} AS ${quoteSqlIdentifier(column.split(".").at(-1) ?? column)}`),
  ].join(", ");
}

function azionSimilarityStatement(args: AzionEdgeSqlRetrieverArgs, vector: number[]): string {
  if (!args.vectorTable) {
    throw new Error("vectorTable is required for Azion similarity search");
  }
  const alias = "source_rows";
  const matchesAlias = "matches";
  const table = quoteSqlIdentifier(args.vectorTable);
  const indexName = args.vectorIndex ?? `${args.vectorTable}_idx`;
  const topK = positiveInteger(args.similarityK, 4, "similarityK");
  return [
    `SELECT ${azionSelectColumns(args, alias)}, 'similarity' AS "search_type", ${quoteSqlIdentifier(matchesAlias)}."distance" AS "distance"`,
    `FROM ${table} AS ${quoteSqlIdentifier(alias)}`,
    `JOIN vector_top_k(${sqlStringLiteral(indexName)}, ${azionVectorLiteral(vector)}, ${topK}) AS ${quoteSqlIdentifier(matchesAlias)}`,
    `ON ${quoteSqlIdentifier(alias)}."rowid" = ${quoteSqlIdentifier(matchesAlias)}."id"`,
  ].join(" ");
}

function azionFtsStatement(args: AzionEdgeSqlRetrieverArgs): string {
  const tableName = args.ftsTable ?? args.vectorTable;
  if (!tableName) {
    throw new Error("ftsTable or vectorTable is required for Azion full-text search");
  }
  const alias = "fts_rows";
  const topK = positiveInteger(args.ftsK, 4, "ftsK");
  return [
    `SELECT ${azionSelectColumns(args, alias)}, 'fts' AS "search_type", rank AS "rank"`,
    `FROM ${quoteSqlIdentifier(tableName)} AS ${quoteSqlIdentifier(alias)}`,
    `WHERE ${quoteSqlIdentifier(alias)} MATCH ${sqlStringLiteral(args.query)}`,
    `LIMIT ${topK}`,
  ].join(" ");
}

async function azionQueryVector(args: AzionEdgeSqlRetrieverArgs, chidori: Parameters<typeof resolveSecret>[1]): Promise<number[]> {
  if (args.queryVector) {
    return requireNumberArray(args.queryVector, "queryVector");
  }
  if (!args.embeddingToolName) {
    throw new Error("queryVector or embeddingToolName is required for Azion vector search");
  }
  const embeddingArgs = setJsonField(args.embeddingArgs ?? {}, args.embeddingInputKey ?? "input", args.query);
  const embeddingResponse = await chidori.tool<JsonObject, JsonObject>(args.embeddingToolName, embeddingArgs);
  return requireNumberArray(
    resolveJsonPointer(embeddingResponse, args.embeddingResponsePath ?? "/data/0/embedding"),
    "embeddingResponsePath",
  );
}

async function azionStatements(args: AzionEdgeSqlRetrieverArgs, chidori: Parameters<typeof resolveSecret>[1]): Promise<string[]> {
  if (args.statement) {
    return [args.statement, ...(args.extraStatements ?? [])];
  }
  const searchType = args.searchType ?? "similarity";
  if (searchType === "fts") {
    return [azionFtsStatement(args), ...(args.extraStatements ?? [])];
  }
  const vector = await azionQueryVector(args, chidori);
  if (searchType === "hybrid") {
    return [azionSimilarityStatement(args, vector), azionFtsStatement(args), ...(args.extraStatements ?? [])];
  }
  return [azionSimilarityStatement(args, vector), ...(args.extraStatements ?? [])];
}

function azionEdgeSqlRows(response: JsonObject): JsonObject[] {
  if (Array.isArray(response.rows)) {
    return response.rows.filter(isJsonObject);
  }
  if (isJsonObject(response.data) && Array.isArray(response.data.rows)) {
    return response.data.rows.filter(isJsonObject);
  }
  if (Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  if (Array.isArray(response.results)) {
    return response.results.flatMap((result) => {
      if (isJsonObject(result) && Array.isArray(result.rows)) {
        return result.rows.filter(isJsonObject);
      }
      return isJsonObject(result) ? [result] : [];
    });
  }
  if (isJsonObject(response.data) && Array.isArray(response.data.results)) {
    return response.data.results.flatMap((result) => {
      if (isJsonObject(result) && Array.isArray(result.rows)) {
        return result.rows.filter(isJsonObject);
      }
      return isJsonObject(result) ? [result] : [];
    });
  }
  return [];
}

export function loadAzionEdgeSqlDocuments(
  response: JsonObject,
  metadata: JsonObject = {},
  options: Pick<AzionEdgeSqlRetrieverArgs, "contentColumn" | "idColumn" | "metadataColumns"> = {},
): RetrievedDocument[] {
  const contentColumn = options.contentColumn ?? "page_content";
  const idColumn = options.idColumn ?? "id";
  const metadataColumns = options.metadataColumns ?? [];
  return azionEdgeSqlRows(response).flatMap((row, index) => {
    const rowMetadata = isJsonObject(row.metadata) ? row.metadata : {};
    const selectedMetadata = metadataColumns.reduce<JsonObject>((out, column) => {
      const value = row[column];
      return value === undefined ? out : { ...out, [column]: value };
    }, {});
    const pageContent = stringifyValue(row[contentColumn] ?? row.pageContent ?? row.content ?? row.text ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...rowMetadata,
        ...selectedMetadata,
        ...metadata,
        source: "azion_edgesql",
        id: row[idColumn] ?? row.id,
        score: numberField(row, "score") ?? numberField(row, "similarity") ?? numberField(row, "distance") ?? numberField(row, "rank"),
        distance: numberField(row, "distance"),
        rank: numberField(row, "rank"),
        searchType: stringField(row, "search_type") ?? stringField(row, "searchType"),
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function parseDriaMetadata(value: Json | undefined): JsonObject {
  if (isJsonObject(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    try {
      const parsed = JSON.parse(value) as Json;
      return isJsonObject(parsed) ? parsed : { text: value };
    } catch {
      return { text: value };
    }
  }
  return {};
}

function driaResults(response: JsonObject): JsonObject[] {
  if (Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  if (isJsonObject(response.data) && Array.isArray(response.data.metadata)) {
    const metadataRows = response.data.metadata;
    const vectors = Array.isArray(response.data.vectors) ? response.data.vectors : [];
    return metadataRows.map((metadataRow, index) => compactObject({
      metadata: metadataRow,
      vector: vectors[index],
    }) as JsonObject);
  }
  if (isJsonObject(response.data) && Array.isArray(response.data.results)) {
    return response.data.results.filter(isJsonObject);
  }
  if (Array.isArray(response.results)) {
    return response.results.filter(isJsonObject);
  }
  if (Array.isArray(response.documents)) {
    return response.documents.filter(isJsonObject);
  }
  return [];
}

export function loadDriaDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return driaResults(response).flatMap((item, index) => {
    const itemMetadata = parseDriaMetadata(item.metadata);
    const pageContent = stringifyValue(
      item.text
      ?? item.content
      ?? item.pageContent
      ?? itemMetadata.text
      ?? itemMetadata.content
      ?? itemMetadata.pageContent
      ?? itemMetadata.title
      ?? item.id
      ?? "",
    );
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...itemMetadata,
        ...metadata,
        source: "dria",
        id: typeof item.id === "string" || typeof item.id === "number" ? item.id : undefined,
        score: numberField(item, "score"),
        vector: Array.isArray(item.vector) ? item.vector as Json : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function driaHeaders(apiKey: string): Record<string, string> {
  return jsonHeaders({
    "x-api-key": apiKey,
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    Accept: "*/*",
  });
}

function driaSearchBaseUrl(args: Pick<DriaRetrieverArgs, "searchUrl">): string {
  return trimTrailingSlash(args.searchUrl ?? "https://search.dria.co/hnsw");
}

function driaApiBaseUrl(args: Pick<DriaRetrieverArgs, "apiUrl">): string {
  return trimTrailingSlash(args.apiUrl ?? "https://api.dria.co");
}

async function driaModel(args: DriaRetrieverArgs, chidori: Parameters<typeof resolveSecret>[1], apiKey: string): Promise<string> {
  const response = await requestJson<JsonObject>(
    chidori,
    withQuery(`${driaApiBaseUrl(args)}/v1/knowledge/index/get_model`, { contract_id: args.contractId }),
    compactObject({
      method: "GET",
      headers: driaHeaders(apiKey),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions,
  );
  const data = isJsonObject(response.data) ? response.data : response;
  const model = stringField(data, "model");
  if (!model) {
    throw new Error("Dria model lookup did not return a model");
  }
  return model;
}

async function driaQueryVector(args: DriaRetrieverArgs, chidori: Parameters<typeof resolveSecret>[1]): Promise<number[]> {
  if (args.queryVector) {
    return requireNumberArray(args.queryVector, "queryVector");
  }
  if (!args.embeddingToolName) {
    throw new Error("queryVector or embeddingToolName is required for Dria vector query mode");
  }
  const embeddingArgs = setJsonField(args.embeddingArgs ?? {}, args.embeddingInputKey ?? "input", args.query);
  const embeddingResponse = await chidori.tool<JsonObject, JsonObject>(args.embeddingToolName, embeddingArgs);
  return requireNumberArray(
    resolveJsonPointer(embeddingResponse, args.embeddingResponsePath ?? "/data/0/embedding"),
    "embeddingResponsePath",
  );
}

function rerankResults(response: Json): JsonObject[] {
  if (Array.isArray(response)) {
    return response.filter(isJsonObject);
  }
  if (!isJsonObject(response)) {
    return [];
  }
  for (const key of ["results", "data", "rankings", "rerank_results"]) {
    const value = response[key];
    if (Array.isArray(value)) {
      return value.filter(isJsonObject);
    }
  }
  return [];
}

function rerankIndex(result: JsonObject, fallback: number): number {
  const value = result.index ?? result.document_index ?? result.documentIndex;
  return typeof value === "number" && Number.isInteger(value) ? value : fallback;
}

function rerankScore(result: JsonObject): number | undefined {
  const value = result.relevance_score ?? result.relevanceScore ?? result.score ?? result._score;
  return typeof value === "number" ? value : undefined;
}

function rerankInputDocuments(args: RerankDocumentsArgs): Json[] {
  const contentPath = args.contentPath ?? "/pageContent";
  const metadataPath = args.metadataPath ?? "/metadata";
  return args.documents.map((document, index) => {
    const pageContent = stringifyValue(resolveJsonPointer(document, contentPath));
    if ((args.documentInputMode ?? "strings") === "strings") {
      return pageContent;
    }
    const documentMetadata = bm25Metadata(resolveJsonPointer(document, metadataPath));
    return compactObject({
      ...document,
      pageContent,
      text: pageContent,
      metadata: documentMetadata,
      sourceIndex: index,
    }) as JsonObject;
  });
}

export function loadRerankedDocuments(
  response: Json,
  documents: JsonObject[],
  options: Partial<Pick<RerankDocumentsArgs, "contentPath" | "metadataPath" | "metadata" | "rerankToolName" | "topK">> = {},
): RetrievedDocument[] {
  const contentPath = options.contentPath ?? "/pageContent";
  const metadataPath = options.metadataPath ?? "/metadata";
  const results = rerankResults(response);
  const selected = options.topK === undefined ? results : results.slice(0, Math.max(0, options.topK));
  return selected.flatMap((result, rank) => {
    const sourceIndex = rerankIndex(result, rank);
    const document = documents[sourceIndex];
    if (!document) {
      return [];
    }
    const pageContent = stringifyValue(resolveJsonPointer(document, contentPath));
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...bm25Metadata(resolveJsonPointer(document, metadataPath)),
        ...(options.metadata ?? {}),
        source: "rerank_documents",
        rerankToolName: options.rerankToolName,
        rerankRank: rank,
        rerankScore: rerankScore(result),
        sourceIndex,
        rawRerankResult: result,
      }) as JsonObject,
    }];
  });
}

function hydePrompt(args: HydeRetrieverArgs): string {
  const template = args.promptTemplate
    ?? "Write a concise, factual passage that would answer the following query. Query: {query}";
  return template.replaceAll("{query}", args.query);
}

function generatedTextFromResponse(response: Json, pointer?: string): string {
  if (pointer !== undefined) {
    return stringifyValue(resolveJsonPointer(response, pointer));
  }
  if (!isJsonObject(response)) {
    return stringifyValue(response);
  }
  const message = isJsonObject(response.message) ? response.message : {};
  const choices = Array.isArray(response.choices) ? response.choices.filter(isJsonObject) : [];
  const firstChoice = choices[0];
  const firstChoiceMessage = firstChoice && isJsonObject(firstChoice.message) ? firstChoice.message : {};
  return stringifyValue(
    response.output_text
      ?? response.text
      ?? response.content
      ?? message.content
      ?? firstChoiceMessage.content
      ?? firstChoice?.text
      ?? response,
  );
}

function retrieverDocuments(response: Json): JsonObject[] {
  if (Array.isArray(response)) {
    return response.filter(isJsonObject);
  }
  if (isJsonObject(response) && Array.isArray(response.documents)) {
    return response.documents.filter(isJsonObject);
  }
  return [];
}

export function loadHydeDocuments(
  response: Json,
  query: string,
  hypotheticalDocument: string,
  metadata: JsonObject = {},
): RetrievedDocument[] {
  return retrieverDocuments(response).flatMap((document, index) => {
    const pageContent = stringifyValue(document.pageContent ?? document.content ?? document.text ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    const documentMetadata = isJsonObject(document.metadata) ? document.metadata : {};
    return [{
      pageContent,
      metadata: compactObject({
        ...documentMetadata,
        ...metadata,
        source: "hyde",
        retrieverSource: typeof documentMetadata.source === "string" ? documentMetadata.source : undefined,
        query,
        hypotheticalDocument,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function chaindeskQueryUrl(args: Pick<ChaindeskRetrieverArgs, "baseUrl" | "datastoreId" | "datastoreUrl">): string {
  if (args.datastoreUrl) {
    return args.datastoreUrl;
  }
  if (!args.datastoreId) {
    throw new Error("datastoreId or datastoreUrl is required");
  }
  return `${trimTrailingSlash(args.baseUrl ?? "https://app.chaindesk.ai")}/api/datastores/${encodeURIComponent(args.datastoreId)}/query`;
}

function chaindeskFilters(args: ChaindeskRetrieverArgs): JsonObject | undefined {
  if (args.filters) {
    return args.filters;
  }
  return compactObject({
    custom_ids: args.customIds,
    datasource_ids: args.datasourceIds,
  }) as JsonObject;
}

async function chaindeskHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  if (!apiKey) {
    return jsonHeaders();
  }
  return jsonHeaders(bearerAuth(await resolveSecret(apiKey, chidori, "Chaindesk API key")));
}

export function loadChaindeskDocuments(response: Json, metadata: JsonObject = {}): RetrievedDocument[] {
  const items = Array.isArray(response)
    ? response
    : isJsonObject(response) && Array.isArray(response.results)
      ? response.results
      : [];
  return items.flatMap((item) => {
    if (!isJsonObject(item)) {
      return [];
    }
    const text = stringifyValue(item.text ?? item.content ?? item.pageContent ?? null);
    if (!text.trim()) {
      return [];
    }
    return [{
      pageContent: text,
      metadata: compactObject({
        ...metadata,
        source: "chaindesk",
        url: typeof item.source === "string" ? item.source : undefined,
        score: typeof item.score === "number" ? item.score : undefined,
        datasourceId: typeof item.datasource_id === "string" ? item.datasource_id : undefined,
        datasourceName: typeof item.datasource_name === "string" ? item.datasource_name : undefined,
      }) as JsonObject,
    }];
  });
}

function chatGptPluginQueryUrl(baseUrl: string): string {
  return `${trimTrailingSlash(baseUrl)}/query`;
}

async function chatGptPluginHeaders(bearerToken: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  if (!bearerToken) {
    return jsonHeaders();
  }
  return jsonHeaders(bearerAuth(await resolveSecret(bearerToken, chidori, "ChatGPT retrieval plugin bearer token")));
}

function chatGptPluginResultGroups(response: Json): Json[][] {
  if (isJsonObject(response) && Array.isArray(response.results)) {
    return response.results.map((group) => Array.isArray(group) ? group : [group]);
  }
  if (Array.isArray(response)) {
    return [response];
  }
  return [];
}

export function loadChatGptPluginDocuments(response: Json, metadata: JsonObject = {}): RetrievedDocument[] {
  return chatGptPluginResultGroups(response).flatMap((group, groupIndex) => {
    return group.flatMap((item, resultIndex) => {
      if (!isJsonObject(item)) {
        return [];
      }
      const documentMetadata = isJsonObject(item.metadata) ? item.metadata : {};
      const text = stringifyValue(item.text ?? item.pageContent ?? item.content ?? "");
      if (!text.trim()) {
        return [];
      }
      return [{
        pageContent: text,
        metadata: compactObject({
          ...documentMetadata,
          ...metadata,
          source: "chatgpt_retrieval_plugin",
          id: typeof item.id === "string" ? item.id : undefined,
          score: typeof item.score === "number" ? item.score : undefined,
          embedding: Array.isArray(item.embedding) ? item.embedding as Json : undefined,
          queryIndex: groupIndex,
          sourceIndex: resultIndex,
        }) as JsonObject,
      }];
    });
  });
}

function dappierRecommendationsUrl(baseUrl: string | undefined, dataModelId: string): string {
  return withQuery(`${trimTrailingSlash(baseUrl ?? "https://api.dappier.com")}/app/v2/search`, {
    data_model_id: dataModelId,
  });
}

async function dappierHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders(bearerAuth(await resolveSecret(apiKey, chidori, "Dappier API key")));
}

export function loadDappierAiRecommendationsDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const responseBody = isJsonObject(response.response) ? response.response : response;
  const results = Array.isArray(responseBody.results) ? responseBody.results.filter(isJsonObject) : [];
  return results.flatMap((result, index) => {
    const pageContent = stringifyValue(result.summary ?? result.preview_content ?? result.title ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "dappier_ai_recommendations",
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        sourceUrl: typeof result.source_url === "string" ? result.source_url : undefined,
        site: typeof result.site === "string" ? result.site : undefined,
        siteDomain: typeof result.site_domain === "string" ? result.site_domain : undefined,
        author: typeof result.author === "string" ? result.author : undefined,
        imageUrl: typeof result.image_url === "string" ? result.image_url : undefined,
        pubdate: typeof result.pubdate === "string" ? result.pubdate : undefined,
        pubdateUnix: typeof result.pubdate_unix === "number" ? result.pubdate_unix : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        query: typeof responseBody.query === "string" ? responseBody.query : undefined,
        message: typeof responseBody.message === "string" ? responseBody.message : undefined,
        status: typeof response.status === "string" ? response.status : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function valyuSearchUrl(baseUrl: string | undefined): string {
  return `${trimTrailingSlash(baseUrl ?? "https://api.valyu.ai")}/v1/search`;
}

async function valyuSearchHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders({ "X-API-Key": await resolveSecret(apiKey, chidori, "Valyu API key") });
}

function valyuSearchBody(args: ValyuSearchRetrieverArgs): JsonObject {
  return compactObject({
    ...(args.extraBody ?? {}),
    query: args.query,
    max_num_results: args.maxNumResults,
    search_type: args.searchType,
    max_price: args.maxPrice,
    relevance_threshold: args.relevanceThreshold,
    included_sources: args.includedSources,
    excluded_sources: args.excludedSources,
    source_biases: args.sourceBiases,
    instructions: args.instructions,
    response_length: args.responseLength,
    start_date: args.startDate,
    end_date: args.endDate,
    country_code: args.countryCode,
    fast_mode: args.fastMode,
    url_only: args.urlOnly,
  }) as JsonObject;
}

export function loadValyuSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.flatMap((result, index) => {
    const pageContent = stringifyValue(result.content ?? result.text ?? result.snippet ?? result.summary ?? result.description ?? result.title ?? "");
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "valyu_search",
        id: typeof result.id === "string" ? result.id : undefined,
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        relevanceScore: typeof result.relevance_score === "number" ? result.relevance_score : undefined,
        dataType: typeof result.data_type === "string" ? result.data_type : undefined,
        sourceType: typeof result.source_type === "string" ? result.source_type : undefined,
        publicationDate: typeof result.publication_date === "string" ? result.publication_date : undefined,
        query: typeof response.query === "string" ? response.query : undefined,
        txId: typeof response.tx_id === "string" ? response.tx_id : undefined,
        totalDeductionDollars: typeof response.total_deduction_dollars === "number" ? response.total_deduction_dollars : undefined,
        totalCharacters: typeof response.total_characters === "number" ? response.total_characters : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

async function optionalBearerSecret(secret: SecretInput | undefined, label: string, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return secret ? bearerAuth(await resolveSecret(secret, chidori, label)) : {};
}

function isJsonObject(value: Json | undefined): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function stringField(value: JsonObject, key: string): string | undefined {
  const field = value[key];
  return typeof field === "string" && field.trim().length > 0 ? field : undefined;
}

function numberField(value: JsonObject, key: string): number | undefined {
  const field = value[key];
  return typeof field === "number" ? field : undefined;
}

function awsDocumentAttributes(value: Json | undefined): JsonObject {
  const attributes = Array.isArray(value) ? value.filter(isJsonObject) : [];
  return attributes.reduce<JsonObject>((out, attribute) => {
    const key = stringField(attribute, "Key") ?? stringField(attribute, "key");
    if (!key) {
      return out;
    }
    const rawValue = attribute.Value ?? attribute.value;
    out[key] = isJsonObject(rawValue) && Object.keys(rawValue).length === 1
      ? Object.values(rawValue)[0] as Json
      : rawValue as Json;
    return out;
  }, {});
}

function bedrockKnowledgeBaseContent(item: JsonObject): string {
  const content = isJsonObject(item.content) ? item.content : {};
  return stringifyValue(content.text ?? content.byteContent ?? content.row ?? item.text ?? item.content ?? "");
}

function bedrockKnowledgeBaseLocationMetadata(item: JsonObject): JsonObject {
  const location = isJsonObject(item.location) ? item.location : {};
  const typedLocation = Object.values(location).find(isJsonObject) ?? {};
  return compactObject({
    locationType: stringField(location, "type"),
    uri: stringField(typedLocation, "uri"),
    url: stringField(typedLocation, "url"),
    bucket: stringField(typedLocation, "bucket"),
    key: stringField(typedLocation, "key"),
    id: stringField(typedLocation, "id"),
    fileId: stringField(typedLocation, "fileId"),
    webUrl: stringField(typedLocation, "webUrl"),
  }) as JsonObject;
}

export function loadBedrockKnowledgeBaseDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.retrievalResults) ? response.retrievalResults.filter(isJsonObject) : [];
  return results.flatMap((result, index) => {
    const pageContent = bedrockKnowledgeBaseContent(result);
    if (!pageContent.trim()) {
      return [];
    }
    const resultMetadata = isJsonObject(result.metadata) ? result.metadata : {};
    return [{
      pageContent,
      metadata: compactObject({
        ...resultMetadata,
        ...metadata,
        ...bedrockKnowledgeBaseLocationMetadata(result),
        source: "bedrock_knowledge_base",
        score: numberField(result, "score"),
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function kendraRetrieveContent(item: JsonObject): string {
  return stringifyValue(item.Content ?? item.content ?? item.DocumentExcerpt ?? item.documentExcerpt ?? "");
}

function kendraQueryContent(item: JsonObject): string {
  const excerpt = item.DocumentExcerpt ?? item.documentExcerpt;
  if (isJsonObject(excerpt)) {
    return stringifyValue(excerpt.Text ?? excerpt.text ?? "");
  }
  return stringifyValue(item.Content ?? item.content ?? item.DocumentTitle ?? item.documentTitle ?? "");
}

function kendraTitle(value: Json | undefined): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (isJsonObject(value)) {
    return stringField(value, "Text") ?? stringField(value, "text");
  }
  return undefined;
}

function kendraScoreConfidence(item: JsonObject): string | undefined {
  const scoreAttributes = isJsonObject(item.ScoreAttributes) ? item.ScoreAttributes : item.scoreAttributes;
  return isJsonObject(scoreAttributes)
    ? stringField(scoreAttributes, "ScoreConfidence") ?? stringField(scoreAttributes, "scoreConfidence")
    : undefined;
}

function kendraHighlights(value: Json | undefined): Json | undefined {
  if (!isJsonObject(value)) {
    return undefined;
  }
  const highlights = value.Highlights ?? value.highlights;
  return Array.isArray(highlights) ? highlights : undefined;
}

function kendraDocument(
  item: JsonObject,
  pageContent: string,
  source: "amazon_kendra_retrieve" | "amazon_kendra_query",
  index: number,
  metadata: JsonObject,
): RetrievedDocument[] {
  if (!pageContent.trim()) {
    return [];
  }
  const excerpt = isJsonObject(item.DocumentExcerpt) ? item.DocumentExcerpt : item.documentExcerpt;
  return [{
    pageContent,
    metadata: compactObject({
      ...metadata,
      source,
      id: stringField(item, "Id") ?? stringField(item, "id"),
      documentId: stringField(item, "DocumentId") ?? stringField(item, "documentId"),
      documentTitle: kendraTitle(item.DocumentTitle ?? item.documentTitle),
      documentUri: stringField(item, "DocumentURI") ?? stringField(item, "documentURI") ?? stringField(item, "documentUri"),
      documentAttributes: awsDocumentAttributes(item.DocumentAttributes ?? item.documentAttributes),
      type: stringField(item, "Type") ?? stringField(item, "type"),
      format: stringField(item, "Format") ?? stringField(item, "format"),
      scoreConfidence: kendraScoreConfidence(item),
      highlights: kendraHighlights(excerpt),
      sourceIndex: index,
    }) as JsonObject,
  }];
}

export function loadAmazonKendraRetrieveDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.ResultItems) ? response.ResultItems.filter(isJsonObject) : [];
  return results.flatMap((result, index) => kendraDocument(
    result,
    kendraRetrieveContent(result),
    "amazon_kendra_retrieve",
    index,
    metadata,
  ));
}

export function loadAmazonKendraQueryDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.ResultItems) ? response.ResultItems.filter(isJsonObject) : [];
  return results.flatMap((result, index) => kendraDocument(
    result,
    kendraQueryContent(result),
    "amazon_kendra_query",
    index,
    metadata,
  ));
}

async function vespaHeaders(args: Pick<VespaRetrieverArgs, "token" | "headers">, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders({
    ...await optionalBearerSecret(args.token, "Vespa bearer token", chidori),
    ...(args.headers ?? {}),
  });
}

function vespaQueryBody(args: VespaRetrieverArgs): JsonObject {
  if (args.body) {
    return args.body;
  }
  return compactObject({
    yql: args.yql,
    query: args.query,
    hits: args.hits,
    offset: args.offset,
    ranking: args.ranking,
  }) as JsonObject;
}

function vespaChildren(response: JsonObject): JsonObject[] {
  const root = isJsonObject(response.root) ? response.root : response;
  const children = Array.isArray(root.children) ? root.children : [];
  const out: JsonObject[] = [];
  const visit = (child: Json): void => {
    if (!isJsonObject(child)) {
      return;
    }
    if (isJsonObject(child.fields)) {
      out.push(child);
    }
    const nested = Array.isArray(child.children) ? child.children : [];
    nested.forEach(visit);
  };
  children.forEach(visit);
  return out;
}

function vespaStringField(fields: JsonObject, key: string | undefined): string | undefined {
  if (!key) {
    return undefined;
  }
  const value = fields[key];
  return typeof value === "string" ? value : undefined;
}

async function meilisearchHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders(apiKey ? bearerAuth(await resolveSecret(apiKey, chidori, "Meilisearch API key")) : {});
}

function meilisearchSearchUrl(baseUrl: string, indexUid: string): string {
  return `${trimTrailingSlash(baseUrl)}/indexes/${encodeURIComponent(indexUid)}/search`;
}

function meilisearchSearchBody(args: MeilisearchRetrieverArgs): JsonObject {
  if (args.body) {
    return args.body;
  }
  return compactObject({
    q: args.q,
    vector: args.vector,
    hybrid: args.hybrid,
    filter: args.filter,
    limit: args.limit,
    offset: args.offset,
    attributesToRetrieve: args.attributesToRetrieve,
    attributesToSearchOn: args.attributesToSearchOn,
    showRankingScore: args.showRankingScore,
    retrieveVectors: args.retrieveVectors,
    sort: args.sort,
    matchingStrategy: args.matchingStrategy,
  }) as JsonObject;
}

function meilisearchField(hit: JsonObject, key: string | undefined): Json | undefined {
  return key ? hit[key] : undefined;
}

function meilisearchMetadataField(hit: JsonObject, key: string | undefined): string | number | undefined {
  const value = meilisearchField(hit, key);
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return undefined;
}

function zepNumberField(result: JsonObject, key: string): number | undefined {
  const value = result[key];
  return typeof value === "number" ? value : undefined;
}

function zepStringField(result: JsonObject, key: string): string | undefined {
  const value = result[key];
  return typeof value === "string" ? value : undefined;
}

async function zepMemoryHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  if (!apiKey) {
    return jsonHeaders();
  }
  return jsonHeaders(bearerAuth(await resolveSecret(apiKey, chidori, "Zep API key")));
}

function zepMemoryResultItems(response: JsonObject): JsonObject[] {
  if (Array.isArray(response)) {
    return response.filter(isJsonObject);
  }
  if (Array.isArray(response.results)) {
    return response.results.filter(isJsonObject);
  }
  if (Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  return [];
}

function zepMemorySummary(result: JsonObject): JsonObject {
  return isJsonObject(result.summary) ? result.summary : {};
}

function zepMemoryMessage(result: JsonObject): JsonObject {
  return isJsonObject(result.message) ? result.message : {};
}

function zepMemoryPageContent(result: JsonObject): string {
  const message = zepMemoryMessage(result);
  const summary = zepMemorySummary(result);
  return stringifyValue(
    message.content
      ?? summary.content
      ?? result.content
      ?? result.text
      ?? "",
  );
}

function zepGraphResultDocument(
  result: JsonObject,
  kind: string,
  pageContent: string,
  index: number,
  metadata: JsonObject,
): RetrievedDocument {
  return {
    pageContent: pageContent.length > 0 ? pageContent : stringifyValue(result),
    metadata: compactObject({
      ...metadata,
      source: "zep_cloud_graph",
      resultType: kind,
      uuid: zepStringField(result, "uuid"),
      name: zepStringField(result, "name"),
      createdAt: zepStringField(result, "created_at"),
      score: zepNumberField(result, "score"),
      relevance: zepNumberField(result, "relevance"),
      selectionRank: zepNumberField(result, "selection_rank"),
      sourceIndex: index,
    }) as JsonObject,
  };
}

function decodeXml(input: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: "\"",
    apos: "'",
  };
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_match, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity] ?? `&${entity};`;
  }).replace(/\s+/g, " ").trim();
}

function xmlText(xml: string, tag: string): string | undefined {
  const match = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(xml);
  return match ? decodeXml(match[1] ?? "") : undefined;
}

function xmlTexts(xml: string, tag: string): string[] {
  const values: string[] = [];
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml)) !== null) {
    values.push(decodeXml(match[1] ?? ""));
  }
  return values;
}

function xmlAttr(tag: string, name: string): string | undefined {
  const match = new RegExp(`${name}="([^"]*)"`, "i").exec(tag);
  return match ? decodeXml(match[1] ?? "") : undefined;
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function wikiApiUrl(baseUrl: string | undefined, language: string | undefined): string {
  if (baseUrl) {
    return baseUrl;
  }
  return `https://${language ?? "en"}.wikipedia.org/w/api.php`;
}

function wikiRestSummaryUrl(restBaseUrl: string | undefined, language: string | undefined, title: string): string {
  const baseUrl = (restBaseUrl ?? `https://${language ?? "en"}.wikipedia.org/api/rest_v1`).replace(/\/+$/, "");
  return `${baseUrl}/page/summary/${encodeURIComponent(title)}`;
}

function eutilsUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://eutils.ncbi.nlm.nih.gov/entrez/eutils").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function semanticScholarUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.semanticscholar.org/graph/v1").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

async function optionalSecret(secret: SecretInput | undefined, label: string, chidori: Parameters<typeof resolveSecret>[1]): Promise<string | undefined> {
  return secret ? resolveSecret(secret, chidori, label) : undefined;
}

export function parseArxivRetrieverFeed(xml: string): JsonObject {
  const entries: JsonObject[] = [];
  const entryPattern = /<entry\b[\s\S]*?<\/entry>/gi;
  let entryMatch: RegExpExecArray | null;
  while ((entryMatch = entryPattern.exec(xml)) !== null) {
    const entryXml = entryMatch[0];
    const linkTags = entryXml.match(/<link\b[^>]*\/?>/gi) ?? [];
    const links = linkTags.map((linkTag) => compactObject({
      href: xmlAttr(linkTag, "href"),
      rel: xmlAttr(linkTag, "rel"),
      type: xmlAttr(linkTag, "type"),
      title: xmlAttr(linkTag, "title"),
    }) as JsonObject);
    const pdfUrl = links.find((link) => link.title === "pdf" && typeof link.href === "string")?.href;
    const categoryTags = entryXml.match(/<category\b[^>]*\/?>/gi) ?? [];
    const categories = categoryTags.map((categoryTag) => xmlAttr(categoryTag, "term")).filter((term): term is string => typeof term === "string");
    const primaryCategoryTag = entryXml.match(/<arxiv:primary_category\b[^>]*\/?>/i)?.[0];
    entries.push(compactObject({
      id: xmlText(entryXml, "id"),
      updated: xmlText(entryXml, "updated"),
      published: xmlText(entryXml, "published"),
      title: xmlText(entryXml, "title"),
      summary: xmlText(entryXml, "summary"),
      authors: xmlTexts(entryXml, "name"),
      categories,
      primaryCategory: primaryCategoryTag ? xmlAttr(primaryCategoryTag, "term") : undefined,
      comment: xmlText(entryXml, "arxiv:comment"),
      journalRef: xmlText(entryXml, "arxiv:journal_ref"),
      doi: xmlText(entryXml, "arxiv:doi"),
      links,
      pdfUrl,
    }) as JsonObject);
  }
  return compactObject({
    title: xmlText(xml, "title"),
    updated: xmlText(xml, "updated"),
    totalResults: Number(xmlText(xml, "opensearch:totalResults") ?? Number.NaN) || undefined,
    startIndex: Number(xmlText(xml, "opensearch:startIndex") ?? Number.NaN) || undefined,
    itemsPerPage: Number(xmlText(xml, "opensearch:itemsPerPage") ?? Number.NaN) || undefined,
    entries,
  }) as JsonObject;
}

export function loadPerplexitySearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => ({
    pageContent: typeof result.snippet === "string" ? result.snippet : stringifyValue(result),
    metadata: compactObject({
      ...metadata,
      source: "perplexity_search",
      title: typeof result.title === "string" ? result.title : undefined,
      url: typeof result.url === "string" ? result.url : undefined,
      date: typeof result.date === "string" ? result.date : undefined,
      lastUpdated: typeof result.last_updated === "string" ? result.last_updated : undefined,
      resultId: typeof response.id === "string" ? response.id : undefined,
      serverTime: typeof response.server_time === "string" ? response.server_time : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

function braveSearchItems(response: JsonObject): Array<{ kind: string; item: JsonObject }> {
  const groups: Array<{ kind: string; value: Json | undefined }> = [
    { kind: "web", value: isJsonObject(response.web) ? response.web.results : undefined },
    { kind: "news", value: isJsonObject(response.news) ? response.news.results : undefined },
  ];
  return groups.flatMap(({ kind, value }) => {
    return Array.isArray(value) ? value.filter(isJsonObject).map((item) => ({ kind, item })) : [];
  });
}

export function loadBraveSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return braveSearchItems(response).flatMap(({ kind, item }, index) => {
    const extraSnippets = Array.isArray(item.extra_snippets)
      ? item.extra_snippets.filter((snippet): snippet is string => typeof snippet === "string")
      : [];
    const pageContent = [
      typeof item.description === "string" ? stripHtml(item.description) : "",
      ...extraSnippets.map(stripHtml),
    ].filter((part) => part.trim().length > 0).join("\n\n");
    const fallback = typeof item.title === "string" ? stripHtml(item.title) : stringifyValue(item);
    return [{
      pageContent: pageContent.length > 0 ? pageContent : fallback,
      metadata: compactObject({
        ...metadata,
        source: "brave_search",
        resultType: kind,
        title: typeof item.title === "string" ? stripHtml(item.title) : undefined,
        url: typeof item.url === "string" ? item.url : undefined,
        age: typeof item.age === "string" ? item.age : undefined,
        language: typeof item.language === "string" ? item.language : undefined,
        familyFriendly: typeof item.family_friendly === "boolean" ? item.family_friendly : undefined,
        extraSnippets: extraSnippets.length > 0 ? extraSnippets : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function bingSearchItems(response: JsonObject): Array<{ kind: string; item: JsonObject }> {
  const groups: Array<{ kind: string; value: Json | undefined }> = [
    { kind: "web", value: isJsonObject(response.webPages) ? response.webPages.value : undefined },
    { kind: "news", value: isJsonObject(response.news) ? response.news.value : undefined },
  ];
  return groups.flatMap(({ kind, value }) => {
    return Array.isArray(value) ? value.filter(isJsonObject).map((item) => ({ kind, item })) : [];
  });
}

export function loadBingWebSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return bingSearchItems(response).flatMap(({ kind, item }, index) => {
    const pageContent = typeof item.snippet === "string"
      ? stripHtml(item.snippet)
      : typeof item.description === "string"
        ? stripHtml(item.description)
        : typeof item.name === "string"
          ? stripHtml(item.name)
          : stringifyValue(item);
    if (!pageContent.trim()) {
      return [];
    }
    const provider = isJsonObject(item.provider)
      ? item.provider
      : Array.isArray(item.provider) && isJsonObject(item.provider[0])
        ? item.provider[0]
        : undefined;
    return [{
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "bing_web_search",
        resultType: kind,
        id: typeof item.id === "string" ? item.id : undefined,
        title: typeof item.name === "string" ? stripHtml(item.name) : undefined,
        url: typeof item.url === "string" ? item.url : undefined,
        displayUrl: typeof item.displayUrl === "string" ? item.displayUrl : undefined,
        datePublished: typeof item.datePublished === "string" ? item.datePublished : undefined,
        datePublishedDisplayText: typeof item.datePublishedDisplayText === "string" ? item.datePublishedDisplayText : undefined,
        providerName: provider && typeof provider.name === "string" ? provider.name : undefined,
        language: typeof item.language === "string" ? item.language : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function serperResults(response: JsonObject): Array<{ kind: string; item: JsonObject }> {
  const keys = ["organic", "news", "places", "images", "videos", "shopping", "scholar", "patents"] as const;
  return keys.flatMap((key) => {
    const value = response[key];
    return Array.isArray(value) ? value.filter(isJsonObject).map((item) => ({ kind: key, item })) : [];
  });
}

function serperUrl(item: JsonObject): string | undefined {
  for (const key of ["link", "url", "website", "imageUrl"] as const) {
    const value = item[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return undefined;
}

export function loadGoogleSerperSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return serperResults(response).flatMap(({ kind, item }, index) => {
    const pageContent = typeof item.snippet === "string"
      ? stripHtml(item.snippet)
      : typeof item.description === "string"
        ? stripHtml(item.description)
        : typeof item.title === "string"
          ? stripHtml(item.title)
          : stringifyValue(item);
    if (!pageContent.trim()) {
      return [];
    }
    return [{
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "google_serper_search",
        resultType: kind,
        title: typeof item.title === "string" ? stripHtml(item.title) : undefined,
        url: serperUrl(item),
        sourceName: typeof item.source === "string" ? item.source : undefined,
        date: typeof item.date === "string" ? item.date : undefined,
        position: typeof item.position === "number" ? item.position : undefined,
        rating: typeof item.rating === "number" ? item.rating : undefined,
        ratingCount: typeof item.ratingCount === "number" ? item.ratingCount : undefined,
        address: typeof item.address === "string" ? item.address : undefined,
        price: typeof item.price === "string" ? item.price : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

function serpApiResultItems(response: JsonObject): Array<{ kind: string; item: JsonObject }> {
  const keys = [
    "organic_results",
    "news_results",
    "images_results",
    "shopping_results",
    "jobs_results",
    "local_results",
    "places_results",
    "video_results",
    "top_stories",
    "scholar_results",
  ] as const;
  const results = keys.flatMap((key) => {
    const value = response[key];
    return Array.isArray(value) ? value.filter(isJsonObject).map((item) => ({ kind: key, item })) : [];
  });
  return isJsonObject(response.answer_box) ? [{ kind: "answer_box", item: response.answer_box }, ...results] : results;
}

function serpApiUrl(item: JsonObject): string | undefined {
  for (const key of ["link", "url", "source", "thumbnail"] as const) {
    const value = item[key];
    if (typeof value === "string" && /^https?:\/\//.test(value)) {
      return value;
    }
  }
  return undefined;
}

function serpApiContent(item: JsonObject): string {
  for (const key of ["snippet", "description", "answer", "text", "summary", "title"] as const) {
    const value = item[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return stripHtml(value);
    }
  }
  return stringifyValue(item);
}

export function loadSerpApiSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return serpApiResultItems(response).flatMap(({ kind, item }, index) => {
    const pageContent = serpApiContent(item);
    if (!pageContent.trim()) {
      return [];
    }
    const position = typeof item.position === "number"
      ? item.position
      : typeof item.block_position === "number"
        ? item.block_position
        : undefined;
    return [{
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "serpapi_search",
        resultType: kind,
        title: typeof item.title === "string" ? stripHtml(item.title) : undefined,
        url: serpApiUrl(item),
        sourceName: typeof item.source === "string" && !/^https?:\/\//.test(item.source) ? item.source : undefined,
        displayedLink: typeof item.displayed_link === "string" ? item.displayed_link : undefined,
        date: typeof item.date === "string" ? item.date : undefined,
        position,
        rating: typeof item.rating === "number" ? item.rating : undefined,
        reviews: typeof item.reviews === "number" ? item.reviews : undefined,
        price: typeof item.price === "string" ? item.price : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

export function loadTavilySearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const pageContent = typeof result.raw_content === "string" && result.raw_content.length > 0
      ? result.raw_content
      : typeof result.content === "string"
        ? result.content
        : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "tavily_search",
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        favicon: typeof result.favicon === "string" ? result.favicon : undefined,
        images: Array.isArray(result.images) ? result.images as Json : undefined,
        answer: typeof response.answer === "string" ? response.answer : undefined,
        query: typeof response.query === "string" ? response.query : undefined,
        responseTime: typeof response.response_time === "number" ? response.response_time : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadExaSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const highlights = Array.isArray(result.highlights) ? result.highlights.filter((item): item is string => typeof item === "string") : [];
    const pageContent = typeof result.text === "string"
      ? result.text
      : typeof result.summary === "string"
        ? result.summary
        : highlights.length > 0
          ? highlights.join("\n\n")
          : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "exa_search",
        id: typeof result.id === "string" ? result.id : undefined,
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        publishedDate: typeof result.publishedDate === "string" ? result.publishedDate : undefined,
        author: typeof result.author === "string" ? result.author : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        image: typeof result.image === "string" ? result.image : undefined,
        highlights: highlights.length > 0 ? highlights : undefined,
        highlightScores: Array.isArray(result.highlightScores) ? result.highlightScores as Json : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadArxivSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const entries = Array.isArray(response.entries) ? response.entries.filter(isJsonObject) : [];
  return entries.map((entry, index) => ({
    pageContent: typeof entry.summary === "string" ? entry.summary : stringifyValue(entry),
    metadata: compactObject({
      ...metadata,
      source: "arxiv",
      id: typeof entry.id === "string" ? entry.id : undefined,
      title: typeof entry.title === "string" ? entry.title : undefined,
      authors: Array.isArray(entry.authors) ? entry.authors as Json : undefined,
      published: typeof entry.published === "string" ? entry.published : undefined,
      updated: typeof entry.updated === "string" ? entry.updated : undefined,
      categories: Array.isArray(entry.categories) ? entry.categories as Json : undefined,
      primaryCategory: typeof entry.primaryCategory === "string" ? entry.primaryCategory : undefined,
      comment: typeof entry.comment === "string" ? entry.comment : undefined,
      journalRef: typeof entry.journalRef === "string" ? entry.journalRef : undefined,
      doi: typeof entry.doi === "string" ? entry.doi : undefined,
      pdfUrl: typeof entry.pdfUrl === "string" ? entry.pdfUrl : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadWikipediaSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const searchResponse = isJsonObject(response.search) ? response.search : response;
  const query = isJsonObject(searchResponse.query) ? searchResponse.query : {};
  const results = Array.isArray(query.search) ? query.search.filter(isJsonObject) : [];
  const summaries = Array.isArray(response.summaries) ? response.summaries.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const title = typeof result.title === "string" ? result.title : undefined;
    const summary = summaries.find((item) => title && item.title === title);
    const pageContent = summary && typeof summary.extract === "string" && summary.extract.length > 0
      ? summary.extract
      : typeof result.snippet === "string"
        ? stripHtml(result.snippet)
        : stringifyValue(result);
    const contentUrls = summary && isJsonObject(summary.content_urls) ? summary.content_urls : undefined;
    const desktop = contentUrls && isJsonObject(contentUrls.desktop) ? contentUrls.desktop : undefined;
    const pageUrl = desktop && typeof desktop.page === "string" ? desktop.page : undefined;
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "wikipedia",
        title,
        pageId: typeof result.pageid === "number" ? result.pageid : typeof summary?.pageid === "number" ? summary.pageid : undefined,
        wordCount: typeof result.wordcount === "number" ? result.wordcount : undefined,
        timestamp: typeof result.timestamp === "string" ? result.timestamp : undefined,
        url: pageUrl,
        description: summary && typeof summary.description === "string" ? summary.description : undefined,
        wikibaseItem: summary && typeof summary.wikibase_item === "string" ? summary.wikibase_item : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadPubMedSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const idList = Array.isArray(response.idList) ? response.idList.filter((id): id is string => typeof id === "string") : [];
  const summaries = isJsonObject(response.summaries) && isJsonObject(response.summaries.result) ? response.summaries.result : {};
  return idList.map((id, index) => {
    const summary = isJsonObject(summaries[id]) ? summaries[id] : {};
    const authors = Array.isArray(summary.authors)
      ? summary.authors.filter(isJsonObject).map((author) => typeof author.name === "string" ? author.name : undefined).filter((name): name is string => Boolean(name))
      : [];
    const articleIds = Array.isArray(summary.articleids)
      ? summary.articleids.filter(isJsonObject)
      : [];
    const doi = articleIds.find((articleId) => articleId.idtype === "doi" && typeof articleId.value === "string")?.value;
    const pageContent = [
      typeof summary.title === "string" ? summary.title : undefined,
      authors.length > 0 ? `Authors: ${authors.join(", ")}` : undefined,
      typeof summary.fulljournalname === "string" ? `Journal: ${summary.fulljournalname}` : undefined,
      typeof summary.pubdate === "string" ? `Published: ${summary.pubdate}` : undefined,
    ].filter((part): part is string => typeof part === "string" && part.length > 0).join("\n");
    return {
      pageContent: pageContent.length > 0 ? pageContent : stringifyValue(summary),
      metadata: compactObject({
        ...metadata,
        source: "pubmed",
        uid: id,
        title: typeof summary.title === "string" ? summary.title : undefined,
        authors: authors.length > 0 ? authors : undefined,
        sourceTitle: typeof summary.source === "string" ? summary.source : undefined,
        journal: typeof summary.fulljournalname === "string" ? summary.fulljournalname : undefined,
        pubDate: typeof summary.pubdate === "string" ? summary.pubdate : undefined,
        epubDate: typeof summary.epubdate === "string" ? summary.epubdate : undefined,
        doi,
        url: `https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(id)}/`,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadLinkupSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const rawResults = Array.isArray(response.results)
    ? response.results
    : Array.isArray(response.sources)
      ? response.sources
      : [];
  const results = rawResults.filter(isJsonObject);
  return results.map((result, index) => {
    const pageContent = typeof result.content === "string" && result.content.length > 0
      ? result.content
      : typeof result.snippet === "string"
        ? result.snippet
        : typeof result.summary === "string"
          ? result.summary
          : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "linkup_search",
        type: typeof result.type === "string" ? result.type : undefined,
        title: typeof result.name === "string" ? result.name : typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        answer: typeof response.answer === "string" ? response.answer : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadMojeekSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const wrapped = isJsonObject(response.response) ? response.response : response;
  const head = isJsonObject(wrapped.head) ? wrapped.head : {};
  const results = Array.isArray(wrapped.results) ? wrapped.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const desc = typeof result.desc === "string" ? stripHtml(result.desc) : undefined;
    const title = typeof result.title === "string" ? stripHtml(result.title) : undefined;
    const pageContent = desc && desc.length > 0
      ? desc
      : title && title.length > 0
        ? title
        : stringifyValue(result);
    const image = isJsonObject(result.image) ? result.image : undefined;
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "mojeek_search",
        title,
        url: typeof result.url === "string" ? result.url : undefined,
        size: typeof result.size === "string" ? result.size : undefined,
        date: typeof result.date === "string" ? result.date : undefined,
        timestamp: typeof result.timestamp === "number" ? result.timestamp : undefined,
        publishedDate: typeof result.pdate === "number" ? result.pdate : undefined,
        crawledDate: typeof result.cdate === "string" ? result.cdate : undefined,
        crawledTimestamp: typeof result.cdatetimestamp === "number" ? result.cdatetimestamp : undefined,
        categories: typeof result.cats === "string" ? result.cats : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        confidence: typeof result.cfs === "number" ? result.cfs : undefined,
        imageUrl: image && typeof image.url === "string" ? image.url : undefined,
        query: typeof head.query === "string" ? head.query : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadParallelSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const excerpts = Array.isArray(result.excerpts)
      ? result.excerpts.filter((excerpt): excerpt is string => typeof excerpt === "string" && excerpt.length > 0)
      : [];
    const pageContent = excerpts.length > 0
      ? excerpts.join("\n\n")
      : typeof result.title === "string"
        ? result.title
        : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "parallel_search",
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        publishDate: typeof result.publish_date === "string" ? result.publish_date : undefined,
        searchId: typeof response.search_id === "string" ? response.search_id : undefined,
        sessionId: typeof response.session_id === "string" ? response.session_id : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadNimbleSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const pageContent = typeof result.content === "string" && result.content.length > 0
      ? result.content
      : typeof result.description === "string" && result.description.length > 0
        ? result.description
        : typeof result.title === "string"
          ? result.title
          : stringifyValue(result);
    const resultMetadata = isJsonObject(result.metadata) ? result.metadata : undefined;
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "nimble_search",
        title: typeof result.title === "string" ? result.title : undefined,
        description: typeof result.description === "string" ? result.description : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        requestId: typeof response.request_id === "string" ? response.request_id : undefined,
        answer: typeof response.answer === "string" ? response.answer : undefined,
        totalResults: typeof response.total_results === "number" ? response.total_results : undefined,
        resultMetadata: resultMetadata ? resultMetadata as Json : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadYouComSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = isJsonObject(response.results) ? response.results : response;
  const documents: RetrievedDocument[] = [];
  for (const [group, value] of Object.entries(results)) {
    if (!Array.isArray(value)) {
      continue;
    }
    for (const result of value.filter(isJsonObject)) {
      const snippets = Array.isArray(result.snippets) ? result.snippets.filter((item): item is string => typeof item === "string") : [];
      const pageContent = snippets.length > 0
        ? snippets.join("\n\n")
        : typeof result.description === "string"
          ? result.description
          : stringifyValue(result);
      documents.push({
        pageContent,
        metadata: compactObject({
          ...metadata,
          source: "you_com_search",
          group,
          title: typeof result.title === "string" ? result.title : undefined,
          url: typeof result.url === "string" ? result.url : undefined,
          description: typeof result.description === "string" ? result.description : undefined,
          thumbnailUrl: typeof result.thumbnail_url === "string" ? result.thumbnail_url : undefined,
          faviconUrl: typeof result.favicon_url === "string" ? result.favicon_url : undefined,
          pageAge: typeof result.page_age === "string" ? result.page_age : undefined,
          sourceIndex: documents.length,
        }) as JsonObject,
      });
    }
  }
  return documents;
}

export function loadSemanticScholarSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const papers = Array.isArray(response.data) ? response.data.filter(isJsonObject) : [];
  return papers.map((paper, index) => {
    const authors = Array.isArray(paper.authors)
      ? paper.authors.filter(isJsonObject).map((author) => typeof author.name === "string" ? author.name : undefined).filter((name): name is string => Boolean(name))
      : [];
    const openAccessPdf = isJsonObject(paper.openAccessPdf) ? paper.openAccessPdf : undefined;
    const tldr = isJsonObject(paper.tldr) && typeof paper.tldr.text === "string" ? paper.tldr.text : undefined;
    const pageContent = typeof paper.abstract === "string" && paper.abstract.length > 0
      ? paper.abstract
      : tldr ?? stringifyValue(paper);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "semantic_scholar",
        paperId: typeof paper.paperId === "string" ? paper.paperId : undefined,
        corpusId: typeof paper.corpusId === "number" ? paper.corpusId : undefined,
        title: typeof paper.title === "string" ? paper.title : undefined,
        authors: authors.length > 0 ? authors : undefined,
        year: typeof paper.year === "number" ? paper.year : undefined,
        venue: typeof paper.venue === "string" ? paper.venue : undefined,
        publicationDate: typeof paper.publicationDate === "string" ? paper.publicationDate : undefined,
        citationCount: typeof paper.citationCount === "number" ? paper.citationCount : undefined,
        referenceCount: typeof paper.referenceCount === "number" ? paper.referenceCount : undefined,
        influentialCitationCount: typeof paper.influentialCitationCount === "number" ? paper.influentialCitationCount : undefined,
        fieldsOfStudy: Array.isArray(paper.fieldsOfStudy) ? paper.fieldsOfStudy as Json : undefined,
        publicationTypes: Array.isArray(paper.publicationTypes) ? paper.publicationTypes as Json : undefined,
        url: typeof paper.url === "string" ? paper.url : undefined,
        pdfUrl: openAccessPdf && typeof openAccessPdf.url === "string" ? openAccessPdf.url : undefined,
        tldr,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadGoogleScholarSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.organic_results) ? response.organic_results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const publicationInfo = isJsonObject(result.publication_info) ? result.publication_info : {};
    const resources = Array.isArray(result.resources) ? result.resources.filter(isJsonObject) : [];
    const inlineLinks = isJsonObject(result.inline_links) ? result.inline_links : {};
    const citedBy = isJsonObject(inlineLinks.cited_by) ? inlineLinks.cited_by : undefined;
    const pageContent = typeof result.snippet === "string" && result.snippet.length > 0
      ? result.snippet
      : typeof result.title === "string"
        ? result.title
        : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "google_scholar",
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.link === "string" ? result.link : undefined,
        resultId: typeof result.result_id === "string" ? result.result_id : undefined,
        position: typeof result.position === "number" ? result.position : undefined,
        authors: typeof publicationInfo.authors === "string" ? publicationInfo.authors : undefined,
        summary: typeof publicationInfo.summary === "string" ? publicationInfo.summary : undefined,
        citedByCount: citedBy && typeof citedBy.total === "number" ? citedBy.total : undefined,
        citedByLink: citedBy && typeof citedBy.link === "string" ? citedBy.link : undefined,
        versionsLink: isJsonObject(inlineLinks.versions) && typeof inlineLinks.versions.link === "string" ? inlineLinks.versions.link : undefined,
        resourceUrl: resources.length > 0 && typeof resources[0]?.link === "string" ? resources[0].link : undefined,
        resourceTitle: resources.length > 0 && typeof resources[0]?.title === "string" ? resources[0].title : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadSearxngSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const pageContent = typeof result.content === "string" && result.content.length > 0
      ? result.content
      : typeof result.title === "string"
        ? result.title
        : stringifyValue(result);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "searxng_search",
        title: typeof result.title === "string" ? result.title : undefined,
        url: typeof result.url === "string" ? result.url : undefined,
        engine: typeof result.engine === "string" ? result.engine : undefined,
        engines: Array.isArray(result.engines) ? result.engines as Json : undefined,
        category: typeof result.category === "string" ? result.category : undefined,
        score: typeof result.score === "number" ? result.score : undefined,
        publishedDate: typeof result.publishedDate === "string" ? result.publishedDate : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadStackExchangeSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const items = Array.isArray(response.items) ? response.items.filter(isJsonObject) : [];
  return items.map((item, index) => {
    const owner = isJsonObject(item.owner) ? item.owner : undefined;
    const body = typeof item.body === "string" ? decodeXml(stripHtml(item.body)) : undefined;
    const excerpt = typeof item.excerpt === "string" ? decodeXml(stripHtml(item.excerpt)) : undefined;
    const pageContent = body && body.length > 0
      ? body
      : excerpt && excerpt.length > 0
        ? excerpt
        : typeof item.title === "string"
          ? decodeXml(stripHtml(item.title))
          : stringifyValue(item);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "stackexchange_search",
        site: typeof response.site === "string" ? response.site : undefined,
        questionId: typeof item.question_id === "number" ? item.question_id : undefined,
        title: typeof item.title === "string" ? decodeXml(stripHtml(item.title)) : undefined,
        url: typeof item.link === "string" ? item.link : undefined,
        tags: Array.isArray(item.tags) ? item.tags as Json : undefined,
        score: typeof item.score === "number" ? item.score : undefined,
        answerCount: typeof item.answer_count === "number" ? item.answer_count : undefined,
        viewCount: typeof item.view_count === "number" ? item.view_count : undefined,
        isAnswered: typeof item.is_answered === "boolean" ? item.is_answered : undefined,
        acceptedAnswerId: typeof item.accepted_answer_id === "number" ? item.accepted_answer_id : undefined,
        creationDate: typeof item.creation_date === "number" ? item.creation_date : undefined,
        lastActivityDate: typeof item.last_activity_date === "number" ? item.last_activity_date : undefined,
        ownerDisplayName: owner && typeof owner.display_name === "string" ? owner.display_name : undefined,
        ownerUrl: owner && typeof owner.link === "string" ? owner.link : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

function collectDuckDuckGoTopics(topics: Json[], group?: string): JsonObject[] {
  const documents: JsonObject[] = [];
  for (const topic of topics.filter(isJsonObject)) {
    if (Array.isArray(topic.Topics)) {
      documents.push(...collectDuckDuckGoTopics(topic.Topics as Json[], typeof topic.Name === "string" ? topic.Name : group));
      continue;
    }
    documents.push(compactObject({
      ...topic,
      group,
    }) as JsonObject);
  }
  return documents;
}

export function loadDuckDuckGoInstantAnswerDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const documents: RetrievedDocument[] = [];
  const abstractText = typeof response.AbstractText === "string" && response.AbstractText.length > 0
    ? response.AbstractText
    : typeof response.Abstract === "string" && response.Abstract.length > 0
      ? stripHtml(response.Abstract)
      : undefined;
  if (abstractText) {
    documents.push({
      pageContent: abstractText,
      metadata: compactObject({
        ...metadata,
        source: "duckduckgo_instant_answer",
        kind: "abstract",
        heading: typeof response.Heading === "string" ? response.Heading : undefined,
        url: typeof response.AbstractURL === "string" ? response.AbstractURL : undefined,
        sourceName: typeof response.AbstractSource === "string" ? response.AbstractSource : undefined,
        image: typeof response.Image === "string" ? response.Image : undefined,
        sourceIndex: documents.length,
      }) as JsonObject,
    });
  }

  const answer = typeof response.Answer === "string" && response.Answer.length > 0 ? stripHtml(response.Answer) : undefined;
  if (answer) {
    documents.push({
      pageContent: answer,
      metadata: compactObject({
        ...metadata,
        source: "duckduckgo_instant_answer",
        kind: "answer",
        answerType: typeof response.AnswerType === "string" ? response.AnswerType : undefined,
        heading: typeof response.Heading === "string" ? response.Heading : undefined,
        sourceIndex: documents.length,
      }) as JsonObject,
    });
  }

  const definition = typeof response.Definition === "string" && response.Definition.length > 0 ? stripHtml(response.Definition) : undefined;
  if (definition) {
    documents.push({
      pageContent: definition,
      metadata: compactObject({
        ...metadata,
        source: "duckduckgo_instant_answer",
        kind: "definition",
        heading: typeof response.Heading === "string" ? response.Heading : undefined,
        url: typeof response.DefinitionURL === "string" ? response.DefinitionURL : undefined,
        sourceName: typeof response.DefinitionSource === "string" ? response.DefinitionSource : undefined,
        sourceIndex: documents.length,
      }) as JsonObject,
    });
  }

  const relatedTopics = Array.isArray(response.RelatedTopics) ? collectDuckDuckGoTopics(response.RelatedTopics as Json[]) : [];
  for (const topic of relatedTopics) {
    const text = typeof topic.Text === "string" && topic.Text.length > 0
      ? stripHtml(topic.Text)
      : typeof topic.Result === "string" && topic.Result.length > 0
        ? stripHtml(topic.Result)
        : undefined;
    if (!text) {
      continue;
    }
    documents.push({
      pageContent: text,
      metadata: compactObject({
        ...metadata,
        source: "duckduckgo_instant_answer",
        kind: "related_topic",
        heading: typeof response.Heading === "string" ? response.Heading : undefined,
        group: typeof topic.group === "string" ? topic.group : undefined,
        url: typeof topic.FirstURL === "string" ? topic.FirstURL : undefined,
        iconUrl: isJsonObject(topic.Icon) && typeof topic.Icon.URL === "string" ? topic.Icon.URL : undefined,
        sourceIndex: documents.length,
      }) as JsonObject,
    });
  }
  return documents;
}

export function loadWolframAlphaQueryDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const queryResult = isJsonObject(response.queryresult) ? response.queryresult : response;
  const pods = Array.isArray(queryResult.pods) ? queryResult.pods.filter(isJsonObject) : [];
  const documents: RetrievedDocument[] = [];
  for (const [podIndex, pod] of pods.entries()) {
    const subpods = Array.isArray(pod.subpods) ? pod.subpods.filter(isJsonObject) : [];
    for (const [subpodIndex, subpod] of subpods.entries()) {
      const image = isJsonObject(subpod.img) ? subpod.img : undefined;
      const plaintext = typeof subpod.plaintext === "string" && subpod.plaintext.length > 0
        ? decodeXml(stripHtml(subpod.plaintext))
        : undefined;
      const imageAlt = image && typeof image.alt === "string" && image.alt.length > 0
        ? decodeXml(stripHtml(image.alt))
        : undefined;
      const pageContent = plaintext ?? imageAlt;
      if (!pageContent) {
        continue;
      }
      documents.push({
        pageContent,
        metadata: compactObject({
          ...metadata,
          source: "wolfram_alpha",
          podId: typeof pod.id === "string" ? pod.id : undefined,
          podTitle: typeof pod.title === "string" ? pod.title : undefined,
          podScanner: typeof pod.scanner === "string" ? pod.scanner : undefined,
          podPosition: typeof pod.position === "number" ? pod.position : undefined,
          primary: typeof pod.primary === "boolean" ? pod.primary : undefined,
          subpodTitle: typeof subpod.title === "string" && subpod.title.length > 0 ? subpod.title : undefined,
          imageUrl: image && typeof image.src === "string" ? image.src : undefined,
          imageAlt,
          datatypes: typeof queryResult.datatypes === "string" ? queryResult.datatypes : undefined,
          assumptions: Array.isArray(queryResult.assumptions) ? queryResult.assumptions as Json : undefined,
          warnings: Array.isArray(queryResult.warnings) ? queryResult.warnings as Json : undefined,
          podIndex,
          subpodIndex,
          sourceIndex: documents.length,
        }) as JsonObject,
      });
    }
  }
  return documents;
}

export function loadVespaSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const contentField = typeof metadata.contentField === "string" ? metadata.contentField : "text";
  const titleField = typeof metadata.titleField === "string" ? metadata.titleField : "title";
  const urlField = typeof metadata.urlField === "string" ? metadata.urlField : "url";
  return vespaChildren(response).map((hit, index) => {
    const fields = isJsonObject(hit.fields) ? hit.fields : {};
    const content = vespaStringField(fields, contentField)
      ?? vespaStringField(fields, "body")
      ?? vespaStringField(fields, "content")
      ?? stringifyValue(fields);
    return {
      pageContent: content,
      metadata: compactObject({
        ...metadata,
        source: "vespa",
        id: typeof hit.id === "string" ? hit.id : undefined,
        relevance: typeof hit.relevance === "number" ? hit.relevance : undefined,
        title: vespaStringField(fields, titleField),
        url: vespaStringField(fields, urlField),
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadMeilisearchSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const contentField = typeof metadata.contentField === "string" ? metadata.contentField : "text";
  const titleField = typeof metadata.titleField === "string" ? metadata.titleField : "title";
  const urlField = typeof metadata.urlField === "string" ? metadata.urlField : "url";
  const hits = Array.isArray(response.hits) ? response.hits.filter(isJsonObject) : [];
  return hits.map((hit, index) => {
    const content = meilisearchField(hit, contentField)
      ?? meilisearchField(hit, "content")
      ?? meilisearchField(hit, "description")
      ?? hit._formatted
      ?? hit;
    return {
      pageContent: stringifyValue(content),
      metadata: compactObject({
        ...metadata,
        source: "meilisearch",
        id: typeof hit.id === "string" || typeof hit.id === "number" ? hit.id : undefined,
        title: meilisearchMetadataField(hit, titleField),
        url: meilisearchMetadataField(hit, urlField),
        rankingScore: typeof hit._rankingScore === "number" ? hit._rankingScore : undefined,
        rankingScoreDetails: isJsonObject(hit._rankingScoreDetails) ? hit._rankingScoreDetails : undefined,
        formatted: isJsonObject(hit._formatted) ? hit._formatted : undefined,
        vectors: isJsonObject(hit._vectors) ? hit._vectors : undefined,
        processingTimeMs: typeof response.processingTimeMs === "number" ? response.processingTimeMs : undefined,
        estimatedTotalHits: typeof response.estimatedTotalHits === "number" ? response.estimatedTotalHits : undefined,
        query: typeof response.query === "string" ? response.query : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export const hydeRetrieverTool = defineTool<HydeRetrieverArgs, { documents: RetrievedDocument[]; generatedDocument: string; raw: JsonObject }>(
  {
    name: "hyde_retrieve",
    description: "Generate a hypothetical answer document and use it as the query for another Chidori retriever tool.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Original user query." },
        generatorToolName: { type: "string", description: "Chidori model/text-generation tool used to create the hypothetical document." },
        retrieverToolName: { type: "string", description: "Chidori retriever tool called with the generated hypothetical document." },
        generatorArgs: { type: "object", additionalProperties: true },
        generatorInputKey: { type: "string", default: "input" },
        generatorResponsePath: { type: "string", description: "JSON pointer to the generated text in the model response." },
        promptTemplate: { type: "string", description: "Template containing {query}; defaults to a concise answer-passage prompt." },
        retrieverArgs: { type: "object", additionalProperties: true },
        retrieverQueryKey: { type: "string", default: "query" },
        metadata: { type: "object", additionalProperties: true },
        includeHypotheticalDocument: { type: "boolean", default: true },
      },
      required: ["query", "generatorToolName", "retrieverToolName"],
    },
  },
  async (args, chidori) => {
    const prompt = hydePrompt(args);
    const generatorInputKey = args.generatorInputKey ?? "input";
    const generatedResponse = await chidori.tool<JsonObject, Json>(
      args.generatorToolName,
      compactObject({
        ...(args.generatorArgs ?? {}),
        [generatorInputKey]: prompt,
      }) as JsonObject,
    );
    const generatedDocument = generatedTextFromResponse(generatedResponse, args.generatorResponsePath);
    const retrieverQueryKey = args.retrieverQueryKey ?? "query";
    const retrieverResponse = await chidori.tool<JsonObject, Json>(
      args.retrieverToolName,
      compactObject({
        ...(args.retrieverArgs ?? {}),
        [retrieverQueryKey]: generatedDocument,
      }) as JsonObject,
    );
    return {
      documents: loadHydeDocuments(
        retrieverResponse,
        args.query,
        args.includeHypotheticalDocument === false ? "" : generatedDocument,
        compactObject({
          ...(args.metadata ?? {}),
          generatorToolName: args.generatorToolName,
          retrieverToolName: args.retrieverToolName,
        }) as JsonObject,
      ),
      generatedDocument,
      raw: compactObject({
        generatedResponse: generatedResponse as Json,
        retrieverResponse,
      }) as JsonObject,
    };
  },
);

function supabaseRpcUrl(projectUrl: string, queryName: string): string {
  return `${trimTrailingSlash(projectUrl)}/rest/v1/rpc/${encodeURIComponent(queryName)}`;
}

async function supabaseHeaders(serviceRoleKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  const key = await resolveSecret(serviceRoleKey, chidori, "Supabase service role key");
  return jsonHeaders({
    apikey: key,
    Authorization: `Bearer ${key}`,
  });
}

function supabaseHybridRows(response: Json): JsonObject[] {
  if (Array.isArray(response)) {
    return response.filter(isJsonObject);
  }
  if (isJsonObject(response) && Array.isArray(response.data)) {
    return response.data.filter(isJsonObject);
  }
  return [];
}

function supabaseHybridContent(row: JsonObject): string {
  return stringifyValue(row.content ?? row.pageContent ?? row.text ?? row.document ?? "");
}

function supabaseHybridKey(row: JsonObject, content: string, fallback: string): string {
  const id = row.id ?? row.document_id ?? row.doc_id;
  return typeof id === "string" || typeof id === "number" ? String(id) : content || fallback;
}

export function loadSupabaseHybridDocuments(
  similarityResponse: Json,
  keywordResponse: Json,
  metadata: JsonObject = {},
): RetrievedDocument[] {
  const merged = new Map<string, {
    pageContent: string;
    metadata: JsonObject;
    vectorRank: number | undefined;
    keywordRank: number | undefined;
    vectorScore: number | undefined;
    keywordScore: number | undefined;
  }>();

  const addRows = (rows: JsonObject[], source: "vector" | "keyword") => {
    for (const [index, row] of rows.entries()) {
      const pageContent = supabaseHybridContent(row);
      if (!pageContent.trim()) {
        continue;
      }
      const key = supabaseHybridKey(row, pageContent, `${source}:${index}`);
      const rowMetadata = isJsonObject(row.metadata) ? row.metadata : {};
      const existing = merged.get(key);
      const score = typeof row.similarity === "number"
        ? row.similarity
        : typeof row.score === "number"
          ? row.score
          : undefined;
      merged.set(key, {
        pageContent: existing?.pageContent ?? pageContent,
        metadata: compactObject({
          ...(existing?.metadata ?? {}),
          ...rowMetadata,
          ...metadata,
          source: "supabase_hybrid",
          id: typeof row.id === "string" || typeof row.id === "number" ? row.id : existing?.metadata.id,
        }) as JsonObject,
        vectorRank: source === "vector" ? index : existing?.vectorRank,
        keywordRank: source === "keyword" ? index : existing?.keywordRank,
        vectorScore: source === "vector" ? score : existing?.vectorScore,
        keywordScore: source === "keyword" ? score : existing?.keywordScore,
      });
    }
  };

  addRows(supabaseHybridRows(similarityResponse), "vector");
  addRows(supabaseHybridRows(keywordResponse), "keyword");

  return [...merged.values()]
    .map((document) => {
      const hybridScore = (document.vectorRank === undefined ? 0 : 1 / (document.vectorRank + 1))
        + (document.keywordRank === undefined ? 0 : 1 / (document.keywordRank + 1));
      return {
        pageContent: document.pageContent,
        metadata: compactObject({
          ...document.metadata,
          hybridScore,
          vectorRank: document.vectorRank,
          keywordRank: document.keywordRank,
          vectorScore: document.vectorScore,
          keywordScore: document.keywordScore,
        }) as JsonObject,
      };
    })
    .sort((left, right) => {
      const leftScore = typeof left.metadata.hybridScore === "number" ? left.metadata.hybridScore : 0;
      const rightScore = typeof right.metadata.hybridScore === "number" ? right.metadata.hybridScore : 0;
      return rightScore - leftScore;
    });
}

export function loadZepMemoryDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  return zepMemoryResultItems(response).flatMap((result, index) => {
    const pageContent = zepMemoryPageContent(result);
    if (!pageContent.trim()) {
      return [];
    }
    const message = zepMemoryMessage(result);
    const summary = zepMemorySummary(result);
    const resultMetadata = isJsonObject(result.metadata) ? result.metadata : {};
    const messageMetadata = isJsonObject(message.metadata) ? message.metadata : {};
    const summaryMetadata = isJsonObject(summary.metadata) ? summary.metadata : {};
    const resultType = Object.keys(message).length > 0 ? "message" : Object.keys(summary).length > 0 ? "summary" : "result";
    return [{
      pageContent,
      metadata: compactObject({
        ...resultMetadata,
        ...messageMetadata,
        ...summaryMetadata,
        ...metadata,
        source: "zep_memory",
        resultType,
        score: numberField(result, "score"),
        sessionId: stringField(result, "session_id") ?? stringField(result, "sessionId"),
        uuid: stringField(message, "uuid") ?? stringField(summary, "uuid") ?? stringField(result, "uuid"),
        role: stringField(message, "role"),
        roleType: stringField(message, "role_type") ?? stringField(message, "roleType"),
        createdAt: stringField(message, "created_at") ?? stringField(summary, "created_at") ?? stringField(result, "created_at"),
        updatedAt: stringField(message, "updated_at") ?? stringField(result, "updated_at"),
        tokenCount: numberField(message, "token_count") ?? numberField(summary, "token_count") ?? numberField(result, "token_count"),
        recentMessageUuid: stringField(summary, "recent_message_uuid"),
        relatedMessageUuids: Array.isArray(summary.related_message_uuids) ? summary.related_message_uuids as Json : undefined,
        sourceIndex: index,
      }) as JsonObject,
    }];
  });
}

export function loadZepCloudGraphSearchDocuments(response: JsonObject, metadata: JsonObject = {}): RetrievedDocument[] {
  const documents: RetrievedDocument[] = [];
  if (typeof response.context === "string" && response.context.length > 0) {
    documents.push({
      pageContent: response.context,
      metadata: compactObject({
        ...metadata,
        source: "zep_cloud_graph",
        resultType: "context",
        sourceIndex: documents.length,
      }) as JsonObject,
    });
  }

  const edges = Array.isArray(response.edges) ? response.edges.filter(isJsonObject) : [];
  for (const edge of edges) {
    documents.push(zepGraphResultDocument(edge, "edge", zepStringField(edge, "fact") ?? zepStringField(edge, "name") ?? "", documents.length, compactObject({
      ...metadata,
      scope: zepStringField(edge, "scope"),
      validAt: zepStringField(edge, "valid_at"),
      invalidAt: zepStringField(edge, "invalid_at"),
      expiredAt: zepStringField(edge, "expired_at"),
      sourceNodeUuid: zepStringField(edge, "source_node_uuid"),
      targetNodeUuid: zepStringField(edge, "target_node_uuid"),
      episodes: Array.isArray(edge.episodes) ? edge.episodes as Json : undefined,
    }) as JsonObject));
  }

  const episodes = Array.isArray(response.episodes) ? response.episodes.filter(isJsonObject) : [];
  for (const episode of episodes) {
    documents.push(zepGraphResultDocument(episode, "episode", zepStringField(episode, "content") ?? "", documents.length, compactObject({
      ...metadata,
      role: zepStringField(episode, "role"),
      roleType: zepStringField(episode, "role_type"),
      zepSource: zepStringField(episode, "source"),
      sourceDescription: zepStringField(episode, "source_description"),
      taskId: zepStringField(episode, "task_id"),
      threadId: zepStringField(episode, "thread_id"),
      episodeMetadata: isJsonObject(episode.metadata) ? episode.metadata : undefined,
      processed: typeof episode.processed === "boolean" ? episode.processed : undefined,
    }) as JsonObject));
  }

  const nodes = Array.isArray(response.nodes) ? response.nodes.filter(isJsonObject) : [];
  for (const node of nodes) {
    documents.push(zepGraphResultDocument(node, "node", zepStringField(node, "summary") ?? zepStringField(node, "name") ?? "", documents.length, compactObject({
      ...metadata,
      labels: Array.isArray(node.labels) ? node.labels as Json : undefined,
      attributes: isJsonObject(node.attributes) ? node.attributes : undefined,
    }) as JsonObject));
  }

  const observations = Array.isArray(response.observations) ? response.observations.filter(isJsonObject) : [];
  for (const observation of observations) {
    documents.push(zepGraphResultDocument(observation, "observation", zepStringField(observation, "summary") ?? zepStringField(observation, "name") ?? "", documents.length, compactObject({
      ...metadata,
      labels: Array.isArray(observation.labels) ? observation.labels as Json : undefined,
      attributes: isJsonObject(observation.attributes) ? observation.attributes : undefined,
      episodeIds: Array.isArray(observation.episode_ids) ? observation.episode_ids as Json : undefined,
    }) as JsonObject));
  }

  const threadSummaries = Array.isArray(response.thread_summaries) ? response.thread_summaries.filter(isJsonObject) : [];
  for (const summary of threadSummaries) {
    documents.push(zepGraphResultDocument(summary, "thread_summary", zepStringField(summary, "summary") ?? zepStringField(summary, "name") ?? "", documents.length, compactObject({
      ...metadata,
      labels: Array.isArray(summary.labels) ? summary.labels as Json : undefined,
      lastSummarizedAt: zepStringField(summary, "last_summarized_at"),
    }) as JsonObject));
  }

  return documents;
}

export const vectorSimilarityRetrieverTool = defineTool<VectorSimilarityRetrieverArgs, JsonObject>(
  {
    name: "vector_similarity_retrieve",
    description: "Embed a query and run a vector-store similarity query through existing Chidori tools.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Query text to embed and retrieve against." },
        embeddingToolName: { type: "string", default: "openai_embeddings_create" },
        embeddingArgs: { type: "object", additionalProperties: true },
        embeddingInputKey: { type: "string", default: "input" },
        embeddingResponsePath: { type: "string", default: "/data/0/embedding" },
        vectorStoreToolName: { type: "string", description: "Vector-store Chidori tool name." },
        vectorStoreArgs: { type: "object", additionalProperties: true },
        vectorArgKey: { type: "string", default: "vector" },
        topK: { type: "integer", default: 5 },
      },
      required: ["query", "vectorStoreToolName"],
    },
  },
  async (args, chidori) => {
    const embeddingArgs = setJsonField(args.embeddingArgs ?? {}, args.embeddingInputKey ?? "input", args.query);
    const embeddingResponse = await chidori.tool<JsonObject, JsonObject>(
      args.embeddingToolName ?? "openai_embeddings_create",
      embeddingArgs,
    );
    const vector = requireNumberArray(
      resolveJsonPointer(embeddingResponse, args.embeddingResponsePath ?? "/data/0/embedding"),
      "embeddingResponsePath",
    );
    const vectorStoreArgs = compactObject({
      ...(args.vectorStoreArgs ?? {}),
      [args.vectorArgKey ?? "vector"]: vector,
      topK: args.topK,
    }) as JsonObject;
    const result = await chidori.tool<JsonObject, JsonObject>(args.vectorStoreToolName, vectorStoreArgs);

    return {
      query: args.query,
      embeddingToolName: args.embeddingToolName ?? "openai_embeddings_create",
      vectorStoreToolName: args.vectorStoreToolName,
      result,
    };
  },
);

export const perplexitySearchRetrieverTool = defineTool<PerplexitySearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "perplexity_search_retrieve",
    description: "Retrieve real-time ranked web documents from the Perplexity Search API.",
    parameters: {
      type: "object",
      properties: {
        query: {
          description: "Search query string or up to five related search queries.",
          oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
        apiKey: { description: "Perplexity API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.perplexity.ai" },
        country: { type: "string", description: "ISO 3166-1 alpha-2 country code." },
        maxResults: { type: "integer", default: 10 },
        maxTokens: { type: "integer", default: 10000 },
        maxTokensPerPage: { type: "integer", default: 4096 },
        searchLanguageFilter: { type: "array", items: { type: "string" } },
        searchDomainFilter: { type: "array", items: { type: "string" } },
        lastUpdatedAfterFilter: { type: "string", description: "MM/DD/YYYY last-updated lower bound." },
        lastUpdatedBeforeFilter: { type: "string", description: "MM/DD/YYYY last-updated upper bound." },
        searchAfterDateFilter: { type: "string", description: "MM/DD/YYYY publication lower bound." },
        searchBeforeDateFilter: { type: "string", description: "MM/DD/YYYY publication upper bound." },
        searchRecencyFilter: { type: "string", enum: ["hour", "day", "week", "month", "year"] },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Perplexity API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.perplexity.ai")}/search`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          query: args.query,
          country: args.country,
          max_results: args.maxResults,
          max_tokens: args.maxTokens,
          max_tokens_per_page: args.maxTokensPerPage,
          search_language_filter: args.searchLanguageFilter,
          search_domain_filter: args.searchDomainFilter,
          last_updated_after_filter: args.lastUpdatedAfterFilter,
          last_updated_before_filter: args.lastUpdatedBeforeFilter,
          search_after_date_filter: args.searchAfterDateFilter,
          search_before_date_filter: args.searchBeforeDateFilter,
          search_recency_filter: args.searchRecencyFilter,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadPerplexitySearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const braveSearchRetrieverTool = defineTool<BraveSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "brave_search_retrieve",
    description: "Retrieve Brave Search web and news results as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Brave Search API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.search.brave.com/res/v1/web/search" },
        count: { type: "integer", default: 10 },
        country: { type: "string", description: "Country code, such as us." },
        searchLang: { type: "string", description: "Search language." },
        uiLang: { type: "string", description: "UI language." },
        offset: { type: "integer" },
        safesearch: { type: "string", enum: ["off", "moderate", "strict"] },
        freshness: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Brave Search API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.search.brave.com/res/v1/web/search", {
        q: args.query,
        count: args.count ?? 10,
        country: args.country,
        search_lang: args.searchLang,
        ui_lang: args.uiLang,
        offset: args.offset,
        safesearch: args.safesearch,
        freshness: args.freshness,
      }),
      compactObject({
        method: "GET",
        headers: {
          accept: "application/json",
          "X-Subscription-Token": apiKey,
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadBraveSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const bingWebSearchRetrieverTool = defineTool<BingWebSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "bing_web_search_retrieve",
    description: "Retrieve Microsoft Bing Web Search web and news results as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Bing Search API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.bing.microsoft.com/v7.0/search" },
        count: { type: "integer", description: "Number of results to return." },
        offset: { type: "integer", description: "Zero-based result offset." },
        market: { type: "string", description: "Market code, such as en-US." },
        safeSearch: { type: "string", enum: ["Off", "Moderate", "Strict"] },
        freshness: { type: "string", description: "Freshness filter such as Day, Week, Month, or date range." },
        responseFilter: { type: "array", items: { type: "string" }, description: "Answer types to include, such as Webpages, News, or Images." },
        promote: { type: "array", items: { type: "string" }, description: "Answer types to promote in the response." },
        textDecorations: { type: "boolean", description: "Whether display strings may contain hit-highlighting markers." },
        textFormat: { type: "string", enum: ["Raw", "HTML"] },
        setLang: { type: "string", description: "UI language code." },
        cc: { type: "string", description: "Two-character country code." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Bing Search API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.bing.microsoft.com/v7.0/search", {
        q: args.query,
        count: args.count,
        offset: args.offset,
        mkt: args.market,
        safeSearch: args.safeSearch,
        freshness: args.freshness,
        responseFilter: args.responseFilter?.join(","),
        promote: args.promote?.join(","),
        textDecorations: args.textDecorations,
        textFormat: args.textFormat,
        setLang: args.setLang,
        cc: args.cc,
      }),
      compactObject({
        method: "GET",
        headers: {
          accept: "application/json",
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadBingWebSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const googleSerperSearchRetrieverTool = defineTool<GoogleSerperSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "google_serper_search_retrieve",
    description: "Retrieve Google results through Serper.dev and normalize supported verticals to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Serper API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://google.serper.dev" },
        endpoint: {
          type: "string",
          enum: ["search", "images", "videos", "places", "news", "shopping", "scholar", "patents", "autocomplete"],
          default: "search",
        },
        gl: { type: "string", description: "Google country code." },
        hl: { type: "string", description: "Google UI language." },
        location: { type: "string" },
        num: { type: "integer" },
        page: { type: "integer" },
        tbs: { type: "string", description: "Google time/filter parameter." },
        autocorrect: { type: "boolean" },
        type: { type: "string", description: "Optional Serper result type parameter for supported verticals." },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Serper API key");
    const baseUrl = trimTrailingSlash(args.baseUrl ?? "https://google.serper.dev");
    const endpoint = args.endpoint ?? "search";
    const response = await requestJson<JsonObject>(
      chidori,
      `${baseUrl}/${endpoint}`,
      compactObject({
        method: "POST",
        headers: jsonHeaders({ "X-API-KEY": apiKey }),
        body: compactObject({
          ...(args.extraBody ?? {}),
          q: args.query,
          gl: args.gl,
          hl: args.hl,
          location: args.location,
          num: args.num,
          page: args.page,
          tbs: args.tbs,
          autocorrect: args.autocorrect,
          type: args.type,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadGoogleSerperSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        endpoint,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const serpApiSearchRetrieverTool = defineTool<SerpApiSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "serpapi_search_retrieve",
    description: "Retrieve SerpApi search results and normalize common result sections to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        engine: { type: "string", default: "google" },
        location: { type: "string" },
        googleDomain: { type: "string" },
        gl: { type: "string", description: "Google country code." },
        hl: { type: "string", description: "Google UI language." },
        num: { type: "integer" },
        start: { type: "integer" },
        device: { type: "string", enum: ["desktop", "tablet", "mobile"] },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://serpapi.com/search", {
        api_key: apiKey,
        engine: args.engine ?? "google",
        q: args.query,
        location: args.location,
        google_domain: args.googleDomain,
        gl: args.gl,
        hl: args.hl,
        num: args.num,
        start: args.start,
        device: args.device,
        output: "json",
      }),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSerpApiSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        engine: args.engine ?? "google",
      }) as JsonObject),
      raw: response,
    };
  },
);

export const googleScholarSearchRetrieverTool = defineTool<GoogleScholarSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "google_scholar_search_retrieve",
    description: "Retrieve Google Scholar results through SerpApi and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Scholar query. Supports Google Scholar helpers like author: and source:." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        cites: { type: "string" },
        cluster: { type: "string" },
        yearLow: { type: "integer" },
        yearHigh: { type: "integer" },
        scisbd: { type: "integer", enum: [0, 1, 2] },
        hl: { type: "string" },
        lr: { type: "string" },
        start: { type: "integer" },
        num: { type: "integer", minimum: 1, maximum: 20 },
        asSdt: { type: "string" },
        safe: { type: "string", enum: ["active", "off"] },
        filter: { type: "integer", enum: [0, 1] },
        asVis: { type: "integer", enum: [0, 1] },
        asRr: { type: "integer", enum: [0, 1] },
        async: { type: "boolean" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (!args.query && !args.cites && !args.cluster) {
      throw new Error("google_scholar_search_retrieve requires query, cites, or cluster");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://serpapi.com/search", {
        api_key: apiKey,
        engine: "google_scholar",
        q: args.query,
        cites: args.cites,
        cluster: args.cluster,
        as_ylo: args.yearLow,
        as_yhi: args.yearHigh,
        scisbd: args.scisbd,
        hl: args.hl,
        lr: args.lr,
        start: args.start,
        num: args.num,
        as_sdt: args.asSdt,
        safe: args.safe,
        filter: args.filter,
        as_vis: args.asVis,
        as_rr: args.asRr,
        async: args.async,
        output: "json",
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadGoogleScholarSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const semanticScholarSearchRetrieverTool = defineTool<SemanticScholarSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "semantic_scholar_search_retrieve",
    description: "Retrieve Semantic Scholar paper records and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Paper search query." },
        apiKey: { description: "Semantic Scholar API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.semanticscholar.org/graph/v1" },
        fields: { type: "array", items: { type: "string" } },
        limit: { type: "integer", default: 10 },
        offset: { type: "integer" },
        bulk: { type: "boolean", default: false },
        token: { type: "string" },
        sort: { type: "string" },
        publicationTypes: { type: "array", items: { type: "string" } },
        openAccessPdf: { type: "boolean" },
        minCitationCount: { type: "integer" },
        publicationDateOrYear: { type: "string" },
        year: { type: "string" },
        venue: { type: "array", items: { type: "string" } },
        fieldsOfStudy: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await optionalSecret(args.apiKey, "Semantic Scholar API key", chidori);
    const fields = args.fields?.join(",") ?? "paperId,corpusId,title,abstract,year,authors,url,citationCount,referenceCount,influentialCitationCount,openAccessPdf,venue,publicationDate,fieldsOfStudy,publicationTypes,tldr";
    const endpoint = args.bulk ? "paper/search/bulk" : "paper/search";
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(semanticScholarUrl(args.baseUrl, endpoint), {
        query: args.query,
        fields,
        limit: args.limit ?? 10,
        offset: args.bulk ? undefined : args.offset,
        token: args.bulk ? args.token : undefined,
        sort: args.bulk ? args.sort : undefined,
        publicationTypes: args.publicationTypes?.join(","),
        openAccessPdf: args.openAccessPdf,
        minCitationCount: args.minCitationCount,
        publicationDateOrYear: args.publicationDateOrYear,
        year: args.year,
        venue: args.venue?.join(","),
        fieldsOfStudy: args.fieldsOfStudy?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: apiKey ? { "x-api-key": apiKey } : undefined,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSemanticScholarSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const youComSearchRetrieverTool = defineTool<YouComSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "you_com_search_retrieve",
    description: "Retrieve web and news documents from the You.com Search API and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "You.com API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.you.com/v1/search" },
        count: { type: "integer", default: 10 },
        freshness: { type: "string" },
        country: { type: "string" },
        language: { type: "string" },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        livecrawl: { type: "string", enum: ["never", "fallback", "always"] },
        livecrawlFormats: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "You.com API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.you.com/v1/search", {
        query: args.query,
        count: args.count ?? 10,
        freshness: args.freshness,
        country: args.country,
        language: args.language,
        include_domains: args.includeDomains?.join(","),
        exclude_domains: args.excludeDomains?.join(","),
        livecrawl: args.livecrawl,
        livecrawl_formats: args.livecrawlFormats?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": apiKey,
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadYouComSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const linkupSearchRetrieverTool = defineTool<LinkupSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "linkup_search_retrieve",
    description: "Retrieve web documents from Linkup Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language search question." },
        apiKey: { description: "Linkup API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.linkup.so/v1/search" },
        depth: { type: "string", enum: ["fast", "standard", "deep"], default: "standard" },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        fromDate: { type: "string" },
        toDate: { type: "string" },
        includeImages: { type: "boolean" },
        includeSources: { type: "boolean" },
        maxResults: { type: "integer", minimum: 1 },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Linkup API key");
    const response = await requestJson<JsonObject>(
      chidori,
      args.baseUrl ?? "https://api.linkup.so/v1/search",
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          ...(args.extraBody ?? {}),
          q: args.query,
          depth: args.depth ?? "standard",
          outputType: "searchResults",
          includeDomains: args.includeDomains,
          excludeDomains: args.excludeDomains,
          fromDate: args.fromDate,
          toDate: args.toDate,
          includeImages: args.includeImages,
          includeSources: args.includeSources,
          maxResults: args.maxResults,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadLinkupSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const mojeekSearchRetrieverTool = defineTool<MojeekSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "mojeek_search_retrieve",
    description: "Retrieve web documents from Mojeek Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Mojeek API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.mojeek.com/search" },
        excludedWords: { type: "string", description: "Words to exclude from search results." },
        start: { type: "integer", description: "One-based result offset, such as 1 or 11." },
        count: { type: "integer", description: "Maximum number of results to return." },
        site: { type: "string", description: "Limit results to a site or domain." },
        since: { type: "string", description: "Minimum result date, such as day, month, year, or YYYYMMDD." },
        before: { type: "string", description: "Maximum result date, such as day, month, year, or YYYYMMDD." },
        regionBoost: { type: "string", description: "Country code to boost, such as GB or FR." },
        regionBoostWeight: { type: "integer", description: "Region boost weight from 1 to 100." },
        regionRestrict: { type: "string", description: "Country or region code to restrict results." },
        languageBoost: { type: "string", description: "Language code to boost, such as EN or FR." },
        languageBoostWeight: { type: "integer", description: "Language boost weight from 1 to 100." },
        languageRestrict: { type: "string", description: "Language code to restrict results." },
        includeDate: { type: "boolean", description: "Include last modified date fields." },
        includeCrawledDate: { type: "boolean", description: "Include crawled date fields." },
        includeSize: { type: "boolean", description: "Include document size." },
        dateWeight: { type: "integer", enum: [0, 100], description: "Use 100 to rank results by date." },
        titleLength: { type: "integer", description: "Maximum result title length." },
        snippetLength: { type: "integer", description: "Maximum result snippet length." },
        safeSearch: { type: "boolean", description: "Filter adult-rated content." },
        includeDomains: { type: "array", items: { type: "string" }, description: "Comma-joined domains to include." },
        excludeDomains: { type: "array", items: { type: "string" }, description: "Comma-joined domains to exclude." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Mojeek API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.mojeek.com/search", {
        api_key: apiKey,
        q: args.query,
        qm: args.excludedWords,
        s: args.start,
        t: args.count,
        site: args.site,
        since: args.since,
        before: args.before,
        rb: args.regionBoost,
        rbb: args.regionBoostWeight,
        reg: args.regionRestrict,
        lb: args.languageBoost,
        lbb: args.languageBoostWeight,
        lr: args.languageRestrict,
        date: args.includeDate === undefined ? undefined : args.includeDate ? 1 : 0,
        cdate: args.includeCrawledDate === undefined ? undefined : args.includeCrawledDate ? 1 : 0,
        size: args.includeSize === undefined ? undefined : args.includeSize ? 1 : 0,
        fmt: "json",
        datewr: args.dateWeight,
        tlen: args.titleLength,
        dlen: args.snippetLength,
        safe: args.safeSearch === undefined ? undefined : args.safeSearch ? 1 : 0,
        fi: args.includeDomains?.join(","),
        fe: args.excludeDomains?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: {
          accept: "application/json",
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadMojeekSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const parallelSearchRetrieverTool = defineTool<ParallelSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "parallel_search_retrieve",
    description: "Retrieve LLM-optimized web excerpts from Parallel Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        objective: { type: "string", description: "Natural-language search objective or research goal." },
        searchQueries: { type: "array", items: { type: "string" }, description: "Concise keyword queries. Provide 2-3 for best results." },
        apiKey: { description: "Parallel API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.parallel.ai/v1/search" },
        mode: { type: "string", enum: ["basic", "advanced"], description: "Search mode preset." },
        maxCharsTotal: { type: "integer", description: "Upper bound on total excerpt characters across results." },
        sessionId: { type: "string", description: "Session identifier to link related search and extract calls." },
        clientModel: { type: "string", description: "Model that will consume the search results." },
        advancedSettings: { type: "object", additionalProperties: true, description: "Provider-specific advanced search settings." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      anyOf: [
        { required: ["objective"] },
        { required: ["searchQueries"] },
      ],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Parallel API key");
    const searchQueries = args.searchQueries && args.searchQueries.length > 0
      ? args.searchQueries
      : args.objective
        ? [args.objective.slice(0, 200)]
        : undefined;
    if (!searchQueries || searchQueries.length === 0) {
      throw new Error("Parallel search requires objective or searchQueries");
    }
    const response = await requestJson<JsonObject>(
      chidori,
      args.baseUrl ?? "https://api.parallel.ai/v1/search",
      compactObject({
        method: "POST",
        headers: jsonHeaders({
          "x-api-key": apiKey,
        }),
        body: compactObject({
          objective: args.objective,
          search_queries: searchQueries,
          mode: args.mode,
          max_chars_total: args.maxCharsTotal,
          session_id: args.sessionId,
          client_model: args.clientModel,
          advanced_settings: args.advancedSettings,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadParallelSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const nimbleSearchRetrieverTool = defineTool<NimbleSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "nimble_search_retrieve",
    description: "Retrieve live web documents from Nimble Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Nimble API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://sdk.nimbleway.com/v1/search" },
        locale: { type: "string", description: "Language or locale code, such as en or en-US." },
        country: { type: "string", description: "Country code for geo-targeted results, such as US or GB." },
        outputFormat: { type: "string", enum: ["plain_text", "markdown", "simplified_html"] },
        maxResults: { type: "integer", description: "Maximum number of results to return." },
        focus: { type: "string", enum: ["general", "news", "location", "coding", "geo", "shopping", "social", "academic"] },
        contentType: { type: "array", items: { type: "string" }, description: "Content type filters for general focus, such as pdf or documents." },
        searchDepth: { type: "string", enum: ["lite", "fast", "deep"], description: "Content richness and latency preset." },
        includeAnswer: { type: "boolean", description: "Include an AI-generated answer summary." },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        startDate: { type: "string", description: "Filter results after YYYY-MM-DD or YYYY." },
        endDate: { type: "string", description: "Filter results before YYYY-MM-DD or YYYY." },
        timeRange: { type: "string", description: "Provider-supported time range filter." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Nimble API key");
    const response = await requestJson<JsonObject>(
      chidori,
      args.baseUrl ?? "https://sdk.nimbleway.com/v1/search",
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          query: args.query,
          locale: args.locale,
          country: args.country,
          output_format: args.outputFormat,
          max_results: args.maxResults,
          focus: args.focus,
          content_type: args.contentType,
          search_depth: args.searchDepth,
          include_answer: args.includeAnswer,
          include_domains: args.includeDomains,
          exclude_domains: args.excludeDomains,
          start_date: args.startDate,
          end_date: args.endDate,
          time_range: args.timeRange,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadNimbleSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const pubMedSearchRetrieverTool = defineTool<PubMedSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "pubmed_search_retrieve",
    description: "Retrieve PubMed citation summaries through NCBI E-utilities and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "PubMed query string." },
        apiKey: { description: "NCBI API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils" },
        retMax: { type: "integer", default: 10 },
        retStart: { type: "integer", default: 0 },
        sort: { type: "string", enum: ["relevance", "pub_date", "Author", "JournalName"] },
        field: { type: "string" },
        dateType: { type: "string" },
        relDate: { type: "integer" },
        minDate: { type: "string" },
        maxDate: { type: "string" },
        tool: { type: "string" },
        email: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await optionalSecret(args.apiKey, "NCBI API key", chidori);
    const search = await requestJson<JsonObject>(
      chidori,
      withQuery(eutilsUrl(args.baseUrl, "esearch.fcgi"), {
        db: "pubmed",
        term: args.query,
        retmode: "json",
        retmax: args.retMax ?? 10,
        retstart: args.retStart,
        sort: args.sort,
        field: args.field,
        datetype: args.dateType,
        reldate: args.relDate,
        mindate: args.minDate,
        maxdate: args.maxDate,
        api_key: apiKey,
        tool: args.tool,
        email: args.email,
      }),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const searchResult = isJsonObject(search.esearchresult) ? search.esearchresult : {};
    const idList = Array.isArray(searchResult.idlist)
      ? searchResult.idlist.filter((id): id is string => typeof id === "string")
      : [];
    const summaries = idList.length === 0
      ? {}
      : await requestJson<JsonObject>(
        chidori,
        withQuery(eutilsUrl(args.baseUrl, "esummary.fcgi"), {
          db: "pubmed",
          id: idList.join(","),
          retmode: "json",
          api_key: apiKey,
          tool: args.tool,
          email: args.email,
        }),
        compactObject({
          method: "GET",
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
    const raw = { search, idList, summaries };
    return {
      documents: loadPubMedSearchDocuments(raw, args.metadata ?? {}),
      raw,
    };
  },
);

export const wikipediaSearchRetrieverTool = defineTool<WikipediaSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "wikipedia_search_retrieve",
    description: "Retrieve Wikipedia pages for a query and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Wikipedia search query." },
        baseUrl: { type: "string", description: "MediaWiki Action API URL. Defaults to the selected Wikipedia language." },
        restBaseUrl: { type: "string", description: "Wikipedia REST API base URL used for page summaries." },
        limit: { type: "integer", default: 3 },
        language: { type: "string", default: "en" },
        fetchSummaries: { type: "boolean", default: true },
        redirect: { type: "boolean", default: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const search = await requestJson<JsonObject>(
      chidori,
      withQuery(wikiApiUrl(args.baseUrl, args.language), {
        action: "query",
        list: "search",
        srsearch: args.query,
        srlimit: args.limit ?? 3,
        format: "json",
        origin: "*",
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const query = isJsonObject(search.query) ? search.query : {};
    const results = Array.isArray(query.search) ? query.search.filter(isJsonObject) : [];
    const summaries = args.fetchSummaries === false
      ? []
      : await Promise.all(results.map(async (result) => {
        if (typeof result.title !== "string") {
          return null;
        }
        return requestJson<JsonObject>(
          chidori,
          withQuery(wikiRestSummaryUrl(args.restBaseUrl, args.language, result.title), {
            redirect: args.redirect ?? true,
          }),
          compactObject({
            method: "GET",
            headers: { accept: "application/json" },
            timeoutMs: args.timeoutMs,
          }) as ChidoriHttpRequestOptions,
        );
      }));
    const raw = {
      search,
      summaries: summaries.filter(isJsonObject),
    };
    return {
      documents: loadWikipediaSearchDocuments(raw, args.metadata ?? {}),
      raw,
    };
  },
);

export const arxivSearchRetrieverTool = defineTool<ArxivSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "arxiv_search_retrieve",
    description: "Retrieve arXiv paper summaries from the official arXiv Atom API and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "arXiv search query, such as all:electron or cat:cs.AI." },
        idList: { type: "array", items: { type: "string" }, description: "Specific arXiv IDs to fetch." },
        baseUrl: { type: "string", default: "https://export.arxiv.org/api/query" },
        start: { type: "integer", default: 0 },
        maxResults: { type: "integer", default: 10 },
        sortBy: { type: "string", enum: ["relevance", "lastUpdatedDate", "submittedDate"] },
        sortOrder: { type: "string", enum: ["ascending", "descending"] },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (!args.query && (!args.idList || args.idList.length === 0)) {
      throw new Error("arxiv_search_retrieve requires query or idList");
    }
    const url = withQuery(args.baseUrl ?? "https://export.arxiv.org/api/query", {
      search_query: args.query,
      id_list: args.idList?.join(","),
      start: args.start,
      max_results: args.maxResults ?? 10,
      sortBy: args.sortBy,
      sortOrder: args.sortOrder,
    });
    const response = await chidori.http(url, compactObject({
      method: "GET",
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from arXiv: ${detail}`);
    }
    const rawXml = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
    const raw = parseArxivRetrieverFeed(rawXml);
    return {
      documents: loadArxivSearchDocuments(raw, args.metadata ?? {}),
      raw,
    };
  },
);

export const tavilySearchRetrieverTool = defineTool<TavilySearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "tavily_search_retrieve",
    description: "Retrieve ranked web documents from Tavily Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Tavily API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.tavily.com" },
        maxResults: { type: "integer", default: 5 },
        searchDepth: { type: "string", enum: ["basic", "advanced", "fast", "ultra-fast"], default: "basic" },
        chunksPerSource: { type: "integer" },
        topic: { type: "string", enum: ["general", "news", "finance"], default: "general" },
        timeRange: { type: "string", enum: ["day", "week", "month", "year", "d", "w", "m", "y"] },
        startDate: { type: "string" },
        endDate: { type: "string" },
        includeRawContent: {
          description: "Ask Tavily to include raw page content. Defaults to markdown.",
          oneOf: [
            { type: "boolean" },
            { type: "string", enum: ["markdown", "text"] },
          ],
        },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        country: { type: "string" },
        safeSearch: { type: "boolean" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Tavily API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.tavily.com")}/search`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          query: args.query,
          max_results: args.maxResults ?? 5,
          search_depth: args.searchDepth ?? "basic",
          chunks_per_source: args.chunksPerSource,
          topic: args.topic,
          time_range: args.timeRange,
          start_date: args.startDate,
          end_date: args.endDate,
          include_raw_content: args.includeRawContent ?? "markdown",
          include_domains: args.includeDomains,
          exclude_domains: args.excludeDomains,
          country: args.country,
          safe_search: args.safeSearch,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadTavilySearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const exaSearchRetrieverTool = defineTool<ExaSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "exa_search_retrieve",
    description: "Retrieve web documents from Exa Search and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Exa API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.exa.ai" },
        numResults: { type: "integer", default: 10 },
        type: { type: "string", enum: ["keyword", "neural", "auto"], default: "auto" },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        category: { type: "string" },
        startPublishedDate: { type: "string" },
        endPublishedDate: { type: "string" },
        contents: {
          type: "object",
          additionalProperties: true,
          description: "Exa contents options. Defaults to text with a 4096 character cap plus highlights.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Exa API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.exa.ai")}/search`,
      compactObject({
        method: "POST",
        headers: {
          ...jsonHeaders(),
          "x-api-key": apiKey,
        },
        body: compactObject({
          query: args.query,
          numResults: args.numResults,
          type: args.type ?? "auto",
          includeDomains: args.includeDomains,
          excludeDomains: args.excludeDomains,
          category: args.category,
          startPublishedDate: args.startPublishedDate,
          endPublishedDate: args.endPublishedDate,
          contents: args.contents ?? {
            text: { maxCharacters: 4096 },
            highlights: true,
          },
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadExaSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const wolframAlphaQueryRetrieverTool = defineTool<WolframAlphaQueryRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "wolfram_alpha_query_retrieve",
    description: "Retrieve WolframAlpha Full Results API pods and normalize subpods to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        input: { type: "string", description: "Natural language or WolframAlpha input." },
        appId: { description: "WolframAlpha AppID or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.wolframalpha.com/v2/query" },
        format: { type: "string", default: "plaintext,image" },
        assumptions: { type: "string" },
        scanners: { type: "string" },
        podIndex: { type: "string" },
        includePodId: { type: "string" },
        excludePodId: { type: "string" },
        podState: { type: "string" },
        units: { type: "string", enum: ["metric", "nonmetric"] },
        reinterpret: { type: "boolean" },
        translation: { type: "boolean" },
        timeout: { type: "number" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const appId = await resolveSecret(args.appId, chidori, "WolframAlpha AppID");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.wolframalpha.com/v2/query", {
        appid: appId,
        input: args.input,
        output: "json",
        format: args.format ?? "plaintext,image",
        assumptions: args.assumptions,
        scanners: args.scanners,
        podindex: args.podIndex,
        includepodid: args.includePodId,
        excludepodid: args.excludePodId,
        podstate: args.podState,
        units: args.units,
        reinterpret: args.reinterpret,
        translation: args.translation,
        timeout: args.timeout,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadWolframAlphaQueryDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const duckDuckGoInstantAnswerRetrieverTool = defineTool<DuckDuckGoInstantAnswerRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "duckduckgo_instant_answer_retrieve",
    description: "Retrieve DuckDuckGo zero-click instant answers and related topics as Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Instant answer query." },
        baseUrl: { type: "string", default: "https://api.duckduckgo.com/" },
        noHtml: { type: "boolean", default: true },
        noRedirect: { type: "boolean", default: true },
        skipDisambiguation: { type: "boolean", default: false },
        pretty: { type: "boolean", default: false },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.duckduckgo.com/", {
        q: args.query,
        format: "json",
        no_html: args.noHtml ?? true,
        no_redirect: args.noRedirect ?? true,
        skip_disambig: args.skipDisambiguation,
        pretty: args.pretty,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadDuckDuckGoInstantAnswerDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const stackExchangeSearchRetrieverTool = defineTool<StackExchangeSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "stackexchange_search_retrieve",
    description: "Retrieve Stack Exchange questions through the advanced search API and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free-text search query." },
        site: { type: "string", default: "stackoverflow" },
        baseUrl: { type: "string", default: "https://api.stackexchange.com/2.3/search/advanced" },
        apiKey: { description: "Optional Stack Exchange API key or Chidori memory secret reference." },
        tagged: { type: "array", items: { type: "string" } },
        notTagged: { type: "array", items: { type: "string" } },
        accepted: { type: "boolean" },
        answers: { type: "integer" },
        body: { type: "string" },
        closed: { type: "boolean" },
        migrated: { type: "boolean" },
        notice: { type: "boolean" },
        title: { type: "string" },
        user: { type: "integer" },
        url: { type: "string" },
        views: { type: "integer" },
        wiki: { type: "boolean" },
        fromDate: { type: "integer", description: "Unix timestamp lower bound." },
        toDate: { type: "integer", description: "Unix timestamp upper bound." },
        min: { type: "integer" },
        max: { type: "integer" },
        sort: { type: "string", enum: ["activity", "creation", "votes", "relevance"], default: "relevance" },
        order: { type: "string", enum: ["asc", "desc"], default: "desc" },
        page: { type: "integer", default: 1 },
        pageSize: { type: "integer", default: 10 },
        filter: { type: "string", default: "withbody" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const key = await optionalSecret(args.apiKey, "Stack Exchange API key", chidori);
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://api.stackexchange.com/2.3/search/advanced", {
        site: args.site ?? "stackoverflow",
        q: args.query,
        tagged: args.tagged?.join(";"),
        nottagged: args.notTagged?.join(";"),
        accepted: args.accepted,
        answers: args.answers,
        body: args.body,
        closed: args.closed,
        migrated: args.migrated,
        notice: args.notice,
        title: args.title,
        user: args.user,
        url: args.url,
        views: args.views,
        wiki: args.wiki,
        fromdate: args.fromDate,
        todate: args.toDate,
        min: args.min,
        max: args.max,
        sort: args.sort ?? "relevance",
        order: args.order ?? "desc",
        page: args.page,
        pagesize: args.pageSize ?? 10,
        filter: args.filter ?? "withbody",
        key,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadStackExchangeSearchDocuments({ ...response, site: args.site ?? "stackoverflow" }, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const searxngSearchRetrieverTool = defineTool<SearxngSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "searxng_search_retrieve",
    description: "Retrieve web documents from a caller-provided SearXNG instance and normalize them to Chidori document-shaped results.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        baseUrl: { type: "string", description: "SearXNG instance base URL." },
        categories: { type: "array", items: { type: "string" } },
        engines: { type: "array", items: { type: "string" } },
        language: { type: "string" },
        pageNumber: { type: "integer", default: 1 },
        timeRange: { type: "string", enum: ["day", "week", "month", "year"] },
        safesearch: { type: "integer", enum: [0, 1, 2] },
        imageProxy: { type: "boolean" },
        autocomplete: { type: "string" },
        enabledPlugins: { type: "array", items: { type: "string" } },
        disabledPlugins: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "baseUrl"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${args.baseUrl.replace(/\/+$/, "")}/search`, {
        q: args.query,
        format: "json",
        categories: args.categories?.join(","),
        engines: args.engines?.join(","),
        language: args.language,
        pageno: args.pageNumber,
        time_range: args.timeRange,
        safesearch: args.safesearch,
        image_proxy: args.imageProxy,
        autocomplete: args.autocomplete,
        enabled_plugins: args.enabledPlugins?.join(","),
        disabled_plugins: args.disabledPlugins?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSearxngSearchDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const vespaRetrieverTool = defineTool<VespaRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "vespa_retrieve",
    description: "Retrieve documents from Vespa Search API results and normalize hits to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Vespa endpoint, for example https://tenant.app.region.vespa-app.cloud." },
        token: { description: "Optional Vespa bearer token or Chidori memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" }, description: "Additional headers for custom auth/proxies." },
        yql: { type: "string", description: "Vespa YQL statement." },
        query: { type: "string", description: "Query text." },
        hits: { type: "integer", default: 10 },
        offset: { type: "integer", default: 0 },
        ranking: { description: "Ranking profile string or ranking configuration object." },
        body: { type: "object", additionalProperties: true, description: "Full Vespa query body. When provided, this is sent as-is." },
        contentField: { type: "string", default: "text" },
        titleField: { type: "string", default: "title" },
        urlField: { type: "string", default: "url" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl)}/search/`,
      compactObject({
        method: "POST",
        headers: await vespaHeaders(args, chidori),
        body: vespaQueryBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadVespaSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        contentField: args.contentField,
        titleField: args.titleField,
        urlField: args.urlField,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const meilisearchRetrieverTool = defineTool<MeilisearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "meilisearch_retrieve",
    description: "Retrieve documents from Meilisearch keyword, vector, or hybrid search results.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Meilisearch host URL." },
        indexUid: { type: "string", description: "Meilisearch index UID." },
        apiKey: { description: "Meilisearch API key or Chidori memory secret reference." },
        q: { type: "string", description: "Keyword query." },
        vector: { type: "array", items: { type: "number" }, description: "Custom query vector for vector or hybrid search." },
        hybrid: { type: "object", additionalProperties: true, description: "Meilisearch hybrid search configuration." },
        filter: { description: "Filter expression string, array, or nested array." },
        limit: { type: "integer", default: 20 },
        offset: { type: "integer", default: 0 },
        attributesToRetrieve: { type: "array", items: { type: "string" } },
        attributesToSearchOn: { type: "array", items: { type: "string" } },
        showRankingScore: { type: "boolean" },
        retrieveVectors: { type: "boolean" },
        sort: { type: "array", items: { type: "string" } },
        matchingStrategy: { type: "string" },
        body: { type: "object", additionalProperties: true, description: "Full Meilisearch search body. When provided, this is sent as-is." },
        contentField: { type: "string", default: "text" },
        titleField: { type: "string", default: "title" },
        urlField: { type: "string", default: "url" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "indexUid"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      meilisearchSearchUrl(args.baseUrl, args.indexUid),
      compactObject({
        method: "POST",
        headers: await meilisearchHeaders(args.apiKey, chidori),
        body: meilisearchSearchBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadMeilisearchSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        contentField: args.contentField,
        titleField: args.titleField,
        urlField: args.urlField,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const supabaseHybridRetrieverTool = defineTool<SupabaseHybridRetrieverArgs, {
  documents: RetrievedDocument[];
  raw: { similarity: Json; keyword: Json };
}>(
  {
    name: "supabase_hybrid_retrieve",
    description: "Run Supabase pgvector similarity and full-text keyword RPCs, merge duplicates, and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Query text for embedding and keyword search." },
        projectUrl: { type: "string", description: "Supabase project URL." },
        serviceRoleKey: { description: "Supabase service role key or Chidori memory secret reference." },
        queryEmbedding: { type: "array", items: { type: "number" }, description: "Precomputed query embedding. When omitted, embeddingToolName is called." },
        embeddingToolName: { type: "string", default: "openai_embeddings_create" },
        embeddingArgs: { type: "object", additionalProperties: true },
        embeddingInputKey: { type: "string", default: "input" },
        embeddingResponsePath: { type: "string", default: "/data/0/embedding" },
        similarityQueryName: { type: "string", default: "match_documents" },
        keywordQueryName: { type: "string", default: "kw_match_documents" },
        similarityK: { type: "integer", default: 2 },
        keywordK: { type: "integer", default: 2 },
        filter: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "projectUrl"],
    },
  },
  async (args, chidori) => {
    const queryEmbedding = args.queryEmbedding ?? await (async () => {
      const embeddingArgs = setJsonField(args.embeddingArgs ?? {}, args.embeddingInputKey ?? "input", args.query);
      const embeddingResponse = await chidori.tool<JsonObject, JsonObject>(
        args.embeddingToolName ?? "openai_embeddings_create",
        embeddingArgs,
      );
      return requireNumberArray(
        resolveJsonPointer(embeddingResponse, args.embeddingResponsePath ?? "/data/0/embedding"),
        "embeddingResponsePath",
      );
    })();
    const headers = await supabaseHeaders(args.serviceRoleKey, chidori);
    const similarity = await requestJson<Json>(
      chidori,
      supabaseRpcUrl(args.projectUrl, args.similarityQueryName ?? "match_documents"),
      compactObject({
        method: "POST",
        headers,
        body: compactObject({
          query_embedding: queryEmbedding,
          match_count: args.similarityK ?? 2,
          filter: args.filter,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const keyword = await requestJson<Json>(
      chidori,
      supabaseRpcUrl(args.projectUrl, args.keywordQueryName ?? "kw_match_documents"),
      compactObject({
        method: "POST",
        headers,
        body: {
          query_text: args.query,
          match_count: args.keywordK ?? 2,
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSupabaseHybridDocuments(similarity, keyword, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
      }) as JsonObject),
      raw: { similarity, keyword },
    };
  },
);

export const zepMemoryRetrieverTool = defineTool<ZepMemoryRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "zep_memory_retrieve",
    description: "Search self-hosted Zep open source memory messages or summaries and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search text." },
        sessionId: { type: "string", description: "Zep session ID to search." },
        apiKey: { description: "Optional Zep API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:8000/api/v1" },
        topK: { type: "integer", default: 3 },
        searchScope: { type: "string", enum: ["messages", "summary", "facts"], default: "messages" },
        searchType: { type: "string", enum: ["similarity", "mmr"], default: "similarity" },
        mmrLambda: { type: "number", description: "MMR diversity/relevance balance." },
        filter: { type: "object", additionalProperties: true, description: "Zep metadata filter." },
        minScore: { type: "number" },
        minFactRating: { type: "number" },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "sessionId"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "http://localhost:8000/api/v1")}/sessions/${encodeURIComponent(args.sessionId)}/search`, {
        limit: args.topK ?? 3,
      }),
      compactObject({
        method: "POST",
        headers: await zepMemoryHeaders(args.apiKey, chidori),
        body: compactObject({
          ...(args.extraBody ?? {}),
          text: args.query,
          metadata: args.filter,
          search_scope: args.searchScope ?? "messages",
          search_type: args.searchType ?? "similarity",
          mmr_lambda: args.mmrLambda,
          min_score: args.minScore,
          min_fact_rating: args.minFactRating,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadZepMemoryDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        sessionId: args.sessionId,
        searchScope: args.searchScope ?? "messages",
        searchType: args.searchType ?? "similarity",
      }) as JsonObject),
      raw: response,
    };
  },
);

export const zepCloudGraphSearchRetrieverTool = defineTool<ZepCloudGraphSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "zep_cloud_graph_retrieve",
    description: "Search a Zep Cloud graph and return context, facts, entities, or episodes as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search text." },
        apiKey: { description: "Zep Cloud project API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.getzep.com" },
        userId: { type: "string", description: "Zep user graph ID to search." },
        groupId: { type: "string", description: "Zep group graph ID to search." },
        graphId: { type: "string", description: "Explicit Zep graph ID to search." },
        scope: {
          type: "string",
          enum: ["edges", "nodes", "episodes", "observations", "thread_summaries", "auto"],
          default: "edges",
        },
        reranker: {
          type: "string",
          enum: ["rrf", "mmr", "node_distance", "episode_mentions", "cross_encoder"],
          default: "rrf",
        },
        limit: { type: "integer", description: "Maximum number of Zep graph results." },
        maxCharacters: { type: "integer", description: "Maximum characters when scope is auto." },
        mmrLambda: { type: "number", description: "MMR diversity/relevance balance." },
        centerNodeUuid: { type: "string", description: "Center node UUID for node-distance reranking." },
        bfsOriginNodeUuids: { type: "array", items: { type: "string" } },
        searchFilters: { type: "object", additionalProperties: true },
        minFactRating: { type: "number", description: "Minimum fact rating for edge searches." },
        returnRawResults: { type: "boolean", description: "Return raw graph results alongside auto context." },
        extraBody: { type: "object", additionalProperties: true, description: "Additional Zep graph search body fields." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Zep Cloud API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.getzep.com")}/api/v2/graph/search`,
      compactObject({
        method: "POST",
        headers: jsonHeaders({ Authorization: apiKey }),
        body: compactObject({
          ...(args.extraBody ?? {}),
          query: args.query,
          user_id: args.userId,
          group_id: args.groupId,
          graph_id: args.graphId,
          scope: args.scope,
          reranker: args.reranker,
          limit: args.limit,
          max_characters: args.maxCharacters,
          mmr_lambda: args.mmrLambda,
          center_node_uuid: args.centerNodeUuid,
          bfs_origin_node_uuids: args.bfsOriginNodeUuids,
          search_filters: args.searchFilters,
          min_fact_rating: args.minFactRating,
          return_raw_results: args.returnRawResults,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadZepCloudGraphSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        userId: args.userId,
        groupId: args.groupId,
        graphId: args.graphId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const bedrockKnowledgeBaseRetrieverTool = defineTool<BedrockKnowledgeBaseRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "bedrock_knowledge_base_retrieve",
    description: "Call an AWS Bedrock Knowledge Base retrieval tool and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        knowledgeBaseId: { type: "string", description: "Amazon Bedrock Knowledge Base ID." },
        query: { type: "string", description: "Text query to retrieve against the knowledge base." },
        awsToolName: { type: "string", default: "aws_bedrock_knowledge_base_retrieve" },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Bedrock Agent Runtime or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference passed to the AWS tool." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        retrievalConfiguration: { type: "object", additionalProperties: true },
        guardrailConfiguration: { type: "object", additionalProperties: true },
        nextToken: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["knowledgeBaseId", "query"],
    },
  },
  async (args, chidori) => {
    const awsToolName = args.awsToolName ?? "aws_bedrock_knowledge_base_retrieve";
    const response = await chidori.tool<JsonObject, JsonObject>(
      awsToolName,
      compactObject({
        authorization: args.authorization as Json | undefined,
        amzDate: args.amzDate,
        securityToken: args.securityToken as Json | undefined,
        headers: args.headers,
        knowledgeBaseId: args.knowledgeBaseId,
        query: args.query,
        region: args.region,
        endpoint: args.endpoint,
        retrievalConfiguration: args.retrievalConfiguration,
        guardrailConfiguration: args.guardrailConfiguration,
        nextToken: args.nextToken,
      }) as JsonObject,
    );
    return {
      documents: loadBedrockKnowledgeBaseDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        knowledgeBaseId: args.knowledgeBaseId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const amazonKendraRetrieveRetrieverTool = defineTool<AmazonKendraRetrieveRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "amazon_kendra_retrieve",
    description: "Call an Amazon Kendra Retrieve tool and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        indexId: { type: "string", description: "Amazon Kendra index ID." },
        queryText: { type: "string", description: "Search text to retrieve relevant passages for." },
        awsToolName: { type: "string", default: "aws_kendra_retrieve" },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Amazon Kendra or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference passed to the AWS tool." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        attributeFilter: { type: "object", additionalProperties: true },
        documentRelevanceOverrideConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        pageNumber: { type: "integer" },
        pageSize: { type: "integer", default: 10 },
        requestedDocumentAttributes: { type: "array", items: { type: "string" } },
        userContext: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["indexId", "queryText"],
    },
  },
  async (args, chidori) => {
    const awsToolName = args.awsToolName ?? "aws_kendra_retrieve";
    const response = await chidori.tool<JsonObject, JsonObject>(
      awsToolName,
      compactObject({
        authorization: args.authorization as Json | undefined,
        amzDate: args.amzDate,
        securityToken: args.securityToken as Json | undefined,
        headers: args.headers,
        indexId: args.indexId,
        queryText: args.queryText,
        region: args.region,
        endpoint: args.endpoint,
        attributeFilter: args.attributeFilter,
        documentRelevanceOverrideConfigurations: args.documentRelevanceOverrideConfigurations as Json | undefined,
        pageNumber: args.pageNumber,
        pageSize: args.pageSize,
        requestedDocumentAttributes: args.requestedDocumentAttributes,
        userContext: args.userContext,
      }) as JsonObject,
    );
    return {
      documents: loadAmazonKendraRetrieveDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.queryText,
        indexId: args.indexId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const amazonKendraQueryRetrieverTool = defineTool<AmazonKendraQueryRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "amazon_kendra_query_retrieve",
    description: "Call an Amazon Kendra Query tool and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        indexId: { type: "string", description: "Amazon Kendra index ID." },
        queryText: { type: "string", description: "Search text for the query." },
        awsToolName: { type: "string", default: "aws_kendra_query" },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Amazon Kendra or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference passed to the AWS tool." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        attributeFilter: { type: "object", additionalProperties: true },
        collapseConfiguration: { type: "object", additionalProperties: true },
        documentRelevanceOverrideConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        facets: { type: "array", items: { type: "object", additionalProperties: true } },
        pageNumber: { type: "integer" },
        pageSize: { type: "integer", default: 10 },
        queryResultTypeFilter: { type: "string", enum: ["DOCUMENT", "QUESTION_ANSWER", "ANSWER"] },
        requestedDocumentAttributes: { type: "array", items: { type: "string" } },
        sortingConfiguration: { type: "object", additionalProperties: true },
        sortingConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        spellCorrectionConfiguration: { type: "object", additionalProperties: true },
        userContext: { type: "object", additionalProperties: true },
        visitorId: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["indexId", "queryText"],
    },
  },
  async (args, chidori) => {
    const awsToolName = args.awsToolName ?? "aws_kendra_query";
    const response = await chidori.tool<JsonObject, JsonObject>(
      awsToolName,
      compactObject({
        authorization: args.authorization as Json | undefined,
        amzDate: args.amzDate,
        securityToken: args.securityToken as Json | undefined,
        headers: args.headers,
        indexId: args.indexId,
        queryText: args.queryText,
        region: args.region,
        endpoint: args.endpoint,
        attributeFilter: args.attributeFilter,
        collapseConfiguration: args.collapseConfiguration,
        documentRelevanceOverrideConfigurations: args.documentRelevanceOverrideConfigurations as Json | undefined,
        facets: args.facets as Json | undefined,
        pageNumber: args.pageNumber,
        pageSize: args.pageSize,
        queryResultTypeFilter: args.queryResultTypeFilter,
        requestedDocumentAttributes: args.requestedDocumentAttributes,
        sortingConfiguration: args.sortingConfiguration,
        sortingConfigurations: args.sortingConfigurations as Json | undefined,
        spellCorrectionConfiguration: args.spellCorrectionConfiguration,
        userContext: args.userContext,
        visitorId: args.visitorId,
      }) as JsonObject,
    );
    return {
      documents: loadAmazonKendraQueryDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.queryText,
        indexId: args.indexId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const bm25RetrieverTool = defineTool<Bm25RetrieverArgs, { documents: RetrievedDocument[] }>(
  {
    name: "bm25_retrieve",
    description: "Rank caller-provided documents with BM25 keyword relevance and return Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword query to rank documents against." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        topK: { type: "integer", default: 4 },
        contentPath: { type: "string", default: "/pageContent" },
        metadataPath: { type: "string", default: "/metadata" },
        metadata: { type: "object", additionalProperties: true },
        k1: { type: "number", default: 1.5 },
        b: { type: "number", default: 0.75 },
        minScore: { type: "number", default: 0 },
        includeZeroScores: { type: "boolean", default: false },
        caseSensitive: { type: "boolean", default: false },
      },
      required: ["query", "documents"],
    },
  },
  async (args) => ({ documents: loadBm25Documents(args) }),
);

export const timeWeightedRetrieverTool = defineTool<TimeWeightedRetrieverArgs, { documents: RetrievedDocument[] }>(
  {
    name: "time_weighted_retrieve",
    description: "Rank caller-provided documents by keyword relevance, recency, importance, and existing score metadata.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword query to rank documents against." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        topK: { type: "integer", default: 4 },
        contentPath: { type: "string", default: "/pageContent" },
        metadataPath: { type: "string", default: "/metadata" },
        timestampPath: { type: "string", default: "/metadata/lastAccessedAt" },
        importancePath: { type: "string", default: "/metadata/importance" },
        baseScorePath: { type: "string", default: "/metadata/score" },
        now: { type: "string", description: "Reference ISO timestamp for deterministic recency scoring." },
        decayRate: { type: "number", default: 0.01 },
        timeUnit: { type: "string", enum: ["hour", "day"], default: "hour" },
        relevanceWeight: { type: "number", default: 1 },
        recencyWeight: { type: "number", default: 1 },
        importanceWeight: { type: "number", default: 1 },
        baseScoreWeight: { type: "number", default: 1 },
        metadata: { type: "object", additionalProperties: true },
        k1: { type: "number", default: 1.5 },
        b: { type: "number", default: 0.75 },
        includeZeroScores: { type: "boolean", default: false },
        caseSensitive: { type: "boolean", default: false },
      },
      required: ["query", "documents"],
    },
  },
  async (args) => ({ documents: loadTimeWeightedDocuments(args) }),
);

export const metalRetrieverTool = defineTool<MetalRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "metal_retrieve",
    description: "Search a Metal index and normalize search hits to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Text query to search for." },
        apiKey: { description: "Metal API key or Chidori memory secret reference." },
        clientId: { description: "Metal client ID or Chidori memory secret reference." },
        indexId: { type: "string", description: "Metal index ID." },
        baseUrl: { type: "string", default: "https://api.getmetal.io" },
        limit: { type: "integer", default: 4 },
        filters: { type: "object", additionalProperties: true },
        idsOnly: { type: "boolean", default: false },
        embedding: { type: "array", items: { type: "number" } },
        imageUrl: { type: "string" },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "indexId"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.getmetal.io")}/v1/search`,
      compactObject({
        method: "POST",
        headers: await metalHeaders(args, chidori),
        body: compactObject({
          ...(args.extraBody ?? {}),
          index: args.indexId,
          text: args.query,
          limit: args.limit ?? 4,
          filters: args.filters,
          idsOnly: args.idsOnly,
          embedding: args.embedding,
          imageUrl: args.imageUrl,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadMetalSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        indexId: args.indexId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const alchemystContextRetrieverTool = defineTool<AlchemystContextRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "alchemyst_context_retrieve",
    description: "Search Alchemyst AI context data and normalize matching chunks to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Alchemyst API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.alchemyst.ai" },
        similarityThreshold: { type: "number", default: 0.7 },
        minimumSimilarityThreshold: { type: "number", default: 0.5 },
        scope: { type: "string", default: "internal" },
        topK: { type: "integer", description: "Maximum result count when supported by the API." },
        filter: { type: "object", additionalProperties: true, description: "Metadata filter, such as groupName." },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Alchemyst API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.alchemyst.ai")}/api/v1/context/search`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          ...(args.extraBody ?? {}),
          query: args.query,
          similarity_threshold: args.similarityThreshold,
          minimum_similarity_threshold: args.minimumSimilarityThreshold,
          scope: args.scope,
          limit: args.topK,
          metadata: args.filter,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadAlchemystContextDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        scope: args.scope,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const azionEdgeSqlRetrieverTool = defineTool<AzionEdgeSqlRetrieverArgs, {
  documents: RetrievedDocument[];
  raw: JsonObject;
  statements: string[];
}>(
  {
    name: "azion_edgesql_retrieve",
    description: "Run Azion EdgeSQL vector, full-text, or hybrid retrieval queries and normalize matching rows to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Text query to retrieve against." },
        token: { description: "Azion API token or Chidori memory secret reference." },
        databaseId: { type: "string", description: "Azion EdgeSQL database ID." },
        baseUrl: { type: "string", default: "https://api.azionapi.net" },
        searchType: { type: "string", enum: ["similarity", "fts", "hybrid"], default: "similarity" },
        vectorTable: { type: "string", description: "Table used for vector similarity rows." },
        ftsTable: { type: "string", description: "Table used for full-text rows. Defaults to vectorTable." },
        vectorIndex: { type: "string", description: "Azion vector index name. Defaults to <vectorTable>_idx." },
        queryVector: { type: "array", items: { type: "number" }, description: "Precomputed query embedding vector." },
        embeddingToolName: { type: "string", description: "Chidori embedding tool called when queryVector is omitted." },
        embeddingArgs: { type: "object", additionalProperties: true },
        embeddingInputKey: { type: "string", default: "input" },
        embeddingResponsePath: { type: "string", default: "/data/0/embedding" },
        contentColumn: { type: "string", default: "page_content" },
        idColumn: { type: "string", default: "id" },
        metadataColumns: { type: "array", items: { type: "string" } },
        similarityK: { type: "integer", default: 4 },
        ftsK: { type: "integer", default: 4 },
        statement: { type: "string", description: "SQL statement override. When set, generated SQL is skipped." },
        extraStatements: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "databaseId"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Azion API token");
    const statements = await azionStatements(args, chidori);
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.azionapi.net")}/v4/edge_sql/databases/${encodeURIComponent(args.databaseId)}/query`,
      compactObject({
        method: "POST",
        headers: jsonHeaders({ Authorization: `Token ${token}` }),
        body: { statements },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadAzionEdgeSqlDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        databaseId: args.databaseId,
        searchType: args.searchType ?? (args.statement ? "statement" : "similarity"),
      }) as JsonObject, args),
      raw: response,
      statements,
    };
  },
);

export const driaRetrieverTool = defineTool<DriaRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "dria_retrieve",
    description: "Search or query a Dria knowledge contract and normalize matching results to Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Text query for Dria search or embedding input for vector query mode." },
        apiKey: { description: "Dria API key or Chidori memory secret reference." },
        contractId: { type: "string", description: "Dria knowledge contract ID." },
        mode: { type: "string", enum: ["search", "query", "fetch"], default: "search" },
        searchUrl: { type: "string", default: "https://search.dria.co/hnsw" },
        apiUrl: { type: "string", default: "https://api.dria.co" },
        topK: { type: "integer", default: 10 },
        rerank: { type: "boolean", default: true },
        level: { type: "integer", default: 1 },
        field: { type: "string", description: "CSV field name for text search." },
        queryVector: { type: "array", items: { type: "number" }, description: "Precomputed vector for query mode." },
        embeddingToolName: { type: "string", description: "Chidori embedding tool called in query mode when queryVector is omitted." },
        embeddingArgs: { type: "object", additionalProperties: true },
        embeddingInputKey: { type: "string", default: "input" },
        embeddingResponsePath: { type: "string", default: "/data/0/embedding" },
        ids: { type: "array", items: { type: "integer" }, description: "Vector IDs for fetch mode." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "contractId"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Dria API key");
    const headers = driaHeaders(apiKey);
    const mode = args.mode ?? "search";
    if (mode === "fetch" && (!args.ids || args.ids.length === 0)) {
      throw new Error("ids is required for Dria fetch mode");
    }
    const raw = mode === "search"
      ? await requestJson<JsonObject>(
        chidori,
        `${driaSearchBaseUrl(args)}/search`,
        compactObject({
          method: "POST",
          headers,
          body: compactObject({
            query: args.query,
            top_n: args.topK ?? 10,
            level: args.level ?? 1,
            rerank: args.rerank ?? true,
            field: args.field,
            contract_id: args.contractId,
            model: await driaModel(args, chidori, apiKey),
          }) as JsonObject,
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      )
      : mode === "query"
        ? await requestJson<JsonObject>(
          chidori,
          `${driaSearchBaseUrl(args)}/query`,
          compactObject({
            method: "POST",
            headers,
            body: {
              vector: await driaQueryVector(args, chidori),
              contract_id: args.contractId,
              top_n: args.topK ?? 10,
            },
            timeoutMs: args.timeoutMs,
          }) as ChidoriHttpRequestOptions,
        )
        : await requestJson<JsonObject>(
          chidori,
          `${driaSearchBaseUrl(args)}/fetch`,
          compactObject({
            method: "POST",
            headers,
            body: {
              id: args.ids ?? [],
              contract_id: args.contractId,
            },
            timeoutMs: args.timeoutMs,
          }) as ChidoriHttpRequestOptions,
        );
    return {
      documents: loadDriaDocuments(raw, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        contractId: args.contractId,
        mode,
      }) as JsonObject),
      raw,
    };
  },
);

export const rerankDocumentsTool = defineTool<RerankDocumentsArgs, { documents: RetrievedDocument[]; raw: Json }>(
  {
    name: "rerank_documents",
    description: "Rerank document-shaped results by calling another Chidori rerank tool and preserving document metadata.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Query to rank documents against." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        rerankToolName: { type: "string", default: "cohere_rerank" },
        rerankArgs: { type: "object", additionalProperties: true },
        contentPath: { type: "string", default: "/pageContent" },
        metadataPath: { type: "string", default: "/metadata" },
        inputKey: { type: "string", default: "documents" },
        limitArgKey: { type: "string", default: "topN" },
        topK: { type: "integer" },
        documentInputMode: { type: "string", enum: ["strings", "objects"], default: "strings" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const rerankToolName = args.rerankToolName ?? "cohere_rerank";
    const inputKey = args.inputKey ?? "documents";
    const response = await chidori.tool<JsonObject, Json>(
      rerankToolName,
      compactObject({
        ...(args.rerankArgs ?? {}),
        query: args.query,
        [inputKey]: rerankInputDocuments(args) as Json,
        ...(args.topK === undefined ? {} : { [args.limitArgKey ?? "topN"]: args.topK }),
      }) as JsonObject,
    );
    return {
      documents: loadRerankedDocuments(response, args.documents, compactObject({
        contentPath: args.contentPath,
        metadataPath: args.metadataPath,
        metadata: compactObject({
          ...(args.metadata ?? {}),
          query: args.query,
        }) as JsonObject,
        rerankToolName,
        topK: args.topK,
      }) as Partial<Pick<RerankDocumentsArgs, "contentPath" | "metadataPath" | "metadata" | "rerankToolName" | "topK">>),
      raw: response,
    };
  },
);

export const chaindeskRetrieverTool = defineTool<ChaindeskRetrieverArgs, { documents: RetrievedDocument[]; raw: Json }>(
  {
    name: "chaindesk_retrieve",
    description: "Query a Chaindesk datastore and return matching fragments as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Query text to search in the Chaindesk datastore." },
        datastoreId: { type: "string", description: "Chaindesk datastore ID. Required when datastoreUrl is not provided." },
        datastoreUrl: { type: "string", description: "Full Chaindesk datastore query URL." },
        apiKey: { description: "Chaindesk API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.chaindesk.ai" },
        topK: { type: "integer", default: 3 },
        filters: { type: "object", additionalProperties: true },
        customIds: { type: "array", items: { type: "string" } },
        datasourceIds: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<Json>(
      chidori,
      chaindeskQueryUrl(args),
      compactObject({
        method: "POST",
        headers: await chaindeskHeaders(args.apiKey, chidori),
        body: compactObject({
          query: args.query,
          topK: args.topK,
          filters: chaindeskFilters(args),
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadChaindeskDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
        datastoreId: args.datastoreId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const chatGptPluginRetrieverTool = defineTool<ChatGptPluginRetrieverArgs, { documents: RetrievedDocument[]; raw: Json }>(
  {
    name: "chatgpt_plugin_retrieve",
    description: "Query a self-hosted ChatGPT Retrieval Plugin endpoint and return matching documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language query for the retrieval plugin." },
        baseUrl: { type: "string", description: "Base URL of the retrieval plugin server." },
        bearerToken: { description: "Bearer token or Chidori memory secret reference for the plugin server." },
        topK: { type: "integer", default: 3 },
        filter: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "baseUrl"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<Json>(
      chidori,
      chatGptPluginQueryUrl(args.baseUrl),
      compactObject({
        method: "POST",
        headers: await chatGptPluginHeaders(args.bearerToken, chidori),
        body: {
          queries: [{
            query: args.query,
            filter: args.filter ?? {},
            top_k: args.topK ?? 3,
          }],
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadChatGptPluginDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const dappierAiRecommendationsRetrieverTool = defineTool<DappierAiRecommendationsRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "dappier_ai_recommendations_retrieve",
    description: "Retrieve ranked article recommendations from Dappier data models as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language query or URL for recommendations." },
        dataModelId: { type: "string", description: "Dappier data model ID starting with dm_." },
        apiKey: { description: "Dappier API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dappier.com" },
        similarityTopK: { type: "integer", default: 9 },
        ref: { type: "string", description: "Reference site domain to bias recommendations." },
        numArticlesRef: { type: "integer", default: 0 },
        searchAlgorithm: { type: "string", default: "most_recent" },
        page: { type: "integer", default: 1 },
        numResults: { type: "integer", default: 10 },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query", "dataModelId"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      dappierRecommendationsUrl(args.baseUrl, args.dataModelId),
      compactObject({
        method: "POST",
        headers: await dappierHeaders(args.apiKey, chidori),
        body: compactObject({
          query: args.query,
          similarity_top_k: args.similarityTopK,
          ref: args.ref,
          num_articles_ref: args.numArticlesRef,
          search_algorithm: args.searchAlgorithm,
          page: args.page,
          num_results: args.numResults,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadDappierAiRecommendationsDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        dataModelId: args.dataModelId,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const valyuSearchRetrieverTool = defineTool<ValyuSearchRetrieverArgs, { documents: RetrievedDocument[]; raw: JsonObject }>(
  {
    name: "valyu_search_retrieve",
    description: "Retrieve web, news, research, financial, and proprietary Valyu search results as Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language search query." },
        apiKey: { description: "Valyu API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.valyu.ai" },
        maxNumResults: { type: "integer", default: 5 },
        searchType: { type: "string", enum: ["all", "web", "proprietary", "news"], default: "all" },
        maxPrice: { type: "number" },
        relevanceThreshold: { type: "number", default: 0.5 },
        includedSources: { type: "array", items: { type: "string" } },
        excludedSources: { type: "array", items: { type: "string" } },
        sourceBiases: { type: "object", additionalProperties: true },
        instructions: { type: "string" },
        responseLength: { anyOf: [{ type: "string", enum: ["short", "medium", "large", "max"] }, { type: "integer" }] },
        startDate: { type: "string" },
        endDate: { type: "string" },
        countryCode: { type: "string" },
        fastMode: { type: "boolean" },
        urlOnly: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      valyuSearchUrl(args.baseUrl),
      compactObject({
        method: "POST",
        headers: await valyuSearchHeaders(args.apiKey, chidori),
        body: valyuSearchBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadValyuSearchDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        query: args.query,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const formatDocumentsTool = defineTool<FormatDocumentsArgs, { text: string }>(
  {
    name: "format_documents",
    description: "Format retrieved documents into a single text context block.",
    parameters: {
      type: "object",
      properties: {
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        contentPath: { type: "string", default: "/pageContent" },
        metadataPath: { type: "string", default: "/metadata" },
        separator: { type: "string", default: "\n\n" },
        includeMetadata: { type: "boolean", default: false },
      },
      required: ["documents"],
    },
  },
  async (args) => {
    const contentPath = args.contentPath ?? "/pageContent";
    const metadataPath = args.metadataPath ?? "/metadata";
    const text = args.documents
      .map((document, index) => {
        const content = stringifyValue(resolveJsonPointer(document, contentPath));
        if (!args.includeMetadata) {
          return content;
        }
        const metadata = resolveJsonPointer(document, metadataPath);
        return `Document ${index + 1}\nMetadata: ${stringifyValue(metadata)}\n${content}`;
      })
      .filter((part) => part.trim().length > 0)
      .join(args.separator ?? "\n\n");
    return { text };
  },
);

export const retrieverTools = {
  vectorSimilarityRetriever: vectorSimilarityRetrieverTool,
  hydeRetriever: hydeRetrieverTool,
  perplexitySearchRetriever: perplexitySearchRetrieverTool,
  braveSearchRetriever: braveSearchRetrieverTool,
  bingWebSearchRetriever: bingWebSearchRetrieverTool,
  googleSerperSearchRetriever: googleSerperSearchRetrieverTool,
  serpApiSearchRetriever: serpApiSearchRetrieverTool,
  googleScholarSearchRetriever: googleScholarSearchRetrieverTool,
  semanticScholarSearchRetriever: semanticScholarSearchRetrieverTool,
  wolframAlphaQueryRetriever: wolframAlphaQueryRetrieverTool,
  duckDuckGoInstantAnswerRetriever: duckDuckGoInstantAnswerRetrieverTool,
  youComSearchRetriever: youComSearchRetrieverTool,
  linkupSearchRetriever: linkupSearchRetrieverTool,
  mojeekSearchRetriever: mojeekSearchRetrieverTool,
  parallelSearchRetriever: parallelSearchRetrieverTool,
  nimbleSearchRetriever: nimbleSearchRetrieverTool,
  stackExchangeSearchRetriever: stackExchangeSearchRetrieverTool,
  pubMedSearchRetriever: pubMedSearchRetrieverTool,
  wikipediaSearchRetriever: wikipediaSearchRetrieverTool,
  arxivSearchRetriever: arxivSearchRetrieverTool,
  tavilySearchRetriever: tavilySearchRetrieverTool,
  exaSearchRetriever: exaSearchRetrieverTool,
  searxngSearchRetriever: searxngSearchRetrieverTool,
  vespaRetriever: vespaRetrieverTool,
  meilisearchRetriever: meilisearchRetrieverTool,
  supabaseHybridRetriever: supabaseHybridRetrieverTool,
  zepMemoryRetriever: zepMemoryRetrieverTool,
  zepCloudGraphSearchRetriever: zepCloudGraphSearchRetrieverTool,
  bedrockKnowledgeBaseRetriever: bedrockKnowledgeBaseRetrieverTool,
  amazonKendraRetrieveRetriever: amazonKendraRetrieveRetrieverTool,
  amazonKendraQueryRetriever: amazonKendraQueryRetrieverTool,
  bm25Retriever: bm25RetrieverTool,
  timeWeightedRetriever: timeWeightedRetrieverTool,
  metalRetriever: metalRetrieverTool,
  alchemystContextRetriever: alchemystContextRetrieverTool,
  azionEdgeSqlRetriever: azionEdgeSqlRetrieverTool,
  driaRetriever: driaRetrieverTool,
  rerankDocuments: rerankDocumentsTool,
  chaindeskRetriever: chaindeskRetrieverTool,
  chatGptPluginRetriever: chatGptPluginRetrieverTool,
  dappierAiRecommendationsRetriever: dappierAiRecommendationsRetrieverTool,
  valyuSearchRetriever: valyuSearchRetrieverTool,
  formatDocuments: formatDocumentsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getRetrieverEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "METAL_API_KEY", description: "Metal API key." },
    { name: "METAL_CLIENT_ID", description: "Metal client ID." },
    { name: "CHAINDESK_API_KEY", description: "Chaindesk API key." },
    { name: "CHATGPT_RETRIEVAL_PLUGIN_BEARER_TOKEN", description: "ChatGPT retrieval plugin bearer token." },
    { name: "DAPPIER_API_KEY", description: "Dappier API key." },
    { name: "VALYU_API_KEY", description: "Valyu API key." },
    { name: "MEILISEARCH_API_KEY", description: "Meilisearch API key." },
    { name: "ZEP_API_KEY", description: "Zep API key." },
    { name: "SUPABASE_SERVICE_ROLE_KEY", description: "Supabase service role key." },
    { name: "PERPLEXITY_API_KEY", description: "Perplexity API key." },
    { name: "BRAVE_SEARCH_API_KEY", description: "Brave Search API key." },
    { name: "BING_SEARCH_API_KEY", description: "Bing Search API key." },
    { name: "SERPER_API_KEY", description: "Serper API key." },
    { name: "SERPAPI_API_KEY", description: "SerpApi API key." },
    { name: "YOU_API_KEY", description: "You.com API key." },
    { name: "LINKUP_API_KEY", description: "Linkup API key." },
    { name: "MOJEEK_API_KEY", description: "Mojeek API key." },
    { name: "PARALLEL_API_KEY", description: "Parallel API key." },
    { name: "NIMBLE_API_KEY", description: "Nimble API key." },
    { name: "TAVILY_API_KEY", description: "Tavily API key." },
    { name: "EXA_API_KEY", description: "Exa API key." },
    { name: "WOLFRAM_ALPHA_APP_ID", description: "WolframAlpha AppID." },
    { name: "ZEP_CLOUD_API_KEY", description: "Zep Cloud API key." },
    { name: "ALCHEMYST_API_KEY", description: "Alchemyst API key." },
    { name: "AZION_API_TOKEN", description: "Azion API token." },
    { name: "DRIA_API_KEY", description: "Dria API key." },
  ];
}

export const retrieverIntegrationSpec = {
  environmentVariables: getRetrieverEnvironmentVariables,
} satisfies IntegrationSpec;
