import '@/shared/styles/globals.css'

import Navbar from '@/components/organisms/navbar'
import FooterSection from '@/components/organisms/footer-section'

export const metadata = {
  title: 'NusaTrip',
  description: 'Platform perjalanan wisata Indonesia'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-inter">
        <Navbar />

        <main className="pt-[64px]">{children}</main>

        <FooterSection />
      </body>
    </html>
  )
}
