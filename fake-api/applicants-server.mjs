import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5599;
const API_KEY = "40U8DO4fa30SvZ7mfxvXoUiBfrm07kZc"; // base64, 32 chars
const THROTTLE_MS = 150;

const throttle = () => new Promise((resolve) => setTimeout(resolve, THROTTLE_MS));

const seed = JSON.parse(readFileSync(join(__dirname, "db.json"), "utf-8"));

const store = {
  applications: structuredClone(seed.applications),
};

// ── helpers ──────────────────────────────────────────────────────────────────

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

// ── router ───────────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  await throttle();
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname.replace(/^\/v1/, "") || "/";
  const method = req.method.toUpperCase();

  if (pathname === "/applications" || pathname.startsWith("/applications/")) {
    const key = req.headers["x-api-key"];
    if (key !== API_KEY) {
      return send(res, 401, { error: "Unauthorized: invalid or missing X-Api-Key header" });
    }

    if (method === "GET") {
      return send(res, 200, store.applications);
    }

    return send(res, 405, { error: "Method not allowed" });
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`\nGoFasti Applicants API running at http://localhost:${PORT}\n`);
  console.log("  /v1/applications  — GET  (server-only, requires X-Api-Key header)");
  console.log(`\n  X-Api-Key: ${API_KEY}\n`);
});
