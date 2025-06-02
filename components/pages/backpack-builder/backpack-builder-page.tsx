"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Briefcase,
  User,
  ShoppingBag,
  BookOpen,
  Pencil,
  Palette,
  Laptop,
  ClipboardList,
  ShoppingCart,
  Save,
  Share2,
  X,
  Package,
  Search,
  Backpack
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

// Import step components
import ChildInfoStep from "./steps/child-info-step"
import UniformStep from "./steps/uniform-step"
import BackpackStep from "./steps/backpack-step"
import StationeryStep from "./steps/stationery-step"
import BooksStep from "./steps/books-step"
import CreativeStep from "./steps/creative-step"
import TechStep from "./steps/tech-step"
import ReviewStep from "./steps/review-step"
import CheckoutStep from "./steps/checkout-step"

// Define types
export interface ChildInfo {
  name: string
  grade: string
  gender?: "boy" | "girl" | "unspecified"
}

export interface BackpackItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory?: string
  quantity: number
  size?: string
  color?: string
  alreadyOwned?: boolean
}

export interface BackpackState {
  childInfo: ChildInfo
  uniform: BackpackItem[]
  backpack: BackpackItem[]
  stationery: BackpackItem[]
  books: BackpackItem[]
  creative: BackpackItem[]
  tech: BackpackItem[]
  currentStep: number
  lastCompletedStep: number
}

// Define steps
const steps = [
  { id: 1, name: "Child Info", icon: <User className="h-5 w-5" /> },
  { id: 2, name: "Uniform", icon: <ShoppingBag className="h-5 w-5" /> },
  { id: 3, name: "Backpack", icon: <Briefcase className="h-5 w-5" /> },
  { id: 4, name: "Stationery", icon: <Pencil className="h-5 w-5" /> },
  { id: 5, name: "Books", icon: <BookOpen className="h-5 w-5" /> },
  { id: 6, name: "Creative", icon: <Palette className="h-5 w-5" /> },
  { id: 7, name: "Tech", icon: <Laptop className="h-5 w-5" /> },
  { id: 8, name: "Review", icon: <ClipboardList className="h-5 w-5" /> },
  { id: 9, name: "Checkout", icon: <ShoppingCart className="h-5 w-5" /> },
]

// Initialize empty backpack state
const initialBackpackState: BackpackState = {
  childInfo: {
    name: "",
    grade: "",
  },
  uniform: [],
  backpack: [],
  stationery: [],
  books: [],
  creative: [],
  tech: [],
  currentStep: 1,
  lastCompletedStep: 0,
}

export default function BackpackBuilderPage() {
  const router = useRouter()
  const [backpackState, setBackpackState] = useState<BackpackState>(initialBackpackState)
  const [isSaving, setIsSaving] = useState(false)
  const [showExitPrompt, setShowExitPrompt] = useState(false)

  // Load saved state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("backpackBuilderState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setBackpackState(parsedState)
      } catch (error) {
        console.error("Error parsing saved backpack state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (backpackState.currentStep > 1) {
      localStorage.setItem("backpackBuilderState", JSON.stringify(backpackState))
    }
  }, [backpackState])

  // Calculate progress percentage
  const progressPercentage = ((backpackState.currentStep - 1) / (steps.length - 1)) * 100

  // Navigate to next step
  const goToNextStep = () => {
    if (backpackState.currentStep < steps.length) {
      setBackpackState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        lastCompletedStep: Math.max(prev.lastCompletedStep, prev.currentStep),
      }))
    }
  }

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (backpackState.currentStep > 1) {
      setBackpackState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }))
    }
  }

  // Navigate to specific step (only if it's completed or the next available step)
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= backpackState.lastCompletedStep + 1 && stepNumber <= steps.length) {
      setBackpackState((prev) => ({
        ...prev,
        currentStep: stepNumber,
      }))
    }
  }

  // Update child info
  const updateChildInfo = (childInfo: ChildInfo) => {
    setBackpackState((prev) => ({
      ...prev,
      childInfo,
    }))
  }

  // Add or update items in a category
  const updateItems = (category: keyof BackpackState, items: BackpackItem[]) => {
    if (
      category === "uniform" ||
      category === "backpack" ||
      category === "stationery" ||
      category === "books" ||
      category === "creative" ||
      category === "tech"
    ) {
      setBackpackState((prev) => ({
        ...prev,
        [category]: items,
      }))
    }
  }

  // Save and exit
  const saveAndExit = () => {
    setIsSaving(true)
    // Save current state to localStorage
    localStorage.setItem("backpackBuilderState", JSON.stringify(backpackState))

    setTimeout(() => {
      setIsSaving(false)
      router.push('/')
    }, 1000)
  }

  // Clear backpack and start over
  const clearBackpack = () => {
    localStorage.removeItem("backpackBuilderState")
    setBackpackState(initialBackpackState)
  }

  // Render current step content
  const renderStepContent = () => {
    switch (backpackState.currentStep) {
      case 1:
        return (
          <ChildInfoStep
            childInfo={backpackState.childInfo}
            updateChildInfo={updateChildInfo}
            onNext={goToNextStep}
          />
        )
      case 2:
        return (
          <UniformStep
            childInfo={backpackState.childInfo}
            uniform={backpackState.uniform}
            updateUniform={(items) => updateItems("uniform", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 3:
        return (
          <BackpackStep
            childInfo={backpackState.childInfo}
            backpack={backpackState.backpack}
            updateBackpack={(items) => updateItems("backpack", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 4:
        return (
          <StationeryStep
            childInfo={backpackState.childInfo}
            stationery={backpackState.stationery}
            updateStationery={(items) => updateItems("stationery", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 5:
        return (
          <BooksStep
            childInfo={backpackState.childInfo}
            books={backpackState.books}
            updateBooks={(items) => updateItems("books", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 6:
        return (
          <CreativeStep
            childInfo={backpackState.childInfo}
            creative={backpackState.creative}
            updateCreative={(items) => updateItems("creative", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 7:
        return (
          <TechStep
            childInfo={backpackState.childInfo}
            tech={backpackState.tech}
            updateTech={(items) => updateItems("tech", items)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )
      case 8:
        return (
          <ReviewStep
            backpackState={backpackState}
            updateItems={updateItems}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            goToStep={goToStep}
          />
        )
      case 9:
        return (
          <CheckoutStep
            backpackState={backpackState}
            onBack={goToPreviousStep}
            clearBackpack={clearBackpack}
          />
        )
      default:
        return <div>Unknown step</div>
    }
  }

  // Calculate total items and cost
  const totalItems = [
    ...backpackState.uniform,
    ...backpackState.backpack,
    ...backpackState.stationery,
    ...backpackState.books,
    ...backpackState.creative,
    ...backpackState.tech,
  ].reduce((sum, item) => sum + item.quantity, 0)

  const totalCost = [
    ...backpackState.uniform,
    ...backpackState.backpack,
    ...backpackState.stationery,
    ...backpackState.books,
    ...backpackState.creative,
    ...backpackState.tech,
  ].reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page title */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Build a Backpack</h1>
            {backpackState.currentStep > 1 && backpackState.childInfo.name && (
              <p className="text-gray-600 mt-2">
                Building a backpack for {backpackState.childInfo.name} ({backpackState.childInfo.grade})
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowExitPrompt(true)}
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save & Exit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
            Step {backpackState.currentStep} of {steps.length}
          </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
        </div>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="hidden md:flex justify-between mt-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                step.id <= backpackState.lastCompletedStep + 1
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={() => step.id <= backpackState.lastCompletedStep + 1 && goToStep(step.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                step.id === backpackState.currentStep
                  ? 'bg-green-600 text-white shadow-lg scale-110'
                  : step.id <= backpackState.lastCompletedStep
                    ? 'bg-green-100 text-green-600 border-2 border-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400'
              }`}>
                {step.id <= backpackState.lastCompletedStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <div className="w-5 h-5">{step.icon}</div>
                )}
              </div>
              <span className="text-xs font-medium text-center max-w-[100px]">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Save & Exit Modal */}
      {showExitPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Save & Exit</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowExitPrompt(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mb-4">
              Your progress will be saved. You can continue building {backpackState.childInfo.name}'s backpack later.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowExitPrompt(false)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={saveAndExit}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save & Exit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

