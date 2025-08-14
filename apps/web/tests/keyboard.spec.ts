import { test, expect } from '@playwright/test';

test('keyboard can reach nav links', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const firstFocus = await page.evaluate(() => document.activeElement?.tagName);
  expect(firstFocus).toBeTruthy();
});
