import FooterTitle from "@/components/atoms/footer-title"
import FooterLink from "@/components/atoms/footer-link"

type FooterColumnProps = {
  title: string
  links: string[]
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <FooterLink key={i}>{link}</FooterLink>
        ))}
      </ul>
    </div>
  )
}