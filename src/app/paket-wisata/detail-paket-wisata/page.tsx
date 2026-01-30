import PageHeaderSection from "@/components/sections/paket-wisata/detail/page-header"
import GallerySection from "@/components/sections/paket-wisata/detail/gallery"
import DetailLayout from "@/components/layouts/detail-layout"
import BookingSidebar from "@/components/sections/paket-wisata/detail/booking-sidebar"
import ContactCard from "@/components/sections/paket-wisata/detail/contact-card"
import PackageInfo from "@/components/sections/paket-wisata/detail/package-info"
import PackageMeta from "@/components/sections/paket-wisata/detail/package-meta"
import Summary from "@/components/sections/paket-wisata/detail/summary"
import IncludeExcludeSection from "@/components/sections/paket-wisata/detail/include-exclude"
import Itinerary from "@/components/sections/paket-wisata/detail/itinerary"
import LocationMap from "@/components/sections/paket-wisata/detail/lokasi-wisata"
import NewsletterSection from "@/components/sections/home/newsletter-section"

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