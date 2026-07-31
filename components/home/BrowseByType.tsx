import Link from 'next/link'
import { Waves, Sun, Landmark, Trees, Heart, Users, Eye, Briefcase } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const TYPES = [
  { label: 'Private Pool Villa', href: '/private-pool-villas-in-goa', icon: Waves },
  { label: 'Beachfront Villa', href: '/beachfront-villas-goa', icon: Sun },
  { label: 'Heritage Villa', href: '/heritage-villas-goa', icon: Landmark },
  { label: 'Jungle Villa', href: '/jungle-villas-goa', icon: Trees },
  { label: 'Family Villa', href: '/family-villas-goa', icon: Users },
  { label: 'Couple Villa', href: '/couple-villas-goa', icon: Heart },
  { label: 'Sea View Villa', href: '/sea-view-villas-goa', icon: Eye },
  { label: 'Corporate Villa', href: '/corporate-villas-goa', icon: Briefcase },
]

export function BrowseByType() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <SectionHeader title="Browse Villas by Type" />
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
        {TYPES.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex min-w-[140px] flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-accent hover:bg-warm-tint"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-6" />
            </span>
            <span className="text-sm font-medium text-foreground">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}