import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  /** Optional element (e.g. a CTA button) rendered alongside the heading instead of below it. */
  action?: ReactNode
}

export function SectionHeader({ title, subtitle, align = 'center', action }: SectionHeaderProps) {
  if (action) {
    return (
      <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className={align === 'center' ? 'text-center sm:text-left' : ''}>
          <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    )
  }

  return (
    <div className={`mb-10 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : ''}`}>
      <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}