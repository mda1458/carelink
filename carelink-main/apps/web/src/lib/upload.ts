export const ALLOW_MIME = new Set(["image/png","image/jpeg","image/webp","application/pdf"]);
export const MAX_BYTES = 5 * 1024 * 1024;
export function sanitizeName(name: string) { return (name || "upload.bin").replace(/[^\w.-]/g, "_").slice(0,80); }
export function isMimeAllowed(m: string) { return ALLOW_MIME.has(m); }
export function isSizeAllowed(n: number) { return Number.isFinite(n) && n >= 0 && n <= MAX_BYTES; }
