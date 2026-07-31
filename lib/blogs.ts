import blogsData from "@/data/blogs.json"
import type { BlogPost } from "@/types/blog"

const allBlogs = blogsData as unknown as BlogPost[]

export function getAllBlogs(): BlogPost[] {
  return [...allBlogs].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return allBlogs.find((b) => b.slug === slug)
}

export function getLatestBlogs(limit = 3): BlogPost[] {
  return getAllBlogs().slice(0, limit)
}

export function getRelatedBlogs(slug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(slug)
  if (!current) return getLatestBlogs(limit)
  const sameCategory = getAllBlogs().filter((b) => b.slug !== slug && b.category === current.category)
  const others = getAllBlogs().filter((b) => b.slug !== slug && b.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(allBlogs.map((b) => b.category)))
}

/** Slugifies a heading into a URL-safe anchor id, shared by the article body and its Table of Contents. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}