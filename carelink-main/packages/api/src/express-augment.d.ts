import 'express-serve-static-core';
declare module 'express-serve-static-core' {
  interface Request {
    _audit?: {
      actor?: string;
      subject?: string;
      resource?: string;
      before?: unknown;
      after?: unknown;
    };
  }
}
