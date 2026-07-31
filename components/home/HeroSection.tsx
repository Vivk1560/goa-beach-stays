import Image from 'next/image'
import Link from 'next/link'
import { whatsappUrl } from '@/lib/site-config'

export function HeroSection() {
  const whatsappHref = whatsappUrl("Hi, I'm interested in booking a stay in Goa. Can you help me?")

  return (
    <section className="relative flex h-[80vh] min-h-[480px] items-center justify-center text-center md:h-screen">
      <Image src="/images/homepage/hero.png" alt="Beachfront villa in Goa" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4">
        <h1 className="font-heading text-4xl font-semibold text-white md:text-6xl">
          Find Your Perfect Goa Beach Stay
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/80 md:text-xl">
          Luxury villas, boutique resorts &amp; private cottages across Goa&apos;s finest beaches
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/villas" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-transform hover:scale-105">
            Explore Villas
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}