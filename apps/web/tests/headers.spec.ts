import { test, expect } from '@playwright/test';

test('security headers present on home', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  const csp = res.headers()['content-security-policy'] || res.headers()['content-security-policy-report-only'];
  expect(csp).toBeDefined();
});
