'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Stay } from '@/types/stay'
import { StayCard } from '@/components/stays/StayCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Private Pool', value: 'pool' },
  { label: 'Beachfront', value: 'beachfront' },
  { label: 'Heritage', value: 'heritage' },
  { label: 'Jungle', value: 'jungle' },
  { label: 'Corporate', value: 'corporate' },
] as const

export function FeaturedStays({ stays }: { stays: Stay[] }) {
  const [active, setActive] = useState<string>('all')

  const filtered =
    active === 'all' ? stays : stays.filter((s) => s.category.includes(active))

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="Featured Stays" subtitle="Handpicked villas, resorts and cottages across Goa" />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-warm-tint text-foreground hover:bg-primary/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No stays in this category yet — check back soon, or browse all stays below.
        </p>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/all-stays"
          className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View All Stays
        </Link>
      </div>
    </section>
  )
}