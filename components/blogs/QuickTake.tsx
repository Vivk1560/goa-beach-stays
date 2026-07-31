export function QuickTake({ text }: { text: string }) {
  return (
    <aside className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick Take</p>
      <p className="mt-2 leading-relaxed text-foreground">{text}</p>
    </aside>
  )
}