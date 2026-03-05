'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const quickReplies = [
  { emoji: '🏝️', text: 'Rekomendasi wisata populer' },
  { emoji: '📅', text: 'Paket wisata 3 hari 2 malam' },
  { emoji: '🌿', text: 'Wisata alam terbaik' },
  { emoji: '💰', text: 'Wisata murah & hemat' },
  { emoji: '📍', text: 'Wisata terkenal di Indonesia' }
]

const SYSTEM_PROMPT = `Kamu adalah NusaAI, asisten perjalanan cerdas dari NusaTrip — platform wisata Indonesia terpercaya.

Tugasmu:
- Membantu pengguna menemukan destinasi wisata terbaik di Indonesia
- Merekomendasikan paket wisata NusaTrip yang sesuai
- Memberikan tips liburan, informasi harga, dan saran perjalanan
- Menjawab pertanyaan seputar destinasi: Bali, Lombok, Raja Ampat, Komodo/Labuan Bajo, Bromo, Yogyakarta, Nusa Penida, Danau Toba, Karimunjawa, dll

Destinasi unggulan NusaTrip:
- Bali (Nusa Penida, Ubud, Seminyak) — mulai Rp 1.500.000/orang
- Komodo & Labuan Bajo — mulai Rp 3.500.000/orang
- Raja Ampat, Papua Barat — mulai Rp 8.500.000/orang
- Gunung Bromo, Jawa Timur — mulai Rp 1.900.000/orang
- Yogyakarta (Borobudur, Prambanan) — mulai Rp 2.500.000/orang
- Danau Toba, Sumatera Utara — mulai Rp 2.200.000/orang
- Karimunjawa, Jawa Tengah — mulai Rp 2.800.000/orang
- Lombok & Gili Islands — mulai Rp 2.000.000/orang

Cara menjawab:
- Gunakan bahasa Indonesia yang ramah, hangat, dan profesional
- Jawab singkat dan to the point (2-4 kalimat)
- Selalu sertakan saran untuk mengunjungi website atau menghubungi tim NusaTrip
- Jangan menjawab pertanyaan di luar topik wisata dan perjalanan
- Jika ditanya soal harga, berikan estimasi dan sarankan untuk cek detail di website`

const LOGO = '/assets/nusa-ai-logo.jpeg'

export default function NusaAIChat() {
  const [open, setOpen] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        '👋 Halo! Saya NusaAI, asisten perjalanan dari NusaTrip. Saya bisa membantu kamu menemukan destinasi, paket wisata, dan rekomendasi terbaik.\n\nSilakan pilih topik di bawah ini atau ajukan pertanyaanmu sendiri.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const toggleOpen = () => {
    setAnimating(true)
    setOpen((o) => !o)
    setTimeout(() => setAnimating(false), 400)
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowQuick(false)

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY

      // Build history excluding initial greeting
      const history = newMessages
        .slice(1)
        .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error.message)

      const reply = data.choices?.[0]?.message?.content ?? 'Maaf, saya tidak dapat merespons saat ini.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Groq error:', err)
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* CHAT WINDOW */}
      <div
        className="fixed bottom-28 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right"
        style={{
          height: '560px',
          maxHeight: 'calc(100vh - 140px)',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
          pointerEvents: open ? 'auto' : 'none'
        }}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0B2C4D] to-[#1a4a7a] px-4 py-3 flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shrink-0 shadow-lg">
            <Image src={LOGO} alt="NusaAI" fill className="object-cover" />
            <div className="absolute inset-0 rounded-full ring-2 ring-[#FB8C00]/40 animate-pulse" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">NusaAI</p>
            <p className="text-white/60 text-xs">Travel Assistant</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Online</span>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ animation: 'fadeSlideUp 0.3s ease forwards' }}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-blue-100 shadow-sm">
                  <Image src={LOGO} alt="NusaAI" width={28} height={28} className="object-cover" />
                </div>
              )}
              <div className="max-w-[78%]">
                {msg.role === 'assistant' && <p className="text-xs font-semibold text-[#0B2C4D] mb-1 ml-1">NusaAI</p>}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#0B2C4D] to-[#1a4a7a] text-white rounded-tr-sm'
                      : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-start" style={{ animation: 'fadeSlideUp 0.3s ease forwards' }}>
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-blue-100">
                <Image src={LOGO} alt="NusaAI" width={28} height={28} className="object-cover" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#0B2C4D]/40"
                      style={{ animation: 'dotBounce 1s ease infinite', animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showQuick && messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {quickReplies.map((q, i) => (
                <button
                  key={q.text}
                  onClick={() => sendMessage(q.text)}
                  style={{ animation: 'fadeSlideUp 0.4s ease forwards', animationDelay: `${i * 0.08}s`, opacity: 0 }}
                  className="text-xs bg-white border border-gray-200 text-gray-700 rounded-full px-3 py-1.5 hover:border-[#FB8C00] hover:text-[#FB8C00] hover:shadow-sm transition-all shadow-sm"
                >
                  {q.emoji} {q.text}
                </button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tanya rekomendasi wisata favoritmu..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-full bg-[#0B2C4D] hover:bg-[#FB8C00] disabled:opacity-30 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shrink-0 shadow-md"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <div
            className="bg-[#0B2C4D] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            style={{ animation: 'fadeSlideUp 0.4s ease forwards' }}
          >
            Tanya NusaAI ✨
          </div>
        )}
        <button
          onClick={toggleOpen}
          className={`relative w-16 h-16 rounded-full shadow-2xl focus:outline-none transition-all duration-300 hover:scale-110 ${animating ? 'scale-90' : 'scale-100'}`}
          aria-label="Buka NusaAI Chat"
        >
          {!open && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#FB8C00]/20 animate-ping [animation-duration:2s]" />
              <span className="absolute inset-1 rounded-full bg-blue-400/15 animate-ping [animation-duration:2.8s] [animation-delay:0.5s]" />
            </>
          )}
          <span
            className={`relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center border-2 transition-all duration-300 ${
              open ? 'border-[#FB8C00] bg-[#0B2C4D]' : 'border-white/40'
            }`}
          >
            {open ? (
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <Image src={LOGO} alt="NusaAI" fill className="object-cover rounded-full" />
            )}
          </span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dotBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </>
  )
}