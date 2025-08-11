import crypto from 'node:crypto';

export function jsonLdScriptTag(obj: unknown) {
  const json = JSON.stringify(obj);
  return `<script type="application/ld+json">${json}</script>`;
}

export function sha256ForJsonLd(obj: unknown): string {
  const json = JSON.stringify(obj);
  const hash = crypto.createHash('sha256').update(json).digest('base64');
  return `'sha256-${hash}'`;
}
// Paste the returned hash into next.config.ts script-src to avoid 'unsafe-inline'.
