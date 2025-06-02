"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit2, Trash2, Share2, Printer, Save } from "lucide-react"
import { BackpackState } from "./backpack-builder/backpack-builder-page"

interface SavedBackpack {
  id: string
  childInfo: {
    name: string
    grade: string
  }
  items: BackpackState
  createdAt: string
}

export default function MyBackpacks() {
  const router = useRouter()
  const [savedBackpacks, setSavedBackpacks] = useState<SavedBackpack[]>([])

  useEffect(() => {
    // Load saved backpacks from localStorage
    const loadSavedBackpacks = () => {
      const saved = JSON.parse(localStorage.getItem('savedBackpacks') || '[]')
      setSavedBackpacks(saved)
    }

    loadSavedBackpacks()
  }, [])

  // Calculate total items and cost for a backpack
  const calculateTotals = (backpack: BackpackState) => {
    const totalItems = [
      ...backpack.uniform,
      ...backpack.backpack,
      ...backpack.stationery,
      ...backpack.books,
      ...backpack.creative,
      ...backpack.tech,
    ].reduce((sum, item) => sum + item.quantity, 0)

    const totalCost = [
      ...backpack.uniform,
      ...backpack.backpack,
      ...backpack.stationery,
      ...backpack.books,
      ...backpack.creative,
      ...backpack.tech,
    ].reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return { totalItems, totalCost }
  }

  // Handle delete backpack
  const handleDelete = (backpackId: string) => {
    if (confirm('Are you sure you want to delete this backpack?')) {
      const updatedBackpacks = savedBackpacks.filter(b => b.id !== backpackId)
      localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks))
      setSavedBackpacks(updatedBackpacks)
    }
  }

  // Handle edit backpack
  const handleEdit = (backpack: SavedBackpack) => {
    // Save the backpack to be edited in localStorage
    localStorage.setItem('backpackBuilderState', JSON.stringify(backpack.items))
    router.push('/backpack-builder')
  }

  // Handle share backpack
  const handleShare = async (backpack: SavedBackpack) => {
    try {
      const shareContent = {
        title: `${backpack.childInfo.name}'s Backpack`,
        text: `Check out ${backpack.childInfo.name}'s school backpack!`,
        url: window.location.href
      }

      if (navigator.share) {
        await navigator.share(shareContent)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      alert('Failed to share backpack')
    }
  }

  // Handle print list
  const handlePrint = (backpack: SavedBackpack) => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      const { totalItems, totalCost } = calculateTotals(backpack.items)
      const content = `
        <html>
          <head>
            <title>${backpack.childInfo.name}'s Backpack List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .item { margin: 10px 0; }
              .category { margin-top: 20px; font-weight: bold; }
              .total { margin-top: 20px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${backpack.childInfo.name}'s Backpack List</h1>
            <p>Grade: ${backpack.childInfo.grade}</p>
            <p>Created: ${new Date(backpack.createdAt).toLocaleDateString()}</p>
            <hr/>
            ${Object.entries(backpack.items).map(([category, items]) => {
              if (Array.isArray(items) && items.length > 0) {
                return `
                  <div class="category">${category.toUpperCase()}</div>
                  ${items.map(item => `
                    <div class="item">
                      ${item.name} - Quantity: ${item.quantity} - ${(item.price).toFixed(2)} DZD
                    </div>
                  `).join('')}
                `
              }
              return ''
            }).join('')}
            <hr/>
            <div class="total">Total Items: ${totalItems}</div>
            <div class="total">Total Cost: ${(totalCost).toFixed(2)} DZD</div>
          </body>
        </html>
      `
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-green-800">My Backpacks</h1>
        </div>
      </div>

      {savedBackpacks.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-1">No saved backpacks</h3>
          <p className="text-gray-500 mb-4">Start building a backpack to see it here</p>
          <Button 
            onClick={() => router.push('/backpack-builder')}
            className="bg-green-600 hover:bg-green-700"
          >
            Build a Backpack
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBackpacks.map((backpack) => {
            const { totalItems, totalCost } = calculateTotals(backpack.items)
            return (
              <Card key={backpack.id}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{backpack.childInfo.name}'s Backpack</h3>
                    <p className="text-gray-600">{backpack.childInfo.grade}</p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(backpack.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Items:</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{(totalCost).toFixed(2)} DZD</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(backpack)}
                      className="flex items-center justify-center"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(backpack.id)}
                      className="flex items-center justify-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(backpack)}
                      className="flex items-center justify-center"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrint(backpack)}
                      className="flex items-center justify-center"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
} 