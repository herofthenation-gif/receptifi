import { assertCronAuth } from "@/lib/outreach/cron-auth";
import { isOutreachPaused, setOutreachPaused } from "@/lib/outreach/kill-switch";

/**
 * Manual kill switch for both outreach crons. Gated by the same CRON_SECRET
 * used for the cron endpoints, so only whoever holds that secret can flip it.
 *
 * GET  ?state          -> { paused: boolean }
 * POST ?action=pause    -> pauses, no more sourcing or sending until resumed
 * POST ?action=resume   -> resumes
 */
export async function GET(req: Request) {
  const authError = assertCronAuth(req);
  if (authError) return authError;
  return Response.json({ paused: await isOutreachPaused() });
}

export async function POST(req: Request) {
  const authError = assertCronAuth(req);
  if (authError) return authError;

  const action = new URL(req.url).searchParams.get("action");
  if (action !== "pause" && action !== "resume") {
    return Response.json({ error: 'action must be "pause" or "resume"' }, { status: 400 });
  }

  const reason = new URL(req.url).searchParams.get("reason") ?? undefined;
  await setOutreachPaused(action === "pause", reason);
  return Response.json({ paused: action === "pause" });
}
