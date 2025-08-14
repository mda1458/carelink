import { test as base, expect } from '@playwright/test'; import AxeBuilder from '@axe-core/playwright';
export const test = base.extend({}); export { expect };
export async function checkA11y(page: unknown) { const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(v => ['serious','critical'].includes(v.impact||''));
  if (serious.length) { // eslint-disable-next-line no-console
        console.error(JSON.stringify(serious, null, 2)); throw new Error('A11y violations (serious/critical)'); }
}
