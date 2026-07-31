'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/site-config'

interface WhatsAppButtonProps {
  /** Pass the property name on stay detail pages to personalize the message */
  propertyName?: string
}

export function WhatsAppButton({ propertyName }: WhatsAppButtonProps) {
  const [bouncing, setBouncing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setBouncing(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const message = propertyName
    ? `Hi, I'm interested in ${propertyName}. Can you help me?`
    : "Hi, I'm interested in booking a stay in Goa. Can you help me?"

  return (
    
     <a href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 sm:bottom-8 sm:right-8 ${
        bouncing ? 'animate-bounce' : ''
      }`}
    >
      <MessageCircle className="size-7 text-white" />
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity sm:block sm:group-hover:opacity-100">
        Chat with Us on WhatsApp
      </span>
    </a>
  )
}