import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, School, Search, UserCheck } from "lucide-react"
import Link from "next/link"

export default function ParentsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">How Cumpass Helps Parents</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empower your child's educational journey with Cumpass. Find the best schools, connect with qualified teachers, and track your child's progress all in one place.
        </p>
      </section>

      {/* Value Proposition */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Quality Education</CardTitle>
              <CardDescription>Find the best educational institutions for your child</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access comprehensive information about schools, their programs, and performance metrics to make informed decisions about your child's education.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Expert Teachers</CardTitle>
              <CardDescription>Connect with qualified and experienced educators</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse profiles of teachers, view their qualifications, and find the perfect match for your child's learning needs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your child's academic journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track your child's progress, view grades, attendance, and performance metrics in real-time to support their learning journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features for Parents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Search className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Find Schools</CardTitle>
              </div>
              <CardDescription>Discover the perfect educational institution for your child</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Browse schools by location, curriculum, and special programs</li>
                <li>Compare schools based on performance metrics and reviews</li>
                <li>View detailed information about facilities and extracurricular activities</li>
                <li>Schedule school visits and interviews</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/find-resources?tab=schools">
                  Find Schools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Find Teachers</CardTitle>
              </div>
              <CardDescription>Connect with qualified educators for your child</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Search teachers by subject, experience, and teaching style</li>
                <li>View teacher profiles with qualifications and reviews</li>
                <li>Book one-on-one sessions or group classes</li>
                <li>Track your child's progress with specific teachers</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/find-resources?tab=teachers">
                  Find Teachers <ArrowRight className="ml-2 h-4 w-4" />
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
                <CardTitle>Track Kid Progress</CardTitle>
              </div>
              <CardDescription>Monitor your child's academic journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>View real-time grades and attendance records</li>
                <li>Track progress across different subjects and skills</li>
                <li>Receive notifications about important events and deadlines</li>
                <li>Communicate with teachers about your child's performance</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/parents-track-kid">
                  Track Progress <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <School className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Educational Resources</CardTitle>
              </div>
              <CardDescription>Access learning materials and courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Browse curated educational content for different age groups</li>
                <li>Access online courses and learning materials</li>
                <li>Find educational apps and tools recommended by teachers</li>
                <li>Track your child's engagement with learning resources</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/parents-my-courses">
                  View Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to enhance your child's education?</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of parents who are already using Cumpass to find the best educational resources for their children.
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
