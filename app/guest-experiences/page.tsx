import type { Metadata } from "next"
import Image from "next/image"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { getAllStays, getAllReviews } from "@/lib/stays"
import { whatsappUrl } from "@/lib/site-config"
import { ReviewCard } from "@/components/stays/ReviewCard"

export const metadata: Metadata = buildMetadata({
  title: "Guest Experiences — Real Stories from Goa",
  description:
    "See what it's actually like staying with Goa Beach Stays — verified guest experiences, moments, and stories from villas and resorts across Goa.",
  path: "/guest-experiences",
})

export default function GuestExperiencesPage() {
  const verifiedReviews = getAllReviews().filter((r) => r.verified)
  const moments = getAllStays().slice(0, 8)

  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Guest Experiences", url: "/guest-experiences" },
  ])

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Guest Experiences</h1>
        <p className="mt-3 text-muted-foreground">
          Real stories and moments from guests who've stayed with us across Goa's beaches, hills, and hidden lanes.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {moments.map((stay) => (
          <div key={stay.slug} className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={stay.images.cover} alt={`Guests at ${stay.name}`} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-300 hover:scale-105" />
          </div>
        ))}
      </div>

      {verifiedReviews.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verifiedReviews.map((review) => (
            <ReviewCard key={`${review.staySlug}-${review.id}`} review={review} />
          ))}
        </div>
      )}

      <section className="mt-14 rounded-2xl bg-primary px-6 py-10 text-center">
        <h2 className="font-heading text-2xl font-semibold text-primary-foreground md:text-3xl">
          Just checked out? Share your experience.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-primary-foreground/80">
          Send us a photo or a few lines on WhatsApp — we'd love to feature your stay here.
        </p>
        <a href={whatsappUrl("Hi, I stayed with Goa Beach Stays and wanted to share my experience!")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105">
          Share on WhatsApp
        </a>
      </section>
    </main>
  )
}