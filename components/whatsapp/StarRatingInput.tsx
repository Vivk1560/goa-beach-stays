"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingInputProps {
  value: number
  onChange: (value: number) => void
  label?: string
  size?: number
  id?: string
}

export function StarRatingInput({ value, onChange, label = "Overall rating", size = 28, id }: StarRatingInputProps) {
  return (
    <div role="radiogroup" aria-label={label} id={id} className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className={cn(
            "rounded-sm p-0.5 transition-transform hover:scale-110",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          )}
        >
          <Star
            size={size}
            className={n <= value ? "fill-accent text-accent" : "fill-none text-muted-foreground/40"}
            aria-hidden="true"
          />
        </button>
      ))}
      <span className="sr-only" aria-live="polite">
        {value ? `${value} out of 5 stars selected` : "No rating selected"}
      </span>
    </div>
  )
}