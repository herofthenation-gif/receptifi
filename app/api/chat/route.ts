import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `You are the Receptifi Assistant — a friendly, professional AI on the Receptifi marketing website. Receptifi is an AI voice receptionist service that answers calls, books appointments, and handles inquiries 24/7 for service businesses. Dental offices are the primary focus today, with expansion into restaurants, salons and other service-based businesses.

Facts to use accurately:
- Beyond booking: handles insurance verification inquiries — collects provider, member ID, group number, DOB, then either warm-transfers to the office insurance coordinator or logs a structured ticket for follow-up (typically within one business day).
- Standard plan: $497/month — 24/7 AI voice receptionist, unlimited inbound calls, calendar integration, insurance verification intake, SMS confirmations, transcripts, HIPAA-aware infrastructure.
- Bilingual plan: $679/month — everything in Standard, plus a fluent English/Spanish receptionist that can switch mid-call, bilingual SMS templates, priority onboarding, dedicated success manager.
- Setup is about 2 weeks. Onboarding is a ~20-minute call to train Receptifi on the business.
- The phone number forwards to Receptifi — after hours, when busy, or always (the business chooses).
- Integrates with practice management software (Dentrix, Open Dental and others), Google Calendar, and reservation systems.
- No free trial today, but a live demo is available — encourage visitors to book one.
- Average pickup is 0.3 seconds; the average service business misses ~30% of incoming calls.
- HIPAA-aware for healthcare; PCI-aware for payment-related conversations.

Tone: warm, confident, conversational — like a knowledgeable team member, not a FAQ page. Keep replies short (1–3 short paragraphs max), specific, and end with a gentle next step when natural. Never invent features that aren't listed above. If asked something you don't know, say so and offer to connect them with the team.`;

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
    return "Receptifi has two plans:\n\n**Standard — $497/month:** 24/7 AI voice receptionist, unlimited calls, calendar integration, SMS confirmations, insurance verification intake, and HIPAA-aware infrastructure.\n\n**Bilingual — $679/month:** Everything in Standard, plus a fluent English/Spanish receptionist that can switch mid-call, bilingual SMS templates, priority onboarding, and a dedicated success manager.\n\nNo setup fees. No per-minute surprises. Want to book a demo?";

  if (last.includes("insurance"))
    return "Yes! When a caller asks about coverage, Receptifi collects their provider, member ID, group number, and date of birth — then either warm-transfers to your insurance coordinator or logs a clean ticket for follow-up. The caller is told exactly when to expect a callback. Want to see a live walkthrough?";

  if (last.includes("bilingual") || last.includes("spanish"))
    return "Our Bilingual plan ($679/month) includes a fluent English/Spanish AI receptionist that detects the caller's language automatically and can switch mid-call — no separate phone number needed. You also get bilingual SMS templates and priority onboarding.";

  if (last.includes("work") || last.includes("how"))
    return "Receptifi connects to your existing business number — calls can forward after hours, when busy, or always (your choice). The AI answers by your business name, handles scheduling, FAQs, insurance inquiries, and routes calls intelligently. Appointments write directly to your calendar in real time. Setup takes about 2 weeks and starts with a 20-minute onboarding call.";

  if (last.includes("start") || last.includes("sign up") || last.includes("demo"))
    return "The best next step is a quick demo — we'll show Receptifi answering a real call for your business in under 10 minutes. No commitment, no credit card. Scroll up and fill out the Book a Demo form and we'll reach out within one business day!";

  return "Great question! Receptifi is a 24/7 AI voice receptionist that answers every call, books appointments, and handles insurance inquiries — starting at $497/month. Want me to walk you through pricing, how it works, or set up a demo?";
}
