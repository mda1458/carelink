import type { Request, Response, NextFunction } from "express";
export function auditTrail(req: Request, res: Response, next: NextFunction) {
  // Placeholder: attach actor/resource metadata; redact PII
  (req as any)._audit = { actor: req.headers['x-user'] || 'anon', at: Date.now() };
  next();
}
