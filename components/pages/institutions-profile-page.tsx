"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  MessageSquare,
  Star,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Clock,
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
  Heart,
  PlusCircle,
  Trash2,
  Info,
  FileText,
  Building,
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

interface InstitutionsProfilePageProps {
  navigateTo?: (page: string) => void
  userType?: "parent" | "student" | "teacher" | "institution"
}

// Review Component
const Review = ({ review }: { review: any }) => (
  <div className="border-b pb-4 last:border-b-0 last:pb-0">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <img
          src={review.avatar || "https://placehold.co/40x40/e0f2fe/0891b2?text=U"}
          alt={review.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{review.name}</span>
      </div>
      <div className="flex items-center text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} strokeWidth={1} />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm">{review.comment}</p>
    <p className="text-gray-400 text-xs mt-1">{review.date}</p>
  </div>
)

// Program Card Component
const ProgramCard = ({ program }: { program: any }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div className="h-32 overflow-hidden">
      <img
        src={program.imageUrl || "/placeholder.svg"}
        alt={program.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Program+Image"
        }}
      />
    </div>
    <CardContent className="p-4">
      <Badge variant="outline" className="mb-2">
        {program.category}
      </Badge>
      <h3 className="font-medium mb-1 line-clamp-2">{program.title}</h3>
      <div className="flex items-center text-amber-500 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < program.rating ? "fill-current" : "text-gray-300"}`}
            strokeWidth={1}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({program.reviewCount})</span>
      </div>
      <p className="text-xs text-gray-500 flex items-center">
        <Users className="w-3 h-3 mr-1" /> {program.students} students
      </p>
      <p className="text-sm font-medium text-green-600 mt-2">{program.price}</p>
    </CardContent>
    <CardFooter className="px-4 py-3 bg-gray-50 border-t">
      <Button variant="outline" size="sm" className="w-full">
        View Program
      </Button>
    </CardFooter>
  </Card>
)

// Class Schedule Component
const ClassSchedule = ({ schedule }: { schedule: any[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Day
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Time
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Program
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {schedule.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.day}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.program}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Add a ImageGallery component
const ImageGallery = ({ images }: { images: string[] }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View More Photos</Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>School Gallery</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`School image ${index + 1}`}
            className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </DialogContent>
  </Dialog>
)

// Add a CompareButton component
const CompareButton = ({
  school,
  isCompared,
  onToggleCompare,
}: { school: any; isCompared: boolean; onToggleCompare: () => void }) => {
  return (
    <Button
      variant={isCompared ? "destructive" : "outline"}
      className="flex items-center gap-2"
      onClick={onToggleCompare}
    >
      {isCompared ? (
        <>
          <Trash2 className="w-4 h-4" />
          Remove from Compare
        </>
      ) : (
        <>
          <Compare className="w-4 h-4" />
          Add to Compare
        </>
      )}
    </Button>
  )
}

// Add a ProgramGallery component
const ProgramGallery = ({ programs }: { programs: any[] }) => (
  <Carousel className="w-full">
    <CarouselContent>
      {programs.map((program, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <Card className="m-1 h-full flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img
                src={program.imageUrl || "/placeholder.svg"}
                alt={program.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/80">
                  {program.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex-grow">
              <h3 className="font-medium line-clamp-1">{program.title}</h3>
              <div className="flex items-center text-amber-500 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(program.rating) ? "fill-current" : "text-gray-300"}`}
                    strokeWidth={1}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">({program.reviewCount})</span>
              </div>
              <p className="text-xs text-gray-600 mb-1 line-clamp-2">{program.description}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {program.duration}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {program.students} students
                </span>
              </div>
              <p className="text-green-600 font-medium mt-2">{program.price}</p>
            </CardContent>
            <CardFooter className="p-3 bg-gray-50 border-t mt-auto">
              <Button variant="outline" size="sm" className="w-full">
                View Program
              </Button>
            </CardFooter>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="left-1" />
    <CarouselNext className="right-1" />
  </Carousel>
)

// Add a VerificationBadges component
const VerificationBadges = ({ verification }: { verification: any }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {verification.identityVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <ShieldCheck className="w-3 h-3" /> Identity Verified
      </Badge>
    )}
    {verification.backgroundChecked && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <Check className="w-3 h-3" /> Background Checked
      </Badge>
    )}
    {verification.qualificationsVerified && (
      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
        <BadgeCheck className="w-3 h-3" /> Qualifications Verified
      </Badge>
    )}
  </div>
)

// Add a ProgramDetailsModal component
const ProgramDetailsModal = ({ program }: { program: any }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        Program Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{program.title}</DialogTitle>
        <DialogDescription>
          {program.category} • {program.level}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <img
            src={program.imageUrl || "/placeholder.svg"}
            alt={program.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(program.rating) ? "fill-current" : "text-gray-300"}`}
                  strokeWidth={1}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">({program.reviewCount} reviews)</span>
            </div>
            <div className="text-green-600 font-semibold">{program.price}</div>
          </div>

          <p className="text-gray-700 mb-4">{program.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Program Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span>Level: {program.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Duration: {program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{program.students} students</span>
                </div>
              </div>
            </div>

            <Button className="w-full">Enroll Now</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Learning Objectives</h4>
            <ul className="space-y-1">
              {program.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Syllabus</h4>
            <ul className="space-y-2">
              {program.syllabus.map((topic: string, index: number) => (
                <li key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function InstitutionsProfilePage({ navigateTo, userType = "parent" }: InstitutionsProfilePageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("about")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareDialog, setShowCompareDialog] = useState(false)

  // Mock school data
  const school = {
    id: "school123",
    name: "Greenwood International Academy",
    type: "International School",
    rating: 4.8,
    reviewCount: 156,
    location: "123 Education Blvd, San Francisco, CA 94107",
    bio: "Greenwood International Academy is a premier educational institution dedicated to providing a world-class education that prepares students for global citizenship. Our curriculum combines rigorous academic standards with innovative teaching methods to foster critical thinking, creativity, and a lifelong love of learning. We emphasize holistic development, including academic excellence, character building, and extracurricular achievements.",
    img: "https://placehold.co/150x150/e0f2fe/0891b2?text=GIA",
    profilePictures: [
      "https://placehold.co/400x400/e0f2fe/0891b2?text=Greenwood+Academy",
      "https://placehold.co/400x400/f0fdfa/0d9488?text=Campus",
      "https://placehold.co/400x400/eff6ff/3b82f6?text=Facilities",
    ],
    contact: {
      email: "info@greenwoodacademy.edu",
      phone: "+1 (415) 555-1234",
      address: "123 Education Blvd, San Francisco, CA 94107",
      officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
      socialMedia: {
        facebook: "facebook.com/greenwoodacademy",
        twitter: "twitter.com/greenwoodacademy",
        instagram: "instagram.com/greenwoodacademy",
        linkedin: "linkedin.com/company/greenwoodacademy",
      },
    },
    foundedYear: 1995,
    studentCount: 1250,
    teacherCount: 85,
    classCount: 48,
    facilities: [
      "Modern Science Labs",
      "Digital Library",
      "Sports Complex",
      "Performing Arts Center",
      "Technology Hub",
      "Swimming Pool",
      "Cafeteria",
      "Health Center",
    ],
    programs: [
      {
        title: "International Baccalaureate (IB) Program",
        category: "Academic",
        rating: 4.9,
        reviewCount: 56,
        students: 342,
        price: "$12,500/year",
        imageUrl: "https://placehold.co/600x400/e0f2fe/0891b2?text=IB+Program",
        description:
          "Our IB program provides a challenging and comprehensive education that prepares students for success in higher education and life beyond. The curriculum encourages both personal and academic achievement.",
        level: "Advanced",
        duration: "2 years",
        objectives: [
          "Develop inquiring, knowledgeable and caring young people",
          "Create students who help to create a better world through intercultural understanding and respect",
          "Encourage students to become active, compassionate lifelong learners",
          "Promote international-mindedness and positive attitudes to learning",
        ],
        syllabus: [
          "Theory of Knowledge",
          "Extended Essay",
          "Creativity, Activity, Service",
          "Language and Literature",
          "Language Acquisition",
          "Individuals and Societies",
          "Sciences",
          "Mathematics",
          "The Arts",
        ],
      },
      {
        title: "STEM Excellence Program",
        category: "Specialized",
        rating: 4.8,
        reviewCount: 42,
        students: 215,
        price: "$10,800/year",
        imageUrl: "https://placehold.co/600x400/f0fdfa/0d9488?text=STEM",
        description:
          "Our STEM program focuses on developing strong foundations in Science, Technology, Engineering, and Mathematics through hands-on projects, competitions, and advanced coursework.",
        level: "Intermediate to Advanced",
        duration: "4 years",
        objectives: [
          "Build strong foundations in core STEM subjects",
          "Develop problem-solving and critical thinking skills",
          "Gain experience with real-world applications of STEM concepts",
          "Prepare for college-level STEM programs and careers",
        ],
        syllabus: [
          "Advanced Mathematics",
          "Physics and Chemistry",
          "Computer Science and Programming",
          "Engineering Design",
          "Robotics",
          "Data Science and Analytics",
          "Research Methods",
        ],
      },
      {
        title: "Arts & Humanities Track",
        category: "Specialized",
        rating: 4.7,
        reviewCount: 38,
        students: 180,
        price: "$9,500/year",
        imageUrl: "https://placehold.co/600x400/eff6ff/3b82f6?text=Arts",
        description:
          "Our Arts & Humanities program nurtures creativity and critical thinking through a rich curriculum in literature, history, philosophy, visual arts, music, and performing arts.",
        level: "All Levels",
        duration: "4 years",
        objectives: [
          "Develop creative expression and artistic skills",
          "Build critical analysis and interpretation abilities",
          "Understand historical and cultural contexts",
          "Foster appreciation for diverse artistic traditions",
        ],
        syllabus: [
          "World Literature",
          "Art History and Criticism",
          "Music Theory and Performance",
          "Drama and Theater Arts",
          "Philosophy and Ethics",
          "Creative Writing",
          "Visual Arts Studio",
        ],
      },
      {
        title: "Language Immersion Program",
        category: "Specialized",
        rating: 4.9,
        reviewCount: 45,
        students: 160,
        price: "$11,200/year",
        imageUrl: "https://placehold.co/600x400/fef2f2/ef4444?text=Languages",
        description:
          "Our Language Immersion Program offers students the opportunity to become fluent in a second language through immersive instruction where core subjects are taught in the target language.",
        level: "Beginner to Advanced",
        duration: "Ongoing",
        objectives: [
          "Achieve fluency in a second language",
          "Develop cross-cultural understanding and global perspective",
          "Build cognitive flexibility and problem-solving skills",
          "Prepare for international education and career opportunities",
        ],
        syllabus: [
          "Immersive Language Instruction",
          "Cultural Studies",
          "Literature in Target Language",
          "Conversational Practice",
          "Writing and Composition",
          "History and Social Studies in Target Language",
          "Exchange Programs and Cultural Experiences",
        ],
      },
    ],
    accreditations: [
      {
        name: "International Baccalaureate Organization (IBO)",
        issuer: "IBO",
        year: "2005",
        expirationDate: "2025",
        licenseNumber: "IB-12345",
      },
      {
        name: "Western Association of Schools and Colleges (WASC)",
        issuer: "WASC",
        year: "2008",
        expirationDate: "2026",
        licenseNumber: "WASC-67890",
      },
      {
        name: "Council of International Schools (CIS)",
        issuer: "CIS",
        year: "2010",
        expirationDate: "2028",
        licenseNumber: "CIS-54321",
      },
    ],
    publications: [
      {
        title: "Innovative Approaches to International Education",
        journal: "Journal of International Education",
        year: "2022",
        doi: "10.1234/jie.2022.0105",
      },
      {
        title: "Building Global Citizens Through Holistic Education",
        journal: "Educational Leadership Today",
        year: "2020",
        doi: "10.5678/elt.2020.1204",
      },
    ],
    reviews: [
      {
        name: "Jennifer P.",
        avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=JP",
        rating: 5,
        comment:
          "Greenwood Academy has been transformative for my children. The IB program is challenging but the teachers provide excellent support.",
        date: "March 15, 2025",
        program: "International Baccalaureate (IB) Program",
      },
      {
        name: "Robert L.",
        avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=RL",
        rating: 5,
        comment:
          "The STEM program at Greenwood is outstanding. My son has developed a real passion for robotics and computer science.",
        date: "February 28, 2025",
        program: "STEM Excellence Program",
      },
      {
        name: "Maria K.",
        avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=MK",
        rating: 4,
        comment:
          "Great school with excellent facilities. The only reason for 4 stars instead of 5 is that the extracurricular activities could be more diverse.",
        date: "January 10, 2025",
        program: "Arts & Humanities Track",
      },
      {
        name: "David M.",
        avatar: "https://placehold.co/40x40/fce7f3/db2777?text=DM",
        rating: 5,
        comment:
          "The language immersion program has exceeded our expectations. My daughter is now fluent in Mandarin after just two years.",
        date: "December 5, 2024",
        program: "Language Immersion Program",
      },
      {
        name: "Sarah W.",
        avatar: "https://placehold.co/40x40/fff7ed/f97316?text=SW",
        rating: 5,
        comment:
          "The teachers at Greenwood are exceptional. They truly care about each student's success and well-being.",
        date: "November 22, 2024",
        program: "International Baccalaureate (IB) Program",
      },
    ],
    schedule: [
      {
        day: "Monday",
        time: "8:00 AM - 3:30 PM",
        program: "Regular School Day",
        location: "Main Campus",
      },
      {
        day: "Tuesday",
        time: "8:00 AM - 3:30 PM",
        program: "Regular School Day",
        location: "Main Campus",
      },
      {
        day: "Wednesday",
        time: "8:00 AM - 2:30 PM",
        program: "Early Release Day",
        location: "Main Campus",
      },
      {
        day: "Thursday",
        time: "8:00 AM - 3:30 PM",
        program: "Regular School Day",
        location: "Main Campus",
      },
      {
        day: "Friday",
        time: "8:00 AM - 3:30 PM",
        program: "Regular School Day",
        location: "Main Campus",
      },
      {
        day: "Saturday",
        time: "9:00 AM - 12:00 PM",
        program: "Enrichment Programs",
        location: "Main Campus",
      },
    ],
    achievements: [
      {
        title: "National Blue Ribbon School",
        organization: "U.S. Department of Education",
        year: "2023",
        description: "Recognized for overall academic excellence",
      },
      {
        title: "STEM Excellence Award",
        organization: "National STEM Education Association",
        year: "2022",
        description: "Awarded for innovative STEM curriculum and student achievements",
      },
      {
        title: "International School of the Year",
        organization: "Global Education Council",
        year: "2021",
        description: "Recognized for outstanding international education programs",
      },
    ],
    educationalMaterials: [
      {
        title: "IB Program Guide",
        type: "PDF",
        description: "Comprehensive guide to our International Baccalaureate program",
        downloadable: true,
      },
      {
        title: "Virtual Campus Tour",
        type: "Video",
        description: "Take a virtual tour of our state-of-the-art campus facilities",
        downloadable: false,
      },
      {
        title: "Parent Handbook",
        type: "PDF",
        description: "Essential information for parents of Greenwood students",
        downloadable: true,
      },
    ],
    languages: [
      { language: "English", proficiency: "Primary" },
      { language: "Spanish", proficiency: "Immersion Program" },
      { language: "Mandarin", proficiency: "Immersion Program" },
      { language: "French", proficiency: "Elective" },
    ],
    admissions: {
      nextOpen: "October 1, 2025",
      applicationDeadline: "January 15, 2026",
      tuitionRange: "$9,500 - $12,500 per year",
      financialAid: "Available for qualifying families",
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "January 15, 2025",
    },
    visits: 24892,
    dataCompleteness: 98,
    digitalPresence: 85,
    license: {
      number: "EDU-SCH-4567-XYZ",
      issuedBy: "State Department of Education",
      issuedDate: "2000-05-15",
      expiryDate: "2030-05-14",
      status: "Active",
    },
  }

  // Determine if the user can access management features
  const canManage = userType === "institution"

  // Add this function to handle adding school to compare
  const handleAddToCompare = () => {
    if (!compareList.includes(school.id)) {
      setCompareList([...compareList, school.id])
    }
  }

  const handleRemoveFromCompare = () => {
    setCompareList(compareList.filter((id) => id !== school.id))
  }

  const isInCompareList = compareList.includes(school.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
        <Image src="/placeholder.svg?height=400&width=1200" alt="School background" className="object-cover" fill />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{school.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* School Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 -mt-24 ml-6 z-10 relative">
          <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
            <Image
              src={school.img || "/placeholder.svg"}
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
                {school.verificationStatus.qualificationsVerified && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <School className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{school.type}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(school.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {school.rating}/5 ({school.reviewCount} reviews)
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
                <p className="text-sm text-gray-500">Profile Visits</p>
                <p className="text-2xl font-bold">{school.visits.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
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
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <Progress value={school.digitalPresence} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Admissions Card */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-bold">Admissions Information</h3>
                <p className="text-gray-500 mt-1">
                  Tuition: {school.admissions.tuitionRange} | Financial Aid: {school.admissions.financialAid}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Next Open: {school.admissions.nextOpen}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Application Deadline: {school.admissions.applicationDeadline}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-green-600 hover:bg-green-700">Apply Now</Button>
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
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-green-600" />
                    About {school.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{school.bio}</p>
                </CardContent>
              </Card>

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    License & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="border rounded-lg overflow-hidden shadow-md">
                        <div className="bg-green-50 p-3 border-b">
                          <h3 className="text-center font-medium text-green-800">School License</h3>
                        </div>
                        <div className="p-4">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/card.jpg-sDPhRQJ0JJwcG7WRsCkaL5cFbr7pDg.jpeg"
                            alt="School License Card"
                            className="w-full h-auto rounded-md mb-3"
                          />
                          <div className="text-center mt-2">
                            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              Verified & Active
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
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
                        <div>
                          <h4 className="font-medium text-gray-500">Verification</h4>
                          <p className="text-sm text-gray-600">
                            Last verified on {new Date(school.verificationStatus.lastVerified).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-green-600" />
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Mail className="h-4 w-4 mr-2 text-green-600" />
                        Contact Information
                      </h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Email:</span>
                          <span>{school.contact.email}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Phone:</span>
                          <span>{school.contact.phone}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Address:</span>
                          <span>{school.contact.address}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Office Hours:</span>
                          <span>{school.contact.officeHours}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Building className="h-4 w-4 mr-2 text-green-600" />
                        School Information
                      </h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Founded:</span>
                          <span>{school.foundedYear}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Students:</span>
                          <span>{school.studentCount}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Teachers:</span>
                          <span>{school.teacherCount}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 w-24">Classes:</span>
                          <span>{school.classCount}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        Facilities
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {school.facilities.slice(0, 8).map((facility, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {facility}
                          </Badge>
                        ))}
                        {school.facilities.length > 8 && (
                          <Badge variant="outline" className="bg-gray-50">
                            +{school.facilities.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center text-gray-700">
                        <Globe className="h-4 w-4 mr-2 text-green-600" />
                        Languages
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {school.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {lang.language} ({lang.proficiency})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgramGallery programs={school.programs} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-green-600" />
                    Parent & Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-4xl font-bold text-green-600 mr-4">{school.rating}</div>
                        <div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(school.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{school.reviewCount} reviews</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {school.reviews.map((review, index) => (
                        <Review key={index} review={review} />
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
                    School Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ClassSchedule schedule={school.schedule} />
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button className="w-full">Download Full Schedule</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="credentials" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Accreditations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {school.accreditations.map((cert, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-gray-600">
                              {cert.issuer}, {cert.year}
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires: {cert.expirationDate}, License: {cert.licenseNumber}
                            </p>
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
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Publications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {school.publications.map((pub, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{pub.title}</p>
                            <p className="text-sm text-gray-600">
                              {pub.journal}, {pub.year}
                            </p>
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-500 hover:underline flex items-center gap-1"
                            >
                              View Publication <ExternalLink className="w-3 h-3" />
                            </a>
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
                    <ThumbsUp className="h-5 w-5 mr-2 text-green-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {school.achievements.map((achievement, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-gray-600">
                              {achievement.organization}, {achievement.year}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Library className="h-5 w-5 mr-2 text-green-600" />
                    Educational Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {school.educationalMaterials.map((material, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-4 pb-1">
                        <div className="flex items-start gap-2">
                          <Library className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-gray-600">{material.type}</p>
                            <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                            {material.downloadable && (
                              <Button variant="link" size="sm" className="pl-0">
                                Download <Download className="w-4 h-4 ml-1" />
                              </Button>
                            )}
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
                    <Globe className="h-5 w-5 mr-2 text-green-600" />
                    Virtual Tour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Button>Start Virtual Tour</Button>
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
                  <p className="text-gray-600">{school.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-600">{school.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <h4 className="font-medium">Office Hours</h4>
                  <p className="text-gray-600">{school.contact.officeHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Identity Verified</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Background Check</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Qualifications</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Verified</span>
                <span className="text-sm">{new Date(school.verificationStatus.lastVerified).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Admissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Open</span>
                <span className="font-medium">{school.admissions.nextOpen}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Application Deadline</span>
                <span>{school.admissions.applicationDeadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tuition Range</span>
                <span className="font-medium">{school.admissions.tuitionRange}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Financial Aid</span>
                <span>{school.admissions.financialAid}</span>
              </div>
              <Button className="w-full">Apply Now</Button>
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
