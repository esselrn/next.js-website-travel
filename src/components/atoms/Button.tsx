import Link from 'next/link'
import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
  onClick?: () => void
  href?: string // ⬅️ TAMBAHAN
}

export default function Button({ children, size = 'md', variant = 'primary', onClick, href }: ButtonProps) {
  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }[size]

  const variantClass = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50'
  }[variant]

  const className = `inline-flex items-center justify-center rounded-md transition font-medium ${sizeClass} ${variantClass}`

  // 👉 JIKA ADA HREF → JADI LINK (Next.js recommended)
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  // 👉 DEFAULT → BUTTON NORMAL
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}