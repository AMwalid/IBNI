"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Info,
  BookOpen,
  UserCheck,
  Calendar,
  HeartPulse,
  CreditCard,
  Bell,
  FileText,
  GraduationCap,
  Users,
  Image,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTitle } from "@/components/ui/page-title"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Dashboard Tab Component
const DashboardTab = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string
  icon: React.ElementType
  isActive: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
      isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    <Icon className={`w-4 h-4 ${isActive ? "text-green-600" : "text-gray-400"}`} />
    {label}
  </button>
)

// Dashboard Sections
const OverviewSection = ({ studentData }: { studentData: any }) => {
  const grades = studentData.grades || {}
  const subjects = Object.keys(grades)
  const totalPoints = subjects.reduce((sum, subj) => sum + (grades[subj]?.overall || 0), 0)
  const gpa = subjects.length > 0 ? (totalPoints / subjects.length).toFixed(1) : "N/A"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 !pt-4">
          <p>
            <strong>Overall GPA:</strong> {gpa} / 10.0
          </p>
          <p>
            <strong>Current Grade Level:</strong> {studentData.gradeLevel}
          </p>
          <p>
            <strong>School:</strong> {studentData.school}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 !pt-4">
          <Button variant="link" className="p-0 h-auto justify-start">
            View Full Gradebook
          </Button>
          <br />
          <Button variant="link" className="p-0 h-auto justify-start">
            Check Upcoming Events
          </Button>
          <br />
          <Button variant="link" className="p-0 h-auto justify-start">
            View Attendance Record
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const GradebookSection = ({ grades }: { grades: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Grades (Overall)</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Overall Grade (/10)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(grades).map(([subject, data]: [string, any]) => (
              <tr key={subject} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{subject}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {data?.overall?.toFixed(1) ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">*Click subject for detailed breakdown (feature not implemented).</p>
    </CardContent>
  </Card>
)

const AttendanceSection = ({ attendance }: { attendance: any }) => {
  const { present = 0, absent = 0, excused = 0, total = 0 } = attendance || {}
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0

  // Generate mock attendance data for the current month
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  
  const mockAttendanceData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1)
    const dayOfWeek = date.getDay()
    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) return null
    
    // Generate random attendance status
    const status = Math.random()
    if (status < 0.85) return 'present'
    if (status < 0.95) return 'absent'
    return 'excused'
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-green-700">{present}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-green-200 rounded-full h-1.5">
                  <div
                    className="bg-green-600 h-1.5 rounded-full"
                    style={{ width: `${(present / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-700">{absent}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <UserCheck className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-red-200 rounded-full h-1.5">
                  <div
                    className="bg-red-600 h-1.5 rounded-full"
                    style={{ width: `${(absent / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Excused</p>
                  <p className="text-2xl font-bold text-yellow-700">{excused}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <UserCheck className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-yellow-200 rounded-full h-1.5">
                  <div
                    className="bg-yellow-600 h-1.5 rounded-full"
                    style={{ width: `${(excused / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold text-blue-700">{total}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-blue-600 font-medium">Overall: {percentage}%</p>
              </div>
            </div>
          </div>

          {/* Monthly Calendar View */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {mockAttendanceData.map((status, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    ${status === 'present' ? 'bg-green-100 text-green-800' :
                      status === 'absent' ? 'bg-red-100 text-red-800' :
                      status === 'excused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-50 text-gray-400'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300" />
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300" />
              <span className="text-sm text-gray-600">Excused</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ScheduleSection = ({ schedule }: { schedule: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Today's Class Schedule</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      {schedule && schedule.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Teacher
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No schedule available for today.</p>
      )}
    </CardContent>
  </Card>
)

const EventsSection = ({ events }: { events: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Events</CardTitle>
    </CardHeader>
    <CardContent className="!pt-4">
      {events && events.length > 0 ? (
        <ul className="space-y-3">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-3 last:border-b-0">
              <p className="font-medium flex justify-between items-center">
                {event.name}
                <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded ml-2">{event.type}</span>
              </p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No upcoming events.</p>
      )}
    </CardContent>
  </Card>
)

// Mock Data
const generateMockGrades = (subjects: string[]) => {
  const grades: Record<string, any> = {}
  subjects.forEach((subject) => {
    grades[subject] = {
      overall: Number.parseFloat((Math.random() * 3 + 7).toFixed(1)),
      assignments: [
        { name: "Assignment 1", score: Math.floor(Math.random() * 4 + 7) },
        { name: "Assignment 2", score: Math.floor(Math.random() * 4 + 7) },
        { name: "Midterm Test", score: Number.parseFloat((Math.random() * 3 + 7).toFixed(1)) },
      ],
    }
  })
  return grades
}

const commonSubjects = ["Mathematics", "Science", "English", "History", "Art"]

const mockKidsData = [
  {
    id: "kid1",
    name: "Amir Benali",
    gradeLevel: "5th Grade",
    school: "El-Hassan International School",
    personalDetails: {
      dob: "2015-03-10",
      gender: "Male",
      photoUrl: "https://placehold.co/100x100/e0f2fe/0891b2?text=AB",
    },
    attendance: {
      present: 65,
      absent: 3,
      excused: 1,
      total: 69,
    },
    grades: generateMockGrades(commonSubjects),
    schedule: [
      { time: "9:00 AM", subject: "Mathematics", teacher: "Mr. Benali" },
      { time: "10:00 AM", subject: "Science Lab", teacher: "Ms. Kazi" },
      { time: "11:00 AM", subject: "English", teacher: "Mx. Benali" },
      { time: "1:00 PM", subject: "History", teacher: "Ms. Kazi" },
      { time: "2:00 PM", subject: "Art", teacher: "Mr. Benali" },
    ],
    events: [
      { date: "2025-04-15", name: "School Science Fair", type: "School Event" },
      { date: "2025-04-22", name: "Parent-Teacher Conferences", type: "Meeting" },
      { date: "2025-05-01", name: "Field Trip to Museum", type: "Class Event" },
    ],
    health: {
      allergies: ["None"],
      medications: ["None"],
      conditions: ["None"],
      lastCheckup: "2024-12-15",
      bloodType: "O+",
      emergencyContact: {
        name: "Fatima Benali",
        relationship: "Mother",
        phone: "+213 123 456 789"
      }
    },
    billing: {
      currentBalance: 25000,
      dueDate: "2024-04-30",
      paymentHistory: [
        { date: "2024-03-01", amount: 25000, status: "Paid" },
        { date: "2024-02-01", amount: 25000, status: "Paid" },
        { date: "2024-01-01", amount: 25000, status: "Paid" }
      ],
      upcomingPayments: [
        { date: "2024-05-01", amount: 25000, description: "May Tuition" }
      ]
    },
    enrollment: {
      status: "Active",
      startDate: "2023-09-01",
      endDate: "2024-06-30",
      documents: [
        { name: "Birth Certificate", status: "Verified" },
        { name: "Previous School Records", status: "Verified" },
        { name: "Health Records", status: "Verified" }
      ],
      nextRenewal: "2024-07-01"
    },
    reports: [
      {
        term: "First Term 2023-2024",
        date: "2023-12-15",
        overallGrade: 8.5,
        comments: "Excellent progress in Mathematics and Science. Shows great potential in leadership roles.",
        teacherRemarks: "Amir is a dedicated student who actively participates in class discussions."
      },
      {
        term: "Second Term 2023-2024",
        date: "2024-03-15",
        overallGrade: 9.0,
        comments: "Outstanding performance across all subjects. Particularly strong in Mathematics.",
        teacherRemarks: "Amir has shown remarkable improvement in English and continues to excel in other subjects."
      }
    ]
  },
  {
    id: "kid2",
    name: "Layla Benali",
    gradeLevel: "Kindergarten",
    school: "El-Hassan International School",
    personalDetails: {
      dob: "2019-07-22",
      gender: "Female",
      photoUrl: "https://placehold.co/100x100/fce7f3/db2777?text=LB",
    },
    attendance: {
      present: 68,
      absent: 1,
      excused: 0,
      total: 69,
    },
    grades: {
      "Art & Crafts": { overall: 9.5 },
      "Music & Movement": { overall: 9.8 },
      "Language Development": { overall: 9.2 },
      "Social Skills": { overall: 9.7 },
      "Basic Math": { overall: 9.0 }
    },
    schedule: [
      { time: "8:30 AM", subject: "Morning Circle", teacher: "Ms. Benali" },
      { time: "9:30 AM", subject: "Art & Crafts", teacher: "Ms. Kazi" },
      { time: "10:30 AM", subject: "Snack Time", teacher: "Ms. Benali" },
      { time: "11:00 AM", subject: "Music & Movement", teacher: "Ms. Kazi" },
      { time: "12:00 PM", subject: "Lunch & Rest", teacher: "Ms. Benali" },
    ],
    events: [
      { date: "2024-04-20", name: "Spring Show", type: "School Event" },
      { date: "2024-04-22", name: "Parent-Teacher Conferences", type: "Meeting" },
      { date: "2024-05-01", name: "Field Trip to Zoo", type: "Class Event" },
    ],
    health: {
      allergies: ["None"],
      medications: ["None"],
      conditions: ["None"],
      lastCheckup: "2024-01-10",
      bloodType: "A+",
      emergencyContact: {
        name: "Ahmed Benali",
        relationship: "Father",
        phone: "+213 987 654 321"
      }
    },
    billing: {
      currentBalance: 25000,
      dueDate: "2024-04-30",
      paymentHistory: [
        { date: "2024-03-01", amount: 25000, status: "Paid" },
        { date: "2024-02-01", amount: 25000, status: "Paid" },
        { date: "2024-01-01", amount: 25000, status: "Paid" }
      ],
      upcomingPayments: [
        { date: "2024-05-01", amount: 25000, description: "May Tuition" }
      ]
    },
    enrollment: {
      status: "Active",
      startDate: "2023-09-01",
      endDate: "2024-06-30",
      documents: [
        { name: "Birth Certificate", status: "Verified" },
        { name: "Vaccination Records", status: "Verified" },
        { name: "Health Records", status: "Verified" }
      ],
      nextRenewal: "2024-07-01"
    },
    reports: [
      {
        term: "First Term 2023-2024",
        date: "2023-12-15",
        overallGrade: 9.5,
        comments: "Layla shows excellent social skills and creativity. She enjoys participating in group activities and has made many friends.",
        teacherRemarks: "Layla is a bright and cheerful student who brings joy to the classroom. She shows great enthusiasm for learning and is developing well in all areas."
      },
      {
        term: "Second Term 2023-2024",
        date: "2024-03-15",
        overallGrade: 9.8,
        comments: "Outstanding progress in language development and social skills. Shows great creativity in art and music activities.",
        teacherRemarks: "Layla continues to excel in all areas. She is particularly strong in creative activities and shows great empathy towards her classmates."
      }
    ]
  },
]

// Add Gallery Section Component
const GallerySection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Kindergarten Gallery</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            image: "https://placehold.co/400x300/e0f2fe/0891b2?text=Art+Class",
            title: "Art Class",
            date: "2024-03-15",
            description: "Creating colorful spring flowers"
          },
          {
            image: "https://placehold.co/400x300/fce7f3/db2777?text=Story+Time",
            title: "Story Time",
            date: "2024-03-14",
            description: "Reading with friends"
          },
          {
            image: "https://placehold.co/400x300/f0fdf4/15803d?text=Playground",
            title: "Playground",
            date: "2024-03-13",
            description: "Outdoor activities"
          },
          {
            image: "https://placehold.co/400x300/fef3c7/b45309?text=Music+Class",
            title: "Music Class",
            date: "2024-03-12",
            description: "Learning nursery rhymes"
          },
          {
            image: "https://placehold.co/400x300/f1f5f9/0f172a?text=Science+Day",
            title: "Science Day",
            date: "2024-03-11",
            description: "Exploring nature"
          },
          {
            image: "https://placehold.co/400x300/fdf2f8/be185d?text=Show+and+Tell",
            title: "Show and Tell",
            date: "2024-03-10",
            description: "Sharing favorite toys"
          }
        ].map((item, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
                <p className="text-xs opacity-75">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Add New Kid Form Component
const AddNewKidForm = ({ onAdd }: { onAdd: (kid: any) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    registrationKey: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to verify the registration key
    // For now, we'll just add the kid to the mock data
    const newKid = {
      id: `kid${Date.now()}`,
      name: formData.name,
      school: formData.school,
      gradeLevel: "Pending", // This would be set after verification
      personalDetails: {
        photoUrl: `https://placehold.co/100x100/cccccc/ffffff?text=${formData.name.charAt(0)}`,
      },
      // Add other required fields with default values
      attendance: { present: 0, absent: 0, excused: 0, total: 0 },
      grades: {},
      schedule: [],
      events: [],
      health: {
        allergies: ["None"],
        medications: ["None"],
        conditions: ["None"],
        bloodType: "Pending",
        emergencyContact: {
          name: "Pending",
          relationship: "Pending",
          phone: "Pending"
        }
      },
      billing: {
        currentBalance: 0,
        dueDate: new Date().toISOString(),
        paymentHistory: [],
        upcomingPayments: []
      },
      enrollment: {
        status: "Pending",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        documents: [],
        nextRenewal: new Date().toISOString()
      },
      reports: []
    }
    onAdd(newKid)
    setFormData({ name: "", school: "", registrationKey: "" })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Child
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Child</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Child's Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationKey">Registration Key</Label>
            <Input
              id="registrationKey"
              type="password"
              value={formData.registrationKey}
              onChange={(e) => setFormData({ ...formData, registrationKey: e.target.value })}
              required
            />
            <p className="text-sm text-gray-500">
              Enter the registration key provided by your school
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Child</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function TrackKidPage() {
  const [selectedKidId, setSelectedKidId] = useState(mockKidsData[0]?.id || null)
  const [activeTab, setActiveTab] = useState("overview")
  const [kids, setKids] = useState(mockKidsData)

  const selectedKidData = kids.find((kid) => kid.id === selectedKidId)

  const handleAddKid = (newKid: any) => {
    setKids([...kids, newKid])
    setSelectedKidId(newKid.id)
    setActiveTab("overview")
  }

  const handleKidChange = (value: string) => {
    setSelectedKidId(value)
    setActiveTab("overview")
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "gradebook", label: "Grades", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: UserCheck },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "health", label: "Health", icon: HeartPulse },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "events", label: "Events", icon: Bell },
    { id: "enrollment", label: "Enrollment", icon: FileText },
    { id: "reports", label: "Reports", icon: GraduationCap },
    ...(selectedKidData?.gradeLevel === "Kindergarten" ? [{ id: "gallery", label: "Gallery", icon: Image }] : []),
  ]

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <PageTitle title="Parent Dashboard" icon={Users} />
        <div className="flex items-center gap-4">
          <AddNewKidForm onAdd={handleAddKid} />
          {kids.length > 1 && (
            <div className="w-full sm:w-64">
              <label htmlFor="kid-select" className="block text-sm font-medium text-gray-700 mb-1 sr-only">
                Select Child:
              </label>
              <Select value={selectedKidId || ""} onValueChange={handleKidChange}>
                <SelectTrigger id="kid-select" aria-label="Select Child">
                  <SelectValue placeholder="Select a child..." />
                </SelectTrigger>
                <SelectContent>
                  {kids.map((kid) => (
                    <SelectItem key={kid.id} value={kid.id}>
                      {kid.name} ({kid.gradeLevel})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {!selectedKidData ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-gray-500">Please select a child to view their dashboard.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              <img
                src={selectedKidData.personalDetails.photoUrl || "/placeholder.svg"}
                alt={`${selectedKidData.name}'s profile picture`}
                className="w-16 h-16 rounded-full border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = "https://placehold.co/100x100/cccccc/ffffff?text=IMG"
                }}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedKidData.name}</h2>
                <p className="text-sm text-gray-600">
                  {selectedKidData.gradeLevel} - {selectedKidData.school}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto pb-px">
              {tabs.map((tab) => (
                <DashboardTab
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewSection studentData={selectedKidData} />}
              {activeTab === "gradebook" && <GradebookSection grades={selectedKidData.grades} />}
              {activeTab === "attendance" && <AttendanceSection attendance={selectedKidData.attendance} />}
              {activeTab === "schedule" && <ScheduleSection schedule={selectedKidData.schedule} />}
              {activeTab === "events" && <EventsSection events={selectedKidData.events} />}
              {activeTab === "health" && <HealthSection health={selectedKidData.health} />}
              {activeTab === "billing" && <BillingSection billing={selectedKidData.billing} />}
              {activeTab === "enrollment" && <EnrollmentSection enrollment={selectedKidData.enrollment} />}
              {activeTab === "reports" && <ReportsSection reports={selectedKidData.reports} />}
              {activeTab === "gallery" && <GallerySection />}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </section>
  )
}

// Update the Health Section
const HealthSection = ({ health }: { health: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Health Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Medical Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Type:</span>
                <span className="font-medium">{health.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Checkup:</span>
                <span className="font-medium">{new Date(health.lastCheckup).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {health.allergies.map((allergy: string) => (
                <span key={allergy} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Medications</h3>
            <div className="flex flex-wrap gap-2">
              {health.medications.map((med: string) => (
                <span key={med} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {med}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Emergency Contact</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{health.emergencyContact.name}</p>
              <p className="text-sm text-gray-600">{health.emergencyContact.relationship}</p>
              <p className="text-sm text-gray-600">{health.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Update the Billing Section
const BillingSection = ({ billing }: { billing: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Billing Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Balance</h3>
            <p className="text-2xl font-bold text-blue-700">{billing.currentBalance.toLocaleString()} DZD</p>
            <p className="text-sm text-gray-600">Due by {new Date(billing.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming Payments</h3>
            <div className="space-y-2">
              {billing.upcomingPayments.map((payment: any) => (
                <div key={payment.date} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-600">Due {new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                  <span className="font-medium">{payment.amount.toLocaleString()} DZD</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Payment History</h3>
          <div className="space-y-2">
            {billing.paymentHistory.map((payment: any) => (
              <div key={payment.date} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{new Date(payment.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{payment.status}</p>
                </div>
                <span className="font-medium">{payment.amount.toLocaleString()} DZD</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Update the Enrollment Section
const EnrollmentSection = ({ enrollment }: { enrollment: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Enrollment Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Enrollment Status</h3>
            <p className="text-2xl font-bold text-green-700">{enrollment.status}</p>
            <p className="text-sm text-gray-600">
              {new Date(enrollment.startDate).toLocaleDateString()} - {new Date(enrollment.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Renewal</h3>
            <p className="text-lg font-medium">{new Date(enrollment.nextRenewal).toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Required Documents</h3>
          <div className="space-y-2">
            {enrollment.documents.map((doc: any) => (
              <div key={doc.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{doc.name}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Update the Reports Section
const ReportsSection = ({ reports }: { reports: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Report Cards</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {reports.map((report) => (
        <div key={report.term} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{report.term}</h3>
              <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Overall Grade: {report.overallGrade}/10
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Comments</h4>
              <p className="text-gray-700">{report.comments}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Teacher Remarks</h4>
              <p className="text-gray-700">{report.teacherRemarks}</p>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)
