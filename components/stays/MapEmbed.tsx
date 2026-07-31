import { MapPin, Plane, Waves, ExternalLink } from 'lucide-react'
import type { Stay } from '@/types/stay'

interface MapEmbedProps {
  location: Stay['location']
  stayName: string
}

export function MapEmbed({ location, stayName }: MapEmbedProps) {
  const { coordinates, address, area, district, nearestBeach, nearestAirport, postalCode } = location

  const embedSrc = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`

  return (
    <section aria-labelledby="location-heading" className="scroll-mt-24">
      <h2 id="location-heading" className="font-heading text-2xl font-semibold text-foreground">
        Location
      </h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border">
        <iframe
          src={embedSrc}
          title={`Map showing the location of ${stayName}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 sm:h-96"
        />

        <div className="grid gap-4 bg-card p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 flex-shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-foreground">{address}</p>
                <p className="text-sm text-muted-foreground">
                  {area}, {district}
                  {postalCode ? ` – ${postalCode}` : ''}
                </p>
              </div>
            </div>

            
            <a  href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Get Directions <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <ul className="space-y-2 border-t border-border/70 pt-4 text-sm sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Waves className="size-4 flex-shrink-0 text-accent" aria-hidden="true" />
              Nearest beach: <span className="font-medium text-foreground">{nearestBeach}</span>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Plane className="size-4 flex-shrink-0 text-accent" aria-hidden="true" />
              Nearest airport: <span className="font-medium text-foreground">{nearestAirport}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}