import { Hono } from "hono";

export type Bindings = { DB: D1Database };

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/health", async (c) => {
  const row = await c.env.DB.prepare("SELECT 1 AS ok").first<{ ok: number }>();
  return c.json({ status: "ok", db: row?.ok === 1 });
});

export default app;
