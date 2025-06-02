import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StoreLayout from "@/components/store/store-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IBNI",
  description: "IBNI Platform",
  icons: {
    icon: '/FAVIICONE.png',
    shortcut: '/FAVIICONE.png',
    apple: '/FAVIICONE.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/FAVIICONE.png',
      }
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on a store-related page
  const isStorePage = typeof window !== 'undefined' && (
    window.location.pathname === '/' ||
    window.location.pathname === '/bulk-purchase' ||
    window.location.pathname === '/build-backpack'
  )

  return (
    <html lang="en">
      <head>
        <style>{`
          link[rel="icon"] {
            border-radius: 50%;
            overflow: hidden;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        {isStorePage ? (
          <StoreLayout>{children}</StoreLayout>
        ) : (
          children
        )}
      </body>
    </html>
  )
}


