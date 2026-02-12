import { SectionTitle } from "@/components/molecules/section/section-title"
import { MapPin } from "lucide-react"

export default function LocationMap() {
  return (
    <div className="mb-10">
      <SectionTitle icon={<MapPin size={18} />} title="Lokasi Wisata" />
      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10"></div>

      <div className="w-full h-[280px] rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=Raja+Ampat&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}