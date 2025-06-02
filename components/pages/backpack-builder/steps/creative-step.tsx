"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface CreativeStepProps {
  childInfo: ChildInfo
  creative: BackpackItem[]
  updateCreative: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock creative supplies data
const mockCreativeSupplies = [
  {
    id: "creative-1",
    name: "Basic Art Set",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "art",
    description: "Complete art set with crayons, colored pencils, and watercolors.",
    features: ["24 crayons", "12 colored pencils", "8 watercolors", "2 paintbrushes"],
    colors: ["multicolor"],
    sizes: ["standard"],
    rating: 4.5,
    reviewCount: 128,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "creative-2",
    name: "Deluxe Art Kit",
    price: 2500,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "art",
    description: "Premium art kit with professional-grade supplies.",
    features: ["36 colored pencils", "24 watercolors", "5 paintbrushes", "Sketch pad"],
    colors: ["multicolor"],
    sizes: ["standard"],
    rating: 4.8,
    reviewCount: 95,
    gradeLevel: ["middle", "high"],
  },
  {
    id: "creative-3",
    name: "Craft Paper Pack",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "craft",
    description: "Assorted craft papers for various projects.",
    features: ["50 sheets", "Multiple colors", "Different textures", "Easy to cut"],
    colors: ["multicolor"],
    sizes: ["standard"],
    rating: 4.3,
    reviewCount: 76,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "creative-4",
    name: "Premium Craft Kit",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "craft",
    description: "Complete craft kit with premium materials.",
    features: ["100 sheets", "Decorative elements", "Glue and scissors", "Project guide"],
    colors: ["multicolor"],
    sizes: ["standard"],
    rating: 4.7,
    reviewCount: 64,
    gradeLevel: ["middle", "high"],
  },
  {
    id: "creative-5",
    name: "Basic Drawing Set",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "drawing",
    description: "Essential drawing supplies for beginners.",
    features: ["6 pencils", "Eraser", "Sharpener", "Sketchbook"],
    colors: ["black"],
    sizes: ["standard"],
    rating: 4.4,
    reviewCount: 89,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "creative-6",
    name: "Professional Drawing Kit",
    price: 2200,
    image: "/placeholder.svg?height=300&width=300",
    category: "creative",
    subcategory: "drawing",
    description: "Professional drawing supplies for advanced artists.",
    features: ["12 pencils", "Blending tools", "Premium sketchbook", "Carrying case"],
    colors: ["black"],
    sizes: ["standard"],
    rating: 4.9,
    reviewCount: 52,
    gradeLevel: ["middle", "high"],
  },
]

export default function CreativeStep({ 
  childInfo, 
  creative, 
  updateCreative, 
  onNext, 
  onBack 
}: CreativeStepProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  // Add or update creative supply
  const addCreativeSupply = (item: BackpackItem) => {
    const existingItem = creative.find(i => i.id === item.id)
    
    if (existingItem) {
      const updatedItems = creative.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
      updateCreative(updatedItems)
    } else {
      updateCreative([...creative, { ...item, quantity: 1 }])
    }
  }

  // Remove creative supply
  const removeCreativeSupply = (itemId: string) => {
    const existingItem = creative.find(i => i.id === itemId)
    
    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = creative.map(i => 
        i.id === itemId 
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      updateCreative(updatedItems)
    } else {
      const updatedItems = creative.filter(i => i.id !== itemId)
      updateCreative(updatedItems)
    }
  }

  // Group items by category
  const categories = {
    all: mockCreativeSupplies.filter(item => {
      // If no grade is selected, show all items
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
    }),
    art: mockCreativeSupplies.filter(item => {
      if (!childInfo.grade) return item.subcategory === "art"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "art" && item.gradeLevel.includes(gradeLevel)
    }),
    craft: mockCreativeSupplies.filter(item => {
      if (!childInfo.grade) return item.subcategory === "craft"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "craft" && item.gradeLevel.includes(gradeLevel)
    }),
    drawing: mockCreativeSupplies.filter(item => {
      if (!childInfo.grade) return item.subcategory === "drawing"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "drawing" && item.gradeLevel.includes(gradeLevel)
    }),
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Choose Creative Supplies</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Select creative supplies to enhance {childInfo.name}'s artistic and creative development.
        These items are optional but can help develop creativity and artistic skills.
      </p>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All Items</TabsTrigger>
          <TabsTrigger value="art" className="flex-1">Art Supplies</TabsTrigger>
          <TabsTrigger value="craft" className="flex-1">Craft Supplies</TabsTrigger>
          <TabsTrigger value="drawing" className="flex-1">Drawing Supplies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.all.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">{item.price} DZD</span>
                    <div className="flex items-center gap-2">
                      {creative.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeCreativeSupply(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {creative.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addCreativeSupply(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addCreativeSupply(item)}
                        >
                          Add to Backpack
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="art">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.art.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">{item.price} DZD</span>
                    <div className="flex items-center gap-2">
                      {creative.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeCreativeSupply(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {creative.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addCreativeSupply(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addCreativeSupply(item)}
                        >
                          Add to Backpack
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="craft">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.craft.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">{item.price} DZD</span>
                    <div className="flex items-center gap-2">
                      {creative.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeCreativeSupply(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {creative.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addCreativeSupply(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addCreativeSupply(item)}
                        >
                          Add to Backpack
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drawing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.drawing.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">{item.price} DZD</span>
                    <div className="flex items-center gap-2">
                      {creative.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeCreativeSupply(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {creative.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addCreativeSupply(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addCreativeSupply(item)}
                        >
                          Add to Backpack
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 flex items-center">
          {creative.length === 0 ? "Skip this step" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
