'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import BlogCard from '@/components/organisms/blog-card'

type Blog = {
  id: string
  slug?: string
  title: string
  category: string
  date: string
  description: string
  image: string
}

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

export default function BlogArticlePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [visible, setVisible] = useState(INITIAL_COUNT)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id, slug, title, category, date, description, image', { count: 'exact' })
      .order('date', { ascending: false })
      .then(({ data, count }) => {
        if (data) setBlogs(data)
        if (count) setTotal(count)
      })
  }, [])

  return (
    <>
      <section className="relative w-full h-[280px] md:h-[340px]">
        <Image src="/assets/bali01.jpg" alt="Blog" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#0B2C4D]/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <p className="font-inter text-sm uppercase tracking-widest mb-3 opacity-80">BLOG</p>
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl uppercase">Tips & Article</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, visible).map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
          {visible < total && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisible((v) => v + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2 bg-[#FB8C00] hover:bg-orange-600 text-white font-semibold font-inter px-8 py-3 rounded-lg transition"
              >
                LIHAT SEMUA <span>→</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}