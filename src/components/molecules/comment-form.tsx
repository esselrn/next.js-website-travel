'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Input from '@/components/atoms/input'
import Button from '@/components/atoms/button'

export default function CommentForm() {
  const { id: blog_id } = useParams()

  const [form, setForm] = useState({
    name: '',
    email: '',
    website: '',
    comment: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.comment) {
      setError('Nama, email, dan komentar wajib diisi.')
      return
    }

    setLoading(true)
    setError('')

    const { error: supabaseError } = await supabase.from('comments').insert([
      {
        blog_id,
        name: form.name,
        email: form.email,
        website: form.website || null,
        comment: form.comment
      }
    ])

    setLoading(false)

    if (supabaseError) {
      setError('Gagal mengirim komentar. Coba lagi.')
    } else {
      setSuccess(true)
      setForm({ name: '', email: '', website: '', comment: '' })
    }
  }

  return (
    <section className="w-full max-w-[970px] mx-auto mb-24">
      <h3 className="text-lg sm:text-xl font-semibold text-[#0B2C4D] mb-2">Tinggalkan Komentar</h3>
      <p className="text-sm text-gray-500 mb-6">
        Alamat email Anda tidak akan dipublikasikan. Kolom wajib diisi ditandai dengan *
      </p>

      {success && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          ✅ Komentar berhasil dikirim! Terima kasih.
        </div>
      )}

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">⚠️ {error}</div>
      )}

      {/* KOMENTAR */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Komentar *</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Tulis komentar Anda..."
          className="w-full min-h-[140px] sm:min-h-[180px] p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#FB8C00] outline-none text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Nama *</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Nama Anda" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Email *</label>
          <Input name="email" value={form.email} onChange={handleChange} placeholder="Email Anda" />
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium text-[#0B2C4D]">Website</label>
        <Input name="website" value={form.website} onChange={handleChange} placeholder="Website (opsional)" />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Mengirim...' : 'KIRIM KOMENTAR'}
      </Button>
    </section>
  )
}
