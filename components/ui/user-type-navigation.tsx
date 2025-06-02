import { motion } from "framer-motion"
import { Users, GraduationCap, Building, User } from "lucide-react"

interface UserTypeNavigationProps {
  activeTab: string
  onTabChange: (value: string) => void
  className?: string
}

export function UserTypeNavigation({ activeTab, onTabChange, className = "" }: UserTypeNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-4 relative z-[300] ${className}`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => onTabChange("parent")}
          className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === "parent"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
              : "bg-green-50 text-gray-700 hover:bg-green-100"
          }`}
        >
          <Users className="h-4 w-4" /> <span className="whitespace-nowrap">Parents</span>
        </button>
        <button
          onClick={() => onTabChange("student")}
          className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === "student"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
              : "bg-green-50 text-gray-700 hover:bg-green-100"
          }`}
        >
          <GraduationCap className="h-4 w-4" /> <span className="whitespace-nowrap">Students</span>
        </button>
        <button
          onClick={() => onTabChange("teacher")}
          className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === "teacher"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
              : "bg-green-50 text-gray-700 hover:bg-green-100"
          }`}
        >
          <User className="h-4 w-4" /> <span className="whitespace-nowrap">Teachers</span>
        </button>
        <button
          onClick={() => onTabChange("institution")}
          className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            activeTab === "institution"
              ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
              : "bg-green-50 text-gray-700 hover:bg-green-100"
          }`}
        >
          <Building className="h-4 w-4" /> <span className="whitespace-nowrap">Institutions</span>
        </button>
      </div>
    </motion.div>
  )
} 