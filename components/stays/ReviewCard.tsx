import Link from 'next/link'
import { BadgeCheck, MapPin } from 'lucide-react'
import type { StayReview } from '@/types/stay'
import { StarRating } from '@/components/ui/StarRating'

interface ReviewCardProps {
  review: StayReview
  /** Show the stay name/link — used on the aggregated /reviews page, not on a stay's own page. */
  showStaySource?: boolean
}

function formatReviewDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
  })
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function ReviewCard({ review, showStaySource = false }: ReviewCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary"
          >
            {initials(review.name)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-foreground">{review.name}</p>
              {review.verified && (
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-accent">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">Verified stay</span>
                </span>
              )}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" aria-hidden="true" />
              {review.location}
            </p>
          </div>
        </div>
        <span className="whitespace-nowrap text-xs text-muted-foreground">{formatReviewDate(review.date)}</span>
      </div>

      <div className="mt-3">
        <StarRating rating={review.rating} size={14} />
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{review.review}</p>

      {showStaySource && review.stayName && review.staySlug && (
        <Link
          href={`/stays/${review.staySlug}`}
          className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
        >
          Stayed at {review.stayName}
        </Link>
      )}
    </div>
  )
}