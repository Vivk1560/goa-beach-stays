import type { StayType } from "./stay"

/** Filter criteria used to pull relevant stays for a semantic page. */
export interface SemanticFilter {
  type?: StayType
  district?: "North Goa" | "South Goa"
  area?: string
  category?: string
  tag?: string
}

export interface SemanticFAQ {
  question: string
  answer: string
}

export interface SemanticContentSection {
  heading: string
  body: string
}

export interface SemanticPage {
  slug: string
  h1: string
  metaTitle: string
  metaDescription: string
  /** Short intro paragraph, hyperlocal */
  intro: string
  /** Body sections: What to Expect / Why Choose / Local Tips */
  sections: SemanticContentSection[]
  faqs: SemanticFAQ[]
  filter: SemanticFilter
  /** Optional explicit override: exact stay slugs to show, used when no
   *  filter attribute cleanly represents the page (travel guides, itineraries,
   *  broad catch-alls). When present, takes priority over `filter`. */
  manualStaySlugs?: string[]
  /** Parent category page for breadcrumb + internal linking */
  parent: { name: string; url: string }
  /** Related semantic pages for internal linking */
  related: { name: string; url: string }[]
  /** Related blog slugs */
  relatedBlogs?: string[]
}