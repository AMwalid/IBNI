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
  Languages,
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
import Image from "next/image"

interface SchoolProfileElFethProps {
  userType?: "parent" | "teacher" | "admin" | "school"
  navigateTo?: (page: string, tab?: string | null) => void
  showBackButton?: boolean
}

export default function SchoolProfileElFeth({ userType = "parent", navigateTo, showBackButton = true }: SchoolProfileElFethProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [galleryView, setGalleryView] = useState<"grid" | "slideshow">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")

  const isAdmin = userType === "admin"
  const isSchoolAdmin = userType === "school"
  const canEdit = isAdmin || isSchoolAdmin

  // Mock data for Collège El Feth
  const school = {
    id: "elfeth-oran-001",
    name: "Collège El Feth",
    logo: "/placeholder.svg?height=144&width=144&text=El+Feth",
    verified: true,
    locationDisplayText: "ORAN, ALGERIA",
    type: "Public Middle School",
    demographics: "Middle School (Ages 11-15)",
    rating: 4.5,
    visits: 12800,
    dataCompleteness: 90.0,
    digitalPresence: 75,
    fees: {
      min: 0,
      max: 0,
      currency: "DZD",
      installments: false,
      discount: 0,
      additionalFees: [
        { name: "School Supplies", amount: 5000, currency: "DZD", optional: false },
        { name: "Extracurricular Activities", amount: 3000, currency: "DZD", optional: true },
      ],
    },
    license: {
      number: "MS-EDU-ORN-789-2010",
      issuedBy: "Ministry of National Education",
      issuedDate: "2010-07-20",
      expiryDate: "2030-07-19",
      status: "Active",
      accreditations: ["Algerian National Education Standards Compliant"],
    },
    contact: {
      phone: "+213 (0)41 XX XX XX",
      email: "contact@college-elfeth.dz",
      website: "www.college-elfeth.dz",
      socialMedia: {
        facebook: "facebook.com/CollegeElFeth",
      },
    },
    about:
      "Collège El Feth is a well-established public middle school in Oran, dedicated to providing quality education that balances academic excellence with cultural and artistic development. Our mission is to prepare students for success in high school and beyond, while fostering a strong sense of national identity and cultural appreciation. We emphasize both scientific and artistic disciplines, creating well-rounded students ready to contribute to society.",
    curriculum: [
      "Algerian National Curriculum",
      "Enhanced Arts & Cultural Program",
      "Scientific Research Initiative",
      "Sports Excellence Program",
    ],
    languages: ["Primary instruction in Arabic", "French as second language", "English as third language"],
    facilities: [
      { name: "Classrooms", count: 30, details: "Modern, well-equipped learning spaces", icon: School },
      { name: "Science Laboratories", count: 3, details: "Physics, chemistry, and biology labs", icon: Laptop },
      { name: "Computer Lab", count: 1, details: "30 computers with internet access", icon: Laptop },
      { name: "Library", count: 1, details: "Over 8,000 books in multiple languages", icon: BookOpen },
      { name: "Sports Facilities", details: "Football field, basketball court, and athletics track", icon: Dumbbell },
      { name: "Arts Studio", details: "Dedicated space for visual arts and music", icon: Palette },
      { name: "Cafeteria", details: "Serving nutritious meals", icon: Utensils },
    ],
    specialNeeds: {
      available: true,
      services: [
        "Learning support specialists",
        "Modified curriculum when needed",
        "Counseling services",
      ],
      accommodations: [
        "Accessible facilities",
        "Extended time for assessments",
        "Small group instruction",
      ],
      inclusionPolicy:
        "Collège El Feth is committed to inclusive education that supports diverse learning needs. We work to accommodate students with various learning differences while maintaining high academic standards.",
    },
    transportation: {
      available: true,
      areas: ["Central Oran", "Bir El Djir", "Es Senia", "Sidi El Bachir"],
      fees: {
        oneWay: 0,
        roundTrip: 0,
        currency: "DZD",
      },
    },
    extracurricular: [
      "Science Club",
      "Arts & Culture Club",
      "Sports Teams (Football, Basketball, Athletics)",
      "Music Ensemble",
      "Drama Club",
      "Environmental Awareness Group",
      "Community Service Program"
    ],
    achievements: [
      "Regional Science Competition Winners (2023)",
      "National Arts Festival Recognition (2022, 2023)",
      "Regional Sports Championships (2021, 2023)",
      "Environmental Conservation Award (2022)",
    ],
    staff: {
      teachers: 45,
      administrators: 8,
      support: 15,
      teacherQualifications: {
        doctorate: 3,
        masters: 25,
        bachelors: 17,
        industryCertified: 40,
      },
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Leila Hadj",
          position: "Head of Science Department",
          subject: "Biology",
          experience: 15,
          certification: {
            number: "SCI-BIO-ORN-00456",
            issuedBy: "Ministry of National Education",
            issuedDate: "2015-06-10",
            expiryDate: "2025-06-09",
          },
          image: "/placeholder.svg?height=100&width=100&text=LH",
          rating: 4.8,
        },
        {
          id: 2,
          name: "Mr. Ahmed Benali",
          position: "Arts Coordinator",
          subject: "Visual Arts",
          experience: 12,
          certification: {
            number: "ARTS-VIS-00789",
            issuedBy: "Ministry of Culture and Arts",
            issuedDate: "2018-09-15",
            expiryDate: "2028-09-14",
          },
          image: "/placeholder.svg?height=100&width=100&text=AB",
          rating: 4.7,
        },
        {
          id: 3,
          name: "Ms. Fatima Zidane",
          position: "Language Department Head",
          subject: "French Language",
          experience: 10,
          certification: {
            number: "LANG-FRE-00567",
            issuedBy: "Ministry of National Education",
            issuedDate: "2019-07-20",
            expiryDate: "2029-07-19",
          },
          image: "/placeholder.svg?height=100&width=100&text=FZ",
          rating: 4.6,
        },
      ],
    },
    students: {
      total: 720,
      byGrade: {
        "First Year": 240,
        "Second Year": 250,
        "Third Year": 230,
      },
      nationalitiesCount: 3,
    },
    calendar: {
      academicYear: "September 2025 - June 2026",
      terms: [
        { name: "First Term", start: "September 1, 2025", end: "December 18, 2025" },
        { name: "Second Term", start: "January 5, 2026", end: "March 26, 2026" },
        { name: "Third Term", start: "April 5, 2026", end: "June 25, 2026" },
      ],
      holidays: [
        { name: "Mawlid al-Nabi*", dates: "September 2025 (TBD)" },
        { name: "Revolution Day", dates: "November 1, 2025" },
        { name: "Winter Break", dates: "December 19, 2025 - January 4, 2026" },
        { name: "Amazigh New Year", dates: "January 12, 2026" },
        { name: "Spring Break", dates: "March 27, 2026 - April 4, 2026" },
        { name: "Eid al-Fitr*", dates: "April 2026 (TBD)" },
        { name: "Labour Day", dates: "May 1, 2026" },
        { name: "Eid al-Adha*", dates: "June 2026 (TBD)" },
        { name: "*Islamic holidays are subject to lunar calendar confirmation", dates: "" },
      ],
    },
    admissions: {
      process: [
        "Registration at local education authority",
        "Submission of required documents",
        "Placement based on residence zone",
        "Entrance assessment (for special programs only)",
        "Confirmation of enrollment",
      ],
      requirements: [
        "Birth Certificate",
        "Proof of Residence",
        "Primary School Certificate",
        "Academic Records from Previous School",
        "Health Record including Vaccinations",
        "Family Record Book",
        "Passport-sized Photographs",
      ],
      openDates: "Registration for 2025-2026 opens June 15, 2025",
      applicationFee: {
        amount: 0,
        currency: "DZD",
        refundable: false,
      },
    },
    gallery: [
      { id: 1, type: "exterior", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Campus", caption: "School Entrance" },
      { id: 2, type: "exterior", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Building", caption: "Main Building" },
      { id: 3, type: "interior", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Classroom", caption: "Modern Classroom" },
      { id: 4, type: "interior", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Lab", caption: "Science Laboratory" },
      { id: 5, type: "interior", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Library", caption: "School Library" },
      { id: 6, type: "facilities", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Sports", caption: "Sports Field" },
      { id: 7, type: "facilities", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Arts", caption: "Arts Studio" },
      { id: 8, type: "activities", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Science", caption: "Science Club" },
      { id: 9, type: "activities", url: "/placeholder.svg?height=400&width=600&text=El+Feth+Music", caption: "Music Performance" },
    ],
    location: {
      address: "456 Boulevard Houari Boumediene, Oran, 31000, Algeria",
      coordinates: {
        latitude: 35.6969,
        longitude: -0.6331,
      },
      landmarks: "Near Oran Public Library, 15 minutes from city center",
    },
    academics: {
      curriculum: {
        description: "Following the Algerian National Curriculum with enhanced focus on arts and sciences",
        subjects: [
          "Arabic Language and Literature",
          "Islamic Education",
          "History and Geography",
          "Civic Education",
          "Mathematics",
          "Natural Sciences",
          "Physics",
          "French Language",
          "English Language",
          "Art Education",
          "Music Education",
          "Physical Education",
          "Computer Science",
        ],
      },
      classSize: {
        average: 25,
        maximum: 30,
      },
      assessmentMethods: [
        "Continuous assessment",
        "Quarterly examinations",
        "Project-based evaluation",
        "National standardized testing",
      ],
      specialPrograms: [
        {
          name: "Arts Excellence Track",
          description: "Enhanced curriculum for students with artistic talents, including additional hours of arts education and participation in cultural events.",
          eligibility: "Selection based on aptitude test and primary school recommendations",
        },
        {
          name: "Scientific Research Initiative",
          description: "Special program focusing on scientific inquiry and research methodology, with opportunities to participate in regional science competitions.",
          eligibility: "Selection based on academic performance in science subjects",
        },
        {
          name: "Sports Development Program",
          description: "Specialized training for athletically gifted students, with adjusted schedules to accommodate training and competitions.",
          eligibility: "Selection based on physical aptitude tests and previous sports achievements",
        },
      ],
    },
  }

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
    galleryFilter === "all" ? school.gallery : school.gallery.filter((item) => item.type === galleryFilter)

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

  // Function to handle navigation back to find resources page
  const handleBackToFindResources = () => {
    if (navigateTo) {
      navigateTo("find-resources", "schools")
    }
  }

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
          src="/placeholder.svg?height=400&width=1200&text=Collège+El+Feth"
          alt="Collège El Feth Campus"
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

      {/* Tuition Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Public Education - No Tuition</h3>
                <p className="text-gray-500 mt-1">
                  Collège El Feth is a public middle school with free education for all students
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.fees.additionalFees.length > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      Some additional fees may apply
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-green-600 hover:bg-green-700">Registration Info</Button>
                {school.fees.additionalFees.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-green-600">
                      View additional fees
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Additional Fees</DialogTitle>
                      <DialogDescription>
                        While tuition is free, the following additional fees may apply:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {school.fees.additionalFees.map((fee, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{fee.name}</p>
                            <p className="text-sm text-gray-500">{fee.optional ? 'Optional' : 'Required'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{fee.amount.toLocaleString()} {fee.currency}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button className="bg-green-600 hover:bg-green-700">Contact for Details</Button>
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
              <TabsTrigger value="admissions">Enrollment</TabsTrigger>
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
                    <h4 className="font-medium text-gray-500">Accreditations</h4>
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
                    <Languages className="h-5 w-5 mr-2 text-green-600" />
                    Languages & Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Languages of Instruction</h4>
                      {school.languages.map((language, index) => (
                        <p key={index} className="text-gray-600">{language}</p>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Curriculum Offered</h4>
                      <ul className="space-y-1">
                        {school.curriculum.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Accessibility className="h-5 w-5 mr-2 text-green-600" />
                    Learning Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {school.specialNeeds.available ? (
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{school.specialNeeds.inclusionPolicy}</p>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Support Services</h4>
                        <ul className="space-y-1">
                          {school.specialNeeds.services.map((service, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-1 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Accommodations Offered</h4>
                        <ul className="space-y-1">
                          {school.specialNeeds.accommodations.map((accommodation, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-1 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{accommodation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Information about learning support services is not available.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Meet Our Faculty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    Our Campus & Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Collège El Feth provides a well-maintained campus with facilities designed to support both academic and extracurricular activities.
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

              {school.transportation.available && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bus className="h-5 w-5 mr-2 text-green-600" />
                      Transportation Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      We offer free transportation services for students in the following areas:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.transportation.areas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Transportation Details</h4>
                      <p className="text-gray-600">Transportation is provided free of charge as part of our public education services. Bus schedules are distributed at the beginning of each academic year.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Extracurricular Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    We offer a wide range of extracurricular activities to enrich our students' educational experience:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {school.extracurricular.map((activity, index) => (
                      <li key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                        <span className="text-gray-600">{activity}</span>
                      </li>
                    ))}
                  </ul>
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
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("exterior")} className={galleryFilter === "exterior" ? "bg-slate-100" : ""}>Campus</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("interior")} className={galleryFilter === "interior" ? "bg-slate-100" : ""}>Classrooms</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("facilities")} className={galleryFilter === "facilities" ? "bg-slate-100" : ""}>Facilities</Button>
                      <Button variant="outline" size="sm" onClick={() => setGalleryFilter("activities")} className={galleryFilter === "activities" ? "bg-slate-100" : ""}>Activities</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredGallery.length === 0 ? (
                    <p className="text-center text-gray-500">No images available for this filter.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredGallery.map((item) => (
                        <div key={item.id} className="group relative">
                          <Image
                            src={item.url}
                            alt={item.caption}
                            width={400}
                            height={300}
                            className="rounded-lg object-cover aspect-video group-hover:opacity-80 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                            <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center">{item.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Academic Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{school.academics.curriculum.description}</p>
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">Subjects Offered</h4>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {school.academics.curriculum.subjects.map((subject, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Special Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {school.academics.specialPrograms.map((program, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-semibold text-lg text-gray-800">{program.name}</h4>
                        <p className="text-gray-600 mt-1 mb-2">{program.description}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            Eligibility: {program.eligibility}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    Class Environment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-700">Average Class Size</h4>
                      <p className="text-2xl font-bold text-green-600">{school.academics.classSize.average}</p>
                      <p className="text-sm text-gray-500">students per class</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-700">Maximum Class Size</h4>
                      <p className="text-2xl font-bold text-green-600">{school.academics.classSize.maximum}</p>
                      <p className="text-sm text-gray-500">students per class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Assessment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {school.academics.assessmentMethods.map((method, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                    Enrollment Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">To enroll at Collège El Feth, please follow these steps:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {school.admissions.process.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                  <p className="mt-4 text-sm text-gray-800 font-semibold">{school.admissions.openDates}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {school.admissions.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      As a public school, there is no application fee for enrollment at Collège El Feth.
                    </p>
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
              <p className="text-gray-700">{school.location.address}</p>
              <p className="text-sm text-gray-500 mt-1">{school.location.landmarks}</p>
              <div className="mt-4 h-48 w-full rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image src="/placeholder.svg?height=200&width=350&text=Map+of+El+Feth" alt={`Map showing location of ${school.name}`} width={350} height={200} className="object-cover"/>
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
              <p><span className="font-medium text-gray-600">Student Body:</span> {school.students.total} students</p>
              <p><span className="font-medium text-gray-600">Faculty:</span> {school.staff.teachers} teachers</p>
              <p><span className="font-medium text-gray-600">School Type:</span> Public Middle School</p>
              <p><span className="font-medium text-gray-600">Languages of Instruction:</span> Arabic, French, English</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {school.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="h-4 w-4 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600 text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {compareList.length > 0 && (
        <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compare Schools</DialogTitle>
              <DialogDescription>
                You have {compareList.length} school(s) in your compare list.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowCompareDialog(false)}>Close</Button>
              <Button variant="default">Go to Compare</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
