import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (isValidAdminSession(session)) return NextResponse.next();

  // API routes: JSON 401, not a redirect — a redirect replays POST/PATCH/
  // DELETE against the login page (wrong method) instead of failing cleanly,
  // and fetch() would otherwise "succeed" with the login page's HTML body.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/crm/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/crm/dashboard/:path*",
    "/api/admin/leads/:path*",
    "/saas-research/:path*",
    "/api/saas-research/:path*",
    "/crm/seo/:path*",
    "/api/admin/seo-clients/:path*",
  ],
};
