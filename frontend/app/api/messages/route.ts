export async function POST(request: Request) {
  let message: unknown;
  try {
    const body: unknown = await request.json();
    message = typeof body === "object" && body !== null && "message" in body ? body.message : undefined;
  } catch {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    return Response.json({ error: "Enter a message of up to 2,000 characters." }, { status: 400 });
  }

  try {
    const response = await fetch(new URL("/messages", process.env.BACKEND_URL ?? "http://127.0.0.1:8080"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
      redirect: "error",
    });
    const body: unknown = await response.json();
    if (!response.ok || typeof body !== "object" || body === null || !("reply" in body) || typeof body.reply !== "string") {
      throw new Error("Unexpected message response");
    }
    return Response.json({ reply: body.reply }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Unable to send. Check that the backend is running and try again." }, { status: 503 });
  }
}
