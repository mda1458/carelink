export const runtime = "nodejs"; export const maxDuration = 10;
import { sanitizeName, isMimeAllowed, isSizeAllowed } from "../../../src/lib/upload";
import { clientKey, take } from "../../../src/lib/rateLimit";
function ipFromHeaders(h: Headers) { return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null; }
function json(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: { "Content-Type":"application/json", "X-Content-Type-Options":"nosniff" } }); }
export async function POST(req: Request) {
  const ip = ipFromHeaders(req.headers); const cookieId = req.headers.get("cookie") || null; const key = clientKey(ip, cookieId);
  if (!take(key)) return json({ ok:false, error:"Too many requests" }, 429);
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file || typeof file === 'string') return json({ ok: false, error: "No file" }, 400);
    const mime = file.type || ""; if (!isMimeAllowed(mime)) return json({ ok:false, error:`MIME not allowed: ${mime}` }, 415);
    if (typeof file.size !== "number" || !isSizeAllowed(file.size)) return json({ ok:false, error:"Invalid size" }, 413);
    const filename = sanitizeName(file.name || "upload.bin"); return json({ ok:true, filename, mime, size:file.size }, 200);
  } catch (error) {
    console.error('Upload error:', error);
    return json({ ok: false, error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` }, 500);
  }
}
