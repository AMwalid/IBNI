"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface UniformStepProps {
  childInfo: ChildInfo
  uniform: BackpackItem[]
  updateUniform: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock uniform data
const mockUniforms = [
  {
    id: "uniform-1",
    name: "School Apron",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "apron",
    description: "Classic school apron, 100% cotton, with school logo",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["#5e9edc", "pink"],
    gradeLevel: ["primary", "middle", "high"],
    gender: ["boy", "girl"],
  },
  {
    id: "uniform-2",
    name: "Lab Apron",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "uniform",
    subcategory: "lab-apron",
    description: "Laboratory apron, 100% cotton, with school logo",
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y", "12-13y", "14-15y", "16+"],
    colors: ["white"],
    gradeLevel: ["primary", "middle", "high"],
    gender: ["boy", "girl"],
  }
]

export default function UniformStep({ childInfo, uniform, updateUniform, onNext, onBack }: UniformStepProps) {
  const [showSizeChart, setShowSizeChart] = useState(false)
  
  // Add item to uniform
  const addItem = (item: any, size: string, color: string) => {
    const existingItemIndex = uniform.findIndex(
      i => i.id === item.id && i.size === size && i.color === color
    )
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedUniform = [...uniform]
      updatedUniform[existingItemIndex].quantity += 1
      updateUniform(updatedUniform)
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
        size,
        color,
      }
      updateUniform([...uniform, newItem])
    }
  }
  
  // Update item quantity
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedUniform = uniform.filter((_, i) => i !== index)
      updateUniform(updatedUniform)
    } else {
      // Update quantity
      const updatedUniform = [...uniform]
      updatedUniform[index].quantity = quantity
      updateUniform(updatedUniform)
    }
  }
  
  // Calculate total items and cost
  const totalItems = uniform.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = uniform.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Render uniform item card
  const UniformItemCard = ({ item }: { item: any }) => {
    const [selectedSize, setSelectedSize] = useState(item.sizes[0])
    const [selectedColor, setSelectedColor] = useState(item.colors[0])
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="h-40 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
          
          <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium">Size:</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                className="h-5 px-2 text-xs"
                        onClick={() => setShowSizeChart(true)}
                      >
                        <Info className="h-3 w-3 mr-1" />
                        Size Chart
                      </Button>
              </div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {item.sizes.map((size: string) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            
            <div className="mt-2">
              <label className="text-xs font-medium mb-1 block">Color:</label>
              <div className="flex gap-1">
                {item.colors.map((color: string) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColor === color ? 'border-green-600' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <CardFooter className="p-3 pt-0 flex items-center justify-between">
              <span className="font-bold text-green-600">
                {item.price.toFixed(2)} DZD
              </span>
              <Button 
                size="sm" 
                className={`${
                  selectedColor === item.colors[0]
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => addItem(item, selectedSize, selectedColor)}
              >
                {selectedColor === item.colors[0] ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Select School Uniform</h2>
          <p className="text-gray-600 mt-1">
            Choose the size and color for your child's school uniform.
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
      
      {/* Uniform items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUniforms.map((item) => (
                    <UniformItemCard key={item.id} item={item} />
                  ))}
                </div>
      
      {/* Selected items */}
      {uniform.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4">Selected Items</h3>
          <div className="space-y-4">
                  {uniform.map((item, index) => (
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
      
      {/* Size chart dialog */}
      <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Size Chart</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Age</th>
                  <th className="border p-2">Height (cm)</th>
                  <th className="border p-2">Chest (cm)</th>
                  <th className="border p-2">Waist (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">4-5y</td>
                  <td className="border p-2">4-5 years</td>
                  <td className="border p-2">104-110</td>
                  <td className="border p-2">56-58</td>
                  <td className="border p-2">53-54</td>
                </tr>
                <tr>
                  <td className="border p-2">6-7y</td>
                  <td className="border p-2">6-7 years</td>
                  <td className="border p-2">116-122</td>
                  <td className="border p-2">60-62</td>
                  <td className="border p-2">56-57</td>
                </tr>
                <tr>
                  <td className="border p-2">8-9y</td>
                  <td className="border p-2">8-9 years</td>
                  <td className="border p-2">128-134</td>
                  <td className="border p-2">64-68</td>
                  <td className="border p-2">59-61</td>
                </tr>
                <tr>
                  <td className="border p-2">10-11y</td>
                  <td className="border p-2">10-11 years</td>
                  <td className="border p-2">140-146</td>
                  <td className="border p-2">70-72</td>
                  <td className="border p-2">62-63</td>
                </tr>
                <tr>
                  <td className="border p-2">12-13y</td>
                  <td className="border p-2">12-13 years</td>
                  <td className="border p-2">152-158</td>
                  <td className="border p-2">74-76</td>
                  <td className="border p-2">64-65</td>
                </tr>
                <tr>
                  <td className="border p-2">14-15y</td>
                  <td className="border p-2">14-15 years</td>
                  <td className="border p-2">164-170</td>
                  <td className="border p-2">78-80</td>
                  <td className="border p-2">66-67</td>
                </tr>
                <tr>
                  <td className="border p-2">16+</td>
                  <td className="border p-2">16+ years</td>
                  <td className="border p-2">172+</td>
                  <td className="border p-2">82+</td>
                  <td className="border p-2">68+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700 flex items-center"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
