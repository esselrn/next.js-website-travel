type TextStylingProps = {
  children: string
}

export function SectionSubtitle({ children }: TextStylingProps) {
  return <span className="font-montserrat text-sm tracking-widest text-white/80 mb-2">{children}</span>
}

export function SectionTitle({ children }: TextStylingProps) {
  return <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl">{children}</h1>
}
