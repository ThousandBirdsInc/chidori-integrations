import {
  compactObject,
  defineTool,
  jsonHeaders,
  requestJson,
  resolveSecret,
  type ChidoriRuntime,
  type Json,
  type JsonObject,
  type SecretInput,
} from "@chidori/integrations-core";

export interface AwsSignedHeaders {
  authorization?: SecretInput;
  amzDate?: string;
  securityToken?: SecretInput;
  headers?: Record<string, string>;
}

export interface BedrockInvokeModelArgs extends AwsSignedHeaders {
  modelId: string;
  body: JsonObject;
  region?: string;
  endpoint?: string;
  accept?: string;
  contentType?: string;
  trace?: "ENABLED" | "DISABLED" | "ENABLED_FULL";
  guardrailIdentifier?: string;
  guardrailVersion?: string;
}

export interface BedrockConverseArgs extends AwsSignedHeaders {
  modelId: string;
  messages: JsonObject[];
  region?: string;
  endpoint?: string;
  system?: JsonObject[];
  inferenceConfig?: JsonObject;
  toolConfig?: JsonObject;
  guardrailConfig?: JsonObject;
  additionalModelRequestFields?: JsonObject;
}

export interface BedrockKnowledgeBaseRetrieveArgs extends AwsSignedHeaders {
  knowledgeBaseId: string;
  query: string;
  region?: string;
  endpoint?: string;
  retrievalConfiguration?: JsonObject;
  guardrailConfiguration?: JsonObject;
  nextToken?: string;
}

export interface BedrockKnowledgeBaseRetrieveAndGenerateArgs extends AwsSignedHeaders {
  inputText: string;
  region?: string;
  endpoint?: string;
  knowledgeBaseId?: string;
  modelArn?: string;
  retrievalConfiguration?: JsonObject;
  generationConfiguration?: JsonObject;
  orchestrationConfiguration?: JsonObject;
  retrieveAndGenerateConfiguration?: JsonObject;
  sessionConfiguration?: JsonObject;
  sessionId?: string;
}

export interface KendraRetrieveArgs extends AwsSignedHeaders {
  indexId: string;
  queryText: string;
  region?: string;
  endpoint?: string;
  attributeFilter?: JsonObject;
  documentRelevanceOverrideConfigurations?: JsonObject[];
  pageNumber?: number;
  pageSize?: number;
  requestedDocumentAttributes?: string[];
  userContext?: JsonObject;
}

export interface KendraQueryArgs extends AwsSignedHeaders {
  indexId: string;
  queryText: string;
  region?: string;
  endpoint?: string;
  attributeFilter?: JsonObject;
  collapseConfiguration?: JsonObject;
  documentRelevanceOverrideConfigurations?: JsonObject[];
  facets?: JsonObject[];
  pageNumber?: number;
  pageSize?: number;
  queryResultTypeFilter?: "DOCUMENT" | "QUESTION_ANSWER" | "ANSWER";
  requestedDocumentAttributes?: string[];
  sortingConfiguration?: JsonObject;
  sortingConfigurations?: JsonObject[];
  spellCorrectionConfiguration?: JsonObject;
  userContext?: JsonObject;
  visitorId?: string;
}

export interface StepFunctionsStartExecutionArgs extends AwsSignedHeaders {
  stateMachineArn: string;
  input?: JsonObject | string;
  name?: string;
  region?: string;
  endpoint?: string;
}

export interface StepFunctionsDescribeExecutionArgs extends AwsSignedHeaders {
  executionArn: string;
  region?: string;
  endpoint?: string;
  includedData?: "ALL_DATA" | "METADATA_ONLY";
}

export interface StepFunctionsSendTaskSuccessArgs extends AwsSignedHeaders {
  taskToken: string;
  output: JsonObject | string;
  region?: string;
  endpoint?: string;
}

export interface LambdaInvokeArgs extends AwsSignedHeaders {
  functionName: string;
  payload?: JsonObject | string;
  region?: string;
  endpoint?: string;
  qualifier?: string;
  invocationType?: "RequestResponse" | "Event" | "DryRun";
  logType?: "None" | "Tail";
  clientContext?: string;
  tenantId?: string;
  durableExecutionName?: string;
  contentType?: string;
}

export interface SageMakerInvokeEndpointArgs extends AwsSignedHeaders {
  endpointName: string;
  body: JsonObject | string;
  region?: string;
  endpoint?: string;
  accept?: string;
  contentType?: string;
  customAttributes?: string;
  targetModel?: string;
  targetVariant?: string;
  targetContainerHostname?: string;
  inferenceId?: string;
  enableExplanations?: string;
  inferenceComponentName?: string;
  sessionId?: string;
}

function bedrockEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://bedrock-runtime.${region}.amazonaws.com`;
}

function bedrockAgentRuntimeEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://bedrock-agent-runtime.${region}.amazonaws.com`;
}

function kendraEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://kendra.${region}.amazonaws.com`;
}

function stepFunctionsEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://states.${region}.amazonaws.com`;
}

function lambdaEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://lambda.${region}.amazonaws.com`;
}

function sageMakerRuntimeEndpoint(region = "us-east-1", endpoint?: string): string {
  return endpoint ?? `https://runtime.sagemaker.${region}.amazonaws.com`;
}

async function awsHeaders(
  args: AwsSignedHeaders,
  chidori: ChidoriRuntime,
  label: string,
  contentType = "application/json",
) {
  const authorization = args.authorization
    ? await resolveSecret(args.authorization, chidori, `${label} authorization header`)
    : undefined;
  const securityToken = args.securityToken
    ? await resolveSecret(args.securityToken, chidori, `${label} session token`)
    : undefined;
  return jsonHeaders({
    ...(args.headers ?? {}),
    ...(authorization ? { Authorization: authorization } : {}),
    ...(args.amzDate ? { "X-Amz-Date": args.amzDate } : {}),
    ...(securityToken ? { "X-Amz-Security-Token": securityToken } : {}),
    "content-type": contentType,
  });
}

function jsonString(value: JsonObject | string | undefined, fallback = "{}"): string {
  if (value === undefined) {
    return fallback;
  }
  return typeof value === "string" ? value : JSON.stringify(value);
}

export const awsBedrockInvokeModelTool = defineTool<BedrockInvokeModelArgs, JsonObject>(
  {
    name: "aws_bedrock_invoke_model",
    description: "Invoke an AWS Bedrock model using caller-provided SigV4 headers or a Bedrock-compatible proxy.",
    parameters: {
      type: "object",
      properties: {
        modelId: { type: "string", description: "Bedrock model ID." },
        body: { type: "object", additionalProperties: true },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Bedrock Runtime or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        accept: { type: "string", default: "application/json" },
        contentType: { type: "string", default: "application/json" },
        trace: { type: "string", enum: ["ENABLED", "DISABLED", "ENABLED_FULL"] },
        guardrailIdentifier: { type: "string" },
        guardrailVersion: { type: "string" },
      },
      required: ["modelId", "body"],
    },
  },
  async (args, chidori) => {
    const headers = await awsHeaders(args, chidori, "AWS Bedrock", args.contentType ?? "application/json");
    return requestJson<JsonObject>(
      chidori,
      `${bedrockEndpoint(args.region, args.endpoint)}/model/${encodeURIComponent(args.modelId)}/invoke`,
      {
        method: "POST",
        headers: compactObject({
          ...headers,
          Accept: args.accept ?? "application/json",
          "X-Amzn-Bedrock-Trace": args.trace,
          "X-Amzn-Bedrock-GuardrailIdentifier": args.guardrailIdentifier,
          "X-Amzn-Bedrock-GuardrailVersion": args.guardrailVersion,
        }) as Record<string, string>,
        body: args.body,
      },
    );
  },
);

export const awsBedrockConverseTool = defineTool<BedrockConverseArgs, JsonObject>(
  {
    name: "aws_bedrock_converse",
    description: "Call the AWS Bedrock Converse API using caller-provided SigV4 headers or a Bedrock-compatible proxy.",
    parameters: {
      type: "object",
      properties: {
        modelId: { type: "string" },
        messages: { type: "array", items: { type: "object", additionalProperties: true } },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string" },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string" },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        system: { type: "array", items: { type: "object", additionalProperties: true } },
        inferenceConfig: { type: "object", additionalProperties: true },
        toolConfig: { type: "object", additionalProperties: true },
        guardrailConfig: { type: "object", additionalProperties: true },
        additionalModelRequestFields: { type: "object", additionalProperties: true },
      },
      required: ["modelId", "messages"],
    },
  },
  async (args, chidori) => {
    const body = compactObject({
      messages: args.messages as Json,
      system: args.system,
      inferenceConfig: args.inferenceConfig,
      toolConfig: args.toolConfig,
      guardrailConfig: args.guardrailConfig,
      additionalModelRequestFields: args.additionalModelRequestFields,
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      `${bedrockEndpoint(args.region, args.endpoint)}/model/${encodeURIComponent(args.modelId)}/converse`,
      {
        method: "POST",
        headers: await awsHeaders(args, chidori, "AWS Bedrock"),
        body,
      },
    );
  },
);

export const awsBedrockKnowledgeBaseRetrieveTool = defineTool<BedrockKnowledgeBaseRetrieveArgs, JsonObject>(
  {
    name: "aws_bedrock_knowledge_base_retrieve",
    description: "Retrieve relevant chunks from an Amazon Bedrock Knowledge Base using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        knowledgeBaseId: { type: "string", description: "Amazon Bedrock Knowledge Base ID." },
        query: { type: "string", description: "Text query to retrieve against the knowledge base." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Bedrock Agent Runtime or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        retrievalConfiguration: { type: "object", additionalProperties: true },
        guardrailConfiguration: { type: "object", additionalProperties: true },
        nextToken: { type: "string" },
      },
      required: ["knowledgeBaseId", "query"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      `${bedrockAgentRuntimeEndpoint(args.region, args.endpoint)}/knowledgebases/${encodeURIComponent(args.knowledgeBaseId)}/retrieve`,
      {
        method: "POST",
        headers: await awsHeaders(args, chidori, "AWS Bedrock Agent Runtime"),
        body: compactObject({
          retrievalQuery: { text: args.query },
          retrievalConfiguration: args.retrievalConfiguration,
          guardrailConfiguration: args.guardrailConfiguration,
          nextToken: args.nextToken,
        }) as JsonObject,
      },
    );
  },
);

export const awsBedrockKnowledgeBaseRetrieveAndGenerateTool = defineTool<BedrockKnowledgeBaseRetrieveAndGenerateArgs, JsonObject>(
  {
    name: "aws_bedrock_knowledge_base_retrieve_and_generate",
    description: "Query an Amazon Bedrock Knowledge Base and generate an answer with citations using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        inputText: { type: "string", description: "User input to send to RetrieveAndGenerate." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Bedrock Agent Runtime or proxy endpoint." },
        knowledgeBaseId: { type: "string", description: "Knowledge Base ID for a KNOWLEDGE_BASE configuration." },
        modelArn: { type: "string", description: "Foundation model ARN or inference profile ARN." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        retrievalConfiguration: { type: "object", additionalProperties: true },
        generationConfiguration: { type: "object", additionalProperties: true },
        orchestrationConfiguration: { type: "object", additionalProperties: true },
        retrieveAndGenerateConfiguration: {
          type: "object",
          additionalProperties: true,
          description: "Full RetrieveAndGenerate configuration. Overrides knowledgeBaseId/modelArn convenience fields.",
        },
        sessionConfiguration: { type: "object", additionalProperties: true },
        sessionId: { type: "string" },
      },
      required: ["inputText"],
    },
  },
  async (args, chidori) => {
    const retrieveAndGenerateConfiguration = args.retrieveAndGenerateConfiguration ?? compactObject({
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: compactObject({
        knowledgeBaseId: args.knowledgeBaseId,
        modelArn: args.modelArn,
        retrievalConfiguration: args.retrievalConfiguration,
        generationConfiguration: args.generationConfiguration,
        orchestrationConfiguration: args.orchestrationConfiguration,
      }),
    }) as JsonObject;
    return requestJson<JsonObject>(
      chidori,
      `${bedrockAgentRuntimeEndpoint(args.region, args.endpoint)}/retrieveAndGenerate`,
      {
        method: "POST",
        headers: await awsHeaders(args, chidori, "AWS Bedrock Agent Runtime"),
        body: compactObject({
          input: { text: args.inputText },
          retrieveAndGenerateConfiguration,
          sessionConfiguration: args.sessionConfiguration,
          sessionId: args.sessionId,
        }) as JsonObject,
      },
    );
  },
);

export const awsKendraRetrieveTool = defineTool<KendraRetrieveArgs, JsonObject>(
  {
    name: "aws_kendra_retrieve",
    description: "Retrieve semantically relevant passages from an Amazon Kendra index using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        indexId: { type: "string", description: "Amazon Kendra index ID." },
        queryText: { type: "string", description: "Search text to retrieve relevant passages for." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Amazon Kendra or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        attributeFilter: { type: "object", additionalProperties: true },
        documentRelevanceOverrideConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        pageNumber: { type: "integer" },
        pageSize: { type: "integer", default: 10 },
        requestedDocumentAttributes: { type: "array", items: { type: "string" } },
        userContext: { type: "object", additionalProperties: true },
      },
      required: ["indexId", "queryText"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      kendraEndpoint(args.region, args.endpoint),
      {
        method: "POST",
        headers: compactObject({
          ...(await awsHeaders(args, chidori, "AWS Kendra", "application/x-amz-json-1.1")),
          "X-Amz-Target": "com.amazonaws.kendra.AWSKendraFrontendService.Retrieve",
        }) as Record<string, string>,
        body: compactObject({
          IndexId: args.indexId,
          QueryText: args.queryText,
          AttributeFilter: args.attributeFilter,
          DocumentRelevanceOverrideConfigurations: args.documentRelevanceOverrideConfigurations as Json | undefined,
          PageNumber: args.pageNumber,
          PageSize: args.pageSize,
          RequestedDocumentAttributes: args.requestedDocumentAttributes,
          UserContext: args.userContext,
        }) as JsonObject,
      },
    );
  },
);

export const awsKendraQueryTool = defineTool<KendraQueryArgs, JsonObject>(
  {
    name: "aws_kendra_query",
    description: "Search an Amazon Kendra index using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        indexId: { type: "string", description: "Amazon Kendra index ID." },
        queryText: { type: "string", description: "Search text for the query." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Amazon Kendra or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        attributeFilter: { type: "object", additionalProperties: true },
        collapseConfiguration: { type: "object", additionalProperties: true },
        documentRelevanceOverrideConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        facets: { type: "array", items: { type: "object", additionalProperties: true } },
        pageNumber: { type: "integer" },
        pageSize: { type: "integer", default: 10 },
        queryResultTypeFilter: { type: "string", enum: ["DOCUMENT", "QUESTION_ANSWER", "ANSWER"] },
        requestedDocumentAttributes: { type: "array", items: { type: "string" } },
        sortingConfiguration: { type: "object", additionalProperties: true },
        sortingConfigurations: { type: "array", items: { type: "object", additionalProperties: true } },
        spellCorrectionConfiguration: { type: "object", additionalProperties: true },
        userContext: { type: "object", additionalProperties: true },
        visitorId: { type: "string" },
      },
      required: ["indexId", "queryText"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(
      chidori,
      kendraEndpoint(args.region, args.endpoint),
      {
        method: "POST",
        headers: compactObject({
          ...(await awsHeaders(args, chidori, "AWS Kendra", "application/x-amz-json-1.1")),
          "X-Amz-Target": "com.amazonaws.kendra.AWSKendraFrontendService.Query",
        }) as Record<string, string>,
        body: compactObject({
          IndexId: args.indexId,
          QueryText: args.queryText,
          AttributeFilter: args.attributeFilter,
          CollapseConfiguration: args.collapseConfiguration,
          DocumentRelevanceOverrideConfigurations: args.documentRelevanceOverrideConfigurations as Json | undefined,
          Facets: args.facets as Json | undefined,
          PageNumber: args.pageNumber,
          PageSize: args.pageSize,
          QueryResultTypeFilter: args.queryResultTypeFilter,
          RequestedDocumentAttributes: args.requestedDocumentAttributes,
          SortingConfiguration: args.sortingConfiguration,
          SortingConfigurations: args.sortingConfigurations as Json | undefined,
          SpellCorrectionConfiguration: args.spellCorrectionConfiguration,
          UserContext: args.userContext,
          VisitorId: args.visitorId,
        }) as JsonObject,
      },
    );
  },
);

export const awsStepFunctionsStartExecutionTool = defineTool<StepFunctionsStartExecutionArgs, JsonObject>(
  {
    name: "aws_stepfunctions_start_execution",
    description: "Start an AWS Step Functions state machine execution using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        stateMachineArn: { type: "string", description: "State machine ARN, version ARN, or alias ARN." },
        input: {
          oneOf: [
            { type: "object", additionalProperties: true },
            { type: "string" },
          ],
          description: "Execution input as a JSON object or pre-stringified JSON.",
        },
        name: { type: "string", description: "Optional execution name." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Step Functions or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
      },
      required: ["stateMachineArn"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, stepFunctionsEndpoint(args.region, args.endpoint), {
      method: "POST",
      headers: compactObject({
        ...(await awsHeaders(args, chidori, "AWS Step Functions", "application/x-amz-json-1.0")),
        "X-Amz-Target": "AWSStepFunctions.StartExecution",
      }) as Record<string, string>,
      body: compactObject({
        stateMachineArn: args.stateMachineArn,
        input: jsonString(args.input),
        name: args.name,
      }) as JsonObject,
    });
  },
);

export const awsStepFunctionsDescribeExecutionTool = defineTool<StepFunctionsDescribeExecutionArgs, JsonObject>(
  {
    name: "aws_stepfunctions_describe_execution",
    description: "Describe an AWS Step Functions execution using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        executionArn: { type: "string", description: "Execution ARN to describe." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Step Functions or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        includedData: { type: "string", enum: ["ALL_DATA", "METADATA_ONLY"] },
      },
      required: ["executionArn"],
    },
  },
  async (args, chidori) => {
    return requestJson<JsonObject>(chidori, stepFunctionsEndpoint(args.region, args.endpoint), {
      method: "POST",
      headers: compactObject({
        ...(await awsHeaders(args, chidori, "AWS Step Functions", "application/x-amz-json-1.0")),
        "X-Amz-Target": "AWSStepFunctions.DescribeExecution",
      }) as Record<string, string>,
      body: compactObject({
        executionArn: args.executionArn,
        includedData: args.includedData,
      }) as JsonObject,
    });
  },
);

export const awsStepFunctionsSendTaskSuccessTool = defineTool<StepFunctionsSendTaskSuccessArgs, JsonObject>(
  {
    name: "aws_stepfunctions_send_task_success",
    description: "Report successful completion for an AWS Step Functions callback task using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        taskToken: { type: "string", description: "Step Functions task token." },
        output: {
          oneOf: [
            { type: "object", additionalProperties: true },
            { type: "string" },
          ],
          description: "Task output as a JSON object or pre-stringified JSON.",
        },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Step Functions or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
      },
      required: ["taskToken", "output"],
    },
  },
  async (args, chidori) => {
    const url = stepFunctionsEndpoint(args.region, args.endpoint);
    const response = await chidori.http(url, {
      method: "POST",
      headers: compactObject({
        ...(await awsHeaders(args, chidori, "AWS Step Functions", "application/x-amz-json-1.0")),
        "X-Amz-Target": "AWSStepFunctions.SendTaskSuccess",
      }) as Record<string, string>,
      body: {
        taskToken: args.taskToken,
        output: jsonString(args.output),
      },
    });
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ${url}: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  },
);

export const awsLambdaInvokeTool = defineTool<LambdaInvokeArgs, JsonObject>(
  {
    name: "aws_lambda_invoke",
    description: "Invoke an AWS Lambda function using caller-provided SigV4 headers or a Lambda-compatible proxy.",
    parameters: {
      type: "object",
      properties: {
        functionName: { type: "string", description: "Lambda function name, ARN, version, or alias." },
        payload: { description: "JSON object or string payload to pass to the function." },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional Lambda API or proxy endpoint." },
        qualifier: { type: "string", description: "Lambda version or alias." },
        invocationType: { type: "string", enum: ["RequestResponse", "Event", "DryRun"], default: "RequestResponse" },
        logType: { type: "string", enum: ["None", "Tail"] },
        clientContext: { type: "string", description: "Base64-encoded client context." },
        tenantId: { type: "string" },
        durableExecutionName: { type: "string" },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        contentType: { type: "string", default: "application/json" },
      },
      required: ["functionName"],
    },
  },
  async (args, chidori) => {
    const headers = await awsHeaders(args, chidori, "AWS Lambda", args.contentType ?? "application/json");
    const payload = typeof args.payload === "string" ? args.payload : (args.payload ?? {});
    const url = `${lambdaEndpoint(args.region, args.endpoint)}/2015-03-31/functions/${encodeURIComponent(args.functionName)}/invocations`;
    const response = await chidori.http(args.qualifier ? `${url}?Qualifier=${encodeURIComponent(args.qualifier)}` : url, {
      method: "POST",
      headers: compactObject({
        ...headers,
        "X-Amz-Invocation-Type": args.invocationType ?? "RequestResponse",
        "X-Amz-Log-Type": args.logType,
        "X-Amz-Client-Context": args.clientContext,
        "X-Amz-Tenant-Id": args.tenantId,
        "X-Amz-Durable-Execution-Name": args.durableExecutionName,
      }) as Record<string, string>,
      body: typeof payload === "string" ? payload : payload,
    });
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ${url}: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body as Json,
    };
  },
);

export const awsSageMakerInvokeEndpointTool = defineTool<SageMakerInvokeEndpointArgs, JsonObject>(
  {
    name: "aws_sagemaker_invoke_endpoint",
    description: "Invoke an Amazon SageMaker Runtime endpoint using caller-provided SigV4 headers or a proxy.",
    parameters: {
      type: "object",
      properties: {
        endpointName: { type: "string", description: "SageMaker endpoint name." },
        body: {
          oneOf: [
            { type: "object", additionalProperties: true },
            { type: "string" },
          ],
          description: "Inference payload in the format expected by the hosted model.",
        },
        region: { type: "string", default: "us-east-1" },
        endpoint: { type: "string", description: "Optional SageMaker Runtime or proxy endpoint." },
        authorization: { description: "Signed Authorization header or memory secret reference." },
        amzDate: { type: "string", description: "X-Amz-Date value used by the signature." },
        securityToken: { description: "Optional X-Amz-Security-Token or memory secret reference." },
        headers: { type: "object", additionalProperties: { type: "string" } },
        accept: { type: "string", default: "application/json" },
        contentType: { type: "string", default: "application/json" },
        customAttributes: { type: "string" },
        targetModel: { type: "string" },
        targetVariant: { type: "string" },
        targetContainerHostname: { type: "string" },
        inferenceId: { type: "string" },
        enableExplanations: { type: "string" },
        inferenceComponentName: { type: "string" },
        sessionId: { type: "string" },
      },
      required: ["endpointName", "body"],
    },
  },
  async (args, chidori) => {
    const url = `${sageMakerRuntimeEndpoint(args.region, args.endpoint)}/endpoints/${encodeURIComponent(args.endpointName)}/invocations`;
    const response = await chidori.http(url, {
      method: "POST",
      headers: compactObject({
        ...(await awsHeaders(args, chidori, "AWS SageMaker", args.contentType ?? "application/json")),
        Accept: args.accept ?? "application/json",
        "X-Amzn-SageMaker-Custom-Attributes": args.customAttributes,
        "X-Amzn-SageMaker-Target-Model": args.targetModel,
        "X-Amzn-SageMaker-Target-Variant": args.targetVariant,
        "X-Amzn-SageMaker-Target-Container-Hostname": args.targetContainerHostname,
        "X-Amzn-SageMaker-Inference-Id": args.inferenceId,
        "X-Amzn-SageMaker-Enable-Explanations": args.enableExplanations,
        "X-Amzn-SageMaker-Inference-Component": args.inferenceComponentName,
        "X-Amzn-SageMaker-Session-Id": args.sessionId,
      }) as Record<string, string>,
      body: args.body,
    });
    if (response.status < 200 || response.status >= 300) {
      const detail = typeof response.body === "string" ? response.body : JSON.stringify(response.body);
      throw new Error(`HTTP ${response.status} from ${url}: ${detail}`);
    }
    return {
      status: response.status,
      headers: response.headers,
      body: response.body,
    };
  },
);

export const awsTools = {
  bedrockInvokeModel: awsBedrockInvokeModelTool,
  bedrockConverse: awsBedrockConverseTool,
  bedrockKnowledgeBaseRetrieve: awsBedrockKnowledgeBaseRetrieveTool,
  bedrockKnowledgeBaseRetrieveAndGenerate: awsBedrockKnowledgeBaseRetrieveAndGenerateTool,
  kendraRetrieve: awsKendraRetrieveTool,
  kendraQuery: awsKendraQueryTool,
  stepFunctionsStartExecution: awsStepFunctionsStartExecutionTool,
  stepFunctionsDescribeExecution: awsStepFunctionsDescribeExecutionTool,
  stepFunctionsSendTaskSuccess: awsStepFunctionsSendTaskSuccessTool,
  lambdaInvoke: awsLambdaInvokeTool,
  sageMakerInvokeEndpoint: awsSageMakerInvokeEndpointTool,
};

type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getAWSEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "AWS_AUTHORIZATION_HEADER", description: "Pre-signed AWS SigV4 Authorization header for AWS tools." },
    { name: "AWS_SESSION_TOKEN", description: "Optional AWS session token for temporary credentials." },
    { name: "AWS_REGION", description: "Default AWS region for AWS service endpoints." },
  ];
}

export const awsIntegrationSpec = {
  environmentVariables: getAWSEnvironmentVariables,
} satisfies IntegrationSpec;
