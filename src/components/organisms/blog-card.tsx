import Image from 'next/image'
import Link from 'next/link'

type BlogCardProps = {
  id: string
  slug?: string
  title: string
  category: string
  date: string
  description: string
  image: string
}

export default function BlogCard({ id, slug, title, category, date, description, image }: BlogCardProps) {
  const href = `/pages/blog-article/${slug ?? id}`

  return (
    <div className="group">
      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition" />
        <span className="absolute bottom-4 left-4 bg-white text-[#0B2C4D] text-sm font-inter px-3 py-1 rounded-md shadow">
          {category}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-montserrat text-lg font-semibold text-[#0B2C4D]">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 font-inter">{date}</p>
        <p className="mt-3 font-inter text-gray-600 text-sm line-clamp-3">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 mt-4 font-inter font-semibold text-[#FB8C00] hover:underline"
        >
          BACA SELENGKAPNYA <span>→</span>
        </Link>
      </div>
    </div>
  )
}