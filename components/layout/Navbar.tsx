'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { mainNav } from '@/lib/navigation'
import { whatsappUrl } from '@/lib/site-config'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const whatsappHref = whatsappUrl("Hi, I'm interested in booking a stay in Goa. Can you help me?")

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/logo/logo-main.png"
            alt="Goa Beach Stays"
            width={170}
            height={85}
            priority
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            if (item.groups) {
              return (
                <li key={item.label} className="group relative">
                  <button
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-200 ease-out group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full grid w-max min-w-[220px] gap-4 rounded-lg bg-card p-4 text-foreground opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 sm:grid-cols-2">
                    {item.groups.map((group) => (
                      <div key={group.label} className="min-w-[160px]">
                        <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {group.label}
                        </p>
                        <ul className="space-y-1.5">
                          {group.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded px-2 py-1 text-sm transition-colors duration-200 hover:bg-warm-tint hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              )
            }
            const isActive = item.href === pathname
            return (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isActive ? 'underline underline-offset-4' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-terracotta-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 lg:inline-flex"
        >
          WhatsApp Enquiry
        </a>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-primary px-6 pb-10 pt-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              if (item.groups) {
                const isOpen = openGroup === item.label
                return (
                  <li key={item.label} className="border-b border-white/10">
                    <button
                      className="flex w-full items-center justify-between py-3 text-left text-base font-medium"
                      onClick={() => setOpenGroup(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="space-y-3 pb-3 pl-3">
                        {item.groups.map((group) => (
                          <div key={group.label}>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                              {group.label}
                            </p>
                            <ul className="space-y-1">
                              {group.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block py-1.5 text-sm text-white/90"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                )
              }
              return (
                <li key={item.label} className="border-b border-white/10">
                  <Link
                    href={item.href!}
                    className="block py-3 text-base font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            WhatsApp Enquiry
          </a>
        </div>
      )}
    </header>
  )
}