"use client"

import { useState, type ReactNode } from "react"
import { MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { StarRatingInput } from "@/components/whatsapp/StarRatingInput"
import { whatsappUrl } from "@/lib/site-config"
import type { WhatsAppFieldConfig, WhatsAppFieldValues, WhatsAppFlowConfig } from "@/types/whatsapp-flow"

const inputClassName =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"

interface WhatsAppFlowModalProps {
  flow: WhatsAppFlowConfig
  triggerLabel: string
  triggerClassName?: string
}

export function WhatsAppFlowModal({ flow, triggerLabel, triggerClassName }: WhatsAppFlowModalProps) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<WhatsAppFieldValues>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function setField(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => (prev[id] ? { ...prev, [id]: "" } : prev))
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // Reset once the close animation finishes, so a returning visitor gets a fresh form.
      window.setTimeout(() => {
        setValues({})
        setErrors({})
        setSubmitted(false)
      }, 200)
    }
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    for (const field of flow.fields) {
      const value = (values[field.id] ?? "").trim()
      if (field.required && !value) {
        nextErrors[field.id] = `${field.label} is required.`
        continue
      }
      if (value && field.validate) {
        const message = field.validate(value)
        if (message) nextErrors[field.id] = message
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    const message = flow.buildMessage(values)
    window.open(whatsappUrl(message, flow.whatsappNumber), "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={triggerClassName}>{triggerLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{submitted ? flow.successTitle ?? "Thank you!" : flow.modalTitle}</DialogTitle>
          {flow.modalDescription && !submitted && <DialogDescription>{flow.modalDescription}</DialogDescription>}
        </DialogHeader>

        {submitted ? (
          <p className="text-sm text-muted-foreground">
            {flow.successDescription ?? "WhatsApp has opened with your message ready to send."}
          </p>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            {flow.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={values[field.id] ?? ""}
                error={errors[field.id]}
                onChange={(v) => setField(field.id, v)}
              />
            ))}
            <DialogFooter>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {flow.submitLabel}
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
}: {
  field: WhatsAppFieldConfig
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const inputId = `whatsapp-field-${field.id}`
  const describedBy = error ? `${inputId}-error` : undefined

  let control: ReactNode

  switch (field.type) {
    case "textarea":
      control = (
        <textarea
          id={inputId}
          required={field.required}
          maxLength={field.maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          rows={4}
          className={inputClassName}
        />
      )
      break
    case "select":
      control = (
        <select
          id={inputId}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          className={inputClassName}
        >
          <option value="" disabled>
            Select {field.label.toLowerCase()}
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
      break
    case "date":
      control = (
        <input
          id={inputId}
          type="date"
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          className={inputClassName}
        />
      )
      break
    case "rating":
      control = (
        <StarRatingInput
          id={inputId}
          label={field.label}
          value={Number(value) || 0}
          onChange={(n) => onChange(String(n))}
        />
      )
      break
    case "radio":
      control = (
        <div role="radiogroup" aria-label={field.label} aria-describedby={describedBy} className="flex gap-4">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name={inputId}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(e.target.value)}
                className="size-4 accent-accent"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )
      break
    default:
      control = (
        <input
          id={inputId}
          type="text"
          required={field.required}
          maxLength={field.maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          className={inputClassName}
        />
      )
  }

  return (
    <div className="flex flex-col gap-1.5">
      {field.type === "radio" ? (
        <span className="text-sm font-medium text-foreground">
          {field.label}
          {field.required && <span aria-hidden="true"> *</span>}
        </span>
      ) : (
        field.type !== "rating" && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span aria-hidden="true"> *</span>}
          </label>
        )
      )}
      {field.type === "rating" && (
        <span className="text-sm font-medium text-foreground">
          {field.label}
          {field.required && <span aria-hidden="true"> *</span>}
        </span>
      )}
      {control}
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}