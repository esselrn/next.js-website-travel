type SectionSubtitleProps = {
  children: string
}

export default function SectionSubtitle({ children }: SectionSubtitleProps) {
  return (
    <span className="font-montserrat text-sm tracking-widest text-white/80 mb-2">
      {children}
    </span>
  )
}