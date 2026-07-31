import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBadges } from '@/components/home/TrustBadges'
import { FeaturedStays } from '@/components/home/FeaturedStays'
import { BrowseByType } from '@/components/home/BrowseByType'
import { CollectionCards } from '@/components/home/CollectionCards'
import { WhyBookWithUs } from '@/components/home/WhyBookWithUs'
import { GuestReviewsPreview } from '@/components/home/GuestReviewsPreview'
import { BlogPreview } from '@/components/home/BlogPreview'
import { AboutAgentSection } from '@/components/home/AboutAgentSection'
import { CTABanner } from '@/components/home/CTABanner'
import { WhyGoaSection } from '@/components/home/WhyGoaSection'
import { SouthGoaShowcase } from '@/components/home/SouthGoaShowcase'
import { getFeaturedStays, getTopReviews, getFilteredStays } from '@/lib/stays'
import { getLatestBlogs } from '@/lib/blogs'
import { buildMetadata } from '@/lib/seo'
import { organizationSchema, websiteSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Goa Beach Stays | Villas, Resorts & Beach Stays in Goa',
  description:
    'Verified villas, resorts and cottages across North and South Goa. Private pools, beachfront stays, transparent pricing. Enquire on WhatsApp.',
  path: '',
})

export default function Page() {
  const featuredStays = getFeaturedStays(6)
  const topReviews = getTopReviews(3)
  const latestBlogs = getLatestBlogs(3)
  const southGoaStays = getFilteredStays({ district: 'South Goa' })
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3)
  const organizationJsonLd = organizationSchema()
  const websiteJsonLd = websiteSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <TrustBadges />
      <FeaturedStays stays={featuredStays} />
      <BrowseByType />
      <CollectionCards />
      <WhyGoaSection />
      <SouthGoaShowcase stays={southGoaStays} />
      <WhyBookWithUs />
      <GuestReviewsPreview reviews={topReviews} />
      <BlogPreview blogs={latestBlogs} />
      <AboutAgentSection />
      <CTABanner />
    </>
  )
}