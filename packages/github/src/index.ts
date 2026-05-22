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

export interface GitHubAuthArgs {
  token?: SecretInput;
  baseUrl?: string;
}

export interface GitHubRepoArgs extends GitHubAuthArgs {
  owner: string;
  repo: string;
}

export interface GitHubListRepoIssuesArgs extends GitHubRepoArgs {
  milestone?: string;
  state?: "open" | "closed" | "all";
  assignee?: string;
  creator?: string;
  mentioned?: string;
  labels?: string;
  sort?: "created" | "updated" | "comments";
  direction?: "asc" | "desc";
  since?: string;
  perPage?: number;
  page?: number;
}

export interface GitHubIssueArgs extends GitHubRepoArgs {
  issueNumber: number;
}

export interface GitHubCreateIssueArgs extends GitHubRepoArgs {
  title: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
  milestone?: number;
}

export interface GitHubSearchIssuesArgs extends GitHubAuthArgs {
  query: string;
  sort?: "comments" | "reactions" | "reactions-+1" | "reactions--1" | "reactions-smile" | "reactions-thinking_face" | "updated" | "created";
  order?: "asc" | "desc";
  perPage?: number;
}

export interface GitHubSearchCodeArgs extends GitHubAuthArgs {
  query: string;
  sort?: "indexed";
  order?: "asc" | "desc";
  perPage?: number;
}

export interface GitHubCreateIssueCommentArgs extends GitHubRepoArgs {
  issueNumber: number;
  body: string;
}

export interface GitHubListPullRequestsArgs extends GitHubRepoArgs {
  state?: "open" | "closed" | "all";
  head?: string;
  base?: string;
  sort?: "created" | "updated" | "popularity" | "long-running";
  direction?: "asc" | "desc";
  perPage?: number;
  page?: number;
}

export interface GitHubPullRequestArgs extends GitHubRepoArgs {
  pullNumber: number;
}

export interface GitHubCreatePullRequestArgs extends GitHubRepoArgs {
  title: string;
  head: string;
  base: string;
  body?: string;
  draft?: boolean;
  maintainerCanModify?: boolean;
}

export interface GitHubListBranchesArgs extends GitHubRepoArgs {
  protected?: boolean;
  perPage?: number;
  page?: number;
}

export interface GitHubCreateBranchArgs extends GitHubRepoArgs {
  branch: string;
  sha: string;
}

export interface GitHubContentArgs extends GitHubRepoArgs {
  path: string;
  ref?: string;
}

export interface GitHubCreateOrUpdateFileArgs extends GitHubRepoArgs {
  path: string;
  message: string;
  contentBase64: string;
  branch?: string;
  sha?: string;
  committer?: JsonObject;
  author?: JsonObject;
}

export interface GitHubDeleteFileArgs extends GitHubRepoArgs {
  path: string;
  message: string;
  sha: string;
  branch?: string;
  committer?: JsonObject;
  author?: JsonObject;
}

async function githubHeaders(args: GitHubAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
  };
  if (args.token) {
    return {
      ...headers,
      ...bearerAuth(await resolveSecret(args.token, chidori, "GitHub token")),
    };
  }
  return headers;
}

function githubBaseUrl(args: GitHubAuthArgs): string {
  return args.baseUrl ?? "https://api.github.com";
}

function repoUrl(args: GitHubRepoArgs, suffix = ""): string {
  return `${githubBaseUrl(args)}/repos/${encodeURIComponent(args.owner)}/${encodeURIComponent(args.repo)}${suffix}`;
}

function contentsPath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

export const githubGetRepoTool = defineTool<GitHubRepoArgs, JsonObject>(
  {
    name: "github_get_repo",
    description: "Fetch GitHub repository metadata.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      repoUrl(args),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubListRepoIssuesTool = defineTool<GitHubListRepoIssuesArgs, JsonObject>(
  {
    name: "github_repo_issues_list",
    description: "List issues and pull requests in a GitHub repository with GitHub issue filters.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
        milestone: { type: "string" },
        state: { type: "string", enum: ["open", "closed", "all"], default: "open" },
        assignee: { type: "string" },
        creator: { type: "string" },
        mentioned: { type: "string" },
        labels: { type: "string", description: "Comma-separated label names." },
        sort: { type: "string", enum: ["created", "updated", "comments"] },
        direction: { type: "string", enum: ["asc", "desc"] },
        since: { type: "string", description: "ISO 8601 timestamp." },
        perPage: { type: "integer", default: 30 },
        page: { type: "integer" },
      },
      required: ["owner", "repo"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(repoUrl(args, "/issues"), {
        milestone: args.milestone,
        state: args.state,
        assignee: args.assignee,
        creator: args.creator,
        mentioned: args.mentioned,
        labels: args.labels,
        sort: args.sort,
        direction: args.direction,
        since: args.since,
        per_page: args.perPage ?? 30,
        page: args.page,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubGetIssueTool = defineTool<GitHubIssueArgs, JsonObject>(
  {
    name: "github_issue_get",
    description: "Fetch a GitHub issue or pull request issue record.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        issueNumber: { type: "integer", description: "Issue or pull request number." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "issueNumber"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, `/issues/${args.issueNumber}`), {
      method: "GET",
      headers: await githubHeaders(args, chidori),
    });
  },
);

export const githubCreateIssueTool = defineTool<GitHubCreateIssueArgs, JsonObject>(
  {
    name: "github_issue_create",
    description: "Create a GitHub issue.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        title: { type: "string" },
        body: { type: "string" },
        assignees: { type: "array", items: { type: "string" } },
        labels: { type: "array", items: { type: "string" } },
        milestone: { type: "integer" },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "title"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, "/issues"), {
      method: "POST",
      headers: jsonHeaders(await githubHeaders(args, chidori)),
      body: compactObject({
        title: args.title,
        body: args.body,
        assignees: args.assignees,
        labels: args.labels,
        milestone: args.milestone,
      }) as JsonObject,
    });
  },
);

export const githubSearchIssuesTool = defineTool<GitHubSearchIssuesArgs, JsonObject>(
  {
    name: "github_search_issues",
    description: "Search GitHub issues and pull requests.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "GitHub issue search query." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
        sort: { type: "string", description: "GitHub issue search sort field." },
        order: { type: "string", enum: ["asc", "desc"] },
        perPage: { type: "integer", description: "Results per page.", default: 10 },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${githubBaseUrl(args)}/search/issues`, {
        q: args.query,
        sort: args.sort,
        order: args.order,
        per_page: args.perPage ?? 10,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubSearchCodeTool = defineTool<GitHubSearchCodeArgs, JsonObject>(
  {
    name: "github_search_code",
    description: "Search GitHub code.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "GitHub code search query." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
        sort: { type: "string", enum: ["indexed"] },
        order: { type: "string", enum: ["asc", "desc"] },
        perPage: { type: "integer", description: "Results per page.", default: 10 },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(`${githubBaseUrl(args)}/search/code`, {
        q: args.query,
        sort: args.sort,
        order: args.order,
        per_page: args.perPage ?? 10,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubCreateIssueCommentTool = defineTool<GitHubCreateIssueCommentArgs, JsonObject>(
  {
    name: "github_create_issue_comment",
    description: "Create a comment on a GitHub issue or pull request.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        issueNumber: { type: "integer", description: "Issue or pull request number." },
        body: { type: "string", description: "Markdown comment body." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "issueNumber", "body"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      repoUrl(args, `/issues/${args.issueNumber}/comments`),
      {
        method: "POST",
        headers: jsonHeaders(await githubHeaders(args, chidori)),
        body: compactObject({ body: args.body }) as JsonObject,
      },
    );
  },
);

export const githubListPullRequestsTool = defineTool<GitHubListPullRequestsArgs, JsonObject>(
  {
    name: "github_pull_requests_list",
    description: "List pull requests in a GitHub repository.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
        state: { type: "string", enum: ["open", "closed", "all"], default: "open" },
        head: { type: "string", description: "Filter by head user or organization and branch." },
        base: { type: "string", description: "Filter by base branch." },
        sort: { type: "string", enum: ["created", "updated", "popularity", "long-running"] },
        direction: { type: "string", enum: ["asc", "desc"] },
        perPage: { type: "integer", default: 30 },
        page: { type: "integer" },
      },
      required: ["owner", "repo"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(repoUrl(args, "/pulls"), {
        state: args.state,
        head: args.head,
        base: args.base,
        sort: args.sort,
        direction: args.direction,
        per_page: args.perPage ?? 30,
        page: args.page,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubGetPullRequestTool = defineTool<GitHubPullRequestArgs, JsonObject>(
  {
    name: "github_pull_request_get",
    description: "Fetch a GitHub pull request.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        pullNumber: { type: "integer", description: "Pull request number." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "pullNumber"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, `/pulls/${args.pullNumber}`), {
      method: "GET",
      headers: await githubHeaders(args, chidori),
    });
  },
);

export const githubCreatePullRequestTool = defineTool<GitHubCreatePullRequestArgs, JsonObject>(
  {
    name: "github_pull_request_create",
    description: "Create a GitHub pull request.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        title: { type: "string" },
        head: { type: "string", description: "The branch containing changes." },
        base: { type: "string", description: "The branch to merge into." },
        body: { type: "string" },
        draft: { type: "boolean" },
        maintainerCanModify: { type: "boolean" },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "title", "head", "base"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, "/pulls"), {
      method: "POST",
      headers: jsonHeaders(await githubHeaders(args, chidori)),
      body: compactObject({
        title: args.title,
        head: args.head,
        base: args.base,
        body: args.body,
        draft: args.draft,
        maintainer_can_modify: args.maintainerCanModify,
      }) as JsonObject,
    });
  },
);

export const githubListPullRequestFilesTool = defineTool<GitHubPullRequestArgs & { perPage?: number; page?: number }, JsonObject>(
  {
    name: "github_pull_request_files_list",
    description: "List files changed in a GitHub pull request.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        pullNumber: { type: "integer", description: "Pull request number." },
        perPage: { type: "integer", default: 30 },
        page: { type: "integer" },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "pullNumber"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(repoUrl(args, `/pulls/${args.pullNumber}/files`), {
        per_page: args.perPage ?? 30,
        page: args.page,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubListBranchesTool = defineTool<GitHubListBranchesArgs, JsonObject>(
  {
    name: "github_branches_list",
    description: "List branches in a GitHub repository.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        protected: { type: "boolean" },
        perPage: { type: "integer", default: 30 },
        page: { type: "integer" },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(repoUrl(args, "/branches"), {
        protected: args.protected,
        per_page: args.perPage ?? 30,
        page: args.page,
      }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubCreateBranchTool = defineTool<GitHubCreateBranchArgs, JsonObject>(
  {
    name: "github_branch_create",
    description: "Create a GitHub branch reference from a commit SHA.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        branch: { type: "string", description: "New branch name or refs/heads path." },
        sha: { type: "string", description: "Commit SHA for the new branch." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "branch", "sha"],
    },
  },
  async (args, chidori) => {
    const ref = args.branch.startsWith("refs/") ? args.branch : `refs/heads/${args.branch}`;
    return requestJson<JsonObject>(chidori, repoUrl(args, "/git/refs"), {
      method: "POST",
      headers: jsonHeaders(await githubHeaders(args, chidori)),
      body: { ref, sha: args.sha },
    });
  },
);

export const githubGetFileContentsTool = defineTool<GitHubContentArgs, JsonObject>(
  {
    name: "github_file_contents_get",
    description: "Get repository file or directory contents from GitHub.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        path: { type: "string", description: "Repository file or directory path." },
        ref: { type: "string", description: "Branch, tag, or commit SHA." },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "path"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      withQuery(repoUrl(args, `/contents/${contentsPath(args.path)}`), { ref: args.ref }),
      {
        method: "GET",
        headers: await githubHeaders(args, chidori),
      },
    );
  },
);

export const githubCreateOrUpdateFileTool = defineTool<GitHubCreateOrUpdateFileArgs, JsonObject>(
  {
    name: "github_file_create_or_update",
    description: "Create or update a Base64-encoded file in a GitHub repository.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        path: { type: "string", description: "Repository file path." },
        message: { type: "string", description: "Commit message." },
        contentBase64: { type: "string", description: "Base64-encoded file content." },
        branch: { type: "string" },
        sha: { type: "string", description: "Current blob SHA when updating an existing file." },
        committer: { type: "object", additionalProperties: true },
        author: { type: "object", additionalProperties: true },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "path", "message", "contentBase64"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, `/contents/${contentsPath(args.path)}`), {
      method: "PUT",
      headers: jsonHeaders(await githubHeaders(args, chidori)),
      body: compactObject({
        message: args.message,
        content: args.contentBase64,
        branch: args.branch,
        sha: args.sha,
        committer: args.committer,
        author: args.author,
      }) as JsonObject,
    });
  },
);

export const githubDeleteFileTool = defineTool<GitHubDeleteFileArgs, JsonObject>(
  {
    name: "github_file_delete",
    description: "Delete a file from a GitHub repository.",
    parameters: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner." },
        repo: { type: "string", description: "Repository name." },
        path: { type: "string", description: "Repository file path." },
        message: { type: "string", description: "Commit message." },
        sha: { type: "string", description: "Current blob SHA." },
        branch: { type: "string" },
        committer: { type: "object", additionalProperties: true },
        author: { type: "object", additionalProperties: true },
        token: { description: "GitHub token or Chidori memory secret reference." },
        baseUrl: { type: "string", description: "GitHub-compatible API base URL." },
      },
      required: ["owner", "repo", "path", "message", "sha"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, repoUrl(args, `/contents/${contentsPath(args.path)}`), {
      method: "DELETE",
      headers: jsonHeaders(await githubHeaders(args, chidori)),
      body: compactObject({
        message: args.message,
        sha: args.sha,
        branch: args.branch,
        committer: args.committer,
        author: args.author,
      }) as JsonObject,
    });
  },
);

export const githubTools = {
  getRepo: githubGetRepoTool,
  listRepoIssues: githubListRepoIssuesTool,
  getIssue: githubGetIssueTool,
  createIssue: githubCreateIssueTool,
  searchIssues: githubSearchIssuesTool,
  searchCode: githubSearchCodeTool,
  createIssueComment: githubCreateIssueCommentTool,
  listPullRequests: githubListPullRequestsTool,
  getPullRequest: githubGetPullRequestTool,
  createPullRequest: githubCreatePullRequestTool,
  listPullRequestFiles: githubListPullRequestFilesTool,
  listBranches: githubListBranchesTool,
  createBranch: githubCreateBranchTool,
  getFileContents: githubGetFileContentsTool,
  createOrUpdateFile: githubCreateOrUpdateFileTool,
  deleteFile: githubDeleteFileTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getGitHubEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "GITHUB_TOKEN", description: "GitHub token." },
  ];
}

export const githubIntegrationSpec = {
  environmentVariables: getGitHubEnvironmentVariables,
} satisfies IntegrationSpec;
