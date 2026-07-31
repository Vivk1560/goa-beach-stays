import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { VIDEO_CATEGORIES, getVideosByCategory } from "@/lib/videos"
import { VideoGrid } from "@/components/videos/VideoGrid"
import type { VideoCategory } from "@/types/video"

export const metadata: Metadata = buildMetadata({
  title: "Videos — Property Tours & Goa Guides",
  description:
    "Watch property tours, Goa travel guides, and guest stories from Goa Beach Stays — see the villas, resorts, and experiences before you book.",
  path: "/videos",
})

interface VideosPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const { category } = await searchParams
  const activeCategory = VIDEO_CATEGORIES.includes(category as VideoCategory)
    ? (category as VideoCategory)
    : undefined
  const videos = getVideosByCategory(activeCategory)

  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Videos", url: "/videos" },
  ])

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Videos</h1>
        <p className="mt-3 text-muted-foreground">
          Property tours, Goa travel guides, and real guest stories — see it before you book.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/videos"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !activeCategory
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          All
        </Link>
        {VIDEO_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/videos?category=${encodeURIComponent(cat)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <VideoGrid videos={videos} />
      </div>
    </main>
  )
}