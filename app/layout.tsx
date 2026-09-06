import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { AuthProvider } from "@/lib/auth-context"

const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
})

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "OPFBEX 2026 — Central Luzon's Premier Culinary Expo",
  description:
    "OPFBEX 2026 returns for Year 2. September 19–20, SMX Clark. Taste, discover, and connect at Central Luzon's premier food & beverage expo.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "OPFBEX 2026 — Central Luzon's Premier Culinary Expo",
    description:
      "OPFBEX 2026 returns for Year 2. September 19–20, SMX Clark. Taste, discover, and connect at Central Luzon's premier food & beverage expo.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "OPFBEX 2026 Expo Banner",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  )
}
