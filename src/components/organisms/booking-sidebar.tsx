const bookingFields = [
  { label: "Nama Lengkap", type: "text" },
  { label: "Nomor Telepon", type: "tel" },
  { label: "Email", type: "email" },
  { label: "Tanggal Kunjungan", type: "date" },
  { label: "Jumlah Peserta", type: "number" },
]

export default function BookingSidebar() {
  return (
    <aside className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">

      {/* Header */}
      <div className="bg-[#0B2C4D] px-6 py-5 text-center">
        <h3 className="text-white text-lg font-semibold">
          Pesan Tur Ini
        </h3>
      </div>

      {/* Form */}
      <div className="p-8 space-y-5">
        {bookingFields.map(({ label, type }) => (
          <input
            key={label}
            type={type}
            placeholder={label}
            className="
              w-full h-[54px] px-5
              rounded-lg border border-gray-200
              text-sm text-gray-700
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-orange-400
              focus:border-orange-400
            "
          />
        ))}

        {/* Pesan Tambahan */}
        <textarea
          placeholder="Pesan Tambahan"
          rows={4}
          className="
            w-full px-5 py-4
            rounded-lg border border-gray-200
            text-sm text-gray-700
            shadow-sm resize-none
            focus:outline-none
            focus:ring-2 focus:ring-orange-400
            focus:border-orange-400
          "
        />

        <button
          className="
            w-full h-[54px] mt-2
            bg-[#FB8C00] text-white
            font-semibold rounded-lg
            hover:bg-orange-600
            transition
          "
        >
          PESAN SEKARANG
        </button>
      </div>
    </aside>
  )
}