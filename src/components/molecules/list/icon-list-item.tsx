import { ReactNode } from "react"

interface IconListItemProps {
  icon: ReactNode
  text: string
}

export function IconListItem({ icon, text }: IconListItemProps) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-600">
      {icon}
      <span>{text}</span>
    </li>
  )
}