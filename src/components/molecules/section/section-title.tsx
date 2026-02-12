import { ReactNode } from "react"

interface SectionTitleProps {
  icon: ReactNode
  title: string
}

export function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-orange-500">
        {icon}
      </span>
      <h3 className="font-semibold text-[#0B2C4D] text-base">
        {title}
      </h3>
    </div>
  )
}