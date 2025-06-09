"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Suspense } from "react"
import TeacherProfileBouaziz from "@/components/pages/teacher-profile-bouaziz"

export default function TeacherProfileBouazizPage() {
  const router = useRouter()
  const [showBackButton, setShowBackButton] = useState(false)

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      // Navigate to the find resources page with a query parameter to indicate the resource type
      router.push(`/?page=find-resources&type=${tab || 'teachers'}`)
    } else {
      // Use root level routing
      router.push(`/?page=${page}`)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent router={router} showBackButton={showBackButton} navigateTo={navigateTo} />
    </Suspense>
  )
}

function ClientComponent({ router, showBackButton, navigateTo }: { router: any; showBackButton: boolean; navigateTo: (page: string, tab?: string | null) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if the page was accessed from the find resources page
    const fromFindResources = searchParams.get('fromFindResources')
    showBackButton(fromFindResources === 'true')
  }, [searchParams])

  return <TeacherProfileBouaziz navigateTo={navigateTo} showBackButton={showBackButton} />
}
}
