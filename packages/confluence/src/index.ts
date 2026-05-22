import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ConfluenceAuthArgs {
  baseUrl: string;
  authorization?: SecretInput;
}

export interface ConfluenceListPagesArgs extends ConfluenceAuthArgs {
  spaceId?: string;
  title?: string;
  status?: "current" | "archived" | "deleted" | "trashed" | "draft";
  bodyFormat?: "storage" | "atlas_doc_format" | "view";
  limit?: number;
  cursor?: string;
}

export interface ConfluenceGetPageArgs extends ConfluenceAuthArgs {
  pageId: string;
  bodyFormat?: "storage" | "atlas_doc_format" | "view";
  getDraft?: boolean;
  status?: "current" | "archived" | "deleted" | "trashed" | "draft";
}

export interface ConfluenceCreatePageArgs extends ConfluenceAuthArgs {
  spaceId: string;
  title: string;
  body: JsonObject;
  status?: "current" | "draft";
  parentId?: string;
  subtype?: string;
  private?: boolean;
  rootLevel?: boolean;
  embedded?: boolean;
}

export interface ConfluenceUpdatePageArgs extends ConfluenceAuthArgs {
  pageId: string;
  title: string;
  body: JsonObject;
  versionNumber: number;
  status?: "current" | "draft";
  versionMessage?: string;
  spaceId?: string;
  parentId?: string;
}

function confluenceBaseUrl(args: ConfluenceAuthArgs): string {
  return args.baseUrl.replace(/\/+$/, "");
}

async function confluenceHeaders(args: ConfluenceAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (args.authorization) {
    headers.Authorization = await resolveSecret(args.authorization, chidori, "Confluence Authorization header");
  }
  return headers;
}

export const confluenceListPagesTool = defineTool<ConfluenceListPagesArgs, JsonObject>(
  {
    name: "confluence_pages_list",
    description: "List Confluence Cloud pages with optional space and title filters.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Confluence Cloud base URL including /wiki, such as https://example.atlassian.net/wiki." },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        spaceId: { type: "string" },
        title: { type: "string" },
        status: { type: "string", enum: ["current", "archived", "deleted", "trashed", "draft"] },
        bodyFormat: { type: "string", enum: ["storage", "atlas_doc_format", "view"] },
        limit: { type: "integer", default: 25 },
        cursor: { type: "string" },
      },
      required: ["baseUrl"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${confluenceBaseUrl(args)}/api/v2/pages`, {
        "space-id": args.spaceId,
        title: args.title,
        status: args.status,
        "body-format": args.bodyFormat,
        limit: args.limit ?? 25,
        cursor: args.cursor,
      }),
      {
        method: "GET",
        headers: await confluenceHeaders(args, chidori),
      },
    );
  },
);

export const confluenceGetPageTool = defineTool<ConfluenceGetPageArgs, JsonObject>(
  {
    name: "confluence_page_get",
    description: "Get a Confluence Cloud page by ID.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Confluence Cloud base URL including /wiki." },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        pageId: { type: "string" },
        bodyFormat: { type: "string", enum: ["storage", "atlas_doc_format", "view"] },
        getDraft: { type: "boolean" },
        status: { type: "string", enum: ["current", "archived", "deleted", "trashed", "draft"] },
      },
      required: ["baseUrl", "pageId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${confluenceBaseUrl(args)}/api/v2/pages/${encodeURIComponent(args.pageId)}`, {
        "body-format": args.bodyFormat,
        "get-draft": args.getDraft,
        status: args.status,
      }),
      {
        method: "GET",
        headers: await confluenceHeaders(args, chidori),
      },
    );
  },
);

export const confluenceCreatePageTool = defineTool<ConfluenceCreatePageArgs, JsonObject>(
  {
    name: "confluence_page_create",
    description: "Create a Confluence Cloud page.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Confluence Cloud base URL including /wiki." },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        spaceId: { type: "string" },
        title: { type: "string" },
        body: { type: "object", additionalProperties: true },
        status: { type: "string", enum: ["current", "draft"], default: "current" },
        parentId: { type: "string" },
        subtype: { type: "string" },
        private: { type: "boolean" },
        rootLevel: { type: "boolean" },
        embedded: { type: "boolean" },
      },
      required: ["baseUrl", "spaceId", "title", "body"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${confluenceBaseUrl(args)}/api/v2/pages`, {
        private: args.private,
        "root-level": args.rootLevel,
        embedded: args.embedded,
      }),
      {
        method: "POST",
        headers: jsonHeaders(await confluenceHeaders(args, chidori)),
        body: compactObject({
          spaceId: args.spaceId,
          status: args.status ?? "current",
          title: args.title,
          parentId: args.parentId,
          body: args.body,
          subtype: args.subtype,
        }) as JsonObject,
      },
    );
  },
);

export const confluenceUpdatePageTool = defineTool<ConfluenceUpdatePageArgs, JsonObject>(
  {
    name: "confluence_page_update",
    description: "Update a Confluence Cloud page by ID.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Confluence Cloud base URL including /wiki." },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        pageId: { type: "string" },
        title: { type: "string" },
        body: { type: "object", additionalProperties: true },
        versionNumber: { type: "integer" },
        status: { type: "string", enum: ["current", "draft"], default: "current" },
        versionMessage: { type: "string" },
        spaceId: { type: "string" },
        parentId: { type: "string" },
      },
      required: ["baseUrl", "pageId", "title", "body", "versionNumber"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${confluenceBaseUrl(args)}/api/v2/pages/${encodeURIComponent(args.pageId)}`,
      {
        method: "PUT",
        headers: jsonHeaders(await confluenceHeaders(args, chidori)),
        body: compactObject({
          id: args.pageId,
          status: args.status ?? "current",
          title: args.title,
          spaceId: args.spaceId,
          parentId: args.parentId,
          body: args.body,
          version: compactObject({
            number: args.versionNumber,
            message: args.versionMessage,
          }) as JsonObject,
        }) as JsonObject,
      },
    );
  },
);

export const confluenceTools = {
  listPages: confluenceListPagesTool,
  getPage: confluenceGetPageTool,
  createPage: confluenceCreatePageTool,
  updatePage: confluenceUpdatePageTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getConfluenceEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "CONFLUENCE_BASE_URL", description: "Confluence Cloud base URL including /wiki." },
    { name: "CONFLUENCE_AUTHORIZATION", description: "Confluence Authorization header." },
  ];
}

export const confluenceIntegrationSpec = {
  environmentVariables: getConfluenceEnvironmentVariables,
} satisfies IntegrationSpec;
