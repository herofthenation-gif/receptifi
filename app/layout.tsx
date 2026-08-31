import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display, Sora } from 'next/font/google'
import './globals.css'
import { ChatLoader } from '@/components/chat-loader'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})
// Geometric sans for the wordmark/brand mark, matching the quiet-luxury
// rebrand's "bold, wide-tracked geometric sans" spec.
const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Receptifi: AI Consultant for Local Service Businesses',
  description:
    'Receptifi is an AI consulting practice for local service businesses. A free audit finds what\'s costing you customers, calls, site, reviews, follow-up, real Google rankings. Then you choose: we build and run the fix, or we teach you to build it yourself.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
}

// Local SEO: grounds Receptifi in the Inland Empire for local search/maps
// ranking while still describing nationwide service (see areaServed).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Receptifi',
  description:
    "AI consulting practice for local service businesses. A free audit finds what's costing you customers, then we build and run the fix or teach you to.",
  url: 'https://receptifi.net',
  telephone: '+1-951-625-1893',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Moreno Valley',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Riverside, CA' },
    { '@type': 'City', name: 'San Bernardino, CA' },
    { '@type': 'City', name: 'Moreno Valley, CA' },
    { '@type': 'City', name: 'Ontario, CA' },
    { '@type': 'City', name: 'Rancho Cucamonga, CA' },
    { '@type': 'City', name: 'Corona, CA' },
    { '@type': 'AdministrativeArea', name: 'Inland Empire, CA' },
    { '@type': 'State', name: 'California' },
    { '@type': 'Country', name: 'United States' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} ${playfair.variable} ${sora.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
        <ChatLoader />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
