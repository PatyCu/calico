"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

type Connection = "checking" | "connected" | "error";

async function getConnection(signal: AbortSignal): Promise<Connection> {
  try {
    const response = await fetch("/api/health", {
      cache: "no-store",
      signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
    });
    return response.ok && (await response.json()).status === "UP" ? "connected" : "error";
  } catch {
    return "error";
  }
}

export default function NewConversation() {
  const [connection, setConnection] = useState<Connection>("checking");
  const activeRequest = useRef<AbortController | null>(null);

  const checkConnection = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const result = await getConnection(controller.signal);
    if (!controller.signal.aborted) setConnection(result);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    activeRequest.current = controller;
    void getConnection(controller.signal).then((result) => {
      if (!controller.signal.aborted) setConnection(result);
    });
    return () => activeRequest.current?.abort();
  }, []);

  const label = { checking: "Checking connection…", connected: "Backend connected", error: "Backend unavailable" }[connection];

  return (
    <div className="workspace">
      <header>
        <div className="brand-group">
          <Link className="brand" href="/" aria-label="Calico home">
            <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10 4 3l6 4h4l6-4-1 7c2 3 1 10-7 10S3 13 5 10Z"/><path d="M8 12h.01M16 12h.01M10 16l2 1 2-1"/></svg></span>
            calico
          </Link>
          <span className="tag">Early preview</span>
        </div>
        <ThemeSwitcher />
      </header>
      <main>
        <div className="conversation-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg></div>
        <p className="eyebrow">Your workspace</p>
        <h1>New Conversation</h1>
        <p className="intro">A space to think, explore, and create.</p>
        <section className="empty-state" aria-labelledby="empty-title">
          <h2 id="empty-title">Your conversation starts here</h2>
          <p>Messaging will arrive in a future update.</p>
          <textarea aria-label="Message" placeholder="What would you like to explore?" disabled rows={3} />
          <div className="composer-footer"><span>Messaging coming soon</span><button disabled>Send</button></div>
        </section>
        <div className="connection">
          <p role="status" aria-live="polite"><span className={`dot ${connection}`} aria-hidden="true" />{label}</p>
          <button className="retry" onClick={() => { setConnection("checking"); void checkConnection(); }} disabled={connection === "checking"}>Check again</button>
        </div>
        {connection === "error" && <p className="error-hint">Start the backend, then check again.</p>}
      </main>
      <footer>Calico · A little space for your next idea.</footer>
    </div>
  );
}
