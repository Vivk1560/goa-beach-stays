import { SectionHeader } from '@/components/ui/SectionHeader'

export function FeaturedVideoSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <SectionHeader title="Discover Goa's Finest Stays — Watch Our Property Tours" />
      <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
        <iframe
          className="size-full"
          src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID"
          title="Goa Beach Stays - Property Tour"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {/* TODO: Owner to swap the placeholder video ID above for an actual property-tour upload. */}
    </section>
  )
}