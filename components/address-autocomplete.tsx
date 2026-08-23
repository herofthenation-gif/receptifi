"use client"

import { useEffect, useRef, useState } from "react"
import { loadGoogleMapsPlaces, type GmpSelectEvent, type PlaceAutocompleteElementInstance } from "@/lib/google-maps-loader"

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string) => void
}

const INPUT_CLASSES =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"

// Renders Google's PlaceAutocompleteElement once NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
// is configured. Falls back to a plain text input otherwise so the lead form
// never breaks on a missing key.
export function AddressAutocomplete({ value, onChange }: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<PlaceAutocompleteElementInstance | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (!apiKey || !containerRef.current) return
    let cancelled = false

    loadGoogleMapsPlaces(apiKey)
      .then(({ PlaceAutocompleteElement }) => {
        if (cancelled || !containerRef.current) return

        const element = new PlaceAutocompleteElement({ types: ["address"] })
        element.classList.add("receptifi-address-input")

        element.addEventListener("gmp-select", (async (event: Event) => {
          const { placePrediction } = event as GmpSelectEvent
          const place = placePrediction.toPlace()
          await place.fetchFields({ fields: ["formattedAddress"] })
          onChange(place.formattedAddress ?? "")
        }) as EventListener)

        containerRef.current.appendChild(element)
        elementRef.current = element
        setReady(true)
      })
      .catch((err) => {
        console.error("Google Maps Places failed to load:", err)
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      elementRef.current?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  if (!apiKey || failed) {
    return (
      <input
        id="address"
        type="text"
        autoComplete="street-address"
        placeholder="123 Main St, Riverside, CA"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASSES}
      />
    )
  }

  return (
    <div>
      <div ref={containerRef} className="receptifi-address-autocomplete" />
      {!ready && <div className={`${INPUT_CLASSES} animate-pulse text-muted-foreground/50`}>Loading...</div>}
      <style jsx global>{`
        .receptifi-address-autocomplete gmp-place-autocomplete,
        .receptifi-address-input {
          --gmpx-color-surface: transparent;
          --gmpx-color-on-surface: var(--foreground);
          --gmpx-color-on-surface-variant: color-mix(in srgb, var(--foreground) 50%, transparent);
          --gmpx-color-primary: var(--primary);
          --gmpx-font-family-base: inherit;
          --gmpx-font-size-base: 1rem;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
