type FooterTitleProps = {
  children: string
}

export default function FooterTitle({ children }: FooterTitleProps) {
  return (
    <h4 className="font-montserrat font-semibold text-[#FB8C00] mb-4">{children}</h4>
  )
}