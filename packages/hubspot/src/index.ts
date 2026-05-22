import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export type HubSpotObjectType = "contacts" | "companies" | "deals" | "tickets" | string;

export interface HubSpotAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface HubSpotObjectArgs extends HubSpotAuthArgs {
  objectType: HubSpotObjectType;
}

export interface HubSpotListCrmObjectsArgs extends HubSpotObjectArgs {
  limit?: number;
  after?: string;
  properties?: string[];
  propertiesWithHistory?: string[];
  associations?: string[];
  archived?: boolean;
}

export interface HubSpotSearchCrmObjectsArgs extends HubSpotObjectArgs {
  query?: string;
  filterGroups?: JsonObject[];
  sorts?: string[];
  properties?: string[];
  limit?: number;
  after?: string;
}

export interface HubSpotGetCrmObjectArgs extends HubSpotObjectArgs {
  objectId: string;
  idProperty?: string;
  properties?: string[];
  propertiesWithHistory?: string[];
  associations?: string[];
  archived?: boolean;
}

export interface HubSpotCreateCrmObjectArgs extends HubSpotObjectArgs {
  properties: JsonObject;
  associations?: JsonObject[];
}

export interface HubSpotUpdateCrmObjectArgs extends HubSpotObjectArgs {
  objectId: string;
  properties: JsonObject;
  idProperty?: string;
}

export interface HubSpotBatchReadCrmObjectsArgs extends HubSpotObjectArgs {
  inputs: Array<{ id: string }>;
  idProperty?: string;
  properties?: string[];
  propertiesWithHistory?: string[];
  archived?: boolean;
}

export interface HubSpotAssociateCrmObjectArgs extends HubSpotObjectArgs {
  objectId: string;
  toObjectType: string;
  toObjectId: string;
  associationTypeId: string | number;
}

function hubspotBaseUrl(args: HubSpotAuthArgs): string {
  return (args.baseUrl ?? "https://api.hubapi.com").replace(/\/+$/, "");
}

async function hubspotHeaders(args: HubSpotAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "HubSpot private app token");
  return jsonHeaders(bearerAuth(token));
}

function objectPath(args: HubSpotObjectArgs): string {
  return `/crm/v3/objects/${encodeURIComponent(args.objectType)}`;
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

async function hubspotRequest<T extends JsonObject>(
  args: HubSpotAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "PUT";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await hubspotHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${hubspotBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const hubspotListCrmObjectsTool = defineTool<HubSpotListCrmObjectsArgs, JsonObject>(
  {
    name: "hubspot_crm_objects_list",
    description: "List HubSpot CRM objects such as contacts, companies, deals, or tickets.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        limit: { type: "integer" },
        after: { type: "string" },
        properties: { type: "array", items: { type: "string" } },
        propertiesWithHistory: { type: "array", items: { type: "string" } },
        associations: { type: "array", items: { type: "string" } },
        archived: { type: "boolean" },
      },
      required: ["objectType"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, objectPath(args), {
      query: {
        limit: args.limit,
        after: args.after,
        properties: csv(args.properties),
        propertiesWithHistory: csv(args.propertiesWithHistory),
        associations: csv(args.associations),
        archived: args.archived,
      },
    });
  },
);

export const hubspotSearchCrmObjectsTool = defineTool<HubSpotSearchCrmObjectsArgs, JsonObject>(
  {
    name: "hubspot_crm_objects_search",
    description: "Search HubSpot CRM objects with HubSpot CRM search filters.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        query: { type: "string" },
        filterGroups: { type: "array", items: { type: "object", additionalProperties: true } },
        sorts: { type: "array", items: { type: "string" } },
        properties: { type: "array", items: { type: "string" } },
        limit: { type: "integer" },
        after: { type: "string" },
      },
      required: ["objectType"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, `${objectPath(args)}/search`, {
      method: "POST",
      body: compactObject({
        query: args.query,
        filterGroups: args.filterGroups,
        sorts: args.sorts,
        properties: args.properties,
        limit: args.limit,
        after: args.after,
      }) as JsonObject,
    });
  },
);

export const hubspotGetCrmObjectTool = defineTool<HubSpotGetCrmObjectArgs, JsonObject>(
  {
    name: "hubspot_crm_object_get",
    description: "Get one HubSpot CRM object by record ID or a configured unique property.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        objectId: { type: "string" },
        idProperty: { type: "string" },
        properties: { type: "array", items: { type: "string" } },
        propertiesWithHistory: { type: "array", items: { type: "string" } },
        associations: { type: "array", items: { type: "string" } },
        archived: { type: "boolean" },
      },
      required: ["objectType", "objectId"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, `${objectPath(args)}/${encodeURIComponent(args.objectId)}`, {
      query: {
        idProperty: args.idProperty,
        properties: csv(args.properties),
        propertiesWithHistory: csv(args.propertiesWithHistory),
        associations: csv(args.associations),
        archived: args.archived,
      },
    });
  },
);

export const hubspotCreateCrmObjectTool = defineTool<HubSpotCreateCrmObjectArgs, JsonObject>(
  {
    name: "hubspot_crm_object_create",
    description: "Create a HubSpot CRM object.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        properties: { type: "object", additionalProperties: true },
        associations: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["objectType", "properties"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, objectPath(args), {
      method: "POST",
      body: compactObject({
        properties: args.properties,
        associations: args.associations,
      }) as JsonObject,
    });
  },
);

export const hubspotUpdateCrmObjectTool = defineTool<HubSpotUpdateCrmObjectArgs, JsonObject>(
  {
    name: "hubspot_crm_object_update",
    description: "Update a HubSpot CRM object.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        objectId: { type: "string" },
        properties: { type: "object", additionalProperties: true },
        idProperty: { type: "string" },
      },
      required: ["objectType", "objectId", "properties"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, `${objectPath(args)}/${encodeURIComponent(args.objectId)}`, {
      method: "PATCH",
      query: { idProperty: args.idProperty },
      body: { properties: args.properties },
    });
  },
);

export const hubspotBatchReadCrmObjectsTool = defineTool<HubSpotBatchReadCrmObjectsArgs, JsonObject>(
  {
    name: "hubspot_crm_objects_batch_read",
    description: "Batch read HubSpot CRM objects by record ID or a configured unique property.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        inputs: { type: "array", items: { type: "object", additionalProperties: true } },
        idProperty: { type: "string" },
        properties: { type: "array", items: { type: "string" } },
        propertiesWithHistory: { type: "array", items: { type: "string" } },
        archived: { type: "boolean" },
      },
      required: ["objectType", "inputs"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(args, chidori, `${objectPath(args)}/batch/read`, {
      method: "POST",
      body: compactObject({
        inputs: args.inputs,
        idProperty: args.idProperty,
        properties: args.properties,
        propertiesWithHistory: args.propertiesWithHistory,
        archived: args.archived,
      }) as JsonObject,
    });
  },
);

export const hubspotAssociateCrmObjectTool = defineTool<HubSpotAssociateCrmObjectArgs, JsonObject>(
  {
    name: "hubspot_crm_object_associate",
    description: "Associate one HubSpot CRM object with another record or activity using an association type ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "HubSpot private app token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.hubapi.com" },
        objectType: { type: "string" },
        objectId: { type: "string" },
        toObjectType: { type: "string" },
        toObjectId: { type: "string" },
        associationTypeId: { oneOf: [{ type: "string" }, { type: "integer" }] },
      },
      required: ["objectType", "objectId", "toObjectType", "toObjectId", "associationTypeId"],
    },
  },
  async (args, chidori) => {
    return hubspotRequest(
      args,
      chidori,
      `${objectPath(args)}/${encodeURIComponent(args.objectId)}/associations/${encodeURIComponent(args.toObjectType)}/${encodeURIComponent(args.toObjectId)}/${encodeURIComponent(String(args.associationTypeId))}`,
      { method: "PUT" },
    );
  },
);

export const hubspotTools = {
  listCrmObjects: hubspotListCrmObjectsTool,
  searchCrmObjects: hubspotSearchCrmObjectsTool,
  getCrmObject: hubspotGetCrmObjectTool,
  createCrmObject: hubspotCreateCrmObjectTool,
  updateCrmObject: hubspotUpdateCrmObjectTool,
  batchReadCrmObjects: hubspotBatchReadCrmObjectsTool,
  associateCrmObject: hubspotAssociateCrmObjectTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getHubSpotEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "HUBSPOT_PRIVATE_APP_TOKEN", description: "HubSpot private app token." },
  ];
}

export const hubspotIntegrationSpec = {
  environmentVariables: getHubSpotEnvironmentVariables,
} satisfies IntegrationSpec;
