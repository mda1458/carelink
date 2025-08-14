jest.mock("next/headers", () => {
  let store = {};
  return {
    cookies: () => ({
      set: ({ name, value }) => { store[name] = value; },
      get: (name) => (store[name] ? { value: store[name] } : undefined),
    }),
  };
});

import { createCsrfToken, setCsrfCookie, verifyCsrf } from "../src/csrf";
import { NextRequest } from "next/server";

function reqWithHeader(token) {
  return new NextRequest("http://localhost", { headers: token ? { "x-csrf-token": token } : undefined });
}

test("creates, stores, and verifies token", () => {
  const token = createCsrfToken();
  setCsrfCookie(token, { secure: false });
  expect(verifyCsrf(reqWithHeader(token))).toBe(true);
  expect(verifyCsrf(reqWithHeader("bad"))).toBe(false);
});
