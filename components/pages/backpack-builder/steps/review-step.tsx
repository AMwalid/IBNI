"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Edit2, Trash2, Share2, Printer, Save, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackpackState, BackpackItem } from "../backpack-builder-page"
import { BackpacksList } from "../backpacks-list"

interface ReviewStepProps {
  backpackState: BackpackState
  updateItems: (category: keyof BackpackState, items: BackpackItem[]) => void
  onNext: () => void
  onBack: () => void
  goToStep: (step: number) => void
}

export default function ReviewStep({ 
  backpackState, 
  updateItems, 
  onNext, 
  onBack,
  goToStep
}: ReviewStepProps) {
  const [savedBackpacks, setSavedBackpacks] = useState<any[]>([])
  const [selectedBackpack, setSelectedBackpack] = useState<string | null>(null)
  const [editingBackpack, setEditingBackpack] = useState<any | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const loadBackpacks = () => {
      const saved = localStorage.getItem('savedBackpacks')
      if (saved) {
        setSavedBackpacks(JSON.parse(saved))
      }
    }
    loadBackpacks()

    // Listen for backpack updates
    const handleBackpackUpdate = () => {
      loadBackpacks()
    }
    window.addEventListener('backpack-updated', handleBackpackUpdate)
    return () => {
      window.removeEventListener('backpack-updated', handleBackpackUpdate)
    }
  }, [])

  const handleEditBackpack = (backpack: any) => {
    setEditingBackpack(backpack)
    // Update the current backpack state with the selected backpack's items
    Object.entries(backpack.items).forEach(([category, items]) => {
      updateItems(category as keyof BackpackState, items as BackpackItem[])
    })
  }

  const handleBackpackUpdate = (updatedBackpack: any) => {
    const updatedBackpacks = savedBackpacks.map(bp => 
      bp.id === updatedBackpack.id ? updatedBackpack : bp
    )
    setSavedBackpacks(updatedBackpacks)
    localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks))
    setRefreshKey(prev => prev + 1)
  }

  const handleDuplicate = () => {
    const timestamp = Date.now()
    const newBackpack = {
      id: `backpack-${timestamp}`,
      childInfo: backpackState.childInfo,
      items: {
        uniform: backpackState.uniform.map(item => ({ ...item, id: `${item.id}-${timestamp}` })),
        backpack: backpackState.backpack.map(item => ({ ...item, id: `${item.id}-${timestamp}` })),
        stationery: backpackState.stationery.map(item => ({ ...item, id: `${item.id}-${timestamp}` })),
        books: backpackState.books.map(item => ({ ...item, id: `${item.id}-${timestamp}` })),
        creative: backpackState.creative.map(item => ({ ...item, id: `${item.id}-${timestamp}` })),
        tech: backpackState.tech.map(item => ({ ...item, id: `${item.id}-${timestamp}` }))
      },
      createdAt: new Date().toISOString()
    }

    // Get existing backpacks from localStorage
    const existingBackpacks = localStorage.getItem('savedBackpacks')
    const currentBackpacks = existingBackpacks ? JSON.parse(existingBackpacks) : []
    
    // Add the new backpack
    const updatedBackpacks = [...currentBackpacks, newBackpack]
    
    // Save to localStorage
    localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks))
    
    // Update state
    setSavedBackpacks(updatedBackpacks)
    
    // Dispatch custom event to notify BackpacksList to refresh
    window.dispatchEvent(new Event('backpack-updated'))
    
    // Show success message
    alert('Backpack duplicated successfully! You can find it in the "All Backpacks" tab.')
  }

  // Calculate totals for the current backpack
  const calculateCurrentBackpackTotals = () => {
    const allItems = [
      ...backpackState.uniform,
      ...backpackState.backpack,
      ...backpackState.stationery,
      ...backpackState.books,
      ...backpackState.creative,
      ...backpackState.tech,
    ]

    const totalItems = allItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    const totalCost = allItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)

    return { totalItems, totalCost }
  }

  // Calculate totals for all saved backpacks
  const calculateAllBackpacksTotals = () => {
    const allItems = savedBackpacks.flatMap(backpack => {
      if (!backpack.items) return [];
      return [
        ...(backpack.items.uniform || []),
        ...(backpack.items.backpack || []),
        ...(backpack.items.stationery || []),
        ...(backpack.items.books || []),
        ...(backpack.items.creative || []),
        ...(backpack.items.tech || [])
      ];
    });

    const totalItems = allItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    const totalCost = allItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)

    return { totalItems, totalCost }
  }

  const { totalItems, totalCost } = calculateCurrentBackpackTotals()
  const { totalItems: allTotalItems, totalCost: allTotalCost } = calculateAllBackpacksTotals()

  const renderCategoryItems = (category: string, items: BackpackItem[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">
              Quantity: {item.quantity} × {item.price} DZD
            </p>
            <p className="text-sm font-medium text-green-600">
              Total: {(item.price * item.quantity).toFixed(2)} DZD
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Backpacks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backpack items by category */}
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="all" className="flex-1">All Backpacks</TabsTrigger>
              <TabsTrigger value="current" className="flex-1">Current Backpack</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <BackpacksList 
                onEditBackpack={handleEditBackpack}
                onBackpackUpdate={handleBackpackUpdate}
              />
            </TabsContent>
            
            <TabsContent value="current">
              <div className="space-y-6">
                {backpackState.uniform.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Uniform Items</h3>
                      {renderCategoryItems("uniform", backpackState.uniform)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.backpack.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Backpack & Accessories</h3>
                      {renderCategoryItems("backpack", backpackState.backpack)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.stationery.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Stationery Supplies</h3>
                      {renderCategoryItems("stationery", backpackState.stationery)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.books.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Books</h3>
                      {renderCategoryItems("books", backpackState.books)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.creative.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Creative Supplies</h3>
                      {renderCategoryItems("creative", backpackState.creative)}
                    </CardContent>
                  </Card>
                )}
                
                {backpackState.tech.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Tech Gear</h3>
                      {renderCategoryItems("tech", backpackState.tech)}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-green-50 rounded-lg border p-4 sticky top-24">
            <h3 className="font-semibold mb-3">Backpack Summary</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Child:</p>
              <p className="font-medium">{backpackState.childInfo.name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Grade:</p>
              <p className="font-medium">{backpackState.childInfo.grade.replace('-', ' ')}</p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Current Backpack Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Backpack Cost:</span>
                <span className="font-medium text-green-600">
                  {totalCost.toFixed(2)} DZD
                </span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between">
                <span>All Backpacks Items:</span>
                <span className="font-medium">{allTotalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>All Backpacks Cost:</span>
                <span className="font-medium text-green-600">
                  {allTotalCost.toFixed(2)} DZD
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleDuplicate}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Backpack
              </Button>
              
              <Button
                onClick={onNext}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
