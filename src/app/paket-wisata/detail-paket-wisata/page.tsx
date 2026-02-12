import PageHeaderSection from '@/components/organisms/detail-header-paket'
import GallerySection from '@/components/organisms/gallery-paket'
import DetailLayout from '@/components/layouts/detail-layout'
import BookingSidebar from '@/components/organisms/booking-sidebar-paket'
import ContactCard from '@/components/molecules/contact-card-paket'
import PackageInfo from '@/components/molecules/package-info'
import PackageMeta from '@/components/molecules/package-meta'
import Summary from '@/components/molecules/summary-paket'
import IncludeExcludeSection from '@/components/molecules/include-exclude-paket'
import Itinerary from '@/components/organisms/itinerary-paket'
import LocationMap from '@/components/organisms/lokasi-wisata-paket'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default function DetailPaketWisataPage() {
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
          <PackageInfo />
          <PackageMeta />
          <Summary />
          <IncludeExcludeSection />
          <Itinerary />
          <LocationMap />
        </div>
      </DetailLayout>

      {/* FULL WIDTH NEWSLETTER */}
      <NewsletterSection />
    </main>
  )
}
