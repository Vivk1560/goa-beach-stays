import { CheckCircle2, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig, whatsappUrl } from '@/lib/site-config'

const REASONS = [
  {
    heading: 'Villas, resorts and cottages, one enquiry away',
    description:
      'Private-pool villas, boutique resorts and cosy cottages across North and South Goa are all listed in one place, so you can compare options instead of hopping between OTA tabs.',
  },
  {
    heading: 'Every property personally verified',
    description:
      `${siteConfig.ownerName} and the team check each villa, resort and cottage in person before it goes live — what you see on the page is what you get on arrival.`,
  },
  {
    heading: 'A real person on WhatsApp, not a call centre',
    description:
      "Message us your dates, group size and the kind of trip you're planning, and you'll hear back from someone who actually knows the property — not a generic script.",
  },
  {
    heading: 'Book directly, no OTA fees',
    description:
      'Booking runs straight between you and Goa Beach Stays, with no platform commission built into the price and pricing shown upfront for standard and peak season.',
  },
  {
    heading: 'Local knowledge that matches you to the right area',
    description:
      "North Goa's Calangute, Baga and Anjuna suit a livelier trip; South Goa's Palolem, Cavelossim and Colva suit a quieter one. Tell us the occasion and we'll point you to the right stretch of coast.",
  },
]

export function WhyGuestsChoose() {
  const enquiryHref = whatsappUrl("Hi, I'd like to know more before booking a stay in Goa.")

  return (
    <section aria-label="Why guests choose Goa Beach Stays" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        title="Why Guests Choose Goa Beach Stays"
        subtitle="A few reasons travellers enquire with us directly instead of opening an OTA."
      />

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <div key={reason.heading} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">{reason.heading}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Chat With Us on WhatsApp
        </a>
      </div>
    </section>
  )
}