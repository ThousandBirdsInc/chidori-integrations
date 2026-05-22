import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface LinearAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
  bearer?: boolean;
}

export interface LinearGraphQLArgs extends LinearAuthArgs {
  query: string;
  variables?: JsonObject;
  operationName?: string;
}

export interface LinearTeamsListArgs extends LinearAuthArgs {
  first?: number;
  after?: string;
}

export interface LinearGetIssueArgs extends LinearAuthArgs {
  issueId: string;
}

export interface LinearCreateIssueArgs extends LinearAuthArgs {
  input: JsonObject;
}

export interface LinearUpdateIssueArgs extends LinearAuthArgs {
  issueId: string;
  input: JsonObject;
}

export interface LinearCreateCommentArgs extends LinearAuthArgs {
  input: JsonObject;
}

function linearBaseUrl(args: LinearAuthArgs): string {
  return args.baseUrl ?? "https://api.linear.app/graphql";
}

async function linearHeaders(args: LinearAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Linear API token");
  return jsonHeaders({
    Authorization: args.bearer ? `Bearer ${token}` : token,
  });
}

async function linearGraphQL(args: LinearGraphQLArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  return requestJson<JsonObject>(chidori, linearBaseUrl(args), {
    method: "POST",
    headers: await linearHeaders(args, chidori),
    body: compactObject({
      query: args.query,
      variables: args.variables,
      operationName: args.operationName,
    }) as JsonObject,
  });
}

const authProperties = {
  token: { description: "Linear personal API key or OAuth access token." },
  baseUrl: { type: "string" as const, default: "https://api.linear.app/graphql" },
  bearer: { type: "boolean" as const, description: "Use OAuth-style Authorization: Bearer <token> instead of personal-key auth." },
};

export const linearGraphQLTool = defineTool<LinearGraphQLArgs, JsonObject>(
  {
    name: "linear_graphql",
    description: "Execute a custom Linear GraphQL query or mutation.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        variables: { type: "object", additionalProperties: true },
        operationName: { type: "string" },
        ...authProperties,
      },
      required: ["query"],
    },
  },
  linearGraphQL,
);

export const linearTeamsListTool = defineTool<LinearTeamsListArgs, JsonObject>(
  {
    name: "linear_teams_list",
    description: "List Linear teams visible to the authenticated user.",
    parameters: {
      type: "object",
      properties: {
        first: { type: "integer", default: 50 },
        after: { type: "string" },
        ...authProperties,
      },
      required: [],
    },
  },
  async (args, chidori) => linearGraphQL({
    ...args,
    query: `
      query LinearTeams($first: Int, $after: String) {
        teams(first: $first, after: $after) {
          nodes { id key name description }
          pageInfo { hasNextPage endCursor }
        }
      }
    `,
    variables: compactObject({ first: args.first ?? 50, after: args.after }) as JsonObject,
  }, chidori),
);

export const linearGetIssueTool = defineTool<LinearGetIssueArgs, JsonObject>(
  {
    name: "linear_issue_get",
    description: "Get a Linear issue by UUID or identifier.",
    parameters: {
      type: "object",
      properties: {
        issueId: { type: "string" },
        ...authProperties,
      },
      required: ["issueId"],
    },
  },
  async (args, chidori) => linearGraphQL({
    ...args,
    query: `
      query LinearIssue($id: String!) {
        issue(id: $id) {
          id
          identifier
          title
          description
          url
          priority
          priorityLabel
          createdAt
          updatedAt
          state { id name type }
          team { id key name }
          assignee { id name email }
        }
      }
    `,
    variables: { id: args.issueId },
  }, chidori),
);

export const linearCreateIssueTool = defineTool<LinearCreateIssueArgs, JsonObject>(
  {
    name: "linear_issue_create",
    description: "Create a Linear issue using IssueCreateInput fields.",
    parameters: {
      type: "object",
      properties: {
        input: { type: "object", additionalProperties: true },
        ...authProperties,
      },
      required: ["input"],
    },
  },
  async (args, chidori) => linearGraphQL({
    ...args,
    query: `
      mutation LinearIssueCreate($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          success
          issue { id identifier title url }
        }
      }
    `,
    variables: { input: args.input },
  }, chidori),
);

export const linearUpdateIssueTool = defineTool<LinearUpdateIssueArgs, JsonObject>(
  {
    name: "linear_issue_update",
    description: "Update a Linear issue using IssueUpdateInput fields.",
    parameters: {
      type: "object",
      properties: {
        issueId: { type: "string" },
        input: { type: "object", additionalProperties: true },
        ...authProperties,
      },
      required: ["issueId", "input"],
    },
  },
  async (args, chidori) => linearGraphQL({
    ...args,
    query: `
      mutation LinearIssueUpdate($id: String!, $input: IssueUpdateInput!) {
        issueUpdate(id: $id, input: $input) {
          success
          issue { id identifier title url state { id name type } }
        }
      }
    `,
    variables: { id: args.issueId, input: args.input },
  }, chidori),
);

export const linearCreateCommentTool = defineTool<LinearCreateCommentArgs, JsonObject>(
  {
    name: "linear_comment_create",
    description: "Create a Linear comment using CommentCreateInput fields.",
    parameters: {
      type: "object",
      properties: {
        input: { type: "object", additionalProperties: true },
        ...authProperties,
      },
      required: ["input"],
    },
  },
  async (args, chidori) => linearGraphQL({
    ...args,
    query: `
      mutation LinearCommentCreate($input: CommentCreateInput!) {
        commentCreate(input: $input) {
          success
          comment { id body createdAt user { id name } issue { id identifier title } }
        }
      }
    `,
    variables: { input: args.input },
  }, chidori),
);

export const linearTools = {
  graphQL: linearGraphQLTool,
  listTeams: linearTeamsListTool,
  getIssue: linearGetIssueTool,
  createIssue: linearCreateIssueTool,
  updateIssue: linearUpdateIssueTool,
  createComment: linearCreateCommentTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getLinearEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "LINEAR_API_TOKEN", description: "Linear API token." },
  ];
}

export const linearIntegrationSpec = {
  environmentVariables: getLinearEnvironmentVariables,
} satisfies IntegrationSpec;
