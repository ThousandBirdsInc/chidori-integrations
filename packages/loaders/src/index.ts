import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type ChidoriRuntime,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";
import type { ChidoriDocument } from "@chidori/integrations-text";

export interface HttpDocumentLoaderArgs {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: Json | string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface JsonDocumentLoaderArgs {
  json: Json;
  pointer?: string;
  metadata?: JsonObject;
}

export interface TextDocumentLoaderArgs {
  text: string;
  metadata?: JsonObject;
}

export interface MarkdownDocumentLoaderArgs {
  markdown: string;
  metadata?: JsonObject;
  parseFrontMatter?: boolean;
  stripMarkdown?: boolean;
}

export interface SubtitleDocumentLoaderArgs {
  subtitles: string;
  format?: "srt" | "vtt";
  metadata?: JsonObject;
  splitCues?: boolean;
}

export interface YouTubeTranscriptLoaderArgs {
  url?: string;
  videoId?: string;
  language?: string;
  translation?: string;
  transcriptUrl?: string;
  baseUrl?: string;
  format?: "json3" | "srv3" | "vtt";
  transcript?: string | JsonObject | Json[];
  transcriptFormat?: "text" | "chunks";
  chunkSizeSeconds?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ChatGptExportLoaderArgs {
  exportJson: Json;
  metadata?: JsonObject;
}

export interface SlackConversationLoaderArgs {
  channel?: string;
  token?: SecretInput;
  baseUrl?: string;
  cursor?: string;
  latest?: string;
  oldest?: string;
  inclusive?: boolean;
  limit?: number;
  messages?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DiscordChannelMessagesLoaderArgs {
  channelId?: string;
  token?: SecretInput;
  baseUrl?: string;
  around?: string;
  before?: string;
  after?: string;
  limit?: number;
  messages?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface GitHubRepositoryLoaderArgs {
  githubUrl?: string;
  owner?: string;
  repo?: string;
  token?: SecretInput;
  baseUrl?: string;
  apiUrl?: string;
  branch?: string;
  ref?: string;
  path?: string;
  recursive?: boolean;
  ignorePaths?: string[];
  unknown?: "skip" | "warn" | "error";
  maxFiles?: number;
  maxBytes?: number;
  files?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SerpApiSearchLoaderArgs {
  query?: string;
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
  results?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SearchApiSearchLoaderArgs {
  query?: string;
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
  results?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SalesforceSoqlLoaderArgs {
  instanceUrl: string;
  accessToken?: SecretInput;
  apiVersion?: string;
  query?: string;
  nextRecordsUrl?: string;
  records?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface HubSpotCrmObjectsLoaderArgs {
  objectType: string;
  token?: SecretInput;
  baseUrl?: string;
  mode?: "list" | "search";
  query?: string;
  filterGroups?: JsonObject[];
  sorts?: string[];
  properties?: string[];
  propertiesWithHistory?: string[];
  associations?: string[];
  archived?: boolean;
  limit?: number;
  after?: string;
  objects?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface StripeResourceLoaderArgs {
  resource: "balance_transactions" | "charges" | "customers" | "events" | "refunds" | "disputes";
  apiKey?: SecretInput;
  baseUrl?: string;
  stripeVersion?: string;
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  created?: JsonObject;
  customer?: string;
  type?: string;
  resources?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ShopifyResourceLoaderArgs {
  resource: "products" | "orders" | "customers";
  token?: SecretInput;
  shop?: string;
  baseUrl?: string;
  apiVersion?: string;
  limit?: number;
  sinceId?: string;
  status?: string;
  vendor?: string;
  productType?: string;
  collectionId?: string;
  financialStatus?: string;
  fulfillmentStatus?: string;
  createdAtMin?: string;
  createdAtMax?: string;
  updatedAtMin?: string;
  updatedAtMax?: string;
  query?: string;
  fields?: string[];
  records?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ZendeskSupportLoaderArgs {
  resource: "search" | "tickets" | "users";
  subdomain?: string;
  baseUrl?: string;
  email?: string;
  apiToken?: SecretInput;
  oauthToken?: SecretInput;
  query?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: "end-user" | "agent" | "admin";
  page?: number;
  perPage?: number;
  records?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface TypeformResourceLoaderArgs {
  resource: "forms" | "responses";
  token?: SecretInput;
  baseUrl?: string;
  formId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  workspaceId?: string;
  since?: string;
  until?: string;
  after?: string;
  before?: string;
  includedResponseIds?: string[];
  completed?: boolean;
  responseType?: string[];
  sort?: string;
  query?: string;
  fields?: string[];
  records?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ServiceNowTableRecordsLoaderArgs {
  instanceUrl: string;
  table: string;
  oauthToken?: SecretInput;
  username?: string;
  password?: SecretInput;
  apiPath?: string;
  sysId?: string;
  query?: string;
  fields?: string[];
  displayValue?: boolean | "true" | "false" | "all";
  excludeReferenceLink?: boolean;
  suppressPaginationHeader?: boolean;
  limit?: number;
  offset?: number;
  view?: string;
  records?: Json[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface JsonLinesDocumentLoaderArgs {
  jsonl: string;
  metadata?: JsonObject;
  skipInvalid?: boolean;
}

export interface CsvDocumentLoaderArgs {
  csv: string;
  delimiter?: string;
  hasHeader?: boolean;
  metadata?: JsonObject;
}

export interface SitemapDocumentLoaderArgs {
  url: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
  maxUrls?: number;
  fetchPages?: boolean;
}

export interface RssFeedLoaderArgs {
  url?: string;
  feedXml?: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
  maxItems?: number;
}

export interface HtmlDocumentLoaderArgs {
  html: string;
  metadata?: JsonObject;
  includeTitle?: boolean;
}

export interface CheerioWebLoaderArgs {
  url?: string;
  html?: string;
  selector?: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface RecursiveUrlLoaderArgs {
  url?: string;
  pages?: Array<{ url: string; html: string }>;
  maxDepth?: number;
  maxPages?: number;
  excludeDirs?: string[];
  preventOutside?: boolean;
  linkRegex?: string;
  selector?: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
  continueOnFailure?: boolean;
}

export interface ImsdbScriptLoaderArgs {
  url?: string;
  html?: string;
  title?: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface CollegeConfidentialLoaderArgs {
  url?: string;
  html?: string;
  title?: string;
  headers?: Record<string, string>;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface NotionBlocksLoaderArgs {
  pageOrBlockId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  notionVersion?: string;
  recursive?: boolean;
  maxDepth?: number;
  metadata?: JsonObject;
}

export interface NotionMarkdownExportLoaderArgs {
  files: Array<{ path: string; markdown: string }>;
  stripMarkdown?: boolean;
  metadata?: JsonObject;
}

export interface GoogleDriveFileLoaderArgs {
  fileId: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  exportMimeType?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface GoogleCloudStorageObjectLoaderArgs {
  bucket: string;
  object: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  generation?: string;
  userProject?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AzureBlobFileLoaderArgs {
  accountName?: string;
  container?: string;
  blob?: string;
  url?: string;
  sasToken?: SecretInput;
  accessToken?: SecretInput;
  baseUrl?: string;
  versionId?: string;
  snapshot?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AwsS3ObjectLoaderArgs {
  bucket?: string;
  key?: string;
  url?: string;
  endpointUrl?: string;
  region?: string;
  headers?: Record<string, string>;
  versionId?: string;
  requestPayer?: "requester";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DropboxFileLoaderArgs {
  path: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface DocumentParseApiLoaderArgs {
  endpoint: string;
  apiKey?: SecretInput;
  fileBase64?: string;
  fileUrl?: string;
  text?: string;
  filename?: string;
  mimeType?: string;
  parserOptions?: JsonObject;
  responseDocumentsPath?: string;
  responseTextPath?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AirtableRecordsLoaderArgs {
  baseId: string;
  table: string;
  token?: SecretInput;
  baseUrl?: string;
  view?: string;
  filterByFormula?: string;
  pageSize?: number;
  maxRecords?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface FigmaFileLoaderArgs {
  fileKey: string;
  token?: SecretInput;
  baseUrl?: string;
  ids?: string[];
  depth?: number;
  version?: string;
  branchData?: boolean;
  authScheme?: "figma_token" | "bearer";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface JiraIssuesLoaderArgs {
  baseUrl: string;
  accessToken?: SecretInput;
  jql: string;
  fields?: string[];
  maxResults?: number;
  maxIssues?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ConfluencePagesLoaderArgs {
  baseUrl: string;
  accessToken?: SecretInput;
  pageId?: string;
  spaceId?: string;
  title?: string;
  bodyFormat?: "storage" | "atlas_doc_format" | "view";
  limit?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface BrowserbaseFetchLoaderArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  headers?: Record<string, string>;
  proxy?: JsonObject;
  allowInsecureSsl?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface FirecrawlLoaderArgs {
  url?: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  mode?: "scrape" | "crawl" | "map";
  params?: JsonObject;
  result?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ParallelExtractLoaderArgs {
  urls?: string[];
  apiKey?: SecretInput;
  baseUrl?: string;
  objective?: string;
  searchQueries?: string[];
  maxCharsTotal?: number;
  sessionId?: string;
  clientModel?: string;
  excerptSettings?: boolean | JsonObject;
  fullContent?: boolean | JsonObject;
  result?: JsonObject;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SpiderScrapeLoaderArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  returnFormat?: "markdown" | "html" | "text" | "raw";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface ApifyDatasetItemsLoaderArgs {
  datasetId: string;
  token?: SecretInput;
  baseUrl?: string;
  clean?: boolean;
  limit?: number;
  offset?: number;
  fields?: string[];
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface AssemblyAiTranscriptLoaderArgs {
  transcriptId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SonixTranscriptLoaderArgs {
  mediaId: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  format?: "json" | "srt" | "txt";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SonioxTranscriptLoaderArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  transcriptionId?: string;
  audioUrl?: string;
  fileId?: string;
  model?: string;
  options?: JsonObject;
  transcript?: JsonObject;
  waitForCompletion?: boolean;
  pollingIntervalMs?: number;
  pollingTimeoutMs?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface HackerNewsItemLoaderArgs {
  itemId: number;
  baseUrl?: string;
  maxDepth?: number;
  maxItems?: number;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface GitBookPageLoaderArgs {
  spaceId: string;
  pageId: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  format?: "markdown" | "document";
  evaluated?: boolean | "deterministic-only";
  includeMetadata?: boolean;
  computed?: boolean;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface TaskadeProjectTasksLoaderArgs {
  projectId: string;
  accessToken?: SecretInput;
  baseUrl?: string;
  limit?: number;
  after?: string;
  before?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SupadataTranscriptLoaderArgs {
  url?: string;
  jobId?: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  lang?: string;
  text?: boolean;
  chunkSize?: number;
  mode?: "native" | "auto" | "generate";
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface SupadataMetadataLoaderArgs {
  url: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface IFixitGuidesLoaderArgs {
  guideIds?: Array<number | string>;
  filter?: "replacement" | "installation" | "repair" | "disassembly" | "teardown" | "technique" | "maintenance";
  order?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
  modifiedSince?: number;
  includePrivate?: boolean;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface IFixitGuideLoaderArgs {
  guideId: number | string;
  excludePrerequisiteSteps?: boolean;
  unpatrolled?: boolean;
  langId?: string;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface IFixitWikiLoaderArgs {
  title: string;
  namespace?: "WIKI" | "CATEGORY" | "INFO" | "ITEM" | "USER" | "TEAM";
  unpatrolled?: boolean;
  langId?: string;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface IFixitSuggestLoaderArgs {
  query: string;
  docTypes?: Array<"guide" | "device" | "category" | "question" | "all">;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export interface IFixitDocumentLoaderArgs {
  documentIdOrGuid: number | string;
  baseUrl?: string;
  metadata?: JsonObject;
  timeoutMs?: number;
}

export function loadTextDocument(text: string, metadata: JsonObject = {}): ChidoriDocument[] {
  return [{ pageContent: text, metadata }];
}

export function loadJsonDocuments(input: Json, pointer = "", metadata: JsonObject = {}): ChidoriDocument[] {
  const value = pointer ? resolveJsonPointer(input, pointer) : input;
  if (Array.isArray(value)) {
    return value.map((item, index) => ({
      pageContent: stringifyDocumentValue(item),
      metadata: compactObject({ ...metadata, sourceIndex: index }) as JsonObject,
    }));
  }
  return [{ pageContent: stringifyDocumentValue(value), metadata }];
}

export function loadJsonLinesDocuments(jsonl: string, options: Omit<JsonLinesDocumentLoaderArgs, "jsonl"> = {}): ChidoriDocument[] {
  const documents: ChidoriDocument[] = [];
  const lines = jsonl.split(/\r?\n/);
  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    try {
      documents.push({
        pageContent: stringifyDocumentValue(JSON.parse(line) as Json),
        metadata: compactObject({ ...(options.metadata ?? {}), line: index + 1 }) as JsonObject,
      });
    } catch (error) {
      if (!options.skipInvalid) {
        throw new Error(`Invalid JSONL at line ${index + 1}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  return documents;
}

export function loadCsvDocuments(csv: string, options: Omit<CsvDocumentLoaderArgs, "csv"> = {}): ChidoriDocument[] {
  const delimiter = options.delimiter ?? ",";
  const rows = parseCsv(csv, delimiter);
  if (rows.length === 0) {
    return [];
  }
  const headers = options.hasHeader ?? true ? rows[0] ?? [] : [];
  const dataRows = options.hasHeader ?? true ? rows.slice(1) : rows;

  return dataRows.map((row, index) => {
    const rowObject: JsonObject = {};
    row.forEach((value, columnIndex) => {
      rowObject[headers[columnIndex] ?? `column_${columnIndex}`] = value;
    });
    return {
      pageContent: JSON.stringify(rowObject),
      metadata: compactObject({ ...(options.metadata ?? {}), row: index }) as JsonObject,
    };
  });
}

export function loadSitemapUrlDocuments(sitemapXml: string, metadata: JsonObject = {}, maxUrls?: number): ChidoriDocument[] {
  const urls = extractSitemapUrls(sitemapXml).slice(0, maxUrls);
  return urls.map((url, index) => ({
    pageContent: url,
    metadata: compactObject({ ...metadata, source: "sitemap", url, sourceIndex: index }) as JsonObject,
  }));
}

export function loadRssFeedDocuments(feedXml: string, metadata: JsonObject = {}, maxItems?: number): ChidoriDocument[] {
  const rssItems = xmlBlocks(feedXml, "item");
  const atomEntries = rssItems.length === 0 ? xmlBlocks(feedXml, "entry") : [];
  const items = (rssItems.length > 0 ? rssItems : atomEntries).slice(0, maxItems);
  const isAtom = rssItems.length === 0 && atomEntries.length > 0;
  const feedTitle = xmlTagText(feedXml, isAtom ? "title" : "title");
  return items.map((item, index) => {
    const title = xmlTagText(item, "title");
    const link = isAtom ? xmlTagAttribute(item, "link", "href") ?? xmlTagText(item, "link") : xmlTagText(item, "link");
    const published = xmlTagText(item, "pubDate") ?? xmlTagText(item, "published") ?? xmlTagText(item, "updated");
    const id = xmlTagText(item, "guid") ?? xmlTagText(item, "id");
    const author = xmlTagText(item, "author") ?? xmlTagText(item, "creator");
    const content = xmlTagText(item, "encoded")
      ?? xmlTagText(item, "content")
      ?? xmlTagText(item, "description")
      ?? xmlTagText(item, "summary")
      ?? title
      ?? "";
    return {
      pageContent: htmlToText(content),
      metadata: compactObject({
        ...metadata,
        source: isAtom ? "atom" : "rss",
        feedTitle,
        title,
        link,
        id,
        author,
        published,
        categories: rssCategories(item),
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadHtmlDocuments(html: string, options: Omit<HtmlDocumentLoaderArgs, "html"> = {}): ChidoriDocument[] {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const text = htmlToText(html);
  return [{
    pageContent: options.includeTitle && title ? `${decodeHtml(title).trim()}\n\n${text}` : text,
    metadata: options.metadata ?? {},
  }];
}

export function loadCheerioWebDocuments(
  html: string,
  options: Omit<CheerioWebLoaderArgs, "html"> = {},
): ChidoriDocument[] {
  const selectedHtml = options.selector ? selectHtmlContent(html, options.selector) : html;
  return [{
    pageContent: htmlToText(selectedHtml.length > 0 ? selectedHtml : html),
    metadata: compactObject({
      ...(options.metadata ?? {}),
      source: options.url,
      selector: options.selector,
    }) as JsonObject,
  }];
}

export function loadRecursiveUrlDocuments(
  pages: Array<{ url: string; html: string; depth?: number }>,
  options: Pick<RecursiveUrlLoaderArgs, "selector" | "metadata"> = {},
): ChidoriDocument[] {
  return pages.flatMap((page, index) => {
    const document = loadCheerioWebDocuments(page.html, compactObject({
      url: page.url,
      selector: options.selector,
      metadata: compactObject({
        ...(options.metadata ?? {}),
        depth: page.depth,
        sourceIndex: index,
      }) as JsonObject,
    }) as Omit<CheerioWebLoaderArgs, "html">)[0];
    return document ? [document] : [];
  });
}

export function loadMarkdownDocuments(
  markdown: string,
  options: Omit<MarkdownDocumentLoaderArgs, "markdown"> = {},
): ChidoriDocument[] {
  const parsed = options.parseFrontMatter ?? true ? extractMarkdownFrontMatter(markdown) : { body: markdown };
  const pageContent = options.stripMarkdown ? markdownToPlainText(parsed.body) : parsed.body.trim();
  return [{
    pageContent,
    metadata: compactObject({
      ...(options.metadata ?? {}),
      ...(parsed.frontMatter ?? {}),
      source: "markdown",
      title: markdownTitle(parsed.body),
    }) as JsonObject,
  }];
}

export function loadNotionMarkdownExportDocuments(
  files: Array<{ path: string; markdown: string }>,
  options: Omit<NotionMarkdownExportLoaderArgs, "files"> = {},
): ChidoriDocument[] {
  return files.flatMap((file, index) => loadMarkdownDocuments(file.markdown, compactObject({
    parseFrontMatter: true,
    stripMarkdown: options.stripMarkdown,
    metadata: compactObject({
      ...(options.metadata ?? {}),
      path: file.path,
      pageId: notionMarkdownPageId(file.path),
      sourceIndex: index,
    }) as JsonObject,
  }) as Omit<MarkdownDocumentLoaderArgs, "markdown">).map((document) => ({
    pageContent: document.pageContent,
    metadata: compactObject({
      ...document.metadata,
      source: "notion_markdown",
    }) as JsonObject,
  })));
}

export function loadImsdbScriptDocuments(
  html: string,
  options: Omit<ImsdbScriptLoaderArgs, "html"> = {},
): ChidoriDocument[] {
  const scriptHtml = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i)?.[1]
    ?? html.match(/<td[^>]*class=["']?scrtext["']?[^>]*>([\s\S]*?)<\/td>/i)?.[1]
    ?? html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?? html;
  const title = options.title ?? imsdbTitle(html, options.url);
  return [{
    pageContent: htmlToText(scriptHtml),
    metadata: compactObject({
      ...(options.metadata ?? {}),
      source: "imsdb",
      title,
      url: options.url,
    }) as JsonObject,
  }];
}

export function loadCollegeConfidentialDocuments(
  html: string,
  options: Omit<CollegeConfidentialLoaderArgs, "html"> = {},
): ChidoriDocument[] {
  const mainHtml = html.match(/<main\b[^>]*class=["'][^"']*\bskin-handler\b[^"']*["'][^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?? html;
  const title = options.title ?? collegeConfidentialTitle(html, options.url);
  return [{
    pageContent: htmlToText(mainHtml),
    metadata: compactObject({
      ...(options.metadata ?? {}),
      source: "college_confidential",
      title,
      url: options.url,
    }) as JsonObject,
  }];
}

export function loadSubtitleDocuments(
  subtitles: string,
  options: Omit<SubtitleDocumentLoaderArgs, "subtitles"> = {},
): ChidoriDocument[] {
  const cues = parseSubtitleCues(subtitles, options.format ?? "srt");
  if (options.splitCues) {
    return cues.map((cue, index) => ({
      pageContent: cue.text,
      metadata: compactObject({
        ...(options.metadata ?? {}),
        source: "subtitles",
        cue: index,
        start: cue.start,
        end: cue.end,
      }) as JsonObject,
    }));
  }
  return [{
    pageContent: cues.map((cue) => cue.text).join("\n").trim(),
    metadata: compactObject({
      ...(options.metadata ?? {}),
      source: "subtitles",
      cueCount: cues.length,
    }) as JsonObject,
  }];
}

export function loadYouTubeTranscriptDocuments(
  transcript: string | JsonObject | Json[],
  options: Omit<YouTubeTranscriptLoaderArgs, "transcript"> = {},
): ChidoriDocument[] {
  const videoId = options.videoId ?? (options.url ? parseYouTubeVideoId(options.url) : undefined);
  const segments = parseYouTubeTranscriptSegments(transcript);
  if (options.transcriptFormat === "chunks") {
    return chunkYouTubeTranscriptSegments(segments, options.chunkSizeSeconds ?? 120).map((chunk, index) => ({
      pageContent: chunk.text,
      metadata: compactObject({
        ...(options.metadata ?? {}),
        source: "youtube",
        videoId,
        url: youtubeWatchUrl(videoId, chunk.start),
        language: options.language,
        translation: options.translation,
        start: chunk.start,
        duration: chunk.duration,
        sourceIndex: index,
      }) as JsonObject,
    }));
  }
  return [{
    pageContent: segments.map((segment) => segment.text).join(" ").replace(/\s+/g, " ").trim(),
    metadata: compactObject({
      ...(options.metadata ?? {}),
      source: "youtube",
      videoId,
      url: youtubeWatchUrl(videoId),
      language: options.language,
      translation: options.translation,
      segmentCount: segments.length,
    }) as JsonObject,
  }];
}

export function loadChatGptExportDocuments(exportJson: Json, metadata: JsonObject = {}): ChidoriDocument[] {
  const conversations = Array.isArray(exportJson) ? exportJson : [exportJson];
  return conversations.filter(isJsonObject).map((conversation, index) => {
    const title = typeof conversation.title === "string" ? conversation.title : `Conversation ${index + 1}`;
    const messages = extractChatGptMessages(conversation);
    return {
      pageContent: messages.map((message) => `${message.role}: ${message.content}`).join("\n\n"),
      metadata: compactObject({
        ...metadata,
        source: "chatgpt_export",
        title,
        conversationId: typeof conversation.id === "string" ? conversation.id : undefined,
        createTime: typeof conversation.create_time === "number" ? conversation.create_time : undefined,
        updateTime: typeof conversation.update_time === "number" ? conversation.update_time : undefined,
        messageCount: messages.length,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadSlackMessageDocuments(
  input: JsonObject | Json[],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { messages: input } : input;
  const messages = Array.isArray(response.messages) ? response.messages.filter(isJsonObject) : [];
  return messages.map((message, index) => {
    const attachments = Array.isArray(message.attachments) ? message.attachments.filter(isJsonObject) : [];
    const attachmentText = attachments
      .flatMap((attachment) => [
        typeof attachment.title === "string" ? attachment.title : undefined,
        typeof attachment.text === "string" ? attachment.text : undefined,
        typeof attachment.fallback === "string" ? attachment.fallback : undefined,
      ])
      .filter((part): part is string => typeof part === "string" && part.length > 0);
    const text = slackPlainText(message);
    const pageContent = [text, ...attachmentText.map(slackMarkupToText)]
      .filter((part) => part.length > 0)
      .join("\n\n");
    return {
      pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(message),
      metadata: compactObject({
        ...metadata,
        source: "slack",
        channelId: typeof response.channel === "string" ? response.channel : typeof message.channel === "string" ? message.channel : undefined,
        messageTs: typeof message.ts === "string" ? message.ts : undefined,
        threadTs: typeof message.thread_ts === "string" ? message.thread_ts : undefined,
        userId: typeof message.user === "string" ? message.user : undefined,
        botId: typeof message.bot_id === "string" ? message.bot_id : undefined,
        username: typeof message.username === "string" ? message.username : undefined,
        type: typeof message.type === "string" ? message.type : undefined,
        subtype: typeof message.subtype === "string" ? message.subtype : undefined,
        permalink: typeof message.permalink === "string" ? message.permalink : undefined,
        replyCount: typeof message.reply_count === "number" ? message.reply_count : undefined,
        reactionCount: slackReactionCount(message.reactions),
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadDiscordMessageDocuments(
  input: JsonObject | Json[],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { messages: input } : input;
  const rawMessages = Array.isArray(response.messages)
    ? response.messages
    : Array.isArray(response.items)
      ? response.items
      : Array.isArray(input)
        ? input
        : [];
  const messages = rawMessages.filter(isJsonObject);
  return messages.map((message, index) => {
    const author = isJsonObject(message.author) ? message.author : undefined;
    const attachments = Array.isArray(message.attachments) ? message.attachments.filter(isJsonObject) : [];
    const embeds = Array.isArray(message.embeds) ? message.embeds.filter(isJsonObject) : [];
    const attachmentText = attachments
      .map((attachment) => [
        typeof attachment.filename === "string" ? attachment.filename : undefined,
        typeof attachment.description === "string" ? attachment.description : undefined,
        typeof attachment.url === "string" ? attachment.url : undefined,
      ].filter(Boolean).join(" - "))
      .filter((part) => part.length > 0);
    const embedText = embeds
      .flatMap((embed) => [
        typeof embed.title === "string" ? embed.title : undefined,
        typeof embed.description === "string" ? embed.description : undefined,
        typeof embed.url === "string" ? embed.url : undefined,
      ])
      .filter((part): part is string => typeof part === "string" && part.length > 0);
    const text = typeof message.content === "string" ? discordMarkupToText(message.content) : "";
    const pageContent = [text, ...embedText, ...attachmentText]
      .filter((part) => part.length > 0)
      .join("\n\n");
    return {
      pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(message),
      metadata: compactObject({
        ...metadata,
        source: "discord",
        channelId: typeof response.channelId === "string" ? response.channelId : typeof message.channel_id === "string" ? message.channel_id : undefined,
        messageId: typeof message.id === "string" ? message.id : undefined,
        authorId: author && typeof author.id === "string" ? author.id : undefined,
        authorUsername: author && typeof author.username === "string" ? author.username : undefined,
        authorGlobalName: author && typeof author.global_name === "string" ? author.global_name : undefined,
        timestamp: typeof message.timestamp === "string" ? message.timestamp : undefined,
        editedTimestamp: typeof message.edited_timestamp === "string" ? message.edited_timestamp : undefined,
        type: typeof message.type === "number" ? message.type : undefined,
        pinned: typeof message.pinned === "boolean" ? message.pinned : undefined,
        tts: typeof message.tts === "boolean" ? message.tts : undefined,
        mentionEveryone: typeof message.mention_everyone === "boolean" ? message.mention_everyone : undefined,
        attachmentCount: attachments.length > 0 ? attachments.length : undefined,
        embedCount: embeds.length > 0 ? embeds.length : undefined,
        reactionCount: discordReactionCount(message.reactions),
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadGitHubRepositoryDocuments(
  input: JsonObject | Json[],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { files: input } : input;
  const files = Array.isArray(response.files)
    ? response.files.filter(isJsonObject)
    : Array.isArray(response.items)
      ? response.items.filter(isJsonObject)
      : isJsonObject(response.content) || typeof response.content === "string" || typeof response.text === "string"
        ? [response]
        : [];
  return files.map((file, index) => {
    const path = typeof file.path === "string" ? file.path : typeof file.name === "string" ? file.name : undefined;
    const content = githubFileContent(file);
    return {
      pageContent: content.length > 0 ? content : stringifyDocumentValue(file),
      metadata: compactObject({
        ...metadata,
        source: "github",
        owner: typeof response.owner === "string" ? response.owner : undefined,
        repo: typeof response.repo === "string" ? response.repo : undefined,
        ref: typeof response.ref === "string" ? response.ref : undefined,
        path,
        fileName: typeof file.name === "string" ? file.name : path?.split("/").pop(),
        sha: typeof file.sha === "string" ? file.sha : undefined,
        size: typeof file.size === "number" ? file.size : undefined,
        encoding: typeof file.encoding === "string" ? file.encoding : undefined,
        htmlUrl: typeof file.html_url === "string" ? file.html_url : undefined,
        downloadUrl: typeof file.download_url === "string" ? file.download_url : undefined,
        url: typeof file.url === "string" ? file.url : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadSearchResultDocuments(
  input: JsonObject,
  provider: "serpapi" | "searchapi",
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const searchParameters = isJsonObject(input.search_parameters) ? input.search_parameters : {};
  const query = typeof searchParameters.q === "string"
    ? searchParameters.q
    : typeof searchParameters.query === "string"
      ? searchParameters.query
      : undefined;
  const groups = searchResultGroups(input);
  return groups.flatMap((group) => group.items.map((item, index) => ({
    pageContent: searchResultText(item),
    metadata: compactObject({
      ...metadata,
      source: provider,
      resultType: group.type,
      query,
      title: searchResultTitle(item),
      link: searchResultLink(item),
      displayedLink: typeof item.displayed_link === "string" ? item.displayed_link : typeof item.displayedLink === "string" ? item.displayedLink : undefined,
      sourceName: typeof item.source === "string" ? item.source : undefined,
      position: typeof item.position === "number" ? item.position : undefined,
      date: typeof item.date === "string" ? item.date : undefined,
      sourceIndex: index,
    }) as JsonObject,
  })));
}

export function loadSalesforceRecordDocuments(
  input: JsonObject | Json[],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { records: input } : input;
  const records = Array.isArray(response.records) ? response.records.filter(isJsonObject) : [];
  return records.map((record, index) => {
    const attributes = isJsonObject(record.attributes) ? record.attributes : undefined;
    const fields = Object.fromEntries(Object.entries(record).filter(([key]) => key !== "attributes")) as JsonObject;
    const title = salesforceRecordTitle(fields);
    return {
      pageContent: stringifyDocumentValue(fields),
      metadata: compactObject({
        ...metadata,
        source: "salesforce",
        recordId: typeof record.Id === "string" ? record.Id : typeof record.id === "string" ? record.id : undefined,
        sobject: attributes && typeof attributes.type === "string" ? attributes.type : typeof response.sobject === "string" ? response.sobject : undefined,
        url: attributes && typeof attributes.url === "string" ? attributes.url : undefined,
        title,
        done: typeof response.done === "boolean" ? response.done : undefined,
        nextRecordsUrl: typeof response.nextRecordsUrl === "string" ? response.nextRecordsUrl : undefined,
        totalSize: typeof response.totalSize === "number" ? response.totalSize : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadHubSpotCrmObjectDocuments(
  input: JsonObject | Json[],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { results: input } : input;
  const objects = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
  return objects.map((object, index) => {
    const properties = isJsonObject(object.properties) ? object.properties : {};
    const associations = isJsonObject(object.associations) ? object.associations : undefined;
    const title = hubSpotRecordTitle(properties);
    const pageContent = stringifyDocumentValue(compactObject({
      id: object.id,
      properties,
      associations,
    }) as JsonObject);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "hubspot",
        objectType: typeof response.objectType === "string" ? response.objectType : undefined,
        objectId: typeof object.id === "string" ? object.id : undefined,
        title,
        archived: typeof object.archived === "boolean" ? object.archived : undefined,
        createdAt: typeof object.createdAt === "string" ? object.createdAt : undefined,
        updatedAt: typeof object.updatedAt === "string" ? object.updatedAt : undefined,
        archivedAt: typeof object.archivedAt === "string" ? object.archivedAt : undefined,
        nextAfter: hubSpotNextAfter(response),
        total: typeof response.total === "number" ? response.total : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadStripeResourceDocuments(
  input: JsonObject | Json[],
  resource?: StripeResourceLoaderArgs["resource"],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { data: input } : input;
  const resources = Array.isArray(response.data) ? response.data.filter(isJsonObject) : [];
  return resources.map((stripeResource, index) => ({
    pageContent: stringifyDocumentValue(stripeResource),
    metadata: compactObject({
      ...metadata,
      source: "stripe",
      resource: resource ?? (typeof response.resource === "string" ? response.resource : undefined),
      resourceId: typeof stripeResource.id === "string" ? stripeResource.id : undefined,
      resourceObject: typeof stripeResource.object === "string" ? stripeResource.object : undefined,
      title: stripeResourceTitle(stripeResource),
      created: typeof stripeResource.created === "number" ? stripeResource.created : undefined,
      livemode: typeof stripeResource.livemode === "boolean" ? stripeResource.livemode : undefined,
      type: typeof stripeResource.type === "string" ? stripeResource.type : undefined,
      hasMore: typeof response.has_more === "boolean" ? response.has_more : undefined,
      url: typeof response.url === "string" ? response.url : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadShopifyRecordDocuments(
  input: JsonObject | Json[],
  resource?: ShopifyResourceLoaderArgs["resource"],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { [resource ?? "records"]: input } : input;
  const responseResource = resource ?? (typeof response.resource === "string" ? response.resource : undefined);
  const responseKey = responseResource && Array.isArray(response[responseResource])
    ? responseResource
    : ["products", "orders", "customers"].find((key) => Array.isArray(response[key]));
  const records = responseKey ? (response[responseKey] as Json[]).filter(isJsonObject) : [];
  return records.map((record, index) => ({
    pageContent: stringifyDocumentValue(record),
    metadata: compactObject({
      ...metadata,
      source: "shopify",
      resource: responseResource ?? responseKey,
      recordId: typeof record.id === "string" ? record.id : typeof record.id === "number" ? String(record.id) : undefined,
      adminGraphqlApiId: typeof record.admin_graphql_api_id === "string" ? record.admin_graphql_api_id : undefined,
      title: shopifyRecordTitle(record),
      email: typeof record.email === "string" ? record.email : undefined,
      createdAt: typeof record.created_at === "string" ? record.created_at : undefined,
      updatedAt: typeof record.updated_at === "string" ? record.updated_at : undefined,
      status: typeof record.status === "string" ? record.status : undefined,
      financialStatus: typeof record.financial_status === "string" ? record.financial_status : undefined,
      fulfillmentStatus: typeof record.fulfillment_status === "string" ? record.fulfillment_status : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadZendeskSupportDocuments(
  input: JsonObject | Json[],
  resource?: ZendeskSupportLoaderArgs["resource"],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { [resource === "search" ? "results" : resource ?? "records"]: input } : input;
  const responseResource = resource ?? (typeof response.resource === "string" ? response.resource : undefined);
  const responseKey = responseResource === "search" && Array.isArray(response.results)
    ? "results"
    : responseResource && Array.isArray(response[responseResource])
      ? responseResource
      : ["results", "tickets", "users"].find((key) => Array.isArray(response[key]));
  const records = responseKey ? (response[responseKey] as Json[]).filter(isJsonObject) : [];
  return records.map((record, index) => ({
    pageContent: stringifyDocumentValue(record),
    metadata: compactObject({
      ...metadata,
      source: "zendesk",
      resource: responseResource ?? responseKey,
      recordId: typeof record.id === "string" ? record.id : typeof record.id === "number" ? String(record.id) : undefined,
      resultType: typeof record.result_type === "string" ? record.result_type : undefined,
      title: zendeskRecordTitle(record),
      url: typeof record.url === "string" ? record.url : undefined,
      subject: typeof record.subject === "string" ? record.subject : undefined,
      email: typeof record.email === "string" ? record.email : undefined,
      role: typeof record.role === "string" ? record.role : undefined,
      status: typeof record.status === "string" ? record.status : undefined,
      priority: typeof record.priority === "string" ? record.priority : undefined,
      createdAt: typeof record.created_at === "string" ? record.created_at : undefined,
      updatedAt: typeof record.updated_at === "string" ? record.updated_at : undefined,
      nextPage: typeof response.next_page === "string" ? response.next_page : undefined,
      previousPage: typeof response.previous_page === "string" ? response.previous_page : undefined,
      count: typeof response.count === "number" ? response.count : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadTypeformResourceDocuments(
  input: JsonObject | Json[],
  resource?: TypeformResourceLoaderArgs["resource"],
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { items: input } : input;
  const responseResource = resource ?? (typeof response.resource === "string" ? response.resource : undefined);
  const records = Array.isArray(response.items)
    ? response.items.filter(isJsonObject)
    : isJsonObject(response) && !Array.isArray(input) && (response.id || response.title || response.token)
      ? [response]
      : [];
  return records.map((record, index) => {
    const hidden = isJsonObject(record.hidden) ? record.hidden : undefined;
    const calculated = isJsonObject(record.calculated) ? record.calculated : undefined;
    return {
      pageContent: responseResource === "responses" ? typeformResponseText(record) : stringifyDocumentValue(record),
      metadata: compactObject({
        ...metadata,
        source: "typeform",
        resource: responseResource,
        formId: typeof response.form_id === "string" ? response.form_id : typeof record.form_id === "string" ? record.form_id : undefined,
        recordId: typeof record.id === "string" ? record.id : typeof record.token === "string" ? record.token : undefined,
        token: typeof record.token === "string" ? record.token : undefined,
        title: typeformRecordTitle(record),
        responseType: typeof record.response_type === "string" ? record.response_type : undefined,
        landedAt: typeof record.landed_at === "string" ? record.landed_at : undefined,
        submittedAt: typeof record.submitted_at === "string" ? record.submitted_at : undefined,
        hidden,
        calculated,
        totalItems: typeof response.total_items === "number" ? response.total_items : undefined,
        pageCount: typeof response.page_count === "number" ? response.page_count : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadServiceNowTableRecordDocuments(
  input: JsonObject | Json[],
  table?: string,
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const response = Array.isArray(input) ? { result: input } : input;
  const records = Array.isArray(response.result)
    ? response.result.filter(isJsonObject)
    : isJsonObject(response.result)
      ? [response.result]
      : [];
  return records.map((record, index) => ({
    pageContent: stringifyDocumentValue(record),
    metadata: compactObject({
      ...metadata,
      source: "servicenow",
      table: table ?? (typeof response.table === "string" ? response.table : undefined),
      sysId: typeof record.sys_id === "string" ? record.sys_id : undefined,
      number: typeof record.number === "string" ? record.number : undefined,
      title: serviceNowRecordTitle(record),
      state: typeof record.state === "string" ? record.state : undefined,
      priority: typeof record.priority === "string" ? record.priority : undefined,
      createdAt: typeof record.sys_created_on === "string" ? record.sys_created_on : undefined,
      updatedAt: typeof record.sys_updated_on === "string" ? record.sys_updated_on : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

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

function stringifyDocumentValue(value: Json): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function htmlToText(html: string): string {
  return decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<\/(p|div|section|article|header|footer|main|aside|li|tr|h[1-6])>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t\f\v]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function decodeHtml(input: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: "\"",
    apos: "'",
    nbsp: " ",
  };
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_match, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity] ?? `&${entity};`;
  });
}

function selectHtmlContent(html: string, selector: string): string {
  const trimmed = selector.trim();
  if (!trimmed) {
    return html;
  }
  const selectors = trimmed.split(",").map((part) => part.trim()).filter(Boolean);
  return selectors.map((part) => selectSingleHtmlContent(html, part)).filter(Boolean).join("\n");
}

function selectSingleHtmlContent(html: string, selector: string): string {
  if (selector.startsWith("#")) {
    const id = escapeRegExp(selector.slice(1));
    return htmlBlocksByAttribute(html, "id", id).join("\n");
  }
  if (selector.startsWith(".")) {
    const className = escapeRegExp(selector.slice(1));
    return htmlBlocksByClass(html, className).join("\n");
  }
  const tagClass = /^([a-zA-Z][\w-]*)\.([\w-]+)$/.exec(selector);
  if (tagClass) {
    return htmlBlocksByClass(html, escapeRegExp(tagClass[2] ?? ""), tagClass[1]).join("\n");
  }
  const tagId = /^([a-zA-Z][\w-]*)#([\w-]+)$/.exec(selector);
  if (tagId) {
    return htmlBlocksByAttribute(html, "id", escapeRegExp(tagId[2] ?? ""), tagId[1]).join("\n");
  }
  if (/^[a-zA-Z][\w-]*$/.test(selector)) {
    return htmlBlocksByTag(html, selector).join("\n");
  }
  return "";
}

function htmlBlocksByTag(html: string, tag: string): string[] {
  const pattern = new RegExp(`<${escapeRegExp(tag)}\\b[^>]*>[\\s\\S]*?<\\/${escapeRegExp(tag)}>`, "gi");
  return regexMatches(html, pattern);
}

function htmlBlocksByClass(html: string, className: string, tag = "[a-zA-Z][\\w-]*"): string[] {
  const pattern = new RegExp(`<${tag}\\b(?=[^>]*\\bclass\\s*=\\s*["'][^"']*\\b${className}\\b)[^>]*>[\\s\\S]*?<\\/\\w+>`, "gi");
  return regexMatches(html, pattern);
}

function htmlBlocksByAttribute(html: string, attribute: string, value: string, tag = "[a-zA-Z][\\w-]*"): string[] {
  const pattern = new RegExp(`<${tag}\\b(?=[^>]*\\b${escapeRegExp(attribute)}\\s*=\\s*["']${value}["'])[^>]*>[\\s\\S]*?<\\/\\w+>`, "gi");
  return regexMatches(html, pattern);
}

function regexMatches(input: string, pattern: RegExp): string[] {
  const matches: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(input)) !== null) {
    matches.push(match[0] ?? "");
  }
  return matches;
}

function escapeRegExp(input: string): string {
  return input.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function extractHtmlLinks(html: string, baseUrl: string): string[] {
  const links: string[] = [];
  const pattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const href = decodeHtml(match[1] ?? "").trim();
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) {
      continue;
    }
    try {
      const url = new URL(href, baseUrl);
      url.hash = "";
      links.push(url.toString());
    } catch {
      continue;
    }
  }
  return Array.from(new Set(links));
}

function recursiveUrlAllowed(
  candidateUrl: string,
  rootUrl: string,
  args: RecursiveUrlLoaderArgs,
): boolean {
  let candidate: URL;
  let root: URL;
  try {
    candidate = new URL(candidateUrl);
    root = new URL(rootUrl);
  } catch {
    return false;
  }
  if ((args.preventOutside ?? true) && candidate.origin !== root.origin) {
    return false;
  }
  if (args.linkRegex && !new RegExp(args.linkRegex).test(candidateUrl)) {
    return false;
  }
  return !(args.excludeDirs ?? []).some((dir) => {
    const normalized = dir.startsWith("/") ? dir : `/${dir}`;
    return candidate.pathname.startsWith(normalized);
  });
}

async function crawlRecursiveUrls(
  args: RecursiveUrlLoaderArgs,
  chidori: ChidoriRuntime,
): Promise<Array<{ url: string; html: string; depth: number }>> {
  if (!args.url) {
    throw new Error("recursive_url_load requires url when pages are not provided");
  }
  const maxDepth = args.maxDepth ?? 2;
  const maxPages = args.maxPages ?? 50;
  const continueOnFailure = args.continueOnFailure ?? true;
  const seen = new Set<string>();
  const pages: Array<{ url: string; html: string; depth: number }> = [];
  const queue: Array<{ url: string; depth: number }> = [{ url: args.url, depth: 0 }];
  while (queue.length > 0 && pages.length < maxPages) {
    const current = queue.shift();
    if (!current || seen.has(current.url)) {
      continue;
    }
    seen.add(current.url);
    try {
      const response = await chidori.http(current.url, compactObject({
        method: "GET",
        headers: args.headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions);
      if (response.status < 200 || response.status >= 300) {
        const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
        throw new Error(`HTTP ${response.status} from ${current.url}: ${detail}`);
      }
      const html = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
      pages.push({ url: current.url, html, depth: current.depth });
      if (current.depth < maxDepth) {
        for (const link of extractHtmlLinks(html, current.url)) {
          if (pages.length + queue.length >= maxPages) {
            break;
          }
          if (!seen.has(link) && recursiveUrlAllowed(link, args.url, args)) {
            queue.push({ url: link, depth: current.depth + 1 });
          }
        }
      }
    } catch (error) {
      if (!continueOnFailure) {
        throw error;
      }
    }
  }
  return pages;
}

function extractSitemapUrls(sitemapXml: string): string[] {
  const urls: string[] = [];
  const locPattern = /<loc\b[^>]*>([\s\S]*?)<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locPattern.exec(sitemapXml)) !== null) {
    const value = decodeHtml(match[1] ?? "").trim();
    if (value) {
      urls.push(value);
    }
  }
  return urls;
}

function xmlBlocks(xml: string, tag: string): string[] {
  const blocks: string[] = [];
  const pattern = new RegExp(`<(?:[\\w.-]+:)?${tag}\\b[^>]*>[\\s\\S]*?<\\/(?:[\\w.-]+:)?${tag}>`, "gi");
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml)) !== null) {
    blocks.push(match[0] ?? "");
  }
  return blocks;
}

function xmlTagText(xml: string, tag: string): string | undefined {
  const pattern = new RegExp(`<(?:[\\w.-]+:)?${tag}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?${tag}>`, "i");
  const value = pattern.exec(xml)?.[1];
  return value === undefined ? undefined : xmlText(value);
}

function xmlTagAttribute(xml: string, tag: string, attribute: string): string | undefined {
  const pattern = new RegExp(`<(?:[\\w.-]+:)?${tag}\\b([^>]*)>`, "i");
  const attrs = pattern.exec(xml)?.[1];
  if (!attrs) {
    return undefined;
  }
  const attr = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, "i").exec(attrs)?.[1];
  return attr ? decodeHtml(attr.trim()) : undefined;
}

function xmlText(input: string): string {
  return decodeHtml(input.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")).trim();
}

function rssCategories(item: string): string[] | undefined {
  const categories = xmlBlocks(item, "category").map((category) => htmlToText(xmlText(category))).filter(Boolean);
  return categories.length > 0 ? categories : undefined;
}

function parseCsv(csv: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index] ?? "";
    const next = csv[index + 1];
    if (quoted && char === "\"" && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (!quoted && char === delimiter) {
      row.push(cell);
      cell = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function extractMarkdownFrontMatter(markdown: string): { body: string; frontMatter?: JsonObject } {
  const normalized = markdown.replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(normalized);
  if (!match) {
    return { body: markdown };
  }
  const frontMatter = parseSimpleFrontMatter(match[1] ?? "");
  return {
    body: normalized.slice(match[0].length),
    frontMatter,
  };
}

function parseSimpleFrontMatter(input: string): JsonObject {
  const metadata: JsonObject = {};
  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const match = /^([A-Za-z0-9_.-]+):\s*(.*)$/.exec(trimmed);
    if (!match) {
      continue;
    }
    metadata[match[1] ?? ""] = parseFrontMatterValue(match[2] ?? "");
  }
  return metadata;
}

function parseFrontMatterValue(value: string): Json {
  const trimmed = value.trim();
  if (trimmed === "true") {
    return true;
  }
  if (trimmed === "false") {
    return false;
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed.slice(1, -1)
      .split(",")
      .map((item) => parseFrontMatterValue(item.trim()))
      .filter((item) => item !== "");
  }
  return trimmed;
}

function markdownTitle(markdown: string): string | undefined {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function notionMarkdownPageId(path: string): string | undefined {
  const decoded = decodeURIComponent(path);
  const match = /([0-9a-f]{32})(?:\.md)?$/i.exec(decoded.replace(/\s+/g, ""));
  if (match) {
    return match[1]?.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  }
  return undefined;
}

function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[^\n]*\n?|\n?```/g, ""))
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]{1,3}/g, "")
    .trim();
}

function imsdbTitle(html: string, url: string | undefined): string | undefined {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) {
    return decodeHtml(title).replace(/\s+Script\s+at\s+IMSDB\.\s*$/i, "").replace(/\s+/g, " ").trim();
  }
  if (!url) {
    return undefined;
  }
  const slug = url.split("/").pop()?.replace(/\.html?$/i, "");
  return slug ? decodeURIComponent(slug).replace(/[-_]+/g, " ") : undefined;
}

function collegeConfidentialTitle(html: string, url: string | undefined): string | undefined {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (h1) {
    return htmlToText(h1);
  }
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) {
    return decodeHtml(title).replace(/\s*\|\s*College Confidential\s*$/i, "").replace(/\s+/g, " ").trim();
  }
  if (!url) {
    return undefined;
  }
  const parts = url.replace(/\/+$/, "").split("/");
  const slug = parts[parts.length - 1];
  return slug ? decodeURIComponent(slug).replace(/[-_]+/g, " ") : undefined;
}

function parseSubtitleCues(subtitles: string, format: "srt" | "vtt"): Array<{ start?: string; end?: string; text: string }> {
  const normalized = subtitles
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !(format === "vtt" && /^WEBVTT\b/i.test(block)))
    .filter((block) => !(format === "vtt" && /^NOTE\b/i.test(block)));
  const cues: Array<{ start?: string; end?: string; text: string }> = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) {
      continue;
    }
    if (/^\d+$/.test(lines[0] ?? "")) {
      lines.shift();
    }
    const timingIndex = lines.findIndex((line) => line.includes("-->"));
    if (timingIndex === -1) {
      continue;
    }
    const [start, endWithSettings] = (lines[timingIndex] ?? "").split("-->").map((part) => part.trim());
    const end = endWithSettings?.split(/\s+/)[0];
    const text = htmlToText(lines.slice(timingIndex + 1).join("\n"));
    if (text) {
      cues.push(compactObject({ start, end, text }) as { start?: string; end?: string; text: string });
    }
  }
  return cues;
}

function parseYouTubeVideoId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0];
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v") ?? undefined;
    }
    const parts = parsed.pathname.split("/").filter(Boolean);
    const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live");
    return embedIndex >= 0 ? parts[embedIndex + 1] : undefined;
  } catch {
    return undefined;
  }
}

function youtubeWatchUrl(videoId: string | undefined, start?: number): string | undefined {
  if (!videoId) {
    return undefined;
  }
  const url = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  return start && start > 0 ? `${url}&t=${Math.floor(start)}s` : url;
}

function parseYouTubeTranscriptSegments(input: string | JsonObject | Json[]): Array<{ text: string; start?: number; duration?: number }> {
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      return parseYouTubeTranscriptSegments(JSON.parse(trimmed) as JsonObject | Json[]);
    }
    if (/^WEBVTT\b/i.test(trimmed) || trimmed.includes("-->")) {
      return parseSubtitleCues(trimmed, "vtt").map((cue) => compactObject({
        text: cue.text,
        start: cue.start ? subtitleTimestampSeconds(cue.start) : undefined,
        duration: cue.start && cue.end ? subtitleTimestampSeconds(cue.end) - subtitleTimestampSeconds(cue.start) : undefined,
      }) as { text: string; start?: number; duration?: number });
    }
    if (trimmed.includes("<text")) {
      return parseYouTubeXmlTranscript(trimmed);
    }
    return [{ text: trimmed }];
  }
  if (Array.isArray(input)) {
    return input.map(youtubeSegmentFromJson).filter((segment): segment is { text: string; start?: number; duration?: number } => Boolean(segment));
  }
  const events = Array.isArray(input.events) ? input.events.filter(isJsonObject) : undefined;
  if (events) {
    const segments = events.map((event): { text: string; start?: number; duration?: number } | undefined => {
      const segs = Array.isArray(event.segs) ? event.segs.filter(isJsonObject) : [];
      const text = segs.map((segment) => typeof segment.utf8 === "string" ? segment.utf8 : "").join("").trim();
      if (!text) {
        return undefined;
      }
      return compactObject({
        text,
        start: typeof event.tStartMs === "number" ? event.tStartMs / 1000 : undefined,
        duration: typeof event.dDurationMs === "number" ? event.dDurationMs / 1000 : undefined,
      }) as { text: string; start?: number; duration?: number };
    });
    return segments.filter((segment): segment is { text: string; start?: number; duration?: number } => Boolean(segment));
  }
  if (Array.isArray(input.transcript)) {
    return input.transcript.map(youtubeSegmentFromJson).filter((segment): segment is { text: string; start?: number; duration?: number } => Boolean(segment));
  }
  return [youtubeSegmentFromJson(input)].filter((segment): segment is { text: string; start?: number; duration?: number } => Boolean(segment));
}

function youtubeSegmentFromJson(value: Json): { text: string; start?: number; duration?: number } | undefined {
  if (typeof value === "string") {
    return value.length > 0 ? { text: value } : undefined;
  }
  if (!isJsonObject(value)) {
    return undefined;
  }
  const text = typeof value.text === "string"
    ? value.text
    : typeof value.utf8 === "string"
      ? value.utf8
      : typeof value.content === "string"
        ? value.content
        : "";
  if (!text) {
    return undefined;
  }
  const start = typeof value.start === "number"
    ? value.start
    : typeof value.offset === "number"
      ? value.offset
      : typeof value.tStartMs === "number"
        ? value.tStartMs / 1000
        : undefined;
  const duration = typeof value.duration === "number"
    ? value.duration
    : typeof value.dur === "number"
      ? value.dur
      : typeof value.dDurationMs === "number"
        ? value.dDurationMs / 1000
        : undefined;
  return compactObject({ text: htmlToText(text), start, duration }) as { text: string; start?: number; duration?: number };
}

function parseYouTubeXmlTranscript(xml: string): Array<{ text: string; start?: number; duration?: number }> {
  const segments: Array<{ text: string; start?: number; duration?: number }> = [];
  const pattern = /<text\b([^>]*)>([\s\S]*?)<\/text>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml)) !== null) {
    const attrs = match[1] ?? "";
    const text = htmlToText(xmlText(match[2] ?? ""));
    if (!text) {
      continue;
    }
    segments.push(compactObject({
      text,
      start: xmlNumberAttribute(attrs, "start"),
      duration: xmlNumberAttribute(attrs, "dur") ?? xmlNumberAttribute(attrs, "duration"),
    }) as { text: string; start?: number; duration?: number });
  }
  return segments;
}

function xmlNumberAttribute(attrs: string, name: string): number | undefined {
  const value = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i").exec(attrs)?.[1];
  return value === undefined ? undefined : Number(value);
}

function subtitleTimestampSeconds(timestamp: string): number {
  const normalized = timestamp.replace(",", ".");
  const parts = normalized.split(":").map(Number);
  if (parts.length === 3) {
    return ((parts[0] ?? 0) * 3600) + ((parts[1] ?? 0) * 60) + (parts[2] ?? 0);
  }
  if (parts.length === 2) {
    return ((parts[0] ?? 0) * 60) + (parts[1] ?? 0);
  }
  return Number(normalized);
}

function chunkYouTubeTranscriptSegments(
  segments: Array<{ text: string; start?: number; duration?: number }>,
  chunkSizeSeconds: number,
): Array<{ text: string; start?: number; duration?: number }> {
  const chunks: Array<{ text: string; start?: number; duration?: number }> = [];
  let current: Array<{ text: string; start?: number; duration?: number }> = [];
  let currentStart: number | undefined;
  for (const segment of segments) {
    if (current.length === 0) {
      currentStart = segment.start;
    }
    const elapsed = currentStart !== undefined && segment.start !== undefined ? segment.start - currentStart : 0;
    if (current.length > 0 && elapsed >= chunkSizeSeconds) {
      chunks.push(transcriptChunk(current, currentStart));
      current = [];
      currentStart = segment.start;
    }
    current.push(segment);
  }
  if (current.length > 0) {
    chunks.push(transcriptChunk(current, currentStart));
  }
  return chunks;
}

function transcriptChunk(
  segments: Array<{ text: string; start?: number; duration?: number }>,
  start: number | undefined,
): { text: string; start?: number; duration?: number } {
  const last = segments[segments.length - 1];
  const end = last && last.start !== undefined ? last.start + (last.duration ?? 0) : undefined;
  return compactObject({
    text: segments.map((segment) => segment.text).join(" ").replace(/\s+/g, " ").trim(),
    start,
    duration: start !== undefined && end !== undefined ? end - start : undefined,
  }) as { text: string; start?: number; duration?: number };
}

function extractChatGptMessages(conversation: JsonObject): Array<{ role: string; content: string }> {
  const explicitMessages = Array.isArray(conversation.messages) ? conversation.messages : undefined;
  if (explicitMessages) {
    return explicitMessages.filter(isJsonObject).map((message) => ({
      role: typeof message.role === "string" ? message.role : "unknown",
      content: extractText(message.content),
    })).filter((message) => message.content.length > 0);
  }

  const mapping = isJsonObject(conversation.mapping) ? conversation.mapping : {};
  return Object.values(mapping)
    .filter(isJsonObject)
    .map((node) => isJsonObject(node.message) ? node.message : undefined)
    .filter(isJsonObject)
    .map((message) => {
      const author = isJsonObject(message.author) ? message.author : {};
      return {
        role: typeof author.role === "string" ? author.role : "unknown",
        content: chatGptMessageContent(message.content),
      };
    })
    .filter((message) => message.content.length > 0);
}

function slackPlainText(message: JsonObject): string {
  if (typeof message.text === "string" && message.text.length > 0) {
    return slackMarkupToText(message.text);
  }
  if (Array.isArray(message.blocks)) {
    return message.blocks.map(extractText).filter(Boolean).join("\n").trim();
  }
  return extractText(message);
}

function slackMarkupToText(input: string): string {
  return decodeHtml(input)
    .replace(/<mailto:([^>|]+)\|([^>]+)>/g, (_match, email: string, label: string) => `${label} (${email})`)
    .replace(/<([^>|]+)\|([^>]+)>/g, (_match, url: string, label: string) => `${label} (${url})`)
    .replace(/<@([^>]+)>/g, "@$1")
    .replace(/<#([^>|]+)\|?([^>]*)>/g, (_match, channel: string, label: string) => label ? `#${label}` : `#${channel}`)
    .replace(/<!subteam\^([^>|]+)\|?([^>]*)>/g, (_match, group: string, label: string) => label ? `@${label}` : `@${group}`)
    .replace(/<!([^>|]+)\|?([^>]*)>/g, (_match, special: string, label: string) => label || `@${special}`)
    .trim();
}

function slackReactionCount(value: Json | undefined): number | undefined {
  const reactions = Array.isArray(value) ? value.filter(isJsonObject) : [];
  if (reactions.length === 0) {
    return undefined;
  }
  return reactions.reduce((sum, reaction) => sum + (typeof reaction.count === "number" ? reaction.count : 0), 0);
}

function discordMarkupToText(input: string): string {
  return decodeHtml(input)
    .replace(/<@!?(\d+)>/g, "@$1")
    .replace(/<@&(\d+)>/g, "@role:$1")
    .replace(/<#(\d+)>/g, "#$1")
    .replace(/<a?:([A-Za-z0-9_]+):\d+>/g, ":$1:")
    .trim();
}

function discordReactionCount(value: Json | undefined): number | undefined {
  const reactions = Array.isArray(value) ? value.filter(isJsonObject) : [];
  if (reactions.length === 0) {
    return undefined;
  }
  return reactions.reduce((sum, reaction) => sum + (typeof reaction.count === "number" ? reaction.count : 0), 0);
}

function githubFileContent(file: JsonObject): string {
  if (typeof file.text === "string") {
    return file.text;
  }
  if (typeof file.content !== "string") {
    return "";
  }
  if (file.encoding === "base64") {
    return base64DecodeUtf8(file.content);
  }
  return file.content;
}

function parseGitHubRepository(args: GitHubRepositoryLoaderArgs): { owner: string; repo: string; apiUrl: string } {
  if (args.owner && args.repo) {
    const baseUrl = args.baseUrl?.replace(/\/+$/, "");
    return {
      owner: args.owner,
      repo: args.repo,
      apiUrl: githubApiUrl(baseUrl, args.apiUrl),
    };
  }
  if (!args.githubUrl) {
    throw new Error("github_repository_load requires githubUrl or owner and repo");
  }
  const parsed = new URL(args.githubUrl);
  const [owner, rawRepo] = parsed.pathname.split("/").filter(Boolean);
  if (!owner || !rawRepo) {
    throw new Error("github_repository_load could not parse owner and repo from githubUrl");
  }
  const baseUrl = (args.baseUrl ?? parsed.origin).replace(/\/+$/, "");
  return {
    owner,
    repo: rawRepo.replace(/\.git$/, ""),
    apiUrl: githubApiUrl(baseUrl, args.apiUrl),
  };
}

function githubApiUrl(baseUrl: string | undefined, apiUrl: string | undefined): string {
  if (apiUrl) {
    return apiUrl.replace(/\/+$/, "");
  }
  if (!baseUrl || baseUrl === "https://github.com") {
    return "https://api.github.com";
  }
  return `${baseUrl.replace(/\/+$/, "")}/api/v3`;
}

function githubContentsUrl(repo: { owner: string; repo: string; apiUrl: string }, path = ""): string {
  const encodedPath = path ? `/${encodePathSegments(path)}` : "";
  return `${repo.apiUrl}/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repo)}/contents${encodedPath}`;
}

async function githubLoaderHeaders(args: GitHubRepositoryLoaderArgs, chidori: ChidoriRuntime): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
  };
  if (!args.token) {
    return headers;
  }
  return {
    ...headers,
    ...bearerAuth(await resolveSecret(args.token, chidori, "GitHub token")),
  };
}

async function fetchGitHubRepositoryFiles(
  args: GitHubRepositoryLoaderArgs,
  chidori: ChidoriRuntime,
): Promise<{ files: JsonObject[]; owner: string; repo: string; ref?: string }> {
  const repo = parseGitHubRepository(args);
  const ref = args.ref ?? args.branch;
  const headers = await githubLoaderHeaders(args, chidori);
  const recursive = args.recursive ?? true;
  const maxFiles = args.maxFiles ?? 100;
  const maxBytes = args.maxBytes ?? 1_000_000;
  const files: JsonObject[] = [];
  const queue = [normalizeGitHubPath(args.path ?? "")];

  while (queue.length > 0 && files.length < maxFiles) {
    const currentPath = queue.shift() ?? "";
    if (shouldIgnoreGitHubPath(currentPath, args.ignorePaths)) {
      continue;
    }
    const response = await requestJson<Json>(
      chidori,
      withQuery(githubContentsUrl(repo, currentPath), { ref }),
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const entries = Array.isArray(response) ? response.filter(isJsonObject) : isJsonObject(response) ? [response] : [];
    for (const entry of entries) {
      const entryPath = typeof entry.path === "string" ? entry.path : currentPath;
      const type = typeof entry.type === "string" ? entry.type : undefined;
      if (shouldIgnoreGitHubPath(entryPath, args.ignorePaths)) {
        continue;
      }
      if (type === "dir") {
        if (recursive) {
          queue.push(entryPath);
        }
        continue;
      }
      if (type !== "file") {
        handleUnknownGitHubFile(args, `Skipping non-file GitHub repository entry: ${entryPath}`);
        continue;
      }
      if (typeof entry.size === "number" && entry.size > maxBytes) {
        handleUnknownGitHubFile(args, `Skipping GitHub repository file larger than maxBytes: ${entryPath}`);
        continue;
      }
      if (isLikelyBinaryPath(entryPath)) {
        handleUnknownGitHubFile(args, `Skipping likely binary GitHub repository file: ${entryPath}`);
        continue;
      }
      const file = await requestJson<Json>(
        chidori,
        withQuery(githubContentsUrl(repo, entryPath), { ref }),
        compactObject({
          method: "GET",
          headers,
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
      if (!isJsonObject(file)) {
        handleUnknownGitHubFile(args, `Skipping unreadable GitHub repository file: ${entryPath}`);
        continue;
      }
      const content = githubFileContent(file);
      if (contentIncludesBinaryByte(content)) {
        handleUnknownGitHubFile(args, `Skipping binary GitHub repository file: ${entryPath}`);
        continue;
      }
      files.push(file);
      if (files.length >= maxFiles) {
        break;
      }
    }
  }
  const result: { files: JsonObject[]; owner: string; repo: string; ref?: string } = {
    files,
    owner: repo.owner,
    repo: repo.repo,
  };
  if (ref) {
    result.ref = ref;
  }
  return result;
}

function normalizeGitHubPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}

function handleUnknownGitHubFile(args: GitHubRepositoryLoaderArgs, message: string): void {
  if (args.unknown === "error") {
    throw new Error(message);
  }
}

function shouldIgnoreGitHubPath(path: string, ignorePaths: string[] | undefined): boolean {
  if (!ignorePaths || ignorePaths.length === 0 || path.length === 0) {
    return false;
  }
  return ignorePaths.some((pattern) => gitIgnorePatternMatches(pattern, path));
}

function gitIgnorePatternMatches(pattern: string, path: string): boolean {
  const normalizedPattern = pattern.trim().replace(/\\/g, "/");
  const normalizedPath = path.replace(/\\/g, "/");
  if (!normalizedPattern || normalizedPattern.startsWith("#")) {
    return false;
  }
  if (normalizedPattern.endsWith("/")) {
    return normalizedPath.startsWith(normalizedPattern.slice(0, -1));
  }
  const matchTarget = normalizedPattern.includes("/") || normalizedPattern.startsWith("/")
    ? normalizedPath
    : normalizedPath.split("/").pop() ?? normalizedPath;
  return globPatternToRegExp(normalizedPattern.replace(/^\/+/, "")).test(matchTarget);
}

function globPatternToRegExp(pattern: string): RegExp {
  let source = "^";
  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index] ?? "";
    const next = pattern[index + 1];
    if (char === "*" && next === "*") {
      source += ".*";
      index += 1;
    } else if (char === "*") {
      source += "[^/]*";
    } else if (char === "?") {
      source += "[^/]";
    } else {
      source += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
    }
  }
  source += "$";
  return new RegExp(source);
}

function isLikelyBinaryPath(path: string): boolean {
  const extension = path.split(".").pop()?.toLowerCase();
  if (!extension) {
    return false;
  }
  return new Set([
    "7z", "avif", "bmp", "bz2", "class", "dll", "dmg", "doc", "docx", "eot", "exe", "gif", "gz", "ico",
    "jar", "jpeg", "jpg", "lockb", "mp3", "mp4", "otf", "pdf", "png", "ppt", "pptx", "pyc", "so", "tar",
    "tgz", "tif", "tiff", "ttf", "wasm", "webm", "webp", "woff", "woff2", "xls", "xlsx", "xz", "zip",
  ]).has(extension);
}

function contentIncludesBinaryByte(content: string): boolean {
  return content.includes("\0");
}

function searchResultGroups(input: JsonObject): Array<{ type: string; items: JsonObject[] }> {
  const groups: Array<{ type: string; items: JsonObject[] }> = [];
  for (const key of [
    "organic_results",
    "news_results",
    "local_results",
    "places_results",
    "images_results",
    "image_results",
    "video_results",
    "videos_results",
    "shopping_results",
    "jobs_results",
    "related_questions",
    "ads",
  ]) {
    const value = input[key];
    if (Array.isArray(value)) {
      groups.push({ type: key, items: value.filter(isJsonObject) });
    }
  }
  for (const key of ["answer_box", "knowledge_graph"]) {
    const value = input[key];
    if (isJsonObject(value)) {
      groups.push({ type: key, items: [value] });
    }
  }
  return groups;
}

function searchResultTitle(item: JsonObject): string | undefined {
  for (const key of ["title", "name", "question", "source", "type"]) {
    const value = item[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function searchResultLink(item: JsonObject): string | undefined {
  for (const key of ["link", "url", "source_link", "thumbnail", "video_link"]) {
    const value = item[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function searchResultText(item: JsonObject): string {
  const parts = [
    searchResultTitle(item),
    typeof item.snippet === "string" ? item.snippet : undefined,
    typeof item.snippet_highlighted_words === "string" ? item.snippet_highlighted_words : undefined,
    typeof item.description === "string" ? item.description : undefined,
    typeof item.answer === "string" ? item.answer : undefined,
    typeof item.extracted_answer === "string" ? item.extracted_answer : undefined,
    typeof item.price === "string" ? item.price : undefined,
    searchResultLink(item),
  ].filter((part): part is string => typeof part === "string" && part.length > 0);
  return parts.length > 0 ? parts.join("\n") : stringifyDocumentValue(item);
}

function firecrawlStringField(object: JsonObject, key: string): string | undefined {
  const value = object[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function firecrawlDocumentUrl(record: JsonObject, metadata: JsonObject): string | undefined {
  return firecrawlStringField(metadata, "sourceURL")
    ?? firecrawlStringField(metadata, "url")
    ?? firecrawlStringField(record, "url");
}

function salesforceRecordTitle(fields: JsonObject): string | undefined {
  for (const key of ["Name", "Subject", "Title", "Email", "CaseNumber"]) {
    const value = fields[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function hubSpotRecordTitle(properties: JsonObject): string | undefined {
  for (const key of ["name", "company", "dealname", "subject", "email", "firstname", "lastname", "hs_object_id"]) {
    const value = properties[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function hubSpotNextAfter(response: JsonObject): string | undefined {
  const paging = isJsonObject(response.paging) ? response.paging : undefined;
  const next = paging && isJsonObject(paging.next) ? paging.next : undefined;
  return next && typeof next.after === "string" ? next.after : undefined;
}

function stripeResourceTitle(resource: JsonObject): string | undefined {
  for (const key of ["description", "name", "email", "type", "id"]) {
    const value = resource[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function shopifyRecordTitle(record: JsonObject): string | undefined {
  for (const key of ["title", "name", "email", "admin_graphql_api_id", "id"]) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    if (typeof value === "number") {
      return String(value);
    }
  }
  return undefined;
}

function shopifyLoaderBaseUrl(args: ShopifyResourceLoaderArgs): string {
  if (args.baseUrl) {
    return args.baseUrl.replace(/\/+$/, "");
  }
  if (!args.shop) {
    throw new Error("shopify_resource_load requires shop or baseUrl when records are not provided");
  }
  const shop = args.shop.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${shop}/admin/api/${args.apiVersion ?? "2026-04"}`;
}

function zendeskRecordTitle(record: JsonObject): string | undefined {
  for (const key of ["subject", "name", "email", "title", "result_type", "id"]) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    if (typeof value === "number") {
      return String(value);
    }
  }
  return undefined;
}

function zendeskLoaderBaseUrl(args: ZendeskSupportLoaderArgs): string {
  if (args.baseUrl) {
    return args.baseUrl.replace(/\/+$/, "");
  }
  if (!args.subdomain) {
    throw new Error("zendesk_support_load requires subdomain or baseUrl when records are not provided");
  }
  return `https://${args.subdomain}.zendesk.com/api/v2`;
}

async function zendeskLoaderHeaders(args: ZendeskSupportLoaderArgs, chidori: ChidoriRuntime): Promise<Record<string, string>> {
  if (args.oauthToken) {
    return jsonHeaders(bearerAuth(await resolveSecret(args.oauthToken, chidori, "Zendesk OAuth token")));
  }
  if (!args.email) {
    throw new Error("Zendesk email is required when using apiToken auth");
  }
  const apiToken = await resolveSecret(args.apiToken, chidori, "Zendesk API token");
  return jsonHeaders({
    Authorization: `Basic ${base64Encode(`${args.email}/token:${apiToken}`)}`,
  });
}

function typeformBaseUrl(args: TypeformResourceLoaderArgs): string {
  return (args.baseUrl ?? "https://api.typeform.com").replace(/\/+$/, "");
}

function typeformRecordTitle(record: JsonObject): string | undefined {
  for (const key of ["title", "landing_id", "token", "response_id", "id"]) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return undefined;
}

function typeformAnswerText(answer: JsonObject): string {
  const field = isJsonObject(answer.field) ? answer.field : {};
  const label = typeof field.ref === "string"
    ? field.ref
    : typeof field.id === "string"
      ? field.id
      : typeof answer.type === "string"
        ? answer.type
        : "answer";
  const type = typeof answer.type === "string" ? answer.type : undefined;
  const value = type && answer[type] !== undefined
    ? answer[type]
    : answer.text ?? answer.email ?? answer.number ?? answer.boolean ?? answer.date ?? answer.choice ?? answer.choices ?? answer.file_url ?? answer.payment;
  return `${label}: ${stringifyDocumentValue(value as Json)}`;
}

function typeformResponseText(response: JsonObject): string {
  const answers = Array.isArray(response.answers) ? response.answers.filter(isJsonObject) : [];
  const lines = answers.map(typeformAnswerText).filter(Boolean);
  return lines.length > 0 ? lines.join("\n") : stringifyDocumentValue(response);
}

function serviceNowRecordTitle(record: JsonObject): string | undefined {
  for (const key of ["short_description", "number", "name", "title", "sys_name", "sys_id"]) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    if (isJsonObject(value) && typeof value.display_value === "string" && value.display_value.length > 0) {
      return value.display_value;
    }
  }
  return undefined;
}

function serviceNowBaseUrl(args: ServiceNowTableRecordsLoaderArgs): string {
  return `${args.instanceUrl.replace(/\/+$/, "")}${args.apiPath ?? "/api/now/table"}`;
}

function serviceNowDisplayValue(value: boolean | "true" | "false" | "all" | undefined): string | undefined {
  return typeof value === "boolean" ? String(value) : value;
}

async function serviceNowLoaderHeaders(args: ServiceNowTableRecordsLoaderArgs, chidori: ChidoriRuntime): Promise<Record<string, string>> {
  if (args.oauthToken) {
    return jsonHeaders(bearerAuth(await resolveSecret(args.oauthToken, chidori, "ServiceNow OAuth token")));
  }
  if (!args.username) {
    throw new Error("ServiceNow username is required when using password auth");
  }
  const password = await resolveSecret(args.password, chidori, "ServiceNow password");
  return jsonHeaders({
    Authorization: `Basic ${base64Encode(`${args.username}:${password}`)}`,
  });
}

function base64Encode(input: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const bytes = utf8Bytes(input);
  let output = "";
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1] ?? 0;
    const third = bytes[index + 2] ?? 0;
    const combined = (first << 16) | (second << 8) | third;
    output += alphabet.charAt((combined >> 18) & 63);
    output += alphabet.charAt((combined >> 12) & 63);
    output += index + 1 < bytes.length ? alphabet.charAt((combined >> 6) & 63) : "=";
    output += index + 2 < bytes.length ? alphabet.charAt(combined & 63) : "=";
  }
  return output;
}

function base64DecodeUtf8(input: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const clean = input.replace(/\s+/g, "");
  const bytes: number[] = [];
  for (let index = 0; index < clean.length; index += 4) {
    const first = alphabet.indexOf(clean[index] ?? "A");
    const second = alphabet.indexOf(clean[index + 1] ?? "A");
    const thirdChar = clean[index + 2] ?? "=";
    const fourthChar = clean[index + 3] ?? "=";
    const third = thirdChar === "=" ? 0 : alphabet.indexOf(thirdChar);
    const fourth = fourthChar === "=" ? 0 : alphabet.indexOf(fourthChar);
    if (first < 0 || second < 0 || third < 0 || fourth < 0) {
      continue;
    }
    const combined = (first << 18) | (second << 12) | (third << 6) | fourth;
    bytes.push((combined >> 16) & 255);
    if (thirdChar !== "=") {
      bytes.push((combined >> 8) & 255);
    }
    if (fourthChar !== "=") {
      bytes.push(combined & 255);
    }
  }
  return utf8Decode(bytes);
}

function utf8Bytes(input: string): number[] {
  const bytes: number[] = [];
  for (const char of input) {
    const code = char.codePointAt(0) ?? 0;
    if (code <= 0x7f) {
      bytes.push(code);
    } else if (code <= 0x7ff) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code <= 0xffff) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return bytes;
}

function utf8Decode(bytes: number[]): string {
  let output = "";
  for (let index = 0; index < bytes.length; index += 1) {
    const first = bytes[index] ?? 0;
    if (first < 0x80) {
      output += String.fromCodePoint(first);
    } else if ((first & 0xe0) === 0xc0) {
      const second = bytes[++index] ?? 0;
      output += String.fromCodePoint(((first & 0x1f) << 6) | (second & 0x3f));
    } else if ((first & 0xf0) === 0xe0) {
      const second = bytes[++index] ?? 0;
      const third = bytes[++index] ?? 0;
      output += String.fromCodePoint(((first & 0x0f) << 12) | ((second & 0x3f) << 6) | (third & 0x3f));
    } else if ((first & 0xf8) === 0xf0) {
      const second = bytes[++index] ?? 0;
      const third = bytes[++index] ?? 0;
      const fourth = bytes[++index] ?? 0;
      output += String.fromCodePoint(
        ((first & 0x07) << 18) | ((second & 0x3f) << 12) | ((third & 0x3f) << 6) | (fourth & 0x3f),
      );
    }
  }
  return output;
}

function chatGptMessageContent(content: Json | undefined): string {
  if (typeof content === "string") {
    return content;
  }
  if (!isJsonObject(content)) {
    return extractText(content);
  }
  if (Array.isArray(content.parts)) {
    return content.parts.map((part) => typeof part === "string" ? part : stringifyDocumentValue(part)).join("\n").trim();
  }
  return extractText(content);
}

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function trimLeadingQuestionMark(value: string): string {
  return value.replace(/^\?/, "");
}

function encodePathSegments(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function loadAirtableRecordDocuments(records: Json[], metadata: JsonObject = {}): ChidoriDocument[] {
  return records.filter(isJsonObject).map((record, index) => {
    const fields = isJsonObject(record.fields) ? record.fields : record;
    return {
      pageContent: JSON.stringify(fields),
      metadata: compactObject({
        ...metadata,
        source: "airtable",
        recordId: typeof record.id === "string" ? record.id : undefined,
        createdTime: typeof record.createdTime === "string" ? record.createdTime : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadFigmaFileDocuments(file: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const text = extractFigmaText(file.document);
  return [{
    pageContent: text.length > 0 ? text : JSON.stringify(file.document ?? file),
    metadata: compactObject({
      ...metadata,
      source: "figma",
      name: typeof file.name === "string" ? file.name : undefined,
      version: typeof file.version === "string" ? file.version : undefined,
      lastModified: typeof file.lastModified === "string" ? file.lastModified : undefined,
    }) as JsonObject,
  }];
}

export function loadJiraIssueDocuments(issues: Json[], metadata: JsonObject = {}): ChidoriDocument[] {
  return issues.filter(isJsonObject).map((issue, index) => {
    const fields = isJsonObject(issue.fields) ? issue.fields : {};
    const summary = typeof fields.summary === "string" ? fields.summary : undefined;
    const description = fields.description === undefined ? undefined : extractText(fields.description);
    const pageContent = JSON.stringify(compactObject({
      key: issue.key,
      summary,
      description,
      fields,
    }) as JsonObject);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "jira",
        issueId: typeof issue.id === "string" ? issue.id : undefined,
        issueKey: typeof issue.key === "string" ? issue.key : undefined,
        self: typeof issue.self === "string" ? issue.self : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadConfluencePageDocuments(
  pages: Json[],
  bodyFormat: ConfluencePagesLoaderArgs["bodyFormat"] = "storage",
  metadata: JsonObject = {},
): ChidoriDocument[] {
  const format = bodyFormat ?? "storage";
  return pages.filter(isJsonObject).map((page, index) => {
    const body = isJsonObject(page.body) ? page.body : {};
    const representation = isJsonObject(body[format]) ? body[format] as JsonObject : {};
    const rawValue = representation.value;
    const text = format === "atlas_doc_format"
      ? extractText(rawValue)
      : htmlToText(typeof rawValue === "string" ? rawValue : stringifyDocumentValue(rawValue ?? page));
    return {
      pageContent: text,
      metadata: compactObject({
        ...metadata,
        source: "confluence",
        pageId: typeof page.id === "string" ? page.id : undefined,
        spaceId: typeof page.spaceId === "string" ? page.spaceId : undefined,
        title: typeof page.title === "string" ? page.title : undefined,
        status: typeof page.status === "string" ? page.status : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadJsonItemDocuments(items: Json[], source: string, metadata: JsonObject = {}): ChidoriDocument[] {
  return items.map((item, index) => ({
    pageContent: stringifyDocumentValue(item),
    metadata: compactObject({
      ...metadata,
      source,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadFirecrawlDocuments(input: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const data = input.data;
  const records = Array.isArray(data)
    ? data.filter(isJsonObject)
    : Array.isArray(input.results)
      ? input.results.filter(isJsonObject)
      : isJsonObject(data)
        ? [data]
        : [input];
  return records.map((record, index) => {
    const recordMetadata = isJsonObject(record.metadata) ? record.metadata : {};
    const pageContent = typeof record.markdown === "string" && record.markdown.length > 0
      ? record.markdown
      : typeof record.html === "string" && record.html.length > 0
        ? htmlToText(record.html)
        : typeof record.rawHtml === "string" && record.rawHtml.length > 0
          ? htmlToText(record.rawHtml)
          : typeof record.content === "string"
            ? record.content
            : stringifyDocumentValue(record);
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        ...recordMetadata,
        source: "firecrawl",
        url: firecrawlDocumentUrl(record, recordMetadata),
        title: firecrawlStringField(recordMetadata, "title") ?? firecrawlStringField(record, "title"),
        description: firecrawlStringField(recordMetadata, "description"),
        statusCode: typeof recordMetadata.statusCode === "number" ? recordMetadata.statusCode : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadParallelExtractDocuments(input: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const results = Array.isArray(input.results) ? input.results.filter(isJsonObject) : [];
  return results.map((result, index) => {
    const excerpts = Array.isArray(result.excerpts)
      ? result.excerpts.filter((excerpt): excerpt is string => typeof excerpt === "string" && excerpt.length > 0)
      : [];
    const title = typeof result.title === "string" ? result.title : undefined;
    const fullContent = typeof result.full_content === "string" && result.full_content.length > 0
      ? result.full_content
      : typeof result.markdown === "string" && result.markdown.length > 0
        ? result.markdown
        : typeof result.content === "string" && result.content.length > 0
          ? result.content
          : undefined;
    const pageContent = fullContent ?? (excerpts.length > 0 ? excerpts.join("\n\n") : title ?? stringifyDocumentValue(result));
    return {
      pageContent,
      metadata: compactObject({
        ...metadata,
        source: "parallel_extract",
        title,
        url: typeof result.url === "string" ? result.url : undefined,
        status: typeof result.status === "string" ? result.status : undefined,
        publishDate: typeof result.publish_date === "string" ? result.publish_date : undefined,
        extractId: typeof input.extract_id === "string" ? input.extract_id : undefined,
        sessionId: typeof input.session_id === "string" ? input.session_id : undefined,
        sourceIndex: index,
      }) as JsonObject,
    };
  });
}

export function loadTranscriptDocument(transcript: JsonObject, source: string, metadata: JsonObject = {}): ChidoriDocument[] {
  const text = typeof transcript.text === "string" && transcript.text.length > 0
    ? transcript.text
    : extractText(transcript);
  return [{
    pageContent: text.length > 0 ? text : JSON.stringify(transcript),
    metadata: compactObject({
      ...metadata,
      source,
      transcriptId: typeof transcript.id === "string" ? transcript.id : undefined,
      status: typeof transcript.status === "string" ? transcript.status : undefined,
    }) as JsonObject,
  }];
}

export function loadSonioxTranscriptDocuments(transcript: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const tokens = sonioxTranscriptTokens(transcript);
  const text = sonioxTranscriptText(transcript, tokens);
  return [{
    pageContent: text.length > 0 ? text : stringifyDocumentValue(transcript),
    metadata: compactObject({
      ...metadata,
      source: "soniox",
      transcriptionId: sonioxTranscriptId(transcript) ?? sonioxMetadataString(metadata, "transcriptionId"),
      status: typeof transcript.status === "string" ? transcript.status : sonioxMetadataString(metadata, "status"),
      model: typeof transcript.model === "string" ? transcript.model : sonioxMetadataString(metadata, "model"),
      audioUrl: typeof transcript.audio_url === "string" ? transcript.audio_url : sonioxMetadataString(metadata, "audioUrl"),
      fileId: typeof transcript.file_id === "string" ? transcript.file_id : sonioxMetadataString(metadata, "fileId"),
      filename: typeof transcript.filename === "string" ? transcript.filename : sonioxMetadataString(metadata, "filename"),
      audioDurationMs: typeof transcript.audio_duration_ms === "number" ? transcript.audio_duration_ms : sonioxMetadataNumber(metadata, "audioDurationMs"),
      createdAt: typeof transcript.created_at === "string" ? transcript.created_at : sonioxMetadataString(metadata, "createdAt"),
      tokenCount: tokens.length > 0 ? tokens.length : undefined,
      tokens: tokens.length > 0 ? tokens : undefined,
    }) as JsonObject,
  }];
}

export function loadHackerNewsThreadDocuments(items: JsonObject[], metadata: JsonObject = {}): ChidoriDocument[] {
  if (items.length === 0) {
    return [];
  }
  const root = items[0] ?? {};
  return [{
    pageContent: items.map((item) => {
      const title = typeof item.title === "string" ? item.title : "";
      const author = typeof item.by === "string" ? item.by : "unknown";
      const text = typeof item.text === "string" ? htmlToText(item.text) : "";
      return [`${item.type ?? "item"} ${item.id ?? ""}`, title, `by ${author}`, text].filter(Boolean).join("\n");
    }).join("\n\n---\n\n"),
    metadata: compactObject({
      ...metadata,
      source: "hacker_news",
      itemId: typeof root.id === "number" ? root.id : undefined,
      title: typeof root.title === "string" ? root.title : undefined,
      url: typeof root.url === "string" ? root.url : undefined,
      itemCount: items.length,
    }) as JsonObject,
  }];
}

export function loadGitBookPageDocuments(page: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const markdown = typeof page.markdown === "string" ? page.markdown : undefined;
  return [{
    pageContent: markdown ?? contentFromResponse(page),
    metadata: compactObject({
      ...metadata,
      source: "gitbook",
      pageId: typeof page.id === "string" ? page.id : undefined,
      title: typeof page.title === "string" ? page.title : undefined,
      updatedAt: typeof page.updatedAt === "string" ? page.updatedAt : undefined,
    }) as JsonObject,
  }];
}

export function loadTaskadeTaskDocuments(tasks: Json[], metadata: JsonObject = {}): ChidoriDocument[] {
  return tasks.filter(isJsonObject).map((task, index) => ({
    pageContent: stringifyDocumentValue(task),
    metadata: compactObject({
      ...metadata,
      source: "taskade",
      taskId: typeof task.id === "string" ? task.id : undefined,
      parentId: typeof task.parentId === "string" ? task.parentId : undefined,
      completed: typeof task.completed === "boolean" ? task.completed : undefined,
      sourceIndex: index,
    }) as JsonObject,
  }));
}

export function loadSupadataTranscriptDocuments(response: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const content = response.content;
  const chunks = Array.isArray(content) ? content.filter(isJsonObject) : [];
  const pageContent = typeof content === "string"
    ? content
    : chunks.length > 0
      ? chunks.map((chunk) => typeof chunk.text === "string" ? chunk.text : stringifyDocumentValue(chunk)).join("\n")
      : stringifyDocumentValue(response);
  return [{
    pageContent,
    metadata: compactObject({
      ...metadata,
      source: "supadata",
      jobId: typeof response.jobId === "string" ? response.jobId : undefined,
      status: typeof response.status === "string" ? response.status : undefined,
      lang: typeof response.lang === "string" ? response.lang : undefined,
      availableLangs: Array.isArray(response.availableLangs) ? response.availableLangs.filter((lang): lang is string => typeof lang === "string") : undefined,
      chunkCount: chunks.length > 0 ? chunks.length : undefined,
    }) as JsonObject,
  }];
}

export function loadSupadataMetadataDocuments(response: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  return [{
    pageContent: stringifyDocumentValue(response),
    metadata: compactObject({
      ...metadata,
      source: "supadata",
      platform: typeof response.platform === "string" ? response.platform : undefined,
      type: typeof response.type === "string" ? response.type : undefined,
      mediaId: typeof response.id === "string" ? response.id : undefined,
      url: typeof response.url === "string" ? response.url : undefined,
      title: typeof response.title === "string" ? response.title : undefined,
      createdAt: typeof response.createdAt === "string" ? response.createdAt : undefined,
    }) as JsonObject,
  }];
}

export function loadIFixitGuideListDocuments(guides: Json[], metadata: JsonObject = {}): ChidoriDocument[] {
  return guides.filter(isJsonObject).map((guide, index) => ({
    pageContent: iFixitGuideSummaryText(guide),
    metadata: compactObject({
      ...metadata,
      source: "ifixit",
      sourceIndex: index,
      guideId: iFixitGuideId(guide),
      title: typeof guide.title === "string" ? guide.title : undefined,
      category: typeof guide.category === "string" ? guide.category : undefined,
      subject: typeof guide.subject === "string" ? guide.subject : undefined,
      type: typeof guide.type === "string" ? guide.type : undefined,
      url: iFixitGuideUrl(guide),
      locale: typeof guide.locale === "string" ? guide.locale : undefined,
      modifiedDate: typeof guide.modified_date === "number" ? guide.modified_date : undefined,
    }) as JsonObject,
  }));
}

export function loadIFixitGuideDocuments(guide: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const steps = Array.isArray(guide.steps) ? guide.steps.filter(isJsonObject) : [];
  const stepText = steps.map(iFixitStepText).filter(Boolean).join("\n\n");
  const introduction = iFixitTextField(guide, "introduction");
  const conclusion = iFixitTextField(guide, "conclusion");
  const tools = iFixitNamedItemsText(guide.tools, "Tools");
  const parts = iFixitNamedItemsText(guide.parts, "Parts");
  const pageContent = [
    iFixitGuideSummaryText(guide),
    introduction ? `Introduction\n${introduction}` : "",
    tools,
    parts,
    stepText,
    conclusion ? `Conclusion\n${conclusion}` : "",
  ].filter(Boolean).join("\n\n").trim();

  return [{
    pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(guide),
    metadata: compactObject({
      ...metadata,
      source: "ifixit",
      guideId: iFixitGuideId(guide),
      title: typeof guide.title === "string" ? guide.title : undefined,
      category: typeof guide.category === "string" ? guide.category : undefined,
      subject: typeof guide.subject === "string" ? guide.subject : undefined,
      type: typeof guide.type === "string" ? guide.type : undefined,
      difficulty: typeof guide.difficulty === "string" ? guide.difficulty : undefined,
      url: iFixitGuideUrl(guide),
      locale: typeof guide.locale === "string" ? guide.locale : undefined,
      revisionId: typeof guide.revisionid === "number" ? guide.revisionid : undefined,
      modifiedDate: typeof guide.modified_date === "number" ? guide.modified_date : undefined,
      stepCount: steps.length > 0 ? steps.length : undefined,
    }) as JsonObject,
  }];
}

export function loadIFixitWikiDocuments(wiki: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const pageContent = [
    iFixitWikiTitle(wiki),
    iFixitTextField(wiki, "summary"),
    iFixitTextField(wiki, "contents"),
    typeof wiki.text === "string" ? wiki.text : "",
    iFixitWikiInfoText(wiki.info),
  ].filter(Boolean).join("\n\n").trim();

  return [{
    pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(wiki),
    metadata: compactObject({
      ...metadata,
      source: "ifixit",
      dataType: typeof wiki.dataType === "string" ? wiki.dataType : "wiki",
      wikiId: typeof wiki.wikiid === "number" ? wiki.wikiid : undefined,
      title: typeof wiki.title === "string" ? wiki.title : undefined,
      displayTitle: typeof wiki.display_title === "string" ? wiki.display_title : undefined,
      namespace: typeof wiki.namespace === "string" ? wiki.namespace : undefined,
      url: typeof wiki.url === "string" ? wiki.url : undefined,
      langId: typeof wiki.langid === "string" ? wiki.langid : undefined,
      revisionId: typeof wiki.revisionid === "number" ? wiki.revisionid : undefined,
    }) as JsonObject,
  }];
}

export function loadIFixitSuggestionDocuments(results: Json[], metadata: JsonObject = {}): ChidoriDocument[] {
  return results.filter(isJsonObject).map((result, index) => {
    const pageContent = result.dataType === "guide"
      ? iFixitGuideSummaryText(result)
      : [
        iFixitWikiTitle(result),
        iFixitTextField(result, "summary"),
        typeof result.text === "string" ? result.text : "",
        typeof result.question === "string" ? result.question : "",
        typeof result.answer === "string" ? result.answer : "",
      ].filter(Boolean).join("\n").trim();
    return {
      pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(result),
      metadata: compactObject({
        ...metadata,
        source: "ifixit",
        sourceIndex: index,
        dataType: typeof result.dataType === "string" ? result.dataType : undefined,
        guideId: iFixitGuideId(result),
        wikiId: typeof result.wikiid === "number" ? result.wikiid : undefined,
        title: typeof result.title === "string" ? result.title : undefined,
        displayTitle: typeof result.display_title === "string" ? result.display_title : undefined,
        category: typeof result.category === "string" ? result.category : undefined,
        namespace: typeof result.namespace === "string" ? result.namespace : undefined,
        url: iFixitGuideUrl(result),
      }) as JsonObject,
    };
  });
}

export function loadIFixitDocumentDocuments(document: JsonObject, metadata: JsonObject = {}): ChidoriDocument[] {
  const pageContent = [
    typeof document.title === "string" ? document.title : undefined,
    typeof document.filename === "string" ? `Filename: ${document.filename}` : undefined,
    typeof document.summary === "string" ? document.summary : undefined,
    typeof document.document_type === "string" ? `Document type: ${document.document_type}` : undefined,
    typeof document.document_extension === "string" ? `Extension: ${document.document_extension}` : undefined,
    typeof document.pages === "number" ? `Pages: ${document.pages}` : undefined,
    typeof document.size === "number" ? `Size: ${document.size}` : undefined,
    typeof document.view_url === "string" ? `View URL: ${document.view_url}` : undefined,
    typeof document.download_url === "string" ? `Download URL: ${document.download_url}` : undefined,
  ].filter(Boolean).join("\n").trim();

  return [{
    pageContent: pageContent.length > 0 ? pageContent : stringifyDocumentValue(document),
    metadata: compactObject({
      ...metadata,
      source: "ifixit",
      dataType: "document",
      documentId: typeof document.documentid === "number" ? document.documentid : undefined,
      guid: typeof document.guid === "string" ? document.guid : undefined,
      title: typeof document.title === "string" ? document.title : undefined,
      filename: typeof document.filename === "string" ? document.filename : undefined,
      documentType: typeof document.document_type === "string" ? document.document_type : undefined,
      documentExtension: typeof document.document_extension === "string" ? document.document_extension : undefined,
      size: typeof document.size === "number" ? document.size : undefined,
      pages: typeof document.pages === "number" ? document.pages : undefined,
      date: typeof document.date === "number" ? document.date : undefined,
      viewUrl: typeof document.view_url === "string" ? document.view_url : undefined,
      downloadUrl: typeof document.download_url === "string" ? document.download_url : undefined,
    }) as JsonObject,
  }];
}

function extractText(value: Json | undefined): string {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(extractText).filter(Boolean).join(" ");
  }
  if (!isJsonObject(value)) {
    return "";
  }
  const direct = typeof value.text === "string"
    ? value.text
    : typeof value.plain_text === "string"
      ? value.plain_text
      : "";
  const content = Array.isArray(value.content) ? value.content.map(extractText).filter(Boolean).join(" ") : "";
  return [direct, content].filter(Boolean).join(" ").trim();
}

function extractFigmaText(value: Json | undefined): string {
  const lines: string[] = [];
  const visit = (node: Json | undefined): void => {
    if (!isJsonObject(node)) {
      return;
    }
    const name = typeof node.name === "string" ? node.name.trim() : "";
    const characters = typeof node.characters === "string" ? node.characters.trim() : "";
    const line = [name, characters].filter(Boolean).join(": ");
    if (line) {
      lines.push(line);
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };
  visit(value);
  return lines.join("\n");
}

function tokenHeaders(token: string, authScheme: "figma_token" | "bearer" = "bearer"): Record<string, string> {
  return authScheme === "figma_token" ? { "X-Figma-Token": token } : bearerAuth(token);
}

function contentFromResponse(value: Json): string {
  if (typeof value === "string") {
    return value;
  }
  if (isJsonObject(value)) {
    for (const key of ["content", "markdown", "text", "html", "data"]) {
      const field = value[key];
      if (typeof field === "string") {
        return field;
      }
    }
  }
  return stringifyDocumentValue(value);
}

function confluenceApiBaseUrl(baseUrl: string): string {
  const root = trimTrailingSlash(baseUrl);
  if (root.endsWith("/api/v2")) {
    return root;
  }
  return root.endsWith("/wiki") ? `${root}/api/v2` : `${root}/wiki/api/v2`;
}

function gitBookApiBaseUrl(baseUrl?: string): string {
  const root = trimTrailingSlash(baseUrl ?? "https://api.gitbook.com/v1");
  return root.endsWith("/v1") ? root : `${root}/v1`;
}

function taskadeApiBaseUrl(baseUrl?: string): string {
  const root = trimTrailingSlash(baseUrl ?? "https://www.taskade.com/api/v1");
  return root.endsWith("/api/v1") ? root : `${root}/api/v1`;
}

function supadataApiBaseUrl(baseUrl?: string): string {
  const root = trimTrailingSlash(baseUrl ?? "https://api.supadata.ai/v1");
  return root.endsWith("/v1") ? root : `${root}/v1`;
}

function sonioxApiBaseUrl(baseUrl?: string): string {
  const root = trimTrailingSlash(baseUrl ?? "https://api.soniox.com/v1");
  return root.endsWith("/v1") ? root : `${root}/v1`;
}

function sonioxTranscriptId(transcript: JsonObject): string | undefined {
  if (typeof transcript.id === "string") {
    return transcript.id;
  }
  if (typeof transcript.transcription_id === "string") {
    return transcript.transcription_id;
  }
  return undefined;
}

function sonioxMetadataString(metadata: JsonObject, key: string): string | undefined {
  const value = metadata[key];
  return typeof value === "string" ? value : undefined;
}

function sonioxMetadataNumber(metadata: JsonObject, key: string): number | undefined {
  const value = metadata[key];
  return typeof value === "number" ? value : undefined;
}

function sonioxTranscriptTokens(transcript: JsonObject): Json[] {
  if (Array.isArray(transcript.tokens)) {
    return transcript.tokens;
  }
  if (isJsonObject(transcript.transcript) && Array.isArray(transcript.transcript.tokens)) {
    return transcript.transcript.tokens;
  }
  if (isJsonObject(transcript.result) && Array.isArray(transcript.result.tokens)) {
    return transcript.result.tokens;
  }
  return [];
}

function sonioxTranscriptText(transcript: JsonObject, tokens: Json[]): string {
  if (typeof transcript.text === "string" && transcript.text.length > 0) {
    return transcript.text;
  }
  for (const key of ["transcript", "result"]) {
    const value = transcript[key];
    if (isJsonObject(value)) {
      const text = sonioxTranscriptText(value, sonioxTranscriptTokens(value));
      if (text.length > 0) {
        return text;
      }
    }
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  const tokenText = sonioxTokenText(tokens);
  return tokenText.length > 0 ? tokenText : extractText(transcript);
}

function sonioxTokenText(tokens: Json[]): string {
  let text = "";
  for (const token of tokens) {
    if (!isJsonObject(token) || typeof token.text !== "string" || token.text.length === 0) {
      continue;
    }
    const next = token.text;
    if (text.length > 0 && shouldSeparateSonioxTokens(text, next)) {
      text += " ";
    }
    text += next;
  }
  return text.trim();
}

function shouldSeparateSonioxTokens(current: string, next: string): boolean {
  return /[A-Za-z0-9]$/.test(current) && /^[A-Za-z0-9]/.test(next);
}

function sonioxTranscriptStatus(transcription: JsonObject): string | undefined {
  return typeof transcription.status === "string" ? transcription.status : undefined;
}

function sonioxTranscriptError(transcription: JsonObject): string {
  const type = typeof transcription.error_type === "string" ? transcription.error_type : "transcription_error";
  const message = typeof transcription.error_message === "string"
    ? transcription.error_message
    : typeof transcription.message === "string"
      ? transcription.message
      : "Soniox transcription failed";
  return `${type}: ${message}`;
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollSonioxTranscription(
  chidori: ChidoriRuntime,
  baseUrl: string,
  transcriptionId: string,
  headers: Record<string, string>,
  args: Pick<SonioxTranscriptLoaderArgs, "pollingIntervalMs" | "pollingTimeoutMs" | "timeoutMs">,
): Promise<JsonObject> {
  const intervalMs = Math.max(args.pollingIntervalMs ?? 1000, 1000);
  const timeoutMs = args.pollingTimeoutMs ?? 180000;
  const startedAt = Date.now();
  while (true) {
    const transcription = await requestJson<JsonObject>(
      chidori,
      `${baseUrl}/transcriptions/${encodeURIComponent(transcriptionId)}`,
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const status = sonioxTranscriptStatus(transcription);
    if (status === "completed") {
      return transcription;
    }
    if (status === "error") {
      throw new Error(sonioxTranscriptError(transcription));
    }
    if (Date.now() - startedAt >= timeoutMs) {
      throw new Error(`Timed out waiting for Soniox transcription ${transcriptionId}`);
    }
    await delay(intervalMs);
  }
}

function iFixitApiBaseUrl(baseUrl?: string): string {
  const root = trimTrailingSlash(baseUrl ?? "https://www.ifixit.com/api/2.0");
  return root.endsWith("/api/2.0") ? root : `${root}/api/2.0`;
}

function iFixitGuideId(guide: JsonObject): string | number | undefined {
  if (typeof guide.guideid === "number" || typeof guide.guideid === "string") {
    return guide.guideid;
  }
  if (typeof guide.guideId === "number" || typeof guide.guideId === "string") {
    return guide.guideId;
  }
  return undefined;
}

function iFixitGuideUrl(guide: JsonObject): string | undefined {
  if (typeof guide.url === "string") {
    return guide.url;
  }
  if (typeof guide.public_url === "string") {
    return guide.public_url;
  }
  return undefined;
}

function iFixitTextField(value: JsonObject, field: string): string {
  for (const key of [`${field}_raw`, `${field}_rendered`, field]) {
    const text = value[key];
    if (typeof text === "string" && text.trim().length > 0) {
      return key.endsWith("_rendered") ? htmlToText(text) : text.trim();
    }
  }
  return "";
}

function iFixitGuideSummaryText(guide: JsonObject): string {
  const lines = [
    typeof guide.title === "string" ? guide.title : undefined,
    typeof guide.display_title === "string" ? guide.display_title : undefined,
    typeof guide.category === "string" ? `Category: ${guide.category}` : undefined,
    typeof guide.subject === "string" ? `Subject: ${guide.subject}` : undefined,
    typeof guide.type === "string" ? `Type: ${guide.type}` : undefined,
    typeof guide.difficulty === "string" ? `Difficulty: ${guide.difficulty}` : undefined,
    typeof guide.url === "string" ? `URL: ${guide.url}` : undefined,
    iFixitTextField(guide, "summary"),
  ].filter((line): line is string => typeof line === "string" && line.length > 0);
  return lines.length > 0 ? lines.join("\n") : stringifyDocumentValue(guide);
}

function iFixitWikiTitle(wiki: JsonObject): string {
  if (typeof wiki.display_title === "string" && wiki.display_title.length > 0) {
    return wiki.display_title;
  }
  if (typeof wiki.title === "string" && wiki.title.length > 0) {
    return wiki.title;
  }
  return "";
}

function iFixitWikiInfoText(value: Json | undefined): string {
  const items = Array.isArray(value) ? value.filter(isJsonObject) : [];
  if (items.length === 0) {
    return "";
  }
  const lines = items.map((item) => {
    const name = typeof item.name === "string" ? item.name : "";
    const itemValue = typeof item.value === "string" ? item.value : "";
    return [name, itemValue].filter(Boolean).join(": ");
  }).filter(Boolean);
  return lines.length > 0 ? `Info\n${lines.join("\n")}` : "";
}

function iFixitNamedItemsText(value: Json | undefined, heading: string): string {
  const items = Array.isArray(value) ? value.filter(isJsonObject) : [];
  if (items.length === 0) {
    return "";
  }
  const lines = items.map((item) => {
    const name = typeof item.name === "string" ? item.name : "";
    const type = typeof item.type === "string" ? item.type : "";
    const quantity = typeof item.quantity === "number" ? `x${item.quantity}` : "";
    const notes = typeof item.notes === "string" ? item.notes : "";
    return [name, type, quantity, notes].filter(Boolean).join(" - ");
  }).filter(Boolean);
  return lines.length > 0 ? `${heading}\n${lines.join("\n")}` : "";
}

function iFixitStepText(step: JsonObject, index: number): string {
  const title = typeof step.title === "string" && step.title.length > 0 ? step.title : `Step ${index + 1}`;
  const lines = Array.isArray(step.lines)
    ? step.lines.map((line) => {
      if (typeof line === "string") {
        return line;
      }
      if (!isJsonObject(line)) {
        return "";
      }
      const text = typeof line.text_raw === "string"
        ? line.text_raw
        : typeof line.text_rendered === "string"
          ? htmlToText(line.text_rendered)
          : typeof line.text === "string"
            ? line.text
            : "";
      return text.trim();
    }).filter(Boolean)
    : [];
  return [title, ...lines].filter(Boolean).join("\n");
}

async function fetchHackerNewsItems(
  chidori: ChidoriRuntime,
  args: HackerNewsItemLoaderArgs,
): Promise<JsonObject[]> {
  const baseUrl = args.baseUrl ?? "https://hacker-news.firebaseio.com/v0";
  const maxDepth = args.maxDepth ?? 2;
  const maxItems = args.maxItems ?? 50;
  const items: JsonObject[] = [];
  const seen = new Set<number>();

  const visit = async (itemId: number, depth: number): Promise<void> => {
    if (items.length >= maxItems || seen.has(itemId) || depth > maxDepth) {
      return;
    }
    seen.add(itemId);
    const item = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(baseUrl)}/item/${encodeURIComponent(String(itemId))}.json`,
      compactObject({
        method: "GET",
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (!isJsonObject(item) || item.deleted === true || item.dead === true) {
      return;
    }
    items.push(item);
    const kids = Array.isArray(item.kids) ? item.kids.filter((kid): kid is number => typeof kid === "number") : [];
    for (const kid of kids) {
      if (items.length >= maxItems) {
        break;
      }
      await visit(kid, depth + 1);
    }
  };

  await visit(args.itemId, 0);
  return items;
}

function tasksFromResponse(response: Json): Json[] {
  if (Array.isArray(response)) {
    return response;
  }
  if (!isJsonObject(response)) {
    return [];
  }
  for (const key of ["items", "tasks", "data", "results"]) {
    const value = response[key];
    if (Array.isArray(value)) {
      return value;
    }
  }
  return [response];
}

export const httpDocumentLoaderTool = defineTool<HttpDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "http_document_load",
    description: "Load a remote document with Chidori HTTP.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to load." },
        method: { type: "string", enum: ["GET", "POST"], default: "GET" },
        headers: { type: "object", additionalProperties: { type: "string" } },
        body: { description: "Optional request body for POST." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const options = compactObject({
      method: args.method ?? "GET",
      headers: args.headers,
      body: args.body,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions;
    const response = await chidori.http(args.url, options);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ${args.url}: ${detail}`);
    }
    return {
      documents: loadTextDocument(typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body), compactObject({
        ...(args.metadata ?? {}),
        source: args.url,
      }) as JsonObject),
    };
  },
);

export const jsonDocumentLoaderTool = defineTool<JsonDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "json_document_load",
    description: "Load JSON values into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        json: { description: "JSON value to load." },
        pointer: { type: "string", description: "Optional JSON pointer." },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["json"],
    },
  },
  async (args) => ({ documents: loadJsonDocuments(args.json, args.pointer, args.metadata ?? {}) }),
);

export const textDocumentLoaderTool = defineTool<TextDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "text_document_load",
    description: "Load plain text into a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string", description: "Plain text content." },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["text"],
    },
  },
  async (args) => ({ documents: loadTextDocument(args.text, args.metadata ?? {}) }),
);

export const subtitleDocumentLoaderTool = defineTool<SubtitleDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "subtitle_document_load",
    description: "Load SRT or WebVTT subtitles into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        subtitles: { type: "string", description: "SRT or WebVTT subtitle text." },
        format: { type: "string", enum: ["srt", "vtt"], default: "srt" },
        metadata: { type: "object", additionalProperties: true },
        splitCues: { type: "boolean", default: false },
      },
      required: ["subtitles"],
    },
  },
  async (args) => ({ documents: loadSubtitleDocuments(args.subtitles, args) }),
);

export const youtubeTranscriptLoaderTool = defineTool<YouTubeTranscriptLoaderArgs, { documents: ChidoriDocument[]; raw?: Json | string }>(
  {
    name: "youtube_transcript_load",
    description: "Load a YouTube video transcript into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "YouTube video URL." },
        videoId: { type: "string", description: "YouTube video ID. Used when url is omitted." },
        language: { type: "string", default: "en", description: "Caption language code." },
        translation: { type: "string", description: "Optional translation language code." },
        transcriptUrl: { type: "string", description: "Optional explicit transcript URL to fetch." },
        baseUrl: { type: "string", default: "https://www.youtube.com/api/timedtext" },
        format: { type: "string", enum: ["json3", "srv3", "vtt"], default: "json3" },
        transcript: {
          description: "Optional already-fetched transcript text, JSON3 payload, or segment array to normalize without HTTP.",
        },
        transcriptFormat: { type: "string", enum: ["text", "chunks"], default: "text" },
        chunkSizeSeconds: { type: "integer", default: 120 },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const videoId = args.videoId ?? (args.url ? parseYouTubeVideoId(args.url) : undefined);
    const { transcript: _transcript, ...loaderBase } = args;
    const loaderOptions = videoId ? { ...loaderBase, videoId } : loaderBase;
    if (args.transcript !== undefined) {
      return {
        documents: loadYouTubeTranscriptDocuments(args.transcript, loaderOptions),
      };
    }
    if (!videoId && !args.transcriptUrl) {
      throw new Error("youtube_transcript_load requires url, videoId, or transcriptUrl when transcript is not provided");
    }
    const format = args.format ?? "json3";
    const response = await chidori.http(
      args.transcriptUrl ?? withQuery(args.baseUrl ?? "https://www.youtube.com/api/timedtext", {
        v: videoId,
        lang: args.language ?? "en",
        tlang: args.translation,
        fmt: format,
      }),
      compactObject({
        method: "GET",
        headers: { accept: format === "json3" ? "application/json" : "text/plain" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from YouTube transcript endpoint: ${detail}`);
    }
    const raw = response.body;
    const transcript = typeof raw === "string" && format === "json3" ? JSON.parse(raw) as JsonObject : raw;
    if (typeof transcript !== "string" && !Array.isArray(transcript) && !isJsonObject(transcript)) {
      throw new Error("youtube_transcript_load received an unsupported transcript response");
    }
    return {
      documents: loadYouTubeTranscriptDocuments(transcript, videoId ? {
        ...loaderBase,
        videoId,
        language: args.language ?? "en",
        format,
      } : {
        ...loaderBase,
        language: args.language ?? "en",
        format,
      }),
      raw: transcript,
    };
  },
);

export const chatGptExportLoaderTool = defineTool<ChatGptExportLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "chatgpt_export_load",
    description: "Load ChatGPT conversation export JSON into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        exportJson: { description: "ChatGPT export JSON object or conversations array." },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["exportJson"],
    },
  },
  async (args) => ({ documents: loadChatGptExportDocuments(args.exportJson, args.metadata ?? {}) }),
);

export const slackConversationLoaderTool = defineTool<SlackConversationLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "slack_conversation_load",
    description: "Load Slack conversation history messages into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel, DM, MPIM, or private channel ID." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://slack.com/api" },
        cursor: { type: "string", description: "Pagination cursor." },
        latest: { type: "string", description: "Latest message timestamp boundary." },
        oldest: { type: "string", description: "Oldest message timestamp boundary." },
        inclusive: { type: "boolean" },
        limit: { type: "integer", default: 100 },
        messages: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Slack messages to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.messages) {
      return {
        documents: loadSlackMessageDocuments(compactObject({
          channel: args.channel,
          messages: args.messages,
        }) as JsonObject, args.metadata ?? {}),
      };
    }
    if (!args.channel) {
      throw new Error("slack_conversation_load requires channel when messages are not provided");
    }
    const token = await resolveSecret(args.token, chidori, "Slack token");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://slack.com/api")}/conversations.history`, {
        channel: args.channel,
        cursor: args.cursor,
        latest: args.latest,
        oldest: args.oldest,
        inclusive: args.inclusive,
        limit: args.limit ?? 100,
      }),
      compactObject({
        method: "GET",
        headers: {
          ...bearerAuth(token),
          accept: "application/json",
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSlackMessageDocuments({ ...response, channel: args.channel }, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const discordChannelMessagesLoaderTool = defineTool<DiscordChannelMessagesLoaderArgs, { documents: ChidoriDocument[]; raw?: Json }>(
  {
    name: "discord_channel_messages_load",
    description: "Load Discord channel messages into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        channelId: { type: "string", description: "Discord channel ID." },
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://discord.com/api/v10" },
        around: { type: "string", description: "Message ID around which to list." },
        before: { type: "string", description: "Message ID before which to list." },
        after: { type: "string", description: "Message ID after which to list." },
        limit: { type: "integer", default: 50 },
        messages: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Discord messages to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.messages) {
      return {
        documents: loadDiscordMessageDocuments(compactObject({
          channelId: args.channelId,
          messages: args.messages,
        }) as JsonObject, args.metadata ?? {}),
      };
    }
    if (!args.channelId) {
      throw new Error("discord_channel_messages_load requires channelId when messages are not provided");
    }
    const token = await resolveSecret(args.token, chidori, "Discord bot token");
    const response = await requestJson<Json>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://discord.com/api/v10")}/channels/${encodeURIComponent(args.channelId)}/messages`, {
        around: args.around,
        before: args.before,
        after: args.after,
        limit: args.limit ?? 50,
      }),
      compactObject({
        method: "GET",
        headers: {
          ...bearerAuth(token),
          accept: "application/json",
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadDiscordMessageDocuments(Array.isArray(response) ? {
        channelId: args.channelId,
        messages: response,
      } : isJsonObject(response) ? response : { messages: [] }, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const githubRepositoryLoaderTool = defineTool<GitHubRepositoryLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "github_repository_load",
    description: "Load text files from a GitHub repository into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        githubUrl: { type: "string", description: "Repository URL, such as https://github.com/owner/repo." },
        owner: { type: "string", description: "Repository owner. Used with repo when githubUrl is omitted." },
        repo: { type: "string", description: "Repository name. Used with owner when githubUrl is omitted." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://github.com", description: "GitHub Enterprise web base URL." },
        apiUrl: { type: "string", default: "https://api.github.com", description: "GitHub REST API base URL." },
        branch: { type: "string", description: "Repository branch. Alias for ref." },
        ref: { type: "string", description: "Git ref, branch, tag, or commit SHA." },
        path: { type: "string", description: "Repository path to load. Defaults to the repository root." },
        recursive: { type: "boolean", default: true },
        ignorePaths: {
          type: "array",
          items: { type: "string" },
          description: "Simple .gitignore-style path patterns to skip, such as node_modules/** or *.md.",
        },
        unknown: { type: "string", enum: ["skip", "warn", "error"], default: "skip" },
        maxFiles: { type: "integer", default: 100 },
        maxBytes: { type: "integer", default: 1000000 },
        files: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched GitHub content API file objects to normalize without HTTP requests.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const repo = args.githubUrl || (args.owner && args.repo) ? parseGitHubRepository(args) : undefined;
    if (args.files) {
      return {
        documents: loadGitHubRepositoryDocuments(compactObject({
          owner: repo?.owner ?? args.owner,
          repo: repo?.repo ?? args.repo,
          ref: args.ref ?? args.branch,
          files: args.files,
        }) as JsonObject, args.metadata ?? {}),
      };
    }
    const response = await fetchGitHubRepositoryFiles(args, chidori);
    return {
      documents: loadGitHubRepositoryDocuments(response, args.metadata ?? {}),
      raw: compactObject({
        owner: response.owner,
        repo: response.repo,
        ref: response.ref,
        fileCount: response.files.length,
      }) as JsonObject,
    };
  },
);

export const serpApiSearchLoaderTool = defineTool<SerpApiSearchLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "serpapi_search_load",
    description: "Load SerpApi search results into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        engine: { type: "string", default: "google" },
        location: { type: "string" },
        googleDomain: { type: "string" },
        gl: { type: "string" },
        hl: { type: "string" },
        num: { type: "integer" },
        start: { type: "integer" },
        device: { type: "string", enum: ["desktop", "tablet", "mobile"] },
        results: {
          type: "object",
          additionalProperties: true,
          description: "Optional already-fetched SerpApi response to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.results) {
      return { documents: loadSearchResultDocuments(args.results, "serpapi", args.metadata ?? {}) };
    }
    if (!args.query) {
      throw new Error("serpapi_search_load requires query when results are not provided");
    }
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
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSearchResultDocuments(response, "serpapi", args.metadata ?? {}),
      raw: response,
    };
  },
);

export const searchApiSearchLoaderTool = defineTool<SearchApiSearchLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "searchapi_search_load",
    description: "Load SearchApi search results into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query." },
        apiKey: { description: "SearchApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.searchapi.io/api/v1/search" },
        engine: { type: "string", default: "google" },
        location: { type: "string" },
        googleDomain: { type: "string" },
        gl: { type: "string" },
        hl: { type: "string" },
        num: { type: "integer" },
        start: { type: "integer" },
        device: { type: "string", enum: ["desktop", "tablet", "mobile"] },
        results: {
          type: "object",
          additionalProperties: true,
          description: "Optional already-fetched SearchApi response to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.results) {
      return { documents: loadSearchResultDocuments(args.results, "searchapi", args.metadata ?? {}) };
    }
    if (!args.query) {
      throw new Error("searchapi_search_load requires query when results are not provided");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "SearchApi API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(args.baseUrl ?? "https://www.searchapi.io/api/v1/search", {
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
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSearchResultDocuments(response, "searchapi", args.metadata ?? {}),
      raw: response,
    };
  },
);

export const salesforceSoqlLoaderTool = defineTool<SalesforceSoqlLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "salesforce_soql_load",
    description: "Load Salesforce SOQL query records into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string", description: "Salesforce instance URL, such as https://example.my.salesforce.com." },
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        apiVersion: { type: "string", default: "v66.0" },
        query: { type: "string", description: "SOQL query to execute." },
        nextRecordsUrl: { type: "string", description: "Optional nextRecordsUrl returned by Salesforce for pagination." },
        records: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Salesforce records to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["instanceUrl"],
    },
  },
  async (args, chidori) => {
    if (args.records) {
      return {
        documents: loadSalesforceRecordDocuments({ records: args.records }, args.metadata ?? {}),
      };
    }
    if (!args.query && !args.nextRecordsUrl) {
      throw new Error("salesforce_soql_load requires query or nextRecordsUrl when records are not provided");
    }
    const accessToken = await resolveSecret(args.accessToken, chidori, "Salesforce access token");
    const instanceUrl = args.instanceUrl.replace(/\/+$/, "");
    const url = args.nextRecordsUrl
      ? args.nextRecordsUrl.startsWith("http")
        ? args.nextRecordsUrl
        : `${instanceUrl}${args.nextRecordsUrl}`
      : withQuery(`${instanceUrl}/services/data/${args.apiVersion ?? "v66.0"}/query`, { q: args.query });
    const response = await requestJson<JsonObject>(
      chidori,
      url,
      compactObject({
        method: "GET",
        headers: {
          ...bearerAuth(accessToken),
          accept: "application/json",
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSalesforceRecordDocuments(response, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const hubSpotCrmObjectsLoaderTool = defineTool<HubSpotCrmObjectsLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "hubspot_crm_objects_load",
    description: "Load HubSpot CRM objects into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        objectType: { type: "string", description: "HubSpot CRM object type, such as contacts, companies, deals, tickets, or a custom object type." },
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        mode: { type: "string", enum: ["list", "search"], default: "list" },
        query: { type: "string", description: "Text query for search mode." },
        filterGroups: { type: "array", items: { type: "object", additionalProperties: true } },
        sorts: { type: "array", items: { type: "string" } },
        properties: { type: "array", items: { type: "string" } },
        propertiesWithHistory: { type: "array", items: { type: "string" } },
        associations: { type: "array", items: { type: "string" } },
        archived: { type: "boolean" },
        limit: { type: "integer" },
        after: { type: "string" },
        objects: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched HubSpot CRM objects to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["objectType"],
    },
  },
  async (args, chidori) => {
    if (args.objects) {
      return {
        documents: loadHubSpotCrmObjectDocuments({
          objectType: args.objectType,
          results: args.objects,
        }, args.metadata ?? {}),
      };
    }
    const token = await resolveSecret(args.token, chidori, "HubSpot private app token");
    const baseUrl = (args.baseUrl ?? "https://api.hubapi.com").replace(/\/+$/, "");
    const path = `/crm/v3/objects/${encodeURIComponent(args.objectType)}`;
    const response = args.mode === "search"
      ? await requestJson<JsonObject>(
        chidori,
        `${baseUrl}${path}/search`,
        compactObject({
          method: "POST",
          headers: jsonHeaders(bearerAuth(token)),
          body: compactObject({
            query: args.query,
            filterGroups: args.filterGroups,
            sorts: args.sorts,
            properties: args.properties,
            limit: args.limit,
            after: args.after,
          }) as JsonObject,
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      )
      : await requestJson<JsonObject>(
        chidori,
        withQuery(`${baseUrl}${path}`, {
          limit: args.limit,
          after: args.after,
          properties: args.properties?.join(","),
          propertiesWithHistory: args.propertiesWithHistory?.join(","),
          associations: args.associations?.join(","),
          archived: args.archived,
        }),
        compactObject({
          method: "GET",
          headers: jsonHeaders(bearerAuth(token)),
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
    return {
      documents: loadHubSpotCrmObjectDocuments({ ...response, objectType: args.objectType }, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const stripeResourceLoaderTool = defineTool<StripeResourceLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "stripe_resource_load",
    description: "Load Stripe list resources into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        resource: {
          type: "string",
          enum: ["balance_transactions", "charges", "customers", "events", "refunds", "disputes"],
          description: "Stripe list resource to load.",
        },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string", description: "Optional Stripe-Version header." },
        limit: { type: "integer", minimum: 1, maximum: 100 },
        startingAfter: { type: "string" },
        endingBefore: { type: "string" },
        created: { type: "object", additionalProperties: true, description: "Stripe created range with gt, gte, lt, or lte numeric fields." },
        customer: { type: "string", description: "Customer filter for resources that support it, such as charges." },
        type: { type: "string", description: "Event type filter when resource is events." },
        resources: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Stripe resources to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["resource"],
    },
  },
  async (args, chidori) => {
    if (args.resources) {
      return {
        documents: loadStripeResourceDocuments(args.resources, args.resource, args.metadata ?? {}),
      };
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "Stripe API key");
    const headers = {
      ...bearerAuth(apiKey),
      accept: "application/json",
      ...(args.stripeVersion ? { "Stripe-Version": args.stripeVersion } : {}),
    };
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://api.stripe.com/v1")}/${args.resource}`, {
        limit: args.limit,
        starting_after: args.startingAfter,
        ending_before: args.endingBefore,
        "created[gt]": typeof args.created?.gt === "number" ? args.created.gt : undefined,
        "created[gte]": typeof args.created?.gte === "number" ? args.created.gte : undefined,
        "created[lt]": typeof args.created?.lt === "number" ? args.created.lt : undefined,
        "created[lte]": typeof args.created?.lte === "number" ? args.created.lte : undefined,
        customer: args.customer,
        type: args.resource === "events" ? args.type : undefined,
      }),
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadStripeResourceDocuments(response, args.resource, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const shopifyResourceLoaderTool = defineTool<ShopifyResourceLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "shopify_resource_load",
    description: "Load Shopify Admin REST products, orders, or customers into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        resource: { type: "string", enum: ["products", "orders", "customers"] },
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string", description: "Shop domain, for example example.myshopify.com." },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        limit: { type: "integer" },
        sinceId: { type: "string" },
        status: { type: "string" },
        vendor: { type: "string" },
        productType: { type: "string" },
        collectionId: { type: "string" },
        financialStatus: { type: "string" },
        fulfillmentStatus: { type: "string" },
        createdAtMin: { type: "string" },
        createdAtMax: { type: "string" },
        updatedAtMin: { type: "string" },
        updatedAtMax: { type: "string" },
        query: { type: "string", description: "Customer search query when resource is customers." },
        fields: { type: "array", items: { type: "string" } },
        records: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Shopify records to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["resource"],
    },
  },
  async (args, chidori) => {
    if (args.records) {
      return {
        documents: loadShopifyRecordDocuments(args.records, args.resource, args.metadata ?? {}),
      };
    }
    const token = await resolveSecret(args.token, chidori, "Shopify Admin API access token");
    const path = args.resource === "customers" && args.query ? "/customers/search.json" : `/${args.resource}.json`;
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${shopifyLoaderBaseUrl(args)}${path}`, {
        limit: args.limit,
        since_id: args.sinceId,
        status: args.status,
        vendor: args.resource === "products" ? args.vendor : undefined,
        product_type: args.resource === "products" ? args.productType : undefined,
        collection_id: args.resource === "products" ? args.collectionId : undefined,
        financial_status: args.resource === "orders" ? args.financialStatus : undefined,
        fulfillment_status: args.resource === "orders" ? args.fulfillmentStatus : undefined,
        created_at_min: args.createdAtMin,
        created_at_max: args.createdAtMax,
        updated_at_min: args.updatedAtMin,
        updated_at_max: args.updatedAtMax,
        query: args.resource === "customers" ? args.query : undefined,
        fields: args.fields?.join(","),
      }),
      compactObject({
        method: "GET",
        headers: jsonHeaders({ "X-Shopify-Access-Token": token }),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadShopifyRecordDocuments(response, args.resource, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const zendeskSupportLoaderTool = defineTool<ZendeskSupportLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "zendesk_support_load",
    description: "Load Zendesk Support search results, tickets, or users into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        resource: { type: "string", enum: ["search", "tickets", "users"] },
        subdomain: { type: "string" },
        baseUrl: { type: "string" },
        email: { type: "string" },
        apiToken: { description: "Zendesk API token or Chidori memory secret reference." },
        oauthToken: { description: "Zendesk OAuth token or Chidori memory secret reference." },
        query: { type: "string", description: "Zendesk search query when resource is search." },
        sortBy: { type: "string" },
        sortOrder: { type: "string", enum: ["asc", "desc"] },
        role: { type: "string", enum: ["end-user", "agent", "admin"] },
        page: { type: "integer" },
        perPage: { type: "integer" },
        records: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Zendesk records to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["resource"],
    },
  },
  async (args, chidori) => {
    if (args.records) {
      return {
        documents: loadZendeskSupportDocuments(args.records, args.resource, args.metadata ?? {}),
      };
    }
    if (args.resource === "search" && !args.query) {
      throw new Error("zendesk_support_load requires query when resource is search");
    }
    const path = args.resource === "search" ? "/search.json" : `/${args.resource}.json`;
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${zendeskLoaderBaseUrl(args)}${path}`, {
        query: args.resource === "search" ? args.query : undefined,
        sort_by: args.sortBy,
        sort_order: args.sortOrder,
        role: args.resource === "users" ? args.role : undefined,
        page: args.page,
        per_page: args.perPage,
      }),
      compactObject({
        method: "GET",
        headers: await zendeskLoaderHeaders(args, chidori),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadZendeskSupportDocuments(response, args.resource, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const typeformResourceLoaderTool = defineTool<TypeformResourceLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "typeform_resource_load",
    description: "Load Typeform forms or form responses into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        resource: { type: "string", enum: ["forms", "responses"] },
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        formId: { type: "string", description: "Required for responses, optional for retrieving a single form." },
        page: { type: "integer" },
        pageSize: { type: "integer" },
        search: { type: "string" },
        workspaceId: { type: "string" },
        since: { type: "string" },
        until: { type: "string" },
        after: { type: "string" },
        before: { type: "string" },
        includedResponseIds: { type: "array", items: { type: "string" } },
        completed: { type: "boolean" },
        responseType: { type: "array", items: { type: "string" } },
        sort: { type: "string" },
        query: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        records: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched Typeform forms or responses to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["resource"],
    },
  },
  async (args, chidori) => {
    if (args.records) {
      return {
        documents: loadTypeformResourceDocuments(args.records, args.resource, args.metadata ?? {}),
      };
    }
    if (args.resource === "responses" && !args.formId) {
      throw new Error("typeform_resource_load requires formId when resource is responses");
    }
    const token = await resolveSecret(args.token, chidori, "Typeform personal access token");
    const path = args.resource === "responses"
      ? `/forms/${encodeURIComponent(args.formId ?? "")}/responses`
      : args.formId
        ? `/forms/${encodeURIComponent(args.formId)}`
        : "/forms";
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${typeformBaseUrl(args)}${path}`, args.resource === "responses" ? {
        page_size: args.pageSize,
        since: args.since,
        until: args.until,
        after: args.after,
        before: args.before,
        included_response_ids: args.includedResponseIds?.join(","),
        completed: args.completed,
        response_type: args.responseType?.join(","),
        sort: args.sort,
        query: args.query,
        fields: args.fields?.join(","),
      } : {
        page: args.page,
        page_size: args.pageSize,
        search: args.search,
        workspace_id: args.workspaceId,
      }),
      compactObject({
        method: "GET",
        headers: jsonHeaders(bearerAuth(token)),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadTypeformResourceDocuments(
        args.resource === "responses" ? compactObject({ ...response, form_id: args.formId }) as JsonObject : response,
        args.resource,
        args.metadata ?? {},
      ),
      raw: response,
    };
  },
);

export const serviceNowTableRecordsLoaderTool = defineTool<ServiceNowTableRecordsLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "servicenow_table_records_load",
    description: "Load ServiceNow Table API records into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string", description: "ServiceNow instance URL, such as https://example.service-now.com." },
        table: { type: "string", description: "ServiceNow table name, such as incident, task, or cmdb_ci." },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        sysId: { type: "string", description: "Optional sys_id for retrieving one record." },
        query: { type: "string", description: "ServiceNow encoded query for listing records." },
        fields: { type: "array", items: { type: "string" } },
        displayValue: { oneOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false", "all"] }] },
        excludeReferenceLink: { type: "boolean" },
        suppressPaginationHeader: { type: "boolean" },
        limit: { type: "integer" },
        offset: { type: "integer" },
        view: { type: "string" },
        records: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional already-fetched ServiceNow table records to normalize without an HTTP request.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["instanceUrl", "table"],
    },
  },
  async (args, chidori) => {
    if (args.records) {
      return {
        documents: loadServiceNowTableRecordDocuments(args.records, args.table, args.metadata ?? {}),
      };
    }
    const path = args.sysId
      ? `/${encodeURIComponent(args.table)}/${encodeURIComponent(args.sysId)}`
      : `/${encodeURIComponent(args.table)}`;
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${serviceNowBaseUrl(args)}${path}`, {
        sysparm_query: args.sysId ? undefined : args.query,
        sysparm_fields: args.fields?.join(","),
        sysparm_display_value: serviceNowDisplayValue(args.displayValue),
        sysparm_exclude_reference_link: args.excludeReferenceLink,
        sysparm_suppress_pagination_header: args.suppressPaginationHeader,
        sysparm_limit: args.sysId ? undefined : args.limit,
        sysparm_offset: args.sysId ? undefined : args.offset,
        sysparm_view: args.view,
      }),
      compactObject({
        method: "GET",
        headers: await serviceNowLoaderHeaders(args, chidori),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadServiceNowTableRecordDocuments({ ...response, table: args.table }, args.table, args.metadata ?? {}),
      raw: response,
    };
  },
);

export const jsonLinesDocumentLoaderTool = defineTool<JsonLinesDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "jsonl_document_load",
    description: "Load newline-delimited JSON into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        jsonl: { type: "string", description: "JSON Lines / JSONL content." },
        metadata: { type: "object", additionalProperties: true },
        skipInvalid: { type: "boolean", default: false },
      },
      required: ["jsonl"],
    },
  },
  async (args) => ({ documents: loadJsonLinesDocuments(args.jsonl, args) }),
);

export const csvDocumentLoaderTool = defineTool<CsvDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "csv_document_load",
    description: "Load CSV text into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        csv: { type: "string", description: "CSV text." },
        delimiter: { type: "string", default: "," },
        hasHeader: { type: "boolean", default: true },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["csv"],
    },
  },
  async (args) => ({ documents: loadCsvDocuments(args.csv, args) }),
);

export const htmlDocumentLoaderTool = defineTool<HtmlDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "html_document_load",
    description: "Load HTML text into plain-text Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        html: { type: "string", description: "HTML content." },
        metadata: { type: "object", additionalProperties: true },
        includeTitle: { type: "boolean", default: true },
      },
      required: ["html"],
    },
  },
  async (args) => ({ documents: loadHtmlDocuments(args.html, args) }),
);

export const cheerioWebLoaderTool = defineTool<CheerioWebLoaderArgs, { documents: ChidoriDocument[]; raw?: string }>(
  {
    name: "cheerio_web_load",
    description: "Load a static webpage into a Chidori document, optionally extracting simple selector matches.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Webpage URL to fetch." },
        html: { type: "string", description: "Optional already-fetched HTML to normalize without HTTP." },
        selector: { type: "string", description: "Optional simple selector such as p, .content, #main, article.post, or comma-separated selectors." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.html !== undefined) {
      return { documents: loadCheerioWebDocuments(args.html, args) };
    }
    if (!args.url) {
      throw new Error("cheerio_web_load requires url when html is not provided");
    }
    const response = await chidori.http(args.url, compactObject({
      method: "GET",
      headers: args.headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ${args.url}: ${detail}`);
    }
    const html = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
    return {
      documents: loadCheerioWebDocuments(html, args),
      raw: html,
    };
  },
);

export const recursiveUrlLoaderTool = defineTool<RecursiveUrlLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "recursive_url_load",
    description: "Recursively load static webpages by following links into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Root URL to crawl." },
        pages: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              html: { type: "string" },
            },
            required: ["url", "html"],
          },
          description: "Optional already-fetched pages to normalize without HTTP crawling.",
        },
        maxDepth: { type: "integer", default: 2 },
        maxPages: { type: "integer", default: 50 },
        excludeDirs: { type: "array", items: { type: "string" } },
        preventOutside: { type: "boolean", default: true },
        linkRegex: { type: "string", description: "Optional JavaScript regular expression string URLs must match." },
        selector: { type: "string", description: "Optional simple selector for content extraction." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
        continueOnFailure: { type: "boolean", default: true },
      },
    },
  },
  async (args, chidori) => {
    if (args.pages) {
      return {
        documents: loadRecursiveUrlDocuments(args.pages.map((page) => ({ ...page, depth: 0 })), args),
      };
    }
    const pages = await crawlRecursiveUrls(args, chidori);
    return {
      documents: loadRecursiveUrlDocuments(pages, args),
      raw: compactObject({
        rootUrl: args.url,
        pageCount: pages.length,
        maxDepth: args.maxDepth ?? 2,
      }) as JsonObject,
    };
  },
);

export const markdownDocumentLoaderTool = defineTool<MarkdownDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "markdown_document_load",
    description: "Load Markdown text into Chidori documents, optionally parsing simple front matter.",
    parameters: {
      type: "object",
      properties: {
        markdown: { type: "string", description: "Markdown content." },
        metadata: { type: "object", additionalProperties: true },
        parseFrontMatter: { type: "boolean", default: true },
        stripMarkdown: { type: "boolean", default: false },
      },
      required: ["markdown"],
    },
  },
  async (args) => ({ documents: loadMarkdownDocuments(args.markdown, args) }),
);

export const notionMarkdownExportLoaderTool = defineTool<NotionMarkdownExportLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "notion_markdown_export_load",
    description: "Load Notion Markdown export files into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "object",
            properties: {
              path: { type: "string", description: "Path of the exported markdown file." },
              markdown: { type: "string", description: "Markdown contents." },
            },
            required: ["path", "markdown"],
          },
        },
        stripMarkdown: { type: "boolean", default: false },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["files"],
    },
  },
  async (args) => ({ documents: loadNotionMarkdownExportDocuments(args.files, args) }),
);

export const imsdbScriptLoaderTool = defineTool<ImsdbScriptLoaderArgs, { documents: ChidoriDocument[]; raw?: string }>(
  {
    name: "imsdb_script_load",
    description: "Load an IMSDB movie script page into a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "IMSDB script page URL." },
        html: { type: "string", description: "Optional already-fetched IMSDB page HTML or script text." },
        title: { type: "string", description: "Optional script title override." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.html !== undefined) {
      return { documents: loadImsdbScriptDocuments(args.html, args) };
    }
    if (!args.url) {
      throw new Error("imsdb_script_load requires url when html is not provided");
    }
    const response = await chidori.http(args.url, compactObject({
      method: "GET",
      headers: args.headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from IMSDB: ${detail}`);
    }
    const html = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
    return {
      documents: loadImsdbScriptDocuments(html, args),
      raw: html,
    };
  },
);

export const collegeConfidentialLoaderTool = defineTool<CollegeConfidentialLoaderArgs, { documents: ChidoriDocument[]; raw?: string }>(
  {
    name: "college_confidential_load",
    description: "Load a College Confidential college profile page into a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "College Confidential college profile URL." },
        html: { type: "string", description: "Optional already-fetched College Confidential HTML to normalize without HTTP." },
        title: { type: "string", description: "Optional page title override." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.html !== undefined) {
      return { documents: loadCollegeConfidentialDocuments(args.html, args) };
    }
    if (!args.url) {
      throw new Error("college_confidential_load requires url when html is not provided");
    }
    const response = await chidori.http(args.url, compactObject({
      method: "GET",
      headers: args.headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from College Confidential: ${detail}`);
    }
    const html = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
    return {
      documents: loadCollegeConfidentialDocuments(html, args),
      raw: html,
    };
  },
);

export const sitemapDocumentLoaderTool = defineTool<SitemapDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "sitemap_document_load",
    description: "Load URLs from a sitemap.xml and optionally fetch each page.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Sitemap URL." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
        maxUrls: { type: "integer" },
        fetchPages: { type: "boolean", default: false },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const sitemapResponse = await chidori.http(args.url, compactObject({
      method: "GET",
      headers: args.headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (sitemapResponse.status < 200 || sitemapResponse.status >= 300) {
      const detail = typeof sitemapResponse.body === "string" ? sitemapResponse.body : JSON.stringify(sitemapResponse.body);
      throw new Error(`HTTP ${sitemapResponse.status} from sitemap ${args.url}: ${detail}`);
    }
    const sitemapXml = typeof sitemapResponse.body === "string"
      ? sitemapResponse.body
      : stringifyDocumentValue(sitemapResponse.body);
    const urlDocuments = loadSitemapUrlDocuments(sitemapXml, args.metadata ?? {}, args.maxUrls);
    if (!args.fetchPages) {
      return { documents: urlDocuments };
    }

    const documents: ChidoriDocument[] = [];
    for (const urlDocument of urlDocuments) {
      const pageUrl = String(urlDocument.metadata?.url ?? urlDocument.pageContent);
      const pageResponse = await chidori.http(pageUrl, compactObject({
        method: "GET",
        headers: args.headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions);
      if (pageResponse.status >= 200 && pageResponse.status < 300) {
        documents.push({
          pageContent: typeof pageResponse.body === "string" ? pageResponse.body : stringifyDocumentValue(pageResponse.body),
          metadata: compactObject({
            ...(args.metadata ?? {}),
            source: "sitemap_page",
            url: pageUrl,
          }) as JsonObject,
        });
      }
    }
    return { documents };
  },
);

export const rssFeedLoaderTool = defineTool<RssFeedLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "rss_feed_load",
    description: "Load RSS or Atom feed entries into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "RSS or Atom feed URL." },
        feedXml: { type: "string", description: "Optional already-fetched RSS or Atom XML." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
        maxItems: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.feedXml) {
      return { documents: loadRssFeedDocuments(args.feedXml, args.metadata ?? {}, args.maxItems) };
    }
    if (!args.url) {
      throw new Error("rss_feed_load requires url when feedXml is not provided");
    }
    const response = await chidori.http(args.url, compactObject({
      method: "GET",
      headers: args.headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
      throw new Error(`HTTP ${response.status} from feed ${args.url}: ${detail}`);
    }
    const feedXml = typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body);
    return {
      documents: loadRssFeedDocuments(feedXml, compactObject({
        ...(args.metadata ?? {}),
        url: args.url,
      }) as JsonObject, args.maxItems),
    };
  },
);

async function notionHeaders(args: NotionBlocksLoaderArgs, chidori: ChidoriRuntime): Promise<Record<string, string>> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Notion API key");
  return {
    ...bearerAuth(apiKey),
    "Notion-Version": args.notionVersion ?? "2022-06-28",
  };
}

async function fetchNotionBlocks(
  chidori: ChidoriRuntime,
  args: NotionBlocksLoaderArgs,
  blockId: string,
  depth: number,
): Promise<JsonObject[]> {
  const baseUrl = args.baseUrl ?? "https://api.notion.com";
  const headers = await notionHeaders(args, chidori);
  const blocks: JsonObject[] = [];
  let cursor: string | undefined;
  do {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${baseUrl}/v1/blocks/${encodeURIComponent(blockId)}/children`, {
        page_size: 100,
        start_cursor: cursor,
      }),
      { method: "GET", headers },
    );
    const results = Array.isArray(response.results) ? response.results.filter(isJsonObject) : [];
    blocks.push(...results);
    cursor = typeof response.next_cursor === "string" ? response.next_cursor : undefined;
    if (!response.has_more) {
      cursor = undefined;
    }
  } while (cursor);

  if (args.recursive && depth < (args.maxDepth ?? 4)) {
    const children: JsonObject[] = [];
    for (const block of blocks) {
      if (block.has_children === true && typeof block.id === "string") {
        children.push(...await fetchNotionBlocks(chidori, args, block.id, depth + 1));
      }
    }
    blocks.push(...children);
  }

  return blocks;
}

function isJsonObject(value: Json | undefined): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function notionBlockText(block: JsonObject): string {
  const type = typeof block.type === "string" ? block.type : "";
  const rawPayload = type ? block[type] ?? null : null;
  const payload = isJsonObject(rawPayload) ? rawPayload : undefined;
  const richText = payload && Array.isArray(payload.rich_text) ? payload.rich_text : [];
  const text = richText
    .filter(isJsonObject)
    .map((item) => {
      if (typeof item.plain_text === "string") {
        return item.plain_text;
      }
      const rawTextPayload = item.text ?? null;
      const textPayload = isJsonObject(rawTextPayload) ? rawTextPayload : undefined;
      return typeof textPayload?.content === "string" ? textPayload.content : "";
    })
    .join("");
  return text.trim();
}

export const notionBlocksLoaderTool = defineTool<NotionBlocksLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "notion_blocks_load",
    description: "Load Notion page or block children into a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        pageOrBlockId: { type: "string", description: "Notion page or block ID." },
        apiKey: { description: "Notion API key or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Notion-compatible API base URL." },
        notionVersion: { type: "string", default: "2022-06-28" },
        recursive: { type: "boolean", default: true },
        maxDepth: { type: "integer", default: 4 },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["pageOrBlockId"],
    },
  },
  async (args, chidori) => {
    const blocks = await fetchNotionBlocks(chidori, args, args.pageOrBlockId, 0);
    const pageContent = blocks.map(notionBlockText).filter(Boolean).join("\n\n");
    return {
      documents: [{
        pageContent,
        metadata: compactObject({
          ...(args.metadata ?? {}),
          source: "notion",
          pageOrBlockId: args.pageOrBlockId,
          blockCount: blocks.length,
        }) as JsonObject,
      }],
    };
  },
);

export const googleDriveFileLoaderTool = defineTool<GoogleDriveFileLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "google_drive_file_load",
    description: "Load a Google Drive file by downloading or exporting it.",
    parameters: {
      type: "object",
      properties: {
        fileId: { type: "string", description: "Google Drive file ID." },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.googleapis.com/drive/v3" },
        exportMimeType: { type: "string", description: "Optional Google Docs export MIME type." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["fileId"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Google OAuth access token");
    const baseUrl = args.baseUrl ?? "https://www.googleapis.com/drive/v3";
    const url = args.exportMimeType
      ? withQuery(`${baseUrl}/files/${encodeURIComponent(args.fileId)}/export`, { mimeType: args.exportMimeType })
      : withQuery(`${baseUrl}/files/${encodeURIComponent(args.fileId)}`, { alt: "media" });
    const requestOptions = compactObject({
      method: "GET",
      headers: bearerAuth(accessToken),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions;
    const response = await chidori.http(url, requestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Google Drive: ${detail}`);
    }
    return {
      documents: [{
        pageContent: typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body),
        metadata: compactObject({
          ...(args.metadata ?? {}),
          source: "google_drive",
          fileId: args.fileId,
          exportMimeType: args.exportMimeType,
        }) as JsonObject,
      }],
    };
  },
);

export const googleCloudStorageObjectLoaderTool = defineTool<GoogleCloudStorageObjectLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "google_cloud_storage_object_load",
    description: "Load a Google Cloud Storage object through the JSON API media download endpoint.",
    parameters: {
      type: "object",
      properties: {
        bucket: { type: "string", description: "Google Cloud Storage bucket name." },
        object: { type: "string", description: "Object name/path." },
        accessToken: { description: "Google OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://storage.googleapis.com/storage/v1" },
        generation: { type: "string", description: "Optional object generation." },
        userProject: { type: "string", description: "Requester-pays billing project." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["bucket", "object"],
    },
  },
  async (args, chidori) => {
    const headers = args.accessToken
      ? bearerAuth(await resolveSecret(args.accessToken, chidori, "Google OAuth access token"))
      : undefined;
    const response = await chidori.http(
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://storage.googleapis.com/storage/v1")}/b/${encodeURIComponent(args.bucket)}/o/${encodeURIComponent(args.object)}`, {
        alt: "media",
        generation: args.generation,
        userProject: args.userProject,
      }),
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Google Cloud Storage: ${detail}`);
    }
    return {
      documents: loadTextDocument(typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body), compactObject({
        ...(args.metadata ?? {}),
        source: "google_cloud_storage",
        bucket: args.bucket,
        object: args.object,
        generation: args.generation,
      }) as JsonObject),
    };
  },
);

export const azureBlobFileLoaderTool = defineTool<AzureBlobFileLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "azure_blob_file_load",
    description: "Load an Azure Blob Storage object by SAS URL, SAS token, or bearer-authorized blob URL.",
    parameters: {
      type: "object",
      properties: {
        accountName: { type: "string", description: "Storage account name when url is not provided." },
        container: { type: "string", description: "Blob container name when url is not provided." },
        blob: { type: "string", description: "Blob path when url is not provided." },
        url: { type: "string", description: "Full blob URL, optionally already containing a SAS query string." },
        sasToken: { description: "SAS token with or without leading question mark." },
        accessToken: { description: "Microsoft Entra access token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Blob service base URL override." },
        versionId: { type: "string" },
        snapshot: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const blobUrl = args.url
      ?? (args.accountName && args.container && args.blob
        ? `${trimTrailingSlash(args.baseUrl ?? `https://${args.accountName}.blob.core.windows.net`)}/${encodeURIComponent(args.container)}/${encodePathSegments(args.blob)}`
        : undefined);
    if (!blobUrl) {
      throw new Error("azure_blob_file_load requires url or accountName, container, and blob");
    }

    const sasToken = args.sasToken ? await resolveSecret(args.sasToken, chidori, "Azure Blob SAS token") : undefined;
    const requestUrl = withQuery(blobUrl, {
      snapshot: args.snapshot,
      versionid: args.versionId,
    });
    const urlWithSas = sasToken
      ? `${requestUrl}${requestUrl.includes("?") ? "&" : "?"}${trimLeadingQuestionMark(sasToken)}`
      : requestUrl;
    const headers = args.accessToken
      ? bearerAuth(await resolveSecret(args.accessToken, chidori, "Azure access token"))
      : undefined;
    const response = await chidori.http(urlWithSas, compactObject({
      method: "GET",
      headers,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Azure Blob Storage: ${detail}`);
    }
    return {
      documents: loadTextDocument(typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body), compactObject({
        ...(args.metadata ?? {}),
        source: "azure_blob_storage",
        accountName: args.accountName,
        container: args.container,
        blob: args.blob,
        url: args.url,
        versionId: args.versionId,
        snapshot: args.snapshot,
      }) as JsonObject),
    };
  },
);

export const awsS3ObjectLoaderTool = defineTool<AwsS3ObjectLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "aws_s3_object_load",
    description: "Load an Amazon S3 object by presigned URL or caller-provided signed request headers.",
    parameters: {
      type: "object",
      properties: {
        bucket: { type: "string", description: "S3 bucket name when url is not provided." },
        key: { type: "string", description: "S3 object key when url is not provided." },
        url: { type: "string", description: "Full S3 object URL, including presigned query parameters when needed." },
        endpointUrl: { type: "string", description: "S3-compatible endpoint base URL." },
        region: { type: "string", default: "us-east-1" },
        headers: { type: "object", additionalProperties: { type: "string" }, description: "Caller-provided signed headers." },
        versionId: { type: "string" },
        requestPayer: { type: "string", enum: ["requester"] },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const objectUrl = args.url
      ?? (args.bucket && args.key
        ? `${trimTrailingSlash(args.endpointUrl ?? `https://${args.bucket}.s3.${args.region ?? "us-east-1"}.amazonaws.com`)}/${encodePathSegments(args.key)}`
        : undefined);
    if (!objectUrl) {
      throw new Error("aws_s3_object_load requires url or bucket and key");
    }

    const response = await chidori.http(
      withQuery(objectUrl, {
        versionId: args.versionId,
        "x-amz-request-payer": args.requestPayer,
      }),
      compactObject({
        method: "GET",
        headers: args.headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Amazon S3: ${detail}`);
    }
    return {
      documents: loadTextDocument(typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body), compactObject({
        ...(args.metadata ?? {}),
        source: "aws_s3",
        bucket: args.bucket,
        key: args.key,
        url: args.url,
        versionId: args.versionId,
      }) as JsonObject),
    };
  },
);

export const dropboxFileLoaderTool = defineTool<DropboxFileLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "dropbox_file_load",
    description: "Load a Dropbox file into a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Dropbox file path or file ID." },
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Dropbox OAuth access token");
    const requestOptions = compactObject({
      method: "POST",
      headers: {
        ...bearerAuth(accessToken),
        "Dropbox-API-Arg": JSON.stringify({ path: args.path }),
      },
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions;
    const response = await chidori.http(`${args.baseUrl ?? "https://content.dropboxapi.com/2"}/files/download`, requestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Dropbox: ${detail}`);
    }
    return {
      documents: [{
        pageContent: typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body),
        metadata: compactObject({
          ...(args.metadata ?? {}),
          source: "dropbox",
          path: args.path,
        }) as JsonObject,
      }],
    };
  },
);

export const documentParseApiLoaderTool = defineTool<DocumentParseApiLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "document_parse_api_load",
    description: "Load parsed PDF, DOCX, or other files through a JSON document parsing API.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "Parser API endpoint." },
        apiKey: { description: "Parser API key or Chidori memory secret reference." },
        fileBase64: { type: "string", description: "Base64-encoded file content." },
        fileUrl: { type: "string", description: "URL for the parser service to fetch." },
        text: { type: "string", description: "Plain text content to normalize through the parser." },
        filename: { type: "string" },
        mimeType: { type: "string" },
        parserOptions: { type: "object", additionalProperties: true },
        responseDocumentsPath: { type: "string", description: "JSON pointer to returned document array." },
        responseTextPath: { type: "string", description: "JSON pointer to returned text." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["endpoint"],
    },
  },
  async (args, chidori) => {
    const headers = args.apiKey
      ? jsonHeaders(bearerAuth(await resolveSecret(args.apiKey, chidori, "Document parser API key")))
      : jsonHeaders();
    const response = await requestJson<Json>(chidori, args.endpoint, compactObject({
      method: "POST",
      headers,
      body: compactObject({
        fileBase64: args.fileBase64,
        fileUrl: args.fileUrl,
        text: args.text,
        filename: args.filename,
        mimeType: args.mimeType,
        options: args.parserOptions,
      }) as JsonObject,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);

    const documentsValue = args.responseDocumentsPath
      ? resolveJsonPointer(response, args.responseDocumentsPath)
      : null;
    if (Array.isArray(documentsValue)) {
      return {
        documents: documentsValue.map((value, index) => {
          const object = isJsonObject(value) ? value : {};
          const rawMetadata = object.metadata ?? null;
          return {
            pageContent: typeof object.pageContent === "string"
              ? object.pageContent
              : typeof object.text === "string"
                ? object.text
                : stringifyDocumentValue(value),
            metadata: compactObject({
              ...(args.metadata ?? {}),
              ...(isJsonObject(rawMetadata) ? rawMetadata : {}),
              sourceIndex: index,
            }) as JsonObject,
          };
        }),
      };
    }

    const textValue = args.responseTextPath
      ? resolveJsonPointer(response, args.responseTextPath)
      : response;
    return {
      documents: [{
        pageContent: stringifyDocumentValue(textValue),
        metadata: compactObject({
          ...(args.metadata ?? {}),
          filename: args.filename,
          mimeType: args.mimeType,
        }) as JsonObject,
      }],
    };
  },
);

export const airtableRecordsLoaderTool = defineTool<AirtableRecordsLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "airtable_records_load",
    description: "Load Airtable records from a base table into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string", description: "Airtable base ID." },
        table: { type: "string", description: "Airtable table ID or table name." },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
        view: { type: "string" },
        filterByFormula: { type: "string" },
        pageSize: { type: "integer", default: 100 },
        maxRecords: { type: "integer" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseId", "table"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Airtable token");
    const baseUrl = args.baseUrl ?? "https://api.airtable.com/v0";
    const records: Json[] = [];
    let offset: string | undefined;
    do {
      const pageSize = Math.min(100, args.pageSize ?? 100, args.maxRecords ? Math.max(args.maxRecords - records.length, 1) : 100);
      const response = await requestJson<JsonObject>(
        chidori,
        withQuery(`${trimTrailingSlash(baseUrl)}/${encodeURIComponent(args.baseId)}/${encodeURIComponent(args.table)}`, {
          view: args.view,
          filterByFormula: args.filterByFormula,
          pageSize,
          offset,
        }),
        compactObject({
          method: "GET",
          headers: bearerAuth(token),
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
      if (Array.isArray(response.records)) {
        records.push(...response.records);
      }
      offset = typeof response.offset === "string" ? response.offset : undefined;
    } while (offset && (!args.maxRecords || records.length < args.maxRecords));

    return {
      documents: loadAirtableRecordDocuments(records.slice(0, args.maxRecords), compactObject({
        ...(args.metadata ?? {}),
        baseId: args.baseId,
        table: args.table,
      }) as JsonObject),
    };
  },
);

export const figmaFileLoaderTool = defineTool<FigmaFileLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "figma_file_load",
    description: "Load a Figma file JSON tree into a text-oriented Chidori document.",
    parameters: {
      type: "object",
      properties: {
        fileKey: { type: "string", description: "Figma file key." },
        token: { description: "Figma personal access token, OAuth token, or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.figma.com" },
        ids: { type: "array", items: { type: "string" }, description: "Optional node IDs to load." },
        depth: { type: "integer", description: "Optional document traversal depth." },
        version: { type: "string" },
        branchData: { type: "boolean", default: false },
        authScheme: { type: "string", enum: ["figma_token", "bearer"], default: "figma_token" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["fileKey"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Figma token");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://api.figma.com")}/v1/files/${encodeURIComponent(args.fileKey)}`, {
        ids: args.ids?.join(","),
        depth: args.depth,
        version: args.version,
        branch_data: args.branchData,
      }),
      compactObject({
        method: "GET",
        headers: tokenHeaders(token, args.authScheme ?? "figma_token"),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadFigmaFileDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        fileKey: args.fileKey,
      }) as JsonObject),
    };
  },
);

export const jiraIssuesLoaderTool = defineTool<JiraIssuesLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "jira_issues_load",
    description: "Load Jira Cloud issues matching JQL into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Jira site base URL, e.g. https://example.atlassian.net." },
        accessToken: { description: "Jira OAuth access token or Chidori memory secret reference." },
        jql: { type: "string", description: "Jira Query Language expression." },
        fields: { type: "array", items: { type: "string" }, description: "Fields to include." },
        maxResults: { type: "integer", default: 50 },
        maxIssues: { type: "integer" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "jql"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Jira access token");
    const issues: Json[] = [];
    let nextPageToken: string | undefined;
    do {
      const maxResults = Math.min(100, args.maxResults ?? 50, args.maxIssues ? Math.max(args.maxIssues - issues.length, 1) : 50);
      const response = await requestJson<JsonObject>(
        chidori,
        withQuery(`${trimTrailingSlash(args.baseUrl)}/rest/api/3/search/jql`, {
          jql: args.jql,
          fields: args.fields?.join(","),
          maxResults,
          nextPageToken,
        }),
        compactObject({
          method: "GET",
          headers: bearerAuth(accessToken),
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
      if (Array.isArray(response.issues)) {
        issues.push(...response.issues);
      }
      nextPageToken = typeof response.nextPageToken === "string" ? response.nextPageToken : undefined;
    } while (nextPageToken && (!args.maxIssues || issues.length < args.maxIssues));

    return {
      documents: loadJiraIssueDocuments(issues.slice(0, args.maxIssues), compactObject({
        ...(args.metadata ?? {}),
        jql: args.jql,
      }) as JsonObject),
    };
  },
);

export const confluencePagesLoaderTool = defineTool<ConfluencePagesLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "confluence_pages_load",
    description: "Load Confluence Cloud pages into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Confluence site root or /wiki URL." },
        accessToken: { description: "Confluence OAuth access token or Chidori memory secret reference." },
        pageId: { type: "string", description: "Optional page ID to load a single page." },
        spaceId: { type: "string", description: "Optional space ID for listing pages." },
        title: { type: "string", description: "Optional title filter for listing pages." },
        bodyFormat: { type: "string", enum: ["storage", "atlas_doc_format", "view"], default: "storage" },
        limit: { type: "integer", default: 25 },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Confluence access token");
    const bodyFormat = args.bodyFormat ?? "storage";
    const apiBaseUrl = confluenceApiBaseUrl(args.baseUrl);
    const url = args.pageId
      ? withQuery(`${apiBaseUrl}/pages/${encodeURIComponent(args.pageId)}`, { "body-format": bodyFormat })
      : withQuery(`${apiBaseUrl}/pages`, {
        "space-id": args.spaceId,
        title: args.title,
        "body-format": bodyFormat,
        limit: args.limit ?? 25,
      });
    const response = await requestJson<JsonObject>(chidori, url, compactObject({
      method: "GET",
      headers: bearerAuth(accessToken),
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    const pages = args.pageId ? [response] : Array.isArray(response.results) ? response.results : [];
    return {
      documents: loadConfluencePageDocuments(pages, bodyFormat, compactObject({
        ...(args.metadata ?? {}),
        spaceId: args.spaceId,
      }) as JsonObject),
    };
  },
);

export const browserbaseFetchLoaderTool = defineTool<BrowserbaseFetchLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "browserbase_fetch_load",
    description: "Fetch a page through Browserbase and load the returned content as a Chidori document.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Target URL to fetch." },
        apiKey: { description: "Browserbase API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.browserbase.com" },
        headers: { type: "object", additionalProperties: { type: "string" } },
        proxy: { type: "object", additionalProperties: true },
        allowInsecureSsl: { type: "boolean", default: false },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Browserbase API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.browserbase.com")}/v1/fetch`,
      compactObject({
        method: "POST",
        headers: jsonHeaders({ "X-BB-API-Key": apiKey }),
        body: compactObject({
          url: args.url,
          headers: args.headers,
          proxy: args.proxy,
          allowInsecureSsl: args.allowInsecureSsl,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: [{
        pageContent: contentFromResponse(response),
        metadata: compactObject({
          ...(args.metadata ?? {}),
          source: "browserbase",
          url: args.url,
          statusCode: typeof response.statusCode === "number" ? response.statusCode : undefined,
          contentType: typeof response.contentType === "string" ? response.contentType : undefined,
          encoding: typeof response.encoding === "string" ? response.encoding : undefined,
        }) as JsonObject,
      }],
    };
  },
);

export const firecrawlLoaderTool = defineTool<FirecrawlLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "firecrawl_load",
    description: "Load Firecrawl scrape, crawl, or map results into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to scrape, crawl, or map." },
        apiKey: { description: "Firecrawl API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.firecrawl.dev" },
        mode: { type: "string", enum: ["scrape", "crawl", "map"], default: "scrape" },
        params: { type: "object", additionalProperties: true, description: "Firecrawl request parameters." },
        result: {
          type: "object",
          additionalProperties: true,
          description: "Optional already-fetched Firecrawl response to normalize without HTTP.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.result) {
      return { documents: loadFirecrawlDocuments(args.result, args.metadata ?? {}) };
    }
    if (!args.url) {
      throw new Error("firecrawl_load requires url when result is not provided");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "Firecrawl API key");
    const mode = args.mode ?? "scrape";
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.firecrawl.dev")}/v1/${mode}`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: compactObject({
          url: args.url,
          ...(args.params ?? {}),
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadFirecrawlDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        requestedUrl: args.url,
        mode,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const parallelExtractLoaderTool = defineTool<ParallelExtractLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "parallel_extract_load",
    description: "Load Parallel Extract responses or fetched URL content into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        urls: {
          type: "array",
          items: { type: "string" },
          description: "URLs to extract content from when result is not provided.",
        },
        apiKey: { description: "Parallel API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.parallel.ai" },
        objective: { type: "string", description: "Natural-language goal used to focus excerpts." },
        searchQueries: {
          type: "array",
          items: { type: "string" },
          description: "Optional keyword queries used with objective to focus excerpts.",
        },
        maxCharsTotal: { type: "integer", description: "Maximum characters across extracted excerpts." },
        sessionId: { type: "string", description: "Parallel session ID to correlate search and extract calls." },
        clientModel: { type: "string", description: "Model consuming the result, used by Parallel for optimization." },
        excerptSettings: {
          oneOf: [{ type: "boolean" }, { type: "object", additionalProperties: true }],
          description: "Parallel excerpt settings.",
        },
        fullContent: {
          oneOf: [{ type: "boolean" }, { type: "object", additionalProperties: true }],
          description: "Parallel full-content settings.",
        },
        result: {
          type: "object",
          additionalProperties: true,
          description: "Optional already-fetched Parallel Extract response to normalize without HTTP.",
        },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.result) {
      return { documents: loadParallelExtractDocuments(args.result, args.metadata ?? {}), raw: args.result };
    }
    if (!args.urls || args.urls.length === 0) {
      throw new Error("parallel_extract_load requires urls when result is not provided");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "Parallel API key");
    const advancedSettings = compactObject({
      excerpt_settings: args.excerptSettings,
      full_content: args.fullContent,
    }) as JsonObject;
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.parallel.ai")}/v1/extract`,
      compactObject({
        method: "POST",
        headers: jsonHeaders({ "x-api-key": apiKey }),
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
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadParallelExtractDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        requestedUrls: args.urls,
      }) as JsonObject),
      raw: response,
    };
  },
);

export const spiderScrapeLoaderTool = defineTool<SpiderScrapeLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "spider_scrape_load",
    description: "Scrape a URL through Spider and load the returned page content.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Target URL to scrape." },
        apiKey: { description: "Spider API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.spider.cloud" },
        returnFormat: { type: "string", enum: ["markdown", "html", "text", "raw"], default: "markdown" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Spider API key");
    const response = await requestJson<Json>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.spider.cloud")}/scrape`,
      compactObject({
        method: "POST",
        headers: jsonHeaders(bearerAuth(apiKey)),
        body: {
          url: args.url,
          return_format: args.returnFormat ?? "markdown",
        },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const results = Array.isArray(response) ? response : [response];
    return {
      documents: results.map((item, index) => ({
        pageContent: contentFromResponse(item),
        metadata: compactObject({
          ...(args.metadata ?? {}),
          source: "spider",
          url: args.url,
          returnFormat: args.returnFormat ?? "markdown",
          sourceIndex: index,
        }) as JsonObject,
      })),
    };
  },
);

export const apifyDatasetItemsLoaderTool = defineTool<ApifyDatasetItemsLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "apify_dataset_items_load",
    description: "Load items from an Apify dataset into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        datasetId: { type: "string", description: "Apify dataset ID." },
        token: { description: "Apify API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.apify.com/v2" },
        clean: { type: "boolean", default: true },
        limit: { type: "integer" },
        offset: { type: "integer" },
        fields: { type: "array", items: { type: "string" } },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["datasetId"],
    },
  },
  async (args, chidori) => {
    const headers = args.token ? bearerAuth(await resolveSecret(args.token, chidori, "Apify token")) : undefined;
    const response = await requestJson<Json>(
      chidori,
      withQuery(`${trimTrailingSlash(args.baseUrl ?? "https://api.apify.com/v2")}/datasets/${encodeURIComponent(args.datasetId)}/items`, {
        clean: args.clean ?? true,
        format: "json",
        limit: args.limit,
        offset: args.offset,
        fields: args.fields?.join(","),
      }),
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const items = Array.isArray(response) ? response : [response];
    return {
      documents: loadJsonItemDocuments(items, "apify", compactObject({
        ...(args.metadata ?? {}),
        datasetId: args.datasetId,
      }) as JsonObject),
    };
  },
);

export const assemblyAiTranscriptLoaderTool = defineTool<AssemblyAiTranscriptLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "assemblyai_transcript_load",
    description: "Load an AssemblyAI transcript by transcript ID.",
    parameters: {
      type: "object",
      properties: {
        transcriptId: { type: "string", description: "AssemblyAI transcript ID." },
        apiKey: { description: "AssemblyAI API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.assemblyai.com/v2" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["transcriptId"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "AssemblyAI API key");
    const response = await requestJson<JsonObject>(
      chidori,
      `${trimTrailingSlash(args.baseUrl ?? "https://api.assemblyai.com/v2")}/transcript/${encodeURIComponent(args.transcriptId)}`,
      compactObject({
        method: "GET",
        headers: { Authorization: apiKey },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadTranscriptDocument(response, "assemblyai", compactObject({
        ...(args.metadata ?? {}),
        transcriptId: args.transcriptId,
      }) as JsonObject),
    };
  },
);

export const sonixTranscriptLoaderTool = defineTool<SonixTranscriptLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "sonix_transcript_load",
    description: "Load a Sonix transcript by media ID.",
    parameters: {
      type: "object",
      properties: {
        mediaId: { type: "string", description: "Sonix media ID." },
        apiKey: { description: "Sonix API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sonix.ai/v1" },
        format: { type: "string", enum: ["json", "srt", "txt"], default: "json" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["mediaId"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Sonix API key");
    const format = args.format ?? "json";
    const suffix = format === "json" ? "" : `.${format}`;
    const response = await chidori.http(
      `${trimTrailingSlash(args.baseUrl ?? "https://api.sonix.ai/v1")}/media/${encodeURIComponent(args.mediaId)}/transcript${suffix}`,
      compactObject({
        method: "GET",
        headers: bearerAuth(apiKey),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Sonix: ${detail}`);
    }
    const documents = isJsonObject(response.body)
      ? loadTranscriptDocument(response.body, "sonix", args.metadata ?? {})
      : loadTextDocument(typeof response.body === "string" ? response.body : stringifyDocumentValue(response.body), args.metadata ?? {});
    return {
      documents: documents.map((document) => ({
        pageContent: document.pageContent,
        metadata: compactObject({
          ...document.metadata,
          source: "sonix",
          mediaId: args.mediaId,
          format,
        }) as JsonObject,
      })),
    };
  },
);

export const sonioxTranscriptLoaderTool = defineTool<SonioxTranscriptLoaderArgs, { documents: ChidoriDocument[]; raw?: JsonObject }>(
  {
    name: "soniox_transcript_load",
    description: "Load a Soniox async transcript from a transcript response, transcription ID, audio URL, or file ID.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Soniox API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.soniox.com/v1" },
        transcriptionId: { type: "string", description: "Existing Soniox transcription ID." },
        audioUrl: { type: "string", description: "Public audio URL to submit for transcription." },
        fileId: { type: "string", description: "Soniox uploaded file ID to submit for transcription." },
        model: { type: "string", default: "stt-async-v4" },
        options: { type: "object", additionalProperties: true, description: "Additional Soniox create-transcription parameters." },
        transcript: { type: "object", additionalProperties: true, description: "Already fetched transcript response to normalize without HTTP." },
        waitForCompletion: { type: "boolean", default: true },
        pollingIntervalMs: { type: "integer", default: 1000 },
        pollingTimeoutMs: { type: "integer", default: 180000 },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (args.transcript) {
      return {
        documents: loadSonioxTranscriptDocuments(args.transcript, args.metadata ?? {}),
        raw: args.transcript,
      };
    }

    const apiKey = await resolveSecret(args.apiKey, chidori, "Soniox API key");
    const baseUrl = sonioxApiBaseUrl(args.baseUrl);
    const headers = jsonHeaders(bearerAuth(apiKey));
    let transcriptionId = args.transcriptionId;
    let transcription: JsonObject | undefined;

    if (!transcriptionId) {
      if (!args.audioUrl && !args.fileId) {
        throw new Error("Either transcript, transcriptionId, audioUrl, or fileId is required");
      }
      transcription = await requestJson<JsonObject>(
        chidori,
        `${baseUrl}/transcriptions`,
        compactObject({
          method: "POST",
          headers,
          body: compactObject({
            ...(args.options ?? {}),
            model: args.model ?? "stt-async-v4",
            audio_url: args.audioUrl,
            file_id: args.fileId,
          }) as JsonObject,
          timeoutMs: args.timeoutMs,
        }) as ChidoriHttpRequestOptions,
      );
      transcriptionId = sonioxTranscriptId(transcription);
      if (!transcriptionId) {
        throw new Error("Soniox create transcription response did not include an id");
      }
      if (args.waitForCompletion === false) {
        return {
          documents: loadSonioxTranscriptDocuments(transcription, compactObject({
            ...(args.metadata ?? {}),
            transcriptionId,
          }) as JsonObject),
          raw: transcription,
        };
      }
    }

    if (args.waitForCompletion !== false) {
      transcription = await pollSonioxTranscription(chidori, baseUrl, transcriptionId, headers, args);
    }

    const transcript = await requestJson<JsonObject>(
      chidori,
      `${baseUrl}/transcriptions/${encodeURIComponent(transcriptionId)}/transcript`,
      compactObject({
        method: "GET",
        headers,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSonioxTranscriptDocuments(transcript, compactObject({
        ...(args.metadata ?? {}),
        transcriptionId,
        model: typeof transcription?.model === "string" ? transcription.model : args.model,
        status: sonioxTranscriptStatus(transcription ?? transcript),
        audioUrl: typeof transcription?.audio_url === "string" ? transcription.audio_url : args.audioUrl,
        fileId: typeof transcription?.file_id === "string" ? transcription.file_id : args.fileId,
      }) as JsonObject),
      raw: transcript,
    };
  },
);

export const hackerNewsItemLoaderTool = defineTool<HackerNewsItemLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "hacker_news_item_load",
    description: "Load a Hacker News item and nested comments from the official Firebase API.",
    parameters: {
      type: "object",
      properties: {
        itemId: { type: "integer", description: "Hacker News item ID." },
        baseUrl: { type: "string", default: "https://hacker-news.firebaseio.com/v0" },
        maxDepth: { type: "integer", default: 2 },
        maxItems: { type: "integer", default: 50 },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["itemId"],
    },
  },
  async (args, chidori) => {
    const items = await fetchHackerNewsItems(chidori, args);
    return {
      documents: loadHackerNewsThreadDocuments(items, compactObject({
        ...(args.metadata ?? {}),
        itemId: args.itemId,
      }) as JsonObject),
    };
  },
);

export const gitBookPageLoaderTool = defineTool<GitBookPageLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "gitbook_page_load",
    description: "Load a GitBook space page by page ID.",
    parameters: {
      type: "object",
      properties: {
        spaceId: { type: "string", description: "GitBook space ID." },
        pageId: { type: "string", description: "GitBook page ID." },
        accessToken: { description: "GitBook access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.gitbook.com/v1" },
        format: { type: "string", enum: ["markdown", "document"], default: "markdown" },
        evaluated: { description: "GitBook evaluation mode: true, false, or deterministic-only." },
        includeMetadata: { type: "boolean", default: true },
        computed: { type: "boolean", default: true },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["spaceId", "pageId"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "GitBook access token");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${gitBookApiBaseUrl(args.baseUrl)}/spaces/${encodeURIComponent(args.spaceId)}/content/page/${encodeURIComponent(args.pageId)}`, {
        format: args.format ?? "markdown",
        evaluated: args.evaluated,
        metadata: args.includeMetadata,
        computed: args.computed,
      }),
      compactObject({
        method: "GET",
        headers: bearerAuth(accessToken),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadGitBookPageDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        spaceId: args.spaceId,
        pageId: args.pageId,
      }) as JsonObject),
    };
  },
);

export const taskadeProjectTasksLoaderTool = defineTool<TaskadeProjectTasksLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "taskade_project_tasks_load",
    description: "Load Taskade project tasks into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        projectId: { type: "string", description: "Taskade project ID." },
        accessToken: { description: "Taskade OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.taskade.com/api/v1" },
        limit: { type: "integer", default: 100 },
        after: { type: "string", description: "Task ID cursor to fetch results after." },
        before: { type: "string", description: "Task ID cursor to fetch results before." },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["projectId"],
    },
  },
  async (args, chidori) => {
    const accessToken = await resolveSecret(args.accessToken, chidori, "Taskade access token");
    const response = await requestJson<Json>(
      chidori,
      withQuery(`${taskadeApiBaseUrl(args.baseUrl)}/projects/${encodeURIComponent(args.projectId)}/tasks`, {
        limit: args.limit,
        after: args.after,
        before: args.before,
      }),
      compactObject({
        method: "GET",
        headers: bearerAuth(accessToken),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadTaskadeTaskDocuments(tasksFromResponse(response), compactObject({
        ...(args.metadata ?? {}),
        projectId: args.projectId,
      }) as JsonObject),
    };
  },
);

export const supadataTranscriptLoaderTool = defineTool<SupadataTranscriptLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "supadata_transcript_load",
    description: "Load a Supadata transcript for YouTube, TikTok, Instagram, X/Twitter, Facebook, or file media.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Supported media URL. Required unless jobId is provided." },
        jobId: { type: "string", description: "Supadata transcript job ID to fetch results for." },
        apiKey: { description: "Supadata API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.supadata.ai/v1" },
        lang: { type: "string", description: "Preferred ISO 639-1 transcript language." },
        text: { type: "boolean", default: true },
        chunkSize: { type: "integer", description: "Maximum characters per transcript chunk when text is false." },
        mode: { type: "string", enum: ["native", "auto", "generate"], default: "auto" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    if (!args.url && !args.jobId) {
      throw new Error("supadata_transcript_load requires url or jobId");
    }
    const apiKey = await resolveSecret(args.apiKey, chidori, "Supadata API key");
    const baseUrl = supadataApiBaseUrl(args.baseUrl);
    const requestUrl = args.jobId
      ? `${baseUrl}/transcript/${encodeURIComponent(args.jobId)}`
      : withQuery(`${baseUrl}/transcript`, {
        url: args.url,
        lang: args.lang,
        text: args.text ?? true,
        chunkSize: args.chunkSize,
        mode: args.mode ?? "auto",
      });
    const response = await requestJson<JsonObject>(chidori, requestUrl, compactObject({
      method: "GET",
      headers: { "x-api-key": apiKey },
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    return {
      documents: loadSupadataTranscriptDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        url: args.url,
        jobId: args.jobId,
      }) as JsonObject),
    };
  },
);

export const supadataMetadataLoaderTool = defineTool<SupadataMetadataLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "supadata_metadata_load",
    description: "Load unified metadata for supported Supadata media URLs.",
    parameters: {
      type: "object",
      properties: {
        url: { type: "string", description: "Supported media URL." },
        apiKey: { description: "Supadata API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.supadata.ai/v1" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["url"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Supadata API key");
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${supadataApiBaseUrl(args.baseUrl)}/metadata`, { url: args.url }),
      compactObject({
        method: "GET",
        headers: { "x-api-key": apiKey },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadSupadataMetadataDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        url: args.url,
      }) as JsonObject),
    };
  },
);

export const iFixitGuidesLoaderTool = defineTool<IFixitGuidesLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "ifixit_guides_load",
    description: "Load public iFixit repair guide summaries into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        guideIds: {
          type: "array",
          items: {
            anyOf: [{ type: "integer" }, { type: "string" }],
          },
          description: "Optional guide IDs to fetch as a comma-delimited iFixit guideids query.",
        },
        filter: {
          type: "string",
          enum: ["replacement", "installation", "repair", "disassembly", "teardown", "technique", "maintenance"],
          description: "Guide type filter.",
        },
        order: { type: "string", enum: ["ASC", "DESC"], default: "ASC" },
        limit: { type: "integer", default: 20, description: "Maximum number of guides to return. iFixit allows 1 to 200." },
        offset: { type: "integer", default: 0 },
        modifiedSince: { type: "integer", description: "Earliest modified date as a UNIX timestamp." },
        includePrivate: { type: "boolean", description: "Only works when the caller provides an authenticated iFixit runtime/proxy." },
        baseUrl: { type: "string", default: "https://www.ifixit.com/api/2.0" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    const response = await requestJson<Json>(
      chidori,
      withQuery(`${iFixitApiBaseUrl(args.baseUrl)}/guides`, {
        guideids: args.guideIds && args.guideIds.length > 0 ? args.guideIds.join(",") : undefined,
        filter: args.filter,
        order: args.order,
        limit: args.limit,
        offset: args.offset,
        modifiedSince: args.modifiedSince,
        includePrivate: args.includePrivate,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const guides = Array.isArray(response)
      ? response
      : isJsonObject(response) && Array.isArray(response.guides)
        ? response.guides
        : isJsonObject(response)
          ? [response]
          : [];
    return {
      documents: loadIFixitGuideListDocuments(guides, compactObject(args.metadata ?? {}) as JsonObject),
    };
  },
);

export const iFixitGuideLoaderTool = defineTool<IFixitGuideLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "ifixit_guide_load",
    description: "Load a full iFixit repair guide, including introduction, tools, parts, steps, and conclusion.",
    parameters: {
      type: "object",
      properties: {
        guideId: { description: "iFixit guide ID.", anyOf: [{ type: "integer" }, { type: "string" }] },
        excludePrerequisiteSteps: { type: "boolean", description: "Exclude inlined prerequisite guide steps." },
        unpatrolled: { type: "boolean", description: "Include unpatrolled edits when authorized by iFixit." },
        langId: { type: "string", description: "Language ID, for example en, de, it, or fr." },
        baseUrl: { type: "string", default: "https://www.ifixit.com/api/2.0" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["guideId"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${iFixitApiBaseUrl(args.baseUrl)}/guides/${encodeURIComponent(String(args.guideId))}`, {
        excludePrerequisiteSteps: args.excludePrerequisiteSteps,
        unpatrolled: args.unpatrolled,
        langid: args.langId,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadIFixitGuideDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        guideId: args.guideId,
      }) as JsonObject),
    };
  },
);

export const iFixitWikiLoaderTool = defineTool<IFixitWikiLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "ifixit_wiki_load",
    description: "Load an iFixit wiki or device page into Chidori documents.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "iFixit wiki title, for example iPhone 4." },
        namespace: {
          type: "string",
          enum: ["WIKI", "CATEGORY", "INFO", "ITEM", "USER", "TEAM"],
          default: "CATEGORY",
        },
        unpatrolled: { type: "boolean", description: "Include unpatrolled edits when authorized by iFixit." },
        langId: { type: "string", description: "Language ID, for example en, de, it, or fr." },
        baseUrl: { type: "string", default: "https://www.ifixit.com/api/2.0" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["title"],
    },
  },
  async (args, chidori) => {
    const namespace = args.namespace ?? "CATEGORY";
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${iFixitApiBaseUrl(args.baseUrl)}/wikis/${encodeURIComponent(namespace)}/${encodePathSegments(args.title)}`, {
        unpatrolled: args.unpatrolled,
        langid: args.langId,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadIFixitWikiDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        namespace,
        title: args.title,
      }) as JsonObject),
    };
  },
);

export const iFixitSuggestLoaderTool = defineTool<IFixitSuggestLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "ifixit_suggest_load",
    description: "Load iFixit suggestion results for guides, devices, categories, and questions.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Partial or full iFixit search query." },
        docTypes: {
          type: "array",
          items: { type: "string", enum: ["guide", "device", "category", "question", "all"] },
          description: "Suggestion result types. Defaults to all.",
        },
        baseUrl: { type: "string", default: "https://www.ifixit.com/api/2.0" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      withQuery(`${iFixitApiBaseUrl(args.baseUrl)}/suggest/${encodeURIComponent(args.query)}`, {
        doctypes: args.docTypes && args.docTypes.length > 0 ? args.docTypes.join(",") : undefined,
      }),
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    const results = Array.isArray(response.results) ? response.results : [];
    return {
      documents: loadIFixitSuggestionDocuments(results, compactObject({
        ...(args.metadata ?? {}),
        query: typeof response.query === "string" ? response.query : args.query,
      }) as JsonObject),
    };
  },
);

export const iFixitDocumentLoaderTool = defineTool<IFixitDocumentLoaderArgs, { documents: ChidoriDocument[] }>(
  {
    name: "ifixit_document_load",
    description: "Load iFixit document metadata, including title, summary, file details, thumbnails, and download URLs.",
    parameters: {
      type: "object",
      properties: {
        documentIdOrGuid: {
          description: "iFixit document ID or GUID.",
          anyOf: [{ type: "integer" }, { type: "string" }],
        },
        baseUrl: { type: "string", default: "https://www.ifixit.com/api/2.0" },
        metadata: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["documentIdOrGuid"],
    },
  },
  async (args, chidori) => {
    const response = await requestJson<JsonObject>(
      chidori,
      `${iFixitApiBaseUrl(args.baseUrl)}/documents/${encodeURIComponent(String(args.documentIdOrGuid))}`,
      compactObject({
        method: "GET",
        headers: { accept: "application/json" },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    return {
      documents: loadIFixitDocumentDocuments(response, compactObject({
        ...(args.metadata ?? {}),
        documentIdOrGuid: args.documentIdOrGuid,
      }) as JsonObject),
    };
  },
);

export const loaderTools = {
  httpDocumentLoader: httpDocumentLoaderTool,
  jsonDocumentLoader: jsonDocumentLoaderTool,
  textDocumentLoader: textDocumentLoaderTool,
  subtitleDocumentLoader: subtitleDocumentLoaderTool,
  youtubeTranscriptLoader: youtubeTranscriptLoaderTool,
  chatGptExportLoader: chatGptExportLoaderTool,
  slackConversationLoader: slackConversationLoaderTool,
  discordChannelMessagesLoader: discordChannelMessagesLoaderTool,
  githubRepositoryLoader: githubRepositoryLoaderTool,
  serpApiSearchLoader: serpApiSearchLoaderTool,
  searchApiSearchLoader: searchApiSearchLoaderTool,
  salesforceSoqlLoader: salesforceSoqlLoaderTool,
  hubSpotCrmObjectsLoader: hubSpotCrmObjectsLoaderTool,
  stripeResourceLoader: stripeResourceLoaderTool,
  shopifyResourceLoader: shopifyResourceLoaderTool,
  zendeskSupportLoader: zendeskSupportLoaderTool,
  typeformResourceLoader: typeformResourceLoaderTool,
  serviceNowTableRecordsLoader: serviceNowTableRecordsLoaderTool,
  jsonLinesDocumentLoader: jsonLinesDocumentLoaderTool,
  csvDocumentLoader: csvDocumentLoaderTool,
  htmlDocumentLoader: htmlDocumentLoaderTool,
  cheerioWebLoader: cheerioWebLoaderTool,
  recursiveUrlLoader: recursiveUrlLoaderTool,
  markdownDocumentLoader: markdownDocumentLoaderTool,
  notionMarkdownExportLoader: notionMarkdownExportLoaderTool,
  imsdbScriptLoader: imsdbScriptLoaderTool,
  collegeConfidentialLoader: collegeConfidentialLoaderTool,
  sitemapDocumentLoader: sitemapDocumentLoaderTool,
  rssFeedLoader: rssFeedLoaderTool,
  notionBlocksLoader: notionBlocksLoaderTool,
  googleDriveFileLoader: googleDriveFileLoaderTool,
  googleCloudStorageObjectLoader: googleCloudStorageObjectLoaderTool,
  azureBlobFileLoader: azureBlobFileLoaderTool,
  awsS3ObjectLoader: awsS3ObjectLoaderTool,
  dropboxFileLoader: dropboxFileLoaderTool,
  documentParseApiLoader: documentParseApiLoaderTool,
  airtableRecordsLoader: airtableRecordsLoaderTool,
  figmaFileLoader: figmaFileLoaderTool,
  jiraIssuesLoader: jiraIssuesLoaderTool,
  confluencePagesLoader: confluencePagesLoaderTool,
  browserbaseFetchLoader: browserbaseFetchLoaderTool,
  firecrawlLoader: firecrawlLoaderTool,
  parallelExtractLoader: parallelExtractLoaderTool,
  spiderScrapeLoader: spiderScrapeLoaderTool,
  apifyDatasetItemsLoader: apifyDatasetItemsLoaderTool,
  assemblyAiTranscriptLoader: assemblyAiTranscriptLoaderTool,
  sonixTranscriptLoader: sonixTranscriptLoaderTool,
  sonioxTranscriptLoader: sonioxTranscriptLoaderTool,
  hackerNewsItemLoader: hackerNewsItemLoaderTool,
  gitBookPageLoader: gitBookPageLoaderTool,
  taskadeProjectTasksLoader: taskadeProjectTasksLoaderTool,
  supadataTranscriptLoader: supadataTranscriptLoaderTool,
  supadataMetadataLoader: supadataMetadataLoaderTool,
  iFixitGuidesLoader: iFixitGuidesLoaderTool,
  iFixitGuideLoader: iFixitGuideLoaderTool,
  iFixitWikiLoader: iFixitWikiLoaderTool,
  iFixitSuggestLoader: iFixitSuggestLoaderTool,
  iFixitDocumentLoader: iFixitDocumentLoaderTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getLoaderEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "GITHUB_TOKEN", description: "GitHub token." },
    { name: "ZENDESK_OAUTH_TOKEN", description: "Zendesk OAuth token." },
    { name: "ZENDESK_API_TOKEN", description: "Zendesk API token." },
    { name: "SERVICENOW_OAUTH_TOKEN", description: "ServiceNow OAuth token." },
    { name: "SERVICENOW_PASSWORD", description: "ServiceNow password." },
    { name: "SLACK_TOKEN", description: "Slack token." },
    { name: "DISCORD_BOT_TOKEN", description: "Discord bot token." },
    { name: "SERPAPI_API_KEY", description: "SerpApi API key." },
    { name: "SEARCHAPI_API_KEY", description: "SearchApi API key." },
    { name: "SALESFORCE_ACCESS_TOKEN", description: "Salesforce access token." },
    { name: "HUBSPOT_PRIVATE_APP_TOKEN", description: "HubSpot private app token." },
    { name: "STRIPE_API_KEY", description: "Stripe API key." },
    { name: "SHOPIFY_ADMIN_ACCESS_TOKEN", description: "Shopify Admin API access token." },
    { name: "TYPEFORM_ACCESS_TOKEN", description: "Typeform personal access token." },
    { name: "NOTION_API_KEY", description: "Notion API key." },
    { name: "GOOGLE_OAUTH_ACCESS_TOKEN", description: "Google OAuth access token." },
    { name: "AZURE_BLOB_SAS_TOKEN", description: "Azure Blob SAS token." },
    { name: "AZURE_ACCESS_TOKEN", description: "Azure access token." },
    { name: "DROPBOX_ACCESS_TOKEN", description: "Dropbox OAuth access token." },
    { name: "DOCUMENT_PARSER_API_KEY", description: "Document parser API key." },
    { name: "AIRTABLE_TOKEN", description: "Airtable token." },
    { name: "FIGMA_TOKEN", description: "Figma token." },
    { name: "JIRA_ACCESS_TOKEN", description: "Jira access token." },
    { name: "CONFLUENCE_ACCESS_TOKEN", description: "Confluence access token." },
    { name: "BROWSERBASE_API_KEY", description: "Browserbase API key." },
    { name: "FIRECRAWL_API_KEY", description: "Firecrawl API key." },
    { name: "PARALLEL_API_KEY", description: "Parallel API key." },
    { name: "SPIDER_API_KEY", description: "Spider API key." },
    { name: "APIFY_TOKEN", description: "Apify token." },
    { name: "ASSEMBLYAI_API_KEY", description: "AssemblyAI API key." },
    { name: "SONIX_API_KEY", description: "Sonix API key." },
    { name: "SONIOX_API_KEY", description: "Soniox API key." },
    { name: "GITBOOK_ACCESS_TOKEN", description: "GitBook access token." },
    { name: "TASKADE_ACCESS_TOKEN", description: "Taskade access token." },
    { name: "SUPADATA_API_KEY", description: "Supadata API key." },
  ];
}

export const loaderIntegrationSpec = {
  environmentVariables: getLoaderEnvironmentVariables,
} satisfies IntegrationSpec;
