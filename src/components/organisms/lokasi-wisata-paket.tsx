// src/components/organisms/lokasi-wisata-paket.tsx
import { SectionTitle } from '@/components/molecules/section/section-title'
import { MapPin } from 'lucide-react'

type Props = {
  fullLocation: string
}

export default function LocationMap({ fullLocation }: Props) {
  const encodedLocation = encodeURIComponent(fullLocation)

  return (
    <div className="mb-10">
      <SectionTitle icon={<MapPin size={18} />} title="Lokasi Wisata" />
      <div className="w-full h-px bg-gray-200 mb-6" />
      <div className="w-full h-[280px] rounded-xl overflow-hidden border border-gray-200">
        <iframe
          src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          title={`Lokasi ${fullLocation}`}
        />
      </div>
    </div>
  )
}