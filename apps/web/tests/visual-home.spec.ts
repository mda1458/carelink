import { test, expect } from '@playwright/test';

test('home visual baseline', async ({ page }) => {
  await page.goto('/');
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('home.png');
});
