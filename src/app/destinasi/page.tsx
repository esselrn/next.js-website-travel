import PageHeaderSection from "@/components/sections/destinasi/page-header"
import DestinationSection from "@/components/sections/home/destination-section"
import InformationBanner from "@/components/sections/destinasi/information-benner"
import TestimonialSection from "@/components/sections/home/testimonial-section"
import NewsletterSection from "@/components/sections/home/newsletter-section"

export default function DestinasiPage() {
  return (
    <>
      <PageHeaderSection />
      <DestinationSection />
      <InformationBanner />
      <TestimonialSection />
      <NewsletterSection />
    </>
  )
}