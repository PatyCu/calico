export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(new URL("/health", process.env.BACKEND_URL ?? "http://127.0.0.1:8080"), {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
      redirect: "error",
    });
    if (!response.ok || (await response.json()).status !== "UP") {
      throw new Error("Unexpected health response");
    }
    return Response.json({ status: "UP" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ status: "DOWN" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
