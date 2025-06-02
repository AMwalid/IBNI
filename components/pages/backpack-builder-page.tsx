"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  ShoppingCart,
  ChevronLeft,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  School,
  BookOpen,
  Pencil,
  Ruler,
  Scissors,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  description: string
  stock: number
  isOnSale?: boolean
  isNew?: boolean
  discountPercentage?: number
  tags?: string[]
  deliveryTime?: string
  audience?: string[]
  gradeLevel?: string[]
}

interface CartItem {
  product: Product
  quantity: number
}

interface GradeLevel {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export default function BackpackBuilderPage() {
  const router = useRouter()
  const [backpackStep, setBackpackStep] = useState(1)
  const [backpackGrade, setBackpackGrade] = useState("")
  const [backpackItems, setBackpackItems] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  // Mock grade levels
  const gradeLevels: GradeLevel[] = [
    {
      id: "grade-1-3",
      name: "Grades 1-3",
      description: "Elementary school early years",
      icon: <School className="h-5 w-5" />,
    },
    {
      id: "grade-4-5",
      name: "Grades 4-5",
      description: "Elementary school upper grades",
      icon: <School className="h-5 w-5" />,
    },
    {
      id: "grade-6-8",
      name: "Grades 6-8",
      description: "Middle school",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "grade-9-12",
      name: "Grades 9-12",
      description: "High school",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  // Mock product categories
  const categories = [
    { id: "all", name: "All Items", icon: <Briefcase className="h-4 w-4" /> },
    { id: "writing", name: "Writing Supplies", icon: <Pencil className="h-4 w-4" /> },
    { id: "notebooks", name: "Notebooks", icon: <BookOpen className="h-4 w-4" /> },
    { id: "measuring", name: "Measuring Tools", icon: <Ruler className="h-4 w-4" /> },
    { id: "cutting", name: "Cutting Tools", icon: <Scissors className="h-4 w-4" /> },
    { id: "art", name: "Art Supplies", icon: <Palette className="h-4 w-4" /> },
  ]

  // Mock products data
  const products: Product[] = [
    {
      id: "prod1",
      name: "Standard Notebook",
      price: 120,
      image: "/placeholder.svg?height=300&width=300",
      category: "notebooks",
      rating: 4.5,
      reviewCount: 128,
      description: "Standard ruled notebook, 80 pages, perfect for everyday use.",
      stock: 150,
      gradeLevel: ["grade-1-3", "grade-4-5", "grade-6-8", "grade-9-12"],
    },
    {
      id: "prod2",
      name: "Colored Pencils - 12 Pack",
      price: 350,
      image: "/placeholder.svg?height=300&width=300",
      category: "art",
      rating: 4.7,
      reviewCount: 85,
      description: "Set of 12 colored pencils for drawing and coloring.",
      stock: 42,
      gradeLevel: ["grade-1-3", "grade-4-5", "grade-6-8"],
    },
    {
      id: "prod3",
      name: "Ballpoint Pens - 5 Pack",
      price: 180,
      image: "/placeholder.svg?height=300&width=300",
      category: "writing",
      rating: 4.3,
      reviewCount: 62,
      description: "Pack of 5 blue ballpoint pens, medium point.",
      stock: 35,
      gradeLevel: ["grade-4-5", "grade-6-8", "grade-9-12"],
    },
    {
      id: "prod4",
      name: "Student Scissors",
      price: 95,
      image: "/placeholder.svg?height=300&width=300",
      category: "cutting",
      rating: 4.6,
      reviewCount: 47,
      description: "Safety scissors with blunt tip design for classroom safety.",
      stock: 28,
      gradeLevel: ["grade-1-3", "grade-4-5"],
    },
    {
      id: "prod5",
      name: "Plastic Ruler - 30cm",
      price: 75,
      image: "/placeholder.svg?height=300&width=300",
      category: "measuring",
      rating: 4.2,
      reviewCount: 53,
      description: "Clear plastic ruler with centimeter and inch markings.",
      stock: 65,
      gradeLevel: ["grade-1-3", "grade-4-5", "grade-6-8", "grade-9-12"],
    },
    {
      id: "prod6",
      name: "Graphing Notebook",
      price: 150,
      image: "/placeholder.svg?height=300&width=300",
      category: "notebooks",
      rating: 4.8,
      reviewCount: 34,
      description: "Graphing notebook with 5mm grid, 100 pages.",
      stock: 42,
      gradeLevel: ["grade-6-8", "grade-9-12"],
    },
  ]

  // Filter products based on selected grade and category
  const filteredProducts = products.filter((product) => {
    const matchesGrade = !backpackGrade || (product.gradeLevel && product.gradeLevel.includes(backpackGrade))
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    
    return matchesGrade && matchesCategory
  })

  // Add product to backpack
  const addToBackpack = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existingItem = backpackItems.find((item) => item.product.id === productId)
    if (existingItem) {
      setBackpackItems(
        backpackItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setBackpackItems([...backpackItems, { product, quantity: 1 }])
    }
  }

  // Remove product from backpack
  const removeFromBackpack = (productId: string) => {
    setBackpackItems(backpackItems.filter((item) => item.product.id !== productId))
  }

  // Update backpack item quantity
  const updateBackpackItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBackpack(productId)
    } else {
      setBackpackItems(
        backpackItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  // Calculate backpack total
  const backpackItemsTotal = backpackItems.reduce((total, item) => {
    const price = item.product.isOnSale
      ? item.product.price * (1 - (item.product.discountPercentage || 0) / 100)
      : item.product.price
    return total + price * item.quantity
  }, 0)

  // Add backpack to cart
  const addBackpackToCart = () => {
    // This would typically add all items to the cart
    // For now, we'll just reset the backpack builder
    alert("Backpack added to cart!")
    setBackpackItems([])
    setBackpackGrade("")
    setBackpackStep(1)
  }

  // Backpack item component
  const BackpackItem = ({ item, onRemove, onUpdateQuantity }: { 
    item: CartItem
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
  }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-3">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-sm">{item.product.name}</p>
          <p className="text-xs text-gray-500">{(item.product.price / 100).toFixed(2)} DZD</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onUpdateQuantity(item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/store')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-green-600">Backpack Builder</h1>
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`flex items-center ${backpackStep >= 1 ? "text-green-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                backpackStep >= 1 ? "bg-green-100" : "bg-gray-100"
              }`}>
                1
              </div>
              <span>Grade</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300" />
            <div className={`flex items-center ${backpackStep >= 2 ? "text-green-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                backpackStep >= 2 ? "bg-green-100" : "bg-gray-100"
              }`}>
                2
              </div>
              <span>Items</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300" />
            <div className={`flex items-center ${backpackStep >= 3 ? "text-green-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                backpackStep >= 3 ? "bg-green-100" : "bg-gray-100"
              }`}>
                3
              </div>
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg border p-6">
        {backpackStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Select Grade Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gradeLevels.map((grade) => (
                <div
                  key={grade.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    backpackGrade === grade.id
                      ? "border-green-500 bg-green-50"
                      : "hover:border-green-200 hover:bg-green-50/50"
                  }`}
                  onClick={() => setBackpackGrade(grade.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      backpackGrade === grade.id ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {grade.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{grade.name}</h3>
                      <p className="text-sm text-gray-500">{grade.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setBackpackStep(2)}
                disabled={!backpackGrade}
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {backpackStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Select Backpack Items</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories sidebar */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center ${
                          activeCategory === category.id
                            ? "bg-green-100 text-green-700 font-medium"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span className="mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {backpackItems.length > 0 && (
                  <div className="mt-6 bg-green-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Your Backpack</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {backpackItems.reduce((total, item) => total + item.quantity, 0)} items selected
                    </p>
                    <p className="text-sm font-medium mb-3">
                      Total: {(backpackItemsTotal / 100).toFixed(2)} DZD
                    </p>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setBackpackStep(3)}
                    >
                      Review Backpack
                    </Button>
                  </div>
                )}
              </div>

              {/* Products grid */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-base mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-green-600">
                            {(product.price / 100).toFixed(2)} DZD
                          </span>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => addToBackpack(product.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setBackpackStep(1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setBackpackStep(3)}
                disabled={backpackItems.length === 0}
              >
                Review Backpack
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {backpackStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Review Your Backpack</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {backpackItems.map((item) => (
                    <BackpackItem
                      key={item.product.id}
                      item={item}
                      onRemove={() => removeFromBackpack(item.product.id)}
                      onUpdateQuantity={(quantity) => updateBackpackItemQuantity(item.product.id, quantity)}
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-green-50 rounded-lg border p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Backpack Summary</h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Grade Level:</p>
                    <p className="font-medium">{gradeLevels.find((g) => g.id === backpackGrade)?.name}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Items:</p>
                    <p className="font-medium">{backpackItems.reduce((total, item) => total + item.quantity, 0)}</p>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total:</span>
                    <span>{(backpackItemsTotal / 100).toFixed(2)} DZD</span>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 mb-2"
                    onClick={addBackpackToCart}
                    disabled={backpackItems.length === 0}
                  >
                    Add to Cart
                  </Button>

                  <Button variant="outline" className="w-full" onClick={() => setBackpackStep(2)}>
                    Add More Items
                  </Button>

                  <div className="mt-6 p-4 bg-green-100 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Backpack Tips</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Consider adding extra supplies for mid-year replacements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Don't forget subject-specific materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Check with your school for any specific requirements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setBackpackStep(2)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Items
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={addBackpackToCart}
                disabled={backpackItems.length === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
