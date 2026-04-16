import Image from 'next/image'

type Props = {
  quote: string
  name: string
  location: string
  image: string
}

export default function TestimonialCard({ quote, name, location, image }: Props) {
  return (
    <div className="text-center px-6">
      <p className="font-inter text-sm text-gray-700 mb-8 leading-relaxed">“{quote}”</p>

      <div className="flex justify-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </div>

      <div className="flex justify-center gap-1 mb-3 text-[#FB8C00]">★★★★★</div>

      <h4 className="font-montserrat text-sm text-[#0B2C4D] font-semibold">{name}</h4>

      <p className="font-inter text-xs text-gray-500 mt-1">{location}</p>
    </div>
  )
}