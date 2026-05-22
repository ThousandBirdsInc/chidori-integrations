import {
  bearerAuth,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface TypeformAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface TypeformListFormsArgs extends TypeformAuthArgs {
  page?: number;
  pageSize?: number;
  search?: string;
  workspaceId?: string;
}

export interface TypeformFormIdArgs extends TypeformAuthArgs {
  formId: string;
}

export interface TypeformFormBodyArgs extends TypeformAuthArgs {
  form: JsonObject;
}

export interface TypeformUpdateFormArgs extends TypeformFormIdArgs {
  form: JsonObject;
}

export interface TypeformListResponsesArgs extends TypeformFormIdArgs {
  pageSize?: number;
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
}

function typeformBaseUrl(args: TypeformAuthArgs): string {
  return (args.baseUrl ?? "https://api.typeform.com").replace(/\/+$/, "");
}

async function typeformHeaders(args: TypeformAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Typeform personal access token");
  return jsonHeaders(bearerAuth(token));
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

async function typeformRequest<T extends JsonObject>(
  args: TypeformAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await typeformHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${typeformBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const typeformListFormsTool = defineTool<TypeformListFormsArgs, JsonObject>(
  {
    name: "typeform_forms_list",
    description: "List forms available to the Typeform token.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        page: { type: "integer" },
        pageSize: { type: "integer" },
        search: { type: "string" },
        workspaceId: { type: "string" },
      },
    },
  },
  async (args, chidori) => {
    return typeformRequest(args, chidori, "/forms", {
      query: {
        page: args.page,
        page_size: args.pageSize,
        search: args.search,
        workspace_id: args.workspaceId,
      },
    });
  },
);

export const typeformGetFormTool = defineTool<TypeformFormIdArgs, JsonObject>(
  {
    name: "typeform_form_get",
    description: "Retrieve a Typeform form definition by ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        formId: { type: "string" },
      },
      required: ["formId"],
    },
  },
  async (args, chidori) => {
    return typeformRequest(args, chidori, `/forms/${encodeURIComponent(args.formId)}`);
  },
);

export const typeformCreateFormTool = defineTool<TypeformFormBodyArgs, JsonObject>(
  {
    name: "typeform_form_create",
    description: "Create a Typeform form with caller-provided Create API body.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        form: { type: "object", additionalProperties: true },
      },
      required: ["form"],
    },
  },
  async (args, chidori) => {
    return typeformRequest(args, chidori, "/forms", {
      method: "POST",
      body: args.form,
    });
  },
);

export const typeformUpdateFormTool = defineTool<TypeformUpdateFormArgs, JsonObject>(
  {
    name: "typeform_form_update",
    description: "Update a Typeform form with caller-provided Create API body.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        formId: { type: "string" },
        form: { type: "object", additionalProperties: true },
      },
      required: ["formId", "form"],
    },
  },
  async (args, chidori) => {
    return typeformRequest(args, chidori, `/forms/${encodeURIComponent(args.formId)}`, {
      method: "PUT",
      body: args.form,
    });
  },
);

export const typeformListResponsesTool = defineTool<TypeformListResponsesArgs, JsonObject>(
  {
    name: "typeform_responses_list",
    description: "Retrieve Typeform responses for a form.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Typeform personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.typeform.com" },
        formId: { type: "string" },
        pageSize: { type: "integer" },
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
      },
      required: ["formId"],
    },
  },
  async (args, chidori) => {
    return typeformRequest(args, chidori, `/forms/${encodeURIComponent(args.formId)}/responses`, {
      query: {
        page_size: args.pageSize,
        since: args.since,
        until: args.until,
        after: args.after,
        before: args.before,
        included_response_ids: csv(args.includedResponseIds),
        completed: args.completed,
        response_type: csv(args.responseType),
        sort: args.sort,
        query: args.query,
        fields: csv(args.fields),
      },
    });
  },
);

export const typeformTools = {
  listForms: typeformListFormsTool,
  getForm: typeformGetFormTool,
  createForm: typeformCreateFormTool,
  updateForm: typeformUpdateFormTool,
  listResponses: typeformListResponsesTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getTypeformEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "TYPEFORM_ACCESS_TOKEN", description: "Typeform personal access token." },
  ];
}

export const typeformIntegrationSpec = {
  environmentVariables: getTypeformEnvironmentVariables,
} satisfies IntegrationSpec;
