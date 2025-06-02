"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ShoppingCart,
  Heart,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  Star,
  Plus,
  Minus,
  X,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Filter,
  ChevronRight,
  Upload,
  Download,
  Package,
  Briefcase,
  School,
  GraduationCap,
  Users,
  User,
  Building,
  Gift,
  Baby,
  BookText,
  Shirt,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

// Product type definition
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory?: string
  rating: number
  reviewCount: number
  description: string
  stock: number
  isNew?: boolean
  isOnSale?: boolean
  discountPercentage?: number
  tags: string[]
  deliveryTime: string
  audience: ("students" | "teachers" | "parents" | "schools" | "businesses")[]
  ageRange?: string
  gradeLevel?: string
}

// Cart item type
interface CartItem {
  product: Product
  quantity: number
}

// Wishlist item type
interface WishlistItem {
  product: Product
  dateAdded: Date
}

// Ad Banner type
interface AdBanner {
  id: string
  title: string
  subtitle?: string
  image: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

// Category type
interface Category {
  id: string
  name: string
  icon: React.ReactNode
  subcategories?: { id: string; name: string }[]
}

export default function StorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSubcategory, setActiveSubcategory] = useState("all")
  const [activeAudience, setActiveAudience] = useState<string>("all")
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [bulkItems, setBulkItems] = useState<CartItem[]>([])
  const [backpackGrade, setBackpackGrade] = useState("")
  const [backpackItems, setBackpackItems] = useState<CartItem[]>([])
  const [backpackStep, setBackpackStep] = useState(1)
  const [activeTab, setActiveTab] = useState("shop")

  // Mock ad banners
  const adBanners: AdBanner[] = [
    {
      id: "banner1",
      title: "Back to School Sale",
      subtitle: "Up to 40% off on school supplies",
      image: "/placeholder.svg?height=400&width=1200",
      buttonText: "Shop Now",
      buttonLink: "#school-supplies",
      backgroundColor: "bg-green-100",
    },
    {
      id: "banner2",
      title: "New Tech Arrivals",
      subtitle: "Latest educational technology for modern classrooms",
      image: "/placeholder.svg?height=400&width=1200",
      buttonText: "Explore",
      buttonLink: "#tech-electronics",
      backgroundColor: "bg-emerald-100",
    },
    {
      id: "banner3",
      title: "Bulk Discounts for Schools",
      subtitle: "Special pricing for educational institutions",
      image: "/placeholder.svg?height=400&width=1200",
      buttonText: "Learn More",
      buttonLink: "#bulk-purchase",
      backgroundColor: "bg-teal-100",
    },
    {
      id: "banner4",
      title: "Arabic Books Collection",
      subtitle: "Expand your library with our curated selection",
      image: "/placeholder.svg?height=400&width=1200",
      buttonText: "Browse Books",
      buttonLink: "#arabic-books",
      backgroundColor: "bg-green-100",
    },
  ]

  // Categories
  const categories: Category[] = [
    {
      id: "office-furniture",
      name: "Office Furniture",
      icon: <Building className="h-5 w-5" />,
      subcategories: [
        { id: "desks", name: "Desks" },
        { id: "chairs", name: "Chairs" },
        { id: "cabinets", name: "Cabinets" },
      ],
    },
    {
      id: "books",
      name: "Books",
      icon: <BookOpen className="h-5 w-5" />,
      subcategories: [
        { id: "livres-parascolaire", name: "Livres Parascolaire" },
        { id: "high-school-education", name: "High School Education" },
        { id: "middle-school-education", name: "Middle School Education" },
        { id: "primary-education", name: "Primary Education" },
        { id: "novels", name: "Novels" },
        { id: "human-development", name: "Human Development" },
        { id: "religious-books", name: "Religious Books" },
      ],
    },
    {
      id: "teachers-supplies",
      name: "Teacher's Supplies",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: "gifts-decoration",
      name: "Gifts & Decoration",
      icon: <Gift className="h-5 w-5" />,
      subcategories: [
        { id: "decorations", name: "Decorations" },
        { id: "birthday-decoration", name: "Birthday Decoration" },
        { id: "home-decoration", name: "Home Decoration" },
        { id: "gifts", name: "Gifts" },
        { id: "mens-gifts", name: "Mens Gifts" },
        { id: "women-gifts", name: "Women Gifts" },
        { id: "kids-gifts", name: "Kids Gifts" },
      ],
    },
    {
      id: "school-supplies",
      name: "School Supplies",
      icon: <School className="h-5 w-5" />,
      subcategories: [
        { id: "geometric-tools", name: "Geometric Tools" },
        { id: "water-color", name: "Water Color" },
        { id: "notebooks", name: "Notebooks" },
        { id: "bags", name: "Bags" },
        { id: "glue", name: "Glue" },
        { id: "eraser", name: "Eraser" },
        { id: "calculators", name: "Calculators" },
        { id: "pencil-case", name: "Pencil Case" },
        { id: "school-apron", name: "School Apron" },
        { id: "scissors", name: "Scissors" },
        { id: "corrector", name: "Corrector" },
        { id: "compass", name: "Compass" },
        { id: "pens", name: "Pens" },
        { id: "ballpoint-pen", name: "Ballpoint Pen" },
        { id: "colored-pens", name: "Colored Pens" },
        { id: "highlighter", name: "Highlighter" },
        { id: "felt-pens", name: "Felt Pens" },
        { id: "wax-pens", name: "Wax Pens" },
        { id: "playdough", name: "Playdough" },
        { id: "educational-board", name: "Educational Board" },
        { id: "brush-board", name: "Brush Board" },
        { id: "chalk", name: "Chalk" },
        { id: "oil-paint", name: "Oil Paint" },
        { id: "acrylic-paint", name: "Acrylic Paint" },
        { id: "pencil-sharpener", name: "Pencil Sharpener" },
        { id: "projects-supplies", name: "Projects Supplies" },
        { id: "fine-arts", name: "Fine Arts" },
      ],
    },
    {
      id: "office-supplies",
      name: "Office Supplies",
      icon: <Briefcase className="h-5 w-5" />,
      subcategories: [
        { id: "bags-briefcases", name: "Bags And Briefcases" },
        { id: "small-supplies", name: "Small Supplies" },
        { id: "large-supplies", name: "Large Supplies" },
        { id: "stationery", name: "Stationery" },
        { id: "staples-staplers", name: "Staples and Staplers" },
        { id: "certificate-holder", name: "Certificate Holder" },
        { id: "certificates-templates", name: "Certificates Templates" },
        { id: "stamps-ink", name: "Stamps and Ink" },
        { id: "filing-archiving", name: "Filing And Archiving" },
        { id: "trophies", name: "Trophies" },
        { id: "calculators", name: "Calculators" },
        { id: "administration-register", name: "Administration Register" },
      ],
    },
    {
      id: "kids",
      name: "Kids",
      icon: <Baby className="h-5 w-5" />,
      subcategories: [
        { id: "semi-school-preparatory", name: "Semi-school - Preparatory" },
        { id: "swimming-pool", name: "Swimming Pool" },
        { id: "educational-games", name: "Educational Games" },
        { id: "girls-games", name: "Girls Games" },
        { id: "boys-games", name: "Boys Games" },
        { id: "dolls", name: "Dolls" },
      ],
    },
    {
      id: "Kits",
      name: "Kits",
      icon: <BookText className="h-5 w-5" />,
    },
    {
      id: "uniforms",
      name: "Uniforms",
      icon: <Shirt className="h-5 w-5" />,
    },
    {
      id: "courses",
      name: "courses",
      icon: <Package className="h-5 w-5" />,
    },
  ]

  // Audience filters
  const audienceFilters = [
    { id: "all", name: "All Users", icon: <Users className="h-5 w-5" /> },
    { id: "students", name: "Students", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "teachers", name: "Teachers", icon: <User className="h-5 w-5" /> },
    { id: "parents", name: "Parents", icon: <Users className="h-5 w-5" /> },
    { id: "schools", name: "Schools", icon: <School className="h-5 w-5" /> },
    { id: "businesses", name: "Businesses", icon: <Building className="h-5 w-5" /> },
  ]

  // Grade levels for backpack builder
  const gradeLevels = [
    { id: "preschool", name: "Preschool (Ages 3-5)" },
    { id: "elementary-lower", name: "Elementary School (Grades 1-3)" },
    { id: "elementary-upper", name: "Elementary School (Grades 4-6)" },
    { id: "middle", name: "Middle School (Grades 7-9)" },
    { id: "high", name: "High School (Grades 10-12)" },
    { id: "college", name: "College/University" },
  ]

  // Mock products data
  const products: Product[] = [
    {
      id: "prod1",
      name: "Interactive Math Workbook - Grade 5",
      price: 2499,
      image: "/placeholder.svg?height=300&width=300",
      category: "books",
      subcategory: "workbooks",
      rating: 4.8,
      reviewCount: 124,
      description:
        "A comprehensive workbook with interactive exercises to help 5th graders master key math concepts including fractions, decimals, and basic geometry.",
      stock: 45,
      isNew: true,
      tags: ["Math", "Elementary", "Workbook"],
      deliveryTime: "2-3 business days",
      audience: ["students", "teachers", "parents"],
      gradeLevel: "Grade 5",
    },
    {
      id: "prod2",
      name: "Science Lab Kit - Chemistry Basics",
      price: 4999,
      originalPrice: 5999,
      image: "/placeholder.svg?height=300&width=300",
      category: "toys-learning",
      subcategory: "stem-toys",
      rating: 4.7,
      reviewCount: 89,
      description:
        "Introduce students to the exciting world of chemistry with this hands-on lab kit. Includes all materials needed for 10 different experiments.",
      stock: 18,
      isOnSale: true,
      discountPercentage: 17,
      tags: ["Science", "Chemistry", "Hands-on"],
      deliveryTime: "3-5 business days",
      audience: ["students", "teachers", "schools"],
      gradeLevel: "Grades 6-9",
    },
    {
      id: "prod3",
      name: "World History Timeline Poster Set",
      price: 1999,
      image: "/placeholder.svg?height=300&width=300",
      category: "school-supplies",
      subcategory: "classroom-decor",
      rating: 4.5,
      reviewCount: 56,
      description:
        "Set of 5 beautifully illustrated timeline posters covering major periods in world history. Perfect for classroom walls.",
      stock: 32,
      tags: ["History", "Visual Aids", "Posters"],
      deliveryTime: "2-3 business days",
      audience: ["teachers", "schools"],
    },
    {
      id: "prod4",
      name: "Digital Classroom Timer with Remote",
      price: 3499,
      originalPrice: 4499,
      image: "/placeholder.svg?height=300&width=300",
      category: "tech-electronics",
      subcategory: "accessories",
      rating: 4.9,
      reviewCount: 112,
      description:
        "Large digital timer visible from anywhere in the classroom. Includes remote control and multiple timer modes.",
      stock: 7,
      isOnSale: true,
      discountPercentage: 22,
      tags: ["Classroom Management", "Digital", "Timer"],
      deliveryTime: "3-4 business days",
      audience: ["teachers", "schools"],
    },
    {
      id: "prod5",
      name: "Phonics Flashcards Bundle",
      price: 1599,
      image: "/placeholder.svg?height=300&width=300",
      category: "school-supplies",
      subcategory: "learning-aids",
      rating: 4.6,
      reviewCount: 78,
      description:
        "Complete set of phonics flashcards with colorful illustrations. Includes consonants, vowels, blends, and digraphs.",
      stock: 50,
      isNew: true,
      tags: ["Reading", "Phonics", "Early Learning"],
      deliveryTime: "1-2 business days",
      audience: ["students", "teachers", "parents"],
      gradeLevel: "Grades K-2",
    },
    {
      id: "prod6",
      name: "Classroom Library Organizer",
      price: 7999,
      originalPrice: 9999,
      image: "/placeholder.svg?height=300&width=300",
      category: "office-supplies",
      subcategory: "filing",
      rating: 4.7,
      reviewCount: 45,
      description:
        "Durable wooden organizer with 12 compartments for books. Includes labels and wheels for easy mobility.",
      stock: 12,
      isOnSale: true,
      discountPercentage: 20,
      tags: ["Organization", "Library", "Storage"],
      deliveryTime: "5-7 business days",
      audience: ["teachers", "schools"],
    },
    {
      id: "prod7",
      name: "STEM Building Blocks Set - 250 Pieces",
      price: 3999,
      image: "/placeholder.svg?height=300&width=300",
      category: "toys-learning",
      subcategory: "stem-toys",
      rating: 4.8,
      reviewCount: 92,
      description:
        "Versatile building blocks set designed to teach engineering and spatial concepts. Compatible with other major building block brands.",
      stock: 25,
      tags: ["STEM", "Building", "Engineering"],
      deliveryTime: "2-4 business days",
      audience: ["students", "teachers", "parents", "schools"],
      ageRange: "Ages 6+",
    },
    {
      id: "prod8",
      name: "Teacher Planner & Gradebook",
      price: 2999,
      image: "/placeholder.svg?height=300&width=300",
      category: "office-supplies",
      subcategory: "paper-products",
      rating: 4.9,
      reviewCount: 136,
      description:
        "Comprehensive planner with lesson planning pages, gradebook, attendance tracker, and calendar. August-July academic year.",
      stock: 38,
      isNew: true,
      tags: ["Planning", "Organization", "Teacher"],
      deliveryTime: "2-3 business days",
      audience: ["teachers"],
    },
    {
      id: "prod9",
      name: "Premium Gel Pens Set - 48 Colors",
      price: 1899,
      image: "/placeholder.svg?height=300&width=300",
      category: "school-supplies",
      subcategory: "writing",
      rating: 4.7,
      reviewCount: 215,
      description:
        "Set of 48 vibrant gel pens in assorted colors. Perfect for note-taking, art projects, and bullet journaling.",
      stock: 65,
      tags: ["Pens", "Art Supplies", "Stationery"],
      deliveryTime: "1-2 business days",
      audience: ["students", "teachers", "parents"],
    },
    {
      id: "prod10",
      name: "Interactive World Map - Touch & Learn",
      price: 5999,
      image: "/placeholder.svg?height=300&width=300",
      category: "toys-learning",
      subcategory: "educational-toys",
      rating: 4.8,
      reviewCount: 67,
      description:
        "Interactive wall map with touch sensors that provide facts, languages, and music from different countries.",
      stock: 15,
      isNew: true,
      tags: ["Geography", "Interactive", "Educational"],
      deliveryTime: "3-5 business days",
      audience: ["students", "parents", "schools"],
      ageRange: "Ages 5-12",
    },
    {
      id: "prod11",
      name: "Student Laptop - Educational Edition",
      price: 42999,
      originalPrice: 49999,
      image: "/placeholder.svg?height=300&width=300",
      category: "tech-electronics",
      subcategory: "computers",
      rating: 4.6,
      reviewCount: 89,
      description:
        "Durable laptop designed for educational use with pre-installed learning software, parental controls, and a spill-resistant keyboard.",
      stock: 20,
      isOnSale: true,
      discountPercentage: 14,
      tags: ["Technology", "Computer", "Education"],
      deliveryTime: "5-7 business days",
      audience: ["students", "schools", "businesses"],
    },
    {
      id: "prod12",
      name: "Arabic Literature Collection - 10 Books",
      price: 8999,
      image: "/placeholder.svg?height=300&width=300",
      category: "books",
      subcategory: "arabic-books",
      rating: 4.9,
      reviewCount: 42,
      description:
        "Collection of 10 classic and contemporary Arabic literature books, suitable for high school and college students.",
      stock: 25,
      tags: ["Arabic", "Literature", "Reading"],
      deliveryTime: "3-5 business days",
      audience: ["students", "teachers", "schools"],
      gradeLevel: "Grades 9-12 & College",
    },
  ]

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % adBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [adBanners.length])

  // Filter products based on search query, category, audience, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "all" || product.category === activeCategory

    const matchesSubcategory = activeSubcategory === "all" || product.subcategory === activeSubcategory

    const matchesAudience = activeAudience === "all" || product.audience.includes(activeAudience as any)

    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesSubcategory && matchesAudience && matchesPriceRange
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      default:
        return 0 // featured - no specific sort
    }
  })

  // Limit to 2 products per subcategory
  const productsBySubcategory: { [key: string]: Product[] } = {}
  sortedProducts.forEach((product) => {
    const subcat = product.subcategory || '__no_subcategory__'
    if (!productsBySubcategory[subcat]) {
      productsBySubcategory[subcat] = []
    }
    if (productsBySubcategory[subcat].length < 2) {
      productsBySubcategory[subcat].push(product)
    }
  })
  const limitedProducts = Object.values(productsBySubcategory).flat()

  // Special deals - products with discounts
  const specialDeals = products.filter((product) => product.isOnSale)

  // New arrivals
  const newArrivals = products.filter((product) => product.isNew)

  // Cart functions
  const addToCart = (productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existingItem = cartItems.find((item) => item.product.id === productId)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCartItems([...cartItems, { product, quantity }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId))
  }

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    const existingItem = wishlistItems.find((item) => item.product.id === product.id)

    if (!existingItem) {
      setWishlistItems([...wishlistItems, { product, dateAdded: new Date() }])
    }
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.product.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product.id === productId)
  }

  // Bulk purchase functions
  const addToBulkItems = (product: Product) => {
    const existingItem = bulkItems.find((item) => item.product.id === product.id)

    if (existingItem) {
      setBulkItems(
        bulkItems.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
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

  const addAllBulkItemsToCart = () => {
    // Merge bulk items with cart items
    const newCartItems = [...cartItems]

    bulkItems.forEach((bulkItem) => {
      const existingCartItemIndex = newCartItems.findIndex((item) => item.product.id === bulkItem.product.id)

      if (existingCartItemIndex >= 0) {
        newCartItems[existingCartItemIndex].quantity += bulkItem.quantity
      } else {
        newCartItems.push(bulkItem)
      }
    })

    setCartItems(newCartItems)
    setBulkItems([])
    setIsCartOpen(true)
  }

  // Backpack builder functions
  const addToBackpack = (product: Product) => {
    const existingItem = backpackItems.find((item) => item.product.id === product.id)

    if (existingItem) {
      setBackpackItems(
        backpackItems.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setBackpackItems([...backpackItems, { product, quantity: 1 }])
    }
  }

  const removeFromBackpack = (productId: string) => {
    setBackpackItems(backpackItems.filter((item) => item.product.id !== productId))
  }

  const updateBackpackItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromBackpack(productId)
      return
    }

    setBackpackItems(
      backpackItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const addBackpackToCart = () => {
    // Merge backpack items with cart items
    const newCartItems = [...cartItems]

    backpackItems.forEach((backpackItem) => {
      const existingCartItemIndex = newCartItems.findIndex((item) => item.product.id === backpackItem.product.id)

      if (existingCartItemIndex >= 0) {
        newCartItems[existingCartItemIndex].quantity += backpackItem.quantity
      } else {
        newCartItems.push(backpackItem)
      }
    })

    setCartItems(newCartItems)
    setBackpackItems([])
    setBackpackGrade("")
    setBackpackStep(1)
    setIsCartOpen(true)
  }

  // Calculate cart totals
  const cartSubtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const cartTax = cartSubtotal * 0.08 // 8% tax
  const cartTotal = cartSubtotal + cartTax

  // Calculate bulk items total
  const bulkItemsTotal = bulkItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Calculate backpack items total
  const backpackItemsTotal = backpackItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Get recommended products for backpack based on grade level
  const getRecommendedBackpackItems = () => {
    if (!backpackGrade) return []

    // Filter products that are appropriate for the selected grade level
    let recommendedProducts: Product[] = []

    switch (backpackGrade) {
      case "preschool":
        recommendedProducts = products.filter(
          (p) => p.ageRange?.includes("3-5") || p.tags.some((tag) => ["Early Learning", "Preschool"].includes(tag)),
        )
        break
      case "elementary-lower":
        recommendedProducts = products.filter(
          (p) =>
            p.gradeLevel?.includes("Grade 1") ||
            p.gradeLevel?.includes("Grade 2") ||
            p.gradeLevel?.includes("Grade 3") ||
            p.tags.some((tag) => ["Elementary", "Primary"].includes(tag)),
        )
        break
      case "elementary-upper":
        recommendedProducts = products.filter(
          (p) =>
            p.gradeLevel?.includes("Grade 4") ||
            p.gradeLevel?.includes("Grade 5") ||
            p.gradeLevel?.includes("Grade 6") ||
            p.tags.some((tag) => ["Elementary", "Primary"].includes(tag)),
        )
        break
      case "middle":
        recommendedProducts = products.filter(
          (p) =>
            p.gradeLevel?.includes("Grade 7") ||
            p.gradeLevel?.includes("Grade 8") ||
            p.gradeLevel?.includes("Grade 9") ||
            p.tags.some((tag) => ["Middle School"].includes(tag)),
        )
        break
      case "high":
        recommendedProducts = products.filter(
          (p) =>
            p.gradeLevel?.includes("Grade 10") ||
            p.gradeLevel?.includes("Grade 11") ||
            p.gradeLevel?.includes("Grade 12") ||
            p.tags.some((tag) => ["High School", "Secondary"].includes(tag)),
        )
        break
      case "college":
        recommendedProducts = products.filter(
          (p) => p.gradeLevel?.includes("College") || p.tags.some((tag) => ["College", "University"].includes(tag)),
        )
        break
      default:
        recommendedProducts = products
    }

    // Ensure we have at least some products to recommend
    if (recommendedProducts.length < 5) {
      // Add some general school supplies if specific recommendations are limited
      const generalSupplies = products.filter(
        (p) => p.category === "school-supplies" || p.category === "office-supplies",
      )

      // Combine and remove duplicates
      const combinedProducts = [...recommendedProducts]
      generalSupplies.forEach((p) => {
        if (!combinedProducts.some((rp) => rp.id === p.id)) {
          combinedProducts.push(p)
        }
      })

      recommendedProducts = combinedProducts
    }

    return recommendedProducts.slice(0, 8) // Limit to 8 recommendations
  }

  // Navigate to product details
  const navigateToProductDetails = (productId: string) => {
    router.push(`/store/${productId}`)
  }

  // Cart Item Component
  const CartItem = ({
    item,
    onRemove,
    onUpdateQuantity,
  }: {
    item: CartItem
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
  }) => (
    <div className="flex items-start py-4 border-b">
      <img
        src={item.product.image || "/placeholder.svg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.product.name}</h4>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500 mb-2">{item.product.category}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="font-medium">{item.product.price.toFixed(2)} DZD</div>
        </div>
      </div>
    </div>
  )

  // Wishlist Item Component
  const WishlistItem = ({
    item,
    onRemove,
    onAddToCart,
  }: {
    item: WishlistItem
    onRemove: () => void
    onAddToCart: () => void
  }) => (
    <div className="flex items-start py-4 border-b">
      <img
        src={item.product.image || "/placeholder.svg?height=300&width=300"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.product.name}</h4>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500 mb-2">{item.product.category}</div>
        <div className="flex items-center justify-between">
          <div className="font-medium">{item.product.price.toFixed(2)} DZD</div>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={onAddToCart}
            disabled={item.product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )

  // Bulk Item Component
  const BulkItem = ({
    item,
    onRemove,
    onUpdateQuantity,
  }: {
    item: CartItem
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
  }) => (
    <div className="flex items-start py-4 border-b">
      <img
        src={item.product.image || "/placeholder.svg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.product.name}</h4>
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
              max={item.product.stock}
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(Number.parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
          <div className="font-medium ml-4">{item.product.price.toFixed(2)} DZD</div>
        </div>
      </div>
    </div>
  )

  // Backpack Item Component
  const BackpackItem = ({
    item,
    onRemove,
    onUpdateQuantity,
  }: {
    item: CartItem
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
  }) => (
    <div className="flex items-start py-4 border-b">
      <img
        src={item.product.image || "/placeholder.svg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.product.name}</h4>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500 mb-2">{item.product.category}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="font-medium">{item.product.price.toFixed(2)} DZD</div>
        </div>
      </div>
    </div>
  )

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <Button
            variant="outline"
            className="relative hidden sm:flex"
            onClick={() => {
              setActiveTab("bulk")
              window.scrollTo({ top: 400, behavior: "smooth" })
            }}
          >
            <Package className="h-5 w-5 text-green-600" />
            <span className="sr-only">Bulk Purchase</span>
          </Button>

          <Button
            variant="outline"
            className="relative hidden sm:flex"
            onClick={() => {
              setActiveTab("backpack")
              window.scrollTo({ top: 400, behavior: "smooth" })
            }}
          >
            <Briefcase className="h-5 w-5 text-green-600" />
            <span className="sr-only">Build a Backpack</span>
          </Button>

          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Wishlist</SheetTitle>
                <SheetDescription>
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col h-[calc(100vh-12rem)]">
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
                  <div className="overflow-y-auto flex-grow">
                    {wishlistItems.map((item) => (
                      <WishlistItem
                        key={item.product.id}
                        item={item}
                        onRemove={() => removeFromWishlist(item.product.id)}
                        onAddToCart={() => {
                          addToCart(item.product.id)
                          setIsWishlistOpen(false)
                          setIsCartOpen(true)
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {wishlistItems.length > 0 && (
                <SheetFooter className="mt-4">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                  {cartItems.reduce((total, item) => total + item.quantity, 0) === 1 ? "item" : "items"} in your cart
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col h-[calc(100vh-12rem)]">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                    <p className="text-gray-500 mb-4">Add items to your cart to checkout</p>
                    <SheetClose asChild>
                      <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
                    </SheetClose>
                  </div>
                ) : (
                  <>
                    <div className="overflow-y-auto flex-grow">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.product.id}
                          item={item}
                          onRemove={() => removeFromCart(item.product.id)}
                          onUpdateQuantity={(quantity) => updateCartItemQuantity(item.product.id, quantity)}
                        />
                      ))}
                    </div>

                    <div className="border-t pt-4 mt-auto">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>{(cartSubtotal / 100).toFixed(2)} DZD</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>{(cartTax / 100).toFixed(2)} DZD</span>
                      </div>
                      <div className="flex justify-between font-bold mb-4">
                        <span>Total</span>
                        <span>{(cartTotal / 100).toFixed(2)} DZD</span>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Proceed to Checkout</Button>
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full mt-2">
                          Continue Shopping
                        </Button>
                      </SheetClose>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Ad Banner Carousel */}
      <div className="mb-8 relative overflow-hidden rounded-xl">
        {/* Banner Images */}
        <div className="relative h-[300px] md:h-[400px]">
          {adBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentBannerIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* This is where you'll add your images later */}
              <div className={`w-full h-full ${banner.backgroundColor || "bg-green-100"} flex items-center`}>
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{banner.title}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{banner.subtitle}</p>
                    <Button className="bg-green-600 hover:bg-green-700" size="lg" asChild>
                      <a href={banner.buttonLink || "#"}>{banner.buttonText}</a>
                    </Button>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    {/* Placeholder for your images - replace with actual images later */}
                    <div className="w-full h-[200px] md:h-[300px] bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Banner Image {index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {adBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentBannerIndex === index ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-700 hover:bg-white"
          onClick={() => setCurrentBannerIndex((prev) => (prev === 0 ? adBanners.length - 1 : prev - 1))}
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-gray-700 hover:bg-white"
          onClick={() => setCurrentBannerIndex((prev) => (prev === adBanners.length - 1 ? 0 : prev + 1))}
          aria-label="Next banner"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Featured categories section - dynamically showing all categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setActiveCategory(category.id)
                setActiveTab("shop")
              }}
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                <img
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-center font-medium text-green-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6 grid grid-cols-3 md:w-auto">
          <TabsTrigger value="shop">Shop Products</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Purchase</TabsTrigger>
          <TabsTrigger value="backpack">Build a Backpack</TabsTrigger>
        </TabsList>

        <TabsContent value="shop">
          {/* Categories and Audience Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {/* Categories - Left Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border p-4 sticky top-24">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
                      activeCategory === "all" ? "bg-green-100 text-green-700 font-medium" : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveCategory("all")
                      setActiveSubcategory("all")
                    }}
                  >
                    All Products
                  </button>

                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between ${
                          activeCategory === category.id
                            ? "bg-green-100 text-green-700 font-medium"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setActiveCategory(category.id)
                          setActiveSubcategory("all")
                        }}
                      >
                        <span className="flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </span>
                        {category.subcategories && category.subcategories.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${activeCategory === category.id ? "rotate-90" : ""}`}
                          />
                        )}
                      </button>

                      {activeCategory === category.id && category.subcategories && (
                        <div className="ml-4 mt-1 space-y-1">
                          <button
                            className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
                              activeSubcategory === "all"
                                ? "bg-green-50 text-green-700 font-medium"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => setActiveSubcategory("all")}
                          >
                            All {category.name}
                          </button>

                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory.id}
                              className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
                                activeSubcategory === subcategory.id
                                  ? "bg-green-50 text-green-700 font-medium"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => setActiveSubcategory(subcategory.id)}
                            >
                              {subcategory.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Products */}
            <div className="md:col-span-4">
              {/* Filters and sorting */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    {isFiltersOpen ? "Hide Filters" : "Show Filters"}
                  </Button>

                  <span className="text-sm text-gray-500">
                    {limitedProducts.length} {limitedProducts.length === 1 ? "product" : "products"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center">
                        Sort by:{" "}
                        {sortBy === "price-low"
                          ? "Price: Low to High"
                          : sortBy === "price-high"
                            ? "Price: High to Low"
                            : sortBy === "rating"
                              ? "Highest Rated"
                              : sortBy === "newest"
                                ? "Newest"
                                : "Featured"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("rating")}>Highest Rated</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

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

              {/* Advanced Filters */}
              {isFiltersOpen && (
                <div className="mb-6 p-4 bg-white rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price-range" className="mb-2 block">
                        Price Range
                      </Label>
                      <div className="px-2">
                        <Slider
                          id="price-range"
                          min={0}
                          max={10000}
                          step={100}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{(priceRange[0] / 100).toFixed(2)} DZD</span>
                          <span>{(priceRange[1] / 100).toFixed(2)} DZD</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Availability</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="in-stock" />
                          <Label htmlFor="in-stock" className="text-sm font-normal">
                            In Stock
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="on-sale" />
                          <Label htmlFor="on-sale" className="text-sm font-normal">
                            On Sale
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new-arrivals" />
                          <Label htmlFor="new-arrivals" className="text-sm font-normal">
                            New Arrivals
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Rating</Label>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <Checkbox id={`rating-${rating}`} />
                            <Label htmlFor={`rating-${rating}`} className="text-sm font-normal flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                                  strokeWidth={1}
                                />
                              ))}
                              <span className="ml-1">& Up</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="mr-2">
                      Reset Filters
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}

              {/* Products grid/list */}
              {limitedProducts.length === 0 ? (
                <div className="space-y-6">
                  <div className="text-center py-6 bg-gray-50 rounded-lg border mb-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No products match your current filters</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveCategory("all")
                        setActiveSubcategory("all")
                        setActiveAudience("all")
                        setPriceRange([0, 10000])
                      }}
                      className="bg-white"
                    >
                      Reset All Filters
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recommended Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.slice(0, 8).map((product) => (
                        <Card
                          key={product.id}
                          className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                          onClick={() => navigateToProductDetails(product.id)}
                        >
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <img
                              src={product.image || "/placeholder.svg?height=300&width=300"}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {product.isOnSale && (
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                {product.discountPercentage}% OFF
                              </Badge>
                            )}
                            {product.isNew && !product.isOnSale && (
                              <Badge className="absolute top-2 left-2 bg-green-500 text-white">NEW</Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)
                              }}
                            >
                              {isInWishlist(product.id) ? (
                                <BookmarkCheck className="h-5 w-5 text-green-600 fill-green-600" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-600" />
                              )}
                            </Button>
                          </div>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base font-medium line-clamp-2">{product.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 flex-grow">
                            <div className="flex items-center text-amber-500 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                                  strokeWidth={1}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                            <div>
                              {product.isOnSale ? (
                                <div className="flex flex-col">
                                  <span className="text-lg font-bold text-green-600">
                                    {(product.price / 100).toFixed(2)} DZD
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {(product.originalPrice! / 100).toFixed(2)} DZD
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-green-600">
                                  {(product.price / 100).toFixed(2)} DZD
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                addToCart(product.id)
                              }}
                              disabled={product.stock === 0}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              {product.stock > 0 ? "Add" : "Sold Out"}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {categories.slice(0, 6).map((category) => (
                        <div
                          key={category.id}
                          className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setActiveCategory(category.id)
                            setActiveSubcategory("all")
                            setSearchQuery("")
                          }}
                        >
                          <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-green-50 flex items-center justify-center">
                            <div className="p-6 text-green-600">{category.icon}</div>
                          </div>
                          <span className="text-center font-medium text-green-700">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {limitedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                      onClick={() => navigateToProductDetails(product.id)}
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg?height=300&width=300"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {product.isOnSale && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            {product.discountPercentage}% OFF
                          </Badge>
                        )}
                        {product.isNew && !product.isOnSale && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white">NEW</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)
                          }}
                        >
                          {isInWishlist(product.id) ? (
                            <BookmarkCheck className="h-5 w-5 text-green-600 fill-green-600" />
                          ) : (
                            <Bookmark className="h-5 w-5 text-gray-600" />
                          )}
                        </Button>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base font-medium line-clamp-2">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <div className="flex items-center text-amber-500 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                              strokeWidth={1}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                        <div>
                          {product.isOnSale ? (
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-green-600">
                                {(product.price / 100).toFixed(2)} DZD
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {(product.originalPrice! / 100).toFixed(2)} DZD
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-green-600">
                              {(product.price / 100).toFixed(2)} DZD
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product.id)
                          }}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {product.stock > 0 ? "Add" : "Sold Out"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {limitedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500"
                      onClick={() => navigateToProductDetails(product.id)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-48 h-48">
                          <img
                            src={product.image || "/placeholder.svg?height=300&width=300"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.isOnSale && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                              {product.discountPercentage}% OFF
                            </Badge>
                          )}
                          {product.isNew && !product.isOnSale && (
                            <Badge className="absolute top-2 left-2 bg-green-500 text-white">NEW</Badge>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <div className="flex items-center text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                                  strokeWidth={1}
                                />
                              ))}
                              <span className="text-xs text-white ml-1">({product.reviewCount})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)
                              }}
                            >
                              {isInWishlist(product.id) ? (
                                <BookmarkCheck className="h-5 w-5 text-green-600 fill-green-600" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-600" />
                              )}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1 my-2">
                            {product.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <div>
                              {product.isOnSale ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-green-600">
                                    {(product.price / 100).toFixed(2)} DZD
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {(product.originalPrice! / 100).toFixed(2)} DZD
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-green-600">
                                  {(product.price / 100).toFixed(2)} DZD
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  product.stock > 10
                                    ? "text-green-600"
                                    : product.stock > 0
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }
                              >
                                {product.stock > 10
                                  ? "In Stock"
                                  : product.stock > 0
                                    ? `Only ${product.stock} left`
                                    : "Out of Stock"}
                              </Badge>
                              {product.stock > 0 ? (
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(product.id)
                                  }}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              ) : (
                                <Button disabled>Out of Stock</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bulk">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Bulk Purchase for Institutions</h2>
                <p className="text-gray-600 mb-6">
                  Select multiple products and quantities for your institution or business. Enjoy special pricing and
                  streamlined ordering.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-grow">
                    <Input
                      type="text"
                      placeholder="Search for products to add..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload CSV</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download Template</span>
                  </Button>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Quick Add from Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </Button>
                    ))}
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
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md mr-3"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                              <p className="text-sm text-green-600 font-medium mt-1">
                                {(product.price / 100).toFixed(2)} DZD
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
                    <div className="text-center py-8 border rounded-lg bg-gray-50">
                      <Search className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500">Search for products to add to your bulk order</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 sticky top-24">
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
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={addAllBulkItemsToCart}>
                        Add All to Cart
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setBulkItems([])}>
                        Clear All
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      For volume discounts or special pricing, please contact our sales team at sales@ibni.com
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="backpack">
          <div className="bg-white rounded-lg border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Build Your School Backpack</h2>
            <p className="text-gray-600 mb-6">
              Create a customized school supply kit based on grade level and needs. We'll help you select the right
              items.
            </p>

            <div className="flex items-center mb-8">
              <div className="flex-grow">
                <div className="relative">
                  <div className="h-1 bg-gray-200 absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>
                  <div
                    className="h-1 bg-green-600 absolute top-1/2 left-0 -translate-y-1/2 transition-all"
                    style={{ width: `${((backpackStep - 1) / 2) * 100}%` }}
                  ></div>
                  <div className="flex justify-between relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          backpackStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-xs mt-1">Select Grade</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          backpackStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-xs mt-1">Choose Items</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          backpackStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <span className="text-xs mt-1">Review & Add</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {backpackStep === 1 && (
              <div className="max-w-2xl mx-auto">
                <h3 className="font-medium text-lg mb-4">Select Grade Level</h3>
                <p className="text-gray-600 mb-6">
                  Choose the appropriate grade level to get recommended supplies for your backpack.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {gradeLevels.map((grade) => (
                    <Button
                      key={grade.id}
                      variant={backpackGrade === grade.id ? "default" : "outline"}
                      className={`h-auto py-4 justify-start ${
                        backpackGrade === grade.id ? "bg-green-600 hover:bg-green-700" : ""
                      }`}
                      onClick={() => setBackpackGrade(grade.id)}
                    >
                      <GraduationCap className="h-5 w-5 mr-2" />
                      <div className="text-left">
                        <p className="font-medium">{grade.name}</p>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!backpackGrade}
                    onClick={() => setBackpackStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {backpackStep === 2 && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="font-medium text-lg">
                      Recommended Items for {gradeLevels.find((g) => g.id === backpackGrade)?.name}
                    </h3>
                    <p className="text-gray-600">Select the items you want to include in your backpack.</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => setBackpackStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {getRecommendedBackpackItems().map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                        <p className="text-sm text-green-600 font-medium mt-1">
                          {(product.price / 100).toFixed(2)} DZD
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                                }`}
                                strokeWidth={1}
                              />
                            ))}
                          </div>
                          <Button
                            size="sm"
                            className="h-8 bg-green-600 hover:bg-green-700"
                            onClick={() => addToBackpack(product)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    disabled={backpackItems.length === 0}
                    onClick={() => setBackpackStep(3)}
                  >
                    Review Backpack
                  </Button>
                </div>
              </div>
            )}

            {backpackStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="font-medium text-lg">Review Your Backpack</h3>
                      <p className="text-gray-600">Make any final adjustments before adding to cart.</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Button variant="outline" size="sm" onClick={() => setBackpackStep(2)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Items
                      </Button>
                    </div>
                  </div>

                  {backpackItems.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-gray-50">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-1">Your backpack is empty</h3>
                      <p className="text-gray-500 mb-4">Go back to add some items to your backpack</p>
                      <Button onClick={() => setBackpackStep(2)} className="bg-green-600 hover:bg-green-700">
                        Add Items
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {backpackItems.map((item) => (
                        <BackpackItem
                          key={item.product.id}
                          item={item}
                          onRemove={() => removeFromBackpack(item.product.id)}
                          onUpdateQuantity={(quantity) => updateBackpackItemQuantity(item.product.id, quantity)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-green-50 rounded-lg border p-6 sticky top-24">
                    <h3 className="font-semibold mb-4">Backpack Summary</h3>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Grade Level:</p>
                      <p className="font-medium">{gradeLevels.find((g) => g.id === backpackGrade)?.name}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Items:</p>
                      <p className="font-medium">{backpackItems.reduce((total, item) => total + item.quantity, 0)}</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between font-bold text-lg mb-6">
                      <span>Total:</span>
                      <span>{(backpackItemsTotal / 100).toFixed(2)} DZD</span>
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 mb-2"
                      onClick={addBackpackToCart}
                      disabled={backpackItems.length === 0}
                    >
                      Add to Cart
                    </Button>

                    <Button variant="outline" className="w-full" onClick={() => setBackpackStep(2)}>
                      Add More Items
                    </Button>

                    <div className="mt-6 p-4 bg-green-100 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Backpack Tips</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Consider adding extra supplies for mid-year replacements</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Don't forget subject-specific materials</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Check with your school for any specific requirements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {/* Footer */}
      <footer className="mt-16 border-t pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">IBNI Store</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for all educational needs. Quality products for students, teachers, and institutions.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">📍</span>
                <span className="text-gray-600">123 Education St., Algiers, Algeria</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">📞</span>
                <span className="text-gray-600">+213 123 456 789</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✉️</span>
                <span className="text-gray-600">info@ibni.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2023 IBNI Educational Platform. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-green-600">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.282 4.112z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
