import Link from 'next/link'
import { ArrowRight, Waves, Gem, Heart, Users, Trees, TreePalm } from 'lucide-react'
import type { Stay } from '@/types/stay'
import { StayCard } from '@/components/stays/StayCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

const HIGHLIGHTS = [
  { icon: Waves, label: 'Peaceful Beaches' },
  { icon: Gem, label: 'Luxury Escapes' },
  { icon: Heart, label: 'Romantic Stays' },
  { icon: Users, label: 'Family Vacations' },
  { icon: Trees, label: 'Nature' },
  { icon: TreePalm, label: 'Less Crowded Locations' },
]

export function SouthGoaShowcase({ stays }: { stays: Stay[] }) {
  return (
    <section aria-label="Discover South Goa" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader
        title="Discover South Goa"
        subtitle="A quieter side of the coast — for travellers who want Goa without the crowds."
      />

      <div className="mx-auto max-w-3xl space-y-4 text-center text-foreground">
        <p>
          If North Goa is where Goa parties, South Goa is where it exhales. The beaches run
          longer and emptier, the resorts sit further apart, and the pace slows down to
          something closer to a proper retreat — without giving up on comfort or good food.
        </p>
        <p>
          It&apos;s the side of Goa couples pick for a honeymoon, families pick for a calmer week
          together, and returning travellers often choose when they want to experience Goa&apos;s
          quieter side.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {HIGHLIGHTS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full bg-warm-tint px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent/15"
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      {stays.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/south-goa-stays"
          className="group/cta inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Explore South Goa
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}