"use client"

import { useState, type FormEvent } from "react"
import { whatsappUrl } from "@/lib/site-config"

interface PropertyOption {
  name: string
  slug: string
}

interface EnquiryFormProps {
  properties: PropertyOption[]
}

const PROPERTY_TYPES = ["Any", "Villa", "Resort", "Cottage", "Homestay"] as const
const BUDGET_RANGES = [
  "Under ₹15,000/night",
  "₹15,000 – ₹25,000/night",
  "₹25,000 – ₹35,000/night",
  "₹35,000 – ₹50,000/night",
  "₹50,000+/night",
] as const

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
const labelClass = "mb-1.5 block text-sm font-medium text-foreground"

export function EnquiryForm({ properties }: EnquiryFormProps) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => (data.get(key) as string)?.trim() || "—"

    const message = [
      "Enquiry from GoaBeachStays.com",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Check-in: ${get("checkin")}`,
      `Nights: ${get("nights")}`,
      `Guests: ${get("guests")}`,
      `Property Type: ${get("propertyType")}`,
      `Property Interested In: ${get("propertyName")}`,
      `Budget: ${get("budget")}`,
      `Message: ${get("message")}`,
    ].join("\n")

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer")
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name<span className="text-accent"> *</span>
        </label>
        <input id="name" name="name" type="text" required className={inputClass} placeholder="Your full name" />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone<span className="text-accent"> *</span>
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+91 98765 43210" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="checkin" className={labelClass}>
          Check-in Date
        </label>
        <input id="checkin" name="checkin" type="date" className={inputClass} />
      </div>

      <div>
        <label htmlFor="nights" className={labelClass}>
          No. of Nights
        </label>
        <input id="nights" name="nights" type="number" min={1} className={inputClass} placeholder="e.g. 3" />
      </div>

      <div>
        <label htmlFor="guests" className={labelClass}>
          No. of Guests
        </label>
        <input id="guests" name="guests" type="number" min={1} className={inputClass} placeholder="e.g. 4" />
      </div>

      <div>
        <label htmlFor="propertyType" className={labelClass}>
          Property Type
        </label>
        <select id="propertyType" name="propertyType" className={inputClass} defaultValue="Any">
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="propertyName" className={labelClass}>
          Property Interested In
        </label>
        <select id="propertyName" name="propertyName" className={inputClass} defaultValue="Not sure yet">
          <option value="Not sure yet">Not sure yet</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="budget" className={labelClass}>
          Budget Range
        </label>
        <select id="budget" name="budget" className={inputClass} defaultValue={BUDGET_RANGES[1]}>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Tell us anything else that helps us find your perfect stay..."
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.01] sm:w-auto"
        >
          Send Enquiry via WhatsApp
        </button>
        {sent && (
          <p className="mt-3 text-sm text-muted-foreground" role="status">
            WhatsApp should have opened in a new tab with your enquiry pre-filled. Didn&apos;t open?{" "}
            <a href={whatsappUrl("Enquiry from GoaBeachStays.com")} className="font-medium text-accent underline">
              Click here instead
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}