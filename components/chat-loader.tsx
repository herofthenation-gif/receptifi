"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
)

export function ChatLoader() {
  const pathname = usePathname()
  // Generated client preview sites (/preview/[slug]) are presented as the
  // lead's own website — Receptifi's chat widget doesn't belong on them.
  if (pathname?.startsWith("/preview")) return null
  return <ChatWidget />
}
