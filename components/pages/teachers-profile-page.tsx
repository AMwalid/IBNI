"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeachersProfilePageProps {
  navigateTo: (page: string) => void
}

export default function TeachersProfilePage({ navigateTo }: TeachersProfilePageProps) {
  const teacher: TeacherData = {
    id: "teacher6",
    name: "Mourad Haddad",
    subject: "Physics & Engineering",
    rating: 4.7,
    reviewCount: 68,
    location: "Annaba, Algeria",
    bio: "Experienced physics and engineering educator with a strong background in practical applications. Specializes in making complex concepts accessible through hands-on learning.",
    img: "/images/profiles/teacher/IMAGE.png",
    coverImage: "/images/profiles/teacher/COVER.png",
    licenseCard: "/placeholder.svg?height=400&width=600&text=License+Card",
    profilePictures: [
      "/images/profiles/teacher/IMAGE.png",
      "/placeholder.svg?height=400&width=400&text=Physics+Lab",
      "/placeholder.svg?height=400&width=400&text=Engineering+Class",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "mourad.haddad@annaba.edu.dz",
      office: "Physics Department, Académie Numérique d'Annaba",
      officeHours: "Mon-Fri, 15:00-17:00",
      socialMedia: {
        linkedin: "linkedin.com/in/mouradhaddad",
      },
    },
    education: [
      {
        degree: "Ph.D. in Physics",
        institution: "University of Annaba",
        location: "Annaba, Algeria",
        year: "2012",
      },
      {
        degree: "Master's in Engineering",
        institution: "University of Annaba",
        location: "Annaba, Algeria",
        year: "2008",
      },
    ],
    certifications: [
      {
        name: "Certified Physics Teacher",
        issuer: "Algerian Ministry of Education",
        year: "2013",
        id: "PHYS-2013-9012",
      },
    ],
    experience: [
      {
        position: "Senior Physics Teacher",
        institution: "Académie Numérique d'Annaba",
        location: "Annaba, Algeria",
        period: "2013-Present",
        description: "Teaching advanced physics and engineering concepts. Leading the physics department and mentoring new teachers.",
      },
      {
        position: "Research Associate",
        institution: "University of Annaba",
        location: "Annaba, Algeria",
        period: "2008-2013",
        description: "Conducted research in applied physics and engineering. Published several papers in international journals.",
      },
    ],
    publications: [
      {
        title: "Innovative Approaches to Teaching Physics",
        journal: "International Journal of Physics Education",
        year: "2022",
        doi: "10.xxxx/ijpe.2022.334455",
      },
    ],
    skills: [
      "Advanced Physics",
      "Engineering",
      "Research",
      "Teaching",
      "Mentoring",
      "Curriculum Development"
    ],
    teachingPhilosophy: "I believe in making physics and engineering accessible through practical applications and real-world examples. My teaching approach combines theoretical knowledge with hands-on experiments and problem-solving exercises.",
    courses: [
      {
        title: "Advanced Physics for Engineering",
        subject: "Physics",
        rating: 4.8,
        reviewCount: 42,
        students: 95,
        price: "30,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Advanced+Physics",
        description: "Comprehensive physics course for engineering students",
        level: "Advanced",
        duration: "12 weeks",
        objectives: [
          "Master advanced physics concepts",
          "Apply physics to engineering problems",
          "Develop practical problem-solving skills"
        ],
        syllabus: [
          "Mechanics",
          "Electromagnetism",
          "Thermodynamics",
          "Quantum Physics"
        ]
      },
      {
        title: "Engineering Fundamentals",
        subject: "Engineering",
        rating: 4.7,
        reviewCount: 35,
        students: 78,
        price: "32,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Engineering",
        description: "Introduction to core engineering principles",
        level: "Intermediate",
        duration: "10 weeks",
        objectives: [
          "Understand basic engineering concepts",
          "Learn practical applications",
          "Develop technical skills"
        ],
        syllabus: [
          "Materials Science",
          "Structural Analysis",
          "Fluid Mechanics",
          "Control Systems"
        ]
      }
    ],
    reviews: [
      {
        name: "Karim B.",
        avatar: "/placeholder.svg?height=48&width=48&text=KB",
        rating: 5,
        comment: "Excellent teacher! Makes complex topics easy to understand.",
        date: "2024-02-19",
        course: "Advanced Physics for Engineering"
      },
      {
        name: "Nadia M.",
        avatar: "/placeholder.svg?height=48&width=48&text=NM",
        rating: 4,
        comment: "Very knowledgeable and supportive. Great lab sessions!",
        date: "2024-02-14",
        course: "Engineering Fundamentals"
      }
    ],
    schedule: [
      {
        day: "Monday",
        time: "15:00-17:00",
        course: "Advanced Physics",
        location: "Lab 201",
        availableSeats: 4,
        mode: "In-person"
      },
      {
        day: "Wednesday",
        time: "15:00-17:00",
        course: "Engineering",
        location: "Lab 202",
        availableSeats: 3,
        mode: "In-person"
      }
    ],
    achievements: [
      {
        title: "Outstanding Educator Award",
        organization: "Algerian Ministry of Education",
        year: "2023",
        description: "Recognized for excellence in physics education"
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
        title: "Engineering Notes",
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
      nextAvailable: "2024-03-01",
      bookingWindow: "2 weeks",
      privateSessionRate: "2,500 DZD/hour",
      groupSessionRate: "1,500 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-01-15"
    },
    visits: 1250,
    dataCompleteness: 95,
    digitalPresence: 90,
    license: {
      number: "PHYS-2023-3456",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2023-01-15",
      expiryDate: "2028-01-15",
      status: "Active"
    }
  }

  return <TeacherProfile 
    teacher={teacher} 
    navigateTo={navigateTo} 
    userType="teacher" 
    showBackButton={false} 
  />
} 