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
    logo: `https://res.cloudinary.com/ownuvi2y/image/upload/v1788636570/goa-other/logo/logo-main.png`,
    image: `https://res.cloudinary.com/ownuvi2y/image/upload/v1788636569/goa-other/homepage/hero.png`,
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

const TYPE_LABEL: Record<Stay["type"], string> = {
  villa: "Villa",
  resort: "Resort",
  cottage: "Cottage",
  homestay: "Homestay",
}

export function vacationRentalSchema(stay: Stay) {
  const caption = `${stay.name} — ${TYPE_LABEL[stay.type]} in ${stay.location.area}`

  const uniqueImagePaths = Array.from(new Set([stay.images.cover, ...stay.images.gallery]))

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    identifier: stay.id,
    additionalType: TYPE_LABEL[stay.type],
    name: stay.name,
    description: stay.description.long,
    url: `${BASE}/stays/${stay.slug}`,
    telephone: siteConfig.contact.callNumber,
    image: uniqueImagePaths.map((p) => ({
      "@type": "ImageObject",
      url: p,
      caption,
    })),
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
    image: post.coverImage,
    datePublished: post.publishDate,
    author: { "@type": "Person", name: siteConfig.ownerName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `https://res.cloudinary.com/ownuvi2y/image/upload/v1788636570/goa-other/logo/logo-main.png` },
    },
    mainEntityOfPage: `${BASE}/blogs/${post.slug}`,
  }
}