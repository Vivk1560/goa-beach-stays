import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, ChevronRight, Clock } from "lucide-react"

import { getAllBlogs, getBlogBySlug, getRelatedBlogs, slugify } from "@/lib/blogs"
import { getStayBySlug } from "@/lib/stays"
import { breadcrumbSchema, articleSchema } from "@/lib/schema"
import { siteConfig } from "@/lib/site-config"
import type { BlogBlock } from "@/types/blog"

import { AboutAuthor } from "@/components/blogs/AboutAuthor"
import { QuickTake } from "@/components/blogs/QuickTake"
import { TableOfContents } from "@/components/blogs/TableOfContents"
import { RelatedArticles } from "@/components/blogs/RelatedArticles"
import { RelatedGuides } from "@/components/blogs/RelatedGuides"
import { StayCard } from "@/components/stays/StayCard"
import { CTABanner } from "@/components/home/CTABanner"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    return { title: `Article Not Found | ${siteConfig.name}`, description: "This article could not be found." }
  }

  const url = `${siteConfig.domain}/blogs/${post.slug}`
  const ogImage = `${siteConfig.domain}${post.coverImage}`

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [ogImage],
    },
  }
}

function renderBlock(block: BlogBlock, key: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={key} id={slugify(block.text)} className="mt-10 font-heading text-2xl font-semibold text-foreground">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 key={key} id={slugify(block.text)} className="mt-6 font-heading text-xl font-semibold text-foreground">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul key={key} className="mt-4 list-disc space-y-2 pl-5 text-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote key={key} className="mt-6 border-l-4 border-accent bg-accent/5 py-3 pl-5 italic text-foreground">
          {block.text}
        </blockquote>
      )
    case "p":
    default:
      return (
        <p key={key} className="mt-4 leading-relaxed text-foreground">
          {block.text}
        </p>
      )
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  const [introBlock, ...restBlocks] = post.content
  const quickTakeText = introBlock?.type === "p" ? introBlock.text : post.excerpt
  const bodyBlocks = introBlock?.type === "p" ? restBlocks : post.content

  const relatedStays = post.relatedStays.map((s) => getStayBySlug(s)).filter((s): s is NonNullable<typeof s> => !!s)
  const relatedPosts = getRelatedBlogs(post.slug, 2)

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: post.title, url: `/blogs/${post.slug}` },
  ]
  const breadcrumbLd = breadcrumbSchema(breadcrumbs)
  const articleLd = articleSchema(post)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article className="pb-16">
        <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/40">
          <ol className="mx-auto flex max-w-3xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground lg:px-8">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
                  {isLast ? (
                    <span aria-current="page" className="line-clamp-1 font-medium text-foreground">
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

        <div className="mx-auto max-w-3xl px-4 pt-8 lg:px-8">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Blogs
          </Link>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-4" aria-hidden="true" />
              {new Date(post.publishDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" />
              {post.readTime} read
            </span>
          </div>

          <h1 className="mt-3 font-heading text-3xl font-semibold text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6">
            <AboutAuthor />
          </div>

          <div className="mt-8">
            <QuickTake text={quickTakeText} />
          </div>

          <div className="mt-8">
            <TableOfContents content={post.content} />
          </div>

          <div className="mt-2">{bodyBlocks.map((block, i) => renderBlock(block, i))}</div>

          {relatedStays.length > 0 && (
            <section aria-labelledby="related-stays-heading" className="mt-14">
              <h2 id="related-stays-heading" className="font-heading text-2xl font-semibold text-foreground">
                Stays Featured in This Guide
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedStays.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
            </section>
          )}

          <RelatedGuides pages={post.relatedSemanticPages} />

          <RelatedArticles posts={relatedPosts} />
        </div>

        <div className="mt-14">
          <CTABanner />
        </div>
      </article>
    </>
  )
}