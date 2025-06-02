"use client"

import { useRouter } from "next/navigation"
import SchoolProfilePage from "@/components/pages/school-profile-page"

export default function SchoolProfile1Page() {
  const router = useRouter()

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'schools'}`)
    } else {
      router.push(`/${page}`)
    }
  }

  return <SchoolProfilePage userType="parent" navigateTo={navigateTo} showBackButton={true} />
}
