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

interface SchoolProfileAnnabaProps {
  userType?: "parent" | "teacher" | "admin" | "school"
  navigateTo?: (page: string, tab?: string | null) => void
}

export default function SchoolProfileAnnaba({ userType = "parent", navigateTo }: SchoolProfileAnnabaProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [galleryView, setGalleryView] = useState<"grid" | "slideshow">("grid")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")

  const isAdmin = userType === "admin"
  const isSchoolAdmin = userType === "school"
  const canEdit = isAdmin || isSchoolAdmin

  // Mock data for Académie Numérique d'Annaba
  const school = {
    id: "ana-001",
    name: "Académie Numérique d'Annaba",
    logo: "/images/logo-placeholder.png",
    verified: true,
    locationDisplayText: "ANNABA, ALGERIA",
    type: "Digital Technology Academy",
    demographics: "Secondary & Higher Education (Ages 15-22)",
    rating: 4.6,
    visits: 19800,
    dataCompleteness: 91.5,
    digitalPresence: 95,
    fees: {
      min: 35000,
      max: 65000,
      currency: "DZD",
      installments: true,
      discount: 8,
      installmentDetails: [
        { name: "Registration Fee", percentage: 20, dueDate: "Upon Acceptance" },
        { name: "First Semester", percentage: 40, dueDate: "September 1, 2025" },
        { name: "Second Semester", percentage: 40, dueDate: "February 1, 2026" },
      ],
    },
    license: {
      number: "TECH-EDU-ANB-456-2022",
      issuedBy: "Ministry of Higher Education & Ministry of Digital Economy",
      issuedDate: "2022-05-20",
      expiryDate: "2027-05-19",
      status: "Active",
      accreditations: ["National Digital Skills Authority", "International Association of Digital Educators"],
    },
    contact: {
      phone: "+213 (0)38 XX XX XX",
      email: "contact@academie-numerique-annaba.dz",
      website: "www.academie-numerique-annaba.dz",
      socialMedia: {
        facebook: "facebook.com/AcademieNumeriqueAnnaba",
        twitter: "twitter.com/AcadNumAnnaba",
        instagram: "instagram.com/academie_numerique_annaba",
        linkedin: "linkedin.com/company/academie-numerique-annaba"
      },
    },
    about:
      "Académie Numérique d'Annaba is a pioneering digital technology academy in eastern Algeria, dedicated to preparing students for careers in the digital economy. Founded in 2022 with support from major tech companies and the Ministry of Digital Economy, we offer specialized programs in software development, cybersecurity, data science, digital marketing, and emerging technologies. Our project-based curriculum combines theoretical knowledge with practical skills, ensuring graduates are ready for immediate employment or entrepreneurship in the tech sector.",
    curriculum: [
      "Software Engineering & Development",
      "Cybersecurity & Network Administration",
      "Data Science & Artificial Intelligence",
      "Digital Marketing & E-Commerce",
      "UI/UX Design & Digital Media",
      "Blockchain & Emerging Technologies"
    ],
    languages: ["Arabic", "French", "English"],
    facilities: [
      { name: "Smart Classrooms", count: 15, details: "Fully digitized learning spaces with interactive technology", icon: School },
      { name: "Computer Labs", count: 8, details: "High-performance computing facilities with specialized software", icon: Laptop },
      { name: "Innovation Hub", count: 1, details: "Collaborative space for tech projects and startups", icon: Terminal },
      { name: "Digital Library", count: 1, details: "Comprehensive digital resources and physical technical books", icon: BookOpen },
      { name: "Maker Space", count: 1, details: "3D printers, robotics kits, and hardware prototyping tools", icon: Code },
      { name: "Cafeteria", details: "Modern cafeteria with healthy food options", icon: Utensils },
      { name: "Relaxation Areas", details: "Comfortable spaces for breaks and informal discussions", icon: Users },
      { name: "Auditorium", count: 1, details: "200-seat auditorium for tech talks and events", icon: Users },
    ],
    staff: {
      total: 75,
      teachingStaff: 45,
      administrativeStaff: 20,
      supportStaff: 10,
      teacherStudentRatio: "1:15",
      qualifications: {
        doctorate: "35%",
        masters: "55%",
        bachelors: "10%",
      },
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Nabil Kaddour",
          position: "Director & AI Program Lead",
          subject: "Artificial Intelligence",
          experience: 15,
          certification: {
            number: "TECH-AI-789",
            issuedBy: "International AI Association",
            issuedDate: "2020-03-15",
            expiryDate: "2025-03-14",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.9,
        },
        {
          id: 2,
          name: "Mme. Leila Bouaziz",
          position: "Head of Software Engineering",
          subject: "Software Development",
          experience: 12,
          certification: {
            number: "SE-CERT-456",
            issuedBy: "IEEE Computer Society",
            issuedDate: "2021-06-10",
            expiryDate: "2026-06-09",
          },
          image: "/placeholder.svg?height=100&width=100",
          rating: 4.7,
        },
      ],
    },
    students: {
      total: 650,
      byGrade: {
        "Digital Baccalaureate Program": 150,
        "Software Engineering": 120,
        "Cybersecurity": 100,
        "Data Science & AI": 110,
        "Digital Marketing": 90,
        "UI/UX Design": 80,
      },
      nationalitiesCount: 8,
    },
    calendar: {
      academicYear: "September 2025 - July 2026",
      terms: [
        { name: "Fall Semester", start: "September 1, 2025", end: "January 31, 2026" },
        { name: "Spring Semester", start: "February 15, 2026", end: "July 15, 2026" },
      ],
      holidays: [
        { name: "Winter Break", start: "December 20, 2025", end: "January 5, 2026" },
        { name: "Spring Break", start: "April 1, 2026", end: "April 15, 2026" },
      ],
      events: [
        { name: "Digital Innovation Week", date: "October 15-22, 2025" },
        { name: "Hackathon Challenge", date: "November 25-27, 2025" },
        { name: "Industry Partners Day", date: "March 15, 2026" },
        { name: "Tech Startup Exhibition", date: "May 20, 2026" },
        { name: "Graduation & Project Showcase", date: "July 20, 2026" },
      ],
    },
    academics: {
      curriculum: {
        secondary: "Digital Baccalaureate Program (Ages 15-18)",
        higher: "Specialized Technology Programs (Ages 18-22)",
      },
      subjects: [
        "Programming (Python, Java, JavaScript, C++)",
        "Web Development (Frontend & Backend)",
        "Mobile App Development",
        "Database Systems",
        "Network Security",
        "Ethical Hacking",
        "Data Analysis & Visualization",
        "Machine Learning & AI",
        "Cloud Computing",
        "DevOps & Agile Methodologies",
        "Digital Marketing & Analytics",
        "User Experience Design",
        "Project Management",
        "Tech Entrepreneurship",
      ],
      classSize: {
        average: 25,
        maximum: 30,
      },
      assessmentMethods: [
        "Project-based assessments",
        "Technical portfolios",
        "Coding challenges",
        "Industry-sponsored projects",
        "Internship evaluations",
        "Written examinations",
        "Oral presentations",
      ],
      specialPrograms: [
        "Tech Startup Incubator",
        "Industry Internship Program",
        "International Tech Exchange",
        "Women in Tech Initiative",
        "Open Source Contribution Program",
        "Digital Innovation Lab",
      ],
      achievements: [
        "National Coding Competition Champions (2023, 2024)",
        "Regional Hackathon Winners (2024)",
        "5 Student Startups Funded (2023-2024)",
        "90% Graduate Employment Rate",
        "Partnership with 25+ Tech Companies",
      ],
    },
    admissions: {
      process: [
        "Submit online application with academic records",
        "Complete digital aptitude assessment",
        "Participate in problem-solving challenge",
        "Attend interview (in-person or virtual)",
        "Receive admission decision within 2 weeks",
        "Complete registration and fee payment",
      ],
      requirements: [
        "Secondary education certificate or equivalent",
        "Strong background in mathematics and logic",
        "Basic computer literacy",
        "Completed application form",
        "Personal statement of interest",
        "Two recommendation letters",
        "Portfolio of digital projects (if available)",
      ],
      openDates: "Applications for 2025-2026 academic year open from January 15, 2025 to May 31, 2025",
      contactPerson: "M. Youcef Berrahma, Admissions Coordinator",
    },
    gallery: [
      {
        id: "g1",
        title: "Campus Building",
        category: "campus",
        image: "/placeholder.svg?height=400&width=600&text=Campus",
      },
      {
        id: "g2",
        title: "Computer Lab",
        category: "facilities",
        image: "/placeholder.svg?height=400&width=600&text=Computer+Lab",
      },
      {
        id: "g3",
        title: "Innovation Hub",
        category: "facilities",
        image: "/placeholder.svg?height=400&width=600&text=Innovation+Hub",
      },
      {
        id: "g4",
        title: "Student Projects",
        category: "academic",
        image: "/placeholder.svg?height=400&width=600&text=Student+Projects",
      },
      {
        id: "g5",
        title: "Hackathon",
        category: "events",
        image: "/placeholder.svg?height=400&width=600&text=Hackathon",
      },
      {
        id: "g6",
        title: "Graduation Day",
        category: "events",
        image: "/placeholder.svg?height=400&width=600&text=Graduation",
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
          src="/images/hero-digital.png"
          alt="Académie Numérique d'Annaba - Digital Innovation"
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
                <p className="text-sm text-gray-500">Digital Presence</p>
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
                <h3 className="text-xl font-bold">Program Fees</h3>
                <p className="text-gray-500 mt-1">
                  {school.fees.min.toLocaleString()} - {school.fees.max.toLocaleString()} {school.fees.currency} per program
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
                        The academy offers the following payment plans for its programs.
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
                    Meet Our Faculty
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
                    {school.name} provides cutting-edge facilities designed to support digital technology education and innovation.
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
                      Academy Gallery
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
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">Secondary Education</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.secondary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-gray-800">Higher Education</h4>
                    <p className="text-gray-600 text-sm">{school.academics.curriculum.higher}</p>
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
                <CardHeader><CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2 text-green-600" />Achievements</CardTitle></CardHeader>
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
              <p className="text-gray-700">Annaba, Algeria</p>
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
              <p><span className="font-medium text-gray-600">Languages of Instruction:</span> {school.languages.join(', ')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
