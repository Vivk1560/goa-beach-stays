import Link from 'next/link'
import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  /** Optional callback to clear active filters — omit to just show a link instead. */
  onClearFilters?: () => void
  message?: string
}

export function EmptyState({ onClearFilters, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">No stays found</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {message ?? "We couldn't find any stays matching your filters. Try widening your search or clearing a few filters."}
      </p>

      {onClearFilters ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Clear all filters
        </button>
      ) : (
        <Link
          href="/all-stays"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          View all stays
        </Link>
      )}
    </div>
  )
}