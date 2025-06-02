"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import StoreLayout from "@/components/store/store-layout"

interface IntegratedBackpackBuilderPageProps {
  navigateTo?: (page: string) => void
}

export default function IntegratedBackpackBuilderPage({ navigateTo }: IntegratedBackpackBuilderPageProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  // Mock steps for the backpack builder wizard
  const steps = [
    { id: 1, name: "Child Information" },
    { id: 2, name: "School Grade" },
    { id: 3, name: "Notebooks" },
    { id: 4, name: "Stationery" },
    { id: 5, name: "Textbooks" },
    { id: 6, name: "Backpack" },
    { id: 7, name: "Lunch Box" },
    { id: 8, name: "Uniform" },
    { id: 9, name: "Review & Checkout" },
  ]

  // Mock child information state
  const [childInfo, setChildInfo] = useState({
    name: "",
    age: "",
    gender: "",
    school: "",
  })

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      // If we're in the main app context, use the navigateTo function
      navigateTo(path)
    } else {
      // Otherwise use the router
      router.push(path)
    }
  }

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChildInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setChildInfo({
      ...childInfo,
      [name]: value,
    })
  }

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Child Information</h2>
            <p className="text-gray-600">
              Please provide information about the child who will be using this backpack.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={childInfo.name}
                  onChange={handleChildInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter child's name"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={childInfo.age}
                  onChange={handleChildInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter child's age"
                  min="3"
                  max="18"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={childInfo.gender}
                  onChange={handleChildInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                  School Name (Optional)
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={childInfo.school}
                  onChange={handleChildInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter school name"
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">School Grade</h2>
            <p className="text-gray-600">Select your child's grade level to help us recommend appropriate items.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["Preschool", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Middle School", "High School"].map((grade) => (
                <Card key={grade} className="cursor-pointer hover:border-green-500 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="font-medium">{grade}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      // Additional steps would be implemented here
      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Checkout</h2>
            <p className="text-gray-600">Review your selections and proceed to checkout.</p>
            <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Your backpack is ready!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                You've successfully built a custom backpack for {childInfo.name || "your child"}.
              </p>
            </div>
            {/* Summary would go here */}
            <div className="mt-8">
              <Button className="w-full bg-green-600 hover:bg-green-700">Proceed to Checkout</Button>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Step {currentStep} content is under development.</p>
          </div>
        )
    }
  }

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length} navigateTo={navigateTo}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-green-800">Build a Backpack</h1>
        <p className="text-gray-600 mb-8">
          Create a custom backpack with all the supplies your child needs for school.
        </p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Steps indicator */}
        <div className="hidden md:flex justify-between mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                step.id === currentStep
                  ? "text-green-600"
                  : step.id < currentStep
                  ? "text-gray-500"
                  : "text-gray-300"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.id === currentStep
                    ? "bg-green-100 border-2 border-green-600"
                    : step.id < currentStep
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className="text-xs text-center">{step.name}</span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <Card className="mb-8">
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={currentStep === steps.length ? () => console.log("Checkout") : goToNextStep}
            className="bg-green-600 hover:bg-green-700 flex items-center"
          >
            {currentStep === steps.length ? "Checkout" : "Next"}
            {currentStep !== steps.length && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </StoreLayout>
  )
}
