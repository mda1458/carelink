import { logger } from '../packages/utils/src/logger';
/**
 * Generates OpenAPI 3.0 from Zod schemas using zod-to-openapi.
 * Usage: pnpm openapi:build
 */
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import * as fs from "fs";
import * as path from "path";
import { LoginRequest, LoginResponse } from "../packages/api/schemas";

const registry = new OpenAPIRegistry();

// Register sample components and a /auth/login route as a pattern
registry.register("LoginRequest", LoginRequest);
registry.register("LoginResponse", LoginResponse);

registry.registerPath({
  method: "post",
  path: "/auth/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginRequest
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful login",
      content: {
        "application/json": {
          schema: LoginResponse
        }
      }
    }
  }
});

const generator = new OpenApiGeneratorV3(registry.definitions);
const doc = generator.generateDocument({
  openapi: "3.0.0",
  info: { title: "Carelink API", version: "0.1.0" },
  servers: [{ url: "http://localhost:3001" }]
});

const outDir = path.join(process.cwd(), "openapi");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "openapi.json"), JSON.stringify(doc, null, 2));
logger.info("✓ Wrote openapi/openapi.json");
