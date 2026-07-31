import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const COLLECTIONS = [
  { label: 'North Goa Villas', href: '/north-goa-villas', image: '/images/stays/seabreeze-grand-villa-candolim/cover.png' },
  { label: 'South Goa Villas', href: '/south-goa-villas', image: '/images/stays/moon-forest-villa-calangute/cover.png' },
  { label: 'Goa Beach Resorts', href: '/boutique-resorts-goa', image: '/images/stays/windward-bay-resort-anjuna/cover.png' },
  { label: 'Boutique Cottages', href: '/goa-beach-stays-near-me', image: '/images/stays/driftwood-cottages-arambol/cover.png' },
]

export function CollectionCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="Explore Villa Collections" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {COLLECTIONS.map((c) => (
          <Link key={c.href} href={c.href} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl">
            <Image src={c.image} alt={c.label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
              <span className="font-heading text-xl font-semibold">{c.label}</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}