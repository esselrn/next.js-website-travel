import Button from '@/components/atoms/button'

export default function BlogHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
      <div>
        <h2 className="font-montserrat text-3xl font-bold text-[#0B2C4D]">Blog & Artikel Wisata</h2>
        <p className="mt-2 font-inter text-gray-600 max-w-xl">
          Inspirasi perjalanan, tips liburan, dan rekomendasi destinasi terbaik di Indonesia untuk menemani rencana
          liburanmu.
        </p>
      </div>

      <Button>
        LIHAT SEMUA <span>→</span>
      </Button>
    </div>
  )
}
