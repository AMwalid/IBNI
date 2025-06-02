"use client"

import type React from "react"
import StoreLayout from "@/components/store/store-layout"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StoreLayout>{children}</StoreLayout>
}





