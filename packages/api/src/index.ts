import express from "express";
import { auditTrail } from "./middleware/auditTrail";
import { openapi } from "./openapi";

const app = express();
app.use(express.json());
app.use(auditTrail);

app.get("/v1/health", (_req, res) => res.json({ ok: true }));
app.get("/v1/version", (_req, res) => res.json({ ok: true, version: process.env.GIT_SHA ?? "local" }));
app.get("/v1/openapi.json", (_req, res) => res.json(openapi));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
