import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoroPath - Parcours Coronaires",
  description: "Application de parcours de soins coronaires - Clinique Pole Sante Sud Le Mans - Conforme ESC 2023/2024",
  generator: "v0.app",
  manifest: "/manifest.json",
  keywords: ["cardiologie", "coronaire", "SCA", "parcours soins", "ESC 2024", "USIC"],
  authors: [{ name: "Clinique Pole Sante Sud" }],
  icons: {
    icon: [
      { url: "/icons/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
      { url: "/icons/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
    apple: "/icons/apple-icon-180.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CoroPath",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    siteName: "CoroPath",
    title: "CoroPath - Parcours Coronaires",
    description: "Application de parcours de soins coronaires conforme ESC 2023/2024",
  },
}

// Configuration viewport pour app mobile
export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.jpg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
