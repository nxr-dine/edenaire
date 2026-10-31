import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edenaire - Luxury Jewelry Collection",
  description:
    "Discover timeless elegance with Edenaire's exquisite collection of handcrafted luxury jewelry. Premium diamonds, precious metals, and expert craftsmanship.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " relative min-h-screen"}>
        {/* Global Background Image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
