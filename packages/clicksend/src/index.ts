import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ClickSendAuthArgs {
  username?: SecretInput;
  apiKey?: SecretInput;
  authorization?: SecretInput;
  baseUrl?: string;
}

export interface ClickSendSmsMessage {
  to: string;
  body: string;
  from?: string;
  source?: string;
  schedule?: number;
  customString?: string;
  listId?: number;
  country?: string;
  fromEmail?: string;
}

export interface ClickSendVoiceMessage {
  to: string;
  body: string;
  source?: string;
  schedule?: number;
  customString?: string;
  lang?: string;
  voice?: "male" | "female";
  machineDetection?: 0 | 1;
  requireInput?: 0 | 1;
  country?: string;
}

export interface ClickSendEmailRecipient {
  email: string;
  name?: string;
}

export interface ClickSendEmailAttachment {
  content: string;
  type: string;
  filename: string;
  disposition?: string;
  contentId?: string;
}

export interface ClickSendEmailMessage {
  to: ClickSendEmailRecipient[];
  from: ClickSendEmailRecipient;
  subject: string;
  body: string;
  cc?: ClickSendEmailRecipient[];
  bcc?: ClickSendEmailRecipient[];
  replyTo?: ClickSendEmailRecipient;
  attachments?: ClickSendEmailAttachment[];
  templateId?: string;
  customHeaders?: JsonObject;
}

export interface ClickSendSmsSendArgs extends ClickSendAuthArgs {
  messages: ClickSendSmsMessage[];
}

export interface ClickSendVoiceSendArgs extends ClickSendAuthArgs {
  messages: ClickSendVoiceMessage[];
}

export interface ClickSendEmailSendArgs extends ClickSendAuthArgs {
  messages: ClickSendEmailMessage[];
}

function clickSendBaseUrl(args: ClickSendAuthArgs): string {
  return (args.baseUrl ?? "https://rest.clicksend.com/v3").replace(/\/+$/, "");
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

async function clickSendHeaders(args: ClickSendAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  if (args.authorization) {
    return jsonHeaders({ Authorization: await resolveSecret(args.authorization, chidori, "ClickSend Authorization header") });
  }
  const username = await resolveSecret(args.username, chidori, "ClickSend username");
  const apiKey = await resolveSecret(args.apiKey, chidori, "ClickSend API key");
  return jsonHeaders({ Authorization: `Basic ${base64Ascii(`${username}:${apiKey}`)}` });
}

function smsMessageBody(message: ClickSendSmsMessage): JsonObject {
  return compactObject({
    to: message.to,
    body: message.body,
    from: message.from,
    source: message.source,
    schedule: message.schedule,
    custom_string: message.customString,
    list_id: message.listId,
    country: message.country,
    from_email: message.fromEmail,
  }) as JsonObject;
}

function voiceMessageBody(message: ClickSendVoiceMessage): JsonObject {
  return compactObject({
    to: message.to,
    body: message.body,
    source: message.source,
    schedule: message.schedule,
    custom_string: message.customString,
    lang: message.lang,
    voice: message.voice,
    machine_detection: message.machineDetection,
    require_input: message.requireInput,
    country: message.country,
  }) as JsonObject;
}

function emailRecipient(recipient: ClickSendEmailRecipient): JsonObject {
  return compactObject({
    email: recipient.email,
    name: recipient.name,
  }) as JsonObject;
}

function emailAttachment(attachment: ClickSendEmailAttachment): JsonObject {
  return compactObject({
    content: attachment.content,
    type: attachment.type,
    filename: attachment.filename,
    disposition: attachment.disposition,
    content_id: attachment.contentId,
  }) as JsonObject;
}

function emailMessageBody(message: ClickSendEmailMessage): JsonObject {
  return compactObject({
    to: message.to.map(emailRecipient),
    from: emailRecipient(message.from),
    subject: message.subject,
    body: message.body,
    cc: message.cc?.map(emailRecipient),
    bcc: message.bcc?.map(emailRecipient),
    reply_to: message.replyTo ? emailRecipient(message.replyTo) : undefined,
    attachments: message.attachments?.map(emailAttachment),
    template_id: message.templateId,
    custom_headers: message.customHeaders,
  }) as JsonObject;
}

export const clickSendSmsSendTool = defineTool<ClickSendSmsSendArgs, JsonObject>(
  {
    name: "clicksend_sms_send",
    description: "Send one or more SMS messages with ClickSend.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "ClickSend username or Chidori memory secret reference." },
        apiKey: { description: "ClickSend API key or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://rest.clicksend.com/v3" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${clickSendBaseUrl(args)}/sms/send`, {
      method: "POST",
      headers: await clickSendHeaders(args, chidori),
      body: { messages: args.messages.map(smsMessageBody) },
    });
  },
);

export const clickSendVoiceSendTool = defineTool<ClickSendVoiceSendArgs, JsonObject>(
  {
    name: "clicksend_voice_send",
    description: "Send one or more automated voice messages with ClickSend.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "ClickSend username or Chidori memory secret reference." },
        apiKey: { description: "ClickSend API key or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://rest.clicksend.com/v3" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${clickSendBaseUrl(args)}/voice/send`, {
      method: "POST",
      headers: await clickSendHeaders(args, chidori),
      body: { messages: args.messages.map(voiceMessageBody) },
    });
  },
);

export const clickSendEmailSendTool = defineTool<ClickSendEmailSendArgs, JsonObject>(
  {
    name: "clicksend_email_send",
    description: "Send one or more transactional email messages with ClickSend.",
    parameters: {
      type: "object",
      properties: {
        username: { description: "ClickSend username or Chidori memory secret reference." },
        apiKey: { description: "ClickSend API key or Chidori memory secret reference." },
        authorization: { description: "Full Basic Authorization header or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://rest.clicksend.com/v3" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["messages"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${clickSendBaseUrl(args)}/email/send`, {
      method: "POST",
      headers: await clickSendHeaders(args, chidori),
      body: { messages: args.messages.map(emailMessageBody) },
    });
  },
);

export const clickSendTools = {
  smsSend: clickSendSmsSendTool,
  voiceSend: clickSendVoiceSendTool,
  emailSend: clickSendEmailSendTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getClickSendEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "CLICKSEND_USERNAME", description: "ClickSend username." },
    { name: "CLICKSEND_API_KEY", description: "ClickSend API key." },
    { name: "CLICKSEND_AUTHORIZATION", description: "ClickSend Authorization header." },
  ];
}

export const clickSendIntegrationSpec = {
  environmentVariables: getClickSendEnvironmentVariables,
} satisfies IntegrationSpec;
