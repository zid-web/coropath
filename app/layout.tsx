import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coropath",
  description: "Application médicale de suivi cardiologique",
  generator: "v0.app",
  manifest: "/manifest.json",
  keywords: ["cardiologie", "coronaire", "SCA", "parcours soins", "ESC 2024", "USIC"],
  authors: [{ name: "Clinique Pole Sante Sud" }],
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
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
    title: "Coropath",
    description: "Application médicale de suivi cardiologique",
  },
}

// Configuration viewport pour app mobile
export const viewport: Viewport = {
  themeColor: "#8B0000",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
