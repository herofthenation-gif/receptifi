export async function POST(request: Request) {
  const data = await request.json();

  // Log the lead server-side (replace with your CRM / email integration)
  console.log("[Receptifi Demo Request]", data);

  return Response.json({ ok: true });
}
