import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://api.midtrans.com https://www.youtube.com https://s.ytimg.com",
              "frame-src 'self' https://app.sandbox.midtrans.com https://www.youtube.com https://youtube.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' https://www.youtube.com",
              "connect-src 'self' https://app.sandbox.midtrans.com https://api.midtrans.com",
              "style-src 'self' 'unsafe-inline'"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig