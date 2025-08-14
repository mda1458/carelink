import { expect, test } from "@playwright/test";
import { SignJWT } from "jose";
const enc = new TextEncoder(); const secret = process.env.ROLE_COOKIE_SECRET || "testsecret";
async function signRole(role: string, sub?: string) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ role, sub }).setProtectedHeader({ alg: "HS256" }).setIssuedAt(now).setExpirationTime(now + 3600).sign(enc.encode(secret));
}
test("unauthorized redirects to login", async ({ page }) => { await page.goto("/protected/dashboard"); await expect(page).toHaveURL(/\/login\?returnTo=%2Fprotected%2Fdashboard/); });
test("authorized loads dashboard", async ({ page, context }) => {
  const token = await signRole("employer", "u_1");
  await context.addCookies([{ name: "role_sig", value: token, url: "http://localhost:3000", sameSite: "Lax" }]);
  await page.goto("/protected/dashboard"); await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Welcome, employer");
});
