import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: [
      "req.headers.authorization",
      "request.headers.authorization",
      "req.body.password",
      "request.body.password",
      "user.token",
      "user.ssn",
      "*.creditCard",
    ],
    remove: true,
  },
  base: undefined, // do not include pid/hostname for serverless
});
