import { test, expect } from '@playwright/test';

test('navbar renders and links are visible', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation');
  await expect(nav).toBeVisible();
  const links = await nav.getByRole('link').all();
  expect(links.length).toBeGreaterThan(0);
});
