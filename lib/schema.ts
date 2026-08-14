import type { Stay } from "@/types/stay"
import type { BlogPost } from "@/types/blog"
import { siteConfig } from "./site-config"

const BASE = siteConfig.domain

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    description: siteConfig.description,
    url: BASE,
    logo: `${BASE}/images/logo/logo-main.png`,
    image: `${BASE}/images/homepage/hero.png`,
    telephone: siteConfig.contact.callNumber,
    email: siteConfig.contact.email,
    areaServed: { "@type": "State", name: "Goa, India" },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/all-stays?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.url}`,
    })),
  }
}

/**
 * VacationRental JSON-LD per SRS A1.
 * Fixed: previously emitted "@type": "LodgingBusiness" (a deviation flagged
 * in the status tracker). Corrected to "VacationRental" as the spec requires.
 *
 * GSC "Vacation rental" validity fix (Aug 2026): Google's VacationRental
 * spec lists containsPlace (with containsPlace.occupancy.value) and
 * identifier as required properties — both were missing, which is what GSC
 * flagged as critical invalid items. Fixed minimally using only existing
 * Stay data:
 *   - identifier: stay.id — a stable, content-independent ID already on
 *     every stay record, matching Google's requirement.
 *   - containsPlace.occupancy.value: stay.maxGuests — existing field.
 * image[] now uses the full gallery (previously capped at cover + 2) since
 * Google requires a minimum of 8 photos; this uses only image paths already
 * present in stays.json, nothing added, moved, or renamed. Properties with
 * fewer than 8 total images in their existing gallery will still fall short
 * of the 8-photo minimum — that's a data gap, not something this function
 * can fabricate its way around.
 *
 * Note: deliberately does NOT emit aggregateRating/review. The reviews shown
 * on stay pages are self-hosted testimonials with no verification mechanism
 * behind them, so — same reasoning already applied on the /reviews page —
 * they aren't eligible for Google's review rich-result markup and emitting
 * it would be a structured-data compliance risk.
 */
export function vacationRentalSchema(stay: Stay) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    identifier: stay.id,
    name: stay.name,
    description: stay.description.long,
    url: `${BASE}/stays/${stay.slug}`,
    telephone: siteConfig.contact.callNumber,
    image: [stay.images.cover, ...stay.images.gallery].map((p) => `${BASE}${p}`),
    priceRange: `₹${stay.pricing.displayPrice} – per night`,
    checkinTime: "12:00",
    checkoutTime: "11:00",
    containsPlace: {
      "@type": "Accommodation",
      occupancy: {
        "@type": "QuantitativeValue",
        value: stay.maxGuests,
      },
    },
    numberOfRooms: stay.rooms,
    address: {
      "@type": "PostalAddress",
      streetAddress: stay.location.address,
      addressLocality: stay.location.area,
      addressRegion: "Goa",
      postalCode: stay.location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: stay.location.coordinates.lat,
      longitude: stay.location.coordinates.lng,
    },
    amenityFeature: stay.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: stay.pricing.displayPrice,
      priceCurrency: stay.pricing.currency,
      availability: "https://schema.org/InStock",
    },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE}${post.coverImage}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { "@type": "Person", name: siteConfig.ownerName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${BASE}/images/logo/logo-main.png` },
    },
    mainEntityOfPage: `${BASE}/blogs/${post.slug}`,
  }
}