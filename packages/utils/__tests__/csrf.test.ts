jest.mock("next/headers", () => {
  let store: Record<string, string> = {};
  return {
    cookies: () => ({
      set: ({ name, value }: { name: string; value: string }) => { store[name] = value; },
      get: (name: string) => (store[name] ? { value: store[name] } : undefined),
    }),
  };
});

import { NextRequest } from "next/server";
import { createCsrfToken, setCsrfCookie, verifyCsrf } from "../src/csrf";

function reqWithHeader(token: string | null): NextRequest {
  return new NextRequest("http://localhost", { headers: token ? { "x-csrf-token": token } : undefined });
}

test("creates, stores, and verifies token", () => {
  const token = createCsrfToken();
  setCsrfCookie(token, { secure: false });
  expect(verifyCsrf(reqWithHeader(token))).toBe(true);
  expect(verifyCsrf(reqWithHeader("bad"))).toBe(false);
});
