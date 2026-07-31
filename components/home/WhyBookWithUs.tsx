import { CheckCircle2 } from 'lucide-react'
import { stats } from '@/lib/site-config'

const FEATURES = [
  'Verified properties — personally inspected',
  'Local expertise — 8+ years in Goa hospitality',
  'WhatsApp support — real human, real fast',
  'Best rate guarantee — no hidden markups',
  'Curated selection — not a faceless listing site',
]

export function WhyBookWithUs() {
  return (
    <section className="bg-warm-tint py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-6 self-center">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-6 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="self-center">
          <h2 className="mb-6 font-heading text-3xl font-semibold text-foreground">Why Book With Us</h2>
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}