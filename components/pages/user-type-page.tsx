"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, GraduationCap, School, Search, ShoppingBag, UserCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface UserTypePageProps {
  userType: "parent" | "student" | "teacher" | "institution"
  navigateTo: (page: string, initialTab?: string | null) => void
}

export default function UserTypePage({ userType, navigateTo }: UserTypePageProps) {
  // Define content based on user type
  const content = {
    parent: {
      title: "How IBNI Helps Parents",
      description: "Empower your child's educational journey with IBNI. Find the best schools, connect with qualified teachers, and track your child's progress all in one place.",
      valueProps: [
        {
          title: "Quality Education",
          description: "Find the best educational institutions for your child",
          content: "Access comprehensive information about schools, their programs, and performance metrics to make informed decisions about your child's education.",
          icon: GraduationCap,
        },
        {
          title: "Expert Teachers",
          description: "Connect with qualified and experienced educators",
          content: "Browse profiles of teachers, view their qualifications, and find the perfect match for your child's learning needs.",
          icon: UserCheck,
        },
        {
          title: "Progress Tracking",
          description: "Monitor your child's academic journey",
          content: "Track your child's progress, view grades, attendance, and performance metrics in real-time to support their learning journey.",
          icon: BookOpen,
        },
      ],
      features: [
        {
          title: "Find Schools",
          description: "Discover the perfect educational institution for your child",
          items: [
            "Browse schools by location, curriculum, and special programs",
            "Compare schools based on performance metrics and reviews",
            "View detailed information about facilities and extracurricular activities",
            "Schedule school visits and interviews",
          ],
          icon: Search,
          link: "find-resources",
          linkTab: "schools",
        },
        {
          title: "Find Teachers",
          description: "Connect with qualified educators for your child",
          items: [
            "Search teachers by subject, experience, and teaching style",
            "View teacher profiles with qualifications and reviews",
            "Book one-on-one sessions or group classes",
            "Track your child's progress with specific teachers",
          ],
          icon: UserCheck,
          link: "find-resources",
          linkTab: "teachers",
        },
        {
          title: "Track Kid Progress",
          description: "Monitor your child's academic journey",
          items: [
            "View real-time grades and attendance records",
            "Track progress across different subjects and skills",
            "Receive notifications about important events and deadlines",
            "Communicate with teachers about your child's performance",
          ],
          icon: BookOpen,
          link: "parents-track-kid",
        },
        {
          title: "Educational Resources",
          description: "Access learning materials and courses",
          items: [
            "Browse curated educational content for different age groups",
            "Access online courses and learning materials",
            "Find educational apps and tools recommended by teachers",
            "Track your child's engagement with learning resources",
          ],
          icon: School,
          link: "parents-my-courses",
        },
        {
          title: "IBNI Store",
          description: "Access educational products and resources",
          items: [
            "Browse curated educational materials and textbooks",
            "Purchase school supplies and learning tools",
            "Find educational apps and software recommended by teachers",
            "Access exclusive discounts on educational products",
          ],
          icon: ShoppingBag,
          link: "store",
        },
      ],
      ctaTitle: "Ready to enhance your child's education?",
      ctaDescription: "Join thousands of parents who are already using IBNI to find the best educational resources for their children.",
    },
    student: {
      title: "How IBNI Helps Students",
      description: "Take control of your educational journey with IBNI. Find the best schools, connect with expert teachers, and track your progress all in one place.",
      valueProps: [
        {
          title: "Quality Education",
          description: "Find the best educational institutions for your future",
          content: "Discover schools that match your interests, learning style, and career goals to make informed decisions about your education.",
          icon: GraduationCap,
        },
        {
          title: "Expert Teachers",
          description: "Connect with qualified and experienced educators",
          content: "Find teachers who can help you excel in your studies, provide personalized guidance, and support your learning journey.",
          icon: UserCheck,
        },
        {
          title: "Progress Tracking",
          description: "Monitor your academic journey",
          content: "Track your progress, view grades, attendance, and performance metrics in real-time to stay on top of your education.",
          icon: BookOpen,
        },
      ],
      features: [
        {
          title: "Find Schools",
          description: "Discover the perfect educational institution for your future",
          items: [
            "Browse schools by location, programs, and specializations",
            "Compare schools based on performance metrics and student reviews",
            "View detailed information about campus life and extracurricular activities",
            "Schedule campus visits and interviews",
          ],
          icon: Search,
          link: "find-resources",
          linkTab: "schools",
        },
        {
          title: "Find Teachers",
          description: "Connect with qualified educators who can help you excel",
          items: [
            "Search teachers by subject, expertise, and teaching style",
            "View teacher profiles with qualifications and student reviews",
            "Book one-on-one tutoring sessions or join group classes",
            "Get personalized feedback and guidance",
          ],
          icon: UserCheck,
          link: "find-resources",
          linkTab: "teachers",
        },
        {
          title: "Track Your Progress",
          description: "Monitor your academic journey",
          items: [
            "View real-time grades and attendance records",
            "Track progress across different subjects and skills",
            "Set academic goals and monitor your achievements",
            "Receive personalized recommendations for improvement",
          ],
          icon: BookOpen,
          link: "students-track-progress",
        },
        {
          title: "Educational Resources",
          description: "Access learning materials and courses",
          items: [
            "Browse curated educational content for your grade level",
            "Access online courses and learning materials",
            "Find educational apps and tools recommended by teachers",
            "Track your engagement with learning resources",
          ],
          icon: School,
          link: "students-my-courses",
        },
        {
          title: "IBNI Store",
          description: "Access educational products and resources",
          items: [
            "Browse textbooks and study materials for your courses",
            "Purchase school supplies and learning tools",
            "Find educational apps and software to enhance your learning",
            "Access student discounts on educational products",
          ],
          icon: ShoppingBag,
          link: "store",
        },
      ],
      ctaTitle: "Ready to take control of your education?",
      ctaDescription: "Join thousands of students who are already using IBNI to find the best educational resources and track their progress.",
    },
    teacher: {
      title: "How IBNI Helps Teachers",
      description: "Enhance your teaching career with IBNI. Connect with students, manage your classes, and showcase your expertise all in one place.",
      valueProps: [
        {
          title: "Connect with Students",
          description: "Reach students who need your expertise",
          content: "Create a professional profile to showcase your expertise and connect with students who are looking for teachers like you.",
          icon: Users,
        },
        {
          title: "Manage Your Classes",
          description: "Streamline your teaching workflow",
          content: "Organize your classes, track student progress, and manage assignments all in one place to save time and improve efficiency.",
          icon: BookOpen,
        },
        {
          title: "Grow Your Career",
          description: "Expand your teaching opportunities",
          content: "Connect with schools, institutions, and students to expand your teaching opportunities and grow your professional network.",
          icon: GraduationCap,
        },
      ],
      features: [
        {
          title: "Professional Profile",
          description: "Showcase your expertise and experience",
          items: [
            "Create a detailed profile highlighting your qualifications and teaching style",
            "Showcase your expertise in specific subjects and grade levels",
            "Display testimonials from students and parents",
            "Highlight your teaching achievements and certifications",
          ],
          icon: UserCheck,
          link: "teachers-profile",
        },
        {
          title: "Class Management",
          description: "Organize and manage your classes efficiently",
          items: [
            "Create and manage class schedules and rosters",
            "Track student attendance and participation",
            "Assign and grade homework and assessments",
            "Generate progress reports and analytics",
          ],
          icon: BookOpen,
          link: "teachers-manage-classes",
        },
        {
          title: "Resource Sharing",
          description: "Share educational resources with your students",
          items: [
            "Upload and share lesson plans, worksheets, and study materials",
            "Create and assign online quizzes and assessments",
            "Provide feedback on student work",
            "Recommend educational apps and tools",
          ],
          icon: School,
          link: "teachers-manage-classes",
        },
        {
          title: "Professional Development",
          description: "Grow your teaching skills and career",
          items: [
            "Access professional development courses and workshops",
            "Connect with other teachers and share best practices",
            "Find job opportunities at schools and institutions",
            "Stay updated with the latest teaching trends and methodologies",
          ],
          icon: GraduationCap,
          link: "teachers-profile",
        },
        {
          title: "IBNI Store",
          description: "Access teaching resources and materials",
          items: [
            "Browse and purchase teaching materials and lesson plans",
            "Find classroom supplies and educational tools",
            "Access professional development resources and books",
            "Get special discounts on educational products for teachers",
          ],
          icon: ShoppingBag,
          link: "store",
        },
      ],
      ctaTitle: "Ready to enhance your teaching career?",
      ctaDescription: "Join thousands of teachers who are already using IBNI to connect with students, manage their classes, and grow their careers.",
    },
    institution: {
      title: "How IBNI Helps Institutions",
      description: "Transform your educational institution with IBNI. Connect with students, manage your school, and showcase your programs all in one place.",
      valueProps: [
        {
          title: "Connect with Students",
          description: "Reach potential students and families",
          content: "Create a compelling school profile to showcase your programs, facilities, and achievements to attract the right students.",
          icon: Users,
        },
        {
          title: "School Management",
          description: "Streamline your administrative processes",
          content: "Manage classes, track student progress, and handle administrative tasks efficiently to focus on what matters most - education.",
          icon: School,
        },
        {
          title: "Enhance Reputation",
          description: "Build your institution's brand and credibility",
          content: "Showcase your institution's achievements, student success stories, and unique programs to build a strong reputation in the education community.",
          icon: GraduationCap,
        },
      ],
      features: [
        {
          title: "School Profile",
          description: "Showcase your institution to potential students",
          items: [
            "Create a detailed profile highlighting your programs and facilities",
            "Showcase your curriculum, extracurricular activities, and achievements",
            "Display testimonials from students, parents, and alumni",
            "Highlight your institution's unique selling points",
          ],
          icon: School,
          link: "institutions-profile",
        },
        {
          title: "School Management",
          description: "Streamline your administrative processes",
          items: [
            "Manage classes, schedules, and student rosters",
            "Track student attendance, grades, and performance",
            "Generate reports and analytics for decision-making",
            "Communicate with students, parents, and teachers",
          ],
          icon: BookOpen,
          link: "institutions-manage-school",
        },
        {
          title: "Teacher Management",
          description: "Connect with and manage your teaching staff",
          items: [
            "Post job openings and recruit qualified teachers",
            "Manage teacher profiles and assignments",
            "Track teacher performance and professional development",
            "Facilitate communication between teachers and administrators",
          ],
          icon: Users,
          link: "institutions-manage-school",
        },
        {
          title: "Resource Management",
          description: "Manage and share educational resources",
          items: [
            "Create and share curriculum materials and lesson plans",
            "Manage library resources and digital content",
            "Track resource usage and effectiveness",
            "Collaborate with other institutions on shared resources",
          ],
          icon: GraduationCap,
          link: "institutions-manage-school",
        },
        {
          title: "IBNI Store",
          description: "Access institutional resources and supplies",
          items: [
            "Browse and purchase curriculum materials and textbooks",
            "Find administrative tools and school management software",
            "Access professional development resources for staff",
            "Get bulk discounts on educational products for your institution",
          ],
          icon: ShoppingBag,
          link: "store",
        },
      ],
      ctaTitle: "Ready to transform your institution?",
      ctaDescription: "Join hundreds of educational institutions who are already using IBNI to connect with students, manage their schools, and enhance their reputation.",
    },
  }

  const userTypeContent = content[userType]

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">{userTypeContent.title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {userTypeContent.description}
        </p>
      </section>

      {/* Value Proposition */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypeContent.valueProps.map((prop, index) => (
            <Card key={index} className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <prop.icon className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle>{prop.title}</CardTitle>
                <CardDescription>{prop.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {prop.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features for {userType.charAt(0).toUpperCase() + userType.slice(1)}s</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userTypeContent.features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <feature.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full"
                  onClick={() => navigateTo(feature.link, feature.linkTab || null)}
                >
                  <div className="flex items-center justify-center">
                    {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{userTypeContent.ctaTitle}</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          {userTypeContent.ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-green-700 hover:bg-green-800"
            onClick={() => navigateTo("signup")}
          >
            Sign Up Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-green-700 text-green-700 hover:bg-green-50"
            onClick={() => navigateTo("book-demo")}
          >
            Book a Demo
          </Button>
        </div>
      </section>
    </div>
  )
}
