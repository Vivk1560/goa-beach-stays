// app/sitemap.ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { getAllStays } from "@/lib/stays"
import { getAllBlogs } from "@/lib/blogs"
import { getAllSemanticPages } from "@/lib/semantic-pages"

const BASE = siteConfig.domain

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/all-stays`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/villas`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/resorts`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/reviews`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/videos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/guest-experiences`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/about-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact-us`, changeFrequency: "monthly", priority: 0.6 },
    // /privacy-policy and /terms-of-service are intentionally excluded here —
    // they're Disallow'd in public/robots.txt and shouldn't be indexed.
  ]

  const stayRoutes: MetadataRoute.Sitemap = getAllStays().map((stay) => ({
    url: `${BASE}/stays/${stay.slug}`,
    lastModified: stay.publishedAt ? new Date(stay.publishedAt) : undefined,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogs().map((post) => ({
    url: `${BASE}/blogs/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const semanticRoutes: MetadataRoute.Sitemap = getAllSemanticPages().map((page) => ({
    url: `${BASE}/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const allRoutes = [...staticRoutes, ...stayRoutes, ...blogRoutes, ...semanticRoutes]

  // Defensive de-dup: if any future data entry ever produces a URL that
  // collides with another (e.g. a semantic-page slug matching a stay or
  // blog slug), keep only the first occurrence so the sitemap never
  // emits the same URL twice.
  const seen = new Set<string>()
  return allRoutes.filter((route) => {
    if (seen.has(route.url)) return false
    seen.add(route.url)
    return true
  })
}
