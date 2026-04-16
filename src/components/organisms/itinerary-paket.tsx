// src/components/organisms/itinerary-paket.tsx
'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/molecules/section/section-title'
import { MapPinned, ChevronDown } from 'lucide-react'
import type { PackageItinerary } from '@/types/packages'

type Props = {
  itineraries: PackageItinerary[]
}

export default function ItinerarySection({ itineraries }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(null)

  const toggle = (day: number) => {
    setOpenDay(openDay === day ? null : day)
  }

  return (
    <section className="mb-12">
      <SectionTitle icon={<MapPinned size={18} />} title="Itinerary Perjalanan" />
      <div className="w-full h-px bg-gray-200 my-6" />

      <div className="space-y-3">
        {itineraries.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(item.day)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            >
              <span className="font-medium text-[#0B2C4D] text-sm">
                Hari {item.day} – {item.title}
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-200 shrink-0 ${openDay === item.day ? 'rotate-180' : ''}`}
              />
            </button>
            {openDay === item.day && item.description && (
              <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}