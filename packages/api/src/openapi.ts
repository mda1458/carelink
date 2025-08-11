export const openapi = {
  openapi: "3.0.0",
  info: {
    title: "CareLink API",
    version: "0.1.0"
  },
  paths: {
    "/v1/health": {
      get: { responses: { "200": { description: "ok" } } }
    },
    "/v1/version": {
      get: { responses: { "200": { description: "ok" } } }
    }
  }
};
