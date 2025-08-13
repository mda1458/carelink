import { describe, it, expect } from 'vitest';
import { Copilot } from './index';

describe('Copilot', () => {
  it('should create instance with default config', () => {
    const copilot = new Copilot();
    expect(copilot).toBeInstanceOf(Copilot);
  });

  it('should create instance with custom config', () => {
    const config = { provider: 'openai' as const, timeoutMs: 5000 };
    const copilot = new Copilot(config);
    expect(copilot).toBeInstanceOf(Copilot);
  });

  it('should return success response for valid prompt', async () => {
    const copilot = new Copilot();
    const prompt = { id: 'test-1', version: '1.0', text: 'Hello world' };
    
    const result = await copilot.run(prompt);
    
    expect(result.ok).toBe(true);
    expect(result.output).toBe('stub:test-1@1.0');
    expect(result.reason).toBeUndefined();
  });

  it('should handle different prompt configurations', async () => {
    const copilot = new Copilot({ provider: 'azure', timeoutMs: 3000 });
    const prompt = { id: 'azure-test', version: '2.1', text: 'Process this' };
    
    const result = await copilot.run(prompt);
    
    expect(result.ok).toBe(true);
    expect(result.output).toBe('stub:azure-test@2.1');
  });
});
