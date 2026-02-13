import Input from '@/components/atoms/input'
import Button from '@/components/atoms/button'

export default function CommentForm() {
  return (
    <section className="w-full px-4 sm:px-6 max-w-none sm:max-w-[970px] mx-auto mb-24">
      <h3 className="text-lg sm:text-xl font-semibold text-[#0B2C4D] mb-2">Tinggalkan Komentar</h3>

      <p className="text-sm text-gray-500 mb-6">
        Alamat email Anda tidak akan dipublikasikan. Kolom wajib diisi ditandai dengan *
      </p>

      {/* KOMENTAR */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Komentar *</label>
        <textarea
          className="w-full min-h-[140px] sm:min-h-[180px] p-4 border border-gray-300 rounded-lg shadow-sm
          focus:ring-2 focus:ring-[#FB8C00] outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Nama *</label>
          <Input placeholder="Nama Anda" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Email *</label>
          <Input placeholder="Email Anda" />
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Website</label>
        <Input placeholder="Website (opsional)" />
      </div>

      <Button>KIRIM KOMENTAR</Button>
    </section>
  )
}
