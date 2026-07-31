'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Expand, X, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react'
import type { Stay } from '@/types/stay'

interface StayGalleryProps {
  images: Stay['images']
  stayName: string
}

/**
 * Property gallery for the stay detail page.
 * Desktop: 1 large hero tile + up to 4 thumbnail tiles in a grid, with a
 * "View all N photos" overlay on the last visible thumbnail.
 * Mobile: horizontally swipeable strip of the same photos.
 * Clicking any tile (or the video tile, if present) opens a full-screen
 * lightbox with keyboard navigation (Escape / ArrowLeft / ArrowRight).
 */
export function StayGallery({ images, stayName }: StayGalleryProps) {
  const photos = [images.cover, ...images.gallery.filter((src) => src !== images.cover)]
  const hasVideo = Boolean(images.video)

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const openLightbox = useCallback((index: number, video = false) => {
    setActiveIndex(index)
    setShowVideo(video)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    setShowVideo(false)
    triggerRef.current?.focus()
  }, [])

  const goNext = useCallback(() => {
    setShowVideo(false)
    setActiveIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setShowVideo(false)
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeLightbox, goNext, goPrev])

  const visibleThumbs = photos.slice(1, 5)
  const remainingCount = photos.length - visibleThumbs.length - 1

  return (
    <section aria-label={`Photo gallery for ${stayName}`} className="relative">
      {/* Desktop grid */}
      <div className="hidden gap-2 md:grid md:grid-cols-4 md:grid-rows-2 md:overflow-hidden md:rounded-2xl">
        <button
          type="button"
          ref={triggerRef}
          onClick={() => openLightbox(0)}
          className="group relative col-span-2 row-span-2 block aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src={photos[0]}
            alt={`${stayName} — main view`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {visibleThumbs.map((src, i) => {
          const photoIndex = i + 1
          const isLastVisible = i === visibleThumbs.length - 1
          const showMoreOverlay = isLastVisible && (remainingCount > 0 || hasVideo)

          return (
            <button
              key={src + photoIndex}
              type="button"
              onClick={() => openLightbox(photoIndex)}
              className="group relative block aspect-square overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={src}
                alt={`${stayName} — view ${photoIndex + 1}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {showMoreOverlay && (
                <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/55 text-sm font-semibold text-white">
                  <Expand className="size-4" />
                  {remainingCount > 0 ? `+${remainingCount} more` : 'View all'}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile swipeable strip */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-xl md:hidden">
        {photos.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/3] w-[85%] flex-shrink-0 snap-start overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={src}
              alt={`${stayName} — view ${i + 1}`}
              fill
              sizes="85vw"
              priority={i === 0}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => openLightbox(0)}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline md:hidden"
      >
        <Expand className="size-4" /> View all {photos.length} photos
      </button>

      {hasVideo && (
        <button
          type="button"
          onClick={() => openLightbox(0, true)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <PlayCircle className="size-4" /> Watch property video
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${stayName} photo viewer`}
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm text-white/70">
              {showVideo ? 'Property video' : `${activeIndex + 1} / ${photos.length}`}
            </span>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeLightbox}
              aria-label="Close photo viewer"
              className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-2">
            {showVideo && images.video ? (
              <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-lg">
                <iframe
                  src={images.video}
                  title={`${stayName} property video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative h-full w-full max-w-5xl">
                <Image
                  src={photos[activeIndex]}
                  alt={`${stayName} — full view ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}

            {!showVideo && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          {!showVideo && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-4">
              {photos.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === activeIndex}
                  className={`relative aspect-square w-14 flex-shrink-0 overflow-hidden rounded-md ring-offset-2 ring-offset-black transition-all ${
                    i === activeIndex ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}