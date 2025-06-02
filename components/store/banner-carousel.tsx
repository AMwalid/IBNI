"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

interface BannerCarouselProps {
  banners: Banner[]
  autoRotate?: boolean
  rotationInterval?: number
  className?: string
  folderPath?: string // New prop for folder path
}

export default function BannerCarousel({
  banners: propBanners,
  autoRotate = true,
  rotationInterval = 5000,
  className,
  folderPath,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [banners, setBanners] = useState<Banner[]>(propBanners)
  const router = useRouter()

  // Add console logs to debug
  useEffect(() => {
    console.log("BannerCarousel props:", { 
      folderPath, 
      propBannersLength: propBanners.length,
      currentBanners: banners
    });
    
    if (folderPath) {
      console.log(`Attempting to fetch banners from: ${folderPath}`);
      // In a real implementation, you would fetch banners from the folder
      // This is a mock implementation
      const fetchBannersFromFolder = async () => {
        try {
          // In a real app, this would be an API call to get banners from the folder
          // For now, we'll just use the prop banners
          console.log(`Fetching banners from folder: ${folderPath}`)
          // If this was a real implementation, you would replace this with actual fetching logic
          // setBanners(fetchedBanners)
        } catch (error) {
          console.error("Error fetching banners:", error)
        }
      }
      
      fetchBannersFromFolder()
    }
  }, [folderPath, propBanners])

  // Auto-rotate banners
  useEffect(() => {
    if (!autoRotate || banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, banners.length, rotationInterval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  if (banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]

  // Add a console log in the render function
  console.log("Rendering BannerCarousel with:", { 
    currentIndex, 
    bannersLength: banners.length,
    currentBanner: banners[currentIndex] 
  });

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Banner content */}
      <div
        className={cn(
          "flex min-h-[200px] md:min-h-[320px] items-center overflow-hidden relative",
          currentBanner.backgroundColor || "bg-green-100"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 py-6 md:py-0">
          {/* Text Content - First on mobile, left on desktop */}
          <div className="w-full md:w-1/2 text-center md:text-left order-last md:order-first">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">
              {currentBanner.title}
            </h2>
            {currentBanner.subtitle && (
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {currentBanner.subtitle}
              </p>
            )}
            {currentBanner.buttonText && currentBanner.buttonLink && (
              <Button
                onClick={() => router.push(currentBanner.buttonLink || "#")}
                className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto mb-8 md:mb-0"
              >
                {currentBanner.buttonText}
              </Button>
            )}
          </div>

          {/* Image Section - Second on mobile, right on desktop */}
          <div className="w-full md:w-1/2 flex justify-center order-first md:order-last">
            {currentBanner.image ? (
              <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-64">
                <img
                  src={currentBanner.image}
                  alt={currentBanner.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${currentBanner.image}`);
                    e.currentTarget.src = "/placeholder.svg?height=300&width=300";
                  }}
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-full aspect-[4/3] md:aspect-auto md:h-64 flex items-center justify-center rounded">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
          </div>
        </div>

        {/* Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-200",
                  index === currentIndex ? "bg-green-600" : "bg-gray-300"
                )}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}




