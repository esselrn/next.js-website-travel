// src/app/page.tsx
import { supabase } from '@/lib/supabase'
import HeroSection from '@/components/organisms/hero-section'
import DestinationSection from '@/components/organisms/destination-section'
import TestimonialSection from '@/components/organisms/testimonial-section'
import PackageSection from '@/components/organisms/package-section'
import AdventureCTASection from '@/components/organisms/adventure-cta'
import BlogSection from '@/components/organisms/blog-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default async function Page() {
  const { data: packages } = await supabase.from('packages').select('*').order('created_at', { ascending: false })

  return (
    <>
      <HeroSection />
      <DestinationSection variant="home" />
      <TestimonialSection />
      <PackageSection variant="home" packages={packages ?? []} />
      <AdventureCTASection />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}