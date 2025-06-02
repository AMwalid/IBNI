"use client"

interface FindResourcePageProps {
  initialTab?: string
  navigateTo?: (page: string) => void
  userType?: "parent" | "student" | "teacher" | "institution"
}

export default function FindResourcePage() {
  return (
    <div>
      <h1>Find Resources Page</h1>
    </div>
  )
}
