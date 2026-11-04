import { ADMIN_SESSION_COOKIE, checkAdminPassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };
  if (!password || !checkAdminPassword(password)) {
    return Response.json({ error: "wrong password" }, { status: 401 });
  }

  const res = Response.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    [
      `${ADMIN_SESSION_COOKIE}=${process.env.ADMIN_SESSION_TOKEN}`,
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      `Max-Age=${60 * 60 * 24 * 30}`,
    ].join("; ")
  );
  return res;
}
