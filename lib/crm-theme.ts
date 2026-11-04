import type { CSSProperties } from "react";

// Scoped to the CRM admin pages only. The marketing site has its own
// (light) theme tokens in globals.css and must not be touched. Shared by
// app/crm/dashboard/page.tsx and app/crm/seo/.
export const CRM_THEME = {
  "--bg": "#05070d",
  "--ink": "#e8eef9",
  "--ink-dim": "#9aa5b8",
  "--ink-faint": "rgba(232,238,249,.55)",
  "--hair": "rgba(255,255,255,.08)",
  "--hair-strong": "rgba(255,255,255,.14)",
  "--accent-2": "#60a5fa",
} as CSSProperties;
