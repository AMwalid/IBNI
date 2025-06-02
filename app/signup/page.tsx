"use client"

import SignUpPage from "@/components/pages/signup-page"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()
  
  return (
    <SignUpPage navigateTo={(page) => router.push(`/${page}`)} />
  )
} 