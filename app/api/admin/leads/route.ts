import { supabaseAdmin } from "@/lib/supabase-admin";
import { assertAdminSession } from "@/lib/admin-auth";
import type { Lead } from "@/lib/supabase";

/**
 * Server-side proxy for the CRM dashboard's lead CRUD. Replaces the browser
 * talking to Supabase directly with the anon key: the anon key is public
 * (shipped in the JS bundle), so any RLS policy that lets it read/write
 * leads is really a public API for lead PII. Gated by the admin session
 * cookie, same one proxy.ts checks for the page itself.
 */

// PostgREST caps a single response at 1000 rows regardless of table size, so
// a plain select silently truncates once the leads table (or a filtered
// slice like needs_review) passes that count. Page through in fixed-size
// chunks until a page comes back short, which reliably signals the end.
const PAGE_SIZE = 1000;

export async function GET(req: Request) {
  const authError = assertAdminSession(req);
  if (authError) return authError;

  const status = new URL(req.url).searchParams.get("status");
  const leads: Lead[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    let query = supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) return Response.json({ error: error.message }, { status: 500 });
    leads.push(...((data ?? []) as Lead[]));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return Response.json({ leads });
}

export async function POST(req: Request) {
  const authError = assertAdminSession(req);
  if (authError) return authError;

  const { leads } = (await req.json()) as { leads?: Partial<Lead>[] };
  if (!leads?.length) return Response.json({ error: "leads array required" }, { status: 400 });

  const { error } = await supabaseAdmin.from("leads").insert(leads);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function PATCH(req: Request) {
  const authError = assertAdminSession(req);
  if (authError) return authError;

  const body = (await req.json()) as { id?: string; ids?: string[]; patch?: Partial<Lead> };
  if (!body.patch) return Response.json({ error: "patch required" }, { status: 400 });

  if (body.ids?.length) {
    const { error } = await supabaseAdmin.from("leads").update(body.patch).in("id", body.ids);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  }

  if (!body.id) return Response.json({ error: "id or ids required" }, { status: 400 });
  const { error } = await supabaseAdmin.from("leads").update(body.patch).eq("id", body.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const authError = assertAdminSession(req);
  if (authError) return authError;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
