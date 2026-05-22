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

export interface ServiceNowAuthArgs {
  instanceUrl: string;
  oauthToken?: SecretInput;
  username?: string;
  password?: SecretInput;
  apiPath?: string;
}

export interface ServiceNowTableArgs extends ServiceNowAuthArgs {
  table: string;
}

export interface ServiceNowListTableRecordsArgs extends ServiceNowTableArgs {
  query?: string;
  fields?: string[];
  displayValue?: boolean | "true" | "false" | "all";
  excludeReferenceLink?: boolean;
  suppressPaginationHeader?: boolean;
  limit?: number;
  offset?: number;
  view?: string;
}

export interface ServiceNowGetTableRecordArgs extends ServiceNowTableArgs {
  sysId: string;
  fields?: string[];
  displayValue?: boolean | "true" | "false" | "all";
  excludeReferenceLink?: boolean;
  view?: string;
}

export interface ServiceNowRecordBodyArgs extends ServiceNowTableArgs {
  record: JsonObject;
  displayValue?: boolean | "true" | "false" | "all";
  excludeReferenceLink?: boolean;
}

export interface ServiceNowUpdateTableRecordArgs extends ServiceNowRecordBodyArgs {
  sysId: string;
  replace?: boolean;
}

export interface ServiceNowDeleteTableRecordArgs extends ServiceNowTableArgs {
  sysId: string;
}

function serviceNowBaseUrl(args: ServiceNowAuthArgs): string {
  return `${args.instanceUrl.replace(/\/+$/, "")}${args.apiPath ?? "/api/now/table"}`;
}

async function serviceNowHeaders(args: ServiceNowAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
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

function tablePath(args: ServiceNowTableArgs): string {
  return `/${encodeURIComponent(args.table)}`;
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

function displayValue(value: boolean | "true" | "false" | "all" | undefined): string | undefined {
  return typeof value === "boolean" ? String(value) : value;
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

async function serviceNowRequest<T extends Json>(
  args: ServiceNowAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await serviceNowHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${serviceNowBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const serviceNowListTableRecordsTool = defineTool<ServiceNowListTableRecordsArgs, JsonObject>(
  {
    name: "servicenow_table_records_list",
    description: "List records from a ServiceNow table using encoded query parameters.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string" },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        table: { type: "string" },
        query: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        displayValue: { oneOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false", "all"] }] },
        excludeReferenceLink: { type: "boolean" },
        suppressPaginationHeader: { type: "boolean" },
        limit: { type: "integer" },
        offset: { type: "integer" },
        view: { type: "string" },
      },
      required: ["instanceUrl", "table"],
    },
  },
  async (args, chidori) => {
    return serviceNowRequest<JsonObject>(args, chidori, tablePath(args), {
      query: {
        sysparm_query: args.query,
        sysparm_fields: csv(args.fields),
        sysparm_display_value: displayValue(args.displayValue),
        sysparm_exclude_reference_link: args.excludeReferenceLink,
        sysparm_suppress_pagination_header: args.suppressPaginationHeader,
        sysparm_limit: args.limit,
        sysparm_offset: args.offset,
        sysparm_view: args.view,
      },
    });
  },
);

export const serviceNowGetTableRecordTool = defineTool<ServiceNowGetTableRecordArgs, JsonObject>(
  {
    name: "servicenow_table_record_get",
    description: "Get one ServiceNow table record by sys_id.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string" },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        table: { type: "string" },
        sysId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        displayValue: { oneOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false", "all"] }] },
        excludeReferenceLink: { type: "boolean" },
        view: { type: "string" },
      },
      required: ["instanceUrl", "table", "sysId"],
    },
  },
  async (args, chidori) => {
    return serviceNowRequest<JsonObject>(args, chidori, `${tablePath(args)}/${encodeURIComponent(args.sysId)}`, {
      query: {
        sysparm_fields: csv(args.fields),
        sysparm_display_value: displayValue(args.displayValue),
        sysparm_exclude_reference_link: args.excludeReferenceLink,
        sysparm_view: args.view,
      },
    });
  },
);

export const serviceNowCreateTableRecordTool = defineTool<ServiceNowRecordBodyArgs, JsonObject>(
  {
    name: "servicenow_table_record_create",
    description: "Create a ServiceNow table record.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string" },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        table: { type: "string" },
        record: { type: "object", additionalProperties: true },
        displayValue: { oneOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false", "all"] }] },
        excludeReferenceLink: { type: "boolean" },
      },
      required: ["instanceUrl", "table", "record"],
    },
  },
  async (args, chidori) => {
    return serviceNowRequest<JsonObject>(args, chidori, tablePath(args), {
      method: "POST",
      query: compactObject({
        sysparm_display_value: displayValue(args.displayValue),
        sysparm_exclude_reference_link: args.excludeReferenceLink,
      }),
      body: args.record,
    });
  },
);

export const serviceNowUpdateTableRecordTool = defineTool<ServiceNowUpdateTableRecordArgs, JsonObject>(
  {
    name: "servicenow_table_record_update",
    description: "Update a ServiceNow table record by sys_id using PATCH by default or PUT replacement.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string" },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        table: { type: "string" },
        sysId: { type: "string" },
        record: { type: "object", additionalProperties: true },
        replace: { type: "boolean" },
        displayValue: { oneOf: [{ type: "boolean" }, { type: "string", enum: ["true", "false", "all"] }] },
        excludeReferenceLink: { type: "boolean" },
      },
      required: ["instanceUrl", "table", "sysId", "record"],
    },
  },
  async (args, chidori) => {
    return serviceNowRequest<JsonObject>(args, chidori, `${tablePath(args)}/${encodeURIComponent(args.sysId)}`, {
      method: args.replace ? "PUT" : "PATCH",
      query: compactObject({
        sysparm_display_value: displayValue(args.displayValue),
        sysparm_exclude_reference_link: args.excludeReferenceLink,
      }),
      body: args.record,
    });
  },
);

export const serviceNowDeleteTableRecordTool = defineTool<ServiceNowDeleteTableRecordArgs, Json>(
  {
    name: "servicenow_table_record_delete",
    description: "Delete a ServiceNow table record by sys_id.",
    parameters: {
      type: "object",
      properties: {
        instanceUrl: { type: "string" },
        oauthToken: { description: "ServiceNow OAuth token or Chidori memory secret reference." },
        username: { type: "string" },
        password: { description: "ServiceNow password or Chidori memory secret reference." },
        apiPath: { type: "string", default: "/api/now/table" },
        table: { type: "string" },
        sysId: { type: "string" },
      },
      required: ["instanceUrl", "table", "sysId"],
    },
  },
  async (args, chidori) => {
    return serviceNowRequest<Json>(args, chidori, `${tablePath(args)}/${encodeURIComponent(args.sysId)}`, {
      method: "DELETE",
    });
  },
);

export const serviceNowTools = {
  listTableRecords: serviceNowListTableRecordsTool,
  getTableRecord: serviceNowGetTableRecordTool,
  createTableRecord: serviceNowCreateTableRecordTool,
  updateTableRecord: serviceNowUpdateTableRecordTool,
  deleteTableRecord: serviceNowDeleteTableRecordTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getServiceNowEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "SERVICENOW_INSTANCE_URL", description: "ServiceNow instance URL." },
    { name: "SERVICENOW_OAUTH_TOKEN", description: "ServiceNow OAuth token." },
    { name: "SERVICENOW_USERNAME", description: "ServiceNow username for password auth." },
    { name: "SERVICENOW_PASSWORD", description: "ServiceNow password." },
  ];
}

export const serviceNowIntegrationSpec = {
  environmentVariables: getServiceNowEnvironmentVariables,
} satisfies IntegrationSpec;
