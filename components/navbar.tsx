"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

const links = [
  { label: "Systems", href: "/platform" },
  { label: "Coaching", href: "/services" },
  { label: "How We Work", href: "/case-studies" },
]

export function Navbar({ overDark = false }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Only the homepage has a dark hero behind the transparent, unscrolled
  // navbar — flip it into the dark token scope there so the logo/links stay
  // legible, then let it revert once it's sitting on the white bg-background.
  const overDarkContent = overDark && !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${overDarkContent ? "dark" : ""} ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            render={<a href="/book" />}
            nativeButton={false}
            className="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            Book a Call
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground hover:bg-card hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button
              render={<a href="/book" onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-3 w-full rounded-full bg-primary font-semibold text-primary-foreground"
            >
              Book a Call
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
