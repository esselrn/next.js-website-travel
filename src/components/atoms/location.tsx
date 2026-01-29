type LocationProps = {
  location: string
}

export default function Location({ location }: LocationProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-[#FB8C00]">📍</span>
      <span>{location}</span>
    </div>
  )
}