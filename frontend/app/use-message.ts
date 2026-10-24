"use client";

import { useRef, useState } from "react";
import { sendMessage } from "./message-api";

export function useMessage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);

  async function send() {
    if (inFlight.current || !message.trim()) return;
    inFlight.current = true;
    setSending(true);
    setError(null);
    setReply(null);
    try {
      setReply(await sendMessage(message));
    } catch {
      setError("Unable to send. Check that the backend is running and try again.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return { message, setMessage, reply, error, sending, send };
}
