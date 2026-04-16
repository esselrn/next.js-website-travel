import '@/shared/styles/globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import ConditionalLayout from '@/components/organisms/conditional-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-inter">
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  )
}