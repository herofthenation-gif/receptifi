import { Phone, MessageCircle, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SubscribeForm } from "@/components/subscribe-form"

/* ─── AI services ────────────────────────────────────────────── */
type AiService = {
  Icon: LucideIcon
  name: string
  detail: string
  tips: string
  source: "aria_tips" | "chat_tips" | "followup_tips"
}

const aiServices: AiService[] = [
  {
    Icon: Phone,
    name: "Aria, Your AI Receptionist",
    detail:
      "Aria answers every call, day or night, and books the appointment straight into your calendar. No voicemail, no hold music, no lead lost because you were on another job or it was 9pm on a Sunday.",
    tips: "Get free phone coverage tips",
    source: "aria_tips",
  },
  {
    Icon: MessageCircle,
    name: "AI Website Chat",
    detail:
      "The same AI answering questions in this chat window lives on your own site, engaging every visitor and capturing their contact info the second they land, instead of a silent bounce you never even hear about.",
    tips: "Get free chat setup tips",
    source: "chat_tips",
  },
  {
    Icon: RefreshCw,
    name: "AI-Powered Follow-Up",
    detail:
      "Almost nobody buys on the first touch, they go quiet, and most businesses just let them. Our system emails and texts on a set schedule until they book or say no, so a cold lead never quietly disappears again.",
    tips: "Get free follow-up tips",
    source: "followup_tips",
  },
]

/* ─── Section ────────────────────────────────────────────────── */
export function ReceptifiAi() {
  return (
    <section className="bg-section-alt py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Receptifi AI
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            For businesses that can&rsquo;t afford a missed lead.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            A missed call, an unanswered website visitor, a lead that goes cold after one email, these are silent losses. They never show up on a report, they just quietly become someone else&rsquo;s customer. Receptifi runs three AI systems so nothing falls through.
          </p>
        </div>

        {/* Service panels */}
        <div className="mx-auto mt-16 max-w-3xl space-y-5">
          {aiServices.map(({ Icon, name, detail, tips, source }) => (
            <div
              key={name}
              className="glass-card flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-start sm:p-10"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/6">
                <Icon className="size-5.5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {detail}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <SubscribeForm source={source} label={tips} buttonLabel="Send them" compact />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
