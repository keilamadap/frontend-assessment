import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5598;
const THROTTLE_MS = 150;

const throttle = () => new Promise((resolve) => setTimeout(resolve, THROTTLE_MS));

const seed = JSON.parse(readFileSync(join(__dirname, "db.json"), "utf-8"));

const store = {
  skills: structuredClone(seed.skills),
};

let nextSkillId =
  Math.max(0, ...store.skills.map((s) => Number(s.id))) + 1;

// ── helpers ──────────────────────────────────────────────────────────────────

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

// ── router ───────────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  await throttle();
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname.replace(/^\/v1/, "") || "/";
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return send(res, 204, "");
  }

  const skillsRoot = pathname === "/skills";
  const skillsItem = /^\/skills\/([^/]+)$/.exec(pathname);

  if (skillsRoot || skillsItem) {
    const id = skillsItem?.[1];

    if (method === "GET" && skillsRoot) {
      return send(res, 200, store.skills);
    }

    if (method === "POST" && skillsRoot) {
      let body;
      try { body = await readBody(req); } catch { return send(res, 400, { error: "Invalid JSON" }); }
      const skill = { id: String(nextSkillId++), ...body };
      store.skills.push(skill);
      return send(res, 201, skill);
    }

    if (method === "PUT" && skillsItem) {
      let body;
      try { body = await readBody(req); } catch { return send(res, 400, { error: "Invalid JSON" }); }
      const idx = store.skills.findIndex((s) => s.id === id);
      if (idx === -1) return send(res, 404, { error: "Skill not found" });
      store.skills[idx] = { id, ...body };
      return send(res, 200, store.skills[idx]);
    }

    if (method === "DELETE" && skillsItem) {
      const idx = store.skills.findIndex((s) => s.id === id);
      if (idx === -1) return send(res, 404, { error: "Skill not found" });
      const [deleted] = store.skills.splice(idx, 1);
      return send(res, 200, deleted);
    }

    return send(res, 405, { error: "Method not allowed" });
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`\nGoFasti Skills API running at http://localhost:${PORT}\n`);
  console.log("  /v1/skills        — GET, POST");
  console.log("  /v1/skills/:id    — PUT, DELETE");
});
