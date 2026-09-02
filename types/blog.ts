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
  /**
   * `link` is optional and, when present, marks one exact substring of
   * `text` (matched verbatim, once) that should render as a real anchor.
   * This exists for the rare editorial outbound reference — it is not a
   * markdown or generic link syntax, and ordinary paragraphs are
   * unaffected when `link` is omitted.
   */
  | { type: "p"; text: string; link?: { text: string; href: string } }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }