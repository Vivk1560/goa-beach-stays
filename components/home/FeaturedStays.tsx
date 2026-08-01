'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
      <SectionHeader
        title="Featured Stays"
        subtitle="Handpicked villas, resorts and cottages across Goa"
        align="left"
        action={
          <Link
            href="/all-stays"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition-all duration-200 ease-out hover:scale-105 hover:bg-terracotta-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View All Stays
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1" aria-hidden="true" />
          </Link>
        }
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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
    </section>
  )
}