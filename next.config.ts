import { type NextConfig } from 'next'
import type { RemotePattern } from 'next/dist/shared/lib/image-config'
import { getBackendBaseUrl } from "./src/lib/backend-url"

function toRemotePattern(url: string): RemotePattern | null {
  try {
    const parsedUrl = new URL(url)
    const protocol =
      parsedUrl.protocol === "https:"
        ? "https"
        : parsedUrl.protocol === "http:"
          ? "http"
          : null

    if (!protocol) {
      return null
    }

    return {
      protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      pathname: "/**",
    }
  } catch {
    return null
  }
}

const configuredApiBaseUrl = getBackendBaseUrl()

const configuredApiRemotePattern = configuredApiBaseUrl
  ? toRemotePattern(configuredApiBaseUrl)
  : null

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  env: { NEXT_PUBLIC_IMAGE_ORIGIN: configuredApiBaseUrl ? new URL(configuredApiBaseUrl).origin : "" },
  async headers() {
    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Content-Security-Policy", value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'" + (process.env.NODE_ENV === "production" ? "; upgrade-insecure-requests" : "") },
      ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
    ]
    return [{ source: "/:path*", headers: common }, { source: "/api/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 95],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/**',
      },
      ...(configuredApiRemotePattern ? [configuredApiRemotePattern] : []),
    ],
  },
}

export default nextConfig
