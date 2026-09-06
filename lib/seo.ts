import type { Metadata } from "next"
import { siteConfig } from "./site-config"

interface SeoParams {
  title: string
  description: string
  path?: string
  image?: string
  type?: "website" | "article"
  noIndex?: boolean
}

export function buildMetadata({ title, description, path = "", image, type = "website", noIndex }: SeoParams): Metadata {
  const url = `${siteConfig.domain}${path}`
  const ogImage = image ?? `https://res.cloudinary.com/ownuvi2y/image/upload/v1788636569/goa-other/homepage/hero.png`
  const fullTitle = path === "" ? title : `${title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}