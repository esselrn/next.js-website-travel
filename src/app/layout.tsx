import '@/shared/styles/globals.css'

import Navbar from '@/components/organisms/navbar'
import FooterSection from '@/components/organisms/footer'
import NusaAIChat from '@/components/organisms/nusa-ai-chat'

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
        <NusaAIChat />
      </body>
    </html>
  )
}
