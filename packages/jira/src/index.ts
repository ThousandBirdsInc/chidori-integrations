import {
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

export interface JiraAuthArgs {
  baseUrl: string;
  authorization?: SecretInput;
}

export interface JiraJqlSearchArgs extends JiraAuthArgs {
  jql: string;
  fields?: string[];
  expand?: string;
  maxResults?: number;
  nextPageToken?: string;
  properties?: string[];
  reconcileIssues?: number[];
  extraBody?: JsonObject;
}

export interface JiraGetIssueArgs extends JiraAuthArgs {
  issueIdOrKey: string;
  fields?: string[];
  expand?: string;
  properties?: string[];
  updateHistory?: boolean;
}

export interface JiraCreateIssueArgs extends JiraAuthArgs {
  fields: JsonObject;
  update?: JsonObject;
  historyMetadata?: JsonObject;
  properties?: JsonObject[];
}

export interface JiraAddIssueCommentArgs extends JiraAuthArgs {
  issueIdOrKey: string;
  body: JsonObject;
  visibility?: JsonObject;
  properties?: JsonObject[];
}

export interface JiraTransitionIssueArgs extends JiraAuthArgs {
  issueIdOrKey: string;
  transitionId: string;
  fields?: JsonObject;
  update?: JsonObject;
  historyMetadata?: JsonObject;
}

function jiraBaseUrl(args: JiraAuthArgs): string {
  return args.baseUrl.replace(/\/+$/, "");
}

async function jiraHeaders(args: JiraAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (args.authorization) {
    headers.Authorization = await resolveSecret(args.authorization, chidori, "Jira Authorization header");
  }
  return headers;
}

export const jiraJqlSearchTool = defineTool<JiraJqlSearchArgs, JsonObject>(
  {
    name: "jira_jql_search",
    description: "Search Jira issues with JQL using Jira Cloud enhanced search.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string", description: "Jira Cloud site base URL, such as https://example.atlassian.net." },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        jql: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        expand: { type: "string" },
        maxResults: { type: "integer", default: 50 },
        nextPageToken: { type: "string" },
        properties: { type: "array", items: { type: "string" } },
        reconcileIssues: { type: "array", items: { type: "integer" } },
        extraBody: { type: "object", additionalProperties: true },
      },
      required: ["baseUrl", "jql"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jiraBaseUrl(args)}/rest/api/3/search/jql`, {
      method: "POST",
      headers: jsonHeaders(await jiraHeaders(args, chidori)),
      body: compactObject({
        ...(args.extraBody ?? {}),
        jql: args.jql,
        fields: args.fields,
        expand: args.expand,
        maxResults: args.maxResults ?? 50,
        nextPageToken: args.nextPageToken,
        properties: args.properties,
        reconcileIssues: args.reconcileIssues,
      }) as JsonObject,
    });
  },
);

export const jiraGetIssueTool = defineTool<JiraGetIssueArgs, JsonObject>(
  {
    name: "jira_issue_get",
    description: "Get a Jira issue by ID or key.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string" },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        issueIdOrKey: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        expand: { type: "string" },
        properties: { type: "array", items: { type: "string" } },
        updateHistory: { type: "boolean" },
      },
      required: ["baseUrl", "issueIdOrKey"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${jiraBaseUrl(args)}/rest/api/3/issue/${encodeURIComponent(args.issueIdOrKey)}`, {
        fields: args.fields?.join(","),
        expand: args.expand,
        properties: args.properties?.join(","),
        updateHistory: args.updateHistory,
      }),
      {
        method: "GET",
        headers: await jiraHeaders(args, chidori),
      },
    );
  },
);

export const jiraCreateIssueTool = defineTool<JiraCreateIssueArgs, JsonObject>(
  {
    name: "jira_issue_create",
    description: "Create a Jira issue with caller-provided Jira fields.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string" },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        fields: { type: "object", additionalProperties: true },
        update: { type: "object", additionalProperties: true },
        historyMetadata: { type: "object", additionalProperties: true },
        properties: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["baseUrl", "fields"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, `${jiraBaseUrl(args)}/rest/api/3/issue`, {
      method: "POST",
      headers: jsonHeaders(await jiraHeaders(args, chidori)),
      body: compactObject({
        fields: args.fields,
        update: args.update,
        historyMetadata: args.historyMetadata,
        properties: args.properties as Json | undefined,
      }) as JsonObject,
    });
  },
);

export const jiraAddIssueCommentTool = defineTool<JiraAddIssueCommentArgs, JsonObject>(
  {
    name: "jira_issue_comment_add",
    description: "Add an Atlassian Document Format comment to a Jira issue.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string" },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        issueIdOrKey: { type: "string" },
        body: { type: "object", additionalProperties: true },
        visibility: { type: "object", additionalProperties: true },
        properties: { type: "array", items: { type: "object", additionalProperties: true } },
      },
      required: ["baseUrl", "issueIdOrKey", "body"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${jiraBaseUrl(args)}/rest/api/3/issue/${encodeURIComponent(args.issueIdOrKey)}/comment`,
      {
        method: "POST",
        headers: jsonHeaders(await jiraHeaders(args, chidori)),
        body: compactObject({
          body: args.body,
          visibility: args.visibility,
          properties: args.properties as Json | undefined,
        }) as JsonObject,
      },
    );
  },
);

export const jiraTransitionIssueTool = defineTool<JiraTransitionIssueArgs, JsonObject>(
  {
    name: "jira_issue_transition",
    description: "Transition a Jira issue to another workflow status.",
    parameters: {
      type: "object",
      properties: {
        baseUrl: { type: "string" },
        authorization: { description: "Authorization header value, such as Basic base64(email:api_token) or Bearer token." },
        issueIdOrKey: { type: "string" },
        transitionId: { type: "string" },
        fields: { type: "object", additionalProperties: true },
        update: { type: "object", additionalProperties: true },
        historyMetadata: { type: "object", additionalProperties: true },
      },
      required: ["baseUrl", "issueIdOrKey", "transitionId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${jiraBaseUrl(args)}/rest/api/3/issue/${encodeURIComponent(args.issueIdOrKey)}/transitions`,
      {
        method: "POST",
        headers: jsonHeaders(await jiraHeaders(args, chidori)),
        body: compactObject({
          transition: { id: args.transitionId },
          fields: args.fields,
          update: args.update,
          historyMetadata: args.historyMetadata,
        }) as JsonObject,
      },
    );
  },
);

export const jiraTools = {
  jqlSearch: jiraJqlSearchTool,
  getIssue: jiraGetIssueTool,
  createIssue: jiraCreateIssueTool,
  addIssueComment: jiraAddIssueCommentTool,
  transitionIssue: jiraTransitionIssueTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getJiraEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "JIRA_BASE_URL", description: "Jira base URL." },
    { name: "JIRA_AUTHORIZATION", description: "Jira Authorization header." },
  ];
}

export const jiraIntegrationSpec = {
  environmentVariables: getJiraEnvironmentVariables,
} satisfies IntegrationSpec;
