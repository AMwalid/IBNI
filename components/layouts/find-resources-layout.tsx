"use client"

import React from "react"
import { useRouter } from "next/navigation"
import FindResourcesFooter from "@/components/find-resources/footer"

interface FindResourcesLayoutProps {
  children: React.ReactNode
  navigateTo?: (page: string) => void
}

export default function FindResourcesLayout({ children, navigateTo }: FindResourcesLayoutProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      navigateTo(path)
    } else {
      router.push(path)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <FindResourcesFooter handleNavigate={handleNavigate} />
    </div>
  )
} 