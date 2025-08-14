import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
const isProd = process.env.NODE_ENV === "production";
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const sentryIngest = "https://*.ingest.sentry.io";
const jsonLdHash = ""; // add a hash if you keep inline JSON-LD

const csp = [
  "default-src 'self'",
  `script-src 'self' https://www.googletagmanager.com https://*.vercel-insights.com${jsonLdHash ? " " + jsonLdHash : ""}`,
  "style-src 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${apiBase} ${sentryIngest} https://*.vercel-insights.com https://www.googletagmanager.com`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; ");

type HeaderKV = { key: string; value: string };
const securityHeaders: HeaderKV[] = [
  { key: isProd ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=15552000; includeSubDomains; preload" }
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() { return [{ source: "/(.*)", headers: securityHeaders }]; }
};
export default withBundleAnalyzer(nextConfig);
