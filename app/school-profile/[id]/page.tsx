"use client"

import { useParams } from "next/navigation"
import SchoolProfilePage from "@/components/pages/school-profile-page"

export default function SchoolProfileDynamicPage() {
  const params = useParams()
  
  // We're not using the ID parameter in this case since we're displaying
  // the Little Coder Academy profile for all school profiles
  return <SchoolProfilePage userType="parent" />
}
