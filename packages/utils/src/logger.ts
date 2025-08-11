import pino from "pino";
export const logger = pino({ level: process.env.NODE_ENV==='production'?'info':'debug',
  redact:{ paths:["req.headers.authorization","password","token"], remove:true }, base: undefined });
