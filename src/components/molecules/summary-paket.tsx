import { SectionTitle } from '@/components/molecules/section/section-title'
import { FileText } from 'lucide-react'

type Props = {
  summary: string
}

export default function Summary({ summary }: Props) {
  return (
    <section className="mb-10">
      <SectionTitle icon={<FileText size={18} />} title="Ringkasan" />

      <div className="w-full h-px bg-gray-200 my-6" />

      <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
    </section>
  )
}