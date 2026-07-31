"use client"

import { useRouter } from "next/navigation"

interface PropertyFilterProps {
  stays: { slug: string; name: string }[]
  currentProperty?: string
  currentRating?: string
}

export function PropertyFilter({ stays, currentProperty, currentRating }: PropertyFilterProps) {
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const q = new URLSearchParams()
    if (currentRating) q.set("rating", currentRating)
    if (e.target.value) q.set("property", e.target.value)
    const qs = q.toString()
    router.push(qs ? `/reviews?${qs}` : "/reviews")
  }

  return (
    <select
      defaultValue={currentProperty ?? ""}
      onChange={handleChange}
      aria-label="Filter by property"
      className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
    >
      <option value="">All Properties</option>
      {stays.map((s) => (
        <option key={s.slug} value={s.slug}>
          {s.name}
        </option>
      ))}
    </select>
  )
}