import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Stay } from '@/types/stay'
import { getRelatedStays } from '@/lib/stays'
import { StayCard } from '@/components/stays/StayCard'

interface RelatedStaysProps {
  stay: Stay
  limit?: number
}

export function RelatedStays({ stay, limit = 3 }: RelatedStaysProps) {
  const related = getRelatedStays(stay, limit)

  if (!related.length) return null

  return (
    <section aria-labelledby="related-stays-heading" className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <h2 id="related-stays-heading" className="font-heading text-2xl font-semibold text-foreground">
          You Might Also Like
        </h2>
        <Link
          href="/all-stays"
          className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
        >
          View all stays <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {related.map((relatedStay) => (
          <StayCard key={relatedStay.slug} stay={relatedStay} />
        ))}
      </div>

      <Link
        href="/all-stays"
        className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-accent hover:underline sm:hidden"
      >
        View all stays <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}