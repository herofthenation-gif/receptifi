import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type LeadStatus = "cold" | "warm" | "booked" | "closed";

export interface Lead {
  id: string;
  name: string;
  business_name: string | null;
  phone: string | null;
  email: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  booked_at: string | null;
}
