"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface StationeryStepProps {
  childInfo: ChildInfo
  stationery: BackpackItem[]
  updateStationery: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock stationery data
const mockStationery = [
  {
    id: "pencil-1",
    name: "HB Pencils (Pack of 12)",
    price: 300,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "writing",
    description: "High-quality HB pencils, perfect for everyday writing",
    quantity: 12,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "pen-1",
    name: "Blue Ballpoint Pens (Pack of 10)",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "writing",
    description: "Smooth-writing blue ballpoint pens",
    quantity: 10,
    gradeLevel: ["middle", "high"],
  },
  {
    id: "notebook-1",
    name: "A4 Notebook (200 pages)",
    price: 600,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "paper",
    description: "High-quality A4 notebook with 200 pages",
    quantity: 1,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "ruler-1",
    name: "30cm Plastic Ruler",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "tools",
    description: "Clear plastic ruler with metric and imperial measurements",
    quantity: 1,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "eraser-1",
    name: "White Eraser (Pack of 3)",
    price: 200,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "writing",
    description: "Soft white erasers that erase cleanly",
    quantity: 3,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "scissors-1",
    name: "Safety Scissors",
    price: 350,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "tools",
    description: "Child-safe scissors with rounded tips",
    quantity: 1,
    gradeLevel: ["primary", "middle"],
  },
  {
    id: "pencil-case-1",
    name: "Basic Pencil Case",
    price: 450,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "accessories",
    description: "Simple and durable pencil case with zipper closure",
    quantity: 1,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "pencil-case-2",
    name: "Deluxe Pencil Case with Compartments",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "accessories",
    description: "Multi-compartment pencil case with mesh pockets and elastic loops",
    quantity: 1,
    gradeLevel: ["primary", "middle", "high"],
  },
  {
    id: "pencil-case-3",
    name: "Art Pencil Case",
    price: 650,
    image: "/placeholder.svg?height=300&width=300",
    category: "stationery",
    subcategory: "accessories",
    description: "Large capacity pencil case perfect for art supplies",
    quantity: 1,
    gradeLevel: ["primary", "middle", "high"],
  }
]

export default function StationeryStep({ 
  childInfo, 
  stationery, 
  updateStationery, 
  onNext, 
  onBack 
}: StationeryStepProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  
  // Group items by category
  const categories = {
    all: mockStationery,
    writing: mockStationery.filter(item => item.subcategory === "writing"),
    paper: mockStationery.filter(item => item.subcategory === "paper"),
    tools: mockStationery.filter(item => item.subcategory === "tools"),
    accessories: mockStationery.filter(item => item.subcategory === "accessories"),
  }
  
  // Add item to stationery
  const addItem = (item: any) => {
    const existingItemIndex = stationery.findIndex(i => i.id === item.id)
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedStationery = [...stationery]
      updatedStationery[existingItemIndex].quantity += 1
      updateStationery(updatedStationery)
    } else {
      // Add new item
      const newItem: BackpackItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        subcategory: item.subcategory,
        quantity: 1,
      }
      updateStationery([...stationery, newItem])
    }
  }
  
  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedStationery = stationery.filter((_, i) => i !== index)
      updateStationery(updatedStationery)
    } else {
      // Update quantity
      const updatedStationery = [...stationery]
      updatedStationery[index].quantity = quantity
      updateStationery(updatedStationery)
    }
  }
  
  // Calculate total items and cost
  const totalItems = stationery.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = stationery.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Render stationery item card
  const StationeryItemCard = ({ item }: { item: any }) => {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="h-40 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
          <div className="h-10 mt-1">
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">
                Pack of {item.quantity}
              </span>
              <span className="font-bold text-green-600">
                {item.price.toFixed(2)} DZD
              </span>
            </div>
            
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 w-full"
              onClick={() => addItem(item)}
            >
              Add to Backpack
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Add Stationery Supplies</h2>
          <p className="text-gray-600 mt-1">
            Select stationery items for {childInfo.name}'s backpack.
          </p>
        </div>
        
        {totalItems > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
            </p>
            <p className="text-lg font-medium text-green-600">
              {(totalCost).toFixed(2)} DZD
            </p>
          </div>
        )}
      </div>
      
      {/* Category tabs */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="paper">Paper</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Stationery items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories[activeCategory as keyof typeof categories].map((item) => (
          <StationeryItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Selected items */}
      {stationery.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4">Selected Items</h3>
          <div className="space-y-4">
            {stationery.map((item, index) => (
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
                      Pack of {mockStationery.find(i => i.id === item.id)?.quantity}
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
