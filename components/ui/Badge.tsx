interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const styles = {
    default: 'bg-primary/10 text-primary',
    accent: 'bg-accent/15 text-accent',
    outline: 'border border-current/30 text-foreground',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}