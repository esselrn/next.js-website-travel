'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signUp } from '@/lib/auth'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Password tidak cocok.')
    if (form.password.length < 6) return setError('Password minimal 6 karakter.')

    setLoading(true)
    const { error } = await signUp(form.email, form.password, form.fullName)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setSuccess(true)
    setTimeout(() => router.push('/auth/login'), 2500)
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden py-10">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <Image src="/assets/rajaampat.jpg" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2C4D]/75" />
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#FB8C00]/10 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-4" style={{ animation: 'fadeUp 0.5s ease forwards' }}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/assets/logo.png" alt="NusaTrip" width={90} height={60} className="mb-3" />
          <span className="font-montserrat font-bold text-white text-xl tracking-widest">NUSA TRIP</span>
          <div className="w-12 h-[2px] bg-[#FB8C00] rounded-full mt-3" />
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-10 shadow-2xl">
          {success ? (
            <div className="flex flex-col items-center text-center py-4" style={{ animation: 'fadeUp 0.4s ease' }}>
              <CheckCircle size={52} className="text-green-400 mb-4" />
              <h2 className="font-montserrat font-bold text-xl text-white mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-white/60 text-sm">Akun kamu sudah dibuat. Mengarahkan ke halaman login...</p>
            </div>
          ) : (
            <>
              <h1 className="font-montserrat font-bold text-2xl text-white mb-1">Buat Akun</h1>
              <p className="text-white/50 text-sm mb-8">Daftar gratis dan mulai jelajahi Indonesia</p>

              {error && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
                  />
                </div>

                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
                  />
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password (min. 6 karakter)"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    name="confirm"
                    type="password"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Konfirmasi Password"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#FB8C00] hover:bg-orange-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 mt-2 group"
                >
                  {loading ? (
                    'Mendaftarkan...'
                  ) : (
                    <>
                      Daftar Sekarang <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/15" />
                <span className="text-white/30 text-xs">atau</span>
                <div className="flex-1 h-px bg-white/15" />
              </div>

              <p className="text-center text-sm text-white/50">
                Sudah punya akun?{' '}
                <Link href="/auth/login" className="text-[#FB8C00] font-semibold hover:text-orange-400 transition">
                  Masuk di sini
                </Link>
              </p>
            </>
          )}
        </div>
        <p className="text-center text-white/30 text-xs mt-6">© 2025 NusaTrip. All rights reserved.</p>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}