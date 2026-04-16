import { SectionSubtitle, SectionTitle } from '@/components/atoms/text-styling'

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
