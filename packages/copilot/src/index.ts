export type Prompt = { id: string; version: string; text: string };
export type CopilotConfig = { provider?: 'openai'|'azure'|'none'; timeoutMs?: number };
export class Copilot {
  constructor(private cfg: CopilotConfig = {}) {}
  async run(prompt: Prompt): Promise<{ ok: boolean; output?: string; reason?: string }> {
    // Placeholder: add provider calls here; enforce timeout + circuit breaker
    return { ok: true, output: `stub:${prompt.id}@${prompt.version}` };
  }
}
