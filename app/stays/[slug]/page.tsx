import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin, Plane, Waves } from 'lucide-react'

import { getAllStays, getStayBySlug, avgRating } from '@/lib/stays'
import { getSemanticPagesForStay } from '@/lib/semantic-pages'
import { breadcrumbSchema, vacationRentalSchema, faqSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { CTABanner } from '@/components/home/CTABanner'

import { StayGallery } from '@/components/stays/StayGallery'
import { DualPricingBox } from '@/components/stays/DualPricingBox'
import { AmenitiesGrid } from '@/components/stays/AmenitiesGrid'
import { FAQAccordion } from '@/components/stays/FAQAccordion'
import { RelatedStays } from '@/components/stays/RelatedStays'
import { MapEmbed } from '@/components/stays/MapEmbed'
import { ReviewCard } from '@/components/stays/ReviewCard'
import { StickyCtaBar } from '@/components/stays/StickyCtaBar'

const TYPE_LABEL: Record<string, string> = {
  villa: 'Villa',
  resort: 'Resort',
  cottage: 'Cottage',
  homestay: 'Homestay',
}

interface StayPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllStays().map((stay) => ({ slug: stay.slug }))
}

export async function generateMetadata({ params }: StayPageProps): Promise<Metadata> {
  const { slug } = await params
  const stay = getStayBySlug(slug)

  if (!stay) {
    return {
      title: `Stay Not Found | ${siteConfig.name}`,
      description: 'The property you are looking for could not be found.',
    }
  }

  const url = `${siteConfig.domain}/stays/${stay.slug}`
  const ogImage = `${siteConfig.domain}${stay.images.cover}`

  return {
    title: stay.seo.metaTitle,
    description: stay.seo.metaDescription,
    keywords: [stay.seo.focusKeyword, ...stay.tags],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: stay.seo.metaTitle,
      description: stay.seo.metaDescription,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: stay.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: stay.seo.metaTitle,
      description: stay.seo.metaDescription,
      images: [ogImage],
    },
  }
}

export default async function StayDetailPage({ params }: StayPageProps) {
  const { slug } = await params
  const stay = getStayBySlug(slug)

  if (!stay) {
    notFound()
  }

  const rating = avgRating(stay.reviews)
  const semanticPages = getSemanticPagesForStay(stay, 4)

  const vacationRentalLd = vacationRentalSchema(stay)
  const breadcrumbLd = breadcrumbSchema(stay.breadcrumbs)
  const faqLd = stay.faqs.length ? faqSchema(stay.faqs) : null

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vacationRentalLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article className="pb-24 lg:pb-0">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="border-b border-border bg-warm-tint">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground lg:px-8">
            {stay.breadcrumbs.map((crumb, i) => {
              const isLast = i === stay.breadcrumbs.length - 1
              return (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-foreground">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.url} className="hover:text-accent">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Gallery */}
        <section aria-label="Property photos" className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
          <StayGallery images={stay.images} stayName={stay.name} />
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            {/* Property header */}
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{TYPE_LABEL[stay.type] ?? stay.type}</Badge>
                {stay.category.slice(0, 3).map((c) => (
                  <Badge key={c} variant="outline">
                    {c}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-3 font-heading text-3xl font-semibold text-foreground md:text-4xl">
                {stay.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{stay.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" aria-hidden="true" />
                  {stay.location.area}
                </span>
                <span className="flex items-center gap-1">
                  <Waves className="size-4" aria-hidden="true" />
                  {stay.location.nearestBeach}
                </span>
                <span className="flex items-center gap-1">
                  <Plane className="size-4" aria-hidden="true" />
                  {stay.location.nearestAirport}
                </span>
              </div>
              {stay.reviews.length > 0 && (
                <div className="mt-3">
                  <StarRating rating={rating} size={18} showValue reviewCount={stay.reviews.length} />
                </div>
              )}
            </header>

            {/* Pricing box (mobile/tablet only — desktop version lives in the sticky sidebar) */}
            <section aria-label="Pricing" className="mt-8 lg:hidden">
              <DualPricingBox stay={stay} />
            </section>

            {/* Description */}
            <section aria-labelledby="about-heading" className="mt-10">
              <h2 id="about-heading" className="font-heading text-2xl font-semibold text-foreground">
                About This Property
              </h2>
              <p className="mt-3 text-foreground">{stay.description.short}</p>
              <details className="group mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-primary marker:content-none">
                  Read More
                </summary>
                <p className="mt-3 whitespace-pre-line text-foreground">{stay.description.long}</p>
              </details>
            </section>

            {/* Amenities */}
            <div className="mt-10">
              <AmenitiesGrid amenities={stay.amenities} />
            </div>

            {/* Highlights */}
            {stay.highlights.length > 0 && (
              <section aria-labelledby="highlights-heading" className="mt-10">
                <h2 id="highlights-heading" className="font-heading text-2xl font-semibold text-foreground">
                  Highlights
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {stay.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Nearby attractions */}
            {stay.nearbyAttractions.length > 0 && (
              <section aria-labelledby="nearby-heading" className="mt-10">
                <h2 id="nearby-heading" className="font-heading text-2xl font-semibold text-foreground">
                  Nearby Attractions
                </h2>
                <ul className="mt-4 space-y-2">
                  {stay.nearbyAttractions.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-foreground">
                      <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Map */}
            <div className="mt-10">
              <MapEmbed location={stay.location} stayName={stay.name} />
            </div>

            {/* FAQs */}
            {stay.faqs.length > 0 && (
              <div className="mt-10">
                <FAQAccordion faqs={stay.faqs} />
              </div>
            )}

            {/* Reviews */}
            {stay.reviews.length > 0 && (
              <section aria-labelledby="reviews-heading" className="mt-10">
                <h2 id="reviews-heading" className="font-heading text-2xl font-semibold text-foreground">
                  Guest Reviews
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {stay.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — desktop pricing box, sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DualPricingBox stay={stay} />
            </div>
          </aside>
        </div>

        {/* Related stays */}
        <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
          <RelatedStays stay={stay} limit={3} />

          {/* Explore relevant category/region pages */}
          {semanticPages.length > 0 && (
            <section aria-labelledby="explore-more-heading" className="mt-10">
              <h2 id="explore-more-heading" className="font-heading text-2xl font-semibold text-foreground">
                Explore More Like This
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {semanticPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {page.h1}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom WhatsApp CTA banner */}
        <CTABanner />
      </article>

      {/* Sticky mobile CTA bar */}
      <StickyCtaBar stay={stay} />
    </>
  )
}