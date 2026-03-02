import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/assets/logonb.png" alt="NusaTrip Logo" width={214} height={60} priority />
    </Link>
  )
}