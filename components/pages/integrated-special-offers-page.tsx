"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tag, Search, Filter, Grid, List, Package, Backpack, Heart, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import ProductGrid from "@/components/store/product-grid"
import ProductCard from "@/components/store/product-card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"

interface IntegratedSpecialOffersPageProps {
  navigateTo?: (page: string) => void
}

interface SpecialOffer {
  id: string
  title: string
  description: string
  price_dzd: number
  original_price_dzd: number
  thumbnail: string
  valid_until: string
  category: string
  rating?: number
  stock?: number
  isNew?: boolean
  isOnSale?: boolean
}

export default function IntegratedSpecialOffersPage({ navigateTo }: IntegratedSpecialOffersPageProps) {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  // Mock special offers data
  const specialOffers: SpecialOffer[] = [
    {
      id: "desk-executive",
      title: "Executive Wood Desk",
      description: "Premium mahogany desk with built-in storage and cable management system",
      price_dzd: 4599900,
      original_price_dzd: 5299900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-30",
      category: "Office Furniture",
      rating: 4.8,
      stock: 5,
      isOnSale: true
    },
    {
      id: "desk-student",
      title: "Student Study Desk",
      description: "Compact study desk perfect for students with bookshelf and drawer",
      price_dzd: 1899900,
      original_price_dzd: 2299900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-30",
      category: "Office Furniture",
      rating: 4.5,
      stock: 12,
      isOnSale: true
    },
    {
      id: "physics-bac",
      title: "Bac Physics Guide",
      description: "Complete baccalaureate physics curriculum with practice problems",
      price_dzd: 3200,
      original_price_dzd: 3800,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-08-31",
      category: "Books",
      rating: 4.7,
      stock: 25,
      isOnSale: true
    },
    {
      id: "math-bac",
      title: "Bac Mathematics Guide",
      description: "Comprehensive mathematics guide for baccalaureate students",
      price_dzd: 3500,
      original_price_dzd: 4200,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-08-31",
      category: "Books",
      rating: 4.8,
      stock: 20,
      isOnSale: true
    },
    {
      id: "a4-notebook",
      title: "A4 Notebook Pack",
      description: "5-pack 100-page lined notebooks with durable covers",
      price_dzd: 1200,
      original_price_dzd: 1500,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-15",
      category: "School Supplies",
      rating: 4.4,
      stock: 100,
      isOnSale: true
    },
    {
      id: "spiral-notebook",
      title: "Spiral Notebooks",
      description: "Pack of 3 spiral-bound notebooks with 80 pages each",
      price_dzd: 850,
      original_price_dzd: 1000,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-15",
      category: "School Supplies",
      rating: 4.3,
      stock: 75,
      isOnSale: true
    },
    {
      id: "laptop-bag",
      title: "Leather Laptop Bag",
      description: "Professional laptop bag with multiple compartments",
      price_dzd: 18900,
      original_price_dzd: 22900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-30",
      category: "Office Supplies",
      rating: 4.6,
      stock: 15,
      isOnSale: true
    },
    {
      id: "student-backpack",
      title: "Student Backpack",
      description: "Durable backpack with laptop sleeve and water bottle pocket",
      price_dzd: 12900,
      original_price_dzd: 15900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-09-30",
      category: "Office Supplies",
      rating: 4.5,
      stock: 30,
      isOnSale: true
    },
    {
      id: "stem-kit",
      title: "STEM Building Kit",
      description: "Educational building kit with 250 pieces",
      price_dzd: 3999,
      original_price_dzd: 4999,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-10-15",
      category: "Kids",
      rating: 4.8,
      stock: 25,
      isOnSale: true
    },
    {
      id: "math-games",
      title: "Math Learning Games",
      description: "Set of interactive math games for ages 6-12",
      price_dzd: 2999,
      original_price_dzd: 3799,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-10-15",
      category: "Kids",
      rating: 4.7,
      stock: 18,
      isOnSale: true
    },
    {
      id: "english-course",
      title: "English Mastery Program",
      description: "6-month intensive English language course",
      price_dzd: 29900,
      original_price_dzd: 35900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-10-31",
      category: "Courses",
      rating: 4.9,
      stock: 50,
      isOnSale: true
    },
    {
      id: "french-course",
      title: "French Language Course",
      description: "Complete French language learning program",
      price_dzd: 27900,
      original_price_dzd: 33900,
      thumbnail: "/placeholder.svg?height=300&width=300",
      valid_until: "2024-10-31",
      category: "Courses",
      rating: 4.8,
      stock: 45,
      isOnSale: true
    }
  ]

  const handleAddToCart = (productId: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productId)

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity = quantity
      setCartItems(updatedItems)
    } else {
      setCartItems([...cartItems, { id: productId, quantity }])
    }
  }

  const handleAddToWishlist = (productId: string) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId))
    } else {
      setWishlistItems([...wishlistItems, productId])
    }
  }

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      navigateTo(path)
    } else {
      router.push(path)
    }
  }

  const filteredOffers = specialOffers.filter(offer =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Special Offers</h1>
        <p className="text-gray-600">Exclusive deals and discounts on educational products</p>
      </div>

      {/* Featured Offer Banner */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <Badge className="mb-2 bg-green-600">Limited Time</Badge>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Back to School Sale</h2>
              <p className="text-gray-700 mb-4">
                Get up to 40% off on school supplies, textbooks, and more. Prepare for the new school year with our
                exclusive deals!
              </p>
              <Button className="bg-green-600 hover:bg-green-700">Shop Now</Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Back to School Sale"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilters.length === 0 ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveFilters([])}
            className="rounded-full"
          >
            All Offers
          </Button>
          {["Books", "School Supplies", "Office Supplies", "Courses", "Furniture"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                if (activeFilters.includes(filter)) {
                  setActiveFilters(activeFilters.filter((f) => f !== filter))
                } else {
                  setActiveFilters([...activeFilters, filter])
                }
              }}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "space-y-4"}>
        {filteredOffers.map((offer) => (
          <ProductCard
            key={offer.id}
            product={{
              id: offer.id,
              title: offer.title,
              description: offer.description,
              price_dzd: offer.price_dzd,
              original_price_dzd: offer.original_price_dzd,
              thumbnail: offer.thumbnail,
              category: offer.category,
              rating: offer.rating,
              stock: offer.stock,
              isNew: offer.isNew,
              isOnSale: offer.isOnSale
            }}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            viewMode={viewMode}
            className={viewMode === "list" ? "flex flex-col md:flex-row" : "compact"}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
        </div>
      )}

      {/* Wishlist Sheet */}
      <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
        <SheetContent side="right" className="w-[400px] max-w-full z-[100]">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Your Wishlist</SheetTitle>
            <SheetDescription>
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 flex flex-col h-[calc(100vh-12rem)]">
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-1">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-4">Save items you like for later</p>
                <SheetClose asChild>
                  <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
                </SheetClose>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow overflow-y-auto">
                  {wishlistItems.map((itemId) => {
                    const item = specialOffers.find(offer => offer.id === itemId)
                    if (!item) return null
                    return (
                      <div key={item.id} className="flex items-start py-4 border-b">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.title}</h4>
                            <Button variant="ghost" size="icon" onClick={() => handleAddToWishlist(item.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{item.price_dzd.toLocaleString()} DZD</div>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                handleAddToCart(item.id, 1)
                                setIsWishlistOpen(false)
                              }}
                              disabled={item.stock === 0}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
