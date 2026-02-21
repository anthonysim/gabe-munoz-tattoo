interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline'
  as?: 'button' | 'a'
  href?: string
}

export function Button({
  children,
  variant = 'gold',
  as: Tag = 'button',
  href,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-block px-8 py-3 text-sm font-body font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer'

  const variants = {
    gold: 'bg-gold text-bg hover:bg-gold-light',
    outline:
      'border border-gold text-gold hover:bg-gold hover:text-bg',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
