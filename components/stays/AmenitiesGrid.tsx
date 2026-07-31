import {
  Wifi,
  Wind,
  Waves,
  Coffee,
  UtensilsCrossed,
  Car,
  Sparkles,
  Flame,
  Trees,
  Tv,
  Shirt,
  Users,
  ShieldCheck,
  Building2,
  Sofa,
  ConciergeBell,
  Landmark,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'

interface AmenitiesGridProps {
  amenities: string[]
}

const AMENITY_ICONS: Record<string, LucideIcon> = {
  'Free WiFi': Wifi,
  'Air Conditioning': Wind,
  'Beach Access': Waves,
  'Swimming Pool': Waves,
  'Private Pool': Waves,
  'Beachside Cafe': Coffee,
  'Breakfast Included': Coffee,
  'Fully Equipped Kitchen': UtensilsCrossed,
  'In-house Restaurant': UtensilsCrossed,
  'Free Parking': Car,
  'Daily Housekeeping': Sparkles,
  'BBQ Area': Flame,
  Garden: Trees,
  Hammocks: Trees,
  'Smart TV': Tv,
  'Laundry Service': Shirt,
  'Host on Site': Users,
  'Caretaker on Site': Users,
  '24/7 Caretaker': ShieldCheck,
  'City-Centre Location': Building2,
  'Common Lounge': Sofa,
  'Room Service': ConciergeBell,
  'Front Desk': ConciergeBell,
  'Heritage Interiors': Landmark,
  'Outdoor Seating': Sofa,
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (!amenities.length) return null

  return (
    <section aria-labelledby="amenities-heading" className="scroll-mt-24">
      <h2 id="amenities-heading" className="font-heading text-2xl font-semibold text-foreground">
        Amenities
      </h2>
      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-4">
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] ?? CheckCircle2
          return (
            <li
              key={amenity}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground"
            >
              <Icon className="size-4.5 flex-shrink-0 text-accent" aria-hidden="true" />
              <span>{amenity}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}