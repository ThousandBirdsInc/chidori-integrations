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

export interface PineconeVector {
  id: string;
  values: number[];
  metadata?: JsonObject;
}

export interface PineconeUpsertArgs {
  indexHost: string;
  apiKey?: SecretInput;
  namespace?: string;
  vectors: PineconeVector[];
}

export interface PineconeQueryArgs {
  indexHost: string;
  apiKey?: SecretInput;
  namespace?: string;
  vector?: number[];
  id?: string;
  topK?: number;
  filter?: JsonObject;
  includeMetadata?: boolean;
  includeValues?: boolean;
}

export interface PineconeEmbeddingsArgs {
  inputs: Array<string | JsonObject>;
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  parameters?: JsonObject;
  apiVersion?: string;
  extraBody?: JsonObject;
}

export interface PineconeRerankArgs {
  query: string;
  documents: JsonObject[];
  apiKey?: SecretInput;
  model?: string;
  baseUrl?: string;
  topN?: number;
  returnDocuments?: boolean;
  rankFields?: string[];
  parameters?: JsonObject;
  extraBody?: JsonObject;
}

export interface QdrantPoint {
  id: string | number;
  vector: number[] | Record<string, number[]>;
  payload?: JsonObject;
}

export interface QdrantUpsertArgs {
  baseUrl: string;
  collection: string;
  apiKey?: SecretInput;
  wait?: boolean;
  points: QdrantPoint[];
}

export interface QdrantSearchArgs {
  baseUrl: string;
  collection: string;
  apiKey?: SecretInput;
  vector: number[] | Record<string, number[]>;
  limit?: number;
  filter?: JsonObject;
  withPayload?: boolean;
  withVector?: boolean;
}

export interface WeaviateObject {
  class: string;
  properties: JsonObject;
  id?: string;
  vector?: number[];
}

export interface WeaviateBatchObjectsArgs {
  baseUrl: string;
  apiKey?: SecretInput;
  objects: WeaviateObject[];
  consistencyLevel?: "ONE" | "QUORUM" | "ALL";
}

export interface WeaviateGraphQLArgs {
  baseUrl: string;
  apiKey?: SecretInput;
  query: string;
  variables?: JsonObject;
}

export interface MilvusInsertArgs {
  baseUrl: string;
  token?: SecretInput;
  dbName?: string;
  collectionName: string;
  partitionName?: string;
  data: JsonObject | JsonObject[];
}

export interface MilvusSearchArgs {
  baseUrl: string;
  token?: SecretInput;
  dbName?: string;
  collectionName: string;
  partitionName?: string;
  data: number[][];
  annsField?: string;
  limit?: number;
  filter?: string;
  outputFields?: string[];
  searchParams?: JsonObject;
}

export interface ChromaUpsertArgs {
  baseUrl: string;
  collectionId: string;
  tenant?: string;
  database?: string;
  apiKey?: SecretInput;
  ids: string[];
  embeddings?: number[][];
  metadatas?: JsonObject[];
  documents?: string[];
  uris?: string[];
}

export interface ChromaQueryArgs {
  baseUrl: string;
  collectionId: string;
  tenant?: string;
  database?: string;
  apiKey?: SecretInput;
  queryEmbeddings?: number[][];
  queryTexts?: string[];
  nResults?: number;
  where?: JsonObject;
  whereDocument?: JsonObject;
  include?: string[];
}

export interface MongoAtlasVectorSearchArgs {
  endpoint: string;
  apiKey?: SecretInput;
  dataSource?: string;
  database?: string;
  collection?: string;
  index: string;
  path: string;
  queryVector: number[];
  limit?: number;
  numCandidates?: number;
  filter?: JsonObject;
  project?: JsonObject;
}

export interface UpstashVector {
  id: string;
  vector?: number[];
  sparseVector?: JsonObject;
  metadata?: JsonObject;
  data?: string;
}

export interface UpstashVectorUpsertArgs {
  restUrl: string;
  token?: SecretInput;
  namespace?: string;
  vectors: UpstashVector | UpstashVector[];
}

export interface UpstashVectorQueryArgs {
  restUrl: string;
  token?: SecretInput;
  namespace?: string;
  vector?: number[];
  sparseVector?: JsonObject;
  topK?: number;
  includeMetadata?: boolean;
  includeVectors?: boolean;
  includeData?: boolean;
  filter?: string;
  weightingStrategy?: "IDF";
  fusionAlgorithm?: "RRF" | "DBSF";
}

export interface CloudflareVectorizeVector {
  id: string;
  values: number[];
  metadata?: JsonObject;
  namespace?: string;
}

export interface CloudflareVectorizeUpsertArgs {
  accountId: string;
  indexName: string;
  apiToken?: SecretInput;
  apiBaseUrl?: string;
  vectors: CloudflareVectorizeVector[];
  unparsableBehavior?: "error" | "discard";
}

export interface CloudflareVectorizeQueryArgs {
  accountId: string;
  indexName: string;
  apiToken?: SecretInput;
  apiBaseUrl?: string;
  vector: number[];
  topK?: number;
  filter?: JsonObject;
  returnMetadata?: "none" | "indexed" | "all";
  returnValues?: boolean;
}

export interface AzureAISearchUploadArgs {
  endpoint: string;
  indexName: string;
  apiKey?: SecretInput;
  apiVersion?: string;
  documents: JsonObject[];
  action?: "upload" | "merge" | "mergeOrUpload" | "delete";
}

export interface AzureAISearchVectorSearchArgs {
  endpoint: string;
  indexName: string;
  apiKey?: SecretInput;
  apiVersion?: string;
  search?: string;
  vectorQueries?: JsonObject[];
  vector?: number[];
  fields?: string;
  kNearestNeighbors?: number;
  filter?: string;
  select?: string;
  top?: number;
  count?: boolean;
  queryType?: "simple" | "full" | "semantic";
  semanticConfiguration?: string;
}

export interface AzionEdgeSqlDocumentInput {
  id?: string | number;
  pageContent: string;
  embedding?: number[];
  metadata?: JsonObject;
}

export interface AzionEdgeSqlVectorsAddArgs {
  databaseId: string;
  table: string;
  token?: SecretInput;
  baseUrl?: string;
  documents?: AzionEdgeSqlDocumentInput[];
  rows?: JsonObject[];
  idColumn?: string;
  contentColumn?: string;
  vectorColumn?: string;
  conflictMode?: "replace" | "ignore" | "insert";
  timeoutMs?: number;
}

export interface AzionEdgeSqlVectorSearchArgs {
  databaseId: string;
  table: string;
  token?: SecretInput;
  baseUrl?: string;
  queryVector: number[];
  vectorIndex?: string;
  idColumn?: string;
  contentColumn?: string;
  metadataColumns?: string[];
  topK?: number;
  where?: string;
  statement?: string;
  timeoutMs?: number;
}

export interface AzionEdgeSqlDeleteArgs {
  databaseId: string;
  table: string;
  token?: SecretInput;
  baseUrl?: string;
  ids: Array<string | number>;
  idColumn?: string;
  timeoutMs?: number;
}

export interface SearchEngineIndexDocumentArgs {
  baseUrl: string;
  index: string;
  id?: string;
  document: JsonObject;
  authorization?: SecretInput;
  apiKey?: SecretInput;
  refresh?: boolean | "wait_for";
}

export interface ElasticsearchKnnSearchArgs {
  baseUrl: string;
  index: string;
  field: string;
  queryVector: number[];
  k?: number;
  numCandidates?: number;
  filter?: JsonObject | JsonObject[];
  source?: boolean | JsonObject;
  size?: number;
  authorization?: SecretInput;
  apiKey?: SecretInput;
}

export interface OpenSearchKnnSearchArgs {
  baseUrl: string;
  index: string;
  field: string;
  vector: number[];
  k?: number;
  filter?: JsonObject;
  methodParameters?: JsonObject;
  source?: boolean | JsonObject;
  size?: number;
  authorization?: SecretInput;
  apiKey?: SecretInput;
}

export interface ClickHouseInsertArgs {
  baseUrl: string;
  table: string;
  rows: JsonObject[];
  database?: string;
  username?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  queryParameters?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export interface ClickHouseVectorSearchArgs {
  baseUrl: string;
  table: string;
  vectorColumn: string;
  queryVector: number[];
  database?: string;
  username?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  selectColumns?: string[];
  distanceAlias?: string;
  distanceFunction?: "cosineDistance" | "L2Distance";
  where?: string;
  limit?: number;
  queryParameters?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export interface ClickHouseDeleteArgs {
  baseUrl: string;
  table: string;
  idColumn: string;
  ids: Array<string | number>;
  database?: string;
  username?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  queryParameters?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export interface AzureCosmosDbNoSqlAuthArgs {
  accountEndpoint: string;
  databaseId: string;
  containerId: string;
  authorization?: SecretInput;
  xMsDate?: string;
  xMsVersion?: string;
  consistencyLevel?: "Strong" | "Bounded" | "Session" | "Eventual" | "ConsistentPrefix";
  sessionToken?: string;
  activityId?: string;
  partitionKey?: Json[];
  timeoutMs?: number;
}

export interface AzureCosmosDbNoSqlDocumentUpsertArgs extends AzureCosmosDbNoSqlAuthArgs {
  document: JsonObject;
  indexingDirective?: "Include" | "Exclude";
  preTriggerInclude?: string;
  postTriggerInclude?: string;
  queryParameters?: Record<string, string | number | boolean>;
}

export interface AzureCosmosDbNoSqlQueryArgs extends AzureCosmosDbNoSqlAuthArgs {
  query: string;
  parameters?: Array<{ name: string; value: Json }>;
  enableCrossPartition?: boolean;
  maxItemCount?: number;
  continuation?: string;
  populateQueryMetrics?: boolean;
  populateIndexMetrics?: boolean;
  queryParameters?: Record<string, string | number | boolean>;
}

export interface AzureCosmosDbNoSqlDocumentDeleteArgs extends AzureCosmosDbNoSqlAuthArgs {
  documentId: string;
  ifMatch?: string;
  queryParameters?: Record<string, string | number | boolean>;
}

export interface TurbopufferWriteArgs {
  namespace: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  upsertRows?: JsonObject[];
  upsertColumns?: JsonObject;
  patchRows?: JsonObject[];
  patchColumns?: JsonObject;
  deletes?: Array<string | number>;
  deleteByFilter?: Json;
  patchByFilter?: JsonObject;
  upsertCondition?: Json;
  patchCondition?: Json;
  deleteCondition?: Json;
  returnAffectedIds?: boolean;
  distanceMetric?: "cosine_distance" | "euclidean_squared";
  schema?: JsonObject;
  disableBackpressure?: boolean;
}

export interface TurbopufferQueryArgs {
  namespace: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  rankBy?: Json;
  vector?: number[];
  vectorField?: string;
  aggregateBy?: JsonObject;
  filters?: Json;
  limit?: number | JsonObject;
  includeAttributes?: string[] | boolean;
  groupBy?: string[];
  consistency?: JsonObject;
}

export interface TypesenseDocumentsImportArgs {
  baseUrl: string;
  collection: string;
  apiKey?: SecretInput;
  documents: JsonObject[];
  action?: "create" | "update" | "upsert" | "emplace";
  batchSize?: number;
  dirtyValues?: "coerce_or_reject" | "coerce_or_drop" | "drop" | "reject";
  returnId?: boolean;
  returnDoc?: boolean;
}

export interface TypesenseVectorSearchArgs {
  baseUrl: string;
  collection: string;
  apiKey?: SecretInput;
  q?: string;
  queryBy?: string;
  vectorQuery?: string;
  vectorField?: string;
  vector?: number[];
  documentId?: string;
  k?: number;
  filterBy?: string;
  sortBy?: string;
  perPage?: number;
  page?: number;
  includeFields?: string;
  excludeFields?: string;
  prefix?: boolean | string;
  exhaustiveSearch?: boolean;
  searchParameters?: JsonObject;
  queryParameters?: JsonObject;
}

export interface SupabaseVectorUpsertArgs {
  projectUrl: string;
  tableName?: string;
  serviceRoleKey?: SecretInput;
  rows: JsonObject[];
  onConflict?: string;
  ignoreDuplicates?: boolean;
  returnRepresentation?: boolean;
  schema?: string;
  queryParameters?: JsonObject;
}

export interface SupabaseVectorMatchArgs {
  projectUrl: string;
  queryName?: string;
  serviceRoleKey?: SecretInput;
  queryEmbedding: number[];
  matchCount?: number;
  filter?: JsonObject;
  rpcArgs?: JsonObject;
  schema?: string;
}

export interface AstraDbInsertManyArgs {
  apiEndpoint: string;
  keyspace: string;
  collection: string;
  token?: SecretInput;
  documents: JsonObject[];
  ordered?: boolean;
  timeoutMs?: number;
}

export interface AstraDbFindArgs {
  apiEndpoint: string;
  keyspace: string;
  collection: string;
  token?: SecretInput;
  filter?: JsonObject;
  sort?: JsonObject;
  vector?: number[];
  vectorize?: string;
  projection?: JsonObject;
  limit?: number;
  skip?: number;
  includeSimilarity?: boolean;
  includeSortVector?: boolean;
  timeoutMs?: number;
}

export interface VectaraDocumentIndexArgs {
  corpusKey: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  document: JsonObject;
  timeoutMs?: number;
}

export interface VectaraCorpusQueryArgs {
  corpusKey: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  query: string;
  metadataFilter?: string;
  lexicalInterpolation?: number;
  customDimensions?: JsonObject;
  limit?: number;
  offset?: number;
  contextConfiguration?: JsonObject;
  reranker?: JsonObject;
  generation?: JsonObject | null;
  streamResponse?: boolean;
  search?: JsonObject;
  timeoutMs?: number;
}

export interface XataDocumentInput {
  pageContent: string;
  metadata?: JsonObject;
}

export interface XataVectorsAddArgs {
  databaseUrl: string;
  table: string;
  apiKey?: SecretInput;
  documents?: XataDocumentInput[];
  vectors?: number[][];
  records?: JsonObject[];
  ids?: string[];
  contentColumn?: string;
  vectorColumn?: string;
  createOnly?: boolean;
  ifVersion?: number;
  columns?: string[];
  timeoutMs?: number;
}

export interface XataVectorSearchArgs {
  databaseUrl: string;
  table: string;
  apiKey?: SecretInput;
  column?: string;
  queryVector: number[];
  similarityFunction?: "cosineSimilarity" | "l1" | "l2" | string;
  size?: number;
  filter?: JsonObject;
  timeoutMs?: number;
}

export interface CouchbaseSearchQueryArgs {
  baseUrl: string;
  bucket: string;
  scope: string;
  indexName: string;
  authorization?: SecretInput;
  username?: SecretInput;
  password?: SecretInput;
  fields?: string[];
  query?: JsonObject;
  vectorField?: string;
  vector?: number[];
  k?: number;
  knn?: JsonObject[];
  knnOperator?: "and" | "or";
  size?: number;
  from?: number;
  highlight?: JsonObject;
  sort?: Json[];
  facets?: JsonObject;
  explain?: boolean;
  includeLocations?: boolean;
  ctl?: JsonObject;
  body?: JsonObject;
  timeoutMs?: number;
}

export interface CouchbaseQueryExecuteArgs {
  baseUrl: string;
  authorization?: SecretInput;
  username?: SecretInput;
  password?: SecretInput;
  statement?: string;
  parameters?: Json[];
  namedParameters?: JsonObject;
  queryOptions?: JsonObject;
  body?: JsonObject;
  timeoutMs?: number;
}

export interface MeilisearchDocumentsAddArgs {
  baseUrl: string;
  indexUid: string;
  apiKey?: SecretInput;
  documents: JsonObject[];
  primaryKey?: string;
  update?: boolean;
  timeoutMs?: number;
}

export interface MeilisearchSearchArgs {
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
  attributesToCrop?: string[];
  cropLength?: number;
  cropMarker?: string;
  attributesToHighlight?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  showMatchesPosition?: boolean;
  showRankingScore?: boolean;
  showRankingScoreDetails?: boolean;
  retrieveVectors?: boolean;
  facets?: string[];
  sort?: string[];
  matchingStrategy?: "last" | "all" | "frequency" | string;
  body?: JsonObject;
  timeoutMs?: number;
}

export interface VespaDocumentPutArgs {
  baseUrl: string;
  namespace: string;
  documentType: string;
  documentId: string;
  fields: JsonObject;
  token?: SecretInput;
  headers?: Record<string, string>;
  create?: boolean;
  condition?: string;
  timeoutMs?: number;
}

export interface VespaQueryArgs {
  baseUrl: string;
  token?: SecretInput;
  headers?: Record<string, string>;
  yql?: string;
  query?: string;
  hits?: number;
  offset?: number;
  ranking?: JsonObject | string;
  body?: JsonObject;
  timeoutMs?: number;
}

export interface RocksetQueryParameter {
  name: string;
  type: string;
  value: Json;
}

export interface RocksetQueryArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  query?: string;
  parameters?: RocksetQueryParameter[];
  defaultRowLimit?: number;
  generateWarnings?: boolean;
  profilingEnabled?: boolean;
  body?: JsonObject;
  timeoutMs?: number;
}

export interface RocksetDocumentsAddArgs {
  workspace: string;
  collection: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  documents: JsonObject[];
  timeoutMs?: number;
}

export interface RocksetDocumentsDeleteArgs {
  workspace: string;
  collection: string;
  apiKey?: SecretInput;
  baseUrl?: string;
  ids?: string[];
  documents?: JsonObject[];
  timeoutMs?: number;
}

async function optionalApiKey(secret: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]) {
  if (!secret) {
    return {};
  }
  return bearerAuth(await resolveSecret(secret, chidori, "Vector store API key"));
}

async function weaviateHeaders(secret: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]) {
  return jsonHeaders(await optionalApiKey(secret, chidori));
}

async function tokenHeaders(secret: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]) {
  return jsonHeaders(await optionalApiKey(secret, chidori));
}

function chromaCollectionUrl(args: { baseUrl: string; tenant?: string; database?: string; collectionId: string }, action: string): string {
  const baseUrl = args.baseUrl.replace(/\/$/, "");
  const tenant = args.tenant ?? "default_tenant";
  const database = args.database ?? "default_database";
  return `${baseUrl}/api/v2/tenants/${encodeURIComponent(tenant)}/databases/${encodeURIComponent(database)}/collections/${encodeURIComponent(args.collectionId)}/${action}`;
}

function cleanBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
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

function sqlValueLiteral(value: Json | undefined): string {
  if (value === undefined || value === null) {
    return "NULL";
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("SQL numeric values must be finite");
    }
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "1" : "0";
  }
  if (typeof value === "string") {
    return sqlStringLiteral(value);
  }
  return sqlStringLiteral(JSON.stringify(value));
}

function sqlVectorLiteral(vector: number[]): string {
  if (vector.some((value) => !Number.isFinite(value))) {
    throw new Error("Vector values must be finite numbers");
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

function azionEdgeSqlUrl(args: { baseUrl?: string; databaseId: string }): string {
  return `${cleanBaseUrl(args.baseUrl ?? "https://api.azionapi.net")}/v4/edge_sql/databases/${encodeURIComponent(args.databaseId)}/query`;
}

function azionEdgeSqlHeaders(token: string): Record<string, string> {
  return jsonHeaders({ Authorization: `Token ${token}` });
}

function azionDocumentRows(args: AzionEdgeSqlVectorsAddArgs): JsonObject[] {
  if (args.rows) {
    return args.rows;
  }
  if (!args.documents) {
    throw new Error("rows or documents is required");
  }
  const idColumn = args.idColumn ?? "id";
  const contentColumn = args.contentColumn ?? "page_content";
  const vectorColumn = args.vectorColumn ?? "embedding";
  return args.documents.map((document) => compactObject({
    [idColumn]: document.id,
    [contentColumn]: document.pageContent,
    [vectorColumn]: document.embedding,
    ...(document.metadata ?? {}),
  }) as JsonObject);
}

function azionInsertStatement(args: AzionEdgeSqlVectorsAddArgs, row: JsonObject): string {
  const columns = Object.keys(row);
  if (columns.length === 0) {
    throw new Error("Azion EdgeSQL row must contain at least one column");
  }
  const verb = args.conflictMode === "ignore"
    ? "INSERT OR IGNORE"
    : args.conflictMode === "insert"
      ? "INSERT"
      : "INSERT OR REPLACE";
  return `${verb} INTO ${quoteSqlIdentifier(args.table)} (${columns.map(quoteSqlIdentifier).join(", ")}) VALUES (${columns.map((column) => sqlValueLiteral(row[column])).join(", ")})`;
}

function azionSearchSelectColumns(args: AzionEdgeSqlVectorSearchArgs, alias: string): string {
  const idColumn = args.idColumn ?? "id";
  const contentColumn = args.contentColumn ?? "page_content";
  return [
    `${quoteSqlIdentifier(alias)}.${quoteSqlIdentifier(idColumn)} AS "id"`,
    `${quoteSqlIdentifier(alias)}.${quoteSqlIdentifier(contentColumn)} AS "page_content"`,
    ...(args.metadataColumns ?? []).map((column) => `${quoteSqlIdentifier(alias)}.${quoteSqlIdentifier(column)} AS ${quoteSqlIdentifier(column)}`),
  ].join(", ");
}

function azionVectorSearchStatement(args: AzionEdgeSqlVectorSearchArgs): string {
  if (args.statement) {
    return args.statement;
  }
  const rowAlias = "source_rows";
  const matchesAlias = "matches";
  const topK = positiveInteger(args.topK, 4, "topK");
  const where = args.where ? ` WHERE ${args.where}` : "";
  return [
    `SELECT ${azionSearchSelectColumns(args, rowAlias)}, ${quoteSqlIdentifier(matchesAlias)}."distance" AS "distance"`,
    `FROM ${quoteSqlIdentifier(args.table)} AS ${quoteSqlIdentifier(rowAlias)}`,
    `JOIN vector_top_k(${sqlStringLiteral(args.vectorIndex ?? `${args.table}_idx`)}, ${sqlVectorLiteral(args.queryVector)}, ${topK}) AS ${quoteSqlIdentifier(matchesAlias)}`,
    `ON ${quoteSqlIdentifier(rowAlias)}."rowid" = ${quoteSqlIdentifier(matchesAlias)}."id"`,
    where,
  ].join(" ");
}

function azionDeleteStatement(args: AzionEdgeSqlDeleteArgs): string {
  if (args.ids.length === 0) {
    throw new Error("ids must contain at least one value");
  }
  const idColumn = args.idColumn ?? "id";
  return `DELETE FROM ${quoteSqlIdentifier(args.table)} WHERE ${quoteSqlIdentifier(idColumn)} IN (${args.ids.map((id) => sqlValueLiteral(id)).join(", ")})`;
}

function astraDbCollectionUrl(args: { apiEndpoint: string; keyspace: string; collection: string }): string {
  return `${cleanBaseUrl(args.apiEndpoint)}/api/json/v1/${encodeURIComponent(args.keyspace)}/${encodeURIComponent(args.collection)}`;
}

function vectaraUrl(baseUrl: string | undefined, path: string): string {
  return `${cleanBaseUrl(baseUrl ?? "https://api.vectara.io/v2")}/${path.replace(/^\/+/, "")}`;
}

function vectaraHeaders(apiKey: string): Record<string, string> {
  return jsonHeaders({ "x-api-key": apiKey });
}

function xataUrl(databaseUrl: string, path: string): string {
  return `${cleanBaseUrl(databaseUrl)}/${path.replace(/^\/+/, "")}`;
}

function xataHeaders(apiKey: string): Record<string, string> {
  return jsonHeaders({
    Authorization: `Bearer ${apiKey}`,
    "Accept-Encoding": "identity",
    "X-Xata-Agent": "chidori-integrations",
  });
}

function xataRecords(args: XataVectorsAddArgs): JsonObject[] {
  if (args.records) {
    return args.records;
  }
  if (!args.documents || !args.vectors || args.documents.length !== args.vectors.length) {
    throw new Error("records or matching documents and vectors arrays are required");
  }
  const contentColumn = args.contentColumn ?? "content";
  const vectorColumn = args.vectorColumn ?? "embedding";
  return args.documents.map((document, index) => compactObject({
    id: args.ids?.[index],
    ...(document.metadata ?? {}),
    [contentColumn]: document.pageContent,
    [vectorColumn]: args.vectors?.[index],
  }) as JsonObject);
}

function xataInsertOperations(args: XataVectorsAddArgs): JsonObject[] {
  return xataRecords(args).map((record) => ({
    insert: compactObject({
      table: args.table,
      record,
      createOnly: args.createOnly ?? false,
      ifVersion: args.ifVersion,
      columns: args.columns,
    }) as JsonObject,
  }));
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

async function couchbaseHeaders(args: Pick<CouchbaseSearchQueryArgs, "authorization" | "username" | "password">, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  if (args.authorization) {
    return jsonHeaders({ Authorization: await resolveSecret(args.authorization, chidori, "Couchbase Authorization header") });
  }
  if (!args.username || !args.password) {
    return jsonHeaders();
  }
  const username = await resolveSecret(args.username, chidori, "Couchbase username");
  const password = await resolveSecret(args.password, chidori, "Couchbase password");
  return jsonHeaders({ Authorization: `Basic ${base64Encode(`${username}:${password}`)}` });
}

function couchbaseSearchUrl(args: Pick<CouchbaseSearchQueryArgs, "baseUrl" | "bucket" | "scope" | "indexName">): string {
  return `${cleanBaseUrl(args.baseUrl)}/api/bucket/${encodeURIComponent(args.bucket)}/scope/${encodeURIComponent(args.scope)}/index/${encodeURIComponent(args.indexName)}/query`;
}

function couchbaseSearchBody(args: CouchbaseSearchQueryArgs): JsonObject {
  if (args.body) {
    return args.body;
  }
  const knn = args.knn ?? (
    args.vectorField && args.vector
      ? [compactObject({
        field: args.vectorField,
        vector: args.vector,
        k: args.k ?? args.size ?? 10,
      }) as JsonObject]
      : undefined
  );
  return compactObject({
    fields: args.fields ?? ["*"],
    query: args.query,
    knn,
    knn_operator: args.knnOperator,
    size: args.size,
    from: args.from,
    highlight: args.highlight,
    sort: args.sort,
    facets: args.facets,
    explain: args.explain,
    includeLocations: args.includeLocations,
    ctl: args.ctl,
  }) as JsonObject;
}

function couchbaseQueryUrl(baseUrl: string): string {
  return `${cleanBaseUrl(baseUrl)}/query/service`;
}

function couchbaseQueryBody(args: CouchbaseQueryExecuteArgs): JsonObject {
  if (args.body) {
    return args.body;
  }
  if (!args.statement) {
    throw new Error("statement or body is required");
  }
  const named = args.namedParameters
    ? Object.fromEntries(Object.entries(args.namedParameters).map(([key, value]) => [
      key.startsWith("$") ? key : `$${key}`,
      value,
    ]))
    : {};
  return compactObject({
    ...(args.queryOptions ?? {}),
    statement: args.statement,
    args: args.parameters,
    ...named,
  }) as JsonObject;
}

async function rocksetHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  const key = await resolveSecret(apiKey, chidori, "Rockset API key");
  return jsonHeaders({ Authorization: `ApiKey ${key}` });
}

function rocksetBaseUrl(baseUrl: string | undefined): string {
  return cleanBaseUrl(baseUrl ?? "https://api.rs2.usw2.rockset.com");
}

function rocksetCollectionDocsUrl(args: Pick<RocksetDocumentsAddArgs, "baseUrl" | "workspace" | "collection">): string {
  return `${rocksetBaseUrl(args.baseUrl)}/v1/orgs/self/ws/${encodeURIComponent(args.workspace)}/collections/${encodeURIComponent(args.collection)}/docs`;
}

function rocksetQueryBody(args: RocksetQueryArgs): JsonObject {
  if (args.body) {
    return args.body;
  }
  if (!args.query) {
    throw new Error("query or body is required");
  }
  return {
    sql: compactObject({
      query: args.query,
      parameters: args.parameters as unknown as Json,
      default_row_limit: args.defaultRowLimit,
      generate_warnings: args.generateWarnings,
      profiling_enabled: args.profilingEnabled,
    }) as JsonObject,
  };
}

function meilisearchUrl(baseUrl: string, indexUid: string, path: "documents" | "search", primaryKey?: string): string {
  return withQuery(`${cleanBaseUrl(baseUrl)}/indexes/${encodeURIComponent(indexUid)}/${path}`, {
    primaryKey,
  });
}

async function meilisearchHeaders(apiKey: SecretInput | undefined, chidori: Parameters<typeof resolveSecret>[1]): Promise<Record<string, string>> {
  return jsonHeaders(apiKey ? bearerAuth(await resolveSecret(apiKey, chidori, "Meilisearch API key")) : {});
}

function meilisearchSearchBody(args: MeilisearchSearchArgs): JsonObject {
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
    attributesToCrop: args.attributesToCrop,
    cropLength: args.cropLength,
    cropMarker: args.cropMarker,
    attributesToHighlight: args.attributesToHighlight,
    highlightPreTag: args.highlightPreTag,
    highlightPostTag: args.highlightPostTag,
    showMatchesPosition: args.showMatchesPosition,
    showRankingScore: args.showRankingScore,
    showRankingScoreDetails: args.showRankingScoreDetails,
    retrieveVectors: args.retrieveVectors,
    facets: args.facets,
    sort: args.sort,
    matchingStrategy: args.matchingStrategy,
  }) as JsonObject;
}

async function vespaHeaders(
  token: SecretInput | undefined,
  headers: Record<string, string> | undefined,
  chidori: Parameters<typeof resolveSecret>[1],
): Promise<Record<string, string>> {
  const auth = token ? bearerAuth(await resolveSecret(token, chidori, "Vespa bearer token")) : {};
  return jsonHeaders({
    ...auth,
    ...(headers ?? {}),
  });
}

function vespaDocumentUrl(args: VespaDocumentPutArgs): string {
  return withQuery(
    `${cleanBaseUrl(args.baseUrl)}/document/v1/${encodeURIComponent(args.namespace)}/${encodeURIComponent(args.documentType)}/docid/${encodeURIComponent(args.documentId)}`,
    {
      create: args.create,
      condition: args.condition,
    },
  );
}

function vespaQueryBody(args: VespaQueryArgs): JsonObject {
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

function typesenseApiKeyHeaders(apiKey: string, contentType = "application/json"): Record<string, string> {
  return {
    "content-type": contentType,
    "X-TYPESENSE-API-KEY": apiKey,
  };
}

function supabaseHeaders(serviceRoleKey: string, schema?: string, prefer?: string): Record<string, string> {
  return jsonHeaders(compactObject({
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Accept-Profile": schema,
    "Content-Profile": schema,
    Prefer: prefer,
  }) as Record<string, string>);
}

function supabaseRestUrl(projectUrl: string, path: string, query?: Record<string, string | number | boolean | undefined>): string {
  return withQuery(`${cleanBaseUrl(projectUrl)}/rest/v1/${path.replace(/^\/+/, "")}`, query);
}

function typesenseVectorQuery(args: TypesenseVectorSearchArgs): string | undefined {
  if (args.vectorQuery) {
    return args.vectorQuery;
  }
  if (!args.vectorField || (!args.vector && !args.documentId)) {
    return undefined;
  }
  const vector = args.vector ? `[${args.vector.join(",")}]` : "[]";
  const options = [
    args.documentId ? `id: ${args.documentId}` : undefined,
    args.k ? `k: ${args.k}` : undefined,
    args.exhaustiveSearch === undefined ? undefined : `exhaustive_search: ${args.exhaustiveSearch}`,
  ].filter(Boolean).join(", ");
  return `${args.vectorField}:(${vector}${options ? `, ${options}` : ""})`;
}

function turbopufferNamespaceUrl(baseUrl: string | undefined, namespace: string, action?: "query"): string {
  const path = `${cleanBaseUrl(baseUrl ?? "https://gcp-us-central1.turbopuffer.com")}/v2/namespaces/${encodeURIComponent(namespace)}`;
  return action ? `${path}/${action}` : path;
}

function upstashVectorUrl(restUrl: string, command: string, namespace?: string): string {
  const suffix = namespace ? `/${encodeURIComponent(namespace)}` : "";
  return `${cleanBaseUrl(restUrl)}/${command}${suffix}`;
}

function cloudflareVectorizeUrl(
  args: { apiBaseUrl?: string; accountId: string; indexName: string },
  action: "upsert" | "query",
): string {
  const apiBaseUrl = cleanBaseUrl(args.apiBaseUrl ?? "https://api.cloudflare.com/client/v4");
  return `${apiBaseUrl}/accounts/${encodeURIComponent(args.accountId)}/vectorize/v2/indexes/${encodeURIComponent(args.indexName)}/${action}`;
}

function azureSearchIndexUrl(
  args: { endpoint: string; indexName: string; apiVersion?: string },
  action: "index" | "search",
): string {
  const path = action === "index" ? "docs/index" : "docs/search";
  return withQuery(`${cleanBaseUrl(args.endpoint)}/indexes/${encodeURIComponent(args.indexName)}/${path}`, {
    "api-version": args.apiVersion ?? "2024-07-01",
  });
}

async function searchEngineHeaders(
  args: { authorization?: SecretInput; apiKey?: SecretInput },
  chidori: Parameters<typeof resolveSecret>[1],
) {
  if (args.authorization) {
    return jsonHeaders({ Authorization: await resolveSecret(args.authorization, chidori, "Authorization header") });
  }
  if (args.apiKey) {
    return jsonHeaders({ Authorization: `ApiKey ${await resolveSecret(args.apiKey, chidori, "Search API key")}` });
  }
  return jsonHeaders();
}

async function clickHouseHeaders(
  args: { authorization?: SecretInput; username?: SecretInput; password?: SecretInput },
  chidori: Parameters<typeof resolveSecret>[1],
): Promise<Record<string, string>> {
  const authorization = args.authorization
    ? await resolveSecret(args.authorization, chidori, "ClickHouse Authorization header")
    : undefined;
  const username = args.username
    ? await resolveSecret(args.username, chidori, "ClickHouse username")
    : undefined;
  const password = args.password
    ? await resolveSecret(args.password, chidori, "ClickHouse password")
    : undefined;
  return {
    "content-type": "text/plain",
    ...(authorization ? { Authorization: authorization } : {}),
    ...(username ? { "X-ClickHouse-User": username } : {}),
    ...(password ? { "X-ClickHouse-Key": password } : {}),
  };
}

function clickHouseUrl(
  baseUrl: string,
  database?: string,
  queryParameters?: Record<string, string | number | boolean>,
): string {
  return withQuery(cleanBaseUrl(baseUrl), {
    database,
    ...(queryParameters ?? {}),
  });
}

function clickHouseIdentifier(identifier: string): string {
  const parts = identifier.split(".");
  if (parts.length === 0 || parts.some((part) => part.trim().length === 0)) {
    throw new Error(`Invalid ClickHouse identifier: ${identifier}`);
  }
  return parts.map((part) => `\`${part.replace(/`/g, "``")}\``).join(".");
}

function clickHouseSelectColumns(columns: string[] | undefined): string {
  if (!columns || columns.length === 0) {
    return "*";
  }
  return columns.map((column) => column === "*" ? "*" : clickHouseIdentifier(column)).join(", ");
}

function clickHouseNumberArray(values: number[]): string {
  if (values.some((value) => !Number.isFinite(value))) {
    throw new Error("ClickHouse vector values must be finite numbers");
  }
  return `[${values.join(",")}]`;
}

function clickHouseLiteral(value: string | number): string {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("ClickHouse numeric literals must be finite numbers");
    }
    return String(value);
  }
  return `'${value.replace(/'/g, "''")}'`;
}

function azureCosmosDbNoSqlDocsUrl(
  args: { accountEndpoint: string; databaseId: string; containerId: string },
  queryParameters?: Record<string, string | number | boolean>,
): string {
  return withQuery(
    `${cleanBaseUrl(args.accountEndpoint)}/dbs/${encodeURIComponent(args.databaseId)}/colls/${encodeURIComponent(args.containerId)}/docs`,
    queryParameters,
  );
}

function azureCosmosDbNoSqlDocumentUrl(
  args: { accountEndpoint: string; databaseId: string; containerId: string; documentId: string },
  queryParameters?: Record<string, string | number | boolean>,
): string {
  return withQuery(
    `${azureCosmosDbNoSqlDocsUrl(args)}/${encodeURIComponent(args.documentId)}`,
    queryParameters,
  );
}

async function azureCosmosDbNoSqlHeaders(
  args: AzureCosmosDbNoSqlAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  contentType = "application/json",
): Promise<Record<string, string>> {
  const authorization = args.authorization
    ? await resolveSecret(args.authorization, chidori, "Azure Cosmos DB authorization header")
    : undefined;
  return compactObject({
    "content-type": contentType,
    Authorization: authorization,
    "x-ms-date": args.xMsDate,
    "x-ms-version": args.xMsVersion ?? "2018-12-31",
    "x-ms-consistency-level": args.consistencyLevel,
    "x-ms-session-token": args.sessionToken,
    "x-ms-activity-id": args.activityId,
    "x-ms-documentdb-partitionkey": args.partitionKey ? JSON.stringify(args.partitionKey) : undefined,
  }) as Record<string, string>;
}

function searchEngineDocUrl(args: SearchEngineIndexDocumentArgs): string {
  const id = args.id ? `/${encodeURIComponent(args.id)}` : "";
  return withQuery(`${cleanBaseUrl(args.baseUrl)}/${encodeURIComponent(args.index)}/_doc${id}`, {
    refresh: args.refresh,
  });
}

export const pineconeUpsertTool = defineTool<PineconeUpsertArgs, JsonObject>(
  {
    name: "pinecone_upsert",
    description: "Upsert vectors into a Pinecone index.",
    parameters: {
      type: "object",
      properties: {
        indexHost: { type: "string", description: "Pinecone index host URL." },
        apiKey: { description: "Pinecone API key or Chidori memory secret reference." },
        namespace: { type: "string", description: "Pinecone namespace." },
        vectors: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["indexHost", "vectors"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Pinecone API key");
    const body = compactObject({
      namespace: args.namespace,
      vectors: args.vectors as unknown as Json,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.indexHost}/vectors/upsert`, {
      method: "POST",
      headers: jsonHeaders({ "Api-Key": apiKey }),
      body,
    });
  },
);

export const pineconeQueryTool = defineTool<PineconeQueryArgs, JsonObject>(
  {
    name: "pinecone_query",
    description: "Query vectors from a Pinecone index.",
    parameters: {
      type: "object",
      properties: {
        indexHost: { type: "string", description: "Pinecone index host URL." },
        apiKey: { description: "Pinecone API key or Chidori memory secret reference." },
        namespace: { type: "string", description: "Pinecone namespace." },
        vector: { type: "array", items: { type: "number" } },
        id: { type: "string", description: "Vector ID to query by." },
        topK: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        includeMetadata: { type: "boolean", default: true },
        includeValues: { type: "boolean", default: false },
      },
      required: ["indexHost"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Pinecone API key");
    const body = compactObject({
      namespace: args.namespace,
      vector: args.vector,
      id: args.id,
      topK: args.topK ?? 10,
      filter: args.filter,
      includeMetadata: args.includeMetadata ?? true,
      includeValues: args.includeValues ?? false,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.indexHost}/query`, {
      method: "POST",
      headers: jsonHeaders({ "Api-Key": apiKey }),
      body,
    });
  },
);

export const pineconeEmbeddingsTool = defineTool<PineconeEmbeddingsArgs, JsonObject>(
  {
    name: "pinecone_embeddings_create",
    description: "Generate embeddings using Pinecone Inference hosted embedding models.",
    parameters: {
      type: "object",
      properties: {
        inputs: {
          type: "array",
          items: { description: "Text string or Pinecone input object, such as { text: '...' }." },
        },
        apiKey: { description: "Pinecone API key or Chidori memory secret reference." },
        model: { type: "string", default: "llama-text-embed-v2" },
        baseUrl: { type: "string", default: "https://api.pinecone.io" },
        parameters: { type: "object", additionalProperties: true },
        apiVersion: { type: "string", description: "Optional X-Pinecone-Api-Version header." },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["inputs"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Pinecone API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "llama-text-embed-v2",
      inputs: args.inputs.map((input) => (typeof input === "string" ? { text: input } : input)) as Json,
      parameters: args.parameters,
    }) as JsonObject;
    const headers = jsonHeaders(compactObject({
      "Api-Key": apiKey,
      "X-Pinecone-Api-Version": args.apiVersion,
    }) as Record<string, string>);
    return requestJson<JsonObject>(chidori, `${cleanBaseUrl(args.baseUrl ?? "https://api.pinecone.io")}/embed`, {
      method: "POST",
      headers,
      body,
    });
  },
);

export const pineconeRerankTool = defineTool<PineconeRerankArgs, JsonObject>(
  {
    name: "pinecone_rerank",
    description: "Rerank documents by relevance to a query using Pinecone Inference.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        apiKey: { description: "Pinecone API key or Chidori memory secret reference." },
        model: { type: "string", default: "bge-reranker-v2-m3" },
        baseUrl: { type: "string", default: "https://api.pinecone.io" },
        topN: { type: "integer" },
        returnDocuments: { type: "boolean", default: true },
        rankFields: { type: "array", items: { type: "string" } },
        parameters: { type: "object", additionalProperties: true },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["query", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Pinecone API key");
    const body = compactObject({
      ...(args.extraBody ?? {}),
      model: args.model ?? "bge-reranker-v2-m3",
      query: args.query,
      documents: args.documents as unknown as Json,
      top_n: args.topN,
      return_documents: args.returnDocuments,
      rank_fields: args.rankFields,
      parameters: args.parameters,
    }) as JsonObject;
    return requestJson<JsonObject>(chidori, `${cleanBaseUrl(args.baseUrl ?? "https://api.pinecone.io")}/rerank`, {
      method: "POST",
      headers: jsonHeaders({ "Api-Key": apiKey }),
      body,
    });
  },
);

export const qdrantUpsertTool = defineTool<QdrantUpsertArgs, JsonObject>(
  {
    name: "qdrant_upsert",
    description: "Upsert points into a Qdrant collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Qdrant base URL." },
        collection: { type: "string", description: "Qdrant collection name." },
        apiKey: { description: "Qdrant API key or Chidori memory secret reference." },
        wait: { type: "boolean", default: true },
        points: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["baseUrl", "collection", "points"],
    },
  },
  async (args, chidori) => {
    const body = { points: args.points as unknown as Json } as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      `${args.baseUrl}/collections/${encodeURIComponent(args.collection)}/points?wait=${args.wait ?? true}`,
      {
        method: "PUT",
        headers: jsonHeaders(await optionalApiKey(args.apiKey, chidori)),
        body,
      },
    );
  },
);

export const qdrantSearchTool = defineTool<QdrantSearchArgs, JsonObject>(
  {
    name: "qdrant_search",
    description: "Search points in a Qdrant collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Qdrant base URL." },
        collection: { type: "string", description: "Qdrant collection name." },
        apiKey: { description: "Qdrant API key or Chidori memory secret reference." },
        vector: { description: "Query vector or named vector map." },
        limit: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        withPayload: { type: "boolean", default: true },
        withVector: { type: "boolean", default: false },
      },
      required: ["baseUrl", "collection", "vector"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      vector: args.vector as unknown as Json,
      limit: args.limit ?? 10,
      filter: args.filter,
      with_payload: args.withPayload ?? true,
      with_vector: args.withVector ?? false,
    }) as JsonObject;

    return requestJson<JsonObject>(
      chidori,
      `${args.baseUrl}/collections/${encodeURIComponent(args.collection)}/points/search`,
      {
        method: "POST",
        headers: jsonHeaders(await optionalApiKey(args.apiKey, chidori)),
        body,
      },
    );
  },
);

export const weaviateBatchObjectsTool = defineTool<WeaviateBatchObjectsArgs, JsonObject>(
  {
    name: "weaviate_batch_objects",
    description: "Batch insert or update objects in Weaviate.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Weaviate base URL." },
        apiKey: { description: "Weaviate API key or Chidori memory secret reference." },
        objects: { type: "array", items: { type: "object", additionalProperties: true } },
        consistencyLevel: { type: "string", enum: ["ONE", "QUORUM", "ALL"] },
      },
      required: ["baseUrl", "objects"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      objects: args.objects as unknown as Json,
      consistencyLevel: args.consistencyLevel,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${args.baseUrl}/v1/batch/objects`, {
      method: "POST",
      headers: await weaviateHeaders(args.apiKey, chidori),
      body,
    });
  },
);

export const weaviateGraphQLTool = defineTool<WeaviateGraphQLArgs, JsonObject>(
  {
    name: "weaviate_graphql",
    description: "Run a Weaviate GraphQL query.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Weaviate base URL." },
        apiKey: { description: "Weaviate API key or Chidori memory secret reference." },
        query: { type: "string", description: "GraphQL query." },
        variables: { type: "object", additionalProperties: true },
      },
      required: ["baseUrl", "query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${args.baseUrl}/v1/graphql`, {
      method: "POST",
      headers: await weaviateHeaders(args.apiKey, chidori),
      body: compactObject({
        query: args.query,
        variables: args.variables,
      }) as JsonObject,
    });
  },
);

export const milvusInsertTool = defineTool<MilvusInsertArgs, JsonObject>(
  {
    name: "milvus_insert",
    description: "Insert entities into a Milvus collection using the REST API.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Milvus cluster endpoint." },
        token: { description: "Milvus bearer token or Chidori memory secret reference." },
        dbName: { type: "string" },
        collectionName: { type: "string" },
        partitionName: { type: "string" },
        data: { description: "Entity object or array of entity objects." },
      },
      required: ["baseUrl", "collectionName", "data"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${args.baseUrl}/v1/vector/insert`, {
      method: "POST",
      headers: await tokenHeaders(args.token, chidori),
      body: compactObject({
        dbName: args.dbName,
        collectionName: args.collectionName,
        partitionName: args.partitionName,
        data: args.data as Json,
      }) as JsonObject,
    });
  },
);

export const milvusSearchTool = defineTool<MilvusSearchArgs, JsonObject>(
  {
    name: "milvus_search",
    description: "Search a Milvus collection using the REST API.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Milvus cluster endpoint." },
        token: { description: "Milvus bearer token or Chidori memory secret reference." },
        dbName: { type: "string" },
        collectionName: { type: "string" },
        partitionName: { type: "string" },
        data: { type: "array", items: { type: "array", items: { type: "number" } } },
        annsField: { type: "string" },
        limit: { type: "integer", default: 10 },
        filter: { type: "string" },
        outputFields: { type: "array", items: { type: "string" } },
        searchParams: { type: "object", additionalProperties: true },
      },
      required: ["baseUrl", "collectionName", "data"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${args.baseUrl}/v1/vector/search`, {
      method: "POST",
      headers: await tokenHeaders(args.token, chidori),
      body: compactObject({
        dbName: args.dbName,
        collectionName: args.collectionName,
        partitionName: args.partitionName,
        data: args.data as unknown as Json,
        annsField: args.annsField,
        limit: args.limit ?? 10,
        filter: args.filter,
        outputFields: args.outputFields,
        searchParams: args.searchParams,
      }) as JsonObject,
    });
  },
);

export const chromaUpsertTool = defineTool<ChromaUpsertArgs, JsonObject>(
  {
    name: "chroma_upsert",
    description: "Upsert records into a Chroma collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Chroma server base URL." },
        collectionId: { type: "string", description: "Chroma collection ID." },
        tenant: { type: "string", default: "default_tenant" },
        database: { type: "string", default: "default_database" },
        apiKey: { description: "Chroma API key or Chidori memory secret reference." },
        ids: { type: "array", items: { type: "string" } },
        embeddings: { type: "array", items: { type: "array", items: { type: "number" } } },
        metadatas: { type: "array", items: { type: "object", additionalProperties: true } },
        documents: { type: "array", items: { type: "string" } },
        uris: { type: "array", items: { type: "string" } },
      },
      required: ["baseUrl", "collectionId", "ids"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, chromaCollectionUrl(args, "upsert"), {
      method: "POST",
      headers: await tokenHeaders(args.apiKey, chidori),
      body: compactObject({
        ids: args.ids,
        embeddings: args.embeddings as unknown as Json,
        metadatas: args.metadatas as unknown as Json,
        documents: args.documents,
        uris: args.uris,
      }) as JsonObject,
    });
  },
);

export const chromaQueryTool = defineTool<ChromaQueryArgs, JsonObject>(
  {
    name: "chroma_query",
    description: "Query records from a Chroma collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Chroma server base URL." },
        collectionId: { type: "string", description: "Chroma collection ID." },
        tenant: { type: "string", default: "default_tenant" },
        database: { type: "string", default: "default_database" },
        apiKey: { description: "Chroma API key or Chidori memory secret reference." },
        queryEmbeddings: { type: "array", items: { type: "array", items: { type: "number" } } },
        queryTexts: { type: "array", items: { type: "string" } },
        nResults: { type: "integer", default: 10 },
        where: { type: "object", additionalProperties: true },
        whereDocument: { type: "object", additionalProperties: true },
        include: { type: "array", items: { type: "string" } },
      },
      required: ["baseUrl", "collectionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, chromaCollectionUrl(args, "query"), {
      method: "POST",
      headers: await tokenHeaders(args.apiKey, chidori),
      body: compactObject({
        query_embeddings: args.queryEmbeddings as unknown as Json,
        query_texts: args.queryTexts,
        n_results: args.nResults ?? 10,
        where: args.where,
        where_document: args.whereDocument,
        include: args.include,
      }) as JsonObject,
    });
  },
);

export const mongoAtlasVectorSearchTool = defineTool<MongoAtlasVectorSearchArgs, JsonObject>(
  {
    name: "mongodb_atlas_vector_search",
    description: "Run a MongoDB Atlas Vector Search aggregate through a caller-provided HTTPS aggregate endpoint or proxy.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "HTTPS aggregate endpoint or proxy URL." },
        apiKey: { description: "Endpoint API key or Chidori memory secret reference." },
        dataSource: { type: "string" },
        database: { type: "string" },
        collection: { type: "string" },
        index: { type: "string" },
        path: { type: "string" },
        queryVector: { type: "array", items: { type: "number" } },
        limit: { type: "integer", default: 10 },
        numCandidates: { type: "integer" },
        filter: { type: "object", additionalProperties: true },
        project: { type: "object", additionalProperties: true },
      },
      required: ["endpoint", "index", "path", "queryVector"],
    },
  },
  async (args, chidori) => {
    const headers = args.apiKey
      ? jsonHeaders({ "api-key": await resolveSecret(args.apiKey, chidori, "MongoDB Atlas endpoint API key") })
      : jsonHeaders();
    return requestJson<JsonObject>(chidori, args.endpoint, {
      method: "POST",
      headers,
      body: compactObject({
        dataSource: args.dataSource,
        database: args.database,
        collection: args.collection,
        pipeline: [
          {
            $vectorSearch: compactObject({
              index: args.index,
              path: args.path,
              queryVector: args.queryVector,
              limit: args.limit ?? 10,
              numCandidates: args.numCandidates,
              filter: args.filter,
            }) as JsonObject,
          },
          ...(args.project ? [{ $project: args.project }] : []),
        ],
      }) as JsonObject,
    });
  },
);

export const upstashVectorUpsertTool = defineTool<UpstashVectorUpsertArgs, JsonObject>(
  {
    name: "upstash_vector_upsert",
    description: "Upsert vectors into an Upstash Vector index.",
    parameters: {
      type: "object",
      properties: {
        restUrl: { type: "string", description: "Upstash Vector REST URL." },
        token: { description: "Upstash Vector REST token or Chidori memory secret reference." },
        namespace: { type: "string" },
        vectors: { description: "Single vector object or array of vector objects." },
      },
      required: ["restUrl", "vectors"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Upstash Vector REST token");
    return requestJson<JsonObject>(chidori, upstashVectorUrl(args.restUrl, "upsert", args.namespace), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(token)),
      body: args.vectors as unknown as Json,
    });
  },
);

export const upstashVectorQueryTool = defineTool<UpstashVectorQueryArgs, JsonObject>(
  {
    name: "upstash_vector_query",
    description: "Query nearest neighbors from an Upstash Vector index.",
    parameters: {
      type: "object",
      properties: {
        restUrl: { type: "string", description: "Upstash Vector REST URL." },
        token: { description: "Upstash Vector REST token or Chidori memory secret reference." },
        namespace: { type: "string" },
        vector: { type: "array", items: { type: "number" } },
        sparseVector: { type: "object", additionalProperties: true },
        topK: { type: "integer", default: 10 },
        includeMetadata: { type: "boolean", default: true },
        includeVectors: { type: "boolean", default: false },
        includeData: { type: "boolean", default: false },
        filter: { type: "string" },
        weightingStrategy: { type: "string", enum: ["IDF"] },
        fusionAlgorithm: { type: "string", enum: ["RRF", "DBSF"] },
      },
      required: ["restUrl"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Upstash Vector REST token");
    return requestJson<JsonObject>(chidori, upstashVectorUrl(args.restUrl, "query", args.namespace), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(token)),
      body: compactObject({
        vector: args.vector,
        sparseVector: args.sparseVector,
        topK: args.topK ?? 10,
        includeMetadata: args.includeMetadata ?? true,
        includeVectors: args.includeVectors ?? false,
        includeData: args.includeData ?? false,
        filter: args.filter,
        weightingStrategy: args.weightingStrategy,
        fusionAlgorithm: args.fusionAlgorithm,
      }) as JsonObject,
    });
  },
);

export const cloudflareVectorizeUpsertTool = defineTool<CloudflareVectorizeUpsertArgs, JsonObject>(
  {
    name: "cloudflare_vectorize_upsert",
    description: "Upsert vectors into a Cloudflare Vectorize index through the REST API.",
    parameters: {
      type: "object",
      properties: {
        accountId: { type: "string" },
        indexName: { type: "string" },
        apiToken: { description: "Cloudflare API token or Chidori memory secret reference." },
        apiBaseUrl: { type: "string", default: "https://api.cloudflare.com/client/v4" },
        vectors: { type: "array", items: { type: "object", additionalProperties: true } },
        unparsableBehavior: { type: "string", enum: ["error", "discard"] },
      },
      required: ["accountId", "indexName", "vectors"],
    },
  },
  async (args, chidori) => {
    const apiToken = await resolveSecret(args.apiToken, chidori, "Cloudflare API token");
    const body = args.vectors.map((vector) => JSON.stringify(vector)).join("\n");
    return requestJson<JsonObject>(
      chidori,
      withQuery(cloudflareVectorizeUrl(args, "upsert"), { "unparsable-behavior": args.unparsableBehavior }),
      {
        method: "POST",
        headers: {
          "content-type": "application/x-ndjson",
          ...bearerAuth(apiToken),
        },
        body,
      },
    );
  },
);

export const cloudflareVectorizeQueryTool = defineTool<CloudflareVectorizeQueryArgs, JsonObject>(
  {
    name: "cloudflare_vectorize_query",
    description: "Query nearest vectors from a Cloudflare Vectorize index.",
    parameters: {
      type: "object",
      properties: {
        accountId: { type: "string" },
        indexName: { type: "string" },
        apiToken: { description: "Cloudflare API token or Chidori memory secret reference." },
        apiBaseUrl: { type: "string", default: "https://api.cloudflare.com/client/v4" },
        vector: { type: "array", items: { type: "number" } },
        topK: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        returnMetadata: { type: "string", enum: ["none", "indexed", "all"], default: "all" },
        returnValues: { type: "boolean", default: false },
      },
      required: ["accountId", "indexName", "vector"],
    },
  },
  async (args, chidori) => {
    const apiToken = await resolveSecret(args.apiToken, chidori, "Cloudflare API token");
    return requestJson<JsonObject>(chidori, cloudflareVectorizeUrl(args, "query"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiToken)),
      body: compactObject({
        vector: args.vector,
        topK: args.topK ?? 10,
        filter: args.filter,
        returnMetadata: args.returnMetadata ?? "all",
        returnValues: args.returnValues ?? false,
      }) as JsonObject,
    });
  },
);

export const azureAiSearchUploadTool = defineTool<AzureAISearchUploadArgs, JsonObject>(
  {
    name: "azure_ai_search_upload",
    description: "Upload, merge, or delete documents in an Azure AI Search index.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "Azure AI Search service endpoint." },
        indexName: { type: "string" },
        apiKey: { description: "Azure AI Search admin/query API key or Chidori memory secret reference." },
        apiVersion: { type: "string", default: "2024-07-01" },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        action: { type: "string", enum: ["upload", "merge", "mergeOrUpload", "delete"], default: "upload" },
      },
      required: ["endpoint", "indexName", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Azure AI Search API key");
    const value = args.action
      ? args.documents.map((document) => ({ "@search.action": args.action, ...document }))
      : args.documents;
    return requestJson<JsonObject>(chidori, azureSearchIndexUrl(args, "index"), {
      method: "POST",
      headers: jsonHeaders({ "api-key": apiKey }),
      body: { value: value as unknown as Json } as JsonObject,
    });
  },
);

export const azureAiSearchVectorSearchTool = defineTool<AzureAISearchVectorSearchArgs, JsonObject>(
  {
    name: "azure_ai_search_vector_search",
    description: "Run vector or hybrid search against an Azure AI Search index.",
    parameters: {
      type: "object",
      properties: {
        endpoint: { type: "string", description: "Azure AI Search service endpoint." },
        indexName: { type: "string" },
        apiKey: { description: "Azure AI Search query API key or Chidori memory secret reference." },
        apiVersion: { type: "string", default: "2024-07-01" },
        search: { type: "string", description: "Optional lexical search text for hybrid search." },
        vectorQueries: { type: "array", items: { type: "object", additionalProperties: true } },
        vector: { type: "array", items: { type: "number" } },
        fields: { type: "string", description: "Vector field name or comma-separated vector fields." },
        kNearestNeighbors: { type: "integer", default: 10 },
        filter: { type: "string" },
        select: { type: "string" },
        top: { type: "integer" },
        count: { type: "boolean" },
        queryType: { type: "string", enum: ["simple", "full", "semantic"] },
        semanticConfiguration: { type: "string" },
      },
      required: ["endpoint", "indexName"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Azure AI Search API key");
    const vectorQueries = args.vectorQueries
      ?? (args.vector && args.fields
        ? [
            {
              kind: "vector",
              vector: args.vector,
              fields: args.fields,
              k: args.kNearestNeighbors ?? 10,
            },
          ]
        : undefined);
    return requestJson<JsonObject>(chidori, azureSearchIndexUrl(args, "search"), {
      method: "POST",
      headers: jsonHeaders({ "api-key": apiKey }),
      body: compactObject({
        search: args.search,
        vectorQueries: vectorQueries as unknown as Json,
        filter: args.filter,
        select: args.select,
        top: args.top,
        count: args.count,
        queryType: args.queryType,
        semanticConfiguration: args.semanticConfiguration,
      }) as JsonObject,
    });
  },
);

export const azionEdgeSqlVectorsAddTool = defineTool<AzionEdgeSqlVectorsAddArgs, JsonObject>(
  {
    name: "azion_edgesql_vectors_add",
    description: "Insert or replace vector rows in an Azion EdgeSQL table.",
    parameters: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Azion EdgeSQL database ID." },
        table: { type: "string", description: "EdgeSQL table name." },
        token: { description: "Azion API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.azionapi.net" },
        documents: { type: "array", items: { type: "object", additionalProperties: true }, description: "Documents with pageContent, optional id, embedding, and metadata." },
        rows: { type: "array", items: { type: "object", additionalProperties: true }, description: "Pre-shaped SQL rows. When set, documents are ignored." },
        idColumn: { type: "string", default: "id" },
        contentColumn: { type: "string", default: "page_content" },
        vectorColumn: { type: "string", default: "embedding" },
        conflictMode: { type: "string", enum: ["replace", "ignore", "insert"], default: "replace" },
        timeoutMs: { type: "integer" },
      },
      required: ["databaseId", "table"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Azion API token");
    const statements = azionDocumentRows(args).map((row) => azionInsertStatement(args, row));
    return requestJson<JsonObject>(
      chidori,
      azionEdgeSqlUrl(args),
      compactObject({
        method: "POST",
        headers: azionEdgeSqlHeaders(token),
        body: { statements },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azionEdgeSqlVectorSearchTool = defineTool<AzionEdgeSqlVectorSearchArgs, JsonObject>(
  {
    name: "azion_edgesql_vector_search",
    description: "Run vector similarity search against an Azion EdgeSQL vector index.",
    parameters: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Azion EdgeSQL database ID." },
        table: { type: "string", description: "EdgeSQL table name." },
        token: { description: "Azion API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.azionapi.net" },
        queryVector: { type: "array", items: { type: "number" } },
        vectorIndex: { type: "string", description: "Azion vector index name. Defaults to <table>_idx." },
        idColumn: { type: "string", default: "id" },
        contentColumn: { type: "string", default: "page_content" },
        metadataColumns: { type: "array", items: { type: "string" } },
        topK: { type: "integer", default: 4 },
        where: { type: "string", description: "Optional SQL WHERE clause appended after vector join." },
        statement: { type: "string", description: "Full SQL statement override." },
        timeoutMs: { type: "integer" },
      },
      required: ["databaseId", "table", "queryVector"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Azion API token");
    const statement = azionVectorSearchStatement(args);
    return requestJson<JsonObject>(
      chidori,
      azionEdgeSqlUrl(args),
      compactObject({
        method: "POST",
        headers: azionEdgeSqlHeaders(token),
        body: { statements: [statement] },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azionEdgeSqlDeleteTool = defineTool<AzionEdgeSqlDeleteArgs, JsonObject>(
  {
    name: "azion_edgesql_delete",
    description: "Delete rows from an Azion EdgeSQL vector table by ID.",
    parameters: {
      type: "object",
      properties: {
        databaseId: { type: "string", description: "Azion EdgeSQL database ID." },
        table: { type: "string", description: "EdgeSQL table name." },
        token: { description: "Azion API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.azionapi.net" },
        ids: { type: "array", items: {}, description: "Row IDs to delete." },
        idColumn: { type: "string", default: "id" },
        timeoutMs: { type: "integer" },
      },
      required: ["databaseId", "table", "ids"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Azion API token");
    const statement = azionDeleteStatement(args);
    return requestJson<JsonObject>(
      chidori,
      azionEdgeSqlUrl(args),
      compactObject({
        method: "POST",
        headers: azionEdgeSqlHeaders(token),
        body: { statements: [statement] },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const elasticsearchIndexDocumentTool = defineTool<SearchEngineIndexDocumentArgs, JsonObject>(
  {
    name: "elasticsearch_index_document",
    description: "Index a document into Elasticsearch.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Elasticsearch base URL." },
        index: { type: "string" },
        id: { type: "string" },
        document: { type: "object", additionalProperties: true },
        authorization: { description: "Full Authorization header value, such as ApiKey, Basic, or Bearer." },
        apiKey: { description: "Elasticsearch API key encoded for ApiKey auth." },
        refresh: { description: "Refresh behavior, such as true or wait_for." },
      },
      required: ["baseUrl", "index", "document"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, searchEngineDocUrl(args), {
      method: args.id ? "PUT" : "POST",
      headers: await searchEngineHeaders(args, chidori),
      body: args.document,
    });
  },
);

export const elasticsearchKnnSearchTool = defineTool<ElasticsearchKnnSearchArgs, JsonObject>(
  {
    name: "elasticsearch_knn_search",
    description: "Run a k-nearest-neighbor search against Elasticsearch using the search API knn option.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Elasticsearch base URL." },
        index: { type: "string" },
        field: { type: "string", description: "Dense vector field." },
        queryVector: { type: "array", items: { type: "number" } },
        k: { type: "integer", default: 10 },
        numCandidates: { type: "integer" },
        filter: { description: "Elasticsearch query filter object or array." },
        source: { description: "_source setting." },
        size: { type: "integer" },
        authorization: { description: "Full Authorization header value, such as ApiKey, Basic, or Bearer." },
        apiKey: { description: "Elasticsearch API key encoded for ApiKey auth." },
      },
      required: ["baseUrl", "index", "field", "queryVector"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${cleanBaseUrl(args.baseUrl)}/${encodeURIComponent(args.index)}/_search`, {
      method: "POST",
      headers: await searchEngineHeaders(args, chidori),
      body: compactObject({
        knn: compactObject({
          field: args.field,
          query_vector: args.queryVector,
          k: args.k ?? 10,
          num_candidates: args.numCandidates,
          filter: args.filter as Json | undefined,
        }) as JsonObject,
        _source: args.source as Json | undefined,
        size: args.size,
      }) as JsonObject,
    });
  },
);

export const opensearchIndexDocumentTool = defineTool<SearchEngineIndexDocumentArgs, JsonObject>(
  {
    name: "opensearch_index_document",
    description: "Index a document into OpenSearch.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "OpenSearch base URL." },
        index: { type: "string" },
        id: { type: "string" },
        document: { type: "object", additionalProperties: true },
        authorization: { description: "Full Authorization header value, such as Basic, Bearer, or AWS SigV4 proxy auth." },
        apiKey: { description: "OpenSearch API key encoded for ApiKey auth when supported." },
        refresh: { description: "Refresh behavior, such as true or wait_for." },
      },
      required: ["baseUrl", "index", "document"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, searchEngineDocUrl(args), {
      method: args.id ? "PUT" : "POST",
      headers: await searchEngineHeaders(args, chidori),
      body: args.document,
    });
  },
);

export const opensearchKnnSearchTool = defineTool<OpenSearchKnnSearchArgs, JsonObject>(
  {
    name: "opensearch_knn_search",
    description: "Run a k-NN query against an OpenSearch index.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "OpenSearch base URL." },
        index: { type: "string" },
        field: { type: "string", description: "knn_vector field." },
        vector: { type: "array", items: { type: "number" } },
        k: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        methodParameters: { type: "object", additionalProperties: true },
        source: { description: "_source setting." },
        size: { type: "integer" },
        authorization: { description: "Full Authorization header value, such as Basic, Bearer, or AWS SigV4 proxy auth." },
        apiKey: { description: "OpenSearch API key encoded for ApiKey auth when supported." },
      },
      required: ["baseUrl", "index", "field", "vector"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${cleanBaseUrl(args.baseUrl)}/${encodeURIComponent(args.index)}/_search`, {
      method: "POST",
      headers: await searchEngineHeaders(args, chidori),
      body: compactObject({
        query: {
          knn: {
            [args.field]: compactObject({
              vector: args.vector,
              k: args.k ?? 10,
              filter: args.filter,
              method_parameters: args.methodParameters,
            }) as JsonObject,
          },
        },
        _source: args.source as Json | undefined,
        size: args.size,
      }) as JsonObject,
    });
  },
);

export const clickHouseInsertTool = defineTool<ClickHouseInsertArgs, JsonObject>(
  {
    name: "clickhouse_insert",
    description: "Insert vector-store rows into ClickHouse through the HTTP interface using JSONEachRow.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "ClickHouse HTTP endpoint, for example https://host:8443." },
        table: { type: "string", description: "Table name, optionally database-qualified." },
        rows: { type: "array", items: { type: "object", additionalProperties: true } },
        database: { type: "string", description: "Optional database query parameter." },
        username: { description: "ClickHouse username or Chidori memory secret reference." },
        password: { description: "ClickHouse password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header, such as Basic or Bearer, or a Chidori memory secret reference." },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "table", "rows"],
    },
  },
  async (args, chidori) => {
    const query = `INSERT INTO ${clickHouseIdentifier(args.table)} FORMAT JSONEachRow`;
    const body = `${query}\n${args.rows.map((row) => JSON.stringify(row)).join("\n")}`;
    const response = await chidori.http(clickHouseUrl(args.baseUrl, args.database, args.queryParameters), compactObject({
      method: "POST",
      headers: await clickHouseHeaders(args, chidori),
      body,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ClickHouse insert: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  },
);

export const clickHouseVectorSearchTool = defineTool<ClickHouseVectorSearchArgs, JsonObject>(
  {
    name: "clickhouse_vector_search",
    description: "Run exact vector similarity search against a ClickHouse table through the HTTP interface.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "ClickHouse HTTP endpoint, for example https://host:8443." },
        table: { type: "string", description: "Table name, optionally database-qualified." },
        vectorColumn: { type: "string", description: "Array(Float*) vector column." },
        queryVector: { type: "array", items: { type: "number" } },
        database: { type: "string", description: "Optional database query parameter." },
        username: { description: "ClickHouse username or Chidori memory secret reference." },
        password: { description: "ClickHouse password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header, such as Basic or Bearer, or a Chidori memory secret reference." },
        selectColumns: { type: "array", items: { type: "string" }, description: "Columns to return; defaults to all columns." },
        distanceAlias: { type: "string", default: "distance" },
        distanceFunction: { type: "string", enum: ["cosineDistance", "L2Distance"], default: "cosineDistance" },
        where: { type: "string", description: "Optional trusted SQL WHERE expression." },
        limit: { type: "integer", default: 10 },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "table", "vectorColumn", "queryVector"],
    },
  },
  async (args, chidori) => {
    const distanceAlias = args.distanceAlias ?? "distance";
    const distanceExpression = `${args.distanceFunction ?? "cosineDistance"}(${clickHouseIdentifier(args.vectorColumn)}, ${clickHouseNumberArray(args.queryVector)})`;
    const where = args.where ? ` WHERE ${args.where}` : "";
    const query = [
      `SELECT ${clickHouseSelectColumns(args.selectColumns)}, ${distanceExpression} AS ${clickHouseIdentifier(distanceAlias)}`,
      `FROM ${clickHouseIdentifier(args.table)}`,
      where,
      ` ORDER BY ${clickHouseIdentifier(distanceAlias)} ASC`,
      ` LIMIT ${args.limit ?? 10}`,
      " FORMAT JSON",
    ].join("");
    return requestJson<JsonObject>(chidori, clickHouseUrl(args.baseUrl, args.database, args.queryParameters), compactObject({
      method: "POST",
      headers: await clickHouseHeaders(args, chidori),
      body: query,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
  },
);

export const clickHouseDeleteTool = defineTool<ClickHouseDeleteArgs, JsonObject>(
  {
    name: "clickhouse_delete",
    description: "Delete vector-store rows from ClickHouse by ID using ALTER TABLE DELETE.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "ClickHouse HTTP endpoint, for example https://host:8443." },
        table: { type: "string", description: "Table name, optionally database-qualified." },
        idColumn: { type: "string", description: "ID column used in the delete predicate." },
        ids: { type: "array", items: { oneOf: [{ type: "string" }, { type: "number" }] } },
        database: { type: "string", description: "Optional database query parameter." },
        username: { description: "ClickHouse username or Chidori memory secret reference." },
        password: { description: "ClickHouse password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header, such as Basic or Bearer, or a Chidori memory secret reference." },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "table", "idColumn", "ids"],
    },
  },
  async (args, chidori) => {
    if (args.ids.length === 0) {
      throw new Error("ClickHouse delete requires at least one id");
    }
    const query = [
      `ALTER TABLE ${clickHouseIdentifier(args.table)}`,
      ` DELETE WHERE ${clickHouseIdentifier(args.idColumn)} IN (${args.ids.map(clickHouseLiteral).join(", ")})`,
    ].join("");
    const response = await chidori.http(clickHouseUrl(args.baseUrl, args.database, args.queryParameters), compactObject({
      method: "POST",
      headers: await clickHouseHeaders(args, chidori),
      body: query,
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ClickHouse delete: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  },
);

export const azureCosmosDbNoSqlDocumentUpsertTool = defineTool<AzureCosmosDbNoSqlDocumentUpsertArgs, JsonObject>(
  {
    name: "azure_cosmosdb_nosql_document_upsert",
    description: "Create or upsert a document with vector fields into an Azure Cosmos DB for NoSQL container.",
    parameters: {
      type: "object",
      properties: {
        accountEndpoint: { type: "string", description: "Cosmos DB account endpoint, for example https://account.documents.azure.com." },
        databaseId: { type: "string" },
        containerId: { type: "string" },
        document: { type: "object", additionalProperties: true },
        authorization: { description: "Caller-provided Cosmos DB Authorization header or Chidori memory secret reference." },
        xMsDate: { type: "string", description: "RFC 1123 date used by the Cosmos DB signature." },
        xMsVersion: { type: "string", default: "2018-12-31" },
        consistencyLevel: { type: "string", enum: ["Strong", "Bounded", "Session", "Eventual", "ConsistentPrefix"] },
        sessionToken: { type: "string" },
        activityId: { type: "string" },
        partitionKey: { type: "array" },
        indexingDirective: { type: "string", enum: ["Include", "Exclude"] },
        preTriggerInclude: { type: "string" },
        postTriggerInclude: { type: "string" },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["accountEndpoint", "databaseId", "containerId", "document"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      azureCosmosDbNoSqlDocsUrl(args, args.queryParameters),
      compactObject({
        method: "POST",
        headers: compactObject({
          ...(await azureCosmosDbNoSqlHeaders(args, chidori)),
          "x-ms-documentdb-is-upsert": "True",
          "x-ms-indexing-directive": args.indexingDirective,
          "x-ms-documentdb-pre-trigger-include": args.preTriggerInclude,
          "x-ms-documentdb-post-trigger-include": args.postTriggerInclude,
        }) as Record<string, string>,
        body: args.document,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azureCosmosDbNoSqlQueryTool = defineTool<AzureCosmosDbNoSqlQueryArgs, JsonObject>(
  {
    name: "azure_cosmosdb_nosql_query",
    description: "Run SQL, vector, full-text, or hybrid queries against Azure Cosmos DB for NoSQL through the REST API.",
    parameters: {
      type: "object",
      properties: {
        accountEndpoint: { type: "string", description: "Cosmos DB account endpoint, for example https://account.documents.azure.com." },
        databaseId: { type: "string" },
        containerId: { type: "string" },
        query: { type: "string", description: "Cosmos DB SQL query text." },
        parameters: { type: "array", items: { type: "object", additionalProperties: true } },
        authorization: { description: "Caller-provided Cosmos DB Authorization header or Chidori memory secret reference." },
        xMsDate: { type: "string", description: "RFC 1123 date used by the Cosmos DB signature." },
        xMsVersion: { type: "string", default: "2018-12-31" },
        consistencyLevel: { type: "string", enum: ["Strong", "Bounded", "Session", "Eventual", "ConsistentPrefix"] },
        sessionToken: { type: "string" },
        activityId: { type: "string" },
        partitionKey: { type: "array" },
        enableCrossPartition: { type: "boolean", default: true },
        maxItemCount: { type: "integer" },
        continuation: { type: "string" },
        populateQueryMetrics: { type: "boolean" },
        populateIndexMetrics: { type: "boolean" },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["accountEndpoint", "databaseId", "containerId", "query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      azureCosmosDbNoSqlDocsUrl(args, args.queryParameters),
      compactObject({
        method: "POST",
        headers: compactObject({
          ...(await azureCosmosDbNoSqlHeaders(args, chidori, "application/query+json")),
          "x-ms-documentdb-isquery": "True",
          "x-ms-documentdb-query-enablecrosspartition": args.enableCrossPartition === false ? "False" : "True",
          "x-ms-max-item-count": args.maxItemCount === undefined ? undefined : String(args.maxItemCount),
          "x-ms-continuation": args.continuation,
          "x-ms-documentdb-populatequerymetrics": args.populateQueryMetrics === undefined ? undefined : String(args.populateQueryMetrics),
          "x-ms-documentdb-populateindexmetrics": args.populateIndexMetrics === undefined ? undefined : String(args.populateIndexMetrics),
        }) as Record<string, string>,
        body: compactObject({
          query: args.query,
          parameters: args.parameters as unknown as Json | undefined,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const azureCosmosDbNoSqlDocumentDeleteTool = defineTool<AzureCosmosDbNoSqlDocumentDeleteArgs, JsonObject>(
  {
    name: "azure_cosmosdb_nosql_document_delete",
    description: "Delete a document from an Azure Cosmos DB for NoSQL container.",
    parameters: {
      type: "object",
      properties: {
        accountEndpoint: { type: "string", description: "Cosmos DB account endpoint, for example https://account.documents.azure.com." },
        databaseId: { type: "string" },
        containerId: { type: "string" },
        documentId: { type: "string" },
        authorization: { description: "Caller-provided Cosmos DB Authorization header or Chidori memory secret reference." },
        xMsDate: { type: "string", description: "RFC 1123 date used by the Cosmos DB signature." },
        xMsVersion: { type: "string", default: "2018-12-31" },
        consistencyLevel: { type: "string", enum: ["Strong", "Bounded", "Session", "Eventual", "ConsistentPrefix"] },
        sessionToken: { type: "string" },
        activityId: { type: "string" },
        partitionKey: { type: "array" },
        ifMatch: { type: "string" },
        queryParameters: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["accountEndpoint", "databaseId", "containerId", "documentId"],
    },
  },
  async (args, chidori) => {
    const response = await chidori.http(
      azureCosmosDbNoSqlDocumentUrl(args, args.queryParameters),
      compactObject({
        method: "DELETE",
        headers: compactObject({
          ...(await azureCosmosDbNoSqlHeaders(args, chidori)),
          "If-Match": args.ifMatch,
        }) as Record<string, string>,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Azure Cosmos DB delete: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  },
);

export const turbopufferWriteTool = defineTool<TurbopufferWriteArgs, JsonObject>(
  {
    name: "turbopuffer_write",
    description: "Create, update, patch, or delete documents in a turbopuffer namespace.",
    parameters: {
      type: "object",
      properties: {
        namespace: { type: "string", description: "turbopuffer namespace name." },
        apiKey: { description: "turbopuffer API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gcp-us-central1.turbopuffer.com" },
        upsertRows: { type: "array", items: { type: "object", additionalProperties: true } },
        upsertColumns: { type: "object", additionalProperties: true },
        patchRows: { type: "array", items: { type: "object", additionalProperties: true } },
        patchColumns: { type: "object", additionalProperties: true },
        deletes: { type: "array", items: { oneOf: [{ type: "string" }, { type: "number" }] } },
        deleteByFilter: { description: "turbopuffer filter expression for delete_by_filter." },
        patchByFilter: { type: "object", additionalProperties: true },
        upsertCondition: { description: "Conditional expression for upserts." },
        patchCondition: { description: "Conditional expression for patches." },
        deleteCondition: { description: "Conditional expression for deletes." },
        returnAffectedIds: { type: "boolean", default: false },
        distanceMetric: { type: "string", enum: ["cosine_distance", "euclidean_squared"] },
        schema: { type: "object", additionalProperties: true },
        disableBackpressure: { type: "boolean", default: false },
      },
      required: ["namespace"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "turbopuffer API key");
    return requestJson<JsonObject>(chidori, turbopufferNamespaceUrl(args.baseUrl, args.namespace), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        upsert_rows: args.upsertRows as unknown as Json,
        upsert_columns: args.upsertColumns,
        patch_rows: args.patchRows as unknown as Json,
        patch_columns: args.patchColumns,
        deletes: args.deletes,
        delete_by_filter: args.deleteByFilter,
        patch_by_filter: args.patchByFilter,
        upsert_condition: args.upsertCondition,
        patch_condition: args.patchCondition,
        delete_condition: args.deleteCondition,
        return_affected_ids: args.returnAffectedIds,
        distance_metric: args.distanceMetric,
        schema: args.schema,
        disable_backpressure: args.disableBackpressure,
      }) as JsonObject,
    });
  },
);

export const turbopufferQueryTool = defineTool<TurbopufferQueryArgs, JsonObject>(
  {
    name: "turbopuffer_query",
    description: "Query, filter, full-text search, or vector search documents in a turbopuffer namespace.",
    parameters: {
      type: "object",
      properties: {
        namespace: { type: "string", description: "turbopuffer namespace name." },
        apiKey: { description: "turbopuffer API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gcp-us-central1.turbopuffer.com" },
        rankBy: { description: "turbopuffer rank_by expression." },
        vector: { type: "array", items: { type: "number" }, description: "Convenience vector for ANN rank_by." },
        vectorField: { type: "string", default: "vector" },
        aggregateBy: { type: "object", additionalProperties: true },
        filters: { description: "turbopuffer filter expression." },
        limit: { description: "Numeric limit or turbopuffer limit object." },
        includeAttributes: { description: "Attributes to return, or true to return all." },
        groupBy: { type: "array", items: { type: "string" } },
        consistency: { type: "object", additionalProperties: true },
      },
      required: ["namespace"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "turbopuffer API key");
    const rankBy = args.rankBy ?? (args.vector ? [args.vectorField ?? "vector", "ANN", args.vector] : undefined);
    return requestJson<JsonObject>(chidori, turbopufferNamespaceUrl(args.baseUrl, args.namespace, "query"), {
      method: "POST",
      headers: jsonHeaders(bearerAuth(apiKey)),
      body: compactObject({
        rank_by: rankBy as Json | undefined,
        aggregate_by: args.aggregateBy,
        filters: args.filters,
        limit: args.limit as Json | undefined,
        include_attributes: args.includeAttributes as Json | undefined,
        group_by: args.groupBy,
        consistency: args.consistency,
      }) as JsonObject,
    });
  },
);

export const rocksetQueryTool = defineTool<RocksetQueryArgs, JsonObject>(
  {
    name: "rockset_query",
    description: "Run a Rockset SQL query, including vector-search SQL expressions, through the Rockset REST API.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Rockset API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.rs2.usw2.rockset.com" },
        query: { type: "string", description: "Rockset SQL query text." },
        parameters: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string" },
              value: {},
            },
            required: ["name", "type", "value"],
          },
        },
        defaultRowLimit: { type: "integer" },
        generateWarnings: { type: "boolean" },
        profilingEnabled: { type: "boolean" },
        body: { type: "object", additionalProperties: true, description: "Full Rockset query request body. When provided, this is sent as-is." },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, `${rocksetBaseUrl(args.baseUrl)}/v1/orgs/self/queries`, compactObject({
    method: "POST",
    headers: await rocksetHeaders(args.apiKey, chidori),
    body: rocksetQueryBody(args),
    timeoutMs: args.timeoutMs,
  }) as ChidoriHttpRequestOptions),
);

export const rocksetDocumentsAddTool = defineTool<RocksetDocumentsAddArgs, JsonObject>(
  {
    name: "rockset_documents_add",
    description: "Add documents with text, metadata, and optional vector fields to a Rockset collection.",
    parameters: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Rockset workspace name." },
        collection: { type: "string", description: "Rockset collection name." },
        apiKey: { description: "Rockset API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.rs2.usw2.rockset.com" },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        timeoutMs: { type: "integer" },
      },
      required: ["workspace", "collection", "documents"],
    },
  },
  async (args, chidori) => requestJson<JsonObject>(chidori, rocksetCollectionDocsUrl(args), compactObject({
    method: "POST",
    headers: await rocksetHeaders(args.apiKey, chidori),
    body: { data: args.documents as unknown as Json },
    timeoutMs: args.timeoutMs,
  }) as ChidoriHttpRequestOptions),
);

export const rocksetDocumentsDeleteTool = defineTool<RocksetDocumentsDeleteArgs, JsonObject>(
  {
    name: "rockset_documents_delete",
    description: "Delete documents from a Rockset collection by _id or caller-provided document descriptors.",
    parameters: {
      type: "object",
      properties: {
        workspace: { type: "string", description: "Rockset workspace name." },
        collection: { type: "string", description: "Rockset collection name." },
        apiKey: { description: "Rockset API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.rs2.usw2.rockset.com" },
        ids: { type: "array", items: { type: "string" }, description: "Rockset document _id values to delete." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        timeoutMs: { type: "integer" },
      },
      required: ["workspace", "collection"],
    },
  },
  async (args, chidori) => {
    const data = args.documents ?? args.ids?.map((id) => ({ _id: id }));
    if (!data || data.length === 0) {
      throw new Error("ids or documents is required");
    }
    return requestJson<JsonObject>(chidori, rocksetCollectionDocsUrl(args), compactObject({
      method: "DELETE",
      headers: await rocksetHeaders(args.apiKey, chidori),
      body: { data: data as unknown as Json },
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
  },
);

export const typesenseDocumentsImportTool = defineTool<TypesenseDocumentsImportArgs, JsonObject>(
  {
    name: "typesense_documents_import",
    description: "Bulk import documents with vector fields into a Typesense collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Typesense API base URL." },
        collection: { type: "string", description: "Typesense collection name." },
        apiKey: { description: "Typesense API key or Chidori memory secret reference." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        action: { type: "string", enum: ["create", "update", "upsert", "emplace"], default: "upsert" },
        batchSize: { type: "integer" },
        dirtyValues: { type: "string", enum: ["coerce_or_reject", "coerce_or_drop", "drop", "reject"] },
        returnId: { type: "boolean" },
        returnDoc: { type: "boolean" },
      },
      required: ["baseUrl", "collection", "documents"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Typesense API key");
    const body = args.documents.map((document) => JSON.stringify(document)).join("\n");
    const url = withQuery(`${cleanBaseUrl(args.baseUrl)}/collections/${encodeURIComponent(args.collection)}/documents/import`, {
      action: args.action ?? "upsert",
      batch_size: args.batchSize,
      dirty_values: args.dirtyValues,
      return_id: args.returnId,
      return_doc: args.returnDoc,
    });
    const response = await chidori.http(url, {
      method: "POST",
      headers: typesenseApiKeyHeaders(apiKey, "text/plain"),
      body,
    });
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from Typesense import: ${detail}`);
    }
    return {
      status: response.status,
      body: typeof response.body === "string" ? response.body : response.body,
    } as JsonObject;
  },
);

export const typesenseVectorSearchTool = defineTool<TypesenseVectorSearchArgs, JsonObject>(
  {
    name: "typesense_vector_search",
    description: "Run vector, semantic, keyword, or hybrid search against a Typesense collection.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Typesense API base URL." },
        collection: { type: "string", description: "Typesense collection name." },
        apiKey: { description: "Typesense API key or Chidori memory secret reference." },
        q: { type: "string", default: "*" },
        queryBy: { type: "string", description: "Comma-separated text fields for keyword or hybrid search." },
        vectorQuery: { type: "string", description: "Raw Typesense vector_query expression." },
        vectorField: { type: "string", description: "Vector field for convenience vector_query construction." },
        vector: { type: "array", items: { type: "number" } },
        documentId: { type: "string", description: "Existing document ID for similar-document vector search." },
        k: { type: "integer", description: "Nearest neighbor count inside vector_query." },
        filterBy: { type: "string" },
        sortBy: { type: "string" },
        perPage: { type: "integer", default: 10 },
        page: { type: "integer" },
        includeFields: { type: "string" },
        excludeFields: { type: "string" },
        prefix: { description: "Typesense prefix search setting." },
        exhaustiveSearch: { type: "boolean" },
        searchParameters: { type: "object", additionalProperties: true },
        queryParameters: { type: "object", additionalProperties: true },
      },
      required: ["baseUrl", "collection"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Typesense API key");
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${cleanBaseUrl(args.baseUrl)}/multi_search`, args.queryParameters as Record<string, string | number | boolean | undefined> | undefined),
      {
        method: "POST",
        headers: typesenseApiKeyHeaders(apiKey),
        body: {
          searches: [
            compactObject({
              collection: args.collection,
              q: args.q ?? "*",
              query_by: args.queryBy,
              vector_query: typesenseVectorQuery(args),
              filter_by: args.filterBy,
              sort_by: args.sortBy,
              per_page: args.perPage ?? 10,
              page: args.page,
              include_fields: args.includeFields,
              exclude_fields: args.excludeFields,
              prefix: args.prefix as Json | undefined,
              ...(args.searchParameters ?? {}),
            }) as JsonObject,
          ],
        },
      },
    );
  },
);

export const supabaseVectorUpsertTool = defineTool<SupabaseVectorUpsertArgs, JsonObject>(
  {
    name: "supabase_vector_upsert",
    description: "Insert or upsert embedded document rows into a Supabase pgvector table through PostgREST.",
    parameters: {
      type: "object",
      properties: {
        projectUrl: { type: "string", description: "Supabase project URL, e.g. https://project.supabase.co." },
        tableName: { type: "string", default: "documents" },
        serviceRoleKey: { description: "Supabase service role key or Chidori memory secret reference." },
        rows: { type: "array", items: { type: "object", additionalProperties: true } },
        onConflict: { type: "string", description: "Comma-separated unique columns for upsert conflict resolution." },
        ignoreDuplicates: { type: "boolean", default: false },
        returnRepresentation: { type: "boolean", default: false },
        schema: { type: "string", description: "PostgREST schema profile." },
        queryParameters: { type: "object", additionalProperties: true },
      },
      required: ["projectUrl", "rows"],
    },
  },
  async (args, chidori) => {
    const serviceRoleKey = await resolveSecret(args.serviceRoleKey, chidori, "Supabase service role key");
    const preferParts = [
      `resolution=${args.ignoreDuplicates ? "ignore-duplicates" : "merge-duplicates"}`,
      `return=${args.returnRepresentation ? "representation" : "minimal"}`,
    ];
    const response = await requestJson<Json>(
      chidori,
      supabaseRestUrl(args.projectUrl, args.tableName ?? "documents", {
        ...(args.queryParameters as Record<string, string | number | boolean | undefined> | undefined),
        on_conflict: args.onConflict,
      }),
      {
        method: "POST",
        headers: supabaseHeaders(serviceRoleKey, args.schema, preferParts.join(",")),
        body: args.rows as unknown as Json,
      },
    );
    return {
      result: response,
    };
  },
);

export const supabaseVectorMatchTool = defineTool<SupabaseVectorMatchArgs, JsonObject>(
  {
    name: "supabase_vector_match",
    description: "Call a Supabase pgvector match RPC such as match_documents.",
    parameters: {
      type: "object",
      properties: {
        projectUrl: { type: "string", description: "Supabase project URL, e.g. https://project.supabase.co." },
        queryName: { type: "string", default: "match_documents" },
        serviceRoleKey: { description: "Supabase service role key or Chidori memory secret reference." },
        queryEmbedding: { type: "array", items: { type: "number" } },
        matchCount: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        rpcArgs: { type: "object", additionalProperties: true },
        schema: { type: "string", description: "PostgREST schema profile." },
      },
      required: ["projectUrl", "queryEmbedding"],
    },
  },
  async (args, chidori) => {
    const serviceRoleKey = await resolveSecret(args.serviceRoleKey, chidori, "Supabase service role key");
    return requestJson<JsonObject>(
      chidori,
      supabaseRestUrl(args.projectUrl, `rpc/${encodeURIComponent(args.queryName ?? "match_documents")}`),
      {
        method: "POST",
        headers: supabaseHeaders(serviceRoleKey, args.schema),
        body: compactObject({
          query_embedding: args.queryEmbedding,
          match_count: args.matchCount ?? 10,
          filter: args.filter,
          ...(args.rpcArgs ?? {}),
        }) as JsonObject,
      },
    );
  },
);

export const astraDbInsertManyTool = defineTool<AstraDbInsertManyArgs, JsonObject>(
  {
    name: "astra_db_insert_many",
    description: "Insert vector-enabled documents into an Astra DB Data API collection.",
    parameters: {
      type: "object",
      properties: {
        apiEndpoint: { type: "string", description: "Astra DB API endpoint." },
        keyspace: { type: "string", description: "Astra DB keyspace." },
        collection: { type: "string", description: "Astra DB collection name." },
        token: { description: "Astra DB application token or Chidori memory secret reference." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        ordered: { type: "boolean", default: false },
        timeoutMs: { type: "integer" },
      },
      required: ["apiEndpoint", "keyspace", "collection", "documents"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Astra DB application token");
    return requestJson<JsonObject>(chidori, astraDbCollectionUrl(args), compactObject({
      method: "POST",
      headers: jsonHeaders({ Token: token }),
      body: {
        insertMany: {
          documents: args.documents as unknown as Json,
          options: compactObject({
            ordered: args.ordered ?? false,
          }) as JsonObject,
        },
      },
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
  },
);

export const astraDbFindTool = defineTool<AstraDbFindArgs, JsonObject>(
  {
    name: "astra_db_find",
    description: "Find documents in an Astra DB Data API collection, including vector search.",
    parameters: {
      type: "object",
      properties: {
        apiEndpoint: { type: "string", description: "Astra DB API endpoint." },
        keyspace: { type: "string", description: "Astra DB keyspace." },
        collection: { type: "string", description: "Astra DB collection name." },
        token: { description: "Astra DB application token or Chidori memory secret reference." },
        filter: { type: "object", additionalProperties: true },
        sort: { type: "object", additionalProperties: true },
        vector: { type: "array", items: { type: "number" }, description: "Convenience vector for sort.$vector." },
        vectorize: { type: "string", description: "Convenience text for sort.$vectorize." },
        projection: { type: "object", additionalProperties: true },
        limit: { type: "integer", default: 10 },
        skip: { type: "integer" },
        includeSimilarity: { type: "boolean", default: true },
        includeSortVector: { type: "boolean", default: false },
        timeoutMs: { type: "integer" },
      },
      required: ["apiEndpoint", "keyspace", "collection"],
    },
  },
  async (args, chidori) => {
    const token = await resolveSecret(args.token, chidori, "Astra DB application token");
    const sort = args.sort
      ?? (args.vector ? { $vector: args.vector } : args.vectorize ? { $vectorize: args.vectorize } : undefined);
    return requestJson<JsonObject>(chidori, astraDbCollectionUrl(args), compactObject({
      method: "POST",
      headers: jsonHeaders({ Token: token }),
      body: {
        find: compactObject({
          filter: args.filter,
          sort,
          projection: args.projection,
          options: compactObject({
            includeSimilarity: args.includeSimilarity ?? true,
            includeSortVector: args.includeSortVector ?? false,
            skip: args.skip,
            limit: args.limit ?? 10,
          }) as JsonObject,
        }) as JsonObject,
      },
      timeoutMs: args.timeoutMs,
    }) as ChidoriHttpRequestOptions);
  },
);

export const vectaraDocumentIndexTool = defineTool<VectaraDocumentIndexArgs, JsonObject>(
  {
    name: "vectara_document_index",
    description: "Index a structured or core document into a Vectara corpus.",
    parameters: {
      type: "object",
      properties: {
        corpusKey: { type: "string", description: "Vectara corpus key." },
        apiKey: { description: "Vectara API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.vectara.io/v2" },
        document: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["corpusKey", "document"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Vectara API key");
    return requestJson<JsonObject>(
      chidori,
      vectaraUrl(args.baseUrl, `/corpora/${encodeURIComponent(args.corpusKey)}/documents`),
      compactObject({
        method: "POST",
        headers: vectaraHeaders(apiKey),
        body: args.document,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const vectaraCorpusQueryTool = defineTool<VectaraCorpusQueryArgs, JsonObject>(
  {
    name: "vectara_corpus_query",
    description: "Query a Vectara corpus with optional hybrid search, reranking, context, and generation settings.",
    parameters: {
      type: "object",
      properties: {
        corpusKey: { type: "string", description: "Vectara corpus key." },
        apiKey: { description: "Vectara API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.vectara.io/v2" },
        query: { type: "string" },
        metadataFilter: { type: "string" },
        lexicalInterpolation: { type: "number" },
        customDimensions: { type: "object", additionalProperties: true },
        limit: { type: "integer", default: 10 },
        offset: { type: "integer", default: 0 },
        contextConfiguration: { type: "object", additionalProperties: true },
        reranker: { type: "object", additionalProperties: true },
        generation: { description: "Vectara generation configuration, or null to disable generation." },
        streamResponse: { type: "boolean", default: false },
        search: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["corpusKey", "query"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Vectara API key");
    const search = args.search ?? compactObject({
      corpora: [
        compactObject({
          corpus_key: args.corpusKey,
          metadata_filter: args.metadataFilter,
          lexical_interpolation: args.lexicalInterpolation,
          custom_dimensions: args.customDimensions,
        }) as JsonObject,
      ],
      limit: args.limit ?? 10,
      offset: args.offset ?? 0,
      context_configuration: args.contextConfiguration,
      reranker: args.reranker,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      vectaraUrl(args.baseUrl, `/corpora/${encodeURIComponent(args.corpusKey)}/query`),
      compactObject({
        method: "POST",
        headers: vectaraHeaders(apiKey),
        body: compactObject({
          query: args.query,
          search,
          generation: args.generation,
          stream_response: args.streamResponse,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const xataVectorsAddTool = defineTool<XataVectorsAddArgs, JsonObject>(
  {
    name: "xata_vectors_add",
    description: "Insert or replace Xata vector rows using the transaction API, using content and embedding columns by default.",
    parameters: {
      type: "object",
      properties: {
        databaseUrl: { type: "string", description: "Xata database URL, including /db/<database>:<branch>." },
        table: { type: "string", description: "Xata table name." },
        apiKey: { description: "Xata API key or Chidori memory secret reference." },
        documents: { type: "array", items: { type: "object", additionalProperties: true }, description: "Documents with pageContent and optional metadata." },
        vectors: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Embedding vectors matching the documents array." },
        records: { type: "array", items: { type: "object", additionalProperties: true }, description: "Pre-shaped Xata records. When set, documents and vectors are ignored." },
        ids: { type: "array", items: { type: "string" }, description: "Optional record IDs used when mapping documents and vectors." },
        contentColumn: { type: "string", default: "content" },
        vectorColumn: { type: "string", default: "embedding" },
        createOnly: { type: "boolean", default: false },
        ifVersion: { type: "integer" },
        columns: { type: "array", items: { type: "string" }, description: "Columns to return from Xata." },
        timeoutMs: { type: "integer" },
      },
      required: ["databaseUrl", "table"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Xata API key");
    return requestJson<JsonObject>(
      chidori,
      xataUrl(args.databaseUrl, "transaction"),
      compactObject({
        method: "POST",
        headers: xataHeaders(apiKey),
        body: { operations: xataInsertOperations(args) },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const xataVectorSearchTool = defineTool<XataVectorSearchArgs, JsonObject>(
  {
    name: "xata_vector_search",
    description: "Run vector similarity search against a Xata table vector column.",
    parameters: {
      type: "object",
      properties: {
        databaseUrl: { type: "string", description: "Xata database URL, including /db/<database>:<branch>." },
        table: { type: "string", description: "Xata table name." },
        apiKey: { description: "Xata API key or Chidori memory secret reference." },
        column: { type: "string", default: "embedding" },
        queryVector: { type: "array", items: { type: "number" } },
        similarityFunction: { type: "string", enum: ["cosineSimilarity", "l1", "l2"], default: "cosineSimilarity" },
        size: { type: "integer", default: 10 },
        filter: { type: "object", additionalProperties: true },
        timeoutMs: { type: "integer" },
      },
      required: ["databaseUrl", "table", "queryVector"],
    },
  },
  async (args, chidori) => {
    const apiKey = await resolveSecret(args.apiKey, chidori, "Xata API key");
    return requestJson<JsonObject>(
      chidori,
      xataUrl(args.databaseUrl, `tables/${encodeURIComponent(args.table)}/vectorSearch`),
      compactObject({
        method: "POST",
        headers: xataHeaders(apiKey),
        body: compactObject({
          column: args.column ?? "embedding",
          queryVector: args.queryVector,
          similarityFunction: args.similarityFunction,
          size: args.size ?? 10,
          filter: args.filter,
        }) as JsonObject,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const couchbaseSearchQueryTool = defineTool<CouchbaseSearchQueryArgs, JsonObject>(
  {
    name: "couchbase_search_query",
    description: "Run a Couchbase Search Service query, including vector or hybrid KNN search, through the Search REST API.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Couchbase Search Service endpoint, for example http://localhost:8094 or https://host:18094." },
        bucket: { type: "string", description: "Couchbase bucket name." },
        scope: { type: "string", description: "Couchbase scope name." },
        indexName: { type: "string", description: "Couchbase Search index name." },
        authorization: { description: "Full Authorization header value, such as Basic or Bearer, or a Chidori memory secret reference." },
        username: { description: "Couchbase username or Chidori memory secret reference." },
        password: { description: "Couchbase password or Chidori memory secret reference." },
        fields: { type: "array", items: { type: "string" }, default: ["*"] },
        query: { type: "object", additionalProperties: true },
        vectorField: { type: "string", description: "Vector field name for a generated KNN query." },
        vector: { type: "array", items: { type: "number" }, description: "Query vector for a generated KNN query." },
        k: { type: "integer", default: 10 },
        knn: { type: "array", items: { type: "object", additionalProperties: true }, description: "Full Couchbase knn array. Overrides vectorField/vector." },
        knnOperator: { type: "string", enum: ["and", "or"] },
        size: { type: "integer", default: 10 },
        from: { type: "integer", default: 0 },
        highlight: { type: "object", additionalProperties: true },
        sort: { type: "array", items: {} },
        facets: { type: "object", additionalProperties: true },
        explain: { type: "boolean" },
        includeLocations: { type: "boolean" },
        ctl: { type: "object", additionalProperties: true },
        body: { type: "object", additionalProperties: true, description: "Full Couchbase Search request body. When provided, this is sent as-is." },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "bucket", "scope", "indexName"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      couchbaseSearchUrl(args),
      compactObject({
        method: "POST",
        headers: await couchbaseHeaders(args, chidori),
        body: couchbaseSearchBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const couchbaseQueryExecuteTool = defineTool<CouchbaseQueryExecuteArgs, JsonObject>(
  {
    name: "couchbase_query_execute",
    description: "Execute a Couchbase Query Service N1QL statement, including vector-search statements, through the Query REST API.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Couchbase Query Service endpoint, for example http://localhost:8093 or https://host:18093." },
        authorization: { description: "Full Authorization header value, such as Basic or Bearer, or a Chidori memory secret reference." },
        username: { description: "Couchbase username or Chidori memory secret reference." },
        password: { description: "Couchbase password or Chidori memory secret reference." },
        statement: { type: "string", description: "N1QL statement to execute." },
        parameters: { type: "array", items: {}, description: "Positional N1QL parameters." },
        namedParameters: { type: "object", additionalProperties: true, description: "Named N1QL parameters. Keys are sent with a $ prefix." },
        queryOptions: { type: "object", additionalProperties: true, description: "Additional Query Service request fields such as readonly, scan_consistency, profile, or timeout." },
        body: { type: "object", additionalProperties: true, description: "Full Query Service request body. When provided, this is sent as-is." },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      couchbaseQueryUrl(args.baseUrl),
      compactObject({
        method: "POST",
        headers: await couchbaseHeaders(args, chidori),
        body: couchbaseQueryBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const meilisearchDocumentsAddTool = defineTool<MeilisearchDocumentsAddArgs, JsonObject>(
  {
    name: "meilisearch_documents_add",
    description: "Add or update documents in a Meilisearch index, including documents with user-provided vectors.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Meilisearch host URL." },
        indexUid: { type: "string", description: "Meilisearch index UID." },
        apiKey: { description: "Meilisearch API key or Chidori memory secret reference." },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
        primaryKey: { type: "string", description: "Primary key to set when the index is first created." },
        update: { type: "boolean", default: false, description: "Use add/update documents instead of add/replace documents." },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "indexUid", "documents"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      meilisearchUrl(args.baseUrl, args.indexUid, "documents", args.primaryKey),
      compactObject({
        method: args.update ? "PUT" : "POST",
        headers: await meilisearchHeaders(args.apiKey, chidori),
        body: args.documents,
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const meilisearchSearchTool = defineTool<MeilisearchSearchArgs, JsonObject>(
  {
    name: "meilisearch_search",
    description: "Search a Meilisearch index with keyword, vector, or hybrid search parameters.",
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
        attributesToCrop: { type: "array", items: { type: "string" } },
        cropLength: { type: "integer" },
        cropMarker: { type: "string" },
        attributesToHighlight: { type: "array", items: { type: "string" } },
        highlightPreTag: { type: "string" },
        highlightPostTag: { type: "string" },
        showMatchesPosition: { type: "boolean" },
        showRankingScore: { type: "boolean" },
        showRankingScoreDetails: { type: "boolean" },
        retrieveVectors: { type: "boolean" },
        facets: { type: "array", items: { type: "string" } },
        sort: { type: "array", items: { type: "string" } },
        matchingStrategy: { type: "string" },
        body: { type: "object", additionalProperties: true, description: "Full Meilisearch search body. When provided, this is sent as-is." },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "indexUid"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      meilisearchUrl(args.baseUrl, args.indexUid, "search"),
      compactObject({
        method: "POST",
        headers: await meilisearchHeaders(args.apiKey, chidori),
        body: meilisearchSearchBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const vespaDocumentPutTool = defineTool<VespaDocumentPutArgs, JsonObject>(
  {
    name: "vespa_document_put",
    description: "Feed or replace a document in Vespa through the Document V1 HTTP API.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Vespa endpoint, for example https://tenant.app.region.vespa-app.cloud." },
        namespace: { type: "string", description: "Vespa document namespace." },
        documentType: { type: "string", description: "Vespa document type/schema name." },
        documentId: { type: "string", description: "Document ID within the namespace and type." },
        fields: { type: "object", additionalProperties: true, description: "Document fields payload." },
        token: { description: "Optional Vespa bearer token or Chidori memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" }, description: "Additional headers for custom auth/proxies." },
        create: { type: "boolean", description: "Set Vespa create=true for create-only writes." },
        condition: { type: "string", description: "Optional Vespa document condition." },
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl", "namespace", "documentType", "documentId", "fields"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      vespaDocumentUrl(args),
      compactObject({
        method: "PUT",
        headers: await vespaHeaders(args.token, args.headers, chidori),
        body: { fields: args.fields },
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const vespaQueryTool = defineTool<VespaQueryArgs, JsonObject>(
  {
    name: "vespa_query",
    description: "Query Vespa using the Search API with YQL, query text, ranking, or a caller-provided request body.",
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
        timeoutMs: { type: "integer" },
      },
      required: ["baseUrl"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${cleanBaseUrl(args.baseUrl)}/search/`,
      compactObject({
        method: "POST",
        headers: await vespaHeaders(args.token, args.headers, chidori),
        body: vespaQueryBody(args),
        timeoutMs: args.timeoutMs,
      }) as ChidoriHttpRequestOptions,
    );
  },
);

export const vectorStoreTools = {
  pineconeUpsert: pineconeUpsertTool,
  pineconeQuery: pineconeQueryTool,
  pineconeEmbeddings: pineconeEmbeddingsTool,
  pineconeRerank: pineconeRerankTool,
  qdrantUpsert: qdrantUpsertTool,
  qdrantSearch: qdrantSearchTool,
  weaviateBatchObjects: weaviateBatchObjectsTool,
  weaviateGraphQL: weaviateGraphQLTool,
  milvusInsert: milvusInsertTool,
  milvusSearch: milvusSearchTool,
  chromaUpsert: chromaUpsertTool,
  chromaQuery: chromaQueryTool,
  mongoAtlasVectorSearch: mongoAtlasVectorSearchTool,
  upstashVectorUpsert: upstashVectorUpsertTool,
  upstashVectorQuery: upstashVectorQueryTool,
  cloudflareVectorizeUpsert: cloudflareVectorizeUpsertTool,
  cloudflareVectorizeQuery: cloudflareVectorizeQueryTool,
  azureAiSearchUpload: azureAiSearchUploadTool,
  azureAiSearchVectorSearch: azureAiSearchVectorSearchTool,
  azionEdgeSqlVectorsAdd: azionEdgeSqlVectorsAddTool,
  azionEdgeSqlVectorSearch: azionEdgeSqlVectorSearchTool,
  azionEdgeSqlDelete: azionEdgeSqlDeleteTool,
  elasticsearchIndexDocument: elasticsearchIndexDocumentTool,
  elasticsearchKnnSearch: elasticsearchKnnSearchTool,
  opensearchIndexDocument: opensearchIndexDocumentTool,
  opensearchKnnSearch: opensearchKnnSearchTool,
  clickHouseInsert: clickHouseInsertTool,
  clickHouseVectorSearch: clickHouseVectorSearchTool,
  clickHouseDelete: clickHouseDeleteTool,
  azureCosmosDbNoSqlDocumentUpsert: azureCosmosDbNoSqlDocumentUpsertTool,
  azureCosmosDbNoSqlQuery: azureCosmosDbNoSqlQueryTool,
  azureCosmosDbNoSqlDocumentDelete: azureCosmosDbNoSqlDocumentDeleteTool,
  turbopufferWrite: turbopufferWriteTool,
  turbopufferQuery: turbopufferQueryTool,
  rocksetQuery: rocksetQueryTool,
  rocksetDocumentsAdd: rocksetDocumentsAddTool,
  rocksetDocumentsDelete: rocksetDocumentsDeleteTool,
  typesenseDocumentsImport: typesenseDocumentsImportTool,
  typesenseVectorSearch: typesenseVectorSearchTool,
  supabaseVectorUpsert: supabaseVectorUpsertTool,
  supabaseVectorMatch: supabaseVectorMatchTool,
  astraDbInsertMany: astraDbInsertManyTool,
  astraDbFind: astraDbFindTool,
  vectaraDocumentIndex: vectaraDocumentIndexTool,
  vectaraCorpusQuery: vectaraCorpusQueryTool,
  xataVectorsAdd: xataVectorsAddTool,
  xataVectorSearch: xataVectorSearchTool,
  couchbaseSearchQuery: couchbaseSearchQueryTool,
  couchbaseQueryExecute: couchbaseQueryExecuteTool,
  meilisearchDocumentsAdd: meilisearchDocumentsAddTool,
  meilisearchSearch: meilisearchSearchTool,
  vespaDocumentPut: vespaDocumentPutTool,
  vespaQuery: vespaQueryTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getVectorStoreEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "VECTOR_STORE_API_KEY", description: "Generic vector store API key." },
    { name: "PINECONE_API_KEY", description: "Pinecone API key." },
    { name: "QDRANT_API_KEY", description: "Qdrant API key." },
    { name: "WEAVIATE_API_KEY", description: "Weaviate API key." },
    { name: "MILVUS_TOKEN", description: "Milvus bearer token." },
    { name: "CHROMA_API_KEY", description: "Chroma API key." },
    { name: "MONGODB_ATLAS_API_KEY", description: "MongoDB Atlas endpoint API key." },
    { name: "UPSTASH_VECTOR_REST_TOKEN", description: "Upstash Vector REST token." },
    { name: "CLOUDFLARE_ACCOUNT_ID", description: "Cloudflare account ID for Vectorize." },
    { name: "CLOUDFLARE_API_TOKEN", description: "Cloudflare API token." },
    { name: "AZURE_AI_SEARCH_API_KEY", description: "Azure AI Search API key." },
    { name: "AZION_API_TOKEN", description: "Azion API token." },
    { name: "ELASTICSEARCH_API_KEY", description: "Elasticsearch API key." },
    { name: "OPENSEARCH_API_KEY", description: "OpenSearch API key." },
    { name: "CLICKHOUSE_AUTHORIZATION", description: "ClickHouse Authorization header." },
    { name: "CLICKHOUSE_USERNAME", description: "ClickHouse username." },
    { name: "CLICKHOUSE_PASSWORD", description: "ClickHouse password." },
    { name: "TURBOPUFFER_API_KEY", description: "turbopuffer API key." },
    { name: "ROCKSET_API_KEY", description: "Rockset API key." },
    { name: "TYPESENSE_API_KEY", description: "Typesense API key." },
    { name: "SUPABASE_SERVICE_ROLE_KEY", description: "Supabase service role key." },
    { name: "ASTRA_DB_APPLICATION_TOKEN", description: "Astra DB application token." },
    { name: "VECTARA_API_KEY", description: "Vectara API key." },
    { name: "XATA_API_KEY", description: "Xata API key." },
    { name: "COUCHBASE_AUTHORIZATION", description: "Couchbase Authorization header." },
    { name: "COUCHBASE_USERNAME", description: "Couchbase username." },
    { name: "COUCHBASE_PASSWORD", description: "Couchbase password." },
    { name: "MEILISEARCH_API_KEY", description: "Meilisearch API key." },
    { name: "VESPA_BEARER_TOKEN", description: "Vespa bearer token." },
    { name: "AZURE_COSMOS_DB_AUTHORIZATION", description: "Azure Cosmos DB authorization header." },
  ];
}

export const vectorStoreIntegrationSpec = {
  environmentVariables: getVectorStoreEnvironmentVariables,
} satisfies IntegrationSpec;
