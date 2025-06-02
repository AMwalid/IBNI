"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeacherProfileMansouriProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileMansouri({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileMansouriProps) {
  // Map the existing mock data to TeacherData
  const teacher: TeacherData = {
    id: "teacher4",
    name: "Youcef Mansouri",
    subject: "History & Islamic Studies",
    rating: 4.6,
    reviewCount: 53,
    location: "Constantine, Algeria",
    bio: "Freelance history and Islamic studies teacher with a decade of experience. Specializes in making history engaging and relevant for students of all backgrounds.",
    img: "/placeholder.svg?height=144&width=144&text=YM",
    coverImage: "/placeholder.svg?height=400&width=1200&text=History+Education",
    licenseCard: "/images/profiles/teacher/card.jpg",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Youcef+Mansouri",
      "/placeholder.svg?height=400&width=400&text=History+Class",
      "/placeholder.svg?height=400&width=400&text=Islamic+Studies",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "youcef.mansouri@independent.dz",
      office: "Online / Various locations, Constantine",
      officeHours: "Flexible hours, including weekends",
      socialMedia: {
        linkedin: "linkedin.com/in/youcefm",
      },
    },
    education: [
      {
        degree: "Master's in History",
        institution: "University of Constantine",
        location: "Constantine, Algeria",
        year: "2013",
      },
      {
        degree: "Bachelor's in Islamic Studies",
        institution: "University of Constantine",
        location: "Constantine, Algeria",
        year: "2010",
      },
    ],
    certifications: [
      {
        name: "Certified History Teacher",
        issuer: "Algerian Ministry of Education",
        year: "2015",
        id: "HIST-2015-5678",
      },
    ],
    experience: [
      {
        position: "Freelance History Teacher",
        institution: "Independent Educator",
        location: "Constantine, Algeria",
        period: "2015-Present",
        description: "Teaching history and Islamic studies to high school and adult learners. Organizing workshops and seminars.",
      },
      {
        position: "History Teacher",
        institution: "Lycée Ibn Badis",
        location: "Constantine, Algeria",
        period: "2010-2015",
        description: "Taught history and social studies. Developed new curriculum materials and led student trips to historical sites.",
      },
    ],
    publications: [
      {
        title: "Teaching History in a Multicultural Context",
        journal: "North African Journal of Education",
        year: "2020",
        doi: "10.xxxx/naje.2020.112233",
      },
    ],
    awards: [
      {
        name: "Innovative Teaching Award",
        issuer: "Constantine Education Board",
        year: "2019",
      },
    ],
    teachingPhilosophy: "I strive to make history and Islamic studies accessible and meaningful, connecting past events to present-day realities. My approach is interactive and discussion-based, encouraging students to think critically about the world around them.",
    courses: [
      {
        title: "Islamic Golden Age: Science & Culture",
        subject: "Islamic Studies",
        rating: 4.7,
        reviewCount: 18,
        students: 42,
        duration: "8 weeks",
        price: "25,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Islamic+Golden+Age",
        description: "Explore the scientific and cultural achievements of the Islamic Golden Age",
        level: "Intermediate",
        objectives: [
          "Understand key scientific discoveries",
          "Appreciate cultural contributions",
          "Connect historical context to modern science"
        ],
        syllabus: [
          "Scientific Method in Islamic World",
          "Mathematical Innovations",
          "Medical Advances",
          "Cultural Exchange"
        ]
      },
      {
        title: "Algerian History: Colonial to Independence",
        subject: "History",
        rating: 4.8,
        reviewCount: 15,
        students: 38,
        duration: "10 weeks",
        price: "28,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Algerian+History",
        description: "Comprehensive study of Algeria's journey to independence",
        level: "Advanced",
        objectives: [
          "Understand colonial period",
          "Analyze independence movement",
          "Evaluate post-independence development"
        ],
        syllabus: [
          "French Colonial Rule",
          "National Liberation Front",
          "Independence Struggle",
          "Modern Algeria"
        ]
      },
      {
        title: "Introduction to Islamic Studies",
        subject: "Islamic Studies",
        rating: 4.5,
        reviewCount: 22,
        students: 56,
        duration: "6 weeks",
        price: "22,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Islamic+Studies",
        description: "Foundational course in Islamic studies and principles",
        level: "Beginner",
        objectives: [
          "Learn basic Islamic principles",
          "Understand historical context",
          "Develop critical thinking skills"
        ],
        syllabus: [
          "Five Pillars of Islam",
          "Islamic History",
          "Islamic Ethics",
          "Contemporary Issues"
        ]
      }
    ],
    reviews: [
      {
        name: "Mohammed K.",
        avatar: "/placeholder.svg?height=48&width=48&text=MK",
        rating: 5,
        comment: "Excellent teacher who makes history come alive!",
        date: "2024-02-20",
        course: "Algerian History: Colonial to Independence"
      },
      {
        name: "Amina S.",
        avatar: "/placeholder.svg?height=48&width=48&text=AS",
        rating: 4,
        comment: "Very knowledgeable and engaging lectures.",
        date: "2024-02-15",
        course: "Introduction to Islamic Studies"
      }
    ],
    schedule: [
      {
        day: "Tuesday",
        time: "15:00-17:00",
        course: "Islamic Golden Age",
        location: "Online",
        availableSeats: 8,
        mode: "Online"
      },
      {
        day: "Thursday",
        time: "15:00-17:00",
        course: "Algerian History",
        location: "Online",
        availableSeats: 6,
        mode: "Online"
      }
    ],
    achievements: [
      {
        title: "Excellence in Teaching Award",
        organization: "Constantine Education Board",
        year: "2023",
        description: "Recognized for outstanding contributions to history education"
      }
    ],
    teachingMaterials: [
      {
        title: "History Study Guide",
        type: "PDF",
        description: "Comprehensive study materials",
        downloadable: true
      },
      {
        title: "Islamic Studies Notes",
        type: "PDF",
        description: "Detailed course notes",
        downloadable: true
      }
    ],
    languages: [
      {
        language: "Arabic",
        proficiency: "Native"
      },
      {
        language: "French",
        proficiency: "Fluent"
      },
      {
        language: "English",
        proficiency: "Professional"
      }
    ],
    availability: {
      nextAvailable: "2024-03-05",
      bookingWindow: "2 weeks",
      privateSessionRate: "25,000 DZD/hour",
      groupSessionRate: "12,000 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-01-20"
    },
    visits: 856,
    dataCompleteness: 90,
    digitalPresence: 85,
    license: {
      number: "HIST-2023-7890",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2023-01-15",
      expiryDate: "2028-01-15",
      status: "Active"
    }
  }

  return <TeacherProfile teacher={teacher} navigateTo={navigateTo} userType={userType} showBackButton={showBackButton} />
}
