import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Stay } from '@/types/stay'
import { Badge } from '@/components/ui/Badge'
import { PriceTag } from '@/components/ui/PriceTag'
import { StarRating } from '@/components/ui/StarRating'
import { avgRating } from '@/lib/stays'
import { whatsappUrl } from '@/lib/site-config'

const TYPE_LABEL: Record<Stay['type'], string> = {
  villa: 'Villa',
  resort: 'Resort',
  cottage: 'Cottage',
  homestay: 'Homestay',
}

export function StayCard({ stay }: { stay: Stay }) {
  const rating = avgRating(stay.reviews)
  const enquiryHref = whatsappUrl(`Hi, I'm interested in ${stay.name}. Can you share availability?`, stay.contact.whatsappNumber)

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/stays/${stay.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={stay.images.cover}
          alt={stay.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="accent" className="absolute left-3 top-3 bg-white/90 backdrop-blur">
          {TYPE_LABEL[stay.type]}
        </Badge>
      </Link>
      <div className="p-4">
        <Link href={`/stays/${stay.slug}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground hover:text-accent">{stay.name}</h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" /> {stay.location.area}
        </p>
        {rating > 0 && (
          <div className="mt-2">
            <StarRating rating={rating} size={14} reviewCount={stay.reviews.length} />
          </div>
        )}
        <div className="mt-3">
          <PriceTag stay={stay} layout="card" />
        </div>
        <a href={enquiryHref} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  )
}