import Link from 'next/link'

type NavLinkProps = {
  href: string
  label: string
  onClick?: () => void
}

export default function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link href={href} onClick={onClick} className="hover:text-orange-400 transition">
      {label}
    </Link>
  )
}