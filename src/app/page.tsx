import HeroSection from "@/components/sections/home/hero-section"
import DestinationSection from "@/components/sections/home/destination-section"
import TestimonialSection from "@/components/sections/home/testimonial-section"
import PackageSection from "@/components/sections/home/package-section"
import AdventureCTASection from "@/components/sections/home/adventure-cta"
import BlogSection from "@/components/sections/home/blog-section"
import NewsletterSection from "@/components/sections/home/newsletter-section"

export default function Homepage() {
  return (
    <>
      <HeroSection />
      <DestinationSection />
      <TestimonialSection />
      <PackageSection />
      <AdventureCTASection />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}