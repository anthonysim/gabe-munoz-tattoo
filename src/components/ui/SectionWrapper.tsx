interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ children, className = '' }: SectionWrapperProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 py-24 ${className}`}>
      {children}
    </div>
  )
}
