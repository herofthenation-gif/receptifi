import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Receptifi",
  description: "How Receptifi collects, uses, and protects your personal information.",
}

const LAST_UPDATED = "June 21, 2026"
const CONTACT_EMAIL = "herofthenation@gmail.com"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 sm:pt-48 pb-24 sm:pb-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">

          <div className="mb-12">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Legal
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="prose-styles space-y-10">

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Who we are</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Receptifi is a revenue operations company that provides live answering, website design, reputation management, and lead tracking services to local businesses across the United States. We operate at receptifi.net. When this policy says "Receptifi," "we," "us," or "our," it means Receptifi.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">What information we collect</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We only collect information you give us directly. This happens when you fill out the booking form on our website. The information we collect includes:
              </p>
              <ul className="space-y-2">
                {[
                  "Your name",
                  "Your business email address",
                  "Your phone number (optional)",
                  "A description of your current business challenge (optional)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We also use Vercel Analytics, which collects anonymized data about page visits (such as page views and general geographic region) to help us understand how the site is being used. This data is aggregated and does not identify you personally.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">How we use your information</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We use the information you submit solely to:
              </p>
              <ul className="space-y-2">
                {[
                  "Prepare for and conduct your scheduled strategy call",
                  "Follow up with you if you do not complete your booking",
                  "Understand your business needs so we can provide relevant guidance",
                  "Contact you about Receptifi services you have expressed interest in",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We do not sell your information. We do not share it with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Where your information is stored</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Your information is stored securely in Supabase, a cloud database provider. When you submit the booking form, our team receives a notification via Resend, a transactional email service. You are then redirected to Calendly, a third-party scheduling platform, where their own privacy policy applies. We recommend reviewing{" "}
                <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                  Calendly's privacy policy
                </a>{" "}
                separately.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">How long we keep your information</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We retain your information for as long as it is needed to provide our services or follow up with you. If you ask us to delete your information, we will do so within 30 days. To request deletion, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Cookies</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our website does not use tracking cookies or advertising cookies. Vercel Analytics uses a privacy-first approach that does not rely on cookies to measure visits.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Your rights</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                You have the right to access, correct, or delete any personal information we hold about you. To exercise any of these rights, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Changes to this policy</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If we make material changes to this privacy policy, we will update the date at the top of this page. Continued use of our website after any changes means you accept the updated policy.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Contact</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Questions about this policy or how we handle your data? Email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
