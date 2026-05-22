import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface NotionAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
  notionVersion?: string;
}

export interface NotionSearchArgs extends NotionAuthArgs {
  query?: string;
  filter?: JsonObject;
  sort?: JsonObject;
  startCursor?: string;
  pageSize?: number;
}

export interface NotionGetPageArgs extends NotionAuthArgs {
  pageId: string;
}

export interface NotionCreatePageArgs extends NotionAuthArgs {
  parent: JsonObject;
  properties?: JsonObject;
  children?: JsonObject[];
  icon?: JsonObject;
  cover?: JsonObject;
  template?: JsonObject;
}

export interface NotionUpdatePageArgs extends NotionAuthArgs {
  pageId: string;
  properties?: JsonObject;
  archived?: boolean;
  inTrash?: boolean;
  icon?: JsonObject | null;
  cover?: JsonObject | null;
  template?: JsonObject;
}

export interface NotionListBlockChildrenArgs extends NotionAuthArgs {
  blockId: string;
  startCursor?: string;
  pageSize?: number;
}

export interface NotionAppendBlockChildrenArgs extends NotionAuthArgs {
  blockId: string;
  children: JsonObject[];
  after?: string;
}

function notionBaseUrl(args: NotionAuthArgs): string {
  return (args.baseUrl ?? "https://api.notion.com/v1").replace(/\/+$/, "");
}

async function notionHeaders(args: NotionAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Notion integration token");
  return jsonHeaders({
    ...bearerAuth(token),
    "Notion-Version": args.notionVersion ?? "2022-06-28",
  });
}

export const notionSearchTool = defineTool<NotionSearchArgs, JsonObject>(
  {
    name: "notion_search",
    description: "Search pages and databases shared with a Notion integration.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
        query: { type: "string" },
        filter: { type: "object", additionalProperties: true },
        sort: { type: "object", additionalProperties: true },
        startCursor: { type: "string" },
        pageSize: { type: "integer", default: 10 },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${notionBaseUrl(args)}/search`, {
      method: "POST",
      headers: await notionHeaders(args, chidori),
      body: compactObject({
        query: args.query,
        filter: args.filter,
        sort: args.sort,
        start_cursor: args.startCursor,
        page_size: args.pageSize ?? 10,
      }) as JsonObject,
    });
  },
);

export const notionGetPageTool = defineTool<NotionGetPageArgs, JsonObject>(
  {
    name: "notion_page_get",
    description: "Retrieve a Notion page by ID.",
    parameters: {
      type: "object",
      properties: {
        pageId: { type: "string" },
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
      },
      required: ["pageId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${notionBaseUrl(args)}/pages/${encodeURIComponent(args.pageId)}`, {
      method: "GET",
      headers: await notionHeaders(args, chidori),
    });
  },
);

export const notionCreatePageTool = defineTool<NotionCreatePageArgs, JsonObject>(
  {
    name: "notion_page_create",
    description: "Create a Notion page under a page or data source parent.",
    parameters: {
      type: "object",
      properties: {
        parent: { type: "object", additionalProperties: true },
        properties: { type: "object", additionalProperties: true },
        children: { type: "array", items: { type: "object", additionalProperties: true } },
        icon: { type: "object", additionalProperties: true },
        cover: { type: "object", additionalProperties: true },
        template: { type: "object", additionalProperties: true },
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
      },
      required: ["parent"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${notionBaseUrl(args)}/pages`, {
      method: "POST",
      headers: await notionHeaders(args, chidori),
      body: compactObject({
        parent: args.parent,
        properties: args.properties,
        children: args.children as Json | undefined,
        icon: args.icon,
        cover: args.cover,
        template: args.template,
      }) as JsonObject,
    });
  },
);

export const notionUpdatePageTool = defineTool<NotionUpdatePageArgs, JsonObject>(
  {
    name: "notion_page_update",
    description: "Update Notion page properties, icon, cover, archive state, or template.",
    parameters: {
      type: "object",
      properties: {
        pageId: { type: "string" },
        properties: { type: "object", additionalProperties: true },
        archived: { type: "boolean" },
        inTrash: { type: "boolean" },
        icon: { description: "Notion icon object or null." },
        cover: { description: "Notion cover object or null." },
        template: { type: "object", additionalProperties: true },
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
      },
      required: ["pageId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${notionBaseUrl(args)}/pages/${encodeURIComponent(args.pageId)}`, {
      method: "PATCH",
      headers: await notionHeaders(args, chidori),
      body: compactObject({
        properties: args.properties,
        archived: args.archived,
        in_trash: args.inTrash,
        icon: args.icon as Json | undefined,
        cover: args.cover as Json | undefined,
        template: args.template,
      }) as JsonObject,
    });
  },
);

export const notionListBlockChildrenTool = defineTool<NotionListBlockChildrenArgs, JsonObject>(
  {
    name: "notion_block_children_list",
    description: "List child blocks for a Notion block or page.",
    parameters: {
      type: "object",
      properties: {
        blockId: { type: "string" },
        startCursor: { type: "string" },
        pageSize: { type: "integer", default: 100 },
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
      },
      required: ["blockId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${notionBaseUrl(args)}/blocks/${encodeURIComponent(args.blockId)}/children`, {
        start_cursor: args.startCursor,
        page_size: args.pageSize ?? 100,
      }),
      {
        method: "GET",
        headers: await notionHeaders(args, chidori),
      },
    );
  },
);

export const notionAppendBlockChildrenTool = defineTool<NotionAppendBlockChildrenArgs, JsonObject>(
  {
    name: "notion_block_children_append",
    description: "Append child blocks to a Notion block or page.",
    parameters: {
      type: "object",
      properties: {
        blockId: { type: "string" },
        children: { type: "array", items: { type: "object", additionalProperties: true } },
        after: { type: "string" },
        token: { description: "Notion integration token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.notion.com/v1" },
        notionVersion: { type: "string", default: "2022-06-28" },
      },
      required: ["blockId", "children"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${notionBaseUrl(args)}/blocks/${encodeURIComponent(args.blockId)}/children`, {
      method: "PATCH",
      headers: await notionHeaders(args, chidori),
      body: compactObject({
        children: args.children as Json,
        after: args.after,
      }) as JsonObject,
    });
  },
);

export const notionTools = {
  search: notionSearchTool,
  getPage: notionGetPageTool,
  createPage: notionCreatePageTool,
  updatePage: notionUpdatePageTool,
  listBlockChildren: notionListBlockChildrenTool,
  appendBlockChildren: notionAppendBlockChildrenTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getNotionEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "NOTION_INTEGRATION_TOKEN", description: "Notion integration token." },
  ];
}

export const notionIntegrationSpec = {
  environmentVariables: getNotionEnvironmentVariables,
} satisfies IntegrationSpec;
