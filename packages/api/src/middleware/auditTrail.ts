import type { Request, Response, NextFunction } from "express";

interface AuditRequest extends Request {
  _audit?: { actor: string | string[]; at: number };
}

export function auditTrail(req: AuditRequest, res: Response, next: NextFunction) {
  // Placeholder: attach actor/resource metadata; redact PII
  req._audit = { actor: req.headers['x-user'] || 'anon', at: Date.now() };
  next();
}
