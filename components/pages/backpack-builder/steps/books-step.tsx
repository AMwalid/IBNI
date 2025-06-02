"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChildInfo, BackpackItem } from "../backpack-builder-page"

interface BooksStepProps {
  childInfo: ChildInfo
  books: BackpackItem[]
  updateBooks: (items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
}

// Mock books data
const mockBooks = [
  // Primary School Books (Grades 1-3)
  {
    id: "book-1",
    name: "Mathematics for Primary School",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "mathematics",
    description: "Comprehensive mathematics textbook for primary school students",
    gradeLevel: ["primary"],
    subject: "Mathematics",
  },
  {
    id: "book-2",
    name: "English Language Arts",
    price: 1100,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "english",
    description: "English language and literature textbook for primary school",
    gradeLevel: ["primary"],
    subject: "English",
  },
  {
    id: "book-3",
    name: "Science for Young Learners",
    price: 1300,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "science",
    description: "Interactive science textbook with colorful illustrations",
    gradeLevel: ["primary"],
    subject: "Science",
  },

  // Middle School Books (Grades 4-5)
  {
    id: "book-4",
    name: "Advanced Mathematics",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "mathematics",
    description: "Advanced mathematics concepts for upper primary grades",
    gradeLevel: ["middle"],
    subject: "Mathematics",
  },
  {
    id: "book-5",
    name: "English Literature",
    price: 1400,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "english",
    description: "Classic literature and language skills for middle school",
    gradeLevel: ["middle"],
    subject: "English",
  },
  {
    id: "book-6",
    name: "General Science",
    price: 1600,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "science",
    description: "Comprehensive science textbook covering multiple disciplines",
    gradeLevel: ["middle"],
    subject: "Science",
  },

  // High School Books (Grades 6-8)
  {
    id: "book-7",
    name: "Algebra and Geometry",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "mathematics",
    description: "Advanced algebra and geometry concepts for high school",
    gradeLevel: ["high"],
    subject: "Mathematics",
  },
  {
    id: "book-8",
    name: "World Literature",
    price: 1700,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "english",
    description: "Collection of world literature and literary analysis",
    gradeLevel: ["high"],
    subject: "English",
  },
  {
    id: "book-9",
    name: "Physics and Chemistry",
    price: 1900,
    image: "/placeholder.svg?height=300&width=300",
    category: "books",
    subcategory: "science",
    description: "Advanced physics and chemistry concepts",
    gradeLevel: ["high"],
    subject: "Science",
  },
]

export default function BooksStep({ 
  childInfo, 
  books, 
  updateBooks, 
  onNext, 
  onBack 
}: BooksStepProps) {
  const [activeSubject, setActiveSubject] = useState("all")
  
  // Group items by subject
  const subjects = {
    all: mockBooks.filter(item => {
      // If no grade is selected, show all books
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
    mathematics: mockBooks.filter(item => {
      if (!childInfo.grade) return item.subcategory === "mathematics"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "mathematics" && item.gradeLevel.includes(gradeLevel)
    }),
    english: mockBooks.filter(item => {
      if (!childInfo.grade) return item.subcategory === "english"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "english" && item.gradeLevel.includes(gradeLevel)
    }),
    science: mockBooks.filter(item => {
      if (!childInfo.grade) return item.subcategory === "science"
      
      const gradeLevel = childInfo.grade.includes("1") || childInfo.grade.includes("2") || childInfo.grade.includes("3") 
        ? "primary"
        : childInfo.grade.includes("4") || childInfo.grade.includes("5") || childInfo.grade.includes("6")
          ? "middle"
          : "high"
      
      return item.subcategory === "science" && item.gradeLevel.includes(gradeLevel)
    }),
  }
  
  // Add book to selection
  const addBook = (item: any) => {
    const existingItemIndex = books.findIndex(i => i.id === item.id)
    
    if (existingItemIndex >= 0) {
      // Update quantity if book already exists
      const updatedBooks = [...books]
      updatedBooks[existingItemIndex].quantity += 1
      updateBooks(updatedBooks)
    } else {
      // Add new book
      const newItem: BackpackItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        subcategory: item.subcategory,
        quantity: 1,
      }
      updateBooks([...books, newItem])
    }
  }
  
  // Update book quantity
  const updateBookQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      // Remove book if quantity is 0 or less
      const updatedBooks = books.filter((_, i) => i !== index)
      updateBooks(updatedBooks)
    } else {
      // Update quantity
      const updatedBooks = [...books]
      updatedBooks[index].quantity = quantity
      updateBooks(updatedBooks)
    }
  }
  
  // Calculate total items and cost
  const totalItems = books.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = books.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Render book item card
  const BookItemCard = ({ item }: { item: any }) => {
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
                {item.subject}
              </span>
              <span className="font-bold text-green-600">
                {item.price.toFixed(2)} DZD
              </span>
            </div>
            
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 w-full"
              onClick={() => addBook(item)}
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
          <h2 className="text-xl font-semibold">Add Books by Grade</h2>
          <p className="text-gray-600 mt-1">
            Select books for {childInfo.name}'s grade level ({childInfo.grade}).
          </p>
        </div>
        
        {totalItems > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'book' : 'books'} selected
            </p>
            <p className="text-lg font-medium text-green-600">
              {(totalCost).toFixed(2)} DZD
            </p>
          </div>
        )}
      </div>
      
      {/* Subject tabs */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveSubject}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Books grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects[activeSubject as keyof typeof subjects].map((item) => (
          <BookItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Selected books */}
      {books.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4">Selected Books</h3>
          <div className="space-y-4">
            {books.map((item, index) => (
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
                      {mockBooks.find(i => i.id === item.id)?.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateBookQuantity(index, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateBookQuantity(index, item.quantity + 1)}
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
