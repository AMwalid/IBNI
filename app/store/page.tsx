"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock data for categories
const categories = [
  {
    id: "books",
    name: "Books",
    image: "/placeholder.svg?height=200&width=200",
    description: "Textbooks & workbooks",
  },
  {
    id: "uniforms",
    name: "Uniforms",
    image: "/placeholder.svg?height=200&width=200",
    description: "School uniforms",
  },
  {
    id: "notebooks",
    name: "Notebooks",
    image: "/placeholder.svg?height=200&width=200",
    description: "Notebooks & stationery",
  },
  {
    id: "creative-supplies",
    name: "Creative Supplies",
    image: "/placeholder.svg?height=200&width=200",
    description: "Art & craft supplies",
  },
  {
    id: "tech-gear",
    name: "Tech Gear",
    image: "/placeholder.svg?height=200&width=200",
    description: "Educational technology",
  },
  {
    id: "courses",
    name: "Courses",
    image: "/placeholder.svg?height=200&width=200",
    description: "Online learning",
  },
]

// Mock data for banners
const banners = [
  {
    id: "banner1",
    title: "Back to School Sale",
    subtitle: "Up to 40% off on school supplies",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Shop Now",
    buttonLink: "/store/category/notebooks",
    backgroundColor: "bg-green-100",
  },
  {
    id: "banner2",
    title: "New Courses Available",
    subtitle: "Explore our latest educational courses",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Browse Courses",
    buttonLink: "/store/category/courses",
    backgroundColor: "bg-blue-100",
  },
  {
    id: "banner3",
    title: "Uniform Collection",
    subtitle: "Quality uniforms for all schools",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "View Collection",
    buttonLink: "/store/category/uniforms",
    backgroundColor: "bg-amber-100",
  },
]

// Mock data for products
const products: (Product | CourseProduct)[] = [
  {
    id: "prod1",
    title: "Math Workbook - Grade 5",
    category: "Books",
    price_dzd: 1200,
    description: "Comprehensive math workbook for 5th grade students",
    thumbnail: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    isNew: true,
    stock: 25,
  },
  {
    id: "prod2",
    title: "School Backpack",
    category: "Uniforms",
    price_dzd: 3500,
    original_price_dzd: 4000,
    description: "Durable backpack with multiple compartments",
    thumbnail: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    isOnSale: true,
    stock: 15,
  },
  {
    id: "course1",
    title: "Introduction to Algebra",
    category: "Courses",
    price_dzd: 2500,
    description: "A beginner-friendly Algebra course covering equations, variables, and expressions.",
    thumbnail: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    creator_type: "Teacher",
    creator: {
      name: "Ms. Amel Bensalem",
      profile_image: "/placeholder.svg?height=50&width=50",
    },
    grade_level: "Grade 7",
    subject: "Math",
    language: "Arabic",
    school_affiliation: "None",
    stock: 999,
  },
  {
    id: "course2",
    title: "English Grammar Mastery",
    category: "Courses",
    price_dzd: 3500,
    description: "Structured English grammar lessons provided by ElMadrasa School for middle school students.",
    thumbnail: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    creator_type: "School",
    creator: {
      name: "ElMadrasa School",
      logo_image: "/placeholder.svg?height=50&width=50",
    },
    grade_level: "Grade 8",
    subject: "English",
    language: "French",
    school_affiliation: "ElMadrasa",
    stock: 999,
  },
]

export default function StorePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main application with the store page
    router.push('/?page=store')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the integrated IBNI Store</p>
      </div>
    </div>
  )
}








