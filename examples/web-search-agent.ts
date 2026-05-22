import type { Chidori } from "chidori/agent";
import { tavilySearchTool } from "../packages/web/src/index.js";

export async function agent(input: { query: string; apiKey: string }, chidori: Chidori) {
  const result = await tavilySearchTool.run(
    {
      query: input.query,
      apiKey: input.apiKey,
      maxResults: 5
    },
    chidori
  );

  return { result };
}
