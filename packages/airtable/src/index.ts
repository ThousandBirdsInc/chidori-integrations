import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface AirtableAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface AirtableTableArgs extends AirtableAuthArgs {
  baseId: string;
  tableIdOrName: string;
}

export interface AirtableListRecordsArgs extends AirtableTableArgs {
  view?: string;
  filterByFormula?: string;
  fields?: string[];
  maxRecords?: number;
  pageSize?: number;
  offset?: string;
  cellFormat?: "json" | "string";
  timeZone?: string;
  userLocale?: string;
}

export interface AirtableGetRecordArgs extends AirtableTableArgs {
  recordId: string;
  cellFormat?: "json" | "string";
  timeZone?: string;
  userLocale?: string;
}

export interface AirtableRecordInput extends JsonObject {
  fields: JsonObject;
  id?: string;
}

export interface AirtableCreateRecordsArgs extends AirtableTableArgs {
  records: AirtableRecordInput[];
  typecast?: boolean;
  returnFieldsByFieldId?: boolean;
}

export interface AirtableUpdateRecordsArgs extends AirtableTableArgs {
  records: AirtableRecordInput[];
  typecast?: boolean;
  returnFieldsByFieldId?: boolean;
  replace?: boolean;
  performUpsert?: JsonObject;
}

export interface AirtableDeleteRecordArgs extends AirtableTableArgs {
  recordId: string;
}

function airtableBaseUrl(args: AirtableAuthArgs): string {
  return (args.baseUrl ?? "https://api.airtable.com/v0").replace(/\/+$/, "");
}

function airtableTableUrl(args: AirtableTableArgs): string {
  return `${airtableBaseUrl(args)}/${encodeURIComponent(args.baseId)}/${encodeURIComponent(args.tableIdOrName)}`;
}

async function airtableHeaders(args: AirtableAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Airtable token");
  return jsonHeaders(bearerAuth(token));
}

type QueryValue = string | number | boolean | undefined;

function withQueryEntries(url: string, entries: Array<readonly [string, QueryValue]>): string {
  const params = entries.filter((entry): entry is readonly [string, string | number | boolean] => {
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

function airtableListRecordsUrl(args: AirtableListRecordsArgs): string {
  const fieldEntries = args.fields?.map((field) => ["fields[]", field] as const) ?? [];
  return withQueryEntries(airtableTableUrl(args), [
    ["view", args.view],
    ["filterByFormula", args.filterByFormula],
    ...fieldEntries,
    ["maxRecords", args.maxRecords],
    ["pageSize", args.pageSize],
    ["offset", args.offset],
    ["cellFormat", args.cellFormat],
    ["timeZone", args.timeZone],
    ["userLocale", args.userLocale],
  ]);
}

export const airtableListRecordsTool = defineTool<AirtableListRecordsArgs, JsonObject>(
  {
    name: "airtable_records_list",
    description: "List records from an Airtable table.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string" },
        tableIdOrName: { type: "string" },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
        view: { type: "string" },
        filterByFormula: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        maxRecords: { type: "integer" },
        pageSize: { type: "integer" },
        offset: { type: "string" },
        cellFormat: { type: "string", enum: ["json", "string"] },
        timeZone: { type: "string" },
        userLocale: { type: "string" },
      },
      required: ["baseId", "tableIdOrName"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      airtableListRecordsUrl(args),
      {
        method: "GET",
        headers: await airtableHeaders(args, chidori),
      },
    );
  },
);

export const airtableGetRecordTool = defineTool<AirtableGetRecordArgs, JsonObject>(
  {
    name: "airtable_record_get",
    description: "Get one Airtable record by ID.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string" },
        tableIdOrName: { type: "string" },
        recordId: { type: "string" },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
        cellFormat: { type: "string", enum: ["json", "string"] },
        timeZone: { type: "string" },
        userLocale: { type: "string" },
      },
      required: ["baseId", "tableIdOrName", "recordId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${airtableTableUrl(args)}/${encodeURIComponent(args.recordId)}`, {
        cellFormat: args.cellFormat,
        timeZone: args.timeZone,
        userLocale: args.userLocale,
      }),
      {
        method: "GET",
        headers: await airtableHeaders(args, chidori),
      },
    );
  },
);

export const airtableCreateRecordsTool = defineTool<AirtableCreateRecordsArgs, JsonObject>(
  {
    name: "airtable_records_create",
    description: "Create records in an Airtable table.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string" },
        tableIdOrName: { type: "string" },
        records: { type: "array", items: { type: "object", additionalProperties: true } },
        typecast: { type: "boolean" },
        returnFieldsByFieldId: { type: "boolean" },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
      },
      required: ["baseId", "tableIdOrName", "records"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, airtableTableUrl(args), {
      method: "POST",
      headers: await airtableHeaders(args, chidori),
      body: compactObject({
        records: args.records,
        typecast: args.typecast,
        returnFieldsByFieldId: args.returnFieldsByFieldId,
      }) as JsonObject,
    });
  },
);

export const airtableUpdateRecordsTool = defineTool<AirtableUpdateRecordsArgs, JsonObject>(
  {
    name: "airtable_records_update",
    description: "Update records in an Airtable table.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string" },
        tableIdOrName: { type: "string" },
        records: { type: "array", items: { type: "object", additionalProperties: true } },
        typecast: { type: "boolean" },
        returnFieldsByFieldId: { type: "boolean" },
        replace: { type: "boolean", description: "Use PUT replacement updates instead of PATCH partial updates." },
        performUpsert: { type: "object", additionalProperties: true },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
      },
      required: ["baseId", "tableIdOrName", "records"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, airtableTableUrl(args), {
      method: args.replace ? "PUT" : "PATCH",
      headers: await airtableHeaders(args, chidori),
      body: compactObject({
        records: args.records,
        typecast: args.typecast,
        returnFieldsByFieldId: args.returnFieldsByFieldId,
        performUpsert: args.performUpsert,
      }) as JsonObject,
    });
  },
);

export const airtableDeleteRecordTool = defineTool<AirtableDeleteRecordArgs, JsonObject>(
  {
    name: "airtable_record_delete",
    description: "Delete one Airtable record by ID.",
    parameters: {
      type: "object",
      properties: {
        baseId: { type: "string" },
        tableIdOrName: { type: "string" },
        recordId: { type: "string" },
        token: { description: "Airtable personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.airtable.com/v0" },
      },
      required: ["baseId", "tableIdOrName", "recordId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${airtableTableUrl(args)}/${encodeURIComponent(args.recordId)}`, {
      method: "DELETE",
      headers: await airtableHeaders(args, chidori),
    });
  },
);

export const airtableTools = {
  listRecords: airtableListRecordsTool,
  getRecord: airtableGetRecordTool,
  createRecords: airtableCreateRecordsTool,
  updateRecords: airtableUpdateRecordsTool,
  deleteRecord: airtableDeleteRecordTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAirtableEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "AIRTABLE_TOKEN", description: "Airtable personal access token." },
  ];
}

export const airtableIntegrationSpec = {
  environmentVariables: getAirtableEnvironmentVariables,
} satisfies IntegrationSpec;
