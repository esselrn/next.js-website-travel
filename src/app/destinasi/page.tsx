import PageHeaderSection from '@/components/organisms/detail-page-header'
import DestinationSection from '@/components/organisms/destination-section'
import InformationBanner from '@/components/molecules/information-benner'
import TestimonialSection from '@/components/organisms/testimonial-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

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
