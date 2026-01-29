import PageHeaderSection from "@/components/sections/paket-wisata/detail/page-header"
import DetailLayout from "@/components/layouts/detail-layout"
import GallerySection from "@/components/sections/paket-wisata/detail/gallery"
import SidebarBooking from "@/components/sections/paket-wisata/detail/booking-sidebar"

export default function DetailPaketWisataPage() {
  return (
    <>
      <PageHeaderSection />

      <DetailLayout
        sidebar={<SidebarBooking />}
      >
        <GallerySection />
        {/* section lain menyusul */}
      </DetailLayout>
    </>
  )
}
