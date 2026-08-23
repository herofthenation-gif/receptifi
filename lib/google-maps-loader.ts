"use client"

// Lazily injects the official Google Maps JS bootstrap loader and resolves
// the "places" library via google.maps.importLibrary. Cached so the script
// only loads once no matter how many AddressAutocomplete inputs are on a page.
// Docs: https://developers.google.com/maps/documentation/javascript/load-maps-js-api

export interface PlaceResult {
  formattedAddress?: string | null
  addressComponents?: Array<{ longText: string; shortText: string; types: string[] }> | null
  fetchFields: (options: { fields: string[] }) => Promise<void>
}

export interface GmpSelectEvent extends Event {
  placePrediction: { toPlace: () => PlaceResult }
}

export type PlaceAutocompleteElementInstance = HTMLElement

export interface PlacesLibrary {
  PlaceAutocompleteElement: new (options?: {
    types?: string[]
    componentRestrictions?: { country: string | string[] }
  }) => PlaceAutocompleteElementInstance
}

interface GoogleMapsNamespace {
  maps: {
    importLibrary: (library: "places") => Promise<PlacesLibrary>
  }
}

declare global {
  interface Window {
    google?: GoogleMapsNamespace
    __receptifiGoogleMapsReady?: () => void
  }
}

let placesLibraryPromise: Promise<PlacesLibrary> | null = null

export function loadGoogleMapsPlaces(apiKey: string): Promise<PlacesLibrary> {
  if (placesLibraryPromise) return placesLibraryPromise

  placesLibraryPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.importLibrary) {
      window.google.maps.importLibrary("places").then(resolve).catch(reject)
      return
    }

    const params = new URLSearchParams({ key: apiKey, v: "weekly", loading: "async" })
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}&libraries=places&callback=__receptifiGoogleMapsReady`

    window.__receptifiGoogleMapsReady = () => {
      window.google!.maps.importLibrary("places").then(resolve).catch(reject)
    }

    script.onerror = () => reject(new Error("Failed to load Google Maps JS API"))
    document.head.appendChild(script)
  })

  return placesLibraryPromise
}
