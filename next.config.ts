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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://api.midtrans.com",
              "frame-src https://app.sandbox.midtrans.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig