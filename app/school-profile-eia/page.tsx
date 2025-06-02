"use client"

import { useRouter } from "next/navigation"
import SchoolProfileEIA from "@/components/pages/school-profile-eia"

export default function SchoolProfileEIAPage() {
  const router = useRouter()

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'schools'}`)
    } else {
      router.push(`/${page}`)
    }
  }

  return <SchoolProfileEIA navigateTo={navigateTo} showBackButton={true} />
}
