import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { getAllBlogs, getBlogCategories } from "@/lib/blogs"
import { BlogCard } from "@/components/blogs/BlogCard"

export const metadata: Metadata = buildMetadata({
  title: "Goa Travel Blog — Guides, Tips & Itineraries",
  description:
    "Beach guides, itineraries, villa tips and local know-how for planning your Goa trip, written by the Goa Beach Stays team.",
  path: "/blogs",
})

interface BlogsIndexPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogsIndexPage({ searchParams }: BlogsIndexPageProps) {
  const { category } = await searchParams
  const categories = getBlogCategories()
  const posts = category ? getAllBlogs().filter((p) => p.category === category) : getAllBlogs()

  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
  ])

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">The Goa Travel Blog</h1>
        <p className="mt-3 text-muted-foreground">
          Beach guides, itineraries, villa tips and local know-how — straight from a team that lives and works in Goa.
        </p>
      </header>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blogs"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !category
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blogs?category=${encodeURIComponent(cat)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {posts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground">No posts found in this category yet.</p>
      )}
    </main>
  )
}