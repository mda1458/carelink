import { z } from "zod";

/**
 * Fetch with timeout + optional Zod schema validation.
 */
export async function safeFetch<T>(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number; schema?: z.ZodSchema<T> } = {}
): Promise<T> {
  const { timeoutMs = 10_000, schema, ...rest } = init;
  const ac = new AbortController();
  const id = setTimeout(() => ac.abort(), timeoutMs);

  const res = await fetch(input, { ...rest, signal: ac.signal });
  clearTimeout(id);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} → ${body.slice(0, 200)}`);
  }

  const json = (await res.json()) as unknown;

  if (schema) {
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      throw new Error(`SchemaError: ${parsed.error.issues.map(e => e.message).join("; ")}`);
    }
    return parsed.data;
  }

  return json as T;
}
