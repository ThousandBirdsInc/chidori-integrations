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

export interface TavilySearchArgs {
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
  includeAnswer?: boolean | "basic" | "advanced";
  includeRawContent?: boolean | "markdown" | "text";
  includeImages?: boolean;
  includeImageDescriptions?: boolean;
  includeFavicon?: boolean;
  includeDomains?: string[];
  excludeDomains?: string[];
  country?: string;
  autoParameters?: boolean;
  exactMatch?: boolean;
  includeUsage?: boolean;
  safeSearch?: boolean;
}

export interface TavilyExtractArgs {
  urls: string | string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  query?: string;
  chunksPerSource?: number;
  extractDepth?: "basic" | "advanced";
  includeImages?: boolean;
  includeFavicon?: boolean;
  format?: "markdown" | "text";
  timeout?: number;
  includeUsage?: boolean;
}

export interface TavilyCrawlArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  instructions?: string;
  maxDepth?: number;
  maxBreadth?: number;
  limit?: number;
  selectPaths?: string[];
  selectDomains?: string[];
  excludePaths?: string[];
  excludeDomains?: string[];
  allowExternal?: boolean;
  includeImages?: boolean;
  extractDepth?: "basic" | "advanced";
  format?: "markdown" | "text";
  includeFavicon?: boolean;
  timeout?: number;
  includeUsage?: boolean;
}

export interface TavilyMapArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  instructions?: string;
  maxDepth?: number;
  maxBreadth?: number;
  limit?: number;
  selectPaths?: string[];
  selectDomains?: string[];
  excludePaths?: string[];
  excludeDomains?: string[];
  allowExternal?: boolean;
  timeout?: number;
  includeUsage?: boolean;
}

export interface ExaSearchArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  numResults?: number;
  type?: "keyword" | "neural" | "auto";
  includeDomains?: string[];
  excludeDomains?: string[];
  contents?: JsonObject;
}

export interface FirecrawlScrapeArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  formats?: string[];
  onlyMainContent?: boolean;
  waitFor?: number;
  timeoutMs?: number;
}

export interface BraveSearchArgs {
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
}

export interface BingWebSearchArgs {
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
}

export interface PerplexitySearchArgs {
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
  extraBody?: JsonObject;
  timeoutMs?: number;
}

export interface MojeekSearchArgs {
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
}

export interface ParallelSearchArgs {
  objective?: string;
  searchQueries?: string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  mode?: "basic" | "advanced";
  maxCharsTotal?: number;
  sessionId?: string;
  clientModel?: string;
  advancedSettings?: JsonObject;
  timeoutMs?: number;
}

export interface ParallelExtractArgs {
  urls: string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  objective?: string;
  searchQueries?: string[];
  maxCharsTotal?: number;
  sessionId?: string;
  clientModel?: string;
  excerptSettings?: boolean | JsonObject;
  fullContent?: boolean | JsonObject;
  timeoutMs?: number;
}

export interface NimbleSearchArgs {
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
  timeoutMs?: number;
}

export interface GoogleCustomSearchArgs {
  query: string;
  apiKey?: SecretInput;
  searchEngineId: string;
  baseUrl?: string;
  start?: number;
  num?: number;
  languageRestrict?: string;
  safe?: "active" | "off";
  siteSearch?: string;
  dateRestrict?: string;
}

export interface ArxivSearchArgs {
  query?: string;
  idList?: string[];
  baseUrl?: string;
  start?: number;
  maxResults?: number;
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";
  sortOrder?: "ascending" | "descending";
  includeRawXml?: boolean;
  timeoutMs?: number;
}

export interface SemanticScholarAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  fields?: string[];
  timeoutMs?: number;
}

export interface SemanticScholarPaperSearchArgs extends SemanticScholarAuthArgs {
  query: string;
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
}

export interface SemanticScholarPaperGetArgs extends SemanticScholarAuthArgs {
  paperId: string;
}

export interface PubMedSearchArgs {
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
  includeSummaries?: boolean;
  tool?: string;
  email?: string;
  timeoutMs?: number;
}

export interface OpenWeatherMapLocationArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  zip?: string;
  cityId?: number;
  units?: "standard" | "metric" | "imperial";
  language?: string;
  mode?: "json" | "xml" | "html";
  timeoutMs?: number;
}

export interface OpenWeatherMapForecastArgs extends OpenWeatherMapLocationArgs {
  count?: number;
}

export interface NasaApodArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  count?: number;
  thumbnails?: boolean;
  hd?: boolean;
  timeoutMs?: number;
}

export interface NasaMarsRoverPhotosArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  rover?: "curiosity" | "opportunity" | "spirit" | "perseverance" | string;
  sol?: number;
  earthDate?: string;
  camera?: string;
  page?: number;
  timeoutMs?: number;
}

export interface TmdbAuthArgs {
  apiKey?: SecretInput;
  accessToken?: SecretInput;
  baseUrl?: string;
  language?: string;
  timeoutMs?: number;
}

export interface TmdbMovieSearchArgs extends TmdbAuthArgs {
  query: string;
  page?: number;
  includeAdult?: boolean;
  region?: string;
  year?: number;
  primaryReleaseYear?: number;
}

export interface TmdbMovieDetailsArgs extends TmdbAuthArgs {
  movieId: number;
  appendToResponse?: string[];
}

export interface SerpApiSearchArgs {
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
}

export interface GoogleSerperSearchArgs {
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
  timeoutMs?: number;
}

export interface JinaSearchArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  accept?: "text/plain" | "text/markdown" | "application/json";
  respondWith?: string;
  timeoutMs?: number;
}

export interface LinkupSearchArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  depth?: "fast" | "standard" | "deep";
  outputType?: "searchResults" | "sourcedAnswer" | "structured";
  includeDomains?: string[];
  excludeDomains?: string[];
  fromDate?: string | null;
  toDate?: string | null;
  includeImages?: boolean;
  includeInlineCitations?: boolean;
  includeSources?: boolean;
  maxResults?: number;
  structuredOutputSchema?: JsonObject | string;
  extraBody?: JsonObject;
  timeoutMs?: number;
}

export interface GoogleScholarSearchArgs {
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
  timeoutMs?: number;
}

export interface GoogleTrendsSearchArgs {
  query: string | string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  dataType?: "TIMESERIES" | "GEO_MAP" | "RELATED_TOPICS" | "RELATED_QUERIES";
  date?: string;
  tz?: number;
  geo?: string;
  hl?: string;
  cat?: number;
  gprop?: "" | "images" | "news" | "froogle" | "youtube";
  csv?: boolean;
  async?: boolean;
  timeoutMs?: number;
}

export interface GoogleJobsSearchArgs {
  query: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  location?: string;
  uule?: string;
  googleDomain?: string;
  gl?: string;
  hl?: string;
  nextPageToken?: string;
  async?: boolean;
  timeoutMs?: number;
}

export interface SearchApiSearchArgs {
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
}

export interface DuckDuckGoInstantAnswerArgs {
  query: string;
  baseUrl?: string;
  noHtml?: boolean;
  noRedirect?: boolean;
  skipDisambiguation?: boolean;
  pretty?: boolean;
}

export interface WikipediaSearchArgs {
  query: string;
  baseUrl?: string;
  limit?: number;
  language?: string;
}

export interface WikipediaPageSummaryArgs {
  title: string;
  restBaseUrl?: string;
  language?: string;
  redirect?: boolean;
}

export interface StackExchangeSearchArgs {
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
}

export interface WolframAlphaQueryArgs {
  input: string;
  appId?: SecretInput;
  baseUrl?: string;
  output?: "json";
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
}

export interface SearxngSearchArgs {
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
}

export interface YouComSearchArgs {
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
}

export interface DappierRealTimeSearchArgs {
  query: string;
  apiKey?: SecretInput;
  aiModelId?: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface ValyuSearchArgs {
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
  startDate?: string;
  endDate?: string;
  fastMode?: boolean;
  extraBody?: JsonObject;
  timeoutMs?: number;
}

export interface DataForSeoAuthArgs {
  login?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  baseUrl?: string;
}

export interface DataForSeoSerpSearchArgs extends DataForSeoAuthArgs {
  keyword: string;
  engine?: "google" | "bing";
  endpoint?: "organic" | "maps" | "news" | "images" | "shopping";
  locationName?: string;
  locationCode?: number;
  languageName?: string;
  languageCode?: string;
  device?: "desktop" | "mobile";
  os?: "windows" | "macos" | "android" | "ios";
  depth?: number;
  calculateRectangles?: boolean;
  extraTask?: JsonObject;
}

export interface DataForSeoKeywordSuggestionsArgs extends DataForSeoAuthArgs {
  keyword: string;
  locationName?: string;
  locationCode?: number;
  languageName?: string;
  languageCode?: string;
  limit?: number;
  filters?: Json[];
  includeSeedKeyword?: boolean;
  exactMatch?: boolean;
  extraTask?: JsonObject;
}

export interface DecodoScrapeArgs {
  username?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  baseUrl?: string;
  url: string;
  target?: string;
  proxyPool?: "standard" | "premium" | string;
  headless?: "html" | "png" | "xhr" | string;
  locale?: string;
  deviceType?: "desktop" | "mobile" | string;
  markdown?: boolean;
  parse?: boolean;
  geo?: string;
  extraTask?: JsonObject;
}

function tavilyUrl(baseUrl: string | undefined, endpoint: "search" | "extract" | "crawl" | "map"): string {
  return `${(baseUrl ?? "https://api.tavily.com").replace(/\/+$/, "")}/${endpoint}`;
}

function dataForSeoUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.dataforseo.com/v3").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function base64Ascii(input: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let output = "";
  for (let index = 0; index < input.length; index += 3) {
    const a = input.charCodeAt(index);
    const b = index + 1 < input.length ? input.charCodeAt(index + 1) : 0;
    const c = index + 2 < input.length ? input.charCodeAt(index + 2) : 0;
    output += alphabet[a >> 2];
    output += alphabet[((a & 3) << 4) | (b >> 4)];
    output += index + 1 < input.length ? alphabet[((b & 15) << 2) | (c >> 6)] : "=";
    output += index + 2 < input.length ? alphabet[c & 63] : "=";
  }
  return output;
}

async function dataForSeoHeaders(args: DataForSeoAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  if (args.authorization) {
    return jsonHeaders({ Authorization: await resolveSecret(args.authorization, chidori, "DataForSEO Authorization header") });
  }
  const login = await resolveSecret(args.login, chidori, "DataForSEO login");
  const password = await resolveSecret(args.password, chidori, "DataForSEO password");
  return jsonHeaders({ Authorization: `Basic ${base64Ascii(`${login}:${password}`)}` });
}

async function basicAuthHeaders(
  authorization: SecretInput | undefined,
  username: SecretInput | undefined,
  password: SecretInput | undefined,
  chidori: Parameters<typeof resolveSecret>[1],
  label: string,
) {
  if (authorization) {
    return jsonHeaders({ Authorization: await resolveSecret(authorization, chidori, `${label} Authorization header`) });
  }
  const resolvedUsername = await resolveSecret(username, chidori, `${label} username`);
  const resolvedPassword = await resolveSecret(password, chidori, `${label} password`);
  return jsonHeaders({ Authorization: `Basic ${base64Ascii(`${resolvedUsername}:${resolvedPassword}`)}` });
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

function semanticScholarUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.semanticscholar.org/graph/v1").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function eutilsUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://eutils.ncbi.nlm.nih.gov/entrez/eutils").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function openWeatherMapUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.openweathermap.org/data/2.5").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function nasaUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.nasa.gov").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

function tmdbUrl(baseUrl: string | undefined, path: string): string {
  return `${(baseUrl ?? "https://api.themoviedb.org/3").replace(/\/+$/, "")}/${path.replace(/^\//, "")}`;
}

async function semanticScholarHeaders(args: SemanticScholarAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  if (!args.apiKey) {
    return undefined;
  }
  return { "x-api-key": await resolveSecret(args.apiKey, chidori, "Semantic Scholar API key") };
}

async function ncbiApiKey(args: { apiKey?: SecretInput }, chidori: Parameters<typeof resolveSecret>[1]): Promise<string | undefined> {
  return args.apiKey ? resolveSecret(args.apiKey, chidori, "NCBI API key") : undefined;
}

async function nasaApiKey(args: { apiKey?: SecretInput }, chidori: Parameters<typeof resolveSecret>[1]): Promise<string> {
  return args.apiKey ? resolveSecret(args.apiKey, chidori, "NASA API key") : "DEMO_KEY";
}

async function tmdbAuth(
  args: TmdbAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
): Promise<{ headers?: Record<string, string>; apiKey?: string }> {
  if (args.accessToken) {
    return { headers: bearerAuth(await resolveSecret(args.accessToken, chidori, "TMDB access token")) };
  }
  if (args.apiKey) {
    return { apiKey: await resolveSecret(args.apiKey, chidori, "TMDB API key") };
  }
  throw new Error("TMDB accessToken or apiKey is required");
}

function openWeatherLocationQuery(args: OpenWeatherMapLocationArgs, apiKey: string): Record<string, string | number | boolean | undefined> {
  if (!args.city && (args.latitude === undefined || args.longitude === undefined) && !args.zip && args.cityId === undefined) {
    throw new Error("OpenWeatherMap location requires city, latitude/longitude, zip, or cityId");
  }
  return {
    appid: apiKey,
    q: args.city,
    lat: args.latitude,
    lon: args.longitude,
    zip: args.zip,
    id: args.cityId,
    units: args.units,
    lang: args.language,
    mode: args.mode,
  };
}

function joinList(values: string[] | undefined): string | undefined {
  return values && values.length > 0 ? values.join(";") : undefined;
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

export function parseArxivFeed(xml: string): JsonObject {
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

export const tavilySearchTool = defineTool<TavilySearchArgs, JsonObject>(
  {
    name: "tavily_search",
    description: "Search the web with Tavily.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Tavily API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Tavily-compatible base URL." },
        maxResults: { type: "integer", description: "Maximum result count.", default: 5 },
        searchDepth: { type: "string", enum: ["basic", "advanced", "fast", "ultra-fast"], default: "basic" },
        chunksPerSource: { type: "integer", description: "Relevant chunks per source for advanced search.", default: 3 },
        topic: { type: "string", enum: ["general", "news", "finance"], default: "general" },
        timeRange: { type: "string", enum: ["day", "week", "month", "year", "d", "w", "m", "y"] },
        startDate: { type: "string", description: "YYYY-MM-DD lower date bound." },
        endDate: { type: "string", description: "YYYY-MM-DD upper date bound." },
        includeAnswer: { type: "boolean", description: "Include a generated answer." },
        includeRawContent: { type: "boolean", description: "Include raw page content." },
        includeImages: { type: "boolean" },
        includeImageDescriptions: { type: "boolean" },
        includeFavicon: { type: "boolean" },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        country: { type: "string", description: "Country boost, such as united states." },
        autoParameters: { type: "boolean" },
        exactMatch: { type: "boolean" },
        includeUsage: { type: "boolean" },
        safeSearch: { type: "boolean" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Tavily API key");
    const body = compactObject({
      query: args.query,
      max_results: args.maxResults ?? 5,
      search_depth: args.searchDepth ?? "basic",
      chunks_per_source: args.chunksPerSource,
      topic: args.topic,
      time_range: args.timeRange,
      start_date: args.startDate,
      end_date: args.endDate,
      include_answer: args.includeAnswer,
      include_raw_content: args.includeRawContent,
      include_images: args.includeImages,
      include_image_descriptions: args.includeImageDescriptions,
      include_favicon: args.includeFavicon,
      include_domains: args.includeDomains,
      exclude_domains: args.excludeDomains,
      country: args.country,
      auto_parameters: args.autoParameters,
      exact_match: args.exactMatch,
      include_usage: args.includeUsage,
      safe_search: args.safeSearch,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, tavilyUrl(args.baseUrl, "search"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
    });
  },
);

export const tavilyExtractTool = defineTool<TavilyExtractArgs, JsonObject>(
  {
    name: "tavily_extract",
    description: "Extract clean content from one or more URLs with Tavily.",
    parameters: {
      type: "object",
      properties: {
        urls: { description: "URL or URLs to extract content from." },
        apiKey: { description: "Tavily API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Tavily-compatible base URL." },
        query: { type: "string", description: "Intent query for chunk reranking." },
        chunksPerSource: { type: "integer", default: 3 },
        extractDepth: { type: "string", enum: ["basic", "advanced"], default: "basic" },
        includeImages: { type: "boolean", default: false },
        includeFavicon: { type: "boolean", default: false },
        format: { type: "string", enum: ["markdown", "text"], default: "markdown" },
        timeout: { type: "number", description: "Maximum extraction time in seconds." },
        includeUsage: { type: "boolean", default: false },
      },
      required: ["urls"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Tavily API key");
    return requestJson<JsonObject>(chidori, tavilyUrl(args.baseUrl, "extract"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        urls: args.urls,
        query: args.query,
        chunks_per_source: args.chunksPerSource,
        extract_depth: args.extractDepth ?? "basic",
        include_images: args.includeImages,
        include_favicon: args.includeFavicon,
        format: args.format ?? "markdown",
        timeout: args.timeout,
        include_usage: args.includeUsage,
      }) as JsonObject,
    });
  },
);

export const tavilyCrawlTool = defineTool<TavilyCrawlArgs, JsonObject>(
  {
    name: "tavily_crawl",
    description: "Crawl a site and extract page content with Tavily.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Root URL to crawl." },
        apiKey: { description: "Tavily API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Tavily-compatible base URL." },
        instructions: { type: "string" },
        maxDepth: { type: "integer", default: 1 },
        maxBreadth: { type: "integer", default: 20 },
        limit: { type: "integer", default: 50 },
        selectPaths: { type: "array", items: { type: "string" } },
        selectDomains: { type: "array", items: { type: "string" } },
        excludePaths: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        allowExternal: { type: "boolean", default: true },
        includeImages: { type: "boolean", default: false },
        extractDepth: { type: "string", enum: ["basic", "advanced"], default: "basic" },
        format: { type: "string", enum: ["markdown", "text"], default: "markdown" },
        includeFavicon: { type: "boolean", default: false },
        timeout: { type: "number", description: "Maximum crawl time in seconds." },
        includeUsage: { type: "boolean", default: false },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Tavily API key");
    return requestJson<JsonObject>(chidori, tavilyUrl(args.baseUrl, "crawl"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        url: args.url,
        instructions: args.instructions,
        max_depth: args.maxDepth,
        max_breadth: args.maxBreadth,
        limit: args.limit,
        select_paths: args.selectPaths,
        select_domains: args.selectDomains,
        exclude_paths: args.excludePaths,
        exclude_domains: args.excludeDomains,
        allow_external: args.allowExternal,
        include_images: args.includeImages,
        extract_depth: args.extractDepth ?? "basic",
        format: args.format ?? "markdown",
        include_favicon: args.includeFavicon,
        timeout: args.timeout,
        include_usage: args.includeUsage,
      }) as JsonObject,
    });
  },
);

export const tavilyMapTool = defineTool<TavilyMapArgs, JsonObject>(
  {
    name: "tavily_map",
    description: "Map site URLs with Tavily without extracting page content.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Root URL to map." },
        apiKey: { description: "Tavily API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Tavily-compatible base URL." },
        instructions: { type: "string" },
        maxDepth: { type: "integer", default: 1 },
        maxBreadth: { type: "integer", default: 20 },
        limit: { type: "integer", default: 50 },
        selectPaths: { type: "array", items: { type: "string" } },
        selectDomains: { type: "array", items: { type: "string" } },
        excludePaths: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        allowExternal: { type: "boolean", default: true },
        timeout: { type: "number", description: "Maximum map time in seconds." },
        includeUsage: { type: "boolean", default: false },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Tavily API key");
    return requestJson<JsonObject>(chidori, tavilyUrl(args.baseUrl, "map"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        url: args.url,
        instructions: args.instructions,
        max_depth: args.maxDepth,
        max_breadth: args.maxBreadth,
        limit: args.limit,
        select_paths: args.selectPaths,
        select_domains: args.selectDomains,
        exclude_paths: args.excludePaths,
        exclude_domains: args.excludeDomains,
        allow_external: args.allowExternal,
        timeout: args.timeout,
        include_usage: args.includeUsage,
      }) as JsonObject,
    });
  },
);

export const exaSearchTool = defineTool<ExaSearchArgs, JsonObject>(
  {
    name: "exa_search",
    description: "Search the web with Exa.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Exa API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Exa-compatible base URL." },
        numResults: { type: "integer", description: "Maximum result count.", default: 10 },
        type: { type: "string", enum: ["keyword", "neural", "auto"], default: "auto" },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        contents: { type: "object", additionalProperties: true },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Exa API key");
    const body = compactObject({
      query: args.query,
      numResults: args.numResults ?? 10,
      type: args.type ?? "auto",
      includeDomains: args.includeDomains,
      excludeDomains: args.excludeDomains,
      contents: args.contents,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://api.exa.ai"}/search`, {
      method: "POST",
      headers: jsonHeaders({
        ...bearerAuth(apiKey),
        "x-api-key": apiKey,
      }),
      body,
    });
  },
);

export const firecrawlScrapeTool = defineTool<FirecrawlScrapeArgs, JsonObject>(
  {
    name: "firecrawl_scrape",
    description: "Scrape a webpage with Firecrawl.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to scrape." },
        apiKey: { description: "Firecrawl API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Firecrawl-compatible base URL." },
        formats: { type: "array", items: { type: "string" }, default: ["markdown"] },
        onlyMainContent: { type: "boolean", description: "Extract only main content." },
        waitFor: { type: "integer", description: "Milliseconds to wait before scraping." },
        timeoutMs: { type: "integer", description: "Chidori HTTP timeout in milliseconds." },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Firecrawl API key");
    const body = compactObject({
      url: args.url,
      formats: args.formats ?? ["markdown"],
      onlyMainContent: args.onlyMainContent,
      waitFor: args.waitFor,
    }) as JsonObject;

    const options = compactObject({
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body,
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2];

    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://api.firecrawl.dev"}/v1/scrape`, options);
  },
);

export const braveSearchTool = defineTool<BraveSearchArgs, JsonObject>(
  {
    name: "brave_search",
    description: "Search the web with Brave Search API.",
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
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Brave Search API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.search.brave.com/res/v1/web/search", {
      q: args.query,
      count: args.count ?? 10,
      country: args.country,
      search_lang: args.searchLang,
      ui_lang: args.uiLang,
      offset: args.offset,
      safesearch: args.safesearch,
      freshness: args.freshness,
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Subscription-Token": apiKey,
      },
    });
  },
);

export const bingWebSearchTool = defineTool<BingWebSearchArgs, JsonObject>(
  {
    name: "bing_web_search",
    description: "Search the web with Microsoft Bing Web Search API.",
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
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Bing Search API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.bing.microsoft.com/v7.0/search", {
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
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    });
  },
);

export const perplexitySearchTool = defineTool<PerplexitySearchArgs, JsonObject>(
  {
    name: "perplexity_search",
    description: "Search the web with Perplexity's Search API and return ranked source results.",
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
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Perplexity API key");
    return requestJson<JsonObject>(
      chidori,
      `${(args.baseUrl ?? "https://api.perplexity.ai").replace(/\/$/, "")}/search`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          ...(args.extraBody ?? {}),
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
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const mojeekSearchTool = defineTool<MojeekSearchArgs, JsonObject>(
  {
    name: "mojeek_search",
    description: "Search the web with the Mojeek Search API.",
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
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Mojeek API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.mojeek.com/search", {
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
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
  },
);

export const parallelSearchTool = defineTool<ParallelSearchArgs, JsonObject>(
  {
    name: "parallel_search",
    description: "Search the web with Parallel Search API and return LLM-optimized excerpts.",
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
        timeoutMs: { type: "integer", description: "Chidori HTTP timeout in milliseconds." },
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
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://api.parallel.ai/v1/search", compactObject({
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
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const parallelExtractTool = defineTool<ParallelExtractArgs, JsonObject>(
  {
    name: "parallel_extract",
    description: "Extract clean markdown content or focused excerpts from URLs with Parallel Extract API.",
    parameters: {
      type: "object",
      properties: {
        urls: { type: "array", items: { type: "string" }, description: "URLs to extract content from." },
        apiKey: { description: "Parallel API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.parallel.ai/v1/extract" },
        objective: { type: "string", description: "Natural-language objective used to focus extracted excerpts." },
        searchQueries: { type: "array", items: { type: "string" }, description: "Optional keyword queries used to focus extracted excerpts." },
        maxCharsTotal: { type: "integer", description: "Upper bound on total excerpt characters across extracted results." },
        sessionId: { type: "string", description: "Session identifier to link related search and extract calls." },
        clientModel: { type: "string", description: "Model that will consume the extracted results." },
        excerptSettings: {
          description: "Excerpt extraction settings. Use true/false or an object such as { max_chars_per_result: 5000 }.",
          oneOf: [
            { type: "boolean" },
            { type: "object", additionalProperties: true },
          ],
        },
        fullContent: {
          description: "Full-content extraction settings. Use true/false or an object such as { max_chars_per_result: 50000 }.",
          oneOf: [
            { type: "boolean" },
            { type: "object", additionalProperties: true },
          ],
        },
        timeoutMs: { type: "integer", description: "Chidori HTTP timeout in milliseconds." },
      },
      required: ["urls"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Parallel API key");
    const advancedSettings = compactObject({
      excerpt_settings: args.excerptSettings,
      full_content: args.fullContent,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://api.parallel.ai/v1/extract", compactObject({
      method: "POST",
      headers: jsonHeaders({
        "x-api-key": apiKey,
      }),
      body: compactObject({
        urls: args.urls,
        objective: args.objective,
        search_queries: args.searchQueries,
        max_chars_total: args.maxCharsTotal,
        session_id: args.sessionId,
        client_model: args.clientModel,
        advanced_settings: Object.keys(advancedSettings).length > 0 ? advancedSettings : undefined,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const nimbleSearchTool = defineTool<NimbleSearchArgs, JsonObject>(
  {
    name: "nimble_search",
    description: "Search the live web with Nimble Search API.",
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
        timeoutMs: { type: "integer", description: "Chidori HTTP timeout in milliseconds." },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Nimble API key");
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://sdk.nimbleway.com/v1/search", compactObject({
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
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const googleCustomSearchTool = defineTool<GoogleCustomSearchArgs, JsonObject>(
  {
    name: "google_custom_search",
    description: "Search with Google Programmable Search Engine Custom Search JSON API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Google API key or Chidori memory secret reference." },
        searchEngineId: { type: "string", description: "Programmable Search Engine ID (cx)." },
        baseUrl: { type: "string", default: "https://www.googleapis.com/customsearch/v1" },
        start: { type: "integer" },
        num: { type: "integer" },
        languageRestrict: { type: "string" },
        safe: { type: "string", enum: ["active", "off"] },
        siteSearch: { type: "string" },
        dateRestrict: { type: "string" },
      },
      required: ["query", "searchEngineId"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Google Custom Search API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://www.googleapis.com/customsearch/v1", {
      key: apiKey,
      cx: args.searchEngineId,
      q: args.query,
      start: args.start,
      num: args.num,
      lr: args.languageRestrict,
      safe: args.safe,
      siteSearch: args.siteSearch,
      dateRestrict: args.dateRestrict,
    }), {
      method: "GET",
    });
  },
);

export const arxivSearchTool = defineTool<ArxivSearchArgs, JsonObject>(
  {
    name: "arxiv_search",
    description: "Search arXiv papers with the official arXiv Atom API.",
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
        includeRawXml: { type: "boolean", default: false },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (!args.query && (!args.idList || args.idList.length === 0)) {
      throw new Error("arxiv_search requires query or idList");
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
    }) as Parameters<typeof chidori.http>[1]);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from arXiv: ${detail}`);
    }
    const rawXml = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
    const parsed = parseArxivFeed(rawXml);
    return args.includeRawXml ? { ...parsed, rawXml } : parsed;
  },
);

export const semanticScholarPaperSearchTool = defineTool<SemanticScholarPaperSearchArgs, JsonObject>(
  {
    name: "semantic_scholar_paper_search",
    description: "Search Semantic Scholar Academic Graph papers.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Paper search query." },
        apiKey: { description: "Semantic Scholar API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.semanticscholar.org/graph/v1" },
        fields: { type: "array", items: { type: "string" }, description: "Paper fields to return." },
        limit: { type: "integer", default: 10 },
        offset: { type: "integer", description: "Offset for relevance search." },
        bulk: { type: "boolean", default: false, description: "Use /paper/search/bulk instead of /paper/search." },
        token: { type: "string", description: "Pagination token for bulk search." },
        sort: { type: "string", description: "Bulk sort expression, such as publicationDate:desc or citationCount:desc." },
        publicationTypes: { type: "array", items: { type: "string" } },
        openAccessPdf: { type: "boolean" },
        minCitationCount: { type: "integer" },
        publicationDateOrYear: { type: "string", description: "Publication date or year range." },
        year: { type: "string", description: "Year range, for example 2020-2024 or 2023-." },
        venue: { type: "array", items: { type: "string" } },
        fieldsOfStudy: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const fields = args.fields?.join(",") ?? "paperId,title,abstract,year,authors,url,citationCount,referenceCount,openAccessPdf,venue,publicationDate";
    const endpoint = args.bulk ? "paper/search/bulk" : "paper/search";
    return requestJson<JsonObject>(
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
        headers: await semanticScholarHeaders(args, chidori),
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const semanticScholarPaperGetTool = defineTool<SemanticScholarPaperGetArgs, JsonObject>(
  {
    name: "semantic_scholar_paper_get",
    description: "Get Semantic Scholar Academic Graph paper details by paper ID, DOI, arXiv ID, or Corpus ID.",
    parameters: {
      type: "object",
      properties: {
        paperId: { type: "string", description: "Semantic Scholar paper ID, DOI:<doi>, ARXIV:<id>, MAG:<id>, ACL:<id>, PMID:<id>, PMCID:<id>, URL:<url>, or CorpusId:<id>." },
        apiKey: { description: "Semantic Scholar API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.semanticscholar.org/graph/v1" },
        fields: { type: "array", items: { type: "string" }, description: "Paper fields to return." },
        timeoutMs: { type: "integer" },
      },
      required: ["paperId"],
    },
  },
  async (args, chidori) => {
    const fields = args.fields?.join(",") ?? "paperId,title,abstract,year,authors,url,citationCount,referenceCount,openAccessPdf,venue,publicationDate,externalIds";
    return requestJson<JsonObject>(
      chidori,
      withQuery(semanticScholarUrl(args.baseUrl, `paper/${encodeURIComponent(args.paperId)}`), { fields }),
      compactObject({
        method: "GET",
        headers: await semanticScholarHeaders(args, chidori),
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const pubMedSearchTool = defineTool<PubMedSearchArgs, JsonObject>(
  {
    name: "pubmed_search",
    description: "Search PubMed with NCBI E-utilities and optionally return document summaries.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "PubMed query string." },
        apiKey: { description: "NCBI API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils" },
        retMax: { type: "integer", default: 10 },
        retStart: { type: "integer", default: 0 },
        sort: { type: "string", enum: ["relevance", "pub_date", "Author", "JournalName"] },
        field: { type: "string", description: "Optional Entrez search field." },
        dateType: { type: "string", description: "Date field for date filtering, such as pdat or edat." },
        relDate: { type: "integer", description: "Limit to records added in the last N days." },
        minDate: { type: "string", description: "Minimum date, such as YYYY, YYYY/MM, or YYYY/MM/DD." },
        maxDate: { type: "string", description: "Maximum date, such as YYYY, YYYY/MM, or YYYY/MM/DD." },
        includeSummaries: { type: "boolean", default: true },
        tool: { type: "string", description: "NCBI tool identifier." },
        email: { type: "string", description: "NCBI contact email." },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await ncbiApiKey(args, chidori);
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
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
    const searchResult = typeof search.esearchresult === "object" && search.esearchresult !== null
      ? search.esearchresult as JsonObject
      : {};
    const idList = Array.isArray(searchResult.idlist)
      ? searchResult.idlist.filter((id): id is string => typeof id === "string")
      : [];
    if (args.includeSummaries === false || idList.length === 0) {
      return { search, idList };
    }
    const summaries = await requestJson<JsonObject>(
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
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
    return { search, idList, summaries };
  },
);

export const openWeatherMapCurrentWeatherTool = defineTool<OpenWeatherMapLocationArgs, JsonObject>(
  {
    name: "openweathermap_current_weather",
    description: "Get current weather from OpenWeatherMap by city, coordinates, ZIP, or city ID.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "OpenWeatherMap API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.openweathermap.org/data/2.5" },
        city: { type: "string", description: "City name, optionally with state/country, such as London,uk." },
        latitude: { type: "number" },
        longitude: { type: "number" },
        zip: { type: "string", description: "ZIP/post code, optionally with country, such as 94040,us." },
        cityId: { type: "integer", description: "OpenWeatherMap city ID." },
        units: { type: "string", enum: ["standard", "metric", "imperial"], default: "standard" },
        language: { type: "string", description: "Language code for weather descriptions." },
        mode: { type: "string", enum: ["json", "xml", "html"], default: "json" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenWeatherMap API key");
    return requestJson<JsonObject>(
      chidori,
      withQuery(openWeatherMapUrl(args.baseUrl, "weather"), openWeatherLocationQuery(args, apiKey)),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const openWeatherMapForecastTool = defineTool<OpenWeatherMapForecastArgs, JsonObject>(
  {
    name: "openweathermap_forecast",
    description: "Get a 5 day / 3 hour forecast from OpenWeatherMap by city, coordinates, ZIP, or city ID.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "OpenWeatherMap API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.openweathermap.org/data/2.5" },
        city: { type: "string", description: "City name, optionally with state/country, such as London,uk." },
        latitude: { type: "number" },
        longitude: { type: "number" },
        zip: { type: "string", description: "ZIP/post code, optionally with country, such as 94040,us." },
        cityId: { type: "integer", description: "OpenWeatherMap city ID." },
        units: { type: "string", enum: ["standard", "metric", "imperial"], default: "standard" },
        language: { type: "string", description: "Language code for weather descriptions." },
        mode: { type: "string", enum: ["json", "xml"], default: "json" },
        count: { type: "integer", description: "Number of timestamps to return." },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "OpenWeatherMap API key");
    return requestJson<JsonObject>(
      chidori,
      withQuery(openWeatherMapUrl(args.baseUrl, "forecast"), {
        ...openWeatherLocationQuery(args, apiKey),
        cnt: args.count,
      }),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const nasaApodTool = defineTool<NasaApodArgs, JsonObject>(
  {
    name: "nasa_apod",
    description: "Fetch NASA Astronomy Picture of the Day metadata.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "NASA API key or Chidori memory secret reference. Defaults to DEMO_KEY." },
        baseUrl: { type: "string", default: "https://api.nasa.gov" },
        date: { type: "string", description: "APOD date in YYYY-MM-DD format." },
        startDate: { type: "string", description: "Start date for APOD range in YYYY-MM-DD format." },
        endDate: { type: "string", description: "End date for APOD range in YYYY-MM-DD format." },
        count: { type: "integer", description: "Random APOD count." },
        thumbnails: { type: "boolean", description: "Return video thumbnails when available." },
        hd: { type: "boolean", description: "Request high-definition image URLs when available." },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const apiKey = await nasaApiKey(args, chidori);
    return requestJson<JsonObject>(
      chidori,
      withQuery(nasaUrl(args.baseUrl, "planetary/apod"), {
        api_key: apiKey,
        date: args.date,
        start_date: args.startDate,
        end_date: args.endDate,
        count: args.count,
        thumbs: args.thumbnails,
        hd: args.hd,
      }),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const nasaMarsRoverPhotosTool = defineTool<NasaMarsRoverPhotosArgs, JsonObject>(
  {
    name: "nasa_mars_rover_photos",
    description: "Fetch NASA Mars Rover photos by rover and Martian sol or Earth date.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "NASA API key or Chidori memory secret reference. Defaults to DEMO_KEY." },
        baseUrl: { type: "string", default: "https://api.nasa.gov" },
        rover: { type: "string", default: "curiosity" },
        sol: { type: "integer", description: "Martian sol to query." },
        earthDate: { type: "string", description: "Earth date in YYYY-MM-DD format." },
        camera: { type: "string", description: "Rover camera abbreviation, such as FHAZ, RHAZ, NAVCAM, or MAST." },
        page: { type: "integer" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.sol === undefined && !args.earthDate) {
      throw new Error("nasa_mars_rover_photos requires sol or earthDate");
    }
    const apiKey = await nasaApiKey(args, chidori);
    return requestJson<JsonObject>(
      chidori,
      withQuery(nasaUrl(args.baseUrl, `mars-photos/api/v1/rovers/${encodeURIComponent(args.rover ?? "curiosity")}/photos`), {
        api_key: apiKey,
        sol: args.sol,
        earth_date: args.earthDate,
        camera: args.camera,
        page: args.page,
      }),
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const tmdbMovieSearchTool = defineTool<TmdbMovieSearchArgs, JsonObject>(
  {
    name: "tmdb_movie_search",
    description: "Search movies with The Movie Database (TMDB) API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Movie search query." },
        apiKey: { description: "TMDB v3 API key or Chidori memory secret reference." },
        accessToken: { description: "TMDB API read access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.themoviedb.org/3" },
        language: { type: "string", default: "en-US" },
        page: { type: "integer", default: 1 },
        includeAdult: { type: "boolean" },
        region: { type: "string" },
        year: { type: "integer" },
        primaryReleaseYear: { type: "integer" },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const auth = await tmdbAuth(args, chidori);
    return requestJson<JsonObject>(
      chidori,
      withQuery(tmdbUrl(args.baseUrl, "search/movie"), {
        api_key: auth.apiKey,
        query: args.query,
        language: args.language,
        page: args.page,
        include_adult: args.includeAdult,
        region: args.region,
        year: args.year,
        primary_release_year: args.primaryReleaseYear,
      }),
      compactObject({
        method: "GET",
        headers: auth.headers,
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const tmdbMovieDetailsTool = defineTool<TmdbMovieDetailsArgs, JsonObject>(
  {
    name: "tmdb_movie_details",
    description: "Get movie details from The Movie Database (TMDB) API by movie ID.",
    parameters: {
      type: "object",
      properties: {
        movieId: { type: "integer", description: "TMDB movie ID." },
        apiKey: { description: "TMDB v3 API key or Chidori memory secret reference." },
        accessToken: { description: "TMDB API read access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.themoviedb.org/3" },
        language: { type: "string", default: "en-US" },
        appendToResponse: { type: "array", items: { type: "string" }, description: "Extra response groups, such as videos or credits." },
        timeoutMs: { type: "integer" },
      },
      required: ["movieId"],
    },
  },
  async (args, chidori) => {
    const auth = await tmdbAuth(args, chidori);
    return requestJson<JsonObject>(
      chidori,
      withQuery(tmdbUrl(args.baseUrl, `movie/${encodeURIComponent(String(args.movieId))}`), {
        api_key: auth.apiKey,
        language: args.language,
        append_to_response: args.appendToResponse?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: auth.headers,
        timeoutMs: args.timeoutMs,
      }) as Parameters<typeof requestJson<JsonObject>>[2],
    );
  },
);

export const serpApiSearchTool = defineTool<SerpApiSearchArgs, JsonObject>(
  {
    name: "serpapi_search",
    description: "Search Google or other engines with SerpApi.",
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
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://serpapi.com/search", {
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
    }), {
      method: "GET",
    });
  },
);

export const googleSerperSearchTool = defineTool<GoogleSerperSearchArgs, JsonObject>(
  {
    name: "google_serper_search",
    description: "Search Google results through Serper.dev, including web, news, images, videos, places, shopping, scholar, patents, and autocomplete verticals.",
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
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Serper API key");
    const baseUrl = (args.baseUrl ?? "https://google.serper.dev").replace(/\/$/, "");
    const endpoint = args.endpoint ?? "search";
    return requestJson<JsonObject>(chidori, `${baseUrl}/${endpoint}`, compactObject({
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
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const jinaSearchTool = defineTool<JinaSearchArgs, JsonObject>(
  {
    name: "jina_search",
    description: "Search the web with Jina Reader Search and return LLM-friendly result content.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "Optional Jina API key or Chidori memory secret reference for higher rate limits." },
        baseUrl: { type: "string", default: "https://s.jina.ai/" },
        accept: {
          type: "string",
          enum: ["text/plain", "text/markdown", "application/json"],
          default: "text/markdown",
        },
        respondWith: { type: "string", description: "Optional x-respond-with header for Jina Reader variants." },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const headers: Record<string, string> = {
      accept: args.accept ?? "text/markdown",
    };
    if (args.apiKey) {
      headers.Authorization = `Bearer ${await resolveSecret(args.apiKey, chidori, "Jina API key")}`;
    }
    if (args.respondWith) {
      headers["x-respond-with"] = args.respondWith;
    }
    const response = await chidori.http(withQuery(args.baseUrl ?? "https://s.jina.ai/", {
      q: args.query,
    }), compactObject({
      method: "GET",
      headers,
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Jina Search: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      content: response.body,
    } as JsonObject;
  },
);

export const linkupSearchTool = defineTool<LinkupSearchArgs, JsonObject>(
  {
    name: "linkup_search",
    description: "Run a Linkup web search and return sources, sourced answers, or structured output.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language search question." },
        apiKey: { description: "Linkup API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.linkup.so/v1/search" },
        depth: { type: "string", enum: ["fast", "standard", "deep"], default: "standard" },
        outputType: {
          type: "string",
          enum: ["searchResults", "sourcedAnswer", "structured"],
          default: "searchResults",
        },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        fromDate: { type: "string", description: "ISO date lower bound, YYYY-MM-DD." },
        toDate: { type: "string", description: "ISO date upper bound, YYYY-MM-DD." },
        includeImages: { type: "boolean" },
        includeInlineCitations: { type: "boolean" },
        includeSources: { type: "boolean" },
        maxResults: { type: "integer", minimum: 1 },
        structuredOutputSchema: {
          description: "JSON schema object or JSON string. Required by Linkup when outputType is structured.",
        },
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Linkup API key");
    const structuredOutputSchema = typeof args.structuredOutputSchema === "string"
      ? args.structuredOutputSchema
      : args.structuredOutputSchema
        ? JSON.stringify(args.structuredOutputSchema)
        : undefined;
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://api.linkup.so/v1/search", compactObject({
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        ...(args.extraBody ?? {}),
        q: args.query,
        depth: args.depth ?? "standard",
        outputType: args.outputType ?? "searchResults",
        includeDomains: args.includeDomains,
        excludeDomains: args.excludeDomains,
        fromDate: args.fromDate,
        toDate: args.toDate,
        includeImages: args.includeImages,
        includeInlineCitations: args.includeInlineCitations,
        includeSources: args.includeSources,
        maxResults: args.maxResults,
        structuredOutputSchema,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const googleScholarSearchTool = defineTool<GoogleScholarSearchArgs, JsonObject>(
  {
    name: "google_scholar_search",
    description: "Search Google Scholar through SerpApi's Google Scholar API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Scholar query. Supports Google Scholar helpers like author: and source:." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        cites: { type: "string", description: "Google Scholar cited-by ID." },
        cluster: { type: "string", description: "Google Scholar all-versions cluster ID. Use without query or cites." },
        yearLow: { type: "integer", description: "Minimum publication year." },
        yearHigh: { type: "integer", description: "Maximum publication year." },
        scisbd: { type: "integer", enum: [0, 1, 2], description: "Sort/filter by recent additions." },
        hl: { type: "string", description: "Google Scholar UI language." },
        lr: { type: "string", description: "Language restrict expression, for example lang_en." },
        start: { type: "integer" },
        num: { type: "integer", minimum: 1, maximum: 20 },
        asSdt: { type: "string", description: "Scholar search type/filter, for example 0, 7, or 4,33,192." },
        safe: { type: "string", enum: ["active", "off"] },
        filter: { type: "integer", enum: [0, 1] },
        asVis: { type: "integer", enum: [0, 1], description: "Set 1 to exclude citations." },
        asRr: { type: "integer", enum: [0, 1], description: "Set 1 to show review articles only." },
        async: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (!args.query && !args.cites && !args.cluster) {
      throw new Error("google_scholar_search requires query, cites, or cluster");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://serpapi.com/search", {
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
    }), compactObject({
      method: "GET",
      headers: { accept: "application/json" },
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const googleTrendsSearchTool = defineTool<GoogleTrendsSearchArgs, JsonObject>(
  {
    name: "google_trends_search",
    description: "Fetch Google Trends data through SerpApi's Google Trends API.",
    parameters: {
      type: "object",
      properties: {
        query: {
          description: "Trend query or up to five comparison queries.",
          anyOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
          ],
        },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        dataType: {
          type: "string",
          enum: ["TIMESERIES", "GEO_MAP", "RELATED_TOPICS", "RELATED_QUERIES"],
          default: "TIMESERIES",
        },
        date: { type: "string", description: "Time range, for example today 12-m, now 7-d, or 2024-01-01 2024-12-31." },
        tz: { type: "integer", description: "Minutes offset from UTC, for example 420 for Pacific Daylight Time." },
        geo: { type: "string", description: "Country or region code, for example US." },
        hl: { type: "string", description: "Google Trends UI language." },
        cat: { type: "integer", description: "Google Trends category ID." },
        gprop: { type: "string", enum: ["", "images", "news", "froogle", "youtube"] },
        csv: { type: "boolean" },
        async: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    const query = Array.isArray(args.query) ? args.query.join(",") : args.query;
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://serpapi.com/search", {
      api_key: apiKey,
      engine: "google_trends",
      q: query,
      data_type: args.dataType ?? "TIMESERIES",
      date: args.date,
      tz: args.tz,
      geo: args.geo,
      hl: args.hl,
      cat: args.cat,
      gprop: args.gprop,
      csv: args.csv,
      async: args.async,
      output: "json",
    }), compactObject({
      method: "GET",
      headers: { accept: "application/json" },
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const googleJobsSearchTool = defineTool<GoogleJobsSearchArgs, JsonObject>(
  {
    name: "google_jobs_search",
    description: "Search current Google Jobs postings through SerpApi's Google Jobs API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Job search query, for example software engineer remote." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        location: { type: "string", description: "City-level search location. Mutually exclusive with uule." },
        uule: { type: "string", description: "Google encoded location. Mutually exclusive with location." },
        googleDomain: { type: "string", default: "google.com" },
        gl: { type: "string", description: "Google country code." },
        hl: { type: "string", description: "Google Jobs UI language." },
        nextPageToken: { type: "string", description: "Token from serpapi_pagination.next_page_token." },
        async: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://serpapi.com/search", {
      api_key: apiKey,
      engine: "google_jobs",
      q: args.query,
      location: args.location,
      uule: args.uule,
      google_domain: args.googleDomain,
      gl: args.gl,
      hl: args.hl,
      next_page_token: args.nextPageToken,
      async: args.async,
      output: "json",
    }), compactObject({
      method: "GET",
      headers: { accept: "application/json" },
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2]);
  },
);

export const searchApiSearchTool = defineTool<SearchApiSearchArgs, JsonObject>(
  {
    name: "searchapi_search",
    description: "Search Google or other engines with SearchApi.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "SearchApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.searchapi.io/api/v1/search" },
        engine: { type: "string", default: "google" },
        location: { type: "string" },
        googleDomain: { type: "string" },
        gl: { type: "string", description: "Google country code." },
        hl: { type: "string", description: "Google UI language." },
        num: { type: "integer" },
        start: { type: "integer" },
        device: { type: "string", enum: ["desktop", "tablet", "mobile"] },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "SearchApi API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://www.searchapi.io/api/v1/search", {
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
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const duckDuckGoInstantAnswerTool = defineTool<DuckDuckGoInstantAnswerArgs, JsonObject>(
  {
    name: "duckduckgo_instant_answer",
    description: "Fetch DuckDuckGo zero-click instant answers. This is not a full web search results API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Instant answer query." },
        baseUrl: { type: "string", default: "https://api.duckduckgo.com/" },
        noHtml: { type: "boolean", default: true },
        noRedirect: { type: "boolean", default: true },
        skipDisambiguation: { type: "boolean", default: false },
        pretty: { type: "boolean", default: false },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.duckduckgo.com/", {
      q: args.query,
      format: "json",
      no_html: args.noHtml ?? true,
      no_redirect: args.noRedirect ?? true,
      skip_disambig: args.skipDisambiguation,
      pretty: args.pretty,
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const wikipediaSearchTool = defineTool<WikipediaSearchArgs, JsonObject>(
  {
    name: "wikipedia_search",
    description: "Search Wikipedia through the MediaWiki Action API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Wikipedia search query." },
        baseUrl: { type: "string", description: "MediaWiki API URL. Defaults to the selected Wikipedia language." },
        limit: { type: "integer", default: 10 },
        language: { type: "string", default: "en" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(wikiApiUrl(args.baseUrl, args.language), {
      action: "query",
      list: "search",
      srsearch: args.query,
      srlimit: args.limit ?? 10,
      format: "json",
      origin: "*",
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const wikipediaPageSummaryTool = defineTool<WikipediaPageSummaryArgs, JsonObject>(
  {
    name: "wikipedia_page_summary",
    description: "Fetch a Wikipedia page summary through the Wikipedia REST API.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Wikipedia page title." },
        restBaseUrl: { type: "string", description: "Wikipedia REST API base URL." },
        language: { type: "string", default: "en" },
        redirect: { type: "boolean", default: true },
      },
      required: ["title"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(wikiRestSummaryUrl(args.restBaseUrl, args.language, args.title), {
      redirect: args.redirect ?? true,
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const stackExchangeSearchTool = defineTool<StackExchangeSearchArgs, JsonObject>(
  {
    name: "stackexchange_search",
    description: "Search questions with the Stack Exchange advanced search API.",
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
        filter: { type: "string" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const key = args.apiKey ? await resolveSecret(args.apiKey, chidori, "Stack Exchange API key") : undefined;
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.stackexchange.com/2.3/search/advanced", {
      site: args.site ?? "stackoverflow",
      q: args.query,
      tagged: joinList(args.tagged),
      nottagged: joinList(args.notTagged),
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
      filter: args.filter,
      key,
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const wolframAlphaQueryTool = defineTool<WolframAlphaQueryArgs, JsonObject>(
  {
    name: "wolfram_alpha_query",
    description: "Query the WolframAlpha Full Results API.",
    parameters: {
      type: "object",
      properties: {
        input: { type: "string", description: "Natural language or WolframAlpha input." },
        appId: { description: "WolframAlpha AppID or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.wolframalpha.com/v2/query" },
        output: { type: "string", enum: ["json"], default: "json" },
        format: { type: "string", description: "Result formats, such as plaintext,image." },
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
      },
      required: ["input"],
    },
  },
  async (args, chidori) => {
    const appId = await resolveSecret(args.appId, chidori, "WolframAlpha AppID");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.wolframalpha.com/v2/query", {
      appid: appId,
      input: args.input,
      output: args.output ?? "json",
      format: args.format,
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
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const searxngSearchTool = defineTool<SearxngSearchArgs, JsonObject>(
  {
    name: "searxng_search",
    description: "Search through a caller-provided SearXNG instance.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        baseUrl: { type: "string", description: "SearXNG instance base URL." },
        categories: { type: "array", items: { type: "string" } },
        engines: { type: "array", items: { type: "string" } },
        language: { type: "string" },
        pageNumber: { type: "integer" },
        timeRange: { type: "string", enum: ["day", "week", "month", "year"] },
        safesearch: { type: "integer", enum: [0, 1, 2] },
        imageProxy: { type: "boolean" },
        autocomplete: { type: "string" },
        enabledPlugins: { type: "array", items: { type: "string" } },
        disabledPlugins: { type: "array", items: { type: "string" } },
      },
      required: ["query", "baseUrl"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(`${args.baseUrl.replace(/\/+$/, "")}/search`, {
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
    }), {
      method: "GET",
      headers: { accept: "application/json" },
    });
  },
);

export const youComSearchTool = defineTool<YouComSearchArgs, JsonObject>(
  {
    name: "you_com_search",
    description: "Search web and news results with the You.com Search API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "You.com API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.you.com/v1/search" },
        count: { type: "integer", default: 10 },
        freshness: { type: "string", description: "day, week, month, year, or YYYY-MM-DDtoYYYY-MM-DD." },
        country: { type: "string", description: "ISO 3166-1 alpha-2 country code." },
        language: { type: "string", description: "BCP 47 language code." },
        includeDomains: { type: "array", items: { type: "string" } },
        excludeDomains: { type: "array", items: { type: "string" } },
        livecrawl: { type: "string", enum: ["never", "fallback", "always"] },
        livecrawlFormats: { type: "array", items: { type: "string" } },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "You.com API key");
    return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://api.you.com/v1/search", {
      query: args.query,
      count: args.count ?? 10,
      freshness: args.freshness,
      country: args.country,
      language: args.language,
      include_domains: args.includeDomains?.join(","),
      exclude_domains: args.excludeDomains?.join(","),
      livecrawl: args.livecrawl,
      livecrawl_formats: args.livecrawlFormats?.join(","),
    }), {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": apiKey,
      },
    });
  },
);

export const dataForSeoSerpSearchTool = defineTool<DataForSeoSerpSearchArgs, JsonObject>(
  {
    name: "dataforseo_serp_search",
    description: "Fetch live SERP results from DataForSEO.",
    parameters: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Search keyword or query." },
        login: { description: "DataForSEO API login or Chidori memory secret reference." },
        password: { description: "DataForSEO API password or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dataforseo.com/v3" },
        engine: { type: "string", enum: ["google", "bing"], default: "google" },
        endpoint: { type: "string", enum: ["organic", "maps", "news", "images", "shopping"], default: "organic" },
        locationName: { type: "string" },
        locationCode: { type: "integer" },
        languageName: { type: "string" },
        languageCode: { type: "string" },
        device: { type: "string", enum: ["desktop", "mobile"] },
        os: { type: "string", enum: ["windows", "macos", "android", "ios"] },
        depth: { type: "integer" },
        calculateRectangles: { type: "boolean" },
        extraTask: { type: "object", additionalProperties: true },
      },
      required: ["keyword"],
    },
  },
  async (args, chidori) => {
    const engine = args.engine ?? "google";
    const endpoint = args.endpoint ?? "organic";
    const task = compactObject({
      ...(args.extraTask ?? {}),
      keyword: args.keyword,
      location_name: args.locationName,
      location_code: args.locationCode,
      language_name: args.languageName,
      language_code: args.languageCode,
      device: args.device,
      os: args.os,
      depth: args.depth,
      calculate_rectangles: args.calculateRectangles,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      dataForSeoUrl(args.baseUrl, `serp/${engine}/${endpoint}/live/advanced`),
      {
        method: "POST",
        headers: await dataForSeoHeaders(args, chidori),
        body: [task],
      },
    );
  },
);

export const dataForSeoKeywordSuggestionsTool = defineTool<DataForSeoKeywordSuggestionsArgs, JsonObject>(
  {
    name: "dataforseo_keyword_suggestions",
    description: "Fetch keyword suggestions and metrics from DataForSEO Labs.",
    parameters: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Seed keyword." },
        login: { description: "DataForSEO API login or Chidori memory secret reference." },
        password: { description: "DataForSEO API password or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dataforseo.com/v3" },
        locationName: { type: "string" },
        locationCode: { type: "integer" },
        languageName: { type: "string" },
        languageCode: { type: "string" },
        limit: { type: "integer", default: 100 },
        filters: { type: "array", items: { description: "DataForSEO filter expression item." } },
        includeSeedKeyword: { type: "boolean" },
        exactMatch: { type: "boolean" },
        extraTask: { type: "object", additionalProperties: true },
      },
      required: ["keyword"],
    },
  },
  async (args, chidori) => {
    const task = compactObject({
      ...(args.extraTask ?? {}),
      keyword: args.keyword,
      location_name: args.locationName,
      location_code: args.locationCode,
      language_name: args.languageName,
      language_code: args.languageCode,
      limit: args.limit,
      filters: args.filters,
      include_seed_keyword: args.includeSeedKeyword,
      exact_match: args.exactMatch,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      dataForSeoUrl(args.baseUrl, "dataforseo_labs/google/keyword_suggestions/live"),
      {
        method: "POST",
        headers: await dataForSeoHeaders(args, chidori),
        body: [task],
      },
    );
  },
);

export const dappierRealTimeSearchTool = defineTool<DappierRealTimeSearchArgs, JsonObject>(
  {
    name: "dappier_real_time_search",
    description: "Query Dappier real-time search AI models for live web, news, finance, and market answers.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Question or search query to send to the Dappier AI model." },
        apiKey: { description: "Dappier API key or Chidori memory secret reference." },
        aiModelId: { type: "string", default: "am_01j06ytn18ejftedz6dyhz2b15" },
        baseUrl: { type: "string", default: "https://api.dappier.com" },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Dappier API key");
    const options = compactObject({
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: { query: args.query },
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2];
    return requestJson<JsonObject>(
      chidori,
      `${args.baseUrl ?? "https://api.dappier.com"}/app/aimodel/${encodeURIComponent(args.aiModelId ?? "am_01j06ytn18ejftedz6dyhz2b15")}`,
      options,
    );
  },
);

export const valyuSearchTool = defineTool<ValyuSearchArgs, JsonObject>(
  {
    name: "valyu_search",
    description: "Search web, news, research, financial, and proprietary sources through the Valyu Search API.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural-language search query." },
        apiKey: { description: "Valyu API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.valyu.ai" },
        maxNumResults: { type: "integer", default: 5 },
        searchType: { type: "string", enum: ["all", "web", "proprietary", "news"], default: "all" },
        maxPrice: { type: "number", description: "Maximum budget in CPM." },
        relevanceThreshold: { type: "number", default: 0.5 },
        includedSources: { type: "array", items: { type: "string" } },
        excludedSources: { type: "array", items: { type: "string" } },
        sourceBiases: { type: "object", additionalProperties: true },
        instructions: { type: "string", description: "Ranking instructions for the search." },
        startDate: { type: "string" },
        endDate: { type: "string" },
        fastMode: { type: "boolean" },
        extraBody: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Valyu API key");
    const options = compactObject({
      method: "POST",
      headers: jsonHeaders({ "X-API-Key": apiKey }),
      body: compactObject({
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
        start_date: args.startDate,
        end_date: args.endDate,
        fast_mode: args.fastMode,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as Parameters<typeof requestJson<JsonObject>>[2];
    return requestJson<JsonObject>(chidori, `${args.baseUrl ?? "https://api.valyu.ai"}/v1/search`, options);
  },
);

export const decodoScrapeTool = defineTool<DecodoScrapeArgs, JsonObject>(
  {
    name: "decodo_scrape",
    description: "Scrape a webpage through Decodo Web Scraping API.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Decodo API username or Chidori memory secret reference." },
        password: { description: "Decodo API password or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://scraper-api.decodo.com/v1/tasks" },
        url: { type: "string", description: "Target URL to scrape." },
        target: { type: "string", default: "universal" },
        proxyPool: { type: "string", default: "premium" },
        headless: { type: "string", default: "html" },
        locale: { type: "string", default: "en-us" },
        deviceType: { type: "string", default: "desktop" },
        markdown: { type: "boolean", description: "Request Markdown output when supported." },
        parse: { type: "boolean", description: "Request parsed structured output when supported." },
        geo: { type: "string", description: "Geo-targeting value when supported by the selected target." },
        extraTask: { type: "object", additionalProperties: true },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      ...(args.extraTask ?? {}),
      target: args.target ?? "universal",
      url: args.url,
      proxy_pool: args.proxyPool ?? "premium",
      headless: args.headless ?? "html",
      locale: args.locale,
      device_type: args.deviceType,
      markdown: args.markdown,
      parse: args.parse,
      geo: args.geo,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, args.baseUrl ?? "https://scraper-api.decodo.com/v1/tasks", {
      method: "POST",
      headers: await basicAuthHeaders(args.authorization, args.username, args.password, chidori, "Decodo"),
      body,
    });
  },
);

export const webTools = {
  tavilySearch: tavilySearchTool,
  tavilyExtract: tavilyExtractTool,
  tavilyCrawl: tavilyCrawlTool,
  tavilyMap: tavilyMapTool,
  exaSearch: exaSearchTool,
  firecrawlScrape: firecrawlScrapeTool,
  braveSearch: braveSearchTool,
  bingWebSearch: bingWebSearchTool,
  perplexitySearch: perplexitySearchTool,
  mojeekSearch: mojeekSearchTool,
  parallelSearch: parallelSearchTool,
  parallelExtract: parallelExtractTool,
  nimbleSearch: nimbleSearchTool,
  googleCustomSearch: googleCustomSearchTool,
  arxivSearch: arxivSearchTool,
  semanticScholarPaperSearch: semanticScholarPaperSearchTool,
  semanticScholarPaperGet: semanticScholarPaperGetTool,
  pubMedSearch: pubMedSearchTool,
  openWeatherMapCurrentWeather: openWeatherMapCurrentWeatherTool,
  openWeatherMapForecast: openWeatherMapForecastTool,
  nasaApod: nasaApodTool,
  nasaMarsRoverPhotos: nasaMarsRoverPhotosTool,
  tmdbMovieSearch: tmdbMovieSearchTool,
  tmdbMovieDetails: tmdbMovieDetailsTool,
  serpApiSearch: serpApiSearchTool,
  googleSerperSearch: googleSerperSearchTool,
  jinaSearch: jinaSearchTool,
  linkupSearch: linkupSearchTool,
  googleScholarSearch: googleScholarSearchTool,
  googleTrendsSearch: googleTrendsSearchTool,
  googleJobsSearch: googleJobsSearchTool,
  searchApiSearch: searchApiSearchTool,
  duckDuckGoInstantAnswer: duckDuckGoInstantAnswerTool,
  wikipediaSearch: wikipediaSearchTool,
  wikipediaPageSummary: wikipediaPageSummaryTool,
  stackExchangeSearch: stackExchangeSearchTool,
  wolframAlphaQuery: wolframAlphaQueryTool,
  searxngSearch: searxngSearchTool,
  youComSearch: youComSearchTool,
  dataForSeoSerpSearch: dataForSeoSerpSearchTool,
  dataForSeoKeywordSuggestions: dataForSeoKeywordSuggestionsTool,
  dappierRealTimeSearch: dappierRealTimeSearchTool,
  valyuSearch: valyuSearchTool,
  decodoScrape: decodoScrapeTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getWebEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "DATAFORSEO_AUTHORIZATION", description: "DataForSEO Authorization header." },
    { name: "DATAFORSEO_LOGIN", description: "DataForSEO login." },
    { name: "DATAFORSEO_PASSWORD", description: "DataForSEO password." },
    { name: "SEMANTIC_SCHOLAR_API_KEY", description: "Semantic Scholar API key." },
    { name: "NCBI_API_KEY", description: "NCBI API key." },
    { name: "NASA_API_KEY", description: "NASA API key." },
    { name: "TMDB_ACCESS_TOKEN", description: "TMDB access token." },
    { name: "TMDB_API_KEY", description: "TMDB API key." },
    { name: "TAVILY_API_KEY", description: "Tavily API key." },
    { name: "EXA_API_KEY", description: "Exa API key." },
    { name: "FIRECRAWL_API_KEY", description: "Firecrawl API key." },
    { name: "BRAVE_SEARCH_API_KEY", description: "Brave Search API key." },
    { name: "BING_SEARCH_API_KEY", description: "Bing Search API key." },
    { name: "PERPLEXITY_API_KEY", description: "Perplexity API key." },
    { name: "MOJEEK_API_KEY", description: "Mojeek API key." },
    { name: "PARALLEL_API_KEY", description: "Parallel API key." },
    { name: "NIMBLE_API_KEY", description: "Nimble API key." },
    { name: "GOOGLE_CUSTOM_SEARCH_API_KEY", description: "Google Custom Search API key." },
    { name: "OPENWEATHERMAP_API_KEY", description: "OpenWeatherMap API key." },
    { name: "SERPAPI_API_KEY", description: "SerpApi API key." },
    { name: "SERPER_API_KEY", description: "Serper API key." },
    { name: "JINA_API_KEY", description: "Jina API key." },
    { name: "LINKUP_API_KEY", description: "Linkup API key." },
    { name: "SEARCHAPI_API_KEY", description: "SearchApi API key." },
    { name: "STACK_EXCHANGE_API_KEY", description: "Stack Exchange API key." },
    { name: "WOLFRAM_ALPHA_APP_ID", description: "WolframAlpha AppID." },
    { name: "YOU_API_KEY", description: "You.com API key." },
    { name: "DAPPIER_API_KEY", description: "Dappier API key." },
    { name: "VALYU_API_KEY", description: "Valyu API key." },
  ];
}

export const webIntegrationSpec = {
  environmentVariables: getWebEnvironmentVariables,
} satisfies IntegrationSpec;
