export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {/* Icon mark */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden
      >
        <rect width="34" height="34" rx="8" fill="var(--color-primary)" />
        {/* R letterform — stem + bowl + leg */}
        <path
          d="M10 9 L10 25
             M10 9 L18 9 C23 9 23 18 18 18 L10 18
             M15 18 L23 25"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Signal arc — top right, subtle */}
        <path
          d="M26 10 Q29 14 26 18"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      {/* Wordmark */}
      <span className="text-lg font-extrabold uppercase tracking-[0.2em] text-foreground">
        Recept<span className="text-primary">ifi</span>
      </span>
    </a>
  )
}
