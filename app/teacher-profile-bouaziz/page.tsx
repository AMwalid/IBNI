"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import TeacherProfileBouaziz from "@/components/pages/teacher-profile-bouaziz"

function ProfileContent() {
  const searchParams = useSearchParams()
  const [showBackButton, setShowBackButton] = useState(false)
  const router = useRouter()

  const navigateTo = (page: string, tab?: string | null) => {
    if (page === "find-resources") {
      router.push(`/?page=find-resources&type=${tab || 'teachers'}`)
    } else {
      router.push(`/?page=${page}`)
    }
  }

  useEffect(() => {
    const fromFindResources = searchParams.get('fromFindResources')
    setShowBackButton(fromFindResources === 'true')
  }, [searchParams])

  return <TeacherProfileBouaziz navigateTo={navigateTo} showBackButton={showBackButton} />
}

export default function TeacherProfileBouazizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  )
}
