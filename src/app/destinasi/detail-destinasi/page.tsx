import PageHeaderSection from '@/components/organisms/page-header'
import GallerySection from '@/components/organisms/gallery'
import DetailLayout from '@/components/layouts/detail-layout'
import BookingSidebar from '@/components/organisms/booking-sidebar'
import ContactCard from '@/components/molecules/contact-card'
import Summary from '@/components/molecules/summary'
import IncludeExcludeSection from '@/components/molecules/include-exclude'
import Itinerary from '@/components/organisms/itinerary'
import LocationMap from '@/components/organisms/lokasi-wisata'

export default function DetailDestinasiPage() {
  return (
    <main>
      {/* HEADER */}
      <PageHeaderSection />

      {/* FULL WIDTH GALLERY */}
      <section className="max-w-[1200px] mx-auto px-6 mt-6 lg:mt-16">
        <GallerySection />
      </section>

      {/* CONTENT + SIDEBAR */}
      <DetailLayout
        sidebar={
          <div className="space-y-6 mt-4 lg:mt-0">
            <BookingSidebar />
            <ContactCard />
          </div>
        }
      >
        <div className="space-y-10">
          <Summary />
          <IncludeExcludeSection />
          <Itinerary />
          <LocationMap />
        </div>
      </DetailLayout>
    </main>
  )
}