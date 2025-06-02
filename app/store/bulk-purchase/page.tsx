"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, X, Package, ArrowLeft, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { products } from "@/data/mock-store-data"

export default function BulkPurchasePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [bulkItems, setBulkItems] = useState<{ product: any; quantity: number }[]>([])

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Bulk purchase functions
  const addToBulkItems = (product: any) => {
    const existingItem = bulkItems.find((item) => item.product.id === product.id)

    if (existingItem) {
      setBulkItems(
        bulkItems.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      )
    } else {
      setBulkItems([...bulkItems, { product, quantity: 1 }])
    }
  }

  const removeFromBulkItems = (productId: string) => {
    setBulkItems(bulkItems.filter((item) => item.product.id !== productId))
  }

  const updateBulkItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromBulkItems(productId)
      return
    }

    setBulkItems(bulkItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Calculate bulk items total
  const bulkItemsTotal = bulkItems.reduce((total, item) => total + item.product.price_dzd * item.quantity, 0)

  // Bulk Item Component
  const BulkItem = ({
    item,
    onRemove,
    onUpdateQuantity,
  }: {
    item: { product: any; quantity: number }
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
  }) => (
    <div className="flex items-start py-4 border-b">
      <img
        src={item.product.thumbnail || "/placeholder.svg"}
        alt={item.product.title}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.product.title}</h4>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500 mb-2">{item.product.category}</div>
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
          <div className="font-medium">{((item.product.price_dzd * item.quantity) / 100).toFixed(2)} DZD</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with search and cart - matching the store page header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-green-600">IBNI Store</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <Button
            variant="outline"
            className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200 bg-green-50"
            aria-pressed={true}
          >
            <Package className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Bulk Purchase</span>
          </Button>

          <Button
            variant="outline"
            className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
            onClick={() => {
              try {
                window.location.href = '/backpack-builder';
              } catch (error) {
                console.error("Navigation failed:", error);
                // Fallback behavior
                window.location.href = '/backpack-builder';
              }
            }}
          >
            <Briefcase className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Build a Backpack</span>
          </Button>
        </div>
      </div>

      {/* Back to Store button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-green-600"
          onClick={() => window.location.href = '/store'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Button>
      </div>

      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8 text-green-800">Bulk Purchase</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bulk Purchase for Institutions</h2>
            <p className="text-gray-600 mb-6">
              Select multiple products and quantities for your institution or business. Enjoy special pricing and
              streamlined ordering.
            </p>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Search Results</h3>
              {searchQuery ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex p-3">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm line-clamp-2">{product.title}</h4>
                          <p className="text-sm text-green-600 font-medium mt-1">
                            {(product.price_dzd / 100).toFixed(2)} DZD
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="h-8 bg-green-600 hover:bg-green-700"
                          onClick={() => addToBulkItems(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Enter a search term to find products</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg border p-6 sticky top-6">
            <h3 className="font-semibold mb-4">Your Bulk Order</h3>

            {bulkItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No items added yet</p>
                <p className="text-sm text-gray-400 mt-1">Search and add products to your bulk order</p>
              </div>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto mb-4">
                  {bulkItems.map((item) => (
                    <BulkItem
                      key={item.product.id}
                      item={item}
                      onRemove={() => removeFromBulkItems(item.product.id)}
                      onUpdateQuantity={(quantity) => updateBulkItemQuantity(item.product.id, quantity)}
                    />
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-medium mb-2">
                  <span>Total Items:</span>
                  <span>{bulkItems.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>

                <div className="flex justify-between font-medium mb-4">
                  <span>Total Amount:</span>
                  <span>{(bulkItemsTotal / 100).toFixed(2)} DZD</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setBulkItems([])}>
                    Clear All
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  For volume discounts or special pricing, please contact our sales team at ibni.2025dz@gmail.com
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}