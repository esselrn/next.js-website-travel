import Image from "next/image"
import Rating from "@/components/atoms/rating"
import Price from "@/components/atoms/price"
import Button from "@/components/atoms/button"

type DestinationCardProps = {
  image: string
  title: string
  rating: number
  description: string
  price: string
  small?: boolean
}

export default function DestinationCard({
  image,
  title,
  rating,
  description,
  price,
  small = false,
}: DestinationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div
        className={`relative w-full ${
          small ? "h-[180px]" : "h-[260px]"
        }`}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-5">
        <h3 className="font-montserrat text-lg text-[#0B2C4D] mb-1">
          {title}
        </h3>

        <Rating value={rating} />

        <p className="font-inter text-sm text-gray-600 my-4">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <Price value={price} />
          <Button>PESAN SEKARANG →</Button>
        </div>
      </div>
    </div>
  )
}