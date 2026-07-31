import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
  showValue?: boolean
  reviewCount?: number
}

export function StarRating({ rating, size = 16, showValue = false, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? 'fill-accent text-accent' : 'fill-none text-muted-foreground/40'}
          />
        ))}
      </div>
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
      {showValue && <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}
      {typeof reviewCount === 'number' && (
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  )
}