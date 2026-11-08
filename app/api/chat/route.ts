import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `You are the Receptifi Assistant — a friendly, professional AI on the Receptifi marketing website. Receptifi is an AI consulting practice for local service businesses in the Inland Empire (Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, Corona), also serving businesses nationwide. We don't sell one fixed product — every engagement starts with a free audit across five channels, and we run or teach whichever ones are actually worth the business's budget:
- General SEO: organic rankings, built around what customers actually search, not just the business's name.
- Local SEO: the Google Business Profile and map pack, where most local searches actually convert.
- Google Ads: paid search campaigns sent to pages built for that exact search, not the homepage.
- Meta Ads: Facebook and Instagram ads built around real job photos, not stock creative.
- AI SEO: getting named when someone asks ChatGPT, Google AI Mode, Perplexity, Gemini, Claude, or Grok who to call. Included in every plan, no exceptions — it's not optional anymore.

Facts to use accurately:
- Two ways to work with Receptifi: "Systems" is done-for-you, $3,000/month, covering whichever of the five channels the audit shows are worth running, built into one plan. "Coaching" is $1,500/month, hands-on sessions where Receptifi teaches the business owner's own team to run it themselves.
- The free audit looks at current rankings, ads, listings, the live market, and what AI search already says about the business — and the business gets the findings either way, even if they don't sign up.
- Price is never quoted before the audit, because it depends on which channels are actually worth running.

Tone: warm, confident, conversational — like a knowledgeable team member, not a FAQ page. Keep replies short (1–3 short paragraphs max), specific, and end with a gentle next step when natural — usually booking the free audit. Never invent features, prices, or capabilities that aren't listed above, and never quote a price beyond the two plan rates given. If asked something you don't know, say so and offer to connect them with the team.`;

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

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: SYSTEM,
      messages,
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ reply });
  } catch (error) {
    console.error("Anthropic API call failed, falling back:", error);
    return Response.json({ reply: fallbackReply(history) });
  }
}

function fallbackReply(history: { role: string; content: string }[]): string {
  const last = history.at(-1)?.content?.toLowerCase() ?? "";

  if (last.includes("pric") || last.includes("cost") || last.includes("how much"))
    return "Two ways to work with us: Systems is done-for-you at $3,000/month, Coaching is hands-on at $1,500/month. Which channels you actually need gets figured out in a free audit first — want to grab a time for that call?";

  if (last.includes("google ad") || last.includes("ppc") || last.includes("paid search"))
    return "We build and manage Google Ads campaigns sent to pages built for the exact search, not your homepage, so budget isn't wasted on clicks that were never going to call. It's one of the five channels checked in your free audit.";

  if (last.includes("meta") || last.includes("facebook") || last.includes("instagram"))
    return "Meta Ads built around real job photos and before-and-afters, kept fresh so the creative doesn't go stale. It's one of the five channels checked in your free audit.";

  if (last.includes("ai seo") || last.includes("chatgpt") || last.includes("perplexity") || last.includes("gemini"))
    return "AI SEO means getting named when someone asks ChatGPT, Perplexity, Gemini, or Google AI Mode who to call, not just Google search. It's included in every Systems plan, no exceptions — want to see more on how it works?";

  if (last.includes("local seo") || last.includes("map pack") || last.includes("google business"))
    return "Local SEO is about winning the map pack — fully building out your Google Business Profile and getting a steady stream of reviews, since most local searches never scroll past it. It's one of the five channels checked in your free audit.";

  if (last.includes("seo"))
    return "General SEO is about ranking for what customers actually search, not just your business name — site structure, content, and backlinks that are worth having. It's one of the five channels checked in your free audit.";

  if (last.includes("coach"))
    return "Coaching is $1,500/month, hands-on sessions where we teach you or your team to run your own marketing across all five channels, instead of us running it for you. Want to see what that covers?";

  if (last.includes("work") || last.includes("how"))
    return "We start with a free audit: current rankings, ads, listings, and what AI search already says about you. Whichever of the five channels, General SEO, Local SEO, Google Ads, Meta Ads, or AI SEO, are actually worth running get built into one plan, either done-for-you (Systems) or taught to you (Coaching).";

  if (last.includes("start") || last.includes("sign up") || last.includes("audit") || last.includes("demo") || last.includes("call"))
    return "The best next step is a free audit — no pitch, no pressure. We'll look at what's actually costing you customers and tell you what fixing it would take. Scroll up and hit \"Book a Free Audit\" and we'll get you on the calendar.";

  return "Great question! Receptifi is an AI consulting practice for local service businesses — we audit five channels (General SEO, Local SEO, Google Ads, Meta Ads, AI SEO), then run or teach whichever ones are actually worth your budget. No fixed pricing; it's scoped on a free audit. Want me to walk you through what that covers?";
}
