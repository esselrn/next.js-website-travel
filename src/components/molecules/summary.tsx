// src/components/molecules/summary.tsx
import { SectionTitle } from '@/components/molecules/section/section-title'
import { FileText } from 'lucide-react'

type Props = {
  summary: string
}

export default function Summary({ summary }: Props) {
  return (
    <div className="mb-10">
      <SectionTitle icon={<FileText size={18} />} title="Ringkasan" />
      <div className="w-full h-px bg-gray-200 mb-8" />
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{summary}</p>
    </div>
  )
}