/**
 * Vercel attaches `Authorization: Bearer $CRON_SECRET` automatically to
 * requests it makes to invoke a cron-configured route, when CRON_SECRET is
 * set as a project env var. Returns a 401 Response if the check fails, or
 * null if the request is authorized.
 */
export function assertCronAuth(req: Request): Response | null {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return Response.json({ error: "CRON_SECRET is not configured" }, { status: 500 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${expected}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}
