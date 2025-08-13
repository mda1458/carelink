import { safeFetch } from "../src/safeFetch";
import { z } from "zod";

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ id: "1", email: "x@y.com" }),
  text: async () => ""
}) as jest.MockedFunction<typeof fetch>;

test("validates with zod schema", async () => {
  const S = z.object({ id: z.string(), email: z.string().email() });
  const data = await safeFetch("https://example.com", { schema: S });
  expect(data.id).toBe("1");
});
