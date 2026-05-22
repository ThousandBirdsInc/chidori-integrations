import {
  compactObject,
  defineTool,
  type JsonObject,
} from "@chidori/integrations-core";

export type ChidoriDocument = JsonObject & {
  pageContent: string;
  metadata?: JsonObject;
};

export interface TextSplitterOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  separators?: string[];
  keepSeparator?: boolean;
}

export interface TextSplitDocumentsArgs extends TextSplitterOptions {
  documents: ChidoriDocument[];
}

export interface HtmlToTextOptions {
  includeTitle?: boolean;
  preserveLinks?: boolean;
}

export interface HtmlToTextDocumentsArgs extends HtmlToTextOptions {
  documents: ChidoriDocument[];
  metadata?: JsonObject;
}

export interface HtmlReadabilityOptions extends HtmlToTextOptions {
  minTextLength?: number;
}

export interface HtmlReadabilityDocumentsArgs extends HtmlReadabilityOptions {
  documents: ChidoriDocument[];
  metadata?: JsonObject;
}

const defaultSeparators = ["\n\n", "\n", ". ", " ", ""];

export function splitText(text: string, options: TextSplitterOptions = {}): string[] {
  const chunkSize = options.chunkSize ?? 1000;
  const chunkOverlap = options.chunkOverlap ?? 200;
  const separators = options.separators ?? defaultSeparators;

  if (chunkSize <= 0) {
    throw new Error("chunkSize must be greater than zero");
  }
  if (chunkOverlap < 0 || chunkOverlap >= chunkSize) {
    throw new Error("chunkOverlap must be non-negative and smaller than chunkSize");
  }

  const chunks: string[] = [];
  for (const piece of recursivelySplit(text, chunkSize, separators, options.keepSeparator ?? false)) {
    appendMergedChunk(chunks, piece, chunkSize, chunkOverlap);
  }
  return chunks.filter((chunk) => chunk.trim().length > 0);
}

export function splitDocuments(documents: ChidoriDocument[], options: TextSplitterOptions = {}): ChidoriDocument[] {
  const out: ChidoriDocument[] = [];
  for (const document of documents) {
    const chunks = splitText(document.pageContent, options);
    chunks.forEach((pageContent, index) => {
      out.push({
        pageContent,
        metadata: compactObject({
          ...(document.metadata ?? {}),
          chunk: index,
          chunkCount: chunks.length,
        }) as JsonObject,
      });
    });
  }
  return out;
}

export function htmlToText(html: string, options: HtmlToTextOptions = {}): string {
  const title = htmlTitle(html);
  const body = htmlBody(html);
  const withoutNoise = stripHtmlNoise(body);
  const linkExpanded = options.preserveLinks ? expandHtmlLinks(withoutNoise) : withoutNoise;
  const text = decodeHtml(
    linkExpanded
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|section|article|header|footer|main|aside|li|tr|h[1-6]|blockquote)>/gi, "\n")
      .replace(/<li\b[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\r/g, "")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return options.includeTitle && title ? `${title}\n\n${text}`.trim() : text;
}

export function transformHtmlToTextDocuments(
  documents: ChidoriDocument[],
  options: HtmlToTextOptions & { metadata?: JsonObject } = {},
): ChidoriDocument[] {
  return documents.map((document) => ({
    pageContent: htmlToText(document.pageContent, options),
    metadata: compactObject({
      ...(document.metadata ?? {}),
      ...(options.metadata ?? {}),
      transformer: "html_to_text",
    }) as JsonObject,
  }));
}

export function transformHtmlReadabilityDocuments(
  documents: ChidoriDocument[],
  options: HtmlReadabilityOptions & { metadata?: JsonObject } = {},
): ChidoriDocument[] {
  return documents.map((document) => {
    const readable = extractReadableHtml(document.pageContent, options);
    return {
      pageContent: readable.text,
      metadata: compactObject({
        ...(document.metadata ?? {}),
        ...(options.metadata ?? {}),
        transformer: "html_readability",
        title: readable.title,
        selector: readable.selector,
      }) as JsonObject,
    };
  });
}

function recursivelySplit(text: string, chunkSize: number, separators: string[], keepSeparator: boolean): string[] {
  if (text.length <= chunkSize) {
    return [text];
  }

  const separator = separators.find((candidate) => candidate === "" || text.includes(candidate)) ?? "";
  if (separator === "") {
    const chunks: string[] = [];
    for (let index = 0; index < text.length; index += chunkSize) {
      chunks.push(text.slice(index, index + chunkSize));
    }
    return chunks;
  }

  const parts = text.split(separator).map((part, index) => {
    if (!keepSeparator || index === 0) {
      return part;
    }
    return `${separator}${part}`;
  });
  const nextSeparators = separators.slice(separators.indexOf(separator) + 1);
  return parts.flatMap((part) => recursivelySplit(part, chunkSize, nextSeparators, keepSeparator));
}

function appendMergedChunk(chunks: string[], piece: string, chunkSize: number, chunkOverlap: number): void {
  const last = chunks[chunks.length - 1];
  if (last === undefined || last.length + piece.length > chunkSize) {
    const prefix = last && chunkOverlap > 0 ? last.slice(Math.max(0, last.length - chunkOverlap)) : "";
    chunks.push(`${prefix}${piece}`);
    return;
  }
  chunks[chunks.length - 1] = `${last}${piece}`;
}

function extractReadableHtml(html: string, options: HtmlReadabilityOptions): { text: string; title: string | undefined; selector: string } {
  const title = htmlTitle(html);
  const candidates = readableHtmlCandidates(html);
  const minTextLength = options.minTextLength ?? 80;
  const scored = candidates
    .map((candidate) => ({
      ...candidate,
      text: htmlToText(candidate.html, { ...options, includeTitle: false }),
    }))
    .filter((candidate) => candidate.text.length >= minTextLength);
  const selected = scored
    .filter((candidate) => candidate.selector !== "body")
    .sort((a, b) => b.text.length - a.text.length)[0]
    ?? scored.sort((a, b) => b.text.length - a.text.length)[0];
  if (selected) {
    return {
      text: options.includeTitle && title ? `${title}\n\n${selected.text}` : selected.text,
      title,
      selector: selected.selector,
    };
  }
  return {
    text: htmlToText(html, options),
    title,
    selector: "body",
  };
}

function readableHtmlCandidates(html: string): Array<{ selector: string; html: string }> {
  const candidates: Array<{ selector: string; html: string }> = [];
  const body = htmlBody(html);
  for (const tag of ["article", "main"]) {
    for (const block of extractTagBlocks(body, tag)) {
      candidates.push({ selector: tag, html: block });
    }
  }
  const semanticBlockPattern = /<(section|div)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = semanticBlockPattern.exec(body)) !== null) {
    const tag = match[1] ?? "div";
    const attrs = match[2] ?? "";
    const content = match[3] ?? "";
    if (/\b(article|content|entry|main|post|story)\b/i.test(attrs)) {
      candidates.push({ selector: `${tag}[semantic]`, html: content });
    }
  }
  candidates.push({ selector: "body", html: body });
  return candidates;
}

function extractTagBlocks(html: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const blocks: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    blocks.push(match[1] ?? "");
  }
  return blocks;
}

function htmlTitle(html: string): string | undefined {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return title ? decodeHtml(title.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() : undefined;
}

function htmlBody(html: string): string {
  return html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
}

function stripHtmlNoise(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ");
}

function expandHtmlLinks(html: string): string {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs: string, label: string) => {
    const href = htmlAttribute(attrs, "href");
    const text = htmlToText(label);
    return href && text && href !== text ? `${text} (${href})` : text || full;
  });
}

function htmlAttribute(attrs: string, name: string): string | undefined {
  const pattern = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i");
  const value = attrs.match(pattern)?.[1];
  return value ? decodeHtml(value).trim() : undefined;
}

function decodeHtml(input: string): string {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\"",
  };
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, value: string) => {
    if (value.startsWith("#x") || value.startsWith("#X")) {
      return String.fromCodePoint(Number.parseInt(value.slice(2), 16));
    }
    if (value.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(value.slice(1), 10));
    }
    return named[value.toLowerCase()] ?? entity;
  });
}

export const textSplitDocumentsTool = defineTool<TextSplitDocumentsArgs, { documents: ChidoriDocument[] }>(
  {
    name: "text_split_documents",
    description: "Split documents into overlapping text chunks.",
    parameters: {
      type: "object",
      properties: {
        documents: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Documents with pageContent and optional metadata.",
        },
        chunkSize: { type: "integer", default: 1000 },
        chunkOverlap: { type: "integer", default: 200 },
        separators: { type: "array", items: { type: "string" } },
        keepSeparator: { type: "boolean" },
      },
      required: ["documents"],
    },
  },
  async (args) => {
    return {
      documents: splitDocuments(args.documents, args),
    };
  },
);

export const htmlToTextDocumentsTool = defineTool<HtmlToTextDocumentsArgs, { documents: ChidoriDocument[] }>(
  {
    name: "html_to_text_documents",
    description: "Strip HTML tags and normalize documents to readable plain text.",
    parameters: {
      type: "object",
      properties: {
        documents: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Documents whose pageContent contains HTML.",
        },
        includeTitle: { type: "boolean", default: false },
        preserveLinks: { type: "boolean", default: false },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["documents"],
    },
  },
  async (args) => {
    return {
      documents: transformHtmlToTextDocuments(args.documents, args),
    };
  },
);

export const htmlReadabilityDocumentsTool = defineTool<HtmlReadabilityDocumentsArgs, { documents: ChidoriDocument[] }>(
  {
    name: "html_readability_documents",
    description: "Extract likely main readable content from HTML documents and normalize it to text.",
    parameters: {
      type: "object",
      properties: {
        documents: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Documents whose pageContent contains HTML.",
        },
        includeTitle: { type: "boolean", default: false },
        preserveLinks: { type: "boolean", default: false },
        minTextLength: { type: "integer", default: 80 },
        metadata: { type: "object", additionalProperties: true },
      },
      required: ["documents"],
    },
  },
  async (args) => {
    return {
      documents: transformHtmlReadabilityDocuments(args.documents, args),
    };
  },
);

export const textTools = {
  splitDocuments: textSplitDocumentsTool,
  htmlToTextDocuments: htmlToTextDocumentsTool,
  htmlReadabilityDocuments: htmlReadabilityDocumentsTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getTextEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
  ];
}

export const textIntegrationSpec = {
  environmentVariables: getTextEnvironmentVariables,
} satisfies IntegrationSpec;
