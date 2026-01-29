import Image from "next/image"

const stats = [
  { value: "20+", label: "Tahun Pengalaman" },
  { value: "2.450+", label: "Pelanggan Puas" },
  { value: "1.250+", label: "Pemandu Profesional" },
  { value: "250+", label: "Destinasi Unggulan" },
]

export default function VisionMissionSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Hero Vision Mission */}
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src="/assets/rajaampat01.jpg"
          alt="Visi dan Misi NusaTrip"
          width={1316}
          height={670}
          className="w-full h-[670px] object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-end pb-12">
          <div className="grid md:grid-cols-2 gap-6 px-6 w-full">
            {/* Visi */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Visi Kami</h3>
              <p className="text-sm leading-relaxed text-white/90">
                Menjadi agen perjalanan terpercaya yang menginspirasi masyarakat
                untuk menjelajahi keindahan Indonesia melalui layanan wisata yang
                berkualitas, aman, dan berkesan.
              </p>
            </div>

            {/* Misi */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Misi Kami</h3>
              <ul className="space-y-3 text-sm text-white/90 list-disc list-inside">
                <li>Menyediakan paket wisata berkualitas dengan harga kompetitif</li>
                <li>Memberikan pelayanan profesional dan ramah</li>
                <li>Mendukung pariwisata lokal dan berkelanjutan</li>
                <li>Mengutamakan kenyamanan dan kepuasan pelanggan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index}>
            <h4 className="text-3xl font-bold text-slate-900">
              {item.value.replace("+", "")}
              <span className="text-orange-500">+</span>
            </h4>
            <p className="text-sm text-slate-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}