import { supabase } from '@/lib/supabase'
import type { Package, PackageImage, PackageInclude, PackageItinerary } from '@/types/packages'
import DetailLayout from '@/components/layouts/detail-layout'
import PageHeaderSection from '@/components/organisms/detail-header-paket'
import GallerySection from '@/components/organisms/gallery-paket'
import PackageHeroSection from '@/components/organisms/package-hero-section'
import Summary from '@/components/molecules/summary-paket'
import IncludeExcludeSection from '@/components/molecules/include-exclude-paket'
import ItinerarySection from '@/components/organisms/itinerary-paket'
import LocationMap from '@/components/organisms/lokasi-wisata-paket'
import BookingSidebar from '@/components/organisms/booking-sidebar-paket'
import ContactCard from '@/components/molecules/contact-card'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default async function PaketDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Coba cari by slug dulu, fallback ke id (backward compat)
  let { data: paket } = await supabase.from('packages').select('*').eq('slug', slug).single()
  if (!paket) {
    const { data: fallback } = await supabase.from('packages').select('*').eq('id', slug).single()
    paket = fallback
  }

  if (!paket) return <div className="text-center py-20 text-gray-500">Paket tidak ditemukan</div>

  const [{ data: images }, { data: includes }, { data: excludes }, { data: itineraries }] = await Promise.all([
    supabase.from('package_images').select('*').eq('package_id', paket.id).order('sort_order'),
    supabase.from('package_includes').select('*').eq('package_id', paket.id).eq('is_included', true).order('sort_order'),
    supabase.from('package_includes').select('*').eq('package_id', paket.id).eq('is_included', false).order('sort_order'),
    supabase.from('package_itineraries').select('*').eq('package_id', paket.id).order('day')
  ])

  const sidebar = (
    <div className="flex flex-col gap-6">
      <BookingSidebar packageId={paket.id} pricePerPerson={paket.price_per_person} />
      <ContactCard name={paket.name} />
    </div>
  )

  return (
    <>
      <PageHeaderSection title={paket.name} location={paket.location} backgroundImage={paket.cover_image_url} />
      <section className="max-w-[1200px] mx-auto px-6 mt-6 lg:mt-16">
        <GallerySection images={(images ?? []) as PackageImage[]} />
      </section>
      <DetailLayout sidebar={sidebar}>
        <PackageHeroSection paket={paket as Package} />
        <Summary summary={paket.summary} />
        <IncludeExcludeSection
          includes={(includes ?? []) as PackageInclude[]}
          excludes={(excludes ?? []) as PackageInclude[]}
        />
        <ItinerarySection itineraries={(itineraries ?? []) as PackageItinerary[]} />
        <LocationMap fullLocation={paket.full_location} />
      </DetailLayout>
      <NewsletterSection />
    </>
  )
}