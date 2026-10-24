export async function sendMessage(message: string): Promise<string> {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: AbortSignal.timeout(5000),
  });
  const body: unknown = await response.json();
  if (!response.ok || typeof body !== "object" || body === null || !("reply" in body) || typeof body.reply !== "string") {
    throw new Error("Unable to send. Check that the backend is running and try again.");
  }
  return body.reply;
}
