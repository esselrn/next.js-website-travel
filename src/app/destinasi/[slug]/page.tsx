'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Destination, DestinationImage, DestinationInclude, DestinationItinerary } from '@/types/destinations'
import PageHeaderSection from '@/components/organisms/detail-header-destinasi'
import GallerySection from '@/components/organisms/gallery'
import DestinationHeroSection from '@/components/organisms/destination-hero-section'
import DetailLayout from '@/components/layouts/detail-layout'
import BookingSidebar from '@/components/organisms/booking-sidebar'
import ContactCard from '@/components/molecules/contact-card'
import Summary from '@/components/molecules/summary'
import IncludeExcludeSection from '@/components/molecules/include-exclude'
import Itinerary from '@/components/organisms/itinerary'
import LocationMap from '@/components/organisms/lokasi-wisata'

export default function DetailDestinasiPage() {
  const { slug } = useParams()
  const slugStr = Array.isArray(slug) ? slug[0] : slug

  const [destination, setDestination] = useState<Destination | null>(null)
  const [images, setImages] = useState<DestinationImage[]>([])
  const [includes, setIncludes] = useState<DestinationInclude[]>([])
  const [excludes, setExcludes] = useState<DestinationInclude[]>([])
  const [itinerary, setItinerary] = useState<DestinationItinerary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slugStr) return

    const fetchData = async () => {
      // Coba slug dulu, fallback ke id
      let { data: dest } = await supabase.from('destinations').select('*').eq('slug', slugStr).single()
      if (!dest) {
        const { data: fallback } = await supabase.from('destinations').select('*').eq('id', slugStr).single()
        dest = fallback
      }
      if (!dest) {
        setLoading(false)
        return
      }

      const [{ data: imgs }, { data: inc }, { data: exc }, { data: itin }] = await Promise.all([
        supabase.from('destination_images').select('*').eq('destination_id', dest.id).order('sort_order'),
        supabase
          .from('destination_includes')
          .select('*')
          .eq('destination_id', dest.id)
          .eq('is_included', true)
          .order('sort_order'),
        supabase
          .from('destination_includes')
          .select('*')
          .eq('destination_id', dest.id)
          .eq('is_included', false)
          .order('sort_order'),
        supabase.from('destination_itinerary').select('*').eq('destination_id', dest.id).order('sort_order')
      ])

      setDestination(dest)
      setImages(imgs ?? [])
      setIncludes(inc ?? [])
      setExcludes(exc ?? [])
      setItinerary(itin ?? [])
      setLoading(false)
    }

    fetchData()
  }, [slugStr])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Memuat detail destinasi...</p>
      </div>
    )

  if (!destination) return <p className="text-center mt-20 text-gray-500">Destinasi tidak ditemukan.</p>

  return (
    <main>
      <PageHeaderSection
        title={destination.name}
        location={destination.full_location}
        backgroundImage={destination.cover_image_url}
      />
      <section className="max-w-[1200px] mx-auto px-6 mt-6 lg:mt-16">
        <GallerySection images={images} />
      </section>
      <DetailLayout
        sidebar={
          <div className="space-y-6 mt-4 lg:mt-0">
            <BookingSidebar destinationId={destination.id} pricePerPerson={destination.price_per_person} />
            <ContactCard name={destination.name} />
          </div>
        }
      >
        <div className="space-y-10">
          <DestinationHeroSection destination={destination} />
          <Summary summary={destination.summary} />
          <IncludeExcludeSection includes={includes} excludes={excludes} />
          <Itinerary itinerary={itinerary} />
          <LocationMap fullLocation={destination.full_location} />
        </div>
      </DetailLayout>
    </main>
  )
}