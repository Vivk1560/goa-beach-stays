/**
 * Generic, config-driven system for any WhatsApp-based interaction on the
 * site (reviews, enquiries, callback requests, etc). A "flow" describes
 * what the modal should show and how to turn whatever the visitor filled
 * in into a WhatsApp message. The modal component and form renderer that
 * consume this have no built-in knowledge of "reviews" or any other
 * specific use case — only of these types.
 *
 * To add a new WhatsApp-driven workflow, write a `createXFlow(...)`
 * function in lib/whatsapp-flows.ts that returns a `WhatsAppFlowConfig`,
 * then render `<WhatsAppFlowModal flow={createXFlow(...)} .../>` wherever
 * it's needed. No changes to the modal or field renderer are required.
 */

export type WhatsAppFieldType = "text" | "textarea" | "select" | "date" | "rating" | "radio"

export interface WhatsAppFieldOption {
  label: string
  value: string
}

export interface WhatsAppFieldConfig {
  /** Key the value is stored under in form state and read from in `buildMessage`. */
  id: string
  label: string
  type: WhatsAppFieldType
  placeholder?: string
  required?: boolean
  /** Used by the "select" and "radio" field types. */
  options?: WhatsAppFieldOption[]
  maxLength?: number
  /** Optional per-field validator, run after the required check. Return an error string, or null when valid. */
  validate?: (value: string) => string | null
}

export type WhatsAppFieldValues = Record<string, string>

export interface WhatsAppFlowConfig {
  /** Stable id for the flow, e.g. "review", "stay-enquiry", "callback-request". */
  id: string
  modalTitle: string
  modalDescription?: string
  fields: WhatsAppFieldConfig[]
  /** Label for the final submit button, e.g. "Send via WhatsApp". */
  submitLabel: string
  /** WhatsApp number to send to. Defaults to siteConfig.contact.whatsappNumber when omitted. */
  whatsappNumber?: string
  /** Turns the filled-in field values into the final WhatsApp message body. */
  buildMessage: (values: WhatsAppFieldValues) => string
  /** Shown in the modal once the WhatsApp link has been opened. */
  successTitle?: string
  successDescription?: string
}