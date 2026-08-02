import staysData from "@/data/stays.json"
import type { Stay, StayReview, StayType } from "@/types/stay"

const allStays = staysData as unknown as Stay[]

export function getAllStays(): Stay[] {
  return allStays.filter((s) => s.active)
}

export function getStayBySlug(slug: string): Stay | undefined {
  return allStays.find((s) => s.slug === slug && s.active)
}

export function getFeaturedStays(limit = 6): Stay[] {
  // Preferred homepage display order for featured stays (by slug).
  // Any featured stay not listed here falls back to its original array order.
  const order = [
    "meridian-palms-villa-estate-anjuna",
    "baia-serena-resort-calangute",
    "azure-horizon-resort-mobor-cavelossim",
    "alto-mar-resort-calangute",
    "aurelia-varca-resort",
    "quinta-verde-villa-calangute",
  ]
  const featured = getAllStays().filter((s) => s.featured)
  featured.sort((a, b) => {
    const ai = order.indexOf(a.slug)
    const bi = order.indexOf(b.slug)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
  return featured.slice(0, limit)
}

export interface StayQuery {
  type?: StayType
  types?: StayType[]
  district?: string
  area?: string
  category?: string
  tag?: string
  amenity?: string
  maxPrice?: number
  minGuests?: number
}

/** Whether a single stay satisfies a given query — shared by getFilteredStays and semantic-page matching. */
export function stayMatchesQuery(s: Stay, q: StayQuery): boolean {
  if (q.type && s.type !== q.type) return false
  if (q.types && !q.types.includes(s.type)) return false
  if (q.district && s.location.district !== q.district) return false
  if (q.area && !s.location.area.toLowerCase().includes(q.area.toLowerCase())) return false
  if (q.category && !s.category.includes(q.category)) return false
  if (q.tag && !s.tags.map((t) => t.toLowerCase()).includes(q.tag.toLowerCase())) return false
  if (q.amenity && !s.amenities.some((a) => a.toLowerCase().includes(q.amenity!.toLowerCase()))) return false
  if (q.maxPrice && s.pricing.displayPrice > q.maxPrice) return false
  if (q.minGuests && s.maxGuests < q.minGuests) return false
  return true
}

export function getFilteredStays(q: StayQuery): Stay[] {
  return getAllStays().filter((s) => stayMatchesQuery(s, q))
}

export function getRelatedStays(stay: Stay, limit = 3): Stay[] {
  const sameRegion = getAllStays().filter(
    (s) => s.slug !== stay.slug && (s.location.district === stay.location.district || s.type === stay.type),
  )
  // Prefer same type AND region first.
  sameRegion.sort((a, b) => {
    const score = (x: Stay) =>
      (x.type === stay.type ? 2 : 0) + (x.location.district === stay.location.district ? 1 : 0)
    return score(b) - score(a)
  })
  return sameRegion.slice(0, limit)
}

export function avgRating(reviews: StayReview[]): number {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

/** All reviews across all stays, enriched with stay name + slug. */
export function getAllReviews(): StayReview[] {
  return getAllStays()
    .flatMap((s) =>
      s.reviews.map((r) => ({
        ...r,
        stayName: s.name,
        staySlug: s.slug,
      })),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Top reviews (highest rating, most recent) for homepage preview. */
export function getTopReviews(limit = 3): StayReview[] {
  return getAllReviews()
    .filter((r) => r.rating >= 5)
    .slice(0, limit)
}