import { z } from 'zod';
import { validate } from '../src/validate';

test('validate returns typed data', () => {
  const schema = z.object({ n: z.number() });
  const out = validate(schema, { n: 1 });
  expect(out.n).toBe(1);
});

test('validate throws on bad data', () => {
  const schema = z.object({ n: z.number() });
  expect(() => validate(schema, { n: 'x' } as any)).toThrow(/ValidationError/);
});
