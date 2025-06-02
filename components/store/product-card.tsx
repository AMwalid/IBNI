"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Plus, Minus, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Add price formatting function
const formatPrice = (price: number): string => {
  // Convert to string and split by decimal point
  const [whole, decimal] = price.toString().split('.')
  
  // Format the whole number part with commas
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
  // Return formatted price with decimal if it exists
  return decimal ? `${formattedWhole}.${decimal}` : formattedWhole
}

export interface Product {
  id: string
  title: string
  category: string
  subcategory?: string
  price_dzd: number
  original_price_dzd?: number
  description: string
  thumbnail: string
  rating?: number
  isNew?: boolean
  isOnSale?: boolean
  stock?: number
}

export interface CourseProduct extends Product {
  creator_type: "Teacher" | "School"
  creator: {
    name: string
    profile_image?: string
    logo_image?: string
  }
  grade_level: string
  subject: string
  language: string
  school_affiliation: string
}

interface ProductCardProps {
  product: Product | CourseProduct
  onAddToCart: (productId: string, quantity: number) => void
  onAddToWishlist?: (productId: string) => void
  className?: string
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist, className, viewMode = "grid" }: ProductCardProps) {
  const [count, setCount] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleAddToCart = () => {
    setCount(1)
    onAddToCart(product.id, 1)
  }

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    onAddToCart(product.id, newCount)
  }

  const handleDecrement = () => {
    const newCount = Math.max(count - 1, 0)
    setCount(newCount)
    if (newCount === 0) {
      // Remove from cart logic could be added here
    } else {
      onAddToCart(product.id, newCount)
    }
  }

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    if (onAddToWishlist) {
      onAddToWishlist(product.id)
    }
  }

  const isCourse = product.category === "Courses"
  const courseProduct = isCourse ? (product as CourseProduct) : null

  // Handle different view modes
  if (viewMode === "list") {
    return (
      <div className="border border-border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-48 h-48 overflow-hidden">
            <Image
              src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <Heart className={cn("w-5 h-5", isInWishlist ? "fill-green-600 text-green-600" : "text-gray-400")} />
            </button>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && <Badge className="bg-green-600">New</Badge>}
              {product.isOnSale && <Badge className="bg-red-500">Sale</Badge>}
              {isCourse && <Badge className="bg-blue-600">Course</Badge>}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground line-clamp-2 mb-1">{product.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{product.category}</p>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mt-2 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("h-4 w-4", i < Math.floor(product.rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300")}
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-2 hidden sm:block">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-green-600">{formatPrice(product.price_dzd)}</span>
                  {product.isOnSale && product.original_price_dzd && (
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      {formatPrice(product.original_price_dzd)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {(product.stock || 0) > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => onAddToCart(product.id, 1)}
                disabled={product.stock === 0}
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original grid view
  return (
    <div
      className={cn(
        "border border-border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col",
        className?.includes("compact") ? "text-xs" : "",
        className,
      )}
    >
      {/* Product Image with badges */}
      <div className="relative">
        <div className={cn("overflow-hidden", className?.includes("compact") ? "aspect-[4/3]" : "aspect-square")}>
          <Image
            src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={cn(
            "absolute top-1 right-1 bg-white/80 rounded-full shadow-sm hover:bg-white",
            className?.includes("compact") ? "p-0.5" : "p-1.5"
          )}
        >
          <Heart className={cn(
            className?.includes("compact") ? "w-3 h-3" : "w-5 h-5",
            isInWishlist ? "fill-green-600 text-green-600" : "text-gray-500 hover:text-green-600"
          )} />
        </button>

        {/* Badges */}
        <div className="absolute top-1 left-1 flex flex-col gap-0.5">
          {product.isNew && <Badge className={cn("bg-green-600", className?.includes("compact") ? "text-[10px] px-1 py-0 h-4" : "")}>New</Badge>}
          {product.isOnSale && <Badge className={cn("bg-red-500", className?.includes("compact") ? "text-[10px] px-1 py-0 h-4" : "")}>Sale</Badge>}
          {isCourse && <Badge className={cn("bg-blue-600", className?.includes("compact") ? "text-[10px] px-1 py-0 h-4" : "")}>Course</Badge>}
        </div>
      </div>

      {/* Product Info */}
      <div className={cn("flex flex-col flex-grow", className?.includes("compact") ? "p-1.5" : "p-4")}>
        <div className="mb-1.5 flex-grow">
          <h3 className={cn("font-medium line-clamp-2 hover:text-green-700 transition-colors", className?.includes("compact") ? "text-sm" : "text-lg")}>{product.title}</h3>
          <p className={cn("text-gray-500", className?.includes("compact") ? "text-[10px] mt-0" : "text-sm mt-0.5")}>{product.category}</p>
        </div>

        {/* Course Creator Info - Only for courses */}
        {isCourse && courseProduct && courseProduct.creator && (
          <div className="flex items-center mt-2 mb-3 border-t border-b border-gray-100 py-2">
            {courseProduct.creator_type === "Teacher" ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={courseProduct.creator.profile_image || "/placeholder.svg?height=50&width=50"}
                    alt={courseProduct.creator.name || "Teacher"}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Teacher</p>
                  <p className="text-sm font-medium">{courseProduct.creator.name || "Unknown Teacher"}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md overflow-hidden mr-2 bg-white p-0.5">
                  <Image
                    src={courseProduct.creator.logo_image || "/placeholder.svg?height=50&width=50"}
                    alt={courseProduct.creator.name || "School"}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">School</p>
                  <p className="text-sm font-medium">{courseProduct.creator.name || "Unknown School"}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Course Additional Info - Only for courses */}
        {isCourse && courseProduct && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Grade</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.grade_level}</p>
            </div>
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Subject</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.subject}</p>
            </div>
            <div className="text-center p-1.5 bg-green-50 rounded-md">
              <p className="text-xs text-gray-500">Language</p>
              <p className="text-xs font-medium text-green-700">{courseProduct.language}</p>
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className={cn(
          "flex items-center justify-between mt-auto border-t border-border",
          className?.includes("compact") ? "pt-1.5" : "pt-3"
        )}>
          <div>
            {product.original_price_dzd ? (
              <div>
                <p className={cn(
                  "font-bold text-green-600",
                  className?.includes("compact") ? "text-sm" : "text-lg"
                )}>{formatPrice(product.price_dzd)} DZD</p>
                <p className={cn(
                  "text-gray-500 line-through",
                  className?.includes("compact") ? "text-[10px]" : "text-sm"
                )}>{formatPrice(product.original_price_dzd)} DZD</p>
              </div>
            ) : (
              <p className={cn(
                "font-bold text-green-600",
                className?.includes("compact") ? "text-sm" : "text-lg"
              )}>{formatPrice(product.price_dzd)} DZD</p>
            )}
          </div>

          <div>
            {count === 0 ? (
              <Button
                size={className?.includes("compact") ? "xs" : "sm"}
                onClick={handleAddToCart}
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-white",
                  className?.includes("compact") ? "h-6 text-[10px] px-1.5" : ""
                )}
              >
                <ShoppingCart className={cn(className?.includes("compact") ? "w-3 h-3 mr-0.5" : "w-4 h-4 mr-2")} />
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  className={cn(
                    className?.includes("compact") ? "w-5 h-5" : "w-8 h-8",
                    "border-green-600 text-green-600 hover:bg-green-50"
                  )}
                >
                  <Minus className={className?.includes("compact") ? "w-2 h-2" : "w-4 h-4"} />
                </Button>
                <span className={cn(
                  "font-medium text-center text-green-700",
                  className?.includes("compact") ? "text-xs w-3" : "text-sm w-5"
                )}>{count}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  className={cn(
                    className?.includes("compact") ? "w-5 h-5" : "w-8 h-8",
                    "border-green-600 text-green-600 hover:bg-green-50"
                  )}
                >
                  <Plus className={className?.includes("compact") ? "w-2 h-2" : "w-4 h-4"} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

