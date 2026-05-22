import {
  compactObject,
  defineTool,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface AlphaVantageAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface AlphaVantageExchangeRateArgs extends AlphaVantageAuthArgs {
  fromCurrency: string;
  toCurrency: string;
}

export interface AlphaVantageTimeSeriesDailyArgs extends AlphaVantageAuthArgs {
  symbol: string;
  outputSize?: "compact" | "full";
  adjusted?: boolean;
}

export interface AlphaVantageTimeSeriesWeeklyArgs extends AlphaVantageAuthArgs {
  symbol: string;
  adjusted?: boolean;
}

export interface AlphaVantageQuoteArgs extends AlphaVantageAuthArgs {
  symbol: string;
}

export interface AlphaVantageSymbolSearchArgs extends AlphaVantageAuthArgs {
  keywords: string;
}

export interface AlphaVantageNewsSentimentArgs extends AlphaVantageAuthArgs {
  tickers?: string[];
  topics?: string[];
  timeFrom?: string;
  timeTo?: string;
  sort?: "LATEST" | "EARLIEST" | "RELEVANCE";
  limit?: number;
}

export interface AlphaVantageTopGainersLosersArgs extends AlphaVantageAuthArgs {
  entitlement?: "realtime" | "delayed";
}

export interface PolygonAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface PolygonAggregatesArgs extends PolygonAuthArgs {
  ticker: string;
  multiplier: number;
  timespan: "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year";
  from: string;
  to: string;
  adjusted?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
}

export interface PolygonLastQuoteArgs extends PolygonAuthArgs {
  ticker: string;
}

export interface PolygonTickerNewsArgs extends PolygonAuthArgs {
  ticker?: string;
  publishedUtcGte?: string;
  publishedUtcLte?: string;
  order?: "asc" | "desc";
  sort?: "published_utc" | "ticker";
  limit?: number;
  cursor?: string;
}

export interface PolygonFinancialsArgs extends PolygonAuthArgs {
  ticker?: string;
  cik?: string;
  companyName?: string;
  filingDateGte?: string;
  filingDateLte?: string;
  periodOfReportDateGte?: string;
  periodOfReportDateLte?: string;
  timeframe?: "annual" | "quarterly" | "ttm";
  includeSources?: boolean;
  order?: "asc" | "desc";
  sort?: string;
  limit?: number;
  cursor?: string;
}

export interface SerpApiFinanceArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  hl?: string;
  async?: boolean;
  timeoutMs?: number;
}

export interface GoogleFinanceSearchArgs extends SerpApiFinanceArgs {
  query: string;
  window?: "1D" | "5D" | "1M" | "6M" | "YTD" | "1Y" | "5Y" | "MAX" | string;
}

export interface GoogleFinanceMarketsArgs extends SerpApiFinanceArgs {
  trend?: "indexes" | "most-active" | "gainers" | "losers" | "climate-leaders" | string;
  indexMarket?: "americas" | "europe-middle-east-africa" | "asia-pacific" | string;
}

function alphaVantageUrl(baseUrl?: string): string {
  return baseUrl ?? "https://www.alphavantage.co/query";
}

function polygonBaseUrl(baseUrl?: string): string {
  return (baseUrl ?? "https://api.polygon.io").replace(/\/$/, "");
}

async function alphaVantageRequest(
  chidori: Parameters<typeof requestJson<JsonObject>>[0],
  args: AlphaVantageAuthArgs,
  query: Record<string, string | number | boolean | undefined>,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Alpha Vantage API key");
  return requestJson<JsonObject>(chidori, withQuery(alphaVantageUrl(args.baseUrl), {
    ...query,
    apikey: apiKey,
  }), compactObject({
    method: "GET",
    headers: { accept: "application/json" },
    timeoutMs: args.timeoutMs,
  }) as ChidoriHttpRequestOptions);
}

function commaList(values: string[] | undefined): string | undefined {
  return values && values.length > 0 ? values.join(",") : undefined;
}

async function polygonRequest(
  chidori: Parameters<typeof requestJson<JsonObject>>[0],
  args: PolygonAuthArgs,
  path: string,
  query: Record<string, string | number | boolean | undefined> = {},
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Polygon.io API key");
  return requestJson<JsonObject>(chidori, withQuery(`${polygonBaseUrl(args.baseUrl)}${path}`, {
    ...query,
    apiKey,
  }), compactObject({
    method: "GET",
    headers: { accept: "application/json" },
    timeoutMs: args.timeoutMs,
  }) as ChidoriHttpRequestOptions);
}

async function serpApiFinanceRequest(
  chidori: Parameters<typeof requestJson<JsonObject>>[0],
  args: SerpApiFinanceArgs,
  query: Record<string, string | number | boolean | undefined>,
): Promise<JsonObject> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "SerpApi API key");
  return requestJson<JsonObject>(chidori, withQuery(args.baseUrl ?? "https://serpapi.com/search", {
    ...query,
    api_key: apiKey,
    hl: args.hl,
    async: args.async,
    output: "json",
  }), compactObject({
    method: "GET",
    headers: { accept: "application/json" },
    timeoutMs: args.timeoutMs,
  }) as ChidoriHttpRequestOptions);
}

export const alphaVantageExchangeRateTool = defineTool<AlphaVantageExchangeRateArgs, JsonObject>(
  {
    name: "alpha_vantage_exchange_rate",
    description: "Fetch a realtime currency exchange rate from Alpha Vantage.",
    parameters: {
      type: "object",
      properties: {
        fromCurrency: { type: "string", description: "Source physical or digital currency symbol, for example USD or BTC." },
        toCurrency: { type: "string", description: "Target physical or digital currency symbol, for example JPY or USD." },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
      required: ["fromCurrency", "toCurrency"],
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: "CURRENCY_EXCHANGE_RATE",
    from_currency: args.fromCurrency,
    to_currency: args.toCurrency,
  }),
);

export const alphaVantageTimeSeriesDailyTool = defineTool<AlphaVantageTimeSeriesDailyArgs, JsonObject>(
  {
    name: "alpha_vantage_time_series_daily",
    description: "Fetch daily OHLCV equity time series data from Alpha Vantage.",
    parameters: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Equity symbol, for example IBM." },
        outputSize: { type: "string", enum: ["compact", "full"], default: "compact" },
        adjusted: { type: "boolean", description: "Use TIME_SERIES_DAILY_ADJUSTED instead of TIME_SERIES_DAILY." },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
      required: ["symbol"],
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: args.adjusted ? "TIME_SERIES_DAILY_ADJUSTED" : "TIME_SERIES_DAILY",
    symbol: args.symbol,
    outputsize: args.outputSize,
    datatype: "json",
  }),
);

export const alphaVantageTimeSeriesWeeklyTool = defineTool<AlphaVantageTimeSeriesWeeklyArgs, JsonObject>(
  {
    name: "alpha_vantage_time_series_weekly",
    description: "Fetch weekly OHLCV equity time series data from Alpha Vantage.",
    parameters: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Equity symbol, for example IBM." },
        adjusted: { type: "boolean", description: "Use TIME_SERIES_WEEKLY_ADJUSTED instead of TIME_SERIES_WEEKLY." },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
      required: ["symbol"],
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: args.adjusted ? "TIME_SERIES_WEEKLY_ADJUSTED" : "TIME_SERIES_WEEKLY",
    symbol: args.symbol,
    datatype: "json",
  }),
);

export const alphaVantageQuoteTool = defineTool<AlphaVantageQuoteArgs, JsonObject>(
  {
    name: "alpha_vantage_quote",
    description: "Fetch the latest quote for an equity symbol from Alpha Vantage.",
    parameters: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Equity symbol, for example IBM." },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
      required: ["symbol"],
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: "GLOBAL_QUOTE",
    symbol: args.symbol,
  }),
);

export const alphaVantageSymbolSearchTool = defineTool<AlphaVantageSymbolSearchArgs, JsonObject>(
  {
    name: "alpha_vantage_symbol_search",
    description: "Search Alpha Vantage supported equities, ETFs, funds, and other symbols.",
    parameters: {
      type: "object",
      properties: {
        keywords: { type: "string", description: "Ticker, company, or fund search text." },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
      required: ["keywords"],
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: "SYMBOL_SEARCH",
    keywords: args.keywords,
  }),
);

export const alphaVantageNewsSentimentTool = defineTool<AlphaVantageNewsSentimentArgs, JsonObject>(
  {
    name: "alpha_vantage_news_sentiment",
    description: "Fetch market news and sentiment from Alpha Vantage for tickers, topics, or time windows.",
    parameters: {
      type: "object",
      properties: {
        tickers: { type: "array", items: { type: "string" } },
        topics: { type: "array", items: { type: "string" } },
        timeFrom: { type: "string", description: "Start time in YYYYMMDDTHHMM format." },
        timeTo: { type: "string", description: "End time in YYYYMMDDTHHMM format." },
        sort: { type: "string", enum: ["LATEST", "EARLIEST", "RELEVANCE"], default: "LATEST" },
        limit: { type: "integer" },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: "NEWS_SENTIMENT",
    tickers: commaList(args.tickers),
    topics: commaList(args.topics),
    time_from: args.timeFrom,
    time_to: args.timeTo,
    sort: args.sort,
    limit: args.limit,
  }),
);

export const alphaVantageTopGainersLosersTool = defineTool<AlphaVantageTopGainersLosersArgs, JsonObject>(
  {
    name: "alpha_vantage_top_gainers_losers",
    description: "Fetch US market top gainers, top losers, and most active tickers from Alpha Vantage.",
    parameters: {
      type: "object",
      properties: {
        entitlement: { type: "string", enum: ["realtime", "delayed"] },
        apiKey: { description: "Alpha Vantage API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://www.alphavantage.co/query" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => alphaVantageRequest(chidori, args, {
    function: "TOP_GAINERS_LOSERS",
    entitlement: args.entitlement,
  }),
);

export const polygonAggregatesTool = defineTool<PolygonAggregatesArgs, JsonObject>(
  {
    name: "polygon_aggregates",
    description: "Fetch Polygon.io aggregate OHLCV bars for a stock ticker over a date or timestamp range.",
    parameters: {
      type: "object",
      properties: {
        ticker: { type: "string", description: "Stock ticker, for example AAPL." },
        multiplier: { type: "integer", description: "Size multiplier for each aggregate bar." },
        timespan: { type: "string", enum: ["second", "minute", "hour", "day", "week", "month", "quarter", "year"] },
        from: { type: "string", description: "Start date YYYY-MM-DD, millisecond timestamp, or nanosecond timestamp." },
        to: { type: "string", description: "End date YYYY-MM-DD, millisecond timestamp, or nanosecond timestamp." },
        adjusted: { type: "boolean", default: true },
        sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
        limit: { type: "integer" },
        apiKey: { description: "Polygon.io API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.polygon.io" },
        timeoutMs: { type: "integer" },
      },
      required: ["ticker", "multiplier", "timespan", "from", "to"],
    },
  },
  async (args, chidori) => polygonRequest(
    chidori,
    args,
    `/v2/aggs/ticker/${encodeURIComponent(args.ticker)}/range/${encodeURIComponent(String(args.multiplier))}/${encodeURIComponent(args.timespan)}/${encodeURIComponent(args.from)}/${encodeURIComponent(args.to)}`,
    {
      adjusted: args.adjusted ?? true,
      sort: args.sort ?? "asc",
      limit: args.limit,
    },
  ),
);

export const polygonLastQuoteTool = defineTool<PolygonLastQuoteArgs, JsonObject>(
  {
    name: "polygon_last_quote",
    description: "Fetch the latest NBBO quote for a stock ticker from Polygon.io.",
    parameters: {
      type: "object",
      properties: {
        ticker: { type: "string", description: "Stock ticker, for example AAPL." },
        apiKey: { description: "Polygon.io API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.polygon.io" },
        timeoutMs: { type: "integer" },
      },
      required: ["ticker"],
    },
  },
  async (args, chidori) => polygonRequest(
    chidori,
    args,
    `/v2/last/nbbo/${encodeURIComponent(args.ticker)}`,
  ),
);

export const polygonTickerNewsTool = defineTool<PolygonTickerNewsArgs, JsonObject>(
  {
    name: "polygon_ticker_news",
    description: "Fetch financial news from Polygon.io, optionally filtered by ticker and publication time.",
    parameters: {
      type: "object",
      properties: {
        ticker: { type: "string", description: "Optional stock ticker, for example AAPL." },
        publishedUtcGte: { type: "string", description: "Lower published_utc bound." },
        publishedUtcLte: { type: "string", description: "Upper published_utc bound." },
        order: { type: "string", enum: ["asc", "desc"], default: "desc" },
        sort: { type: "string", enum: ["published_utc", "ticker"], default: "published_utc" },
        limit: { type: "integer" },
        cursor: { type: "string" },
        apiKey: { description: "Polygon.io API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.polygon.io" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => polygonRequest(chidori, args, "/v2/reference/news", {
    ticker: args.ticker,
    "published_utc.gte": args.publishedUtcGte,
    "published_utc.lte": args.publishedUtcLte,
    order: args.order ?? "desc",
    sort: args.sort ?? "published_utc",
    limit: args.limit,
    cursor: args.cursor,
  }),
);

export const polygonFinancialsTool = defineTool<PolygonFinancialsArgs, JsonObject>(
  {
    name: "polygon_financials",
    description: "Fetch company financials from Polygon.io by ticker, CIK, company name, period, or filing date filters.",
    parameters: {
      type: "object",
      properties: {
        ticker: { type: "string" },
        cik: { type: "string" },
        companyName: { type: "string" },
        filingDateGte: { type: "string" },
        filingDateLte: { type: "string" },
        periodOfReportDateGte: { type: "string" },
        periodOfReportDateLte: { type: "string" },
        timeframe: { type: "string", enum: ["annual", "quarterly", "ttm"] },
        includeSources: { type: "boolean" },
        order: { type: "string", enum: ["asc", "desc"], default: "desc" },
        sort: { type: "string", default: "filing_date" },
        limit: { type: "integer" },
        cursor: { type: "string" },
        apiKey: { description: "Polygon.io API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.polygon.io" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => polygonRequest(chidori, args, "/vX/reference/financials", {
    ticker: args.ticker,
    cik: args.cik,
    company_name: args.companyName,
    "filing_date.gte": args.filingDateGte,
    "filing_date.lte": args.filingDateLte,
    "period_of_report_date.gte": args.periodOfReportDateGte,
    "period_of_report_date.lte": args.periodOfReportDateLte,
    timeframe: args.timeframe,
    include_sources: args.includeSources,
    order: args.order ?? "desc",
    sort: args.sort ?? "filing_date",
    limit: args.limit,
    cursor: args.cursor,
  }),
);

export const googleFinanceSearchTool = defineTool<GoogleFinanceSearchArgs, JsonObject>(
  {
    name: "google_finance_search",
    description: "Fetch Google Finance quote, summary, graph, news, financials, and related market data through SerpApi.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Google Finance query, usually SYMBOL:EXCHANGE such as GOOGL:NASDAQ." },
        window: { type: "string", description: "Graph time window, for example 1D, 5D, 1M, 6M, YTD, 1Y, 5Y, or MAX." },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        hl: { type: "string", description: "Google Finance UI language." },
        async: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => serpApiFinanceRequest(chidori, args, {
    engine: "google_finance",
    q: args.query,
    window: args.window,
  }),
);

export const googleFinanceMarketsTool = defineTool<GoogleFinanceMarketsArgs, JsonObject>(
  {
    name: "google_finance_markets",
    description: "Fetch Google Finance market lists through SerpApi, such as indexes, most-active, gainers, and losers.",
    parameters: {
      type: "object",
      properties: {
        trend: {
          type: "string",
          description: "Market list trend such as indexes, most-active, gainers, losers, or climate-leaders.",
        },
        indexMarket: {
          type: "string",
          description: "Market region for index lists, for example americas, europe-middle-east-africa, or asia-pacific.",
        },
        apiKey: { description: "SerpApi API key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://serpapi.com/search" },
        hl: { type: "string", description: "Google Finance UI language." },
        async: { type: "boolean" },
        timeoutMs: { type: "integer" },
      },
    },
  },
  async (args, chidori) => serpApiFinanceRequest(chidori, args, {
    engine: "google_finance_markets",
    trend: args.trend ?? "indexes",
    index_market: args.indexMarket,
  }),
);

export const financeTools = [
  alphaVantageExchangeRateTool,
  alphaVantageTimeSeriesDailyTool,
  alphaVantageTimeSeriesWeeklyTool,
  alphaVantageQuoteTool,
  alphaVantageSymbolSearchTool,
  alphaVantageNewsSentimentTool,
  alphaVantageTopGainersLosersTool,
  polygonAggregatesTool,
  polygonLastQuoteTool,
  polygonTickerNewsTool,
  polygonFinancialsTool,
  googleFinanceSearchTool,
  googleFinanceMarketsTool,
];

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getFinanceEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "ALPHA_VANTAGE_API_KEY", description: "Alpha Vantage API key." },
    { name: "POLYGON_API_KEY", description: "Polygon.io API key." },
    { name: "SERPAPI_API_KEY", description: "SerpApi API key." },
  ];
}

export const financeIntegrationSpec = {
  environmentVariables: getFinanceEnvironmentVariables,
} satisfies IntegrationSpec;
