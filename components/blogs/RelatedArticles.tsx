import type { BlogPost } from "@/types/blog"
import { BlogCard } from "@/components/blogs/BlogCard"

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section aria-labelledby="related-articles-heading" className="mt-14">
      <h2 id="related-articles-heading" className="font-heading text-2xl font-semibold text-foreground">
        Related Articles
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}