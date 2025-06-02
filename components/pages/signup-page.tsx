"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, User, GraduationCap, Users, Building2, CheckCircle, AlertCircle, Phone, MapPin, Calendar, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface SignUpPageProps {
  navigateTo: (page: string) => void
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  schoolName?: string
  institutionType?: string
  address?: string
  subjects?: string
  experience?: string
  childName?: string
  childAge?: string
  terms?: string
}

interface ExtendedFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  schoolName: string
  institutionType: string
  address: string
  subjects: string
  experience: string
  childName: string
  childAge: string
  termsAccepted: boolean
  newsletterSubscription: boolean
}

export default function SignUpPage({ navigateTo }: SignUpPageProps) {
  const [userType, setUserType] = useState<"parent" | "student" | "teacher" | "institution" | null>(null)
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<ExtendedFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    schoolName: "",
    institutionType: "",
    address: "",
    subjects: "",
    experience: "",
    childName: "",
    childAge: "",
    termsAccepted: false,
    newsletterSubscription: false
  })

  const userTypeOptions = [
    {
      type: "parent" as const,
      title: "I'm a Parent",
      description: "Find schools and track your child's progress",
      icon: Users,
      color: "bg-green-50 border-green-200 hover:border-green-400"
    },
    {
      type: "student" as const,
      title: "I'm a Student",
      description: "Find schools and track your own progress",
      icon: User,
      color: "bg-green-50 border-green-200 hover:border-green-400"
    },
    {
      type: "teacher" as const,
      title: "I'm a Teacher",
      description: "Create your profile and manage classes",
      icon: GraduationCap,
      color: "bg-green-50 border-green-200 hover:border-green-400"
    },
    {
      type: "institution" as const,
      title: "I'm an Institution",
      description: "Manage your school and connect with students",
      icon: Building2,
      color: "bg-green-50 border-green-200 hover:border-green-400"
    }
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Basic validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // User type specific validation
    if (userType === 'parent') {
      if (!formData.childName.trim()) {
        newErrors.childName = "Child's name is required"
      }
      if (!formData.childAge) {
        newErrors.childAge = "Child's age is required"
      }
    }

    if (userType === 'teacher') {
      if (!formData.subjects.trim()) {
        newErrors.subjects = "Please specify your teaching subjects"
      }
      if (!formData.experience) {
        newErrors.experience = "Please select your experience level"
      }
    }

    if (userType === 'institution') {
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = "Institution name is required"
      }
      if (!formData.institutionType) {
        newErrors.institutionType = "Please select institution type"
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required"
      }
    }

    if (userType === 'student') {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required"
      }
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = "School name is required"
      }
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUserTypeSelect = (type: "parent" | "student" | "teacher" | "institution") => {
    setUserType(type)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Form submitted:", { userType, ...formData })
      navigateTo("home")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^\w\s]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']

  const renderUserSpecificFields = () => {
    switch (userType) {
      case 'parent':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child's Name *</Label>
                <Input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.childName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                  placeholder="Enter your child's name"
                />
                {errors.childName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.childName}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childAge">Child's Age *</Label>
                <Input
                  type="number"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.childAge ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                  placeholder="Enter your child's age"
                  min="1"
                  max="18"
                />
                {errors.childAge && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.childAge}
                  </p>
                )}
              </div>
            </div>
          </>
        );

      case 'student':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.dateOfBirth ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schoolName">Current School *</Label>
                <Input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.schoolName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                  placeholder="Enter your current school"
                />
                {errors.schoolName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.schoolName}
                  </p>
                )}
              </div>
            </div>
          </>
        );

      case 'teacher':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subjects">Teaching Subjects *</Label>
                <Textarea
                  id="subjects"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.subjects ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                  placeholder="Enter the subjects you teach"
                />
                {errors.subjects && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.subjects}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience *</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleSelectChange('experience', value)}
                >
                  <SelectTrigger className={cn(
                    "transition-colors",
                    errors.experience ? "border-red-500 focus:ring-red-500" : "focus:ring-green-600"
                  )}>
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
          </>
        );

      case 'institution':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">Institution Name *</Label>
                <Input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className={cn(
                    "transition-colors",
                    errors.schoolName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                  )}
                  placeholder="Enter your institution name"
                />
                {errors.schoolName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.schoolName}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institutionType">Institution Type *</Label>
                <Select
                  value={formData.institutionType}
                  onValueChange={(value) => handleSelectChange('institutionType', value)}
                >
                  <SelectTrigger className={cn(
                    "transition-colors",
                    errors.institutionType ? "border-red-500 focus:ring-red-500" : "focus:ring-green-600"
                  )}>
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary School</SelectItem>
                    <SelectItem value="secondary">Secondary School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.institutionType && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.institutionType}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={cn(
                  "transition-colors",
                  errors.address ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                )}
                placeholder="Enter your institution's address"
              />
              {errors.address && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.address}
                </p>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Join IBNI</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose your role to get started with personalized features and content
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {userTypeOptions.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <motion.div
                    key={option.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
                        option.color
                      )}
                      onClick={() => handleUserTypeSelect(option.type)}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-sm">
                          <IconComponent className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-xl font-semibold">{option.title}</CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          {option.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-3xl mx-auto shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                <CardDescription className="text-lg">
                  Sign up as a {userType} to get started with IBNI
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={cn(
                            "transition-colors",
                            errors.firstName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                          )}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={cn(
                            "transition-colors",
                            errors.lastName ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                          )}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={cn(
                            "transition-colors",
                            errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                          )}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(
                            "transition-colors",
                            errors.phone ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                          )}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* User Type Specific Fields */}
                  {userType && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        {userType === 'parent' && <Users className="h-5 w-5 text-green-600" />}
                        {userType === 'student' && <BookOpen className="h-5 w-5 text-green-600" />}
                        {userType === 'teacher' && <GraduationCap className="h-5 w-5 text-green-600" />}
                        {userType === 'institution' && <Building2 className="h-5 w-5 text-green-600" />}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {userType === 'parent' && 'Child Information'}
                          {userType === 'student' && 'Student Information'}
                          {userType === 'teacher' && 'Teaching Information'}
                          {userType === 'institution' && 'Institution Information'}
                        </h3>
                      </div>
                      {renderUserSpecificFields()}
                    </div>
                  )}
                  
                  {/* Security Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={cn(
                              "transition-colors pr-10",
                              errors.password ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                            )}
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.password}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={cn(
                              "transition-colors pr-10",
                              errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-600"
                            )}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => {
                          setFormData(prev => ({
                            ...prev,
                            termsAccepted: checked as boolean
                          }))
                        }}
                        className={cn(
                          "mt-1",
                          errors.terms ? "border-red-500" : "border-gray-300"
                        )}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the Terms of Service and Privacy Policy
                        </Label>
                        {errors.terms && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.terms}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletterSubscription}
                        onCheckedChange={(checked) => {
                          setFormData(prev => ({
                            ...prev,
                            newsletterSubscription: checked as boolean
                          }))
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="newsletter"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Subscribe to our newsletter for updates and offers
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
