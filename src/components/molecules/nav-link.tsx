import Link from 'next/link'

export type NavLinkProps = {
  href: string
  label: string
  onClick?: () => void
  scrolled?: boolean
}

export default function NavLink({ href, label, onClick, scrolled }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`hover:text-orange-400 transition ${scrolled ? 'text-[#0B2C4D]' : 'text-white'}`}
    >
      {label}
    </Link>
  )
}