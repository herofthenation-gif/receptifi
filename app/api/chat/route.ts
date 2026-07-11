import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `You are the Receptifi Assistant — a friendly, professional AI on the Receptifi marketing website. Receptifi is an AI-driven consulting practice for local service businesses (dental offices are the primary focus today, expanding into restaurants, salons, and other service businesses). We don't sell one fixed product — we audit a business across four areas and fix whatever's actually costing them customers, in the right order:
- Voice: a 24/7 AI phone receptionist that answers every call, books appointments, and handles inquiries so nothing goes to voicemail.
- Website: a fast, booking-focused site rebuild for businesses whose site is outdated, slow, or not converting visitors.
- Reviews: automated review requests at the right moment, for businesses with a weak rating or too few Google reviews to compete.
- Booking/CRM: online booking plus automatic follow-up, for businesses with decent traffic but no system to capture and follow up on leads.

Facts to use accurately:
- Voice capability: handles insurance verification inquiries — collects provider, member ID, group number, DOB, then either warm-transfers to the office insurance coordinator or logs a structured ticket for follow-up (typically within one business day). Fluent English/Spanish, can switch mid-call. HIPAA-aware for healthcare; PCI-aware for payment-related conversations.
- Setup is about 2 weeks once an engagement starts. Onboarding is a ~20-minute call to train Receptifi on the business.
- The phone number forwards to Receptifi — after hours, when busy, or always (the business chooses).
- Integrates with practice management software (Dentrix, Open Dental and others), Google Calendar, and reservation systems.
- No fixed pricing — every engagement starts with a free audit call where we look at the business's actual site, reviews, booking flow, and phone coverage, then tell them exactly what's broken and what fixing it costs. Price is never quoted before that call, because it depends on what's actually needed.
- Average pickup is 0.3 seconds when Voice is in place; the average service business misses ~30% of incoming calls.

Tone: warm, confident, conversational — like a knowledgeable team member, not a FAQ page. Keep replies short (1–3 short paragraphs max), specific, and end with a gentle next step when natural — usually booking the free audit call. Never invent features that aren't listed above, and never quote a price. If asked something you don't know, say so and offer to connect them with the team.`;

export async function POST(request: Request) {
  const { history } = await request.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      reply: fallbackReply(history),
    });
  }

  const client = new Anthropic();

  const messages = (history as { role: string; content: string }[]).map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: SYSTEM,
    messages,
  });

  const reply =
    response.content[0].type === "text" ? response.content[0].text : "";

  return Response.json({ reply });
}

function fallbackReply(history: { role: string; content: string }[]): string {
  const last = history.at(-1)?.content?.toLowerCase() ?? "";

  if (last.includes("pric") || last.includes("cost") || last.includes("how much"))
    return "There's no fixed price to quote — we start with a free audit call, look at your actual site, reviews, booking flow, and phone coverage, then tell you exactly what's broken and what fixing it would cost. Want to grab a time for that call?";

  if (last.includes("insurance"))
    return "Yes! When a caller asks about coverage, our Voice service collects their provider, member ID, group number, and date of birth — then either warm-transfers to your insurance coordinator or logs a clean ticket for follow-up. The caller is told exactly when to expect a callback. Want to see how it'd work for your practice on a free audit call?";

  if (last.includes("bilingual") || last.includes("spanish"))
    return "Our Voice service is fluent in English and Spanish and can detect the caller's language and switch mid-call automatically — no separate phone number needed.";

  if (last.includes("website") || last.includes("web site") || last.includes("web ") || last.includes(" web"))
    return "If your website isn't converting visitors into bookings, that's one of the four things we fix — a fast, booking-focused rebuild, not a template. We look at your actual site on the free audit call and tell you if a rebuild is even the right move first.";

  if (last.includes("review"))
    return "If your Google rating or review count is holding you back, we automate review requests at the right moment so happy customers actually leave one. We check your current reviews on the free audit call before recommending anything.";

  if (last.includes("work") || last.includes("how"))
    return "We start with a free audit call: we look at your phone coverage, website, reviews, and booking/follow-up process, and tell you exactly what's costing you customers. Whatever we take on after that — Voice, Website, Reviews, or CRM/booking — Voice setup takes about 2 weeks and starts with a 20-minute onboarding call.";

  if (last.includes("start") || last.includes("sign up") || last.includes("audit") || last.includes("demo") || last.includes("call"))
    return "The best next step is a free audit call — no pitch, no pressure. We'll look at what's actually costing you customers and tell you what fixing it would take. Scroll up and hit \"Book a Free Audit\" and we'll get you on the calendar.";

  return "Great question! Receptifi is an AI-driven consulting practice — we audit your phone coverage, website, reviews, and booking process, then fix whatever's actually costing you customers. No fixed pricing; it's scoped on a free audit call. Want me to walk you through what that call covers, or how it works?";
}
