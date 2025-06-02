"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Check, Star, Info, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface BackpackStepProps {
  childInfo: ChildInfo
  backpack: BackpackItem[]
  updateBackpack: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock backpack data
const mockBackpacks = [
  {
    id: "backpack-1",
    name: "Elementary School Backpack",
    price: 2500,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Lightweight backpack with multiple compartments, perfect for younger students.",
    features: ["Padded shoulder straps", "Water bottle pocket", "Front pocket for small items", "Main compartment with divider"],
    dimensions: "30cm x 25cm x 12cm",
    volume: "9L",
    weight: "0.4kg",
    colors: ["blue", "pink", "green", "purple"],
    sizes: ["small"],
    rating: 4.5,
    reviewCount: 128,
    gradeLevel: ["primary"],
  },
  {
    id: "backpack-2",
    name: "Primary School Deluxe Backpack",
    price: 2800,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Premium backpack with extra padding and fun designs for primary school students.",
    features: ["Extra padded straps", "Reflective strips", "Lunch box compartment", "Name tag"],
    dimensions: "32cm x 26cm x 13cm",
    volume: "10L",
    weight: "0.45kg",
    colors: ["red", "yellow", "orange", "purple"],
    sizes: ["small"],
    rating: 4.7,
    reviewCount: 95,
    gradeLevel: ["primary"],
  },
  {
    id: "backpack-3",
    name: "Middle School Backpack",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Durable backpack with laptop sleeve and organized storage for upper elementary and middle school students.",
    features: ["Padded laptop sleeve (up to 13\")", "Ergonomic back panel", "Multiple compartments", "Reinforced bottom"],
    dimensions: "40cm x 30cm x 15cm",
    volume: "18L",
    weight: "0.6kg",
    colors: ["navy", "black", "teal", "red"],
    sizes: ["medium"],
    rating: 4.7,
    reviewCount: 95,
    gradeLevel: ["middle"],
  },
  {
    id: "backpack-4",
    name: "Middle School Pro Backpack",
    price: 3500,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Advanced backpack with enhanced organization and comfort features for middle school students.",
    features: ["Padded laptop sleeve (up to 14\")", "Mesh back panel", "Expandable side pockets", "Hidden security pocket"],
    dimensions: "42cm x 31cm x 16cm",
    volume: "20L",
    weight: "0.65kg",
    colors: ["gray", "burgundy", "navy", "black"],
    sizes: ["medium"],
    rating: 4.8,
    reviewCount: 82,
    gradeLevel: ["middle"],
  },
  {
    id: "backpack-5",
    name: "High School Backpack",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Premium backpack with advanced organization and comfort features for high school students.",
    features: ["Padded laptop sleeve (up to 15\")", "USB charging port", "Anti-theft pocket", "Airflow back system"],
    dimensions: "45cm x 32cm x 18cm",
    volume: "26L",
    weight: "0.8kg",
    colors: ["black", "gray", "navy", "burgundy"],
    sizes: ["large"],
    rating: 4.8,
    reviewCount: 76,
    gradeLevel: ["high"],
  },
  {
    id: "backpack-6",
    name: "High School Elite Backpack",
    price: 4800,
    image: "/placeholder.svg?height=300&width=300",
    category: "backpack",
    subcategory: "backpacks",
    description: "Professional-grade backpack with premium features for demanding high school students.",
    features: ["Padded laptop sleeve (up to 17\")", "Water-resistant material", "RFID blocking pocket", "Smart organization system"],
    dimensions: "46cm x 33cm x 19cm",
    volume: "28L",
    weight: "0.85kg",
    colors: ["black", "navy", "burgundy", "gray"],
    sizes: ["large"],
    rating: 4.9,
    reviewCount: 64,
    gradeLevel: ["high"],
  },
]

export default function BackpackStep({ childInfo, backpack, updateBackpack, onNext, onBack }: BackpackStepProps) {
  const [sortBy, setSortBy] = useState("recommended")
  const [selectedBackpack, setSelectedBackpack] = useState<string | null>(
    backpack.find(item => item.subcategory === "backpacks")?.id || null
  )

  // Filter backpacks based on child's grade
  const filteredBackpacks = mockBackpacks.filter(item => {
    // If no grade is selected, show all backpacks
    if (!childInfo.grade) {
      return true
    }
    
    // Map the grade to the appropriate level
    const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
      ? "primary"
      : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
        ? "middle"
        : "high"
    
    return item.gradeLevel.includes(gradeLevel)
  })

  console.log('Filtered backpacks:', filteredBackpacks)

  // Sort backpacks
  const sortedBackpacks = [...filteredBackpacks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // recommended - keep original order
    }
  })

  // Add backpack to selection
  const addBackpack = (item: any, color: string, size: string) => {
    // Remove any existing backpack
    const updatedBackpack = backpack.filter(i => i.subcategory !== "backpacks")

    // Add the new backpack
    const newItem: BackpackItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      subcategory: item.subcategory,
      quantity: 1,
      color,
      size,
    }

    updateBackpack([...updatedBackpack, newItem])
    setSelectedBackpack(item.id)
  }

  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedBackpack = backpack.filter((_, i) => i !== index)
      if (backpack[index].subcategory === "backpacks") {
        setSelectedBackpack(null)
      }
      updateBackpack(updatedBackpack)
    } else {
      // Update quantity
      const updatedBackpack = [...backpack]
      updatedBackpack[index].quantity = quantity
      updateBackpack(updatedBackpack)
    }
  }

  // Calculate total items and cost
  const totalItems = backpack.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = backpack.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
        <h2 className="text-xl font-semibold">Choose a Backpack</h2>
          <p className="text-gray-600 mt-1">
            Select a backpack that suits your child's needs.
          </p>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedBackpacks.map(item => (
                    <Card
                      key={item.id}
            className={`overflow-hidden hover:shadow-md transition-all duration-300 ${
              selectedBackpack === item.id ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg?height=300&width=300"}
                          alt={item.name}
                className="w-full h-full object-cover"
                        />
                        {selectedBackpack === item.id && (
                          <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium line-clamp-2">{item.name}</CardTitle>
              <div className="flex items-center text-amber-500 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                    className={`h-3 w-3 ${
                                  i < Math.floor(item.rating)
                                    ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                }`}
                                strokeWidth={1}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
                        </div>
                      </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex flex-wrap gap-2 mb-3">
                              {item.colors.map((color: string) => (
                                <button
                                  key={color}
                    className={`w-5 h-5 rounded-full border ${
                      selectedBackpack === item.id && backpack.find(i => i.id === item.id)?.color === color
                                      ? 'border-green-600 scale-110'
                        : 'border-gray-200'
                                  }`}
                                  style={{
                                    backgroundColor:
                                      color === "blue" ? "#1e88e5" :
                                      color === "pink" ? "#ec407a" :
                                      color === "green" ? "#43a047" :
                                      color === "purple" ? "#8e24aa" :
                                      color === "navy" ? "#0d47a1" :
                                      color === "black" ? "#212121" :
                                      color === "teal" ? "#00897b" :
                                      color === "red" ? "#e53935" :
                                      color === "gray" ? "#757575" :
                                      color === "burgundy" ? "#800020" : "#ffffff"
                                  }}
                    onClick={() => addBackpack(item, color, item.sizes[0])}
                                  title={color}
                  />
                ))}
                        </div>
                      </CardContent>
            <CardFooter className="p-3 pt-0 flex items-center justify-between">
                        <span className="font-bold text-green-600">
                {item.price.toFixed(2)} DZD
                        </span>
                        <Button
                size="sm"
                          className={`${
                            selectedBackpack === item.id
                              ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                onClick={() => addBackpack(item, item.colors[0], item.sizes[0])}
                        >
                          {selectedBackpack === item.id ? "Selected" : "Select"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

      {/* Selected items */}
      {backpack.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4">Selected Items</h3>
          <div className="space-y-4">
                  {backpack.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                          />
                        <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Color: {item.color}
                    </p>
                        </div>
                      </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateItemQuantity(index, item.quantity - 1)}
                        >
                      <Minus className="h-4 w-4" />
                        </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateItemQuantity(index, item.quantity + 1)}
                        >
                      <Plus className="h-4 w-4" />
                        </Button>
                  </div>
                  <p className="font-medium text-green-600">
                    {(item.price * item.quantity).toFixed(2)} DZD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
