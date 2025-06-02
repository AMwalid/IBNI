"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  image?: string
  description?: string
}

interface CategorySectionProps {
  categories: Category[]
  className?: string
}

export default function CategorySection({ categories, className }: CategorySectionProps) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/store/category/${categoryId}`)
  }

  return (
    <section className={cn("py-4", className)}>
      <h2 className="text-xl font-bold mb-3 text-gray-900">Shop by Category</h2>

      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="group flex flex-col items-center transition-all hover:scale-105 flex-shrink-0"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden mb-2 bg-gray-100">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={96}
                height={96}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
            <span className="text-center font-medium text-green-800 text-sm">
              {category.name}
            </span>
            {category.description && (
              <p className="text-xs text-gray-600 text-center mt-0.5 max-w-[100px]">
                {category.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

