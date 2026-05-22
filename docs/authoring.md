# Integration Authoring Guide

Chidori integration packages should make external services feel like native Chidori tools.

## Tool Shape

Each tool module exports:

```ts
export const tool = {
  name: "service_action",
  description: "Do one specific action.",
  parameters: {
    type: "object",
    properties: {},
    required: []
  }
};

export async function run(args, chidori) {
  return chidori.http("https://api.example.com", {
    method: "POST",
    headers: {},
    body: args
  });
}
```

## Integration Spec

Every integration package must also export a package-level spec with an
`environmentVariables()` method:

```ts
type EnvironmentVariable = import("@chidori/integrations-core").ChidoriEnvironmentVariable;
type IntegrationSpec = import("@chidori/integrations-core").ChidoriIntegrationSpec;

export function getExampleEnvironmentVariables(): readonly EnvironmentVariable[] {
  return [
    { name: "EXAMPLE_API_KEY", description: "Example API key." }
  ];
}

export const exampleIntegrationSpec = {
  environmentVariables: getExampleEnvironmentVariables
} satisfies IntegrationSpec;
```

Return only variables that can be required for the package to call its external
services successfully. Multi-provider packages should list the variables for each
provider-specific tool family.

## Design Rules

- Keep tool metadata JSON-compatible and static.
- Use `chidori.http` for service calls.
- Accept secrets as explicit args or references that can resolve from `chidori.memory`.
- Export an integration spec whose `environmentVariables()` method exposes the environment variables the package can require.
- Return provider responses with minimal reshaping unless a stable Chidori interface exists.
- Prefer small single-purpose tools over broad SDK wrappers.
- Keep runtime code dependency-free unless the package entrypoint is explicitly Node-only.

## Vendoring Tools Into Agents

Published packages are useful from Node-side TypeScript, but Chidori's durable agent runtime should not depend on bare npm imports inside discovered tool files. Use the root vendor helper to generate standalone tool modules:

```bash
npm run build
npm run vendor:tools -- --package @chidori/integrations-web --tool tavily_search --out /path/to/agent/tools
```

The generated files inline the shared runtime helpers and provider implementation, then expose `export const tool` and `export async function run`. They can be checked into the consuming agent project or regenerated during its build.
