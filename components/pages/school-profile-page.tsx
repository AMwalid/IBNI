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
  Cpu,
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
  navigateTo?: (page: string, tab?: string | null) => void
  showBackButton?: boolean
}

export default function SchoolProfilePage({ userType = "parent", navigateTo, showBackButton = false }: SchoolProfilePageProps) {
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

  // Mock data for Little Coder Academy
  const school = {
    id: "lca-tlm-001",
    name: "Little Coder Academy",
    logo: "/images/profiles/schoole/logo-little-coder.png",
    verified: true,
    locationDisplayText: "TLEMCEN, ALGERIA",
    type: "Coding & Tech Academy",
    demographics: "Kids & Teens (Ages 8-18)",
    rating: 4.8,
    visits: 15200,
    dataCompleteness: 92.5,
    digitalPresence: 75,
    fees: {
      min: 15000,
      max: 35000,
      currency: "DZD",
      installments: true,
      discount: 5,
      installmentDetails: [
        { name: "Module 1 Payment", percentage: 50, dueDate: "September 1, 2025" },
        { name: "Module 2 Payment", percentage: 50, dueDate: "November 1, 2025" },
      ],
    },
    license: {
      number: "TECH-EDU-TLM-789-2024",
      issuedBy: "Ministry of Post and Information & Communication Technologies (MPTIC)",
      issuedDate: "2024-01-10",
      expiryDate: "2029-01-09",
      status: "Active",
      accreditations: ["Certified Tech Training Partner", "Junior Developer Program Endorsed"],
    },
    contact: {
      phone: "+213 (0)43 XX XX XX",
      email: "learn@littlecode.dz",
      website: "www.littlecode.dz",
      socialMedia: {
        facebook: "facebook.com/littlecodeacademy.dz",
        twitter: "twitter.com/littlecodedz",
        instagram: "instagram.com/littlecode.dz",
        linkedin: "linkedin.com/company/little-code-academy-dz"
      },
    },
    about:
      "Little Coder Academy, based in the heart of Tlemcen, is dedicated to empowering the next generation of innovators with essential coding and technology skills. We offer a dynamic and engaging learning environment where students aged 8-18 can explore programming, web development, robotics, and more. Our mission is to make tech education accessible, fun, and impactful.",
    curriculum: [
      "Foundations of Programming (Scratch, Python)",
      "Web Development (HTML, CSS, JavaScript)",
      "Mobile App Development (Beginner)",
      "Robotics & IoT Fundamentals",
      "Game Design Basics",
    ],
    languages: ["Instruction in: Arabic, French, English", "Programming languages: Python, JavaScript, C++, Java (basics)"],
    facilities: [
      { name: "Coding Labs", count: 4, details: "Equipped with modern PCs, high-speed internet, and development software", icon: Laptop },
      { name: "Robotics & Maker Space", count: 1, details: "Dedicated area with Arduino, Raspberry Pi kits, 3D printer, and tools", icon: Cpu },
      { name: "Collaboration Zones", count: 2, details: "Flexible spaces for group projects and brainstorming", icon: Users },
      { name: "Small Project Rooms", count: 3, details: "Quiet rooms for focused work and pair programming", icon: Terminal },
      { name: "Resource Library (Digital & Physical)", count: 1, details: "Access to online coding platforms, books, and tutorials", icon: BookOpen },
      { name: "Cafeteria/Break Area", details: "Comfortable area for snacks and refreshments", icon: Utensils },
      { name: "Presentation Room", details: "Small auditorium for workshops and student presentations", icon: Users },
    ],
    specialNeeds: {
      available: true,
      services: [
        "Individualized learning paths",
        "Assistive software and tools where applicable",
        "Quiet zones for focused learning",
        "Mentorship for students needing extra guidance",
      ],
      accommodations: [
        "Flexible project deadlines (with prior arrangement)",
        "Visual aids and alternative explanation methods",
        "Pair programming support",
      ],
      inclusionPolicy:
        "Little Coder Academy is committed to fostering an inclusive learning environment. We strive to accommodate diverse learning styles and needs, ensuring every student has the opportunity to succeed in their tech journey. We work with parents to understand individual requirements.",
    },
    transportation: {
      available: false,
      areas: [],
      fees: {
        oneWay: 0,
        roundTrip: 0,
        currency: "DZD",
      },
    },
    extracurricular: [
      "Weekly Coding Club",
      "Robotics Competition Team",
      "Hackathon Participation",
      "Guest Speaker Workshops (Tech Industry Professionals)",
      "Student Project Showcase",
      "Cybersecurity Awareness Club (New!)"
    ],
    achievements: [
      "1st Place - Tlemcen Junior Hackathon 2024",
      "Top 5 - National Robotics Challenge (Youth Category) 2025",
      "Successfully launched 10+ student-developed web projects",
      "Featured in 'Tech Kids Algeria' Magazine",
    ],
    staff: {
      teachers: 10,
      administrators: 2,
      support: 3,
      teacherQualifications: {
        doctorate: 1,
        masters: 4,
        bachelors: 5,
        industryCertified: 8,
      },
      teacherNationalities: [
        "Algerian",
        "International (Online Guest Lecturers)",
      ],
      featuredTeachers: [
        {
          id: 1,
          name: "Dr. Amina Kazi",
          position: "Lead Instructor & Curriculum Developer",
          subject: "Python, AI Fundamentals",
          experience: 8,
          certification: {
            number: "PTP-ALG-00123",
            issuedBy: "Python Institute / Tech Certification Board",
            issuedDate: "2020-07-15",
            expiryDate: "2026-07-14",
          },
          image: "/placeholder.svg?height=100&width=100", // Reverted to original placeholder
          rating: 4.9,
        },
        {
          id: 2,
          name: "Mr. Bilal Mansouri",
          position: "Web Development Instructor",
          subject: "HTML, CSS, JavaScript, React",
          experience: 6,
          certification: {
            number: "WDC-ALG-00456",
            issuedBy: "WebDev Certification Authority",
            issuedDate: "2021-02-20",
            expiryDate: "2027-02-19",
          },
          image: "/placeholder.svg?height=100&width=100", // Reverted to original placeholder
          rating: 4.7,
        },
        {
          id: 3,
          name: "Ms. Sarah Chen",
          position: "Robotics & Game Design Lead",
          subject: "Robotics, Scratch, Unity Basics",
          experience: 5,
          certification: {
            number: "RGC-INT-00789",
            issuedBy: "International Youth Robotics Association",
            issuedDate: "2022-01-10",
            expiryDate: "2028-01-09",
          },
          image: "/placeholder.svg?height=100&width=100", // Reverted to original placeholder
          rating: 4.8,
        },
      ],
    },
    students: {
      total: 120,
      byGrade: {
        "Junior Coders": 45,
        "Teen Innovators": 50,
        "Future Tech Leaders": 25,
      },
      demographics: {
        ageRange: "8-18",
        genderRatio: "60% Male, 40% Female",
        international: "5%",
      },
    },
    calendar: {
      academicYear: "2024-2025",
      terms: [
        {
          name: "Fall Term",
          startDate: "September 1, 2024",
          endDate: "December 15, 2024",
        },
        {
          name: "Spring Term",
          startDate: "January 15, 2025",
          endDate: "May 1, 2025",
        },
        {
          name: "Summer Term",
          startDate: "June 1, 2025",
          endDate: "August 15, 2025",
        },
      ],
    },
    admissions: {
      process: [
        "Online Interest Form Submission",
        "Attend an Info Session (Optional)",
        "Basic Aptitude Assessment (Logic & Problem Solving)",
        "Short Interview with Student & Parent (if applicable)",
        "Enrollment & Fee Payment",
      ],
      requirements: [
        "Completed Online Application",
        "Age 8-18 (for core programs)",
        "Interest in technology and coding",
        "Basic computer literacy (for most courses)",
        "Copy of Birth Certificate/ID",
      ],
      openDates: "Enrollment for Fall 2025 opens May 15, 2025",
      applicationFee: {
        amount: 2000,
        currency: "DZD",
        refundable: false,
      },
      entranceExam: {
        subjects: ["Logical Reasoning", "Problem Solving", "Basic Computer Knowledge (age-appropriate)"],
        format: "Online Quiz & Short Practical Task",
        duration: "1 - 1.5 hours",
        preparationGuide: "Sample questions available on our website after inquiry.",
      },
    },
    gallery: [ // Reverted to original placeholder paths
      { id: 1, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "Academy Main Entrance" },
      { id: 2, type: "exterior", url: "/placeholder.svg?height=400&width=600", caption: "Academy Building View" },
      { id: 3, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Modern Coding Lab" },
      { id: 4, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Robotics & Maker Space" },
      { id: 5, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Collaboration Zone" },
      { id: 6, type: "interior", url: "/placeholder.svg?height=400&width=600", caption: "Another View of a Coding Lab" },
      { id: 7, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Resource Library Access Point" },
      { id: 8, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Presentation Room for Workshops" },
      { id: 9, type: "facilities", url: "/placeholder.svg?height=400&width=600", caption: "Student Break Area" },
      { id: 10, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Students Engaged in a Coding Workshop" },
      { id: 11, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Hackathon Team at Work" },
      { id: 12, type: "activities", url: "/placeholder.svg?height=400&width=600", caption: "Student Project Showcase Event" },
    ],
    location: {
      address: "15 Rue Kazi Aoual, Imama, Tlemcen, 13000, Algeria",
      coordinates: {
        latitude: 34.8782,
        longitude: -1.3158,
      },
      landmarks: "Near Tlemcen Grand Mosque, opposite the City Library.",
    },
    academics: {
      curriculum: {
        primary: "Junior Coders Program (Ages 8-11): Scratch, Block-based programming, Intro to Python",
        middle: "Teen Innovators Program (Ages 12-15): Python, Web Fundamentals (HTML, CSS, JS), Intro to App Dev",
        high: "Future Tech Leaders Program (Ages 15-18): Advanced Web Dev (React/Vue), Mobile App Dev, Intro to Data Science/AI, Capstone Projects",
      },
      subjects: [
        "Python Programming",
        "JavaScript & Web Technologies",
        "HTML5 & CSS3",
        "Robotics with Arduino/Raspberry Pi",
        "Game Development with Unity/Scratch",
        "App Development Fundamentals",
        "Data Structures & Algorithms (Introductory)",
        "UI/UX Design Principles",
        "Cybersecurity Basics",
        "Version Control with Git",
        "Problem Solving & Computational Thinking",
      ],
      classSize: {
        average: 10,
        maximum: 15,
      },
      assessmentMethods: [
        "Project-based assignments",
        "Live coding challenges",
        "Quizzes and practical tests",
        "Portfolio development",
        "Peer code reviews (guided)",
        "Capstone project presentation",
      ],
      graduationRequirements: [
        "Completion of all course modules in a program",
        "Successful completion of a capstone project",
        "Development of a personal portfolio showcasing skills",
        "Active participation and collaboration",
      ],
      universityAcceptance: {
        rate: "85% transition to advanced tech studies or internships",
        destinations: ["Higher Tech Institutes in Algeria", "Online Degree Programs (CS, SE)", "Tech Internships", "Freelance Projects", "Starting Own Tech Ventures"],
        notableAlumni: [
          "Ahmed B. - Developed a popular local community app",
          "Fatima Z. - Intern at 'Algerian Tech Solutions'",
          "Youssef M. - Top Performer in National Coding Olympiad",
          "Leila K. - Contributor to Open Source Project 'EduBot'",
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
            src={teacher.image || "/placeholder.svg?height=80&width=80"} // Using a sized placeholder here if teacher.image is null
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
            <span className="text-xs font-medium text-gray-500">Tech Certification</span>
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
          src="/images/profiles/schoole/hero-coding-kids.png"
          alt="Little Coder Academy - Inspiring Young Coders"
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
                  <span className="ml-1 text-sm font-medium">
                    {school.rating}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Heart className={`h-4 w-4 ${isFollowing ? "fill-red-500 text-red-500" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsLiked(!isLiked)}
              >
                <MessageSquare className={`h-4 w-4 ${isLiked ? "fill-blue-500 text-blue-500" : ""}`} />
                Contact
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleAddToCompare()}
              >
                <Share2 className="h-4 w-4" />
                Compare
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

      {/* Booking Card - Adapted for Course Enrollment */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Course Fees</h3>
                <p className="text-gray-500 mt-1">
                  {school.fees.min.toLocaleString()} - {school.fees.max.toLocaleString()} {school.fees.currency} per program/module
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {school.fees.installments && (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Installment options available
                    </Badge>
                  )}
                  {school.fees.discount > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                      {school.fees.discount}% Early Bird Discount
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-green-600 hover:bg-green-700">Enroll Now</Button>
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
                      <Button className="bg-green-600 hover:bg-green-700">Start Enrollment</Button>
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
                    <p className="text-gray-600">Standard learning support is integrated into all our programs. For specific needs, please contact us.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Meet Our Instructors
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
                            Our Learning Spaces & Resources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-6">
                            Little Coder Academy provides a stimulating and well-equipped environment designed to foster creativity, collaboration, and focused learning in technology.
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
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2 text-green-600" />
                        Clubs & Activities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-4">
                        Beyond our core curriculum, we offer a range of activities to further ignite passion and build community:
                        </p>
                        <ul className="space-y-2">
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
                      Academy Gallery
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setGalleryFilter("all")} className={galleryFilter === "all" ? "bg-slate-100" : ""}>All</Button>
                        <Button variant="outline" size="sm" onClick={() => setGalleryFilter("interior")} className={galleryFilter === "interior" ? "bg-slate-100" : ""}>Labs</Button>
                        <Button variant="outline" size="sm" onClick={() => setGalleryFilter("activities")} className={galleryFilter === "activities" ? "bg-slate-100" : ""}>Activities</Button>
                        <Button variant="outline" size="sm" onClick={() => setGalleryFilter("facilities")} className={galleryFilter === "facilities" ? "bg-slate-100" : ""}>Spaces</Button>
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
                                src={item.url} // Uses placeholder URLs from school.gallery
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
                    Our Coding Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-1 text-gray-800">Junior Coders Program (Ages 8-11)</h4>
                        <p className="text-gray-600 text-sm">{school.academics.curriculum.primary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1 text-gray-800">Teen Innovators Program (Ages 12-15)</h4>
                        <p className="text-gray-600 text-sm">{school.academics.curriculum.middle}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1 text-gray-800">Future Tech Leaders Program (Ages 15-18)</h4>
                        <p className="text-gray-600 text-sm">{school.academics.curriculum.high}</p>
                    </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Code className="h-5 w-5 mr-2 text-green-600" />Key Learning Areas</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="flex items-center"><Users className="h-5 w-5 mr-2 text-green-600" />Class Environment</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-gray-600">Average Class Size: {school.academics.classSize.average} students</p>
                    <p className="text-gray-600">Maximum Class Size: {school.academics.classSize.maximum} students</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><GraduationCap className="h-5 w-5 mr-2 text-green-600" />Program Completion & Outcomes</CardTitle></CardHeader>
                <CardContent>
                    <h4 className="font-semibold text-md mb-1 text-gray-700">Completion Requirements:</h4>
                     <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-3">
                        {school.academics.graduationRequirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                    <h4 className="font-semibold text-md mb-1 text-gray-700">Pathways after Little Coder Academy:</h4>
                    <p className="text-gray-600 text-sm mb-1">{school.academics.universityAcceptance.rate} of our alumni pursue further tech education or enter tech-related roles.</p>
                    <p className="text-gray-600 text-sm font-medium">Common Pathways:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                        {school.academics.universityAcceptance.destinations.map((dest, i) => <li key={i}>{dest}</li>)}
                    </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2 text-green-600" />Enrollment Process</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-gray-700 mb-2">Join Little Coder Academy by following these steps:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        {school.admissions.process.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                    <p className="mt-4 text-sm text-gray-800 font-semibold">{school.admissions.openDates}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2 text-green-600" />Enrollment Requirements</CardTitle></CardHeader>
                <CardContent>
                     <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {school.admissions.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                     <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-700">
                            Application Fee: {school.admissions.applicationFee.amount.toLocaleString()} {school.admissions.applicationFee.currency} (non-refundable).
                        </p>
                    </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Laptop className="h-5 w-5 mr-2 text-green-600" />Aptitude Assessment</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-gray-700 mb-1">Our assessment helps us understand your child's current skills and readiness.</p>
                    <p className="text-gray-600 text-sm"><span className="font-medium">Focus Areas:</span> {school.admissions.entranceExam.subjects.join(", ")}</p>
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
                <p><span className="font-medium text-gray-600">Main Programs:</span> {Object.keys(school.students.byGrade).slice(0,2).join(', ')}...</p>
                <p><span className="font-medium text-gray-600">Student Capacity:</span> Approx. {school.students.total} students</p>
                 <p><span className="font-medium text-gray-600">Languages of Instruction:</span> English, French, Arabic</p>
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
