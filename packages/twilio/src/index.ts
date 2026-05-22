import {
  compactObject,
  defineTool,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface TwilioAuthArgs {
  accountSid: string;
  authToken?: SecretInput;
  baseUrl?: string;
}

export interface TwilioSendMessageArgs extends TwilioAuthArgs {
  to: string;
  body?: string;
  from?: string;
  messagingServiceSid?: string;
  mediaUrl?: string[];
  statusCallback?: string;
}

export interface TwilioListMessagesArgs extends TwilioAuthArgs {
  to?: string;
  from?: string;
  dateSent?: string;
  pageSize?: number;
  pageToken?: string;
}

export interface TwilioMessageIdArgs extends TwilioAuthArgs {
  messageSid: string;
}

export interface TwilioCreateCallArgs extends TwilioAuthArgs {
  to: string;
  from: string;
  url?: string;
  twiml?: string;
  statusCallback?: string;
  method?: "GET" | "POST";
  timeout?: number;
  record?: boolean;
}

export interface TwilioListCallsArgs extends TwilioAuthArgs {
  to?: string;
  from?: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  pageSize?: number;
  pageToken?: string;
}

export interface TwilioSearchAvailablePhoneNumbersArgs extends TwilioAuthArgs {
  countryCode: string;
  numberType?: "Local" | "Mobile" | "TollFree";
  areaCode?: string;
  contains?: string;
  smsEnabled?: boolean;
  mmsEnabled?: boolean;
  voiceEnabled?: boolean;
  limit?: number;
}

function twilioBaseUrl(args: TwilioAuthArgs): string {
  return (args.baseUrl ?? "https://api.twilio.com/2010-04-01").replace(/\/+$/, "");
}

function twilioAccountPath(args: TwilioAuthArgs): string {
  return `/Accounts/${encodeURIComponent(args.accountSid)}`;
}

async function twilioHeaders(args: TwilioAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const authToken = await resolveSecret(args.authToken, chidori, "Twilio auth token");
  return {
    Authorization: `Basic ${base64Encode(`${args.accountSid}:${authToken}`)}`,
    "content-type": "application/x-www-form-urlencoded",
  };
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

function encodeForm(input: JsonObject): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
    } else {
      params.append(key, String(value));
    }
  }
  return params.toString();
}

async function twilioRequest<T extends JsonObject>(
  args: TwilioAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
  } = {},
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: await twilioHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = encodeForm(options.body);
  }
  return requestJson<T>(chidori, withQuery(`${twilioBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const twilioSendMessageTool = defineTool<TwilioSendMessageArgs, JsonObject>(
  {
    name: "twilio_message_send",
    description: "Send an SMS, MMS, or channel message with Twilio.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        to: { type: "string" },
        body: { type: "string" },
        from: { type: "string" },
        messagingServiceSid: { type: "string" },
        mediaUrl: { type: "array", items: { type: "string" } },
        statusCallback: { type: "string" },
      },
      required: ["accountSid", "to"],
    },
  },
  async (args, chidori) => {
    return twilioRequest<JsonObject>(args, chidori, `${twilioAccountPath(args)}/Messages.json`, {
      method: "POST",
      body: compactObject({
        To: args.to,
        Body: args.body,
        From: args.from,
        MessagingServiceSid: args.messagingServiceSid,
        MediaUrl: args.mediaUrl,
        StatusCallback: args.statusCallback,
      }) as JsonObject,
    });
  },
);

export const twilioListMessagesTool = defineTool<TwilioListMessagesArgs, JsonObject>(
  {
    name: "twilio_messages_list",
    description: "List Twilio messages.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        to: { type: "string" },
        from: { type: "string" },
        dateSent: { type: "string" },
        pageSize: { type: "integer" },
        pageToken: { type: "string" },
      },
      required: ["accountSid"],
    },
  },
  async (args, chidori) => {
    return twilioRequest<JsonObject>(args, chidori, `${twilioAccountPath(args)}/Messages.json`, {
      query: {
        To: args.to,
        From: args.from,
        DateSent: args.dateSent,
        PageSize: args.pageSize,
        PageToken: args.pageToken,
      },
    });
  },
);

export const twilioGetMessageTool = defineTool<TwilioMessageIdArgs, JsonObject>(
  {
    name: "twilio_message_get",
    description: "Fetch a Twilio message by SID.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        messageSid: { type: "string" },
      },
      required: ["accountSid", "messageSid"],
    },
  },
  async (args, chidori) => {
    return twilioRequest<JsonObject>(
      args,
      chidori,
      `${twilioAccountPath(args)}/Messages/${encodeURIComponent(args.messageSid)}.json`,
    );
  },
);

export const twilioCreateCallTool = defineTool<TwilioCreateCallArgs, JsonObject>(
  {
    name: "twilio_call_create",
    description: "Create an outbound Twilio call.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        to: { type: "string" },
        from: { type: "string" },
        url: { type: "string" },
        twiml: { type: "string" },
        statusCallback: { type: "string" },
        method: { type: "string", enum: ["GET", "POST"] },
        timeout: { type: "integer" },
        record: { type: "boolean" },
      },
      required: ["accountSid", "to", "from"],
    },
  },
  async (args, chidori) => {
    return twilioRequest<JsonObject>(args, chidori, `${twilioAccountPath(args)}/Calls.json`, {
      method: "POST",
      body: compactObject({
        To: args.to,
        From: args.from,
        Url: args.url,
        Twiml: args.twiml,
        StatusCallback: args.statusCallback,
        Method: args.method,
        Timeout: args.timeout,
        Record: args.record,
      }) as JsonObject,
    });
  },
);

export const twilioListCallsTool = defineTool<TwilioListCallsArgs, JsonObject>(
  {
    name: "twilio_calls_list",
    description: "List Twilio calls.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        to: { type: "string" },
        from: { type: "string" },
        status: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        pageSize: { type: "integer" },
        pageToken: { type: "string" },
      },
      required: ["accountSid"],
    },
  },
  async (args, chidori) => {
    return twilioRequest<JsonObject>(args, chidori, `${twilioAccountPath(args)}/Calls.json`, {
      query: {
        To: args.to,
        From: args.from,
        Status: args.status,
        StartTime: args.startTime,
        EndTime: args.endTime,
        PageSize: args.pageSize,
        PageToken: args.pageToken,
      },
    });
  },
);

export const twilioSearchAvailablePhoneNumbersTool = defineTool<TwilioSearchAvailablePhoneNumbersArgs, JsonObject>(
  {
    name: "twilio_available_phone_numbers_search",
    description: "Search Twilio available phone numbers by country and type.",
    parameters: {
      type: "object",
      properties: {
        accountSid: { type: "string" },
        authToken: { description: "Twilio auth token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.twilio.com/2010-04-01" },
        countryCode: { type: "string" },
        numberType: { type: "string", enum: ["Local", "Mobile", "TollFree"] },
        areaCode: { type: "string" },
        contains: { type: "string" },
        smsEnabled: { type: "boolean" },
        mmsEnabled: { type: "boolean" },
        voiceEnabled: { type: "boolean" },
        limit: { type: "integer" },
      },
      required: ["accountSid", "countryCode"],
    },
  },
  async (args, chidori) => {
    const numberType = args.numberType ?? "Local";
    return twilioRequest<JsonObject>(
      args,
      chidori,
      `${twilioAccountPath(args)}/AvailablePhoneNumbers/${encodeURIComponent(args.countryCode)}/${numberType}.json`,
      {
        query: {
          AreaCode: args.areaCode,
          Contains: args.contains,
          SmsEnabled: args.smsEnabled,
          MmsEnabled: args.mmsEnabled,
          VoiceEnabled: args.voiceEnabled,
          PageSize: args.limit,
        },
      },
    );
  },
);

export const twilioTools = {
  sendMessage: twilioSendMessageTool,
  listMessages: twilioListMessagesTool,
  getMessage: twilioGetMessageTool,
  createCall: twilioCreateCallTool,
  listCalls: twilioListCallsTool,
  searchAvailablePhoneNumbers: twilioSearchAvailablePhoneNumbersTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getTwilioEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "TWILIO_ACCOUNT_SID", description: "Twilio account SID." },
    { name: "TWILIO_AUTH_TOKEN", description: "Twilio auth token." },
  ];
}

export const twilioIntegrationSpec = {
  environmentVariables: getTwilioEnvironmentVariables,
} satisfies IntegrationSpec;
