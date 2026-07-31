import { Phone, MessageCircle, Info, CalendarDays } from 'lucide-react'
import type { Stay, PricingTier } from '@/types/stay'
import { whatsappUrl, callUrl } from '@/lib/site-config'

interface DualPricingBoxProps {
  stay: Stay
}

function formatCurrency(value: number, currency: string) {
  const symbol = currency === 'INR' ? '₹' : currency
  return `${symbol}${value.toLocaleString('en-IN')}`
}

function TierCard({
  tier,
  currency,
  isFeatured,
}: {
  tier: PricingTier
  currency: string
  isFeatured?: boolean
}) {
  const prices = tier.roomTypes.map((r) => r.pricePerNight)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return (
    <div
      className={`rounded-xl border p-4 ${
        isFeatured ? 'border-accent bg-accent/5' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-base font-semibold text-foreground">{tier.label}</h3>
        {isFeatured && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
            Peak season
          </span>
        )}
      </div>

      <p className="mt-2 text-2xl font-semibold text-foreground">
        {minPrice === maxPrice
          ? formatCurrency(minPrice, currency)
          : `${formatCurrency(minPrice, currency)} – ${formatCurrency(maxPrice, currency)}`}
        <span className="text-sm font-normal text-muted-foreground"> /night</span>
      </p>

      {tier.note && <p className="mt-1 text-xs text-muted-foreground">{tier.note}</p>}

      <ul className="mt-3 space-y-1.5 border-t border-border/70 pt-3">
        {tier.roomTypes.map((room) => (
          <li key={room.type} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {room.type} <span className="text-xs">(up to {room.maxGuests} guests)</span>
            </span>
            <span className="font-medium text-foreground">{formatCurrency(room.pricePerNight, currency)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DualPricingBox({ stay }: DualPricingBoxProps) {
  const { standard, season, currency, minStay } = stay.pricing
  const enquiryMessage = `Hi, I'm interested in ${stay.name}. Can you share availability and final pricing?`

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <TierCard tier={standard} currency={currency} />
        <TierCard tier={season} currency={currency} isFeatured />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
        <CalendarDays className="size-4 flex-shrink-0" />
        Minimum stay: {minStay} night{minStay > 1 ? 's' : ''}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 flex-shrink-0" />
        <p>
          Rates shown are indicative and vary by dates, group size, and current availability. Final pricing is
          confirmed by {stay.contact ? 'our team' : 'the host'} on WhatsApp or call before booking.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        
          <a href={whatsappUrl(enquiryMessage, stay.contact.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          <MessageCircle className="size-4" /> Enquire on WhatsApp
        </a>
        
         <a href={callUrl(stay.contact.callNumber)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Phone className="size-4" /> Call Now
        </a>
      </div>
    </div>
  )
}