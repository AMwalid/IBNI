"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function OurPricesPageRoute() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main application with a query parameter to show the "Our Prices" page
    router.replace("/?page=our-prices")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the Our Prices page</p>
      </div>
    </div>
  )
}
