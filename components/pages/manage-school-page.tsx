"use client"

import type React from "react"
import { useState, useContext, createContext, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Building,
  Users,
  BookOpen,
  Calendar,
  BarChart,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  FileText,
  User,
  GraduationCap,
  Settings,
  Bell,
  Edit,
  Trash2,
  Eye,
  LogOut,
  HelpCircle,
  LayoutDashboard,
  ShoppingBag,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  X,
  Upload,
  School,
  Briefcase,
} from "lucide-react"

import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { FileUpload } from "@/components/ui/file-upload"
import { RepeatableField } from "@/components/ui/repeatable-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// --- Import shadcn/ui components ---
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// --- Sidebar Components ---
const SidebarContext = createContext<{ activeView: string; setActiveView: (view: string) => void } | null>(null)

const Sidebar = ({
  children,
  activeView,
  setActiveView,
}: { children: React.ReactNode; activeView: string; setActiveView: (view: string) => void }) => {
  return (
    <SidebarContext.Provider value={{ activeView, setActiveView }}>
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col shadow-sm flex-shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600 flex items-center">
            <Building className="mr-2 h-7 w-7" /> School OS
          </h1>
          <p className="text-xs text-slate-500 mt-1">School Administration Dashboard</p>
        </div>
        <nav className="flex-grow space-y-1.5">{children}</nav>
        <div className="mt-auto pt-4 border-t border-slate-200 space-y-1.5">
          <SidebarItem icon={Settings} label="Settings" viewId="settings" />
          <SidebarItem icon={HelpCircle} label="Help & Support" viewId="help" />
          <SidebarItem icon={LogOut} label="Logout" viewId="logout" isAction />
        </div>
      </aside>
    </SidebarContext.Provider>
  )
}

const SidebarItem = ({
  icon: Icon,
  label,
  viewId,
  isAction,
  className,
}: {
  icon: React.ElementType;
  label: string;
  viewId: string;
  isAction?: boolean;
  className?: string;
}) => {
  const context = useContext(SidebarContext)
  const router = useRouter()

  if (!context) return null
  const { activeView, setActiveView } = context
  const isActive = !isAction && activeView === viewId

  const handleClick = () => {
    if (isAction) {
      console.log(`Action: ${label}`)
      if (viewId === "logout") alert("Logout action triggered!") // Placeholder
    } else if (viewId === "store") {
      // Navigate to store page
      router.push("/store")
    } else {
      setActiveView(viewId)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? "bg-green-50 text-green-700 font-medium"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      } ${className || ""}`}
    >
      <Icon className={`h-5 w-5 ${isActive ? "text-green-600" : "text-slate-500"}`} />
      <span>{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />}
    </button>
  )
}

// --- PageTitle Component ---
const PageTitle = ({ title, icon: Icon, actions }: { title: string; icon: React.ElementType; actions?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      <div className="flex items-center space-x-3">
        <Icon className="w-8 h-8 text-green-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}

// StatCard Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: { title: string; value: string; icon: React.ElementType; color: string }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`w-5 h-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  )
}

// TeacherCard (Uses Revised Dropdown)
const TeacherCard = ({ teacher }: { teacher: any }) => {
  const currentTeacher = {
    name: "Unknown Teacher",
    subject: "N/A",
    avatar: null,
    classes: 0,
    students: 0,
    rating: 0,
    ...teacher,
  }
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="pb-2 bg-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={
                currentTeacher.avatar ||
                `https://placehold.co/40x40/E2E8F0/4A5568?text=${currentTeacher.name.substring(0, 1)}`
              }
              alt={`${currentTeacher.name}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = `https://placehold.co/40x40/E2E8F0/4A5568?text=${currentTeacher.name.substring(0, 1)}`
              }}
            />
            <div>
              <CardTitle className="text-base font-semibold text-gray-800">{currentTeacher.name}</CardTitle>
              <p className="text-sm text-gray-500">{currentTeacher.subject}</p>
            </div>
          </div>
          <DropdownMenu>
            {/* The Button component is now wrapped by DropdownMenuTrigger's button */}
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open teacher menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Teacher Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Edit Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Manage Classes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                <Users className="mr-2 h-4 w-4" />
                <span>Remove Teacher</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-4 flex-grow">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="text-center p-2 bg-green-50 rounded-md">
            <p className="text-xs text-green-700 font-medium uppercase tracking-wider">Classes</p>
            <p className="font-bold text-green-900 text-lg">{currentTeacher.classes}</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700 font-medium uppercase tracking-wider">Students</p>
            <p className="font-bold text-blue-900 text-lg">{currentTeacher.students}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Rating</span>
            <span className="font-medium text-amber-600">{currentTeacher.rating.toFixed(1)} / 5.0</span>
          </div>
          <Progress value={(currentTeacher.rating / 5) * 100} className="h-2 [&>div]:bg-amber-500" />
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <Button variant="outline" size="sm" className="w-full">
          View Full Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

// ClassRow Component (Uses Revised Dropdown)
const ClassRow = ({ classData }: { classData: any }) => {
  const currentClass = {
    name: "Unknown Class",
    grade: "N/A",
    teacher: "Unassigned",
    students: 0,
    capacity: 0,
    schedule: "Not Set",
    status: "Unknown",
    ...classData,
  }
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "upcoming":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "outline"
    }
  }
  const getBadgeColors = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 border-b last:border-b-0">
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
        <div>
          <p className="font-medium text-gray-900 text-sm md:text-base">{currentClass.name}</p>
          <p className="text-xs text-gray-500">{currentClass.grade}</p>
        </div>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-600">{currentClass.teacher}</td>
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-600">
        {currentClass.students}/{currentClass.capacity}
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
        {currentClass.schedule}
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">
        <Badge variant={getBadgeVariant(currentClass.status)} className={getBadgeColors(currentClass.status)}>
          {currentClass.status}
        </Badge>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
        <DropdownMenu>
          {/* The Button component is now wrapped by DropdownMenuTrigger's button */}
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 data-[state=open]:bg-gray-100"
            >
              Actions <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Class Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Class</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Students</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Update Schedule</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Class</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

// --- Main Component (Set as Default Export) ---
const SchoolDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data (same as original)
  const teachers = [
    {
      id: 1,
      name: "Alice Smith",
      subject: "Mathematics",
      classes: 5,
      students: 120,
      rating: 4.8,
      avatar: "https://placehold.co/40x40/a0aec0/ffffff?text=AS",
    },
    {
      id: 2,
      name: "Bob Johnson",
      subject: "Physics",
      classes: 4,
      students: 95,
      rating: 4.5,
      avatar: "https://placehold.co/40x40/9ae6b4/ffffff?text=BJ",
    },
    { id: 3, name: "Charlie Brown", subject: "English", classes: 6, students: 150, rating: 4.9, avatar: null },
    {
      id: 4,
      name: "Diana Prince",
      subject: "History",
      classes: 3,
      students: 80,
      rating: 4.2,
      avatar: "https://placehold.co/40x40/fbd38d/ffffff?text=DP",
    },
  ]
  const classes = [
    {
      id: 101,
      name: "Algebra I",
      grade: "9th Grade",
      teacher: "Alice Smith",
      students: 28,
      capacity: 30,
      schedule: "Mon/Wed/Fri 9:00 AM",
      status: "Active",
    },
    {
      id: 102,
      name: "World History",
      grade: "10th Grade",
      teacher: "Diana Prince",
      students: 22,
      capacity: 25,
      schedule: "Tue/Thu 1:00 PM",
      status: "Active",
    },
    {
      id: 103,
      name: "Introduction to Physics",
      grade: "11th Grade",
      teacher: "Bob Johnson",
      students: 30,
      capacity: 30,
      schedule: "Mon/Wed 11:00 AM",
      status: "Upcoming",
    },
    {
      id: 104,
      name: "Literature",
      grade: "9th Grade",
      teacher: "Charlie Brown",
      students: 18,
      capacity: 25,
      schedule: "Tue/Thu 10:00 AM",
      status: "Active",
    },
    {
      id: 105,
      name: "Calculus",
      grade: "12th Grade",
      teacher: "Alice Smith",
      students: 15,
      capacity: 20,
      schedule: "Mon/Wed/Fri 1:00 PM",
      status: "Upcoming",
    },
  ]

  // Function to render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <PageTitle title="Dashboard Overview" icon={LayoutDashboard} />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <StatCard title="Total Students" value="1,234" icon={Users} color="text-blue-600" />
              <StatCard title="Total Teachers" value="56" icon={GraduationCap} color="text-purple-600" />
              <StatCard title="Active Classes" value="89" icon={BookOpen} color="text-green-600" />
              <StatCard title="Upcoming Events" value="12" icon={Calendar} color="text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Activity feed and notifications would go here.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Charts and performance metrics would go here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "school-profile":
        return (
          <div className="space-y-6">
            <PageTitle
              title="School Profile"
              icon={Building}
              actions={
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => alert("Changes discarded")}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={() => alert("Profile saved successfully")}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - School Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>School Logo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      value={null}
                      onChange={() => {}}
                      previewUrl="https://placehold.co/200x200/e0f2fe/0891b2?text=IBNI"
                      accept="image/*"
                      maxSize={2 * 1024 * 1024}
                      buttonText="Upload Logo"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>School Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input id="schoolName" defaultValue="IBNI International School" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolType">School Type</Label>
                      <Input id="schoolType" defaultValue="International Baccalaureate" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foundingYear">Founding Year</Label>
                      <Input id="foundingYear" type="number" defaultValue="1995" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accreditations">Accreditations</Label>
                      <Input id="accreditations" defaultValue="IB, WASC, CIS" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                        <Input id="email" type="email" defaultValue="info@ibni.edu" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                        <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-slate-400" />
                        <Input id="website" type="url" defaultValue="https://ibni.edu" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Additional Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>School Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      value="IBNI International School is a premier educational institution dedicated to providing a world-class education that prepares students for global citizenship and academic excellence.\n\nFounded in 1995, our school offers the International Baccalaureate curriculum from primary years through diploma program, with a focus on developing inquiring, knowledgeable, and caring young people."
                      onChange={() => {}}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input id="street" defaultValue="123 Education Avenue" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Learningville" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" defaultValue="Knowledge State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Postal/Zip Code</Label>
                        <Input id="zip" defaultValue="12345" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="United States" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Facilities & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="library" defaultChecked />
                        <Label htmlFor="library">Library</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="scienceLab" defaultChecked />
                        <Label htmlFor="scienceLab">Science Labs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="computerLab" defaultChecked />
                        <Label htmlFor="computerLab">Computer Labs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auditorium" defaultChecked />
                        <Label htmlFor="auditorium">Auditorium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sportsField" defaultChecked />
                        <Label htmlFor="sportsField">Sports Fields</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cafeteria" defaultChecked />
                        <Label htmlFor="cafeteria">Cafeteria</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="artStudio" defaultChecked />
                        <Label htmlFor="artStudio">Art Studio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="musicRoom" defaultChecked />
                        <Label htmlFor="musicRoom">Music Room</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="relative aspect-video bg-slate-100 rounded-md overflow-hidden">
                        <img
                          src="https://placehold.co/300x200/e0f2fe/0891b2?text=Campus"
                          alt="Campus"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="relative aspect-video bg-slate-100 rounded-md overflow-hidden">
                        <img
                          src="https://placehold.co/300x200/e0f2fe/0891b2?text=Library"
                          alt="Library"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="relative aspect-video bg-slate-100 rounded-md overflow-hidden">
                        <img
                          src="https://placehold.co/300x200/e0f2fe/0891b2?text=Sports"
                          alt="Sports"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <FileUpload
                      value={null}
                      onChange={() => {}}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                      buttonText="Add Photo"
                      dropzoneText="or drag and drop images"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => alert("Changes discarded")}>Cancel</Button>
              <Button onClick={() => alert("Profile saved successfully")}>Save Changes</Button>
            </div>
          </div>
        )
      case "teachers":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Manage Teachers"
              icon={GraduationCap}
              actions={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Teacher
                </Button>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        )
      case "students":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Student Directory"
              icon={Users}
              actions={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Student
                </Button>
              }
            />
            <Card>
              <CardContent className="p-6">
                <p>Student list, search, and management tools go here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "classes":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Class Schedule"
              icon={BookOpen}
              actions={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Class
                </Button>
              }
            />
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Class / Grade
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Teacher
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Enrollment
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                        >
                          Schedule
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-4 md:px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {classes.map((cls) => (
                        <ClassRow key={cls.id} classData={cls} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "reports":
        return (
          <div className="space-y-6">
            <PageTitle title="Generate Reports" icon={FileText} />
            <Card>
              <CardContent className="p-6">
                <p>Reporting tools and download options go here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "courses":
        return (
          <div className="space-y-6">
            <PageTitle
              title="School Courses"
              icon={Briefcase}
              actions={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add New Course
                </Button>
              }
            />
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Manage your school's courses, assign instructors, and track enrollment.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Course Title
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Instructor
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Schedule
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Enrollment
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-4 md:px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">Advanced Mathematics</p>
                            <p className="text-xs text-gray-500">Grade 11-12</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Alice Smith
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Mon/Wed/Fri 10:00 AM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          24/30
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Course</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Course</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">World Literature</p>
                            <p className="text-xs text-gray-500">Grade 10</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Charlie Brown
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Tue/Thu 1:00 PM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          18/25
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Course</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Course</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">Introduction to Chemistry</p>
                            <p className="text-xs text-gray-500">Grade 9</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Bob Johnson
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Mon/Wed 2:00 PM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          28/30
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Course</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Course</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "services":
        return (
          <div className="space-y-6">
            <PageTitle
              title="School Services"
              icon={Calendar}
              actions={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add New Service
                </Button>
              }
            />
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Manage your school's services, including tutoring, counseling, and extracurricular activities.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Service Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Provider
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Schedule
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-4 md:px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">Math Tutoring</p>
                            <p className="text-xs text-gray-500">Individual & Group</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Alice Smith
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Mon-Fri 3:00-5:00 PM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Learning Center
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Service Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Service</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Service</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">College Counseling</p>
                            <p className="text-xs text-gray-500">By Appointment</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Diana Prince
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Tue/Thu 9:00 AM-4:00 PM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Guidance Office
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Service Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Service</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Service</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">Robotics Club</p>
                            <p className="text-xs text-gray-500">Extracurricular</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Bob Johnson
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Wed 3:30-5:30 PM
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          Science Lab
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-blue-100 text-blue-800">Enrolling</Badge>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Service Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Service</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Service</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <PageTitle title="School Settings" icon={Settings} />
            <Card>
              <CardContent className="p-6">
                <p>School settings and configuration options would go here.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "help":
        return (
          <div className="space-y-6">
            <PageTitle title="Help & Support" icon={HelpCircle} />
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700">How do I add a new teacher?</h4>
                  <p className="text-sm text-slate-600">
                    Navigate to the "Teachers" section and click the "Add Teacher" button.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">Where can I see student performance?</h4>
                  <p className="text-sm text-slate-600">
                    The "Students" section provides an overview of each student, including grades and attendance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">How to contact support?</h4>
                  <p className="text-sm text-slate-600">For further assistance, please email support@schoolos.com.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <PageTitle title="Page Not Found" icon={HelpCircle} />
    }
  }

  // Reset search term when changing main views
  const previousActiveView = useRef(activeView)
  useEffect(() => {
    if (previousActiveView.current !== activeView) {
      setSearchTerm("") // Clear search term when navigating to a new main view
    }
    previousActiveView.current = activeView
  }, [activeView])

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased">
      <Sidebar activeView={activeView} setActiveView={setActiveView}>
        <SidebarItem icon={LayoutDashboard} label="Dashboard" viewId="dashboard" />
        <SidebarItem icon={Building} label="School Profile" viewId="school-profile" />
        <SidebarItem icon={GraduationCap} label="Teachers" viewId="teachers" />
        <SidebarItem icon={Users} label="Students" viewId="students" />
        <SidebarItem icon={BookOpen} label="Classes" viewId="classes" />
        <SidebarItem icon={FileText} label="Reports" viewId="reports" />
        <SidebarItem
          icon={ShoppingBag}
          label="IBNI Store"
          viewId="store"
          className="mt-6 bg-green-50 text-green-700 hover:bg-green-100"
        />
        <SidebarItem icon={Briefcase} label="School Courses" viewId="courses" />
        <SidebarItem icon={Calendar} label="School Services" viewId="services" />
      </Sidebar>
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Building className="w-7 h-7 text-green-600" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">School Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <img
                    src="https://placehold.co/32x32/cccccc/ffffff?text=A"
                    alt="Admin avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:inline">Admin User</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

// Export components (Named exports)
export { PageTitle, StatCard, TeacherCard, ClassRow /* SchoolDashboard is default export now */ }

// Export SchoolDashboard as the default export
export default SchoolDashboard
