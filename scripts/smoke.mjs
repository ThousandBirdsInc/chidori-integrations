import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  htmlReadabilityDocumentsTool,
  htmlToText,
  htmlToTextDocumentsTool,
  splitText,
  textSplitDocumentsTool,
  transformHtmlReadabilityDocuments,
  transformHtmlToTextDocuments,
} from "../packages/text/dist/index.js";
import { ai21ChatCompletionsTool } from "../packages/ai21/dist/index.js";
import {
  alephAlphaChatTool,
  alephAlphaCompleteTool,
  alephAlphaEmbeddingsTool,
} from "../packages/aleph-alpha/dist/index.js";
import {
  baiduQianfanAccessTokenCreateTool,
  baiduQianfanChatCompletionsTool,
  baiduQianfanEmbeddingsTool,
} from "../packages/baidu/dist/index.js";
import {
  asanaAddTaskCommentTool,
  asanaCreateTaskTool,
  asanaGetTaskTool,
  asanaListProjectTasksTool,
  asanaListProjectsTool,
  asanaSearchWorkspaceTasksTool,
  asanaUpdateTaskTool,
} from "../packages/asana/dist/index.js";
import {
  azureDynamicSessionsExecuteTool,
  azureDynamicSessionsFilesListTool,
} from "../packages/azure/dist/index.js";
import {
  awsBedrockKnowledgeBaseRetrieveAndGenerateTool,
  awsBedrockKnowledgeBaseRetrieveTool,
  awsKendraQueryTool,
  awsKendraRetrieveTool,
  awsSageMakerInvokeEndpointTool,
  awsStepFunctionsDescribeExecutionTool,
  awsStepFunctionsSendTaskSuccessTool,
  awsStepFunctionsStartExecutionTool,
} from "../packages/aws/dist/index.js";
import {
  airtableCreateRecordsTool,
  airtableDeleteRecordTool,
  airtableGetRecordTool,
  airtableListRecordsTool,
  airtableUpdateRecordsTool,
} from "../packages/airtable/dist/index.js";
import {
  browserbaseCloseSessionTool,
  browserbaseCreateSessionTool,
  browserbaseFetchTool,
  browserbaseGetSessionLiveUrlsTool,
  browserbaseGetSessionRecordingTool,
  browserbaseGetSessionTool,
  browserbaseListSessionLogsTool,
  browserbaseListSessionsTool,
  browserbaseSearchTool,
} from "../packages/browser/dist/index.js";
import {
  composioProxyExecuteTool,
  composioToolExecuteTool,
  composioToolGetTool,
  composioToolsListTool,
} from "../packages/composio/dist/index.js";
import {
  confluenceCreatePageTool,
  confluenceGetPageTool,
  confluenceListPagesTool,
  confluenceUpdatePageTool,
} from "../packages/confluence/dist/index.js";
import { contextualRerankTool } from "../packages/contextual/dist/index.js";
import {
  databricksChatCompletionsTool,
  databricksCompletionsTool,
  databricksEmbeddingsTool,
  databricksServingEndpointGetTool,
  databricksServingInvokeTool,
  databricksVectorSearchNextPageTool,
  databricksVectorSearchQueryTool,
} from "../packages/databricks/dist/index.js";
import {
  elevenLabsTextToSpeechTool,
  elevenLabsVoicesListTool,
} from "../packages/elevenlabs/dist/index.js";
import {
  alphaVantageExchangeRateTool,
  alphaVantageNewsSentimentTool,
  alphaVantageQuoteTool,
  alphaVantageSymbolSearchTool,
  alphaVantageTimeSeriesDailyTool,
  alphaVantageTimeSeriesWeeklyTool,
  alphaVantageTopGainersLosersTool,
  googleFinanceMarketsTool,
  googleFinanceSearchTool,
  polygonAggregatesTool,
  polygonFinancialsTool,
  polygonLastQuoteTool,
  polygonTickerNewsTool,
} from "../packages/finance/dist/index.js";
import {
  githubCreateBranchTool,
  githubCreateIssueCommentTool,
  githubCreateIssueTool,
  githubCreateOrUpdateFileTool,
  githubDeleteFileTool,
  githubGetFileContentsTool,
  githubGetIssueTool,
  githubGetPullRequestTool,
  githubGetRepoTool,
  githubListBranchesTool,
  githubListPullRequestFilesTool,
  githubListPullRequestsTool,
  githubListRepoIssuesTool,
  githubSearchCodeTool,
  githubSearchIssuesTool,
  githubCreatePullRequestTool,
} from "../packages/github/dist/index.js";
import {
  gitlabCreateBranchTool,
  gitlabCreateMergeRequestTool,
  gitlabCreateIssueTool,
  gitlabCreateNoteTool,
  gitlabCreateRepositoryFileTool,
  gitlabGetRepositoryFileTool,
  gitlabListMergeRequestsTool,
  gitlabListProjectIssuesTool,
  gitlabSearchTool,
  gitlabUpdateRepositoryFileTool,
} from "../packages/gitlab/dist/index.js";
import {
  googleTextToSpeechSynthesizeTool,
  googleTextToSpeechVoicesListTool,
  googleYoutubeSearchTool,
} from "../packages/google/dist/index.js";
import {
  hubspotAssociateCrmObjectTool,
  hubspotBatchReadCrmObjectsTool,
  hubspotCreateCrmObjectTool,
  hubspotGetCrmObjectTool,
  hubspotListCrmObjectsTool,
  hubspotSearchCrmObjectsTool,
  hubspotUpdateCrmObjectTool,
} from "../packages/hubspot/dist/index.js";
import { ibmWatsonxChatTool, ibmWatsonxEmbeddingsTool } from "../packages/ibm/dist/index.js";
import { jinaEmbeddingsTool, jinaRerankTool } from "../packages/jina/dist/index.js";
import {
  jiraAddIssueCommentTool,
  jiraCreateIssueTool,
  jiraGetIssueTool,
  jiraJqlSearchTool,
  jiraTransitionIssueTool,
} from "../packages/jira/dist/index.js";
import {
  linearCreateCommentTool,
  linearCreateIssueTool,
  linearGetIssueTool,
  linearGraphQLTool,
  linearTeamsListTool,
  linearUpdateIssueTool,
} from "../packages/linear/dist/index.js";
import {
  microsoftGraphCreateCalendarEventTool,
  microsoftGraphListCalendarEventsTool,
  microsoftGraphListDriveChildrenTool,
  microsoftGraphListMessagesTool,
  microsoftGraphRequestTool,
  microsoftGraphSendMailTool,
} from "../packages/microsoft/dist/index.js";
import {
  mondayChangeColumnValuesTool,
  mondayCreateItemTool,
  mondayCreateUpdateTool,
  mondayGetBoardItemsTool,
  mondayGraphQLTool,
  mondayListBoardsTool,
} from "../packages/monday/dist/index.js";
import { mixedbreadRerankTool } from "../packages/mixedbread/dist/index.js";
import {
  neo4jCypherQueryTool,
  neo4jDocumentsUpsertTool,
  neo4jSchemaGetTool,
  neo4jVectorIndexCreateTool,
  neo4jVectorQueryTool,
} from "../packages/neo4j/dist/index.js";
import { nomicTextEmbeddingsTool } from "../packages/nomic/dist/index.js";
import {
  notionAppendBlockChildrenTool,
  notionCreatePageTool,
  notionGetPageTool,
  notionListBlockChildrenTool,
  notionSearchTool,
  notionUpdatePageTool,
} from "../packages/notion/dist/index.js";
import {
  shopifyAdminGraphQLTool,
  shopifyGetCustomerTool,
  shopifyGetOrderTool,
  shopifyGetProductTool,
  shopifyListOrdersTool,
  shopifyListProductsTool,
  shopifySearchCustomersTool,
} from "../packages/shopify/dist/index.js";
import {
  slackConversationHistoryTool,
  slackConversationInfoTool,
  slackConversationRepliesTool,
  slackConversationsListTool,
  slackGetPermalinkTool,
  slackPostMessageTool,
  slackScheduleMessageTool,
  slackSearchMessagesTool,
  slackUserInfoTool,
} from "../packages/slack/dist/index.js";
import {
  stripeCreateCheckoutSessionTool,
  stripeCreateCustomerTool,
  stripeCreatePaymentIntentTool,
  stripeGetCheckoutSessionTool,
  stripeGetCustomerTool,
  stripeListCustomersTool,
  stripeListResourceTool,
  stripeUpdateCustomerTool,
} from "../packages/stripe/dist/index.js";
import {
  zendeskCreateOrUpdateUserTool,
  zendeskCreateTicketTool,
  zendeskGetTicketTool,
  zendeskListTicketCommentsTool,
  zendeskListTicketsTool,
  zendeskListUsersTool,
  zendeskSearchTool,
  zendeskUpdateTicketTool,
} from "../packages/zendesk/dist/index.js";
import { writerChatTool } from "../packages/writer/dist/index.js";
import {
  yandexFoundationCompletionTool,
  yandexFoundationTextEmbeddingTool,
} from "../packages/yandex/dist/index.js";
import {
  cerebrasChatCompletionsTool,
  dashScopeChatCompletionsTool,
  dashScopeEmbeddingsTool,
  deepInfraChatCompletionsTool,
  deepInfraEmbeddingsTool,
  fireworksCompletionsTool,
  fireworksEmbeddingsTool,
  friendliChatCompletionsTool,
  githubModelsChatCompletionsTool,
  githubModelsEmbeddingsTool,
  miniMaxChatCompletionsTool,
  miniMaxEmbeddingsTool,
  moonshotChatCompletionsTool,
  huggingFaceEmbeddingsTool,
  novitaChatCompletionsTool,
  nvidiaNimChatCompletionsTool,
  nvidiaNimEmbeddingsTool,
  nvidiaNimResponsesTool,
  premAiChatCompletionsTool,
  premAiEmbeddingsTool,
  sambaNovaChatCompletionsTool,
  sambaNovaCompletionsTool,
  sambaNovaEmbeddingsTool,
  togetherCompletionsTool,
  togetherRerankTool,
  tencentHunyuanChatCompletionsTool,
  tencentHunyuanEmbeddingsTool,
  upstageChatCompletionsTool,
  upstageEmbeddingsTool,
  volcengineDoubaoChatCompletionsTool,
  volcengineDoubaoEmbeddingsTool,
  volcengineDoubaoResponsesTool,
  zhipuAiChatCompletionsTool,
  zhipuAiEmbeddingsTool,
} from "../packages/openai-compatible/dist/index.js";
import {
  pagerDutyCreateIncidentNoteTool,
  pagerDutyGetIncidentTool,
  pagerDutyListIncidentsTool,
  pagerDutyListServicesTool,
  pagerDutyListUsersTool,
  pagerDutySendEventTool,
  pagerDutyUpdateIncidentTool,
} from "../packages/pagerduty/dist/index.js";
import {
  replicateDeploymentPredictionCreateTool,
  replicateOfficialModelPredictionCreateTool,
  replicatePredictionCancelTool,
  replicatePredictionCreateTool,
  replicatePredictionGetTool,
} from "../packages/replicate/dist/index.js";
import {
  salesforceSobjectDescribeTool,
  salesforceSobjectRecordCreateTool,
  salesforceSobjectRecordDeleteTool,
  salesforceSobjectRecordGetTool,
  salesforceSobjectRecordUpdateTool,
  salesforceSobjectsListTool,
  salesforceSoqlQueryTool,
} from "../packages/salesforce/dist/index.js";
import {
  sendGridAddGlobalSuppressionsTool,
  sendGridGetGlobalSuppressionTool,
  sendGridListTemplatesTool,
  sendGridSearchContactsByEmailTool,
  sendGridSendMailTool,
  sendGridUpsertContactsTool,
} from "../packages/sendgrid/dist/index.js";
import {
  serviceNowCreateTableRecordTool,
  serviceNowDeleteTableRecordTool,
  serviceNowGetTableRecordTool,
  serviceNowListTableRecordsTool,
  serviceNowUpdateTableRecordTool,
} from "../packages/servicenow/dist/index.js";
import {
  loadHubSpotCrmObjectDocuments,
  loadDiscordMessageDocuments,
  loadAirtableRecordDocuments,
  loadCheerioWebDocuments,
  loadCollegeConfidentialDocuments,
  loadConfluencePageDocuments,
  loadCsvDocuments,
  loadFigmaFileDocuments,
  loadFirecrawlDocuments,
  loadChatGptExportDocuments,
  loadGitBookPageDocuments,
  loadGitHubRepositoryDocuments,
  loadHackerNewsThreadDocuments,
  loadHtmlDocuments,
  loadIFixitDocumentDocuments,
  loadIFixitGuideDocuments,
  loadIFixitGuideListDocuments,
  loadIFixitSuggestionDocuments,
  loadIFixitWikiDocuments,
  loadImsdbScriptDocuments,
  loadJsonItemDocuments,
  loadJiraIssueDocuments,
  loadJsonLinesDocuments,
  loadMarkdownDocuments,
  loadNotionMarkdownExportDocuments,
  loadParallelExtractDocuments,
  loadRecursiveUrlDocuments,
  loadRssFeedDocuments,
  loadSearchResultDocuments,
  loadSalesforceRecordDocuments,
  loadServiceNowTableRecordDocuments,
  loadShopifyRecordDocuments,
  loadSitemapUrlDocuments,
  loadSlackMessageDocuments,
  loadSonioxTranscriptDocuments,
  loadStripeResourceDocuments,
  loadTypeformResourceDocuments,
  loadZendeskSupportDocuments,
  loadSubtitleDocuments,
  loadYouTubeTranscriptDocuments,
  loadSupadataMetadataDocuments,
  loadSupadataTranscriptDocuments,
  loadTaskadeTaskDocuments,
  loadTranscriptDocument,
  azureBlobFileLoaderTool,
  awsS3ObjectLoaderTool,
  cheerioWebLoaderTool,
  collegeConfidentialLoaderTool,
  discordChannelMessagesLoaderTool,
  firecrawlLoaderTool,
  googleCloudStorageObjectLoaderTool,
  githubRepositoryLoaderTool,
  hubSpotCrmObjectsLoaderTool,
  iFixitDocumentLoaderTool,
  iFixitGuideLoaderTool,
  iFixitGuidesLoaderTool,
  iFixitSuggestLoaderTool,
  iFixitWikiLoaderTool,
  imsdbScriptLoaderTool,
  markdownDocumentLoaderTool,
  notionMarkdownExportLoaderTool,
  parallelExtractLoaderTool,
  recursiveUrlLoaderTool,
  rssFeedLoaderTool,
  searchApiSearchLoaderTool,
  salesforceSoqlLoaderTool,
  serviceNowTableRecordsLoaderTool,
  shopifyResourceLoaderTool,
  slackConversationLoaderTool,
  sonioxTranscriptLoaderTool,
  serpApiSearchLoaderTool,
  stripeResourceLoaderTool,
  typeformResourceLoaderTool,
  youtubeTranscriptLoaderTool,
  zendeskSupportLoaderTool,
  supadataMetadataLoaderTool,
  supadataTranscriptLoaderTool,
} from "../packages/loaders/dist/index.js";
import {
  bm25RetrieverTool,
  chaindeskRetrieverTool,
  chatGptPluginRetrieverTool,
  dappierAiRecommendationsRetrieverTool,
  exaSearchRetrieverTool,
  arxivSearchRetrieverTool,
  bingWebSearchRetrieverTool,
  loadBm25Documents,
  loadBingWebSearchDocuments,
  loadBraveSearchDocuments,
  loadRerankedDocuments,
  loadChaindeskDocuments,
  loadChatGptPluginDocuments,
  loadDappierAiRecommendationsDocuments,
  loadDriaDocuments,
  loadValyuSearchDocuments,
  loadAlchemystContextDocuments,
  loadArxivSearchDocuments,
  loadAzionEdgeSqlDocuments,
  loadAmazonKendraQueryDocuments,
  loadAmazonKendraRetrieveDocuments,
  loadBedrockKnowledgeBaseDocuments,
  loadDuckDuckGoInstantAnswerDocuments,
  loadExaSearchDocuments,
  loadGoogleSerperSearchDocuments,
  loadGoogleScholarSearchDocuments,
  loadHydeDocuments,
  loadSearxngSearchDocuments,
  loadStackExchangeSearchDocuments,
  loadSemanticScholarSearchDocuments,
  loadSupabaseHybridDocuments,
  loadTimeWeightedDocuments,
  loadWolframAlphaQueryDocuments,
  loadYouComSearchDocuments,
  loadLinkupSearchDocuments,
  loadMeilisearchSearchDocuments,
  loadMetalSearchDocuments,
  loadMojeekSearchDocuments,
  loadNimbleSearchDocuments,
  loadParallelSearchDocuments,
  loadPerplexitySearchDocuments,
  loadPubMedSearchDocuments,
  loadSerpApiSearchDocuments,
  loadTavilySearchDocuments,
  loadVespaSearchDocuments,
  loadWikipediaSearchDocuments,
  loadZepCloudGraphSearchDocuments,
  loadZepMemoryDocuments,
  parseArxivRetrieverFeed,
  braveSearchRetrieverTool,
  duckDuckGoInstantAnswerRetrieverTool,
  driaRetrieverTool,
  googleSerperSearchRetrieverTool,
  googleScholarSearchRetrieverTool,
  hydeRetrieverTool,
  searxngSearchRetrieverTool,
  stackExchangeSearchRetrieverTool,
  semanticScholarSearchRetrieverTool,
  supabaseHybridRetrieverTool,
  wolframAlphaQueryRetrieverTool,
  youComSearchRetrieverTool,
  linkupSearchRetrieverTool,
  meilisearchRetrieverTool,
  metalRetrieverTool,
  mojeekSearchRetrieverTool,
  nimbleSearchRetrieverTool,
  parallelSearchRetrieverTool,
  perplexitySearchRetrieverTool,
  pubMedSearchRetrieverTool,
  rerankDocumentsTool,
  serpApiSearchRetrieverTool,
  alchemystContextRetrieverTool,
  amazonKendraQueryRetrieverTool,
  amazonKendraRetrieveRetrieverTool,
  azionEdgeSqlRetrieverTool,
  bedrockKnowledgeBaseRetrieverTool,
  timeWeightedRetrieverTool,
  tavilySearchRetrieverTool,
  valyuSearchRetrieverTool,
  vespaRetrieverTool,
  vectorSimilarityRetrieverTool,
  wikipediaSearchRetrieverTool,
  zepCloudGraphSearchRetrieverTool,
  zepMemoryRetrieverTool,
} from "../packages/retrievers/dist/index.js";
import {
  astraDbFindTool,
  astraDbInsertManyTool,
  azureCosmosDbNoSqlDocumentDeleteTool,
  azureCosmosDbNoSqlDocumentUpsertTool,
  azureCosmosDbNoSqlQueryTool,
  azionEdgeSqlDeleteTool,
  azionEdgeSqlVectorSearchTool,
  azionEdgeSqlVectorsAddTool,
  clickHouseDeleteTool,
  clickHouseInsertTool,
  clickHouseVectorSearchTool,
  couchbaseQueryExecuteTool,
  couchbaseSearchQueryTool,
  meilisearchDocumentsAddTool,
  meilisearchSearchTool,
  pineconeEmbeddingsTool,
  pineconeRerankTool,
  rocksetDocumentsAddTool,
  rocksetDocumentsDeleteTool,
  rocksetQueryTool,
  supabaseVectorMatchTool,
  supabaseVectorUpsertTool,
  typesenseDocumentsImportTool,
  typesenseVectorSearchTool,
  turbopufferQueryTool,
  turbopufferWriteTool,
  vectaraCorpusQueryTool,
  vectaraDocumentIndexTool,
  vespaDocumentPutTool,
  vespaQueryTool,
  xataVectorSearchTool,
  xataVectorsAddTool,
} from "../packages/vectorstores/dist/index.js";
import { voyageEmbeddingsTool, voyageRerankTool } from "../packages/voyage/dist/index.js";
import {
  arxivSearchTool,
  bingWebSearchTool,
  dataForSeoKeywordSuggestionsTool,
  dataForSeoSerpSearchTool,
  dappierRealTimeSearchTool,
  decodoScrapeTool,
  googleJobsSearchTool,
  googleSerperSearchTool,
  googleScholarSearchTool,
  googleTrendsSearchTool,
  jinaSearchTool,
  linkupSearchTool,
  mojeekSearchTool,
  nasaApodTool,
  nasaMarsRoverPhotosTool,
  nimbleSearchTool,
  openWeatherMapCurrentWeatherTool,
  openWeatherMapForecastTool,
  parallelExtractTool,
  parallelSearchTool,
  perplexitySearchTool,
  parseArxivFeed,
  pubMedSearchTool,
  semanticScholarPaperGetTool,
  semanticScholarPaperSearchTool,
  tmdbMovieDetailsTool,
  tmdbMovieSearchTool,
  valyuSearchTool,
} from "../packages/web/dist/index.js";
import {
  dropboxCreateFolderTool,
  dropboxDeleteFileOrFolderTool,
  dropboxGetTemporaryLinkTool,
  dropboxListFolderTool,
  dropboxMoveFileOrFolderTool,
  dropboxSearchFilesTool,
  dropboxUploadTextFileTool,
} from "../packages/dropbox/dist/index.js";
import {
  todoistCloseTaskTool,
  todoistCreateCommentTool,
  todoistCreateTaskTool,
  todoistGetTaskTool,
  todoistListCommentsTool,
  todoistListProjectsTool,
  todoistListTasksTool,
  todoistReopenTaskTool,
  todoistUpdateTaskTool,
} from "../packages/todoist/dist/index.js";
import {
  trelloAddCardCommentTool,
  trelloCreateCardTool,
  trelloListBoardCardsTool,
  trelloListBoardListsTool,
  trelloListMemberBoardsTool,
  trelloUpdateCardTool,
} from "../packages/trello/dist/index.js";
import {
  typeformCreateFormTool,
  typeformGetFormTool,
  typeformListFormsTool,
  typeformListResponsesTool,
  typeformUpdateFormTool,
} from "../packages/typeform/dist/index.js";
import {
  twilioCreateCallTool,
  twilioGetMessageTool,
  twilioListCallsTool,
  twilioListMessagesTool,
  twilioSearchAvailablePhoneNumbersTool,
  twilioSendMessageTool,
} from "../packages/twilio/dist/index.js";

const chunks = splitText("alpha beta gamma delta", {
  chunkSize: 10,
  chunkOverlap: 2,
  separators: [" ", ""],
});
assert.ok(chunks.length > 1, "splitText should split small chunks");

const textFromHtml = htmlToText("<html><head><title>Hello</title></head><body><p>A&amp;B <a href=\"https://example.com\">link</a></p><script>skip()</script></body></html>", {
  includeTitle: true,
  preserveLinks: true,
});
assert.match(textFromHtml, /Hello/);
assert.match(textFromHtml, /A&B link \(https:\/\/example.com\)/);
assert.doesNotMatch(textFromHtml, /skip/);

const htmlToTextDocuments = transformHtmlToTextDocuments([{
  pageContent: "<main><h1>Heading</h1><p>Body text.</p></main>",
  metadata: { source: "html-smoke" },
}]);
assert.equal(htmlToTextDocuments[0].metadata.transformer, "html_to_text");
assert.equal(htmlToTextDocuments[0].metadata.source, "html-smoke");
assert.match(htmlToTextDocuments[0].pageContent, /Body text/);

const readableDocuments = transformHtmlReadabilityDocuments([{
  pageContent: "<html><head><title>Readable</title></head><body><nav>Skip nav</nav><article><p>Main article text with enough detail to clear the readability threshold.</p></article><footer>Skip footer</footer></body></html>",
}], { includeTitle: true, minTextLength: 20 });
assert.equal(readableDocuments[0].metadata.transformer, "html_readability");
assert.equal(readableDocuments[0].metadata.selector, "article");
assert.match(readableDocuments[0].pageContent, /Readable/);
assert.match(readableDocuments[0].pageContent, /Main article text/);
assert.doesNotMatch(readableDocuments[0].pageContent, /Skip nav/);

const htmlToTextToolResult = await htmlToTextDocumentsTool.run({
  documents: [{ pageContent: "<p>Tool text &amp; link</p>" }],
}, {});
assert.equal(htmlToTextToolResult.documents[0].pageContent, "Tool text & link");

const htmlReadabilityToolResult = await htmlReadabilityDocumentsTool.run({
  documents: [{ pageContent: "<article><p>Tool readable article content is long enough.</p></article><aside>Ignore</aside>" }],
  minTextLength: 10,
}, {});
assert.match(htmlReadabilityToolResult.documents[0].pageContent, /Tool readable article/);
assert.doesNotMatch(htmlReadabilityToolResult.documents[0].pageContent, /Ignore/);

const csvDocuments = loadCsvDocuments("name,score\nAda,10\nGrace,11");
assert.equal(csvDocuments.length, 2);
assert.match(csvDocuments[0].pageContent, /Ada/);

const htmlDocuments = loadHtmlDocuments("<html><head><title>Hello</title></head><body><h1>Title</h1><p>A&amp;B</p></body></html>", {
  includeTitle: true,
});
assert.match(htmlDocuments[0].pageContent, /Hello/);
assert.match(htmlDocuments[0].pageContent, /A&B/);

const cheerioDocuments = loadCheerioWebDocuments("<html><body><article><p>First &amp; useful.</p></article><aside>Skip me</aside></body></html>", {
  url: "https://example.com/post",
  selector: "article",
  metadata: { workflow: "smoke" },
});
assert.match(cheerioDocuments[0].pageContent, /First & useful/);
assert.doesNotMatch(cheerioDocuments[0].pageContent, /Skip me/);
assert.equal(cheerioDocuments[0].metadata.source, "https://example.com/post");
assert.equal(cheerioDocuments[0].metadata.selector, "article");
assert.equal(cheerioDocuments[0].metadata.workflow, "smoke");

const recursiveUrlDocuments = loadRecursiveUrlDocuments([
  { url: "https://example.com/", html: "<main>Home</main>", depth: 0 },
  { url: "https://example.com/docs", html: "<main>Docs</main>", depth: 1 },
], {
  selector: "main",
  metadata: { workflow: "smoke" },
});
assert.equal(recursiveUrlDocuments.length, 2);
assert.match(recursiveUrlDocuments[1].pageContent, /Docs/);
assert.equal(recursiveUrlDocuments[1].metadata.source, "https://example.com/docs");
assert.equal(recursiveUrlDocuments[1].metadata.depth, 1);
assert.equal(recursiveUrlDocuments[1].metadata.workflow, "smoke");

const markdownDocuments = loadMarkdownDocuments("---\ntitle: Release Notes\ntags: [agent, docs]\n---\n# Release Notes\n\nHello **Chidori**", {
  stripMarkdown: true,
  metadata: { workflow: "smoke" },
});
assert.match(markdownDocuments[0].pageContent, /Hello Chidori/);
assert.equal(markdownDocuments[0].metadata.source, "markdown");
assert.equal(markdownDocuments[0].metadata.title, "Release Notes");
assert.equal(markdownDocuments[0].metadata.tags[0], "agent");
assert.equal(markdownDocuments[0].metadata.workflow, "smoke");

const notionMarkdownDocuments = loadNotionMarkdownExportDocuments([{
  path: "Projects/Launch Notes 0123456789abcdef0123456789abcdef.md",
  markdown: "# Launch Notes\n\nExported from **Notion**.",
}], {
  stripMarkdown: true,
  metadata: { workflow: "smoke" },
});
assert.match(notionMarkdownDocuments[0].pageContent, /Exported from Notion/);
assert.equal(notionMarkdownDocuments[0].metadata.source, "notion_markdown");
assert.equal(notionMarkdownDocuments[0].metadata.path, "Projects/Launch Notes 0123456789abcdef0123456789abcdef.md");
assert.equal(notionMarkdownDocuments[0].metadata.pageId, "01234567-89ab-cdef-0123-456789abcdef");
assert.equal(notionMarkdownDocuments[0].metadata.workflow, "smoke");

const imsdbDocuments = loadImsdbScriptDocuments("<html><head><title>Example Script at IMSDB.</title></head><body><pre>FADE IN:\n\nADA\nHello &amp; welcome.</pre></body></html>", {
  url: "https://imsdb.com/scripts/Example.html",
  metadata: { workflow: "smoke" },
});
assert.match(imsdbDocuments[0].pageContent, /FADE IN/);
assert.match(imsdbDocuments[0].pageContent, /Hello & welcome/);
assert.equal(imsdbDocuments[0].metadata.source, "imsdb");
assert.equal(imsdbDocuments[0].metadata.title, "Example");
assert.equal(imsdbDocuments[0].metadata.workflow, "smoke");

const collegeConfidentialDocuments = loadCollegeConfidentialDocuments("<html><head><title>Brown University | College Confidential</title></head><body><main class=\"skin-handler\"><h1>Brown University</h1><p>Brown is in Providence &amp; enrolls students.</p></main></body></html>", {
  url: "https://www.collegeconfidential.com/colleges/brown-university/",
  metadata: { workflow: "smoke" },
});
assert.match(collegeConfidentialDocuments[0].pageContent, /Brown is in Providence & enrolls students/);
assert.equal(collegeConfidentialDocuments[0].metadata.source, "college_confidential");
assert.equal(collegeConfidentialDocuments[0].metadata.title, "Brown University");
assert.equal(collegeConfidentialDocuments[0].metadata.workflow, "smoke");

const githubRepositoryDocuments = loadGitHubRepositoryDocuments({
  owner: "chidori",
  repo: "integrations",
  ref: "main",
  files: [{
    name: "README.md",
    path: "README.md",
    sha: "abc123",
    size: 16,
    encoding: "base64",
    content: "IyBIZWxsbyBHaXRIdWIK",
    html_url: "https://github.com/chidori/integrations/blob/main/README.md",
  }],
}, { workflow: "smoke" });
assert.match(githubRepositoryDocuments[0].pageContent, /Hello GitHub/);
assert.equal(githubRepositoryDocuments[0].metadata.source, "github");
assert.equal(githubRepositoryDocuments[0].metadata.owner, "chidori");
assert.equal(githubRepositoryDocuments[0].metadata.repo, "integrations");
assert.equal(githubRepositoryDocuments[0].metadata.path, "README.md");
assert.equal(githubRepositoryDocuments[0].metadata.workflow, "smoke");

const searchResultDocuments = loadSearchResultDocuments({
  search_parameters: { q: "chidori agents" },
  organic_results: [{
    position: 1,
    title: "Chidori Agents",
    link: "https://example.com/chidori",
    snippet: "Durable TypeScript agents.",
  }],
  answer_box: {
    title: "Summary",
    answer: "Chidori runs durable agent workflows.",
  },
}, "serpapi", { workflow: "smoke" });
assert.equal(searchResultDocuments.length, 2);
assert.match(searchResultDocuments[0].pageContent, /Durable TypeScript agents/);
assert.equal(searchResultDocuments[0].metadata.source, "serpapi");
assert.equal(searchResultDocuments[0].metadata.query, "chidori agents");
assert.equal(searchResultDocuments[0].metadata.resultType, "organic_results");
assert.equal(searchResultDocuments[0].metadata.workflow, "smoke");

const jsonlDocuments = loadJsonLinesDocuments("{\"name\":\"Ada\"}\n{\"name\":\"Grace\"}");
assert.equal(jsonlDocuments.length, 2);
assert.match(jsonlDocuments[1].pageContent, /Grace/);

const sitemapDocuments = loadSitemapUrlDocuments("<urlset><url><loc>https://example.com/a&amp;b</loc></url></urlset>");
assert.equal(sitemapDocuments[0].pageContent, "https://example.com/a&b");

const rssDocuments = loadRssFeedDocuments(`
<rss version="2.0">
  <channel>
    <title>Example Feed</title>
    <item>
      <title>Launch Notes</title>
      <link>https://example.com/launch</link>
      <guid>launch-1</guid>
      <pubDate>Wed, 20 May 2026 12:00:00 GMT</pubDate>
      <description><![CDATA[<p>Hello &amp; welcome</p>]]></description>
      <category>release</category>
    </item>
  </channel>
</rss>`, { workflow: "smoke" });
assert.match(rssDocuments[0].pageContent, /Hello & welcome/);
assert.equal(rssDocuments[0].metadata.source, "rss");
assert.equal(rssDocuments[0].metadata.title, "Launch Notes");
assert.equal(rssDocuments[0].metadata.link, "https://example.com/launch");
assert.equal(rssDocuments[0].metadata.categories[0], "release");

const airtableDocuments = loadAirtableRecordDocuments([{ id: "rec1", fields: { Name: "Ada" } }]);
assert.match(airtableDocuments[0].pageContent, /Ada/);
assert.equal(airtableDocuments[0].metadata.recordId, "rec1");

const figmaDocuments = loadFigmaFileDocuments({
  name: "Design",
  document: {
    name: "Root",
    children: [{ name: "Hero", characters: "Welcome" }],
  },
});
assert.match(figmaDocuments[0].pageContent, /Hero: Welcome/);

const jiraDocuments = loadJiraIssueDocuments([{
  id: "10001",
  key: "APP-1",
  fields: {
    summary: "Fix search",
    description: { content: [{ content: [{ text: "Search fails" }] }] },
  },
}]);
assert.match(jiraDocuments[0].pageContent, /Search fails/);
assert.equal(jiraDocuments[0].metadata.issueKey, "APP-1");

const confluenceDocuments = loadConfluencePageDocuments([{
  id: "123",
  title: "Runbook",
  body: { storage: { value: "<h1>Runbook</h1><p>A&amp;B</p>" } },
}]);
assert.match(confluenceDocuments[0].pageContent, /A&B/);
assert.equal(confluenceDocuments[0].metadata.pageId, "123");

const jsonItemDocuments = loadJsonItemDocuments([{ url: "https://example.com", title: "Example" }], "apify", {
  datasetId: "ds1",
});
assert.match(jsonItemDocuments[0].pageContent, /Example/);
assert.equal(jsonItemDocuments[0].metadata.source, "apify");

const firecrawlDocuments = loadFirecrawlDocuments({
  data: {
    markdown: "# Firecrawl\n\nClean markdown.",
    metadata: {
      title: "Firecrawl Example",
      sourceURL: "https://example.com/firecrawl",
      statusCode: 200,
    },
  },
}, { workflow: "smoke" });
assert.match(firecrawlDocuments[0].pageContent, /Clean markdown/);
assert.equal(firecrawlDocuments[0].metadata.source, "firecrawl");
assert.equal(firecrawlDocuments[0].metadata.url, "https://example.com/firecrawl");
assert.equal(firecrawlDocuments[0].metadata.title, "Firecrawl Example");
assert.equal(firecrawlDocuments[0].metadata.workflow, "smoke");

const parallelExtractDocuments = loadParallelExtractDocuments({
  extract_id: "extract_123",
  session_id: "session_123",
  results: [{
    url: "https://example.com/article",
    title: "Parallel Extract Example",
    excerpts: ["Relevant excerpt one.", "Relevant excerpt two."],
  }],
  errors: [],
}, { workflow: "smoke" });
assert.match(parallelExtractDocuments[0].pageContent, /Relevant excerpt two/);
assert.equal(parallelExtractDocuments[0].metadata.source, "parallel_extract");
assert.equal(parallelExtractDocuments[0].metadata.url, "https://example.com/article");
assert.equal(parallelExtractDocuments[0].metadata.extractId, "extract_123");
assert.equal(parallelExtractDocuments[0].metadata.workflow, "smoke");

const transcriptDocuments = loadTranscriptDocument({
  id: "tx1",
  status: "completed",
  text: "Transcript text",
}, "assemblyai");
assert.equal(transcriptDocuments[0].pageContent, "Transcript text");
assert.equal(transcriptDocuments[0].metadata.status, "completed");

const sonioxDocuments = loadSonioxTranscriptDocuments({
  id: "soniox_tx_1",
  status: "completed",
  model: "stt-async-v4",
  text: "Soniox transcript text.",
  tokens: [{ text: "Soniox" }, { text: " transcript" }, { text: " text." }],
  audio_duration_ms: 12000,
}, { workflow: "smoke" });
assert.equal(sonioxDocuments[0].pageContent, "Soniox transcript text.");
assert.equal(sonioxDocuments[0].metadata.source, "soniox");
assert.equal(sonioxDocuments[0].metadata.transcriptionId, "soniox_tx_1");
assert.equal(sonioxDocuments[0].metadata.model, "stt-async-v4");
assert.equal(sonioxDocuments[0].metadata.audioDurationMs, 12000);
assert.equal(sonioxDocuments[0].metadata.workflow, "smoke");

const subtitleDocuments = loadSubtitleDocuments("1\n00:00:01,000 --> 00:00:03,000\nHello &amp; welcome\n", {
  splitCues: true,
});
assert.equal(subtitleDocuments[0].pageContent, "Hello & welcome");
assert.equal(subtitleDocuments[0].metadata.start, "00:00:01,000");

const youtubeTranscriptDocuments = loadYouTubeTranscriptDocuments([
  { text: "Hello", start: 0, duration: 3 },
  { text: "from YouTube", start: 3, duration: 4 },
], {
  url: "https://youtu.be/video123",
  language: "en",
  transcriptFormat: "chunks",
  chunkSizeSeconds: 4,
  metadata: { workflow: "smoke" },
});
assert.equal(youtubeTranscriptDocuments.length, 1);
assert.match(youtubeTranscriptDocuments[0].pageContent, /Hello from YouTube/);
assert.equal(youtubeTranscriptDocuments[0].metadata.source, "youtube");
assert.equal(youtubeTranscriptDocuments[0].metadata.videoId, "video123");
assert.equal(youtubeTranscriptDocuments[0].metadata.workflow, "smoke");

const chatGptDocuments = loadChatGptExportDocuments([{
  title: "Example chat",
  messages: [{ role: "user", content: "Hello" }, { role: "assistant", content: "Hi" }],
}]);
assert.match(chatGptDocuments[0].pageContent, /assistant: Hi/);
assert.equal(chatGptDocuments[0].metadata.messageCount, 2);

const slackDocuments = loadSlackMessageDocuments({
  channel: "C123",
  messages: [{
    type: "message",
    user: "U123",
    text: "Hello <@U456> from <https://example.com|Example>",
    ts: "1716230000.000100",
    thread_ts: "1716230000.000100",
    reactions: [{ name: "eyes", count: 2 }],
    attachments: [{ title: "Runbook", text: "See the deployment notes." }],
  }],
}, { workflow: "smoke" });
assert.match(slackDocuments[0].pageContent, /Hello @U456 from Example/);
assert.match(slackDocuments[0].pageContent, /Runbook/);
assert.equal(slackDocuments[0].metadata.channelId, "C123");
assert.equal(slackDocuments[0].metadata.reactionCount, 2);

const discordDocuments = loadDiscordMessageDocuments({
  channelId: "C123",
  messages: [{
    id: "112233",
    channel_id: "C123",
    author: { id: "U123", username: "ada", global_name: "Ada" },
    content: "Hello <@456> in <#789> <:ship:111>",
    timestamp: "2026-05-20T12:00:00.000000+00:00",
    attachments: [{ filename: "runbook.md", url: "https://cdn.example.com/runbook.md" }],
    embeds: [{ title: "Deployment", description: "Ready to ship." }],
    reactions: [{ count: 3 }],
  }],
}, { workflow: "smoke" });
assert.match(discordDocuments[0].pageContent, /Hello @456 in #789 :ship:/);
assert.match(discordDocuments[0].pageContent, /Deployment/);
assert.match(discordDocuments[0].pageContent, /runbook.md/);
assert.equal(discordDocuments[0].metadata.authorUsername, "ada");
assert.equal(discordDocuments[0].metadata.reactionCount, 3);

const salesforceDocuments = loadSalesforceRecordDocuments({
  totalSize: 1,
  done: true,
  records: [{
    attributes: { type: "Account", url: "/services/data/v66.0/sobjects/Account/001" },
    Id: "001",
    Name: "Acme Corp",
    Industry: "Software",
  }],
}, { workflow: "smoke" });
assert.match(salesforceDocuments[0].pageContent, /Acme Corp/);
assert.equal(salesforceDocuments[0].metadata.recordId, "001");
assert.equal(salesforceDocuments[0].metadata.sobject, "Account");
assert.equal(salesforceDocuments[0].metadata.title, "Acme Corp");

const hubSpotDocuments = loadHubSpotCrmObjectDocuments({
  objectType: "contacts",
  results: [{
    id: "101",
    createdAt: "2026-05-20T12:00:00.000Z",
    updatedAt: "2026-05-20T12:30:00.000Z",
    archived: false,
    properties: {
      firstname: "Ada",
      lastname: "Lovelace",
      email: "ada@example.com",
    },
  }],
  paging: { next: { after: "102" } },
}, { workflow: "smoke" });
assert.match(hubSpotDocuments[0].pageContent, /ada@example.com/);
assert.equal(hubSpotDocuments[0].metadata.objectType, "contacts");
assert.equal(hubSpotDocuments[0].metadata.objectId, "101");
assert.equal(hubSpotDocuments[0].metadata.title, "ada@example.com");
assert.equal(hubSpotDocuments[0].metadata.nextAfter, "102");

const stripeResourceDocuments = loadStripeResourceDocuments({
  object: "list",
  url: "/v1/charges",
  has_more: true,
  data: [{
    id: "ch_123",
    object: "charge",
    description: "Smoke test charge",
    amount: 2198,
    currency: "usd",
    created: 1716230000,
    livemode: false,
    paid: true,
  }],
}, "charges", { workflow: "smoke" });
assert.match(stripeResourceDocuments[0].pageContent, /Smoke test charge/);
assert.equal(stripeResourceDocuments[0].metadata.resource, "charges");
assert.equal(stripeResourceDocuments[0].metadata.resourceId, "ch_123");
assert.equal(stripeResourceDocuments[0].metadata.title, "Smoke test charge");
assert.equal(stripeResourceDocuments[0].metadata.hasMore, true);

const shopifyRecordDocuments = loadShopifyRecordDocuments({
  products: [{
    id: 921728736,
    admin_graphql_api_id: "gid://shopify/Product/921728736",
    title: "IPod Touch 8GB",
    vendor: "Apple",
    status: "active",
    created_at: "2026-01-09T17:26:48-05:00",
    updated_at: "2026-01-09T17:27:46-05:00",
  }],
}, "products", { workflow: "smoke" });
assert.match(shopifyRecordDocuments[0].pageContent, /IPod Touch 8GB/);
assert.equal(shopifyRecordDocuments[0].metadata.resource, "products");
assert.equal(shopifyRecordDocuments[0].metadata.recordId, "921728736");
assert.equal(shopifyRecordDocuments[0].metadata.adminGraphqlApiId, "gid://shopify/Product/921728736");
assert.equal(shopifyRecordDocuments[0].metadata.title, "IPod Touch 8GB");

const zendeskSupportDocuments = loadZendeskSupportDocuments({
  tickets: [{
    id: 123,
    subject: "Printer is on fire",
    status: "open",
    priority: "high",
    created_at: "2026-01-09T17:26:48Z",
    updated_at: "2026-01-09T17:27:46Z",
    url: "https://example.zendesk.com/api/v2/tickets/123.json",
  }],
  count: 1,
  next_page: "https://example.zendesk.com/api/v2/tickets.json?page=2",
}, "tickets", { workflow: "smoke" });
assert.match(zendeskSupportDocuments[0].pageContent, /Printer is on fire/);
assert.equal(zendeskSupportDocuments[0].metadata.resource, "tickets");
assert.equal(zendeskSupportDocuments[0].metadata.recordId, "123");
assert.equal(zendeskSupportDocuments[0].metadata.title, "Printer is on fire");
assert.equal(zendeskSupportDocuments[0].metadata.nextPage, "https://example.zendesk.com/api/v2/tickets.json?page=2");

const typeformResourceDocuments = loadTypeformResourceDocuments({
  form_id: "form_123",
  total_items: 1,
  page_count: 1,
  items: [{
    token: "response_123",
    response_type: "completed",
    landed_at: "2026-01-09T17:26:48Z",
    submitted_at: "2026-01-09T17:27:46Z",
    answers: [{
      type: "email",
      email: "ada@example.com",
      field: { id: "field_email", ref: "email" },
    }],
  }],
}, "responses", { workflow: "smoke" });
assert.match(typeformResourceDocuments[0].pageContent, /email: ada@example.com/);
assert.equal(typeformResourceDocuments[0].metadata.resource, "responses");
assert.equal(typeformResourceDocuments[0].metadata.formId, "form_123");
assert.equal(typeformResourceDocuments[0].metadata.recordId, "response_123");
assert.equal(typeformResourceDocuments[0].metadata.responseType, "completed");

const serviceNowDocuments = loadServiceNowTableRecordDocuments({
  result: [{
    sys_id: "abc123",
    number: "INC0010001",
    short_description: "VPN is down",
    state: "2",
    priority: "1",
    sys_created_on: "2026-01-09 17:26:48",
    sys_updated_on: "2026-01-09 17:27:46",
  }],
}, "incident", { workflow: "smoke" });
assert.match(serviceNowDocuments[0].pageContent, /VPN is down/);
assert.equal(serviceNowDocuments[0].metadata.table, "incident");
assert.equal(serviceNowDocuments[0].metadata.sysId, "abc123");
assert.equal(serviceNowDocuments[0].metadata.number, "INC0010001");
assert.equal(serviceNowDocuments[0].metadata.title, "VPN is down");

const hackerNewsDocuments = loadHackerNewsThreadDocuments([
  { id: 1, type: "story", title: "Launch", by: "pg", text: "Hello &amp; welcome", url: "https://example.com" },
  { id: 2, type: "comment", by: "user", text: "Nice" },
]);
assert.match(hackerNewsDocuments[0].pageContent, /Hello & welcome/);
assert.equal(hackerNewsDocuments[0].metadata.itemCount, 2);

const gitBookDocuments = loadGitBookPageDocuments({
  id: "page-1",
  title: "Docs",
  markdown: "# Getting Started",
  updatedAt: "2026-05-20T00:00:00.000Z",
});
assert.equal(gitBookDocuments[0].pageContent, "# Getting Started");
assert.equal(gitBookDocuments[0].metadata.source, "gitbook");

const taskadeDocuments = loadTaskadeTaskDocuments([
  { id: "task-1", text: "Ship coverage", parentId: "root", completed: false },
]);
assert.match(taskadeDocuments[0].pageContent, /Ship coverage/);
assert.equal(taskadeDocuments[0].metadata.completed, false);

const supadataTranscriptDocuments = loadSupadataTranscriptDocuments({
  content: [{ text: "Hello from video", offset: 1000, duration: 2000, lang: "en" }],
  lang: "en",
  availableLangs: ["en"],
});
assert.equal(supadataTranscriptDocuments[0].pageContent, "Hello from video");
assert.equal(supadataTranscriptDocuments[0].metadata.lang, "en");
assert.equal(supadataTranscriptDocuments[0].metadata.chunkCount, 1);

const supadataMetadataDocuments = loadSupadataMetadataDocuments({
  platform: "youtube",
  type: "video",
  id: "video-1",
  url: "https://www.youtube.com/watch?v=video-1",
  title: "Demo video",
});
assert.match(supadataMetadataDocuments[0].pageContent, /Demo video/);
assert.equal(supadataMetadataDocuments[0].metadata.platform, "youtube");

const iFixitListDocuments = loadIFixitGuideListDocuments([{
  guideid: 7,
  title: "Screen repair",
  category: "Tablet",
  subject: "Display",
  type: "replacement",
  url: "https://www.ifixit.com/Guide/7",
}]);
assert.match(iFixitListDocuments[0].pageContent, /Screen repair/);
assert.equal(iFixitListDocuments[0].metadata.source, "ifixit");
assert.equal(iFixitListDocuments[0].metadata.guideId, 7);

const iFixitGuideDocuments = loadIFixitGuideDocuments({
  guideid: 42,
  title: "Replace the battery",
  category: "Phone",
  subject: "Battery",
  type: "replacement",
  difficulty: "Easy",
  url: "https://www.ifixit.com/Guide/42",
  introduction_raw: "Use this guide.",
  tools: [{ name: "Spudger", quantity: 1 }],
  parts: [{ name: "Battery", quantity: 1 }],
  steps: [{ title: "Open the case", lines: [{ text_raw: "Remove two screws." }] }],
  conclusion_rendered: "<p>Reassemble in reverse order.</p>",
});
assert.match(iFixitGuideDocuments[0].pageContent, /Replace the battery/);
assert.match(iFixitGuideDocuments[0].pageContent, /Remove two screws/);
assert.equal(iFixitGuideDocuments[0].metadata.guideId, 42);
assert.equal(iFixitGuideDocuments[0].metadata.stepCount, 1);

const iFixitWikiDocuments = loadIFixitWikiDocuments({
  wikiid: 1198,
  langid: "en",
  namespace: "CATEGORY",
  title: "iPhone 4",
  display_title: "iPhone 4 Repair",
  summary: "Repair guides for iPhone 4.",
  contents_raw: "Background and identification text.",
  url: "https://www.ifixit.com/Device/iPhone_4",
  info: [{ name: "Manufacturer", value: "Apple" }],
});
assert.match(iFixitWikiDocuments[0].pageContent, /iPhone 4 Repair/);
assert.match(iFixitWikiDocuments[0].pageContent, /Background and identification/);
assert.equal(iFixitWikiDocuments[0].metadata.wikiId, 1198);

const iFixitSuggestionDocuments = loadIFixitSuggestionDocuments([{
  dataType: "wiki",
  wikiid: 6757,
  namespace: "CATEGORY",
  title: "iPhone 4 Verizon",
  display_title: "iPhone 4 CDMA Repair",
  summary: "CDMA version of the fourth generation iPhone.",
  url: "https://www.ifixit.com/Device/iPhone_4_Verizon",
}, {
  dataType: "guide",
  guideid: 449,
  title: "iPhone Display Replacement",
  category: "iPhone",
  summary: "Replace a cracked front panel.",
}]);
assert.match(iFixitSuggestionDocuments[0].pageContent, /iPhone 4 CDMA Repair/);
assert.equal(iFixitSuggestionDocuments[1].metadata.guideId, 449);

const iFixitDocumentDocuments = loadIFixitDocumentDocuments({
  documentid: 123,
  guid: "abc123-def456",
  filename: "example.pdf",
  title: "Example Document",
  summary: "This is a document summary",
  document_type: "pdf",
  document_extension: "pdf",
  size: 1048576,
  pages: 10,
  date: 1640995200,
  view_url: "https://ifixit.com/document/view",
  download_url: "https://ifixit.com/document/download",
});
assert.match(iFixitDocumentDocuments[0].pageContent, /Example Document/);
assert.match(iFixitDocumentDocuments[0].pageContent, /Download URL/);
assert.equal(iFixitDocumentDocuments[0].metadata.documentId, 123);
assert.equal(iFixitDocumentDocuments[0].metadata.downloadUrl, "https://ifixit.com/document/download");

const perplexitySearchDocuments = loadPerplexitySearchDocuments({
  id: "search-1",
  server_time: "2026-05-20T00:00:00Z",
  results: [{
    title: "Result",
    url: "https://example.com/result",
    snippet: "Search result snippet",
    date: "2026-05-19",
    last_updated: "2026-05-20",
  }],
});
assert.equal(perplexitySearchDocuments[0].pageContent, "Search result snippet");
assert.equal(perplexitySearchDocuments[0].metadata.url, "https://example.com/result");
assert.equal(perplexitySearchDocuments[0].metadata.lastUpdated, "2026-05-20");

const arxivFeed = parseArxivFeed(`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:arxiv="http://arxiv.org/schemas/atom">
  <title>ArXiv Query: search_query=all:electron</title>
  <opensearch:totalResults>1</opensearch:totalResults>
  <opensearch:startIndex>0</opensearch:startIndex>
  <opensearch:itemsPerPage>1</opensearch:itemsPerPage>
  <entry>
    <id>http://arxiv.org/abs/0704.0001v1</id>
    <updated>2007-05-23T00:00:00Z</updated>
    <published>2007-04-02T19:18:42Z</published>
    <title>A sample &amp; paper</title>
    <summary>Abstract text.</summary>
    <author><name>Ada Lovelace</name></author>
    <arxiv:primary_category term="cs.AI" />
    <category term="cs.AI" />
    <link href="http://arxiv.org/abs/0704.0001v1" rel="alternate" type="text/html" />
    <link title="pdf" href="http://arxiv.org/pdf/0704.0001v1" rel="related" type="application/pdf" />
  </entry>
</feed>`);
assert.equal(arxivFeed.totalResults, 1);
assert.equal(arxivFeed.entries[0].title, "A sample & paper");
assert.equal(arxivFeed.entries[0].pdfUrl, "http://arxiv.org/pdf/0704.0001v1");

assert.equal(voyageEmbeddingsTool.tool.name, "voyage_embeddings_create");
assert.equal(voyageRerankTool.tool.name, "voyage_rerank");
assert.equal(cerebrasChatCompletionsTool.tool.name, "cerebras_chat_completions_create");
assert.equal(fireworksCompletionsTool.tool.name, "fireworks_completions_create");
assert.equal(fireworksEmbeddingsTool.tool.name, "fireworks_embeddings_create");
assert.equal(deepInfraChatCompletionsTool.tool.name, "deepinfra_chat_completions_create");
assert.equal(deepInfraEmbeddingsTool.tool.name, "deepinfra_embeddings_create");
assert.equal(zhipuAiChatCompletionsTool.tool.name, "zhipuai_chat_completions_create");
assert.equal(zhipuAiEmbeddingsTool.tool.name, "zhipuai_embeddings_create");
assert.equal(moonshotChatCompletionsTool.tool.name, "moonshot_chat_completions_create");
assert.equal(dashScopeChatCompletionsTool.tool.name, "dashscope_chat_completions_create");
assert.equal(dashScopeEmbeddingsTool.tool.name, "dashscope_embeddings_create");
assert.equal(tencentHunyuanChatCompletionsTool.tool.name, "tencent_hunyuan_chat_completions_create");
assert.equal(volcengineDoubaoChatCompletionsTool.tool.name, "volcengine_doubao_chat_completions_create");
assert.equal(volcengineDoubaoEmbeddingsTool.tool.name, "volcengine_doubao_embeddings_create");
assert.equal(volcengineDoubaoResponsesTool.tool.name, "volcengine_doubao_responses_create");
assert.equal(miniMaxChatCompletionsTool.tool.name, "minimax_chat_completions_create");
assert.equal(miniMaxEmbeddingsTool.tool.name, "minimax_embeddings_create");
assert.equal(novitaChatCompletionsTool.tool.name, "novita_chat_completions_create");
assert.equal(friendliChatCompletionsTool.tool.name, "friendli_chat_completions_create");
assert.equal(sambaNovaChatCompletionsTool.tool.name, "sambanova_chat_completions_create");
assert.equal(sambaNovaCompletionsTool.tool.name, "sambanova_completions_create");
assert.equal(sambaNovaEmbeddingsTool.tool.name, "sambanova_embeddings_create");
assert.equal(premAiChatCompletionsTool.tool.name, "premai_chat_completions_create");
assert.equal(premAiEmbeddingsTool.tool.name, "premai_embeddings_create");
assert.equal(githubModelsChatCompletionsTool.tool.name, "github_models_chat_completions_create");
assert.equal(githubModelsEmbeddingsTool.tool.name, "github_models_embeddings_create");
assert.equal(huggingFaceEmbeddingsTool.tool.name, "huggingface_embeddings_create");
assert.equal(nvidiaNimChatCompletionsTool.tool.name, "nvidia_nim_chat_completions_create");
assert.equal(nvidiaNimEmbeddingsTool.tool.name, "nvidia_nim_embeddings_create");
assert.equal(nvidiaNimResponsesTool.tool.name, "nvidia_nim_responses_create");
assert.equal(tencentHunyuanEmbeddingsTool.tool.name, "tencent_hunyuan_embeddings_create");
assert.equal(upstageChatCompletionsTool.tool.name, "upstage_chat_completions_create");
assert.equal(upstageEmbeddingsTool.tool.name, "upstage_embeddings_create");
assert.equal(writerChatTool.tool.name, "writer_chat_create");
assert.equal(yandexFoundationCompletionTool.tool.name, "yandex_foundation_completion_create");
assert.equal(yandexFoundationTextEmbeddingTool.tool.name, "yandex_foundation_text_embedding_create");
assert.equal(pagerDutyListIncidentsTool.tool.name, "pagerduty_incidents_list");
assert.equal(pagerDutyGetIncidentTool.tool.name, "pagerduty_incident_get");
assert.equal(pagerDutyUpdateIncidentTool.tool.name, "pagerduty_incident_update");
assert.equal(pagerDutyCreateIncidentNoteTool.tool.name, "pagerduty_incident_note_create");
assert.equal(pagerDutyListServicesTool.tool.name, "pagerduty_services_list");
assert.equal(pagerDutyListUsersTool.tool.name, "pagerduty_users_list");
assert.equal(pagerDutySendEventTool.tool.name, "pagerduty_event_send");
assert.equal(replicatePredictionCreateTool.tool.name, "replicate_prediction_create");
assert.equal(replicateOfficialModelPredictionCreateTool.tool.name, "replicate_official_model_prediction_create");
assert.equal(replicateDeploymentPredictionCreateTool.tool.name, "replicate_deployment_prediction_create");
assert.equal(replicatePredictionGetTool.tool.name, "replicate_prediction_get");
assert.equal(replicatePredictionCancelTool.tool.name, "replicate_prediction_cancel");
assert.equal(salesforceSoqlQueryTool.tool.name, "salesforce_soql_query");
assert.equal(salesforceSobjectsListTool.tool.name, "salesforce_sobjects_list");
assert.equal(salesforceSobjectDescribeTool.tool.name, "salesforce_sobject_describe");
assert.equal(salesforceSobjectRecordGetTool.tool.name, "salesforce_sobject_record_get");
assert.equal(salesforceSobjectRecordCreateTool.tool.name, "salesforce_sobject_record_create");
assert.equal(salesforceSobjectRecordUpdateTool.tool.name, "salesforce_sobject_record_update");
assert.equal(salesforceSobjectRecordDeleteTool.tool.name, "salesforce_sobject_record_delete");
assert.equal(sendGridSendMailTool.tool.name, "sendgrid_mail_send");
assert.equal(sendGridListTemplatesTool.tool.name, "sendgrid_templates_list");
assert.equal(sendGridUpsertContactsTool.tool.name, "sendgrid_contacts_upsert");
assert.equal(sendGridSearchContactsByEmailTool.tool.name, "sendgrid_contacts_search_emails");
assert.equal(sendGridGetGlobalSuppressionTool.tool.name, "sendgrid_global_suppression_get");
assert.equal(sendGridAddGlobalSuppressionsTool.tool.name, "sendgrid_global_suppressions_add");
assert.equal(serviceNowListTableRecordsTool.tool.name, "servicenow_table_records_list");
assert.equal(serviceNowGetTableRecordTool.tool.name, "servicenow_table_record_get");
assert.equal(serviceNowCreateTableRecordTool.tool.name, "servicenow_table_record_create");
assert.equal(serviceNowUpdateTableRecordTool.tool.name, "servicenow_table_record_update");
assert.equal(serviceNowDeleteTableRecordTool.tool.name, "servicenow_table_record_delete");
assert.equal(ai21ChatCompletionsTool.tool.name, "ai21_chat_completions_create");
assert.equal(baiduQianfanAccessTokenCreateTool.tool.name, "baidu_qianfan_access_token_create");
assert.equal(baiduQianfanChatCompletionsTool.tool.name, "baidu_qianfan_chat_completions_create");
assert.equal(baiduQianfanEmbeddingsTool.tool.name, "baidu_qianfan_embeddings_create");
assert.equal(alephAlphaCompleteTool.tool.name, "aleph_alpha_complete");
assert.equal(alephAlphaChatTool.tool.name, "aleph_alpha_chat");
assert.equal(alephAlphaEmbeddingsTool.tool.name, "aleph_alpha_embeddings");
assert.equal(azureDynamicSessionsExecuteTool.tool.name, "azure_dynamic_sessions_execute");
assert.equal(azureDynamicSessionsFilesListTool.tool.name, "azure_dynamic_sessions_files_list");
assert.equal(awsBedrockKnowledgeBaseRetrieveTool.tool.name, "aws_bedrock_knowledge_base_retrieve");
assert.equal(awsBedrockKnowledgeBaseRetrieveAndGenerateTool.tool.name, "aws_bedrock_knowledge_base_retrieve_and_generate");
assert.equal(awsKendraRetrieveTool.tool.name, "aws_kendra_retrieve");
assert.equal(awsKendraQueryTool.tool.name, "aws_kendra_query");
assert.equal(awsStepFunctionsStartExecutionTool.tool.name, "aws_stepfunctions_start_execution");
assert.equal(awsStepFunctionsDescribeExecutionTool.tool.name, "aws_stepfunctions_describe_execution");
assert.equal(awsStepFunctionsSendTaskSuccessTool.tool.name, "aws_stepfunctions_send_task_success");
assert.equal(awsSageMakerInvokeEndpointTool.tool.name, "aws_sagemaker_invoke_endpoint");
assert.equal(contextualRerankTool.tool.name, "contextual_rerank");
assert.equal(jinaEmbeddingsTool.tool.name, "jina_embeddings_create");
assert.equal(jinaRerankTool.tool.name, "jina_rerank");
assert.equal(mixedbreadRerankTool.tool.name, "mixedbread_rerank");
assert.equal(nomicTextEmbeddingsTool.tool.name, "nomic_text_embeddings_create");
assert.equal(browserbaseCreateSessionTool.tool.name, "browserbase_session_create");
assert.equal(browserbaseListSessionsTool.tool.name, "browserbase_sessions_list");
assert.equal(browserbaseGetSessionTool.tool.name, "browserbase_session_get");
assert.equal(browserbaseCloseSessionTool.tool.name, "browserbase_session_close");
assert.equal(browserbaseGetSessionLiveUrlsTool.tool.name, "browserbase_session_live_urls_get");
assert.equal(browserbaseListSessionLogsTool.tool.name, "browserbase_session_logs_list");
assert.equal(browserbaseGetSessionRecordingTool.tool.name, "browserbase_session_recording_get");
assert.equal(browserbaseFetchTool.tool.name, "browserbase_fetch");
assert.equal(browserbaseSearchTool.tool.name, "browserbase_search");
assert.equal(databricksServingEndpointGetTool.tool.name, "databricks_serving_endpoint_get");
assert.equal(databricksServingInvokeTool.tool.name, "databricks_serving_invoke");
assert.equal(databricksChatCompletionsTool.tool.name, "databricks_chat_completions_create");
assert.equal(databricksCompletionsTool.tool.name, "databricks_completions_create");
assert.equal(databricksEmbeddingsTool.tool.name, "databricks_embeddings_create");
assert.equal(databricksVectorSearchQueryTool.tool.name, "databricks_vector_search_query");
assert.equal(databricksVectorSearchNextPageTool.tool.name, "databricks_vector_search_next_page");
assert.equal(elevenLabsTextToSpeechTool.tool.name, "elevenlabs_text_to_speech");
assert.equal(elevenLabsVoicesListTool.tool.name, "elevenlabs_voices_list");
assert.equal(composioToolsListTool.tool.name, "composio_tools_list");
assert.equal(composioToolGetTool.tool.name, "composio_tool_get");
assert.equal(composioToolExecuteTool.tool.name, "composio_tool_execute");
assert.equal(composioProxyExecuteTool.tool.name, "composio_proxy_execute");
assert.equal(alphaVantageExchangeRateTool.tool.name, "alpha_vantage_exchange_rate");
assert.equal(alphaVantageTimeSeriesDailyTool.tool.name, "alpha_vantage_time_series_daily");
assert.equal(alphaVantageTimeSeriesWeeklyTool.tool.name, "alpha_vantage_time_series_weekly");
assert.equal(alphaVantageQuoteTool.tool.name, "alpha_vantage_quote");
assert.equal(alphaVantageSymbolSearchTool.tool.name, "alpha_vantage_symbol_search");
assert.equal(alphaVantageNewsSentimentTool.tool.name, "alpha_vantage_news_sentiment");
assert.equal(alphaVantageTopGainersLosersTool.tool.name, "alpha_vantage_top_gainers_losers");
assert.equal(polygonAggregatesTool.tool.name, "polygon_aggregates");
assert.equal(polygonLastQuoteTool.tool.name, "polygon_last_quote");
assert.equal(polygonTickerNewsTool.tool.name, "polygon_ticker_news");
assert.equal(polygonFinancialsTool.tool.name, "polygon_financials");
assert.equal(googleFinanceSearchTool.tool.name, "google_finance_search");
assert.equal(googleFinanceMarketsTool.tool.name, "google_finance_markets");
assert.equal(githubGetRepoTool.tool.name, "github_get_repo");
assert.equal(githubListRepoIssuesTool.tool.name, "github_repo_issues_list");
assert.equal(githubGetIssueTool.tool.name, "github_issue_get");
assert.equal(githubCreateIssueTool.tool.name, "github_issue_create");
assert.equal(githubSearchIssuesTool.tool.name, "github_search_issues");
assert.equal(githubSearchCodeTool.tool.name, "github_search_code");
assert.equal(githubCreateIssueCommentTool.tool.name, "github_create_issue_comment");
assert.equal(githubListPullRequestsTool.tool.name, "github_pull_requests_list");
assert.equal(githubGetPullRequestTool.tool.name, "github_pull_request_get");
assert.equal(githubCreatePullRequestTool.tool.name, "github_pull_request_create");
assert.equal(githubListPullRequestFilesTool.tool.name, "github_pull_request_files_list");
assert.equal(githubListBranchesTool.tool.name, "github_branches_list");
assert.equal(githubCreateBranchTool.tool.name, "github_branch_create");
assert.equal(githubGetFileContentsTool.tool.name, "github_file_contents_get");
assert.equal(githubCreateOrUpdateFileTool.tool.name, "github_file_create_or_update");
assert.equal(githubDeleteFileTool.tool.name, "github_file_delete");
assert.equal(gitlabSearchTool.tool.name, "gitlab_search");
assert.equal(gitlabListProjectIssuesTool.tool.name, "gitlab_project_issues_list");
assert.equal(gitlabCreateIssueTool.tool.name, "gitlab_issue_create");
assert.equal(gitlabListMergeRequestsTool.tool.name, "gitlab_project_merge_requests_list");
assert.equal(gitlabCreateMergeRequestTool.tool.name, "gitlab_merge_request_create");
assert.equal(gitlabCreateNoteTool.tool.name, "gitlab_note_create");
assert.equal(gitlabCreateBranchTool.tool.name, "gitlab_branch_create");
assert.equal(gitlabGetRepositoryFileTool.tool.name, "gitlab_repository_file_get");
assert.equal(gitlabCreateRepositoryFileTool.tool.name, "gitlab_repository_file_create");
assert.equal(gitlabUpdateRepositoryFileTool.tool.name, "gitlab_repository_file_update");
assert.equal(googleYoutubeSearchTool.tool.name, "google_youtube_search");
assert.equal(hubspotListCrmObjectsTool.tool.name, "hubspot_crm_objects_list");
assert.equal(hubspotSearchCrmObjectsTool.tool.name, "hubspot_crm_objects_search");
assert.equal(hubspotGetCrmObjectTool.tool.name, "hubspot_crm_object_get");
assert.equal(hubspotCreateCrmObjectTool.tool.name, "hubspot_crm_object_create");
assert.equal(hubspotUpdateCrmObjectTool.tool.name, "hubspot_crm_object_update");
assert.equal(hubspotBatchReadCrmObjectsTool.tool.name, "hubspot_crm_objects_batch_read");
assert.equal(hubspotAssociateCrmObjectTool.tool.name, "hubspot_crm_object_associate");
assert.equal(ibmWatsonxChatTool.tool.name, "ibm_watsonx_chat");
assert.equal(ibmWatsonxEmbeddingsTool.tool.name, "ibm_watsonx_embeddings");
assert.equal(jiraJqlSearchTool.tool.name, "jira_jql_search");
assert.equal(jiraGetIssueTool.tool.name, "jira_issue_get");
assert.equal(jiraCreateIssueTool.tool.name, "jira_issue_create");
assert.equal(jiraAddIssueCommentTool.tool.name, "jira_issue_comment_add");
assert.equal(jiraTransitionIssueTool.tool.name, "jira_issue_transition");
assert.equal(confluenceListPagesTool.tool.name, "confluence_pages_list");
assert.equal(confluenceGetPageTool.tool.name, "confluence_page_get");
assert.equal(confluenceCreatePageTool.tool.name, "confluence_page_create");
assert.equal(confluenceUpdatePageTool.tool.name, "confluence_page_update");
assert.equal(notionSearchTool.tool.name, "notion_search");
assert.equal(notionGetPageTool.tool.name, "notion_page_get");
assert.equal(notionCreatePageTool.tool.name, "notion_page_create");
assert.equal(notionUpdatePageTool.tool.name, "notion_page_update");
assert.equal(notionListBlockChildrenTool.tool.name, "notion_block_children_list");
assert.equal(notionAppendBlockChildrenTool.tool.name, "notion_block_children_append");
assert.equal(shopifyAdminGraphQLTool.tool.name, "shopify_admin_graphql");
assert.equal(shopifyListProductsTool.tool.name, "shopify_products_list");
assert.equal(shopifyGetProductTool.tool.name, "shopify_product_get");
assert.equal(shopifyListOrdersTool.tool.name, "shopify_orders_list");
assert.equal(shopifyGetOrderTool.tool.name, "shopify_order_get");
assert.equal(shopifySearchCustomersTool.tool.name, "shopify_customers_search");
assert.equal(shopifyGetCustomerTool.tool.name, "shopify_customer_get");
assert.equal(slackPostMessageTool.tool.name, "slack_post_message");
assert.equal(slackScheduleMessageTool.tool.name, "slack_message_schedule");
assert.equal(slackConversationsListTool.tool.name, "slack_conversations_list");
assert.equal(slackConversationInfoTool.tool.name, "slack_conversation_info");
assert.equal(slackConversationHistoryTool.tool.name, "slack_conversation_history");
assert.equal(slackConversationRepliesTool.tool.name, "slack_conversation_replies");
assert.equal(slackGetPermalinkTool.tool.name, "slack_message_permalink_get");
assert.equal(slackUserInfoTool.tool.name, "slack_user_info");
assert.equal(slackSearchMessagesTool.tool.name, "slack_messages_search");
assert.equal(stripeListResourceTool.tool.name, "stripe_resource_list");
assert.equal(stripeListCustomersTool.tool.name, "stripe_customers_list");
assert.equal(stripeGetCustomerTool.tool.name, "stripe_customer_get");
assert.equal(stripeCreateCustomerTool.tool.name, "stripe_customer_create");
assert.equal(stripeUpdateCustomerTool.tool.name, "stripe_customer_update");
assert.equal(stripeCreatePaymentIntentTool.tool.name, "stripe_payment_intent_create");
assert.equal(stripeCreateCheckoutSessionTool.tool.name, "stripe_checkout_session_create");
assert.equal(stripeGetCheckoutSessionTool.tool.name, "stripe_checkout_session_get");
assert.equal(zendeskSearchTool.tool.name, "zendesk_search");
assert.equal(zendeskListTicketsTool.tool.name, "zendesk_tickets_list");
assert.equal(zendeskGetTicketTool.tool.name, "zendesk_ticket_get");
assert.equal(zendeskCreateTicketTool.tool.name, "zendesk_ticket_create");
assert.equal(zendeskUpdateTicketTool.tool.name, "zendesk_ticket_update");
assert.equal(zendeskListTicketCommentsTool.tool.name, "zendesk_ticket_comments_list");
assert.equal(zendeskListUsersTool.tool.name, "zendesk_users_list");
assert.equal(zendeskCreateOrUpdateUserTool.tool.name, "zendesk_user_create_or_update");
assert.equal(todoistListProjectsTool.tool.name, "todoist_projects_list");
assert.equal(todoistListTasksTool.tool.name, "todoist_tasks_list");
assert.equal(todoistGetTaskTool.tool.name, "todoist_task_get");
assert.equal(todoistCreateTaskTool.tool.name, "todoist_task_create");
assert.equal(todoistUpdateTaskTool.tool.name, "todoist_task_update");
assert.equal(todoistCloseTaskTool.tool.name, "todoist_task_close");
assert.equal(todoistReopenTaskTool.tool.name, "todoist_task_reopen");
assert.equal(todoistListCommentsTool.tool.name, "todoist_comments_list");
assert.equal(todoistCreateCommentTool.tool.name, "todoist_comment_create");
assert.equal(dropboxListFolderTool.tool.name, "dropbox_files_list_folder");
assert.equal(dropboxSearchFilesTool.tool.name, "dropbox_files_search");
assert.equal(dropboxGetTemporaryLinkTool.tool.name, "dropbox_temporary_link_get");
assert.equal(dropboxCreateFolderTool.tool.name, "dropbox_folder_create");
assert.equal(dropboxUploadTextFileTool.tool.name, "dropbox_file_upload_text");
assert.equal(dropboxDeleteFileOrFolderTool.tool.name, "dropbox_file_or_folder_delete");
assert.equal(dropboxMoveFileOrFolderTool.tool.name, "dropbox_file_or_folder_move");
assert.equal(trelloListMemberBoardsTool.tool.name, "trello_member_boards_list");
assert.equal(trelloListBoardListsTool.tool.name, "trello_board_lists_list");
assert.equal(trelloListBoardCardsTool.tool.name, "trello_board_cards_list");
assert.equal(trelloCreateCardTool.tool.name, "trello_card_create");
assert.equal(trelloUpdateCardTool.tool.name, "trello_card_update");
assert.equal(trelloAddCardCommentTool.tool.name, "trello_card_comment_add");
assert.equal(linearGraphQLTool.tool.name, "linear_graphql");
assert.equal(linearTeamsListTool.tool.name, "linear_teams_list");
assert.equal(linearGetIssueTool.tool.name, "linear_issue_get");
assert.equal(linearCreateIssueTool.tool.name, "linear_issue_create");
assert.equal(linearUpdateIssueTool.tool.name, "linear_issue_update");
assert.equal(linearCreateCommentTool.tool.name, "linear_comment_create");
assert.equal(microsoftGraphRequestTool.tool.name, "microsoft_graph_request");
assert.equal(microsoftGraphListMessagesTool.tool.name, "microsoft_graph_messages_list");
assert.equal(microsoftGraphSendMailTool.tool.name, "microsoft_graph_mail_send");
assert.equal(microsoftGraphListCalendarEventsTool.tool.name, "microsoft_graph_calendar_events_list");
assert.equal(microsoftGraphCreateCalendarEventTool.tool.name, "microsoft_graph_calendar_event_create");
assert.equal(microsoftGraphListDriveChildrenTool.tool.name, "microsoft_graph_drive_children_list");
assert.equal(mondayGraphQLTool.tool.name, "monday_graphql");
assert.equal(mondayListBoardsTool.tool.name, "monday_boards_list");
assert.equal(mondayGetBoardItemsTool.tool.name, "monday_board_items_get");
assert.equal(mondayCreateItemTool.tool.name, "monday_item_create");
assert.equal(mondayChangeColumnValuesTool.tool.name, "monday_item_column_values_change");
assert.equal(mondayCreateUpdateTool.tool.name, "monday_update_create");
assert.equal(neo4jCypherQueryTool.tool.name, "neo4j_cypher_query");
assert.equal(neo4jSchemaGetTool.tool.name, "neo4j_schema_get");
assert.equal(neo4jVectorIndexCreateTool.tool.name, "neo4j_vector_index_create");
assert.equal(neo4jVectorQueryTool.tool.name, "neo4j_vector_query");
assert.equal(neo4jDocumentsUpsertTool.tool.name, "neo4j_documents_upsert");
assert.equal(asanaListProjectsTool.tool.name, "asana_projects_list");
assert.equal(asanaListProjectTasksTool.tool.name, "asana_project_tasks_list");
assert.equal(asanaSearchWorkspaceTasksTool.tool.name, "asana_workspace_tasks_search");
assert.equal(asanaGetTaskTool.tool.name, "asana_task_get");
assert.equal(asanaCreateTaskTool.tool.name, "asana_task_create");
assert.equal(asanaUpdateTaskTool.tool.name, "asana_task_update");
assert.equal(asanaAddTaskCommentTool.tool.name, "asana_task_comment_add");
assert.equal(airtableListRecordsTool.tool.name, "airtable_records_list");
assert.equal(airtableGetRecordTool.tool.name, "airtable_record_get");
assert.equal(airtableCreateRecordsTool.tool.name, "airtable_records_create");
assert.equal(airtableUpdateRecordsTool.tool.name, "airtable_records_update");
assert.equal(airtableDeleteRecordTool.tool.name, "airtable_record_delete");
assert.equal(arxivSearchTool.tool.name, "arxiv_search");
assert.equal(semanticScholarPaperSearchTool.tool.name, "semantic_scholar_paper_search");
assert.equal(semanticScholarPaperGetTool.tool.name, "semantic_scholar_paper_get");
assert.equal(pubMedSearchTool.tool.name, "pubmed_search");
assert.equal(openWeatherMapCurrentWeatherTool.tool.name, "openweathermap_current_weather");
assert.equal(openWeatherMapForecastTool.tool.name, "openweathermap_forecast");
assert.equal(nasaApodTool.tool.name, "nasa_apod");
assert.equal(nasaMarsRoverPhotosTool.tool.name, "nasa_mars_rover_photos");
assert.equal(tmdbMovieSearchTool.tool.name, "tmdb_movie_search");
assert.equal(tmdbMovieDetailsTool.tool.name, "tmdb_movie_details");
assert.equal(googleTextToSpeechSynthesizeTool.tool.name, "google_text_to_speech_synthesize");
assert.equal(googleTextToSpeechVoicesListTool.tool.name, "google_text_to_speech_voices_list");
assert.equal(bingWebSearchTool.tool.name, "bing_web_search");
assert.equal(perplexitySearchTool.tool.name, "perplexity_search");
assert.equal(mojeekSearchTool.tool.name, "mojeek_search");
assert.equal(parallelSearchTool.tool.name, "parallel_search");
assert.equal(parallelExtractTool.tool.name, "parallel_extract");
assert.equal(nimbleSearchTool.tool.name, "nimble_search");
assert.equal(googleSerperSearchTool.tool.name, "google_serper_search");
assert.equal(jinaSearchTool.tool.name, "jina_search");
assert.equal(linkupSearchTool.tool.name, "linkup_search");
assert.equal(googleScholarSearchTool.tool.name, "google_scholar_search");
assert.equal(googleTrendsSearchTool.tool.name, "google_trends_search");
assert.equal(googleJobsSearchTool.tool.name, "google_jobs_search");
assert.equal(dataForSeoSerpSearchTool.tool.name, "dataforseo_serp_search");
assert.equal(dataForSeoKeywordSuggestionsTool.tool.name, "dataforseo_keyword_suggestions");
assert.equal(dappierRealTimeSearchTool.tool.name, "dappier_real_time_search");
assert.equal(valyuSearchTool.tool.name, "valyu_search");
assert.equal(decodoScrapeTool.tool.name, "decodo_scrape");
assert.equal(typeformListFormsTool.tool.name, "typeform_forms_list");
assert.equal(typeformGetFormTool.tool.name, "typeform_form_get");
assert.equal(typeformCreateFormTool.tool.name, "typeform_form_create");
assert.equal(typeformUpdateFormTool.tool.name, "typeform_form_update");
assert.equal(typeformListResponsesTool.tool.name, "typeform_responses_list");
assert.equal(twilioSendMessageTool.tool.name, "twilio_message_send");
assert.equal(twilioListMessagesTool.tool.name, "twilio_messages_list");
assert.equal(twilioGetMessageTool.tool.name, "twilio_message_get");
assert.equal(twilioCreateCallTool.tool.name, "twilio_call_create");
assert.equal(twilioListCallsTool.tool.name, "twilio_calls_list");
assert.equal(twilioSearchAvailablePhoneNumbersTool.tool.name, "twilio_available_phone_numbers_search");
assert.equal(textSplitDocumentsTool.tool.name, "text_split_documents");
assert.equal(htmlToTextDocumentsTool.tool.name, "html_to_text_documents");
assert.equal(htmlReadabilityDocumentsTool.tool.name, "html_readability_documents");
assert.equal(googleCloudStorageObjectLoaderTool.tool.name, "google_cloud_storage_object_load");
assert.equal(azureBlobFileLoaderTool.tool.name, "azure_blob_file_load");
assert.equal(awsS3ObjectLoaderTool.tool.name, "aws_s3_object_load");
assert.equal(firecrawlLoaderTool.tool.name, "firecrawl_load");
assert.equal(parallelExtractLoaderTool.tool.name, "parallel_extract_load");
assert.equal(supadataTranscriptLoaderTool.tool.name, "supadata_transcript_load");
assert.equal(supadataMetadataLoaderTool.tool.name, "supadata_metadata_load");
assert.equal(sonioxTranscriptLoaderTool.tool.name, "soniox_transcript_load");
assert.equal(youtubeTranscriptLoaderTool.tool.name, "youtube_transcript_load");
assert.equal(cheerioWebLoaderTool.tool.name, "cheerio_web_load");
assert.equal(recursiveUrlLoaderTool.tool.name, "recursive_url_load");
assert.equal(notionMarkdownExportLoaderTool.tool.name, "notion_markdown_export_load");
assert.equal(imsdbScriptLoaderTool.tool.name, "imsdb_script_load");
assert.equal(collegeConfidentialLoaderTool.tool.name, "college_confidential_load");
assert.equal(slackConversationLoaderTool.tool.name, "slack_conversation_load");
assert.equal(discordChannelMessagesLoaderTool.tool.name, "discord_channel_messages_load");
assert.equal(githubRepositoryLoaderTool.tool.name, "github_repository_load");
assert.equal(serpApiSearchLoaderTool.tool.name, "serpapi_search_load");
assert.equal(searchApiSearchLoaderTool.tool.name, "searchapi_search_load");
assert.equal(salesforceSoqlLoaderTool.tool.name, "salesforce_soql_load");
assert.equal(hubSpotCrmObjectsLoaderTool.tool.name, "hubspot_crm_objects_load");
assert.equal(stripeResourceLoaderTool.tool.name, "stripe_resource_load");
assert.equal(shopifyResourceLoaderTool.tool.name, "shopify_resource_load");
assert.equal(zendeskSupportLoaderTool.tool.name, "zendesk_support_load");
assert.equal(typeformResourceLoaderTool.tool.name, "typeform_resource_load");
assert.equal(serviceNowTableRecordsLoaderTool.tool.name, "servicenow_table_records_load");
assert.equal(rssFeedLoaderTool.tool.name, "rss_feed_load");
assert.equal(markdownDocumentLoaderTool.tool.name, "markdown_document_load");
assert.equal(iFixitGuidesLoaderTool.tool.name, "ifixit_guides_load");
assert.equal(iFixitGuideLoaderTool.tool.name, "ifixit_guide_load");
assert.equal(iFixitWikiLoaderTool.tool.name, "ifixit_wiki_load");
assert.equal(iFixitSuggestLoaderTool.tool.name, "ifixit_suggest_load");
assert.equal(iFixitDocumentLoaderTool.tool.name, "ifixit_document_load");
assert.equal(perplexitySearchRetrieverTool.tool.name, "perplexity_search_retrieve");
assert.equal(hydeRetrieverTool.tool.name, "hyde_retrieve");
assert.equal(bm25RetrieverTool.tool.name, "bm25_retrieve");
assert.equal(timeWeightedRetrieverTool.tool.name, "time_weighted_retrieve");
assert.equal(rerankDocumentsTool.tool.name, "rerank_documents");
assert.equal(alchemystContextRetrieverTool.tool.name, "alchemyst_context_retrieve");
assert.equal(azionEdgeSqlRetrieverTool.tool.name, "azion_edgesql_retrieve");
assert.equal(driaRetrieverTool.tool.name, "dria_retrieve");
assert.equal(braveSearchRetrieverTool.tool.name, "brave_search_retrieve");
assert.equal(bingWebSearchRetrieverTool.tool.name, "bing_web_search_retrieve");
assert.equal(googleSerperSearchRetrieverTool.tool.name, "google_serper_search_retrieve");
assert.equal(serpApiSearchRetrieverTool.tool.name, "serpapi_search_retrieve");
assert.equal(chaindeskRetrieverTool.tool.name, "chaindesk_retrieve");
assert.equal(chatGptPluginRetrieverTool.tool.name, "chatgpt_plugin_retrieve");
assert.equal(dappierAiRecommendationsRetrieverTool.tool.name, "dappier_ai_recommendations_retrieve");
assert.equal(valyuSearchRetrieverTool.tool.name, "valyu_search_retrieve");
assert.equal(googleScholarSearchRetrieverTool.tool.name, "google_scholar_search_retrieve");
assert.equal(semanticScholarSearchRetrieverTool.tool.name, "semantic_scholar_search_retrieve");
assert.equal(metalRetrieverTool.tool.name, "metal_retrieve");
assert.equal(wolframAlphaQueryRetrieverTool.tool.name, "wolfram_alpha_query_retrieve");
assert.equal(duckDuckGoInstantAnswerRetrieverTool.tool.name, "duckduckgo_instant_answer_retrieve");
assert.equal(searxngSearchRetrieverTool.tool.name, "searxng_search_retrieve");
assert.equal(stackExchangeSearchRetrieverTool.tool.name, "stackexchange_search_retrieve");
assert.equal(youComSearchRetrieverTool.tool.name, "you_com_search_retrieve");
assert.equal(linkupSearchRetrieverTool.tool.name, "linkup_search_retrieve");
assert.equal(mojeekSearchRetrieverTool.tool.name, "mojeek_search_retrieve");
assert.equal(parallelSearchRetrieverTool.tool.name, "parallel_search_retrieve");
assert.equal(nimbleSearchRetrieverTool.tool.name, "nimble_search_retrieve");
assert.equal(pubMedSearchRetrieverTool.tool.name, "pubmed_search_retrieve");
assert.equal(wikipediaSearchRetrieverTool.tool.name, "wikipedia_search_retrieve");
assert.equal(arxivSearchRetrieverTool.tool.name, "arxiv_search_retrieve");
assert.equal(tavilySearchRetrieverTool.tool.name, "tavily_search_retrieve");
assert.equal(exaSearchRetrieverTool.tool.name, "exa_search_retrieve");
assert.equal(vespaRetrieverTool.tool.name, "vespa_retrieve");
assert.equal(meilisearchRetrieverTool.tool.name, "meilisearch_retrieve");
assert.equal(supabaseHybridRetrieverTool.tool.name, "supabase_hybrid_retrieve");
assert.equal(zepMemoryRetrieverTool.tool.name, "zep_memory_retrieve");
assert.equal(zepCloudGraphSearchRetrieverTool.tool.name, "zep_cloud_graph_retrieve");
assert.equal(bedrockKnowledgeBaseRetrieverTool.tool.name, "bedrock_knowledge_base_retrieve");
assert.equal(amazonKendraRetrieveRetrieverTool.tool.name, "amazon_kendra_retrieve");
assert.equal(amazonKendraQueryRetrieverTool.tool.name, "amazon_kendra_query_retrieve");
assert.equal(pineconeEmbeddingsTool.tool.name, "pinecone_embeddings_create");
assert.equal(pineconeRerankTool.tool.name, "pinecone_rerank");
assert.equal(azureCosmosDbNoSqlDocumentUpsertTool.tool.name, "azure_cosmosdb_nosql_document_upsert");
assert.equal(azureCosmosDbNoSqlQueryTool.tool.name, "azure_cosmosdb_nosql_query");
assert.equal(azureCosmosDbNoSqlDocumentDeleteTool.tool.name, "azure_cosmosdb_nosql_document_delete");
assert.equal(azionEdgeSqlVectorsAddTool.tool.name, "azion_edgesql_vectors_add");
assert.equal(azionEdgeSqlVectorSearchTool.tool.name, "azion_edgesql_vector_search");
assert.equal(azionEdgeSqlDeleteTool.tool.name, "azion_edgesql_delete");
assert.equal(clickHouseInsertTool.tool.name, "clickhouse_insert");
assert.equal(clickHouseVectorSearchTool.tool.name, "clickhouse_vector_search");
assert.equal(clickHouseDeleteTool.tool.name, "clickhouse_delete");
assert.equal(turbopufferWriteTool.tool.name, "turbopuffer_write");
assert.equal(turbopufferQueryTool.tool.name, "turbopuffer_query");
assert.equal(rocksetQueryTool.tool.name, "rockset_query");
assert.equal(rocksetDocumentsAddTool.tool.name, "rockset_documents_add");
assert.equal(rocksetDocumentsDeleteTool.tool.name, "rockset_documents_delete");
assert.equal(typesenseDocumentsImportTool.tool.name, "typesense_documents_import");
assert.equal(typesenseVectorSearchTool.tool.name, "typesense_vector_search");
assert.equal(supabaseVectorUpsertTool.tool.name, "supabase_vector_upsert");
assert.equal(supabaseVectorMatchTool.tool.name, "supabase_vector_match");
assert.equal(astraDbInsertManyTool.tool.name, "astra_db_insert_many");
assert.equal(astraDbFindTool.tool.name, "astra_db_find");
assert.equal(vectaraDocumentIndexTool.tool.name, "vectara_document_index");
assert.equal(vectaraCorpusQueryTool.tool.name, "vectara_corpus_query");
assert.equal(xataVectorsAddTool.tool.name, "xata_vectors_add");
assert.equal(xataVectorSearchTool.tool.name, "xata_vector_search");
assert.equal(couchbaseSearchQueryTool.tool.name, "couchbase_search_query");
assert.equal(couchbaseQueryExecuteTool.tool.name, "couchbase_query_execute");
assert.equal(meilisearchDocumentsAddTool.tool.name, "meilisearch_documents_add");
assert.equal(meilisearchSearchTool.tool.name, "meilisearch_search");
assert.equal(vespaDocumentPutTool.tool.name, "vespa_document_put");
assert.equal(vespaQueryTool.tool.name, "vespa_query");
assert.equal(togetherCompletionsTool.tool.name, "together_completions_create");
assert.equal(togetherRerankTool.tool.name, "together_rerank");

const baiduHttpCalls = [];
const baiduRuntime = {
  async http(url, options) {
    baiduHttpCalls.push({ url, options });
    if (url.includes("/oauth/2.0/token")) {
      return { status: 200, headers: {}, body: { access_token: "baidu-access-token" } };
    }
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Baidu nested tool call");
  },
};

await baiduQianfanAccessTokenCreateTool.run({
  apiKey: { value: "baidu-api-key" },
  secretKey: { value: "baidu-secret-key" },
}, baiduRuntime);
assert.equal(baiduHttpCalls[0].url, "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=baidu-api-key&client_secret=baidu-secret-key");
assert.equal(baiduHttpCalls[0].options.method, "POST");

await baiduQianfanChatCompletionsTool.run({
  accessToken: { value: "baidu-access-token" },
  messages: [{ role: "user", content: "Hello" }],
  model: "ernie-4.5-turbo-128k",
  temperature: 0.2,
}, baiduRuntime);
assert.equal(baiduHttpCalls[1].url, "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=baidu-access-token");
assert.equal(baiduHttpCalls[1].options.method, "POST");
assert.equal(baiduHttpCalls[1].options.headers["content-type"], "application/json");
assert.equal(baiduHttpCalls[1].options.body.model, "ernie-4.5-turbo-128k");
assert.equal(baiduHttpCalls[1].options.body.messages[0].content, "Hello");
assert.equal(baiduHttpCalls[1].options.body.temperature, 0.2);

await baiduQianfanEmbeddingsTool.run({
  accessToken: { value: "baidu-access-token" },
  input: ["hello"],
  model: "Embedding-V1",
}, baiduRuntime);
assert.equal(baiduHttpCalls[2].url, "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/embeddings/embedding-v1?access_token=baidu-access-token");
assert.equal(baiduHttpCalls[2].options.method, "POST");
assert.equal(baiduHttpCalls[2].options.body.input[0], "hello");
assert.equal(baiduHttpCalls[2].options.body.model, "Embedding-V1");

const alephAlphaHttpCalls = [];
const alephAlphaRuntime = {
  async http(url, options) {
    alephAlphaHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Aleph Alpha nested tool call");
  },
};

await alephAlphaCompleteTool.run({
  apiKey: { value: "aleph-alpha-key" },
  model: "pharia-1-llm-7b-control",
  prompt: "Write one sentence.",
  maximumTokens: 32,
  temperature: 0.1,
  nice: true,
  hosting: "aleph-alpha",
  tags: ["chidori-smoke"],
}, alephAlphaRuntime);
assert.equal(alephAlphaHttpCalls[0].url, "https://api.aleph-alpha.com/complete?nice=true");
assert.equal(alephAlphaHttpCalls[0].options.method, "POST");
assert.equal(alephAlphaHttpCalls[0].options.headers.Authorization, "Bearer aleph-alpha-key");
assert.equal(alephAlphaHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(alephAlphaHttpCalls[0].options.body.model, "pharia-1-llm-7b-control");
assert.equal(alephAlphaHttpCalls[0].options.body.prompt[0].type, "text");
assert.equal(alephAlphaHttpCalls[0].options.body.prompt[0].data, "Write one sentence.");
assert.equal(alephAlphaHttpCalls[0].options.body.maximum_tokens, 32);
assert.equal(alephAlphaHttpCalls[0].options.body.temperature, 0.1);
assert.equal(alephAlphaHttpCalls[0].options.body.hosting, "aleph-alpha");
assert.equal(alephAlphaHttpCalls[0].options.body.tags[0], "chidori-smoke");

await alephAlphaChatTool.run({
  apiKey: { value: "aleph-alpha-key" },
  model: "pharia-1-llm-7b-control",
  messages: [{ role: "user", content: "Hello" }],
  maximumTokens: 64,
  topP: 0.9,
  responseFormat: { type: "json_object" },
  parallelToolCalls: false,
}, alephAlphaRuntime);
assert.equal(alephAlphaHttpCalls[1].url, "https://api.aleph-alpha.com/chat");
assert.equal(alephAlphaHttpCalls[1].options.method, "POST");
assert.equal(alephAlphaHttpCalls[1].options.headers.Authorization, "Bearer aleph-alpha-key");
assert.equal(alephAlphaHttpCalls[1].options.body.model, "pharia-1-llm-7b-control");
assert.equal(alephAlphaHttpCalls[1].options.body.messages[0].content, "Hello");
assert.equal(alephAlphaHttpCalls[1].options.body.maximum_tokens, 64);
assert.equal(alephAlphaHttpCalls[1].options.body.top_p, 0.9);
assert.equal(alephAlphaHttpCalls[1].options.body.response_format.type, "json_object");
assert.equal(alephAlphaHttpCalls[1].options.body.parallel_tool_calls, false);

await alephAlphaEmbeddingsTool.run({
  apiKey: { value: "aleph-alpha-key" },
  model: "pharia-1-embedding-4608-control",
  input: ["hello", "world"],
  dimensions: 256,
  encodingFormat: "float",
}, alephAlphaRuntime);
assert.equal(alephAlphaHttpCalls[2].url, "https://api.aleph-alpha.com/embeddings");
assert.equal(alephAlphaHttpCalls[2].options.method, "POST");
assert.equal(alephAlphaHttpCalls[2].options.headers.Authorization, "Bearer aleph-alpha-key");
assert.equal(alephAlphaHttpCalls[2].options.body.model, "pharia-1-embedding-4608-control");
assert.equal(alephAlphaHttpCalls[2].options.body.input[0], "hello");
assert.equal(alephAlphaHttpCalls[2].options.body.dimensions, 256);
assert.equal(alephAlphaHttpCalls[2].options.body.encoding_format, "float");

const awsHttpCalls = [];
const awsRuntime = {
  async http(url, options) {
    awsHttpCalls.push({ url, options });
    return { status: 200, headers: { "content-type": "application/json" }, body: { generated_text: "Hello" } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected AWS nested tool call");
  },
};

await awsSageMakerInvokeEndpointTool.run({
  endpointName: "jumpstart-llm",
  body: { inputs: "Hello" },
  region: "us-west-2",
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  securityToken: { value: "session-token" },
  targetModel: "model.tar.gz",
  targetVariant: "AllTraffic",
  inferenceId: "inference-1",
  sessionId: "NEW_SESSION",
}, awsRuntime);
assert.equal(awsHttpCalls[0].url, "https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/jumpstart-llm/invocations");
assert.equal(awsHttpCalls[0].options.method, "POST");
assert.equal(awsHttpCalls[0].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");
assert.equal(awsHttpCalls[0].options.headers["X-Amz-Date"], "20260520T120000Z");
assert.equal(awsHttpCalls[0].options.headers["X-Amz-Security-Token"], "session-token");
assert.equal(awsHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(awsHttpCalls[0].options.headers.Accept, "application/json");
assert.equal(awsHttpCalls[0].options.headers["X-Amzn-SageMaker-Target-Model"], "model.tar.gz");
assert.equal(awsHttpCalls[0].options.headers["X-Amzn-SageMaker-Target-Variant"], "AllTraffic");
assert.equal(awsHttpCalls[0].options.headers["X-Amzn-SageMaker-Inference-Id"], "inference-1");
assert.equal(awsHttpCalls[0].options.headers["X-Amzn-SageMaker-Session-Id"], "NEW_SESSION");
assert.equal(awsHttpCalls[0].options.body.inputs, "Hello");

await awsBedrockKnowledgeBaseRetrieveTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  securityToken: { value: "session-token" },
  region: "us-west-2",
  knowledgeBaseId: "KB12345678",
  query: "What is Chidori?",
  retrievalConfiguration: {
    vectorSearchConfiguration: {
      numberOfResults: 4,
      overrideSearchType: "HYBRID",
    },
  },
}, awsRuntime);
assert.equal(awsHttpCalls[1].url, "https://bedrock-agent-runtime.us-west-2.amazonaws.com/knowledgebases/KB12345678/retrieve");
assert.equal(awsHttpCalls[1].options.method, "POST");
assert.equal(awsHttpCalls[1].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");
assert.equal(awsHttpCalls[1].options.headers["X-Amz-Date"], "20260520T120000Z");
assert.equal(awsHttpCalls[1].options.headers["X-Amz-Security-Token"], "session-token");
assert.equal(awsHttpCalls[1].options.body.retrievalQuery.text, "What is Chidori?");
assert.equal(awsHttpCalls[1].options.body.retrievalConfiguration.vectorSearchConfiguration.numberOfResults, 4);
assert.equal(awsHttpCalls[1].options.body.retrievalConfiguration.vectorSearchConfiguration.overrideSearchType, "HYBRID");

await awsBedrockKnowledgeBaseRetrieveAndGenerateTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-west-2",
  inputText: "Explain the architecture",
  knowledgeBaseId: "KB12345678",
  modelArn: "arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
  retrievalConfiguration: {
    vectorSearchConfiguration: {
      numberOfResults: 3,
    },
  },
  generationConfiguration: {
    inferenceConfig: {
      textInferenceConfig: {
        maxTokens: 512,
      },
    },
  },
}, awsRuntime);
assert.equal(awsHttpCalls[2].url, "https://bedrock-agent-runtime.us-west-2.amazonaws.com/retrieveAndGenerate");
assert.equal(awsHttpCalls[2].options.method, "POST");
assert.equal(awsHttpCalls[2].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");
assert.equal(awsHttpCalls[2].options.body.input.text, "Explain the architecture");
assert.equal(awsHttpCalls[2].options.body.retrieveAndGenerateConfiguration.type, "KNOWLEDGE_BASE");
assert.equal(awsHttpCalls[2].options.body.retrieveAndGenerateConfiguration.knowledgeBaseConfiguration.knowledgeBaseId, "KB12345678");
assert.equal(awsHttpCalls[2].options.body.retrieveAndGenerateConfiguration.knowledgeBaseConfiguration.retrievalConfiguration.vectorSearchConfiguration.numberOfResults, 3);

await awsKendraRetrieveTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  securityToken: { value: "session-token" },
  region: "us-east-2",
  indexId: "12345678-1234-1234-1234-123456789012",
  queryText: "What is Chidori?",
  pageSize: 5,
  requestedDocumentAttributes: ["_source_uri", "_document_title"],
  attributeFilter: {
    EqualsTo: {
      Key: "department",
      Value: { StringValue: "engineering" },
    },
  },
}, awsRuntime);
assert.equal(awsHttpCalls[3].url, "https://kendra.us-east-2.amazonaws.com");
assert.equal(awsHttpCalls[3].options.method, "POST");
assert.equal(awsHttpCalls[3].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");
assert.equal(awsHttpCalls[3].options.headers["X-Amz-Date"], "20260520T120000Z");
assert.equal(awsHttpCalls[3].options.headers["X-Amz-Security-Token"], "session-token");
assert.equal(awsHttpCalls[3].options.headers["content-type"], "application/x-amz-json-1.1");
assert.equal(awsHttpCalls[3].options.headers["X-Amz-Target"], "com.amazonaws.kendra.AWSKendraFrontendService.Retrieve");
assert.equal(awsHttpCalls[3].options.body.IndexId, "12345678-1234-1234-1234-123456789012");
assert.equal(awsHttpCalls[3].options.body.QueryText, "What is Chidori?");
assert.equal(awsHttpCalls[3].options.body.PageSize, 5);
assert.equal(awsHttpCalls[3].options.body.AttributeFilter.EqualsTo.Value.StringValue, "engineering");

await awsKendraQueryTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-east-2",
  indexId: "12345678-1234-1234-1234-123456789012",
  queryText: "How do agents call tools?",
  queryResultTypeFilter: "DOCUMENT",
  pageNumber: 2,
  pageSize: 10,
  sortingConfiguration: {
    DocumentAttributeKey: "_created_at",
    SortOrder: "DESC",
  },
  spellCorrectionConfiguration: {
    IncludeQuerySpellCheckSuggestions: true,
  },
}, awsRuntime);
assert.equal(awsHttpCalls[4].url, "https://kendra.us-east-2.amazonaws.com");
assert.equal(awsHttpCalls[4].options.method, "POST");
assert.equal(awsHttpCalls[4].options.headers["X-Amz-Target"], "com.amazonaws.kendra.AWSKendraFrontendService.Query");
assert.equal(awsHttpCalls[4].options.body.QueryText, "How do agents call tools?");
assert.equal(awsHttpCalls[4].options.body.QueryResultTypeFilter, "DOCUMENT");
assert.equal(awsHttpCalls[4].options.body.PageNumber, 2);
assert.equal(awsHttpCalls[4].options.body.SortingConfiguration.SortOrder, "DESC");
assert.equal(awsHttpCalls[4].options.body.SpellCorrectionConfiguration.IncludeQuerySpellCheckSuggestions, true);

await awsStepFunctionsStartExecutionTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  securityToken: { value: "session-token" },
  region: "us-east-1",
  stateMachineArn: "arn:aws:states:us-east-1:123456789012:stateMachine:onboard-client",
  name: "client-123",
  input: { clientId: "client-123", plan: "pro" },
}, awsRuntime);
assert.equal(awsHttpCalls[5].url, "https://states.us-east-1.amazonaws.com");
assert.equal(awsHttpCalls[5].options.method, "POST");
assert.equal(awsHttpCalls[5].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");
assert.equal(awsHttpCalls[5].options.headers["X-Amz-Date"], "20260520T120000Z");
assert.equal(awsHttpCalls[5].options.headers["X-Amz-Security-Token"], "session-token");
assert.equal(awsHttpCalls[5].options.headers["content-type"], "application/x-amz-json-1.0");
assert.equal(awsHttpCalls[5].options.headers["X-Amz-Target"], "AWSStepFunctions.StartExecution");
assert.equal(awsHttpCalls[5].options.body.stateMachineArn, "arn:aws:states:us-east-1:123456789012:stateMachine:onboard-client");
assert.equal(awsHttpCalls[5].options.body.name, "client-123");
assert.equal(awsHttpCalls[5].options.body.input, "{\"clientId\":\"client-123\",\"plan\":\"pro\"}");

await awsStepFunctionsDescribeExecutionTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-east-1",
  executionArn: "arn:aws:states:us-east-1:123456789012:execution:onboard-client:client-123",
  includedData: "METADATA_ONLY",
}, awsRuntime);
assert.equal(awsHttpCalls[6].url, "https://states.us-east-1.amazonaws.com");
assert.equal(awsHttpCalls[6].options.method, "POST");
assert.equal(awsHttpCalls[6].options.headers["X-Amz-Target"], "AWSStepFunctions.DescribeExecution");
assert.equal(awsHttpCalls[6].options.body.executionArn, "arn:aws:states:us-east-1:123456789012:execution:onboard-client:client-123");
assert.equal(awsHttpCalls[6].options.body.includedData, "METADATA_ONLY");

await awsStepFunctionsSendTaskSuccessTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-east-1",
  taskToken: "task-token-1",
  output: { approved: true },
}, awsRuntime);
assert.equal(awsHttpCalls[7].url, "https://states.us-east-1.amazonaws.com");
assert.equal(awsHttpCalls[7].options.method, "POST");
assert.equal(awsHttpCalls[7].options.headers["X-Amz-Target"], "AWSStepFunctions.SendTaskSuccess");
assert.equal(awsHttpCalls[7].options.body.taskToken, "task-token-1");
assert.equal(awsHttpCalls[7].options.body.output, "{\"approved\":true}");

const azureDynamicSessionsHttpCalls = [];
const azureDynamicSessionsRuntime = {
  async http(url, options) {
    azureDynamicSessionsHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { properties: { stdout: "Hello\\n", stderr: "", exitCode: 0 } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Azure Dynamic Sessions nested tool call");
  },
};

const sessionPoolEndpoint = "https://eastus.dynamicsessions.io/subscriptions/sub-1/resourceGroups/rg-1/sessionPools/pool-1";
await azureDynamicSessionsExecuteTool.run({
  bearerToken: { value: "azure-session-token" },
  poolManagementEndpoint: sessionPoolEndpoint,
  identifier: "session-1",
  code: "print('Hello')",
  operationId: "op-1",
}, azureDynamicSessionsRuntime);
assert.equal(azureDynamicSessionsHttpCalls[0].url, `${sessionPoolEndpoint}/executions?api-version=2025-10-02-preview&identifier=session-1`);
assert.equal(azureDynamicSessionsHttpCalls[0].options.method, "POST");
assert.equal(azureDynamicSessionsHttpCalls[0].options.headers.Authorization, "Bearer azure-session-token");
assert.equal(azureDynamicSessionsHttpCalls[0].options.headers["operation-id"], "op-1");
assert.equal(azureDynamicSessionsHttpCalls[0].options.body.properties.codeInputType, "inline");
assert.equal(azureDynamicSessionsHttpCalls[0].options.body.properties.executionType, "synchronous");
assert.equal(azureDynamicSessionsHttpCalls[0].options.body.properties.code, "print('Hello')");

await azureDynamicSessionsFilesListTool.run({
  bearerToken: { value: "azure-session-token" },
  poolManagementEndpoint: sessionPoolEndpoint,
  identifier: "session-1",
}, azureDynamicSessionsRuntime);
assert.equal(azureDynamicSessionsHttpCalls[1].url, `${sessionPoolEndpoint}/files?api-version=2025-10-02-preview&identifier=session-1`);
assert.equal(azureDynamicSessionsHttpCalls[1].options.method, "GET");
assert.equal(azureDynamicSessionsHttpCalls[1].options.headers.Authorization, "Bearer azure-session-token");

const githubHttpCalls = [];
const githubRuntime = {
  async http(url, options) {
    githubHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected GitHub nested tool call");
  },
};

await githubGetRepoTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
}, githubRuntime);
assert.equal(githubHttpCalls[0].url, "https://api.github.com/repos/octo-org/agent-repo");
assert.equal(githubHttpCalls[0].options.method, "GET");
assert.equal(githubHttpCalls[0].options.headers.Authorization, "Bearer github-token");
assert.equal(githubHttpCalls[0].options.headers.accept, "application/vnd.github+json");

await githubListRepoIssuesTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  state: "open",
  labels: "bug,agent",
  creator: "octocat",
  sort: "updated",
  direction: "desc",
  perPage: 10,
  page: 2,
}, githubRuntime);
assert.equal(githubHttpCalls[1].url, "https://api.github.com/repos/octo-org/agent-repo/issues?state=open&creator=octocat&labels=bug%2Cagent&sort=updated&direction=desc&per_page=10&page=2");
assert.equal(githubHttpCalls[1].options.method, "GET");

await githubGetIssueTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  issueNumber: 42,
}, githubRuntime);
assert.equal(githubHttpCalls[2].url, "https://api.github.com/repos/octo-org/agent-repo/issues/42");

await githubCreateIssueTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  title: "Agent regression",
  body: "Observed in smoke run.",
  assignees: ["octocat"],
  labels: ["bug", "agent"],
}, githubRuntime);
assert.equal(githubHttpCalls[3].url, "https://api.github.com/repos/octo-org/agent-repo/issues");
assert.equal(githubHttpCalls[3].options.method, "POST");
assert.equal(githubHttpCalls[3].options.headers["content-type"], "application/json");
assert.equal(githubHttpCalls[3].options.body.title, "Agent regression");
assert.equal(githubHttpCalls[3].options.body.labels[1], "agent");

await githubSearchIssuesTool.run({
  token: { value: "github-token" },
  query: "repo:octo-org/agent-repo is:issue agent",
  sort: "updated",
  order: "desc",
  perPage: 5,
}, githubRuntime);
assert.equal(githubHttpCalls[4].url, "https://api.github.com/search/issues?q=repo%3Aocto-org%2Fagent-repo%20is%3Aissue%20agent&sort=updated&order=desc&per_page=5");

await githubSearchCodeTool.run({
  token: { value: "github-token" },
  query: "repo:octo-org/agent-repo requestJson",
  perPage: 3,
}, githubRuntime);
assert.equal(githubHttpCalls[5].url, "https://api.github.com/search/code?q=repo%3Aocto-org%2Fagent-repo%20requestJson&per_page=3");

await githubCreateIssueCommentTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  issueNumber: 42,
  body: "Smoke test comment",
}, githubRuntime);
assert.equal(githubHttpCalls[6].url, "https://api.github.com/repos/octo-org/agent-repo/issues/42/comments");
assert.equal(githubHttpCalls[6].options.method, "POST");
assert.equal(githubHttpCalls[6].options.body.body, "Smoke test comment");

await githubListPullRequestsTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  state: "open",
  base: "main",
  sort: "updated",
  direction: "desc",
  perPage: 6,
}, githubRuntime);
assert.equal(githubHttpCalls[7].url, "https://api.github.com/repos/octo-org/agent-repo/pulls?state=open&base=main&sort=updated&direction=desc&per_page=6");

await githubGetPullRequestTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  pullNumber: 7,
}, githubRuntime);
assert.equal(githubHttpCalls[8].url, "https://api.github.com/repos/octo-org/agent-repo/pulls/7");

await githubCreatePullRequestTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  title: "Add agent notes",
  head: "agent/change-readme",
  base: "main",
  body: "Adds notes.",
  draft: true,
  maintainerCanModify: true,
}, githubRuntime);
assert.equal(githubHttpCalls[9].url, "https://api.github.com/repos/octo-org/agent-repo/pulls");
assert.equal(githubHttpCalls[9].options.method, "POST");
assert.equal(githubHttpCalls[9].options.body.head, "agent/change-readme");
assert.equal(githubHttpCalls[9].options.body.maintainer_can_modify, true);

await githubListPullRequestFilesTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  pullNumber: 7,
  perPage: 4,
}, githubRuntime);
assert.equal(githubHttpCalls[10].url, "https://api.github.com/repos/octo-org/agent-repo/pulls/7/files?per_page=4");

await githubListBranchesTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  protected: true,
}, githubRuntime);
assert.equal(githubHttpCalls[11].url, "https://api.github.com/repos/octo-org/agent-repo/branches?protected=true&per_page=30");

await githubCreateBranchTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  branch: "agent/change-readme",
  sha: "abc123",
}, githubRuntime);
assert.equal(githubHttpCalls[12].url, "https://api.github.com/repos/octo-org/agent-repo/git/refs");
assert.equal(githubHttpCalls[12].options.method, "POST");
assert.equal(githubHttpCalls[12].options.body.ref, "refs/heads/agent/change-readme");
assert.equal(githubHttpCalls[12].options.body.sha, "abc123");

await githubGetFileContentsTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  path: "docs/agent notes.md",
  ref: "main",
}, githubRuntime);
assert.equal(githubHttpCalls[13].url, "https://api.github.com/repos/octo-org/agent-repo/contents/docs/agent%20notes.md?ref=main");

await githubCreateOrUpdateFileTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  path: "docs/agent.md",
  branch: "agent/change-readme",
  message: "Update agent notes",
  contentBase64: "IyBBZ2VudCBub3Rlcwo=",
  sha: "file-sha",
}, githubRuntime);
assert.equal(githubHttpCalls[14].url, "https://api.github.com/repos/octo-org/agent-repo/contents/docs/agent.md");
assert.equal(githubHttpCalls[14].options.method, "PUT");
assert.equal(githubHttpCalls[14].options.body.content, "IyBBZ2VudCBub3Rlcwo=");
assert.equal(githubHttpCalls[14].options.body.branch, "agent/change-readme");
assert.equal(githubHttpCalls[14].options.body.sha, "file-sha");

await githubDeleteFileTool.run({
  token: { value: "github-token" },
  owner: "octo-org",
  repo: "agent-repo",
  path: "docs/agent.md",
  branch: "agent/change-readme",
  message: "Remove agent notes",
  sha: "file-sha",
}, githubRuntime);
assert.equal(githubHttpCalls[15].url, "https://api.github.com/repos/octo-org/agent-repo/contents/docs/agent.md");
assert.equal(githubHttpCalls[15].options.method, "DELETE");
assert.equal(githubHttpCalls[15].options.body.message, "Remove agent notes");

const slackHttpCalls = [];
const slackRuntime = {
  async http(url, options) {
    slackHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Slack nested tool call");
  },
};

await slackPostMessageTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  text: "Hello from Chidori",
  threadTs: "1716230000.000100",
  replyBroadcast: true,
  unfurlLinks: false,
}, slackRuntime);
assert.equal(slackHttpCalls[0].url, "https://slack.com/api/chat.postMessage");
assert.equal(slackHttpCalls[0].options.method, "POST");
assert.equal(slackHttpCalls[0].options.headers.Authorization, "Bearer slack-token");
assert.equal(slackHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(slackHttpCalls[0].options.body.thread_ts, "1716230000.000100");
assert.equal(slackHttpCalls[0].options.body.reply_broadcast, true);
assert.equal(slackHttpCalls[0].options.body.unfurl_links, false);

await slackScheduleMessageTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  text: "Scheduled hello",
  postAt: 1767225600,
}, slackRuntime);
assert.equal(slackHttpCalls[1].url, "https://slack.com/api/chat.scheduleMessage");
assert.equal(slackHttpCalls[1].options.method, "POST");
assert.equal(slackHttpCalls[1].options.body.post_at, 1767225600);

await slackConversationsListTool.run({
  token: { value: "slack-token" },
  types: "public_channel,private_channel",
  excludeArchived: true,
  limit: 25,
}, slackRuntime);
assert.equal(slackHttpCalls[2].url, "https://slack.com/api/conversations.list?exclude_archived=true&limit=25&types=public_channel%2Cprivate_channel");
assert.equal(slackHttpCalls[2].options.method, "GET");

await slackConversationInfoTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  includeNumMembers: true,
}, slackRuntime);
assert.equal(slackHttpCalls[3].url, "https://slack.com/api/conversations.info?channel=C123&include_num_members=true");

await slackConversationHistoryTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  latest: "1716239999.000100",
  limit: 10,
}, slackRuntime);
assert.equal(slackHttpCalls[4].url, "https://slack.com/api/conversations.history?channel=C123&latest=1716239999.000100&limit=10");

await slackConversationRepliesTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  ts: "1716230000.000100",
  inclusive: true,
  limit: 5,
}, slackRuntime);
assert.equal(slackHttpCalls[5].url, "https://slack.com/api/conversations.replies?channel=C123&ts=1716230000.000100&inclusive=true&limit=5");

await slackGetPermalinkTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  messageTs: "1716230000.000100",
}, slackRuntime);
assert.equal(slackHttpCalls[6].url, "https://slack.com/api/chat.getPermalink?channel=C123&message_ts=1716230000.000100");

await slackUserInfoTool.run({
  token: { value: "slack-token" },
  user: "U123",
  includeLocale: true,
}, slackRuntime);
assert.equal(slackHttpCalls[7].url, "https://slack.com/api/users.info?user=U123&include_locale=true");

await slackSearchMessagesTool.run({
  token: { value: "slack-token" },
  query: "from:@ada release",
  sort: "timestamp",
  sortDir: "desc",
  count: 4,
}, slackRuntime);
assert.equal(slackHttpCalls[8].url, "https://slack.com/api/search.messages?query=from%3A%40ada%20release&sort=timestamp&sort_dir=desc&count=4");

const gitlabHttpCalls = [];
const gitlabRuntime = {
  async http(url, options) {
    gitlabHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected GitLab nested tool call");
  },
};

await gitlabSearchTool.run({
  token: { value: "gitlab-token" },
  scope: "issues",
  search: "regression",
  projectId: "group/project",
  perPage: 5,
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[0].url, "https://gitlab.com/api/v4/projects/group%2Fproject/search?scope=issues&search=regression&per_page=5");
assert.equal(gitlabHttpCalls[0].options.method, "GET");
assert.equal(gitlabHttpCalls[0].options.headers["PRIVATE-TOKEN"], "gitlab-token");

await gitlabListProjectIssuesTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  state: "opened",
  labels: "bug,priority",
  search: "login",
  perPage: 10,
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[1].url, "https://gitlab.com/api/v4/projects/group%2Fproject/issues?state=opened&labels=bug%2Cpriority&search=login&per_page=10");
assert.equal(gitlabHttpCalls[1].options.method, "GET");
assert.equal(gitlabHttpCalls[1].options.headers["PRIVATE-TOKEN"], "gitlab-token");

await gitlabCreateIssueTool.run({
  token: { value: "gitlab-token" },
  projectId: 123,
  title: "Investigate agent failure",
  description: "Observed in smoke run.",
  labels: "bug,agent",
  assigneeIds: [42],
  confidential: true,
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[2].url, "https://gitlab.com/api/v4/projects/123/issues");
assert.equal(gitlabHttpCalls[2].options.method, "POST");
assert.equal(gitlabHttpCalls[2].options.headers["PRIVATE-TOKEN"], "gitlab-token");
assert.equal(gitlabHttpCalls[2].options.headers["content-type"], "application/json");
assert.equal(gitlabHttpCalls[2].options.body.title, "Investigate agent failure");
assert.equal(gitlabHttpCalls[2].options.body.assignee_ids[0], 42);
assert.equal(gitlabHttpCalls[2].options.body.confidential, true);

await gitlabListMergeRequestsTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  state: "opened",
  sourceBranch: "feature/login",
  targetBranch: "main",
  view: "simple",
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[3].url, "https://gitlab.com/api/v4/projects/group%2Fproject/merge_requests?state=opened&source_branch=feature%2Flogin&target_branch=main&view=simple&per_page=20");
assert.equal(gitlabHttpCalls[3].options.method, "GET");
assert.equal(gitlabHttpCalls[3].options.headers["PRIVATE-TOKEN"], "gitlab-token");

await gitlabCreateMergeRequestTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  sourceBranch: "feature/login",
  targetBranch: "main",
  title: "Add login guard",
  description: "Adds a guard around the login flow.",
  removeSourceBranch: true,
  squash: true,
  reviewerIds: [17],
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[4].url, "https://gitlab.com/api/v4/projects/group%2Fproject/merge_requests");
assert.equal(gitlabHttpCalls[4].options.method, "POST");
assert.equal(gitlabHttpCalls[4].options.headers["PRIVATE-TOKEN"], "gitlab-token");
assert.equal(gitlabHttpCalls[4].options.body.source_branch, "feature/login");
assert.equal(gitlabHttpCalls[4].options.body.target_branch, "main");
assert.equal(gitlabHttpCalls[4].options.body.title, "Add login guard");
assert.equal(gitlabHttpCalls[4].options.body.remove_source_branch, true);
assert.equal(gitlabHttpCalls[4].options.body.squash, true);
assert.equal(gitlabHttpCalls[4].options.body.reviewer_ids[0], 17);

await gitlabCreateNoteTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  noteableType: "merge_request",
  noteableIid: 9,
  body: "Smoke test comment",
  internal: true,
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[5].url, "https://gitlab.com/api/v4/projects/group%2Fproject/merge_requests/9/notes");
assert.equal(gitlabHttpCalls[5].options.method, "POST");
assert.equal(gitlabHttpCalls[5].options.headers["PRIVATE-TOKEN"], "gitlab-token");
assert.equal(gitlabHttpCalls[5].options.body.body, "Smoke test comment");
assert.equal(gitlabHttpCalls[5].options.body.internal, true);

await gitlabCreateBranchTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  branch: "agent/change-readme",
  ref: "main",
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[6].url, "https://gitlab.com/api/v4/projects/group%2Fproject/repository/branches?branch=agent%2Fchange-readme&ref=main");
assert.equal(gitlabHttpCalls[6].options.method, "POST");
assert.equal(gitlabHttpCalls[6].options.headers["PRIVATE-TOKEN"], "gitlab-token");

await gitlabGetRepositoryFileTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  filePath: "src/index.ts",
  ref: "main",
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[7].url, "https://gitlab.com/api/v4/projects/group%2Fproject/repository/files/src%2Findex.ts?ref=main");
assert.equal(gitlabHttpCalls[7].options.method, "GET");
assert.equal(gitlabHttpCalls[7].options.headers["PRIVATE-TOKEN"], "gitlab-token");

await gitlabCreateRepositoryFileTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  filePath: "docs/agent.md",
  branch: "agent/change-readme",
  startBranch: "main",
  commitMessage: "Add agent notes",
  content: "# Agent notes\n",
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[8].url, "https://gitlab.com/api/v4/projects/group%2Fproject/repository/files/docs%2Fagent.md");
assert.equal(gitlabHttpCalls[8].options.method, "POST");
assert.equal(gitlabHttpCalls[8].options.headers["PRIVATE-TOKEN"], "gitlab-token");
assert.equal(gitlabHttpCalls[8].options.body.branch, "agent/change-readme");
assert.equal(gitlabHttpCalls[8].options.body.start_branch, "main");
assert.equal(gitlabHttpCalls[8].options.body.commit_message, "Add agent notes");
assert.equal(gitlabHttpCalls[8].options.body.content, "# Agent notes\n");

await gitlabUpdateRepositoryFileTool.run({
  token: { value: "gitlab-token" },
  projectId: "group/project",
  filePath: "docs/agent.md",
  branch: "agent/change-readme",
  commitMessage: "Update agent notes",
  content: "IyBBZ2VudCBub3Rlcwo=",
  encoding: "base64",
  lastCommitId: "abc123",
}, gitlabRuntime);
assert.equal(gitlabHttpCalls[9].url, "https://gitlab.com/api/v4/projects/group%2Fproject/repository/files/docs%2Fagent.md");
assert.equal(gitlabHttpCalls[9].options.method, "PUT");
assert.equal(gitlabHttpCalls[9].options.headers["PRIVATE-TOKEN"], "gitlab-token");
assert.equal(gitlabHttpCalls[9].options.body.commit_message, "Update agent notes");
assert.equal(gitlabHttpCalls[9].options.body.encoding, "base64");
assert.equal(gitlabHttpCalls[9].options.body.last_commit_id, "abc123");

const salesforceHttpCalls = [];
const salesforceRuntime = {
  async http(url, options) {
    salesforceHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Salesforce nested tool call");
  },
};

await salesforceSoqlQueryTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  query: "SELECT Id, Name FROM Account LIMIT 10",
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[0].url, "https://example.my.salesforce.com/services/data/v66.0/query?q=SELECT%20Id%2C%20Name%20FROM%20Account%20LIMIT%2010");
assert.equal(salesforceHttpCalls[0].options.method, "GET");
assert.equal(salesforceHttpCalls[0].options.headers.Authorization, "Bearer salesforce-token");

await salesforceSobjectsListTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  apiVersion: "v65.0",
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[1].url, "https://example.my.salesforce.com/services/data/v65.0/sobjects");

await salesforceSobjectDescribeTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  sobject: "Account",
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[2].url, "https://example.my.salesforce.com/services/data/v66.0/sobjects/Account/describe");

await salesforceSobjectRecordGetTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  sobject: "Account",
  recordId: "001xx000003DGbY",
  fields: ["Id", "Name"],
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[3].url, "https://example.my.salesforce.com/services/data/v66.0/sobjects/Account/001xx000003DGbY?fields=Id%2CName");

await salesforceSobjectRecordCreateTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  sobject: "Lead",
  fields: {
    FirstName: "Ada",
    LastName: "Lovelace",
    Company: "Analytical Engines",
  },
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[4].url, "https://example.my.salesforce.com/services/data/v66.0/sobjects/Lead");
assert.equal(salesforceHttpCalls[4].options.method, "POST");
assert.equal(salesforceHttpCalls[4].options.body.Company, "Analytical Engines");

await salesforceSobjectRecordUpdateTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  sobject: "Opportunity",
  recordId: "006xx000004TmiA",
  fields: { StageName: "Closed Won" },
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[5].url, "https://example.my.salesforce.com/services/data/v66.0/sobjects/Opportunity/006xx000004TmiA");
assert.equal(salesforceHttpCalls[5].options.method, "PATCH");
assert.equal(salesforceHttpCalls[5].options.body.StageName, "Closed Won");

await salesforceSobjectRecordDeleteTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  sobject: "Lead",
  recordId: "00Qxx0000012345",
}, salesforceRuntime);
assert.equal(salesforceHttpCalls[6].url, "https://example.my.salesforce.com/services/data/v66.0/sobjects/Lead/00Qxx0000012345");
assert.equal(salesforceHttpCalls[6].options.method, "DELETE");

const browserbaseHttpCalls = [];
const browserbaseRuntime = {
  async http(url, options) {
    browserbaseHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Browserbase nested tool call");
  },
};

await browserbaseCreateSessionTool.run({
  apiKey: { value: "browserbase-key" },
  projectId: "project-1",
  keepAlive: true,
  timeout: 120,
  region: "us-west-2",
  userMetadata: { workflow: "smoke" },
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[0].url, "https://api.browserbase.com/v1/sessions");
assert.equal(browserbaseHttpCalls[0].options.method, "POST");
assert.equal(browserbaseHttpCalls[0].options.headers["X-BB-API-Key"], "browserbase-key");
assert.equal(browserbaseHttpCalls[0].options.body.projectId, "project-1");
assert.equal(browserbaseHttpCalls[0].options.body.keepAlive, true);
assert.equal(browserbaseHttpCalls[0].options.body.timeout, 120);

await browserbaseListSessionsTool.run({
  apiKey: { value: "browserbase-key" },
  status: "RUNNING",
  q: "workflow=smoke",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[1].url, "https://api.browserbase.com/v1/sessions?status=RUNNING&q=workflow%3Dsmoke");
assert.equal(browserbaseHttpCalls[1].options.method, "GET");

await browserbaseGetSessionTool.run({
  apiKey: { value: "browserbase-key" },
  sessionId: "session-1",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[2].url, "https://api.browserbase.com/v1/sessions/session-1");

await browserbaseCloseSessionTool.run({
  apiKey: { value: "browserbase-key" },
  sessionId: "session-1",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[3].url, "https://api.browserbase.com/v1/sessions/session-1");
assert.equal(browserbaseHttpCalls[3].options.method, "POST");
assert.equal(browserbaseHttpCalls[3].options.body.status, "REQUEST_RELEASE");

await browserbaseGetSessionLiveUrlsTool.run({
  apiKey: { value: "browserbase-key" },
  sessionId: "session-1",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[4].url, "https://api.browserbase.com/v1/sessions/session-1/debug");

await browserbaseListSessionLogsTool.run({
  apiKey: { value: "browserbase-key" },
  sessionId: "session-1",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[5].url, "https://api.browserbase.com/v1/sessions/session-1/logs");

await browserbaseGetSessionRecordingTool.run({
  apiKey: { value: "browserbase-key" },
  sessionId: "session-1",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[6].url, "https://api.browserbase.com/v1/sessions/session-1/recording");

await browserbaseFetchTool.run({
  apiKey: { value: "browserbase-key" },
  url: "https://example.com",
  allowRedirects: true,
  proxies: true,
  format: "markdown",
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[7].url, "https://api.browserbase.com/v1/fetch");
assert.equal(browserbaseHttpCalls[7].options.method, "POST");
assert.equal(browserbaseHttpCalls[7].options.body.url, "https://example.com");
assert.equal(browserbaseHttpCalls[7].options.body.allowRedirects, true);
assert.equal(browserbaseHttpCalls[7].options.body.format, "markdown");

await browserbaseSearchTool.run({
  apiKey: { value: "browserbase-key" },
  query: "browserbase documentation",
  numResults: 5,
}, browserbaseRuntime);
assert.equal(browserbaseHttpCalls[8].url, "https://api.browserbase.com/v1/search");
assert.equal(browserbaseHttpCalls[8].options.method, "POST");
assert.equal(browserbaseHttpCalls[8].options.body.query, "browserbase documentation");
assert.equal(browserbaseHttpCalls[8].options.body.numResults, 5);

const databricksHttpCalls = [];
const databricksRuntime = {
  async http(url, options) {
    databricksHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Databricks nested tool call");
  },
};

await databricksServingEndpointGetTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  endpointName: "databricks-meta-llama-3-70b-instruct",
}, databricksRuntime);
assert.equal(databricksHttpCalls[0].url, "https://dbc.example.cloud.databricks.com/api/2.0/serving-endpoints/databricks-meta-llama-3-70b-instruct");
assert.equal(databricksHttpCalls[0].options.method, "GET");
assert.equal(databricksHttpCalls[0].options.headers.Authorization, "Bearer databricks-token");

await databricksServingInvokeTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  endpointName: "custom-model",
  body: { inputs: [{ x: 1 }] },
}, databricksRuntime);
assert.equal(databricksHttpCalls[1].url, "https://dbc.example.cloud.databricks.com/serving-endpoints/custom-model/invocations");
assert.equal(databricksHttpCalls[1].options.method, "POST");
assert.equal(databricksHttpCalls[1].options.body.inputs[0].x, 1);

await databricksChatCompletionsTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  endpointName: "databricks-dbrx-instruct",
  messages: [{ role: "user", content: "What is MLflow?" }],
  maxTokens: 128,
  temperature: 0.1,
  tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
}, databricksRuntime);
assert.equal(databricksHttpCalls[2].url, "https://dbc.example.cloud.databricks.com/serving-endpoints/databricks-dbrx-instruct/invocations");
assert.equal(databricksHttpCalls[2].options.body.messages[0].role, "user");
assert.equal(databricksHttpCalls[2].options.body.max_tokens, 128);
assert.equal(databricksHttpCalls[2].options.body.temperature, 0.1);
assert.equal(databricksHttpCalls[2].options.body.tools[0].type, "function");

await databricksCompletionsTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  endpointName: "completion-model",
  prompt: "Summarize vector search",
  maxTokens: 64,
  errorBehavior: "truncate",
}, databricksRuntime);
assert.equal(databricksHttpCalls[3].url, "https://dbc.example.cloud.databricks.com/serving-endpoints/completion-model/invocations");
assert.equal(databricksHttpCalls[3].options.body.prompt, "Summarize vector search");
assert.equal(databricksHttpCalls[3].options.body.max_tokens, 64);
assert.equal(databricksHttpCalls[3].options.body.error_behavior, "truncate");

await databricksEmbeddingsTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  endpointName: "databricks-bge-large-en",
  input: ["first document", "second document"],
  instruction: "Represent this sentence for searching relevant passages:",
  dimensions: 1024,
}, databricksRuntime);
assert.equal(databricksHttpCalls[4].url, "https://dbc.example.cloud.databricks.com/serving-endpoints/databricks-bge-large-en/invocations");
assert.equal(databricksHttpCalls[4].options.body.input[1], "second document");
assert.equal(databricksHttpCalls[4].options.body.dimensions, 1024);

await databricksVectorSearchQueryTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  indexName: "catalog.schema.index",
  queryText: "How to create a Vector Search index",
  columns: ["id", "text"],
  filters: "language = 'en'",
  numResults: 3,
  debugLevel: 1,
}, databricksRuntime);
assert.equal(databricksHttpCalls[5].url, "https://dbc.example.cloud.databricks.com/api/2.0/vector-search/indexes/catalog.schema.index/query");
assert.equal(databricksHttpCalls[5].options.method, "GET");
assert.equal(databricksHttpCalls[5].options.body.query_text, "How to create a Vector Search index");
assert.equal(databricksHttpCalls[5].options.body.columns[1], "text");
assert.equal(databricksHttpCalls[5].options.body.num_results, 3);

await databricksVectorSearchNextPageTool.run({
  token: { value: "databricks-token" },
  workspaceUrl: "https://dbc.example.cloud.databricks.com",
  indexName: "catalog.schema.index",
  pageToken: "page-2",
}, databricksRuntime);
assert.equal(databricksHttpCalls[6].url, "https://dbc.example.cloud.databricks.com/api/2.0/vector-search/indexes/catalog.schema.index/query-next-page");
assert.equal(databricksHttpCalls[6].options.method, "GET");
assert.equal(databricksHttpCalls[6].options.body.page_token, "page-2");

const elevenLabsHttpCalls = [];
const elevenLabsRuntime = {
  async http(url, options) {
    elevenLabsHttpCalls.push({ url, options });
    if (url.includes("/v1/text-to-speech/voice-1")) {
      return {
        status: 200,
        headers: {
          "content-type": "audio/mpeg",
          "request-id": "eleven-request-1",
        },
        body: "base64-audio",
      };
    }
    return { status: 200, headers: {}, body: { voices: [{ voice_id: "voice-1", name: "Rachel" }], has_more: false } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected ElevenLabs nested tool call");
  },
};

const elevenLabsSpeech = await elevenLabsTextToSpeechTool.run({
  apiKey: { value: "eleven-key" },
  voiceId: "voice-1",
  text: "Hello from Chidori",
  modelId: "eleven_multilingual_v2",
  outputFormat: "mp3_44100_128",
  voiceSettings: { stability: 0.5, similarity_boost: 0.8 },
}, elevenLabsRuntime);
assert.equal(elevenLabsHttpCalls[0].url, "https://api.elevenlabs.io/v1/text-to-speech/voice-1?output_format=mp3_44100_128");
assert.equal(elevenLabsHttpCalls[0].options.method, "POST");
assert.equal(elevenLabsHttpCalls[0].options.headers["xi-api-key"], "eleven-key");
assert.equal(elevenLabsHttpCalls[0].options.headers.accept, "audio/mpeg");
assert.equal(elevenLabsHttpCalls[0].options.body.text, "Hello from Chidori");
assert.equal(elevenLabsHttpCalls[0].options.body.model_id, "eleven_multilingual_v2");
assert.equal(elevenLabsHttpCalls[0].options.body.voice_settings.stability, 0.5);
assert.equal(elevenLabsSpeech.audioContent, "base64-audio");
assert.equal(elevenLabsSpeech.contentType, "audio/mpeg");
assert.equal(elevenLabsSpeech.requestId, "eleven-request-1");

await elevenLabsVoicesListTool.run({
  apiKey: { value: "eleven-key" },
  search: "Rachel",
  pageSize: 5,
  includeTotalCount: true,
}, elevenLabsRuntime);
assert.equal(elevenLabsHttpCalls[1].url, "https://api.elevenlabs.io/v2/voices?page_size=5&search=Rachel&include_total_count=true");
assert.equal(elevenLabsHttpCalls[1].options.method, "GET");
assert.equal(elevenLabsHttpCalls[1].options.headers["xi-api-key"], "eleven-key");

const sendGridHttpCalls = [];
const sendGridRuntime = {
  async http(url, options) {
    sendGridHttpCalls.push({ url, options });
    return { status: 202, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected SendGrid nested tool call");
  },
};

await sendGridSendMailTool.run({
  apiKey: { value: "sendgrid-key" },
  mail: {
    personalizations: [{ to: [{ email: "ada@example.com" }] }],
    from: { email: "agent@example.com" },
    subject: "Smoke test",
    content: [{ type: "text/plain", value: "Hello" }],
  },
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[0].url, "https://api.sendgrid.com/v3/mail/send");
assert.equal(sendGridHttpCalls[0].options.method, "POST");
assert.equal(sendGridHttpCalls[0].options.headers.Authorization, "Bearer sendgrid-key");
assert.equal(sendGridHttpCalls[0].options.body.subject, "Smoke test");

await sendGridListTemplatesTool.run({
  apiKey: { value: "sendgrid-key" },
  generations: "dynamic",
  pageSize: 20,
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[1].url, "https://api.sendgrid.com/v3/templates?generations=dynamic&page_size=20");
assert.equal(sendGridHttpCalls[1].options.method, "GET");

await sendGridUpsertContactsTool.run({
  apiKey: { value: "sendgrid-key" },
  contacts: [{ email: "ada@example.com", first_name: "Ada" }],
  listIds: ["list-1"],
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[2].url, "https://api.sendgrid.com/v3/marketing/contacts");
assert.equal(sendGridHttpCalls[2].options.method, "PUT");
assert.equal(sendGridHttpCalls[2].options.body.contacts[0].email, "ada@example.com");
assert.equal(sendGridHttpCalls[2].options.body.list_ids[0], "list-1");

await sendGridSearchContactsByEmailTool.run({
  apiKey: { value: "sendgrid-key" },
  emails: ["ada@example.com"],
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[3].url, "https://api.sendgrid.com/v3/marketing/contacts/search/emails");
assert.equal(sendGridHttpCalls[3].options.method, "POST");
assert.equal(sendGridHttpCalls[3].options.body.emails[0], "ada@example.com");

await sendGridGetGlobalSuppressionTool.run({
  apiKey: { value: "sendgrid-key" },
  email: "ada@example.com",
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[4].url, "https://api.sendgrid.com/v3/asm/suppressions/global/ada%40example.com");

await sendGridAddGlobalSuppressionsTool.run({
  apiKey: { value: "sendgrid-key" },
  emails: ["ada@example.com"],
}, sendGridRuntime);
assert.equal(sendGridHttpCalls[5].url, "https://api.sendgrid.com/v3/asm/suppressions/global");
assert.equal(sendGridHttpCalls[5].options.method, "POST");
assert.equal(sendGridHttpCalls[5].options.body.recipient_emails[0], "ada@example.com");

const serviceNowHttpCalls = [];
const serviceNowRuntime = {
  async http(url, options) {
    serviceNowHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { result: { ok: true } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected ServiceNow nested tool call");
  },
};

await serviceNowListTableRecordsTool.run({
  instanceUrl: "https://example.service-now.com",
  oauthToken: { value: "servicenow-oauth" },
  table: "incident",
  query: "active=true^priority=1",
  fields: ["sys_id", "number"],
  displayValue: "all",
  excludeReferenceLink: true,
  limit: 10,
  offset: 20,
}, serviceNowRuntime);
assert.equal(serviceNowHttpCalls[0].url, "https://example.service-now.com/api/now/table/incident?sysparm_query=active%3Dtrue%5Epriority%3D1&sysparm_fields=sys_id%2Cnumber&sysparm_display_value=all&sysparm_exclude_reference_link=true&sysparm_limit=10&sysparm_offset=20");
assert.equal(serviceNowHttpCalls[0].options.method, "GET");
assert.equal(serviceNowHttpCalls[0].options.headers.Authorization, "Bearer servicenow-oauth");

await serviceNowGetTableRecordTool.run({
  instanceUrl: "https://example.service-now.com",
  username: "api.user",
  password: { value: "servicenow-password" },
  table: "incident",
  sysId: "abc123",
  fields: ["number", "short_description"],
}, serviceNowRuntime);
assert.equal(serviceNowHttpCalls[1].url, "https://example.service-now.com/api/now/table/incident/abc123?sysparm_fields=number%2Cshort_description");
assert.equal(serviceNowHttpCalls[1].options.headers.Authorization, "Basic YXBpLnVzZXI6c2VydmljZW5vdy1wYXNzd29yZA==");

await serviceNowCreateTableRecordTool.run({
  instanceUrl: "https://example.service-now.com",
  oauthToken: { value: "servicenow-oauth" },
  table: "incident",
  record: {
    short_description: "Created from smoke test",
    urgency: "2",
  },
  displayValue: true,
}, serviceNowRuntime);
assert.equal(serviceNowHttpCalls[2].url, "https://example.service-now.com/api/now/table/incident?sysparm_display_value=true");
assert.equal(serviceNowHttpCalls[2].options.method, "POST");
assert.equal(serviceNowHttpCalls[2].options.body.short_description, "Created from smoke test");

await serviceNowUpdateTableRecordTool.run({
  instanceUrl: "https://example.service-now.com",
  oauthToken: { value: "servicenow-oauth" },
  table: "incident",
  sysId: "abc123",
  record: { state: "2" },
}, serviceNowRuntime);
assert.equal(serviceNowHttpCalls[3].url, "https://example.service-now.com/api/now/table/incident/abc123");
assert.equal(serviceNowHttpCalls[3].options.method, "PATCH");
assert.equal(serviceNowHttpCalls[3].options.body.state, "2");

await serviceNowDeleteTableRecordTool.run({
  instanceUrl: "https://example.service-now.com",
  oauthToken: { value: "servicenow-oauth" },
  table: "incident",
  sysId: "abc123",
}, serviceNowRuntime);
assert.equal(serviceNowHttpCalls[4].url, "https://example.service-now.com/api/now/table/incident/abc123");
assert.equal(serviceNowHttpCalls[4].options.method, "DELETE");

const hubspotHttpCalls = [];
const hubspotRuntime = {
  async http(url, options) {
    hubspotHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected HubSpot nested tool call");
  },
};

await hubspotListCrmObjectsTool.run({
  token: { value: "hubspot-token" },
  objectType: "contacts",
  properties: ["email", "firstname"],
  associations: ["companies"],
  limit: 10,
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[0].url, "https://api.hubapi.com/crm/v3/objects/contacts?limit=10&properties=email%2Cfirstname&associations=companies");
assert.equal(hubspotHttpCalls[0].options.method, "GET");
assert.equal(hubspotHttpCalls[0].options.headers.Authorization, "Bearer hubspot-token");

await hubspotSearchCrmObjectsTool.run({
  token: { value: "hubspot-token" },
  objectType: "companies",
  filterGroups: [{
    filters: [{ propertyName: "domain", operator: "EQ", value: "example.com" }],
  }],
  properties: ["name", "domain"],
  limit: 5,
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[1].url, "https://api.hubapi.com/crm/v3/objects/companies/search");
assert.equal(hubspotHttpCalls[1].options.method, "POST");
assert.equal(hubspotHttpCalls[1].options.body.filterGroups[0].filters[0].propertyName, "domain");
assert.equal(hubspotHttpCalls[1].options.body.properties[1], "domain");

await hubspotGetCrmObjectTool.run({
  token: { value: "hubspot-token" },
  objectType: "contacts",
  objectId: "ada@example.com",
  idProperty: "email",
  properties: ["email"],
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[2].url, "https://api.hubapi.com/crm/v3/objects/contacts/ada%40example.com?idProperty=email&properties=email");
assert.equal(hubspotHttpCalls[2].options.method, "GET");

await hubspotCreateCrmObjectTool.run({
  token: { value: "hubspot-token" },
  objectType: "deals",
  properties: {
    dealname: "New agent deal",
    pipeline: "default",
    dealstage: "contractsent",
  },
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[3].url, "https://api.hubapi.com/crm/v3/objects/deals");
assert.equal(hubspotHttpCalls[3].options.method, "POST");
assert.equal(hubspotHttpCalls[3].options.body.properties.dealname, "New agent deal");

await hubspotUpdateCrmObjectTool.run({
  token: { value: "hubspot-token" },
  objectType: "tickets",
  objectId: "123",
  properties: { subject: "Updated from smoke test" },
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[4].url, "https://api.hubapi.com/crm/v3/objects/tickets/123");
assert.equal(hubspotHttpCalls[4].options.method, "PATCH");
assert.equal(hubspotHttpCalls[4].options.body.properties.subject, "Updated from smoke test");

await hubspotBatchReadCrmObjectsTool.run({
  token: { value: "hubspot-token" },
  objectType: "contacts",
  idProperty: "email",
  inputs: [{ id: "ada@example.com" }],
  properties: ["email", "firstname"],
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[5].url, "https://api.hubapi.com/crm/v3/objects/contacts/batch/read");
assert.equal(hubspotHttpCalls[5].options.method, "POST");
assert.equal(hubspotHttpCalls[5].options.body.idProperty, "email");
assert.equal(hubspotHttpCalls[5].options.body.inputs[0].id, "ada@example.com");

await hubspotAssociateCrmObjectTool.run({
  token: { value: "hubspot-token" },
  objectType: "deals",
  objectId: "456",
  toObjectType: "contacts",
  toObjectId: "123",
  associationTypeId: 3,
}, hubspotRuntime);
assert.equal(hubspotHttpCalls[6].url, "https://api.hubapi.com/crm/v3/objects/deals/456/associations/contacts/123/3");
assert.equal(hubspotHttpCalls[6].options.method, "PUT");

const jiraHttpCalls = [];
const jiraRuntime = {
  async http(url, options) {
    jiraHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Jira nested tool call");
  },
};

await jiraJqlSearchTool.run({
  baseUrl: "https://example.atlassian.net",
  authorization: { value: "Basic jira-auth" },
  jql: "project = APP ORDER BY updated DESC",
  fields: ["summary", "status"],
  maxResults: 25,
}, jiraRuntime);
assert.equal(jiraHttpCalls[0].url, "https://example.atlassian.net/rest/api/3/search/jql");
assert.equal(jiraHttpCalls[0].options.method, "POST");
assert.equal(jiraHttpCalls[0].options.headers.Authorization, "Basic jira-auth");
assert.equal(jiraHttpCalls[0].options.body.jql, "project = APP ORDER BY updated DESC");
assert.equal(jiraHttpCalls[0].options.body.fields[0], "summary");
assert.equal(jiraHttpCalls[0].options.body.maxResults, 25);

await jiraGetIssueTool.run({
  baseUrl: "https://example.atlassian.net",
  authorization: { value: "Basic jira-auth" },
  issueIdOrKey: "APP-123",
  fields: ["summary", "description"],
  expand: "renderedFields",
}, jiraRuntime);
assert.equal(jiraHttpCalls[1].url, "https://example.atlassian.net/rest/api/3/issue/APP-123?fields=summary%2Cdescription&expand=renderedFields");
assert.equal(jiraHttpCalls[1].options.method, "GET");
assert.equal(jiraHttpCalls[1].options.headers.Authorization, "Basic jira-auth");

await jiraCreateIssueTool.run({
  baseUrl: "https://example.atlassian.net",
  authorization: { value: "Basic jira-auth" },
  fields: {
    project: { key: "APP" },
    issuetype: { name: "Task" },
    summary: "Investigate integration failure",
  },
}, jiraRuntime);
assert.equal(jiraHttpCalls[2].url, "https://example.atlassian.net/rest/api/3/issue");
assert.equal(jiraHttpCalls[2].options.method, "POST");
assert.equal(jiraHttpCalls[2].options.body.fields.project.key, "APP");
assert.equal(jiraHttpCalls[2].options.body.fields.issuetype.name, "Task");

await jiraAddIssueCommentTool.run({
  baseUrl: "https://example.atlassian.net",
  authorization: { value: "Basic jira-auth" },
  issueIdOrKey: "APP-123",
  body: {
    type: "doc",
    version: 1,
    content: [{ type: "paragraph", content: [{ type: "text", text: "Smoke test comment" }] }],
  },
}, jiraRuntime);
assert.equal(jiraHttpCalls[3].url, "https://example.atlassian.net/rest/api/3/issue/APP-123/comment");
assert.equal(jiraHttpCalls[3].options.method, "POST");
assert.equal(jiraHttpCalls[3].options.body.body.type, "doc");
assert.equal(jiraHttpCalls[3].options.body.body.content[0].content[0].text, "Smoke test comment");

await jiraTransitionIssueTool.run({
  baseUrl: "https://example.atlassian.net",
  authorization: { value: "Basic jira-auth" },
  issueIdOrKey: "APP-123",
  transitionId: "31",
}, jiraRuntime);
assert.equal(jiraHttpCalls[4].url, "https://example.atlassian.net/rest/api/3/issue/APP-123/transitions");
assert.equal(jiraHttpCalls[4].options.method, "POST");
assert.equal(jiraHttpCalls[4].options.body.transition.id, "31");

const confluenceHttpCalls = [];
const confluenceRuntime = {
  async http(url, options) {
    confluenceHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Confluence nested tool call");
  },
};

await confluenceListPagesTool.run({
  baseUrl: "https://example.atlassian.net/wiki",
  authorization: { value: "Basic confluence-auth" },
  spaceId: "12345",
  title: "Runbook",
  bodyFormat: "storage",
  limit: 10,
}, confluenceRuntime);
assert.equal(confluenceHttpCalls[0].url, "https://example.atlassian.net/wiki/api/v2/pages?space-id=12345&title=Runbook&body-format=storage&limit=10");
assert.equal(confluenceHttpCalls[0].options.method, "GET");
assert.equal(confluenceHttpCalls[0].options.headers.Authorization, "Basic confluence-auth");

await confluenceGetPageTool.run({
  baseUrl: "https://example.atlassian.net/wiki",
  authorization: { value: "Basic confluence-auth" },
  pageId: "98765",
  bodyFormat: "atlas_doc_format",
}, confluenceRuntime);
assert.equal(confluenceHttpCalls[1].url, "https://example.atlassian.net/wiki/api/v2/pages/98765?body-format=atlas_doc_format");
assert.equal(confluenceHttpCalls[1].options.method, "GET");
assert.equal(confluenceHttpCalls[1].options.headers.Authorization, "Basic confluence-auth");

await confluenceCreatePageTool.run({
  baseUrl: "https://example.atlassian.net/wiki",
  authorization: { value: "Basic confluence-auth" },
  spaceId: "12345",
  title: "Agent runbook",
  parentId: "98765",
  body: { representation: "storage", value: "<p>Hello</p>" },
}, confluenceRuntime);
assert.equal(confluenceHttpCalls[2].url, "https://example.atlassian.net/wiki/api/v2/pages");
assert.equal(confluenceHttpCalls[2].options.method, "POST");
assert.equal(confluenceHttpCalls[2].options.headers.Authorization, "Basic confluence-auth");
assert.equal(confluenceHttpCalls[2].options.body.spaceId, "12345");
assert.equal(confluenceHttpCalls[2].options.body.title, "Agent runbook");
assert.equal(confluenceHttpCalls[2].options.body.body.value, "<p>Hello</p>");

await confluenceUpdatePageTool.run({
  baseUrl: "https://example.atlassian.net/wiki",
  authorization: { value: "Basic confluence-auth" },
  pageId: "98765",
  title: "Agent runbook",
  versionNumber: 2,
  versionMessage: "Update runbook",
  body: { representation: "storage", value: "<p>Updated</p>" },
}, confluenceRuntime);
assert.equal(confluenceHttpCalls[3].url, "https://example.atlassian.net/wiki/api/v2/pages/98765");
assert.equal(confluenceHttpCalls[3].options.method, "PUT");
assert.equal(confluenceHttpCalls[3].options.headers.Authorization, "Basic confluence-auth");
assert.equal(confluenceHttpCalls[3].options.body.id, "98765");
assert.equal(confluenceHttpCalls[3].options.body.version.number, 2);
assert.equal(confluenceHttpCalls[3].options.body.version.message, "Update runbook");

const notionHttpCalls = [];
const notionRuntime = {
  async http(url, options) {
    notionHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Notion nested tool call");
  },
};

await notionSearchTool.run({
  token: { value: "notion-token" },
  query: "runbook",
  filter: { property: "object", value: "page" },
  pageSize: 5,
}, notionRuntime);
assert.equal(notionHttpCalls[0].url, "https://api.notion.com/v1/search");
assert.equal(notionHttpCalls[0].options.method, "POST");
assert.equal(notionHttpCalls[0].options.headers.Authorization, "Bearer notion-token");
assert.equal(notionHttpCalls[0].options.headers["Notion-Version"], "2022-06-28");
assert.equal(notionHttpCalls[0].options.body.query, "runbook");
assert.equal(notionHttpCalls[0].options.body.filter.value, "page");
assert.equal(notionHttpCalls[0].options.body.page_size, 5);

await notionGetPageTool.run({
  token: { value: "notion-token" },
  pageId: "page-1",
}, notionRuntime);
assert.equal(notionHttpCalls[1].url, "https://api.notion.com/v1/pages/page-1");
assert.equal(notionHttpCalls[1].options.method, "GET");
assert.equal(notionHttpCalls[1].options.headers.Authorization, "Bearer notion-token");

await notionCreatePageTool.run({
  token: { value: "notion-token" },
  parent: { page_id: "parent-page" },
  properties: {
    title: {
      title: [{ type: "text", text: { content: "Agent runbook" } }],
    },
  },
  children: [{
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: [{ type: "text", text: { content: "Hello" } }] },
  }],
}, notionRuntime);
assert.equal(notionHttpCalls[2].url, "https://api.notion.com/v1/pages");
assert.equal(notionHttpCalls[2].options.method, "POST");
assert.equal(notionHttpCalls[2].options.body.parent.page_id, "parent-page");
assert.equal(notionHttpCalls[2].options.body.properties.title.title[0].text.content, "Agent runbook");
assert.equal(notionHttpCalls[2].options.body.children[0].paragraph.rich_text[0].text.content, "Hello");

await notionUpdatePageTool.run({
  token: { value: "notion-token" },
  pageId: "page-1",
  properties: {
    Status: { status: { name: "Done" } },
  },
}, notionRuntime);
assert.equal(notionHttpCalls[3].url, "https://api.notion.com/v1/pages/page-1");
assert.equal(notionHttpCalls[3].options.method, "PATCH");
assert.equal(notionHttpCalls[3].options.body.properties.Status.status.name, "Done");

await notionListBlockChildrenTool.run({
  token: { value: "notion-token" },
  blockId: "page-1",
  pageSize: 25,
}, notionRuntime);
assert.equal(notionHttpCalls[4].url, "https://api.notion.com/v1/blocks/page-1/children?page_size=25");
assert.equal(notionHttpCalls[4].options.method, "GET");

await notionAppendBlockChildrenTool.run({
  token: { value: "notion-token" },
  blockId: "page-1",
  children: [{
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: [{ type: "text", text: { content: "Updated" } }] },
  }],
}, notionRuntime);
assert.equal(notionHttpCalls[5].url, "https://api.notion.com/v1/blocks/page-1/children");
assert.equal(notionHttpCalls[5].options.method, "PATCH");
assert.equal(notionHttpCalls[5].options.body.children[0].paragraph.rich_text[0].text.content, "Updated");

const todoistHttpCalls = [];
const todoistRuntime = {
  async http(url, options) {
    todoistHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Todoist nested tool call");
  },
};

await todoistListProjectsTool.run({
  token: { value: "todoist-token" },
}, todoistRuntime);
assert.equal(todoistHttpCalls[0].url, "https://api.todoist.com/rest/v2/projects");
assert.equal(todoistHttpCalls[0].options.method, "GET");
assert.equal(todoistHttpCalls[0].options.headers.Authorization, "Bearer todoist-token");

await todoistListTasksTool.run({
  token: { value: "todoist-token" },
  projectId: "project-1",
  filter: "today",
  ids: ["task-1", "task-2"],
}, todoistRuntime);
assert.equal(todoistHttpCalls[1].url, "https://api.todoist.com/rest/v2/tasks?project_id=project-1&filter=today&ids=task-1%2Ctask-2");

await todoistGetTaskTool.run({
  token: { value: "todoist-token" },
  taskId: "task-1",
}, todoistRuntime);
assert.equal(todoistHttpCalls[2].url, "https://api.todoist.com/rest/v2/tasks/task-1");

await todoistCreateTaskTool.run({
  token: { value: "todoist-token" },
  task: {
    content: "Review integration smoke test",
    project_id: "project-1",
    due_string: "tomorrow",
  },
}, todoistRuntime);
assert.equal(todoistHttpCalls[3].url, "https://api.todoist.com/rest/v2/tasks");
assert.equal(todoistHttpCalls[3].options.method, "POST");
assert.equal(todoistHttpCalls[3].options.body.content, "Review integration smoke test");

await todoistUpdateTaskTool.run({
  token: { value: "todoist-token" },
  taskId: "task-1",
  task: { content: "Updated task" },
}, todoistRuntime);
assert.equal(todoistHttpCalls[4].url, "https://api.todoist.com/rest/v2/tasks/task-1");
assert.equal(todoistHttpCalls[4].options.method, "POST");
assert.equal(todoistHttpCalls[4].options.body.content, "Updated task");

await todoistCloseTaskTool.run({
  token: { value: "todoist-token" },
  taskId: "task-1",
}, todoistRuntime);
assert.equal(todoistHttpCalls[5].url, "https://api.todoist.com/rest/v2/tasks/task-1/close");
assert.equal(todoistHttpCalls[5].options.method, "POST");

await todoistReopenTaskTool.run({
  token: { value: "todoist-token" },
  taskId: "task-1",
}, todoistRuntime);
assert.equal(todoistHttpCalls[6].url, "https://api.todoist.com/rest/v2/tasks/task-1/reopen");
assert.equal(todoistHttpCalls[6].options.method, "POST");

await todoistListCommentsTool.run({
  token: { value: "todoist-token" },
  taskId: "task-1",
}, todoistRuntime);
assert.equal(todoistHttpCalls[7].url, "https://api.todoist.com/rest/v2/comments?task_id=task-1");

await todoistCreateCommentTool.run({
  token: { value: "todoist-token" },
  comment: {
    task_id: "task-1",
    content: "Smoke test comment",
  },
}, todoistRuntime);
assert.equal(todoistHttpCalls[8].url, "https://api.todoist.com/rest/v2/comments");
assert.equal(todoistHttpCalls[8].options.method, "POST");
assert.equal(todoistHttpCalls[8].options.body.content, "Smoke test comment");

const shopifyHttpCalls = [];
const shopifyRuntime = {
  async http(url, options) {
    shopifyHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { data: { ok: true } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Shopify nested tool call");
  },
};

await shopifyAdminGraphQLTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  query: "query ShopName { shop { name } }",
  variables: { first: 5 },
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[0].url, "https://example.myshopify.com/admin/api/2026-04/graphql.json");
assert.equal(shopifyHttpCalls[0].options.method, "POST");
assert.equal(shopifyHttpCalls[0].options.headers["X-Shopify-Access-Token"], "shopify-token");
assert.equal(shopifyHttpCalls[0].options.body.query, "query ShopName { shop { name } }");
assert.equal(shopifyHttpCalls[0].options.body.variables.first, 5);

await shopifyListProductsTool.run({
  token: { value: "shopify-token" },
  shop: "https://example.myshopify.com/",
  limit: 10,
  status: "active",
  fields: ["id", "title"],
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[1].url, "https://example.myshopify.com/admin/api/2026-04/products.json?limit=10&status=active&fields=id%2Ctitle");
assert.equal(shopifyHttpCalls[1].options.method, "GET");

await shopifyGetProductTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  productId: "123",
  fields: ["id", "title"],
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[2].url, "https://example.myshopify.com/admin/api/2026-04/products/123.json?fields=id%2Ctitle");

await shopifyListOrdersTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  status: "any",
  financialStatus: "paid",
  createdAtMin: "2026-01-01T00:00:00Z",
  limit: 5,
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[3].url, "https://example.myshopify.com/admin/api/2026-04/orders.json?limit=5&status=any&financial_status=paid&created_at_min=2026-01-01T00%3A00%3A00Z");

await shopifyGetOrderTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  orderId: "456",
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[4].url, "https://example.myshopify.com/admin/api/2026-04/orders/456.json");

await shopifySearchCustomersTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  query: "email:ada@example.com",
  limit: 3,
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[5].url, "https://example.myshopify.com/admin/api/2026-04/customers/search.json?query=email%3Aada%40example.com&limit=3");

await shopifyGetCustomerTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  customerId: "789",
  fields: ["id", "email"],
}, shopifyRuntime);
assert.equal(shopifyHttpCalls[6].url, "https://example.myshopify.com/admin/api/2026-04/customers/789.json?fields=id%2Cemail");

const stripeHttpCalls = [];
const stripeRuntime = {
  async http(url, options) {
    stripeHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { object: "stripe.mock" } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Stripe nested tool call");
  },
};

await stripeListResourceTool.run({
  apiKey: { value: "stripe-key" },
  resource: "charges",
  limit: 3,
  created: { gte: 1710000000 },
}, stripeRuntime);
assert.equal(stripeHttpCalls[0].url, "https://api.stripe.com/v1/charges?limit=3&created%5Bgte%5D=1710000000");
assert.equal(stripeHttpCalls[0].options.method, "GET");
assert.equal(stripeHttpCalls[0].options.headers.Authorization, "Bearer stripe-key");

await stripeListCustomersTool.run({
  apiKey: { value: "stripe-key" },
  email: "ada@example.com",
  limit: 5,
}, stripeRuntime);
assert.equal(stripeHttpCalls[1].url, "https://api.stripe.com/v1/customers?limit=5&email=ada%40example.com");
assert.equal(stripeHttpCalls[1].options.method, "GET");

await stripeGetCustomerTool.run({
  apiKey: { value: "stripe-key" },
  customerId: "cus_123",
}, stripeRuntime);
assert.equal(stripeHttpCalls[2].url, "https://api.stripe.com/v1/customers/cus_123");
assert.equal(stripeHttpCalls[2].options.method, "GET");

await stripeCreateCustomerTool.run({
  apiKey: { value: "stripe-key" },
  email: "ada@example.com",
  name: "Ada Lovelace",
  metadata: { source: "smoke" },
}, stripeRuntime);
assert.equal(stripeHttpCalls[3].url, "https://api.stripe.com/v1/customers");
assert.equal(stripeHttpCalls[3].options.method, "POST");
assert.equal(stripeHttpCalls[3].options.headers["content-type"], "application/x-www-form-urlencoded");
assert.match(stripeHttpCalls[3].options.body, /email=ada%40example.com/);
assert.match(stripeHttpCalls[3].options.body, /name=Ada\+Lovelace/);
assert.match(stripeHttpCalls[3].options.body, /metadata%5Bsource%5D=smoke/);

await stripeUpdateCustomerTool.run({
  apiKey: { value: "stripe-key" },
  customerId: "cus_123",
  description: "Updated from smoke test",
}, stripeRuntime);
assert.equal(stripeHttpCalls[4].url, "https://api.stripe.com/v1/customers/cus_123");
assert.equal(stripeHttpCalls[4].options.method, "POST");
assert.match(stripeHttpCalls[4].options.body, /description=Updated\+from\+smoke\+test/);

await stripeCreatePaymentIntentTool.run({
  apiKey: { value: "stripe-key" },
  amount: 2198,
  currency: "usd",
  customer: "cus_123",
  automaticPaymentMethods: { enabled: true },
  idempotencyKey: "pi-smoke-1",
}, stripeRuntime);
assert.equal(stripeHttpCalls[5].url, "https://api.stripe.com/v1/payment_intents");
assert.equal(stripeHttpCalls[5].options.method, "POST");
assert.equal(stripeHttpCalls[5].options.headers["Idempotency-Key"], "pi-smoke-1");
assert.match(stripeHttpCalls[5].options.body, /amount=2198/);
assert.match(stripeHttpCalls[5].options.body, /automatic_payment_methods%5Benabled%5D=true/);

await stripeCreateCheckoutSessionTool.run({
  apiKey: { value: "stripe-key" },
  mode: "payment",
  successUrl: "https://example.com/success",
  cancelUrl: "https://example.com/cancel",
  lineItems: [{ price: "price_123", quantity: 2 }],
}, stripeRuntime);
assert.equal(stripeHttpCalls[6].url, "https://api.stripe.com/v1/checkout/sessions");
assert.equal(stripeHttpCalls[6].options.method, "POST");
assert.match(stripeHttpCalls[6].options.body, /mode=payment/);
assert.match(stripeHttpCalls[6].options.body, /success_url=https%3A%2F%2Fexample.com%2Fsuccess/);
assert.match(stripeHttpCalls[6].options.body, /line_items%5B0%5D%5Bprice%5D=price_123/);
assert.match(stripeHttpCalls[6].options.body, /line_items%5B0%5D%5Bquantity%5D=2/);

await stripeGetCheckoutSessionTool.run({
  apiKey: { value: "stripe-key" },
  sessionId: "cs_test_123",
}, stripeRuntime);
assert.equal(stripeHttpCalls[7].url, "https://api.stripe.com/v1/checkout/sessions/cs_test_123");
assert.equal(stripeHttpCalls[7].options.method, "GET");

const zendeskHttpCalls = [];
const zendeskRuntime = {
  async http(url, options) {
    zendeskHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Zendesk nested tool call");
  },
};

await zendeskSearchTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  query: "type:ticket status:open",
  sortBy: "created_at",
  sortOrder: "desc",
  perPage: 25,
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[0].url, "https://example.zendesk.com/api/v2/search.json?query=type%3Aticket%20status%3Aopen&sort_by=created_at&sort_order=desc&per_page=25");
assert.equal(zendeskHttpCalls[0].options.method, "GET");
assert.equal(zendeskHttpCalls[0].options.headers.Authorization, "Basic YWdlbnRAZXhhbXBsZS5jb20vdG9rZW46emVuZGVzay10b2tlbg==");

await zendeskListTicketsTool.run({
  oauthToken: { value: "zendesk-oauth" },
  baseUrl: "https://example.zendesk.com/api/v2",
  sortBy: "updated_at",
  sortOrder: "asc",
  page: 2,
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[1].url, "https://example.zendesk.com/api/v2/tickets.json?sort_by=updated_at&sort_order=asc&page=2");
assert.equal(zendeskHttpCalls[1].options.headers.Authorization, "Bearer zendesk-oauth");

await zendeskGetTicketTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  ticketId: 123,
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[2].url, "https://example.zendesk.com/api/v2/tickets/123.json");

await zendeskCreateTicketTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  async: true,
  ticket: {
    subject: "Printer is on fire",
    comment: { body: "The smoke is very colorful." },
  },
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[3].url, "https://example.zendesk.com/api/v2/tickets.json?async=true");
assert.equal(zendeskHttpCalls[3].options.method, "POST");
assert.equal(zendeskHttpCalls[3].options.body.ticket.subject, "Printer is on fire");

await zendeskUpdateTicketTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  ticketId: 123,
  ticket: {
    status: "pending",
    comment: { body: "Following up from smoke test.", public: false },
  },
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[4].url, "https://example.zendesk.com/api/v2/tickets/123.json");
assert.equal(zendeskHttpCalls[4].options.method, "PUT");
assert.equal(zendeskHttpCalls[4].options.body.ticket.comment.public, false);

await zendeskListTicketCommentsTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  ticketId: 123,
  includeInlineImages: true,
  perPage: 10,
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[5].url, "https://example.zendesk.com/api/v2/tickets/123/comments.json?include_inline_images=true&per_page=10");

await zendeskListUsersTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  role: "agent",
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[6].url, "https://example.zendesk.com/api/v2/users.json?role=agent");

await zendeskCreateOrUpdateUserTool.run({
  subdomain: "example",
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  user: {
    name: "Ada Lovelace",
    email: "ada@example.com",
  },
}, zendeskRuntime);
assert.equal(zendeskHttpCalls[7].url, "https://example.zendesk.com/api/v2/users/create_or_update.json");
assert.equal(zendeskHttpCalls[7].options.method, "POST");
assert.equal(zendeskHttpCalls[7].options.body.user.email, "ada@example.com");

const dropboxHttpCalls = [];
const dropboxRuntime = {
  async http(url, options) {
    dropboxHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Dropbox nested tool call");
  },
};

await dropboxListFolderTool.run({
  accessToken: { value: "dropbox-token" },
  path: "/Projects",
  recursive: true,
  includeDeleted: false,
  limit: 50,
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[0].url, "https://api.dropboxapi.com/2/files/list_folder");
assert.equal(dropboxHttpCalls[0].options.method, "POST");
assert.equal(dropboxHttpCalls[0].options.headers.Authorization, "Bearer dropbox-token");
assert.equal(dropboxHttpCalls[0].options.body.path, "/Projects");
assert.equal(dropboxHttpCalls[0].options.body.recursive, true);
assert.equal(dropboxHttpCalls[0].options.body.include_deleted, false);

await dropboxSearchFilesTool.run({
  accessToken: { value: "dropbox-token" },
  query: "roadmap",
  path: "/Projects",
  maxResults: 10,
  filenameOnly: true,
  fileExtensions: ["md"],
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[1].url, "https://api.dropboxapi.com/2/files/search_v2");
assert.equal(dropboxHttpCalls[1].options.body.query, "roadmap");
assert.equal(dropboxHttpCalls[1].options.body.options.path, "/Projects");
assert.equal(dropboxHttpCalls[1].options.body.options.file_extensions[0], "md");

await dropboxGetTemporaryLinkTool.run({
  accessToken: { value: "dropbox-token" },
  path: "/Projects/roadmap.md",
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[2].url, "https://api.dropboxapi.com/2/files/get_temporary_link");

await dropboxCreateFolderTool.run({
  accessToken: { value: "dropbox-token" },
  path: "/Projects/New",
  autorename: true,
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[3].url, "https://api.dropboxapi.com/2/files/create_folder_v2");
assert.equal(dropboxHttpCalls[3].options.body.autorename, true);

await dropboxUploadTextFileTool.run({
  accessToken: { value: "dropbox-token" },
  path: "/Projects/New/note.txt",
  content: "hello",
  mode: "overwrite",
  mute: true,
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[4].url, "https://content.dropboxapi.com/2/files/upload");
assert.equal(dropboxHttpCalls[4].options.method, "POST");
assert.equal(dropboxHttpCalls[4].options.body, "hello");
assert.equal(dropboxHttpCalls[4].options.headers["content-type"], "application/octet-stream");
assert.match(dropboxHttpCalls[4].options.headers["Dropbox-API-Arg"], /"path":"\/Projects\/New\/note.txt"/);
assert.match(dropboxHttpCalls[4].options.headers["Dropbox-API-Arg"], /"mode":"overwrite"/);

await dropboxDeleteFileOrFolderTool.run({
  accessToken: { value: "dropbox-token" },
  path: "/Projects/New/note.txt",
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[5].url, "https://api.dropboxapi.com/2/files/delete_v2");

await dropboxMoveFileOrFolderTool.run({
  accessToken: { value: "dropbox-token" },
  fromPath: "/Projects/New",
  toPath: "/Archive/New",
  autorename: true,
}, dropboxRuntime);
assert.equal(dropboxHttpCalls[6].url, "https://api.dropboxapi.com/2/files/move_v2");
assert.equal(dropboxHttpCalls[6].options.body.from_path, "/Projects/New");
assert.equal(dropboxHttpCalls[6].options.body.to_path, "/Archive/New");

const trelloHttpCalls = [];
const trelloRuntime = {
  async http(url, options) {
    trelloHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Trello nested tool call");
  },
};

await trelloListMemberBoardsTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  fields: "name,url",
  lists: "open",
}, trelloRuntime);
assert.equal(trelloHttpCalls[0].url, "https://api.trello.com/1/members/me/boards?key=trello-key&token=trello-token&fields=name%2Curl&lists=open");
assert.equal(trelloHttpCalls[0].options.method, "GET");

await trelloListBoardListsTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  boardId: "board-1",
  filter: "open",
}, trelloRuntime);
assert.equal(trelloHttpCalls[1].url, "https://api.trello.com/1/boards/board-1/lists?key=trello-key&token=trello-token&filter=open");
assert.equal(trelloHttpCalls[1].options.method, "GET");

await trelloListBoardCardsTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  boardId: "board-1",
  filter: "visible",
}, trelloRuntime);
assert.equal(trelloHttpCalls[2].url, "https://api.trello.com/1/boards/board-1/cards?key=trello-key&token=trello-token&filter=visible");
assert.equal(trelloHttpCalls[2].options.method, "GET");

await trelloCreateCardTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  listId: "list-1",
  name: "Investigate integration failure",
  desc: "Created from smoke test",
  idLabels: ["label-1", "label-2"],
}, trelloRuntime);
assert.equal(trelloHttpCalls[3].url, "https://api.trello.com/1/cards?key=trello-key&token=trello-token&idList=list-1&name=Investigate%20integration%20failure&desc=Created%20from%20smoke%20test&idLabels=label-1%2Clabel-2");
assert.equal(trelloHttpCalls[3].options.method, "POST");

await trelloUpdateCardTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  cardId: "card-1",
  closed: true,
  due: null,
}, trelloRuntime);
assert.equal(trelloHttpCalls[4].url, "https://api.trello.com/1/cards/card-1?key=trello-key&token=trello-token&closed=true&due=null");
assert.equal(trelloHttpCalls[4].options.method, "PUT");

await trelloAddCardCommentTool.run({
  apiKey: { value: "trello-key" },
  token: { value: "trello-token" },
  cardId: "card-1",
  text: "Smoke test comment",
}, trelloRuntime);
assert.equal(trelloHttpCalls[5].url, "https://api.trello.com/1/cards/card-1/actions/comments?key=trello-key&token=trello-token&text=Smoke%20test%20comment");
assert.equal(trelloHttpCalls[5].options.method, "POST");

const typeformHttpCalls = [];
const typeformRuntime = {
  async http(url, options) {
    typeformHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Typeform nested tool call");
  },
};

await typeformListFormsTool.run({
  token: { value: "typeform-token" },
  page: 2,
  pageSize: 10,
  search: "intake",
  workspaceId: "workspace-1",
}, typeformRuntime);
assert.equal(typeformHttpCalls[0].url, "https://api.typeform.com/forms?page=2&page_size=10&search=intake&workspace_id=workspace-1");
assert.equal(typeformHttpCalls[0].options.method, "GET");
assert.equal(typeformHttpCalls[0].options.headers.Authorization, "Bearer typeform-token");

await typeformGetFormTool.run({
  token: { value: "typeform-token" },
  formId: "form_123",
}, typeformRuntime);
assert.equal(typeformHttpCalls[1].url, "https://api.typeform.com/forms/form_123");

await typeformCreateFormTool.run({
  token: { value: "typeform-token" },
  form: {
    title: "Agent intake",
    fields: [{ title: "Email", type: "email" }],
  },
}, typeformRuntime);
assert.equal(typeformHttpCalls[2].url, "https://api.typeform.com/forms");
assert.equal(typeformHttpCalls[2].options.method, "POST");
assert.equal(typeformHttpCalls[2].options.body.title, "Agent intake");

await typeformUpdateFormTool.run({
  token: { value: "typeform-token" },
  formId: "form_123",
  form: {
    title: "Updated intake",
    fields: [{ title: "Email", type: "email" }],
  },
}, typeformRuntime);
assert.equal(typeformHttpCalls[3].url, "https://api.typeform.com/forms/form_123");
assert.equal(typeformHttpCalls[3].options.method, "PUT");
assert.equal(typeformHttpCalls[3].options.body.title, "Updated intake");

await typeformListResponsesTool.run({
  token: { value: "typeform-token" },
  formId: "form_123",
  pageSize: 100,
  since: "2026-01-01T00:00:00",
  completed: true,
  responseType: ["completed"],
  fields: ["field_email"],
}, typeformRuntime);
assert.equal(typeformHttpCalls[4].url, "https://api.typeform.com/forms/form_123/responses?page_size=100&since=2026-01-01T00%3A00%3A00&completed=true&response_type=completed&fields=field_email");

const twilioHttpCalls = [];
const twilioRuntime = {
  async http(url, options) {
    twilioHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { sid: "SM123" } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Twilio nested tool call");
  },
};

await twilioSendMessageTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  to: "+15558675310",
  from: "+15557122661",
  body: "Hello from Chidori",
  mediaUrl: ["https://example.com/image.png"],
}, twilioRuntime);
assert.equal(twilioHttpCalls[0].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json");
assert.equal(twilioHttpCalls[0].options.method, "POST");
assert.equal(twilioHttpCalls[0].options.headers.Authorization, "Basic QUMxMjM6dHdpbGlvLXRva2Vu");
assert.match(twilioHttpCalls[0].options.body, /To=%2B15558675310/);
assert.match(twilioHttpCalls[0].options.body, /From=%2B15557122661/);
assert.match(twilioHttpCalls[0].options.body, /Body=Hello\+from\+Chidori/);
assert.match(twilioHttpCalls[0].options.body, /MediaUrl=https%3A%2F%2Fexample.com%2Fimage.png/);

await twilioListMessagesTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  to: "+15558675310",
  pageSize: 5,
}, twilioRuntime);
assert.equal(twilioHttpCalls[1].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json?To=%2B15558675310&PageSize=5");

await twilioGetMessageTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  messageSid: "SM123",
}, twilioRuntime);
assert.equal(twilioHttpCalls[2].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/Messages/SM123.json");

await twilioCreateCallTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  to: "+15558675310",
  from: "+15557122661",
  url: "https://example.com/twiml",
  record: true,
}, twilioRuntime);
assert.equal(twilioHttpCalls[3].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/Calls.json");
assert.equal(twilioHttpCalls[3].options.method, "POST");
assert.match(twilioHttpCalls[3].options.body, /Url=https%3A%2F%2Fexample.com%2Ftwiml/);
assert.match(twilioHttpCalls[3].options.body, /Record=true/);

await twilioListCallsTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  status: "completed",
  pageSize: 10,
}, twilioRuntime);
assert.equal(twilioHttpCalls[4].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/Calls.json?Status=completed&PageSize=10");

await twilioSearchAvailablePhoneNumbersTool.run({
  accountSid: "AC123",
  authToken: { value: "twilio-token" },
  countryCode: "US",
  numberType: "Local",
  areaCode: "415",
  smsEnabled: true,
  limit: 3,
}, twilioRuntime);
assert.equal(twilioHttpCalls[5].url, "https://api.twilio.com/2010-04-01/Accounts/AC123/AvailablePhoneNumbers/US/Local.json?AreaCode=415&SmsEnabled=true&PageSize=3");

const microsoftHttpCalls = [];
const microsoftRuntime = {
  async http(url, options) {
    microsoftHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Microsoft Graph nested tool call");
  },
};

await microsoftGraphRequestTool.run({
  accessToken: { value: "graph-token" },
  method: "GET",
  path: "/me",
  query: { "$select": "id,displayName" },
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[0].url, "https://graph.microsoft.com/v1.0/me?%24select=id%2CdisplayName");
assert.equal(microsoftHttpCalls[0].options.method, "GET");
assert.equal(microsoftHttpCalls[0].options.headers.Authorization, "Bearer graph-token");

await microsoftGraphListMessagesTool.run({
  accessToken: { value: "graph-token" },
  folderId: "inbox",
  top: 5,
  select: ["id", "subject"],
  orderBy: ["receivedDateTime desc"],
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[1].url, "https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?%24top=5&%24select=id%2Csubject&%24orderby=receivedDateTime%20desc");

await microsoftGraphSendMailTool.run({
  accessToken: { value: "graph-token" },
  message: {
    subject: "Smoke test",
    toRecipients: [{ emailAddress: { address: "ada@example.com" } }],
    body: { contentType: "Text", content: "Hello" },
  },
  saveToSentItems: true,
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[2].url, "https://graph.microsoft.com/v1.0/me/sendMail");
assert.equal(microsoftHttpCalls[2].options.method, "POST");
assert.equal(microsoftHttpCalls[2].options.body.message.subject, "Smoke test");
assert.equal(microsoftHttpCalls[2].options.body.saveToSentItems, true);

await microsoftGraphListCalendarEventsTool.run({
  accessToken: { value: "graph-token" },
  startDateTime: "2026-01-01T00:00:00Z",
  endDateTime: "2026-01-02T00:00:00Z",
  top: 10,
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[3].url, "https://graph.microsoft.com/v1.0/me/calendar/calendarView?startDateTime=2026-01-01T00%3A00%3A00Z&endDateTime=2026-01-02T00%3A00%3A00Z&%24top=10");

await microsoftGraphCreateCalendarEventTool.run({
  accessToken: { value: "graph-token" },
  event: {
    subject: "Agent review",
    start: { dateTime: "2026-01-01T10:00:00", timeZone: "UTC" },
    end: { dateTime: "2026-01-01T10:30:00", timeZone: "UTC" },
  },
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[4].url, "https://graph.microsoft.com/v1.0/me/calendar/events");
assert.equal(microsoftHttpCalls[4].options.method, "POST");
assert.equal(microsoftHttpCalls[4].options.body.subject, "Agent review");

await microsoftGraphListDriveChildrenTool.run({
  accessToken: { value: "graph-token" },
  driveId: "drive-1",
  itemId: "item-1",
  select: ["id", "name"],
}, microsoftRuntime);
assert.equal(microsoftHttpCalls[5].url, "https://graph.microsoft.com/v1.0/drives/drive-1/items/item-1/children?%24select=id%2Cname");

const mondayHttpCalls = [];
const mondayRuntime = {
  async http(url, options) {
    mondayHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { data: { ok: true } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected monday.com nested tool call");
  },
};

await mondayGraphQLTool.run({
  token: { value: "monday-token" },
  apiVersion: "2025-10",
  query: "query Me { me { id name } }",
}, mondayRuntime);
assert.equal(mondayHttpCalls[0].url, "https://api.monday.com/v2");
assert.equal(mondayHttpCalls[0].options.method, "POST");
assert.equal(mondayHttpCalls[0].options.headers.Authorization, "monday-token");
assert.equal(mondayHttpCalls[0].options.headers["API-Version"], "2025-10");
assert.equal(mondayHttpCalls[0].options.body.query, "query Me { me { id name } }");

await mondayListBoardsTool.run({
  token: { value: "monday-token" },
  limit: 5,
  boardIds: ["123"],
}, mondayRuntime);
assert.match(mondayHttpCalls[1].options.body.query, /boards/);
assert.equal(mondayHttpCalls[1].options.body.variables.limit, 5);
assert.equal(mondayHttpCalls[1].options.body.variables.ids[0], 123);

await mondayGetBoardItemsTool.run({
  token: { value: "monday-token" },
  boardId: 123,
  limit: 10,
  cursor: "cursor-1",
}, mondayRuntime);
assert.match(mondayHttpCalls[2].options.body.query, /items_page/);
assert.equal(mondayHttpCalls[2].options.body.variables.boardId[0], 123);
assert.equal(mondayHttpCalls[2].options.body.variables.cursor, "cursor-1");

await mondayCreateItemTool.run({
  token: { value: "monday-token" },
  boardId: 123,
  itemName: "Investigate integration failure",
  groupId: "topics",
  columnValues: { status: { label: "Working on it" } },
}, mondayRuntime);
assert.match(mondayHttpCalls[3].options.body.query, /create_item/);
assert.equal(mondayHttpCalls[3].options.body.variables.itemName, "Investigate integration failure");
assert.equal(mondayHttpCalls[3].options.body.variables.columnValues, "{\"status\":{\"label\":\"Working on it\"}}");

await mondayChangeColumnValuesTool.run({
  token: { value: "monday-token" },
  boardId: 123,
  itemId: 456,
  columnValues: { status: { label: "Done" } },
  createLabelsIfMissing: true,
}, mondayRuntime);
assert.match(mondayHttpCalls[4].options.body.query, /change_multiple_column_values/);
assert.equal(mondayHttpCalls[4].options.body.variables.itemId, 456);
assert.equal(mondayHttpCalls[4].options.body.variables.createLabelsIfMissing, true);

await mondayCreateUpdateTool.run({
  token: { value: "monday-token" },
  itemId: 456,
  body: "Smoke test update",
}, mondayRuntime);
assert.match(mondayHttpCalls[5].options.body.query, /create_update/);
assert.equal(mondayHttpCalls[5].options.body.variables.body, "Smoke test update");

const neo4jHttpCalls = [];
const neo4jRuntime = {
  async http(url, options) {
    neo4jHttpCalls.push({ url, options });
    if (options.body.statement.includes("db.labels")) {
      return { status: 202, headers: {}, body: { data: { fields: ["labels"], values: [[["Document", "Person"]]] } } };
    }
    if (options.body.statement.includes("db.relationshipTypes")) {
      return { status: 202, headers: {}, body: { data: { fields: ["relationshipTypes"], values: [[["MENTIONS"]]] } } };
    }
    if (options.body.statement.includes("SHOW INDEXES")) {
      return { status: 202, headers: {}, body: { data: { fields: ["indexes"], values: [[[{
        name: "document_embeddings",
        type: "VECTOR",
        entityType: "NODE",
        labelsOrTypes: ["Document"],
        properties: ["embedding"],
      }]]] } } };
    }
    return { status: 202, headers: {}, body: { data: { fields: ["ok"], values: [[true]] } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Neo4j nested tool call");
  },
};

await neo4jCypherQueryTool.run({
  username: { value: "neo4j" },
  password: { value: "verysecret" },
  baseUrl: "https://db.databases.neo4j.io",
  database: "neo4j",
  statement: "MATCH (n:Document) RETURN n LIMIT $limit",
  parameters: { limit: 2 },
  accessMode: "Read",
  includeCounters: true,
}, neo4jRuntime);
assert.equal(neo4jHttpCalls[0].url, "https://db.databases.neo4j.io/db/neo4j/query/v2");
assert.equal(neo4jHttpCalls[0].options.method, "POST");
assert.equal(neo4jHttpCalls[0].options.headers.Authorization, "Basic bmVvNGo6dmVyeXNlY3JldA==");
assert.equal(neo4jHttpCalls[0].options.body.statement, "MATCH (n:Document) RETURN n LIMIT $limit");
assert.equal(neo4jHttpCalls[0].options.body.parameters.limit, 2);
assert.equal(neo4jHttpCalls[0].options.body.accessMode, "Read");

const neo4jSchema = await neo4jSchemaGetTool.run({
  authorization: { value: "Basic existing-token" },
  baseUrl: "https://db.databases.neo4j.io",
}, neo4jRuntime);
assert.equal(neo4jHttpCalls[1].options.headers.Authorization, "Basic existing-token");
assert.equal(neo4jHttpCalls[1].options.body.statement, "CALL db.labels() YIELD label RETURN collect(label) AS labels");
assert.equal(neo4jHttpCalls[2].options.body.statement, "CALL db.relationshipTypes() YIELD relationshipType RETURN collect(relationshipType) AS relationshipTypes");
assert.match(neo4jHttpCalls[3].options.body.statement, /SHOW INDEXES/);
assert.equal(neo4jSchema.labels[0], "Document");
assert.equal(neo4jSchema.relationshipTypes[0], "MENTIONS");

await neo4jVectorIndexCreateTool.run({
  username: { value: "neo4j" },
  password: { value: "verysecret" },
  baseUrl: "https://db.databases.neo4j.io",
  indexName: "document_embeddings",
  nodeLabel: "Document",
  embeddingProperty: "embedding",
  dimensions: 3,
  similarityFunction: "cosine",
}, neo4jRuntime);
assert.match(neo4jHttpCalls[4].options.body.statement, /CREATE VECTOR INDEX `document_embeddings` IF NOT EXISTS/);
assert.match(neo4jHttpCalls[4].options.body.statement, /FOR \(n:`Document`\)/);
assert.equal(neo4jHttpCalls[4].options.body.parameters.dimensions, 3);
assert.equal(neo4jHttpCalls[4].options.body.parameters.similarityFunction, "cosine");

await neo4jVectorQueryTool.run({
  username: { value: "neo4j" },
  password: { value: "verysecret" },
  baseUrl: "https://db.databases.neo4j.io",
  indexName: "document_embeddings",
  embedding: [0.1, 0.2, 0.3],
  topK: 5,
}, neo4jRuntime);
assert.match(neo4jHttpCalls[5].options.body.statement, /db.index.vector.queryNodes/);
assert.equal(neo4jHttpCalls[5].options.body.parameters.topK, 5);
assert.equal(neo4jHttpCalls[5].options.body.parameters.embedding[2], 0.3);

await neo4jDocumentsUpsertTool.run({
  username: { value: "neo4j" },
  password: { value: "verysecret" },
  baseUrl: "https://db.databases.neo4j.io",
  nodeLabel: "Document",
  documents: [{
    id: "doc-1",
    text: "Graph retrieval note",
    embedding: [0.1, 0.2, 0.3],
    properties: { source: "smoke" },
  }],
}, neo4jRuntime);
assert.match(neo4jHttpCalls[6].options.body.statement, /UNWIND \$documents AS doc/);
assert.match(neo4jHttpCalls[6].options.body.statement, /MERGE \(n:`Document` \{`id`: doc.id\}\)/);
assert.equal(neo4jHttpCalls[6].options.body.parameters.documents[0].properties.source, "smoke");

const linearHttpCalls = [];
const linearRuntime = {
  async http(url, options) {
    linearHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { data: { ok: true } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Linear nested tool call");
  },
};

await linearGraphQLTool.run({
  token: { value: "linear-key" },
  query: "query Viewer { viewer { id name } }",
}, linearRuntime);
assert.equal(linearHttpCalls[0].url, "https://api.linear.app/graphql");
assert.equal(linearHttpCalls[0].options.method, "POST");
assert.equal(linearHttpCalls[0].options.headers.Authorization, "linear-key");
assert.equal(linearHttpCalls[0].options.body.query, "query Viewer { viewer { id name } }");

await linearTeamsListTool.run({
  token: { value: "linear-key" },
  first: 5,
}, linearRuntime);
assert.equal(linearHttpCalls[1].url, "https://api.linear.app/graphql");
assert.match(linearHttpCalls[1].options.body.query, /teams/);
assert.equal(linearHttpCalls[1].options.body.variables.first, 5);

await linearGetIssueTool.run({
  token: { value: "linear-key" },
  issueId: "ENG-123",
}, linearRuntime);
assert.match(linearHttpCalls[2].options.body.query, /issue\(id: \$id\)/);
assert.equal(linearHttpCalls[2].options.body.variables.id, "ENG-123");

await linearCreateIssueTool.run({
  token: { value: "oauth-token" },
  bearer: true,
  input: {
    teamId: "team-1",
    title: "Investigate integration failure",
    description: "Created from smoke test",
  },
}, linearRuntime);
assert.equal(linearHttpCalls[3].options.headers.Authorization, "Bearer oauth-token");
assert.match(linearHttpCalls[3].options.body.query, /issueCreate/);
assert.equal(linearHttpCalls[3].options.body.variables.input.teamId, "team-1");
assert.equal(linearHttpCalls[3].options.body.variables.input.title, "Investigate integration failure");

await linearUpdateIssueTool.run({
  token: { value: "linear-key" },
  issueId: "ENG-123",
  input: { title: "Updated title" },
}, linearRuntime);
assert.match(linearHttpCalls[4].options.body.query, /issueUpdate/);
assert.equal(linearHttpCalls[4].options.body.variables.id, "ENG-123");
assert.equal(linearHttpCalls[4].options.body.variables.input.title, "Updated title");

await linearCreateCommentTool.run({
  token: { value: "linear-key" },
  input: { issueId: "issue-uuid", body: "Smoke test comment" },
}, linearRuntime);
assert.match(linearHttpCalls[5].options.body.query, /commentCreate/);
assert.equal(linearHttpCalls[5].options.body.variables.input.issueId, "issue-uuid");
assert.equal(linearHttpCalls[5].options.body.variables.input.body, "Smoke test comment");

const asanaHttpCalls = [];
const asanaRuntime = {
  async http(url, options) {
    asanaHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { data: { ok: true } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Asana nested tool call");
  },
};

await asanaListProjectsTool.run({
  token: { value: "asana-token" },
  workspace: "workspace-1",
  archived: false,
  optFields: "gid,name,permalink_url",
  limit: 10,
}, asanaRuntime);
assert.equal(asanaHttpCalls[0].url, "https://app.asana.com/api/1.0/projects?workspace=workspace-1&archived=false&opt_fields=gid%2Cname%2Cpermalink_url&limit=10");
assert.equal(asanaHttpCalls[0].options.method, "GET");
assert.equal(asanaHttpCalls[0].options.headers.Authorization, "Bearer asana-token");

await asanaListProjectTasksTool.run({
  token: { value: "asana-token" },
  projectGid: "project-1",
  completedSince: "now",
  optFields: "gid,name,completed",
}, asanaRuntime);
assert.equal(asanaHttpCalls[1].url, "https://app.asana.com/api/1.0/projects/project-1/tasks?completed_since=now&opt_fields=gid%2Cname%2Ccompleted&limit=50");
assert.equal(asanaHttpCalls[1].options.method, "GET");

await asanaSearchWorkspaceTasksTool.run({
  token: { value: "asana-token" },
  workspaceGid: "workspace-1",
  text: "integration failure",
  projectsAny: "project-1",
  completed: false,
  limit: 5,
}, asanaRuntime);
assert.equal(asanaHttpCalls[2].url, "https://app.asana.com/api/1.0/workspaces/workspace-1/tasks/search?text=integration%20failure&projects.any=project-1&completed=false&limit=5");
assert.equal(asanaHttpCalls[2].options.method, "GET");

await asanaGetTaskTool.run({
  token: { value: "asana-token" },
  taskGid: "task-1",
  optFields: "gid,name,notes",
}, asanaRuntime);
assert.equal(asanaHttpCalls[3].url, "https://app.asana.com/api/1.0/tasks/task-1?opt_fields=gid%2Cname%2Cnotes");
assert.equal(asanaHttpCalls[3].options.method, "GET");

await asanaCreateTaskTool.run({
  token: { value: "asana-token" },
  data: {
    name: "Investigate integration failure",
    notes: "Created from smoke test",
    projects: ["project-1"],
  },
}, asanaRuntime);
assert.equal(asanaHttpCalls[4].url, "https://app.asana.com/api/1.0/tasks");
assert.equal(asanaHttpCalls[4].options.method, "POST");
assert.equal(asanaHttpCalls[4].options.body.data.name, "Investigate integration failure");
assert.equal(asanaHttpCalls[4].options.body.data.projects[0], "project-1");

await asanaUpdateTaskTool.run({
  token: { value: "asana-token" },
  taskGid: "task-1",
  data: { completed: true },
  optFields: "gid,completed",
}, asanaRuntime);
assert.equal(asanaHttpCalls[5].url, "https://app.asana.com/api/1.0/tasks/task-1?opt_fields=gid%2Ccompleted");
assert.equal(asanaHttpCalls[5].options.method, "PUT");
assert.equal(asanaHttpCalls[5].options.body.data.completed, true);

await asanaAddTaskCommentTool.run({
  token: { value: "asana-token" },
  taskGid: "task-1",
  text: "Smoke test comment",
}, asanaRuntime);
assert.equal(asanaHttpCalls[6].url, "https://app.asana.com/api/1.0/tasks/task-1/stories");
assert.equal(asanaHttpCalls[6].options.method, "POST");
assert.equal(asanaHttpCalls[6].options.body.data.text, "Smoke test comment");

const airtableHttpCalls = [];
const airtableRuntime = {
  async http(url, options) {
    airtableHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { records: [] } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Airtable nested tool call");
  },
};

await airtableListRecordsTool.run({
  token: { value: "airtable-token" },
  baseId: "app123",
  tableIdOrName: "Tasks",
  view: "Grid view",
  filterByFormula: "TRUE()",
  fields: ["Name", "Status"],
  pageSize: 10,
}, airtableRuntime);
assert.equal(
  airtableHttpCalls[0].url,
  "https://api.airtable.com/v0/app123/Tasks?view=Grid%20view&filterByFormula=TRUE()&fields%5B%5D=Name&fields%5B%5D=Status&pageSize=10",
);
assert.equal(airtableHttpCalls[0].options.method, "GET");
assert.equal(airtableHttpCalls[0].options.headers.Authorization, "Bearer airtable-token");

await airtableGetRecordTool.run({
  token: { value: "airtable-token" },
  baseId: "app123",
  tableIdOrName: "Tasks",
  recordId: "rec123",
}, airtableRuntime);
assert.equal(airtableHttpCalls[1].url, "https://api.airtable.com/v0/app123/Tasks/rec123");
assert.equal(airtableHttpCalls[1].options.method, "GET");

await airtableCreateRecordsTool.run({
  token: { value: "airtable-token" },
  baseId: "app123",
  tableIdOrName: "Tasks",
  records: [{ fields: { Name: "Investigate integration failure", Status: "Open" } }],
  typecast: true,
}, airtableRuntime);
assert.equal(airtableHttpCalls[2].url, "https://api.airtable.com/v0/app123/Tasks");
assert.equal(airtableHttpCalls[2].options.method, "POST");
assert.equal(airtableHttpCalls[2].options.body.records[0].fields.Name, "Investigate integration failure");
assert.equal(airtableHttpCalls[2].options.body.typecast, true);

await airtableUpdateRecordsTool.run({
  token: { value: "airtable-token" },
  baseId: "app123",
  tableIdOrName: "Tasks",
  records: [{ id: "rec123", fields: { Status: "Done" } }],
  performUpsert: { fieldsToMergeOn: ["Name"] },
}, airtableRuntime);
assert.equal(airtableHttpCalls[3].url, "https://api.airtable.com/v0/app123/Tasks");
assert.equal(airtableHttpCalls[3].options.method, "PATCH");
assert.equal(airtableHttpCalls[3].options.body.records[0].id, "rec123");
assert.equal(airtableHttpCalls[3].options.body.performUpsert.fieldsToMergeOn[0], "Name");

await airtableDeleteRecordTool.run({
  token: { value: "airtable-token" },
  baseId: "app123",
  tableIdOrName: "Tasks",
  recordId: "rec123",
}, airtableRuntime);
assert.equal(airtableHttpCalls[4].url, "https://api.airtable.com/v0/app123/Tasks/rec123");
assert.equal(airtableHttpCalls[4].options.method, "DELETE");

const pagerDutyHttpCalls = [];
const pagerDutyRuntime = {
  async http(url, options) {
    pagerDutyHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected PagerDuty nested tool call");
  },
};

await pagerDutyListIncidentsTool.run({
  apiToken: { value: "pagerduty-token" },
  fromEmail: "agent@example.com",
  statuses: ["triggered", "acknowledged"],
  serviceIds: ["svc-1"],
  limit: 10,
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[0].url, "https://api.pagerduty.com/incidents?statuses=triggered%2Cacknowledged&service_ids=svc-1&limit=10");
assert.equal(pagerDutyHttpCalls[0].options.method, "GET");
assert.equal(pagerDutyHttpCalls[0].options.headers.Authorization, "Token token=pagerduty-token");
assert.equal(pagerDutyHttpCalls[0].options.headers.From, "agent@example.com");

await pagerDutyGetIncidentTool.run({
  apiToken: { value: "pagerduty-token" },
  incidentId: "P123",
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[1].url, "https://api.pagerduty.com/incidents/P123");

await pagerDutyUpdateIncidentTool.run({
  apiToken: { value: "pagerduty-token" },
  incidentId: "P123",
  incident: { type: "incident_reference", status: "acknowledged" },
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[2].url, "https://api.pagerduty.com/incidents/P123");
assert.equal(pagerDutyHttpCalls[2].options.method, "PUT");
assert.equal(pagerDutyHttpCalls[2].options.body.incident.status, "acknowledged");

await pagerDutyCreateIncidentNoteTool.run({
  apiToken: { value: "pagerduty-token" },
  incidentId: "P123",
  content: "Smoke test note",
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[3].url, "https://api.pagerduty.com/incidents/P123/notes");
assert.equal(pagerDutyHttpCalls[3].options.method, "POST");
assert.equal(pagerDutyHttpCalls[3].options.body.note.content, "Smoke test note");

await pagerDutyListServicesTool.run({
  apiToken: { value: "pagerduty-token" },
  query: "api",
  include: ["teams"],
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[4].url, "https://api.pagerduty.com/services?query=api&include=teams");

await pagerDutyListUsersTool.run({
  apiToken: { value: "pagerduty-token" },
  query: "Ada",
  limit: 5,
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[5].url, "https://api.pagerduty.com/users?query=Ada&limit=5");

await pagerDutySendEventTool.run({
  routingKey: { value: "routing-key" },
  eventAction: "trigger",
  dedupKey: "dedup-1",
  payload: {
    summary: "Smoke test alert",
    source: "chidori-smoke",
    severity: "critical",
  },
}, pagerDutyRuntime);
assert.equal(pagerDutyHttpCalls[6].url, "https://events.pagerduty.com/v2/enqueue");
assert.equal(pagerDutyHttpCalls[6].options.method, "POST");
assert.equal(pagerDutyHttpCalls[6].options.body.routing_key, "routing-key");
assert.equal(pagerDutyHttpCalls[6].options.body.event_action, "trigger");
assert.equal(pagerDutyHttpCalls[6].options.body.payload.severity, "critical");

const openAICompatibleHttpCalls = [];
const openAICompatibleRuntime = {
  async http(url, options) {
    openAICompatibleHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected OpenAI-compatible nested tool call");
  },
};

await deepInfraChatCompletionsTool.run({
  apiKey: { value: "deepinfra-key" },
  model: "deepseek-ai/DeepSeek-V3",
  messages: [{ role: "user", content: "Hello" }],
  maxTokens: 32,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[0].url, "https://api.deepinfra.com/v1/openai/chat/completions");
assert.equal(openAICompatibleHttpCalls[0].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[0].options.headers.Authorization, "Bearer deepinfra-key");
assert.equal(openAICompatibleHttpCalls[0].options.body.model, "deepseek-ai/DeepSeek-V3");
assert.equal(openAICompatibleHttpCalls[0].options.body.max_tokens, 32);

await deepInfraEmbeddingsTool.run({
  apiKey: { value: "deepinfra-key" },
  model: "Qwen/Qwen3-Embedding-8B",
  input: ["hello", "world"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[1].url, "https://api.deepinfra.com/v1/openai/embeddings");
assert.equal(openAICompatibleHttpCalls[1].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[1].options.headers.Authorization, "Bearer deepinfra-key");
assert.equal(openAICompatibleHttpCalls[1].options.body.input[0], "hello");

await zhipuAiChatCompletionsTool.run({
  apiKey: { value: "zhipu-key" },
  model: "glm-4.7",
  messages: [{ role: "user", content: "Hello" }],
  temperature: 0.7,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[2].url, "https://open.bigmodel.cn/api/paas/v4/chat/completions");
assert.equal(openAICompatibleHttpCalls[2].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[2].options.headers.Authorization, "Bearer zhipu-key");
assert.equal(openAICompatibleHttpCalls[2].options.body.model, "glm-4.7");
assert.equal(openAICompatibleHttpCalls[2].options.body.temperature, 0.7);

await zhipuAiEmbeddingsTool.run({
  apiKey: { value: "zhipu-key" },
  model: "embedding-3",
  input: "hello",
  dimensions: 1024,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[3].url, "https://open.bigmodel.cn/api/paas/v4/embeddings");
assert.equal(openAICompatibleHttpCalls[3].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[3].options.headers.Authorization, "Bearer zhipu-key");
assert.equal(openAICompatibleHttpCalls[3].options.body.model, "embedding-3");
assert.equal(openAICompatibleHttpCalls[3].options.body.dimensions, 1024);

await moonshotChatCompletionsTool.run({
  apiKey: { value: "moonshot-key" },
  model: "moonshot-v1-32k",
  messages: [{ role: "user", content: "Hello" }],
  extraBody: { max_completion_tokens: 64 },
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[4].url, "https://api.moonshot.ai/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[4].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[4].options.headers.Authorization, "Bearer moonshot-key");
assert.equal(openAICompatibleHttpCalls[4].options.body.model, "moonshot-v1-32k");
assert.equal(openAICompatibleHttpCalls[4].options.body.max_completion_tokens, 64);

await dashScopeChatCompletionsTool.run({
  apiKey: { value: "dashscope-key" },
  model: "qwen-plus",
  messages: [{ role: "user", content: "Hello" }],
  topP: 0.8,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[5].url, "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[5].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[5].options.headers.Authorization, "Bearer dashscope-key");
assert.equal(openAICompatibleHttpCalls[5].options.body.model, "qwen-plus");
assert.equal(openAICompatibleHttpCalls[5].options.body.top_p, 0.8);

await dashScopeEmbeddingsTool.run({
  apiKey: { value: "dashscope-key" },
  model: "text-embedding-v4",
  input: "hello",
  dimensions: 1024,
  extraBody: { encoding_format: "float" },
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[6].url, "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/embeddings");
assert.equal(openAICompatibleHttpCalls[6].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[6].options.headers.Authorization, "Bearer dashscope-key");
assert.equal(openAICompatibleHttpCalls[6].options.body.model, "text-embedding-v4");
assert.equal(openAICompatibleHttpCalls[6].options.body.dimensions, 1024);
assert.equal(openAICompatibleHttpCalls[6].options.body.encoding_format, "float");

await miniMaxChatCompletionsTool.run({
  apiKey: { value: "minimax-key" },
  model: "MiniMax-M2.7",
  messages: [{ role: "user", content: "Hello" }],
  maxTokens: 64,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[7].url, "https://api.minimax.io/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[7].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[7].options.headers.Authorization, "Bearer minimax-key");
assert.equal(openAICompatibleHttpCalls[7].options.body.model, "MiniMax-M2.7");
assert.equal(openAICompatibleHttpCalls[7].options.body.max_tokens, 64);

await novitaChatCompletionsTool.run({
  apiKey: { value: "novita-key" },
  model: "deepseek/deepseek-r1",
  messages: [{ role: "user", content: "Hello" }],
  temperature: 0,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[8].url, "https://api.novita.ai/openai/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[8].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[8].options.headers.Authorization, "Bearer novita-key");
assert.equal(openAICompatibleHttpCalls[8].options.body.model, "deepseek/deepseek-r1");
assert.equal(openAICompatibleHttpCalls[8].options.body.temperature, 0);

await friendliChatCompletionsTool.run({
  apiKey: { value: "friendli-key" },
  model: "meta-llama-3.3-70b-instruct",
  messages: [{ role: "user", content: "Hello" }],
  maxTokens: 128,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[9].url, "https://api.friendli.ai/serverless/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[9].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[9].options.headers.Authorization, "Bearer friendli-key");
assert.equal(openAICompatibleHttpCalls[9].options.body.model, "meta-llama-3.3-70b-instruct");
assert.equal(openAICompatibleHttpCalls[9].options.body.max_tokens, 128);

await sambaNovaChatCompletionsTool.run({
  apiKey: { value: "sambanova-key" },
  model: "Meta-Llama-3.1-8B-Instruct",
  messages: [{ role: "user", content: "Hello" }],
  topP: 0.9,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[10].url, "https://api.sambanova.ai/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[10].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[10].options.headers.Authorization, "Bearer sambanova-key");
assert.equal(openAICompatibleHttpCalls[10].options.body.model, "Meta-Llama-3.1-8B-Instruct");
assert.equal(openAICompatibleHttpCalls[10].options.body.top_p, 0.9);

await sambaNovaEmbeddingsTool.run({
  apiKey: { value: "sambanova-key" },
  model: "E5-Mistral-7B-Instruct",
  input: ["hello", "world"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[11].url, "https://api.sambanova.ai/v1/embeddings");
assert.equal(openAICompatibleHttpCalls[11].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[11].options.headers.Authorization, "Bearer sambanova-key");
assert.equal(openAICompatibleHttpCalls[11].options.body.model, "E5-Mistral-7B-Instruct");
assert.equal(openAICompatibleHttpCalls[11].options.body.input[0], "hello");

await premAiChatCompletionsTool.run({
  apiKey: { value: "premai-key" },
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello" }],
  maxTokens: 64,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[12].url, "https://studio.premai.io/api/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[12].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[12].options.headers.Authorization, "Bearer premai-key");
assert.equal(openAICompatibleHttpCalls[12].options.body.model, "gpt-4o");
assert.equal(openAICompatibleHttpCalls[12].options.body.max_tokens, 64);

await fireworksCompletionsTool.run({
  apiKey: { value: "fireworks-key" },
  model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
  prompt: "Write a haiku",
  maxTokens: 24,
  stop: ["\n\n"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[13].url, "https://api.fireworks.ai/inference/v1/completions");
assert.equal(openAICompatibleHttpCalls[13].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[13].options.headers.Authorization, "Bearer fireworks-key");
assert.equal(openAICompatibleHttpCalls[13].options.body.model, "accounts/fireworks/models/llama-v3p1-8b-instruct");
assert.equal(openAICompatibleHttpCalls[13].options.body.prompt, "Write a haiku");
assert.equal(openAICompatibleHttpCalls[13].options.body.max_tokens, 24);
assert.equal(openAICompatibleHttpCalls[13].options.body.stop[0], "\n\n");

await fireworksEmbeddingsTool.run({
  apiKey: { value: "fireworks-key" },
  model: "nomic-ai/nomic-embed-text-v1.5",
  input: ["hello", "world"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[14].url, "https://api.fireworks.ai/inference/v1/embeddings");
assert.equal(openAICompatibleHttpCalls[14].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[14].options.headers.Authorization, "Bearer fireworks-key");
assert.equal(openAICompatibleHttpCalls[14].options.body.model, "nomic-ai/nomic-embed-text-v1.5");
assert.equal(openAICompatibleHttpCalls[14].options.body.input[0], "hello");

await sambaNovaCompletionsTool.run({
  apiKey: { value: "sambanova-key" },
  model: "gpt-oss-120b",
  prompt: "Complete this sentence:",
  temperature: 0.2,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[15].url, "https://api.sambanova.ai/v1/completions");
assert.equal(openAICompatibleHttpCalls[15].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[15].options.headers.Authorization, "Bearer sambanova-key");
assert.equal(openAICompatibleHttpCalls[15].options.body.model, "gpt-oss-120b");
assert.equal(openAICompatibleHttpCalls[15].options.body.prompt, "Complete this sentence:");
assert.equal(openAICompatibleHttpCalls[15].options.body.temperature, 0.2);

await githubModelsChatCompletionsTool.run({
  apiKey: { value: "github-token" },
  model: "openai/gpt-4.1",
  messages: [{ role: "user", content: "Hello" }],
  apiVersion: "2026-03-10",
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[16].url, "https://models.github.ai/inference/chat/completions");
assert.equal(openAICompatibleHttpCalls[16].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[16].options.headers.Authorization, "Bearer github-token");
assert.equal(openAICompatibleHttpCalls[16].options.headers.Accept, "application/vnd.github+json");
assert.equal(openAICompatibleHttpCalls[16].options.headers["X-GitHub-Api-Version"], "2026-03-10");
assert.equal(openAICompatibleHttpCalls[16].options.body.model, "openai/gpt-4.1");
assert.equal(openAICompatibleHttpCalls[16].options.body.messages[0].content, "Hello");

await githubModelsEmbeddingsTool.run({
  apiKey: { value: "github-token" },
  model: "openai/text-embedding-3-small",
  input: ["hello", "world"],
  apiVersion: "2026-03-10",
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[17].url, "https://models.github.ai/inference/embeddings");
assert.equal(openAICompatibleHttpCalls[17].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[17].options.headers.Authorization, "Bearer github-token");
assert.equal(openAICompatibleHttpCalls[17].options.headers.Accept, "application/vnd.github+json");
assert.equal(openAICompatibleHttpCalls[17].options.headers["X-GitHub-Api-Version"], "2026-03-10");
assert.equal(openAICompatibleHttpCalls[17].options.body.model, "openai/text-embedding-3-small");
assert.equal(openAICompatibleHttpCalls[17].options.body.input[0], "hello");

await togetherCompletionsTool.run({
  apiKey: { value: "together-key" },
  model: "Qwen/Qwen3.5-9B",
  prompt: "The largest city in France is",
  maxTokens: 1,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[18].url, "https://api.together.ai/v1/completions");
assert.equal(openAICompatibleHttpCalls[18].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[18].options.headers.Authorization, "Bearer together-key");
assert.equal(openAICompatibleHttpCalls[18].options.body.model, "Qwen/Qwen3.5-9B");
assert.equal(openAICompatibleHttpCalls[18].options.body.prompt, "The largest city in France is");
assert.equal(openAICompatibleHttpCalls[18].options.body.max_tokens, 1);

await togetherRerankTool.run({
  apiKey: { value: "together-key" },
  model: "Salesforce/Llama-Rank-v1",
  query: "What animals can I find near Peru?",
  documents: [
    { title: "Llama", text: "The llama is a domesticated South American camelid." },
    { title: "Panda", text: "The giant panda is endemic to China." },
  ],
  topN: 1,
  returnDocuments: true,
  rankFields: ["title", "text"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[19].url, "https://api.together.ai/v1/rerank");
assert.equal(openAICompatibleHttpCalls[19].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[19].options.headers.Authorization, "Bearer together-key");
assert.equal(openAICompatibleHttpCalls[19].options.body.model, "Salesforce/Llama-Rank-v1");
assert.equal(openAICompatibleHttpCalls[19].options.body.query, "What animals can I find near Peru?");
assert.equal(openAICompatibleHttpCalls[19].options.body.documents[0].title, "Llama");
assert.equal(openAICompatibleHttpCalls[19].options.body.top_n, 1);
assert.equal(openAICompatibleHttpCalls[19].options.body.return_documents, true);
assert.equal(openAICompatibleHttpCalls[19].options.body.rank_fields[0], "title");

await tencentHunyuanChatCompletionsTool.run({
  apiKey: { value: "hunyuan-key" },
  model: "hunyuan-turbos-latest",
  messages: [{ role: "user", content: "Hello" }],
  extraBody: { enable_enhancement: true },
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[20].url, "https://api.hunyuan.cloud.tencent.com/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[20].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[20].options.headers.Authorization, "Bearer hunyuan-key");
assert.equal(openAICompatibleHttpCalls[20].options.body.model, "hunyuan-turbos-latest");
assert.equal(openAICompatibleHttpCalls[20].options.body.enable_enhancement, true);

await volcengineDoubaoChatCompletionsTool.run({
  apiKey: { value: "volcengine-key" },
  model: "doubao-seed-1-6-250615",
  messages: [{ role: "user", content: "Hello" }],
  temperature: 0.3,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[21].url, "https://ark.cn-beijing.volces.com/api/v3/chat/completions");
assert.equal(openAICompatibleHttpCalls[21].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[21].options.headers.Authorization, "Bearer volcengine-key");
assert.equal(openAICompatibleHttpCalls[21].options.body.model, "doubao-seed-1-6-250615");
assert.equal(openAICompatibleHttpCalls[21].options.body.temperature, 0.3);

await volcengineDoubaoEmbeddingsTool.run({
  apiKey: { value: "volcengine-key" },
  model: "doubao-embedding-text",
  input: ["hello"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[22].url, "https://ark.cn-beijing.volces.com/api/v3/embeddings");
assert.equal(openAICompatibleHttpCalls[22].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[22].options.headers.Authorization, "Bearer volcengine-key");
assert.equal(openAICompatibleHttpCalls[22].options.body.model, "doubao-embedding-text");
assert.equal(openAICompatibleHttpCalls[22].options.body.input[0], "hello");

await volcengineDoubaoResponsesTool.run({
  apiKey: { value: "volcengine-key" },
  model: "doubao-seed-1-6-250615",
  input: "Hello",
  maxOutputTokens: 64,
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[23].url, "https://ark.cn-beijing.volces.com/api/v3/responses");
assert.equal(openAICompatibleHttpCalls[23].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[23].options.headers.Authorization, "Bearer volcengine-key");
assert.equal(openAICompatibleHttpCalls[23].options.body.model, "doubao-seed-1-6-250615");
assert.equal(openAICompatibleHttpCalls[23].options.body.max_output_tokens, 64);

await miniMaxEmbeddingsTool.run({
  apiKey: { value: "minimax-key" },
  groupId: { value: "minimax-group" },
  texts: ["hello\nworld"],
  model: "embo-01",
  type: "query",
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[24].url, "https://api.minimax.chat/v1/embeddings?GroupId=minimax-group");
assert.equal(openAICompatibleHttpCalls[24].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[24].options.headers.Authorization, "Bearer minimax-key");
assert.equal(openAICompatibleHttpCalls[24].options.body.model, "embo-01");
assert.equal(openAICompatibleHttpCalls[24].options.body.texts[0], "hello world");
assert.equal(openAICompatibleHttpCalls[24].options.body.type, "query");

await huggingFaceEmbeddingsTool.run({
  apiKey: { value: "hf-token" },
  model: "BAAI/bge-base-en-v1.5",
  input: ["hello", "world"],
  normalize: true,
  promptName: "query",
  truncate: true,
  truncationDirection: "right",
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[25].url, "https://router.huggingface.co/hf-inference/models/BAAI/bge-base-en-v1.5/pipeline/feature-extraction");
assert.equal(openAICompatibleHttpCalls[25].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[25].options.headers.Authorization, "Bearer hf-token");
assert.equal(openAICompatibleHttpCalls[25].options.body.inputs[0], "hello");
assert.equal(openAICompatibleHttpCalls[25].options.body.normalize, true);
assert.equal(openAICompatibleHttpCalls[25].options.body.prompt_name, "query");
assert.equal(openAICompatibleHttpCalls[25].options.body.truncate, true);
assert.equal(openAICompatibleHttpCalls[25].options.body.truncation_direction, "right");

await tencentHunyuanEmbeddingsTool.run({
  apiKey: { value: "hunyuan-key" },
  input: "你好",
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[26].url, "https://api.hunyuan.cloud.tencent.com/v1/embeddings");
assert.equal(openAICompatibleHttpCalls[26].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[26].options.headers.Authorization, "Bearer hunyuan-key");
assert.equal(openAICompatibleHttpCalls[26].options.body.model, "hunyuan-embedding");
assert.equal(openAICompatibleHttpCalls[26].options.body.input, "你好");

await premAiEmbeddingsTool.run({
  apiKey: { value: "premai-key" },
  projectId: 8,
  model: "text-embedding-3-large",
  input: ["hello", "world"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[27].url, "https://studio.premai.io/api/v1/embeddings");
assert.equal(openAICompatibleHttpCalls[27].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[27].options.headers.Authorization, "Bearer premai-key");
assert.equal(openAICompatibleHttpCalls[27].options.body.project_id, 8);
assert.equal(openAICompatibleHttpCalls[27].options.body.model, "text-embedding-3-large");
assert.equal(openAICompatibleHttpCalls[27].options.body.input[0], "hello");

await upstageChatCompletionsTool.run({
  apiKey: { value: "upstage-key" },
  model: "solar-pro3",
  messages: [{ role: "user", content: "Hello" }],
  extraBody: { reasoning_effort: "high" },
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[28].url, "https://api.upstage.ai/v1/chat/completions");
assert.equal(openAICompatibleHttpCalls[28].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[28].options.headers.Authorization, "Bearer upstage-key");
assert.equal(openAICompatibleHttpCalls[28].options.body.model, "solar-pro3");
assert.equal(openAICompatibleHttpCalls[28].options.body.reasoning_effort, "high");

await upstageEmbeddingsTool.run({
  apiKey: { value: "upstage-key" },
  model: "solar-embedding-1-large-passage",
  input: ["hello", "world"],
}, openAICompatibleRuntime);
assert.equal(openAICompatibleHttpCalls[29].url, "https://api.upstage.ai/v1/solar/embeddings");
assert.equal(openAICompatibleHttpCalls[29].options.method, "POST");
assert.equal(openAICompatibleHttpCalls[29].options.headers.Authorization, "Bearer upstage-key");
assert.equal(openAICompatibleHttpCalls[29].options.body.model, "solar-embedding-1-large-passage");
assert.equal(openAICompatibleHttpCalls[29].options.body.input[0], "hello");

const writerHttpCalls = [];
const writerRuntime = {
  async http(url, options) {
    writerHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Writer nested tool call");
  },
};

await writerChatTool.run({
  apiKey: { value: "writer-key" },
  model: "palmyra-x5",
  messages: [{ role: "user", content: "Write a concise launch memo." }],
  maxTokens: 128,
  topP: 0.9,
  extraBody: { service_tier: "standard" },
}, writerRuntime);
assert.equal(writerHttpCalls[0].url, "https://api.writer.com/v1/chat");
assert.equal(writerHttpCalls[0].options.method, "POST");
assert.equal(writerHttpCalls[0].options.headers.Authorization, "Bearer writer-key");
assert.equal(writerHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(writerHttpCalls[0].options.body.model, "palmyra-x5");
assert.equal(writerHttpCalls[0].options.body.messages[0].content, "Write a concise launch memo.");
assert.equal(writerHttpCalls[0].options.body.max_tokens, 128);
assert.equal(writerHttpCalls[0].options.body.top_p, 0.9);
assert.equal(writerHttpCalls[0].options.body.service_tier, "standard");

const yandexHttpCalls = [];
const yandexRuntime = {
  async http(url, options) {
    yandexHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: url.includes("textEmbedding") ? { embedding: [0.1, 0.2] } : { result: { alternatives: [] } },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Yandex nested tool call");
  },
};

await yandexFoundationCompletionTool.run({
  credential: { value: "yandex-iam-token" },
  folderId: "folder-1",
  messages: [{ role: "user", text: "Hello" }],
  temperature: 0.2,
  maxTokens: 64,
  reasoningMode: "DISABLED",
}, yandexRuntime);
assert.equal(yandexHttpCalls[0].url, "https://llm.api.cloud.yandex.net/foundationModels/v1/completion");
assert.equal(yandexHttpCalls[0].options.method, "POST");
assert.equal(yandexHttpCalls[0].options.headers.Authorization, "Bearer yandex-iam-token");
assert.equal(yandexHttpCalls[0].options.headers["x-folder-id"], "folder-1");
assert.equal(yandexHttpCalls[0].options.body.modelUri, "gpt://folder-1/yandexgpt/latest");
assert.equal(yandexHttpCalls[0].options.body.completionOptions.maxTokens, "64");
assert.equal(yandexHttpCalls[0].options.body.messages[0].text, "Hello");

await yandexFoundationTextEmbeddingTool.run({
  credential: { value: "yandex-api-key" },
  authType: "api-key",
  folderId: "folder-1",
  text: ["find this"],
  modelName: "text-search-query",
  dim: 256,
}, yandexRuntime);
assert.equal(yandexHttpCalls[1].url, "https://llm.api.cloud.yandex.net/foundationModels/v1/textEmbedding");
assert.equal(yandexHttpCalls[1].options.headers.Authorization, "Api-Key yandex-api-key");
assert.equal(yandexHttpCalls[1].options.body.modelUri, "emb://folder-1/text-search-query/latest");
assert.equal(yandexHttpCalls[1].options.body.text, "find this");
assert.equal(yandexHttpCalls[1].options.body.dim, "256");

const jinaHttpCalls = [];
const jinaRuntime = {
  async http(url, options) {
    jinaHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Jina nested tool call");
  },
};

await jinaEmbeddingsTool.run({
  apiKey: { value: "jina-key" },
  model: "jina-embeddings-v4",
  input: ["hello", "world"],
  task: "retrieval.passage",
  dimensions: 1024,
}, jinaRuntime);
assert.equal(jinaHttpCalls[0].url, "https://api.jina.ai/v1/embeddings");
assert.equal(jinaHttpCalls[0].options.method, "POST");
assert.equal(jinaHttpCalls[0].options.headers.Authorization, "Bearer jina-key");
assert.equal(jinaHttpCalls[0].options.body.model, "jina-embeddings-v4");
assert.equal(jinaHttpCalls[0].options.body.task, "retrieval.passage");
assert.equal(jinaHttpCalls[0].options.body.dimensions, 1024);

await jinaRerankTool.run({
  apiKey: { value: "jina-key" },
  model: "jina-reranker-v2-base-multilingual",
  query: "installation guide",
  documents: ["Install Chidori", "Pricing page"],
  topN: 1,
  returnDocuments: true,
}, jinaRuntime);
assert.equal(jinaHttpCalls[1].url, "https://api.jina.ai/v1/rerank");
assert.equal(jinaHttpCalls[1].options.method, "POST");
assert.equal(jinaHttpCalls[1].options.headers.Authorization, "Bearer jina-key");
assert.equal(jinaHttpCalls[1].options.body.query, "installation guide");
assert.equal(jinaHttpCalls[1].options.body.top_n, 1);
assert.equal(jinaHttpCalls[1].options.body.return_documents, true);

const contextualHttpCalls = [];
const contextualRuntime = {
  async http(url, options) {
    contextualHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { results: [{ index: 0, relevance_score: 0.9 }] } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Contextual nested tool call");
  },
};

await contextualRerankTool.run({
  apiKey: { value: "contextual-key" },
  model: "ctxl-rerank-v2-instruct-multilingual",
  query: "What is the current enterprise pricing?",
  documents: ["Internal enterprise sales note", "Older market analysis"],
  instruction: "Prioritize internal sales documents over market analysis reports.",
  metadata: ["Date: January 15, 2025", "Date: November 30, 2023"],
  topN: 1,
}, contextualRuntime);
assert.equal(contextualHttpCalls[0].url, "https://api.contextual.ai/v1/rerank");
assert.equal(contextualHttpCalls[0].options.method, "POST");
assert.equal(contextualHttpCalls[0].options.headers.Authorization, "Bearer contextual-key");
assert.equal(contextualHttpCalls[0].options.body.model, "ctxl-rerank-v2-instruct-multilingual");
assert.equal(contextualHttpCalls[0].options.body.query, "What is the current enterprise pricing?");
assert.equal(contextualHttpCalls[0].options.body.documents[0], "Internal enterprise sales note");
assert.equal(contextualHttpCalls[0].options.body.instruction, "Prioritize internal sales documents over market analysis reports.");
assert.equal(contextualHttpCalls[0].options.body.metadata[0], "Date: January 15, 2025");
assert.equal(contextualHttpCalls[0].options.body.top_n, 1);

const mixedbreadHttpCalls = [];
const mixedbreadRuntime = {
  async http(url, options) {
    mixedbreadHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { data: [], model: "mixedbread-ai/mxbai-rerank-large-v2" } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Mixedbread nested tool call");
  },
};

await mixedbreadRerankTool.run({
  apiKey: { value: "mixedbread-key" },
  model: "mixedbread-ai/mxbai-rerank-large-v2",
  query: "Who wrote To Kill a Mockingbird?",
  input: [
    "To Kill a Mockingbird is a novel by Harper Lee.",
    "Moby-Dick was written by Herman Melville.",
  ],
  topK: 1,
  returnInput: true,
  rewriteQuery: false,
}, mixedbreadRuntime);
assert.equal(mixedbreadHttpCalls[0].url, "https://api.mixedbread.com/v1/reranking");
assert.equal(mixedbreadHttpCalls[0].options.method, "POST");
assert.equal(mixedbreadHttpCalls[0].options.headers.Authorization, "Bearer mixedbread-key");
assert.equal(mixedbreadHttpCalls[0].options.body.model, "mixedbread-ai/mxbai-rerank-large-v2");
assert.equal(mixedbreadHttpCalls[0].options.body.query, "Who wrote To Kill a Mockingbird?");
assert.equal(mixedbreadHttpCalls[0].options.body.input[0], "To Kill a Mockingbird is a novel by Harper Lee.");
assert.equal(mixedbreadHttpCalls[0].options.body.top_k, 1);
assert.equal(mixedbreadHttpCalls[0].options.body.return_input, true);
assert.equal(mixedbreadHttpCalls[0].options.body.rewrite_query, false);

const nomicHttpCalls = [];
const nomicRuntime = {
  async http(url, options) {
    nomicHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { embeddings: [[0.1, 0.2, 0.3]], usage: { total_tokens: 2 } } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Nomic nested tool call");
  },
};

await nomicTextEmbeddingsTool.run({
  apiKey: { value: "nomic-key" },
  texts: ["hello", "world"],
  taskType: "search_document",
  dimensionality: 256,
}, nomicRuntime);
assert.equal(nomicHttpCalls[0].url, "https://api-atlas.nomic.ai/v1/embedding/text");
assert.equal(nomicHttpCalls[0].options.method, "POST");
assert.equal(nomicHttpCalls[0].options.headers.Authorization, "Bearer nomic-key");
assert.equal(nomicHttpCalls[0].options.body.model, "nomic-embed-text-v1.5");
assert.equal(nomicHttpCalls[0].options.body.texts[0], "hello");
assert.equal(nomicHttpCalls[0].options.body.task_type, "search_document");
assert.equal(nomicHttpCalls[0].options.body.dimensionality, 256);

const webHttpCalls = [];
const webRuntime = {
  async http(url, options) {
    webHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected web nested tool call");
  },
};

await googleScholarSearchTool.run({
  apiKey: { value: "serpapi-key" },
  query: "neural networks",
  num: 5,
  yearLow: 2020,
  yearHigh: 2026,
}, webRuntime);
assert.match(webHttpCalls[0].url, /engine=google_scholar/);
assert.match(webHttpCalls[0].url, /q=neural%20networks/);
assert.match(webHttpCalls[0].url, /as_ylo=2020/);
assert.match(webHttpCalls[0].url, /as_yhi=2026/);
assert.match(webHttpCalls[0].url, /api_key=serpapi-key/);

await googleTrendsSearchTool.run({
  apiKey: { value: "serpapi-key" },
  query: ["chidori", "integrations"],
  dataType: "RELATED_QUERIES",
  date: "today 12-m",
  geo: "US",
}, webRuntime);
assert.match(webHttpCalls[1].url, /engine=google_trends/);
assert.match(webHttpCalls[1].url, /q=chidori%2Cintegrations/);
assert.match(webHttpCalls[1].url, /data_type=RELATED_QUERIES/);
assert.match(webHttpCalls[1].url, /date=today%2012-m/);
assert.match(webHttpCalls[1].url, /geo=US/);

await googleJobsSearchTool.run({
  apiKey: { value: "serpapi-key" },
  query: "software engineer",
  location: "Austin, Texas, United States",
  gl: "us",
  hl: "en",
}, webRuntime);
assert.match(webHttpCalls[2].url, /engine=google_jobs/);
assert.match(webHttpCalls[2].url, /q=software%20engineer/);
assert.match(webHttpCalls[2].url, /location=Austin%2C%20Texas%2C%20United%20States/);
assert.match(webHttpCalls[2].url, /gl=us/);
assert.match(webHttpCalls[2].url, /hl=en/);

await googleSerperSearchTool.run({
  apiKey: { value: "serper-key" },
  query: "chidori agents",
  endpoint: "news",
  gl: "us",
  hl: "en",
  num: 3,
}, webRuntime);
assert.equal(webHttpCalls[3].url, "https://google.serper.dev/news");
assert.equal(webHttpCalls[3].options.method, "POST");
assert.equal(webHttpCalls[3].options.headers["X-API-KEY"], "serper-key");
assert.equal(webHttpCalls[3].options.body.q, "chidori agents");
assert.equal(webHttpCalls[3].options.body.num, 3);

await jinaSearchTool.run({
  apiKey: { value: "jina-key" },
  query: "langgraph tutorial",
}, webRuntime);
assert.equal(webHttpCalls[4].url, "https://s.jina.ai/?q=langgraph%20tutorial");
assert.equal(webHttpCalls[4].options.method, "GET");
assert.equal(webHttpCalls[4].options.headers.Authorization, "Bearer jina-key");
assert.equal(webHttpCalls[4].options.headers.accept, "text/markdown");

await linkupSearchTool.run({
  apiKey: { value: "linkup-key" },
  query: "What is Microsoft's 2024 revenue?",
  depth: "deep",
  outputType: "sourcedAnswer",
  includeDomains: ["microsoft.com"],
  excludeDomains: ["wikipedia.org"],
  maxResults: 5,
}, webRuntime);
assert.equal(webHttpCalls[5].url, "https://api.linkup.so/v1/search");
assert.equal(webHttpCalls[5].options.method, "POST");
assert.equal(webHttpCalls[5].options.headers.Authorization, "Bearer linkup-key");
assert.equal(webHttpCalls[5].options.body.q, "What is Microsoft's 2024 revenue?");
assert.equal(webHttpCalls[5].options.body.depth, "deep");
assert.equal(webHttpCalls[5].options.body.outputType, "sourcedAnswer");
assert.equal(webHttpCalls[5].options.body.includeDomains[0], "microsoft.com");

await bingWebSearchTool.run({
  apiKey: { value: "bing-key" },
  query: "chidori agents",
  market: "en-US",
  count: 3,
  offset: 2,
  safeSearch: "Moderate",
  responseFilter: ["Webpages", "News"],
  textFormat: "Raw",
  textDecorations: false,
}, webRuntime);
assert.match(webHttpCalls[6].url, /^https:\/\/api\.bing\.microsoft\.com\/v7\.0\/search\?/);
assert.match(webHttpCalls[6].url, /q=chidori%20agents/);
assert.match(webHttpCalls[6].url, /mkt=en-US/);
assert.match(webHttpCalls[6].url, /count=3/);
assert.match(webHttpCalls[6].url, /offset=2/);
assert.match(webHttpCalls[6].url, /safeSearch=Moderate/);
assert.match(webHttpCalls[6].url, /responseFilter=Webpages%2CNews/);
assert.match(webHttpCalls[6].url, /textFormat=Raw/);
assert.match(webHttpCalls[6].url, /textDecorations=false/);
assert.equal(webHttpCalls[6].options.method, "GET");
assert.equal(webHttpCalls[6].options.headers["Ocp-Apim-Subscription-Key"], "bing-key");
assert.equal(webHttpCalls[6].options.headers.accept, "application/json");

await mojeekSearchTool.run({
  apiKey: { value: "mojeek-key" },
  query: "chidori agents",
  count: 10,
  start: 11,
  languageBoost: "EN",
  languageBoostWeight: 100,
  regionBoost: "GB",
  regionBoostWeight: 10,
  safeSearch: true,
  includeDate: true,
  includeDomains: ["chidori.dev", ".example.com"],
  excludeDomains: ["spam.example"],
}, webRuntime);
assert.match(webHttpCalls[7].url, /^https:\/\/api\.mojeek\.com\/search\?/);
assert.match(webHttpCalls[7].url, /api_key=mojeek-key/);
assert.match(webHttpCalls[7].url, /q=chidori%20agents/);
assert.match(webHttpCalls[7].url, /t=10/);
assert.match(webHttpCalls[7].url, /s=11/);
assert.match(webHttpCalls[7].url, /lb=EN/);
assert.match(webHttpCalls[7].url, /lbb=100/);
assert.match(webHttpCalls[7].url, /rb=GB/);
assert.match(webHttpCalls[7].url, /rbb=10/);
assert.match(webHttpCalls[7].url, /safe=1/);
assert.match(webHttpCalls[7].url, /date=1/);
assert.match(webHttpCalls[7].url, /fmt=json/);
assert.match(webHttpCalls[7].url, /fi=chidori\.dev%2C\.example\.com/);
assert.match(webHttpCalls[7].url, /fe=spam\.example/);
assert.equal(webHttpCalls[7].options.method, "GET");
assert.equal(webHttpCalls[7].options.headers.accept, "application/json");

await parallelSearchTool.run({
  apiKey: { value: "parallel-key" },
  objective: "Find recent Chidori agent integration documentation.",
  searchQueries: ["Chidori agent integrations", "Chidori TypeScript agents"],
  mode: "basic",
  maxCharsTotal: 4000,
  sessionId: "session_test",
  clientModel: "gpt-5",
  advancedSettings: { source_policy: { include_domains: ["chidori.dev"] } },
}, webRuntime);
assert.equal(webHttpCalls[8].url, "https://api.parallel.ai/v1/search");
assert.equal(webHttpCalls[8].options.method, "POST");
assert.equal(webHttpCalls[8].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[8].options.headers["x-api-key"], "parallel-key");
assert.equal(webHttpCalls[8].options.body.objective, "Find recent Chidori agent integration documentation.");
assert.equal(webHttpCalls[8].options.body.search_queries[0], "Chidori agent integrations");
assert.equal(webHttpCalls[8].options.body.mode, "basic");
assert.equal(webHttpCalls[8].options.body.max_chars_total, 4000);
assert.equal(webHttpCalls[8].options.body.session_id, "session_test");
assert.equal(webHttpCalls[8].options.body.client_model, "gpt-5");
assert.equal(webHttpCalls[8].options.body.advanced_settings.source_policy.include_domains[0], "chidori.dev");

await parallelExtractTool.run({
  apiKey: { value: "parallel-key" },
  urls: ["https://example.com/article"],
  objective: "Summarize the article.",
  searchQueries: ["example article"],
  maxCharsTotal: 3000,
  sessionId: "session_test",
  clientModel: "gpt-5",
  excerptSettings: { max_chars_per_result: 1500 },
  fullContent: { max_chars_per_result: 5000 },
}, webRuntime);
assert.equal(webHttpCalls[9].url, "https://api.parallel.ai/v1/extract");
assert.equal(webHttpCalls[9].options.method, "POST");
assert.equal(webHttpCalls[9].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[9].options.headers["x-api-key"], "parallel-key");
assert.equal(webHttpCalls[9].options.body.urls[0], "https://example.com/article");
assert.equal(webHttpCalls[9].options.body.objective, "Summarize the article.");
assert.equal(webHttpCalls[9].options.body.search_queries[0], "example article");
assert.equal(webHttpCalls[9].options.body.max_chars_total, 3000);
assert.equal(webHttpCalls[9].options.body.session_id, "session_test");
assert.equal(webHttpCalls[9].options.body.client_model, "gpt-5");
assert.equal(webHttpCalls[9].options.body.advanced_settings.excerpt_settings.max_chars_per_result, 1500);
assert.equal(webHttpCalls[9].options.body.advanced_settings.full_content.max_chars_per_result, 5000);

await nimbleSearchTool.run({
  apiKey: { value: "nimble-key" },
  query: "agent runtime docs",
  locale: "en-US",
  country: "US",
  outputFormat: "markdown",
  maxResults: 4,
  focus: "coding",
  contentType: ["documents", "pdf"],
  searchDepth: "fast",
  includeAnswer: true,
  includeDomains: ["chidori.dev"],
  excludeDomains: ["spam.example"],
  startDate: "2026-01-01",
  endDate: "2026-05-21",
}, webRuntime);
assert.equal(webHttpCalls[10].url, "https://sdk.nimbleway.com/v1/search");
assert.equal(webHttpCalls[10].options.method, "POST");
assert.equal(webHttpCalls[10].options.headers.Authorization, "Bearer nimble-key");
assert.equal(webHttpCalls[10].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[10].options.body.query, "agent runtime docs");
assert.equal(webHttpCalls[10].options.body.locale, "en-US");
assert.equal(webHttpCalls[10].options.body.country, "US");
assert.equal(webHttpCalls[10].options.body.output_format, "markdown");
assert.equal(webHttpCalls[10].options.body.max_results, 4);
assert.equal(webHttpCalls[10].options.body.focus, "coding");
assert.equal(webHttpCalls[10].options.body.content_type[0], "documents");
assert.equal(webHttpCalls[10].options.body.search_depth, "fast");
assert.equal(webHttpCalls[10].options.body.include_answer, true);
assert.equal(webHttpCalls[10].options.body.include_domains[0], "chidori.dev");
assert.equal(webHttpCalls[10].options.body.exclude_domains[0], "spam.example");
assert.equal(webHttpCalls[10].options.body.start_date, "2026-01-01");
assert.equal(webHttpCalls[10].options.body.end_date, "2026-05-21");

await dappierRealTimeSearchTool.run({
  apiKey: { value: "dappier-key" },
  aiModelId: "am_test",
  query: "latest agent data news",
}, webRuntime);
assert.equal(webHttpCalls[11].url, "https://api.dappier.com/app/aimodel/am_test");
assert.equal(webHttpCalls[11].options.method, "POST");
assert.equal(webHttpCalls[11].options.headers.Authorization, "Bearer dappier-key");
assert.equal(webHttpCalls[11].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[11].options.body.query, "latest agent data news");

await valyuSearchTool.run({
  apiKey: { value: "valyu-key" },
  query: "latest AI inference datacenter projects",
  maxNumResults: 6,
  searchType: "all",
  maxPrice: 20,
  relevanceThreshold: 0.65,
  includedSources: ["web", "valyu/valyu-arxiv"],
  excludedSources: ["reddit.com"],
  sourceBiases: { "nasa.gov": 5 },
  instructions: "Prefer primary sources.",
  startDate: "2026-01-01",
  endDate: "2026-05-21",
  fastMode: false,
}, webRuntime);
assert.equal(webHttpCalls[12].url, "https://api.valyu.ai/v1/search");
assert.equal(webHttpCalls[12].options.method, "POST");
assert.equal(webHttpCalls[12].options.headers["X-API-Key"], "valyu-key");
assert.equal(webHttpCalls[12].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[12].options.body.query, "latest AI inference datacenter projects");
assert.equal(webHttpCalls[12].options.body.max_num_results, 6);
assert.equal(webHttpCalls[12].options.body.search_type, "all");
assert.equal(webHttpCalls[12].options.body.max_price, 20);
assert.equal(webHttpCalls[12].options.body.relevance_threshold, 0.65);
assert.equal(webHttpCalls[12].options.body.included_sources[0], "web");
assert.equal(webHttpCalls[12].options.body.excluded_sources[0], "reddit.com");
assert.equal(webHttpCalls[12].options.body.source_biases["nasa.gov"], 5);
assert.equal(webHttpCalls[12].options.body.instructions, "Prefer primary sources.");
assert.equal(webHttpCalls[12].options.body.start_date, "2026-01-01");
assert.equal(webHttpCalls[12].options.body.end_date, "2026-05-21");
assert.equal(webHttpCalls[12].options.body.fast_mode, false);

await perplexitySearchTool.run({
  apiKey: { value: "perplexity-key" },
  query: ["latest agent research", "new AI workflow papers"],
  country: "US",
  maxResults: 5,
  maxTokens: 2048,
  maxTokensPerPage: 512,
  searchLanguageFilter: ["en"],
  searchDomainFilter: ["example.com"],
  lastUpdatedAfterFilter: "05/01/2026",
  searchAfterDateFilter: "01/01/2026",
  searchRecencyFilter: "week",
}, webRuntime);
assert.equal(webHttpCalls[13].url, "https://api.perplexity.ai/search");
assert.equal(webHttpCalls[13].options.method, "POST");
assert.equal(webHttpCalls[13].options.headers.Authorization, "Bearer perplexity-key");
assert.equal(webHttpCalls[13].options.headers["content-type"], "application/json");
assert.equal(webHttpCalls[13].options.body.query[0], "latest agent research");
assert.equal(webHttpCalls[13].options.body.country, "US");
assert.equal(webHttpCalls[13].options.body.max_results, 5);
assert.equal(webHttpCalls[13].options.body.max_tokens, 2048);
assert.equal(webHttpCalls[13].options.body.max_tokens_per_page, 512);
assert.equal(webHttpCalls[13].options.body.search_language_filter[0], "en");
assert.equal(webHttpCalls[13].options.body.search_domain_filter[0], "example.com");
assert.equal(webHttpCalls[13].options.body.last_updated_after_filter, "05/01/2026");
assert.equal(webHttpCalls[13].options.body.search_after_date_filter, "01/01/2026");
assert.equal(webHttpCalls[13].options.body.search_recency_filter, "week");

const loaderHttpCalls = [];
const loaderRuntime = {
  async http(url, options) {
    loaderHttpCalls.push({ url, options });
    const body = url.includes("storage.googleapis.com")
      ? "GCS object text"
      : url.includes("blob.core.windows.net")
        ? "Azure blob text"
        : url.includes("s3.us-west-2.amazonaws.com")
          ? "S3 object text"
          : url.includes("ifixit.com/api/2.0/wikis/CATEGORY/iPhone%204")
            ? {
              wikiid: 1198,
              namespace: "CATEGORY",
              title: "iPhone 4",
              display_title: "iPhone 4 Repair",
              contents_raw: "Background and identification text.",
            }
            : url.includes("ifixit.com/api/2.0/suggest/iPhone")
              ? {
                query: "iPhone",
                results: [{ dataType: "wiki", wikiid: 6757, title: "iPhone 4 Verizon", display_title: "iPhone 4 CDMA Repair" }],
              }
            : url.includes("ifixit.com/api/2.0/documents/abc123-def456")
            ? {
              documentid: 123,
              guid: "abc123-def456",
              title: "Example Document",
              filename: "example.pdf",
              download_url: "https://ifixit.com/document/download",
            }
              : url.includes("api.parallel.ai/v1/extract")
                ? {
                  extract_id: "extract_123",
                  session_id: "session_test",
                  results: [{
                    url: "https://example.com/article",
                    title: "Loaded Parallel Article",
                    excerpts: ["Loaded from Parallel Extract."],
                  }],
                  errors: [],
                }
              : url.includes("slack.com/api/conversations.history")
                ? {
                  ok: true,
                  messages: [{
                    type: "message",
                    user: "U123",
                    text: "Loaded from Slack",
                    ts: "1716230000.000100",
                  }],
                  response_metadata: { next_cursor: "next-cursor" },
                }
                : url.includes("discord.com/api/v10/channels/C123/messages")
                  ? [{
                    id: "112233",
                    channel_id: "C123",
                    author: { id: "U123", username: "ada" },
                    content: "Loaded from Discord",
                    timestamp: "2026-05-20T12:00:00.000000+00:00",
                  }]
                  : url.includes("example.my.salesforce.com/services/data/v66.0/query")
                    ? {
                      totalSize: 1,
                      done: true,
                      records: [{
                        attributes: { type: "Account", url: "/services/data/v66.0/sobjects/Account/001" },
                        Id: "001",
                        Name: "Acme Corp",
                      }],
                    }
                    : url.includes("api.hubapi.com/crm/v3/objects/contacts")
                      ? {
                        results: [{
                          id: "101",
                          createdAt: "2026-05-20T12:00:00.000Z",
                          updatedAt: "2026-05-20T12:30:00.000Z",
                          archived: false,
                          properties: { email: "ada@example.com", firstname: "Ada" },
                        }],
                        paging: { next: { after: "102" } },
                      }
                      : url.includes("api.stripe.com/v1/charges")
                        ? {
                          object: "list",
                          url: "/v1/charges",
                          has_more: false,
                          data: [{
                            id: "ch_123",
                            object: "charge",
                            description: "Loaded from Stripe",
                            amount: 2198,
                            currency: "usd",
                            created: 1716230000,
                            livemode: false,
                          }],
                        }
                        : url.includes("example.myshopify.com/admin/api/2026-04/products.json")
                          ? {
                            products: [{
                              id: 921728736,
                              admin_graphql_api_id: "gid://shopify/Product/921728736",
                              title: "Loaded from Shopify",
                              status: "active",
                              created_at: "2026-01-09T17:26:48-05:00",
                              updated_at: "2026-01-09T17:27:46-05:00",
                            }],
                          }
                          : url.includes("example.zendesk.com/api/v2/search.json")
                            ? {
                              results: [{
                                id: 123,
                                result_type: "ticket",
                                subject: "Loaded from Zendesk",
                                status: "open",
                                priority: "high",
                                created_at: "2026-01-09T17:26:48Z",
                                updated_at: "2026-01-09T17:27:46Z",
                                url: "https://example.zendesk.com/api/v2/tickets/123.json",
                              }],
                              count: 1,
                              next_page: null,
                              previous_page: null,
                            }
                            : url.includes("api.typeform.com/forms/form_123/responses")
                              ? {
                                total_items: 1,
                                page_count: 1,
                                items: [{
                                  token: "response_123",
                                  response_type: "completed",
                                  landed_at: "2026-01-09T17:26:48Z",
                                  submitted_at: "2026-01-09T17:27:46Z",
                                  answers: [{
                                    type: "email",
                                    email: "ada@example.com",
                                    field: { id: "field_email", ref: "email" },
                                  }],
                                }],
                              }
                              : url.includes("dev.service-now.com/api/now/table/incident")
                                ? {
                                  result: [{
                                    sys_id: "abc123",
                                    number: "INC0010001",
                                    short_description: "Loaded from ServiceNow",
                                    state: "2",
                                    priority: "1",
                                    sys_created_on: "2026-01-09 17:26:48",
                                    sys_updated_on: "2026-01-09 17:27:46",
                                  }],
                                }
                                : url.includes("example.com/feed.xml")
                                  ? `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Example Atom</title>
  <entry>
    <title>Atom Entry</title>
    <link href="https://example.com/atom-entry" />
    <id>tag:example.com,2026:atom-entry</id>
    <updated>2026-05-20T12:00:00Z</updated>
    <summary>Loaded from Atom</summary>
  </entry>
</feed>`
              : url.includes("ifixit.com/api/2.0/guides/42")
            ? {
              guideid: 42,
              title: "Replace battery",
              category: "Phone",
              steps: [{ title: "Open the case", lines: [{ text_raw: "Remove two screws." }] }],
            }
            : url.includes("ifixit.com/api/2.0/guides")
              ? [{ guideid: 42, title: "Replace battery", category: "Phone" }]
              : { content: "Transcript text", lang: "en", availableLangs: ["en"] };
    return { status: 200, headers: {}, body };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected loader nested tool call");
  },
};

await googleCloudStorageObjectLoaderTool.run({
  accessToken: { value: "google-token" },
  bucket: "agent-bucket",
  object: "docs/agent notes.txt",
  userProject: "billing-project",
}, loaderRuntime);
assert.equal(loaderHttpCalls[0].url, "https://storage.googleapis.com/storage/v1/b/agent-bucket/o/docs%2Fagent%20notes.txt?alt=media&userProject=billing-project");
assert.equal(loaderHttpCalls[0].options.method, "GET");
assert.equal(loaderHttpCalls[0].options.headers.Authorization, "Bearer google-token");

await azureBlobFileLoaderTool.run({
  sasToken: { value: "sv=2025-01-05&sig=abc123" },
  accountName: "agentstore",
  container: "docs",
  blob: "agent notes.txt",
}, loaderRuntime);
assert.equal(loaderHttpCalls[1].url, "https://agentstore.blob.core.windows.net/docs/agent%20notes.txt?sv=2025-01-05&sig=abc123");
assert.equal(loaderHttpCalls[1].options.method, "GET");

await awsS3ObjectLoaderTool.run({
  bucket: "agent-bucket",
  key: "docs/agent notes.txt",
  region: "us-west-2",
  versionId: "version-1",
  headers: { Authorization: "AWS4-HMAC-SHA256 Credential=example" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[2].url, "https://agent-bucket.s3.us-west-2.amazonaws.com/docs/agent%20notes.txt?versionId=version-1");
assert.equal(loaderHttpCalls[2].options.method, "GET");
assert.equal(loaderHttpCalls[2].options.headers.Authorization, "AWS4-HMAC-SHA256 Credential=example");

await supadataTranscriptLoaderTool.run({
  apiKey: { value: "supadata-key" },
  url: "https://youtu.be/dQw4w9WgXcQ",
  lang: "en",
  text: true,
  mode: "auto",
}, loaderRuntime);
assert.match(loaderHttpCalls[3].url, /\/v1\/transcript\?/);
assert.match(loaderHttpCalls[3].url, /url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ/);
assert.match(loaderHttpCalls[3].url, /lang=en/);
assert.match(loaderHttpCalls[3].url, /text=true/);
assert.match(loaderHttpCalls[3].url, /mode=auto/);
assert.equal(loaderHttpCalls[3].options.headers["x-api-key"], "supadata-key");

await supadataMetadataLoaderTool.run({
  apiKey: { value: "supadata-key" },
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}, loaderRuntime);
assert.match(loaderHttpCalls[4].url, /\/v1\/metadata\?/);
assert.match(loaderHttpCalls[4].url, /url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ/);
assert.equal(loaderHttpCalls[4].options.headers["x-api-key"], "supadata-key");

const youtubeTranscriptResult = await youtubeTranscriptLoaderTool.run({
  url: "https://www.youtube.com/watch?v=video123",
  transcript: {
    events: [{
      tStartMs: 1000,
      dDurationMs: 2000,
      segs: [{ utf8: "Loaded " }, { utf8: "from YouTube" }],
    }],
  },
  transcriptFormat: "chunks",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(youtubeTranscriptResult.documents[0].pageContent, /Loaded from YouTube/);
assert.equal(youtubeTranscriptResult.documents[0].metadata.videoId, "video123");
assert.equal(youtubeTranscriptResult.documents[0].metadata.workflow, "smoke");

const sonioxTranscriptResult = await sonioxTranscriptLoaderTool.run({
  transcript: {
    id: "soniox_tx_1",
    status: "completed",
    model: "stt-async-v4",
    text: "Loaded from Soniox.",
  },
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(sonioxTranscriptResult.documents[0].pageContent, /Loaded from Soniox/);
assert.equal(sonioxTranscriptResult.documents[0].metadata.source, "soniox");
assert.equal(sonioxTranscriptResult.documents[0].metadata.transcriptionId, "soniox_tx_1");
assert.equal(sonioxTranscriptResult.documents[0].metadata.workflow, "smoke");

const imsdbScriptResult = await imsdbScriptLoaderTool.run({
  url: "https://imsdb.com/scripts/Example.html",
  html: "<html><head><title>Example Script at IMSDB.</title></head><body><pre>CUT TO:\nGRACE\nA scene.</pre></body></html>",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(imsdbScriptResult.documents[0].pageContent, /CUT TO/);
assert.equal(imsdbScriptResult.documents[0].metadata.title, "Example");
assert.equal(imsdbScriptResult.documents[0].metadata.workflow, "smoke");

const cheerioWebResult = await cheerioWebLoaderTool.run({
  url: "https://example.com/post",
  html: "<html><body><main><p>Loaded with selector.</p></main><footer>Skip footer</footer></body></html>",
  selector: "main",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(cheerioWebResult.documents[0].pageContent, /Loaded with selector/);
assert.doesNotMatch(cheerioWebResult.documents[0].pageContent, /Skip footer/);
assert.equal(cheerioWebResult.documents[0].metadata.selector, "main");
assert.equal(cheerioWebResult.documents[0].metadata.workflow, "smoke");

const recursiveUrlResult = await recursiveUrlLoaderTool.run({
  pages: [
    { url: "https://example.com/", html: "<main>Root</main>" },
    { url: "https://example.com/about", html: "<main>About</main>" },
  ],
  selector: "main",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(recursiveUrlResult.documents.length, 2);
assert.match(recursiveUrlResult.documents[1].pageContent, /About/);
assert.equal(recursiveUrlResult.documents[1].metadata.source, "https://example.com/about");
assert.equal(recursiveUrlResult.documents[1].metadata.workflow, "smoke");

const firecrawlResult = await firecrawlLoaderTool.run({
  result: {
    data: [{
      markdown: "Firecrawl loaded content.",
      metadata: { title: "Loaded", sourceURL: "https://example.com/loaded" },
    }],
  },
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(firecrawlResult.documents[0].pageContent, /Firecrawl loaded content/);
assert.equal(firecrawlResult.documents[0].metadata.source, "firecrawl");
assert.equal(firecrawlResult.documents[0].metadata.title, "Loaded");
assert.equal(firecrawlResult.documents[0].metadata.workflow, "smoke");

const parallelExtractLoadResult = await parallelExtractLoaderTool.run({
  apiKey: { value: "parallel-key" },
  urls: ["https://example.com/article"],
  objective: "Summarize the article.",
  searchQueries: ["example article"],
  maxCharsTotal: 3000,
  sessionId: "session_test",
  clientModel: "gpt-5",
  excerptSettings: { max_chars_per_result: 1500 },
  fullContent: true,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[5].url, "https://api.parallel.ai/v1/extract");
assert.equal(loaderHttpCalls[5].options.method, "POST");
assert.equal(loaderHttpCalls[5].options.headers["content-type"], "application/json");
assert.equal(loaderHttpCalls[5].options.headers["x-api-key"], "parallel-key");
assert.equal(loaderHttpCalls[5].options.body.urls[0], "https://example.com/article");
assert.equal(loaderHttpCalls[5].options.body.objective, "Summarize the article.");
assert.equal(loaderHttpCalls[5].options.body.search_queries[0], "example article");
assert.equal(loaderHttpCalls[5].options.body.max_chars_total, 3000);
assert.equal(loaderHttpCalls[5].options.body.session_id, "session_test");
assert.equal(loaderHttpCalls[5].options.body.client_model, "gpt-5");
assert.equal(loaderHttpCalls[5].options.body.advanced_settings.excerpt_settings.max_chars_per_result, 1500);
assert.equal(loaderHttpCalls[5].options.body.advanced_settings.full_content, true);
assert.match(parallelExtractLoadResult.documents[0].pageContent, /Loaded from Parallel Extract/);
assert.equal(parallelExtractLoadResult.documents[0].metadata.source, "parallel_extract");
assert.equal(parallelExtractLoadResult.documents[0].metadata.workflow, "smoke");

const notionMarkdownExportResult = await notionMarkdownExportLoaderTool.run({
  files: [{
    path: "Docs/Roadmap 0123456789abcdef0123456789abcdef.md",
    markdown: "# Roadmap\n\nShip loader coverage.",
  }],
  stripMarkdown: true,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(notionMarkdownExportResult.documents[0].pageContent, /Ship loader coverage/);
assert.equal(notionMarkdownExportResult.documents[0].metadata.source, "notion_markdown");
assert.equal(notionMarkdownExportResult.documents[0].metadata.pageId, "01234567-89ab-cdef-0123-456789abcdef");
assert.equal(notionMarkdownExportResult.documents[0].metadata.workflow, "smoke");

const collegeConfidentialResult = await collegeConfidentialLoaderTool.run({
  url: "https://www.collegeconfidential.com/colleges/brown-university/",
  html: "<html><body><main class=\"skin-handler\"><h1>Brown University</h1><p>About Brown.</p></main></body></html>",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(collegeConfidentialResult.documents[0].pageContent, /About Brown/);
assert.equal(collegeConfidentialResult.documents[0].metadata.title, "Brown University");
assert.equal(collegeConfidentialResult.documents[0].metadata.workflow, "smoke");

const iFixitGuideListResult = await iFixitGuidesLoaderTool.run({
  guideIds: [42, "43"],
  filter: "replacement",
  order: "DESC",
  limit: 2,
  offset: 1,
  modifiedSince: 1700000000,
}, loaderRuntime);
assert.match(loaderHttpCalls[6].url, /https:\/\/www\.ifixit\.com\/api\/2\.0\/guides\?/);
assert.match(loaderHttpCalls[6].url, /guideids=42%2C43/);
assert.match(loaderHttpCalls[6].url, /filter=replacement/);
assert.match(loaderHttpCalls[6].url, /order=DESC/);
assert.match(loaderHttpCalls[6].url, /limit=2/);
assert.match(loaderHttpCalls[6].url, /offset=1/);
assert.match(loaderHttpCalls[6].url, /modifiedSince=1700000000/);
assert.equal(iFixitGuideListResult.documents[0].metadata.source, "ifixit");

const iFixitGuideResult = await iFixitGuideLoaderTool.run({
  guideId: 42,
  excludePrerequisiteSteps: true,
  langId: "en",
}, loaderRuntime);
assert.equal(loaderHttpCalls[7].url, "https://www.ifixit.com/api/2.0/guides/42?excludePrerequisiteSteps=true&langid=en");
assert.equal(loaderHttpCalls[7].options.method, "GET");
assert.match(iFixitGuideResult.documents[0].pageContent, /Remove two screws/);

const iFixitWikiResult = await iFixitWikiLoaderTool.run({
  title: "iPhone 4",
  namespace: "CATEGORY",
  langId: "en",
}, loaderRuntime);
assert.equal(loaderHttpCalls[8].url, "https://www.ifixit.com/api/2.0/wikis/CATEGORY/iPhone%204?langid=en");
assert.equal(loaderHttpCalls[8].options.method, "GET");
assert.match(iFixitWikiResult.documents[0].pageContent, /iPhone 4 Repair/);

const iFixitSuggestResult = await iFixitSuggestLoaderTool.run({
  query: "iPhone",
  docTypes: ["guide", "device", "question"],
}, loaderRuntime);
assert.equal(loaderHttpCalls[9].url, "https://www.ifixit.com/api/2.0/suggest/iPhone?doctypes=guide%2Cdevice%2Cquestion");
assert.equal(loaderHttpCalls[9].options.method, "GET");
assert.equal(iFixitSuggestResult.documents[0].metadata.wikiId, 6757);

const iFixitDocumentResult = await iFixitDocumentLoaderTool.run({
  documentIdOrGuid: "abc123-def456",
}, loaderRuntime);
assert.equal(loaderHttpCalls[10].url, "https://www.ifixit.com/api/2.0/documents/abc123-def456");
assert.equal(loaderHttpCalls[10].options.method, "GET");
assert.equal(iFixitDocumentResult.documents[0].metadata.documentId, 123);

const slackConversationResult = await slackConversationLoaderTool.run({
  token: { value: "slack-token" },
  channel: "C123",
  latest: "1716239999.000100",
  limit: 2,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[11].url, "https://slack.com/api/conversations.history?channel=C123&latest=1716239999.000100&limit=2");
assert.equal(loaderHttpCalls[11].options.method, "GET");
assert.equal(loaderHttpCalls[11].options.headers.Authorization, "Bearer slack-token");
assert.equal(slackConversationResult.documents[0].pageContent, "Loaded from Slack");
assert.equal(slackConversationResult.documents[0].metadata.channelId, "C123");
assert.equal(slackConversationResult.documents[0].metadata.workflow, "smoke");

const discordChannelMessagesResult = await discordChannelMessagesLoaderTool.run({
  token: { value: "discord-token" },
  channelId: "C123",
  before: "223344",
  limit: 2,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[12].url, "https://discord.com/api/v10/channels/C123/messages?before=223344&limit=2");
assert.equal(loaderHttpCalls[12].options.method, "GET");
assert.equal(loaderHttpCalls[12].options.headers.Authorization, "Bearer discord-token");
assert.equal(discordChannelMessagesResult.documents[0].pageContent, "Loaded from Discord");
assert.equal(discordChannelMessagesResult.documents[0].metadata.channelId, "C123");
assert.equal(discordChannelMessagesResult.documents[0].metadata.workflow, "smoke");

const githubRepositoryResult = await githubRepositoryLoaderTool.run({
  githubUrl: "https://github.com/chidori/integrations",
  ref: "main",
  files: [{
    name: "agent.ts",
    path: "src/agent.ts",
    encoding: "base64",
    content: "ZXhwb3J0IGNvbnN0IGFnZW50ID0gJ2NoaWRvcmknOwo=",
  }],
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(githubRepositoryResult.documents[0].pageContent, /agent = 'chidori'/);
assert.equal(githubRepositoryResult.documents[0].metadata.owner, "chidori");
assert.equal(githubRepositoryResult.documents[0].metadata.repo, "integrations");
assert.equal(githubRepositoryResult.documents[0].metadata.path, "src/agent.ts");
assert.equal(githubRepositoryResult.documents[0].metadata.workflow, "smoke");

const serpApiSearchLoadResult = await serpApiSearchLoaderTool.run({
  results: {
    search_parameters: { q: "agent memory" },
    organic_results: [{ title: "Memory", link: "https://example.com/memory", snippet: "Agent memory result." }],
  },
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(serpApiSearchLoadResult.documents[0].pageContent, /Agent memory result/);
assert.equal(serpApiSearchLoadResult.documents[0].metadata.source, "serpapi");
assert.equal(serpApiSearchLoadResult.documents[0].metadata.workflow, "smoke");

const searchApiSearchLoadResult = await searchApiSearchLoaderTool.run({
  results: {
    search_parameters: { q: "agent tools" },
    organic_results: [{ title: "Tools", link: "https://example.com/tools", snippet: "Agent tools result." }],
  },
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.match(searchApiSearchLoadResult.documents[0].pageContent, /Agent tools result/);
assert.equal(searchApiSearchLoadResult.documents[0].metadata.source, "searchapi");
assert.equal(searchApiSearchLoadResult.documents[0].metadata.workflow, "smoke");

const salesforceSoqlResult = await salesforceSoqlLoaderTool.run({
  accessToken: { value: "salesforce-token" },
  instanceUrl: "https://example.my.salesforce.com",
  query: "SELECT Id, Name FROM Account LIMIT 1",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[13].url, "https://example.my.salesforce.com/services/data/v66.0/query?q=SELECT%20Id%2C%20Name%20FROM%20Account%20LIMIT%201");
assert.equal(loaderHttpCalls[13].options.method, "GET");
assert.equal(loaderHttpCalls[13].options.headers.Authorization, "Bearer salesforce-token");
assert.equal(salesforceSoqlResult.documents[0].metadata.recordId, "001");
assert.equal(salesforceSoqlResult.documents[0].metadata.workflow, "smoke");

const hubSpotCrmObjectsResult = await hubSpotCrmObjectsLoaderTool.run({
  token: { value: "hubspot-token" },
  objectType: "contacts",
  properties: ["email", "firstname"],
  limit: 1,
  after: "100",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[14].url, "https://api.hubapi.com/crm/v3/objects/contacts?limit=1&after=100&properties=email%2Cfirstname");
assert.equal(loaderHttpCalls[14].options.method, "GET");
assert.equal(loaderHttpCalls[14].options.headers.Authorization, "Bearer hubspot-token");
assert.equal(hubSpotCrmObjectsResult.documents[0].metadata.objectId, "101");
assert.equal(hubSpotCrmObjectsResult.documents[0].metadata.workflow, "smoke");

const stripeResourceResult = await stripeResourceLoaderTool.run({
  apiKey: { value: "stripe-key" },
  resource: "charges",
  limit: 3,
  startingAfter: "ch_prev",
  created: { gte: 1710000000 },
  customer: "cus_123",
  stripeVersion: "2025-03-31.basil",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[15].url, "https://api.stripe.com/v1/charges?limit=3&starting_after=ch_prev&created%5Bgte%5D=1710000000&customer=cus_123");
assert.equal(loaderHttpCalls[15].options.method, "GET");
assert.equal(loaderHttpCalls[15].options.headers.Authorization, "Bearer stripe-key");
assert.equal(loaderHttpCalls[15].options.headers["Stripe-Version"], "2025-03-31.basil");
assert.equal(stripeResourceResult.documents[0].metadata.resource, "charges");
assert.equal(stripeResourceResult.documents[0].metadata.resourceId, "ch_123");
assert.equal(stripeResourceResult.documents[0].metadata.workflow, "smoke");

const shopifyResourceResult = await shopifyResourceLoaderTool.run({
  token: { value: "shopify-token" },
  shop: "example.myshopify.com",
  resource: "products",
  limit: 2,
  status: "active",
  vendor: "Apple",
  fields: ["id", "title", "status"],
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[16].url, "https://example.myshopify.com/admin/api/2026-04/products.json?limit=2&status=active&vendor=Apple&fields=id%2Ctitle%2Cstatus");
assert.equal(loaderHttpCalls[16].options.method, "GET");
assert.equal(loaderHttpCalls[16].options.headers["X-Shopify-Access-Token"], "shopify-token");
assert.equal(shopifyResourceResult.documents[0].metadata.resource, "products");
assert.equal(shopifyResourceResult.documents[0].metadata.recordId, "921728736");
assert.equal(shopifyResourceResult.documents[0].metadata.workflow, "smoke");

const zendeskSupportResult = await zendeskSupportLoaderTool.run({
  email: "agent@example.com",
  apiToken: { value: "zendesk-token" },
  baseUrl: "https://example.zendesk.com/api/v2",
  resource: "search",
  query: "type:ticket status:open",
  sortBy: "created_at",
  sortOrder: "desc",
  perPage: 25,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[17].url, "https://example.zendesk.com/api/v2/search.json?query=type%3Aticket%20status%3Aopen&sort_by=created_at&sort_order=desc&per_page=25");
assert.equal(loaderHttpCalls[17].options.method, "GET");
assert.equal(loaderHttpCalls[17].options.headers.Authorization, "Basic YWdlbnRAZXhhbXBsZS5jb20vdG9rZW46emVuZGVzay10b2tlbg==");
assert.equal(zendeskSupportResult.documents[0].metadata.resource, "search");
assert.equal(zendeskSupportResult.documents[0].metadata.recordId, "123");
assert.equal(zendeskSupportResult.documents[0].metadata.resultType, "ticket");
assert.equal(zendeskSupportResult.documents[0].metadata.workflow, "smoke");

const typeformResourceResult = await typeformResourceLoaderTool.run({
  token: { value: "typeform-token" },
  resource: "responses",
  formId: "form_123",
  pageSize: 100,
  since: "2026-01-01T00:00:00",
  completed: true,
  responseType: ["completed"],
  fields: ["field_email"],
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[18].url, "https://api.typeform.com/forms/form_123/responses?page_size=100&since=2026-01-01T00%3A00%3A00&completed=true&response_type=completed&fields=field_email");
assert.equal(loaderHttpCalls[18].options.method, "GET");
assert.equal(loaderHttpCalls[18].options.headers.Authorization, "Bearer typeform-token");
assert.match(typeformResourceResult.documents[0].pageContent, /email: ada@example.com/);
assert.equal(typeformResourceResult.documents[0].metadata.resource, "responses");
assert.equal(typeformResourceResult.documents[0].metadata.recordId, "response_123");
assert.equal(typeformResourceResult.documents[0].metadata.workflow, "smoke");

const serviceNowTableRecordsResult = await serviceNowTableRecordsLoaderTool.run({
  oauthToken: { value: "servicenow-token" },
  instanceUrl: "https://dev.service-now.com",
  table: "incident",
  query: "active=true",
  fields: ["sys_id", "number", "short_description"],
  displayValue: "all",
  excludeReferenceLink: true,
  limit: 1,
  offset: 2,
  view: "default",
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[19].url, "https://dev.service-now.com/api/now/table/incident?sysparm_query=active%3Dtrue&sysparm_fields=sys_id%2Cnumber%2Cshort_description&sysparm_display_value=all&sysparm_exclude_reference_link=true&sysparm_limit=1&sysparm_offset=2&sysparm_view=default");
assert.equal(loaderHttpCalls[19].options.method, "GET");
assert.equal(loaderHttpCalls[19].options.headers.Authorization, "Bearer servicenow-token");
assert.equal(serviceNowTableRecordsResult.documents[0].metadata.table, "incident");
assert.equal(serviceNowTableRecordsResult.documents[0].metadata.sysId, "abc123");
assert.equal(serviceNowTableRecordsResult.documents[0].metadata.workflow, "smoke");

const rssFeedResult = await rssFeedLoaderTool.run({
  url: "https://example.com/feed.xml",
  maxItems: 1,
  metadata: { workflow: "smoke" },
}, loaderRuntime);
assert.equal(loaderHttpCalls[20].url, "https://example.com/feed.xml");
assert.equal(loaderHttpCalls[20].options.method, "GET");
assert.match(rssFeedResult.documents[0].pageContent, /Loaded from Atom/);
assert.equal(rssFeedResult.documents[0].metadata.source, "atom");
assert.equal(rssFeedResult.documents[0].metadata.link, "https://example.com/atom-entry");
assert.equal(rssFeedResult.documents[0].metadata.workflow, "smoke");

const composioHttpCalls = [];
const composioRuntime = {
  async http(url, options) {
    composioHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected composio nested tool call");
  },
};

await composioToolsListTool.run({
  apiKey: { value: "composio-key" },
  toolkitSlug: "github",
  toolSlugs: ["GITHUB_GET_REPOSITORY", "GITHUB_STAR_A_REPOSITORY"],
  limit: 2,
}, composioRuntime);
assert.match(composioHttpCalls[0].url, /\/api\/v3\.1\/tools\?/);
assert.match(composioHttpCalls[0].url, /toolkit_slug=github/);
assert.match(composioHttpCalls[0].url, /tool_slugs=GITHUB_GET_REPOSITORY%2CGITHUB_STAR_A_REPOSITORY/);
assert.equal(composioHttpCalls[0].options.headers["x-api-key"], "composio-key");

await composioProxyExecuteTool.run({
  apiKey: { value: "composio-key" },
  connectedAccountId: "ca_github_user_123",
  endpoint: "/user/repos",
  method: "GET",
  parameters: [{ name: "per_page", value: "50", in: "query" }],
}, composioRuntime);
assert.equal(composioHttpCalls[1].url, "https://backend.composio.dev/api/v3.1/tools/execute/proxy");
assert.equal(composioHttpCalls[1].options.method, "POST");
assert.equal(composioHttpCalls[1].options.body.connected_account_id, "ca_github_user_123");
assert.equal(composioHttpCalls[1].options.body.parameters[0].in, "query");

const financeHttpCalls = [];
const financeRuntime = {
  async http(url, options) {
    financeHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected finance nested tool call");
  },
};

await alphaVantageExchangeRateTool.run({
  apiKey: { value: "alpha-key" },
  fromCurrency: "USD",
  toCurrency: "JPY",
}, financeRuntime);
assert.match(financeHttpCalls[0].url, /function=CURRENCY_EXCHANGE_RATE/);
assert.match(financeHttpCalls[0].url, /from_currency=USD/);
assert.match(financeHttpCalls[0].url, /to_currency=JPY/);
assert.match(financeHttpCalls[0].url, /apikey=alpha-key/);

await alphaVantageNewsSentimentTool.run({
  apiKey: { value: "alpha-key" },
  tickers: ["IBM", "AAPL"],
  topics: ["technology"],
  limit: 5,
}, financeRuntime);
assert.match(financeHttpCalls[1].url, /function=NEWS_SENTIMENT/);
assert.match(financeHttpCalls[1].url, /tickers=IBM%2CAAPL/);
assert.match(financeHttpCalls[1].url, /topics=technology/);
assert.match(financeHttpCalls[1].url, /limit=5/);

await polygonAggregatesTool.run({
  apiKey: { value: "polygon-key" },
  ticker: "AAPL",
  multiplier: 1,
  timespan: "day",
  from: "2026-01-01",
  to: "2026-01-31",
  adjusted: false,
}, financeRuntime);
assert.match(financeHttpCalls[2].url, /\/v2\/aggs\/ticker\/AAPL\/range\/1\/day\/2026-01-01\/2026-01-31/);
assert.match(financeHttpCalls[2].url, /adjusted=false/);
assert.match(financeHttpCalls[2].url, /apiKey=polygon-key/);

await polygonFinancialsTool.run({
  apiKey: { value: "polygon-key" },
  ticker: "AAPL",
  timeframe: "quarterly",
  includeSources: true,
  limit: 3,
}, financeRuntime);
assert.match(financeHttpCalls[3].url, /\/vX\/reference\/financials\?/);
assert.match(financeHttpCalls[3].url, /ticker=AAPL/);
assert.match(financeHttpCalls[3].url, /timeframe=quarterly/);
assert.match(financeHttpCalls[3].url, /include_sources=true/);

await googleFinanceSearchTool.run({
  apiKey: { value: "serpapi-key" },
  query: "GOOGL:NASDAQ",
  window: "1Y",
}, financeRuntime);
assert.match(financeHttpCalls[4].url, /engine=google_finance/);
assert.match(financeHttpCalls[4].url, /q=GOOGL%3ANASDAQ/);
assert.match(financeHttpCalls[4].url, /window=1Y/);
assert.match(financeHttpCalls[4].url, /api_key=serpapi-key/);

await googleFinanceMarketsTool.run({
  apiKey: { value: "serpapi-key" },
  trend: "gainers",
  indexMarket: "americas",
}, financeRuntime);
assert.match(financeHttpCalls[5].url, /engine=google_finance_markets/);
assert.match(financeHttpCalls[5].url, /trend=gainers/);
assert.match(financeHttpCalls[5].url, /index_market=americas/);

const googleHttpCalls = [];
const googleRuntime = {
  async http(url, options) {
    googleHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected google nested tool call");
  },
};

await googleYoutubeSearchTool.run({
  apiKey: { value: "youtube-key" },
  query: "chidori agents",
  maxResults: 3,
  order: "relevance",
  regionCode: "US",
}, googleRuntime);
assert.match(googleHttpCalls[0].url, /youtube\/v3\/search\?/);
assert.match(googleHttpCalls[0].url, /q=chidori%20agents/);
assert.match(googleHttpCalls[0].url, /type=video/);
assert.match(googleHttpCalls[0].url, /maxResults=3/);
assert.match(googleHttpCalls[0].url, /key=youtube-key/);

await googleTextToSpeechSynthesizeTool.run({
  apiKey: { value: "google-tts-key" },
  text: "Hello from Chidori",
  languageCode: "en-US",
  voiceName: "en-US-Neural2-C",
  audioEncoding: "MP3",
  speakingRate: 1.1,
}, googleRuntime);
assert.equal(googleHttpCalls[1].url, "https://texttospeech.googleapis.com/v1/text:synthesize?key=google-tts-key");
assert.equal(googleHttpCalls[1].options.method, "POST");
assert.equal(googleHttpCalls[1].options.body.input.text, "Hello from Chidori");
assert.equal(googleHttpCalls[1].options.body.voice.languageCode, "en-US");
assert.equal(googleHttpCalls[1].options.body.voice.name, "en-US-Neural2-C");
assert.equal(googleHttpCalls[1].options.body.audioConfig.audioEncoding, "MP3");
assert.equal(googleHttpCalls[1].options.body.audioConfig.speakingRate, 1.1);

await googleTextToSpeechVoicesListTool.run({
  accessToken: { value: "google-oauth-token" },
  languageCode: "en-US",
}, googleRuntime);
assert.equal(googleHttpCalls[2].url, "https://texttospeech.googleapis.com/v1/voices?languageCode=en-US");
assert.equal(googleHttpCalls[2].options.method, "GET");
assert.equal(googleHttpCalls[2].options.headers.Authorization, "Bearer google-oauth-token");

const calls = [];
const chidori = {
  async http() {
    throw new Error("unexpected http call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool(name, args) {
    calls.push({ name, args });
    if (name === "embed") {
      return { vector: [0.1, 0.2, 0.3] };
    }
    if (name === "search") {
      return { matches: [{ id: "a", score: 0.9 }] };
    }
    throw new Error(`unexpected tool ${name}`);
  },
};

const retrieval = await vectorSimilarityRetrieverTool.run({
  query: "hello",
  embeddingToolName: "embed",
  embeddingResponsePath: "/vector",
  vectorStoreToolName: "search",
  vectorStoreArgs: { indexHost: "example" },
  topK: 3,
}, chidori);

assert.equal(retrieval.result.matches[0].id, "a");
assert.deepEqual(calls[1].args.vector, [0.1, 0.2, 0.3]);
assert.equal(calls[1].args.topK, 3);

const braveDocs = loadBraveSearchDocuments({
  web: {
    results: [{
      title: "Brave Result",
      url: "https://example.com/brave",
      description: "Brave <strong>retrieved</strong> content.",
      extra_snippets: ["Extra <em>snippet</em> text."],
      age: "1 day ago",
      language: "en",
      family_friendly: true,
    }],
  },
  news: {
    results: [{
      title: "Brave News",
      url: "https://example.com/news",
      description: "Brave news content.",
    }],
  },
}, { workflow: "smoke" });
assert.equal(braveDocs[0].pageContent, "Brave retrieved content.\n\nExtra snippet text.");
assert.equal(braveDocs[0].metadata.source, "brave_search");
assert.equal(braveDocs[0].metadata.workflow, "smoke");
assert.equal(braveDocs[0].metadata.title, "Brave Result");
assert.equal(braveDocs[0].metadata.url, "https://example.com/brave");
assert.equal(braveDocs[0].metadata.resultType, "web");
assert.equal(braveDocs[1].metadata.resultType, "news");

const braveHttpCalls = [];
const braveRuntime = {
  async http(url, options) {
    braveHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        web: {
          results: [{
            title: "Brave Result",
            url: "https://example.com/brave",
            description: "Brave retrieved content.",
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Brave nested tool call");
  },
};

const braveRetrieval = await braveSearchRetrieverTool.run({
  apiKey: { value: "brave-key" },
  query: "agent docs",
  count: 4,
  country: "us",
  searchLang: "en",
  uiLang: "en-US",
  offset: 2,
  safesearch: "moderate",
  freshness: "pw",
  metadata: { workflow: "smoke" },
}, braveRuntime);
assert.equal(braveRetrieval.documents[0].pageContent, "Brave retrieved content.");
assert.equal(braveRetrieval.documents[0].metadata.workflow, "smoke");
assert.match(braveHttpCalls[0].url, /^https:\/\/api\.search\.brave\.com\/res\/v1\/web\/search\?/);
assert.match(braveHttpCalls[0].url, /q=agent%20docs/);
assert.match(braveHttpCalls[0].url, /count=4/);
assert.match(braveHttpCalls[0].url, /country=us/);
assert.match(braveHttpCalls[0].url, /search_lang=en/);
assert.match(braveHttpCalls[0].url, /ui_lang=en-US/);
assert.match(braveHttpCalls[0].url, /offset=2/);
assert.match(braveHttpCalls[0].url, /safesearch=moderate/);
assert.match(braveHttpCalls[0].url, /freshness=pw/);
assert.equal(braveHttpCalls[0].options.method, "GET");
assert.equal(braveHttpCalls[0].options.headers["X-Subscription-Token"], "brave-key");
assert.equal(braveHttpCalls[0].options.headers.accept, "application/json");

const bingDocs = loadBingWebSearchDocuments({
  webPages: {
    value: [{
      id: "web-1",
      name: "Bing Result",
      url: "https://example.com/bing",
      displayUrl: "example.com/bing",
      snippet: "Bing <b>retrieved</b> content.",
      language: "en",
    }],
  },
  news: {
    value: [{
      name: "Bing News",
      url: "https://example.com/news",
      description: "Bing news content.",
      datePublished: "2026-05-20T00:00:00Z",
      provider: [{ name: "Example News" }],
    }],
  },
}, { workflow: "smoke" });
assert.equal(bingDocs[0].pageContent, "Bing retrieved content.");
assert.equal(bingDocs[0].metadata.source, "bing_web_search");
assert.equal(bingDocs[0].metadata.workflow, "smoke");
assert.equal(bingDocs[0].metadata.title, "Bing Result");
assert.equal(bingDocs[0].metadata.url, "https://example.com/bing");
assert.equal(bingDocs[0].metadata.resultType, "web");
assert.equal(bingDocs[1].metadata.resultType, "news");
assert.equal(bingDocs[1].metadata.providerName, "Example News");

const bingRetrieverHttpCalls = [];
const bingRetrieverRuntime = {
  async http(url, options) {
    bingRetrieverHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        webPages: {
          value: [{
            name: "Bing Result",
            url: "https://example.com/bing",
            snippet: "Bing retrieved content.",
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Bing nested tool call");
  },
};

const bingRetrieval = await bingWebSearchRetrieverTool.run({
  apiKey: { value: "bing-key" },
  query: "agent docs",
  market: "en-US",
  count: 3,
  offset: 1,
  safeSearch: "Moderate",
  responseFilter: ["Webpages", "News"],
  textFormat: "Raw",
  textDecorations: false,
  metadata: { workflow: "smoke" },
}, bingRetrieverRuntime);
assert.equal(bingRetrieval.documents[0].pageContent, "Bing retrieved content.");
assert.equal(bingRetrieval.documents[0].metadata.workflow, "smoke");
assert.match(bingRetrieverHttpCalls[0].url, /^https:\/\/api\.bing\.microsoft\.com\/v7\.0\/search\?/);
assert.match(bingRetrieverHttpCalls[0].url, /q=agent%20docs/);
assert.match(bingRetrieverHttpCalls[0].url, /mkt=en-US/);
assert.match(bingRetrieverHttpCalls[0].url, /count=3/);
assert.match(bingRetrieverHttpCalls[0].url, /offset=1/);
assert.match(bingRetrieverHttpCalls[0].url, /safeSearch=Moderate/);
assert.match(bingRetrieverHttpCalls[0].url, /responseFilter=Webpages%2CNews/);
assert.match(bingRetrieverHttpCalls[0].url, /textFormat=Raw/);
assert.match(bingRetrieverHttpCalls[0].url, /textDecorations=false/);
assert.equal(bingRetrieverHttpCalls[0].options.method, "GET");
assert.equal(bingRetrieverHttpCalls[0].options.headers["Ocp-Apim-Subscription-Key"], "bing-key");
assert.equal(bingRetrieverHttpCalls[0].options.headers.accept, "application/json");

const serperDocs = loadGoogleSerperSearchDocuments({
  organic: [{
    title: "Serper Result",
    link: "https://example.com/serper",
    snippet: "Serper <b>retrieved</b> content.",
    position: 1,
  }],
  news: [{
    title: "Serper News",
    link: "https://example.com/serper-news",
    snippet: "Serper news content.",
    source: "Example News",
    date: "2 hours ago",
  }],
  places: [{
    title: "Serper Place",
    address: "1 Market St",
    rating: 4.7,
    ratingCount: 25,
  }],
}, { workflow: "smoke" });
assert.equal(serperDocs[0].pageContent, "Serper retrieved content.");
assert.equal(serperDocs[0].metadata.source, "google_serper_search");
assert.equal(serperDocs[0].metadata.workflow, "smoke");
assert.equal(serperDocs[0].metadata.title, "Serper Result");
assert.equal(serperDocs[0].metadata.url, "https://example.com/serper");
assert.equal(serperDocs[0].metadata.resultType, "organic");
assert.equal(serperDocs[1].metadata.sourceName, "Example News");
assert.equal(serperDocs[2].metadata.rating, 4.7);

const serperRetrieverHttpCalls = [];
const serperRetrieverRuntime = {
  async http(url, options) {
    serperRetrieverHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        organic: [{
          title: "Serper Result",
          link: "https://example.com/serper",
          snippet: "Serper retrieved content.",
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Serper nested tool call");
  },
};

const serperRetrieval = await googleSerperSearchRetrieverTool.run({
  apiKey: { value: "serper-key" },
  query: "agent docs",
  endpoint: "news",
  gl: "us",
  hl: "en",
  location: "Austin, Texas",
  num: 4,
  page: 2,
  tbs: "qdr:w",
  autocorrect: false,
  type: "news",
  metadata: { workflow: "smoke" },
}, serperRetrieverRuntime);
assert.equal(serperRetrieval.documents[0].pageContent, "Serper retrieved content.");
assert.equal(serperRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(serperRetrieval.documents[0].metadata.endpoint, "news");
assert.equal(serperRetrieverHttpCalls[0].url, "https://google.serper.dev/news");
assert.equal(serperRetrieverHttpCalls[0].options.method, "POST");
assert.equal(serperRetrieverHttpCalls[0].options.headers["X-API-KEY"], "serper-key");
assert.equal(serperRetrieverHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(serperRetrieverHttpCalls[0].options.body.q, "agent docs");
assert.equal(serperRetrieverHttpCalls[0].options.body.gl, "us");
assert.equal(serperRetrieverHttpCalls[0].options.body.hl, "en");
assert.equal(serperRetrieverHttpCalls[0].options.body.location, "Austin, Texas");
assert.equal(serperRetrieverHttpCalls[0].options.body.num, 4);
assert.equal(serperRetrieverHttpCalls[0].options.body.page, 2);
assert.equal(serperRetrieverHttpCalls[0].options.body.tbs, "qdr:w");
assert.equal(serperRetrieverHttpCalls[0].options.body.autocorrect, false);
assert.equal(serperRetrieverHttpCalls[0].options.body.type, "news");

const serpApiDocs = loadSerpApiSearchDocuments({
  answer_box: {
    title: "Answer Box",
    answer: "Direct answer content.",
    link: "https://example.com/answer",
  },
  organic_results: [{
    position: 1,
    title: "SerpApi Result",
    link: "https://example.com/serpapi",
    displayed_link: "example.com",
    snippet: "SerpApi <b>retrieved</b> content.",
    source: "Example",
  }],
  news_results: [{
    position: 2,
    title: "SerpApi News",
    link: "https://example.com/news",
    snippet: "SerpApi news content.",
    date: "May 21, 2026",
  }],
}, { workflow: "smoke" });
assert.equal(serpApiDocs[0].pageContent, "Direct answer content.");
assert.equal(serpApiDocs[0].metadata.source, "serpapi_search");
assert.equal(serpApiDocs[0].metadata.workflow, "smoke");
assert.equal(serpApiDocs[0].metadata.resultType, "answer_box");
assert.equal(serpApiDocs[1].pageContent, "SerpApi retrieved content.");
assert.equal(serpApiDocs[1].metadata.title, "SerpApi Result");
assert.equal(serpApiDocs[1].metadata.url, "https://example.com/serpapi");
assert.equal(serpApiDocs[1].metadata.displayedLink, "example.com");
assert.equal(serpApiDocs[1].metadata.position, 1);

const serpApiRetrieverHttpCalls = [];
const serpApiRetrieverRuntime = {
  async http(url, options) {
    serpApiRetrieverHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        organic_results: [{
          title: "SerpApi Result",
          link: "https://example.com/serpapi",
          snippet: "SerpApi retrieved content.",
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected SerpApi nested tool call");
  },
};

const serpApiRetrieval = await serpApiSearchRetrieverTool.run({
  apiKey: { value: "serpapi-key" },
  query: "agent docs",
  engine: "google",
  location: "Austin, Texas",
  googleDomain: "google.com",
  gl: "us",
  hl: "en",
  num: 5,
  start: 10,
  device: "mobile",
  metadata: { workflow: "smoke" },
}, serpApiRetrieverRuntime);
assert.equal(serpApiRetrieval.documents[0].pageContent, "SerpApi retrieved content.");
assert.equal(serpApiRetrieval.documents[0].metadata.workflow, "smoke");
assert.match(serpApiRetrieverHttpCalls[0].url, /^https:\/\/serpapi\.com\/search\?/);
assert.match(serpApiRetrieverHttpCalls[0].url, /api_key=serpapi-key/);
assert.match(serpApiRetrieverHttpCalls[0].url, /engine=google/);
assert.match(serpApiRetrieverHttpCalls[0].url, /q=agent%20docs/);
assert.match(serpApiRetrieverHttpCalls[0].url, /location=Austin%2C%20Texas/);
assert.match(serpApiRetrieverHttpCalls[0].url, /google_domain=google\.com/);
assert.match(serpApiRetrieverHttpCalls[0].url, /gl=us/);
assert.match(serpApiRetrieverHttpCalls[0].url, /hl=en/);
assert.match(serpApiRetrieverHttpCalls[0].url, /num=5/);
assert.match(serpApiRetrieverHttpCalls[0].url, /start=10/);
assert.match(serpApiRetrieverHttpCalls[0].url, /device=mobile/);
assert.match(serpApiRetrieverHttpCalls[0].url, /output=json/);
assert.equal(serpApiRetrieverHttpCalls[0].options.method, "GET");

const perplexityHttpCalls = [];
const perplexityRuntime = {
  async http(url, options) {
    perplexityHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        id: "search-1",
        results: [{ title: "Result", url: "https://example.com", snippet: "Snippet" }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected perplexity nested tool call");
  },
};

const perplexityRetrieval = await perplexitySearchRetrieverTool.run({
  apiKey: { value: "perplexity-key" },
  query: "latest AI research",
  country: "US",
  maxResults: 5,
  maxTokensPerPage: 512,
  searchDomainFilter: ["example.com"],
  searchRecencyFilter: "week",
}, perplexityRuntime);
assert.equal(perplexityRetrieval.documents[0].metadata.url, "https://example.com");
assert.equal(perplexityHttpCalls[0].url, "https://api.perplexity.ai/search");
assert.equal(perplexityHttpCalls[0].options.method, "POST");
assert.equal(perplexityHttpCalls[0].options.headers.Authorization, "Bearer perplexity-key");
assert.equal(perplexityHttpCalls[0].options.body.query, "latest AI research");
assert.equal(perplexityHttpCalls[0].options.body.country, "US");
assert.equal(perplexityHttpCalls[0].options.body.max_results, 5);
assert.equal(perplexityHttpCalls[0].options.body.max_tokens_per_page, 512);
assert.equal(perplexityHttpCalls[0].options.body.search_domain_filter[0], "example.com");
assert.equal(perplexityHttpCalls[0].options.body.search_recency_filter, "week");

const googleScholarDocs = loadGoogleScholarSearchDocuments({
  organic_results: [{
    position: 1,
    title: "A Google Scholar Paper",
    link: "https://example.com/scholar",
    snippet: "This paper studies search retrieval.",
    result_id: "scholar-1",
    publication_info: { authors: "Ada Lovelace", summary: "2026 - Example Journal" },
    inline_links: { cited_by: { total: 12, link: "https://scholar.google.com/cites" } },
    resources: [{ title: "PDF", link: "https://example.com/paper.pdf" }],
  }],
}, { workflow: "smoke" });
assert.equal(googleScholarDocs[0].pageContent, "This paper studies search retrieval.");
assert.equal(googleScholarDocs[0].metadata.resultId, "scholar-1");
assert.equal(googleScholarDocs[0].metadata.resourceUrl, "https://example.com/paper.pdf");

const googleScholarHttpCalls = [];
const googleScholarRuntime = {
  async http(url, options) {
    googleScholarHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        organic_results: [{
          position: 1,
          title: "A Google Scholar Paper",
          link: "https://example.com/scholar",
          snippet: "This paper studies search retrieval.",
          result_id: "scholar-1",
          publication_info: { authors: "Ada Lovelace" },
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Google Scholar nested tool call");
  },
};

const googleScholarRetrieval = await googleScholarSearchRetrieverTool.run({
  apiKey: { value: "serpapi-key" },
  query: "agent retrieval",
  yearLow: 2024,
  yearHigh: 2026,
  num: 2,
  metadata: { workflow: "smoke" },
}, googleScholarRuntime);
assert.equal(googleScholarRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(googleScholarHttpCalls[0].url, "https://serpapi.com/search?api_key=serpapi-key&engine=google_scholar&q=agent%20retrieval&as_ylo=2024&as_yhi=2026&num=2&output=json");
assert.equal(googleScholarHttpCalls[0].options.method, "GET");
assert.equal(googleScholarHttpCalls[0].options.headers.accept, "application/json");

const semanticScholarDocs = loadSemanticScholarSearchDocuments({
  data: [{
    paperId: "paper-1",
    title: "A Semantic Scholar Paper",
    abstract: "This paper studies agent retrieval.",
    year: 2026,
    authors: [{ name: "Ada Lovelace" }],
    citationCount: 12,
    openAccessPdf: { url: "https://example.com/paper.pdf" },
  }],
}, { workflow: "smoke" });
assert.equal(semanticScholarDocs[0].pageContent, "This paper studies agent retrieval.");
assert.equal(semanticScholarDocs[0].metadata.paperId, "paper-1");
assert.equal(semanticScholarDocs[0].metadata.pdfUrl, "https://example.com/paper.pdf");

const semanticScholarHttpCalls = [];
const semanticScholarRuntime = {
  async http(url, options) {
    semanticScholarHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        data: [{
          paperId: "paper-1",
          title: "A Semantic Scholar Paper",
          abstract: "This paper studies agent retrieval.",
          year: 2026,
          authors: [{ name: "Ada Lovelace" }],
          citationCount: 12,
          openAccessPdf: { url: "https://example.com/paper.pdf" },
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Semantic Scholar nested tool call");
  },
};

const semanticScholarRetrieval = await semanticScholarSearchRetrieverTool.run({
  apiKey: { value: "s2-key" },
  query: "agent retrieval",
  limit: 2,
  year: "2024-2026",
  openAccessPdf: true,
  metadata: { workflow: "smoke" },
}, semanticScholarRuntime);
assert.equal(semanticScholarRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(semanticScholarHttpCalls[0].url, "https://api.semanticscholar.org/graph/v1/paper/search?query=agent%20retrieval&fields=paperId%2CcorpusId%2Ctitle%2Cabstract%2Cyear%2Cauthors%2Curl%2CcitationCount%2CreferenceCount%2CinfluentialCitationCount%2CopenAccessPdf%2Cvenue%2CpublicationDate%2CfieldsOfStudy%2CpublicationTypes%2Ctldr&limit=2&openAccessPdf=true&year=2024-2026");
assert.equal(semanticScholarHttpCalls[0].options.method, "GET");
assert.equal(semanticScholarHttpCalls[0].options.headers["x-api-key"], "s2-key");

const wolframAlphaDocs = loadWolframAlphaQueryDocuments({
  queryresult: {
    datatypes: "Math",
    pods: [{
      id: "Input",
      title: "Input interpretation",
      scanner: "Identity",
      position: 100,
      subpods: [{ title: "", plaintext: "sqrt(4)" }],
    }, {
      id: "Result",
      title: "Result",
      scanner: "Simplification",
      position: 200,
      primary: true,
      subpods: [{ title: "", plaintext: "2", img: { src: "https://example.com/result.gif", alt: "2" } }],
    }],
  },
}, { workflow: "smoke" });
assert.equal(wolframAlphaDocs[0].pageContent, "sqrt(4)");
assert.equal(wolframAlphaDocs[1].pageContent, "2");
assert.equal(wolframAlphaDocs[1].metadata.primary, true);
assert.equal(wolframAlphaDocs[1].metadata.imageUrl, "https://example.com/result.gif");

const wolframAlphaHttpCalls = [];
const wolframAlphaRuntime = {
  async http(url, options) {
    wolframAlphaHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        queryresult: {
          pods: [{
            id: "Result",
            title: "Result",
            scanner: "Simplification",
            primary: true,
            subpods: [{ plaintext: "2" }],
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected WolframAlpha nested tool call");
  },
};

const wolframAlphaRetrieval = await wolframAlphaQueryRetrieverTool.run({
  appId: { value: "wolfram-app-id" },
  input: "sqrt(4)",
  includePodId: "Result",
  units: "metric",
  metadata: { workflow: "smoke" },
}, wolframAlphaRuntime);
assert.equal(wolframAlphaRetrieval.documents[0].pageContent, "2");
assert.equal(wolframAlphaRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(wolframAlphaHttpCalls[0].url, "https://api.wolframalpha.com/v2/query?appid=wolfram-app-id&input=sqrt(4)&output=json&format=plaintext%2Cimage&includepodid=Result&units=metric");
assert.equal(wolframAlphaHttpCalls[0].options.method, "GET");
assert.equal(wolframAlphaHttpCalls[0].options.headers.accept, "application/json");

const duckDuckGoInstantAnswerDocs = loadDuckDuckGoInstantAnswerDocuments({
  Heading: "Chidori",
  AbstractText: "Chidori is an agent runtime.",
  AbstractURL: "https://example.com/chidori",
  AbstractSource: "Example",
  RelatedTopics: [{
    Text: "Chidori tools - JSON-compatible external service calls",
    FirstURL: "https://example.com/chidori/tools",
    Icon: { URL: "/favicon.ico" },
  }, {
    Name: "Grouped",
    Topics: [{
      Text: "Chidori workflows - Durable agent workflows",
      FirstURL: "https://example.com/chidori/workflows",
    }],
  }],
}, { workflow: "smoke" });
assert.equal(duckDuckGoInstantAnswerDocs[0].pageContent, "Chidori is an agent runtime.");
assert.equal(duckDuckGoInstantAnswerDocs[0].metadata.kind, "abstract");
assert.equal(duckDuckGoInstantAnswerDocs[1].metadata.kind, "related_topic");
assert.equal(duckDuckGoInstantAnswerDocs[2].metadata.group, "Grouped");

const duckDuckGoInstantAnswerHttpCalls = [];
const duckDuckGoInstantAnswerRuntime = {
  async http(url, options) {
    duckDuckGoInstantAnswerHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        Heading: "Chidori",
        Answer: "42",
        AnswerType: "calc",
        RelatedTopics: [{
          Text: "Chidori tools - JSON-compatible external service calls",
          FirstURL: "https://example.com/chidori/tools",
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected DuckDuckGo nested tool call");
  },
};

const duckDuckGoInstantAnswerRetrieval = await duckDuckGoInstantAnswerRetrieverTool.run({
  query: "chidori agents",
  skipDisambiguation: true,
  metadata: { workflow: "smoke" },
}, duckDuckGoInstantAnswerRuntime);
assert.equal(duckDuckGoInstantAnswerRetrieval.documents[0].pageContent, "42");
assert.equal(duckDuckGoInstantAnswerRetrieval.documents[0].metadata.answerType, "calc");
assert.equal(duckDuckGoInstantAnswerHttpCalls[0].url, "https://api.duckduckgo.com/?q=chidori%20agents&format=json&no_html=true&no_redirect=true&skip_disambig=true");
assert.equal(duckDuckGoInstantAnswerHttpCalls[0].options.method, "GET");
assert.equal(duckDuckGoInstantAnswerHttpCalls[0].options.headers.accept, "application/json");

const hydeDocs = loadHydeDocuments({
  documents: [{
    pageContent: "Retrieved result from a generated passage.",
    metadata: { source: "vector_similarity", id: "doc-1" },
  }],
}, "agent docs", "A generated passage about agent documentation.", { workflow: "smoke" });
assert.equal(hydeDocs[0].pageContent, "Retrieved result from a generated passage.");
assert.equal(hydeDocs[0].metadata.source, "hyde");
assert.equal(hydeDocs[0].metadata.retrieverSource, "vector_similarity");
assert.equal(hydeDocs[0].metadata.query, "agent docs");
assert.equal(hydeDocs[0].metadata.hypotheticalDocument, "A generated passage about agent documentation.");
assert.equal(hydeDocs[0].metadata.workflow, "smoke");

const hydeNestedCalls = [];
const hydeRetrieval = await hydeRetrieverTool.run({
  query: "how do chidori agents call tools?",
  generatorToolName: "openai_responses_create",
  generatorArgs: { model: "gpt-5-mini" },
  generatorInputKey: "input",
  generatorResponsePath: "/output_text",
  retrieverToolName: "vector_similarity_retrieve",
  retrieverArgs: { vectorStoreToolName: "pinecone_query", topK: 1 },
  metadata: { workflow: "smoke" },
}, {
  async http() {
    throw new Error("unexpected HyDE HTTP call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool(name, args) {
    hydeNestedCalls.push({ name, args });
    if (name === "openai_responses_create") {
      return { output_text: "Chidori agents call tools through typed tool modules." };
    }
    if (name === "vector_similarity_retrieve") {
      return {
        documents: [{
          pageContent: "Tool modules expose run functions and JSON schemas.",
          metadata: { source: "vector_similarity", id: "tools" },
        }],
      };
    }
    throw new Error(`unexpected HyDE nested tool ${name}`);
  },
});
assert.equal(hydeRetrieval.generatedDocument, "Chidori agents call tools through typed tool modules.");
assert.equal(hydeRetrieval.documents[0].pageContent, "Tool modules expose run functions and JSON schemas.");
assert.equal(hydeRetrieval.documents[0].metadata.source, "hyde");
assert.equal(hydeRetrieval.documents[0].metadata.retrieverSource, "vector_similarity");
assert.equal(hydeRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(hydeNestedCalls[0].name, "openai_responses_create");
assert.match(hydeNestedCalls[0].args.input, /how do chidori agents call tools\?/);
assert.equal(hydeNestedCalls[1].name, "vector_similarity_retrieve");
assert.equal(hydeNestedCalls[1].args.query, "Chidori agents call tools through typed tool modules.");
assert.equal(hydeNestedCalls[1].args.topK, 1);

const bm25Docs = loadBm25Documents({
  query: "clean integration tools",
  documents: [
    { pageContent: "Durable TypeScript agents call clean integration tools.", metadata: { id: "agent" } },
    { pageContent: "Vector databases store embeddings for semantic search.", metadata: { id: "vector" } },
    { pageContent: "Runtime workflows coordinate long-running TypeScript agents.", metadata: { id: "runtime" } },
  ],
  topK: 2,
  includeZeroScores: true,
  metadata: { workflow: "smoke" },
});
assert.equal(bm25Docs.length, 2);
assert.equal(bm25Docs[0].metadata.source, "bm25");
assert.equal(bm25Docs[0].metadata.workflow, "smoke");
assert.equal(bm25Docs[0].metadata.id, "agent");
assert.equal(bm25Docs[0].metadata.documentIndex, 0);
assert.equal(typeof bm25Docs[0].metadata.score, "number");

const bm25Retrieval = await bm25RetrieverTool.run({
  query: "semantic search vectors",
  documents: [
    { pageContent: "Durable TypeScript agents call clean integration tools.", metadata: { id: "agent" } },
    { pageContent: "Vector databases store embeddings for semantic search.", metadata: { id: "vector" } },
  ],
  topK: 1,
}, {
  async http() {
    throw new Error("unexpected BM25 HTTP call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected BM25 nested tool call");
  },
});
assert.equal(bm25Retrieval.documents[0].metadata.id, "vector");

const timeWeightedDocs = loadTimeWeightedDocuments({
  query: "agent tools",
  now: "2026-05-21T12:00:00.000Z",
  timeUnit: "hour",
  decayRate: 0.01,
  documents: [
    {
      pageContent: "Older agent tool reference with strong importance.",
      metadata: { id: "old", lastAccessedAt: "2026-05-20T12:00:00.000Z", importance: 0.1, score: 0.1 },
    },
    {
      pageContent: "Recent agent tool guide for Chidori agents.",
      metadata: { id: "recent", lastAccessedAt: "2026-05-21T11:00:00.000Z", importance: 0.4, score: 0.2 },
    },
  ],
  topK: 1,
  metadata: { workflow: "smoke" },
});
assert.equal(timeWeightedDocs[0].metadata.source, "time_weighted");
assert.equal(timeWeightedDocs[0].metadata.id, "recent");
assert.equal(timeWeightedDocs[0].metadata.workflow, "smoke");
assert.equal(timeWeightedDocs[0].metadata.documentIndex, 1);
assert.equal(timeWeightedDocs[0].metadata.rank, 0);
assert.equal(typeof timeWeightedDocs[0].metadata.recencyScore, "number");
assert.equal(typeof timeWeightedDocs[0].metadata.relevanceScore, "number");

const timeWeightedRetrieval = await timeWeightedRetrieverTool.run({
  query: "agent tools",
  now: "2026-05-21T12:00:00.000Z",
  documents: [
    {
      pageContent: "Archived integration notes.",
      metadata: { id: "archived", lastAccessedAt: "2026-05-01T12:00:00.000Z" },
    },
    {
      pageContent: "Fresh agent tools note.",
      metadata: { id: "fresh", lastAccessedAt: "2026-05-21T11:30:00.000Z", importance: 0.2 },
    },
  ],
  topK: 1,
}, {
  async http() {
    throw new Error("unexpected time-weighted HTTP call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected time-weighted nested tool call");
  },
});
assert.equal(timeWeightedRetrieval.documents[0].metadata.id, "fresh");

const rerankedDocs = loadRerankedDocuments({
  results: [
    { index: 1, relevance_score: 0.98 },
    { index: 0, relevance_score: 0.42 },
  ],
}, [
  { pageContent: "First document", metadata: { id: "first" } },
  { pageContent: "Second document", metadata: { id: "second" } },
], { metadata: { workflow: "smoke" }, rerankToolName: "cohere_rerank" });
assert.equal(rerankedDocs[0].pageContent, "Second document");
assert.equal(rerankedDocs[0].metadata.source, "rerank_documents");
assert.equal(rerankedDocs[0].metadata.workflow, "smoke");
assert.equal(rerankedDocs[0].metadata.id, "second");
assert.equal(rerankedDocs[0].metadata.rerankToolName, "cohere_rerank");
assert.equal(rerankedDocs[0].metadata.rerankRank, 0);
assert.equal(rerankedDocs[0].metadata.rerankScore, 0.98);
assert.equal(rerankedDocs[0].metadata.sourceIndex, 1);

const rerankNestedCalls = [];
const rerankRetrieval = await rerankDocumentsTool.run({
  query: "agent docs",
  documents: [
    { pageContent: "Billing API reference", metadata: { id: "billing" } },
    { pageContent: "Agent tool documentation", metadata: { id: "agent" } },
  ],
  rerankToolName: "cohere_rerank",
  rerankArgs: { apiKey: { value: "cohere-key" }, model: "rerank-v3.5" },
  topK: 1,
  metadata: { workflow: "smoke" },
}, {
  async http() {
    throw new Error("unexpected rerank HTTP call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool(name, args) {
    rerankNestedCalls.push({ name, args });
    return {
      results: [
        { index: 1, relevance_score: 0.99 },
        { index: 0, relevance_score: 0.12 },
      ],
    };
  },
});
assert.equal(rerankRetrieval.documents.length, 1);
assert.equal(rerankRetrieval.documents[0].pageContent, "Agent tool documentation");
assert.equal(rerankRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(rerankRetrieval.documents[0].metadata.query, "agent docs");
assert.equal(rerankNestedCalls[0].name, "cohere_rerank");
assert.equal(rerankNestedCalls[0].args.query, "agent docs");
assert.equal(rerankNestedCalls[0].args.documents[0], "Billing API reference");
assert.equal(rerankNestedCalls[0].args.topN, 1);
assert.equal(rerankNestedCalls[0].args.model, "rerank-v3.5");

const alchemystDocs = loadAlchemystContextDocuments({
  contexts: [{
    id: "ctx-1",
    content: "Alchemyst retrieved context text.",
    metadata: { file_name: "policy.md", groupName: ["policies"] },
    similarity_score: 0.84,
    scope: "internal",
  }],
}, { workflow: "smoke" });
assert.equal(alchemystDocs[0].pageContent, "Alchemyst retrieved context text.");
assert.equal(alchemystDocs[0].metadata.source, "alchemyst_context");
assert.equal(alchemystDocs[0].metadata.id, "ctx-1");
assert.equal(alchemystDocs[0].metadata.fileName, "policy.md");
assert.equal(alchemystDocs[0].metadata.score, 0.84);
assert.equal(alchemystDocs[0].metadata.workflow, "smoke");

const alchemystHttpCalls = [];
const alchemystRuntime = {
  async http(url, options) {
    alchemystHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        contexts: [{
          id: "ctx-1",
          content: "Alchemyst retrieved context text.",
          metadata: { fileName: "policy.md" },
          score: 0.84,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Alchemyst nested tool call");
  },
};

const alchemystRetrieval = await alchemystContextRetrieverTool.run({
  apiKey: { value: "alchemyst-key" },
  query: "refund policy",
  scope: "internal",
  similarityThreshold: 0.8,
  minimumSimilarityThreshold: 0.5,
  topK: 4,
  filter: { groupName: ["policies"] },
  metadata: { workflow: "smoke" },
}, alchemystRuntime);
assert.equal(alchemystRetrieval.documents[0].pageContent, "Alchemyst retrieved context text.");
assert.equal(alchemystRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(alchemystHttpCalls[0].url, "https://api.alchemyst.ai/api/v1/context/search");
assert.equal(alchemystHttpCalls[0].options.method, "POST");
assert.equal(alchemystHttpCalls[0].options.headers.Authorization, "Bearer alchemyst-key");
assert.equal(alchemystHttpCalls[0].options.body.query, "refund policy");
assert.equal(alchemystHttpCalls[0].options.body.scope, "internal");
assert.equal(alchemystHttpCalls[0].options.body.similarity_threshold, 0.8);
assert.equal(alchemystHttpCalls[0].options.body.minimum_similarity_threshold, 0.5);
assert.equal(alchemystHttpCalls[0].options.body.limit, 4);
assert.equal(alchemystHttpCalls[0].options.body.metadata.groupName[0], "policies");

const azionDocs = loadAzionEdgeSqlDocuments({
  results: [{
    rows: [{
      id: "doc-1",
      page_content: "Azion EdgeSQL retrieved text.",
      title: "Azion Guide",
      distance: 0.18,
      search_type: "similarity",
    }],
  }],
}, { workflow: "smoke" }, { metadataColumns: ["title"] });
assert.equal(azionDocs[0].pageContent, "Azion EdgeSQL retrieved text.");
assert.equal(azionDocs[0].metadata.source, "azion_edgesql");
assert.equal(azionDocs[0].metadata.id, "doc-1");
assert.equal(azionDocs[0].metadata.title, "Azion Guide");
assert.equal(azionDocs[0].metadata.distance, 0.18);
assert.equal(azionDocs[0].metadata.searchType, "similarity");
assert.equal(azionDocs[0].metadata.workflow, "smoke");

const azionHttpCalls = [];
const azionRuntime = {
  async http(url, options) {
    azionHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [{
          rows: [{
            id: "doc-1",
            page_content: "Azion EdgeSQL retrieved text.",
            title: "Azion Guide",
            distance: 0.18,
            search_type: "similarity",
          }],
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Azion nested tool call");
  },
};

const azionRetrieval = await azionEdgeSqlRetrieverTool.run({
  token: { value: "azion-token" },
  databaseId: "db_123",
  query: "agent docs",
  queryVector: [0.1, 0.2, 0.3],
  vectorTable: "documents",
  vectorIndex: "documents_idx",
  contentColumn: "page_content",
  idColumn: "id",
  metadataColumns: ["title"],
  similarityK: 3,
  metadata: { workflow: "smoke" },
}, azionRuntime);
assert.equal(azionRetrieval.documents[0].pageContent, "Azion EdgeSQL retrieved text.");
assert.equal(azionRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(azionRetrieval.statements[0].includes("vector_top_k"), true);
assert.equal(azionRetrieval.statements[0].includes("documents_idx"), true);
assert.equal(azionRetrieval.statements[0].includes("[0.1,0.2,0.3]"), true);
assert.equal(azionHttpCalls[0].url, "https://api.azionapi.net/v4/edge_sql/databases/db_123/query");
assert.equal(azionHttpCalls[0].options.method, "POST");
assert.equal(azionHttpCalls[0].options.headers.Authorization, "Token azion-token");
assert.equal(azionHttpCalls[0].options.body.statements[0], azionRetrieval.statements[0]);

const driaDocs = loadDriaDocuments({
  data: [{
    id: 42,
    metadata: JSON.stringify({ text: "Dria retrieved knowledge text.", sourceUrl: "https://example.com/dria" }),
    score: 0.91,
  }],
}, { workflow: "smoke" });
assert.equal(driaDocs[0].pageContent, "Dria retrieved knowledge text.");
assert.equal(driaDocs[0].metadata.source, "dria");
assert.equal(driaDocs[0].metadata.id, 42);
assert.equal(driaDocs[0].metadata.sourceUrl, "https://example.com/dria");
assert.equal(driaDocs[0].metadata.score, 0.91);
assert.equal(driaDocs[0].metadata.workflow, "smoke");

const driaHttpCalls = [];
const driaRuntime = {
  async http(url, options) {
    driaHttpCalls.push({ url, options });
    if (url.startsWith("https://api.dria.co/v1/knowledge/index/get_model")) {
      return {
        status: 200,
        headers: {},
        body: { data: { model: "jina-embeddings-v2-base-en" } },
      };
    }
    return {
      status: 200,
      headers: {},
      body: {
        data: [{
          id: 42,
          metadata: JSON.stringify({ text: "Dria retrieved knowledge text.", sourceUrl: "https://example.com/dria" }),
          score: 0.91,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Dria nested tool call");
  },
};

const driaRetrieval = await driaRetrieverTool.run({
  apiKey: { value: "dria-key" },
  contractId: "contract_123",
  query: "agent docs",
  topK: 5,
  rerank: false,
  level: 2,
  field: "body",
  metadata: { workflow: "smoke" },
}, driaRuntime);
assert.equal(driaRetrieval.documents[0].pageContent, "Dria retrieved knowledge text.");
assert.equal(driaRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(driaHttpCalls[0].url, "https://api.dria.co/v1/knowledge/index/get_model?contract_id=contract_123");
assert.equal(driaHttpCalls[0].options.method, "GET");
assert.equal(driaHttpCalls[0].options.headers["x-api-key"], "dria-key");
assert.equal(driaHttpCalls[1].url, "https://search.dria.co/hnsw/search");
assert.equal(driaHttpCalls[1].options.method, "POST");
assert.equal(driaHttpCalls[1].options.body.query, "agent docs");
assert.equal(driaHttpCalls[1].options.body.top_n, 5);
assert.equal(driaHttpCalls[1].options.body.rerank, false);
assert.equal(driaHttpCalls[1].options.body.level, 2);
assert.equal(driaHttpCalls[1].options.body.field, "body");
assert.equal(driaHttpCalls[1].options.body.contract_id, "contract_123");
assert.equal(driaHttpCalls[1].options.body.model, "jina-embeddings-v2-base-en");

const chaindeskDocs = loadChaindeskDocuments([
  {
    text: "Chaindesk retrieved content",
    score: 0.87,
    source: "https://example.com/chaindesk",
    datasource_id: "datasource_123",
    datasource_name: "Docs",
  },
], { workflow: "smoke" });
assert.equal(chaindeskDocs[0].pageContent, "Chaindesk retrieved content");
assert.equal(chaindeskDocs[0].metadata.source, "chaindesk");
assert.equal(chaindeskDocs[0].metadata.workflow, "smoke");
assert.equal(chaindeskDocs[0].metadata.url, "https://example.com/chaindesk");
assert.equal(chaindeskDocs[0].metadata.datasourceId, "datasource_123");

const chaindeskHttpCalls = [];
const chaindeskRuntime = {
  async http(url, options) {
    chaindeskHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: [{
        text: "Chaindesk retrieved content",
        score: 0.87,
        source: "https://example.com/chaindesk",
        datasource_id: "datasource_123",
        datasource_name: "Docs",
      }],
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Chaindesk nested tool call");
  },
};

const chaindeskRetrieval = await chaindeskRetrieverTool.run({
  apiKey: { value: "chaindesk-key" },
  datastoreId: "datastore_123",
  query: "agent docs",
  topK: 2,
  customIds: ["custom_1"],
  datasourceIds: ["datasource_123"],
  metadata: { workflow: "smoke" },
}, chaindeskRuntime);
assert.equal(chaindeskRetrieval.documents[0].pageContent, "Chaindesk retrieved content");
assert.equal(chaindeskRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(chaindeskHttpCalls[0].url, "https://app.chaindesk.ai/api/datastores/datastore_123/query");
assert.equal(chaindeskHttpCalls[0].options.method, "POST");
assert.equal(chaindeskHttpCalls[0].options.headers.Authorization, "Bearer chaindesk-key");
assert.equal(chaindeskHttpCalls[0].options.body.query, "agent docs");
assert.equal(chaindeskHttpCalls[0].options.body.topK, 2);
assert.equal(chaindeskHttpCalls[0].options.body.filters.custom_ids[0], "custom_1");
assert.equal(chaindeskHttpCalls[0].options.body.filters.datasource_ids[0], "datasource_123");

const chatGptPluginDocs = loadChatGptPluginDocuments({
  results: [[{
    id: "doc-1",
    text: "Plugin retrieved document.",
    metadata: { source: "file", document_id: "doc-1", url: "https://example.com/doc-1" },
    score: 0.91,
  }]],
}, { workflow: "smoke" });
assert.equal(chatGptPluginDocs[0].pageContent, "Plugin retrieved document.");
assert.equal(chatGptPluginDocs[0].metadata.source, "chatgpt_retrieval_plugin");
assert.equal(chatGptPluginDocs[0].metadata.workflow, "smoke");
assert.equal(chatGptPluginDocs[0].metadata.id, "doc-1");
assert.equal(chatGptPluginDocs[0].metadata.score, 0.91);
assert.equal(chatGptPluginDocs[0].metadata.url, "https://example.com/doc-1");

const chatGptPluginHttpCalls = [];
const chatGptPluginRuntime = {
  async http(url, options) {
    chatGptPluginHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [[{
          id: "doc-1",
          text: "Plugin retrieved document.",
          metadata: { source: "file", document_id: "doc-1" },
          score: 0.91,
        }]],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected ChatGPT plugin nested tool call");
  },
};

const chatGptPluginRetrieval = await chatGptPluginRetrieverTool.run({
  bearerToken: { value: "plugin-token" },
  baseUrl: "https://retrieval.example.com",
  query: "agent docs",
  topK: 5,
  filter: { source: "file" },
  metadata: { workflow: "smoke" },
}, chatGptPluginRuntime);
assert.equal(chatGptPluginRetrieval.documents[0].pageContent, "Plugin retrieved document.");
assert.equal(chatGptPluginRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(chatGptPluginHttpCalls[0].url, "https://retrieval.example.com/query");
assert.equal(chatGptPluginHttpCalls[0].options.method, "POST");
assert.equal(chatGptPluginHttpCalls[0].options.headers.Authorization, "Bearer plugin-token");
assert.equal(chatGptPluginHttpCalls[0].options.body.queries[0].query, "agent docs");
assert.equal(chatGptPluginHttpCalls[0].options.body.queries[0].top_k, 5);
assert.equal(chatGptPluginHttpCalls[0].options.body.queries[0].filter.source, "file");

const dappierDocs = loadDappierAiRecommendationsDocuments({
  status: "success",
  response: {
    query: "agent data",
    message: "Recommendations found.",
    results: [{
      title: "Dappier Result",
      summary: "Dappier recommended article summary.",
      preview_content: "Article preview.",
      url: "https://example.com/dappier",
      source_url: "https://publisher.example.com/story",
      site: "Example News",
      site_domain: "example.com",
      author: "Ada",
      score: 0.82,
    }],
  },
}, { workflow: "smoke" });
assert.equal(dappierDocs[0].pageContent, "Dappier recommended article summary.");
assert.equal(dappierDocs[0].metadata.source, "dappier_ai_recommendations");
assert.equal(dappierDocs[0].metadata.workflow, "smoke");
assert.equal(dappierDocs[0].metadata.title, "Dappier Result");
assert.equal(dappierDocs[0].metadata.url, "https://example.com/dappier");
assert.equal(dappierDocs[0].metadata.score, 0.82);

const dappierHttpCalls = [];
const dappierRuntime = {
  async http(url, options) {
    dappierHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        status: "success",
        response: {
          query: "agent data",
          results: [{
            title: "Dappier Result",
            summary: "Dappier recommended article summary.",
            url: "https://example.com/dappier",
            score: 0.82,
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Dappier nested tool call");
  },
};

const dappierRetrieval = await dappierAiRecommendationsRetrieverTool.run({
  apiKey: { value: "dappier-key" },
  dataModelId: "dm_123",
  query: "agent data",
  similarityTopK: 3,
  ref: "example.com",
  numArticlesRef: 1,
  searchAlgorithm: "semantic",
  page: 2,
  numResults: 4,
  metadata: { workflow: "smoke" },
}, dappierRuntime);
assert.equal(dappierRetrieval.documents[0].pageContent, "Dappier recommended article summary.");
assert.equal(dappierRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(dappierHttpCalls[0].url, "https://api.dappier.com/app/v2/search?data_model_id=dm_123");
assert.equal(dappierHttpCalls[0].options.method, "POST");
assert.equal(dappierHttpCalls[0].options.headers.Authorization, "Bearer dappier-key");
assert.equal(dappierHttpCalls[0].options.body.query, "agent data");
assert.equal(dappierHttpCalls[0].options.body.similarity_top_k, 3);
assert.equal(dappierHttpCalls[0].options.body.ref, "example.com");
assert.equal(dappierHttpCalls[0].options.body.num_articles_ref, 1);
assert.equal(dappierHttpCalls[0].options.body.search_algorithm, "semantic");
assert.equal(dappierHttpCalls[0].options.body.page, 2);
assert.equal(dappierHttpCalls[0].options.body.num_results, 4);

const valyuRetrieverDocs = loadValyuSearchDocuments({
  success: true,
  tx_id: "tx_123",
  query: "agent search",
  results: [{
    id: "https://example.com/valyu",
    title: "Valyu Result",
    url: "https://example.com/valyu",
    content: "Valyu retrieved content for agents.",
    relevance_score: 0.95,
    data_type: "unstructured",
    source_type: "website",
    publication_date: "2026-05-01",
  }],
  total_deduction_dollars: 0.0075,
  total_characters: 1024,
}, { workflow: "smoke" });
assert.equal(valyuRetrieverDocs[0].pageContent, "Valyu retrieved content for agents.");
assert.equal(valyuRetrieverDocs[0].metadata.source, "valyu_search");
assert.equal(valyuRetrieverDocs[0].metadata.workflow, "smoke");
assert.equal(valyuRetrieverDocs[0].metadata.title, "Valyu Result");
assert.equal(valyuRetrieverDocs[0].metadata.url, "https://example.com/valyu");
assert.equal(valyuRetrieverDocs[0].metadata.relevanceScore, 0.95);
assert.equal(valyuRetrieverDocs[0].metadata.sourceType, "website");
assert.equal(valyuRetrieverDocs[0].metadata.publicationDate, "2026-05-01");
assert.equal(valyuRetrieverDocs[0].metadata.txId, "tx_123");

const valyuRetrieverHttpCalls = [];
const valyuRetrieverRuntime = {
  async http(url, options) {
    valyuRetrieverHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        success: true,
        tx_id: "tx_456",
        query: "agent search",
        results: [{
          title: "Valyu Result",
          url: "https://example.com/valyu",
          content: "Valyu retrieved content for agents.",
          relevance_score: 0.95,
          source_type: "website",
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Valyu nested tool call");
  },
};

const valyuRetrieval = await valyuSearchRetrieverTool.run({
  apiKey: { value: "valyu-key" },
  query: "agent search",
  maxNumResults: 5,
  searchType: "all",
  maxPrice: 20,
  relevanceThreshold: 0.6,
  includedSources: ["web", "valyu/valyu-arxiv"],
  excludedSources: ["reddit.com"],
  sourceBiases: { "example.com": 3 },
  instructions: "Prefer primary sources.",
  responseLength: "medium",
  startDate: "2026-01-01",
  endDate: "2026-05-21",
  countryCode: "US",
  fastMode: false,
  urlOnly: false,
  metadata: { workflow: "smoke" },
}, valyuRetrieverRuntime);
assert.equal(valyuRetrieval.documents[0].pageContent, "Valyu retrieved content for agents.");
assert.equal(valyuRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(valyuRetrieverHttpCalls[0].url, "https://api.valyu.ai/v1/search");
assert.equal(valyuRetrieverHttpCalls[0].options.method, "POST");
assert.equal(valyuRetrieverHttpCalls[0].options.headers["X-API-Key"], "valyu-key");
assert.equal(valyuRetrieverHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(valyuRetrieverHttpCalls[0].options.body.query, "agent search");
assert.equal(valyuRetrieverHttpCalls[0].options.body.max_num_results, 5);
assert.equal(valyuRetrieverHttpCalls[0].options.body.search_type, "all");
assert.equal(valyuRetrieverHttpCalls[0].options.body.max_price, 20);
assert.equal(valyuRetrieverHttpCalls[0].options.body.relevance_threshold, 0.6);
assert.equal(valyuRetrieverHttpCalls[0].options.body.included_sources[1], "valyu/valyu-arxiv");
assert.equal(valyuRetrieverHttpCalls[0].options.body.excluded_sources[0], "reddit.com");
assert.equal(valyuRetrieverHttpCalls[0].options.body.source_biases["example.com"], 3);
assert.equal(valyuRetrieverHttpCalls[0].options.body.instructions, "Prefer primary sources.");
assert.equal(valyuRetrieverHttpCalls[0].options.body.response_length, "medium");
assert.equal(valyuRetrieverHttpCalls[0].options.body.start_date, "2026-01-01");
assert.equal(valyuRetrieverHttpCalls[0].options.body.end_date, "2026-05-21");
assert.equal(valyuRetrieverHttpCalls[0].options.body.country_code, "US");
assert.equal(valyuRetrieverHttpCalls[0].options.body.fast_mode, false);
assert.equal(valyuRetrieverHttpCalls[0].options.body.url_only, false);

const searxngDocs = loadSearxngSearchDocuments({
  results: [{
    title: "SearXNG Result",
    url: "https://example.com/searxng",
    content: "SearXNG retrieved content",
    engine: "duckduckgo",
    category: "general",
    score: 1,
  }],
}, { workflow: "smoke" });
assert.equal(searxngDocs[0].pageContent, "SearXNG retrieved content");
assert.equal(searxngDocs[0].metadata.workflow, "smoke");
assert.equal(searxngDocs[0].metadata.engine, "duckduckgo");

const searxngHttpCalls = [];
const searxngRuntime = {
  async http(url, options) {
    searxngHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [{
          title: "SearXNG Result",
          url: "https://example.com/searxng",
          content: "SearXNG retrieved content",
          engine: "duckduckgo",
          category: "general",
          score: 1,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected SearXNG nested tool call");
  },
};

const searxngRetrieval = await searxngSearchRetrieverTool.run({
  baseUrl: "https://search.example.com",
  query: "agent runtime docs",
  categories: ["general"],
  engines: ["duckduckgo"],
  language: "en",
  safesearch: 1,
  metadata: { workflow: "smoke" },
}, searxngRuntime);
assert.equal(searxngRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(searxngHttpCalls[0].url, "https://search.example.com/search?q=agent%20runtime%20docs&format=json&categories=general&engines=duckduckgo&language=en&safesearch=1");
assert.equal(searxngHttpCalls[0].options.method, "GET");
assert.equal(searxngHttpCalls[0].options.headers.accept, "application/json");

const stackExchangeDocs = loadStackExchangeSearchDocuments({
  site: "stackoverflow",
  items: [{
    question_id: 123,
    title: "Using Chidori &amp; StackExchange",
    link: "https://stackoverflow.com/questions/123/using-chidori",
    body: "<p>Use <code>chidori.tool</code> with agents.</p>",
    tags: ["typescript", "agents"],
    score: 7,
    answer_count: 2,
    view_count: 42,
    is_answered: true,
    owner: { display_name: "Ada", link: "https://stackoverflow.com/users/1/ada" },
  }],
}, { workflow: "smoke" });
assert.equal(stackExchangeDocs[0].pageContent, "Use chidori.tool with agents.");
assert.equal(stackExchangeDocs[0].metadata.title, "Using Chidori & StackExchange");
assert.equal(stackExchangeDocs[0].metadata.questionId, 123);

const stackExchangeHttpCalls = [];
const stackExchangeRuntime = {
  async http(url, options) {
    stackExchangeHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        items: [{
          question_id: 123,
          title: "Using Chidori &amp; StackExchange",
          link: "https://stackoverflow.com/questions/123/using-chidori",
          body: "<p>Use <code>chidori.tool</code> with agents.</p>",
          tags: ["typescript", "agents"],
          score: 7,
          answer_count: 2,
          is_answered: true,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected StackExchange nested tool call");
  },
};

const stackExchangeRetrieval = await stackExchangeSearchRetrieverTool.run({
  apiKey: { value: "stack-key" },
  query: "chidori agents",
  site: "stackoverflow",
  tagged: ["typescript", "agents"],
  pageSize: 2,
  metadata: { workflow: "smoke" },
}, stackExchangeRuntime);
assert.equal(stackExchangeRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(stackExchangeRetrieval.documents[0].metadata.site, "stackoverflow");
assert.equal(stackExchangeHttpCalls[0].url, "https://api.stackexchange.com/2.3/search/advanced?site=stackoverflow&q=chidori%20agents&tagged=typescript%3Bagents&sort=relevance&order=desc&pagesize=2&filter=withbody&key=stack-key");
assert.equal(stackExchangeHttpCalls[0].options.method, "GET");
assert.equal(stackExchangeHttpCalls[0].options.headers.accept, "application/json");

const youComDocs = loadYouComSearchDocuments({
  results: {
    web: [{
      title: "You.com Result",
      url: "https://example.com/you",
      description: "A You.com result",
      snippets: ["Snippet one", "Snippet two"],
      favicon_url: "https://you.com/favicon?domain=example.com",
    }],
  },
}, { workflow: "smoke" });
assert.equal(youComDocs[0].pageContent, "Snippet one\n\nSnippet two");
assert.equal(youComDocs[0].metadata.group, "web");
assert.equal(youComDocs[0].metadata.workflow, "smoke");

const youComHttpCalls = [];
const youComRuntime = {
  async http(url, options) {
    youComHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: {
          web: [{
            title: "You.com Result",
            url: "https://example.com/you",
            description: "A You.com result",
            snippets: ["Snippet one"],
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected You.com nested tool call");
  },
};

const youComRetrieval = await youComSearchRetrieverTool.run({
  apiKey: { value: "you-key" },
  query: "agent runtime docs",
  count: 2,
  includeDomains: ["example.com"],
  livecrawl: "fallback",
  livecrawlFormats: ["markdown"],
  metadata: { workflow: "smoke" },
}, youComRuntime);
assert.equal(youComRetrieval.documents[0].metadata.url, "https://example.com/you");
assert.equal(youComHttpCalls[0].url, "https://api.you.com/v1/search?query=agent%20runtime%20docs&count=2&include_domains=example.com&livecrawl=fallback&livecrawl_formats=markdown");
assert.equal(youComHttpCalls[0].options.method, "GET");
assert.equal(youComHttpCalls[0].options.headers["X-API-Key"], "you-key");

const linkupDocs = loadLinkupSearchDocuments({
  results: [{
    type: "text",
    name: "Linkup Result",
    url: "https://example.com/linkup",
    content: "Linkup retrieved content",
  }],
}, { workflow: "smoke" });
assert.equal(linkupDocs[0].pageContent, "Linkup retrieved content");
assert.equal(linkupDocs[0].metadata.workflow, "smoke");
assert.equal(linkupDocs[0].metadata.title, "Linkup Result");

const linkupHttpCalls = [];
const linkupRuntime = {
  async http(url, options) {
    linkupHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [{
          type: "text",
          name: "Linkup Result",
          url: "https://example.com/linkup",
          content: "Linkup retrieved content",
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Linkup nested tool call");
  },
};

const linkupRetrieval = await linkupSearchRetrieverTool.run({
  apiKey: { value: "linkup-key" },
  query: "agent runtime docs",
  depth: "deep",
  includeDomains: ["example.com"],
  maxResults: 2,
  metadata: { workflow: "smoke" },
}, linkupRuntime);
assert.equal(linkupRetrieval.documents[0].pageContent, "Linkup retrieved content");
assert.equal(linkupRetrieval.documents[0].metadata.url, "https://example.com/linkup");
assert.equal(linkupHttpCalls[0].url, "https://api.linkup.so/v1/search");
assert.equal(linkupHttpCalls[0].options.method, "POST");
assert.equal(linkupHttpCalls[0].options.headers.Authorization, "Bearer linkup-key");
assert.equal(linkupHttpCalls[0].options.body.q, "agent runtime docs");
assert.equal(linkupHttpCalls[0].options.body.depth, "deep");
assert.equal(linkupHttpCalls[0].options.body.outputType, "searchResults");
assert.equal(linkupHttpCalls[0].options.body.includeDomains[0], "example.com");
assert.equal(linkupHttpCalls[0].options.body.maxResults, 2);

const mojeekDocs = loadMojeekSearchDocuments({
  response: {
    head: {
      query: "agent runtime docs",
    },
    results: [{
      title: "Mojeek Result",
      url: "https://example.com/mojeek",
      desc: "Mojeek retrieved content",
      score: 12.3,
      date: "Thu May 21 10:00:00 2026",
      image: { url: "https://example.com/image.png" },
    }],
  },
}, { workflow: "smoke" });
assert.equal(mojeekDocs[0].pageContent, "Mojeek retrieved content");
assert.equal(mojeekDocs[0].metadata.source, "mojeek_search");
assert.equal(mojeekDocs[0].metadata.workflow, "smoke");
assert.equal(mojeekDocs[0].metadata.title, "Mojeek Result");
assert.equal(mojeekDocs[0].metadata.url, "https://example.com/mojeek");
assert.equal(mojeekDocs[0].metadata.score, 12.3);
assert.equal(mojeekDocs[0].metadata.imageUrl, "https://example.com/image.png");

const mojeekHttpCalls = [];
const mojeekRuntime = {
  async http(url, options) {
    mojeekHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        response: {
          head: { query: "agent runtime docs" },
          results: [{
            title: "Mojeek Result",
            url: "https://example.com/mojeek",
            desc: "Mojeek retrieved content",
            score: 12.3,
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Mojeek nested tool call");
  },
};

const mojeekRetrieval = await mojeekSearchRetrieverTool.run({
  apiKey: { value: "mojeek-key" },
  query: "agent runtime docs",
  count: 3,
  languageBoost: "EN",
  languageBoostWeight: 100,
  regionBoost: "GB",
  regionBoostWeight: 10,
  safeSearch: true,
  includeDomains: ["example.com"],
  metadata: { workflow: "smoke" },
}, mojeekRuntime);
assert.equal(mojeekRetrieval.documents[0].pageContent, "Mojeek retrieved content");
assert.equal(mojeekRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(mojeekRetrieval.documents[0].metadata.url, "https://example.com/mojeek");
assert.equal(mojeekHttpCalls[0].url, "https://api.mojeek.com/search?api_key=mojeek-key&q=agent%20runtime%20docs&t=3&rb=GB&rbb=10&lb=EN&lbb=100&fmt=json&safe=1&fi=example.com");
assert.equal(mojeekHttpCalls[0].options.method, "GET");
assert.equal(mojeekHttpCalls[0].options.headers.accept, "application/json");

const parallelDocs = loadParallelSearchDocuments({
  search_id: "search_123",
  session_id: "session_123",
  results: [{
    title: "Parallel Result",
    url: "https://example.com/parallel",
    publish_date: "2026-05-21",
    excerpts: ["Parallel excerpt one", "Parallel excerpt two"],
  }],
}, { workflow: "smoke" });
assert.equal(parallelDocs[0].pageContent, "Parallel excerpt one\n\nParallel excerpt two");
assert.equal(parallelDocs[0].metadata.source, "parallel_search");
assert.equal(parallelDocs[0].metadata.workflow, "smoke");
assert.equal(parallelDocs[0].metadata.title, "Parallel Result");
assert.equal(parallelDocs[0].metadata.url, "https://example.com/parallel");
assert.equal(parallelDocs[0].metadata.searchId, "search_123");
assert.equal(parallelDocs[0].metadata.sessionId, "session_123");

const parallelHttpCalls = [];
const parallelRuntime = {
  async http(url, options) {
    parallelHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        search_id: "search_123",
        session_id: "session_123",
        results: [{
          title: "Parallel Result",
          url: "https://example.com/parallel",
          publish_date: "2026-05-21",
          excerpts: ["Parallel retrieved excerpt"],
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Parallel nested tool call");
  },
};

const parallelRetrieval = await parallelSearchRetrieverTool.run({
  apiKey: { value: "parallel-key" },
  objective: "Find recent Chidori agent integration documentation.",
  searchQueries: ["Chidori agent integrations", "Chidori TypeScript agents"],
  mode: "basic",
  maxCharsTotal: 4000,
  sessionId: "session_test",
  clientModel: "gpt-5",
  advancedSettings: { source_policy: { include_domains: ["chidori.dev"] } },
  metadata: { workflow: "smoke" },
}, parallelRuntime);
assert.equal(parallelRetrieval.documents[0].pageContent, "Parallel retrieved excerpt");
assert.equal(parallelRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(parallelRetrieval.documents[0].metadata.url, "https://example.com/parallel");
assert.equal(parallelHttpCalls[0].url, "https://api.parallel.ai/v1/search");
assert.equal(parallelHttpCalls[0].options.method, "POST");
assert.equal(parallelHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(parallelHttpCalls[0].options.headers["x-api-key"], "parallel-key");
assert.equal(parallelHttpCalls[0].options.body.objective, "Find recent Chidori agent integration documentation.");
assert.equal(parallelHttpCalls[0].options.body.search_queries[0], "Chidori agent integrations");
assert.equal(parallelHttpCalls[0].options.body.mode, "basic");
assert.equal(parallelHttpCalls[0].options.body.max_chars_total, 4000);
assert.equal(parallelHttpCalls[0].options.body.session_id, "session_test");
assert.equal(parallelHttpCalls[0].options.body.client_model, "gpt-5");

const nimbleDocs = loadNimbleSearchDocuments({
  request_id: "request_123",
  total_results: 1,
  answer: "Nimble answer summary",
  results: [{
    title: "Nimble Result",
    description: "Nimble result description",
    url: "https://example.com/nimble",
    content: "Nimble parsed content",
    metadata: { publisher: "Example" },
  }],
}, { workflow: "smoke" });
assert.equal(nimbleDocs[0].pageContent, "Nimble parsed content");
assert.equal(nimbleDocs[0].metadata.source, "nimble_search");
assert.equal(nimbleDocs[0].metadata.workflow, "smoke");
assert.equal(nimbleDocs[0].metadata.title, "Nimble Result");
assert.equal(nimbleDocs[0].metadata.url, "https://example.com/nimble");
assert.equal(nimbleDocs[0].metadata.requestId, "request_123");
assert.equal(nimbleDocs[0].metadata.answer, "Nimble answer summary");
assert.equal(nimbleDocs[0].metadata.resultMetadata.publisher, "Example");

const nimbleHttpCalls = [];
const nimbleRuntime = {
  async http(url, options) {
    nimbleHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        request_id: "request_123",
        total_results: 1,
        answer: "Nimble answer summary",
        results: [{
          title: "Nimble Result",
          description: "Nimble result description",
          url: "https://example.com/nimble",
          content: "Nimble parsed content",
          metadata: { publisher: "Example" },
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Nimble nested tool call");
  },
};

const nimbleRetrieval = await nimbleSearchRetrieverTool.run({
  apiKey: { value: "nimble-key" },
  query: "agent runtime docs",
  locale: "en-US",
  country: "US",
  outputFormat: "markdown",
  maxResults: 4,
  focus: "coding",
  contentType: ["documents", "pdf"],
  searchDepth: "fast",
  includeAnswer: true,
  includeDomains: ["chidori.dev"],
  excludeDomains: ["spam.example"],
  metadata: { workflow: "smoke" },
}, nimbleRuntime);
assert.equal(nimbleRetrieval.documents[0].pageContent, "Nimble parsed content");
assert.equal(nimbleRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(nimbleRetrieval.documents[0].metadata.url, "https://example.com/nimble");
assert.equal(nimbleHttpCalls[0].url, "https://sdk.nimbleway.com/v1/search");
assert.equal(nimbleHttpCalls[0].options.method, "POST");
assert.equal(nimbleHttpCalls[0].options.headers.Authorization, "Bearer nimble-key");
assert.equal(nimbleHttpCalls[0].options.headers["content-type"], "application/json");
assert.equal(nimbleHttpCalls[0].options.body.query, "agent runtime docs");
assert.equal(nimbleHttpCalls[0].options.body.locale, "en-US");
assert.equal(nimbleHttpCalls[0].options.body.country, "US");
assert.equal(nimbleHttpCalls[0].options.body.output_format, "markdown");
assert.equal(nimbleHttpCalls[0].options.body.max_results, 4);
assert.equal(nimbleHttpCalls[0].options.body.focus, "coding");
assert.equal(nimbleHttpCalls[0].options.body.content_type[0], "documents");
assert.equal(nimbleHttpCalls[0].options.body.search_depth, "fast");
assert.equal(nimbleHttpCalls[0].options.body.include_answer, true);
assert.equal(nimbleHttpCalls[0].options.body.include_domains[0], "chidori.dev");
assert.equal(nimbleHttpCalls[0].options.body.exclude_domains[0], "spam.example");

const pubMedDocs = loadPubMedSearchDocuments({
  idList: ["12345"],
  summaries: {
    result: {
      "12345": {
        uid: "12345",
        title: "A useful PubMed paper",
        fulljournalname: "Journal of Agent Systems",
        pubdate: "2026 Jan",
        source: "J Agent Syst",
        authors: [{ name: "Ada Lovelace" }],
        articleids: [{ idtype: "doi", value: "10.1000/example" }],
      },
    },
  },
}, { workflow: "smoke" });
assert.equal(pubMedDocs[0].metadata.uid, "12345");
assert.equal(pubMedDocs[0].metadata.doi, "10.1000/example");
assert.equal(pubMedDocs[0].pageContent.includes("A useful PubMed paper"), true);

const pubMedHttpCalls = [];
const pubMedRuntime = {
  async http(url, options) {
    pubMedHttpCalls.push({ url, options });
    if (url.includes("esearch.fcgi")) {
      return {
        status: 200,
        headers: {},
        body: { esearchresult: { idlist: ["12345"] } },
      };
    }
    return {
      status: 200,
      headers: {},
      body: {
        result: {
          "12345": {
            uid: "12345",
            title: "A useful PubMed paper",
            fulljournalname: "Journal of Agent Systems",
            pubdate: "2026 Jan",
            source: "J Agent Syst",
            authors: [{ name: "Ada Lovelace" }],
            articleids: [{ idtype: "doi", value: "10.1000/example" }],
          },
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected PubMed nested tool call");
  },
};

const pubMedRetrieval = await pubMedSearchRetrieverTool.run({
  query: "agent runtime",
  apiKey: { value: "ncbi-key" },
  retMax: 1,
  sort: "relevance",
  tool: "chidori-smoke",
  email: "agent@example.com",
  metadata: { workflow: "smoke" },
}, pubMedRuntime);
assert.equal(pubMedRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(pubMedRetrieval.documents[0].metadata.url, "https://pubmed.ncbi.nlm.nih.gov/12345/");
assert.equal(pubMedHttpCalls[0].url, "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=agent%20runtime&retmode=json&retmax=1&sort=relevance&api_key=ncbi-key&tool=chidori-smoke&email=agent%40example.com");
assert.equal(pubMedHttpCalls[0].options.method, "GET");
assert.equal(pubMedHttpCalls[1].url, "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=12345&retmode=json&api_key=ncbi-key&tool=chidori-smoke&email=agent%40example.com");
assert.equal(pubMedHttpCalls[1].options.method, "GET");

const wikipediaDocs = loadWikipediaSearchDocuments({
  search: {
    query: {
      search: [{
        pageid: 42,
        title: "Chidori",
        snippet: "A <span class=\"searchmatch\">workflow</span> runtime",
        wordcount: 123,
      }],
    },
  },
  summaries: [{
    title: "Chidori",
    extract: "Chidori is an agent runtime.",
    content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Chidori" } },
  }],
}, { workflow: "smoke" });
assert.equal(wikipediaDocs[0].pageContent, "Chidori is an agent runtime.");
assert.equal(wikipediaDocs[0].metadata.workflow, "smoke");
assert.equal(wikipediaDocs[0].metadata.url, "https://en.wikipedia.org/wiki/Chidori");

const wikipediaHttpCalls = [];
const wikipediaRuntime = {
  async http(url, options) {
    wikipediaHttpCalls.push({ url, options });
    if (url.includes("/w/api.php")) {
      return {
        status: 200,
        headers: {},
        body: {
          query: {
            search: [{
              pageid: 42,
              title: "Chidori",
              snippet: "A <span class=\"searchmatch\">workflow</span> runtime",
              wordcount: 123,
            }],
          },
        },
      };
    }
    return {
      status: 200,
      headers: {},
      body: {
        title: "Chidori",
        pageid: 42,
        extract: "Chidori is an agent runtime.",
        description: "agent runtime",
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Chidori" } },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Wikipedia nested tool call");
  },
};

const wikipediaRetrieval = await wikipediaSearchRetrieverTool.run({
  query: "Chidori",
  language: "en",
  limit: 1,
  metadata: { workflow: "smoke" },
}, wikipediaRuntime);
assert.equal(wikipediaRetrieval.documents[0].pageContent, "Chidori is an agent runtime.");
assert.equal(wikipediaRetrieval.documents[0].metadata.description, "agent runtime");
assert.equal(wikipediaHttpCalls[0].url, "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Chidori&srlimit=1&format=json&origin=*");
assert.equal(wikipediaHttpCalls[0].options.method, "GET");
assert.equal(wikipediaHttpCalls[1].url, "https://en.wikipedia.org/api/rest_v1/page/summary/Chidori?redirect=true");
assert.equal(wikipediaHttpCalls[1].options.method, "GET");

const arxivRetrieverXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:arxiv="http://arxiv.org/schemas/atom">
  <opensearch:totalResults>1</opensearch:totalResults>
  <entry>
    <id>http://arxiv.org/abs/0704.0001v1</id>
    <updated>2007-05-23T00:00:00Z</updated>
    <published>2007-04-02T19:18:42Z</published>
    <title>A sample &amp; paper</title>
    <summary>This is a useful summary.</summary>
    <author><name>Ada Lovelace</name></author>
    <arxiv:primary_category term="cs.AI" />
    <category term="cs.AI" />
    <link href="http://arxiv.org/abs/0704.0001v1" rel="alternate" type="text/html" />
    <link title="pdf" href="http://arxiv.org/pdf/0704.0001v1" rel="related" type="application/pdf" />
  </entry>
</feed>`;
const arxivRetrieverFeed = parseArxivRetrieverFeed(arxivRetrieverXml);
const arxivDocs = loadArxivSearchDocuments(arxivRetrieverFeed, { workflow: "smoke" });
assert.equal(arxivDocs[0].pageContent, "This is a useful summary.");
assert.equal(arxivDocs[0].metadata.workflow, "smoke");
assert.equal(arxivDocs[0].metadata.title, "A sample & paper");
assert.equal(arxivDocs[0].metadata.pdfUrl, "http://arxiv.org/pdf/0704.0001v1");

const arxivRetrieverHttpCalls = [];
const arxivRetrieverRuntime = {
  async http(url, options) {
    arxivRetrieverHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: arxivRetrieverXml,
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected arXiv nested tool call");
  },
};

const arxivRetrieval = await arxivSearchRetrieverTool.run({
  query: "cat:cs.AI",
  maxResults: 2,
  sortBy: "submittedDate",
  sortOrder: "descending",
  metadata: { workflow: "smoke" },
}, arxivRetrieverRuntime);
assert.equal(arxivRetrieval.documents[0].metadata.primaryCategory, "cs.AI");
assert.equal(arxivRetrieverHttpCalls[0].url, "https://export.arxiv.org/api/query?search_query=cat%3Acs.AI&max_results=2&sortBy=submittedDate&sortOrder=descending");
assert.equal(arxivRetrieverHttpCalls[0].options.method, "GET");

const tavilyDocs = loadTavilySearchDocuments({
  query: "agent runtime docs",
  answer: "Use Chidori tools.",
  results: [{
    title: "Tavily Result",
    url: "https://example.com/tavily",
    content: "Short result content",
    raw_content: "Raw Tavily content",
    score: 0.92,
  }],
}, { workflow: "smoke" });
assert.equal(tavilyDocs[0].pageContent, "Raw Tavily content");
assert.equal(tavilyDocs[0].metadata.workflow, "smoke");
assert.equal(tavilyDocs[0].metadata.answer, "Use Chidori tools.");

const tavilyHttpCalls = [];
const tavilyRuntime = {
  async http(url, options) {
    tavilyHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        query: "agent runtime docs",
        results: [{
          title: "Tavily Result",
          url: "https://example.com/tavily",
          raw_content: "Raw Tavily content",
          score: 0.92,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Tavily nested tool call");
  },
};

const tavilyRetrieval = await tavilySearchRetrieverTool.run({
  apiKey: { value: "tavily-key" },
  query: "agent runtime docs",
  maxResults: 3,
  searchDepth: "advanced",
  includeDomains: ["example.com"],
  metadata: { workflow: "smoke" },
}, tavilyRuntime);
assert.equal(tavilyRetrieval.documents[0].pageContent, "Raw Tavily content");
assert.equal(tavilyRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(tavilyRetrieval.documents[0].metadata.score, 0.92);
assert.equal(tavilyHttpCalls[0].url, "https://api.tavily.com/search");
assert.equal(tavilyHttpCalls[0].options.method, "POST");
assert.equal(tavilyHttpCalls[0].options.headers.Authorization, "Bearer tavily-key");
assert.equal(tavilyHttpCalls[0].options.body.query, "agent runtime docs");
assert.equal(tavilyHttpCalls[0].options.body.max_results, 3);
assert.equal(tavilyHttpCalls[0].options.body.search_depth, "advanced");
assert.equal(tavilyHttpCalls[0].options.body.include_raw_content, "markdown");
assert.equal(tavilyHttpCalls[0].options.body.include_domains[0], "example.com");

const exaDocs = loadExaSearchDocuments({
  results: [{
    id: "exa-1",
    title: "Exa Result",
    url: "https://example.com/exa",
    highlights: ["Relevant excerpt"],
    highlightScores: [0.9],
  }],
}, { workflow: "smoke" });
assert.equal(exaDocs[0].pageContent, "Relevant excerpt");
assert.equal(exaDocs[0].metadata.workflow, "smoke");
assert.equal(exaDocs[0].metadata.url, "https://example.com/exa");

const vespaDocs = loadVespaSearchDocuments({
  root: {
    children: [{
      id: "id:docs:doc::doc-1",
      relevance: 0.95,
      fields: {
        title: "Vespa Guide",
        text: "Vespa retrieved document text.",
        url: "https://example.com/vespa",
      },
    }],
  },
}, { workflow: "smoke" });
assert.equal(vespaDocs[0].pageContent, "Vespa retrieved document text.");
assert.equal(vespaDocs[0].metadata.source, "vespa");
assert.equal(vespaDocs[0].metadata.id, "id:docs:doc::doc-1");
assert.equal(vespaDocs[0].metadata.relevance, 0.95);
assert.equal(vespaDocs[0].metadata.title, "Vespa Guide");
assert.equal(vespaDocs[0].metadata.workflow, "smoke");

const meilisearchDocs = loadMeilisearchSearchDocuments({
  hits: [{
    id: "doc-1",
    title: "Meilisearch Guide",
    text: "Meilisearch retrieved document text.",
    url: "https://example.com/meili",
    _rankingScore: 0.88,
  }],
  query: "meili guide",
  estimatedTotalHits: 1,
  processingTimeMs: 2,
}, { workflow: "smoke" });
assert.equal(meilisearchDocs[0].pageContent, "Meilisearch retrieved document text.");
assert.equal(meilisearchDocs[0].metadata.source, "meilisearch");
assert.equal(meilisearchDocs[0].metadata.id, "doc-1");
assert.equal(meilisearchDocs[0].metadata.rankingScore, 0.88);
assert.equal(meilisearchDocs[0].metadata.title, "Meilisearch Guide");
assert.equal(meilisearchDocs[0].metadata.workflow, "smoke");

const supabaseHybridDocs = loadSupabaseHybridDocuments([
  { id: 1, content: "Hybrid duplicate document.", metadata: { slug: "duplicate" }, similarity: 0.91 },
  { id: 2, content: "Vector-only document.", metadata: { slug: "vector" }, similarity: 0.7 },
], [
  { id: 1, content: "Hybrid duplicate document.", metadata: { slug: "duplicate" }, similarity: 0.83 },
  { id: 3, content: "Keyword-only document.", metadata: { slug: "keyword" }, similarity: 0.6 },
], { workflow: "smoke" });
assert.equal(supabaseHybridDocs.length, 3);
assert.equal(supabaseHybridDocs[0].pageContent, "Hybrid duplicate document.");
assert.equal(supabaseHybridDocs[0].metadata.source, "supabase_hybrid");
assert.equal(supabaseHybridDocs[0].metadata.vectorRank, 0);
assert.equal(supabaseHybridDocs[0].metadata.keywordRank, 0);
assert.equal(supabaseHybridDocs[0].metadata.workflow, "smoke");

const supabaseHybridHttpCalls = [];
const supabaseHybridRuntime = {
  async http(url, options) {
    supabaseHybridHttpCalls.push({ url, options });
    if (url.endsWith("/rpc/match_documents")) {
      return {
        status: 200,
        headers: {},
        body: [{ id: 1, content: "Hybrid duplicate document.", metadata: { slug: "duplicate" }, similarity: 0.91 }],
      };
    }
    return {
      status: 200,
      headers: {},
      body: [{ id: 1, content: "Hybrid duplicate document.", metadata: { slug: "duplicate" }, similarity: 0.83 }],
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool(name, args) {
    assert.equal(name, "openai_embeddings_create");
    assert.equal(args.input, "hybrid search");
    return { data: [{ embedding: [0.1, 0.2, 0.3] }] };
  },
};

const supabaseHybridRetrieval = await supabaseHybridRetrieverTool.run({
  serviceRoleKey: { value: "supabase-key" },
  projectUrl: "https://project.supabase.co",
  query: "hybrid search",
  similarityK: 3,
  keywordK: 4,
  filter: { source: "docs" },
  metadata: { workflow: "smoke" },
}, supabaseHybridRuntime);
assert.equal(supabaseHybridRetrieval.documents[0].pageContent, "Hybrid duplicate document.");
assert.equal(supabaseHybridRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(supabaseHybridHttpCalls[0].url, "https://project.supabase.co/rest/v1/rpc/match_documents");
assert.equal(supabaseHybridHttpCalls[0].options.method, "POST");
assert.equal(supabaseHybridHttpCalls[0].options.headers.apikey, "supabase-key");
assert.equal(supabaseHybridHttpCalls[0].options.headers.Authorization, "Bearer supabase-key");
assert.deepEqual(supabaseHybridHttpCalls[0].options.body.query_embedding, [0.1, 0.2, 0.3]);
assert.equal(supabaseHybridHttpCalls[0].options.body.match_count, 3);
assert.equal(supabaseHybridHttpCalls[0].options.body.filter.source, "docs");
assert.equal(supabaseHybridHttpCalls[1].url, "https://project.supabase.co/rest/v1/rpc/kw_match_documents");
assert.equal(supabaseHybridHttpCalls[1].options.body.query_text, "hybrid search");
assert.equal(supabaseHybridHttpCalls[1].options.body.match_count, 4);

const metalDocs = loadMetalSearchDocuments({
  data: [{
    id: "metal-1",
    text: "Metal retrieved document text.",
    metadata: { title: "Metal Guide", url: "https://example.com/metal" },
    score: 0.87,
    createdAt: "2026-05-21T10:00:00.000Z",
  }],
}, { workflow: "smoke" });
assert.equal(metalDocs[0].pageContent, "Metal retrieved document text.");
assert.equal(metalDocs[0].metadata.source, "metal");
assert.equal(metalDocs[0].metadata.id, "metal-1");
assert.equal(metalDocs[0].metadata.title, "Metal Guide");
assert.equal(metalDocs[0].metadata.score, 0.87);
assert.equal(metalDocs[0].metadata.workflow, "smoke");

const metalHttpCalls = [];
const metalRuntime = {
  async http(url, options) {
    metalHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        data: [{
          id: "metal-1",
          text: "Metal retrieved document text.",
          metadata: { title: "Metal Guide" },
          score: 0.87,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Metal nested tool call");
  },
};

const metalRetrieval = await metalRetrieverTool.run({
  apiKey: { value: "metal-key" },
  clientId: { value: "metal-client" },
  indexId: "metal-index",
  query: "agent docs",
  limit: 3,
  filters: { and: [{ field: "kind", value: "docs", operator: "eq" }] },
  metadata: { workflow: "smoke" },
}, metalRuntime);
assert.equal(metalRetrieval.documents[0].pageContent, "Metal retrieved document text.");
assert.equal(metalRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(metalHttpCalls[0].url, "https://api.getmetal.io/v1/search");
assert.equal(metalHttpCalls[0].options.method, "POST");
assert.equal(metalHttpCalls[0].options.headers["x-metal-api-key"], "metal-key");
assert.equal(metalHttpCalls[0].options.headers["x-metal-client-id"], "metal-client");
assert.equal(metalHttpCalls[0].options.body.index, "metal-index");
assert.equal(metalHttpCalls[0].options.body.text, "agent docs");
assert.equal(metalHttpCalls[0].options.body.limit, 3);
assert.equal(metalHttpCalls[0].options.body.filters.and[0].field, "kind");

const zepMemoryDocs = loadZepMemoryDocuments({
  results: [{
    message: {
      uuid: "msg-1",
      role: "user",
      role_type: "human",
      content: "Zep remembered TypeScript integration preferences.",
      metadata: { topic: "integrations" },
      created_at: "2026-05-21T10:00:00.000Z",
    },
    score: 0.93,
  }, {
    summary: {
      uuid: "summary-1",
      content: "Ada prefers concise engineering notes.",
      recent_message_uuid: "msg-1",
      related_message_uuids: ["msg-1"],
    },
    score: 0.88,
  }],
}, { workflow: "smoke" });
assert.equal(zepMemoryDocs[0].pageContent, "Zep remembered TypeScript integration preferences.");
assert.equal(zepMemoryDocs[0].metadata.source, "zep_memory");
assert.equal(zepMemoryDocs[0].metadata.resultType, "message");
assert.equal(zepMemoryDocs[0].metadata.uuid, "msg-1");
assert.equal(zepMemoryDocs[0].metadata.role, "user");
assert.equal(zepMemoryDocs[0].metadata.topic, "integrations");
assert.equal(zepMemoryDocs[0].metadata.score, 0.93);
assert.equal(zepMemoryDocs[1].metadata.resultType, "summary");
assert.equal(zepMemoryDocs[1].metadata.relatedMessageUuids[0], "msg-1");

const zepMemoryHttpCalls = [];
const zepMemoryRuntime = {
  async http(url, options) {
    zepMemoryHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [{
          message: {
            uuid: "msg-1",
            role: "user",
            content: "Zep retrieved memory text.",
          },
          score: 0.93,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Zep memory nested tool call");
  },
};

const zepMemoryRetrieval = await zepMemoryRetrieverTool.run({
  apiKey: { value: "zep-key" },
  baseUrl: "https://zep.example.com/api/v1",
  sessionId: "session-123",
  query: "agent preferences",
  topK: 4,
  searchScope: "messages",
  searchType: "mmr",
  mmrLambda: 0.4,
  filter: { topic: "integrations" },
  metadata: { workflow: "smoke" },
}, zepMemoryRuntime);
assert.equal(zepMemoryRetrieval.documents[0].pageContent, "Zep retrieved memory text.");
assert.equal(zepMemoryRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(zepMemoryHttpCalls[0].url, "https://zep.example.com/api/v1/sessions/session-123/search?limit=4");
assert.equal(zepMemoryHttpCalls[0].options.method, "POST");
assert.equal(zepMemoryHttpCalls[0].options.headers.Authorization, "Bearer zep-key");
assert.equal(zepMemoryHttpCalls[0].options.body.text, "agent preferences");
assert.equal(zepMemoryHttpCalls[0].options.body.search_scope, "messages");
assert.equal(zepMemoryHttpCalls[0].options.body.search_type, "mmr");
assert.equal(zepMemoryHttpCalls[0].options.body.mmr_lambda, 0.4);
assert.equal(zepMemoryHttpCalls[0].options.body.metadata.topic, "integrations");

const zepCloudGraphDocs = loadZepCloudGraphSearchDocuments({
  context: "Zep context block.",
  edges: [{
    uuid: "edge-1",
    fact: "Ada prefers concise engineering notes.",
    name: "preference",
    source_node_uuid: "node-a",
    target_node_uuid: "node-b",
    score: 0.91,
  }],
  episodes: [{
    uuid: "episode-1",
    content: "Ada asked for TypeScript integrations.",
    role: "Ada",
    role_type: "user",
    source: "message",
  }],
  nodes: [{
    uuid: "node-a",
    name: "Ada",
    summary: "Ada works on Chidori integrations.",
    labels: ["Person"],
  }],
}, { workflow: "smoke" });
assert.equal(zepCloudGraphDocs[0].pageContent, "Zep context block.");
assert.equal(zepCloudGraphDocs[1].metadata.source, "zep_cloud_graph");
assert.equal(zepCloudGraphDocs[1].metadata.resultType, "edge");
assert.equal(zepCloudGraphDocs[1].metadata.score, 0.91);
assert.match(zepCloudGraphDocs[2].pageContent, /TypeScript integrations/);
assert.equal(zepCloudGraphDocs[2].metadata.zepSource, "message");
assert.equal(zepCloudGraphDocs[3].metadata.labels[0], "Person");

const exaHttpCalls = [];
const exaRuntime = {
  async http(url, options) {
    exaHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        results: [{
          id: "exa-1",
          title: "Exa Result",
          url: "https://example.com/exa",
          text: "Full Exa text",
          score: 0.83,
        }],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Exa nested tool call");
  },
};

const exaRetrieval = await exaSearchRetrieverTool.run({
  apiKey: { value: "exa-key" },
  query: "agent runtime docs",
  numResults: 2,
  includeDomains: ["example.com"],
  contents: { highlights: true },
  metadata: { workflow: "smoke" },
}, exaRuntime);
assert.equal(exaRetrieval.documents[0].pageContent, "Full Exa text");
assert.equal(exaRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(exaRetrieval.documents[0].metadata.score, 0.83);
assert.equal(exaHttpCalls[0].url, "https://api.exa.ai/search");
assert.equal(exaHttpCalls[0].options.method, "POST");
assert.equal(exaHttpCalls[0].options.headers["x-api-key"], "exa-key");
assert.equal(exaHttpCalls[0].options.body.query, "agent runtime docs");
assert.equal(exaHttpCalls[0].options.body.numResults, 2);
assert.equal(exaHttpCalls[0].options.body.type, "auto");
assert.equal(exaHttpCalls[0].options.body.includeDomains[0], "example.com");
assert.equal(exaHttpCalls[0].options.body.contents.highlights, true);

const vespaHttpCalls = [];
const vespaRuntime = {
  async http(url, options) {
    vespaHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        root: {
          children: [{
            id: "id:docs:doc::doc-1",
            relevance: 0.91,
            fields: {
              title: "Runtime Guide",
              body: "Retrieved from Vespa.",
              link: "https://example.com/runtime",
            },
          }],
        },
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Vespa nested tool call");
  },
};

const vespaRetrieval = await vespaRetrieverTool.run({
  token: { value: "vespa-token" },
  baseUrl: "https://tenant.app.us-north-1.vespa-app.cloud",
  yql: "select * from docs where userQuery();",
  query: "runtime guide",
  hits: 2,
  contentField: "body",
  urlField: "link",
  metadata: { workflow: "smoke" },
}, vespaRuntime);
assert.equal(vespaRetrieval.documents[0].pageContent, "Retrieved from Vespa.");
assert.equal(vespaRetrieval.documents[0].metadata.source, "vespa");
assert.equal(vespaRetrieval.documents[0].metadata.title, "Runtime Guide");
assert.equal(vespaRetrieval.documents[0].metadata.url, "https://example.com/runtime");
assert.equal(vespaRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(vespaHttpCalls[0].url, "https://tenant.app.us-north-1.vespa-app.cloud/search/");
assert.equal(vespaHttpCalls[0].options.method, "POST");
assert.equal(vespaHttpCalls[0].options.headers.Authorization, "Bearer vespa-token");
assert.equal(vespaHttpCalls[0].options.body.yql, "select * from docs where userQuery();");
assert.equal(vespaHttpCalls[0].options.body.query, "runtime guide");
assert.equal(vespaHttpCalls[0].options.body.hits, 2);

const meilisearchHttpCalls = [];
const meilisearchRuntime = {
  async http(url, options) {
    meilisearchHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        hits: [{
          id: "doc-1",
          title: "Runtime Guide",
          body: "Retrieved from Meilisearch.",
          link: "https://example.com/meili-runtime",
          _rankingScore: 0.93,
        }],
        query: "runtime guide",
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Meilisearch nested tool call");
  },
};

const meilisearchRetrieval = await meilisearchRetrieverTool.run({
  apiKey: { value: "meili-key" },
  baseUrl: "https://search.example.com",
  indexUid: "docs",
  q: "runtime guide",
  vector: [0.1, 0.2, 0.3],
  hybrid: { semanticRatio: 0.5 },
  limit: 2,
  contentField: "body",
  urlField: "link",
  metadata: { workflow: "smoke" },
}, meilisearchRuntime);
assert.equal(meilisearchRetrieval.documents[0].pageContent, "Retrieved from Meilisearch.");
assert.equal(meilisearchRetrieval.documents[0].metadata.source, "meilisearch");
assert.equal(meilisearchRetrieval.documents[0].metadata.rankingScore, 0.93);
assert.equal(meilisearchRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(meilisearchHttpCalls[0].url, "https://search.example.com/indexes/docs/search");
assert.equal(meilisearchHttpCalls[0].options.method, "POST");
assert.equal(meilisearchHttpCalls[0].options.headers.Authorization, "Bearer meili-key");
assert.equal(meilisearchHttpCalls[0].options.body.q, "runtime guide");
assert.deepEqual(meilisearchHttpCalls[0].options.body.vector, [0.1, 0.2, 0.3]);
assert.equal(meilisearchHttpCalls[0].options.body.hybrid.semanticRatio, 0.5);
assert.equal(meilisearchHttpCalls[0].options.body.limit, 2);

const zepCloudHttpCalls = [];
const zepCloudRuntime = {
  async http(url, options) {
    zepCloudHttpCalls.push({ url, options });
    return {
      status: 200,
      headers: {},
      body: {
        context: "Relevant Zep context.",
        edges: [{
          uuid: "edge-1",
          fact: "The user prefers Chidori agent examples in TypeScript.",
          name: "typescript-preference",
          score: 0.94,
          relevance: 0.9,
          selection_rank: 1,
        }],
        episodes: [],
        nodes: [],
      },
    };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected Zep nested tool call");
  },
};

const zepCloudRetrieval = await zepCloudGraphSearchRetrieverTool.run({
  apiKey: { value: "zep-key" },
  query: "typescript integration preference",
  userId: "user_123",
  scope: "edges",
  reranker: "mmr",
  limit: 3,
  mmrLambda: 0.5,
  searchFilters: { edge_types: ["PREFERS"] },
  metadata: { workflow: "smoke" },
}, zepCloudRuntime);
assert.equal(zepCloudRetrieval.documents[0].pageContent, "Relevant Zep context.");
assert.match(zepCloudRetrieval.documents[1].pageContent, /TypeScript/);
assert.equal(zepCloudRetrieval.documents[1].metadata.source, "zep_cloud_graph");
assert.equal(zepCloudRetrieval.documents[1].metadata.resultType, "edge");
assert.equal(zepCloudRetrieval.documents[1].metadata.workflow, "smoke");
assert.equal(zepCloudHttpCalls[0].url, "https://api.getzep.com/api/v2/graph/search");
assert.equal(zepCloudHttpCalls[0].options.method, "POST");
assert.equal(zepCloudHttpCalls[0].options.headers.Authorization, "zep-key");
assert.equal(zepCloudHttpCalls[0].options.body.query, "typescript integration preference");
assert.equal(zepCloudHttpCalls[0].options.body.user_id, "user_123");
assert.equal(zepCloudHttpCalls[0].options.body.scope, "edges");
assert.equal(zepCloudHttpCalls[0].options.body.reranker, "mmr");
assert.equal(zepCloudHttpCalls[0].options.body.limit, 3);
assert.equal(zepCloudHttpCalls[0].options.body.mmr_lambda, 0.5);
assert.equal(zepCloudHttpCalls[0].options.body.search_filters.edge_types[0], "PREFERS");

const bedrockKnowledgeBaseDocs = loadBedrockKnowledgeBaseDocuments({
  retrievalResults: [{
    content: { text: "Bedrock knowledge base content." },
    location: {
      type: "S3",
      s3Location: { uri: "s3://bucket/doc.txt" },
    },
    metadata: { category: "docs" },
    score: 0.92,
  }],
}, { workflow: "smoke" });
assert.equal(bedrockKnowledgeBaseDocs[0].pageContent, "Bedrock knowledge base content.");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.source, "bedrock_knowledge_base");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.workflow, "smoke");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.category, "docs");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.locationType, "S3");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.uri, "s3://bucket/doc.txt");
assert.equal(bedrockKnowledgeBaseDocs[0].metadata.score, 0.92);

const amazonKendraRetrieveDocs = loadAmazonKendraRetrieveDocuments({
  ResultItems: [{
    Content: "Kendra retrieved passage.",
    DocumentId: "doc-1",
    DocumentTitle: "Kendra Doc",
    DocumentURI: "https://example.com/kendra",
    DocumentAttributes: [{
      Key: "_source_uri",
      Value: { StringValue: "https://example.com/kendra" },
    }],
    ScoreAttributes: { ScoreConfidence: "HIGH" },
  }],
}, { workflow: "smoke" });
assert.equal(amazonKendraRetrieveDocs[0].pageContent, "Kendra retrieved passage.");
assert.equal(amazonKendraRetrieveDocs[0].metadata.source, "amazon_kendra_retrieve");
assert.equal(amazonKendraRetrieveDocs[0].metadata.documentId, "doc-1");
assert.equal(amazonKendraRetrieveDocs[0].metadata.documentTitle, "Kendra Doc");
assert.equal(amazonKendraRetrieveDocs[0].metadata.documentUri, "https://example.com/kendra");
assert.equal(amazonKendraRetrieveDocs[0].metadata.documentAttributes._source_uri, "https://example.com/kendra");
assert.equal(amazonKendraRetrieveDocs[0].metadata.scoreConfidence, "HIGH");

const amazonKendraQueryDocs = loadAmazonKendraQueryDocuments({
  ResultItems: [{
    Id: "result-1",
    Type: "DOCUMENT",
    DocumentExcerpt: {
      Text: "Kendra query excerpt.",
      Highlights: [{ BeginOffset: 0, EndOffset: 6, TopAnswer: false }],
    },
    DocumentTitle: { Text: "Kendra Query Doc" },
    DocumentURI: "https://example.com/kendra-query",
    ScoreAttributes: { ScoreConfidence: "MEDIUM" },
  }],
}, { workflow: "smoke" });
assert.equal(amazonKendraQueryDocs[0].pageContent, "Kendra query excerpt.");
assert.equal(amazonKendraQueryDocs[0].metadata.source, "amazon_kendra_query");
assert.equal(amazonKendraQueryDocs[0].metadata.id, "result-1");
assert.equal(amazonKendraQueryDocs[0].metadata.type, "DOCUMENT");
assert.equal(amazonKendraQueryDocs[0].metadata.documentTitle, "Kendra Query Doc");
assert.equal(amazonKendraQueryDocs[0].metadata.highlights[0].BeginOffset, 0);

const awsRetrieverToolCalls = [];
const awsRetrieverRuntime = {
  async http() {
    throw new Error("unexpected AWS retriever HTTP call");
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool(name, args) {
    awsRetrieverToolCalls.push({ name, args });
    if (name === "aws_bedrock_knowledge_base_retrieve") {
      return {
        retrievalResults: [{
          content: { text: "Nested Bedrock document." },
          location: { type: "WEB", webLocation: { url: "https://example.com/bedrock" } },
          score: 0.8,
        }],
      };
    }
    if (name === "aws_kendra_retrieve") {
      return {
        ResultItems: [{
          Content: "Nested Kendra retrieve document.",
          DocumentId: "doc-2",
          DocumentTitle: "Nested Kendra Retrieve",
        }],
      };
    }
    if (name === "aws_kendra_query") {
      return {
        ResultItems: [{
          DocumentExcerpt: { Text: "Nested Kendra query document." },
          DocumentTitle: { Text: "Nested Kendra Query" },
        }],
      };
    }
    throw new Error(`unexpected nested AWS retriever tool ${name}`);
  },
};

const bedrockKnowledgeBaseRetrieval = await bedrockKnowledgeBaseRetrieverTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  securityToken: { value: "session-token" },
  region: "us-west-2",
  knowledgeBaseId: "KB12345678",
  query: "agent docs",
  retrievalConfiguration: { vectorSearchConfiguration: { numberOfResults: 2 } },
  metadata: { workflow: "smoke" },
}, awsRetrieverRuntime);
assert.equal(bedrockKnowledgeBaseRetrieval.documents[0].pageContent, "Nested Bedrock document.");
assert.equal(bedrockKnowledgeBaseRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(bedrockKnowledgeBaseRetrieval.documents[0].metadata.knowledgeBaseId, "KB12345678");
assert.equal(awsRetrieverToolCalls[0].name, "aws_bedrock_knowledge_base_retrieve");
assert.equal(awsRetrieverToolCalls[0].args.query, "agent docs");
assert.equal(awsRetrieverToolCalls[0].args.retrievalConfiguration.vectorSearchConfiguration.numberOfResults, 2);

const amazonKendraRetrieval = await amazonKendraRetrieveRetrieverTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-east-2",
  indexId: "12345678-1234-1234-1234-123456789012",
  queryText: "agent docs",
  pageSize: 5,
  metadata: { workflow: "smoke" },
}, awsRetrieverRuntime);
assert.equal(amazonKendraRetrieval.documents[0].pageContent, "Nested Kendra retrieve document.");
assert.equal(amazonKendraRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(awsRetrieverToolCalls[1].name, "aws_kendra_retrieve");
assert.equal(awsRetrieverToolCalls[1].args.indexId, "12345678-1234-1234-1234-123456789012");
assert.equal(awsRetrieverToolCalls[1].args.pageSize, 5);

const amazonKendraQueryRetrieval = await amazonKendraQueryRetrieverTool.run({
  authorization: { value: "AWS4-HMAC-SHA256 Credential=example" },
  amzDate: "20260520T120000Z",
  region: "us-east-2",
  indexId: "12345678-1234-1234-1234-123456789012",
  queryText: "agent docs",
  queryResultTypeFilter: "DOCUMENT",
  metadata: { workflow: "smoke" },
}, awsRetrieverRuntime);
assert.equal(amazonKendraQueryRetrieval.documents[0].pageContent, "Nested Kendra query document.");
assert.equal(amazonKendraQueryRetrieval.documents[0].metadata.workflow, "smoke");
assert.equal(awsRetrieverToolCalls[2].name, "aws_kendra_query");
assert.equal(awsRetrieverToolCalls[2].args.queryResultTypeFilter, "DOCUMENT");

const vectorstoreHttpCalls = [];
const vectorstoreRuntime = {
  async http(url, options) {
    vectorstoreHttpCalls.push({ url, options });
    return { status: 200, headers: {}, body: { ok: true } };
  },
  async memory() {
    return null;
  },
  async log() {},
  async tool() {
    throw new Error("unexpected vectorstore nested tool call");
  },
};

await turbopufferWriteTool.run({
  apiKey: { value: "tpuf-key" },
  baseUrl: "https://aws-us-east-1.turbopuffer.com",
  namespace: "docs",
  upsertRows: [{ id: "doc-1", vector: [0.1, 0.2, 0.3], text: "hello" }],
  distanceMetric: "cosine_distance",
  returnAffectedIds: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[0].url, "https://aws-us-east-1.turbopuffer.com/v2/namespaces/docs");
assert.equal(vectorstoreHttpCalls[0].options.method, "POST");
assert.equal(vectorstoreHttpCalls[0].options.headers.Authorization, "Bearer tpuf-key");
assert.equal(vectorstoreHttpCalls[0].options.body.upsert_rows[0].id, "doc-1");
assert.equal(vectorstoreHttpCalls[0].options.body.distance_metric, "cosine_distance");
assert.equal(vectorstoreHttpCalls[0].options.body.return_affected_ids, true);

await turbopufferQueryTool.run({
  apiKey: { value: "tpuf-key" },
  baseUrl: "https://aws-us-east-1.turbopuffer.com",
  namespace: "docs",
  vector: [0.1, 0.2, 0.3],
  vectorField: "embedding",
  filters: ["category", "Eq", "guide"],
  limit: 3,
  includeAttributes: ["text", "category"],
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[1].url, "https://aws-us-east-1.turbopuffer.com/v2/namespaces/docs/query");
assert.equal(vectorstoreHttpCalls[1].options.method, "POST");
assert.equal(vectorstoreHttpCalls[1].options.headers.Authorization, "Bearer tpuf-key");
assert.deepEqual(vectorstoreHttpCalls[1].options.body.rank_by, ["embedding", "ANN", [0.1, 0.2, 0.3]]);
assert.deepEqual(vectorstoreHttpCalls[1].options.body.filters, ["category", "Eq", "guide"]);
assert.equal(vectorstoreHttpCalls[1].options.body.limit, 3);
assert.equal(vectorstoreHttpCalls[1].options.body.include_attributes[0], "text");

await typesenseDocumentsImportTool.run({
  apiKey: { value: "typesense-key" },
  baseUrl: "https://search.example.com",
  collection: "docs",
  documents: [{ id: "doc-1", embedding: [0.1, 0.2, 0.3], text: "hello" }],
  action: "upsert",
  returnId: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[2].url, "https://search.example.com/collections/docs/documents/import?action=upsert&return_id=true");
assert.equal(vectorstoreHttpCalls[2].options.method, "POST");
assert.equal(vectorstoreHttpCalls[2].options.headers["X-TYPESENSE-API-KEY"], "typesense-key");
assert.equal(vectorstoreHttpCalls[2].options.headers["content-type"], "text/plain");
assert.match(vectorstoreHttpCalls[2].options.body, /"id":"doc-1"/);

await typesenseVectorSearchTool.run({
  apiKey: { value: "typesense-key" },
  baseUrl: "https://search.example.com",
  collection: "docs",
  q: "*",
  queryBy: "text",
  vectorField: "embedding",
  vector: [0.1, 0.2, 0.3],
  k: 5,
  filterBy: "category:=guide",
  perPage: 5,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[3].url, "https://search.example.com/multi_search");
assert.equal(vectorstoreHttpCalls[3].options.method, "POST");
assert.equal(vectorstoreHttpCalls[3].options.headers["X-TYPESENSE-API-KEY"], "typesense-key");
assert.equal(vectorstoreHttpCalls[3].options.body.searches[0].collection, "docs");
assert.equal(vectorstoreHttpCalls[3].options.body.searches[0].query_by, "text");
assert.equal(vectorstoreHttpCalls[3].options.body.searches[0].vector_query, "embedding:([0.1,0.2,0.3], k: 5)");
assert.equal(vectorstoreHttpCalls[3].options.body.searches[0].filter_by, "category:=guide");

await clickHouseInsertTool.run({
  username: { value: "default" },
  password: { value: "clickhouse-key" },
  baseUrl: "https://clickhouse.example.com",
  database: "default",
  table: "vector_table",
  rows: [{ id: "doc-1", embedding: [0.1, 0.2, 0.3], text: "hello", metadata: { source: "test" } }],
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[4].url, "https://clickhouse.example.com?database=default");
assert.equal(vectorstoreHttpCalls[4].options.method, "POST");
assert.equal(vectorstoreHttpCalls[4].options.headers["X-ClickHouse-User"], "default");
assert.equal(vectorstoreHttpCalls[4].options.headers["X-ClickHouse-Key"], "clickhouse-key");
assert.match(vectorstoreHttpCalls[4].options.body, /INSERT INTO `vector_table` FORMAT JSONEachRow/);
assert.match(vectorstoreHttpCalls[4].options.body, /"id":"doc-1"/);

await clickHouseVectorSearchTool.run({
  authorization: { value: "Bearer clickhouse-token" },
  baseUrl: "https://clickhouse.example.com",
  database: "default",
  table: "vector_table",
  vectorColumn: "embedding",
  queryVector: [0.1, 0.2, 0.3],
  selectColumns: ["id", "text", "metadata"],
  where: "metadata.source = 'test'",
  limit: 3,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[5].url, "https://clickhouse.example.com?database=default");
assert.equal(vectorstoreHttpCalls[5].options.method, "POST");
assert.equal(vectorstoreHttpCalls[5].options.headers.Authorization, "Bearer clickhouse-token");
assert.match(vectorstoreHttpCalls[5].options.body, /SELECT `id`, `text`, `metadata`, cosineDistance\(`embedding`, \[0.1,0.2,0.3\]\) AS `distance`/);
assert.match(vectorstoreHttpCalls[5].options.body, /FROM `vector_table` WHERE metadata.source = 'test' ORDER BY `distance` ASC LIMIT 3 FORMAT JSON/);

await clickHouseDeleteTool.run({
  username: { value: "default" },
  password: { value: "clickhouse-key" },
  baseUrl: "https://clickhouse.example.com",
  database: "default",
  table: "vector_table",
  idColumn: "id",
  ids: ["doc-1", "doc-2"],
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[6].url, "https://clickhouse.example.com?database=default");
assert.equal(vectorstoreHttpCalls[6].options.method, "POST");
assert.match(vectorstoreHttpCalls[6].options.body, /ALTER TABLE `vector_table` DELETE WHERE `id` IN \('doc-1', 'doc-2'\)/);

await azureCosmosDbNoSqlDocumentUpsertTool.run({
  authorization: { value: "type%3Dmaster%26ver%3D1.0%26sig%3Dexample" },
  xMsDate: "Wed, 20 May 2026 12:00:00 GMT",
  accountEndpoint: "https://cosmos.documents.azure.com",
  databaseId: "rag",
  containerId: "documents",
  partitionKey: ["tenant-1"],
  document: { id: "doc-1", tenantId: "tenant-1", text: "hello", embedding: [0.1, 0.2, 0.3] },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[7].url, "https://cosmos.documents.azure.com/dbs/rag/colls/documents/docs");
assert.equal(vectorstoreHttpCalls[7].options.method, "POST");
assert.equal(vectorstoreHttpCalls[7].options.headers.Authorization, "type%3Dmaster%26ver%3D1.0%26sig%3Dexample");
assert.equal(vectorstoreHttpCalls[7].options.headers["x-ms-date"], "Wed, 20 May 2026 12:00:00 GMT");
assert.equal(vectorstoreHttpCalls[7].options.headers["x-ms-version"], "2018-12-31");
assert.equal(vectorstoreHttpCalls[7].options.headers["x-ms-documentdb-is-upsert"], "True");
assert.equal(vectorstoreHttpCalls[7].options.headers["x-ms-documentdb-partitionkey"], "[\"tenant-1\"]");
assert.equal(vectorstoreHttpCalls[7].options.body.id, "doc-1");

await azureCosmosDbNoSqlQueryTool.run({
  authorization: { value: "type%3Dmaster%26ver%3D1.0%26sig%3Dexample" },
  xMsDate: "Wed, 20 May 2026 12:00:00 GMT",
  accountEndpoint: "https://cosmos.documents.azure.com",
  databaseId: "rag",
  containerId: "documents",
  query: "SELECT TOP @k c.id, VectorDistance(c.embedding, @vector) AS score FROM c ORDER BY VectorDistance(c.embedding, @vector)",
  parameters: [
    { name: "@k", value: 3 },
    { name: "@vector", value: [0.1, 0.2, 0.3] },
  ],
  enableCrossPartition: true,
  maxItemCount: 3,
  populateQueryMetrics: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[8].url, "https://cosmos.documents.azure.com/dbs/rag/colls/documents/docs");
assert.equal(vectorstoreHttpCalls[8].options.method, "POST");
assert.equal(vectorstoreHttpCalls[8].options.headers["content-type"], "application/query+json");
assert.equal(vectorstoreHttpCalls[8].options.headers["x-ms-documentdb-isquery"], "True");
assert.equal(vectorstoreHttpCalls[8].options.headers["x-ms-documentdb-query-enablecrosspartition"], "True");
assert.equal(vectorstoreHttpCalls[8].options.headers["x-ms-max-item-count"], "3");
assert.equal(vectorstoreHttpCalls[8].options.headers["x-ms-documentdb-populatequerymetrics"], "true");
assert.match(vectorstoreHttpCalls[8].options.body.query, /VectorDistance/);
assert.equal(vectorstoreHttpCalls[8].options.body.parameters[1].name, "@vector");

await azureCosmosDbNoSqlDocumentDeleteTool.run({
  authorization: { value: "type%3Dmaster%26ver%3D1.0%26sig%3Dexample" },
  xMsDate: "Wed, 20 May 2026 12:00:00 GMT",
  accountEndpoint: "https://cosmos.documents.azure.com",
  databaseId: "rag",
  containerId: "documents",
  documentId: "doc-1",
  partitionKey: ["tenant-1"],
  ifMatch: "*",
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[9].url, "https://cosmos.documents.azure.com/dbs/rag/colls/documents/docs/doc-1");
assert.equal(vectorstoreHttpCalls[9].options.method, "DELETE");
assert.equal(vectorstoreHttpCalls[9].options.headers["If-Match"], "*");
assert.equal(vectorstoreHttpCalls[9].options.headers["x-ms-documentdb-partitionkey"], "[\"tenant-1\"]");

await supabaseVectorUpsertTool.run({
  serviceRoleKey: { value: "supabase-key" },
  projectUrl: "https://project.supabase.co",
  tableName: "documents",
  rows: [{ id: "doc-1", content: "hello", embedding: [0.1, 0.2, 0.3], metadata: { source: "test" } }],
  onConflict: "id",
  returnRepresentation: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[10].url, "https://project.supabase.co/rest/v1/documents?on_conflict=id");
assert.equal(vectorstoreHttpCalls[10].options.method, "POST");
assert.equal(vectorstoreHttpCalls[10].options.headers.apikey, "supabase-key");
assert.equal(vectorstoreHttpCalls[10].options.headers.Authorization, "Bearer supabase-key");
assert.equal(vectorstoreHttpCalls[10].options.headers.Prefer, "resolution=merge-duplicates,return=representation");
assert.equal(vectorstoreHttpCalls[10].options.body[0].id, "doc-1");

await supabaseVectorMatchTool.run({
  serviceRoleKey: { value: "supabase-key" },
  projectUrl: "https://project.supabase.co",
  queryName: "match_documents",
  queryEmbedding: [0.1, 0.2, 0.3],
  matchCount: 4,
  filter: { source: "test" },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[11].url, "https://project.supabase.co/rest/v1/rpc/match_documents");
assert.equal(vectorstoreHttpCalls[11].options.method, "POST");
assert.equal(vectorstoreHttpCalls[11].options.headers.apikey, "supabase-key");
assert.deepEqual(vectorstoreHttpCalls[11].options.body.query_embedding, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[11].options.body.match_count, 4);
assert.equal(vectorstoreHttpCalls[11].options.body.filter.source, "test");

await astraDbInsertManyTool.run({
  token: { value: "astra-token" },
  apiEndpoint: "https://db-id-us-east1.apps.astra.datastax.com",
  keyspace: "default_keyspace",
  collection: "docs",
  documents: [{ _id: "doc-1", text: "hello", $vector: [0.1, 0.2, 0.3] }],
  ordered: false,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[12].url, "https://db-id-us-east1.apps.astra.datastax.com/api/json/v1/default_keyspace/docs");
assert.equal(vectorstoreHttpCalls[12].options.method, "POST");
assert.equal(vectorstoreHttpCalls[12].options.headers.Token, "astra-token");
assert.equal(vectorstoreHttpCalls[12].options.body.insertMany.documents[0]._id, "doc-1");
assert.equal(vectorstoreHttpCalls[12].options.body.insertMany.options.ordered, false);

await astraDbFindTool.run({
  token: { value: "astra-token" },
  apiEndpoint: "https://db-id-us-east1.apps.astra.datastax.com",
  keyspace: "default_keyspace",
  collection: "docs",
  vector: [0.1, 0.2, 0.3],
  filter: { category: "guide" },
  projection: { text: 1, $similarity: 1 },
  limit: 5,
  includeSimilarity: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[13].url, "https://db-id-us-east1.apps.astra.datastax.com/api/json/v1/default_keyspace/docs");
assert.equal(vectorstoreHttpCalls[13].options.method, "POST");
assert.equal(vectorstoreHttpCalls[13].options.headers.Token, "astra-token");
assert.deepEqual(vectorstoreHttpCalls[13].options.body.find.sort.$vector, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[13].options.body.find.filter.category, "guide");
assert.equal(vectorstoreHttpCalls[13].options.body.find.options.includeSimilarity, true);

await vectaraDocumentIndexTool.run({
  apiKey: { value: "vectara-key" },
  corpusKey: "support_docs",
  document: {
    id: "doc-1",
    type: "structured",
    metadata: { source: "test" },
    sections: [{ id: "s1", text: "hello" }],
  },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[14].url, "https://api.vectara.io/v2/corpora/support_docs/documents");
assert.equal(vectorstoreHttpCalls[14].options.method, "POST");
assert.equal(vectorstoreHttpCalls[14].options.headers["x-api-key"], "vectara-key");
assert.equal(vectorstoreHttpCalls[14].options.body.id, "doc-1");

await vectaraCorpusQueryTool.run({
  apiKey: { value: "vectara-key" },
  corpusKey: "support_docs",
  query: "installation guide",
  metadataFilter: "doc.source = 'test'",
  lexicalInterpolation: 0.025,
  limit: 4,
  generation: null,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[15].url, "https://api.vectara.io/v2/corpora/support_docs/query");
assert.equal(vectorstoreHttpCalls[15].options.method, "POST");
assert.equal(vectorstoreHttpCalls[15].options.headers["x-api-key"], "vectara-key");
assert.equal(vectorstoreHttpCalls[15].options.body.query, "installation guide");
assert.equal(vectorstoreHttpCalls[15].options.body.search.corpora[0].corpus_key, "support_docs");
assert.equal(vectorstoreHttpCalls[15].options.body.search.corpora[0].metadata_filter, "doc.source = 'test'");
assert.equal(vectorstoreHttpCalls[15].options.body.search.limit, 4);
assert.equal(vectorstoreHttpCalls[15].options.body.generation, null);
assert.equal(vectorstoreHttpCalls[13].options.body.find.options.limit, 5);

await couchbaseSearchQueryTool.run({
  username: { value: "couchbase-user" },
  password: { value: "couchbase-password" },
  baseUrl: "https://couchbase.example.com:18094",
  bucket: "travel-sample",
  scope: "inventory",
  indexName: "hotel-vector-index",
  fields: ["name", "description"],
  query: { match: "beach", field: "description" },
  vectorField: "embedding",
  vector: [0.1, 0.2, 0.3],
  k: 5,
  size: 5,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[16].url, "https://couchbase.example.com:18094/api/bucket/travel-sample/scope/inventory/index/hotel-vector-index/query");
assert.equal(vectorstoreHttpCalls[16].options.method, "POST");
assert.equal(vectorstoreHttpCalls[16].options.headers.Authorization, "Basic Y291Y2hiYXNlLXVzZXI6Y291Y2hiYXNlLXBhc3N3b3Jk");
assert.equal(vectorstoreHttpCalls[16].options.body.fields[0], "name");
assert.equal(vectorstoreHttpCalls[16].options.body.query.match, "beach");
assert.equal(vectorstoreHttpCalls[16].options.body.knn[0].field, "embedding");
assert.deepEqual(vectorstoreHttpCalls[16].options.body.knn[0].vector, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[16].options.body.knn[0].k, 5);

await couchbaseQueryExecuteTool.run({
  username: { value: "couchbase-user" },
  password: { value: "couchbase-password" },
  baseUrl: "https://couchbase.example.com:18093",
  statement: "SELECT meta().id, text FROM `travel-sample`.`inventory`.`hotel` WHERE category = $category LIMIT $limit",
  namedParameters: {
    category: "hotel",
    limit: 3,
  },
  queryOptions: {
    readonly: true,
    scan_consistency: "request_plus",
  },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[17].url, "https://couchbase.example.com:18093/query/service");
assert.equal(vectorstoreHttpCalls[17].options.method, "POST");
assert.equal(vectorstoreHttpCalls[17].options.headers.Authorization, "Basic Y291Y2hiYXNlLXVzZXI6Y291Y2hiYXNlLXBhc3N3b3Jk");
assert.match(vectorstoreHttpCalls[17].options.body.statement, /SELECT meta\(\)\.id/);
assert.equal(vectorstoreHttpCalls[17].options.body.$category, "hotel");
assert.equal(vectorstoreHttpCalls[17].options.body.$limit, 3);
assert.equal(vectorstoreHttpCalls[17].options.body.readonly, true);
assert.equal(vectorstoreHttpCalls[17].options.body.scan_consistency, "request_plus");

await meilisearchDocumentsAddTool.run({
  apiKey: { value: "meili-key" },
  baseUrl: "https://search.example.com",
  indexUid: "docs",
  primaryKey: "id",
  documents: [{
    id: "doc-1",
    text: "hello",
    _vectors: { default: [0.1, 0.2, 0.3] },
  }],
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[18].url, "https://search.example.com/indexes/docs/documents?primaryKey=id");
assert.equal(vectorstoreHttpCalls[18].options.method, "POST");
assert.equal(vectorstoreHttpCalls[18].options.headers.Authorization, "Bearer meili-key");
assert.equal(vectorstoreHttpCalls[18].options.body[0].id, "doc-1");

await meilisearchSearchTool.run({
  apiKey: { value: "meili-key" },
  baseUrl: "https://search.example.com",
  indexUid: "docs",
  q: "hello",
  vector: [0.1, 0.2, 0.3],
  hybrid: { semanticRatio: 0.75, embedder: "default" },
  filter: "category = guide",
  limit: 3,
  showRankingScore: true,
  retrieveVectors: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[19].url, "https://search.example.com/indexes/docs/search");
assert.equal(vectorstoreHttpCalls[19].options.method, "POST");
assert.equal(vectorstoreHttpCalls[19].options.headers.Authorization, "Bearer meili-key");
assert.equal(vectorstoreHttpCalls[19].options.body.q, "hello");
assert.deepEqual(vectorstoreHttpCalls[19].options.body.vector, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[19].options.body.hybrid.semanticRatio, 0.75);
assert.equal(vectorstoreHttpCalls[19].options.body.filter, "category = guide");
assert.equal(vectorstoreHttpCalls[19].options.body.limit, 3);
assert.equal(vectorstoreHttpCalls[19].options.body.showRankingScore, true);
assert.equal(vectorstoreHttpCalls[19].options.body.retrieveVectors, true);

await vespaDocumentPutTool.run({
  token: { value: "vespa-token" },
  baseUrl: "https://tenant.app.us-north-1.vespa-app.cloud",
  namespace: "docs",
  documentType: "doc",
  documentId: "doc-1",
  fields: { title: "Install guide", embedding: [0.1, 0.2, 0.3] },
  create: true,
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[20].url, "https://tenant.app.us-north-1.vespa-app.cloud/document/v1/docs/doc/docid/doc-1?create=true");
assert.equal(vectorstoreHttpCalls[20].options.method, "PUT");
assert.equal(vectorstoreHttpCalls[20].options.headers.Authorization, "Bearer vespa-token");
assert.equal(vectorstoreHttpCalls[20].options.body.fields.title, "Install guide");

await vespaQueryTool.run({
  token: { value: "vespa-token" },
  baseUrl: "https://tenant.app.us-north-1.vespa-app.cloud",
  yql: "select * from sources * where ({targetHits:10}nearestNeighbor(embedding, query_embedding));",
  hits: 3,
  ranking: { profile: "semantic" },
  body: {
    yql: "select * from docs where userQuery();",
    query: "installation guide",
    hits: 3,
  },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[21].url, "https://tenant.app.us-north-1.vespa-app.cloud/search/");
assert.equal(vectorstoreHttpCalls[21].options.method, "POST");
assert.equal(vectorstoreHttpCalls[21].options.headers.Authorization, "Bearer vespa-token");
assert.equal(vectorstoreHttpCalls[21].options.body.yql, "select * from docs where userQuery();");
assert.equal(vectorstoreHttpCalls[21].options.body.query, "installation guide");

await pineconeRerankTool.run({
  apiKey: { value: "pinecone-key" },
  model: "bge-reranker-v2-m3",
  query: "The tech company Apple is known for innovative products.",
  documents: [
    { id: "vec1", text: "Apple is a popular fruit." },
    { id: "vec2", text: "Apple Inc. designs the iPhone." },
  ],
  topN: 2,
  returnDocuments: true,
  rankFields: ["text"],
  parameters: { truncate: "END" },
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[22].url, "https://api.pinecone.io/rerank");
assert.equal(vectorstoreHttpCalls[22].options.method, "POST");
assert.equal(vectorstoreHttpCalls[22].options.headers["Api-Key"], "pinecone-key");
assert.equal(vectorstoreHttpCalls[22].options.body.model, "bge-reranker-v2-m3");
assert.equal(vectorstoreHttpCalls[22].options.body.query, "The tech company Apple is known for innovative products.");
assert.equal(vectorstoreHttpCalls[22].options.body.documents[0].id, "vec1");
assert.equal(vectorstoreHttpCalls[22].options.body.top_n, 2);
assert.equal(vectorstoreHttpCalls[22].options.body.return_documents, true);
assert.equal(vectorstoreHttpCalls[22].options.body.rank_fields[0], "text");
assert.equal(vectorstoreHttpCalls[22].options.body.parameters.truncate, "END");

await pineconeEmbeddingsTool.run({
  apiKey: { value: "pinecone-key" },
  model: "llama-text-embed-v2",
  inputs: [
    "Apple is a popular fruit known for its sweetness.",
    { text: "The tech company Apple is known for the iPhone." },
  ],
  parameters: { input_type: "passage", truncate: "END" },
  apiVersion: "2025-10",
}, vectorstoreRuntime);
assert.equal(vectorstoreHttpCalls[23].url, "https://api.pinecone.io/embed");
assert.equal(vectorstoreHttpCalls[23].options.method, "POST");
assert.equal(vectorstoreHttpCalls[23].options.headers["Api-Key"], "pinecone-key");
assert.equal(vectorstoreHttpCalls[23].options.headers["X-Pinecone-Api-Version"], "2025-10");
assert.equal(vectorstoreHttpCalls[23].options.body.model, "llama-text-embed-v2");
assert.equal(vectorstoreHttpCalls[23].options.body.inputs[0].text, "Apple is a popular fruit known for its sweetness.");
assert.equal(vectorstoreHttpCalls[23].options.body.inputs[1].text, "The tech company Apple is known for the iPhone.");
assert.equal(vectorstoreHttpCalls[23].options.body.parameters.input_type, "passage");
assert.equal(vectorstoreHttpCalls[23].options.body.parameters.truncate, "END");

await rocksetDocumentsAddTool.run({
  apiKey: { value: "rockset-key" },
  baseUrl: "https://api.rs2.usw2.rockset.com",
  workspace: "commons",
  collection: "docs",
  documents: [{ _id: "doc-1", text: "hello", embedding: [0.1, 0.2, 0.3] }],
}, vectorstoreRuntime);
const rocksetAddIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[rocksetAddIndex].url, "https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/collections/docs/docs");
assert.equal(vectorstoreHttpCalls[rocksetAddIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[rocksetAddIndex].options.headers.Authorization, "ApiKey rockset-key");
assert.equal(vectorstoreHttpCalls[rocksetAddIndex].options.body.data[0]._id, "doc-1");

await rocksetQueryTool.run({
  apiKey: { value: "rockset-key" },
  query: "SELECT * FROM commons.docs ORDER BY COSINE_SIM(embedding, :query_embedding) DESC LIMIT 3",
  parameters: [{ name: "query_embedding", type: "array", value: [0.1, 0.2, 0.3] }],
  defaultRowLimit: 3,
  generateWarnings: true,
}, vectorstoreRuntime);
const rocksetQueryIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].url, "https://api.rs2.usw2.rockset.com/v1/orgs/self/queries");
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].options.headers.Authorization, "ApiKey rockset-key");
assert.match(vectorstoreHttpCalls[rocksetQueryIndex].options.body.sql.query, /COSINE_SIM/);
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].options.body.sql.parameters[0].name, "query_embedding");
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].options.body.sql.default_row_limit, 3);
assert.equal(vectorstoreHttpCalls[rocksetQueryIndex].options.body.sql.generate_warnings, true);

await rocksetDocumentsDeleteTool.run({
  apiKey: { value: "rockset-key" },
  workspace: "commons",
  collection: "docs",
  ids: ["doc-1"],
}, vectorstoreRuntime);
const rocksetDeleteIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[rocksetDeleteIndex].url, "https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/collections/docs/docs");
assert.equal(vectorstoreHttpCalls[rocksetDeleteIndex].options.method, "DELETE");
assert.equal(vectorstoreHttpCalls[rocksetDeleteIndex].options.body.data[0]._id, "doc-1");

await xataVectorsAddTool.run({
  apiKey: { value: "xata-key" },
  databaseUrl: "https://workspace.us-east-1.xata.sh/db/chidori:main",
  table: "vectors",
  documents: [{
    pageContent: "Xata works with Chidori vector rows.",
    metadata: { author: "Xata" },
  }],
  vectors: [[0.1, 0.2, 0.3]],
  ids: ["rec_123"],
  columns: ["id", "content"],
}, vectorstoreRuntime);
const xataAddIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[xataAddIndex].url, "https://workspace.us-east-1.xata.sh/db/chidori:main/transaction");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.headers.Authorization, "Bearer xata-key");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.headers["X-Xata-Agent"], "chidori-integrations");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.body.operations[0].insert.table, "vectors");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.body.operations[0].insert.record.id, "rec_123");
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.body.operations[0].insert.record.content, "Xata works with Chidori vector rows.");
assert.deepEqual(vectorstoreHttpCalls[xataAddIndex].options.body.operations[0].insert.record.embedding, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[xataAddIndex].options.body.operations[0].insert.createOnly, false);

await xataVectorSearchTool.run({
  apiKey: { value: "xata-key" },
  databaseUrl: "https://workspace.us-east-1.xata.sh/db/chidori:main",
  table: "vectors",
  column: "embedding",
  queryVector: [0.1, 0.2, 0.3],
  similarityFunction: "cosineSimilarity",
  size: 3,
  filter: { author: "Xata" },
}, vectorstoreRuntime);
const xataSearchIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[xataSearchIndex].url, "https://workspace.us-east-1.xata.sh/db/chidori:main/tables/vectors/vectorSearch");
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.headers.Authorization, "Bearer xata-key");
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.body.column, "embedding");
assert.deepEqual(vectorstoreHttpCalls[xataSearchIndex].options.body.queryVector, [0.1, 0.2, 0.3]);
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.body.similarityFunction, "cosineSimilarity");
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.body.size, 3);
assert.equal(vectorstoreHttpCalls[xataSearchIndex].options.body.filter.author, "Xata");

await azionEdgeSqlVectorsAddTool.run({
  token: { value: "azion-token" },
  databaseId: "db_123",
  table: "documents",
  documents: [{
    id: "doc-1",
    pageContent: "Azion EdgeSQL vector row.",
    embedding: [0.1, 0.2, 0.3],
    metadata: { topic: "biology", language: "en" },
  }],
}, vectorstoreRuntime);
const azionVectorAddIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[azionVectorAddIndex].url, "https://api.azionapi.net/v4/edge_sql/databases/db_123/query");
assert.equal(vectorstoreHttpCalls[azionVectorAddIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[azionVectorAddIndex].options.headers.Authorization, "Token azion-token");
assert.match(vectorstoreHttpCalls[azionVectorAddIndex].options.body.statements[0], /INSERT OR REPLACE INTO "documents"/);
assert.match(vectorstoreHttpCalls[azionVectorAddIndex].options.body.statements[0], /"page_content"/);
assert.match(vectorstoreHttpCalls[azionVectorAddIndex].options.body.statements[0], /\[0.1,0.2,0.3\]/);

await azionEdgeSqlVectorSearchTool.run({
  token: { value: "azion-token" },
  databaseId: "db_123",
  table: "documents",
  vectorIndex: "documents_idx",
  queryVector: [0.1, 0.2, 0.3],
  metadataColumns: ["topic", "language"],
  topK: 3,
  where: "\"source_rows\".\"language\" = 'en'",
}, vectorstoreRuntime);
const azionVectorSearchIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[azionVectorSearchIndex].url, "https://api.azionapi.net/v4/edge_sql/databases/db_123/query");
assert.equal(vectorstoreHttpCalls[azionVectorSearchIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[azionVectorSearchIndex].options.headers.Authorization, "Token azion-token");
assert.match(vectorstoreHttpCalls[azionVectorSearchIndex].options.body.statements[0], /vector_top_k/);
assert.match(vectorstoreHttpCalls[azionVectorSearchIndex].options.body.statements[0], /documents_idx/);
assert.match(vectorstoreHttpCalls[azionVectorSearchIndex].options.body.statements[0], /"topic"/);
assert.match(vectorstoreHttpCalls[azionVectorSearchIndex].options.body.statements[0], /WHERE "source_rows"."language" = 'en'/);

await azionEdgeSqlDeleteTool.run({
  token: { value: "azion-token" },
  databaseId: "db_123",
  table: "documents",
  ids: ["doc-1", "doc-2"],
}, vectorstoreRuntime);
const azionVectorDeleteIndex = vectorstoreHttpCalls.length - 1;
assert.equal(vectorstoreHttpCalls[azionVectorDeleteIndex].url, "https://api.azionapi.net/v4/edge_sql/databases/db_123/query");
assert.equal(vectorstoreHttpCalls[azionVectorDeleteIndex].options.method, "POST");
assert.equal(vectorstoreHttpCalls[azionVectorDeleteIndex].options.headers.Authorization, "Token azion-token");
assert.equal(vectorstoreHttpCalls[azionVectorDeleteIndex].options.body.statements[0], "DELETE FROM \"documents\" WHERE \"id\" IN ('doc-1', 'doc-2')");

const vendorOut = mkdtempSync(join(tmpdir(), "chidori-integrations-tools-"));
execFileSync("node", [
  "scripts/vendor-tools.mjs",
  "--package",
  "@chidori/integrations-web",
  "--tool",
  "tavily_search",
  "--out",
  vendorOut,
], { stdio: "pipe" });
const vendoredTool = readFileSync(join(vendorOut, "tavily_search.ts"), "utf8");
assert.match(vendoredTool, /export const tool = tavilySearchTool\.tool/);
assert.match(vendoredTool, /export async function run\(args, chidori\)/);
assert.doesNotMatch(vendoredTool, /^import /m);

console.log("Smoke tests passed.");
