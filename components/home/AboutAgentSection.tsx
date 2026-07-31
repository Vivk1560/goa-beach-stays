import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/lib/site-config'

export function AboutAgentSection() {
  const enquiryHref = whatsappUrl("Hi, I'd like to know more about Goa Beach Stays.")

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src="/images/homepage/about-owner.png" alt={`${siteConfig.ownerName}, founder of ${siteConfig.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="font-serif text-lg italic text-accent">Your Goa Travel & Stay Expert</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
            {siteConfig.ownerName}
          </h2>
          <p className="mt-4 text-muted-foreground">
            8+ years personally vetting every villa, resort and cottage on this site — and helping
            travellers plan the trip around it, from honeymoons to family holidays to corporate
            offsites.
          </p>
          <p className="mt-4 text-foreground">
            We know every property, every beach, every season. Whether you&apos;re planning a
            quiet monsoon escape or a peak-season family trip, we match you to a stay that
            actually fits — not just whatever has availability.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={enquiryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat With Us on WhatsApp
            </a>
            <Link href="/about-us" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              More About Us
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}