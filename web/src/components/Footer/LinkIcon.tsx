import Link from 'next/link'
import React from 'react'

interface LinkIconProps {
  href: string
  title: string
  icon: React.ReactElement
  size?: number
}

export function LinkIcon({ href, title, icon, size = 24 }: LinkIconProps) {
  const iconWithProps = React.cloneElement(icon, {
    size,
    className:
      'inline-block text-primary transition-colors lg:group-hover:text-tertiary',
  })

  return (
    <Link
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className="accessibilityFocus group cursor-pointer rounded-sm"
    >
      {iconWithProps}
    </Link>
  )
}
