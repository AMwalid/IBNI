"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface TechStepProps {
  childInfo: ChildInfo
  tech: BackpackItem[]
  updateTech: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock tech gear data
const mockTechGear = [
  {
    id: "tech-1",
    name: "Basic Calculator",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "calculators",
    description: "Simple calculator for basic math operations.",
    features: ["Basic operations", "Solar powered", "Compact design", "Durable case"],
    colors: ["black", "blue", "pink"],
    sizes: ["standard"],
    rating: 4.3,
    reviewCount: 156,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "tech-2",
    name: "Scientific Calculator",
    price: 3500,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "calculators",
    description: "Advanced calculator for complex calculations.",
    features: ["Scientific functions", "Memory storage", "Battery powered", "Protective case"],
    colors: ["black", "silver"],
    sizes: ["standard"],
    rating: 4.7,
    reviewCount: 89,
    gradeLevel: ["middle", "high"],
  },
  {
    id: "tech-3",
    name: "USB Flash Drive",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "storage",
    description: "Portable storage for school projects and assignments.",
    features: ["16GB storage", "USB 3.0", "Durable design", "Keychain attachment"],
    colors: ["black", "blue", "red"],
    sizes: ["standard"],
    rating: 4.5,
    reviewCount: 234,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "tech-4",
    name: "External Hard Drive",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "storage",
    description: "Large capacity storage for extensive projects.",
    features: ["1TB storage", "USB 3.0", "Shock resistant", "Backup software"],
    colors: ["black", "silver"],
    sizes: ["standard"],
    rating: 4.8,
    reviewCount: 112,
    gradeLevel: ["middle", "high"],
  },
  {
    id: "tech-5",
    name: "Basic Headphones",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "audio",
    description: "Comfortable headphones for online learning.",
    features: ["3.5mm jack", "Adjustable headband", "Soft ear cushions", "Inline mic"],
    colors: ["black", "blue", "pink"],
    sizes: ["standard"],
    rating: 4.4,
    reviewCount: 178,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "tech-6",
    name: "Premium Headphones",
    price: 3800,
    image: "/placeholder.svg?height=300&width=300",
    category: "tech",
    subcategory: "audio",
    description: "High-quality headphones for immersive learning.",
    features: ["Noise cancellation", "Bluetooth", "Long battery life", "Carrying case"],
    colors: ["black", "silver"],
    sizes: ["standard"],
    rating: 4.9,
    reviewCount: 95,
    gradeLevel: ["middle", "high"],
  },
]

export default function TechStep({ 
  childInfo, 
  tech, 
  updateTech, 
  onNext, 
  onBack 
}: TechStepProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  // Add or update tech gear
  const addTechGear = (item: BackpackItem) => {
    const existingItem = tech.find(i => i.id === item.id)
    
    if (existingItem) {
      const updatedItems = tech.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
      updateTech(updatedItems)
    } else {
      updateTech([...tech, { ...item, quantity: 1 }])
    }
  }

  // Remove tech gear
  const removeTechGear = (itemId: string) => {
    const existingItem = tech.find(i => i.id === itemId)
    
    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = tech.map(i => 
        i.id === itemId 
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      updateTech(updatedItems)
    } else {
      const updatedItems = tech.filter(i => i.id !== itemId)
      updateTech(updatedItems)
    }
  }

  // Group items by category
  const categories = {
    all: mockTechGear.filter(item => {
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
    calculators: mockTechGear.filter(item => {
      if (!childInfo.grade) return item.subcategory === "calculators"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "calculators" && item.gradeLevel.includes(gradeLevel)
    }),
    storage: mockTechGear.filter(item => {
      if (!childInfo.grade) return item.subcategory === "storage"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "storage" && item.gradeLevel.includes(gradeLevel)
    }),
    audio: mockTechGear.filter(item => {
      if (!childInfo.grade) return item.subcategory === "audio"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "audio" && item.gradeLevel.includes(gradeLevel)
    }),
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Choose Tech Gear</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Select tech gear to enhance {childInfo.name}'s learning experience.
        These items are optional but can help with digital learning and assignments.
      </p>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All Items</TabsTrigger>
          <TabsTrigger value="calculators" className="flex-1">Calculators</TabsTrigger>
          <TabsTrigger value="storage" className="flex-1">Storage</TabsTrigger>
          <TabsTrigger value="audio" className="flex-1">Audio</TabsTrigger>
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
                      {tech.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeTechGear(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {tech.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addTechGear(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addTechGear(item)}
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
        
        <TabsContent value="calculators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.calculators.map(item => (
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
                      {tech.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeTechGear(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {tech.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addTechGear(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addTechGear(item)}
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
        
        <TabsContent value="storage">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.storage.map(item => (
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
                      {tech.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeTechGear(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {tech.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addTechGear(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addTechGear(item)}
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
        
        <TabsContent value="audio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.audio.map(item => (
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
                      {tech.find(i => i.id === item.id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeTechGear(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {tech.find(i => i.id === item.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addTechGear(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => addTechGear(item)}
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
          {tech.length === 0 ? "Skip this step" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
