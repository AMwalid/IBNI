"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BookOpen, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash
} from "lucide-react"

export default function InstitutionsManageSchoolPage() {
  const [activeTab, setActiveTab] = useState("classes")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock data (same as original)
  const classes = [
    { id: 1, name: "Mathematics 101", teacher: "Dr. Smith", students: 25, schedule: "Mon, Wed, Fri 9:00 AM" },
    { id: 2, name: "English Literature", teacher: "Prof. Johnson", students: 30, schedule: "Tue, Thu 10:30 AM" },
    { id: 3, name: "Physics", teacher: "Dr. Williams", students: 22, schedule: "Mon, Wed 2:00 PM" },
    { id: 4, name: "History", teacher: "Prof. Brown", students: 28, schedule: "Tue, Thu 1:00 PM" },
    { id: 5, name: "Computer Science", teacher: "Dr. Davis", students: 20, schedule: "Fri 11:00 AM" },
  ]
  
  const teachers = [
    { id: 1, name: "Dr. Smith", subject: "Mathematics", classes: 3, status: "Active" },
    { id: 2, name: "Prof. Johnson", subject: "English", classes: 2, status: "Active" },
    { id: 3, name: "Dr. Williams", subject: "Physics", classes: 2, status: "Active" },
    { id: 4, name: "Prof. Brown", subject: "History", classes: 2, status: "Active" },
    { id: 5, name: "Dr. Davis", subject: "Computer Science", classes: 1, status: "Active" },
  ]
  
  const resources = [
    { id: 1, name: "Mathematics Textbook", type: "Book", subject: "Mathematics", quantity: 50 },
    { id: 2, name: "English Literature Anthology", type: "Book", subject: "English", quantity: 45 },
    { id: 3, name: "Physics Lab Kit", type: "Equipment", subject: "Physics", quantity: 15 },
    { id: 4, name: "History Timeline", type: "Visual Aid", subject: "History", quantity: 5 },
    { id: 5, name: "Computer Science Software License", type: "Software", subject: "Computer Science", quantity: 30 },
  ]
  
  // Filter functions (same as original)
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Manage School</h1>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex overflow-x-auto pb-2">
            {[
              { value: "classes", icon: <BookOpen />, label: "Classes" },
              { value: "teachers", icon: <Users />, label: "Teachers" },
              { value: "resources", icon: <BookOpen />, label: "Resources" },
              { value: "settings", icon: <Settings />, label: "Settings" },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className="flex-1 sm:flex-none min-w-[120px] flex items-center justify-center px-4 py-2"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card className="mt-4">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">School Classes</h2>
                  <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Class
                  </Button>
                </div>
                
                <div className="overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Class Name", "Teacher", "Students", "Schedule", "Actions"].map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredClasses.map((cls) => (
                        <tr key={cls.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">{cls.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{cls.teacher}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{cls.students}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{cls.schedule}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <Card className="mt-4">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">School Teachers</h2>
                  <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Teacher
                  </Button>
                </div>
                
                <div className="overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Teacher Name", "Subject", "Classes", "Status", "Actions"].map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredTeachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">{teacher.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{teacher.subject}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{teacher.classes}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {teacher.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card className="mt-4">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">School Resources</h2>
                  <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Resource
                  </Button>
                </div>
                
                <div className="overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Resource Name", "Type", "Subject", "Quantity", "Actions"].map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredResources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">{resource.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{resource.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{resource.subject}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{resource.quantity}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="mt-4">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">School Settings</h2>
                  <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Settings
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Section title="Academic Information">
                      <InfoItem label="Academic Year" value="2023-2024" />
                      <InfoItem label="Semester Start Date" value="August 15, 2023" />
                      <InfoItem label="Semester End Date" value="December 15, 2023" />
                      <InfoItem label="Grading System" value="Letter Grades (A-F)" />
                    </Section>
                  </div>
                  
                  <div className="space-y-6">
                    <Section title="School Policies">
                      <InfoItem 
                        label="Attendance Policy" 
                        value="Students must attend at least 80% of classes" 
                      />
                      <InfoItem 
                        label="Uniform Policy" 
                        value="School uniform required Monday-Thursday, casual Friday" 
                      />
                      <InfoItem label="School Hours" value="8:00 AM - 3:30 PM" />
                      <InfoItem label="Lunch Break" value="12:00 PM - 1:00 PM" />
                    </Section>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

// Helper components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-green-700 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-green-700 mb-1">{label}</label>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  )
}
