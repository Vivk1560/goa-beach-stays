import type { WhatsAppFlowConfig, WhatsAppFieldValues } from "@/types/whatsapp-flow"

/**
 * Generic "label: value" block formatter shared by every WhatsApp flow.
 * Keeps each flow's `buildMessage` short — a flow only decides which
 * labels/values to include and in what order, not how to lay them out.
 * Rows with an empty value are dropped so optional fields don't leave
 * blank "Label:\n" gaps in the final message.
 */
export function formatWhatsAppMessage(
  intro: string,
  rows: { label: string; value: string }[],
  outro = "Thank you!"
): string {
  const body = rows
    .filter((r) => r.value.trim().length > 0)
    .map((r) => `${r.label}:\n${r.value}`)
    .join("\n\n")
  return [intro, body, outro].filter(Boolean).join("\n\n")
}

function formatDateForMessage(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
}

/**
 * Review-submission flow. Stay options are generated at call time from
 * live stay data, so the dropdown can never drift out of sync with the
 * property list the way a hardcoded options array could.
 */
export function createReviewFlow(stays: { slug: string; name: string }[]): WhatsAppFlowConfig {
  return {
    id: "review",
    modalTitle: "Write a Review",
    modalDescription: "Share your stay experience — we'll open WhatsApp with your review ready to send.",
    submitLabel: "Send via WhatsApp",
    successTitle: "Almost there!",
    successDescription: "WhatsApp has opened in a new tab with your review — just hit send.",
    fields: [
      { id: "name", label: "Full Name", type: "text", required: true, maxLength: 60 },
      { id: "city", label: "City", type: "text", required: true, maxLength: 40 },
      {
        id: "staySlug",
        label: "Stay Name",
        type: "select",
        required: true,
        options: stays.map((s) => ({ label: s.name, value: s.slug })),
      },
      { id: "checkIn", label: "Check-in Date", type: "date", required: true },
      { id: "checkOut", label: "Check-out Date", type: "date", required: true },
      { id: "rating", label: "Overall Rating", type: "rating", required: true },
      { id: "title", label: "Review Title", type: "text", required: true, maxLength: 80 },
      { id: "review", label: "Your Review", type: "textarea", required: true, maxLength: 800 },
      {
        id: "recommend",
        label: "Would you recommend us?",
        type: "radio",
        required: true,
        options: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
      },
    ],
    buildMessage: (values: WhatsAppFieldValues) => {
      const stay = stays.find((s) => s.slug === values.staySlug)
      const ratingNum = Number(values.rating) || 0
      const stars = ratingNum ? "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum) : ""

      return formatWhatsAppMessage("Hello Goa Beach Stays,\n\nI'd like to share my review.", [
        { label: "Name", value: values.name ?? "" },
        { label: "City", value: values.city ?? "" },
        { label: "Stay", value: stay?.name ?? values.staySlug ?? "" },
        { label: "Check-in", value: formatDateForMessage(values.checkIn ?? "") },
        { label: "Check-out", value: formatDateForMessage(values.checkOut ?? "") },
        { label: "Overall Rating", value: stars },
        { label: "Review Title", value: values.title ?? "" },
        { label: "Review", value: values.review ?? "" },
        { label: "Would Recommend", value: values.recommend ?? "" },
      ])
    },
  }
}