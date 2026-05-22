import {
  bearerAuth,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface TodoistAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface TodoistListTasksArgs extends TodoistAuthArgs {
  projectId?: string;
  sectionId?: string;
  parentId?: string;
  label?: string;
  filter?: string;
  lang?: string;
  ids?: string[];
}

export interface TodoistTaskIdArgs extends TodoistAuthArgs {
  taskId: string;
}

export interface TodoistTaskBodyArgs extends TodoistAuthArgs {
  task: JsonObject;
}

export interface TodoistUpdateTaskArgs extends TodoistTaskIdArgs {
  task: JsonObject;
}

export interface TodoistListCommentsArgs extends TodoistAuthArgs {
  taskId?: string;
  projectId?: string;
}

export interface TodoistCreateCommentArgs extends TodoistAuthArgs {
  comment: JsonObject;
}

function todoistBaseUrl(args: TodoistAuthArgs): string {
  return (args.baseUrl ?? "https://api.todoist.com/rest/v2").replace(/\/+$/, "");
}

async function todoistHeaders(args: TodoistAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Todoist API token");
  return jsonHeaders(bearerAuth(token));
}

async function todoistRequest<T extends Json>(
  args: TodoistAuthArgs,
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
    headers: await todoistHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${todoistBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const todoistListProjectsTool = defineTool<TodoistAuthArgs, Json>(
  {
    name: "todoist_projects_list",
    description: "List Todoist projects.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
      },
    },
  },
  async (args, chidori) => {
    return todoistRequest<Json>(args, chidori, "/projects");
  },
);

export const todoistListTasksTool = defineTool<TodoistListTasksArgs, Json>(
  {
    name: "todoist_tasks_list",
    description: "List active Todoist tasks, optionally filtered by project, section, label, IDs, or Todoist filter.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        projectId: { type: "string" },
        sectionId: { type: "string" },
        parentId: { type: "string" },
        label: { type: "string" },
        filter: { type: "string" },
        lang: { type: "string" },
        ids: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    return todoistRequest<Json>(args, chidori, "/tasks", {
      query: {
        project_id: args.projectId,
        section_id: args.sectionId,
        parent_id: args.parentId,
        label: args.label,
        filter: args.filter,
        lang: args.lang,
        ids: args.ids?.join(","),
      },
    });
  },
);

export const todoistGetTaskTool = defineTool<TodoistTaskIdArgs, JsonObject>(
  {
    name: "todoist_task_get",
    description: "Get a Todoist task by ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        taskId: { type: "string" },
      },
      required: ["taskId"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<JsonObject>(args, chidori, `/tasks/${encodeURIComponent(args.taskId)}`);
  },
);

export const todoistCreateTaskTool = defineTool<TodoistTaskBodyArgs, JsonObject>(
  {
    name: "todoist_task_create",
    description: "Create a Todoist task using caller-provided task fields.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        task: { type: "object", additionalProperties: true },
      },
      required: ["task"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<JsonObject>(args, chidori, "/tasks", {
      method: "POST",
      body: args.task,
    });
  },
);

export const todoistUpdateTaskTool = defineTool<TodoistUpdateTaskArgs, JsonObject>(
  {
    name: "todoist_task_update",
    description: "Update a Todoist task by ID using caller-provided task fields.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        taskId: { type: "string" },
        task: { type: "object", additionalProperties: true },
      },
      required: ["taskId", "task"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<JsonObject>(args, chidori, `/tasks/${encodeURIComponent(args.taskId)}`, {
      method: "POST",
      body: args.task,
    });
  },
);

export const todoistCloseTaskTool = defineTool<TodoistTaskIdArgs, Json>(
  {
    name: "todoist_task_close",
    description: "Close or complete a Todoist task by ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        taskId: { type: "string" },
      },
      required: ["taskId"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<Json>(args, chidori, `/tasks/${encodeURIComponent(args.taskId)}/close`, {
      method: "POST",
    });
  },
);

export const todoistReopenTaskTool = defineTool<TodoistTaskIdArgs, Json>(
  {
    name: "todoist_task_reopen",
    description: "Reopen a Todoist task by ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        taskId: { type: "string" },
      },
      required: ["taskId"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<Json>(args, chidori, `/tasks/${encodeURIComponent(args.taskId)}/reopen`, {
      method: "POST",
    });
  },
);

export const todoistListCommentsTool = defineTool<TodoistListCommentsArgs, Json>(
  {
    name: "todoist_comments_list",
    description: "List Todoist comments by task ID or project ID.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        taskId: { type: "string" },
        projectId: { type: "string" },
      },
    },
  },
  async (args, chidori) => {
    return todoistRequest<Json>(args, chidori, "/comments", {
      query: {
        task_id: args.taskId,
        project_id: args.projectId,
      },
    });
  },
);

export const todoistCreateCommentTool = defineTool<TodoistCreateCommentArgs, JsonObject>(
  {
    name: "todoist_comment_create",
    description: "Create a Todoist comment using caller-provided comment fields.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Todoist API token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.todoist.com/rest/v2" },
        comment: { type: "object", additionalProperties: true },
      },
      required: ["comment"],
    },
  },
  async (args, chidori) => {
    return todoistRequest<JsonObject>(args, chidori, "/comments", {
      method: "POST",
      body: args.comment,
    });
  },
);

export const todoistTools = {
  listProjects: todoistListProjectsTool,
  listTasks: todoistListTasksTool,
  getTask: todoistGetTaskTool,
  createTask: todoistCreateTaskTool,
  updateTask: todoistUpdateTaskTool,
  closeTask: todoistCloseTaskTool,
  reopenTask: todoistReopenTaskTool,
  listComments: todoistListCommentsTool,
  createComment: todoistCreateCommentTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getTodoistEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "TODOIST_API_TOKEN", description: "Todoist API token." },
  ];
}

export const todoistIntegrationSpec = {
  environmentVariables: getTodoistEnvironmentVariables,
} satisfies IntegrationSpec;
