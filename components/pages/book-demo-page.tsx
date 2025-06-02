"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Phone, Mail, Send, Check, Star, Users, Award, Zap, Shield, Target, ArrowRight, PlayCircle, BookOpen, TrendingUp, Building, Video, Sun, Sunrise, Sunset, User, MessageSquare, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

interface BookDemoPageProps {
  navigateTo?: (page: string) => void
}

export default function BookDemoPage({ navigateTo }: BookDemoPageProps) {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    demoType: "online",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const handleNextStep = () => {
    setFormStep(2)
  }

  const handlePrevStep = () => {
    setFormStep(1)
  }

  const stats = [
    { number: "15 min", label: "Average Demo Time" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "500+", label: "Demos Completed" },
    { number: "24h", label: "Response Time" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 text-sm font-medium">
              🎯 Free Personalized Demo
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Experience <span className="text-green-600">IBNI</span> in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            See how our revolutionary educational platform can transform learning experiences. 
            Book a personalized demo and discover why thousands choose IBNI for their educational journey.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="w-full border border-green-100 shadow-sm">
                {isSubmitted ? (
                  <div className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Demo Request Submitted!</h2>
                    <p className="text-gray-600 mb-2 text-lg">
                      Thank you for your interest in IBNI! 🎉
                    </p>
                    <p className="text-gray-600 mb-8">
                      Our education specialists will contact you within 24 hours to schedule your personalized demo session.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-green-700 font-medium">What happens next?</p>
                      <ul className="text-green-600 text-sm mt-2 space-y-1">
                        <li>✓ Confirmation call within 24 hours</li>
                        <li>✓ Personalized demo preparation</li>
                        <li>✓ 15-minute live demonstration</li>
                        <li>✓ Q&A session with our experts</li>
                      </ul>
                    </div>
                    <Button 
                      onClick={() => navigateTo && navigateTo("home")}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    >
                      Return to Home
                    </Button>
                  </div>
                ) : (
                  <>
                    <CardHeader className="pb-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl text-gray-900">Schedule Your Demo</CardTitle>
                          <CardDescription className="text-gray-600 mt-2">
                            Get a personalized demonstration of IBNI's powerful features
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">Step {formStep} of 2</div>
                          <div className="w-32 h-2 bg-gray-100 rounded-full mt-2">
                            <div 
                              className="h-full bg-green-600 rounded-full transition-all duration-300"
                              style={{ width: `${(formStep / 2) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-8">
                      <form onSubmit={handleSubmit}>
                        {formStep === 1 ? (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="h-4 w-4 text-green-600" />
                                    Full Name *
                                  </Label>
                                  <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                    placeholder="Enter your full name"
                                    className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-green-600" />
                                    Email Address *
                                  </Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                    placeholder="Enter your email address"
                                    className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-green-600" />
                                    Phone Number *
                                  </Label>
                                  <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    required
                                    placeholder="+213 XXX XXX XXX"
                                    className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="userType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-green-600" />
                                    I am a *
                                  </Label>
                                  <Select
                                    value={formData.userType}
                                    onValueChange={(value) => handleChange("userType", value)}
                                    required
                                  >
                                    <SelectTrigger id="userType" className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11">
                                      <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="parent">
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-green-600" />
                                          <span>Parent</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="student">
                                        <div className="flex items-center gap-2">
                                          <BookOpen className="h-4 w-4 text-green-600" />
                                          <span>Student</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="teacher">
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-green-600" />
                                          <span>Teacher</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="institution">
                                        <div className="flex items-center gap-2">
                                          <Building className="h-4 w-4 text-green-600" />
                                          <span>School Administrator</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            <div className="mt-10">
                              <Button 
                                type="button" 
                                onClick={handleNextStep} 
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium h-12"
                              >
                                Continue to Scheduling <ArrowRight className="ml-2 h-5 w-5" />
                              </Button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="space-y-8">
                              <div>
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                                  <Calendar className="h-4 w-4 text-green-600" />
                                  Demo Type *
                                </Label>
                                <RadioGroup
                                  value={formData.demoType}
                                  onValueChange={(value) => handleChange("demoType", value)}
                                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
                                    <RadioGroupItem value="online" id="online" />
                                    <Label htmlFor="online" className="cursor-pointer flex-1">
                                      <div className="flex items-center gap-2">
                                        <Video className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">Online Demo</span>
                                      </div>
                                      <div className="text-sm text-gray-500 mt-1">Via video call (15-20 min)</div>
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer">
                                    <RadioGroupItem value="in-person" id="in-person" />
                                    <Label htmlFor="in-person" className="cursor-pointer flex-1">
                                      <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">In-Person Demo</span>
                                      </div>
                                      <div className="text-sm text-gray-500 mt-1">At our office in Tlemcen</div>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <Label htmlFor="preferredDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                    Preferred Date *
                                  </Label>
                                  <div className="relative">
                                    <Input
                                      id="preferredDate"
                                      type="date"
                                      value={formData.preferredDate}
                                      onChange={(e) => handleChange("preferredDate", e.target.value)}
                                      required
                                      min={new Date().toISOString().split("T")[0]}
                                      className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11 pl-10 cursor-pointer"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="preferredTime" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-green-600" />
                                    Preferred Time *
                                  </Label>
                                  <Select
                                    value={formData.preferredTime}
                                    onValueChange={(value) => handleChange("preferredTime", value)}
                                    required
                                  >
                                    <SelectTrigger id="preferredTime" className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 h-11">
                                      <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="9:00 AM">
                                        <div className="flex items-center gap-2">
                                          <Sunrise className="h-4 w-4 text-green-600" />
                                          <span>9:00 AM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="10:00 AM">
                                        <div className="flex items-center gap-2">
                                          <Sun className="h-4 w-4 text-green-600" />
                                          <span>10:00 AM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="11:00 AM">
                                        <div className="flex items-center gap-2">
                                          <Sun className="h-4 w-4 text-green-600" />
                                          <span>11:00 AM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="1:00 PM">
                                        <div className="flex items-center gap-2">
                                          <Sun className="h-4 w-4 text-green-600" />
                                          <span>1:00 PM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="2:00 PM">
                                        <div className="flex items-center gap-2">
                                          <Sun className="h-4 w-4 text-green-600" />
                                          <span>2:00 PM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="3:00 PM">
                                        <div className="flex items-center gap-2">
                                          <Sun className="h-4 w-4 text-green-600" />
                                          <span>3:00 PM</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="4:00 PM">
                                        <div className="flex items-center gap-2">
                                          <Sunset className="h-4 w-4 text-green-600" />
                                          <span>4:00 PM</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                  Additional Information
                                </Label>
                                <Textarea
                                  id="message"
                                  value={formData.message}
                                  onChange={(e) => handleChange("message", e.target.value)}
                                  placeholder="Tell us about your specific needs, questions, or what you'd like to focus on during the demo..."
                                  rows={4}
                                  className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                />
                              </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={handlePrevStep}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                              >
                                <ArrowLeft className="mr-2 h-5 w-5" /> Back
                              </Button>
                              <Button 
                                type="submit" 
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium h-12" 
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Scheduling Demo...
                                  </>
                                ) : (
                                  <>
                                    <Send className="mr-2 h-5 w-5" /> Schedule My Demo
                                  </>
                                )}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </form>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border border-green-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Contact Information</CardTitle>
                  <CardDescription>Need immediate assistance?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">+213 555309404</p>
                      <p className="text-sm text-gray-600">Call us directly</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">ibni.2025dz@gmail.com</p>
                      <p className="text-sm text-gray-600">Email support</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">TLEMCEN, Algeria</p>
                      <p className="text-sm text-gray-600">Visit our office</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Mon-Fri: 9:00 AM - 5:00 PM</p>
                      <p className="text-sm text-gray-600">Business hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
