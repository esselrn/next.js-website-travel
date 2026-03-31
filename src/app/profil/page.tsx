'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useNotif } from '@/contexts/notif-context'
import { supabase } from '@/lib/supabase'
import {
  Camera,
  User,
  Phone,
  MapPin,
  Calendar,
  Save,
  ArrowLeft,
  Loader2,
  ClipboardList,
  Shield,
  Globe,
  ChevronRight
} from 'lucide-react'

type Tab = 'profil' | 'akun'

function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const MAX = 800
      let { width, height } = img
      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width)
          width = MAX
        } else {
          width = Math.round((width * MAX) / height)
          height = MAX
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas not supported'))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Compression failed'))
        },
        'image/jpeg',
        0.82
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Load failed'))
    }
    img.src = objectUrl
  })
}

export default function ProfilPage() {
  const { user, profile, refreshProfile } = useAuth()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const { showToast } = useNotif()
  const [tab, setTab] = useState<Tab>('profil')

  // ── FIX: inisialisasi field dari profile context, sync ulang saat profile berubah
  // Pakai flag profileLoaded agar tidak override saat user sedang ngetik
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Hanya isi sekali saat profile pertama kali tersedia
    if (profile && !profileLoaded) {
      const p = profile as Record<string, unknown>
      setFullName(profile.full_name ?? '')
      setPhone((p.phone as string) ?? '')
      setCity((p.city as string) ?? '')
      setBirthdate((p.birthdate as string) ?? '')
      setAvatarUrl(profile.avatar_url ?? '')
      setProfileLoaded(true)
    }
  }, [profile, profileLoaded])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setAvatarPreview(URL.createObjectURL(file))
    setUploadError('')
    setUploading(true)
    setUploadStatus('Mengompresi gambar...')
    try {
      const compressed = await compressImage(file)
      setUploadStatus('Mengupload foto...')
      const path = `${user.id}/avatar.jpg`
      const { error: uploadErr } = await supabase.storage
        .from('avatars')
        .upload(path, compressed, { upsert: true, contentType: 'image/jpeg' })
      if (uploadErr) {
        setUploadError('Gagal upload foto. Coba lagi.')
        setAvatarPreview(null)
        showToast('error', 'Upload Gagal', 'Tidak bisa mengupload foto. Silakan coba lagi.')
      } else {
        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        const freshUrl = `${data.publicUrl}?t=${Date.now()}`
        setAvatarUrl(freshUrl)
        setAvatarPreview(null)
        setUploadStatus('')
        // Simpan ke DB langsung agar navbar avatar ikut update
        await supabase.from('users').update({ avatar_url: freshUrl }).eq('id', user.id)
        await refreshProfile()
        showToast('success', 'Foto Diperbarui', 'Foto profil kamu berhasil diubah.')
      }
    } catch {
      setUploadError('Gagal memproses foto. Coba lagi.')
      setAvatarPreview(null)
      setUploadStatus('')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    const { error } = await supabase
      .from('users')
      .update({ full_name: fullName, phone, city, birthdate: birthdate || null, avatar_url: avatarUrl })
      .eq('id', user.id)
    if (error) {
      showToast('error', 'Gagal Menyimpan', 'Terjadi kesalahan saat menyimpan profil.')
    } else {
      // Refresh context agar navbar ikut update (nama + avatar)
      await refreshProfile()
      showToast('success', 'Profil Tersimpan', 'Data profil kamu berhasil diperbarui.')
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  // ── FIX avatar display: prioritaskan preview → state lokal → profile context
  // Ini memastikan avatar di header halaman ini dan di sidebar/komponen lain sinkron
  const displayAvatar = avatarPreview || avatarUrl || profile?.avatar_url || ''
  const initials = (fullName || profile?.email || 'U')[0].toUpperCase()
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : '-'

  const completionItems = [
    { label: 'Nama Lengkap', done: !!fullName },
    { label: 'Nomor Telepon', done: !!phone },
    { label: 'Kota Asal', done: !!city },
    { label: 'Tanggal Lahir', done: !!birthdate },
    { label: 'Foto Profil', done: !!avatarUrl }
  ]
  const completionCount = completionItems.filter((i) => i.done).length

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'profil', label: 'Profil', icon: User },
    { key: 'akun', label: 'Akun & Keamanan', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* HERO HEADER */}
      <div className="bg-[#0B2C4D] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FB8C00]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        </div>
        <div className="max-w-[860px] mx-auto px-6 pt-24 pb-8 relative z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft size={15} /> Kembali
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 pb-6">
            {/* Avatar — FIX: tampilkan foto jika ada, inisial jika tidak */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FB8C00] flex items-center justify-center border-4 border-white/15 shadow-xl">
                {displayAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-white">{initials}</span>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-[#FB8C00] hover:bg-orange-500 disabled:opacity-60 rounded-xl flex items-center justify-center border-2 border-[#0B2C4D] transition shadow-lg"
              >
                {uploading ? (
                  <Loader2 size={13} className="animate-spin text-white" />
                ) : (
                  <Camera size={13} className="text-white" />
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="font-montserrat font-bold text-2xl text-white leading-tight">{fullName || 'Nama Pengguna'}</h1>
              <p className="text-white/50 text-sm mt-0.5">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
                <span className="text-[10px] font-bold bg-[#FB8C00]/20 text-[#FB8C00] px-2.5 py-1 rounded-full tracking-wide border border-[#FB8C00]/30">
                  ✈ MEMBER NUSATRIP
                </span>
                {city && (
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <MapPin size={9} /> {city}
                  </span>
                )}
                <span className="text-[10px] text-white/40">Bergabung {memberSince}</span>
              </div>
              {uploadStatus && <p className="text-xs text-white/50 mt-1.5">{uploadStatus}</p>}
              {uploadError && <p className="text-xs text-red-400 mt-1.5">{uploadError}</p>}
            </div>

            <div className="flex gap-4 sm:gap-6 shrink-0">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{completionCount * 20}%</p>
                <p className="text-[10px] text-white/40 mt-0.5">Profil</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-xl font-bold text-white">Aktif</p>
                <p className="text-[10px] text-white/40 mt-0.5">Status</p>
              </div>
            </div>
          </div>

          <div className="flex gap-1 border-t border-white/10 pt-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition -mb-px ${
                  tab === key ? 'bg-[#F5F7FA] text-[#0B2C4D]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
            <button
              onClick={() => router.push('/riwayat-pesanan')}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition text-white/50 hover:text-white hover:bg-white/5"
            >
              <ClipboardList size={13} /> Riwayat Pesanan
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[860px] mx-auto px-6 py-8">
        {tab === 'profil' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-[#0B2C4D] text-base mb-5 flex items-center gap-2">
                  <User size={16} className="text-[#FB8C00]" /> Informasi Pribadi
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Nama Lengkap</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B2C4D]/40 focus:ring-2 focus:ring-[#0B2C4D]/5 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email</label>
                    <input
                      value={user?.email ?? ''}
                      disabled
                      className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Email tidak dapat diubah</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                      <Phone size={11} /> Nomor Telepon
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B2C4D]/40 focus:ring-2 focus:ring-[#0B2C4D]/5 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                        <MapPin size={11} /> Kota Asal
                      </label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Kota asal"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B2C4D]/40 focus:ring-2 focus:ring-[#0B2C4D]/5 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                        <Calendar size={11} /> Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B2C4D]/40 transition"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition ${
                    saved ? 'bg-green-500 text-white' : 'bg-[#0B2C4D] hover:bg-[#0B2C4D]/90 text-white'
                  } disabled:opacity-60`}
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saved ? '✓ Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Avatar card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-[#0B2C4D] text-sm mb-3">Foto Profil</h3>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FB8C00] flex items-center justify-center border-2 border-gray-100">
                    {displayAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-white">{initials}</span>
                    )}
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 text-xs font-semibold text-[#0B2C4D] border border-gray-200 hover:border-[#0B2C4D]/40 hover:bg-gray-50 disabled:opacity-60 px-4 py-2 rounded-xl transition"
                  >
                    {uploading ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                    {uploading ? uploadStatus || 'Memproses...' : 'Ganti Foto'}
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">
                    JPG, PNG, HEIC — ukuran berapa pun,
                    <br />
                    otomatis dikompres
                  </p>
                  {uploadError && <p className="text-[11px] text-red-500 text-center">{uploadError}</p>}
                </div>
              </div>

              {/* Completion */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-[#0B2C4D] text-sm mb-3">Kelengkapan Profil</h3>
                <div className="space-y-2 mb-4">
                  {completionItems.map(({ label, done }) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <span className={done ? 'text-gray-700' : 'text-gray-400'}>{label}</span>
                      <span className={done ? 'text-green-500 font-bold' : 'text-gray-300'}>{done ? '✓' : '○'}</span>
                    </div>
                  ))}
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0B2C4D] to-[#FB8C00] rounded-full transition-all duration-500"
                    style={{ width: `${(completionCount / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 text-right">{completionCount}/5 diisi</p>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-[#0B2C4D] text-sm mb-3">Akses Cepat</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => router.push('/riwayat-pesanan')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-orange-50 transition group text-left"
                  >
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-[#FB8C00]">
                      <ClipboardList size={14} /> Riwayat Pesanan
                    </div>
                    <ChevronRight size={13} className="text-gray-300 group-hover:text-[#FB8C00]" />
                  </button>
                  <button
                    onClick={() => router.push('/paket-wisata')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-orange-50 transition group text-left"
                  >
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-[#FB8C00]">
                      <Globe size={14} /> Jelajahi Paket Wisata
                    </div>
                    <ChevronRight size={13} className="text-gray-300 group-hover:text-[#FB8C00]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'akun' && (
          <div className="max-w-lg">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-[#0B2C4D] text-base flex items-center gap-2">
                <Shield size={16} className="text-[#FB8C00]" /> Informasi Akun
              </h2>
              <div className="space-y-3">
                {[
                  {
                    label: 'Status Akun',
                    value: null,
                    badge: { text: 'Aktif', color: 'bg-green-50 text-green-600 border-green-200' }
                  },
                  {
                    label: 'Member Sejak',
                    value: user?.created_at
                      ? new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : '-'
                  },
                  { label: 'Tipe Akun', value: 'Member' },
                  {
                    label: 'Email Terverifikasi',
                    value: null,
                    badge: { text: '✓ Terverifikasi', color: 'bg-green-50 text-green-600 border-green-200' }
                  }
                ].map(({ label, value, badge }, i, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <span className="text-sm text-gray-500">{label}</span>
                    {badge ? (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge.color}`}>
                        {badge.text}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-[#0B2C4D]">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}