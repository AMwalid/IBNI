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

interface SchoolProfileEIAProps {
  userType?: "parent" | "teacher" | "admin" | "school"
  navigateTo?: (page: string, tab?: string | null) => void
}

export default function SchoolProfileEIA({ userType = "parent", navigateTo }: SchoolProfileEIAProps) {
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

  // Mock data for École Internationale d'Alger
  const school = {
    id: "eia-alg-001",
    name: "École Internationale d'Alger",
    logo: "/placeholder.svg?height=144&width=144&text=EIA",
    verified: true,
    locationDisplayText: "ALGIERS, ALGERIA",
    type: "International School",
    demographics: "K-12 (Ages 5-18)",
    rating: 4.9,
    visits: 18500,
    dataCompleteness: 95.0,
    digitalPresence: 85,
    fees: {
      min: 350000,
      max: 550000,
      currency: "DZD",
      installments: true,
      discount: 10,
      installmentDetails: [
        { name: "First Semester Payment", percentage: 50, dueDate: "September 1, 2025" },
        { name: "Second Semester Payment", percentage: 50, dueDate: "January 15, 2026" },
      ],
    },
    license: {
      number: "INT-EDU-ALG-456-2023",
      issuedBy: "Ministry of National Education",
      issuedDate: "2023-06-15",
      expiryDate: "2028-06-14",
      status: "Active",
      accreditations: ["International Baccalaureate (IB) World School", "Cambridge International School", "French Ministry of Education Partner"],
    },
    contact: {
      phone: "+213 (0)21 XX XX XX",
      email: "contact@eia-algiers.dz",
      website: "www.eia-algiers.dz",
      socialMedia: {
        facebook: "facebook.com/EIAlgiers",
        twitter: "twitter.com/EIAlgiers",
        instagram: "instagram.com/ecole_internationale_alger",
        linkedin: "linkedin.com/company/ecole-internationale-alger"
      },
    },
    about:
      "École Internationale d'Alger is a premier international school in the heart of Algeria's capital, offering a trilingual education (Arabic, French, English) with globally recognized curricula. Our mission is to develop globally-minded citizens who excel academically while maintaining strong connections to Algerian culture and values. We provide a diverse, inclusive learning environment that prepares students for success in an interconnected world.",
    curriculum: [
      "International Baccalaureate (Primary Years, Middle Years, and Diploma Programs)",
      "Cambridge International Curriculum (Primary and Secondary)",
      "French National Curriculum (adapted)",
      "Algerian National Curriculum (core elements)",
    ],
    languages: ["Instruction in: Arabic, French, English", "Additional language options: Spanish, German"],
    facilities: [
      { name: "Modern Classrooms", count: 45, details: "Smart boards, multimedia equipment, and flexible seating arrangements", icon: School },
      { name: "Science Laboratories", count: 5, details: "Fully equipped physics, chemistry, and biology labs", icon: Laptop },
      { name: "Computer Labs", count: 3, details: "High-speed internet and latest software", icon: Laptop },
      { name: "Library & Media Center", count: 1, details: "Over 20,000 books in multiple languages and digital resources", icon: BookOpen },
      { name: "Sports Complex", details: "Indoor gymnasium, swimming pool, and outdoor fields", icon: Dumbbell },
      { name: "Arts Center", details: "Music rooms, art studios, and theater space", icon: Palette },
      { name: "Cafeteria", details: "Serving nutritious international and local cuisine", icon: Utensils },
      { name: "Outdoor Learning Spaces", details: "Gardens and outdoor classrooms", icon: Palette },
    ],
    specialNeeds: {
      available: true,
      services: [
        "Learning support specialists",
        "Individualized education plans",
        "Counseling services",
        "Speech and language therapy",
      ],
      accommodations: [
        "Modified curriculum when needed",
        "Extended time for assessments",
        "Assistive technology",
        "Small group instruction",
      ],
      inclusionPolicy:
        "École Internationale d'Alger is committed to inclusive education that supports diverse learning needs. We believe every child deserves access to quality education and work closely with families to accommodate a range of learning differences while maintaining high academic standards.",
    },
    transportation: {
      available: true,
      areas: ["Central Algiers", "Hydra", "Bab Ezzouar", "Dely Ibrahim", "Cheraga"],
      fees: {
        oneWay: 25000,
        roundTrip: 40000,
        currency: "DZD",
      },
    },
    extracurricular: [
      "Model United Nations",
      "Robotics Club",
      "Environmental Sustainability Initiative",
      "Sports Teams (Soccer, Basketball, Swimming, Tennis)",
      "Music Ensembles",
      "Drama and Theater Productions",
      "Community Service Programs",
      "Cultural Exchange Programs"
    ],
    achievements: [
      "Top IB Diploma Results in North Africa (2024)",
      "National Science Competition Winners (2023, 2024)",
      "Regional Debate Champions (2024)",
      "International Arts Festival Recognition",
      "Model UN Outstanding Delegation Award",
    ],
    staff: {
      teachers: 65,
      administrators: 12,
      support: 25,
      teacherQualifications: {
        doctorate: 8,
        masters: 42,
        bachelors: 15,
        industryCertified: 55,
      },
      teacherNationalities: [
        "Algerian",
        "French",
        "British",
        "American",
        "Canadian",
        "Lebanese",
        "Tunisian",
      ],
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Farida Benali",
          position: "IB Diploma Program Coordinator",
          subject: "Mathematics",
          experience: 15,
          certification: {
            number: "IB-DP-ALG-00234",
            issuedBy: "International Baccalaureate Organization",
            issuedDate: "2018-05-10",
            expiryDate: "2028-05-09",
          },
          image: "/placeholder.svg?height=100&width=100&text=FB",
          rating: 4.9,
        },
        {
          id: 2,
          name: "Mr. Jean-Pierre Dubois",
          position: "Head of Languages Department",
          subject: "French Literature",
          experience: 12,
          certification: {
            number: "FLE-ALG-00567",
            issuedBy: "French Ministry of Education",
            issuedDate: "2019-09-15",
            expiryDate: "2029-09-14",
          },
          image: "/placeholder.svg?height=100&width=100&text=JD",
          rating: 4.8,
        },
        {
          id: 3,
          name: "Ms. Sarah Williams",
          position: "Cambridge Program Coordinator",
          subject: "English Language and Literature",
          experience: 10,
          certification: {
            number: "CAM-INT-00789",
            issuedBy: "Cambridge Assessment International Education",
            issuedDate: "2020-06-20",
            expiryDate: "2025-06-19",
          },
          image: "/placeholder.svg?height=100&width=100&text=SW",
          rating: 4.7,
        },
      ],
    },
    students: {
      total: 850,
      byGrade: {
        "Primary (K-5)": 320,
        "Middle School (6-8)": 230,
        "High School (9-12)": 300,
      },
      nationalitiesCount: 15,
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
        "Online Application Submission",
        "Entrance Assessment (Grade-appropriate)",
        "Family Interview",
        "Previous School Records Review",
        "Placement Decision and Offer",
        "Registration and Fee Payment",
      ],
      requirements: [
        "Completed Application Form",
        "Birth Certificate/Passport Copy",
        "Previous School Reports (2 years)",
        "Recommendation Letter (for grades 6-12)",
        "Passport-sized Photographs",
        "Immunization Records",
      ],
      openDates: "Applications for 2025-2026 open November 1, 2024",
      applicationFee: {
        amount: 15000,
        currency: "DZD",
        refundable: false,
      },
      entranceExam: {
        subjects: ["Mathematics", "Language Proficiency (Arabic, French, English)", "Critical Thinking"],
        format: "Written and Oral Assessment",
        duration: "2-3 hours (age-dependent)",
        preparationGuide: "Sample materials provided after application submission",
      },
    },
    gallery: [
      { id: 1, type: "exterior", url: "/placeholder.svg?height=400&width=600&text=EIA+Campus", caption: "Main Campus Entrance" },
      { id: 2, type: "exterior", url: "/placeholder.svg?height=400&width=600&text=EIA+Building", caption: "Modern School Building" },
      { id: 3, type: "interior", url: "/placeholder.svg?height=400&width=600&text=EIA+Classroom", caption: "Interactive Classroom" },
      { id: 4, type: "interior", url: "/placeholder.svg?height=400&width=600&text=EIA+Lab", caption: "Science Laboratory" },
      { id: 5, type: "interior", url: "/placeholder.svg?height=400&width=600&text=EIA+Library", caption: "Multilingual Library" },
      { id: 6, type: "facilities", url: "/placeholder.svg?height=400&width=600&text=EIA+Sports", caption: "Sports Complex" },
      { id: 7, type: "facilities", url: "/placeholder.svg?height=400&width=600&text=EIA+Arts", caption: "Arts Center" },
      { id: 8, type: "activities", url: "/placeholder.svg?height=400&width=600&text=EIA+MUN", caption: "Model UN Conference" },
      { id: 9, type: "activities", url: "/placeholder.svg?height=400&width=600&text=EIA+Science", caption: "Science Fair Projects" },
    ],
    location: {
      address: "123 Boulevard Mohammed V, Algiers, 16000, Algeria",
      coordinates: {
        latitude: 36.7538,
        longitude: 3.0588,
      },
      landmarks: "Near Jardin d'Essai du Hamma, 10 minutes from downtown Algiers",
    },
    academics: {
      curriculum: {
        primary: "IB Primary Years Programme & Cambridge Primary",
        middle: "IB Middle Years Programme & Cambridge Lower Secondary",
        high: "IB Diploma Programme & Cambridge Upper Secondary/Advanced",
      },
      subjects: [
        "Arabic Language and Literature",
        "French Language and Literature",
        "English Language and Literature",
        "Mathematics",
        "Sciences (Physics, Chemistry, Biology)",
        "Humanities (History, Geography, Economics)",
        "Arts (Visual Arts, Music, Drama)",
        "Physical Education",
        "Information Technology",
        "Design Technology",
        "Islamic Studies (optional)",
        "Additional Languages (Spanish, German)",
      ],
      classSize: {
        average: 18,
        maximum: 24,
      },
      assessmentMethods: [
        "Continuous assessment",
        "Project-based learning",
        "Portfolio development",
        "Standardized testing",
        "External examinations (IB, Cambridge)",
        "Student-led conferences",
      ],
      graduationRequirements: [
        "Completion of IB Diploma or Cambridge A Levels",
        "Community service hours",
        "Extended essay/research project",
        "Minimum GPA requirements",
        "Attendance requirements",
      ],
      universityAcceptance: {
        rate: "95% acceptance to first or second choice universities",
        destinations: ["Universities in Algeria", "Universities in France", "UK Russell Group", "US Universities", "Canadian Universities", "Middle Eastern Universities"],
        notableAlumni: [
          "Dr. Yasmine Kader - Researcher at CERN",
          "Ahmed Benali - Tech Entrepreneur",
          "Leila Hadj - International Diplomat",
          "Karim Zidane - Award-winning Architect",
        ],
      },
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
      {/* Back Button */}
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

      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src="/placeholder.svg?height=400&width=1200&text=École+Internationale+d'Alger"
          alt="École Internationale d'Alger Campus"
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
                <h3 className="text-xl font-bold">Annual Tuition</h3>
                <p className="text-gray-500 mt-1">
                  {school.fees.min.toLocaleString()} - {school.fees.max.toLocaleString()} {school.fees.currency} per year
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.fees.installments && (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Payment plans available
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
                        The school offers the following payment plans for tuition.
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
                      <p className="text-gray-600">{school.languages[0]}</p>
                      {school.languages[1] && <p className="text-gray-600">{school.languages[1]}</p>}
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
                    École Internationale d'Alger provides a modern, well-equipped campus designed to support our international curriculum and diverse student body.
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
                      We offer reliable transportation services for students in the following areas:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.transportation.areas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Transportation Fees</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">One-Way Service</p>
                          <p className="font-medium">{school.transportation.fees.oneWay.toLocaleString()} {school.transportation.fees.currency}/year</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Round-Trip Service</p>
                          <p className="font-medium">{school.transportation.fees.roundTrip.toLocaleString()} {school.transportation.fees.currency}/year</p>
                        </div>
                      </div>
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
                    Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">Primary School (K-5)</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.primary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">Middle School (6-8)</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.middle}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">High School (9-12)</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.high}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Subjects Offered
                  </CardTitle>
                </CardHeader>
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
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    Class Environment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Average Class Size: {school.academics.classSize.average} students</p>
                  <p className="text-gray-600">Maximum Class Size: {school.academics.classSize.maximum} students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    University Preparation & Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-md mb-1 text-gray-700">Graduation Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-3">
                    {school.academics.graduationRequirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                  <h4 className="font-semibold text-md mb-1 text-gray-700">University Acceptance:</h4>
                  <p className="text-gray-600 text-sm mb-1">{school.academics.universityAcceptance.rate}</p>
                  <p className="text-gray-600 text-sm font-medium">Common University Destinations:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    {school.academics.universityAcceptance.destinations.map((dest, i) => <li key={i}>{dest}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                    Admissions Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Join École Internationale d'Alger by following these steps:</p>
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
                    Application Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {school.admissions.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Application Fee: {school.admissions.applicationFee.amount.toLocaleString()} {school.admissions.applicationFee.currency}
                      {!school.admissions.applicationFee.refundable && " (non-refundable)"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Entrance Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-1">Our assessment helps us understand your child's current skills and readiness.</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Subjects:</span> {school.admissions.entranceExam.subjects.join(", ")}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Format:</span> {school.admissions.entranceExam.format}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Duration:</span> {school.admissions.entranceExam.duration}</p>
                  <p className="text-gray-600 text-sm mt-2">{school.admissions.entranceExam.preparationGuide}</p>
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
                <Image src="/placeholder.svg?height=200&width=350&text=Map+of+EIA" alt={`Map showing location of ${school.name}`} width={350} height={200} className="object-cover"/>
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
              <p><span className="font-medium text-gray-600">Student Body:</span> {school.students.total} students</p>
              <p><span className="font-medium text-gray-600">Student Nationalities:</span> {school.students.nationalitiesCount}+ countries represented</p>
              <p><span className="font-medium text-gray-600">Faculty:</span> {school.staff.teachers} teachers from {school.staff.teacherNationalities.length} countries</p>
              <p><span className="font-medium text-gray-600">Languages of Instruction:</span> Arabic, French, English</p>
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
