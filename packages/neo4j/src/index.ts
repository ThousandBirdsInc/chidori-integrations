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

export interface Neo4jAuthArgs {
  username?: SecretInput;
  password?: SecretInput;
  authorization?: SecretInput;
  baseUrl?: string;
  database?: string;
}

export interface Neo4jCypherQueryArgs extends Neo4jAuthArgs {
  statement: string;
  parameters?: JsonObject;
  accessMode?: "Read" | "Write";
  includeCounters?: boolean;
  bookmarks?: string[];
  typedJson?: boolean;
}

export interface Neo4jVectorIndexCreateArgs extends Neo4jAuthArgs {
  indexName: string;
  nodeLabel: string;
  embeddingProperty?: string;
  dimensions?: number;
  similarityFunction?: "cosine" | "euclidean";
}

export interface Neo4jVectorQueryArgs extends Neo4jAuthArgs {
  indexName: string;
  embedding: number[];
  topK?: number;
  accessMode?: "Read" | "Write";
}

export interface Neo4jDocumentUpsert {
  id: string;
  text?: string;
  embedding?: number[];
  properties?: JsonObject;
}

export interface Neo4jDocumentsUpsertArgs extends Neo4jAuthArgs {
  nodeLabel?: string;
  idProperty?: string;
  textProperty?: string;
  embeddingProperty?: string;
  documents: Neo4jDocumentUpsert[];
}

function neo4jBaseUrl(args: Neo4jAuthArgs): string {
  return (args.baseUrl ?? "http://localhost:7474").replace(/\/+$/, "");
}

function neo4jDatabase(args: Neo4jAuthArgs): string {
  return encodeURIComponent(args.database ?? "neo4j");
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

async function neo4jHeaders(args: Neo4jCypherQueryArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const contentType = args.typedJson ? "application/vnd.neo4j.query.v1.1" : "application/json";
  let authorization: string;
  if (args.authorization) {
    authorization = await resolveSecret(args.authorization, chidori, "Neo4j Authorization header");
  } else {
    const username = await resolveSecret(args.username, chidori, "Neo4j username");
    const password = await resolveSecret(args.password, chidori, "Neo4j password");
    authorization = `Basic ${base64Ascii(`${username}:${password}`)}`;
  }
  return jsonHeaders({
    Authorization: authorization,
    Accept: contentType,
    "content-type": contentType,
  });
}

function queryEndpoint(args: Neo4jAuthArgs): string {
  return `${neo4jBaseUrl(args)}/db/${neo4jDatabase(args)}/query/v2`;
}

async function neo4jQuery(args: Neo4jCypherQueryArgs, chidori: Parameters<typeof requestJson>[0]): Promise<JsonObject> {
  return requestJson<JsonObject>(chidori, queryEndpoint(args), {
    method: "POST",
    headers: await neo4jHeaders(args, chidori),
    body: compactObject({
      statement: args.statement,
      parameters: args.parameters,
      accessMode: args.accessMode,
      includeCounters: args.includeCounters,
      bookmarks: args.bookmarks,
    }) as JsonObject,
  });
}

function cypherIdentifier(identifier: string, label: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
    throw new Error(`${label} must contain only letters, numbers, and underscores and must not start with a number`);
  }
  return `\`${identifier}\``;
}

function queryRows(result: JsonObject): JsonObject[] {
  const data = result.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return [];
  }
  const fields = Array.isArray(data.fields) ? data.fields.filter((field): field is string => typeof field === "string") : [];
  const values = Array.isArray(data.values) ? data.values : [];
  return values.filter(Array.isArray).map((row) => {
    const output: JsonObject = {};
    for (let index = 0; index < fields.length; index += 1) {
      output[fields[index] as string] = row[index] as Json;
    }
    return output;
  });
}

export const neo4jCypherQueryTool = defineTool<Neo4jCypherQueryArgs, JsonObject>(
  {
    name: "neo4j_cypher_query",
    description: "Execute a Cypher statement through Neo4j Query API.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Neo4j username or Chidori memory secret reference." },
        password: { description: "Neo4j password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:7474" },
        database: { type: "string", default: "neo4j" },
        statement: { type: "string" },
        parameters: { type: "object", additionalProperties: true },
        accessMode: { type: "string", enum: ["Read", "Write"] },
        includeCounters: { type: "boolean" },
        bookmarks: { type: "array", items: { type: "string" } },
        typedJson: { type: "boolean" },
      },
      required: ["statement"],
    },
  },
  async (args, chidori) => neo4jQuery(args, chidori),
);

export const neo4jSchemaGetTool = defineTool<Neo4jAuthArgs, JsonObject>(
  {
    name: "neo4j_schema_get",
    description: "Fetch Neo4j labels, relationship types, and indexes for graph-aware agents.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Neo4j username or Chidori memory secret reference." },
        password: { description: "Neo4j password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:7474" },
        database: { type: "string", default: "neo4j" },
      },
    },
  },
  async (args, chidori) => {
    const [labels, relationshipTypes, indexes] = await Promise.all([
      neo4jQuery({
        ...args,
        statement: "CALL db.labels() YIELD label RETURN collect(label) AS labels",
        accessMode: "Read",
      }, chidori),
      neo4jQuery({
        ...args,
        statement: "CALL db.relationshipTypes() YIELD relationshipType RETURN collect(relationshipType) AS relationshipTypes",
        accessMode: "Read",
      }, chidori),
      neo4jQuery({
        ...args,
        statement: "SHOW INDEXES YIELD name, type, entityType, labelsOrTypes, properties RETURN collect({name: name, type: type, entityType: entityType, labelsOrTypes: labelsOrTypes, properties: properties}) AS indexes",
        accessMode: "Read",
      }, chidori),
    ]);
    return {
      labels: queryRows(labels)[0]?.labels ?? [],
      relationshipTypes: queryRows(relationshipTypes)[0]?.relationshipTypes ?? [],
      indexes: queryRows(indexes)[0]?.indexes ?? [],
    };
  },
);

export const neo4jVectorIndexCreateTool = defineTool<Neo4jVectorIndexCreateArgs, JsonObject>(
  {
    name: "neo4j_vector_index_create",
    description: "Create a Neo4j node vector index for an embedding property.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Neo4j username or Chidori memory secret reference." },
        password: { description: "Neo4j password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:7474" },
        database: { type: "string", default: "neo4j" },
        indexName: { type: "string" },
        nodeLabel: { type: "string" },
        embeddingProperty: { type: "string", default: "embedding" },
        dimensions: { type: "integer" },
        similarityFunction: { type: "string", enum: ["cosine", "euclidean"], default: "cosine" },
      },
      required: ["indexName", "nodeLabel"],
    },
  },
  async (args, chidori) => {
    const statement = [
      `CREATE VECTOR INDEX ${cypherIdentifier(args.indexName, "indexName")} IF NOT EXISTS`,
      `FOR (n:${cypherIdentifier(args.nodeLabel, "nodeLabel")})`,
      `ON (n.${cypherIdentifier(args.embeddingProperty ?? "embedding", "embeddingProperty")})`,
      "OPTIONS {indexConfig: {",
      "`vector.dimensions`: $dimensions,",
      "`vector.similarity_function`: $similarityFunction",
      "}}",
    ].join(" ");
    return neo4jQuery({
      ...args,
      statement,
      parameters: {
        dimensions: args.dimensions ?? 1536,
        similarityFunction: args.similarityFunction ?? "cosine",
      },
      includeCounters: true,
    }, chidori);
  },
);

export const neo4jVectorQueryTool = defineTool<Neo4jVectorQueryArgs, JsonObject>(
  {
    name: "neo4j_vector_query",
    description: "Query a Neo4j node vector index and return matching nodes with scores.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Neo4j username or Chidori memory secret reference." },
        password: { description: "Neo4j password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:7474" },
        database: { type: "string", default: "neo4j" },
        indexName: { type: "string" },
        embedding: { type: "array", items: { type: "number" } },
        topK: { type: "integer", default: 4 },
        accessMode: { type: "string", enum: ["Read", "Write"] },
      },
      required: ["indexName", "embedding"],
    },
  },
  async (args, chidori) => {
    const result = await neo4jQuery({
      ...args,
      statement: "CALL db.index.vector.queryNodes($indexName, $topK, $embedding) YIELD node, score RETURN node, score",
      parameters: {
        indexName: args.indexName,
        topK: args.topK ?? 4,
        embedding: args.embedding,
      },
      accessMode: args.accessMode ?? "Read",
    }, chidori);
    return {
      ...result,
      rows: queryRows(result),
    };
  },
);

export const neo4jDocumentsUpsertTool = defineTool<Neo4jDocumentsUpsertArgs, JsonObject>(
  {
    name: "neo4j_documents_upsert",
    description: "Upsert text and embedding documents into Neo4j nodes for graph/vector retrieval.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "Neo4j username or Chidori memory secret reference." },
        password: { description: "Neo4j password or Chidori memory secret reference." },
        authorization: { description: "Full Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "http://localhost:7474" },
        database: { type: "string", default: "neo4j" },
        nodeLabel: { type: "string", default: "Document" },
        idProperty: { type: "string", default: "id" },
        textProperty: { type: "string", default: "text" },
        embeddingProperty: { type: "string", default: "embedding" },
        documents: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["documents"],
    },
  },
  async (args, chidori) => {
    const nodeLabel = cypherIdentifier(args.nodeLabel ?? "Document", "nodeLabel");
    const idProperty = cypherIdentifier(args.idProperty ?? "id", "idProperty");
    const textProperty = cypherIdentifier(args.textProperty ?? "text", "textProperty");
    const embeddingProperty = cypherIdentifier(args.embeddingProperty ?? "embedding", "embeddingProperty");
    const documents = args.documents.map((document) => compactObject({
      id: document.id,
      text: document.text,
      embedding: document.embedding,
      properties: document.properties,
    }) as JsonObject);
    const statement = [
      "UNWIND $documents AS doc",
      `MERGE (n:${nodeLabel} {${idProperty}: doc.id})`,
      "SET n += coalesce(doc.properties, {})",
      `SET n.${textProperty} = doc.text`,
      `SET n.${embeddingProperty} = doc.embedding`,
      "RETURN count(n) AS upserted",
    ].join(" ");
    return neo4jQuery({
      ...args,
      statement,
      parameters: { documents },
      includeCounters: true,
    }, chidori);
  },
);

export const neo4jTools = {
  cypherQuery: neo4jCypherQueryTool,
  schemaGet: neo4jSchemaGetTool,
  vectorIndexCreate: neo4jVectorIndexCreateTool,
  vectorQuery: neo4jVectorQueryTool,
  documentsUpsert: neo4jDocumentsUpsertTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getNeo4jEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "NEO4J_BASE_URL", description: "Neo4j HTTP endpoint." },
    { name: "NEO4J_AUTHORIZATION", description: "Neo4j Authorization header." },
    { name: "NEO4J_USERNAME", description: "Neo4j username." },
    { name: "NEO4J_PASSWORD", description: "Neo4j password." },
  ];
}

export const neo4jIntegrationSpec = {
  environmentVariables: getNeo4jEnvironmentVariables,
} satisfies IntegrationSpec;
