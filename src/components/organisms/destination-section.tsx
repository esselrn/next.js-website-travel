// src/components/organisms/destination-section.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import DestinationCard from '@/components/organisms/destination-card'
import type { Destination } from '@/types/destinations'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type Props = {
  variant?: 'home' | 'page'
}

export default function DestinationSection({ variant = 'page' }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setDestinations(data)
      })
  }, [])

  const featured = destinations.slice(0, 2)
  const regular = destinations.slice(2, 5)

  if (variant === 'home') {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Destinasi Unggulan Indonesia</h2>
            <p className="text-gray-600">Jelajahi destinasi wisata terbaik pilihan kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featured.map((item) => (
              <DestinationCard key={item.id} {...item} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regular.map((item) => (
              <DestinationCard key={item.id} {...item} small />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Destinasi Unggulan Indonesia</h2>
          <p className="text-gray-600">
            Jelajahi destinasi wisata paling populer di Indonesia dengan paket perjalanan terbaik dan terpercaya dari
            NusaTrip.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featured.map((item) => (
            <DestinationCard key={item.id} {...item} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((item) => (
            <DestinationCard key={item.id} {...item} small />
          ))}
        </div>
      </div>
    </section>
  )
}