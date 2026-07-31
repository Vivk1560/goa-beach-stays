import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Phone, Mail } from 'lucide-react'
import { footerNav } from '@/lib/navigation'
import { siteConfig, whatsappUrl, callUrl } from '@/lib/site-config'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="mb-4 inline-block rounded-md bg-white p-2">
            <Image src="/images/logo/logo-main.png" alt="Goa Beach Stays" width={150} height={75} className="h-10 w-auto object-contain" />
          </Link>
          <p className="mb-3 font-serif text-base italic text-warm-tint">{siteConfig.tagline}</p>
          <p className="mb-4 text-sm text-white/80">{siteConfig.description}</p>
          <ul className="space-y-2 text-sm">
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-terracotta"><MessageCircle className="size-4" /> {siteConfig.contact.whatsappNumber}</a></li>
            <li><a href={callUrl()} className="flex items-center gap-2 hover:text-terracotta"><Phone className="size-4" /> {siteConfig.contact.callNumber}</a></li>
            <li><a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-terracotta"><Mail className="size-4" /> {siteConfig.contact.email}</a></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-terracotta"><InstagramIcon className="size-4" /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-terracotta"><FacebookIcon className="size-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerNav.quickLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-terracotta">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold">Explore Goa</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerNav.exploreGoa.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-terracotta">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold">Popular Locations</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerNav.popularLocations.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-terracotta">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-white/70 sm:flex-row">
          <p>© {year} {siteConfig.name}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-terracotta">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-terracotta">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-terracotta">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}