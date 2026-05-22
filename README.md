# Chidori Integrations

TypeScript integration packages for Chidori agents. The packages expose small, Chidori-native helpers and tool definitions that can be used from agent projects or copied/bundled into the Chidori TypeScript runtime.

Chidori agents currently have the most reliable support for relative TypeScript imports. These packages are normal ESM npm packages, but their agent-facing code is intentionally dependency-light and uses `chidori.http`, `chidori.tool`, and JSON-compatible data structures instead of Node-only SDKs.

Every provider package exports a package-level integration spec with an `environmentVariables()` method, plus a `get<Integration>EnvironmentVariables()` helper, so host applications can discover which environment variables may be needed before running a tool.

## Packages

| Package | Status | Scope |
| --- | --- | --- |
| <nobr><code>@chidori/integrations-core</code></nobr> | alpha | Shared Chidori tool/runtime types and HTTP helpers |
| <nobr><code>@chidori/integrations-openai</code></nobr> | alpha | OpenAI Responses, embeddings, and image generation tools |
| <nobr><code>@chidori/integrations-anthropic</code></nobr> | alpha | Anthropic Messages API tool |
| <nobr><code>@chidori/integrations-google</code></nobr> | alpha | Google Gemini, Vertex AI, Places, Routes, YouTube, Cloud Text-to-Speech, Calendar, and Gmail tools |
| <nobr><code>@chidori/integrations-microsoft</code></nobr> | alpha | Microsoft Graph tools for Outlook mail, calendar events, drive children, and generic Graph requests |
| <nobr><code>@chidori/integrations-aws</code></nobr> | alpha | AWS Bedrock, Bedrock Knowledge Bases, Amazon Kendra, Step Functions, SageMaker Runtime, and Lambda tools for signed or proxied requests |
| <nobr><code>@chidori/integrations-azure</code></nobr> | alpha | Azure OpenAI chat completions, embeddings, and Dynamic Sessions tools |
| <nobr><code>@chidori/integrations-cloudflare</code></nobr> | alpha | Cloudflare Workers AI and AI Gateway tools |
| <nobr><code>@chidori/integrations-aleph-alpha</code></nobr> | alpha | Aleph Alpha / Pharia completion, chat, and embeddings tools |
| <nobr><code>@chidori/integrations-ai21</code></nobr> | alpha | AI21 Jamba chat completions tool |
| <nobr><code>@chidori/integrations-baidu</code></nobr> | alpha | Baidu Qianfan chat completions and embeddings tools |
| <nobr><code>@chidori/integrations-cohere</code></nobr> | alpha | Cohere chat, embeddings, and rerank tools |
| <nobr><code>@chidori/integrations-contextual</code></nobr> | alpha | Contextual AI instruction-following rerank tool |
| <nobr><code>@chidori/integrations-ibm</code></nobr> | alpha | IBM watsonx.ai chat and embeddings tools |
| <nobr><code>@chidori/integrations-jina</code></nobr> | alpha | Jina embeddings and rerank tools |
| <nobr><code>@chidori/integrations-mixedbread</code></nobr> | alpha | Mixedbread AI rerank tool |
| <nobr><code>@chidori/integrations-nomic</code></nobr> | alpha | Nomic Atlas text embedding tools |
| <nobr><code>@chidori/integrations-voyage</code></nobr> | alpha | Voyage AI embeddings and rerank tools |
| <nobr><code>@chidori/integrations-mistral</code></nobr> | alpha | Mistral chat completions and embeddings tools |
| <nobr><code>@chidori/integrations-groq</code></nobr> | alpha | Groq OpenAI-compatible chat completions tool |
| <nobr><code>@chidori/integrations-openrouter</code></nobr> | alpha | OpenRouter chat completions tool |
| <nobr><code>@chidori/integrations-openai-compatible</code></nobr> | alpha | xAI, Fireworks chat/completions/embeddings, Together, Perplexity, DeepSeek, Hugging Face chat and embeddings, DeepInfra, ZhipuAI, Moonshot AI, DashScope, Tencent Hunyuan chat and embeddings, ByteDance Volcengine/Doubao, MiniMax chat and embeddings, Novita AI, Friendli, SambaNova, PremAI chat and embeddings, Upstage Solar chat and embeddings, GitHub Models, Cerebras, and NVIDIA NIM chat, completion, embedding, rerank, and responses tools |
| <nobr><code>@chidori/integrations-writer</code></nobr> | alpha | Writer AI Studio chat completion tool |
| <nobr><code>@chidori/integrations-yandex</code></nobr> | alpha | Yandex Cloud AI Studio Foundation Models completion and embeddings tools |
| <nobr><code>@chidori/integrations-replicate</code></nobr> | alpha | Replicate prediction creation, polling, and cancellation tools |
| <nobr><code>@chidori/integrations-ollama</code></nobr> | alpha | Local Ollama chat, generate, and embeddings tools |
| <nobr><code>@chidori/integrations-browser</code></nobr> | alpha | Browserbase session, fetch, search, live debug, logs, and recording tools |
| <nobr><code>@chidori/integrations-composio</code></nobr> | alpha | Composio tool discovery, execution, and proxy execution tools |
| <nobr><code>@chidori/integrations-finance</code></nobr> | alpha | Alpha Vantage, Polygon.io, and Google Finance exchange rate, market data, news, financials, and market mover tools |
| <nobr><code>@chidori/integrations-web</code></nobr> | alpha | Tavily, Exa, Firecrawl, Brave Search, Bing Web Search, Perplexity Search, Mojeek Search, Parallel Search/Extract, Nimble Search, Google Custom Search, Google Serper, Jina Search, Linkup Search, Google Scholar, Google Trends, Google Jobs, arXiv, Semantic Scholar, PubMed, OpenWeatherMap, NASA, TMDB, SerpApi, SearchApi, DuckDuckGo, Wikipedia, StackExchange, WolframAlpha, SearXNG, You.com, DataForSEO, Dappier, Valyu, and Decodo tools |
| <nobr><code>@chidori/integrations-github</code></nobr> | alpha | GitHub REST tools for repositories, issues, pull requests, branches, files, and code search |
| <nobr><code>@chidori/integrations-gitlab</code></nobr> | alpha | GitLab REST tools for search, issues, merge requests, notes, branches, and repository files |
| <nobr><code>@chidori/integrations-salesforce</code></nobr> | alpha | Salesforce REST tools for SOQL, sObject metadata, and sObject record CRUD |
| <nobr><code>@chidori/integrations-servicenow</code></nobr> | alpha | ServiceNow Table API tools for generic table record CRUD and encoded queries |
| <nobr><code>@chidori/integrations-jira</code></nobr> | alpha | Jira REST tools for JQL search, issues, comments, and transitions |
| <nobr><code>@chidori/integrations-confluence</code></nobr> | alpha | Confluence REST tools for listing, reading, creating, and updating pages |
| <nobr><code>@chidori/integrations-notion</code></nobr> | alpha | Notion REST tools for search, pages, and block children |
| <nobr><code>@chidori/integrations-shopify</code></nobr> | alpha | Shopify Admin GraphQL and REST tools for products, orders, and customers |
| <nobr><code>@chidori/integrations-slack</code></nobr> | alpha | Slack Web API tools for conversations, messages, scheduling, users, and search |
| <nobr><code>@chidori/integrations-stripe</code></nobr> | alpha | Stripe REST tools for customers, resource lists, PaymentIntents, and Checkout Sessions |
| <nobr><code>@chidori/integrations-discord</code></nobr> | alpha | Discord REST tools for guilds, channels, reading messages, and posting |
| <nobr><code>@chidori/integrations-dropbox</code></nobr> | alpha | Dropbox API tools for file listing, search, links, folders, text upload, move, and delete |
| <nobr><code>@chidori/integrations-trello</code></nobr> | alpha | Trello REST tools for boards, lists, cards, and card comments |
| <nobr><code>@chidori/integrations-todoist</code></nobr> | alpha | Todoist REST tools for projects, tasks, completion state, and comments |
| <nobr><code>@chidori/integrations-linear</code></nobr> | alpha | Linear GraphQL tools for teams, issues, and comments |
| <nobr><code>@chidori/integrations-monday</code></nobr> | alpha | monday.com GraphQL tools for boards, items, column values, and updates |
| <nobr><code>@chidori/integrations-pagerduty</code></nobr> | alpha | PagerDuty REST and Events API tools for incidents, services, users, notes, and events |
| <nobr><code>@chidori/integrations-neo4j</code></nobr> | alpha | Neo4j Query API tools for Cypher, schema inspection, vector indexes, vector search, and document upsert |
| <nobr><code>@chidori/integrations-asana</code></nobr> | alpha | Asana REST tools for projects, tasks, search, and task comments |
| <nobr><code>@chidori/integrations-airtable</code></nobr> | alpha | Airtable REST tools for listing, reading, creating, updating, and deleting records |
| <nobr><code>@chidori/integrations-zendesk</code></nobr> | alpha | Zendesk Support REST tools for search, tickets, ticket comments, and users |
| <nobr><code>@chidori/integrations-hubspot</code></nobr> | alpha | HubSpot CRM REST tools for CRM object list, search, read, write, batch read, and associations |
| <nobr><code>@chidori/integrations-clicksend</code></nobr> | alpha | ClickSend SMS, voice, and email communications tools |
| <nobr><code>@chidori/integrations-databricks</code></nobr> | alpha | Databricks Model Serving and Vector Search tools |
| <nobr><code>@chidori/integrations-elevenlabs</code></nobr> | alpha | ElevenLabs text-to-speech and voice listing tools |
| <nobr><code>@chidori/integrations-jigsawstack</code></nobr> | alpha | JigsawStack AI search, scrape, OCR, transcription, and text-to-SQL tools |
| <nobr><code>@chidori/integrations-vectorstores</code></nobr> | alpha | Pinecone, Qdrant, Weaviate, Milvus, Chroma, MongoDB Atlas, Upstash Vector, Cloudflare Vectorize, Azure AI Search, Azion EdgeSQL, Azure Cosmos DB for NoSQL, Elasticsearch, OpenSearch, ClickHouse, turbopuffer, Rockset, Typesense, Supabase, Astra DB, Vectara, Xata, Couchbase, Meilisearch, and Vespa vector, embedding, and rerank tools |
| <nobr><code>@chidori/integrations-retrievers</code></nobr> | alpha | Tool-composed vector similarity, HyDE, BM25, time-weighted, and rerank retrieval, Alchemyst AI, Azion EdgeSQL, Dria, Chaindesk, ChatGPT Retrieval Plugin, Dappier AI Recommendations, Valyu Search, Supabase Hybrid Search, Metal, Brave Search, Bing Web Search, Google Serper, SerpApi, Perplexity Search, Google Scholar, Semantic Scholar, WolframAlpha, DuckDuckGo Instant Answer, SearXNG, StackExchange, You.com, Linkup, Mojeek, Parallel, Nimble, PubMed, Wikipedia, arXiv, Tavily, Exa, Vespa, Meilisearch, Zep open source memory, Zep Cloud graph, AWS Bedrock Knowledge Bases, and Amazon Kendra retrieval, and document formatting |
| <nobr><code>@chidori/integrations-text</code></nobr> | alpha | Pure TypeScript text splitters, HTML cleanup, readability extraction, and document transformers |
| <nobr><code>@chidori/integrations-typeform</code></nobr> | alpha | Typeform Create and Responses API tools for forms and submissions |
| <nobr><code>@chidori/integrations-twilio</code></nobr> | alpha | Twilio REST tools for messages, calls, and available phone number search |
| <nobr><code>@chidori/integrations-sendgrid</code></nobr> | alpha | Twilio SendGrid tools for mail send, templates, contacts, and suppressions |
| <nobr><code>@chidori/integrations-loaders</code></nobr> | alpha | HTTP, text, subtitles, YouTube transcripts, Markdown, Notion Markdown exports, Cheerio-style webpages, recursive URL crawling, IMSDB scripts, College Confidential pages, ChatGPT exports, Slack conversations, Discord channel messages, GitHub repositories, SerpApi/SearchApi results, Salesforce SOQL, HubSpot CRM objects, Stripe resources, Shopify records, Zendesk Support records, Typeform forms and responses, ServiceNow table records, JSON, JSONL, CSV, RSS/Atom, HTML, sitemap, Notion, Google Drive, Google Cloud Storage, Azure Blob Storage, Amazon S3, Dropbox, Airtable, Figma, Jira, Confluence, Browserbase, Firecrawl, Parallel Extract, Spider, Apify, AssemblyAI, Sonix, Soniox, Hacker News, GitBook, Taskade, Supadata, iFixit, and parser-API document loaders |

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
