"use client"

import { useRouter } from "next/navigation"
import SchoolProfileAnnaba from "@/components/pages/school-profile-annaba"

export default function SchoolProfileAnnabaPage() {
  const router = useRouter()
  
  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'schools'}`)
    } else {
      router.push(`/${page}`)
    }
  }
  
  return <SchoolProfileAnnaba navigateTo={navigateTo} />
}
