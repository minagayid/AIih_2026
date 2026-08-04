import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", "test-" + process.pid + "-" + Date.now());
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the AIih workshop invitation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AIih 2026/i);
  assert.match(html, /Can vision-language models tell when a dental radiograph/i);
  assert.match(html, /Quick review/i);
  assert.match(html, /Prepare contribution/i);
  assert.match(html, /ashhadulislam@gmail\.com/i);
  assert.match(html, /minagayid@gmail\.com/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});
