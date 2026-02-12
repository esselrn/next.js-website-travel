import PageHeaderSection from '@/components/organisms/article-header'
import ArticleHeroImage from '@/components/molecules/article-hero-image'
import ArticleContent from '@/components/molecules/article-content'
import ArticleGallery from '@/components/organisms/article-gallery'
import CommentForm from '@/components/molecules/comment-form'

export default function BlogDetailPage() {
  return (
    <>
      <PageHeaderSection />

      {/* JARAK SETELAH HEADER */}
      <div className="pt-24 sm:pt-[100px]" />

      {/* FOTO BESAR */}
      <ArticleHeroImage />

      {/* KONTEN */}
      <section className="mt-16 px-4 sm:px-6 lg:px-[173px]">
        <ArticleContent />
        <ArticleGallery />
        <CommentForm />
      </section>
    </>
  )
}