import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { getAllStays, getAllReviews } from "@/lib/stays"
import { StarRating } from "@/components/ui/StarRating"
import { ReviewCard } from "@/components/stays/ReviewCard"
import { PropertyFilter } from "@/components/reviews/PropertyFilter"
import { ReviewsBottomCta } from "@/components/reviews/ReviewsBottomCta"

export const metadata: Metadata = buildMetadata({
  title: "Guest Reviews — Real Feedback from Real Stays",
  description:
    "Read verified guest reviews across our villas, resorts and cottages in Goa — honest feedback from real travellers who booked with Goa Beach Stays.",
  path: "/reviews",
})

interface ReviewsPageProps {
  searchParams: Promise<{ rating?: string; property?: string }>
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const { rating, property } = await searchParams
  const allReviews = getAllReviews()
  const stays = getAllStays()

  const minRating = rating ? Number(rating) : undefined
  const reviews = allReviews.filter((r) => {
    if (minRating && r.rating < minRating) return false
    if (property && r.staySlug !== property) return false
    return true
  })

  const overallAvg = allReviews.length
    ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10
    : 0

  // Note: intentionally NOT injecting AggregateRating/Review JSON-LD here.
  // These are guest testimonials collected and displayed on our own site —
  // Google's review-snippet guidelines treat that as "self-serving" for
  // LocalBusiness/Organization-family types and won't render a rich result
  // for it, so adding the markup would just be dead weight.
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
  ])

  const ratingFilters = [5, 4, 3]
  const buildHref = (params: { rating?: string; property?: string }) => {
    const q = new URLSearchParams()
    if (params.rating) q.set("rating", params.rating)
    if (params.property) q.set("property", params.property)
    const qs = q.toString()
    return qs ? `/reviews?${qs}` : "/reviews"
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Guest Reviews</h1>
        <p className="mt-3 text-muted-foreground">
          Honest feedback from real travellers across every property we host.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <StarRating rating={overallAvg} size={20} showValue reviewCount={allReviews.length} />
          <span className="text-sm text-muted-foreground">Trusted by travellers from across India.</span>
        </div>
      </header>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Link
          href="/reviews"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !rating && !property
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          All Reviews
        </Link>
        {ratingFilters.map((r) => (
          <Link
            key={r}
            href={buildHref({ rating: String(r), property })}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              minRating === r
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {r}★ &amp; up
          </Link>
        ))}

        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        <PropertyFilter stays={stays} currentProperty={property} currentRating={rating} />
      </div>

      {/* Reviews grid */}
      {reviews.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={`${review.staySlug}-${review.id}`} review={review} showStaySource />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground">No reviews match these filters yet.</p>
      )}

      <ReviewsBottomCta stays={stays} googleReviewUrl="https://share.google/5TrMVSGK7bNCAkz1U" />
    </main>
  )
}