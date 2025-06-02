export interface Product {
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

export interface CartItem {
  product: Product
  quantity: number
}

export interface BulkItem {
  product: Product
  quantity: number
}

export interface BackpackItem {
  product: Product
  quantity: number
}

export interface AdBanner {
  id: string
  title: string
  subtitle?: string
  image: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

export interface Category {
  id: string
  name: string
  icon: React.ReactNode
  subcategories?: { id: string; name: string }[]
}
