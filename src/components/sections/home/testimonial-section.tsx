import TestimonialCard from "@/components/organisms/testimonial-card"
import { testimonials } from "@/constants/testimonials"

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">

        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">
            Testimoni Wisatawan
          </h2>
          <p className="font-inter text-sm md:text-base text-gray-600">
            Cerita dan pengalaman nyata dari wisatawan yang
            telah menjelajahi Indonesia bersama NusaTrip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>

      </div>
    </section>
  )
}