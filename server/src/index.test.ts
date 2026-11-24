import { describe, expect, it } from "vitest";
import app, { type Bindings } from "./index";

const fakeDb = {
  prepare: () => ({ first: async () => ({ ok: 1 }) }),
} as unknown as Bindings["DB"];

describe("GET /api/health", () => {
  it("reports ok when the database answers", async () => {
    const res = await app.request("/api/health", {}, { DB: fakeDb });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok", db: true });
  });
});
