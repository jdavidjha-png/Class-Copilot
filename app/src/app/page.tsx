import { Suspense } from "react";

type Health = { status: string; database: string; time?: string };

async function getHealth(): Promise<Health> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/health`, {
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { status: "error", database: "server not reachable" };
  }
}

async function HealthStatus() {
  const health = await getHealth();
  const ok = health.status === "ok";

  return (
    <p className={ok ? "text-green-600" : "text-red-600"}>
      Server: {health.status} · Database: {health.database}
    </p>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Coaching Platform</h1>
      <Suspense fallback={<p className="text-gray-500">Checking server...</p>}>
        <HealthStatus />
      </Suspense>
    </main>
  );
}