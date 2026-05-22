import {
  defineTool,
  requestJson,
  resolveSecret,
  withQuery,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface TrelloAuthArgs {
  apiKey?: SecretInput;
  token?: SecretInput;
  baseUrl?: string;
}

export interface TrelloListMemberBoardsArgs extends TrelloAuthArgs {
  memberId?: string;
  fields?: string;
  filter?: string;
  lists?: "all" | "closed" | "none" | "open";
}

export interface TrelloListBoardListsArgs extends TrelloAuthArgs {
  boardId: string;
  filter?: "all" | "closed" | "none" | "open";
  fields?: string;
}

export interface TrelloListBoardCardsArgs extends TrelloAuthArgs {
  boardId: string;
  filter?: "all" | "closed" | "none" | "open" | "visible";
  fields?: string;
}

export interface TrelloCreateCardArgs extends TrelloAuthArgs {
  listId: string;
  name?: string;
  desc?: string;
  pos?: "top" | "bottom" | number;
  due?: string;
  dueComplete?: boolean;
  idMembers?: string[];
  idLabels?: string[];
  urlSource?: string;
}

export interface TrelloUpdateCardArgs extends TrelloAuthArgs {
  cardId: string;
  name?: string;
  desc?: string;
  closed?: boolean;
  idList?: string;
  pos?: "top" | "bottom" | number;
  due?: string | null;
  dueComplete?: boolean;
}

export interface TrelloAddCardCommentArgs extends TrelloAuthArgs {
  cardId: string;
  text: string;
}

function trelloBaseUrl(args: TrelloAuthArgs): string {
  return (args.baseUrl ?? "https://api.trello.com/1").replace(/\/+$/, "");
}

async function trelloAuthQuery(args: TrelloAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  return {
    key: await resolveSecret(args.apiKey, chidori, "Trello API key"),
    token: await resolveSecret(args.token, chidori, "Trello token"),
  };
}

export const trelloListMemberBoardsTool = defineTool<TrelloListMemberBoardsArgs, JsonObject>(
  {
    name: "trello_member_boards_list",
    description: "List Trello boards visible to a member.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
        memberId: { type: "string", default: "me" },
        fields: { type: "string" },
        filter: { type: "string" },
        lists: { type: "string", enum: ["all", "closed", "none", "open"] },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/members/${encodeURIComponent(args.memberId ?? "me")}/boards`, {
        ...(await trelloAuthQuery(args, chidori)),
        fields: args.fields,
        filter: args.filter,
        lists: args.lists,
      }),
      { method: "GET" },
    );
  },
);

export const trelloListBoardListsTool = defineTool<TrelloListBoardListsArgs, JsonObject>(
  {
    name: "trello_board_lists_list",
    description: "List lists on a Trello board.",
    parameters: {
      type: "object",
      properties: {
        boardId: { type: "string" },
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
        filter: { type: "string", enum: ["all", "closed", "none", "open"] },
        fields: { type: "string" },
      },
      required: ["boardId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/boards/${encodeURIComponent(args.boardId)}/lists`, {
        ...(await trelloAuthQuery(args, chidori)),
        filter: args.filter,
        fields: args.fields,
      }),
      { method: "GET" },
    );
  },
);

export const trelloListBoardCardsTool = defineTool<TrelloListBoardCardsArgs, JsonObject>(
  {
    name: "trello_board_cards_list",
    description: "List cards on a Trello board.",
    parameters: {
      type: "object",
      properties: {
        boardId: { type: "string" },
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
        filter: { type: "string", enum: ["all", "closed", "none", "open", "visible"] },
        fields: { type: "string" },
      },
      required: ["boardId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/boards/${encodeURIComponent(args.boardId)}/cards`, {
        ...(await trelloAuthQuery(args, chidori)),
        filter: args.filter,
        fields: args.fields,
      }),
      { method: "GET" },
    );
  },
);

export const trelloCreateCardTool = defineTool<TrelloCreateCardArgs, JsonObject>(
  {
    name: "trello_card_create",
    description: "Create a Trello card in a list.",
    parameters: {
      type: "object",
      properties: {
        listId: { type: "string" },
        name: { type: "string" },
        desc: { type: "string" },
        pos: { description: "top, bottom, or numeric position." },
        due: { type: "string" },
        dueComplete: { type: "boolean" },
        idMembers: { type: "array", items: { type: "string" } },
        idLabels: { type: "array", items: { type: "string" } },
        urlSource: { type: "string" },
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
      },
      required: ["listId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/cards`, {
        ...(await trelloAuthQuery(args, chidori)),
        idList: args.listId,
        name: args.name,
        desc: args.desc,
        pos: args.pos,
        due: args.due,
        dueComplete: args.dueComplete,
        idMembers: args.idMembers?.join(","),
        idLabels: args.idLabels?.join(","),
        urlSource: args.urlSource,
      }),
      { method: "POST" },
    );
  },
);

export const trelloUpdateCardTool = defineTool<TrelloUpdateCardArgs, JsonObject>(
  {
    name: "trello_card_update",
    description: "Update a Trello card.",
    parameters: {
      type: "object",
      properties: {
        cardId: { type: "string" },
        name: { type: "string" },
        desc: { type: "string" },
        closed: { type: "boolean" },
        idList: { type: "string" },
        pos: { description: "top, bottom, or numeric position." },
        due: { description: "Due date string or null." },
        dueComplete: { type: "boolean" },
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
      },
      required: ["cardId"],
    },
  },
  async (args, chidori) => {
    const due = args.due === null ? "null" : args.due;
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/cards/${encodeURIComponent(args.cardId)}`, {
        ...(await trelloAuthQuery(args, chidori)),
        name: args.name,
        desc: args.desc,
        closed: args.closed,
        idList: args.idList,
        pos: args.pos,
        due,
        dueComplete: args.dueComplete,
      }),
      { method: "PUT" },
    );
  },
);

export const trelloAddCardCommentTool = defineTool<TrelloAddCardCommentArgs, JsonObject>(
  {
    name: "trello_card_comment_add",
    description: "Add a comment to a Trello card.",
    parameters: {
      type: "object",
      properties: {
        cardId: { type: "string" },
        text: { type: "string" },
        apiKey: { description: "Trello API key or Chidori memory secret reference." },
        token: { description: "Trello token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.trello.com/1" },
      },
      required: ["cardId", "text"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${trelloBaseUrl(args)}/cards/${encodeURIComponent(args.cardId)}/actions/comments`, {
        ...(await trelloAuthQuery(args, chidori)),
        text: args.text,
      }),
      { method: "POST" },
    );
  },
);

export const trelloTools = {
  listMemberBoards: trelloListMemberBoardsTool,
  listBoardLists: trelloListBoardListsTool,
  listBoardCards: trelloListBoardCardsTool,
  createCard: trelloCreateCardTool,
  updateCard: trelloUpdateCardTool,
  addCardComment: trelloAddCardCommentTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getTrelloEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "TRELLO_API_KEY", description: "Trello API key." },
    { name: "TRELLO_TOKEN", description: "Trello token." },
  ];
}

export const trelloIntegrationSpec = {
  environmentVariables: getTrelloEnvironmentVariables,
} satisfies IntegrationSpec;
