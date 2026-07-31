import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `Page Not Found | ${siteConfig.name}`,
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* CSS-only beach illustration */}
      <div className="relative h-32 w-48" aria-hidden="true">
        <div className="absolute bottom-0 h-16 w-48 rounded-t-full bg-accent/20" />
        <div className="absolute bottom-10 left-6 h-14 w-14 rounded-full bg-accent" />
        <div className="absolute bottom-0 left-1/2 h-20 w-1 -translate-x-1/2 bg-primary" />
        <div className="absolute bottom-14 left-1/2 h-8 w-16 -translate-x-1/2 rounded-tl-full rounded-tr-sm bg-primary/70" />
      </div>

      <h1 className="mt-8 font-heading text-3xl font-semibold text-foreground md:text-4xl">
        Oops, this beach is off the map!
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to Goa.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Go to Homepage
        </Link>
        <Link
          href="/all-stays"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Browse All Stays
        </Link>
      </div>
    </main>
  )
}