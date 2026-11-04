export const ADMIN_SESSION_COOKIE = "receptifi_admin_session";

/**
 * The cookie stores a fixed session token (env var, not the password itself)
 * so the actual password never rides along on every subsequent request.
 */
export function isValidAdminSession(cookieValue: string | undefined): boolean {
  const expected = process.env.ADMIN_SESSION_TOKEN;
  return !!expected && cookieValue === expected;
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && password === expected;
}

/**
 * Self-defense for admin API routes, same pattern as assertCronAuth: proxy.ts
 * already gates the page route, but the route handler must not trust that
 * alone (e.g. a matcher typo shouldn't silently expose the leads table).
 */
export function assertAdminSession(req: Request): Response | null {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`));
  if (!isValidAdminSession(match?.[1])) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}
