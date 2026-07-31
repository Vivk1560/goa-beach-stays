export type StayType = "villa" | "resort" | "cottage" | "homestay"

export interface RoomType {
  type: string
  pricePerNight: number
  maxGuests: number
}

export interface PricingTier {
  label: string
  note?: string
  roomTypes: RoomType[]
}

export interface StayReview {
  id: string
  name: string
  rating: number
  review: string
  date: string
  location: string
  verified?: boolean
  /** Optional — injected when aggregating across stays */
  stayName?: string
  staySlug?: string
}

export interface StayFAQ {
  question: string
  answer: string
}

export interface Breadcrumb {
  name: string
  url: string
}

export interface Stay {
  id: string
  slug: string
  type: StayType
  category: string[]
  name: string
  tagline: string
  location: {
    area: string
    district: string
    region: string
    address: string
    coordinates: { lat: number; lng: number }
    nearestBeach: string
    nearestAirport: string
    postalCode?: string
  }
  pricing: {
    standard: PricingTier
    season: PricingTier
    currency: string
    minStay: number
    displayPrice: number
  }
  rooms: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  highlights: string[]
  description: {
    short: string
    long: string
  }
  images: {
    cover: string
    gallery: string[]
    video?: string
  }
  tags: string[]
  nearbyAttractions: string[]
  faqs: StayFAQ[]
  reviews: StayReview[]
  vacationRentalSchema: boolean
  breadcrumbs: Breadcrumb[]
  seo: {
    metaTitle: string
    metaDescription: string
    focusKeyword: string
  }
  contact: {
    whatsappNumber: string
    callNumber: string
  }
  featured: boolean
  active: boolean
  publishedAt?: string
  /** Computed: "₹X – ₹Y per night" */
  priceRange?: string
}