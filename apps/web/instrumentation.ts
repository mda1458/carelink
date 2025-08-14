import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // Reads OTEL_EXPORTER_OTLP_ENDPOINT / HEADERS from env
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start().catch((e) => console.error("OTel start failed", e));

export async function register() {
  // Next.js 14 will call this automatically when present
}
