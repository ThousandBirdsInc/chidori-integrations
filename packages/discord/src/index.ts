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

export interface DiscordAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface DiscordListGuildsArgs extends DiscordAuthArgs {
  before?: string;
  after?: string;
  limit?: number;
}

export interface DiscordListGuildChannelsArgs extends DiscordAuthArgs {
  guildId: string;
}

export interface DiscordListChannelMessagesArgs extends DiscordAuthArgs {
  channelId: string;
  around?: string;
  before?: string;
  after?: string;
  limit?: number;
}

export interface DiscordGetChannelMessageArgs extends DiscordAuthArgs {
  channelId: string;
  messageId: string;
}

export interface DiscordCreateChannelMessageArgs extends DiscordAuthArgs {
  channelId: string;
  content?: string;
  embeds?: JsonObject[];
  allowedMentions?: JsonObject;
  messageReference?: JsonObject;
  components?: JsonObject[];
  stickerIds?: string[];
  flags?: number;
  nonce?: string | number;
  tts?: boolean;
}

function discordBaseUrl(args: DiscordAuthArgs): string {
  return (args.baseUrl ?? "https://discord.com/api/v10").replace(/\/+$/, "");
}

async function discordHeaders(args: DiscordAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Discord bot token");
  return {
    ...bearerAuth(token),
    accept: "application/json",
  };
}

export const discordListGuildsTool = defineTool<DiscordListGuildsArgs, JsonObject>(
  {
    name: "discord_list_guilds",
    description: "List Discord guilds for the authenticated bot or user token.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Discord-compatible API base URL." },
        before: { type: "string", description: "Guild ID before which to list." },
        after: { type: "string", description: "Guild ID after which to list." },
        limit: { type: "integer", default: 100 },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(`${discordBaseUrl(args)}/users/@me/guilds`, {
      before: args.before,
      after: args.after,
      limit: args.limit ?? 100,
    }), {
      method: "GET",
      headers: await discordHeaders(args, chidori),
    });
  },
);

export const discordListGuildChannelsTool = defineTool<DiscordListGuildChannelsArgs, JsonObject>(
  {
    name: "discord_list_guild_channels",
    description: "List channels in a Discord guild.",
    parameters: {
      type: "object",
      properties: {
        guildId: { type: "string", description: "Discord guild ID." },
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Discord-compatible API base URL." },
      },
      required: ["guildId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${discordBaseUrl(args)}/guilds/${encodeURIComponent(args.guildId)}/channels`, {
      method: "GET",
      headers: await discordHeaders(args, chidori),
    });
  },
);

export const discordListChannelMessagesTool = defineTool<DiscordListChannelMessagesArgs, JsonObject>(
  {
    name: "discord_list_channel_messages",
    description: "List messages in a Discord channel.",
    parameters: {
      type: "object",
      properties: {
        channelId: { type: "string", description: "Discord channel ID." },
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Discord-compatible API base URL." },
        around: { type: "string", description: "Message ID around which to list." },
        before: { type: "string", description: "Message ID before which to list." },
        after: { type: "string", description: "Message ID after which to list." },
        limit: { type: "integer", default: 50 },
      },
      required: ["channelId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, withQuery(`${discordBaseUrl(args)}/channels/${encodeURIComponent(args.channelId)}/messages`, {
      around: args.around,
      before: args.before,
      after: args.after,
      limit: args.limit ?? 50,
    }), {
      method: "GET",
      headers: await discordHeaders(args, chidori),
    });
  },
);

export const discordGetChannelMessageTool = defineTool<DiscordGetChannelMessageArgs, JsonObject>(
  {
    name: "discord_get_channel_message",
    description: "Get a specific Discord channel message by ID.",
    parameters: {
      type: "object",
      properties: {
        channelId: { type: "string", description: "Discord channel ID." },
        messageId: { type: "string", description: "Discord message ID." },
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Discord-compatible API base URL." },
      },
      required: ["channelId", "messageId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${discordBaseUrl(args)}/channels/${encodeURIComponent(args.channelId)}/messages/${encodeURIComponent(args.messageId)}`, {
      method: "GET",
      headers: await discordHeaders(args, chidori),
    });
  },
);

export const discordCreateChannelMessageTool = defineTool<DiscordCreateChannelMessageArgs, JsonObject>(
  {
    name: "discord_create_channel_message",
    description: "Create a message in a Discord channel.",
    parameters: {
      type: "object",
      properties: {
        channelId: { type: "string", description: "Discord channel ID." },
        content: { type: "string", description: "Message content." },
        token: { description: "Discord bot token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "Discord-compatible API base URL." },
        embeds: { type: "array", items: { type: "object", additionalProperties: true } },
        allowedMentions: { type: "object", additionalProperties: true },
        messageReference: { type: "object", additionalProperties: true },
        components: { type: "array", items: { type: "object", additionalProperties: true } },
        stickerIds: { type: "array", items: { type: "string" } },
        flags: { type: "integer" },
        nonce: { description: "Message nonce." },
        tts: { type: "boolean" },
      },
      required: ["channelId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${discordBaseUrl(args)}/channels/${encodeURIComponent(args.channelId)}/messages`, {
      method: "POST",
      headers: jsonHeaders(await discordHeaders(args, chidori)),
      body: compactObject({
        content: args.content,
        embeds: args.embeds,
        allowed_mentions: args.allowedMentions,
        message_reference: args.messageReference,
        components: args.components,
        sticker_ids: args.stickerIds,
        flags: args.flags,
        nonce: args.nonce,
        tts: args.tts,
      }) as JsonObject,
    });
  },
);

export const discordTools = {
  listGuilds: discordListGuildsTool,
  listGuildChannels: discordListGuildChannelsTool,
  listChannelMessages: discordListChannelMessagesTool,
  getChannelMessage: discordGetChannelMessageTool,
  createChannelMessage: discordCreateChannelMessageTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getDiscordEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "DISCORD_BOT_TOKEN", description: "Discord bot token." },
  ];
}

export const discordIntegrationSpec = {
  environmentVariables: getDiscordEnvironmentVariables,
} satisfies IntegrationSpec;
