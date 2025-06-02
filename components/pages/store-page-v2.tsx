"use client"

import { useEffect } from "react"

export default function StorePage() {
  // When this component is loaded, redirect to the new store page
  useEffect(() => {
    window.location.href = '/store'
  }, [])

  // Return a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the new Store page</p>
      </div>
    </div>
  )
}
