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

export interface GitLabAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface GitLabProjectArgs extends GitLabAuthArgs {
  projectId: string | number;
}

export interface GitLabSearchArgs extends GitLabAuthArgs {
  search: string;
  scope: "projects" | "issues" | "merge_requests" | "blobs" | "commits" | "users";
  projectId?: string | number;
  groupId?: string | number;
  page?: number;
  perPage?: number;
}

export interface GitLabListProjectIssuesArgs extends GitLabProjectArgs {
  state?: "opened" | "closed" | "all";
  labels?: string;
  search?: string;
  authorId?: number;
  assigneeId?: number;
  page?: number;
  perPage?: number;
}

export interface GitLabCreateIssueArgs extends GitLabProjectArgs {
  title: string;
  description?: string;
  labels?: string;
  assigneeIds?: number[];
  confidential?: boolean;
  dueDate?: string;
}

export interface GitLabListMergeRequestsArgs extends GitLabProjectArgs {
  state?: "opened" | "closed" | "locked" | "merged" | "all";
  sourceBranch?: string;
  targetBranch?: string;
  search?: string;
  view?: "simple";
  page?: number;
  perPage?: number;
}

export interface GitLabCreateMergeRequestArgs extends GitLabProjectArgs {
  sourceBranch: string;
  targetBranch: string;
  title: string;
  description?: string;
  removeSourceBranch?: boolean;
  squash?: boolean;
  allowCollaboration?: boolean;
  draft?: boolean;
  labels?: string;
  assigneeIds?: number[];
  reviewerIds?: number[];
  milestoneId?: number;
}

export interface GitLabCreateNoteArgs extends GitLabProjectArgs {
  noteableType: "issue" | "merge_request";
  noteableIid: number;
  body: string;
  internal?: boolean;
  confidential?: boolean;
  createdAt?: string;
}

export interface GitLabCreateBranchArgs extends GitLabProjectArgs {
  branch: string;
  ref: string;
}

export interface GitLabGetRepositoryFileArgs extends GitLabProjectArgs {
  filePath: string;
  ref: string;
}

export interface GitLabRepositoryFileWriteArgs extends GitLabProjectArgs {
  filePath: string;
  branch: string;
  commitMessage: string;
  content: string;
  authorEmail?: string;
  authorName?: string;
  encoding?: "text" | "base64";
  executeFilemode?: boolean;
  startBranch?: string;
  lastCommitId?: string;
}

function gitlabBaseUrl(args: GitLabAuthArgs): string {
  return (args.baseUrl ?? "https://gitlab.com/api/v4").replace(/\/+$/, "");
}

function encodePathSegment(value: string | number): string {
  return encodeURIComponent(String(value));
}

async function gitlabHeaders(args: GitLabAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (args.token) {
    headers["PRIVATE-TOKEN"] = await resolveSecret(args.token, chidori, "GitLab token");
  }
  return headers;
}

export const gitlabSearchTool = defineTool<GitLabSearchArgs, JsonObject>(
  {
    name: "gitlab_search",
    description: "Search a GitLab instance, group, or project.",
    parameters: {
      type: "object",
      properties: {
        search: { type: "string" },
        scope: { type: "string", enum: ["projects", "issues", "merge_requests", "blobs", "commits", "users"] },
        projectId: { description: "Optional project ID or URL-encoded path to search within." },
        groupId: { description: "Optional group ID or path to search within." },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
        page: { type: "integer" },
        perPage: { type: "integer", default: 20 },
      },
      required: ["search", "scope"],
    },
  },
  async (args, chidori) => {
    const scopePath = args.projectId !== undefined
      ? `/projects/${encodePathSegment(args.projectId)}/search`
      : args.groupId !== undefined
        ? `/groups/${encodePathSegment(args.groupId)}/search`
        : "/search";
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${gitlabBaseUrl(args)}${scopePath}`, {
        scope: args.scope,
        search: args.search,
        page: args.page,
        per_page: args.perPage ?? 20,
      }),
      {
        method: "GET",
        headers: await gitlabHeaders(args, chidori),
      },
    );
  },
);

export const gitlabListProjectIssuesTool = defineTool<GitLabListProjectIssuesArgs, JsonObject>(
  {
    name: "gitlab_project_issues_list",
    description: "List issues in a GitLab project.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
        state: { type: "string", enum: ["opened", "closed", "all"] },
        labels: { type: "string" },
        search: { type: "string" },
        authorId: { type: "integer" },
        assigneeId: { type: "integer" },
        page: { type: "integer" },
        perPage: { type: "integer", default: 20 },
      },
      required: ["projectId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/issues`, {
        state: args.state,
        labels: args.labels,
        search: args.search,
        author_id: args.authorId,
        assignee_id: args.assigneeId,
        page: args.page,
        per_page: args.perPage ?? 20,
      }),
      {
        method: "GET",
        headers: await gitlabHeaders(args, chidori),
      },
    );
  },
);

export const gitlabCreateIssueTool = defineTool<GitLabCreateIssueArgs, JsonObject>(
  {
    name: "gitlab_issue_create",
    description: "Create a GitLab project issue.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        title: { type: "string" },
        description: { type: "string" },
        labels: { type: "string" },
        assigneeIds: { type: "array", items: { type: "integer" } },
        confidential: { type: "boolean" },
        dueDate: { type: "string" },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
      },
      required: ["projectId", "title"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/issues`,
      {
        method: "POST",
        headers: jsonHeaders(await gitlabHeaders(args, chidori)),
        body: compactObject({
          title: args.title,
          description: args.description,
          labels: args.labels,
          assignee_ids: args.assigneeIds,
          confidential: args.confidential,
          due_date: args.dueDate,
        }) as JsonObject,
      },
    );
  },
);

export const gitlabListMergeRequestsTool = defineTool<GitLabListMergeRequestsArgs, JsonObject>(
  {
    name: "gitlab_project_merge_requests_list",
    description: "List merge requests in a GitLab project.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
        state: { type: "string", enum: ["opened", "closed", "locked", "merged", "all"] },
        sourceBranch: { type: "string" },
        targetBranch: { type: "string" },
        search: { type: "string" },
        view: { type: "string", enum: ["simple"] },
        page: { type: "integer" },
        perPage: { type: "integer", default: 20 },
      },
      required: ["projectId"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/merge_requests`, {
        state: args.state,
        source_branch: args.sourceBranch,
        target_branch: args.targetBranch,
        search: args.search,
        view: args.view,
        page: args.page,
        per_page: args.perPage ?? 20,
      }),
      {
        method: "GET",
        headers: await gitlabHeaders(args, chidori),
      },
    );
  },
);

export const gitlabCreateMergeRequestTool = defineTool<GitLabCreateMergeRequestArgs, JsonObject>(
  {
    name: "gitlab_merge_request_create",
    description: "Create a GitLab project merge request.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        sourceBranch: { type: "string" },
        targetBranch: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        removeSourceBranch: { type: "boolean" },
        squash: { type: "boolean" },
        allowCollaboration: { type: "boolean" },
        draft: { type: "boolean" },
        labels: { type: "string" },
        assigneeIds: { type: "array", items: { type: "integer" } },
        reviewerIds: { type: "array", items: { type: "integer" } },
        milestoneId: { type: "integer" },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
      },
      required: ["projectId", "sourceBranch", "targetBranch", "title"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/merge_requests`,
      {
        method: "POST",
        headers: jsonHeaders(await gitlabHeaders(args, chidori)),
        body: compactObject({
          source_branch: args.sourceBranch,
          target_branch: args.targetBranch,
          title: args.title,
          description: args.description,
          remove_source_branch: args.removeSourceBranch,
          squash: args.squash,
          allow_collaboration: args.allowCollaboration,
          draft: args.draft,
          labels: args.labels,
          assignee_ids: args.assigneeIds,
          reviewer_ids: args.reviewerIds,
          milestone_id: args.milestoneId,
        }) as JsonObject,
      },
    );
  },
);

export const gitlabCreateNoteTool = defineTool<GitLabCreateNoteArgs, JsonObject>(
  {
    name: "gitlab_note_create",
    description: "Create a GitLab issue or merge request note.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        noteableType: { type: "string", enum: ["issue", "merge_request"] },
        noteableIid: { type: "integer" },
        body: { type: "string" },
        internal: { type: "boolean" },
        confidential: { type: "boolean" },
        createdAt: { type: "string" },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
      },
      required: ["projectId", "noteableType", "noteableIid", "body"],
    },
  },
  async (args, chidori) => {
    const noteablePath = args.noteableType === "issue" ? "issues" : "merge_requests";
    return requestJson<JsonObject>(
      chidori,
      `${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/${noteablePath}/${args.noteableIid}/notes`,
      {
        method: "POST",
        headers: jsonHeaders(await gitlabHeaders(args, chidori)),
        body: compactObject({
          body: args.body,
          internal: args.internal,
          confidential: args.confidential,
          created_at: args.createdAt,
        }) as JsonObject,
      },
    );
  },
);

export const gitlabCreateBranchTool = defineTool<GitLabCreateBranchArgs, JsonObject>(
  {
    name: "gitlab_branch_create",
    description: "Create a GitLab repository branch from an existing ref.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        branch: { type: "string" },
        ref: { type: "string", description: "Branch name or commit SHA to create the branch from." },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
      },
      required: ["projectId", "branch", "ref"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/repository/branches`, {
        branch: args.branch,
        ref: args.ref,
      }),
      {
        method: "POST",
        headers: await gitlabHeaders(args, chidori),
      },
    );
  },
);

export const gitlabGetRepositoryFileTool = defineTool<GitLabGetRepositoryFileArgs, JsonObject>(
  {
    name: "gitlab_repository_file_get",
    description: "Fetch GitLab repository file metadata and base64 content.",
    parameters: {
      type: "object",
      properties: {
        projectId: { description: "Project ID or URL-encoded path." },
        filePath: { type: "string", description: "Repository file path." },
        ref: { type: "string", description: "Branch, tag, or commit SHA." },
        token: { description: "GitLab token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://gitlab.com/api/v4" },
      },
      required: ["projectId", "filePath", "ref"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(
        `${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/repository/files/${encodeURIComponent(args.filePath)}`,
        { ref: args.ref },
      ),
      {
        method: "GET",
        headers: await gitlabHeaders(args, chidori),
      },
    );
  },
);

const repositoryFileWriteParameters = {
  type: "object" as const,
  properties: {
    projectId: { description: "Project ID or URL-encoded path." },
    filePath: { type: "string" as const, description: "Repository file path." },
    branch: { type: "string" as const },
    commitMessage: { type: "string" as const },
    content: { type: "string" as const },
    authorEmail: { type: "string" as const },
    authorName: { type: "string" as const },
    encoding: { type: "string" as const, enum: ["text", "base64"] },
    executeFilemode: { type: "boolean" as const },
    startBranch: { type: "string" as const },
    lastCommitId: { type: "string" as const },
    token: { description: "GitLab token or Chidori memory secret reference." },
    baseUrl: { type: "string" as const, default: "https://gitlab.com/api/v4" },
  },
  required: ["projectId", "filePath", "branch", "commitMessage", "content"],
};

async function writeRepositoryFile(
  method: "POST" | "PUT",
  args: GitLabRepositoryFileWriteArgs,
  chidori: Parameters<typeof resolveSecret>[1],
): Promise<JsonObject> {
  return requestJson<JsonObject>(
    chidori,
    `${gitlabBaseUrl(args)}/projects/${encodePathSegment(args.projectId)}/repository/files/${encodeURIComponent(args.filePath)}`,
    {
      method,
      headers: jsonHeaders(await gitlabHeaders(args, chidori)),
      body: compactObject({
        branch: args.branch,
        commit_message: args.commitMessage,
        content: args.content,
        author_email: args.authorEmail,
        author_name: args.authorName,
        encoding: args.encoding === "text" ? undefined : args.encoding,
        execute_filemode: args.executeFilemode,
        start_branch: args.startBranch,
        last_commit_id: args.lastCommitId,
      }) as JsonObject,
    },
  );
}

export const gitlabCreateRepositoryFileTool = defineTool<GitLabRepositoryFileWriteArgs, JsonObject>(
  {
    name: "gitlab_repository_file_create",
    description: "Create a file in a GitLab repository.",
    parameters: repositoryFileWriteParameters,
  },
  async (args, chidori) => writeRepositoryFile("POST", args, chidori),
);

export const gitlabUpdateRepositoryFileTool = defineTool<GitLabRepositoryFileWriteArgs, JsonObject>(
  {
    name: "gitlab_repository_file_update",
    description: "Update a file in a GitLab repository.",
    parameters: repositoryFileWriteParameters,
  },
  async (args, chidori) => writeRepositoryFile("PUT", args, chidori),
);

export const gitlabTools = {
  search: gitlabSearchTool,
  listProjectIssues: gitlabListProjectIssuesTool,
  createIssue: gitlabCreateIssueTool,
  listMergeRequests: gitlabListMergeRequestsTool,
  createMergeRequest: gitlabCreateMergeRequestTool,
  createNote: gitlabCreateNoteTool,
  createBranch: gitlabCreateBranchTool,
  getRepositoryFile: gitlabGetRepositoryFileTool,
  createRepositoryFile: gitlabCreateRepositoryFileTool,
  updateRepositoryFile: gitlabUpdateRepositoryFileTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getGitLabEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "GITLAB_TOKEN", description: "GitLab token." },
  ];
}

export const gitlabIntegrationSpec = {
  environmentVariables: getGitLabEnvironmentVariables,
} satisfies IntegrationSpec;
