import {
  bearerAuth,
  compactObject,
  defineTool,
  requestJson,
  resolveSecret,
  withQuery,
  type ChidoriHttpRequestOptions,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface StripeAuthArgs {
  apiKey?: SecretInput;
  baseUrl?: string;
  stripeVersion?: string;
}

export interface StripeListResourceArgs extends StripeAuthArgs {
  resource: "balance_transactions" | "charges" | "customers" | "events" | "refunds" | "disputes";
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  created?: JsonObject;
}

export interface StripeListCustomersArgs extends StripeAuthArgs {
  limit?: number;
  email?: string;
  startingAfter?: string;
  endingBefore?: string;
  created?: JsonObject;
}

export interface StripeGetCustomerArgs extends StripeAuthArgs {
  customerId: string;
}

export interface StripeCreateCustomerArgs extends StripeAuthArgs {
  email?: string;
  name?: string;
  phone?: string;
  description?: string;
  metadata?: JsonObject;
  address?: JsonObject;
  shipping?: JsonObject;
  paymentMethod?: string;
  invoiceSettings?: JsonObject;
}

export interface StripeUpdateCustomerArgs extends StripeCreateCustomerArgs {
  customerId: string;
}

export interface StripeCreatePaymentIntentArgs extends StripeAuthArgs {
  amount: number;
  currency: string;
  customer?: string;
  description?: string;
  metadata?: JsonObject;
  receiptEmail?: string;
  paymentMethod?: string;
  paymentMethodTypes?: string[];
  automaticPaymentMethods?: JsonObject;
  confirm?: boolean;
  captureMethod?: string;
  setupFutureUsage?: string;
  idempotencyKey?: string;
  extraParams?: JsonObject;
}

export interface StripeCreateCheckoutSessionArgs extends StripeAuthArgs {
  mode: "payment" | "setup" | "subscription";
  successUrl?: string;
  cancelUrl?: string;
  returnUrl?: string;
  lineItems?: JsonObject[];
  customer?: string;
  customerEmail?: string;
  clientReferenceId?: string;
  metadata?: JsonObject;
  paymentIntentData?: JsonObject;
  subscriptionData?: JsonObject;
  allowPromotionCodes?: boolean;
  automaticTax?: JsonObject;
  idempotencyKey?: string;
  extraParams?: JsonObject;
}

export interface StripeGetCheckoutSessionArgs extends StripeAuthArgs {
  sessionId: string;
}

function stripeBaseUrl(args: StripeAuthArgs): string {
  return (args.baseUrl ?? "https://api.stripe.com/v1").replace(/\/+$/, "");
}

function stripeHeaders(args: StripeAuthArgs, apiKey: string, idempotencyKey?: string): Record<string, string> {
  const headers: Record<string, string> = {
    ...bearerAuth(apiKey),
    "content-type": "application/x-www-form-urlencoded",
  };
  if (args.stripeVersion) {
    headers["Stripe-Version"] = args.stripeVersion;
  }
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }
  return headers;
}

async function stripeRequest<T extends JsonObject>(
  args: StripeAuthArgs,
  chidori: Parameters<typeof resolveSecret>[1],
  path: string,
  options: {
    method?: "GET" | "POST";
    query?: Record<string, string | number | boolean | undefined>;
    body?: JsonObject;
    idempotencyKey?: string | undefined;
  } = {},
): Promise<T> {
  const apiKey = await resolveSecret(args.apiKey, chidori, "Stripe API key");
  const url = withQuery(`${stripeBaseUrl(args)}${path}`, options.query);
  const requestOptions: ChidoriHttpRequestOptions = {
    method: options.method ?? "GET",
    headers: stripeHeaders(args, apiKey, options.idempotencyKey),
  };
  if (options.body) {
    requestOptions.body = encodeForm(options.body);
  }
  return requestJson<T>(chidori, url, requestOptions);
}

function encodeForm(input: JsonObject): string {
  const params = new URLSearchParams();
  appendForm(params, "", input);
  return params.toString();
}

function appendForm(params: URLSearchParams, prefix: string, value: Json): void {
  if (value === undefined || value === null) {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => appendForm(params, `${prefix}[${index}]`, item));
    return;
  }
  if (typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      const name = prefix ? `${prefix}[${key}]` : key;
      appendForm(params, name, nested);
    }
    return;
  }
  params.append(prefix, String(value));
}

function stripeListQuery(args: StripeListResourceArgs | StripeListCustomersArgs) {
  return {
    limit: args.limit,
    starting_after: args.startingAfter,
    ending_before: args.endingBefore,
    "created[gt]": typeof args.created?.gt === "number" ? args.created.gt : undefined,
    "created[gte]": typeof args.created?.gte === "number" ? args.created.gte : undefined,
    "created[lt]": typeof args.created?.lt === "number" ? args.created.lt : undefined,
    "created[lte]": typeof args.created?.lte === "number" ? args.created.lte : undefined,
  };
}

function stripeCustomerBody(args: StripeCreateCustomerArgs): JsonObject {
  return compactObject({
    email: args.email,
    name: args.name,
    phone: args.phone,
    description: args.description,
    metadata: args.metadata,
    address: args.address,
    shipping: args.shipping,
    payment_method: args.paymentMethod,
    invoice_settings: args.invoiceSettings,
  }) as JsonObject;
}

export const stripeListResourceTool = defineTool<StripeListResourceArgs, JsonObject>(
  {
    name: "stripe_resource_list",
    description: "List supported Stripe REST resources for ingestion or inspection.",
    parameters: {
      type: "object",
      properties: {
        resource: {
          type: "string",
          enum: ["balance_transactions", "charges", "customers", "events", "refunds", "disputes"],
        },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        limit: { type: "integer" },
        startingAfter: { type: "string" },
        endingBefore: { type: "string" },
        created: { type: "object", additionalProperties: true },
      },
      required: ["resource"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, `/${args.resource}`, {
      query: stripeListQuery(args),
    });
  },
);

export const stripeListCustomersTool = defineTool<StripeListCustomersArgs, JsonObject>(
  {
    name: "stripe_customers_list",
    description: "List Stripe customers.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        limit: { type: "integer" },
        email: { type: "string" },
        startingAfter: { type: "string" },
        endingBefore: { type: "string" },
        created: { type: "object", additionalProperties: true },
      },
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, "/customers", {
      query: {
        ...stripeListQuery(args),
        email: args.email,
      },
    });
  },
);

export const stripeGetCustomerTool = defineTool<StripeGetCustomerArgs, JsonObject>(
  {
    name: "stripe_customer_get",
    description: "Retrieve a Stripe customer by ID.",
    parameters: {
      type: "object",
      properties: {
        customerId: { type: "string" },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
      },
      required: ["customerId"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, `/customers/${encodeURIComponent(args.customerId)}`);
  },
);

export const stripeCreateCustomerTool = defineTool<StripeCreateCustomerArgs, JsonObject>(
  {
    name: "stripe_customer_create",
    description: "Create a Stripe customer.",
    parameters: {
      type: "object",
      properties: {
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        description: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        address: { type: "object", additionalProperties: true },
        shipping: { type: "object", additionalProperties: true },
        paymentMethod: { type: "string" },
        invoiceSettings: { type: "object", additionalProperties: true },
      },
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, "/customers", {
      method: "POST",
      body: stripeCustomerBody(args),
    });
  },
);

export const stripeUpdateCustomerTool = defineTool<StripeUpdateCustomerArgs, JsonObject>(
  {
    name: "stripe_customer_update",
    description: "Update a Stripe customer.",
    parameters: {
      type: "object",
      properties: {
        customerId: { type: "string" },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        description: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        address: { type: "object", additionalProperties: true },
        shipping: { type: "object", additionalProperties: true },
        paymentMethod: { type: "string" },
        invoiceSettings: { type: "object", additionalProperties: true },
      },
      required: ["customerId"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, `/customers/${encodeURIComponent(args.customerId)}`, {
      method: "POST",
      body: stripeCustomerBody(args),
    });
  },
);

export const stripeCreatePaymentIntentTool = defineTool<StripeCreatePaymentIntentArgs, JsonObject>(
  {
    name: "stripe_payment_intent_create",
    description: "Create a Stripe PaymentIntent.",
    parameters: {
      type: "object",
      properties: {
        amount: { type: "integer" },
        currency: { type: "string" },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        customer: { type: "string" },
        description: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        receiptEmail: { type: "string" },
        paymentMethod: { type: "string" },
        paymentMethodTypes: { type: "array", items: { type: "string" } },
        automaticPaymentMethods: { type: "object", additionalProperties: true },
        confirm: { type: "boolean" },
        captureMethod: { type: "string" },
        setupFutureUsage: { type: "string" },
        idempotencyKey: { type: "string" },
        extraParams: { type: "object", additionalProperties: true },
      },
      required: ["amount", "currency"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, "/payment_intents", {
      method: "POST",
      idempotencyKey: args.idempotencyKey,
      body: compactObject({
        amount: args.amount,
        currency: args.currency,
        customer: args.customer,
        description: args.description,
        metadata: args.metadata,
        receipt_email: args.receiptEmail,
        payment_method: args.paymentMethod,
        payment_method_types: args.paymentMethodTypes,
        automatic_payment_methods: args.automaticPaymentMethods,
        confirm: args.confirm,
        capture_method: args.captureMethod,
        setup_future_usage: args.setupFutureUsage,
        ...args.extraParams,
      }) as JsonObject,
    });
  },
);

export const stripeCreateCheckoutSessionTool = defineTool<StripeCreateCheckoutSessionArgs, JsonObject>(
  {
    name: "stripe_checkout_session_create",
    description: "Create a Stripe Checkout Session.",
    parameters: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["payment", "setup", "subscription"] },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
        successUrl: { type: "string" },
        cancelUrl: { type: "string" },
        returnUrl: { type: "string" },
        lineItems: { type: "array", items: { type: "object", additionalProperties: true } },
        customer: { type: "string" },
        customerEmail: { type: "string" },
        clientReferenceId: { type: "string" },
        metadata: { type: "object", additionalProperties: true },
        paymentIntentData: { type: "object", additionalProperties: true },
        subscriptionData: { type: "object", additionalProperties: true },
        allowPromotionCodes: { type: "boolean" },
        automaticTax: { type: "object", additionalProperties: true },
        idempotencyKey: { type: "string" },
        extraParams: { type: "object", additionalProperties: true },
      },
      required: ["mode"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, "/checkout/sessions", {
      method: "POST",
      idempotencyKey: args.idempotencyKey,
      body: compactObject({
        mode: args.mode,
        success_url: args.successUrl,
        cancel_url: args.cancelUrl,
        return_url: args.returnUrl,
        line_items: args.lineItems,
        customer: args.customer,
        customer_email: args.customerEmail,
        client_reference_id: args.clientReferenceId,
        metadata: args.metadata,
        payment_intent_data: args.paymentIntentData,
        subscription_data: args.subscriptionData,
        allow_promotion_codes: args.allowPromotionCodes,
        automatic_tax: args.automaticTax,
        ...args.extraParams,
      }) as JsonObject,
    });
  },
);

export const stripeGetCheckoutSessionTool = defineTool<StripeGetCheckoutSessionArgs, JsonObject>(
  {
    name: "stripe_checkout_session_get",
    description: "Retrieve a Stripe Checkout Session by ID.",
    parameters: {
      type: "object",
      properties: {
        sessionId: { type: "string" },
        apiKey: { description: "Stripe secret key or Chidori memory secret reference." },
        baseUrl: { type: "string", default: "https://api.stripe.com/v1" },
        stripeVersion: { type: "string" },
      },
      required: ["sessionId"],
    },
  },
  async (args, chidori) => {
    return stripeRequest(args, chidori, `/checkout/sessions/${encodeURIComponent(args.sessionId)}`);
  },
);

export const stripeTools = {
  listResource: stripeListResourceTool,
  listCustomers: stripeListCustomersTool,
  getCustomer: stripeGetCustomerTool,
  createCustomer: stripeCreateCustomerTool,
  updateCustomer: stripeUpdateCustomerTool,
  createPaymentIntent: stripeCreatePaymentIntentTool,
  createCheckoutSession: stripeCreateCheckoutSessionTool,
  getCheckoutSession: stripeGetCheckoutSessionTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getStripeEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "STRIPE_API_KEY", description: "Stripe API key." },
  ];
}

export const stripeIntegrationSpec = {
  environmentVariables: getStripeEnvironmentVariables,
} satisfies IntegrationSpec;
