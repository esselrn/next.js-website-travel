import Text from '@/components/atoms/text'

export default function BenefitItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <Text variant="title" color="light">
        {title}
      </Text>
      <Text color="light">{desc}</Text>
    </div>
  )
}
