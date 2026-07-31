export interface BlogPost {
  slug: string
  title: string
  category: string
  excerpt: string
  coverImage: string
  publishDate: string
  readTime: string
  /** Array of HTML/markdown-ish paragraphs and headings */
  content: BlogBlock[]
  tags: string[]
  relatedStays: string[]
  /** Optional — links to relevant semantic landing pages. Absent on older posts; renders nothing when omitted. */
  relatedSemanticPages?: { slug: string; label: string }[]
  seo: {
    metaTitle: string
    metaDescription: string
  }
}

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }