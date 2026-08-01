import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'

export function BlogPreview({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="Goa Travel Guides" subtitle="Beaches, itineraries and local tips from our team" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={blog.coverImage} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              <Badge variant="accent" className="absolute left-3 top-3 bg-white/90 backdrop-blur">
                {blog.category}
              </Badge>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
                {blog.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{blog.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read More
                <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/blogs" className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          View All Guides
        </Link>
      </div>
    </section>
  )
}