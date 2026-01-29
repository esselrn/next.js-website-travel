import PageHeaderSection from "@/components/sections/paket-wisata/detail/page-header"
import GallerySection from "@/components/sections/paket-wisata/detail/gallery"
import DetailLayout from "@/components/layouts/detail-layout"
import BookingSidebar from "@/components/sections/paket-wisata/detail/booking-sidebar"

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
      <DetailLayout sidebar={<BookingSidebar />}>
        <div>
          {/* nanti diisi:
              - Info Paket
              - Include / Exclude
              - Itinerary
              - Map
          */}
        </div>
      </DetailLayout>
    </main>
  )
}