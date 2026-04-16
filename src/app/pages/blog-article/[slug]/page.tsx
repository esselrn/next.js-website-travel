'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import MetaInfo from '@/components/atoms/meta-info'
import CommentForm from '@/components/molecules/comment-form'
import { User, CalendarDays, Folder } from 'lucide-react'

type Blog = {
  id: string
  title: string
  category: string
  date: string
  description: string
  image: string
  hero_image: string
  content: string
  author: string
  gallery_images: string[]
}

function splitContent(html: string) {
  const headings = [...html.matchAll(/<h3/g)]
  if (headings.length < 2) return { before: html, after: '' }
  const splitIndex = headings[1].index!
  return { before: html.slice(0, splitIndex), after: html.slice(splitIndex) }
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const slugStr = Array.isArray(slug) ? slug[0] : slug
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    if (!slugStr) return
    const fetch = async () => {
      // Coba slug dulu, fallback ke id
      let { data } = await supabase.from('blogs').select('*').eq('slug', slugStr).single()
      if (!data) {
        const { data: fallback } = await supabase.from('blogs').select('*').eq('id', slugStr).single()
        data = fallback
      }
      if (data) setBlog(data)
    }
    fetch()
  }, [slugStr])

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Memuat artikel...</p>
      </div>
    )

  const { before, after } = splitContent(blog.content || '')

  return (
    <>
      <section className="relative w-full h-[260px] md:h-[320px]">
        <Image src={blog.hero_image || blog.image} alt={blog.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-montserrat font-bold text-white text-2xl md:text-4xl uppercase mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <MetaInfo icon={<User size={16} />} text={blog.author} />
              <MetaInfo icon={<CalendarDays size={16} />} text={blog.date} />
              <MetaInfo icon={<Folder size={16} />} text={blog.category} />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 mt-10 mb-10">
        <div className="relative w-full max-w-[1316px] mx-auto h-[240px] sm:h-[420px] lg:h-[520px]">
          <Image src={blog.hero_image || blog.image} alt={blog.title} fill priority className="object-cover rounded-xl" />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-[173px] mb-16">
        <div className="w-full max-w-[970px] mx-auto">
          <div
            className="
            [&_h2]:font-montserrat [&_h2]:text-[#0B2C4D] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-0
            [&_h3]:font-montserrat [&_h3]:text-[#0B2C4D] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:border-b [&_h3]:border-blue-100 [&_h3]:pb-2
            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px]
          "
            dangerouslySetInnerHTML={{ __html: before }}
          />

          {blog.gallery_images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-10">
              {blog.gallery_images.map((img, i) => (
                <div key={i} className="relative h-[220px] sm:h-[350px] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {after && (
            <div
              className="
              [&_h2]:font-montserrat [&_h2]:text-[#0B2C4D] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8
              [&_h3]:font-montserrat [&_h3]:text-[#0B2C4D] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:border-b [&_h3]:border-blue-100 [&_h3]:pb-2
              [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px]
            "
              dangerouslySetInnerHTML={{ __html: after }}
            />
          )}

          <div className="mt-16">
            <CommentForm />
          </div>
        </div>
      </section>
    </>
  )
}