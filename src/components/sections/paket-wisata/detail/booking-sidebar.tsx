const bookingFields = [
  "Nama Lengkap",
  "Nomor Telepon",
  "Email",
  "Tanggal Keberangkatan",
  "Jumlah Peserta",
]

export default function BookingSidebar() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">

      {/* Header */}
      <div className="bg-[#0B2C4D] px-6 py-5">
        <h3 className="text-white text-lg font-semibold">
          Pesan Tur Ini
        </h3>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">
        {bookingFields.map((label) => (
          <input
            key={label}
            placeholder={label}
            className="w-full h-[52px] px-4 rounded-lg border border-gray-300 text-sm
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        ))}

        <button className="w-full h-[52px] mt-2 bg-[#FB8C00] text-white font-semibold rounded-lg hover:bg-orange-600 transition">
          PESAN SEKARANG
        </button>
      </div>

    </div>
  )
}