import {
  bearerAuth,
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface DropboxAuthArgs {
  accessToken?: SecretInput;
  baseUrl?: string;
  contentBaseUrl?: string;
}

export interface DropboxListFolderArgs extends DropboxAuthArgs {
  path: string;
  recursive?: boolean;
  includeDeleted?: boolean;
  includeHasExplicitSharedMembers?: boolean;
  includeMountedFolders?: boolean;
  limit?: number;
  cursor?: string;
}

export interface DropboxSearchFilesArgs extends DropboxAuthArgs {
  query: string;
  path?: string;
  maxResults?: number;
  fileStatus?: "active" | "deleted";
  filenameOnly?: boolean;
  fileExtensions?: string[];
  cursor?: string;
}

export interface DropboxPathArgs extends DropboxAuthArgs {
  path: string;
}

export interface DropboxCreateFolderArgs extends DropboxPathArgs {
  autorename?: boolean;
}

export interface DropboxUploadTextFileArgs extends DropboxPathArgs {
  content: string;
  mode?: "add" | "overwrite";
  autorename?: boolean;
  mute?: boolean;
  strictConflict?: boolean;
}

export interface DropboxMoveFileOrFolderArgs extends DropboxAuthArgs {
  fromPath: string;
  toPath: string;
  autorename?: boolean;
}

function dropboxBaseUrl(args: DropboxAuthArgs): string {
  return (args.baseUrl ?? "https://api.dropboxapi.com/2").replace(/\/+$/, "");
}

function dropboxContentBaseUrl(args: DropboxAuthArgs): string {
  return (args.contentBaseUrl ?? "https://content.dropboxapi.com/2").replace(/\/+$/, "");
}

async function dropboxHeaders(args: DropboxAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const accessToken = await resolveSecret(args.accessToken, chidori, "Dropbox access token");
  return jsonHeaders(bearerAuth(accessToken));
}

async function dropboxContentHeaders(
  args: DropboxAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  apiArg: JsonObject,
) {
  const accessToken = await resolveSecret(args.accessToken, chidori, "Dropbox access token");
  return {
    ...bearerAuth(accessToken),
    "content-type": "application/octet-stream",
    "Dropbox-API-Arg": JSON.stringify(apiArg),
  };
}

async function dropboxRequest<T extends JsonObject>(
  args: DropboxAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  body: JsonObject,
): Promise<T> {
  return requestJson<T>(chidori, `${dropboxBaseUrl(args)}${path}`, {
    method: "POST",
    headers: await dropboxHeaders(args, chidori),
    body,
  });
}

async function dropboxContentRequest<T extends JsonObject>(
  args: DropboxAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  apiArg: JsonObject,
  content: string,
): Promise<T> {
  const requestOptions: ChidoriHttpRequestOptions = {
    method: "POST",
    headers: await dropboxContentHeaders(args, chidori, apiArg),
    body: content,
  };
  return requestJson<T>(chidori, `${dropboxContentBaseUrl(args)}${path}`, requestOptions);
}

export const dropboxListFolderTool = defineTool<DropboxListFolderArgs, JsonObject>(
  {
    name: "dropbox_files_list_folder",
    description: "List Dropbox files and folders at a path, or continue with a list_folder cursor.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        path: { type: "string" },
        recursive: { type: "boolean" },
        includeDeleted: { type: "boolean" },
        includeHasExplicitSharedMembers: { type: "boolean" },
        includeMountedFolders: { type: "boolean" },
        limit: { type: "integer" },
        cursor: { type: "string" },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => {
    if (args.cursor) {
      return dropboxRequest(args, chidori, "/files/list_folder/continue", { cursor: args.cursor });
    }
    return dropboxRequest(args, chidori, "/files/list_folder", compactObject({
      path: args.path,
      recursive: args.recursive,
      include_deleted: args.includeDeleted,
      include_has_explicit_shared_members: args.includeHasExplicitSharedMembers,
      include_mounted_folders: args.includeMountedFolders,
      limit: args.limit,
    }) as JsonObject);
  },
);

export const dropboxSearchFilesTool = defineTool<DropboxSearchFilesArgs, JsonObject>(
  {
    name: "dropbox_files_search",
    description: "Search Dropbox files using search_v2.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        query: { type: "string" },
        path: { type: "string" },
        maxResults: { type: "integer" },
        fileStatus: { type: "string", enum: ["active", "deleted"] },
        filenameOnly: { type: "boolean" },
        fileExtensions: { type: "array", items: { type: "string" } },
        cursor: { type: "string" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    if (args.cursor) {
      return dropboxRequest(args, chidori, "/files/search/continue_v2", { cursor: args.cursor });
    }
    return dropboxRequest(args, chidori, "/files/search_v2", compactObject({
      query: args.query,
      options: compactObject({
        path: args.path,
        max_results: args.maxResults,
        file_status: args.fileStatus,
        filename_only: args.filenameOnly,
        file_extensions: args.fileExtensions,
      }) as JsonObject,
    }) as JsonObject);
  },
);

export const dropboxGetTemporaryLinkTool = defineTool<DropboxPathArgs, JsonObject>(
  {
    name: "dropbox_temporary_link_get",
    description: "Create a temporary Dropbox download link for a file path.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        path: { type: "string" },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => dropboxRequest(args, chidori, "/files/get_temporary_link", { path: args.path }),
);

export const dropboxCreateFolderTool = defineTool<DropboxCreateFolderArgs, JsonObject>(
  {
    name: "dropbox_folder_create",
    description: "Create a Dropbox folder.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        path: { type: "string" },
        autorename: { type: "boolean" },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => dropboxRequest(args, chidori, "/files/create_folder_v2", compactObject({
    path: args.path,
    autorename: args.autorename,
  }) as JsonObject),
);

export const dropboxUploadTextFileTool = defineTool<DropboxUploadTextFileArgs, JsonObject>(
  {
    name: "dropbox_file_upload_text",
    description: "Upload UTF-8 text content to a Dropbox file path.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        path: { type: "string" },
        content: { type: "string" },
        mode: { type: "string", enum: ["add", "overwrite"] },
        autorename: { type: "boolean" },
        mute: { type: "boolean" },
        strictConflict: { type: "boolean" },
      },
      required: ["path", "content"],
    },
  },
  async (args, chidori) => dropboxContentRequest(
    args,
    chidori,
    "/files/upload",
    compactObject({
      path: args.path,
      mode: args.mode ?? "add",
      autorename: args.autorename,
      mute: args.mute,
      strict_conflict: args.strictConflict,
    }) as JsonObject,
    args.content,
  ),
);

export const dropboxDeleteFileOrFolderTool = defineTool<DropboxPathArgs, JsonObject>(
  {
    name: "dropbox_file_or_folder_delete",
    description: "Delete a Dropbox file or folder path.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        path: { type: "string" },
      },
      required: ["path"],
    },
  },
  async (args, chidori) => dropboxRequest(args, chidori, "/files/delete_v2", { path: args.path }),
);

export const dropboxMoveFileOrFolderTool = defineTool<DropboxMoveFileOrFolderArgs, JsonObject>(
  {
    name: "dropbox_file_or_folder_move",
    description: "Move or rename a Dropbox file or folder.",
    parameters: {
      type: "object",
      properties: {
        accessToken: { description: "Dropbox OAuth access token or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.dropboxapi.com/2" },
        contentBaseUrl: { type: "string", default: "https://content.dropboxapi.com/2" },
        fromPath: { type: "string" },
        toPath: { type: "string" },
        autorename: { type: "boolean" },
      },
      required: ["fromPath", "toPath"],
    },
  },
  async (args, chidori) => dropboxRequest(args, chidori, "/files/move_v2", compactObject({
    from_path: args.fromPath,
    to_path: args.toPath,
    autorename: args.autorename,
  }) as JsonObject),
);

export const dropboxTools = {
  listFolder: dropboxListFolderTool,
  searchFiles: dropboxSearchFilesTool,
  getTemporaryLink: dropboxGetTemporaryLinkTool,
  createFolder: dropboxCreateFolderTool,
  uploadTextFile: dropboxUploadTextFileTool,
  deleteFileOrFolder: dropboxDeleteFileOrFolderTool,
  moveFileOrFolder: dropboxMoveFileOrFolderTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getDropboxEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "DROPBOX_ACCESS_TOKEN", description: "Dropbox OAuth access token." },
  ];
}

export const dropboxIntegrationSpec = {
  environmentVariables: getDropboxEnvironmentVariables,
} satisfies IntegrationSpec;
