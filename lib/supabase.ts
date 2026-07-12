import { createClient } from "@supabase/supabase-js";
import type { GeneratedSite } from "@/lib/outreach/site-generator";

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
  outreach_touch: number | null;
  outreach_sent_at: string | null;
  outreach_replied: boolean | null;
  place_id: string | null;
  website: string | null;
  rating: number | null;
  review_count: number | null;
  vertical: string | null;
  city: string | null;
  region: string | null;
  hours_json: GooglePlacesPeriod[] | null;
  priority_tier: number | null;
  source: string | null;
  outreach_last_error: string | null;
  address: string | null;
  website_status: "none" | "outdated" | "good" | null;
  site_quality_score: number | null;
  offer_type: "web" | "reviews" | "crm" | "voice" | null;
  preview_slug: string | null;
  generated_site: GeneratedSite | null;
  quality_checked_at: string | null;
  unsubscribed_at: string | null;
  email_scrape_attempted_at: string | null;
}

export interface GooglePlacesPeriod {
  open: { day: number; hour: number; minute: number };
  close: { day: number; hour: number; minute: number };
}
