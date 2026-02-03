import PageHeaderSection from '@/components/sections/destinasi/detail/page-header'
import GallerySection from '@/components/sections/destinasi/detail/gallery'
import DetailLayout from '@/components/layouts/detail-layout'
import BookingSidebar from '@/components/sections/destinasi/detail/booking-sidebar'
import ContactCard from '@/components/sections/destinasi/detail/contact-card'
import Summary from '@/components/sections/destinasi/detail/summary'
import IncludeExcludeSection from '@/components/sections/destinasi/detail/include-exclude'
import Itinerary from '@/components/sections/destinasi/detail/itinerary'
import LocationMap from '@/components/sections/destinasi/detail/lokasi-wisata'

export default function DetailDestinasiPage() {
  return (
    <main>
      {/* HEADER */}
      <PageHeaderSection />

      {/* FULL WIDTH GALLERY */}
      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <GallerySection />
      </section>

      {/* CONTENT + SIDEBAR */}
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
    </main>
  )
}
