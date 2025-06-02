"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  BookOpen,
  Users,
  Package,
  ShoppingBag,
  Bell,
  ChevronRight,
  Clock,
  Calendar,
  MessageSquare,
  UserPlus,
  CreditCard,
  Settings,
  GraduationCap,
  School,
  Edit,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface ManageSchoolDashboardProps {
  navigateTo?: (page: string) => void
}

export default function ManageSchoolDashboard({ navigateTo }: ManageSchoolDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data (same as original)
  // ... (keep all mock data definitions the same)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header with School Info */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Cumpass International School</h1>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit School
              </Button>
            </div>
            <p className="text-gray-500">Academic Year 2023-2024</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
              <Bell className="w-4 h-4" />
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.unreadMessages}
              </span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">School Settings</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <h3 className="text-xl md:text-2xl font-bold">{stats.totalStudents}</h3>
              </div>
            </div>
          </Card>
          {/* Other stat cards with green color scheme */}
          {/* ... (update other stat cards similarly) */}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 bg-transparent h-auto p-0">
            {[
              { value: "overview", label: "Overview" },
              { value: "messages", label: "Messages" },
              { value: "enrollments", label: "Enrollments" },
              { value: "payments", label: "Payments" },
              { value: "calendar", label: "Calendar" },
              { value: "settings", label: "Settings" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Gender Distribution */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Students by Gender</h3>
                {/* ... (update chart colors to green) */}
              </Card>

              {/* Attendance Chart */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
                <div className="h-48 flex items-end justify-between gap-1 md:gap-2">
                  {stats.attendance.map((value, index) => (
                    <div key={index} className="w-6 md:w-8 bg-green-100 rounded-t-lg relative">
                      <div
                        className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all duration-300"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                {/* ... (rest of attendance chart) */}
              </Card>
            </div>

            {/* Notice Board */}
            <Card className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Notice Board</h3>
                <Button variant="ghost" className="text-green-600">
                  View All
                </Button>
              </div>
              <div className="space-y-2 md:space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    {/* ... (rest of notice item) */}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Other tabs content with green color scheme */}
          {/* ... (update all tabs content similarly) */}
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold">School Settings</h3>
                <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">Save Changes</Button>
              </div>
              {/* ... (rest of settings content) */}
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
