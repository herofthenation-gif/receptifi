"use client"

import { useEffect, useRef, useState } from "react"

interface HoursNoteProps {
  children: string
  note: string
}

// Highlighted inline text that reveals a small popover on tap/hover/focus.
export function HoursNote({ children, note }: HoursNoteProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-sm bg-primary/15 px-1 font-medium text-primary underline decoration-primary/40 decoration-dotted underline-offset-4 transition-colors hover:bg-primary/20"
        aria-expanded={open}
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="glass-card absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-xl p-3 text-left text-sm font-normal leading-snug text-foreground normal-case"
        >
          {note}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-border" />
        </span>
      )}
    </span>
  )
}
