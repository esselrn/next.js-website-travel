export default function ContactForm() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10">
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Nama Anda"
          className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="email"
          placeholder="Email Anda"
          className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="text"
          placeholder="Subjek"
          className="w-full border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <textarea
          placeholder="Pesan Anda"
          rows={5}
          className="w-full border rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
        >
          KIRIM PESAN
        </button>
      </form>
    </div>
  )
}
