// Logo.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/assets/logo.png" alt="NusaTrip Logo" width={90} height={60} priority />
      <span
        className="font-montserrat font-bold text-lg tracking-widest hidden sm:block"
        style={{
          background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 60%, #FF6000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        NUSA TRIP
      </span>
    </Link>
  )
}