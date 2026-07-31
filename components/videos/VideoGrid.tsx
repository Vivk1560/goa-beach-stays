"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import type { Video } from "@/types/video"

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null)

  if (videos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
        New videos for this category are on the way — check back soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <button key={video.id} onClick={() => setActive(video)} className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden">
              {video.source === "youtube" ? (
                <Image src={video.thumbnail!} alt={video.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <video src={video.src} poster={video.thumbnail} muted playsInline preload="metadata" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
              )}

              <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-primary">
                  <Play className="size-6 fill-current" />
                </span>
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-heading text-base font-semibold text-foreground">{video.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{video.description}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} aria-label="Close video" className="absolute -top-10 right-0 text-white/80 hover:text-white">
              <X className="size-7" />
            </button>
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              {active.source === "youtube" ? (
                <iframe src={`https://www.youtube.com/embed/${active.src}?autoplay=1`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="size-full" />
              ) : (
                <video src={active.src} controls autoPlay playsInline muted className="size-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}