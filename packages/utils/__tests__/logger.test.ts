import { logger } from "../src/logger";

test("pino logger is configured", () => {
  const child = logger.child({ ok: true });
  expect(child).toBeTruthy();
});
