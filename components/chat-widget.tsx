"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, ChevronRight } from "lucide-react"
import { Logo } from "@/components/logo"

/* ─── Types ──────────────────────────────────────────────────── */
type Message = { role: "user" | "assistant"; content: string }

/* ─── FAQ quick-reply chips ─────────────────────────────────── */
const faqs = [
  "What happens on the free audit call?",
  "Do you fix websites too?",
  "How fast can you start?",
]

/* ─── Simple markdown-ish renderer ──────────────────────────── */
function Bubble({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean)
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const bold = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: bold }} />
        )
      })}
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────── */
export function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Receptifi assistant. We're an AI-driven consulting practice — free audit call, then we fix whatever's actually costing you customers. Ask me anything.",
    },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history, loading])

  async function send(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: "user", content: text.trim() }
    const next = [...history, userMsg]
    setHistory(next)
    setInput("")
    setLoading(true)

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: next }),
      })
      const data = await res.json()
      setHistory([...next, { role: "assistant", content: data.reply }])
    } catch {
      setHistory([
        ...next,
        {
          role: "assistant",
          content:
            "Something went wrong on my end. Please try again or book a call directly — we respond within one business day.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const showFaqs = history.length <= 1

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-4 z-50 flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95 sm:bottom-6 sm:right-6 sm:size-14"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <MessageCircle className="size-5" />
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={`fixed bottom-20 right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-soft-lg transition-all duration-300 sm:bottom-24 sm:right-6 sm:w-[24rem] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ maxHeight: "min(80vh, 36rem)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-primary px-5 py-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
            <MessageCircle className="size-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary-foreground">Receptifi Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-300 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-400" />
              </span>
              <span className="text-[10px] text-primary-foreground/70">Online now</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-7 items-center justify-center rounded-full text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {history.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border bg-muted/40 text-foreground"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bubble text={msg.content} />
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm border border-border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ chips */}
          {showFaqs && !loading && (
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Common questions
              </p>
              {faqs.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/4"
                >
                  {q}
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2 transition-colors focus-within:border-primary">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything..."
              disabled={loading}
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
            >
              <Send className="size-3.5" />
            </button>
          </div>
          <p className="mt-2 text-center text-[9px] text-muted-foreground/50">
            Powered by Receptifi AI
          </p>
        </div>
      </div>
    </>
  )
}
