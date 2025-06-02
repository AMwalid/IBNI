import type React from "react"
import StoreFooter from "@/components/store/footer"

export default function BackpackBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">{children}</main>
      <StoreFooter />
    </div>
  )
}
