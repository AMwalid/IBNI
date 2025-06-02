"use client"

import { Suspense } from 'react'
import TeacherProfileBenaliPage from './TeacherProfileBenaliPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeacherProfileBenaliPage />
    </Suspense>
  )
}
