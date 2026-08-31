import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {/* Icon mark — signal arcs converging on a node, gold on black */}
      <Image
        src="/logo-mark.png"
        alt=""
        width={34}
        height={34}
        className="rounded-[8px]"
        priority
      />

      {/* Wordmark */}
      <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.2em] text-foreground">
        Recept<span className="text-primary">ifi</span>
      </span>
    </a>
  )
}
