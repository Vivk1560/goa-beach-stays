'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import type { Stay } from '@/types/stay'
import { whatsappUrl, callUrl } from '@/lib/site-config'

interface StickyCtaBarProps {
  stay: Stay
}

export function StickyCtaBar({ stay }: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show once the user has scrolled roughly past the hero + pricing box,
    // so this doesn't duplicate the CTAs already visible above the fold.
    const SHOW_AFTER_PX = 600

    function handleScroll() {
      setIsVisible(window.scrollY > SHOW_AFTER_PX)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const enquiryMessage = `Hi, I'm interested in ${stay.name}. Can you share availability and final pricing?`

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        
        <a  href={whatsappUrl(enquiryMessage, stay.contact.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isVisible ? 0 : -1}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-transform active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </a>
        
        <a  href={callUrl(stay.contact.callNumber)}
          tabIndex={isVisible ? 0 : -1}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors active:scale-[0.98]"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </div>
  )
}