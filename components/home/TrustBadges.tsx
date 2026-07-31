import { stats } from '@/lib/site-config'

export function TrustBadges() {
  return (
    <section className="border-b border-border bg-warm-tint">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-center sm:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-xl font-bold text-primary md:text-2xl">{stat.value}</p>
            <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}