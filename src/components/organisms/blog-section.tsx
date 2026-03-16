'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import BlogHeader from '@/components/organisms/blog-header'
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

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id, slug, title, category, date, description, image')
      .order('date', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setBlogs(data)
      })
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <BlogHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  )
}