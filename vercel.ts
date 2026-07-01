import { type VercelConfig } from "@vercel/config/v1";

// Compiled to vercel.json automatically by `vercel build`/`vercel dev`/`vercel deploy`.
// Both crons run once daily — safe on Vercel Hobby's once-daily cron limit.
// source-leads runs first so freshly-sourced leads with scraped emails are
// eligible for send-outreach 30 minutes later the same day.
export const config: VercelConfig = {
  crons: [
    { path: "/api/cron/source-leads", schedule: "0 13 * * *" },
    { path: "/api/cron/send-outreach", schedule: "30 13 * * *" },
  ],
};
