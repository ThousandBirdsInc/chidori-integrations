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

export interface SlackAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface SlackPostMessageArgs extends SlackAuthArgs {
  channel: string;
  text: string;
  blocks?: JsonObject[];
  threadTs?: string;
  replyBroadcast?: boolean;
  unfurlLinks?: boolean;
  unfurlMedia?: boolean;
  metadata?: JsonObject;
}

export interface SlackScheduleMessageArgs extends SlackAuthArgs {
  channel: string;
  text: string;
  postAt: number;
  blocks?: JsonObject[];
  threadTs?: string;
  replyBroadcast?: boolean;
  metadata?: JsonObject;
}

export interface SlackConversationsListArgs extends SlackAuthArgs {
  cursor?: string;
  excludeArchived?: boolean;
  limit?: number;
  teamId?: string;
  types?: string;
}

export interface SlackConversationInfoArgs extends SlackAuthArgs {
  channel: string;
  includeLocale?: boolean;
  includeNumMembers?: boolean;
}

export interface SlackConversationHistoryArgs extends SlackAuthArgs {
  channel: string;
  cursor?: string;
  latest?: string;
  oldest?: string;
  inclusive?: boolean;
  limit?: number;
}

export interface SlackConversationRepliesArgs extends SlackConversationHistoryArgs {
  ts: string;
}

export interface SlackPermalinkArgs extends SlackAuthArgs {
  channel: string;
  messageTs: string;
}

export interface SlackUserInfoArgs extends SlackAuthArgs {
  user: string;
  includeLocale?: boolean;
}

export interface SlackSearchMessagesArgs extends SlackAuthArgs {
  query: string;
  sort?: "score" | "timestamp";
  sortDir?: "asc" | "desc";
  highlight?: boolean;
  count?: number;
  page?: number;
}

function slackBaseUrl(args: SlackAuthArgs): string {
  return args.baseUrl ?? "https://slack.com/api";
}

async function slackHeaders(args: SlackAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Slack token");
  return {
    ...bearerAuth(token),
    accept: "application/json",
  };
}

export const slackPostMessageTool = defineTool<SlackPostMessageArgs, JsonObject>(
  {
    name: "slack_post_message",
    description: "Post a message to a Slack channel.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel ID." },
        text: { type: "string", description: "Message text." },
        token: { description: "Slack bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        blocks: { type: "array", items: { type: "object", additionalProperties: true } },
        threadTs: { type: "string", description: "Thread timestamp to reply to." },
        replyBroadcast: { type: "boolean" },
        unfurlLinks: { type: "boolean" },
        unfurlMedia: { type: "boolean" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["channel", "text"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      channel: args.channel,
      text: args.text,
      blocks: args.blocks,
      thread_ts: args.threadTs,
      reply_broadcast: args.replyBroadcast,
      unfurl_links: args.unfurlLinks,
      unfurl_media: args.unfurlMedia,
      metadata: args.metadata,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${slackBaseUrl(args)}/chat.postMessage`, {
      method: "POST",
      headers: jsonHeaders(await slackHeaders(args, chidori)),
      body,
    });
  },
);

export const slackScheduleMessageTool = defineTool<SlackScheduleMessageArgs, JsonObject>(
  {
    name: "slack_message_schedule",
    description: "Schedule a Slack message for future delivery.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel ID." },
        text: { type: "string", description: "Message text." },
        postAt: { type: "integer", description: "Unix timestamp when Slack should post the message." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        blocks: { type: "array", items: { type: "object", additionalProperties: true } },
        threadTs: { type: "string", description: "Thread timestamp to reply to." },
        replyBroadcast: { type: "boolean" },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["channel", "text", "postAt"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      channel: args.channel,
      text: args.text,
      post_at: args.postAt,
      blocks: args.blocks,
      thread_ts: args.threadTs,
      reply_broadcast: args.replyBroadcast,
      metadata: args.metadata,
    }) as JsonObject;

    return requestJson<JsonObject>(chidori, `${slackBaseUrl(args)}/chat.scheduleMessage`, {
      method: "POST",
      headers: jsonHeaders(await slackHeaders(args, chidori)),
      body,
    });
  },
);

export const slackConversationsListTool = defineTool<SlackConversationsListArgs, JsonObject>(
  {
    name: "slack_conversations_list",
    description: "List Slack conversations such as public channels, private channels, IMs, and MPIMs.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        cursor: { type: "string", description: "Pagination cursor." },
        excludeArchived: { type: "boolean" },
        limit: { type: "integer", default: 100 },
        teamId: { type: "string" },
        types: { type: "string", description: "Comma-separated conversation types." },
      },
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/conversations.list`, {
        cursor: args.cursor,
        exclude_archived: args.excludeArchived,
        limit: args.limit ?? 100,
        team_id: args.teamId,
        types: args.types,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackConversationInfoTool = defineTool<SlackConversationInfoArgs, JsonObject>(
  {
    name: "slack_conversation_info",
    description: "Retrieve Slack conversation metadata.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel or conversation ID." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        includeLocale: { type: "boolean" },
        includeNumMembers: { type: "boolean" },
      },
      required: ["channel"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/conversations.info`, {
        channel: args.channel,
        include_locale: args.includeLocale,
        include_num_members: args.includeNumMembers,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackConversationHistoryTool = defineTool<SlackConversationHistoryArgs, JsonObject>(
  {
    name: "slack_conversation_history",
    description: "Fetch Slack channel conversation history.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel ID." },
        token: { description: "Slack bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        cursor: { type: "string", description: "Pagination cursor." },
        latest: { type: "string", description: "End timestamp." },
        oldest: { type: "string", description: "Start timestamp." },
        inclusive: { type: "boolean" },
        limit: { type: "integer", default: 20 },
      },
      required: ["channel"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/conversations.history`, {
        channel: args.channel,
        cursor: args.cursor,
        latest: args.latest,
        oldest: args.oldest,
        inclusive: args.inclusive,
        limit: args.limit ?? 20,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackConversationRepliesTool = defineTool<SlackConversationRepliesArgs, JsonObject>(
  {
    name: "slack_conversation_replies",
    description: "Fetch Slack thread replies for a parent message timestamp.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel ID." },
        ts: { type: "string", description: "Parent message timestamp." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        cursor: { type: "string", description: "Pagination cursor." },
        latest: { type: "string", description: "End timestamp." },
        oldest: { type: "string", description: "Start timestamp." },
        inclusive: { type: "boolean" },
        limit: { type: "integer", default: 20 },
      },
      required: ["channel", "ts"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/conversations.replies`, {
        channel: args.channel,
        ts: args.ts,
        cursor: args.cursor,
        latest: args.latest,
        oldest: args.oldest,
        inclusive: args.inclusive,
        limit: args.limit ?? 20,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackGetPermalinkTool = defineTool<SlackPermalinkArgs, JsonObject>(
  {
    name: "slack_message_permalink_get",
    description: "Get a permalink for a Slack message.",
    parameters: {
      type: "object",
      properties: {
        channel: { type: "string", description: "Slack channel ID." },
        messageTs: { type: "string", description: "Message timestamp." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
      },
      required: ["channel", "messageTs"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/chat.getPermalink`, {
        channel: args.channel,
        message_ts: args.messageTs,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackUserInfoTool = defineTool<SlackUserInfoArgs, JsonObject>(
  {
    name: "slack_user_info",
    description: "Retrieve Slack user profile metadata.",
    parameters: {
      type: "object",
      properties: {
        user: { type: "string", description: "Slack user ID." },
        token: { description: "Slack bot or user token, or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        includeLocale: { type: "boolean" },
      },
      required: ["user"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/users.info`, {
        user: args.user,
        include_locale: args.includeLocale,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackSearchMessagesTool = defineTool<SlackSearchMessagesArgs, JsonObject>(
  {
    name: "slack_messages_search",
    description: "Search Slack messages using Slack search syntax.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Slack search query." },
        token: { description: "Slack user token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Slack-compatible API base URL." },
        sort: { type: "string", enum: ["score", "timestamp"] },
        sortDir: { type: "string", enum: ["asc", "desc"] },
        highlight: { type: "boolean" },
        count: { type: "integer", default: 20 },
        page: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${slackBaseUrl(args)}/search.messages`, {
        query: args.query,
        sort: args.sort,
        sort_dir: args.sortDir,
        highlight: args.highlight,
        count: args.count ?? 20,
        page: args.page,
      }),
      {
        method: "GET",
        headers: await slackHeaders(args, chidori),
      },
    );
  },
);

export const slackTools = {
  postMessage: slackPostMessageTool,
  scheduleMessage: slackScheduleMessageTool,
  conversationsList: slackConversationsListTool,
  conversationInfo: slackConversationInfoTool,
  conversationHistory: slackConversationHistoryTool,
  conversationReplies: slackConversationRepliesTool,
  getPermalink: slackGetPermalinkTool,
  userInfo: slackUserInfoTool,
  searchMessages: slackSearchMessagesTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getSlackEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "SLACK_TOKEN", description: "Slack bot or user token." },
  ];
}

export const slackIntegrationSpec = {
  environmentVariables: getSlackEnvironmentVariables,
} satisfies IntegrationSpec;
