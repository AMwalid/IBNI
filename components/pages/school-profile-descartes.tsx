"use client"

import { useState } from "react"
import {
  Building2,
  MapPin,
  Star,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Check,
  Info,
  Map,
  FileText,
  Laptop,
  PlusCircle,
  Trash2,
  Eye,
  Globe,
  Phone,
  Mail,
  ImageIcon,
  School,
  Utensils,
  Dumbbell,
  Music,
  Palette,
  Accessibility,
  Bus,
  GraduationCap,
  Code,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface SchoolProfileDescartesProps {
  userType?: "parent" | "teacher" | "admin" | "school"
  navigateTo?: (page: string, tab?: string | null) => void
  showBackButton?: boolean
}

export default function SchoolProfileDescartes({ userType = "parent", navigateTo, showBackButton = true }: SchoolProfileDescartesProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [galleryView, setGalleryView] = useState<"grid" | "slideshow">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")

  const isAdmin = userType === "admin"
  const isSchoolAdmin = userType === "school"
  const canEdit = isAdmin || isSchoolAdmin

  // Mock data for Lycée Descartes
  const school = {
    id: "descartes-001",
    name: "Lycée Descartes",
    logo: "/images/logo-placeholder.png",
    verified: true,
    locationDisplayText: "ALGIERS, ALGERIA",
    type: "French International School",
    demographics: "High School (Ages 15-18)",
    rating: 4.7,
    visits: 18500,
    dataCompleteness: 90.5,
    digitalPresence: 82,
    fees: {
      min: 45000,
      max: 65000,
      currency: "DZD",
      installments: true,
      discount: 5,
      installmentDetails: [
        { name: "First Term Payment", percentage: 40, dueDate: "September 1, 2025" },
        { name: "Second Term Payment", percentage: 30, dueDate: "January 1, 2026" },
        { name: "Third Term Payment", percentage: 30, dueDate: "April 1, 2026" },
      ],
    },
    license: {
      number: "FR-EDU-ALG-456-2024",
      issuedBy: "Ministry of Education & French Embassy",
      issuedDate: "2024-01-15",
      expiryDate: "2029-01-14",
      status: "Active",
      accreditations: ["French Ministry of Education", "International Baccalaureate Organization"],
    },
    contact: {
      phone: "+213 (0)21 XX XX XX",
      email: "contact@lyceedescartes.dz",
      website: "www.lyceedescartes.dz",
      socialMedia: {
        facebook: "facebook.com/lyceedescartes.dz",
        twitter: "twitter.com/lyceedescartes",
        instagram: "instagram.com/lyceedescartes.dz",
        linkedin: "linkedin.com/company/lycee-descartes-algerie"
      },
    },
    about:
      "Lycée Descartes is a prestigious French international school in Algiers, offering a rigorous French curriculum alongside international programs. Founded in 1985, we provide a multicultural environment that fosters academic excellence, critical thinking, and global citizenship. Our graduates consistently achieve outstanding results in the French Baccalaureate and gain admission to top universities worldwide.",
    curriculum: [
      "French National Curriculum",
      "International Option of the French Baccalaureate (OIB)",
      "DELF/DALF Certification Programs",
      "Cambridge English Qualifications"
    ],
    languages: ["French (Primary)", "Arabic", "English", "Spanish", "German"],
    facilities: [
      { name: "Classrooms", count: 35, details: "Modern classrooms with digital learning tools", icon: School },
      { name: "Science Labs", count: 4, details: "Fully equipped physics, chemistry, and biology labs", icon: BookOpen },
      { name: "Computer Labs", count: 2, details: "State-of-the-art computer labs with latest software", icon: Laptop },
      { name: "Library", count: 1, details: "Extensive collection with over 15,000 books and digital resources", icon: BookOpen },
      { name: "Sports Facilities", details: "Gymnasium, football field, tennis courts, and athletics track", icon: Dumbbell },
      { name: "Cafeteria", details: "Modern cafeteria serving nutritious French and international cuisine", icon: Utensils },
      { name: "Auditorium", count: 1, details: "300-seat auditorium for performances and events", icon: Users },
      { name: "Art Studios", count: 2, details: "Dedicated spaces for visual arts and music", icon: Palette },
    ],
    staff: {
      total: 65,
      teachingStaff: 45,
      administrativeStaff: 12,
      supportStaff: 8,
      teacherStudentRatio: "1:12",
      qualifications: {
        doctorate: "15%",
        masters: "65%",
        bachelors: "20%",
      },
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Philippe Laurent",
          position: "Principal",
          subject: "Administration",
          experience: 25,
          certification: {
            number: "FR-PRIN-789",
            issuedBy: "French Ministry of Education",
            issuedDate: "2015-08-10",
            expiryDate: "2025-08-09",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.9,
        },
        {
          id: 2,
          name: "Mme. Sophie Dubois",
          position: "Head of Sciences",
          subject: "Physics",
          experience: 18,
          certification: {
            number: "FR-SCI-456",
            issuedBy: "French Ministry of Education",
            issuedDate: "2018-07-15",
            expiryDate: "2028-07-14",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.8,
        },
      ],
    },
    students: {
      total: 450,
      byGrade: {
        "Seconde (10th Grade)": 150,
        "Première (11th Grade)": 150,
        "Terminale (12th Grade)": 150,
      },
      nationalitiesCount: 12,
    },
    calendar: {
      academicYear: "September 2025 - June 2026",
      terms: [
        { name: "First Term", start: "September 1, 2025", end: "December 18, 2025" },
        { name: "Second Term", start: "January 5, 2026", end: "March 26, 2026" },
        { name: "Third Term", start: "April 5, 2026", end: "June 25, 2026" },
      ],
      holidays: [
        { name: "Fall Break", start: "October 24, 2025", end: "November 2, 2025" },
        { name: "Winter Break", start: "December 19, 2025", end: "January 4, 2026" },
        { name: "Spring Break", start: "March 27, 2026", end: "April 4, 2026" },
      ],
      events: [
        { name: "Open House Day", date: "November 15, 2025" },
        { name: "Science Fair", date: "February 20, 2026" },
        { name: "Cultural Festival", date: "May 15, 2026" },
        { name: "Graduation Ceremony", date: "June 28, 2026" },
      ],
    },
    academics: {
      curriculum: {
        primary: "N/A (High School Only)",
        middle: "N/A (High School Only)",
        high: "French Baccalaureate (General, Technological, and Professional Streams)",
      },
      subjects: [
        "French Language and Literature",
        "Mathematics",
        "Physics-Chemistry",
        "Biology and Earth Sciences",
        "History-Geography",
        "Philosophy",
        "Economics and Social Sciences",
        "English Language",
        "Arabic Language",
        "Spanish/German Language",
        "Physical Education",
        "Arts",
        "Computer Science",
      ],
      classSize: {
        average: 22,
        maximum: 28,
      },
      assessmentMethods: [
        "Continuous assessment",
        "Trimestral examinations",
        "Baccalaureate preparation exams",
        "Oral presentations",
        "Research projects",
      ],
      specialPrograms: [
        "International Section (OIB)",
        "European Section (English/Spanish)",
        "Scientific Research Program",
        "Arts and Culture Program",
        "Exchange Programs with French Schools",
      ],
      achievements: [
        "98% Baccalaureate success rate (2024)",
        "45% of graduates with Mention Très Bien (Highest Honors)",
        "National Science Olympiad Winners (2023, 2024)",
        "Regional Debate Competition Champions (2024)",
      ],
    },
    admissions: {
      process: [
        "Submit online application form",
        "Provide academic records from previous schools",
        "Complete entrance assessment (French, Mathematics, English)",
        "Attend student and parent interview",
        "Receive admission decision within 2 weeks",
        "Complete registration and fee payment",
      ],
      requirements: [
        "Completed application form",
        "Birth certificate",
        "Academic transcripts from previous 2 years",
        "Recommendation letter from current school",
        "Passport-sized photographs",
        "Proof of identity",
        "Language proficiency certificates (if applicable)",
      ],
      openDates: "Applications for 2025-2026 academic year open from November 1, 2024 to March 31, 2025",
      contactPerson: "Mme. Nadia Belkacem, Admissions Coordinator",
    },
    gallery: [
      {
        id: "g1",
        title: "Main Building",
        category: "campus",
        image: "/placeholder.svg?height=400&width=600&text=Main+Building",
      },
      {
        id: "g2",
        title: "Science Laboratory",
        category: "facilities",
        image: "/placeholder.svg?height=400&width=600&text=Science+Lab",
      },
      {
        id: "g3",
        title: "Library",
        category: "facilities",
        image: "/placeholder.svg?height=400&width=600&text=Library",
      },
      {
        id: "g4",
        title: "Sports Field",
        category: "sports",
        image: "/placeholder.svg?height=400&width=600&text=Sports+Field",
      },
      {
        id: "g5",
        title: "Graduation Ceremony",
        category: "events",
        image: "/placeholder.svg?height=400&width=600&text=Graduation",
      },
      {
        id: "g6",
        title: "Cultural Festival",
        category: "events",
        image: "/placeholder.svg?height=400&width=600&text=Cultural+Festival",
      },
    ],
  }

  // Function to handle navigation back to find resources page
  const handleBackToFindResources = () => {
    if (navigateTo) {
      navigateTo("find-resources", "schools")
    }
  }

  // Teacher certification card component
  const TeacherCertificationCard = ({ teacher }: { teacher: any }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex p-4">
        <div className="flex-shrink-0 mr-4">
          <Image
            src={teacher.image || "/placeholder.svg?height=80&width=80"}
            alt={teacher.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-lg">{teacher.name}</h3>
          <p className="text-gray-600 text-sm">{teacher.position}</p>
          <p className="text-gray-500 text-sm">
            {teacher.subject} • {teacher.experience} years experience
          </p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(teacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">{teacher.rating}</span>
          </div>
        </div>
      </div>
      <CardFooter className="bg-green-50 p-3 border-t">
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">Certification</span>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              <Check className="h-3 w-3 mr-1" /> Verified
            </Badge>
          </div>
          <div className="text-xs text-gray-600">
            <p>Cert. ID: {teacher.certification.number}</p>
            <p>Issued: {new Date(teacher.certification.issuedDate).toLocaleDateString()}</p>
            <p>Expires: {new Date(teacher.certification.expiryDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCompare = () => {
    if (!compareList.includes(school.id)) {
      setCompareList([...compareList, school.id])
    }
  }

  const handleRemoveFromCompare = () => {
    setCompareList(compareList.filter((id) => id !== school.id))
  }

  const isInCompareList = compareList.includes(school.id)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1))
  }

  const filteredGallery =
    galleryFilter === "all" ? school.gallery : school.gallery.filter((item) => item.category === galleryFilter)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button - only shown when accessed from find resources page */}
      {showBackButton && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToFindResources}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src="/images/hero-school.png"
          alt="Lycée Descartes - Excellence in Education"
          className="object-cover object-center"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* School Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src={school.logo}
              alt={`${school.name} Logo`}
              width={144}
              height={144}
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{school.name}</h1>
                {school.verified && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{school.locationDisplayText}</span>
                <Building2 className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{school.type}</span>
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{school.demographics}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(school.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{school.rating.toFixed(1)}/5</span>
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
                Inquire
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant={isInCompareList ? "destructive" : "outline"}
                size="sm"
                onClick={isInCompareList ? handleRemoveFromCompare : handleAddToCompare}
              >
                {isInCompareList ? (
                  <>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove from Compare
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add to Compare
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Profile Views (Monthly)</p>
                <p className="text-2xl font-bold">{school.visits.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Profile Completeness</p>
                <p className="text-2xl font-bold">{school.dataCompleteness}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Progress value={school.dataCompleteness} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Online Engagement</p>
                <p className="text-2xl font-bold">{school.digitalPresence}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Laptop className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <Progress value={school.digitalPresence} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tuition Fees Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Tuition Fees</h3>
                <p className="text-gray-500 mt-1">
                  {school.fees.min.toLocaleString()} - {school.fees.max.toLocaleString()} {school.fees.currency} per academic year
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.fees.installments && (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Installment options available
                    </Badge>
                  )}
                  {school.fees.discount > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                      {school.fees.discount}% Early Registration Discount
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-green-600 hover:bg-green-700">Apply Now</Button>
                {school.fees.installments && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-green-600">
                      View payment plans
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Payment Plan Details</DialogTitle>
                      <DialogDescription>
                        The school offers the following payment plans for the academic year.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {school.fees.installmentDetails.map((installment, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{installment.name}</p>
                            <p className="text-sm text-gray-500">Due: {installment.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{installment.percentage}% of total</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button className="bg-green-600 hover:bg-green-700">Start Application</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="academics">Programs</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-green-600" />
                    About {school.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{school.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    License & Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-500">License Number</h4>
                      <p>{school.license.number}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Issued By</h4>
                      <p>{school.license.issuedBy}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Issue Date</h4>
                      <p>{new Date(school.license.issuedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Expiry Date</h4>
                      <p>{new Date(school.license.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-500">Status</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        {school.license.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-500">Endorsements</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {school.license.accreditations.map((accreditation, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          <Award className="h-3 w-3 mr-1" />
                          {accreditation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Meet Our Staff
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school.staff.featuredTeachers.map((teacher) => (
                      <TeacherCertificationCard key={teacher.id} teacher={teacher} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <School className="h-5 w-5 mr-2 text-green-600" />
                    Our Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    {school.name} provides a modern and well-equipped environment designed to support academic excellence and student development.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {school.facilities.map((facility, index) => (
                      <div key={index} className="flex items-start p-4 border rounded-lg bg-gray-50/50">
                        <facility.icon className="h-8 w-8 text-green-600 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-lg">{facility.name} {facility.count ? `(${facility.count})` : ''}</h4>
                          <p className="text-gray-600 text-sm">{facility.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-green-600" />
                      School Gallery
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("all")} className={galleryFilter === "all" ? "bg-slate-100" : ""}>All</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("campus")} className={galleryFilter === "campus" ? "bg-slate-100" : ""}>Campus</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("facilities")} className={galleryFilter === "facilities" ? "bg-slate-100" : ""}>Facilities</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("events")} className={galleryFilter === "events" ? "bg-slate-100" : ""}>Events</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredGallery.length === 0 ? (
                    <p className="text-center text-gray-500">No images available for this filter.</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredGallery.map((item) => (
                          <div key={item.id} className="group relative">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={400}
                              height={300}
                              className="rounded-lg object-cover aspect-video group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center">{item.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">High School Program</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.high}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">Special Programs</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {school.academics.specialPrograms.map((program, index) => (
                        <li key={index}>{program}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Code className="h-5 w-5 mr-2 text-green-600" />Subjects Offered</CardTitle></CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {school.academics.subjects.map((subject, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2 text-green-600" />Academic Achievements</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {school.academics.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2 text-green-600" />Admission Process</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Join {school.name} by following these steps:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {school.admissions.process.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                  <p className="mt-4 text-sm text-gray-800 font-semibold">{school.admissions.openDates}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2 text-green-600" />Required Documents</CardTitle></CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {school.admissions.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Users className="h-5 w-5 mr-2 text-green-600" />Contact for Admissions</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-600">{school.admissions.contactPerson}</p>
                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700">Request Information</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-green-600" />
                Our Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Algiers, Algeria</p>
              <div className="mt-4 h-48 w-full rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image src="/placeholder.svg?height=200&width=350" alt={`Map showing location of ${school.name}`} width={350} height={200} className="object-cover"/>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MapPin className="h-4 w-4 mr-2" /> Get Directions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-600" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-500" />
                <span className="text-gray-700">{school.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-500" />
                <a href={`mailto:${school.contact.email}`} className="text-green-600 hover:underline">
                  {school.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-3 text-gray-500" />
                <a
                  href={`https://${school.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {school.contact.website}
                </a>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-1">Follow us:</p>
                <div className="flex space-x-3">
                  {school.contact.socialMedia.facebook && <a href={`https://${school.contact.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">Facebook</a>}
                  {school.contact.socialMedia.twitter && <a href={`https://${school.contact.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500">Twitter</a>}
                  {school.contact.socialMedia.instagram && <a href={`https://${school.contact.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600">Instagram</a>}
                  {school.contact.socialMedia.linkedin && <a href={`https://${school.contact.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">LinkedIn</a>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-green-600" />
                Quick Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-600">Academic Year:</span> {school.calendar.academicYear}</p>
              <p><span className="font-medium text-gray-600">Student Population:</span> {school.students.total} students</p>
              <p><span className="font-medium text-gray-600">Teacher-Student Ratio:</span> {school.staff.teacherStudentRatio}</p>
              <p><span className="font-medium text-gray-600">Languages of Instruction:</span> {school.languages.slice(0, 3).join(', ')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
