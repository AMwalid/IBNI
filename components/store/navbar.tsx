"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Heart, Menu, X, Package, Backpack, ChevronDown, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import CategoriesDropdown from "@/components/store/categories-dropdown"
import { useRouter } from "next/navigation"

interface NavbarProps {
  cartItemsCount?: number
  wishlistItemsCount?: number
  navigateTo?: (page: string) => void
}

export default function Navbar({ cartItemsCount = 0, wishlistItemsCount = 0, navigateTo }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleNavigate = (path: string) => {
    if (navigateTo) {
      // If we're in the main app context, use the navigateTo function
      if (path === '/') {
        navigateTo('/')
      } else if (path === '/bulk-purchase') {
        navigateTo('bulk-purchase')
      } else if (path === '/build-backpack') {
        navigateTo('build-backpack')
      } else {
        navigateTo(path)
      }
    } else {
      // For store pages, use client-side navigation without changing URL
      if (path === '/' || path === '/bulk-purchase' || path === '/build-backpack') {
        // Update the store layout content without changing URL
        const event = new CustomEvent('store-navigation', {
          detail: { path }
        });
        window.dispatchEvent(event);
      } else {
        // For other pages, use normal navigation
        router.push(path)
      }
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  // Add animation for consistent mobile menu experience
  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('/')} 
            className="text-xl md:text-2xl font-bold text-green-700 hover:text-green-800 transition-colors tracking-tight"
          >
            IBNI STORE
          </button>

          {/* Mobile menu button and icons */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Search */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <Search className="w-5 h-5 text-green-700" />
            </button>

            {/* Mobile Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-green-700 transition-colors" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] max-w-full z-[100]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"} in your cart
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 flex flex-col h-[calc(100vh-12rem)]">
                  {cartItemsCount === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                      <p className="text-gray-500 mb-4">Add items to your cart to checkout</p>
                      <SheetClose asChild>
                        <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
                      </SheetClose>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-grow">
                      <div className="flex-grow overflow-y-auto">
                        {/* Cart items would be mapped here */}
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

            {/* Mobile Wishlist */}
            <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
              <SheetTrigger asChild>
                <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-green-700 transition-colors" />
                  {wishlistItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistItemsCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] max-w-full z-[100]">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle>Your Wishlist</SheetTitle>
                  <SheetDescription>
                    {wishlistItemsCount} {wishlistItemsCount === 1 ? "item" : "items"} in your wishlist
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 flex flex-col h-[calc(100vh-12rem)]">
                  {wishlistItemsCount === 0 ? (
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
                        {/* Wishlist items would be mapped here */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-green-700" /> : <Menu className="w-5 h-5 text-green-700" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <CategoriesDropdown handleNavigate={handleNavigate} />
            <button 
              onClick={() => {
                const event = new CustomEvent('store-navigation', {
                  detail: { path: '/special-offers' }
                });
                window.dispatchEvent(event);
              }} 
              className="text-sm font-medium text-gray-600 hover:text-green-700 flex items-center gap-2"
            >
              <Tag className="h-5 w-5" />
              <span>Special Offers</span>
            </button>
            <button 
              onClick={() => {
                const event = new CustomEvent('store-navigation', {
                  detail: { path: '/bulk-purchase' }
                });
                window.dispatchEvent(event);
              }} 
              className="text-sm font-medium text-gray-600 hover:text-green-700 flex items-center gap-2"
            >
              <Package className="h-5 w-5" />
              <span>Bulk Purchase</span>
            </button>
            <button 
              onClick={() => {
                const event = new CustomEvent('store-navigation', {
                  detail: { path: '/build-backpack' }
                });
                window.dispatchEvent(event);
              }} 
              className="text-sm font-medium text-gray-600 hover:text-green-700 flex items-center gap-2"
            >
              <Backpack className="h-5 w-5" />
              <span>Build Backpack</span>
            </button>
          </nav>

          {/* Desktop Search, Cart, Wishlist */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {/* Desktop Icons */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
                <SheetTrigger asChild>
                  <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Heart className="h-6 w-6 text-gray-600 hover:text-green-700 transition-colors" />
                    {wishlistItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistItemsCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] max-w-full z-[100]">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle>Your Wishlist</SheetTitle>
                    <SheetDescription>
                      {wishlistItemsCount} {wishlistItemsCount === 1 ? "item" : "items"} in your wishlist
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 flex flex-col h-[calc(100vh-12rem)]">
                    {wishlistItemsCount === 0 ? (
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
                          {/* Wishlist items would be mapped here */}
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

              {/* Cart */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-green-700 transition-colors" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] max-w-full z-[100]">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle>Your Cart</SheetTitle>
                    <SheetDescription>
                      {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"} in your cart
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 flex flex-col h-[calc(100vh-12rem)]">
                    {cartItemsCount === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                        <p className="text-gray-500 mb-4">Add items to your cart to checkout</p>
                        <SheetClose asChild>
                          <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="flex flex-col flex-grow">
                        <div className="flex-grow overflow-y-auto">
                          {/* Cart items would be mapped here */}
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

              {/* User Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <User className="h-6 w-6 text-gray-600 hover:text-green-700 transition-colors" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <button onClick={() => handleNavigate("/login")} className="w-full text-left">Login</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => handleNavigate("/register")} className="w-full text-left">Register</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => handleNavigate("/account")} className="w-full text-left">My Account</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => handleNavigate("/orders")} className="w-full text-left">My Orders</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
            >
              <div className="py-4 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative px-2">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>

                {/* Mobile Navigation */}
                <nav className="px-2 space-y-2">
                  <button
                    onClick={() => {
                      const event = new CustomEvent('store-navigation', {
                        detail: { path: '/special-offers' }
                      });
                      window.dispatchEvent(event);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                  >
                    <Tag className="h-5 w-5" />
                    <span>Special Offers</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('/bulk-purchase')}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                  >
                    <Package className="h-5 w-5" />
                    <span>Bulk Purchase</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('/build-backpack')}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                  >
                    <Backpack className="h-5 w-5" />
                    <span>Build Backpack</span>
                  </button>

                  {/* Mobile Account Options */}
                  <div className="pt-4 border-t">
                    <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">Account</h3>
                    <button
                      onClick={() => handleNavigate('/login')}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigate('/register')}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleNavigate('/account')}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => handleNavigate('/orders')}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      My Orders
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}



