import { MessageCircle, Phone } from 'lucide-react'
import { whatsappUrl, callUrl } from '@/lib/site-config'

export function CTABanner() {
  const enquiryHref = whatsappUrl("Hi, I'm ready to book a stay in Goa. Can you help me?")

  return (
    <section className="bg-gradient-to-r from-primary to-[#2d6a4f] py-16 text-center text-primary-foreground">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">
          Ready to Book Your Goa Escape?
        </h2>
        <p className="mt-3 text-primary-foreground/80">
          Tell us your dates and we&apos;ll find the perfect villa, resort or cottage for you —
          usually within the hour.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-105"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp Us
          </a>
          <a
            href={callUrl()}
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground px-7 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  )
}