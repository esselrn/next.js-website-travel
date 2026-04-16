import { ReactNode } from 'react'

interface MetaInfoProps {
  icon: ReactNode
  text: string
}

export default function MetaInfo({ icon, text }: MetaInfoProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-200">
      <span className="text-[#FB8C00]">{icon}</span>
      <span>{text}</span>
    </div>
  )
}