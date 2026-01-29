import SectionSubtitle from "@/components/atoms/section-subtitle"
import SectionTitle from "@/components/atoms/section-title"

type HeroContentProps = {
  subtitle: string
  title: string
}

export default function AboutHeroContent({ subtitle, title }: HeroContentProps) {
  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      <SectionTitle>{title}</SectionTitle>
    </div>
  )
}