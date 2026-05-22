import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface ShopifyAuthArgs {
  token?: SecretInput;
  shop?: string;
  baseUrl?: string;
  apiVersion?: string;
}

export interface ShopifyAdminGraphQLArgs extends ShopifyAuthArgs {
  query: string;
  variables?: JsonObject;
}

export interface ShopifyListProductsArgs extends ShopifyAuthArgs {
  limit?: number;
  sinceId?: string;
  status?: "active" | "archived" | "draft";
  vendor?: string;
  productType?: string;
  collectionId?: string;
  fields?: string[];
}

export interface ShopifyGetProductArgs extends ShopifyAuthArgs {
  productId: string;
  fields?: string[];
}

export interface ShopifyListOrdersArgs extends ShopifyAuthArgs {
  limit?: number;
  sinceId?: string;
  status?: "open" | "closed" | "cancelled" | "any";
  financialStatus?: string;
  fulfillmentStatus?: string;
  createdAtMin?: string;
  createdAtMax?: string;
  updatedAtMin?: string;
  updatedAtMax?: string;
  fields?: string[];
}

export interface ShopifyGetOrderArgs extends ShopifyAuthArgs {
  orderId: string;
  fields?: string[];
}

export interface ShopifySearchCustomersArgs extends ShopifyAuthArgs {
  query: string;
  limit?: number;
  fields?: string[];
}

export interface ShopifyGetCustomerArgs extends ShopifyAuthArgs {
  customerId: string;
  fields?: string[];
}

function shopifyBaseUrl(args: ShopifyAuthArgs): string {
  if (args.baseUrl) {
    return args.baseUrl.replace(/\/+$/, "");
  }
  if (!args.shop) {
    throw new Error("Shopify shop or baseUrl is required");
  }
  const shop = args.shop.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${shop}/admin/api/${args.apiVersion ?? "2026-04"}`;
}

async function shopifyHeaders(args: ShopifyAuthArgs, chidori: Parameters<typeof resolveSecret>[1]) {
  const token = await resolveSecret(args.token, chidori, "Shopify Admin API access token");
  return jsonHeaders({
    "X-Shopify-Access-Token": token,
  });
}

function csv(values: string[] | undefined): string | undefined {
  return values?.join(",");
}

async function shopifyRequest<T extends JsonObject>(
  args: ShopifyAuthArgs,
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
    headers: await shopifyHeaders(args, chidori),
  };
  if (options.body) {
    requestOptions.body = options.body;
  }
  return requestJson<T>(chidori, withQuery(`${shopifyBaseUrl(args)}${path}`, options.query), requestOptions);
}

export const shopifyAdminGraphQLTool = defineTool<ShopifyAdminGraphQLArgs, JsonObject>(
  {
    name: "shopify_admin_graphql",
    description: "Run a Shopify Admin GraphQL API query or mutation.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string", description: "Shop domain, for example example.myshopify.com." },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        query: { type: "string" },
        variables: { type: "object", additionalProperties: true },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, "/graphql.json", {
      method: "POST",
      body: compactObject({
        query: args.query,
        variables: args.variables,
      }) as JsonObject,
    });
  },
);

export const shopifyListProductsTool = defineTool<ShopifyListProductsArgs, JsonObject>(
  {
    name: "shopify_products_list",
    description: "List Shopify products through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        limit: { type: "integer" },
        sinceId: { type: "string" },
        status: { type: "string", enum: ["active", "archived", "draft"] },
        vendor: { type: "string" },
        productType: { type: "string" },
        collectionId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, "/products.json", {
      query: {
        limit: args.limit,
        since_id: args.sinceId,
        status: args.status,
        vendor: args.vendor,
        product_type: args.productType,
        collection_id: args.collectionId,
        fields: csv(args.fields),
      },
    });
  },
);

export const shopifyGetProductTool = defineTool<ShopifyGetProductArgs, JsonObject>(
  {
    name: "shopify_product_get",
    description: "Get a Shopify product through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        productId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
      required: ["productId"],
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, `/products/${encodeURIComponent(args.productId)}.json`, {
      query: { fields: csv(args.fields) },
    });
  },
);

export const shopifyListOrdersTool = defineTool<ShopifyListOrdersArgs, JsonObject>(
  {
    name: "shopify_orders_list",
    description: "List Shopify orders through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        limit: { type: "integer" },
        sinceId: { type: "string" },
        status: { type: "string", enum: ["open", "closed", "cancelled", "any"] },
        financialStatus: { type: "string" },
        fulfillmentStatus: { type: "string" },
        createdAtMin: { type: "string" },
        createdAtMax: { type: "string" },
        updatedAtMin: { type: "string" },
        updatedAtMax: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, "/orders.json", {
      query: {
        limit: args.limit,
        since_id: args.sinceId,
        status: args.status,
        financial_status: args.financialStatus,
        fulfillment_status: args.fulfillmentStatus,
        created_at_min: args.createdAtMin,
        created_at_max: args.createdAtMax,
        updated_at_min: args.updatedAtMin,
        updated_at_max: args.updatedAtMax,
        fields: csv(args.fields),
      },
    });
  },
);

export const shopifyGetOrderTool = defineTool<ShopifyGetOrderArgs, JsonObject>(
  {
    name: "shopify_order_get",
    description: "Get a Shopify order through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        orderId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
      required: ["orderId"],
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, `/orders/${encodeURIComponent(args.orderId)}.json`, {
      query: { fields: csv(args.fields) },
    });
  },
);

export const shopifySearchCustomersTool = defineTool<ShopifySearchCustomersArgs, JsonObject>(
  {
    name: "shopify_customers_search",
    description: "Search Shopify customers through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        query: { type: "string" },
        limit: { type: "integer" },
        fields: { type: "array", items: { type: "string" } },
      },
      required: ["query"],
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, "/customers/search.json", {
      query: {
        query: args.query,
        limit: args.limit,
        fields: csv(args.fields),
      },
    });
  },
);

export const shopifyGetCustomerTool = defineTool<ShopifyGetCustomerArgs, JsonObject>(
  {
    name: "shopify_customer_get",
    description: "Get a Shopify customer through the REST Admin API.",
    parameters: {
      type: "object",
      properties: {
        token: { description: "Shopify Admin API access token or Chidori memory secret reference." },
        shop: { type: "string" },
        baseUrl: { type: "string" },
        apiVersion: { type: "string", default: "2026-04" },
        customerId: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
      },
      required: ["customerId"],
    },
  },
  async (args, chidori) => {
    return shopifyRequest(args, chidori, `/customers/${encodeURIComponent(args.customerId)}.json`, {
      query: { fields: csv(args.fields) },
    });
  },
);

export const shopifyTools = {
  adminGraphQL: shopifyAdminGraphQLTool,
  listProducts: shopifyListProductsTool,
  getProduct: shopifyGetProductTool,
  listOrders: shopifyListOrdersTool,
  getOrder: shopifyGetOrderTool,
  searchCustomers: shopifySearchCustomersTool,
  getCustomer: shopifyGetCustomerTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getShopifyEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "SHOPIFY_SHOP", description: "Shopify shop domain." },
    { name: "SHOPIFY_ADMIN_ACCESS_TOKEN", description: "Shopify Admin API access token." },
  ];
}

export const shopifyIntegrationSpec = {
  environmentVariables: getShopifyEnvironmentVariables,
} satisfies IntegrationSpec;
