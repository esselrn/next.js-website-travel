// src/app/paket-wisata/[slug]/page.tsx

import PageHeaderSection from '@/components/organisms/detail-header-paket'
import GallerySection from '@/components/organisms/gallery-paket'
import DetailLayout from '@/components/layouts/detail-layout'
import BookingSidebar from '@/components/organisms/booking-sidebar-paket'
import ContactCard from '@/components/molecules/contact-card-paket'
import Summary from '@/components/molecules/summary-paket'
import IncludeExcludeSection from '@/components/molecules/include-exclude-paket'
import Itinerary from '@/components/organisms/itinerary-paket'
import LocationMap from '@/components/organisms/lokasi-wisata-paket'
import NewsletterSection from '@/components/organisms/newsletter-section'

/* ======================
   TYPES (DI SINI AJA)
====================== */
type ItineraryType = {
  day: number
  title: string
  description: string
}

type PackageDetail = {
  title: string
  location: string
  summary: string
  package_itineraries: ItineraryType[]
}

type Props = {
  params: {
    slug: string
  }
}

/* ======================
   DATA FETCH (DUMMY DULU)
====================== */
async function getPackageDetail(slug: string): Promise<PackageDetail> {
  return {
    title: 'Paket Wisata Bali 3 Hari',
    location: 'Bali, Indonesia',
    summary: 'Nikmati liburan terbaik di Bali selama 3 hari penuh.',
    package_itineraries: [
      { day: 1, title: 'Kedatangan', description: 'Tiba & check-in' },
      { day: 2, title: 'Wisata', description: 'Tour budaya' },
      { day: 3, title: 'Pulang', description: 'Check-out & bandara' }
    ]
  }
}

/* ======================
   PAGE
====================== */
export default async function PaketWisataDetailPage({ params }: Props) {
  const data = await getPackageDetail(params.slug)

  return (
    <main>
      <PageHeaderSection />

      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <GallerySection />
      </section>

      <DetailLayout
        sidebar={
          <div className="space-y-6">
            <BookingSidebar />
            <ContactCard />
          </div>
        }
      >
        <div>
          <Summary />
          <IncludeExcludeSection />
          <Itinerary />
          <LocationMap />
        </div>
      </DetailLayout>

      <NewsletterSection />
    </main>
  )
}