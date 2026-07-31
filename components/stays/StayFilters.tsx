'use client'

import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import type { StayType } from '@/types/stay'

const TYPE_OPTIONS: { value: StayType; label: string }[] = [
  { value: 'villa', label: 'Villas' },
  { value: 'resort', label: 'Resorts' },
  { value: 'cottage', label: 'Cottages' },
  { value: 'homestay', label: 'Homestays' },
]

const DISTRICT_OPTIONS = ['North Goa', 'South Goa']

const BUDGET_OPTIONS = [
  { value: '', label: 'Any budget' },
  { value: '15000', label: 'Up to ₹15,000/night' },
  { value: '30000', label: 'Up to ₹30,000/night' },
  { value: '50000', label: 'Up to ₹50,000/night' },
]

const GUEST_OPTIONS = [
  { value: '', label: 'Any group size' },
  { value: '2', label: '2+ guests' },
  { value: '4', label: '4+ guests' },
  { value: '6', label: '6+ guests' },
  { value: '10', label: '10+ guests' },
]

const AMENITY_OPTIONS = ['Private Pool', 'Free WiFi', 'Beach Access', 'Free Parking', 'Breakfast Included']

interface StayFiltersProps {
  /** Fixed filters this listing page always applies (e.g. /villas locks type=villa) and hides from the UI. */
  lockedType?: StayType
}

export function StayFilters({ lockedType }: StayFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const selectedTypes = useMemo(
    () => (searchParams.get('type')?.split(',').filter(Boolean) ?? []) as StayType[],
    [searchParams],
  )
  const selectedDistrict = searchParams.get('district') ?? ''
  const selectedBudget = searchParams.get('maxPrice') ?? ''
  const selectedGuests = searchParams.get('minGuests') ?? ''
  const selectedAmenities = useMemo(
    () => searchParams.get('amenities')?.split(',').filter(Boolean) ?? [],
    [searchParams],
  )

  const activeCount =
    (lockedType ? 0 : selectedTypes.length) +
    (selectedDistrict ? 1 : 0) +
    (selectedBudget ? 1 : 0) +
    (selectedGuests ? 1 : 0) +
    selectedAmenities.length

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  function toggleType(type: StayType) {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    updateParams({ type: next.length ? next.join(',') : null })
  }

  function toggleAmenity(amenity: string) {
    const next = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity]
    updateParams({ amenities: next.length ? next.join(',') : null })
  }

  function clearAll() {
    router.push(pathname, { scroll: false })
    setIsMobileOpen(false)
  }

  const panelContent = (
    <div className="space-y-6">
      {!lockedType && (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground">Property Type</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((opt) => {
              const isActive = selectedTypes.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleType(opt.value)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-background text-foreground hover:border-accent'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Region</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DISTRICT_OPTIONS.map((district) => {
            const isActive = selectedDistrict === district
            return (
              <button
                key={district}
                type="button"
                aria-pressed={isActive}
                onClick={() => updateParams({ district: isActive ? null : district })}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:border-accent'
                }`}
              >
                {district}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-foreground">Budget</span>
          <select
            value={selectedBudget}
            onChange={(e) => updateParams({ maxPrice: e.target.value || null })}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-foreground">Guests</span>
          <select
            value={selectedGuests}
            onChange={(e) => updateParams({ minGuests: e.target.value || null })}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {GUEST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Amenities</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((amenity) => {
            const isActive = selectedAmenities.includes(amenity)
            return (
              <button
                key={amenity}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleAmenity(amenity)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-foreground hover:border-accent'
                }`}
              >
                {amenity}
              </button>
            )
          })}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-accent hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop: inline panel */}
      <div className="hidden rounded-2xl border border-border bg-card p-5 lg:block">{panelContent}</div>

      {/* Mobile/tablet: trigger + bottom sheet */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {activeCount}
            </span>
          )}
        </button>

        {isMobileOpen && (
          <div role="dialog" aria-modal="true" aria-label="Filter stays" className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50">
            <div className="max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground">Filters</h2>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close filters"
                  className="rounded-full p-1.5 hover:bg-muted"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              {panelContent}
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="mt-6 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
              >
                Show results
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}