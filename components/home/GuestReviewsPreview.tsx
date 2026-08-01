import Link from 'next/link'
import type { StayReview } from '@/types/stay'
import { StarRating } from '@/components/ui/StarRating'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function GuestReviewsPreview({ reviews }: { reviews: StayReview[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="What Our Guests Say" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={`${review.staySlug}-${review.id}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
            <StarRating rating={review.rating} size={16} />
            <p className="mt-4 text-foreground">&ldquo;{review.review}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-foreground">
              {review.name} <span className="text-muted-foreground">— {review.location}</span>
            </p>
            {review.stayName && <p className="text-xs text-muted-foreground">{review.stayName}</p>}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/reviews"
          className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View All Reviews
        </Link>
      </div>
    </section>
  )
}