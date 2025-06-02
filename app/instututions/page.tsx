import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, School, Users } from "lucide-react"
import Link from "next/link"

export default function InstitutionsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">How Cumpass Helps Institutions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your educational institution with Cumpass. Connect with students, manage your school, and showcase your programs all in one place.
        </p>
      </section>

      {/* Value Proposition */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Connect with Students</CardTitle>
              <CardDescription>Reach potential students and families</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create a compelling school profile to showcase your programs, facilities, and achievements to attract the right students.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <School className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>School Management</CardTitle>
              <CardDescription>Streamline your administrative processes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage classes, track student progress, and handle administrative tasks efficiently to focus on what matters most - education.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Enhance Reputation</CardTitle>
              <CardDescription>Build your institution's brand and credibility</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Showcase your institution's achievements, student success stories, and unique programs to build a strong reputation in the education community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features for Institutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <School className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>School Profile</CardTitle>
              </div>
              <CardDescription>Showcase your institution to potential students</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Create a detailed profile highlighting your programs and facilities</li>
                <li>Showcase your curriculum, extracurricular activities, and achievements</li>
                <li>Display testimonials from students, parents, and alumni</li>
                <li>Highlight your institution's unique selling points</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/institutions-profile">
                  View Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>School Management</CardTitle>
              </div>
              <CardDescription>Streamline your administrative processes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Manage classes, schedules, and student rosters</li>
                <li>Track student attendance, grades, and performance</li>
                <li>Generate reports and analytics for decision-making</li>
                <li>Communicate with students, parents, and teachers</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/institutions-manage-school">
                  Manage School <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Teacher Management</CardTitle>
              </div>
              <CardDescription>Connect with and manage your teaching staff</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Post job openings and recruit qualified teachers</li>
                <li>Manage teacher profiles and assignments</li>
                <li>Track teacher performance and professional development</li>
                <li>Facilitate communication between teachers and administrators</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/institutions-manage-school">
                  Manage Teachers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Resource Management</CardTitle>
              </div>
              <CardDescription>Manage and share educational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Create and share curriculum materials and lesson plans</li>
                <li>Manage library resources and digital content</li>
                <li>Track resource usage and effectiveness</li>
                <li>Collaborate with other institutions on shared resources</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/institutions-manage-school">
                  Manage Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your institution?</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Join hundreds of educational institutions who are already using Cumpass to connect with students, manage their schools, and enhance their reputation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
            <Link href="/book-demo">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
