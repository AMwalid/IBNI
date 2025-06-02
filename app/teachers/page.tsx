import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, School, Users } from "lucide-react"
import Link from "next/link"

export default function TeachersPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">How Cumpass Helps Teachers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enhance your teaching career with Cumpass. Connect with students, manage your classes, and showcase your expertise all in one place.
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
              <CardDescription>Reach students who need your expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create a professional profile to showcase your expertise and connect with students who are looking for teachers like you.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Manage Your Classes</CardTitle>
              <CardDescription>Streamline your teaching workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Organize your classes, track student progress, and manage assignments all in one place to save time and improve efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Grow Your Career</CardTitle>
              <CardDescription>Expand your teaching opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with schools, institutions, and students to expand your teaching opportunities and grow your professional network.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features for Teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <CardTitle>Professional Profile</CardTitle>
              </div>
              <CardDescription>Showcase your expertise and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Create a detailed profile highlighting your qualifications and teaching style</li>
                <li>Showcase your expertise in specific subjects and grade levels</li>
                <li>Display testimonials from students and parents</li>
                <li>Highlight your teaching achievements and certifications</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/teachers-profile">
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
                <CardTitle>Class Management</CardTitle>
              </div>
              <CardDescription>Organize and manage your classes efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Create and manage class schedules and rosters</li>
                <li>Track student attendance and participation</li>
                <li>Assign and grade homework and assessments</li>
                <li>Generate progress reports and analytics</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/teachers-manage-classes">
                  Manage Classes <ArrowRight className="ml-2 h-4 w-4" />
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
                <CardTitle>Resource Sharing</CardTitle>
              </div>
              <CardDescription>Share educational resources with your students</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Upload and share lesson plans, worksheets, and study materials</li>
                <li>Create and assign online quizzes and assessments</li>
                <li>Provide feedback on student work</li>
                <li>Recommend educational apps and tools</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/teachers-manage-classes">
                  Share Resources <ArrowRight className="ml-2 h-4 w-4" />
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
                <CardTitle>Professional Development</CardTitle>
              </div>
              <CardDescription>Grow your teaching skills and career</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Access professional development courses and workshops</li>
                <li>Connect with other teachers and share best practices</li>
                <li>Find job opportunities at schools and institutions</li>
                <li>Stay updated with the latest teaching trends and methodologies</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/teachers-profile">
                  Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to enhance your teaching career?</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of teachers who are already using Cumpass to connect with students, manage their classes, and grow their careers.
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
