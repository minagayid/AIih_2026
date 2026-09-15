import { desc } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "../../../../../db";
import { notes } from "../../../db/schema";

const MAX_BODY_BYTES = 16_384;
const MAX_TITLE_CHARS = 120;
const MAX_CONTENT_CHARS = 4_000;
type DemoEnv = { DEMO_NOTES_ENABLED?: string };

function isDemoEnabled() {
  return (env as unknown as DemoEnv).DEMO_NOTES_ENABLED === "true";
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new RangeError("body-too-large");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("empty-body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new RangeError("body-too-large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function disabledResponse() {
  return Response.json({ error: "The public demo notes API is disabled." }, { status: 404 });
}

export async function GET() {
  if (!isDemoEnabled()) return disabledResponse();
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt), desc(notes.id))
      .limit(20);

    return Response.json({ notes: rows });
  } catch {
    return Response.json({ error: "The demo notes service is unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isDemoEnabled()) return disabledResponse();
  try {
    const payload = await readBoundedJson(request);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return Response.json({ error: "Request body must be an object." }, { status: 400 });
    }
    const input = payload as { title?: unknown; content?: unknown };
    if (typeof input.title !== "string" || (input.content !== undefined && typeof input.content !== "string")) {
      return Response.json({ error: "Title and content must be strings." }, { status: 400 });
    }
    const title = input.title.trim();
    const content = (input.content ?? "").trim();

    if (!title) {
      return Response.json({ error: "title is required" }, { status: 400 });
    }
    if (title.length > MAX_TITLE_CHARS || content.length > MAX_CONTENT_CHARS) {
      return Response.json({ error: "Title or content is too long." }, { status: 413 });
    }

    const db = getDb();
    const [note] = await db.insert(notes).values({ title, content }).returning();
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    if (error instanceof RangeError && error.message === "body-too-large") {
      return Response.json({ error: "Request body is too large." }, { status: 413 });
    }
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }
    return Response.json({ error: "The demo notes service is unavailable." }, { status: 503 });
  }
}
