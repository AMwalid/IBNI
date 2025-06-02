"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeacherProfileHadjProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileHadj({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileHadjProps) {
  // Map the existing mock data to TeacherData
  const teacher: TeacherData = {
    id: "teacher3",
    name: "Dr. Leila Hadj",
    subject: "Biology",
    rating: 4.8,
    reviewCount: 72,
    location: "Oran, Algeria",
    bio: "Experienced biology educator and head of the science department with a passion for environmental science and student mentorship. Specialized in molecular biology and innovative teaching methods.",
    img: "/placeholder.svg?height=144&width=144&text=LH",
    coverImage: "/placeholder.svg?height=400&width=1200&text=Biology+Education",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Dr.+Leila+Hadj",
      "/placeholder.svg?height=400&width=400&text=Biology+Class",
      "/placeholder.svg?height=400&width=400&text=Science+Lab",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "leila.hadj@elfeth.edu.dz",
      office: "Science Department, Collège El Feth, Oran",
      officeHours: "Mon-Fri, 16:00-18:00",
      socialMedia: {
        linkedin: "linkedin.com/in/leilahadj",
      },
    },
    education: [
      {
        degree: "Ph.D. in Biological Sciences",
        institution: "University of Oran",
        location: "Oran, Algeria",
        year: "2010",
      },
      {
        degree: "Master's in Molecular Biology",
        institution: "University of Algiers",
        location: "Algiers, Algeria",
        year: "2006",
      },
    ],
    certifications: [
      {
        name: "Certified Biology Teacher",
        issuer: "Algerian Ministry of Education",
        year: "2012",
        id: "BIO-2012-1234",
      },
    ],
    experience: [
      {
        position: "Head of Science Department",
        institution: "Collège El Feth",
        location: "Oran, Algeria",
        period: "2015-Present",
        description: "Leading the science department and teaching biology to middle and high school students. Mentoring new teachers and organizing science fairs.",
      },
      {
        position: "Biology Teacher",
        institution: "Collège El Feth",
        location: "Oran, Algeria",
        period: "2010-2015",
        description: "Taught biology and environmental science. Developed new lab activities and field trips.",
      },
    ],
    publications: [
      {
        title: "Innovative Approaches to Environmental Science Education",
        journal: "Algerian Journal of Science Education",
        year: "2021",
        doi: "10.xxxx/ajse.2021.987654",
      },
    ],
    awards: [
      {
        name: "Best Science Educator Award",
        issuer: "Oran Science Association",
        year: "2020",
      },
    ],
    teachingPhilosophy: "I believe in creating an engaging and interactive learning environment where students can explore the wonders of biology through hands-on experiments and real-world applications. My approach combines theoretical knowledge with practical experience, fostering critical thinking and scientific inquiry.",
    courses: [
      {
        title: "Advanced Biology for Baccalaureate",
        subject: "Biology",
        rating: 4.8,
        reviewCount: 45,
        students: 120,
        price: "28,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Advanced+Biology",
        description: "Comprehensive preparation for the Baccalaureate biology exam",
        level: "Advanced",
        duration: "10 weeks",
        objectives: [
          "Master advanced biology concepts",
          "Develop laboratory skills",
          "Prepare for university-level biology"
        ],
        syllabus: [
          "Cell Biology",
          "Genetics",
          "Ecology",
          "Evolution"
        ]
      },
      {
        title: "Molecular Biology Fundamentals",
        subject: "Biology",
        rating: 4.9,
        reviewCount: 38,
        students: 85,
        price: "32,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Molecular+Biology",
        description: "Introduction to molecular biology for advanced students",
        level: "Advanced",
        duration: "12 weeks",
        objectives: [
          "Understand molecular processes",
          "Learn laboratory techniques",
          "Apply knowledge to research"
        ],
        syllabus: [
          "DNA Structure",
          "Gene Expression",
          "Protein Synthesis",
          "Genetic Engineering"
        ]
      }
    ],
    reviews: [
      {
        name: "Sara M.",
        avatar: "/placeholder.svg?height=48&width=48&text=SM",
        rating: 5,
        comment: "Excellent teacher! Makes complex topics easy to understand.",
        date: "2024-02-18",
        course: "Advanced Biology for Baccalaureate"
      },
      {
        name: "Yacine B.",
        avatar: "/placeholder.svg?height=48&width=48&text=YB",
        rating: 5,
        comment: "Very knowledgeable and supportive. Great lab sessions!",
        date: "2024-02-12",
        course: "Molecular Biology Fundamentals"
      }
    ],
    schedule: [
      {
        day: "Monday",
        time: "15:00-17:00",
        course: "Advanced Biology",
        location: "Lab 101",
        availableSeats: 5,
        mode: "In-person"
      },
      {
        day: "Wednesday",
        time: "15:00-17:00",
        course: "Molecular Biology",
        location: "Lab 102",
        availableSeats: 3,
        mode: "In-person"
      }
    ],
    achievements: [
      {
        title: "Excellence in Science Education",
        organization: "Algerian Ministry of Education",
        year: "2023",
        description: "Recognized for outstanding contributions to science education"
      }
    ],
    teachingMaterials: [
      {
        title: "Biology Lab Manual",
        type: "PDF",
        description: "Comprehensive laboratory guide",
        downloadable: true
      },
      {
        title: "Molecular Biology Notes",
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
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "French",
        proficiency: "Professional"
      }
    ],
    availability: {
      nextAvailable: "2024-03-10",
      bookingWindow: "2 weeks",
      privateSessionRate: "35,000 DZD/hour",
      groupSessionRate: "18,000 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-01-25"
    },
    visits: 987,
    dataCompleteness: 92,
    digitalPresence: 88,
    license: {
      number: "BIO-2023-5678",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2023-01-15",
      expiryDate: "2028-01-15",
      status: "Active"
    },
    licenseCard: "/images/profiles/teacher/card.jpg"
  }

  return <TeacherProfile teacher={teacher} navigateTo={navigateTo} userType={userType} showBackButton={showBackButton} />
}
