"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeacherProfileBenaliProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileBenali({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileBenaliProps) {
  // Map the existing mock data to TeacherData
  const teacher: TeacherData = {
    id: "teacher2",
    name: "Karim Benali",
    subject: "French Literature",
    rating: 4.7,
    reviewCount: 64,
    location: "Algiers, Algeria",
    bio: "Passionate French literature educator with 8 years of experience teaching at prestigious institutions in Algeria. I specialize in French classical and modern literature, with a focus on helping students develop strong analytical and writing skills. My teaching approach combines traditional literary analysis with contemporary cultural context.",
    img: "/placeholder.svg?height=144&width=144&text=KB",
    coverImage: "/placeholder.svg?height=400&width=1200&text=French+Literature+Education",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Karim+Benali",
      "/placeholder.svg?height=400&width=400&text=Teaching+Literature",
      "/placeholder.svg?height=400&width=400&text=Writing+Workshop",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "karim.benali@ecoledz.dz",
      office: "French Department, École Internationale d'Alger, Algiers",
      officeHours: "Monday-Wednesday: 13:00-15:00, Thursday: 10:00-12:00",
      socialMedia: {
        linkedin: "linkedin.com/in/karimbenali",
        twitter: "twitter.com/karimbenali_lit",
      },
    },
    education: [
      {
        degree: "M.A. in French Literature",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2015",
      },
      {
        degree: "B.A. in Modern Languages",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2013",
      },
      {
        degree: "Certificate in French Language Teaching",
        institution: "Alliance Française",
        location: "Paris, France",
        year: "2016",
      },
    ],
    certifications: [
      {
        name: "Advanced French Literature Teaching Certification",
        issuer: "Algerian Ministry of Education",
        year: "2018",
        id: "AFLT-2018-0567",
      },
      {
        name: "DALF C2 (Diplôme Approfondi de Langue Française)",
        issuer: "French Ministry of Education",
        year: "2014",
        id: "DALF-C2-2014-8901",
      },
    ],
    experience: [
      {
        position: "French Literature Teacher",
        institution: "École Internationale d'Alger",
        location: "Algiers, Algeria",
        period: "2018-Present",
        description:
          "Teaching French literature to secondary school students. Developing curriculum for the International Baccalaureate program. Organizing literary events and writing workshops.",
      },
      {
        position: "French Language Instructor",
        institution: "Alliance Française d'Alger",
        location: "Algiers, Algeria",
        period: "2015-2018",
        description:
          "Taught French language courses at various levels. Designed and implemented cultural programs to enhance language learning.",
      },
    ],
    publications: [
      {
        title: "Contemporary Algerian Literature in French: Identity and Cultural Hybridity",
        journal: "Revue des Études Francophones",
        year: "2021",
        doi: "10.xxxx/ref.2021.234567",
      },
      {
        title: "Teaching Francophone Literature in the Digital Age",
        journal: "Journal of Language Education",
        year: "2019",
        doi: "10.xxxx/jle.2019.345678",
      },
    ],
    awards: [
      {
        name: "Outstanding French Teacher Award",
        issuer: "Association of French Teachers in Algeria",
        year: "2020",
      },
      {
        name: "Cultural Exchange Ambassador",
        issuer: "Franco-Algerian Cultural Institute",
        year: "2019",
      },
    ],
    teachingPhilosophy: "I believe in creating an engaging and interactive learning environment where students can explore French literature through critical analysis and creative expression. My approach combines traditional literary study with modern teaching methods to make literature accessible and relevant to contemporary students.",
    courses: [
      {
        title: "Advanced French Literature",
        subject: "French Literature",
        rating: 4.8,
        reviewCount: 42,
        students: 95,
        price: "30,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=French+Literature",
        description: "In-depth study of French literary masterpieces",
        level: "Advanced",
        duration: "12 weeks",
        objectives: [
          "Analyze major literary works",
          "Develop critical thinking",
          "Master literary analysis"
        ],
        syllabus: [
          "Classical Literature",
          "Modern Literature",
          "Literary Theory",
          "Critical Analysis"
        ]
      },
      {
        title: "Creative Writing in French",
        subject: "French Literature",
        rating: 4.7,
        reviewCount: 35,
        students: 78,
        price: "28,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Creative+Writing",
        description: "Develop your creative writing skills in French",
        level: "Intermediate",
        duration: "10 weeks",
        objectives: [
          "Learn writing techniques",
          "Develop personal style",
          "Create original works"
        ],
        syllabus: [
          "Narrative Techniques",
          "Character Development",
          "Plot Structure",
          "Style and Voice"
        ]
      }
    ],
    reviews: [
      {
        name: "Lina K.",
        avatar: "/placeholder.svg?height=48&width=48&text=LK",
        rating: 5,
        comment: "Excellent teacher! Makes literature fascinating.",
        date: "2024-02-16",
        course: "Advanced French Literature"
      },
      {
        name: "Samir M.",
        avatar: "/placeholder.svg?height=48&width=48&text=SM",
        rating: 5,
        comment: "Very knowledgeable and supportive. Great writing workshops!",
        date: "2024-02-08",
        course: "Creative Writing in French"
      }
    ],
    schedule: [
      {
        day: "Tuesday",
        time: "16:00-18:00",
        course: "Advanced French Literature",
        location: "Room 203",
        availableSeats: 4,
        mode: "In-person"
      },
      {
        day: "Thursday",
        time: "16:00-18:00",
        course: "Creative Writing",
        location: "Room 204",
        availableSeats: 6,
        mode: "In-person"
      }
    ],
    achievements: [
      {
        title: "Excellence in French Education",
        organization: "Algerian Ministry of Education",
        year: "2022",
        description: "Recognized for outstanding contributions to French literature education"
      }
    ],
    teachingMaterials: [
      {
        title: "Literature Study Guide",
        type: "PDF",
        description: "Comprehensive study materials",
        downloadable: true
      },
      {
        title: "Writing Workshop Materials",
        type: "PDF",
        description: "Creative writing exercises and guides",
        downloadable: true
      }
    ],
    languages: [
      {
        language: "Arabic",
        proficiency: "Fluent"
      },
      {
        language: "French",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      }
    ],
    availability: {
      nextAvailable: "2024-03-15",
      bookingWindow: "2 weeks",
      privateSessionRate: "32,000 DZD/hour",
      groupSessionRate: "16,000 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-01-15"
    },
    visits: 850,
    dataCompleteness: 90,
    digitalPresence: 80,
    license: {
      number: "FRL-2022-4321",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2022-09-01",
      expiryDate: "2027-09-01",
      status: "Active"
    },
    licenseCard: "/images/profiles/teacher/card.jpg"
  }

  return <TeacherProfile teacher={teacher} navigateTo={navigateTo} userType={userType} showBackButton={showBackButton} />
}
