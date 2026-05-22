# Chidori Integrations

TypeScript integration packages for Chidori agents. The packages expose small, Chidori-native helpers and tool definitions that can be used from agent projects or copied/bundled into the Chidori TypeScript runtime.

Chidori agents currently have the most reliable support for relative TypeScript imports. These packages are normal ESM npm packages, but their agent-facing code is intentionally dependency-light and uses `chidori.http`, `chidori.tool`, and JSON-compatible data structures instead of Node-only SDKs.

Every provider package exports a package-level integration spec with an `environmentVariables()` method, plus a `get<Integration>EnvironmentVariables()` helper, so host applications can discover which environment variables may be needed before running a tool.

## Packages

| Package | Status | Scope |
| --- | --- | --- |
| `@chidori/integrations-core` | alpha | Shared Chidori tool/runtime types and HTTP helpers |
| `@chidori/integrations-openai` | alpha | OpenAI Responses, embeddings, and image generation tools |
| `@chidori/integrations-anthropic` | alpha | Anthropic Messages API tool |
| `@chidori/integrations-google` | alpha | Google Gemini, Vertex AI, Places, Routes, YouTube, Cloud Text-to-Speech, Calendar, and Gmail tools |
| `@chidori/integrations-microsoft` | alpha | Microsoft Graph tools for Outlook mail, calendar events, drive children, and generic Graph requests |
| `@chidori/integrations-aws` | alpha | AWS Bedrock, Bedrock Knowledge Bases, Amazon Kendra, Step Functions, SageMaker Runtime, and Lambda tools for signed or proxied requests |
| `@chidori/integrations-azure` | alpha | Azure OpenAI chat completions, embeddings, and Dynamic Sessions tools |
| `@chidori/integrations-cloudflare` | alpha | Cloudflare Workers AI and AI Gateway tools |
| `@chidori/integrations-aleph-alpha` | alpha | Aleph Alpha / Pharia completion, chat, and embeddings tools |
| `@chidori/integrations-ai21` | alpha | AI21 Jamba chat completions tool |
| `@chidori/integrations-baidu` | alpha | Baidu Qianfan chat completions and embeddings tools |
| `@chidori/integrations-cohere` | alpha | Cohere chat, embeddings, and rerank tools |
| `@chidori/integrations-contextual` | alpha | Contextual AI instruction-following rerank tool |
| `@chidori/integrations-ibm` | alpha | IBM watsonx.ai chat and embeddings tools |
| `@chidori/integrations-jina` | alpha | Jina embeddings and rerank tools |
| `@chidori/integrations-mixedbread` | alpha | Mixedbread AI rerank tool |
| `@chidori/integrations-nomic` | alpha | Nomic Atlas text embedding tools |
| `@chidori/integrations-voyage` | alpha | Voyage AI embeddings and rerank tools |
| `@chidori/integrations-mistral` | alpha | Mistral chat completions and embeddings tools |
| `@chidori/integrations-groq` | alpha | Groq OpenAI-compatible chat completions tool |
| `@chidori/integrations-openrouter` | alpha | OpenRouter chat completions tool |
| `@chidori/integrations-openai-compatible` | alpha | xAI, Fireworks chat/completions/embeddings, Together, Perplexity, DeepSeek, Hugging Face chat and embeddings, DeepInfra, ZhipuAI, Moonshot AI, DashScope, Tencent Hunyuan chat and embeddings, ByteDance Volcengine/Doubao, MiniMax chat and embeddings, Novita AI, Friendli, SambaNova, PremAI chat and embeddings, Upstage Solar chat and embeddings, GitHub Models, Cerebras, and NVIDIA NIM chat, completion, embedding, rerank, and responses tools |
| `@chidori/integrations-writer` | alpha | Writer AI Studio chat completion tool |
| `@chidori/integrations-yandex` | alpha | Yandex Cloud AI Studio Foundation Models completion and embeddings tools |
| `@chidori/integrations-replicate` | alpha | Replicate prediction creation, polling, and cancellation tools |
| `@chidori/integrations-ollama` | alpha | Local Ollama chat, generate, and embeddings tools |
| `@chidori/integrations-browser` | alpha | Browserbase session, fetch, search, live debug, logs, and recording tools |
| `@chidori/integrations-composio` | alpha | Composio tool discovery, execution, and proxy execution tools |
| `@chidori/integrations-finance` | alpha | Alpha Vantage, Polygon.io, and Google Finance exchange rate, market data, news, financials, and market mover tools |
| `@chidori/integrations-web` | alpha | Tavily, Exa, Firecrawl, Brave Search, Bing Web Search, Perplexity Search, Mojeek Search, Parallel Search/Extract, Nimble Search, Google Custom Search, Google Serper, Jina Search, Linkup Search, Google Scholar, Google Trends, Google Jobs, arXiv, Semantic Scholar, PubMed, OpenWeatherMap, NASA, TMDB, SerpApi, SearchApi, DuckDuckGo, Wikipedia, StackExchange, WolframAlpha, SearXNG, You.com, DataForSEO, Dappier, Valyu, and Decodo tools |
| `@chidori/integrations-github` | alpha | GitHub REST tools for repositories, issues, pull requests, branches, files, and code search |
| `@chidori/integrations-gitlab` | alpha | GitLab REST tools for search, issues, merge requests, notes, branches, and repository files |
| `@chidori/integrations-salesforce` | alpha | Salesforce REST tools for SOQL, sObject metadata, and sObject record CRUD |
| `@chidori/integrations-servicenow` | alpha | ServiceNow Table API tools for generic table record CRUD and encoded queries |
| `@chidori/integrations-jira` | alpha | Jira REST tools for JQL search, issues, comments, and transitions |
| `@chidori/integrations-confluence` | alpha | Confluence REST tools for listing, reading, creating, and updating pages |
| `@chidori/integrations-notion` | alpha | Notion REST tools for search, pages, and block children |
| `@chidori/integrations-shopify` | alpha | Shopify Admin GraphQL and REST tools for products, orders, and customers |
| `@chidori/integrations-slack` | alpha | Slack Web API tools for conversations, messages, scheduling, users, and search |
| `@chidori/integrations-stripe` | alpha | Stripe REST tools for customers, resource lists, PaymentIntents, and Checkout Sessions |
| `@chidori/integrations-discord` | alpha | Discord REST tools for guilds, channels, reading messages, and posting |
| `@chidori/integrations-dropbox` | alpha | Dropbox API tools for file listing, search, links, folders, text upload, move, and delete |
| `@chidori/integrations-trello` | alpha | Trello REST tools for boards, lists, cards, and card comments |
| `@chidori/integrations-todoist` | alpha | Todoist REST tools for projects, tasks, completion state, and comments |
| `@chidori/integrations-linear` | alpha | Linear GraphQL tools for teams, issues, and comments |
| `@chidori/integrations-monday` | alpha | monday.com GraphQL tools for boards, items, column values, and updates |
| `@chidori/integrations-pagerduty` | alpha | PagerDuty REST and Events API tools for incidents, services, users, notes, and events |
| `@chidori/integrations-neo4j` | alpha | Neo4j Query API tools for Cypher, schema inspection, vector indexes, vector search, and document upsert |
| `@chidori/integrations-asana` | alpha | Asana REST tools for projects, tasks, search, and task comments |
| `@chidori/integrations-airtable` | alpha | Airtable REST tools for listing, reading, creating, updating, and deleting records |
| `@chidori/integrations-zendesk` | alpha | Zendesk Support REST tools for search, tickets, ticket comments, and users |
| `@chidori/integrations-hubspot` | alpha | HubSpot CRM REST tools for CRM object list, search, read, write, batch read, and associations |
| `@chidori/integrations-clicksend` | alpha | ClickSend SMS, voice, and email communications tools |
| `@chidori/integrations-databricks` | alpha | Databricks Model Serving and Vector Search tools |
| `@chidori/integrations-elevenlabs` | alpha | ElevenLabs text-to-speech and voice listing tools |
| `@chidori/integrations-jigsawstack` | alpha | JigsawStack AI search, scrape, OCR, transcription, and text-to-SQL tools |
| `@chidori/integrations-vectorstores` | alpha | Pinecone, Qdrant, Weaviate, Milvus, Chroma, MongoDB Atlas, Upstash Vector, Cloudflare Vectorize, Azure AI Search, Azion EdgeSQL, Azure Cosmos DB for NoSQL, Elasticsearch, OpenSearch, ClickHouse, turbopuffer, Rockset, Typesense, Supabase, Astra DB, Vectara, Xata, Couchbase, Meilisearch, and Vespa vector, embedding, and rerank tools |
| `@chidori/integrations-retrievers` | alpha | Tool-composed vector similarity, HyDE, BM25, time-weighted, and rerank retrieval, Alchemyst AI, Azion EdgeSQL, Dria, Chaindesk, ChatGPT Retrieval Plugin, Dappier AI Recommendations, Valyu Search, Supabase Hybrid Search, Metal, Brave Search, Bing Web Search, Google Serper, SerpApi, Perplexity Search, Google Scholar, Semantic Scholar, WolframAlpha, DuckDuckGo Instant Answer, SearXNG, StackExchange, You.com, Linkup, Mojeek, Parallel, Nimble, PubMed, Wikipedia, arXiv, Tavily, Exa, Vespa, Meilisearch, Zep open source memory, Zep Cloud graph, AWS Bedrock Knowledge Bases, and Amazon Kendra retrieval, and document formatting |
| `@chidori/integrations-text` | alpha | Pure TypeScript text splitters, HTML cleanup, readability extraction, and document transformers |
| `@chidori/integrations-typeform` | alpha | Typeform Create and Responses API tools for forms and submissions |
| `@chidori/integrations-twilio` | alpha | Twilio REST tools for messages, calls, and available phone number search |
| `@chidori/integrations-sendgrid` | alpha | Twilio SendGrid tools for mail send, templates, contacts, and suppressions |
| `@chidori/integrations-loaders` | alpha | HTTP, text, subtitles, YouTube transcripts, Markdown, Notion Markdown exports, Cheerio-style webpages, recursive URL crawling, IMSDB scripts, College Confidential pages, ChatGPT exports, Slack conversations, Discord channel messages, GitHub repositories, SerpApi/SearchApi results, Salesforce SOQL, HubSpot CRM objects, Stripe resources, Shopify records, Zendesk Support records, Typeform forms and responses, ServiceNow table records, JSON, JSONL, CSV, RSS/Atom, HTML, sitemap, Notion, Google Drive, Google Cloud Storage, Azure Blob Storage, Amazon S3, Dropbox, Airtable, Figma, Jira, Confluence, Browserbase, Firecrawl, Parallel Extract, Spider, Apify, AssemblyAI, Sonix, Soniox, Hacker News, GitBook, Taskade, Supadata, iFixit, and parser-API document loaders |

## Development

```bash
npm install
npm run typecheck
npm run build
npm run verify
npm run test
```

The lockfile pins TypeScript and links all workspace packages locally.

## Chidori Tool Vendoring

Chidori currently discovers concrete TypeScript tool modules from `<agent-project>/tools/`. Use the vendor helper to materialize standalone, import-free tool files from these packages:

```bash
npm run build
npm run vendor:tools -- --package @chidori/integrations-web --tool tavily_search --out ../my-agent/tools
```

Use `--all` to vendor every manifest-declared tool. Generated files export the Chidori runtime shape directly:

```ts
export const tool = ...;
export async function run(args, chidori) { ... }
```

## Integration Inventory

The package map groups external providers, tools, loaders, vector stores, retrievers, text splitters, document transformers, and sandboxes by Chidori integration surface.

See [docs/integration-inventory.md](docs/integration-inventory.md) for the current integration inventory and backlog.
See [docs/status.md](docs/status.md) for the current wrap-up state and deferred work.
