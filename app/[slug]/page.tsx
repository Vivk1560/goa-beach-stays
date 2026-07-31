import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { getAllSemanticPages, getSemanticPageBySlug } from "@/lib/semantic-pages"
import { getFilteredStays, getStayBySlug } from "@/lib/stays"
import { getBlogBySlug } from "@/lib/blogs"
import type { Stay } from "@/types/stay"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"
import { siteConfig } from "@/lib/site-config"
import { StayCard } from "@/components/stays/StayCard"
import { BlogCard } from "@/components/blogs/BlogCard"
import { FAQAccordion } from "@/components/stays/FAQAccordion"
import { EmptyState } from "@/components/stays/EmptyState"
import { CTABanner } from "@/components/home/CTABanner"

interface SemanticPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSemanticPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: SemanticPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getSemanticPageBySlug(slug)

  if (!page) {
    return {
      title: `Page Not Found | ${siteConfig.name}`,
      description: "The page you are looking for could not be found.",
    }
  }

  const url = `${siteConfig.domain}/${page.slug}`

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  }
}

export default async function SemanticLandingPage({ params }: SemanticPageProps) {
  const { slug } = await params
  const page = getSemanticPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const stays = page.manualStaySlugs?.length
    ? (page.manualStaySlugs.map((slug) => getStayBySlug(slug)).filter(Boolean) as Stay[])
    : getFilteredStays(page.filter)

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: page.parent.name, url: page.parent.url },
    { name: page.h1, url: `/${page.slug}` },
  ]
  const breadcrumbLd = breadcrumbSchema(breadcrumbs)
  const faqLd = page.faqs.length ? faqSchema(page.faqs) : null
  const relatedBlogs = (page.relatedBlogs ?? [])
    .map((blogSlug) => getBlogBySlug(blogSlug))
    .filter((post): post is NonNullable<typeof post> => !!post)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <article className="pb-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/40">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground lg:px-8">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
                  {isLast ? (
                    <span aria-current="page" className="font-medium text-foreground">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.url} className="hover:text-accent">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          {/* Header */}
          <header className="max-w-3xl">
            <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">{page.h1}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{page.intro}</p>
          </header>

          {/* Matching stays */}
          <section aria-labelledby="stays-heading" className="mt-10">
            <h2 id="stays-heading" className="font-heading text-2xl font-semibold text-foreground">
              Handpicked Options
            </h2>
            {stays.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stays.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState message="We don't have a live match for this exact search yet, but our team can find one for you." />
              </div>
            )}
          </section>

          {/* Body content sections */}
          {page.sections.map((section) => (
            <section key={section.heading} className="mt-10 max-w-3xl">
              <h2 className="font-heading text-2xl font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-foreground">{section.body}</p>
            </section>
          ))}

          {/* FAQs */}
          {page.faqs.length > 0 && (
            <div className="mt-10">
              <FAQAccordion faqs={page.faqs} />
            </div>
          )}
          {/* Related blog guides */}
          {relatedBlogs.length > 0 && (
            <section aria-labelledby="related-guides-heading" className="mt-10">
              <h2 id="related-guides-heading" className="font-heading text-2xl font-semibold text-foreground">
                Guides You'll Find Useful
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
          {/* Related links */}
          {page.related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-10">
              <h2 id="related-heading" className="font-heading text-2xl font-semibold text-foreground">
                You Might Also Like
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.related.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <CTABanner />
      </article>
    </>
  )
}