"use client"

import React, { useState } from "react"
import { ArrowLeft, Plus, Pencil, Trash2, Copy, Share2, Printer, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChildInfo, BackpackItem } from "./backpack-builder-page"
import { useRouter } from "next/navigation"

interface PreviewProps {
  childInfo: ChildInfo
  backpack: BackpackItem[]
  onBack: () => void
  onEdit: () => void
}

export default function Preview({ 
  childInfo, 
  backpack, 
  onBack,
  onEdit
}: PreviewProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  // Calculate total price
  const totalPrice = backpack.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  // Group items by category
  const groupedItems = backpack.reduce((groups, item) => {
    const category = item.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {} as Record<string, BackpackItem[]>)

  // Handle duplicate backpack
  const handleDuplicate = () => {
    // Create a new backpack with the same items
    const newBackpack = backpack.map(item => ({
      ...item,
      id: `${item.id}-copy-${Date.now()}`,
      quantity: item.quantity
    }))
    
    // Store the duplicated backpack in localStorage
    const savedBackpacks = JSON.parse(localStorage.getItem('savedBackpacks') || '[]')
    savedBackpacks.push({
      id: `backpack-${Date.now()}`,
      childInfo,
      items: newBackpack,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('savedBackpacks', JSON.stringify(savedBackpacks))
    
    // Show success message
    alert('Backpack duplicated successfully!')
  }

  // Handle share backpack
  const handleShare = async () => {
    try {
      // Create shareable content
      const shareContent = {
        title: `${childInfo.name}'s Backpack`,
        text: `Check out ${childInfo.name}'s school backpack!`,
        url: window.location.href
      }

      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share(shareContent)
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      alert('Failed to share backpack')
    }
  }

  // Handle print list
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      const content = `
        <html>
          <head>
            <title>${childInfo.name}'s Backpack List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .item { margin: 10px 0; }
              .category { margin-top: 20px; font-weight: bold; }
              .total { margin-top: 20px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${childInfo.name}'s Backpack List</h1>
            <p>Grade: ${childInfo.grade}</p>
            <p>Gender: ${childInfo.gender}</p>
            <hr/>
            ${Object.entries(groupedItems).map(([category, items]) => `
              <div class="category">${category.toUpperCase()}</div>
              ${items.map(item => `
                <div class="item">
                  ${item.name} - Quantity: ${item.quantity} - ${item.price} DZD
                </div>
              `).join('')}
            `).join('')}
            <hr/>
            <div class="total">Total: ${totalPrice} DZD</div>
          </body>
        </html>
      `
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Handle save to wishlist
  const handleSaveToWishlist = () => {
    // Get existing wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    // Add current backpack to wishlist
    wishlist.push({
      id: `wishlist-${Date.now()}`,
      childInfo,
      items: backpack,
      createdAt: new Date().toISOString()
    })
    
    // Save updated wishlist
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    
    // Show success message
    alert('Backpack saved to wishlist!')
  }

  // Handle edit backpack
  const handleEdit = () => {
    onEdit()
  }

  // Handle delete backpack
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this backpack?')) {
      // Remove the backpack from localStorage
      const savedBackpacks = JSON.parse(localStorage.getItem('savedBackpacks') || '[]')
      const updatedBackpacks = savedBackpacks.filter((b: any) => b.id !== childInfo.id)
      localStorage.setItem('savedBackpacks', JSON.stringify(updatedBackpacks))
      
      // Navigate back to the backpack builder
      router.push('/backpack-builder')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Backpack Preview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="flex items-center"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-medium mb-2">Child Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><span className="font-medium">Name:</span> {childInfo.name}</p>
          <p><span className="font-medium">Grade:</span> {childInfo.grade}</p>
          <p><span className="font-medium">Gender:</span> {childInfo.gender}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-medium mb-4">Selected Items</h3>
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lg font-medium mb-3 capitalize">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="mt-2">
                            <Badge variant="outline" className="mr-2">
                              Quantity: {item.quantity}
                            </Badge>
                            <Badge variant="outline" className="text-green-600">
                              {item.price} DZD
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Backpack Summary</h3>
        <Card className="border-2 border-gray-200 mb-4">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Child:</span>
                <span>{childInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Grade:</span>
                <span>{childInfo.grade}</span>
              </div>
              {Object.entries(groupedItems).map(([category, items]) => {
                const categoryTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                return (
                  <div key={category} className="flex justify-between items-center">
                    <span className="font-medium capitalize">{category}:</span>
                    <span className="font-medium">{categoryTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DZD</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center">
                <span className="font-medium">Items:</span>
                <span>{backpack.length}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DZD
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Estimated delivery within 24h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            size="lg"
            onClick={handleDuplicate}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Copy className="mr-2 h-5 w-5" />
            Duplicate Backpack
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="flex items-center justify-center"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Backpack
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrint}
            className="flex items-center justify-center"
          >
            <Printer className="mr-2 h-5 w-5" />
            Print List
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleSaveToWishlist}
            className="flex items-center justify-center"
          >
            <Heart className="mr-2 h-5 w-5" />
            Save to Wishlist
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-gray-200 hover:border-blue-500 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Credit Card</h4>
                  <p className="text-sm text-gray-500">Pay with Visa or Mastercard</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-blue-500 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Cash on Delivery</h4>
                  <p className="text-sm text-gray-500">Pay when you receive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-blue-500 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Yassir Cash</h4>
                  <p className="text-sm text-gray-500">Pay with Yassir wallet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
} 