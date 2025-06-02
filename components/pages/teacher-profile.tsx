"use client"

import { useState } from "react"
import {
  MessageSquare,
  Star,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Clock,
  GraduationCap,
  ExternalLink,
  CalendarIcon,
  BookOpen,
  Share2,
  Download,
  Library,
  Globe,
  ShieldCheck,
  Check,
  ThumbsUp,
  BadgeCheck,
  ContrastIcon as Compare,
  Ruler,
  BriefcaseIcon,
  Heart,
  PlusCircle,
  Trash2,
  Info,
  FileText,
  ChevronRight,
  School,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export interface TeacherData {
  id: string
  name: string
  subject: string
  rating: number
  reviewCount: number
  location: string
  bio: string
  img: string
  coverImage: string
  licenseCard: string
  profilePictures: string[]
  contact: {
    email: string
    phone: string
    office: string
    officeHours: string
    socialMedia: {
      linkedin?: string
      twitter?: string
      [key: string]: string | undefined
    }
  }
  education: Array<{
    degree: string
    institution: string
    year: string
    location: string
  }>
  experience: Array<{
    position: string
    institution: string
    period: string
    location: string
    description: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    year: string
    id: string
  }>
  publications: Array<{
    title: string
    journal: string
    year: string
    doi: string
  }>
  skills: string[]
  teachingPhilosophy: string
  courses: Array<{
    title: string
    subject: string
    rating: number
    reviewCount: number
    students: number
    price: string
    imageUrl: string
    description: string
    level: string
    duration: string
    objectives: string[]
    syllabus: string[]
  }>
  reviews: Array<{
    name: string
    avatar: string
    rating: number
    comment: string
    date: string
    course: string
  }>
  schedule: Array<{
    day: string
    time: string
    course: string
    location: string
    availableSeats: number
    mode: string
  }>
  achievements: Array<{
    title: string
    organization: string
    year: string
    description: string
  }>
  teachingMaterials: Array<{
    title: string
    type: string
    description: string
    downloadable: boolean
  }>
  languages: Array<{
    language: string
    proficiency: string
  }>
  availability: {
    nextAvailable: string
    bookingWindow: string
    privateSessionRate: string
    groupSessionRate: string
  }
  verificationStatus: {
    identityVerified: boolean
    backgroundChecked: boolean
    qualificationsVerified: boolean
    lastVerified: string
  }
  visits: number
  dataCompleteness: number
  digitalPresence: number
  license: {
    number: string
    issuingAuthority: string
    issueDate: string
    expiryDate: string
    status: string
  }
}

interface TeacherProfileProps {
  teacher: TeacherData
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfile({ teacher, navigateTo, userType = "parent", showBackButton = false }: TeacherProfileProps) {
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Function to handle navigation back to find resources page
  const handleBackToFindResources = () => {
    if (navigateTo) {
      navigateTo("find-resources", "teachers")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button - only shown when accessed from find resources page */}
      {showBackButton && (
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={handleBackToFindResources}
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 rotate-180 text-green-600" />
            Back
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src={teacher.coverImage || "/placeholder.svg?height=400&width=1200&text=Cover+Image"}
          alt={`${teacher.name} - Cover Image`}
          className="object-cover object-center"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Teacher Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src={teacher.img || "/placeholder.svg?height=144&width=144&text=Profile"}
              alt={teacher.name}
              width={144}
              height={144}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{teacher.name}</h1>
                {teacher.verificationStatus?.qualificationsVerified && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <GraduationCap className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{teacher.subject} Specialist</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {teacher.rating}/5 ({teacher.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500" : ""}`} />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-8">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{teacher.bio}</p>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-green-100 p-2 rounded-full">
                          <GraduationCap className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                          {edu.location && <p className="text-sm text-gray-500 mt-1">{edu.location}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.experience.map((exp, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <BriefcaseIcon className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">{exp.position}</h4>
                          <p className="text-gray-600">{exp.institution}</p>
                          <p className="text-sm text-gray-500">{exp.period}</p>
                          {exp.description && <p className="text-sm text-gray-500 mt-1">{exp.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Philosophy */}
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{teacher.teachingPhilosophy}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teacher.courses.map((course, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{course.subject}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{course.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({course.reviewCount} reviews)</span>
                          </div>
                          <div className="text-sm text-gray-500">{course.duration}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{course.students} students</span>
                          </div>
                          <div className="text-lg font-semibold text-green-600">
                            {course.price}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button className="w-full">View Course Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                {teacher.reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <p className="text-sm text-gray-500">{review.course}</p>
                            </div>
                            <div className="flex items-center text-yellow-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-600">{teacher.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600">{teacher.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <School className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Office</h4>
                        <p className="text-gray-600">{teacher.contact.office}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-orange-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Office Hours</h4>
                        <p className="text-gray-600">{teacher.contact.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">{teacher.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">{teacher.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Office</h4>
                  <p className="text-gray-600">{teacher.contact.office}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <p className="text-gray-600">{teacher.contact.officeHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {teacher.contact.socialMedia && Object.keys(teacher.contact.socialMedia).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(teacher.contact.socialMedia).map(([platform, url]) => (
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <span className="capitalize">{platform}</span>
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Identity Verified</span>
                  {teacher.verificationStatus?.identityVerified ? (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      <Check className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Check</span>
                  {teacher.verificationStatus?.backgroundChecked ? (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      <Check className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Qualifications</span>
                  {teacher.verificationStatus?.qualificationsVerified ? (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      <Check className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last verified: {teacher.verificationStatus?.lastVerified}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">License Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* License Card Image */}
                {teacher.licenseCard && (
                  <div className="mb-4">
                    <Image
                      src={teacher.licenseCard}
                      alt="Teacher License Card"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">License Number</span>
                    <span className="text-sm font-medium">{teacher.license.number}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Issuing Authority</span>
                    <span className="text-sm">{teacher.license.issuingAuthority}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Issue Date</span>
                    <span className="text-sm">{teacher.license.issueDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expiry Date</span>
                    <span className="text-sm">{teacher.license.expiryDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge
                      variant="outline"
                      className={
                        teacher.license.status === "Active"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }
                    >
                      {teacher.license.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 