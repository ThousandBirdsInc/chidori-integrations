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

export interface SendGridAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
}

export interface SendGridSendMailArgs extends SendGridAuthArgs {
  mail: JsonObject;
}

export interface SendGridListTemplatesArgs extends SendGridAuthArgs {
  generations?: "legacy" | "dynamic" | "legacy,dynamic" | "dynamic,legacy";
  pageSize?: number;
}

export interface SendGridUpsertContactsArgs extends SendGridAuthArgs {
  contacts: JsonObject[];
  listIds?: string[];
}

export interface SendGridSearchContactsByEmailArgs extends SendGridAuthArgs {
  emails: string[];
}

export interface SendGridGlobalSuppressionArgs extends SendGridAuthArgs {
  email: string;
}

export interface SendGridAddGlobalSuppressionsArgs extends SendGridAuthArgs {
  emails: string[];
}

function sendGridBaseUrl(args: SendGridAuthArgs): string {
  return (args.baseUrl ?? "https://api.sendgrid.com/v3").replace(/\/+$/, "");
}

async function sendGridHeaders(args: SendGridAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const apiKey = await resolveSecret(args.apiKey, chidori, "SendGrid API key");
  return jsonHeaders(bearerAuth(apiKey));
}

async function sendGridRequest<T extends Json>(
  args: SendGridAuthArgs,
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
    headers: await sendGridHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${sendGridBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const sendGridSendMailTool = defineTool<SendGridSendMailArgs, Json>(
  {
    name: "sendgrid_mail_send",
    description: "Send email through Twilio SendGrid Mail Send using a caller-provided v3 mail body.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        mail: { type: "object", additionalProperties: true },
      },
      required: ["mail"],
    },
  },
  async (args, chidori) => {
    return sendGridRequest<Json>(args, chidori, "/mail/send", {
      method: "POST",
      body: args.mail,
    });
  },
);

export const sendGridListTemplatesTool = defineTool<SendGridListTemplatesArgs, JsonObject>(
  {
    name: "sendgrid_templates_list",
    description: "List Twilio SendGrid transactional templates.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        generations: { type: "string", enum: ["legacy", "dynamic", "legacy,dynamic", "dynamic,legacy"] },
        pageSize: { type: "integer" },
      },
    },
  },
  async (args, chidori) => {
    return sendGridRequest<JsonObject>(args, chidori, "/templates", {
      query: {
        generations: args.generations,
        page_size: args.pageSize,
      },
    });
  },
);

export const sendGridUpsertContactsTool = defineTool<SendGridUpsertContactsArgs, JsonObject>(
  {
    name: "sendgrid_contacts_upsert",
    description: "Upsert Twilio SendGrid Marketing Campaigns contacts.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        contacts: { type: "array", items: { type: "object", additionalProperties: true } },
        listIds: { type: "array", items: { type: "string" } },
      },
      required: ["contacts"],
    },
  },
  async (args, chidori) => {
    return sendGridRequest<JsonObject>(args, chidori, "/marketing/contacts", {
      method: "PUT",
      body: compactObject({
        contacts: args.contacts,
        list_ids: args.listIds,
      }) as JsonObject,
    });
  },
);

export const sendGridSearchContactsByEmailTool = defineTool<SendGridSearchContactsByEmailArgs, JsonObject>(
  {
    name: "sendgrid_contacts_search_emails",
    description: "Search Twilio SendGrid Marketing Campaigns contacts by email addresses.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        emails: { type: "array", items: { type: "string" } },
      },
      required: ["emails"],
    },
  },
  async (args, chidori) => {
    return sendGridRequest<JsonObject>(args, chidori, "/marketing/contacts/search/emails", {
      method: "POST",
      body: {
        emails: args.emails,
      },
    });
  },
);

export const sendGridGetGlobalSuppressionTool = defineTool<SendGridGlobalSuppressionArgs, JsonObject>(
  {
    name: "sendgrid_global_suppression_get",
    description: "Check whether an email address is globally suppressed in Twilio SendGrid.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        email: { type: "string" },
      },
      required: ["email"],
    },
  },
  async (args, chidori) => {
    return sendGridRequest<JsonObject>(
      args,
      chidori,
      `/asm/suppressions/global/${encodeURIComponent(args.email)}`,
    );
  },
);

export const sendGridAddGlobalSuppressionsTool = defineTool<SendGridAddGlobalSuppressionsArgs, JsonObject>(
  {
    name: "sendgrid_global_suppressions_add",
    description: "Add one or more email addresses to Twilio SendGrid global suppressions.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "SendGrid API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.sendgrid.com/v3" },
        emails: { type: "array", items: { type: "string" } },
      },
      required: ["emails"],
    },
  },
  async (args, chidori) => {
    return sendGridRequest<JsonObject>(args, chidori, "/asm/suppressions/global", {
      method: "POST",
      body: {
        recipient_emails: args.emails,
      },
    });
  },
);

export const sendGridTools = {
  sendMail: sendGridSendMailTool,
  listTemplates: sendGridListTemplatesTool,
  upsertContacts: sendGridUpsertContactsTool,
  searchContactsByEmail: sendGridSearchContactsByEmailTool,
  getGlobalSuppression: sendGridGetGlobalSuppressionTool,
  addGlobalSuppressions: sendGridAddGlobalSuppressionsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getSendGridEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "SENDGRID_API_KEY", description: "SendGrid API key." },
  ];
}

export const sendGridIntegrationSpec = {
  environmentVariables: getSendGridEnvironmentVariables,
} satisfies IntegrationSpec;
