// src/app/paket-wisata/page.tsx
import { supabase } from '@/lib/supabase'
import PageHeaderPaket from '@/components/organisms/paket-wisata-header'
import PackagesSection from '@/components/organisms/package-section'
import DestinationGallerySection from '@/components/organisms/destination-gallery'
import BlogSection from '@/components/organisms/blog-section'
import NewsletterSection from '@/components/organisms/newsletter-section'

export default async function PaketWisataPage() {
  const { data: packages } = await supabase.from('packages').select('*').order('created_at', { ascending: false })

  return (
    <>
      <PageHeaderPaket />
      <PackagesSection packages={packages ?? []} />
      <DestinationGallerySection />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}
