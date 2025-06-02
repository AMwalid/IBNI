"use client"

import { useState } from "react"
import {
  Building,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  Star,
  User,
  Users,
  GraduationCap,
  Heart,
  BookOpen,
  ArrowRight,
  Map,
  PlusCircle,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FindResourcePageProps {
  initialTab?: string
  navigateTo?: (page: string) => void
  userType?: "parent" | "student" | "teacher" | "institution"
}

// School Card Component
const SchoolCard = ({
  school,
  navigateToProfile,
  isInCompareList,
  handleAddToCompare,
  handleRemoveFromCompare,
}: {
  school: any
  navigateToProfile: () => void
  isInCompareList: (type: "schools" | "teachers", id: number) => boolean
  handleAddToCompare: (type: "schools" | "teachers", id: number) => void
  handleRemoveFromCompare: (type: "schools" | "teachers", id: number) => void
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="h-40 overflow-hidden cursor-pointer" onClick={navigateToProfile}>
      <img
        src={school.imageUrl || "/placeholder.svg"}
        alt={school.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=School+Image"
        }}
      />
    </div>
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3
          className="font-semibold text-lg cursor-pointer hover:text-green-600 transition-colors"
          onClick={navigateToProfile}
        >
          {school.name}
        </h3>
        <Badge variant={school.type === "Public" ? "default" : "secondary"}>{school.type}</Badge>
      </div>
      <div className="flex items-center text-amber-500 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(school.rating) ? "fill-current" : "text-gray-300"}`}
            strokeWidth={1}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({school.reviewCount})</span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-1">
        <MapPin className="w-3.5 h-3.5 mr-1" /> {school.location}
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-1">
        <GraduationCap className="w-3.5 h-3.5 mr-1" /> Grades: {school.grades}
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <Users className="w-3.5 h-3.5 mr-1" /> {school.students} students
      </div>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 border-t flex justify-between">
      <Button variant="outline" size="sm" onClick={navigateToProfile}>
        View Profile
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={(e) => {
          e.stopPropagation()
          isInCompareList("schools", school.id)
            ? handleRemoveFromCompare("schools", school.id)
            : handleAddToCompare("schools", school.id)
        }}
      >
        {isInCompareList("schools", school.id) ? (
          <Trash2 className="h-4 w-4 text-red-500" />
        ) : (
          <PlusCircle className="h-4 w-4 text-gray-400 hover:text-green-600" />
        )}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </Button>
    </CardFooter>
  </Card>
)

// Teacher Card Component
const TeacherCard = ({
  teacher,
  navigateToProfile,
  isInCompareList,
  handleAddToCompare,
  handleRemoveFromCompare,
}: {
  teacher: any
  navigateToProfile: () => void
  isInCompareList: (type: "schools" | "teachers", id: number) => boolean
  handleAddToCompare: (type: "schools" | "teachers", id: number) => void
  handleRemoveFromCompare: (type: "schools" | "teachers", id: number) => void
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="flex p-4 cursor-pointer" onClick={navigateToProfile}>
      <img
        src={teacher.avatar || "/placeholder.svg"}
        alt={teacher.name}
        className="w-20 h-20 rounded-full object-cover mr-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/80x80/cccccc/ffffff?text=T"
        }}
      />
      <div>
        <h3 className="font-semibold text-lg hover:text-green-600 transition-colors">{teacher.name}</h3>
        <p className="text-gray-600 mb-1">{teacher.subject}</p>
        <div className="flex items-center text-amber-500 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(teacher.rating) ? "fill-current" : "text-gray-300"}`}
              strokeWidth={1}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({teacher.reviewCount})</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-3.5 h-3.5 mr-1" /> {teacher.location}
        </div>
      </div>
    </div>
    <CardContent className="px-4 py-2 border-t border-b">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500">Experience</p>
          <p className="font-medium">{teacher.experience} yrs</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Students</p>
          <p className="font-medium">{teacher.students}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Courses</p>
          <p className="font-medium">{teacher.courses}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
      <Button variant="outline" size="sm" onClick={navigateToProfile}>
        View Profile
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={(e) => {
          e.stopPropagation()
          isInCompareList("teachers", teacher.id)
            ? handleRemoveFromCompare("teachers", teacher.id)
            : handleAddToCompare("teachers", teacher.id)
        }}
      >
        {isInCompareList("teachers", teacher.id) ? (
          <Trash2 className="h-4 w-4 text-red-500" />
        ) : (
          <PlusCircle className="h-4 w-4 text-gray-400 hover:text-green-600" />
        )}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </Button>
    </CardFooter>
  </Card>
)

// Mock Data
const mockSchools = [
  {
    id: 1,
    name: "Little Coder Academy",
    type: "Private",
    grades: "K-12",
    students: 120,
    rating: 4.8,
    reviewCount: 142,
    location: "Tlemcen",
    imageUrl: "https://placehold.co/600x400/dcfce7/16a34a?text=Little+Code",
  },
  {
    id: 2,
    name: "École Internationale d'Alger",
    type: "Private",
    grades: "K-12",
    students: 620,
    rating: 4.9,
    reviewCount: 215,
    location: "Algiers",
    imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=EIA",
  },
  {
    id: 3,
    name: "Collège El Feth",
    type: "Public",
    grades: "Middle School",
    students: 720,
    rating: 4.5,
    reviewCount: 98,
    location: "Oran",
    imageUrl: "https://placehold.co/600x400/fef2f2/ef4444?text=El+Feth",
  },
  {
    id: 4,
    name: "Lycée Descartes",
    type: "International",
    grades: "Secondary",
    students: 540,
    rating: 4.8,
    reviewCount: 156,
    location: "Constantine",
    imageUrl: "https://placehold.co/600x400/fff7ed/f97316?text=Descartes",
  },
  {
    id: 5,
    name: "École Polytechnique Préparatoire",
    type: "Public",
    grades: "Higher Education Prep",
    students: 380,
    rating: 4.3,
    reviewCount: 87,
    location: "Tlemcen",
    imageUrl: "https://placehold.co/600x400/eff6ff/3b82f6?text=EPP",
  },
  {
    id: 6,
    name: "Académie Numérique d'Annaba",
    type: "Private",
    grades: "Secondary",
    students: 490,
    rating: 4.6,
    reviewCount: 142,
    location: "Annaba",
    imageUrl: "https://placehold.co/600x400/f0fdfa/0d9488?text=ANA",
  },
]

const mockTeachers = [
  {
    id: 1,
    name: "Dr. Amina Kazi",
    subject: "Physics",
    experience: 12,
    students: 342,
    courses: 3,
    rating: 4.9,
    reviewCount: 124,
    location: "Algiers",
    avatar: "https://placehold.co/80x80/e0f2fe/0891b2?text=AK",
  },
  {
    id: 2,
    name: "Karim Benali",
    subject: "French Literature",
    experience: 8,
    students: 285,
    courses: 4,
    rating: 4.7,
    reviewCount: 98,
    location: "Algiers",
    avatar: "https://placehold.co/80x80/f0fdfa/0d9488?text=KB",
  },
  {
    id: 3,
    name: "Dr. Leila Hadj",
    subject: "Biology",
    experience: 15,
    students: 410,
    courses: 5,
    rating: 4.8,
    reviewCount: 156,
    location: "Oran",
    avatar: "https://placehold.co/80x80/fce7f3/db2777?text=LH",
  },
  {
    id: 4,
    name: "Youcef Mansouri",
    subject: "History",
    experience: 10,
    students: 380,
    courses: 3,
    rating: 4.6,
    reviewCount: 112,
    location: "Constantine",
    avatar: "https://placehold.co/80x80/eff6ff/3b82f6?text=YM",
  },
  {
    id: 5,
    name: "Nadia Bouaziz",
    subject: "Computer Science",
    experience: 7,
    students: 265,
    courses: 2,
    rating: 4.9,
    reviewCount: 87,
    location: "Tlemcen",
    avatar: "https://placehold.co/80x80/fef2f2/ef4444?text=NB",
  },
  {
    id: 6,
    name: "Mourad Haddad",
    subject: "Physics",
    experience: 14,
    students: 320,
    courses: 4,
    rating: 4.7,
    reviewCount: 104,
    location: "Annaba",
    avatar: "https://placehold.co/80x80/fff7ed/f97316?text=MH",
  },
]

export default function FindResourcePage({
  initialTab = "schools",
  navigateTo,
  userType = "parent",
}: FindResourcePageProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("All")
  const [schoolType, setSchoolType] = useState("All")
  const [gradeLevel, setGradeLevel] = useState("All")
  const [subject, setSubject] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [compareItems, setCompareItems] = useState<{
    schools: number[]
    teachers: number[]
  }>({
    schools: [],
    teachers: [],
  })

  // Mock locations for the dropdown
  const locations = ["All", "Algiers", "Oran", "Constantine", "Tlemcen", "Annaba", "Sétif", "Batna", "Blida"]

  // Mock school types
  const schoolTypes = ["All", "Public", "Private", "International"]

  // Mock grade levels
  const gradeLevels = ["All", "Primary", "Middle School", "Secondary", "Higher Education Prep"]

  // Mock subjects
  const subjects = ["All", "Mathematics", "Physics", "Biology", "French Literature", "History", "Computer Science", "Islamic Studies", "Engineering", "Philosophy"]

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSearchTerm("")
    setLocation("All")
    setSchoolType("All")
    setGradeLevel("All")
    setSubject("All")
    setShowFilters(false)
    setCurrentPage(1)
  }

  // Handle profile navigation based on user type
  const handleSchoolProfileView = (schoolId: number) => {
    if (navigateTo) {
      // Navigate to the appropriate school profile page based on ID and user type
      if (schoolId === 2) {
        // For École Internationale d'Alger (ID 2)
        navigateTo("school-profile-eia")
      } else if (schoolId === 1) {
        // For Little Coder Academy (ID 1) - using the existing profile page
        navigateTo("school-profile-1")
      } else if (schoolId === 3) {
        // For Collège El Feth (ID 3)
        navigateTo("school-profile-elfeth")
      } else if (schoolId === 4) {
        // For Lycée Descartes (ID 4)
        navigateTo("school-profile-descartes")
      } else if (schoolId === 5) {
        // For École Polytechnique Préparatoire (ID 5)
        navigateTo("school-profile-polytechnique")
      } else if (schoolId === 6) {
        // For Académie Numérique d'Annaba (ID 6)
        navigateTo("school-profile-annaba")
      } else {
        // For all other schools, use the Little Coder Academy profile for now
        navigateTo("school-profile-1")
      }
    } else {
      // If navigateTo is not provided, we would typically use router.push
      // For demonstration, just show an alert
      alert(`Viewing school profile for ID: ${schoolId}`)
    }
  }

  const handleTeacherProfileView = (teacherId: number) => {
    if (navigateTo) {
      // Navigate to the appropriate teacher profile page based on ID and user type
      if (teacherId === 1) {
        // For Dr. Amina Kazi (ID 1)
        navigateTo("teacher-profile-kazi")
      } else if (teacherId === 2) {
        // For Karim Benali (ID 2)
        navigateTo("teacher-profile-benali")
      } else if (teacherId === 3 || teacherId === 5) {
        // For Dr. Leila Hadj (ID 3) and Nadia Bouaziz (ID 5)
        // Use Dr. Amina Kazi profile for now
        navigateTo("teacher-profile-kazi")
      } else if (teacherId === 4 || teacherId === 6) {
        // For Youcef Mansouri (ID 4) and Mourad Haddad (ID 6)
        // Use Karim Benali profile for now
        navigateTo("teacher-profile-benali")
      } else {
        // For any other teachers, use Dr. Amina Kazi profile for now
        navigateTo("teacher-profile-kazi")
      }
    } else {
      // If navigateTo is not provided, we would typically use router.push
      // For demonstration, just show an alert
      alert(`Viewing teacher profile for ID: ${teacherId}`)
    }
  }

  const handleAddToCompare = (type: "schools" | "teachers", id: number) => {
    setCompareItems((prev) => ({
      ...prev,
      [type]: [...prev[type], id],
    }))
  }

  const handleRemoveFromCompare = (type: "schools" | "teachers", id: number) => {
    setCompareItems((prev) => ({
      ...prev,
      [type]: prev[type].filter((itemId) => itemId !== id),
    }))
  }

  const isInCompareList = (type: "schools" | "teachers", id: number) => {
    return compareItems[type].includes(id)
  }

  // Calculate pagination
  const paginateResults = (items: any[]) => {
    const startIndex = (currentPage - 1) * resultsPerPage
    return items.slice(startIndex, startIndex + resultsPerPage)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Filter schools based on search term, location, type, grade level, and rating
  const filteredSchools = mockSchools.filter((school) => {
    const matchesSearch = searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = location === "All" || school.location === location
    const matchesType = schoolType === "All" || school.type === schoolType
    const matchesGrade = gradeLevel === "All" || school.grades.includes(gradeLevel)

    return matchesSearch && matchesLocation && matchesType && matchesGrade
  })

  // Sort schools
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "students") return b.students - a.students
    return 0
  })

  // Paginate schools
  const paginatedSchools = paginateResults(sortedSchools)

  // Filter teachers based on search term, location, subject, rating, and experience
  const filteredTeachers = mockTeachers.filter((teacher) => {
    const matchesSearch = searchTerm === "" || teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = location === "All" || teacher.location === location
    const matchesSubject = subject === "All" || teacher.subject === subject

    return matchesSearch && matchesLocation && matchesSubject
  })

  // Sort teachers
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "experience") return b.experience - a.experience
    return 0
  })

  // Paginate teachers
  const paginatedTeachers = paginateResults(sortedTeachers)

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section with Image and Text */}
        <div className="relative">
          <div className="absolute -z-10 top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full translate-x-1/4 translate-y-1/4"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-100 rounded-full"></div>
          </div>

          {activeTab === "schools" ? (
            <img
              src="https://placehold.co/600x400/ffffff/4f46e5?text=Find+Your+Perfect+School"
              alt="Family looking for schools"
              className="rounded-lg shadow-lg relative z-10 mx-auto"
            />
          ) : (
            <img
              src="https://placehold.co/600x400/ffffff/4f46e5?text=Find+Expert+Teachers"
              alt="Student with teacher"
              className="rounded-lg shadow-lg relative z-10 mx-auto"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            {activeTab === "schools"
              ? "The Most Comprehensive School Platform"
              : "Find the Perfect Teacher for Your Learning Journey"}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {activeTab === "schools"
              ? "Search and compare among hundreds of schools and educational institutions."
              : "Connect with experienced teachers across various subjects and specialties."}
          </p>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full p-1 bg-green-50">
              <TabsTrigger
                value="schools"
                className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Building className="w-4 h-4 mr-2" /> Schools
              </TabsTrigger>
              <TabsTrigger
                value="teachers"
                className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" /> Teachers
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200">
                <Input
                  id="search-term"
                  type="text"
                  placeholder={activeTab === "schools" ? "Search school name..." : "Search teacher name..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-none focus:ring-0 flex-grow pl-4 py-6 bg-transparent rounded-l-full"
                />

                <div className="border-l border-gray-200 h-6 mx-2"></div>

                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger
                    className="border-none focus:ring-0 bg-transparent text-gray-600 w-40"
                    aria-label="Select location"
                  >
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-full m-1">
                  <Search className="w-5 h-5 text-white" />
                </Button>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm">
                <Button
                  variant="link"
                  className="text-green-600 flex items-center gap-1 px-0 h-auto"
                  onClick={() => alert("Map view coming soon!")}
                >
                  <Map className="w-4 h-4" /> Explore {activeTab} on the map
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" /> Advanced Filters{" "}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium mb-3">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTab === "schools" ? (
              <>
                <div>
                  <label htmlFor="school-type" className="block text-sm font-medium text-gray-700 mb-1">
                    School Type
                  </label>
                  <Select value={schoolType} onValueChange={setSchoolType}>
                    <SelectTrigger id="school-type">
                      <SelectValue placeholder="Select school type" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="grade-level" className="block text-sm font-medium text-gray-700 mb-1">
                    Grade Level
                  </label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger id="grade-level">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  {activeTab === "schools" ? (
                    <SelectItem value="students">Most Students</SelectItem>
                  ) : (
                    <SelectItem value="experience">Most Experience</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeTab === "schools"
            ? `Showing ${paginatedSchools.length} of ${filteredSchools.length} schools`
            : `Showing ${paginatedTeachers.length} of ${filteredTeachers.length} teachers`}
        </h2>

        <Button
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => alert("All results view coming soon!")}
        >
          View All <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <Tabs value={activeTab} defaultValue={activeTab}>
        <TabsContent value="schools">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedSchools.map((school) => (
              <SchoolCard
                key={school.id}
                school={school}
                navigateToProfile={() => handleSchoolProfileView(school.id)}
                isInCompareList={isInCompareList}
                handleAddToCompare={handleAddToCompare}
                handleRemoveFromCompare={handleRemoveFromCompare}
              />
            ))}
            {filteredSchools.length === 0 && (
              <div className="col-span-full text-center py-10">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No schools found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredSchools.length > resultsPerPage && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(5, Math.ceil(filteredSchools.length / resultsPerPage)) }).map(
                  (_, index) => {
                    // Show first page, last page, current page, and pages around current page
                    let pageNum = index + 1
                    if (Math.ceil(filteredSchools.length / resultsPerPage) > 5) {
                      const lastPage = Math.ceil(filteredSchools.length / resultsPerPage)
                      if (currentPage <= 3) {
                        pageNum = index + 1
                        if (index === 4) pageNum = lastPage
                      } else if (currentPage >= lastPage - 2) {
                        if (index === 0) pageNum = 1
                        else pageNum = lastPage - (4 - index)
                      } else {
                        if (index === 0) pageNum = 1
                        else if (index === 4) pageNum = lastPage
                        else pageNum = currentPage + (index - 2)
                      }
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  },
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredSchools.length / resultsPerPage)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="teachers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                navigateToProfile={() => handleTeacherProfileView(teacher.id)}
                isInCompareList={isInCompareList}
                handleAddToCompare={handleAddToCompare}
                handleRemoveFromCompare={handleRemoveFromCompare}
              />
            ))}
            {filteredTeachers.length === 0 && (
              <div className="col-span-full text-center py-10">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No teachers found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredTeachers.length > resultsPerPage && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(5, Math.ceil(filteredTeachers.length / resultsPerPage)) }).map(
                  (_, index) => {
                    // Show first page, last page, current page, and pages around current page
                    let pageNum = index + 1
                    if (Math.ceil(filteredTeachers.length / resultsPerPage) > 5) {
                      const lastPage = Math.ceil(filteredTeachers.length / resultsPerPage)
                      if (currentPage <= 3) {
                        pageNum = index + 1
                        if (index === 4) pageNum = lastPage
                      } else if (currentPage >= lastPage - 2) {
                        if (index === 0) pageNum = 1
                        else pageNum = lastPage - (4 - index)
                      } else {
                        if (index === 0) pageNum = 1
                        else if (index === 4) pageNum = lastPage
                        else pageNum = currentPage + (index - 2)
                      }
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  },
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredTeachers.length / resultsPerPage)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      {(compareItems.schools.length > 0 || compareItems.teachers.length > 0) && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              {activeTab === "schools" && compareItems.schools.length > 0 && (
                <div className="flex items-center">
                  <div className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {compareItems.schools.length}
                  </div>
                  <span className="ml-2">{compareItems.schools.length} schools selected</span>
                </div>
              )}
              {activeTab === "teachers" && compareItems.teachers.length > 0 && (
                <div className="flex items-center">
                  <div className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {compareItems.teachers.length}
                  </div>
                  <span className="ml-2">{compareItems.teachers.length} teachers selected</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white text-green-600 hover:bg-green-50">
                Compare Now
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCompareItems({ ...compareItems, [activeTab]: [] })}
                className="text-white hover:bg-green-700"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
