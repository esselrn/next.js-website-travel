import { ReactNode } from "react"

interface InfoItemProps {
  icon: ReactNode
  label: string
  value: string
}

export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#FB8C00]">
        {icon}
      </div>

      <div className="text-sm">
        <p className="font-semibold text-[#0B2C4D]">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  )
}