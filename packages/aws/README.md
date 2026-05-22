# @chidori/integrations-aws

AWS Bedrock Runtime, Bedrock Knowledge Bases, Amazon Kendra, Step Functions, SageMaker Runtime, and Lambda tools for Chidori agents.

These tools intentionally do not include the AWS SDK. Chidori's durable TypeScript runtime should pass already-signed SigV4 headers, use an AWS-compatible proxy, or call a host tool that signs requests.

Exports:

- `awsBedrockInvokeModelTool`
- `awsBedrockConverseTool`
- `awsBedrockKnowledgeBaseRetrieveTool`
- `awsBedrockKnowledgeBaseRetrieveAndGenerateTool`
- `awsKendraRetrieveTool`
- `awsKendraQueryTool`
- `awsStepFunctionsStartExecutionTool`
- `awsStepFunctionsDescribeExecutionTool`
- `awsStepFunctionsSendTaskSuccessTool`
- `awsLambdaInvokeTool`
- `awsSageMakerInvokeEndpointTool`
- `awsTools`
