type SectionTitleProps = {
  children: string
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl">
      {children}
    </h1>
  )
}