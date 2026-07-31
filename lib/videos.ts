import videosData from "@/data/videos.json"
import type { Video, VideoCategory } from "@/types/video"

const allVideos = videosData as Video[]

export const VIDEO_CATEGORIES: VideoCategory[] = [
  "Stay Tours",
  "Villa Tours",
  "Resort Tours",
  "Cottages",
  "Nearby Attractions",
  "Travel Journey",
  "Guest Experiences",
]

export function getAllVideos(): Video[] {
  return allVideos
}

export function getVideosByCategory(category?: VideoCategory): Video[] {
  if (!category) return allVideos
  return allVideos.filter((v) => v.category === category)
}