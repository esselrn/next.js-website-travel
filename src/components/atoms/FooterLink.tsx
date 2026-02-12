type FooterLinkProps = {
  children: string
}

export default function FooterLink({ children }: FooterLinkProps) {
  return (
    <li className="text-sm text-white/80 font-inter">{children}</li>
  )
}