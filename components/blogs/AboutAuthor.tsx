import { siteConfig } from "@/lib/site-config"

export function AboutAuthor() {
  const initials = siteConfig.ownerName
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="flex items-center gap-3 border-y border-border py-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {initials}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">About the author</p>
        <p className="font-heading font-semibold text-foreground">{siteConfig.ownerName}</p>
        <p className="text-sm text-muted-foreground">8+ years curating verified stays across Goa</p>
      </div>
    </div>
  )
}