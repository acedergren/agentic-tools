#!/usr/bin/env node

const baseUrl = (process.env.PLANE_BASE_URL || "https://api.plane.so").replace(/\/+$/, "");
const apiKey = process.env.PLANE_TOKEN || process.env.PLANE_API_KEY;
const accessToken = process.env.PLANE_ACCESS_TOKEN;
const workspaceSlug = process.env.PLANE_WORKSPACE_SLUG;

if (!apiKey && !accessToken) {
  console.error("Missing auth. Set PLANE_TOKEN for API key auth, or PLANE_ACCESS_TOKEN for OAuth bearer auth.");
  process.exit(2);
}

const headers = {
  Accept: "application/json",
};

if (apiKey) {
  headers["X-API-Key"] = apiKey;
} else {
  headers.Authorization = `Bearer ${accessToken}`;
}

async function requestJson(path) {
  const response = await fetch(`${baseUrl}${path}`, { headers });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text.slice(0, 300);
    }
  }
  return { response, body };
}

function summarizeUser(body) {
  if (!body || typeof body !== "object") {
    return "unknown user shape";
  }
  const email = body.email || body.user?.email || "(email unavailable)";
  const id = body.id || body.user?.id || "(id unavailable)";
  return `${email} [${id}]`;
}

try {
  const userResult = await requestJson("/api/v1/users/me/");
  if (!userResult.response.ok) {
    console.error(`Plane user smoke failed: HTTP ${userResult.response.status}`);
    console.error(JSON.stringify(userResult.body, null, 2));
    process.exit(1);
  }

  console.log(`Plane API auth OK at ${baseUrl}`);
  console.log(`Current user: ${summarizeUser(userResult.body)}`);

  if (workspaceSlug) {
    const projectPath = `/api/v1/workspaces/${encodeURIComponent(workspaceSlug)}/projects/?per_page=1`;
    const projectResult = await requestJson(projectPath);
    if (!projectResult.response.ok) {
      console.error(`Workspace check failed for ${workspaceSlug}: HTTP ${projectResult.response.status}`);
      console.error(JSON.stringify(projectResult.body, null, 2));
      process.exit(1);
    }

    const count = typeof projectResult.body?.total_results === "number"
      ? projectResult.body.total_results
      : projectResult.body?.count;
    console.log(`Workspace ${workspaceSlug} reachable; project result count: ${count ?? "unknown"}`);
  }
} catch (error) {
  console.error(`Plane smoke check failed: ${error.message}`);
  process.exit(1);
}
