import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const COLLECTIONS = [
  { label: 'North Goa Villas', href: '/north-goa-villas', image: 'https://res.cloudinary.com/ownuvi2y/image/upload/v1788631427/goa-stays/baia-serena-resort-calangute/cover.jpg' },
  { label: 'South Goa Villas', href: '/south-goa-villas', image: 'https://res.cloudinary.com/ownuvi2y/image/upload/v1788631664/goa-stays/farol-bay-resort-arambol/cover.jpg' },
  { label: 'Goa Beach Resorts', href: '/goa-beach-resorts', image: 'https://res.cloudinary.com/ownuvi2y/image/upload/v1788631863/goa-stays/windward-bay-resort-candolim/cover.jpg' },
  { label: 'Beachfront Stays Near You', href: '/goa-beach-stays-near-me', image: 'https://res.cloudinary.com/ownuvi2y/image/upload/v1788631349/goa-stays/azure-palm-luxury-villa-anjuna-vagator/cover.jpg' },
]

export function CollectionCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="Explore Villa Collections" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative block aspect-[16/10] overflow-hidden rounded-2xl shadow-sm transition-all duration-300 ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image src={c.image} alt={c.label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
              <span className="font-heading text-xl font-semibold">{c.label}</span>
              <ArrowRight className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}