import { MapPin } from "lucide-react"

type LocationProps = {
  location: string
  className?: string
}

export default function Location({ location, className }: LocationProps) {
  return (
    <div
      className={`flex items-center gap-2 text-sm text-white/90 ${className ?? ""}`}
    >
      <MapPin size={16} className="text-[#FB8C00]" />
      <span>{location}</span>
    </div>
  )
}