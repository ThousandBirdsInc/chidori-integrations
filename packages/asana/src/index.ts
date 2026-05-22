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

export interface AsanaAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface AsanaListProjectsArgs extends AsanaAuthArgs {
  workspace?: string;
  team?: string;
  archived?: boolean;
  optFields?: string;
  limit?: number;
  offset?: string;
}

export interface AsanaListProjectTasksArgs extends AsanaAuthArgs {
  projectGid: string;
  completedSince?: string;
  optFields?: string;
  limit?: number;
  offset?: string;
}

export interface AsanaSearchWorkspaceTasksArgs extends AsanaAuthArgs {
  workspaceGid: string;
  text?: string;
  assigneeAny?: string;
  projectsAny?: string;
  sectionsAny?: string;
  tagsAny?: string;
  completed?: boolean;
  completedOnBefore?: string;
  completedOnAfter?: string;
  modifiedOnBefore?: string;
  modifiedOnAfter?: string;
  dueOnBefore?: string;
  dueOnAfter?: string;
  optFields?: string;
  limit?: number;
  offset?: string;
}

export interface AsanaGetTaskArgs extends AsanaAuthArgs {
  taskGid: string;
  optFields?: string;
}

export interface AsanaCreateTaskArgs extends AsanaAuthArgs {
  data: JsonObject;
  optFields?: string;
}

export interface AsanaUpdateTaskArgs extends AsanaAuthArgs {
  taskGid: string;
  data: JsonObject;
  optFields?: string;
}

export interface AsanaAddTaskCommentArgs extends AsanaAuthArgs {
  taskGid: string;
  text?: string;
  htmlText?: string;
  optFields?: string;
}

function asanaBaseUrl(args: AsanaAuthArgs): string {
  return (args.baseUrl ?? "https://app.asana.com/api/1.0").replace(/\/+$/, "");
}

async function asanaHeaders(args: AsanaAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Asana personal access token");
  return jsonHeaders({
    Authorization: `Bearer ${token}`,
  });
}

function asanaBody(data: JsonObject): JsonObject {
  return { data };
}

export const asanaListProjectsTool = defineTool<AsanaListProjectsArgs, JsonObject>(
  {
    name: "asana_projects_list",
    description: "List Asana projects in a workspace or team.",
    parameters: {
      type: "object",
      properties: {
        workspace: { type: "string" },
        team: { type: "string" },
        archived: { type: "boolean" },
        optFields: { type: "string" },
        limit: { type: "integer", default: 50 },
        offset: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: [],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/projects`, {
        workspace: args.workspace,
        team: args.team,
        archived: args.archived,
        opt_fields: args.optFields,
        limit: args.limit ?? 50,
        offset: args.offset,
      }),
      {
        method: "GET",
        headers: await asanaHeaders(args, chidori),
      },
    );
  },
);

export const asanaListProjectTasksTool = defineTool<AsanaListProjectTasksArgs, JsonObject>(
  {
    name: "asana_project_tasks_list",
    description: "List tasks in an Asana project.",
    parameters: {
      type: "object",
      properties: {
        projectGid: { type: "string" },
        completedSince: { type: "string" },
        optFields: { type: "string" },
        limit: { type: "integer", default: 50 },
        offset: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["projectGid"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/projects/${encodeURIComponent(args.projectGid)}/tasks`, {
        completed_since: args.completedSince,
        opt_fields: args.optFields,
        limit: args.limit ?? 50,
        offset: args.offset,
      }),
      {
        method: "GET",
        headers: await asanaHeaders(args, chidori),
      },
    );
  },
);

export const asanaSearchWorkspaceTasksTool = defineTool<AsanaSearchWorkspaceTasksArgs, JsonObject>(
  {
    name: "asana_workspace_tasks_search",
    description: "Search Asana tasks in a workspace.",
    parameters: {
      type: "object",
      properties: {
        workspaceGid: { type: "string" },
        text: { type: "string" },
        assigneeAny: { type: "string" },
        projectsAny: { type: "string" },
        sectionsAny: { type: "string" },
        tagsAny: { type: "string" },
        completed: { type: "boolean" },
        completedOnBefore: { type: "string" },
        completedOnAfter: { type: "string" },
        modifiedOnBefore: { type: "string" },
        modifiedOnAfter: { type: "string" },
        dueOnBefore: { type: "string" },
        dueOnAfter: { type: "string" },
        optFields: { type: "string" },
        limit: { type: "integer", default: 50 },
        offset: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["workspaceGid"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/workspaces/${encodeURIComponent(args.workspaceGid)}/tasks/search`, {
        text: args.text,
        "assignee.any": args.assigneeAny,
        "projects.any": args.projectsAny,
        "sections.any": args.sectionsAny,
        "tags.any": args.tagsAny,
        completed: args.completed,
        completed_on_before: args.completedOnBefore,
        completed_on_after: args.completedOnAfter,
        modified_on_before: args.modifiedOnBefore,
        modified_on_after: args.modifiedOnAfter,
        due_on_before: args.dueOnBefore,
        due_on_after: args.dueOnAfter,
        opt_fields: args.optFields,
        limit: args.limit ?? 50,
        offset: args.offset,
      }),
      {
        method: "GET",
        headers: await asanaHeaders(args, chidori),
      },
    );
  },
);

export const asanaGetTaskTool = defineTool<AsanaGetTaskArgs, JsonObject>(
  {
    name: "asana_task_get",
    description: "Get an Asana task by GID.",
    parameters: {
      type: "object",
      properties: {
        taskGid: { type: "string" },
        optFields: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["taskGid"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/tasks/${encodeURIComponent(args.taskGid)}`, {
        opt_fields: args.optFields,
      }),
      {
        method: "GET",
        headers: await asanaHeaders(args, chidori),
      },
    );
  },
);

export const asanaCreateTaskTool = defineTool<AsanaCreateTaskArgs, JsonObject>(
  {
    name: "asana_task_create",
    description: "Create an Asana task using caller-provided Asana task fields.",
    parameters: {
      type: "object",
      properties: {
        data: { type: "object", additionalProperties: true },
        optFields: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["data"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/tasks`, { opt_fields: args.optFields }),
      {
        method: "POST",
        headers: await asanaHeaders(args, chidori),
        body: asanaBody(args.data),
      },
    );
  },
);

export const asanaUpdateTaskTool = defineTool<AsanaUpdateTaskArgs, JsonObject>(
  {
    name: "asana_task_update",
    description: "Update an Asana task using caller-provided Asana task fields.",
    parameters: {
      type: "object",
      properties: {
        taskGid: { type: "string" },
        data: { type: "object", additionalProperties: true },
        optFields: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["taskGid", "data"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/tasks/${encodeURIComponent(args.taskGid)}`, { opt_fields: args.optFields }),
      {
        method: "PUT",
        headers: await asanaHeaders(args, chidori),
        body: asanaBody(args.data),
      },
    );
  },
);

export const asanaAddTaskCommentTool = defineTool<AsanaAddTaskCommentArgs, JsonObject>(
  {
    name: "asana_task_comment_add",
    description: "Add a comment story to an Asana task.",
    parameters: {
      type: "object",
      properties: {
        taskGid: { type: "string" },
        text: { type: "string" },
        htmlText: { type: "string" },
        optFields: { type: "string" },
        token: { description: "Asana personal access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://app.asana.com/api/1.0" },
      },
      required: ["taskGid"],
    },
  },
  async (args, chidori) => {
    const data = compactObject({
      text: args.text,
      html_text: args.htmlText,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${asanaBaseUrl(args)}/tasks/${encodeURIComponent(args.taskGid)}/stories`, {
        opt_fields: args.optFields,
      }),
      {
        method: "POST",
        headers: await asanaHeaders(args, chidori),
        body: { data } as JsonObject,
      },
    );
  },
);

export const asanaTools = {
  listProjects: asanaListProjectsTool,
  listProjectTasks: asanaListProjectTasksTool,
  searchWorkspaceTasks: asanaSearchWorkspaceTasksTool,
  getTask: asanaGetTaskTool,
  createTask: asanaCreateTaskTool,
  updateTask: asanaUpdateTaskTool,
  addTaskComment: asanaAddTaskCommentTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAsanaEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ASANA_PERSONAL_ACCESS_TOKEN", description: "Asana personal access token." },
  ];
}

export const asanaIntegrationSpec = {
  environmentVariables: getAsanaEnvironmentVariables,
} satisfies IntegrationSpec;
