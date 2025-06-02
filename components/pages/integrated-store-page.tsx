"use client"

import { useState, useEffect } from "react"
import type { Product, CourseProduct } from "@/components/store/product-card"
import ProductGrid from "@/components/store/product-grid"
import CategorySection from "@/components/store/category-section"
import CategoryBrowseSection from "@/components/store/category-browse-section"
import BannerCarousel from "@/components/store/banner-carousel"
import StoreLayout from "@/components/store/store-layout"

import { useRouter } from "next/navigation"
import { categories as storeCategories } from "@/data/mock-store-data"

// Categories based on the new structure
const categories = [
  {
    id: "office-furniture",
    name: "Office Furniture",
    image: "/images/store/cate/office-furniture.png",
    description: "Desks, chairs & cabinets",
  },
  {
    id: "books",
    name: "Books",
    image: "/images/store/cate/books.png",
    description: "Educational & reading materials",
  },
  {
    id: "teachers-supplies",
    name: "Teacher's Supplies",
    image: "/images/store/cate/teachers-supplies.png",
    description: "Tools for educators",
  },
  {
    id: "gifts-decoration",
    name: "Gifts & Decoration",
    image: "/images/store/cate/gifts-decoration.png",
    description: "Gifts & home decor",
  },
  {
    id: "school-supplies",
    name: "School Supplies",
    image: "/images/store/cate/school-supplies.png",
    description: "Essential school items",
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    image: "/images/store/cate/office-supplies.png",
    description: "Professional office tools",
  },
  {
    id: "kids",
    name: "Kids",
    image: "/images/store/cate/kids.png",
    description: "Educational toys & games",
  },
  {
    id: "courses",
    name: "Courses",
    image: "/images/store/cate/courses.png",
    description: "Online learning programs",
  },
  {
    id: "uniforms",
    name: "Uniforms",
    image: "/images/store/cate/uniforms.png",
    description: "School uniforms & attire",
  },
  {
    id: "kits",
    name: "Kits",
    image: "/images/store/cate/kits.png",
    description: "Educational kits & bundles",
  },
]

// Mock data for banners
const banners = [
  {
    id: "banner1",
    title: "Back to School Sale",
    subtitle: "Up to 40% off on school supplies",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Shop Now",
    buttonLink: "/store/category/notebooks",
    backgroundColor: "bg-green-100",
  },
  {
    id: "banner2",
    title: "New Courses Available",
    subtitle: "Explore our latest educational courses",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "Browse Courses",
    buttonLink: "/store/category/courses",
    backgroundColor: "bg-blue-100",
  },
  {
    id: "banner3",
    title: "Uniform Collection",
    subtitle: "Quality uniforms for all schools",
    image: "/placeholder.svg?height=400&width=500",
    buttonText: "View Collection",
    buttonLink: "/store/category/uniforms",
    backgroundColor: "bg-amber-100",
  },
]

// Import products from mock data
import { products as storeProducts } from "@/data/mock-store-data"

// Convert store products to the format expected by ProductCard
const products: (Product | CourseProduct)[] = storeProducts.map(product => ({
  id: product.id,
  title: product.title,
  category: product.category,
  subcategory: product.subcategory,
  price_dzd: product.price_dzd,
  original_price_dzd: product.original_price_dzd,
  description: product.description,
  thumbnail: product.thumbnail || "/placeholder.svg?height=300&width=300",
  rating: product.rating,
  isNew: product.isNew,
  isOnSale: product.isOnSale,
  stock: product.stock || 10,
}))

interface IntegratedStorePageProps {
  initialCategory?: string
}

export default function IntegratedStorePage({ initialCategory }: IntegratedStorePageProps) {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all")
  const [activeSubcategory, setActiveSubcategory] = useState("all")
  const router = useRouter()

  // Update active category when initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      setActiveSubcategory("all")
    }
  }, [initialCategory])

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

  // Filter products based on active category and subcategory
  const filteredProducts = products.filter(product => {
    if (activeCategory === "all") return true
    if (activeSubcategory === "all") {
      return product.category.toLowerCase() === activeCategory.toLowerCase()
    }
    return product.category.toLowerCase() === activeCategory.toLowerCase() &&
           product.subcategory?.toLowerCase() === activeSubcategory.toLowerCase()
  })

  // Get available subcategories for the active category
  const availableSubcategories = storeCategories
    .find(cat => cat.id.toLowerCase() === activeCategory.toLowerCase())
    ?.subcategories || []

  return (
    <StoreLayout cartItemsCount={cartItems.length} wishlistItemsCount={wishlistItems.length}>
      <div className="container mx-auto px-4 py-8">
        {/* Banner Carousel */}
        <BannerCarousel
          banners={banners}
          className="mb-6"
        />

        {/* Shop by Category - Horizontal Scrollable */}
        <CategorySection 
          categories={categories} 
          className="mb-8" 
        />

        {/* Main Content with Categories Sidebar and Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Categories - Left Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <CategoryBrowseSection
                categories={storeCategories}
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
                onCategoryChange={setActiveCategory}
                onSubcategoryChange={setActiveSubcategory}
              />
            </div>
          </div>

          {/* Main Products Grid */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {activeCategory === "all" ? "All Products" : 
                 activeSubcategory === "all" ? `All ${activeCategory}` : 
                 `${activeSubcategory} in ${activeCategory}`}
              </h2>
              {filteredProducts.length === 0 && (
                <p className="text-gray-500">No products found in this category</p>
              )}
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
          </div>
        </div>
      </div>
    </StoreLayout>
  )
}
