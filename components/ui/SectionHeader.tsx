interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : ''}`}>
      <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}