'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/organisms/hero-section'
import DestinationSection from '@/components/organisms/destination-section'
import TestimonialSection from '@/components/organisms/testimonial-section'
import PackageSection from '@/components/organisms/package-section'
import AdventureCTASection from '@/components/organisms/adventure-cta'
import BlogSection from '@/components/organisms/blog-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default function Homepage() {
  useEffect(() => {
    console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  }, [])

  return (
    <>
      <HeroSection />
      <DestinationSection variant="home" />
      <TestimonialSection />
      <PackageSection variant="home" />
      <AdventureCTASection />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}