"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Building, GraduationCap, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageTitle } from "@/components/ui/page-title"

interface ComparePageProps {
  type?: "schools" | "teachers"
  navigateTo?: (page: string) => void
}

export default function ComparePage({ type = "schools", navigateTo }: ComparePageProps) {
  const [compareType, setCompareType] = useState<"schools" | "teachers">(type)
  const [compareItems, setCompareItems] = useState<any[]>([])

  // Mock data for schools
  const mockSchools = [
    {
      id: 1,
      name: "Oakridge Elementary",
      type: "Public",
      rating: 4.7,
      reviewCount: 128,
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300&text=Oakridge",
      students: 450,
      teachers: 32,
      founded: 1985,
      grades: "K-5",
      fees: "$0 (Public)",
      facilities: ["Library", "Computer Lab", "Playground", "Cafeteria", "Sports Field"],
      programs: ["STEM Focus", "Arts Program", "Special Education", "After School Care"],
      languages: ["English", "Spanish"],
      admissionRate: "95%",
      studentTeacherRatio: "14:1",
    },
    {
      id: 2,
      name: "Westlake Academy",
      type: "Private",
      rating: 4.9,
      reviewCount: 215,
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300&text=Westlake",
      students: 620,
      teachers: 48,
      founded: 1972,
      grades: "K-12",
      fees: "$18,500 - $24,000/year",
      facilities: ["Library", "Science Labs", "Art Studio", "Theater", "Swimming Pool", "Tennis Courts"],
      programs: ["International Baccalaureate", "Gifted Program", "Sports Excellence", "Music Conservatory"],
      languages: ["English", "French", "Mandarin"],
      admissionRate: "65%",
      studentTeacherRatio: "10:1",
    },
    {
      id: 3,
      name: "Riverside Montessori",
      type: "Private",
      rating: 4.5,
      reviewCount: 98,
      location: "Oakland, CA",
      image: "/placeholder.svg?height=200&width=300&text=Riverside",
      students: 320,
      teachers: 28,
      founded: 1995,
      grades: "Pre-K-8",
      fees: "$16,200 - $19,800/year",
      facilities: ["Garden", "Art Studio", "Library", "Outdoor Classroom", "Playground"],
      programs: ["Montessori Method", "Outdoor Education", "Arts Focus", "Individualized Learning"],
      languages: ["English", "Spanish"],
      admissionRate: "75%",
      studentTeacherRatio: "12:1",
    },
  ]

  // Mock data for teachers
  const mockTeachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subjects: ["Mathematics", "Computer Science"],
      rating: 4.9,
      reviewCount: 87,
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300&text=Dr.+Johnson",
      experience: 12,
      education: "Ph.D. in Mathematics, Stanford University",
      certifications: ["California Teaching Credential", "AP Computer Science Certified", "Google Certified Educator"],
      teachingStyle: "Interactive and project-based learning with real-world applications",
      availability: "Mon-Fri, 3PM-7PM",
      hourlyRate: "$65-85",
      languages: ["English", "French"],
      specialties: ["AP Calculus", "Coding for Beginners", "Math Competition Prep"],
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      subjects: ["English Literature", "Creative Writing"],
      rating: 4.7,
      reviewCount: 64,
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300&text=Mr.+Rodriguez",
      experience: 8,
      education: "M.A. in English Literature, UC Berkeley",
      certifications: ["California Teaching Credential", "National Writing Project Fellow"],
      teachingStyle: "Discussion-based approach with emphasis on critical thinking and creative expression",
      availability: "Tue-Sat, 4PM-8PM",
      hourlyRate: "$55-75",
      languages: ["English", "Spanish"],
      specialties: ["Essay Writing", "SAT/ACT Prep", "Poetry and Fiction"],
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      subjects: ["Biology", "Environmental Science"],
      rating: 4.8,
      reviewCount: 72,
      location: "Oakland, CA",
      image: "/placeholder.svg?height=200&width=300&text=Dr.+Chen",
      experience: 15,
      education: "Ph.D. in Biology, MIT",
      certifications: ["California Teaching Credential", "National Board Certification", "AP Biology Certified"],
      teachingStyle: "Hands-on experiments and field studies combined with rigorous academic content",
      availability: "Mon-Thu, 3PM-9PM",
      hourlyRate: "$70-90",
      languages: ["English", "Mandarin"],
      specialties: ["AP Biology", "Medical School Prep", "Field Research"],
    },
  ]

  // Load mock data based on type
  useEffect(() => {
    if (compareType === "schools") {
      setCompareItems(mockSchools.slice(0, 3))
    } else {
      setCompareItems(mockTeachers.slice(0, 3))
    }
  }, [compareType])

  const handleTypeChange = (value: string) => {
    setCompareType(value as "schools" | "teachers")
  }

  const handleGoBack = () => {
    if (navigateTo) {
      navigateTo("find-resources", compareType)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleGoBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
        </Button>
        <PageTitle
          title={`Compare ${compareType === "schools" ? "Schools" : "Teachers"}`}
          icon={compareType === "schools" ? Building : GraduationCap}
        />
      </div>

      <Tabs value={compareType} onValueChange={handleTypeChange} className="mb-8">
        <TabsList>
          <TabsTrigger value="schools" className="flex items-center gap-1">
            <Building className="h-4 w-4" /> Schools
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" /> Teachers
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="schools" className="mt-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left bg-gray-50 border-b"></th>
                {compareItems.map((school) => (
                  <th key={school.id} className="p-4 text-center border-b">
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0 flex flex-col items-center">
                        <img
                          src={school.image || "/placeholder.svg"}
                          alt={school.name}
                          className="w-32 h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-bold text-lg mb-1">{school.name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {school.type}
                        </Badge>
                        <div className="flex items-center mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(school.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                              strokeWidth={1}
                            />
                          ))}
                          <span className="text-sm ml-1 text-gray-500">
                            {school.rating} ({school.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1" /> {school.location}
                        </div>
                      </CardContent>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Grades</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-grades`} className="p-4 text-center border-b">
                    {school.grades}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Students</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-students`} className="p-4 text-center border-b">
                    {school.students}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Teachers</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-teachers`} className="p-4 text-center border-b">
                    {school.teachers}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Student-Teacher Ratio</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-ratio`} className="p-4 text-center border-b">
                    {school.studentTeacherRatio}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Founded</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-founded`} className="p-4 text-center border-b">
                    {school.founded}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Fees</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-fees`} className="p-4 text-center border-b">
                    {school.fees}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Admission Rate</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-admission`} className="p-4 text-center border-b">
                    {school.admissionRate}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Languages</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-languages`} className="p-4 text-center border-b">
                    {school.languages.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Programs</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-programs`} className="p-4 text-center border-b">
                    <div className="flex flex-wrap justify-center gap-1">
                      {school.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="mb-1">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Facilities</td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-facilities`} className="p-4 text-center border-b">
                    <div className="flex flex-wrap justify-center gap-1">
                      {school.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="mb-1">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b"></td>
                {compareItems.map((school) => (
                  <td key={`${school.id}-action`} className="p-4 text-center border-b">
                    <Button onClick={() => navigateTo && navigateTo("institutions-profile")}>View Profile</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="teachers" className="mt-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left bg-gray-50 border-b"></th>
                {compareItems.map((teacher) => (
                  <th key={teacher.id} className="p-4 text-center border-b">
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0 flex flex-col items-center">
                        <img
                          src={teacher.image || "/placeholder.svg"}
                          alt={teacher.name}
                          className="w-32 h-32 object-cover rounded-full mb-3"
                        />
                        <h3 className="font-bold text-lg mb-1">{teacher.name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {teacher.subjects[0]}
                        </Badge>
                        <div className="flex items-center mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                              strokeWidth={1}
                            />
                          ))}
                          <span className="text-sm ml-1 text-gray-500">
                            {teacher.rating} ({teacher.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1" /> {teacher.location}
                        </div>
                      </CardContent>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Subjects</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-subjects`} className="p-4 text-center border-b">
                    {teacher.subjects.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Experience</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-experience`} className="p-4 text-center border-b">
                    {teacher.experience} years
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Education</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-education`} className="p-4 text-center border-b">
                    {teacher.education}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Certifications</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-certifications`} className="p-4 text-center border-b">
                    <div className="flex flex-wrap justify-center gap-1">
                      {teacher.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="mb-1">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Teaching Style</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-style`} className="p-4 text-center border-b">
                    {teacher.teachingStyle}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Availability</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-availability`} className="p-4 text-center border-b">
                    {teacher.availability}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Hourly Rate</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-rate`} className="p-4 text-center border-b">
                    {teacher.hourlyRate}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Languages</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-languages`} className="p-4 text-center border-b">
                    {teacher.languages.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b">Specialties</td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-specialties`} className="p-4 text-center border-b">
                    <div className="flex flex-wrap justify-center gap-1">
                      {teacher.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="mb-1">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium bg-gray-50 border-b"></td>
                {compareItems.map((teacher) => (
                  <td key={`${teacher.id}-action`} className="p-4 text-center border-b">
                    <Button onClick={() => navigateTo && navigateTo("teachers-profile")}>View Profile</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </TabsContent>
    </div>
  )
}
