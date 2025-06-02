"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Heart, Bookmark, BookmarkCheck, Package, Briefcase, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// This would typically come from an API or database
const getProductData = (productId: string) => {
  // Mock product data
  return {
    id: productId,
    name: "Interactive Math Workbook - Grade 5",
    category: "Books",
    price: 2499,
    offerPrice: 1999,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300&text=Image+2",
      "/placeholder.svg?height=300&width=300&text=Image+3",
      "/placeholder.svg?height=300&width=300&text=Image+4",
    ],
    description: [
      "A comprehensive workbook with interactive exercises",
      "Helps 5th graders master key math concepts",
      "Includes fractions, decimals, and basic geometry",
      "Colorful illustrations and engaging activities",
      "Aligned with national curriculum standards",
    ],
    stock: 45,
    deliveryTime: "2-3 business days",
  }
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.productId as string

  const [product, setProduct] = useState<any>(null)
  const [thumbnail, setThumbnail] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // In a real app, you would call an API or use context to update the wishlist
    console.log(`${isInWishlist ? 'Removed from' : 'Added to'} wishlist: ${product.name}`)
  }

  useEffect(() => {
    try {
      // In a real app, this would be an API call
      const productData = getProductData(productId)
      if (!productData) {
        setError("Product not found")
        return
      }
      setProduct(productData)
      setThumbnail(productData.images[0])
    } catch (err) {
      console.error("Error fetching product:", err)
      setError("Failed to load product data")
    } finally {
      setIsLoading(false)
    }
  }, [productId])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header with search and cart */}
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
              className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
              onClick={() => {
                try {
                  window.location.href = '/store/bulk-purchase';
                } catch (error) {
                  console.error("Navigation failed:", error);
                  // Fallback behavior
                  window.location.href = '/store/bulk-purchase';
                }
              }}
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

        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-red-600 mb-4">{error}</h2>
          <Button onClick={() => window.location.href = '/store'}>Back to Store</Button>
        </div>
      </div>
    )
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header with search and cart */}
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
              className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
              onClick={() => {
                try {
                  window.location.href = '/store/bulk-purchase';
                } catch (error) {
                  console.error("Navigation failed:", error);
                  // Fallback behavior
                  window.location.href = '/store/bulk-purchase';
                }
              }}
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

        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Loading product...</h2>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  const handleBuyNow = () => {
    // Buy now logic would go here
    console.log(`Buying ${quantity} of ${product.name}`)
    // Navigate to checkout
    // router.push('/checkout')
  }

  // Add mobile-optimized image gallery
  const ProductGallery = ({ images }) => {
    const isMobile = useIsMobile()

    if (isMobile) {
      return (
        <div className="w-full mb-4">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )
    }

    // Desktop gallery implementation
    return (
      <div className="flex gap-3 md:w-1/2">
        <div className="flex flex-col gap-3">
          {product.images.map((image: string, index: number) => (
            <div
              key={index}
              onClick={() => setThumbnail(image)}
              className={`border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer ${thumbnail === image ? "border-green-500" : ""}`}
            >
              <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden flex-grow">
          <img src={thumbnail || "/placeholder.svg"} alt="Selected product" className="w-full h-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with search and cart */}
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
            className="relative hidden sm:flex items-center gap-2 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
            onClick={() => {
              try {
                window.location.href = '/store/bulk-purchase';
              } catch (error) {
                console.error("Navigation failed:", error);
                // Fallback behavior
                window.location.href = '/store/bulk-purchase';
              }
            }}
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

      {/* Back button and breadcrumbs */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-green-600"
          onClick={() => window.location.href = '/store'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Button>
      </div>

      {/* Only render breadcrumbs when product is loaded */}
      <div className="text-sm mb-4 text-gray-500">
        <span>Home</span> /<span> Store</span> /<span> {product.category}</span> /
        <span className="text-green-600"> {product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Product Images */}
        <ProductGallery images={product.images} />

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) =>
                product.rating > i ? (
                  <svg
                    key={i}
                    width="14"
                    height="13"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                      fill="#16a34a"
                    />
                  </svg>
                ) : (
                  <svg
                    key={i}
                    width="14"
                    height="13"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                      fill="#16a34a"
                      fillOpacity="0.35"
                    />
                  </svg>
                ),
              )}
            <p className="text-base ml-2">
              ({product.rating}) · {product.reviewCount} reviews
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">Price: {(product.price / 100).toFixed(2)} DZD</p>
            <p className="text-2xl font-medium">Price: {(product.offerPrice / 100).toFixed(2)} DZD</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <div className="mt-4 flex items-center">
            <p className="mr-4">Quantity:</p>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-lg">
                -
              </button>
              <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-lg">
                +
              </button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-600 mr-6">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6v6l4 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Delivery: {product.deliveryTime}</span>
            </div>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc: string, index: number) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4 text-base">
            <button
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              className="w-full py-3.5 cursor-pointer font-medium bg-green-600 text-white hover:bg-green-700 transition"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>

          <button className="w-full mt-3 py-3 cursor-pointer font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center justify-center">
            <Heart className="h-5 w-5 mr-2" />
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}




