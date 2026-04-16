// src/components/organisms/itinerary.tsx
import { SectionTitle } from '@/components/molecules/section/section-title'
import { Map } from 'lucide-react'
import { DestinationItinerary } from '@/services/destinations.service'

type Props = {
  itinerary: DestinationItinerary[]
}

export default function Itinerary({ itinerary }: Props) {
  return (
    <div className="mb-10">
      <SectionTitle icon={<Map size={18} />} title="Rencana Perjalanan" />
      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="space-y-3">
        {itinerary.map((item) => (
          <details key={item.id} className="border rounded-lg px-5 py-4 shadow-sm cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-sm text-[#0B2C4D]">
              <span>
                {item.time_range} | {item.title}
              </span>
            </summary>
            {item.description && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.description}</p>}
          </details>
        ))}
      </div>
    </div>
  )
}