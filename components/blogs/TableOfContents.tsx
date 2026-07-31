import type { BlogBlock } from "@/types/blog"
import { slugify } from "@/lib/blogs"

export function TableOfContents({ content }: { content: BlogBlock[] }) {
  const headings = content.filter((b) => b.type === "h2" || b.type === "h3") as Extract<
    BlogBlock,
    { type: "h2" | "h3" }
  >[]

  if (headings.length < 2) return null

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-lg font-semibold text-foreground">Table of Contents</h2>
      <ol className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={slugify(h.text)} className={h.type === "h3" ? "pl-4" : ""}>
            <a href={`#${slugify(h.text)}`} className="text-muted-foreground hover:text-accent">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}