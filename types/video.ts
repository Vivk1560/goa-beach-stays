export type VideoCategory =
  | "Stay Tours"
  | "Villa Tours"
  | "Resort Tours"
  | "Cottages"
  | "Nearby Attractions"
  | "Travel Journey"
  | "Guest Experiences"

export interface Video {
  id: string
  title: string
  description: string
  category: VideoCategory
  source: "youtube" | "mp4"
  src: string
  thumbnail?: string
  relatedStaySlug?: string
  featured?: boolean
}