import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { getFilteredStays, avgRating } from '@/lib/stays'
import type { StayQuery } from '@/lib/stays'
import type { Stay } from '@/types/stay'
import { StayFilters } from '@/components/stays/StayFilters'
import { StayGrid } from '@/components/stays/StayGrid'
import { EmptyState } from '@/components/stays/EmptyState'
import { Badge } from '@/components/ui/Badge'

interface ResortsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Browse All Resorts in Goa — Filter by Type, Region & Budget',
    description:
      'Explore every verified resort in our Goa collection — filter by pool access, region, budget and group size, or jump straight to our curated resort collections below.',
    path: '/resorts',
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

export default async function ResortsPage({ searchParams }: ResortsPageProps) {
  const sp = await searchParams

  // Type is locked to "resort" for this route — StayFilters is rendered with
  // lockedType="resort" so it hides the type buttons and never writes a
  // conflicting `type` param, but we still guard for it here defensively.
  const selectedAmenities = toList(sp.amenities)
  const district = firstValue(sp.district) || undefined
  const maxPrice = toNumber(sp.maxPrice)
  const minGuests = toNumber(sp.minGuests)

  const query: StayQuery = {
    type: 'resort',
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
  const hasActiveFilters = Boolean(selectedAmenities.length || district || maxPrice || minGuests)

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Resorts', url: '/resorts' },
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
            Resorts
          </li>
        </ol>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Resorts in Goa
        </h1>
        <p className="mt-3 text-muted-foreground">
          Full-service comfort with pools, beachside settings, and on-site amenities — explore our
          verified collection of Goa resorts and filter by region, budget, group size, or
          amenities.
        </p>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-24">
          <Suspense fallback={<div className="h-14 w-full animate-pulse rounded-full bg-muted lg:h-64 lg:rounded-2xl" />}>
            <StayFilters lockedType="resort" />
          </Suspense>
        </div>

        <div className="mt-6 lg:mt-0">
          <p className="mb-5 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? 'resort' : 'resorts'} found
          </p>

          {results.length ? (
            <StayGrid stays={results} />
          ) : (
            <EmptyState
              message={
                hasActiveFilters
                  ? 'No resorts match your filters. Try widening your budget, choosing a different region, or clearing filters to see all resorts.'
                  : undefined
              }
            />
          )}
        </div>
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Browse Resorts by Type
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/boutique-resorts-goa">
            <Badge variant="outline">Boutique Resorts</Badge>
          </Link>
          <Link href="/north-goa-resorts">
            <Badge variant="outline">North Goa Resorts</Badge>
          </Link>
          <Link href="/south-goa-resorts">
            <Badge variant="outline">South Goa Resorts</Badge>
          </Link>
          <Link href="/pool-resorts-goa">
            <Badge variant="outline">Pool Resorts</Badge>
          </Link>
          <Link href="/luxury-resorts-goa">
            <Badge variant="outline">Luxury Resorts</Badge>
          </Link>
        </div>
      </section>
    </main>
  )
}