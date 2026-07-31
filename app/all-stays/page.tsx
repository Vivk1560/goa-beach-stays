import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { getFilteredStays, avgRating } from '@/lib/stays'
import type { StayQuery } from '@/lib/stays'
import type { Stay, StayType } from '@/types/stay'
import { StayFilters } from '@/components/stays/StayFilters'
import { StayGrid } from '@/components/stays/StayGrid'
import { EmptyState } from '@/components/stays/EmptyState'

interface AllStaysPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'All Stays in Goa — Villas, Resorts & Cottages',
    description:
      'Browse every verified villa, resort, cottage, and homestay listed with Goa Beach Stays. Filter by region, budget, guests, and amenities to find your perfect Goa stay.',
    path: '/all-stays',
  })
}

/** Reads a possibly-repeated search param and returns the first raw string value, if any. */
function firstValue(param: string | string[] | undefined): string | undefined {
  return Array.isArray(param) ? param[0] : param
}

/** Parses a comma-joined search param (as written by StayFilters) into a clean string array. */
function toList(param: string | string[] | undefined): string[] {
  const value = firstValue(param)
  if (!value) return []
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

function toNumber(param: string | string[] | undefined): number | undefined {
  const value = firstValue(param)
  if (!value) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

/**
 * Sorts filtered results with a sensible default order: featured stays first,
 * then by average review rating, then alphabetically. A dedicated Sort UI
 * (Featured / Price / Rating / Newest) is still pending per the Developer
 * Tracker — this default keeps the grid deterministic until that ships.
 */
function sortStays(stays: Stay[]): Stay[] {
  return [...stays].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    const ratingDiff = avgRating(b.reviews) - avgRating(a.reviews)
    if (ratingDiff !== 0) return ratingDiff
    return a.name.localeCompare(b.name)
  })
}

export default async function AllStaysPage({ searchParams }: AllStaysPageProps) {
  const sp = await searchParams

  const selectedTypes = toList(sp.type) as StayType[]
  const selectedAmenities = toList(sp.amenities)
  const district = firstValue(sp.district) || undefined
  const maxPrice = toNumber(sp.maxPrice)
  const minGuests = toNumber(sp.minGuests)

  const query: StayQuery = {
    types: selectedTypes.length ? selectedTypes : undefined,
    district,
    maxPrice,
    minGuests,
  }

  let stays = getFilteredStays(query)

  // getFilteredStays only supports a single `amenity` filter; StayFilters allows
  // multi-select, so the additional amenities are applied here as an AND filter
  // without touching the shared lib/stays.ts query logic.
  if (selectedAmenities.length) {
    stays = stays.filter((stay) =>
      selectedAmenities.every((amenity) =>
        stay.amenities.some((stayAmenity) => stayAmenity.toLowerCase() === amenity.toLowerCase()),
      ),
    )
  }

  const results = sortStays(stays)
  const hasActiveFilters = Boolean(
    selectedTypes.length || selectedAmenities.length || district || maxPrice || minGuests,
  )

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'All Stays', url: '/all-stays' },
  ])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <a href="/" className="hover:text-accent hover:underline">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-foreground">
            All Stays
          </li>
        </ol>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          All Stays in Goa
        </h1>
        <p className="mt-3 text-muted-foreground">
          Explore our full collection of verified villas, resorts, cottages, and homestays across
          North and South Goa. Use the filters to narrow down by region, budget, group size, or
          must-have amenities.
        </p>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-24">
          <Suspense fallback={<div className="h-14 w-full animate-pulse rounded-full bg-muted lg:h-64 lg:rounded-2xl" />}>
            <StayFilters />
          </Suspense>
        </div>

        <div className="mt-6 lg:mt-0">
          <p className="mb-5 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? 'stay' : 'stays'} found
          </p>

          {results.length ? (
            <StayGrid stays={results} />
          ) : (
            <EmptyState
              message={
                hasActiveFilters
                  ? "No stays match your filters. Try widening your budget, choosing a different region, or clearing filters to see all available stays."
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </main>
  )
}