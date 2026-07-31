"use client"

import { Star } from "lucide-react"
import { WhatsAppFlowModal } from "@/components/whatsapp/WhatsAppFlowModal"
import { createReviewFlow } from "@/lib/whatsapp-flows"
import { siteConfig } from "@/lib/site-config"

interface ReviewsBottomCtaProps {
  stays: { slug: string; name: string }[]
  /** Google Business review link. Placeholder until the real URL is supplied. */
  googleReviewUrl?: string
}

export function ReviewsBottomCta({ stays, googleReviewUrl = "#" }: ReviewsBottomCtaProps) {
  const reviewFlow = createReviewFlow(stays)

  return (
    <section
      aria-labelledby="reviews-cta-heading"
      className="mt-16 rounded-2xl border border-border bg-gradient-to-b from-secondary/60 to-card p-8 text-center sm:p-10"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={22} className="fill-accent text-accent" />
          ))}
        </div>

        <h2 id="reviews-cta-heading" className="mt-4 font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Love your stay?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Help future travellers discover {siteConfig.name} by sharing your experience.
        </p>

        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-terracotta-dark"
        >
          <Star className="size-4" aria-hidden="true" />
          Rate Us on Google
        </a>

        <div className="mt-8 flex w-full items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Can&apos;t leave a Google Review? Share your feedback directly with us.
        </p>

        <WhatsAppFlowModal
          flow={reviewFlow}
          triggerLabel="Write a Review on WhatsApp"
          triggerClassName="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        />
      </div>
    </section>
  )
}