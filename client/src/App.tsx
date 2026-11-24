import { useEffect, useState } from "react";

type Health = { status: string; db: boolean };

export function App() {
  const [health, setHealth] = useState<Health | "error" | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => (res.ok ? (res.json() as Promise<Health>) : Promise.reject(res.status)))
      .then(setHealth)
      .catch(() => setHealth("error"));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Spendship</h1>
      <p>
        API:{" "}
        {health === null && "checking…"}
        {health === "error" && "unreachable"}
        {health && health !== "error" && `${health.status} (db: ${health.db ? "ok" : "down"})`}
      </p>
    </main>
  );
}
