"use client";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "bot" | "user";
  content: string;
}

const SUGGS = [
  "How does Receptifi work?",
  "What's the pricing?",
  "Can it handle insurance verification?",
  "Is there a bilingual option?",
  "How do I get started?",
];

function escapeHTML(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));
}

function format(text: string) {
  return escapeHTML(text)
    .split(/\n{2,}/)
    .map(
      (p) =>
        "<p>" +
        p
          .replace(/\n/g, "<br/>")
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") +
        "</p>"
    )
    .join("");
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [suggsVisible, setSuggsVisible] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            content:
              "Hi! I'm Receptifi's AI assistant 👋\n\nI can answer questions about how we work, pricing, the bilingual option, or how to get started. What would you like to know?",
          },
        ]);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function openChat() {
    setOpen(true);
    setSeen(true);
    setTimeout(() => inputRef.current?.focus(), 280);
  }

  function closeChat() {
    setOpen(false);
  }

  async function submit(text: string) {
    text = text.trim();
    if (!text) return;

    setSuggsVisible(false);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    const nextHistory = [...history, { role: "user", content: text }];
    setHistory(nextHistory);
    setInput("");
    setDisabled(true);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: nextHistory }),
      });
      const data = await res.json();
      const answer =
        data.reply?.trim() ||
        "I'm having trouble reaching the server — please try again or book a demo and our team will follow up.";
      setMessages((prev) => [...prev, { role: "bot", content: answer }]);
      setHistory((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Hmm, I couldn't reach the server. You can still book a demo and our team will follow up with you directly.",
        },
      ]);
    } finally {
      setTyping(false);
      setDisabled(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  function autosize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(120, e.target.scrollHeight) + "px";
  }

  return (
    <>
      <button
        className="chat-fab"
        aria-label={open ? "Close chat" : "Open chat"}
        data-open={open ? "1" : "0"}
        data-seen={seen ? "1" : "0"}
        onClick={open ? closeChat : openChat}
      >
        <span className="chat-notify" />
        <svg
          className="icon-chat"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <svg
          className="icon-close"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="chat-panel"
        data-open={open ? "1" : "0"}
        role="dialog"
        aria-label="Receptifi assistant"
        aria-modal="true"
      >
        <div className="chat-hd">
          <div className="av">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </div>
          <div className="nm">
            <b>Receptifi Assistant</b>
            <span><i />Online · Replies instantly</span>
          </div>
          <button className="x" onClick={closeChat} aria-label="Close chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg ${msg.role}`}
              dangerouslySetInnerHTML={{ __html: format(msg.content) }}
            />
          ))}
          {typing && (
            <div className="chat-typing">
              <i /><i /><i />
            </div>
          )}
          {suggsVisible && messages.length > 0 && !typing && (
            <div className="chat-suggs">
              {SUGGS.map((s) => (
                <button
                  key={s}
                  className="chat-sugg"
                  type="button"
                  onClick={() => submit(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            rows={1}
            placeholder="Ask anything about Receptifi…"
            value={input}
            onChange={autosize}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-send"
            aria-label="Send"
            disabled={disabled || !input.trim()}
            onClick={() => submit(input)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <div className="chat-foot">Powered by AI · <b>Receptifi</b></div>
      </div>
    </>
  );
}
