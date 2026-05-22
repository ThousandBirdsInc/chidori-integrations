# Current Status

This repository now contains TypeScript-first integration packages for Chidori agents, organized by Chidori integration surface while keeping the agent-facing code vendorable and dependency-light.

## Implemented Surface

- Provider APIs: OpenAI, Anthropic, Google, AWS, Azure, Microsoft, Cloudflare, Cohere, IBM, Mistral, Groq, OpenRouter, Replicate, Ollama, Databricks, and many OpenAI-compatible providers.
- Service tools: web search and extraction, browser services, GitHub, GitLab, Salesforce, ServiceNow, Jira, Confluence, Notion, Slack, Stripe, Shopify, Zendesk, HubSpot, Typeform, Discord, Dropbox, Trello, Todoist, Linear, monday.com, PagerDuty, Twilio, SendGrid, Asana, Airtable, ClickSend, ElevenLabs, JigsawStack, Composio, finance APIs, and Neo4j.
- Vector stores: Pinecone, Qdrant, Weaviate, Milvus, Chroma, MongoDB Atlas Vector Search, Upstash Vector, Cloudflare Vectorize, Azure AI Search, Azion EdgeSQL, Azure Cosmos DB for NoSQL, Elasticsearch, OpenSearch, ClickHouse, turbopuffer, Rockset, Typesense, Supabase, Astra DB, Vectara, Xata, Couchbase, Meilisearch, Vespa, Neo4j, and Databricks Vector Search.
- Retrievers: generic vector similarity, HyDE, BM25, time-weighted retrieval, rerank composition, Alchemyst AI, Azion EdgeSQL, Dria, Chaindesk, ChatGPT Retrieval Plugin, Dappier AI Recommendations, Valyu Search, Supabase Hybrid Search, Metal, Brave Search, Bing Web Search, Google Serper, SerpApi, Perplexity Search, Google Scholar, Semantic Scholar, WolframAlpha, DuckDuckGo Instant Answer, SearXNG, StackExchange, You.com, Linkup, Mojeek, Parallel, Nimble, PubMed, Wikipedia, arXiv, Tavily, Exa, Vespa, Meilisearch, Zep, AWS Bedrock Knowledge Bases, and Amazon Kendra.
- Loaders and text utilities: HTTP, local text-like formats, common SaaS/export APIs, web loaders, storage providers, transcript providers, and pure TypeScript text splitting and document transforms.

The complete package and tool inventory remains in `integrations.manifest.json` and `docs/integration-inventory.md`.

## Runtime Boundary

These packages should stay focused on external service calls and small data-shaping helpers. Chidori itself owns runtime-level instrumentation, provider-response reuse, and durable execution behavior, so this repo should not add separate packages for those concerns.

Agent-facing code should continue to follow these rules:

- Use direct HTTP APIs through `chidori.http` when practical.
- Keep tool metadata static and JSON-compatible.
- Accept credentials explicitly as tool args or Chidori secret references.
- Avoid required Node SDK dependencies in vendored agent tools.
- Prefer small, single-purpose tools over broad SDK wrappers.

## Recent Work

- Removed integration plans for runtime-owned concerns.
- Added retriever coverage for Valyu, reranking composition, Perplexity Search, Brave Search, Bing Web Search, Google Serper, SerpApi, AWS Bedrock Knowledge Bases, Amazon Kendra, HyDE, time-weighted retrieval, Metal, Zep, Alchemyst AI, Azion EdgeSQL, and Dria.
- Added vector store coverage for Xata and Azion EdgeSQL, including write, search, and delete paths where supported.
- Kept the vendoring path working through `npm run vendor:tools`.

## Deferred Work

Do not add more integrations during the wrap-up phase. Later work should prioritize candidates that have stable HTTP APIs and fit the vendorable TypeScript model.

Good later candidates:

- Google Vertex AI Vector Search: REST-backed upsert and nearest-neighbor query tools.
- Additional vector stores with clear HTTP contracts, such as provider-specific conveniences not yet represented in the manifest.
- Native PDF/DOCX parsing in loaders, if it can be implemented without making agent tools depend on Node-only libraries.

Candidates needing more care:

- Tigris vector store: the current TypeScript client path goes through `@tigrisdata/core` with gRPC/protobuf transport. Revisit only if there is a stable direct HTTP contract or if the repo gets an explicit SDK-bound package tier.
- SDK-heavy providers: add only when their REST surface is documented enough to keep vendored tools import-free.

## Wrap-Up Checks

Before considering a slice complete, run:

```bash
npm run typecheck
npm run verify
npm run test
```

For any newly added tool, also run `npm run vendor:tools` for that tool and inspect the generated file to confirm it has no import statements and exposes `export const tool` plus `export async function run`.
