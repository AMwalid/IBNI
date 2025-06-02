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

interface SchoolProfileLittleCoderProps {
  userType?: "parent" | "teacher" | "admin" | "school"
  navigateTo?: (page: string, tab?: string | null) => void
  showBackButton?: boolean
}

export default function SchoolProfileLittleCoder({ userType = "parent", navigateTo, showBackButton = true }: SchoolProfileLittleCoderProps) {
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
        rate: "85%",
        destinations: [
          "Computer Science Programs",
          "Software Engineering",
          "Web Development Bootcamps",
          "Tech Startups",
          "IT Departments",
        ],
      },
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
    admissions: {
      process: [
        "Complete online application form",
        "Schedule an assessment session",
        "Attend a parent-student orientation",
        "Submit required documents",
        "Complete enrollment and payment",
      ],
      requirements: [
        "Age between 8-18 years",
        "Basic computer literacy",
        "Interest in technology and programming",
        "Parent/guardian consent",
        "Commitment to program duration",
      ],
      openDates: "Enrollment is open year-round with new cohorts starting every 3 months",
      applicationFee: {
        amount: 5000,
        currency: "DZD",
      },
    },
    gallery: [
      { id: 1, type: "interior", url: "/images/profiles/schoole/coding-lab-1.png", caption: "Modern Coding Lab" },
      { id: 2, type: "interior", url: "/images/profiles/schoole/robotics-space.png", caption: "Robotics & Maker Space" },
      { id: 3, type: "interior", url: "/images/profiles/schoole/collab-zone.png", caption: "Collaboration Zone" },
      { id: 4, type: "activities", url: "/images/profiles/schoole/coding-workshop.png", caption: "Coding Workshop" },
      { id: 5, type: "activities", url: "/images/profiles/schoole/robotics-class.png", caption: "Robotics Class" },
      { id: 6, type: "activities", url: "/images/profiles/schoole/game-dev.png", caption: "Game Development Session" },
    ],
    location: {
      address: "123 Tech Street, Tlemcen, Algeria",
      landmarks: "Near City Center, 5 minutes from Main Square",
    },
  }

  const handleBackToFindResources = () => {
    if (navigateTo) {
      navigateTo("find-resources", "schools")
    }
  }

  const handleAddToCompare = () => {
    if (!compareList.includes(school.id)) {
      setCompareList([...compareList, school.id])
    }
  }

  const handleRemoveFromCompare = () => {
    setCompareList(compareList.filter(id => id !== school.id))
  }

  const isInCompareList = compareList.includes(school.id)

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-start space-x-4">
          <div className="relative h-24 w-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={school.logo}
              alt={`${school.name} logo`}
              className="object-cover"
              fill
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{school.name}</h1>
              {school.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mt-1">{school.type}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{school.locationDisplayText}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{school.demographics}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Following
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-1" />
                Follow
              </>
            )}
          </Button>
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"}
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
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Our Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {school.curriculum.map((program, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span className="text-gray-700">{program}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-green-600" />
                    Our Facilities
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
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {school.gallery
                      .filter(item => galleryFilter === "all" || item.type === galleryFilter)
                      .map((item) => (
                        <div key={item.id} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={item.url}
                            alt={item.caption}
                            className="object-cover"
                            fill
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <p className="text-white text-sm">{item.caption}</p>
                          </div>
                        </div>
                      ))}
                  </div>
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
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Program Completion & Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-md mb-1 text-gray-700">Completion Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-3">
                    {school.academics.graduationRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-md mb-1 text-gray-700">Pathways after Little Coder Academy:</h4>
                  <p className="text-gray-600 text-sm mb-1">
                    {school.academics.universityAcceptance.rate} of our alumni pursue further tech education or enter tech-related roles.
                  </p>
                  <p className="text-gray-600 text-sm font-medium">Common Pathways:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    {school.academics.universityAcceptance.destinations.map((dest, i) => (
                      <li key={i}>{dest}</li>
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
                  <p className="text-gray-700 mb-2">Join Little Coder Academy by following these steps:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {school.admissions.process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-4 text-sm text-gray-800 font-semibold">{school.admissions.openDates}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Enrollment Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {school.admissions.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Application Fee: {school.admissions.applicationFee.amount.toLocaleString()} {school.admissions.applicationFee.currency} (non-refundable).
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
                <Image
                  src="/placeholder.svg?height=200&width=350"
                  alt={`Map showing location of ${school.name}`}
                  width={350}
                  height={200}
                  className="object-cover"
                />
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MapPin className="h-4 w-4 mr-2" /> Get Directions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <a href={`tel:${school.contact.phone}`} className="text-gray-700 hover:text-green-600">
                  {school.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <a href={`mailto:${school.contact.email}`} className="text-gray-700 hover:text-green-600">
                  {school.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-2" />
                <a
                  href={`https://${school.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-600"
                >
                  {school.contact.website}
                </a>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500 mb-1">Follow us:</p>
                <div className="flex space-x-3">
                  {school.contact.socialMedia.facebook && (
                    <a
                      href={`https://${school.contact.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      Facebook
                    </a>
                  )}
                  {school.contact.socialMedia.twitter && (
                    <a
                      href={`https://${school.contact.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-sky-500"
                    >
                      Twitter
                    </a>
                  )}
                  {school.contact.socialMedia.instagram && (
                    <a
                      href={`https://${school.contact.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-pink-600"
                    >
                      Instagram
                    </a>
                  )}
                  {school.contact.socialMedia.linkedin && (
                    <a
                      href={`https://${school.contact.socialMedia.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
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
              <p>
                <span className="font-medium text-gray-600">Main Programs:</span>{" "}
                Junior Coders, Teen Innovators, Future Tech Leaders
              </p>
              <p>
                <span className="font-medium text-gray-600">Student Capacity:</span> Approx.{" "}
                120 students
              </p>
              <p>
                <span className="font-medium text-gray-600">Languages of Instruction:</span> English,
                French, Arabic
              </p>
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