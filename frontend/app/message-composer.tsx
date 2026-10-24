"use client";

import { useMessage } from "./use-message";

export function MessageComposer() {
  const { message, setMessage, reply, error, sending, send } = useMessage();

  return (
    <section className="empty-state" aria-labelledby="composer-title">
      <h2 id="composer-title">Your conversation starts here</h2>
      <p>Send a sentence to the backend and see its reply.</p>
      <form onSubmit={(event) => { event.preventDefault(); void send(); }}>
        <textarea aria-label="Message" placeholder="What would you like to explore?" rows={3} maxLength={2000} value={message} onChange={(event) => setMessage(event.target.value)} disabled={sending} />
        <div className="composer-footer"><span>Up to 2,000 characters</span><button type="submit" disabled={sending || !message.trim()}>{sending ? "Sending…" : "Send"}</button></div>
      </form>
      <div role="status" aria-live="polite">
        {sending && <p className="message-result">Waiting for the backend…</p>}
        {reply !== null && <p className="message-result"><strong>Backend</strong><br />{reply}</p>}
      </div>
      {error && <p className="message-result message-error" role="alert">{error}</p>}
    </section>
  );
}
