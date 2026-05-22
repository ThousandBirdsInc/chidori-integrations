import {
  bearerAuth,
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

export interface SalesforceAuthArgs {
  accessToken?: SecretInput;
  instanceUrl: string;
  apiVersion?: string;
}

export interface SalesforceSoqlQueryArgs extends SalesforceAuthArgs {
  query: string;
  nextRecordsUrl?: string;
}

export interface SalesforceSobjectArgs extends SalesforceAuthArgs {
  sobject: string;
}

export interface SalesforceSobjectRecordGetArgs extends SalesforceSobjectArgs {
  recordId: string;
  fields?: string[];
}

export interface SalesforceSobjectRecordCreateArgs extends SalesforceSobjectArgs {
  fields: JsonObject;
}

export interface SalesforceSobjectRecordUpdateArgs extends SalesforceSobjectArgs {
  recordId: string;
  fields: JsonObject;
}

export interface SalesforceSobjectRecordDeleteArgs extends SalesforceSobjectArgs {
  recordId: string;
}

function salesforceBaseUrl(args: SalesforceAuthArgs): string {
  return `${args.instanceUrl.replace(/\/+$/, "")}/services/data/${args.apiVersion ?? "v66.0"}`;
}

async function salesforceHeaders(args: SalesforceAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const accessToken = await resolveSecret(args.accessToken, chidori, "Salesforce access token");
  return jsonHeaders(bearerAuth(accessToken));
}

async function salesforceRequest<T extends Json>(
  args: SalesforceAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  pathOrUrl: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
    absolute?: boolean;
  } = {},
): Promise<T> {
  const url = options.absolute
    ? pathOrUrl
    : withQuery(`${salesforceBaseUrl(args)}${pathOrUrl}`, options.query);
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await salesforceHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, url, requestOptions);
}

export const salesforceSoqlQueryTool = defineTool<SalesforceSoqlQueryArgs, JsonObject>(
  {
    name: "salesforce_soql_query",
    description: "Run a Salesforce SOQL query or follow a nextRecordsUrl.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        query: { type: "string" },
        nextRecordsUrl: {
          type: "string",
          description: "Optional nextRecordsUrl returned by Salesforce for pagination.",
        },
      },
      required: ["instanceUrl", "query"],
    },
  },
  async (args, chidori) => {
    if (args.nextRecordsUrl) {
      const nextUrl = args.nextRecordsUrl.startsWith("http")
        ? args.nextRecordsUrl
        : `${args.instanceUrl.replace(/\/+$/, "")}${args.nextRecordsUrl}`;
      return salesforceRequest<JsonObject>(args, chidori, nextUrl, { absolute: true });
    }
    return salesforceRequest<JsonObject>(args, chidori, "/query", {
      query: { q: args.query },
    });
  },
);

export const salesforceSobjectsListTool = defineTool<SalesforceAuthArgs, JsonObject>(
  {
    name: "salesforce_sobjects_list",
    description: "List Salesforce sObjects available to the current user.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
      },
      required: ["instanceUrl"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<JsonObject>(args, chidori, "/sobjects");
  },
);

export const salesforceSobjectDescribeTool = defineTool<SalesforceSobjectArgs, JsonObject>(
  {
    name: "salesforce_sobject_describe",
    description: "Describe fields and metadata for a Salesforce sObject.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        sobject: { type: "string" },
      },
      required: ["instanceUrl", "sobject"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<JsonObject>(args, chidori, `/sobjects/${encodeURIComponent(args.sobject)}/describe`);
  },
);

export const salesforceSobjectRecordGetTool = defineTool<SalesforceSobjectRecordGetArgs, JsonObject>(
  {
    name: "salesforce_sobject_record_get",
    description: "Retrieve a Salesforce sObject record by ID.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        sobject: { type: "string" },
        recordId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
      required: ["instanceUrl", "sobject", "recordId"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<JsonObject>(
      args,
      chidori,
      `/sobjects/${encodeURIComponent(args.sobject)}/${encodeURIComponent(args.recordId)}`,
      {
        query: { fields: args.fields?.join(",") },
      },
    );
  },
);

export const salesforceSobjectRecordCreateTool = defineTool<SalesforceSobjectRecordCreateArgs, JsonObject>(
  {
    name: "salesforce_sobject_record_create",
    description: "Create a Salesforce sObject record.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        sobject: { type: "string" },
        fields: { type: "object", additionalProperties: true },
      },
      required: ["instanceUrl", "sobject", "fields"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<JsonObject>(args, chidori, `/sobjects/${encodeURIComponent(args.sobject)}`, {
      method: "POST",
      body: args.fields,
    });
  },
);

export const salesforceSobjectRecordUpdateTool = defineTool<SalesforceSobjectRecordUpdateArgs, JsonObject>(
  {
    name: "salesforce_sobject_record_update",
    description: "Update a Salesforce sObject record by ID.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        sobject: { type: "string" },
        recordId: { type: "string" },
        fields: { type: "object", additionalProperties: true },
      },
      required: ["instanceUrl", "sobject", "recordId", "fields"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<JsonObject>(
      args,
      chidori,
      `/sobjects/${encodeURIComponent(args.sobject)}/${encodeURIComponent(args.recordId)}`,
      {
        method: "PATCH",
        body: args.fields,
      },
    );
  },
);

export const salesforceSobjectRecordDeleteTool = defineTool<SalesforceSobjectRecordDeleteArgs, Json>(
  {
    name: "salesforce_sobject_record_delete",
    description: "Delete a Salesforce sObject record by ID.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Salesforce OAuth access token or Chidori memory secret reference." },
        instanceUrl: { type: "string" },
        apiVersion: { type: "string", default: "v66.0" },
        sobject: { type: "string" },
        recordId: { type: "string" },
      },
      required: ["instanceUrl", "sobject", "recordId"],
    },
  },
  async (args, chidori) => {
    return salesforceRequest<Json>(
      args,
      chidori,
      `/sobjects/${encodeURIComponent(args.sobject)}/${encodeURIComponent(args.recordId)}`,
      { method: "DELETE" },
    );
  },
);

export const salesforceTools = {
  soqlQuery: salesforceSoqlQueryTool,
  listSobjects: salesforceSobjectsListTool,
  describeSobject: salesforceSobjectDescribeTool,
  getSobjectRecord: salesforceSobjectRecordGetTool,
  createSobjectRecord: salesforceSobjectRecordCreateTool,
  updateSobjectRecord: salesforceSobjectRecordUpdateTool,
  deleteSobjectRecord: salesforceSobjectRecordDeleteTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getSalesforceEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "SALESFORCE_INSTANCE_URL", description: "Salesforce instance URL." },
    { name: "SALESFORCE_ACCESS_TOKEN", description: "Salesforce access token." },
  ];
}

export const salesforceIntegrationSpec = {
  environmentVariables: getSalesforceEnvironmentVariables,
} satisfies IntegrationSpec;
