'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Destination } from '@/types/destinations'
import PageHeaderDestinasi from '@/components/organisms/destinasi-header'
import DestinationCard from '@/components/organisms/destination-card'
import InformationBanner from '@/components/molecules/information-benner'
import TestimonialSection from '@/components/organisms/testimonial-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default function DestinationPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setDestinations(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Memuat destinasi...</p>
      </div>
    )
  }

  const featured = destinations.slice(0, 2)
  const regular = destinations.slice(2, 5)

  return (
    <>
      <PageHeaderDestinasi />

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

      <InformationBanner />
      <TestimonialSection />
      <NewsletterSection />
    </>
  )
}