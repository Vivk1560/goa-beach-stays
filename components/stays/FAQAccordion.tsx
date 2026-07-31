'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { StayFAQ } from '@/types/stay'

interface FAQAccordionProps {
  faqs: StayFAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs.length) return null

  return (
    <section aria-labelledby="faq-heading" className="scroll-mt-24">
      <h2 id="faq-heading" className="font-heading text-2xl font-semibold text-foreground">
        Frequently Asked Questions
      </h2>

      <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const buttonId = `${baseId}-faq-button-${index}`
          const panelId = `${baseId}-faq-panel-${index}`

          return (
            <div key={buttonId}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:px-5"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-accent' : ''
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}