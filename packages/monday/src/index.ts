import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface MondayAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
  apiVersion?: string;
}

export interface MondayGraphQLArgs extends MondayAuthArgs {
  query: string;
  variables?: JsonObject;
}

export interface MondayListBoardsArgs extends MondayAuthArgs {
  limit?: number;
  page?: number;
  boardIds?: Array<string | number>;
}

export interface MondayGetBoardItemsArgs extends MondayAuthArgs {
  boardId: string | number;
  limit?: number;
  cursor?: string;
}

export interface MondayCreateItemArgs extends MondayAuthArgs {
  boardId: string | number;
  itemName: string;
  groupId?: string;
  columnValues?: JsonObject;
  createLabelsIfMissing?: boolean;
}

export interface MondayChangeColumnValuesArgs extends MondayAuthArgs {
  boardId: string | number;
  itemId: string | number;
  columnValues: JsonObject;
  createLabelsIfMissing?: boolean;
}

export interface MondayCreateUpdateArgs extends MondayAuthArgs {
  itemId: string | number;
  body: string;
}

function mondayBaseUrl(args: MondayAuthArgs): string {
  return (args.baseUrl ?? "https://api.monday.com/v2").replace(/\/+$/, "");
}

async function mondayHeaders(args: MondayAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "monday.com API token");
  const headers: Record<string, string> = {
    Authorization: token,
  };
  if (args.apiVersion) {
    headers["API-Version"] = args.apiVersion;
  }
  return jsonHeaders(headers);
}

function mondayId(value: string | number): number | string {
  return typeof value === "number" || /^\d+$/.test(value) ? Number(value) : value;
}

async function mondayGraphQL<T extends JsonObject>(
  args: MondayAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  query: string,
  variables?: JsonObject,
): Promise<T> {
  return requestJson<T>(chidori, mondayBaseUrl(args), {
    method: "POST",
    headers: await mondayHeaders(args, chidori),
    body: compactObject({ query, variables }) as JsonObject,
  });
}

export const mondayGraphQLTool = defineTool<MondayGraphQLArgs, JsonObject>(
  {
    name: "monday_graphql",
    description: "Run a monday.com GraphQL query or mutation.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        query: { type: "string" },
        variables: { type: "object", additionalProperties: true },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => mondayGraphQL(args, chidori, args.query, args.variables),
);

export const mondayListBoardsTool = defineTool<MondayListBoardsArgs, JsonObject>(
  {
    name: "monday_boards_list",
    description: "List monday.com boards with columns.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        limit: { type: "integer" },
        page: { type: "integer" },
        boardIds: { type: "array", items: { oneOf: [{ type: "string" }, { type: "integer" }] } },
      },
    },
  },
  async (args, chidori) => {
    return mondayGraphQL(args, chidori, `
      query ChidoriMondayBoards($limit: Int, $page: Int, $ids: [ID!]) {
        boards(limit: $limit, page: $page, ids: $ids) {
          id
          name
          description
          state
          columns {
            id
            title
            type
          }
        }
      }
    `, compactObject({
      limit: args.limit,
      page: args.page,
      ids: args.boardIds?.map(mondayId),
    }) as JsonObject);
  },
);

export const mondayGetBoardItemsTool = defineTool<MondayGetBoardItemsArgs, JsonObject>(
  {
    name: "monday_board_items_get",
    description: "Get items from a monday.com board using items_page.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        boardId: { oneOf: [{ type: "string" }, { type: "integer" }] },
        limit: { type: "integer" },
        cursor: { type: "string" },
      },
      required: ["boardId"],
    },
  },
  async (args, chidori) => {
    return mondayGraphQL(args, chidori, `
      query ChidoriMondayBoardItems($boardId: [ID!], $limit: Int, $cursor: String) {
        boards(ids: $boardId) {
          id
          name
          items_page(limit: $limit, cursor: $cursor) {
            cursor
            items {
              id
              name
              state
              column_values {
                id
                type
                text
                value
              }
            }
          }
        }
      }
    `, compactObject({
      boardId: [mondayId(args.boardId)],
      limit: args.limit,
      cursor: args.cursor,
    }) as JsonObject);
  },
);

export const mondayCreateItemTool = defineTool<MondayCreateItemArgs, JsonObject>(
  {
    name: "monday_item_create",
    description: "Create a monday.com item.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        boardId: { oneOf: [{ type: "string" }, { type: "integer" }] },
        itemName: { type: "string" },
        groupId: { type: "string" },
        columnValues: { type: "object", additionalProperties: true },
        createLabelsIfMissing: { type: "boolean" },
      },
      required: ["boardId", "itemName"],
    },
  },
  async (args, chidori) => {
    return mondayGraphQL(args, chidori, `
      mutation ChidoriMondayCreateItem(
        $boardId: ID!
        $itemName: String!
        $groupId: String
        $columnValues: JSON
        $createLabelsIfMissing: Boolean
      ) {
        create_item(
          board_id: $boardId
          item_name: $itemName
          group_id: $groupId
          column_values: $columnValues
          create_labels_if_missing: $createLabelsIfMissing
        ) {
          id
          name
          url
        }
      }
    `, compactObject({
      boardId: mondayId(args.boardId),
      itemName: args.itemName,
      groupId: args.groupId,
      columnValues: args.columnValues ? JSON.stringify(args.columnValues) : undefined,
      createLabelsIfMissing: args.createLabelsIfMissing,
    }) as JsonObject);
  },
);

export const mondayChangeColumnValuesTool = defineTool<MondayChangeColumnValuesArgs, JsonObject>(
  {
    name: "monday_item_column_values_change",
    description: "Change multiple monday.com column values on an item.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        boardId: { oneOf: [{ type: "string" }, { type: "integer" }] },
        itemId: { oneOf: [{ type: "string" }, { type: "integer" }] },
        columnValues: { type: "object", additionalProperties: true },
        createLabelsIfMissing: { type: "boolean" },
      },
      required: ["boardId", "itemId", "columnValues"],
    },
  },
  async (args, chidori) => {
    return mondayGraphQL(args, chidori, `
      mutation ChidoriMondayChangeColumnValues(
        $boardId: ID!
        $itemId: ID!
        $columnValues: JSON!
        $createLabelsIfMissing: Boolean
      ) {
        change_multiple_column_values(
          board_id: $boardId
          item_id: $itemId
          column_values: $columnValues
          create_labels_if_missing: $createLabelsIfMissing
        ) {
          id
          name
          column_values {
            id
            text
          }
        }
      }
    `, compactObject({
      boardId: mondayId(args.boardId),
      itemId: mondayId(args.itemId),
      columnValues: JSON.stringify(args.columnValues),
      createLabelsIfMissing: args.createLabelsIfMissing,
    }) as JsonObject);
  },
);

export const mondayCreateUpdateTool = defineTool<MondayCreateUpdateArgs, JsonObject>(
  {
    name: "monday_update_create",
    description: "Create an update/comment on a monday.com item.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "monday.com API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.monday.com/v2" },
        apiVersion: { type: "string" },
        itemId: { oneOf: [{ type: "string" }, { type: "integer" }] },
        body: { type: "string" },
      },
      required: ["itemId", "body"],
    },
  },
  async (args, chidori) => {
    return mondayGraphQL(args, chidori, `
      mutation ChidoriMondayCreateUpdate($itemId: ID!, $body: String!) {
        create_update(item_id: $itemId, body: $body) {
          id
          body
          created_at
        }
      }
    `, {
      itemId: mondayId(args.itemId),
      body: args.body,
    });
  },
);

export const mondayTools = {
  graphql: mondayGraphQLTool,
  listBoards: mondayListBoardsTool,
  getBoardItems: mondayGetBoardItemsTool,
  createItem: mondayCreateItemTool,
  changeColumnValues: mondayChangeColumnValuesTool,
  createUpdate: mondayCreateUpdateTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getMondayEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "MONDAY_API_TOKEN", description: "monday.com API token." },
  ];
}

export const mondayIntegrationSpec = {
  environmentVariables: getMondayEnvironmentVariables,
} satisfies IntegrationSpec;
