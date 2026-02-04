import BlogHeader from "@/components/organisms/blog-header"
import BlogCard from "@/components/organisms/blog-card"
import { blogs } from "@/constants/blogs"

export default function BlogSection() {
  return (
    <section className="py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <BlogHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  )
}