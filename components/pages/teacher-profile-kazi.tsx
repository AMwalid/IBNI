"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeacherProfileKaziProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileKazi({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileKaziProps) {
  // Mock teacher data
  const teacher: TeacherData = {
    id: "teacher1",
    name: "Dr. Amina Kazi",
    subject: "Physics",
    rating: 4.9,
    reviewCount: 87,
    location: "Algiers, Algeria",
    bio: "Dedicated physics educator with 12 years of experience teaching at prestigious institutions across Algeria. I specialize in making complex physics concepts accessible through innovative teaching methods and practical demonstrations. My research background in quantum physics allows me to bring cutting-edge scientific understanding to my students.",
    img: "/placeholder.svg?height=144&width=144&text=AK",
    coverImage: "/placeholder.svg?height=400&width=1200&text=Physics+Education",
    licenseCard: "/images/profiles/teacher/card.jpg",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Dr.+Amina+Kazi",
      "/placeholder.svg?height=400&width=400&text=Teaching+Physics",
      "/placeholder.svg?height=400&width=400&text=Research+Lab",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "amina.kazi@lyceeibk.dz",
      office: "Physics Department, Lycée Ibn Khaldoun, Algiers",
      officeHours: "Monday-Thursday: 14:00-16:00",
      socialMedia: {
        linkedin: "linkedin.com/in/aminakazi",
        researchGate: "researchgate.net/profile/Amina_Kazi",
      },
    },
    education: [
      {
        degree: "Ph.D. in Theoretical Physics",
        institution: "University of Science and Technology Houari Boumediene",
        year: "2011",
        details: "Specialized in Quantum Field Theory",
        gpa: "3.9/4.0"
      },
      {
        degree: "M.Sc. in Physics",
        institution: "University of Science and Technology Houari Boumediene",
        year: "2008",
        details: "Focused on Particle Physics",
        gpa: "3.8/4.0"
      },
      {
        degree: "B.Sc. in Physics",
        institution: "University of Algiers",
        year: "2006",
        details: "General Physics with Honors",
        gpa: "3.7/4.0"
      },
    ],
    experience: [
      {
        position: "Senior Physics Teacher",
        institution: "Lycée Ibn Khaldoun",
        period: "2016-Present",
        achievements: [
          "Developed innovative physics curriculum",
          "Led successful student research projects",
          "Mentored junior teachers"
        ]
      },
      {
        position: "Physics Lecturer",
        institution: "University of Science and Technology Houari Boumediene",
        period: "2012-2016",
        achievements: [
          "Taught undergraduate physics courses",
          "Supervised laboratory sessions",
          "Led student research projects"
        ]
      },
      {
        position: "Research Assistant",
        institution: "Center for Development of Advanced Technologies",
        period: "2009-2012",
        achievements: [
          "Conducted quantum physics research",
          "Assisted in laboratory experiments",
          "Published research papers"
        ]
      },
    ],
    certifications: [
      {
        name: "Advanced Physics Teaching Certification",
        issuer: "Algerian Ministry of Education",
        year: "2015",
        expirationDate: "2025",
        licenseNumber: "APT-2015-0342"
      },
      {
        name: "International Baccalaureate Physics Examiner",
        issuer: "International Baccalaureate Organization",
        year: "2018",
        expirationDate: "2024",
        licenseNumber: "IBO-PHY-2018-1245"
      },
      {
        name: "Digital Education Technologies Certificate",
        issuer: "Algerian Institute for Educational Technology",
        year: "2020",
        expirationDate: "2025",
        licenseNumber: "AIET-DET-2020-0789"
      },
    ],
    publications: [
      {
        title: "Quantum Mechanics Teaching Methods for Secondary Education",
        journal: "Algerian Journal of Science Education",
        year: "2022",
        doi: "10.xxxx/ajse.2022.123456"
      },
      {
        title: "Practical Laboratory Approaches for Physics Education in Resource-Limited Settings",
        journal: "International Journal of Physics Education",
        year: "2019",
        doi: "10.xxxx/ijpe.2019.789012"
      },
      {
        title: "Integrating Digital Technologies in Physics Classrooms: A Case Study from Algeria",
        journal: "African Journal of Educational Technology",
        year: "2020",
        doi: "10.xxxx/ajet.2020.345678"
      },
    ],
    skills: [
      "Quantum Physics",
      "Classical Mechanics",
      "Electromagnetism",
      "Laboratory Techniques",
      "Curriculum Development",
      "Student Mentoring",
      "Research Methods",
      "Digital Education"
    ],
    teachingPhilosophy: "I believe in creating an engaging learning environment where students develop a deep understanding of physics principles through hands-on experimentation and real-world applications. My approach combines rigorous theoretical foundations with practical demonstrations to make abstract concepts tangible. I strive to inspire curiosity and critical thinking, encouraging students to ask questions and explore the fundamental laws that govern our universe.",
    courses: [
      {
        title: "Advanced Physics for Baccalaureate",
        subject: "Physics",
        rating: 4.9,
        reviewCount: 56,
        students: 342,
        price: "25,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Advanced+Physics",
        description: "Comprehensive preparation for the Baccalaureate physics exam",
        level: "Advanced",
        duration: "8 weeks",
        objectives: [
          "Master advanced physics concepts",
          "Develop problem-solving skills",
          "Prepare for university-level physics"
        ],
        syllabus: [
          "Mechanics",
          "Electromagnetism",
          "Modern Physics",
          "Laboratory Work"
        ]
      },
      {
        title: "Quantum Physics Fundamentals",
        subject: "Physics",
        rating: 4.8,
        reviewCount: 42,
        students: 285,
        price: "28,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Quantum+Physics",
        description: "Introduction to quantum mechanics for advanced students",
        level: "Advanced",
        duration: "10 weeks",
        objectives: [
          "Understand quantum principles",
          "Apply quantum mechanics to problems",
          "Explore modern physics applications"
        ],
        syllabus: [
          "Wave-Particle Duality",
          "Quantum States",
          "Measurement Theory",
          "Applications"
        ]
      },
      {
        title: "Physics Laboratory Techniques",
        subject: "Physics",
        rating: 4.7,
        reviewCount: 38,
        students: 256,
        price: "22,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Lab+Techniques",
        description: "Hands-on laboratory skills and experimental methods",
        level: "Intermediate",
        duration: "6 weeks",
        objectives: [
          "Master laboratory techniques",
          "Develop experimental skills",
          "Learn data analysis methods"
        ],
        syllabus: [
          "Measurement Techniques",
          "Data Collection",
          "Analysis Methods",
          "Report Writing"
        ]
      }
    ],
    reviews: [
      {
        name: "Ahmed B.",
        avatar: "/placeholder.svg?height=48&width=48&text=AB",
        rating: 5,
        comment: "Excellent teacher! Made complex concepts easy to understand.",
        date: "2024-02-15",
        course: "Advanced Physics for Baccalaureate"
      },
      {
        name: "Fatima Z.",
        avatar: "/placeholder.svg?height=48&width=48&text=FZ",
        rating: 5,
        comment: "Very knowledgeable and supportive. Highly recommended!",
        date: "2024-02-10",
        course: "Quantum Physics Fundamentals"
      }
    ],
    schedule: [
      {
        day: "Monday",
        time: "14:00-16:00",
        course: "Advanced Physics",
        location: "Room 301",
        availableSeats: 5,
        mode: "In-person"
      },
      {
        day: "Wednesday",
        time: "14:00-16:00",
        course: "Quantum Physics",
        location: "Room 302",
        availableSeats: 3,
        mode: "In-person"
      }
    ],
    achievements: [
      {
        title: "Excellence in Teaching Award",
        organization: "Algerian Ministry of Education",
        year: "2021",
        description: "Recognized for outstanding contributions to physics education"
      },
      {
        title: "Outstanding Educator Recognition",
        organization: "Algiers Educational District",
        year: "2019",
        description: "Awarded for innovative teaching methods"
      }
    ],
    teachingMaterials: [
      {
        title: "Physics Lab Manual",
        type: "PDF",
        description: "Comprehensive laboratory guide",
        downloadable: true
      },
      {
        title: "Quantum Physics Notes",
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
      nextAvailable: "2024-03-01",
      bookingWindow: "2 weeks",
      privateSessionRate: "30,000 DZD/hour",
      groupSessionRate: "15,000 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-01-15"
    },
    visits: 1234,
    dataCompleteness: 95,
    digitalPresence: 90,
    license: {
      number: "MATH-2023-1234",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2023-03-01",
      expiryDate: "2028-03-01",
      status: "Active"
    }
  }

  return <TeacherProfile teacher={teacher} navigateTo={navigateTo} userType={userType} showBackButton={showBackButton} />
}
