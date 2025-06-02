"use client"

import React, { useState, useEffect } from "react"
import Navbar from "@/components/store/navbar"
import StoreFooter from "@/components/store/footer"
import { cn } from "@/lib/utils"
import BulkPurchasePage from "@/components/pages/bulk-purchase-page"
import BackpackBuilderPage from "@/components/pages/backpack-builder/backpack-builder-page"
import IntegratedSpecialOffersPage from "@/components/pages/integrated-special-offers-page"
import { usePathname } from "next/navigation"

interface StoreLayoutProps {
  children: React.ReactNode
  cartItemsCount?: number
  wishlistItemsCount?: number
  navigateTo?: (page: string) => void
}

export default function StoreLayout({
  children,
  cartItemsCount = 0,
  wishlistItemsCount = 0,
  navigateTo,
}: StoreLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState<'store' | 'bulk-purchase' | 'build-backpack' | 'special-offers'>('store')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleStoreNavigation = (event: CustomEvent) => {
      const path = event.detail.path
      if (path === '/') {
        setCurrentPage('store')
      } else if (path === '/bulk-purchase') {
        setCurrentPage('bulk-purchase')
      } else if (path === '/build-backpack') {
        setCurrentPage('build-backpack')
      } else if (path === '/special-offers') {
        setCurrentPage('special-offers')
      }
    }

    window.addEventListener('store-navigation', handleStoreNavigation as EventListener)
    return () => {
      window.removeEventListener('store-navigation', handleStoreNavigation as EventListener)
    }
  }, [])

  // Set initial page based on pathname
  useEffect(() => {
    if (pathname === '/') {
      setCurrentPage('store')
    } else if (pathname === '/bulk-purchase') {
      setCurrentPage('bulk-purchase')
    } else if (pathname === '/build-backpack') {
      setCurrentPage('build-backpack')
    } else if (pathname === '/special-offers') {
      setCurrentPage('special-offers')
    }
  }, [pathname])

  const renderContent = () => {
    switch (currentPage) {
      case 'bulk-purchase':
        return <BulkPurchasePage />
      case 'build-backpack':
        return <BackpackBuilderPage />
      case 'special-offers':
        return <IntegratedSpecialOffersPage />
      default:
        return children
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className={cn(
        "sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
        isScrolled ? "shadow-md" : ""
      )}>
        <Navbar cartItemsCount={cartItemsCount} wishlistItemsCount={wishlistItemsCount} navigateTo={navigateTo} />
      </div>
      <main className="bg-gray-50 flex-grow">{renderContent()}</main>
      <StoreFooter handleNavigate={navigateTo} />
    </div>
  )
}
