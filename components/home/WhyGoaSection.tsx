import Link from 'next/link'
import { Waves, Building2, PartyPopper, Sailboat, UtensilsCrossed, CalendarDays } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FEATURES = [
  {
    icon: Waves,
    heading: 'Beaches for Every Traveller',
    description:
      'From the buzzing shacks of Baga to the quiet, near-empty stretches of Agonda — Goa\u2019s 100km coastline has a beach mood for every kind of trip.',
  },
  {
    icon: Building2,
    heading: 'Luxury Villas & Resorts',
    description:
      'Private-pool villas, boutique resorts and heritage stays sit minutes from the sand, giving you a five-star base without leaving the coast.',
  },
  {
    icon: PartyPopper,
    heading: 'Nightlife & Entertainment',
    description:
      'Beach shacks, sunset bars and Goa\u2019s legendary clubs keep the evenings going long after the sun goes down, especially through North Goa.',
  },
  {
    icon: Sailboat,
    heading: 'Adventure & Watersports',
    description:
      'Parasailing, jet-skiing, scuba diving and dolphin cruises turn a beach holiday into an adventure one, with operators along almost every major beach.',
  },
  {
    icon: UtensilsCrossed,
    heading: 'Food & Local Culture',
    description:
      'Goan seafood curries, Portuguese-influenced architecture and laid-back cafe culture give the state a character you won\u2019t find anywhere else in India.',
  },
  {
    icon: CalendarDays,
    heading: 'Year-Round Holiday Destination',
    description:
      'Sunny winters, a lively monsoon season and warm off-peak months mean there\u2019s a genuine reason to visit Goa in any season of the year.',
  },
]

export function WhyGoaSection() {
  return (
    <section aria-label="Why Goa" className="bg-warm-tint py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Why Goa?"
          subtitle="India's favourite coastal escape — and the reason we built Goa Beach Stays around it."
        />

        <div className="mx-auto max-w-3xl space-y-4 text-center text-foreground">
          <p>
            Goa consistently ranks among India&apos;s most-loved holiday destinations, and it&apos;s
            not hard to see why.
          </p>
          <p>
            Two coastlines&apos; worth of beaches, a food and culture scene shaped by centuries of
            Portuguese heritage, and a pace of life that shifts easily between lively and
            laid-back make it a rare destination — one that suits honeymooners, families and
            large groups equally well.
          </p>
          <p>
            Whether you&apos;re chasing sunset parties in Anjuna, quiet mornings on a South Goa
            beach, or a private pool to yourself for the weekend, Goa rewards travellers who stay
            somewhere that actually fits the trip they&apos;re planning.
          </p>
          <p>
            That&apos;s the gap Goa Beach Stays fills — every villa, resort and cottage on this
            site is personally verified, so you spend less time second-guessing a listing and
            more time enjoying the coast.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, heading, description }) => (
            <div
              key={heading}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{heading}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <h3 className="font-heading text-2xl font-semibold text-foreground">
            Ready to Experience Goa?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Browse verified villas and resorts across Goa and find the stay that matches how
            you actually want to travel.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/villas"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
            >
              Browse Villas
            </Link>
            <Link
              href="/resorts"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Browse Resorts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}