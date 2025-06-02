"use client"

import React, { useState, useContext, createContext, useMemo, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { FileUpload } from "@/components/ui/file-upload"
import { RepeatableField } from "@/components/ui/repeatable-field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  BarChart,
  Search,
  Plus,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  GraduationCap,
  Settings,
  Edit,
  Trash2,
  Eye,
  LogOut,
  HelpCircle,
  User,
  ShoppingBag,
  Package,
  Mail,
  Phone,
  Globe,
  Upload,
  Save,
  X,
  DollarSign,
  BarChart2,
  Clock,
} from "lucide-react"

// --- Generic Mock UI Components ---

// --- Button Component (Mock) ---
const Button = ({ children, variant = "default", size = "default", className = "", ...props }: any) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : ""}
        ${variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : ""}
        ${variant === "destructive" ? "bg-red-600 text-destructive-foreground hover:bg-red-700" : ""}
        ${variant === "default" ? "bg-green-600 text-white hover:bg-green-700" : ""}
        ${variant === "subtle" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""} {/* New subtle variant */}
        ${size === "sm" ? "h-9 px-3 rounded-md" : ""}
        ${size === "icon" ? "h-10 w-10" : ""}
        ${size === "default" ? "h-10 px-4 py-2" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// --- Card Components (Mock) ---
const Card = ({ children, className = "", ...props }: any) => (
  <div className={`rounded-xl border bg-white text-card-foreground shadow-lg overflow-hidden ${className}`} {...props}>
    {" "}
    {/* Changed to white, rounded-xl, shadow-lg */}
    {children}
  </div>
)
const CardHeader = ({ children, className = "", ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-5 ${className}`} {...props}>
    {" "}
    {/* Adjusted padding */}
    {children}
  </div>
)
const CardTitle = ({ children, className = "", ...props }: any) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight text-slate-800 ${className}`} {...props}>
    {" "}
    {/* Darker title */}
    {children}
  </h3>
)
const CardContent = ({ children, className = "", ...props }: any) => (
  <div className={`p-5 ${className}`} {...props}>
    {" "}
    {/* Adjusted padding */}
    {children}
  </div>
)
const CardFooter = ({ children, className = "", ...props }: any) => (
  <div className={`flex items-center p-5 pt-0 ${className}`} {...props}>
    {" "}
    {/* Adjusted padding */}
    {children}
  </div>
)

// --- PageTitle Component (Mock - With Icon Check) ---
const PageTitle = ({
  title,
  icon: Icon,
  actions,
}: { title: string; icon: React.ElementType; actions?: React.ReactNode }) => {
  const renderIcon = () => {
    if (!Icon || (typeof Icon !== "function" && typeof Icon !== "object")) {
      console.error(`PageTitle: Invalid icon component provided for title "${title}". Received:`, Icon)
      return (
        <span
          className="w-10 h-10 text-red-500 flex items-center justify-center border-2 border-red-300 rounded-lg bg-red-100"
          title="Invalid Icon"
        >
          ⚠️
        </span>
      )
    }
    return <Icon className="w-7 h-7 text-green-600" />
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">{renderIcon()}</div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h1>
      </div>
      {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
    </div>
  )
}

// --- Badge Component (Mock) ---
const Badge = ({ children, variant = "default", className = "", size = "default", ...props }: any) => {
  let variantClasses = ""
  switch (variant) {
    case "default":
      variantClasses = "border-transparent bg-green-100 text-green-700 font-medium"
      break
    case "secondary":
      variantClasses = "border-transparent bg-sky-100 text-sky-700 font-medium"
      break
    case "outline":
      variantClasses = "text-slate-600 border-slate-300 font-medium"
      break
    case "destructive":
      variantClasses = "border-transparent bg-red-100 text-red-700 font-medium"
      break
    default:
      variantClasses = "border-transparent bg-slate-100 text-slate-700 font-medium"
  }
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-xs"

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeClasses} font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

// --- Progress Component (Mock - Corrected props handling) ---
const Progress = ({
  value,
  className = "",
  colorClassName = "bg-green-500",
  ...props
}: { value?: number; className?: string; colorClassName?: string; [key: string]: any }) => (
  <div className={`relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 ${className}`} {...props}>
    <div
      className={`h-full w-full flex-1 ${colorClassName} transition-all duration-300 ease-out`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
)

// --- Input Component (Mock) ---
const Input = React.forwardRef<HTMLInputElement, any>(({ className = "", type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={`flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
))
Input.displayName = "Input"

// --- Mock DropdownMenu ---
const DropdownMenuContext = createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null) // Ref for the menu container

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const contextValue = { isOpen, setIsOpen }
  const validChildren = React.Children.toArray(children).filter(React.isValidElement)
  const trigger = validChildren.find((child) => child.type === DropdownMenuTrigger)
  const content = validChildren.find((child) => child.type === DropdownMenuContent)

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className="relative inline-block text-left" ref={menuRef}>
        {" "}
        {/* Added ref */}
        {trigger}
        {/* Render content only if trigger exists, managed by DropdownMenuContent's own logic */}
        {trigger && content}
      </div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    console.error("DropdownMenuTrigger must be used within a DropdownMenu")
    return null
  }
  const { isOpen, setIsOpen } = context
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }
  if (asChild && React.isValidElement(children) && React.Children.count(children) === 1) {
    const childElement = children as React.ReactElement<any>
    return React.cloneElement(childElement, {
      onClick: (e: React.MouseEvent) => {
        if (childElement.props.onClick) childElement.props.onClick(e)
        handleClick(e)
      },
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      "data-state": isOpen ? "open" : "closed",
    })
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      className="inline-flex items-center justify-center rounded-md"
    >
      {" "}
      {children}{" "}
    </button>
  )
}

const DropdownMenuContent = ({
  children,
  align = "start",
  className = "",
}: { children: React.ReactNode; align?: string; className?: string }) => {
  const context = useContext(DropdownMenuContext)
  if (!context || !context.isOpen) return null
  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`absolute z-50 mt-2 w-56 rounded-lg shadow-xl bg-white text-popover-foreground ring-1 ring-slate-200 focus:outline-none ${align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left"} ${className}`}
          role="menu"
          aria-orientation="vertical"
          data-state="open"
        >
          <div className="py-1" role="none">
            {" "}
            {children}{" "}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const DropdownMenuItem = ({ children, className = "", ...props }: any) => {
  const context = useContext(DropdownMenuContext)
  return (
    <button
      className={`flex items-center w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none rounded-md ${className}`}
      role="menuitem"
      {...props}
      onClick={(e) => {
        if (context) context.setIsOpen(false)
        if (props.onClick) props.onClick(e)
      }}
    >
      {" "}
      {children}{" "}
    </button>
  )
}
const DropdownMenuLabel = ({ children, className = "", ...props }: any) => (
  <div className={`px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider ${className}`} {...props}>
    {children}
  </div>
)
const DropdownMenuSeparator = ({ className = "", ...props }: any) => (
  <div className={`-mx-1 my-1 h-px bg-slate-200 ${className}`} {...props} />
)

// --- Mock Select Components ---
interface SelectContextType {
  selectedValue?: string
  setSelectedValue: (value: string, label?: React.ReactNode) => void
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
  selectedLabel?: React.ReactNode
}
const SelectContext = React.createContext<SelectContextType | null>(null)

const Select = ({
  children,
  value,
  onValueChange,
}: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValueState] = useState(value)
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValueState(value)
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectContent) {
        React.Children.forEach(child.props.children, (item) => {
          if (React.isValidElement(item) && item.type === SelectItem && item.props.value === value)
            setSelectedLabel(item.props.children)
        })
      }
    })
  }, [value, children])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleValueChange = (newValue: string, newLabel?: React.ReactNode) => {
    setSelectedValueState(newValue)
    setSelectedLabel(newLabel || newValue)
    if (onValueChange) onValueChange(newValue)
    setIsOpen(false)
  }
  const contextValue = {
    selectedValue,
    setSelectedValue: handleValueChange,
    isOpen,
    setIsOpen,
    triggerRef,
    selectedLabel,
  }
  return (
    <SelectContext.Provider value={contextValue}>
      {" "}
      <div className="relative" ref={selectRef}>
        {" "}
        {children}{" "}
      </div>{" "}
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(SelectContext)
  if (!context) {
    console.error("SelectTrigger must be used within a Select component")
    return null
  }
  const { isOpen, setIsOpen, triggerRef } = context
  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-controls="listbox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={`flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {" "}
      {children}{" "}
      <ChevronDown
        className={`ml-2 h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />{" "}
    </button>
  )
}

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = useContext(SelectContext)
  if (!context) return null
  const { selectedLabel, selectedValue } = context
  return <span className="text-slate-700">{selectedLabel || placeholder || "Select..."}</span>
}

const SelectContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(SelectContext)
  if (!context || !context.isOpen) return null
  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          role="listbox"
          className={`absolute z-50 mt-1 w-full min-w-[var(--radix-select-trigger-width)] rounded-lg border border-slate-200 bg-white text-popover-foreground shadow-xl ${className}`}
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child) && child.type === SelectItem
              ? React.cloneElement(child as React.ReactElement<any>, {
                  onSelect: (val: string, label: React.ReactNode) => context.setSelectedValue(val, label),
                })
              : child,
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const SelectItem = ({
  children,
  value,
  className = "",
  onSelect,
}: {
  children: React.ReactNode
  value: string
  className?: string
  onSelect?: (value: string, label: React.ReactNode) => void
}) => {
  const context = useContext(SelectContext)
  if (!context) return null
  const { selectedValue } = context
  const handleItemClick = () => {
    if (onSelect) onSelect(value, children)
  }
  return (
    <div
      role="option"
      aria-selected={selectedValue === value}
      data-state={selectedValue === value ? "checked" : "unchecked"}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${selectedValue === value ? "font-semibold text-green-700" : "text-slate-700"} ${className}`}
      onClick={handleItemClick}
    >
      {" "}
      {selectedValue === value && (
        <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
          <CheckCircle className="h-4 w-4 text-green-600" />
        </span>
      )}{" "}
      {children}{" "}
    </div>
  )
}
// --- End of Mock Select Components ---

// --- Sidebar Component ---
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
            <GraduationCap className="mr-2 h-7 w-7" /> Teacher OS
          </h1>
          <p className="text-xs text-slate-500 mt-1">Class & Student Management</p>
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
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group
                ${
                  isActive
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }
                ${isAction ? "text-slate-600 hover:bg-red-50 hover:text-red-600" : ""}
                ${className || ""}
            `}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={`w-5 h-5 ${isActive ? "text-green-600" : isAction ? "text-slate-500 group-hover:text-red-500" : "text-slate-400 group-hover:text-slate-500"}`}
      />
      <span>{label}</span>
    </button>
  )
}

// --- Components from the NEW Snippet (Adapted for new design) ---

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: { title: string; value: string; icon: React.ElementType; trend?: string }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="flex items-center justify-between p-5">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        {trend && <p className="text-xs text-slate-500 mt-1">{trend}</p>}
      </div>
      <div className="p-3 bg-green-100 rounded-lg">
        <Icon className="w-7 h-7 text-green-600" />
      </div>
    </CardContent>
  </Card>
)

const ClassCard = ({ classData }: { classData: any }) => (
  <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out flex flex-col bg-white">
    <CardHeader className="pb-3 border-b border-slate-100">
      <div className="flex justify-between items-start">
        <CardTitle className="text-md font-semibold text-slate-800">{classData.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu for {classData.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel> <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4 text-slate-500" />
              View Class
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4 text-slate-500" />
              Edit Class
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4 text-slate-500" />
              Manage Students
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpen className="mr-2 h-4 w-4 text-slate-500" />
              View Assignments
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:text-red-700 focus:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              Archive Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant={classData.status === "Active" ? "default" : "secondary"} size="sm">
          {" "}
          {classData.status}{" "}
        </Badge>
        <span className="text-xs text-slate-500 flex items-center">
          {" "}
          <Calendar className="w-3 h-3 mr-1 text-slate-400" /> {classData.schedule.day}, {classData.schedule.time}{" "}
        </span>
      </div>
    </CardHeader>
    <CardContent className="pb-4 pt-4 flex-grow space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1 text-slate-500">
          <span>Students</span>
          <span className="font-medium text-slate-600">
            {" "}
            {classData.students.enrolled} / {classData.students.capacity}{" "}
          </span>
        </div>
        <Progress
          value={(classData.students.enrolled / classData.students.capacity) * 100}
          className="h-2"
          colorClassName={
            classData.students.enrolled / classData.students.capacity > 0.8
              ? "bg-green-500"
              : classData.students.enrolled / classData.students.capacity > 0.5
                ? "bg-yellow-500"
                : "bg-red-500"
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-left p-2.5 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500">Assignments</p>
          <p className="font-semibold text-slate-700 text-lg">{classData.assignments}</p>
        </div>
        <div className="text-left p-2.5 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500">Avg. Grade</p>
          <p className="font-semibold text-slate-700 text-lg">{classData.averageGrade}/10</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-3 border-t border-slate-100 bg-slate-50/50">
      <Button variant="subtle" size="sm" className="w-full font-medium">
        {" "}
        Manage Class{" "}
      </Button>
    </CardFooter>
  </Card>
)

const StudentRow = ({ student }: { student: any }) => (
  <tr className="hover:bg-slate-50 transition-colors duration-100 border-b border-slate-100 last:border-b-0">
    <td className="px-5 py-3.5 whitespace-nowrap">
      <div className="flex items-center">
        <img
          src={student.avatar || `https://placehold.co/40x40/e0f2fe/0891b2?text=${student.name.charAt(0)}`}
          alt={`${student.name}'s avatar`}
          className="w-9 h-9 rounded-full mr-3 object-cover shadow-sm"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.onerror = null
            t.src = `https://placehold.co/40x40/e2e8f0/4a5568?text=${student.name.charAt(0)}`
          }}
        />
        <div>
          <p className="font-medium text-slate-800 text-sm">{student.name}</p>
          <p className="text-xs text-slate-500">{student.email}</p>
        </div>
      </div>
    </td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">{student.class}</td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">{student.grade}/10</td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">{student.attendance}%</td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm">
      {" "}
      <Badge
        variant={student.status === "Active" ? "default" : student.status === "At Risk" ? "destructive" : "outline"}
        size="sm"
      >
        {" "}
        {student.status}{" "}
      </Badge>{" "}
    </td>
    <td className="px-5 py-3.5 whitespace-nowrap text-right text-sm font-medium">
      {" "}
      <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100 hover:text-green-700 rounded-md">
        {" "}
        View Profile{" "}
      </Button>{" "}
    </td>
  </tr>
)

const AssignmentRow = ({ assignment }: { assignment: any }) => (
  <tr className="hover:bg-slate-50 transition-colors duration-100 border-b border-slate-100 last:border-b-0">
    <td className="px-5 py-3.5 whitespace-nowrap">
      <div>
        <p className="font-medium text-slate-800 text-sm">{assignment.title}</p>
        <p className="text-xs text-slate-500">{assignment.class}</p>
      </div>
    </td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">{assignment.type}</td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">{assignment.dueDate}</td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">
      <div className="flex items-center">
        {assignment.status === "Published" && <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />}
        {assignment.status === "Draft" && <AlertCircle className="w-4 h-4 text-yellow-500 mr-1.5" />}
        {assignment.status === "Archived" && <XCircle className="w-4 h-4 text-slate-400 mr-1.5" />}
        {assignment.status}
      </div>
    </td>
    <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">
      {" "}
      {assignment.submissions}/{assignment.totalStudents}{" "}
    </td>
    <td className="px-5 py-3.5 whitespace-nowrap text-right text-sm font-medium">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-md"
          >
            {" "}
            Actions <ChevronDown className="ml-1 h-4 w-4" />{" "}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4 text-slate-500" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4 text-slate-500" />
            Edit Assignment
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CheckCircle className="mr-2 h-4 w-4 text-slate-500" />
            Grade Submissions
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:text-red-700 focus:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  </tr>
)

// First define mockTeacherData without stats
const mockTeacherData = {
  name: "Emily Carter",
  classes: [
    {
      id: "cls001",
      name: "AP Physics",
      status: "Active",
      schedule: { day: "Mon/Wed", time: "9:00 AM - 10:30 AM" },
      students: { enrolled: 24, capacity: 30 },
      assignments: 12,
      averageGrade: 8.5,
    },
    {
      id: "cls002",
      name: "Introduction to Quantum Mechanics",
      status: "Active",
      schedule: { day: "Mon/Fri", time: "1:00 PM - 2:30 PM" },
      students: { enrolled: 18, capacity: 25 },
      assignments: 8,
      averageGrade: 7.9,
    },
    {
      id: "cls003",
      name: "Physics for College Entrance Exams",
      status: "Active",
      schedule: { day: "Tue/Thu", time: "10:00 AM - 11:30 AM" },
      students: { enrolled: 28, capacity: 30 },
      assignments: 15,
      averageGrade: 8.2,
    },
    {
      id: "cls004",
      name: "Advanced Thermodynamics",
      status: "Upcoming",
      schedule: { day: "Tue/Thu", time: "1:00 PM - 2:30 PM" },
      students: { enrolled: 12, capacity: 25 },
      assignments: 0,
      averageGrade: 0,
    },
  ],
  students: [
    {
      id: "std001",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      avatar: "https://placehold.co/40x40/e0f2fe/0891b2?text=AJ",
      class: "AP Physics",
      grade: 9.2,
      attendance: 98,
      status: "Active",
    },
    {
      id: "std002",
      name: "Mia Williams",
      email: "mia.w@example.com",
      avatar: "https://placehold.co/40x40/fce7f3/db2777?text=MW",
      class: "AP Physics",
      grade: 8.7,
      attendance: 95,
      status: "Active",
    },
    {
      id: "std003",
      name: "Ethan Brown",
      email: "ethan.b@example.com",
      avatar: "https://placehold.co/40x40/f0fdfa/0d9488?text=EB",
      class: "Introduction to Quantum Mechanics",
      grade: 7.5,
      attendance: 85,
      status: "At Risk",
    },
    {
      id: "std004",
      name: "Sophia Garcia",
      email: "sophia.g@example.com",
      avatar: "https://placehold.co/40x40/eff6ff/3b82f6?text=SG",
      class: "Physics for College Entrance Exams",
      grade: 9.5,
      attendance: 100,
      status: "Active",
    },
    {
      id: "std005",
      name: "Noah Martinez",
      email: "noah.m@example.com",
      avatar: "https://placehold.co/40x40/fef2f2/ef4444?text=NM",
      class: "Physics for College Entrance Exams",
      grade: 6.8,
      attendance: 78,
      status: "At Risk",
    },
    {
      id: "std006",
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      avatar: "https://placehold.co/40x40/ecfccb/4d7c0f?text=OD",
      class: "AP Physics",
      grade: 8.1,
      attendance: 92,
      status: "Active",
    },
    {
      id: "std007",
      name: "Liam Rodriguez",
      email: "liam.r@example.com",
      avatar: "https://placehold.co/40x40/fae8ff/a21caf?text=LR",
      class: "Advanced Thermodynamics",
      grade: 0,
      attendance: 100,
      status: "Active",
    },
  ],
  assignments: [
    {
      id: "asg001",
      title: "Mechanics Problem Set",
      class: "AP Physics",
      type: "Homework",
      dueDate: "2025-04-20",
      status: "Published",
      submissions: 20,
      totalStudents: 24,
    },
    {
      id: "asg002",
      title: "Quantum States Quiz",
      class: "Introduction to Quantum Mechanics",
      type: "Quiz",
      dueDate: "2025-04-18",
      status: "Published",
      submissions: 15,
      totalStudents: 18,
    },
    {
      id: "asg003",
      title: "Midterm Exam",
      class: "Physics for College Entrance Exams",
      type: "Exam",
      dueDate: "2025-04-25",
      status: "Draft",
      submissions: 0,
      totalStudents: 28,
    },
    {
      id: "asg004",
      title: "Wave-Particle Duality Essay",
      class: "Introduction to Quantum Mechanics",
      type: "Essay",
      dueDate: "2025-04-30",
      status: "Published",
      submissions: 5,
      totalStudents: 18,
    },
    {
      id: "asg005",
      title: "Thermodynamics Lab Report",
      class: "AP Physics",
      type: "Lab Report",
      dueDate: "2025-04-15",
      status: "Archived",
      submissions: 24,
      totalStudents: 24,
    },
  ],
  stats: {}, // Empty stats object initially
}

// Then add stats after mockTeacherData is defined
mockTeacherData.stats = {
  totalStudents: mockTeacherData.students.length,
  activeClasses: mockTeacherData.classes.filter((c) => c.status === "Active").length,
  upcomingClasses: mockTeacherData.classes.filter((c) => c.status === "Upcoming").length,
  averageAttendance:
    mockTeacherData.students.length > 0
      ? Math.round(mockTeacherData.students.reduce((acc, s) => acc + s.attendance, 0) / mockTeacherData.students.length)
      : 0,
}

// Main Page Component with Sidebar Layout
export default function ManageClassesPage() {
  const [activeView, setActiveView] = useState("dashboard")
  const [classFilter, setClassFilter] = useState("all") // 'all', 'active', 'upcoming'
  const [studentFilter, setStudentFilter] = useState("all") // 'all', 'active', 'at_risk'
  const [assignmentFilter, setAssignmentFilter] = useState("all") // 'all', 'published', 'draft', 'archived'
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClasses = useMemo(
    () =>
      mockTeacherData.classes.filter(
        (classItem) => classFilter === "all" || classItem.status.toLowerCase() === classFilter,
      ),
    [classFilter],
  )

  const filteredStudents = useMemo(
    () =>
      mockTeacherData.students.filter(
        (student) =>
          (studentFilter === "all" || student.status.toLowerCase().replace(" ", "_") === studentFilter) &&
          (searchTerm === "" ||
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.class.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [studentFilter, searchTerm],
  )

  const filteredAssignments = useMemo(
    () =>
      mockTeacherData.assignments.filter(
        (assignment) =>
          (assignmentFilter === "all" || assignment.status.toLowerCase() === assignmentFilter) &&
          (searchTerm === "" ||
            assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.type.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [assignmentFilter, searchTerm],
  )

  // Content for each view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <PageTitle title="Dashboard Overview" icon={LayoutDashboard} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students"
                value={mockTeacherData.stats.totalStudents.toString()}
                icon={Users}
                trend={`+${mockTeacherData.students.filter((s) => s.status === "Active").length - (mockTeacherData.stats.totalStudents - 2) > 0 ? mockTeacherData.students.filter((s) => s.status === "Active").length - (mockTeacherData.stats.totalStudents - 2) : 0} this week`}
              />
              <StatCard
                title="Active Classes"
                value={mockTeacherData.stats.activeClasses.toString()}
                icon={BookOpen}
                trend={`${mockTeacherData.classes.filter((c) => c.status === "Active").length - (mockTeacherData.stats.activeClasses - 1) > 0 ? mockTeacherData.classes.filter((c) => c.status === "Active").length - (mockTeacherData.stats.activeClasses - 1) : 0} new course`}
              />
              <StatCard
                title="Upcoming Classes"
                value={mockTeacherData.stats.upcomingClasses.toString()}
                icon={Calendar}
                trend="Starts next month"
              />
              <StatCard
                title="Avg. Attendance"
                value={`${mockTeacherData.stats.averageAttendance}%`}
                icon={BarChart}
                trend={`${mockTeacherData.stats.averageAttendance - 90}% vs goal`}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader className="bg-slate-50/70 border-b p-4 flex justify-between items-center">
                  <CardTitle className="text-slate-700 text-base font-semibold">Recent Active Classes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveView("classes")}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead className="bg-slate-50/70">
                        <tr>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Class
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Schedule
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Students
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Avg. Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {mockTeacherData.classes
                          .filter((c) => c.status === "Active")
                          .slice(0, 3)
                          .map((classItem) => (
                            <tr key={classItem.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3.5 whitespace-nowrap text-sm font-medium text-slate-800">
                                {classItem.name}
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">
                                {classItem.schedule.day}, {classItem.schedule.time}
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">
                                {classItem.students.enrolled} / {classItem.students.capacity}
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-600">
                                {classItem.averageGrade}/10
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader className="bg-slate-50/70 border-b p-4 flex justify-between items-center">
                  <CardTitle className="text-slate-700 text-base font-semibold">Upcoming Assignments</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveView("assignments")
                      setAssignmentFilter("published")
                      setSearchTerm("")
                    }}
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  {mockTeacherData.assignments
                    .filter((a) => a.status === "Published" || a.status === "Draft")
                    .slice(0, 3)
                    .map((asg) => (
                      <div key={asg.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-slate-700">{asg.title}</h4>
                          <Badge variant={asg.status === "Published" ? "default" : "outline"} size="sm">
                            {asg.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {asg.class} - Due: {asg.dueDate}
                        </p>
                      </div>
                    ))}
                  {mockTeacherData.assignments.filter((a) => a.status === "Published" || a.status === "Draft")
                    .length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No upcoming assignments.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "classes":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Manage Classes"
              icon={BookOpen}
              actions={
                <Button onClick={() => alert("Add new class clicked!")}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Class
                </Button>
              }
            />
            <Card>
              <CardHeader className="border-b p-4 bg-slate-50/70">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-600">Filter Classes</h3>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-[180px] bg-white h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredClasses.length === 0 ? (
                  <p className="text-center text-slate-500 py-10">No classes match the current filter.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {filteredClasses.map((classItem) => (
                      <ClassCard key={classItem.id} classData={classItem} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )
      case "students":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Student Roster"
              icon={Users}
              actions={
                <Button onClick={() => alert("Add new student clicked!")}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Student
                </Button>
              }
            />
            <Card>
              <CardHeader className="border-b p-4 bg-slate-50/70">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto sm:flex-grow max-w-xs">
                    <Input
                      type="search"
                      placeholder="Search students by name, email, class..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                  <Select value={studentFilter} onValueChange={setStudentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-white h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="at_risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/70">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Attendance
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => <StudentRow key={student.id} student={student} />)
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-slate-500 py-10">
                            No students match your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "assignments":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Assignments Overview"
              icon={FileText}
              actions={
                <Button onClick={() => alert("Create new assignment clicked!")}>
                  <Plus className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              }
            />
            <Card>
              <CardHeader className="border-b p-4 bg-slate-50/70">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-auto sm:flex-grow max-w-xs">
                    <Input
                      type="search"
                      placeholder="Search assignments by title, class, type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                  <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-white h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/70">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Title & Class
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Submissions
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment) => (
                          <AssignmentRow key={assignment.id} assignment={assignment} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-slate-500 py-10">
                            No assignments match your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "settings":
        return (
          <div>
            <PageTitle title="Settings" icon={Settings} />
            <Card>
              <CardContent>
                <p className="text-slate-600">
                  Application settings will be displayed here. This section is a placeholder.
                </p>
                {/* Example settings options */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="profileName" className="block text-sm font-medium text-slate-700">
                      Profile Name
                    </label>
                    <Input type="text" id="profileName" defaultValue={mockTeacherData.name} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="emailNotifications" className="block text-sm font-medium text-slate-700">
                      Email Notifications
                    </label>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-[200px] mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "profile":
        return (
          <div className="space-y-6">
            <PageTitle
              title="Teacher Profile"
              icon={User}
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
              {/* Left Column - Personal Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      value={null}
                      onChange={() => {}}
                      previewUrl="https://placehold.co/200x200/e0f2fe/0891b2?text=EC"
                      accept="image/*"
                      maxSize={2 * 1024 * 1024}
                      buttonText="Upload Photo"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={mockTeacherData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" defaultValue="Physics Teacher" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjects">Subjects Taught</Label>
                      <Input id="subjects" defaultValue="Physics, Mathematics" />
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
                        <Input id="email" type="email" defaultValue="emily.carter@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-slate-400" />
                        <Input id="website" type="url" defaultValue="https://emilycarter.edu" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Professional Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      value="Dr. Emily Carter is a dedicated physics teacher with over 10 years of experience in education. She specializes in making complex physics concepts accessible to students of all learning styles.\n\nShe holds a Ph.D. in Theoretical Physics from MIT and has published several papers on physics education methodologies."
                      onChange={() => {}}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Credentials & Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RepeatableField
                      items={[
                        { degree: "Ph.D. in Theoretical Physics", institution: "MIT", year: "2015" },
                        { degree: "M.Sc. in Physics", institution: "Stanford University", year: "2011" },
                        { degree: "B.Sc. in Physics", institution: "UCLA", year: "2009" }
                      ]}
                      onChange={() => {}}
                      defaultValue={{ degree: "", institution: "", year: "" }}
                      addButtonText="Add Credential"
                      renderItem={(item, index, remove) => (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`}>Degree/Certification</Label>
                            <Input id={`degree-${index}`} defaultValue={item.degree} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${index}`}>Institution</Label>
                            <Input id={`institution-${index}`} defaultValue={item.institution} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`year-${index}`}>Year</Label>
                            <Input id={`year-${index}`} defaultValue={item.year} />
                          </div>
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Teaching Philosophy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      className="min-h-[150px]"
                      defaultValue="I believe in creating an inclusive learning environment where students can explore physics through hands-on experiments and real-world applications. My teaching approach emphasizes critical thinking and problem-solving skills that extend beyond the classroom."
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case "products":
        return (
          <div className="space-y-6">
            <PageTitle
              title="My Products"
              icon={Package}
              actions={
                <Button onClick={() => alert("Add new product clicked!")}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              }
            />
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Manage your educational products, courses, and materials. Create new products, track sales, and analyze performance.
                </p>
                <div className="mt-4 p-8 bg-slate-50 rounded-lg text-center">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No Products Yet</h3>
                  <p className="text-sm text-slate-500 mb-4">Start creating and selling your educational materials</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "services":
        return (
          <div className="space-y-6">
            <PageTitle
              title="My Services"
              icon={Calendar}
              actions={
                <Button onClick={() => alert("Add new service clicked!")}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Service
                </Button>
              }
            />
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Manage your tutoring services, consultations, and other educational services. Set your availability and track bookings.
                </p>
                <div className="mt-4 p-8 bg-slate-50 rounded-lg text-center">
                  <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No Services Yet</h3>
                  <p className="text-sm text-slate-500 mb-4">Start offering your expertise as bookable services</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "help":
        return (
          <div>
            <PageTitle title="Help & Support" icon={HelpCircle} />
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700">How do I add a new class?</h4>
                  <p className="text-sm text-slate-600">
                    Navigate to the "Classes" section and click the "Add New Class" button.
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
                  <p className="text-sm text-slate-600">For further assistance, please email support@teacheros.com.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <PageTitle title="Page Not Found" icon={AlertCircle} />
    }
  }

  // Reset search term when changing main views, but not for filter changes within a view
  const previousActiveView = useRef(activeView)
  useEffect(() => {
    if (previousActiveView.current !== activeView) {
      setSearchTerm("") // Clear search term when navigating to a new main view
      // Optionally reset filters too, or maintain them based on preference
      // setClassFilter("all");
      // setStudentFilter("all");
      // setAssignmentFilter("all");
    }
    previousActiveView.current = activeView
  }, [activeView])

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased">
      <Sidebar activeView={activeView} setActiveView={setActiveView}>
        <SidebarItem icon={LayoutDashboard} label="Dashboard" viewId="dashboard" />
        <SidebarItem icon={User} label="Profile" viewId="profile" />
        <SidebarItem icon={BookOpen} label="Classes" viewId="classes" />
        <SidebarItem icon={Users} label="Students" viewId="students" />
        <SidebarItem icon={FileText} label="Assignments" viewId="assignments" />
        <SidebarItem
          icon={ShoppingBag}
          label="IBNI Store"
          viewId="store"
          className="mt-6 bg-green-50 text-green-700 hover:bg-green-100"
        />
        <SidebarItem icon={Package} label="My Products" viewId="products" />
        <SidebarItem icon={Calendar} label="My Services" viewId="services" />
      </Sidebar>
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
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
