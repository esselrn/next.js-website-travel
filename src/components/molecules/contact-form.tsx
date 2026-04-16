'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Mail, BookOpen, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Semua kolom wajib diisi.')
      return
    }
    setLoading(true)
    const { error: supabaseError } = await supabase.from('contacts').insert([
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      }
    ])
    setLoading(false)
    if (supabaseError) {
      setError('Gagal mengirim pesan. Silakan coba lagi.')
    } else {
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 flex flex-col items-center justify-center text-center min-h-[400px] gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-[#0B2C4D]">Pesan Terkirim!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Terima kasih telah menghubungi kami. Tim NusaTrip akan membalas pesan Anda dalam 1x24 jam.
        </p>
        <button onClick={() => setSuccess(false)} className="mt-2 text-sm text-orange-500 hover:underline font-medium">
          Kirim pesan lain →
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0B2C4D] mb-1">Kirim Pesan</h2>
        <p className="text-sm text-gray-500">Isi formulir di bawah dan kami akan segera merespons.</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* NAMA & EMAIL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Lengkap *"
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-gray-50"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Alamat Email *"
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-gray-50"
            />
          </div>
        </div>

        {/* SUBJEK */}
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subjek Pesan *"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-gray-50"
          />
        </div>

        {/* PESAN */}
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tulis pesan Anda di sini... *"
            rows={5}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition text-sm"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Mengirim Pesan...' : 'KIRIM PESAN'}
        </button>

        <p className="text-xs text-gray-400 text-center">* Kolom wajib diisi. Data Anda aman bersama kami.</p>
      </form>
    </div>
  )
}