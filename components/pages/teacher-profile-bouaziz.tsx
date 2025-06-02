"use client"

import TeacherProfile, { TeacherData } from "./teacher-profile"

interface TeacherProfileBouazizProps {
  navigateTo?: (page: string, tab?: string | null) => void
  userType?: "parent" | "student" | "teacher" | "institution"
  showBackButton?: boolean
}

export default function TeacherProfileBouaziz({ navigateTo, userType = "parent", showBackButton = false }: TeacherProfileBouazizProps) {
  // Map the existing mock data to TeacherData
  const teacher: TeacherData = {
    id: "teacher5",
    name: "Nadia Bouaziz",
    subject: "Computer Science & Digital Arts",
    rating: 4.9,
    reviewCount: 91,
    location: "Tlemcen, Algeria",
    bio: "Dynamic freelance instructor specializing in the intersection of technology and art. 7 years of teaching experience in Computer Science and Digital Arts, preparing students for careers in tech, design, and digital media.",
    img: "/placeholder.svg?height=144&width=144&text=NB",
    coverImage: "/placeholder.svg?height=400&width=1200&text=Computer+Science+%26+Digital+Arts",
    profilePictures: [
      "/placeholder.svg?height=400&width=400&text=Nadia+Bouaziz",
      "/placeholder.svg?height=400&width=400&text=Digital+Arts",
      "/placeholder.svg?height=400&width=400&text=Web+Development",
    ],
    contact: {
      phone: "+213 (0)5XX XX XX XX",
      email: "nadia.bouaziz@freelance.dz",
      office: "Remote / Tlemcen",
      officeHours: "Weekdays 14:00-20:00, Saturday 10:00-16:00",
      socialMedia: {
        linkedin: "linkedin.com/in/nadiabouaziz",
      },
    },
    education: [
      {
        degree: "Master's in Computer Science",
        institution: "University of Tlemcen",
        location: "Tlemcen, Algeria",
        year: "2016",
      },
      {
        degree: "Bachelor's in Digital Media Arts",
        institution: "École des Beaux-Arts, Tlemcen",
        location: "Tlemcen, Algeria",
        year: "2014",
      },
    ],
    certifications: [
      {
        name: "Adobe Certified Instructor",
        issuer: "Adobe",
        year: "2018",
        id: "ADOBE-2018-2345",
      },
      {
        name: "Full Stack Web Development",
        issuer: "Algerian Tech Institute",
        year: "2019",
        id: "FSWD-2019-6789",
      },
      {
        name: "UI/UX Design Professional",
        issuer: "Design Academy International",
        year: "2020",
        id: "UIUX-2020-1122",
      },
    ],
    experience: [
      {
        position: "Creative Technology Educator",
        institution: "Freelance Instructor",
        location: "Tlemcen, Algeria",
        period: "2017-Present",
        description: "Teaching computer science and digital arts to students of all ages. Developing project-based curricula and leading workshops in web development, UI/UX, and animation.",
      },
      {
        position: "Instructor, Digital Media Arts",
        institution: "École Polytechnique Préparatoire",
        location: "Tlemcen, Algeria",
        period: "2014-2017",
        description: "Taught digital media arts and mentored students in creative technology projects.",
      },
    ],
    publications: [
      {
        title: "Project-Based Learning in Digital Arts Education",
        journal: "International Journal of Art & Technology",
        year: "2022",
        doi: "10.xxxx/ijat.2022.556677",
      },
    ],
    awards: [
      {
        name: "Digital Innovation in Education Award",
        issuer: "Tlemcen Tech Forum",
        year: "2021",
      },
    ],
    teachingPhilosophy: "My teaching philosophy centers on project-based learning, combining technical mastery with creative exploration. I adapt my teaching to different learning paces and backgrounds, ensuring every student can succeed.",
    courses: [
      {
        title: "Web Development Fundamentals",
        subject: "Computer Science",
        rating: 4.9,
        reviewCount: 45,
        students: 120,
        price: "35,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Web+Development",
        description: "Learn modern web development from scratch",
        level: "Beginner",
        duration: "12 weeks",
        objectives: [
          "Master HTML, CSS, and JavaScript",
          "Build responsive websites",
          "Learn modern frameworks"
        ],
        syllabus: [
          "HTML5 & CSS3",
          "JavaScript ES6+",
          "Responsive Design",
          "React Basics"
        ]
      },
      {
        title: "Digital Art & Design",
        subject: "Digital Arts",
        rating: 4.8,
        reviewCount: 38,
        students: 95,
        price: "32,000 DZD",
        imageUrl: "/placeholder.svg?height=160&width=320&text=Digital+Art",
        description: "Create stunning digital artwork and designs",
        level: "Intermediate",
        duration: "10 weeks",
        objectives: [
          "Master design principles",
          "Learn digital tools",
          "Create portfolio pieces"
        ],
        syllabus: [
          "Design Theory",
          "Adobe Creative Suite",
          "Digital Illustration",
          "UI/UX Basics"
        ]
      }
    ],
    reviews: [
      {
        name: "Yasmine L.",
        avatar: "/placeholder.svg?height=48&width=48&text=YL",
        rating: 5,
        comment: "Excellent teacher! Makes coding fun and accessible.",
        date: "2024-02-17",
        course: "Web Development Fundamentals"
      },
      {
        name: "Mehdi R.",
        avatar: "/placeholder.svg?height=48&width=48&text=MR",
        rating: 5,
        comment: "Very knowledgeable and supportive. Great design workshops!",
        date: "2024-02-09",
        course: "Digital Art & Design"
      }
    ],
    schedule: [
      {
        day: "Monday",
        time: "16:00-18:00",
        course: "Web Development",
        location: "Computer Lab 1",
        availableSeats: 5,
        mode: "In-person"
      },
      {
        day: "Wednesday",
        time: "16:00-18:00",
        course: "Digital Art",
        location: "Design Studio",
        availableSeats: 4,
        mode: "In-person"
      }
    ],
    achievements: [
      {
        title: "Digital Innovation Award",
        organization: "Tlemcen Tech Forum",
        year: "2023",
        description: "Recognized for innovative teaching methods in digital education"
      }
    ],
    teachingMaterials: [
      {
        title: "Web Development Guide",
        type: "PDF",
        description: "Comprehensive coding tutorials",
        downloadable: true
      },
      {
        title: "Design Principles",
        type: "PDF",
        description: "Digital design fundamentals",
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
      nextAvailable: "2024-03-20",
      bookingWindow: "2 weeks",
      privateSessionRate: "40,000 DZD/hour",
      groupSessionRate: "20,000 DZD/hour"
    },
    verificationStatus: {
      identityVerified: true,
      backgroundChecked: true,
      qualificationsVerified: true,
      lastVerified: "2024-02-01"
    },
    visits: 1456,
    dataCompleteness: 96,
    digitalPresence: 95,
    license: {
      number: "CS-2023-5678",
      issuingAuthority: "Algerian Ministry of Education",
      issueDate: "2023-02-15",
      expiryDate: "2028-02-15",
      status: "Active"
    },
    licenseCard: "/images/profiles/teacher/card.jpg"
  }

  return <TeacherProfile teacher={teacher} navigateTo={navigateTo} userType={userType} showBackButton={showBackButton} />
}
