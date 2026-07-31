import type { Stay } from '@/types/stay'

interface PriceTagProps {
  stay: Stay
  /** "card" = compact one-line, "stacked" = two lines with labels */
  layout?: 'card' | 'stacked'
}

function formatINR(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

export function PriceTag({ stay, layout = 'card' }: PriceTagProps) {
  const standard = stay.pricing.standard.roomTypes[0]?.pricePerNight ?? stay.pricing.displayPrice
  const season = stay.pricing.season.roomTypes[0]?.pricePerNight

  if (layout === 'stacked') {
    return (
      <div className="space-y-0.5">
        <p className="text-lg font-semibold text-foreground">
          {formatINR(standard)}
          <span className="text-sm font-normal text-muted-foreground"> /night</span>
        </p>
        {season && (
          <p className="text-xs text-muted-foreground">
            {formatINR(season)}/night <span className="text-accent">(Nov–Jan ★)</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <p className="text-sm">
      <span className="font-semibold text-foreground">{formatINR(standard)}/night</span>
      {season && <span className="text-muted-foreground"> &nbsp;|&nbsp; {formatINR(season)}/night (Nov–Jan ★)</span>}
    </p>
  )
}