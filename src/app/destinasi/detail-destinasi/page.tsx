import PageHeaderSection from "@/components/sections/destinasi/detail/page-header"
import GallerySection from "@/components/sections/destinasi/detail/gallery"
import DetailLayout from "@/components/layouts/detail-layout"
import BookingSidebar from "@/components/sections/destinasi/detail/booking-sidebar"

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
            
          </div>
        }
      >
        <div>
          
        </div>
      </DetailLayout>
    </main>
  )
}