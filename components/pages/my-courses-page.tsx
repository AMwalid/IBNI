"use client"

import { useState } from "react"
import { ArrowRight, BookOpen, Calendar, Filter, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageTitle } from "@/components/ui/page-title"

interface CourseProps {
  id: number
  title: string
  creatorName: string
  creatorType: string
  type: string
  category: string
  description: string
  progress: number
  imageUrl: string
  purchaseDate: string
  price: number
}

// Course Card Component
const CourseCard = ({ course }: { course: CourseProps }) => {
  const { title, creatorName, creatorType, type, category, description, progress, imageUrl, purchaseDate } = course
  const CreatorIcon = creatorType === "teacher" ? BookOpen : Calendar

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200 ease-in-out h-full">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={`${title} banner`}
        className="w-full h-40 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Course+Image"
        }}
      />
      <CardContent className="flex flex-col flex-grow p-4 space-y-3 !pt-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              type === "academic" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
            }`}
          >
            <Tag className="w-3 h-3 mr-1" /> {type === "academic" ? "Academic" : "Non-Academic"}
          </Badge>
          <Badge
            variant="secondary"
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          >
            {category}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 !mt-2">{title}</h3>
        <p className="text-sm text-gray-500 flex items-center">
          <CreatorIcon className="w-4 h-4 mr-1.5 text-gray-400" /> By {creatorName} ({creatorType})
        </p>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>
        <p className="text-xs text-gray-400 flex items-center">
          <Calendar className="w-3 h-3 mr-1" /> Enrolled: {purchaseDate}
        </p>
        <div className="!mt-auto pt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-width duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t bg-gray-50">
        <Button variant="outline" className="w-full text-center justify-center text-sm">
          Go to Course <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock Data
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    creatorName: "Mr. Smith",
    creatorType: "teacher",
    type: "academic",
    category: "Mathematics",
    description: "Master the fundamentals of algebra, including equations, functions, and graphing.",
    progress: 75,
    imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=Algebra",
    purchaseDate: "2024-11-15",
    price: 49.99,
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    creatorName: "Oakwood Elementary",
    creatorType: "institution",
    type: "academic",
    category: "History",
    description: "Explore the rise and fall of major ancient civilizations around the globe.",
    progress: 40,
    imageUrl: "https://placehold.co/600x400/fff7ed/f97316?text=History",
    purchaseDate: "2024-10-01",
    price: 59.0,
  },
  {
    id: 3,
    title: "Fundamentals of Python Programming",
    creatorName: "Dr. Lee",
    creatorType: "teacher",
    type: "non-academic",
    category: "Computer Science",
    description: "Learn the basics of Python programming, from variables to loops and functions.",
    progress: 90,
    imageUrl: "https://placehold.co/600x400/ecfdf5/10b981?text=Python",
    purchaseDate: "2025-01-20",
    price: 99.99,
  },
  {
    id: 4,
    title: "Creative Writing Workshop",
    creatorName: "Community Arts Center",
    creatorType: "institution",
    type: "non-academic",
    category: "Arts & Literature",
    description: "Unleash your creativity and hone your writing skills in various genres.",
    progress: 60,
    imageUrl: "https://placehold.co/600x400/fefce8/eab308?text=Writing",
    purchaseDate: "2024-12-05",
    price: 75.0,
  },
]

interface MyCoursesPageProps {
  userType: "parent" | "student"
}

export default function MyCoursesPage({ userType }: MyCoursesPageProps) {
  const [filterType, setFilterType] = useState("all")

  const filteredCourses = mockCourses.filter((course) => {
    if (filterType === "all") return true
    return course.type === filterType
  })

  const displayedCourses = filteredCourses.sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime(),
  )

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title={userType === "parent" ? "Child's Courses" : "My Courses"} icon={BookOpen} />
      <p className="mb-8 text-gray-600">
        {userType === "parent" ? "Courses your child is enrolled in." : "Your enrolled courses."}
      </p>

      <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <Filter className="w-5 h-5 text-gray-500" />
        <label htmlFor="course-filter" className="text-sm font-medium text-gray-700">
          Filter by Type:
        </label>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger
            id="course-filter"
            className="w-[180px]"
            aria-label="Filter courses by type"
            placeholder="Select type..."
          >
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="non-academic">Non-Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {displayedCourses.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="text-center py-10">
              <p className="text-gray-500 italic">No courses found matching the filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
