"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  Building,
  BookOpen,
  GraduationCap,
  Gift,
  School,
  Briefcase,
  Baby,
  Package,
  Shirt,
  Pencil
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Subcategory {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
  icon?: string
  subcategories?: Subcategory[]
}

interface CategoryBrowseSectionProps {
  categories: Category[]
  className?: string
  activeCategory: string
  activeSubcategory: string
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
}

// Map of icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  "Building": <Building className="h-5 w-5" />,
  "BookOpen": <BookOpen className="h-5 w-5" />,
  "GraduationCap": <GraduationCap className="h-5 w-5" />,
  "Gift": <Gift className="h-5 w-5" />,
  "School": <School className="h-5 w-5" />,
  "Briefcase": <Briefcase className="h-5 w-5" />,
  "Baby": <Baby className="h-5 w-5" />,
  "Package": <Package className="h-5 w-5" />,
  "Shirt": <Shirt className="h-5 w-5" />,
  "Pencil": <Pencil className="h-5 w-5" />
}

export default function CategoryBrowseSection({
  categories,
  className,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange
}: CategoryBrowseSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const router = useRouter()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId)
    router.push(`/store/category/${categoryId}`)
  }

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onSubcategoryChange(subcategoryId)
    router.push(`/store/category/${categoryId}?subcategory=${subcategoryId}`)
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={cn("", className)}>
      <h3 className="font-medium mb-3">Categories</h3>

      <div className="bg-white rounded-lg border p-4">
        <div className="space-y-1">
          <button
            className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-100"
            onClick={() => router.push("/store")}
          >
            All Products
          </button>

          {categories.map((category) => (
            <div key={category.id}>
              <button
                className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between ${
                  expandedCategories.includes(category.id) ? "bg-green-100 text-green-700 font-medium" : "hover:bg-gray-100"
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="flex items-center">
                  {category.icon && iconMap[category.icon] && (
                    <span className="mr-2 text-green-700">{iconMap[category.icon]}</span>
                  )}
                  <span>{category.name}</span>
                </span>
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${expandedCategories.includes(category.id) ? "rotate-90" : ""}`}
                  />
                )}
              </button>

              {expandedCategories.includes(category.id) && category.subcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  <button
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
                      activeSubcategory === "all"
                        ? "bg-green-50 text-green-700 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
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
                      onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
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
    </section>
  )
}
