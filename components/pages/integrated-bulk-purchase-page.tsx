"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, X, Package, ArrowLeft, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import StoreLayout from "@/components/store/store-layout"
import { products } from "@/data/mock-store-data" // Assuming this exists or you can create it

interface IntegratedBulkPurchasePageProps {
  navigateTo?: (page: string) => void
}

export default function IntegratedBulkPurchasePage({ navigateTo }: IntegratedBulkPurchasePageProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [bulkItems, setBulkItems] = useState<
    {
      id: string
      name: string
      price: number
      quantity: number
      image: string
    }[]
  >([])
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
  }

  const handleAddItem = (product: any) => {
    if (!bulkItems.some((item) => item.id === product.id)) {
      setBulkItems([
        ...bulkItems,
        {
          id: product.id,
          name: product.title,
          price: product.price_dzd,
          quantity: 1,
          image: product.thumbnail,
        },
      ])
    }
  }

  const handleRemoveItem = (id: string) => {
    setBulkItems(bulkItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    setBulkItems(
      bulkItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    )
  }

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      // If we're in the main app context, use the navigateTo function
      navigateTo(path)
    } else {
      // Otherwise use the router
      router.push(path)
    }
  }

  const totalItems = bulkItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = bulkItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Format price in DZD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length} navigateTo={navigateTo}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-800">Bulk Purchase</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select Products</h2>
              <p className="text-gray-600 mb-6">
                Add multiple products to your bulk order for schools, institutions, or large groups.
              </p>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8">
                    Search
                  </Button>
                </div>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.slice(0, 6).map((product) => (
                  <Card key={product.id} className="flex p-3 hover:shadow-md transition-shadow">
                    <img
                      src={product.thumbnail || "/placeholder.svg?height=80&width=80"}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded mr-3"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                      <p className="text-green-600 font-semibold mt-1">{formatPrice(product.price_dzd)}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() => handleAddItem(product)}
                        disabled={bulkItems.some((item) => item.id === product.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {bulkItems.length === 0 ? (
                <p className="text-gray-500 italic my-8 text-center">No items added yet</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {bulkItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img
                          src={item.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-600 text-xs">{formatPrice(item.price)} each</p>
                        </div>
                        <div className="flex items-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-500"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bulk Discount:</span>
                      <span className="font-medium text-green-600">-{formatPrice(totalPrice * 0.1)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">{formatPrice(totalPrice * 0.9)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">Proceed to Checkout</Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </StoreLayout>
  )
}
