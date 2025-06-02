"use client"

import { useRouter } from "next/navigation"
import StoreLayout from "./store-layout"

export default function ClientStoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <StoreLayout navigateTo={(path) => {
      if (path.startsWith('/')) {
        router.push(path)
      } else {
        router.push(`/${path}`)
      }
    }}>
      {children}
    </StoreLayout>
  )
} 