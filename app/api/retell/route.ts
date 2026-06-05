const AGENT_ID = "agent_e84e788f044e7ce40cd15f522d";

export async function POST() {
  const apiKey = process.env.RETELL_API_KEY;

  if (!apiKey || apiKey === "your_retell_api_key_here") {
    return Response.json(
      { error: "RETELL_API_KEY is not configured in .env.local" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agent_id: AGENT_ID }),
  });

  if (!res.ok) {
    const text = await res.text();
    return Response.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return Response.json({ accessToken: data.access_token });
}
