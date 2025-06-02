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
  Trophy,
  Target,
  BarChart3,
  Award,
  BookMarked,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTitle } from "@/components/ui/page-title"
import { Progress } from "@/components/ui/progress"

// Update DashboardTab Component for better mobile layout
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
    className={`flex items-center gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 ease-in-out whitespace-nowrap ${
      isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    <Icon className={`w-4 h-4 ${isActive ? "text-green-600" : "text-gray-400"}`} />
    {label}
  </button>
)

// Update Overview Section for better mobile layout
const OverviewSection = ({ progressData }: { progressData: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <Card className="w-full">
      <CardHeader className="px-4 py-4 md:px-6 md:py-5">
        <CardTitle className="text-lg md:text-xl">Academic Progress</CardTitle>
        <p className="text-sm text-gray-500 mt-1">Track your overall academic performance and attendance</p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <div>
              <span className="text-sm font-medium">Overall GPA</span>
              <p className="text-xs text-gray-500">Based on all subjects</p>
            </div>
            <span className="text-sm font-medium mt-1 sm:mt-0">{progressData.overallGPA}/10.0</span>
          </div>
          <Progress value={progressData.overallGPA * 10} className="h-2" />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <div>
              <span className="text-sm font-medium">Attendance Rate</span>
              <p className="text-xs text-gray-500">Current semester attendance</p>
            </div>
            <span className="text-sm font-medium mt-1 sm:mt-0">{progressData.attendanceRate}%</span>
          </div>
          <Progress value={progressData.attendanceRate} className="h-2" />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <div>
              <span className="text-sm font-medium">Assignment Completion</span>
              <p className="text-xs text-gray-500">All subjects combined</p>
            </div>
            <span className="text-sm font-medium mt-1 sm:mt-0">{progressData.assignmentCompletion}%</span>
          </div>
          <Progress value={progressData.assignmentCompletion} className="h-2" />
        </div>
      </CardContent>
    </Card>

    <Card className="w-full">
      <CardHeader className="px-4 py-4 md:px-6 md:py-5">
        <CardTitle className="text-lg md:text-xl">Recent Achievements</CardTitle>
        <p className="text-sm text-gray-500 mt-1">Your latest accomplishments and recognitions</p>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6">
        {progressData.achievements.map((achievement: any, index: number) => (
          <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-green-100 rounded-full shrink-0">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{achievement.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {new Date(achievement.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
)

// Update Goals Section for better mobile layout
const GoalsSection = ({ goals }: { goals: any[] }) => (
  <Card className="w-full">
    <CardHeader className="px-4 py-4 md:px-6 md:py-5">
      <CardTitle className="text-lg md:text-xl">Academic Goals</CardTitle>
      <p className="text-sm text-gray-500 mt-1">Track your progress towards your academic objectives</p>
    </CardHeader>
    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
      {goals.map((goal, index) => (
        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg">{goal.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
              goal.status === "Completed" ? "bg-green-100 text-green-800" :
              goal.status === "In Progress" ? "bg-blue-100 text-blue-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {goal.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

// Update Performance Section for better mobile layout
const PerformanceSection = ({ performance }: { performance: any }) => (
  <Card className="w-full">
    <CardHeader className="px-4 py-4 md:px-6 md:py-5">
      <CardTitle className="text-lg md:text-xl">Subject Performance</CardTitle>
      <p className="text-sm text-gray-500 mt-1">Detailed breakdown of your performance in each subject</p>
    </CardHeader>
    <CardContent className="space-y-6 md:space-y-8 px-4 md:px-6">
      {Object.entries(performance).map(([subject, data]: [string, any]) => (
        <div key={subject} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h3 className="font-medium text-base md:text-lg">{subject}</h3>
              <p className="text-sm text-gray-500">Current semester performance</p>
            </div>
            <div className="text-right">
              <span className="text-base md:text-lg font-semibold">{data.grade}/10</span>
              <p className="text-xs text-gray-500">Overall Grade</p>
            </div>
          </div>
          <Progress value={data.grade * 10} className="h-2" />
          <div className="grid grid-cols-3 gap-2 md:gap-3 text-sm">
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-base md:text-lg">{data.assignments}</p>
              <p className="text-gray-500">Assignments</p>
              <p className="text-xs text-gray-400 mt-1">Completed</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-base md:text-lg">{data.tests}</p>
              <p className="text-gray-500">Tests</p>
              <p className="text-xs text-gray-400 mt-1">Taken</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-base md:text-lg">{data.participation}%</p>
              <p className="text-gray-500">Participation</p>
              <p className="text-xs text-gray-400 mt-1">Class Activity</p>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

// Update Assignments Section for better mobile layout
const AssignmentsSection = ({ assignments }: { assignments: any[] }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5" />
      case 'pending':
        return <Clock className="h-5 w-5" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-4 md:px-6 md:py-5">
        <CardTitle className="text-lg md:text-xl">Assignments</CardTitle>
        <p className="text-sm text-gray-500 mt-1">Track your assignments and their submission status</p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        {assignments.map((assignment, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-base md:text-lg">{assignment.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Subject:</span>
                    <span className="text-sm font-medium">{assignment.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Teacher:</span>
                    <span className="text-sm font-medium">{assignment.teacher}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                  {assignment.status}
                </span>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium">
                    Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  {assignment.submittedDate && (
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(assignment.submittedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <p className="font-medium">{assignment.grade || 'Not Graded'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium">{assignment.weight}%</p>
                  </div>
                </div>
                {assignment.status === 'pending' && (
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Submit Assignment
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Update mock data to include assignments
const mockProgressData = {
  overallGPA: 8.5,
  attendanceRate: 95,
  assignmentCompletion: 88,
  achievements: [
    {
      title: "Perfect Attendance - March",
      date: "2024-03-31"
    },
    {
      title: "Top Performer - Mathematics",
      date: "2024-03-15"
    },
    {
      title: "Science Project Excellence",
      date: "2024-02-28"
    }
  ],
  goals: [
    {
      title: "Improve Mathematics Grade",
      description: "Achieve a grade of 9.0 or higher in Mathematics",
      status: "In Progress",
      progress: 75
    },
    {
      title: "Complete All Assignments",
      description: "Submit all assignments on time",
      status: "In Progress",
      progress: 90
    },
    {
      title: "Participate in Science Fair",
      description: "Prepare and present a science project",
      status: "Completed",
      progress: 100
    }
  ],
  performance: {
    Mathematics: {
      grade: 8.5,
      assignments: 12,
      tests: 3,
      participation: 85
    },
    Science: {
      grade: 9.0,
      assignments: 10,
      tests: 2,
      participation: 90
    },
    English: {
      grade: 8.8,
      assignments: 15,
      tests: 4,
      participation: 88
    },
    History: {
      grade: 8.2,
      assignments: 8,
      tests: 2,
      participation: 82
    }
  },
  assignments: [
    {
      title: "Mathematics Problem Set 5",
      description: "Complete exercises on quadratic equations and functions",
      subject: "Mathematics",
      teacher: "Mr. Benali",
      status: "pending",
      dueDate: "2024-04-15",
      weight: 15,
      grade: null
    },
    {
      title: "Science Lab Report",
      description: "Write a detailed report on the chemical reactions experiment",
      subject: "Science",
      teacher: "Ms. Kazi",
      status: "completed",
      dueDate: "2024-04-10",
      submittedDate: "2024-04-09",
      weight: 20,
      grade: "9.5/10"
    },
    {
      title: "English Literature Essay",
      description: "Analyze the themes in the assigned novel",
      subject: "English",
      teacher: "Mr. Benali",
      status: "overdue",
      dueDate: "2024-04-05",
      weight: 25,
      grade: null
    },
    {
      title: "History Research Project",
      description: "Research and present on a historical event",
      subject: "History",
      teacher: "Ms. Kazi",
      status: "pending",
      dueDate: "2024-04-20",
      weight: 30,
      grade: null
    }
  ]
}

export default function TrackProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "goals", label: "Goals", icon: Target },
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "courses", label: "Courses", icon: BookMarked },
  ]

  return (
    <section className="max-w-7xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <div>
          <PageTitle title="Track My Progress" icon={Users} />
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm md:text-base">Monitor your academic performance and achievements</p>
        </div>
      </div>

      <div className="mb-4 sm:mb-6 md:mb-8 border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto pb-px scrollbar-hide -mx-3 px-3">
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
          className="space-y-4 sm:space-y-6"
        >
          {activeTab === "overview" && <OverviewSection progressData={mockProgressData} />}
          {activeTab === "assignments" && <AssignmentsSection assignments={mockProgressData.assignments} />}
          {activeTab === "goals" && <GoalsSection goals={mockProgressData.goals} />}
          {activeTab === "performance" && <PerformanceSection performance={mockProgressData.performance} />}
          {activeTab === "achievements" && (
            <Card className="w-full">
              <CardHeader className="px-4 py-4 md:px-6 md:py-5">
                <CardTitle className="text-lg md:text-xl">Achievements & Certificates</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Your academic accomplishments and recognitions</p>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockProgressData.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full shrink-0">
                          <Trophy className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-base md:text-lg truncate">{achievement.title}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {new Date(achievement.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === "courses" && (
            <Card className="w-full">
              <CardHeader className="px-4 py-4 md:px-6 md:py-5">
                <CardTitle className="text-lg md:text-xl">Current Courses</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Overview of your current academic courses</p>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(mockProgressData.performance).map(([subject, data]: [string, any]) => (
                    <div key={subject} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h3 className="font-semibold text-base md:text-lg mb-3">{subject}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Grade</span>
                          <span className="font-medium">{data.grade}/10</span>
                        </div>
                        <Progress value={data.grade * 10} className="h-2" />
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium text-base md:text-lg">{data.assignments}</p>
                            <p className="text-gray-500">Assignments</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium text-base md:text-lg">{data.tests}</p>
                            <p className="text-gray-500">Tests</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium text-base md:text-lg">{data.participation}%</p>
                            <p className="text-gray-500">Participation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
