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

interface SchoolProfilePageProps {
  userType?: "parent" | "teacher" | "admin" | "school"
}

export default function SchoolProfilePage({ userType = "parent" }: SchoolProfilePageProps) {
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

  // Mock data
  const school = {
    id: "eidas123",
    name: "Ecole Internationale Dina - EIDAS",
    logo: "/placeholder.svg?height=80&width=80",
    verified: true,
    locationDisplayText: "Riyadh district Al Malaz",
    type: "International School",
    demographics: "Boys and Girls",
    rating: 4,
    visits: 27400,
    dataCompleteness: 88.6,
    digitalPresence: 59,
    fees: {
      min: 25000,
      max: 45000,
      currency: "DZD",
      installments: true,
      discount: 1.5,
      installmentDetails: [
        { name: "First Term", percentage: 40, dueDate: "August 15, 2023" },
        { name: "Second Term", percentage: 30, dueDate: "December 1, 2023" },
        { name: "Third Term", percentage: 30, dueDate: "March 1, 2024" },
      ],
    },
    license: {
      number: "EDU-INT-2345-RYD",
      issuedBy: "Ministry of Education",
      issuedDate: "2010-05-15",
      expiryDate: "2025-05-14",
      status: "Active",
      accreditations: ["International Baccalaureate (IB)", "Cambridge Assessment International Education"],
    },
    contact: {
      phone: "+966 11 234 5678",
      email: "info@eidas.edu.sa",
      website: "www.eidas.edu.sa",
      socialMedia: {
        facebook: "facebook.com/eidas",
        twitter: "twitter.com/eidas",
        instagram: "instagram.com/eidas",
      },
    },
    about:
      "Ecole Internationale Dina (EIDAS) is a prestigious international school in Riyadh offering world-class education with a blend of international curriculum and local values. Established in 2010, we have been nurturing global citizens with strong academic foundations and cultural awareness.",
    curriculum: [
      "International Baccalaureate (IB)",
      "Cambridge IGCSE",
      "Saudi National Curriculum (Arabic & Islamic Studies)",
    ],
    languages: ["English (Primary)", "Arabic", "French"],
    facilities: [
      { name: "Classrooms", count: 45, details: "Smart classrooms with interactive whiteboards", icon: School },
      {
        name: "Science Labs",
        count: 5,
        details: "Fully equipped physics, chemistry, and biology labs",
        icon: BookOpen,
      },
      {
        name: "Computer Labs",
        count: 3,
        details: "Modern computer labs with latest hardware and software",
        icon: Laptop,
      },
      {
        name: "Library",
        count: 1,
        details: "Extensive collection of books, digital resources, and study areas",
        icon: BookOpen,
      },
      {
        name: "Sports Facilities",
        details: "Indoor gymnasium, swimming pool, football field, basketball courts",
        icon: Dumbbell,
      },
      { name: "Cafeteria", details: "Spacious cafeteria serving nutritious meals", icon: Utensils },
      { name: "Auditorium", details: "300-seat auditorium for performances and events", icon: Users },
      { name: "Art Studio", details: "Dedicated space for visual arts with materials and equipment", icon: Palette },
      { name: "Music Room", details: "Soundproof room with various musical instruments", icon: Music },
      { name: "Playground", details: "Age-appropriate playground equipment for younger students", icon: Users },
    ],
    specialNeeds: {
      available: true,
      services: [
        "Resource rooms for individualized support",
        "Certified special education teachers",
        "Individualized Education Programs (IEPs)",
        "Speech and language therapy",
        "Occupational therapy",
        "Behavioral support",
        "Accessible facilities and classrooms",
        "Assistive technology resources",
      ],
      accommodations: [
        "Modified curriculum",
        "Extended time for assignments and tests",
        "Note-taking assistance",
        "Preferential seating",
        "Sensory-friendly spaces",
      ],
      inclusionPolicy:
        "We believe in inclusive education where all students learn together in the same environment regardless of abilities. Our approach focuses on identifying and removing barriers to learning while providing appropriate support and accommodations.",
    },
    transportation: {
      available: true,
      areas: ["Al Malaz", "Al Olaya", "Hittin", "Al Nakheel", "Al Yasmin", "Diplomatic Quarter"],
      fees: {
        oneWay: 3500,
        roundTrip: 6000,
        currency: "DZD",
      },
    },
    extracurricular: [
      "Robotics Club",
      "Debate Team",
      "Sports Teams (Football, Basketball, Swimming)",
      "Drama Club",
      "Model United Nations",
      "Coding Club",
      "Environmental Club",
      "Chess Club",
      "Community Service",
      "Student Council",
    ],
    achievements: [
      "Regional Science Fair Champions 2022",
      "National Debate Competition Finalists 2023",
      "International Math Olympiad - 3 Gold Medals in 2022",
      "Regional Football Tournament Winners 2021",
      "Best School Award by Education Excellence Committee 2022",
    ],
    staff: {
      teachers: 85,
      administrators: 15,
      support: 30,
      teacherQualifications: {
        doctorate: 5,
        masters: 35,
        bachelors: 45,
      },
      teacherNationalities: [
        "Saudi",
        "British",
        "American",
        "Canadian",
        "Australian",
        "Egyptian",
        "Lebanese",
        "Indian",
      ],
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          position: "Head of Science Department",
          subject: "Physics",
          experience: 15,
          certification: {
            number: "TC-2345-SA",
            issuedBy: "Ministry of Education",
            issuedDate: "2018-06-10",
            expiryDate: "2028-06-09",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.9,
        },
        {
          id: 2,
          name: "Prof. Ahmed Al-Farsi",
          position: "Arabic Language Coordinator",
          subject: "Arabic Literature",
          experience: 12,
          certification: {
            number: "TC-7891-SA",
            issuedBy: "Ministry of Education",
            issuedDate: "2019-08-15",
            expiryDate: "2029-08-14",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.8,
        },
        {
          id: 3,
          name: "Ms. Emily Parker",
          position: "IB Coordinator",
          subject: "Mathematics",
          experience: 10,
          certification: {
            number: "TC-4567-SA",
            issuedBy: "Ministry of Education",
            issuedDate: "2020-01-20",
            expiryDate: "2030-01-19",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.7,
        },
      ],
    },
    students: {
      total: 950,
      byGrade: {
        kindergarten: 120,
        elementary: 380,
        middle: 250,
        high: 200,
      },
      nationalitiesCount: 28,
    },
    calendar: {
      academicYear: "September 2023 - June 2024",
      terms: [
        { name: "Term 1", start: "September 3, 2023", end: "December 14, 2023" },
        { name: "Term 2", start: "January 7, 2024", end: "March 28, 2024" },
        { name: "Term 3", start: "April 7, 2024", end: "June 20, 2024" },
      ],
      holidays: [
        { name: "Saudi National Day", dates: "September 23, 2023" },
        { name: "Winter Break", dates: "December 15, 2023 - January 6, 2024" },
        { name: "Spring Break", dates: "March 29, 2024 - April 6, 2024" },
        { name: "Eid Al-Fitr", dates: "April 10-14, 2024 (tentative)" },
        { name: "Eid Al-Adha", dates: "June 16-20, 2024 (tentative)" },
      ],
    },
    admissions: {
      process: [
        "Online Application Submission",
        "Application Review",
        "Entrance Assessment",
        "Parent Interview",
        "Decision Notification",
        "Registration and Fee Payment",
      ],
      requirements: [
        "Completed Application Form",
        "Previous Academic Records (2 years)",
        "Recommendation Letter from Current School",
        "Copy of Student's Passport/ID",
        "Copy of Parents' Passport/ID",
        "Recent Passport-sized Photographs",
        "Immunization Records",
      ],
      openDates: "Applications for 2024-2025 academic year open on November 1, 2023",
      applicationFee: {
        amount: 500,
        currency: "DZD",
        refundable: false,
      },
      entranceExam: {
        subjects: ["English", "Mathematics", "Science"],
        format: "Written and Oral Assessment",
        duration: "2 hours",
        preparationGuide: "Available upon application submission",
      },
    },
    gallery: [
      { id: 1, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "School Main Entrance" },
      { id: 2, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "School Building" },
      { id: 3, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Modern Classroom" },
      { id: 4, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Science Laboratory" },
      { id: 5, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Library" },
      { id: 6, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Computer Lab" },
      { id: 7, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Swimming Pool" },
      { id: 8, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Football Field" },
      { id: 9, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Cafeteria" },
      { id: 10, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Science Fair" },
      { id: 11, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Sports Day" },
      { id: 12, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Graduation Ceremony" },
    ],
    location: {
      address: "2347 Al Malaz District, Riyadh 12836, Saudi Arabia",
      coordinates: {
        latitude: 24.6841,
        longitude: 46.7216,
      },
      landmarks: "Near King Abdullah Park, 2km from Al Malaz Metro Station",
    },
    academics: {
      curriculum: {
        primary: "International Baccalaureate Primary Years Programme (PYP)",
        middle: "International Baccalaureate Middle Years Programme (MYP)",
        high: "International Baccalaureate Diploma Programme (IBDP) and Cambridge IGCSE",
      },
      subjects: [
        "Mathematics",
        "Sciences (Physics, Chemistry, Biology)",
        "Languages (English, Arabic, French)",
        "Humanities (History, Geography)",
        "Arts (Visual Arts, Music, Drama)",
        "Physical Education",
        "Information Technology",
        "Islamic Studies",
        "Social Studies",
      ],
      classSize: {
        average: 20,
        maximum: 25,
      },
      assessmentMethods: [
        "Continuous assessment",
        "Project-based learning",
        "Standardized tests",
        "Portfolio assessment",
        "Oral presentations",
      ],
      graduationRequirements: [
        "Completion of all required courses",
        "Minimum GPA of 2.0",
        "Community service hours (40 hours minimum)",
        "Successful completion of senior project",
      ],
      universityAcceptance: {
        rate: "92%",
        destinations: ["United States", "United Kingdom", "Canada", "Australia", "Saudi Arabia", "UAE", "Europe"],
        notableAlumni: [
          "Harvard University",
          "MIT",
          "Stanford University",
          "Oxford University",
          "Cambridge University",
          "King Saud University",
          "American University of Beirut",
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
            src={teacher.image || "/placeholder.svg"}
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
      <CardFooter className="bg-blue-50 p-3 border-t">
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">Teacher Certification</span>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              <Check className="h-3 w-3 mr-1" /> Verified
            </Badge>
          </div>
          <div className="text-xs text-gray-600">
            <p>License: {teacher.certification.number}</p>
            <p>Issued: {new Date(teacher.certification.issuedDate).toLocaleDateString()}</p>
            <p>Expires: {new Date(teacher.certification.expiryDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image 
          src="/placeholder.svg?height=400&width=1200" 
          alt="School background" 
          className="object-cover" 
          fill 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* School Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src={school.logo || "/placeholder.svg"}
              alt={school.name}
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
                <h1 className="text-2xl font-bold">{school.name}</h1>
                {school.verified && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
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
                  <span className="ml-1 text-sm font-medium">
                    {school.rating}/5
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
                <p className="text-sm text-gray-500">Visits Last Month</p>
                <p className="text-2xl font-bold">{school.visits.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">School Data Completeness</p>
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
                <p className="text-sm text-gray-500">Digital Presence Index</p>
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

      {/* Booking Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Tuition Fees</h3>
                <p className="text-gray-500 mt-1">
                  {school.fees.min.toLocaleString()} - {school.fees.max.toLocaleString()} {school.fees.currency}/year
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.fees.installments && (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Installment fees available
                    </Badge>
                  )}
                  {school.fees.discount > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                      discount {school.fees.discount}%
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-blue-600">
                      View installment details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Installment Payment Details</DialogTitle>
                      <DialogDescription>
                        The school offers the following installment plan for tuition fees.
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
                            <p className="font-medium">{installment.percentage}%</p>
                            <p className="text-sm text-gray-500">
                              {Math.round((school.fees.min * installment.percentage) / 100).toLocaleString()} -{" "}
                              {Math.round((school.fees.max * installment.percentage) / 100).toLocaleString()}{" "}
                              {school.fees.currency}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    About {school.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{school.about}</p>
                </CardContent>
              </Card>

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
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

              {/* Special Needs Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Accessibility className="h-5 w-5 mr-2 text-blue-600" />
                    Special Needs Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {school.specialNeeds.available ? (
                    <div className="space-y-4">
                      <p className="text-gray-700">{school.specialNeeds.inclusionPolicy}</p>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Services Provided</h4>
                        <ul className="space-y-1">
                          {school.specialNeeds.services.map((service, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Accommodations</h4>
                        <ul className="space-y-1">
                          {school.specialNeeds.accommodations.map((accommodation, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{accommodation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Special needs support services are not available at this school.</p>
                  )}
                </CardContent>
              </Card>

              {/* Featured Teachers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Featured Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {school.staff.featuredTeachers.map((teacher) => (
                      <TeacherCertificationCard key={teacher.id} teacher={teacher} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                        Curriculum
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {school.curriculum.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Globe className="h-4 w-4 mr-2 text-blue-600" />
                        Languages of Instruction
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {school.languages.map((language, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{language}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                        Student Body
                      </h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Students:</span>
                          <span className="font-medium">{school.students.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kindergarten:</span>
                          <span>{school.students.byGrade.kindergarten}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Elementary:</span>
                          <span>{school.students.byGrade.elementary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Middle School:</span>
                          <span>{school.students.byGrade.middle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">High School:</span>
                          <span>{school.students.byGrade.high}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nationalities:</span>
                          <span>{school.students.nationalitiesCount}+ countries</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                        Staff
                      </h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Teachers:</span>
                          <span>{school.staff.teachers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Administrators:</span>
                          <span>{school.staff.administrators}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Support Staff:</span>
                          <span>{school.staff.support}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Teacher Qualifications:</span>
                          <span></span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-gray-600">- Doctorate:</span>
                          <span>{school.staff.teacherQualifications.doctorate}</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-gray-600">- Master's:</span>
                          <span>{school.staff.teacherQualifications.masters}</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-gray-600">- Bachelor's:</span>
                          <span>{school.staff.teacherQualifications.bachelors}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="h-5 w-5 mr-2 text-blue-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <Map className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-700">{school.location.address}</p>
                  <p className="text-sm text-gray-500">{school.location.landmarks}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    School Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school.facilities.map((facility, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          {facility.icon && (
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                              <facility.icon className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">
                              {facility.name} {facility.count && `(${facility.count})`}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{facility.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bus className="h-5 w-5 mr-2 text-blue-600" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {school.transportation.available ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Service Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {school.transportation.areas.map((area, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Transportation Fees</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h5 className="text-sm font-medium">One Way</h5>
                            <p className="text-lg font-bold mt-1">
                              {school.transportation.fees.oneWay.toLocaleString()} {school.transportation.fees.currency}
                              <span className="text-sm font-normal text-gray-500">/year</span>
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="text-sm font-medium">Round Trip</h5>
                            <p className="text-lg font-bold mt-1">
                              {school.transportation.fees.roundTrip.toLocaleString()}{" "}
                              {school.transportation.fees.currency}
                              <span className="text-sm font-normal text-gray-500">/year</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Transportation service is not available at this school.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                      School Gallery
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-none ${galleryView === "grid" ? "bg-blue-50 text-blue-600" : ""}`}
                          onClick={() => setGalleryView("grid")}
                        >
                          Grid
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-none ${galleryView === "slideshow" ? "bg-blue-50 text-blue-600" : ""}`}
                          onClick={() => setGalleryView("slideshow")}
                        >
                          Slideshow
                        </Button>
                      </div>
                      <select
                        className="border rounded-md px-2 py-1 text-sm"
                        value={galleryFilter}
                        onChange={(e) => setGalleryFilter(e.target.value)}
                      >
                        <option value="all">All Photos</option>
                        <option value="exterior">Exterior</option>
                        <option value="interior">Interior</option>
                        <option value="facilities">Facilities</option>
                        <option value="activities">Activities</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {galleryView === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredGallery.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-lg border">
                          <div className="relative h-48">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                              <ImageIcon className="h-10 w-10 text-gray-400" />
                            </div>
                          </div>
                          <div className="p-2">
                            <p className="text-sm text-gray-600">{item.caption}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {item.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                          <p>{filteredGallery[currentSlide]?.caption}</p>
                          <Badge variant="outline" className="mt-1 text-xs bg-white/20 text-white">
                            {filteredGallery[currentSlide]?.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white/80"
                        onClick={prevSlide}
                      >
                        &lt;
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white/80"
                        onClick={nextSlide}
                      >
                        &gt;
                      </Button>
                      <div className="mt-2 text-center text-sm text-gray-500">
                        {currentSlide + 1} of {filteredGallery.length}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Primary Years</h4>
                      <p className="text-gray-600">{school.academics.curriculum.primary}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Middle Years</h4>
                      <p className="text-gray-600">{school.academics.curriculum.middle}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">High School</h4>
                      <p className="text-gray-600">{school.academics.curriculum.high}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Subjects Offered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {school.academics.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Class Size & Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Class Size</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average:</span>
                          <span>{school.academics.classSize.average} students</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maximum:</span>
                          <span>{school.academics.classSize.maximum} students</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Assessment Methods</h4>
                      <ul className="space-y-1">
                        {school.academics.assessmentMethods.map((method, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{method}</span>
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
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Graduation & University Acceptance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Graduation Requirements</h4>
                      <ul className="space-y-1">
                        {school.academics.graduationRequirements.map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">University Acceptance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Acceptance Rate:</span>
                          <span className="font-medium">{school.academics.universityAcceptance.rate}</span>
                        </div>
                        <h5 className="text-sm font-medium text-gray-600 mt-2">Top Destinations</h5>
                        <div className="flex flex-wrap gap-1">
                          {school.academics.universityAcceptance.destinations.map((destination, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {destination}
                            </Badge>
                          ))}
                        </div>
                        <h5 className="text-sm font-medium text-gray-600 mt-2">Notable Alumni Destinations</h5>
                        <div className="flex flex-wrap gap-1">
                          {school.academics.universityAcceptance.notableAlumni.map((university, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              {university}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admissions" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Admissions Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Application Timeline</h4>
                      <p className="text-gray-600">{school.admissions.openDates}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Process Steps</h4>
                      <ol className="space-y-3">
                        {school.admissions.process.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                              {index + 1}
                            </div>
                            <span className="text-gray-600 pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Required Documents</h4>
                      <ul className="space-y-1">
                        {school.admissions.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{requirement}</span>
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
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Entrance Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Assessment Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subjects:</span>
                          <span>{school.admissions.entranceExam.subjects.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span>{school.admissions.entranceExam.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{school.admissions.entranceExam.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preparation Guide:</span>
                          <span>{school.admissions.entranceExam.preparationGuide}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Application Fee</h4>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">
                            {school.admissions.applicationFee.amount} {school.admissions.applicationFee.currency}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Refundable:</span>
                          <span>{school.admissions.applicationFee.refundable ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full">Apply Now</Button>
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
                  <p className="text-gray-600">{school.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Email</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Website</h4>
                  <p className="text-gray-600">{school.contact.website}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-600">{school.location.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{school.location.landmarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Academic Year</h4>
                <p className="text-gray-600">{school.calendar.academicYear}</p>
              </div>
              <div>
                <h4 className="font-medium">Terms</h4>
                <div className="space-y-2 mt-2">
                  {school.calendar.terms.map((term, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{term.name}:</span> {term.start} to {term.end}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transportation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transportation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {school.transportation.available ? (
                <>
                  <div>
                    <h4 className="font-medium">Service Areas</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {school.transportation.areas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Fees</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">One Way:</span>
                        <span>
                          {school.transportation.fees.oneWay.toLocaleString()} {school.transportation.fees.currency}
                          /year
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Round Trip:</span>
                        <span>
                          {school.transportation.fees.roundTrip.toLocaleString()} {school.transportation.fees.currency}
                          /year
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Transportation service is not available.</p>
              )}
            </CardContent>
          </Card>

          {/* Compare Schools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compare Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Add schools to your comparison list to evaluate and find the best fit for your needs.
              </p>
              <Button
                variant={isInCompareList ? "destructive" : "default"}
                className="w-full"
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
              {compareList.length > 0 && (
                <div className="mt-3">
                  <Button variant="outline" className="w-full">
                    Compare {compareList.length} Schools
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
