export const siteConfig = {
  name: "Goa Beach Stays",
  tagline: "Luxury Stays. Memorable Days.",
  domain: "https://goabeachstays.com",
  description:
    "Goa's trusted property broker for premium villas, resorts, and beach stays. 8+ years of hospitality experience.",
  contact: {
    whatsappNumber: "+919921372661",
    callNumber: "+918080557611",
    email: "rajeshgarela0@gmail.com",
    operatingHours: "Mon–Sun, 8:00 AM – 10:00 PM IST",
  },
  social: {
    instagram: "https://www.instagram.com/goabeachstays",
    facebook: "https://www.facebook.com/goabeachstays",
  },
  developer: "Vivaan Kukreja",
  /** Developer's own WhatsApp, used only for the footer credit link */
  developerWhatsapp: "+917972767203",
  ownerName: "Rajesh Garela",
} as const

export const stats = [
  { value: "5000+", label: "Happy Guests" },
  { value: "8 Years", label: "in Goa Tourism" },
  { value: "50+", label: "Properties" },
  { value: "100%", label: "Verified" },
] as const

/**
 * Builds a WhatsApp deep-link with a prefilled message.
 * `number` is explicitly typed as `string` (not inferred from the default),
 * so any stay's `contact.whatsappNumber` — typed as plain `string` in
 * `types/stay.ts` — can be passed in without a literal-type mismatch.
 */
export function whatsappUrl(message?: string, number: string = siteConfig.contact.whatsappNumber) {
  const clean = number.replace(/[^0-9]/g, "")
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${clean}${text}`
}

/** Builds a `tel:` link. Same explicit `string` typing as `whatsappUrl` above. */
export function callUrl(number: string = siteConfig.contact.callNumber) {
  return `tel:${number}`
}