"use client"

import { whatsappUrl } from "@/lib/site-config"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
        Something went wrong on our end.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Don&apos;t worry — your enquiries are safe. Please refresh or WhatsApp us directly.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Try Again
        </button>
        <a
          href={whatsappUrl("Hi! I ran into an error on the website and need some help.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          WhatsApp Us
        </a>
      </div>
    </main>
  )
}