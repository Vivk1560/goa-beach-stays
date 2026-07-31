import semanticPagesData from "@/data/semantic-pages.json"
import type { SemanticPage } from "@/types/semantic"
import type { Stay } from "@/types/stay"
import { stayMatchesQuery } from "@/lib/stays"

const allSemanticPages = semanticPagesData as unknown as SemanticPage[]

export function getAllSemanticPages(): SemanticPage[] {
  return allSemanticPages
}

export function getSemanticPageBySlug(slug: string): SemanticPage | undefined {
  return allSemanticPages.find((p) => p.slug === slug)
}

/**
 * Finds the semantic (category/region) pages a given stay would genuinely belong to,
 * so a stay's detail page can link back up the topical hierarchy. Only considers
 * filter-driven pages (editorial pages with manualStaySlugs or an empty filter are
 * skipped, since those aren't meaningfully "about" any specific stay attribute).
 * Ranked by filter specificity — the more criteria a page checks, the more relevant
 * it is to this exact stay (e.g. "North Goa Villas" over the broader "North Goa Stays").
 */
export function getSemanticPagesForStay(stay: Stay, limit = 4): SemanticPage[] {
  const candidates = allSemanticPages.filter((p) => {
    if (p.manualStaySlugs?.length) return false
    const filterKeys = Object.keys(p.filter)
    if (filterKeys.length === 0) return false
    return stayMatchesQuery(stay, p.filter)
  })

  candidates.sort((a, b) => Object.keys(b.filter).length - Object.keys(a.filter).length)

  return candidates.slice(0, limit)
}