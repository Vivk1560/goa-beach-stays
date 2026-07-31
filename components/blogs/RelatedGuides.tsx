import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function RelatedGuides({ pages }: { pages?: { slug: string; label: string }[] }) {
  if (!pages || pages.length === 0) return null

  return (
    <section aria-labelledby="related-guides-heading" className="mt-14">
      <h2 id="related-guides-heading" className="font-heading text-2xl font-semibold text-foreground">
        Related Guides
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {page.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  )
}