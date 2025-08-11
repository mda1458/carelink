import { test, expect, checkA11y } from './axe.helper';
test('home is accessible', async ({ page }) => { await page.goto('/'); await checkA11y(page); });
