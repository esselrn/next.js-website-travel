import Image from "next/image"

const guides = [
  {
    name: "Rose Angelina",
    image: "/assets/team/rose.jpg",
  },
  {
    name: "Udin David",
    image: "/assets/team/udin.jpg",
  },
  {
    name: "Siti Melissa",
    image: "/assets/team/siti.jpg",
  },
]

export default function TeamGuideSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Tim Pemandu Wisata Kami
        </h2>
        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          Kami didukung oleh pemandu wisata profesional yang berpengalaman,
          ramah, dan memahami setiap destinasi dengan baik. Tim kami siap
          menemani perjalanan Anda dan memastikan setiap momen liburan berjalan
          lancar dan menyenangkan.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide.name}
            className="relative overflow-hidden rounded-3xl h-[420px]"
          >
            <Image
              src={guide.image}
              alt={guide.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-medium text-lg">
                {guide.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}