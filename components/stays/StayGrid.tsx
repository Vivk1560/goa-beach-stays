import type { Stay } from '@/types/stay'
import { StayCard } from '@/components/stays/StayCard'
import { EmptyState } from '@/components/stays/EmptyState'

interface StayGridProps {
  stays: Stay[]
  /** Shown above the grid, e.g. "12 stays found". Omit to hide the count line. */
  resultLabel?: string
  onClearFilters?: () => void
  emptyMessage?: string
}

export function StayGrid({ stays, resultLabel, onClearFilters, emptyMessage }: StayGridProps) {
  if (!stays.length) {
    return <EmptyState onClearFilters={onClearFilters} message={emptyMessage} />
  }

  return (
    <div>
      {resultLabel && <p className="mb-4 text-sm text-muted-foreground">{resultLabel}</p>}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stays.map((stay) => (
          <StayCard key={stay.slug} stay={stay} />
        ))}
      </div>
    </div>
  )
}