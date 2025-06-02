"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

interface NavItem {
  name: string
  page: string
  initialTab?: string
  dropdown?: NavItem[]
  userType?: string
}

interface NavBarProps {
  navigateTo: (page: string, initialTab?: string | null) => void
  currentPage: string
}

export function NavBar({ navigateTo, currentPage }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [userType, setUserType] = useState<string | null>(null)

  const navItems: NavItem[] = [
    {
      name: "Parents",
      page: "parents",
      dropdown: [
        { name: "Find Schools", page: "find-resources", initialTab: "schools" },
        { name: "Find Teachers", page: "find-resources", initialTab: "teachers" },
        { name: "Track My Kid", page: "parents-track-kid" },
        { name: "My Courses (Child)", page: "parents-my-courses" },
      ],
    },
    {
      name: "Students",
      page: "students",
      dropdown: [
        { name: "Find Schools", page: "find-resources", initialTab: "schools" },
        { name: "Find Teachers", page: "find-resources", initialTab: "teachers" },
        { name: "Track My Progress", page: "students-track-progress" },
        { name: "My Courses", page: "students-my-courses" },
      ],
    },
    {
      name: "Teachers",
      page: "teachers",
      dropdown: [
        { name: "My Profile", page: "teachers-profile" },
        { name: "Manage My Classes", page: "teachers-manage-classes" },
      ],
    },
    {
      name: "Institutions",
      page: "institutions",
      dropdown: [
        { name: "My Profile", page: "institutions-profile" },
        { name: "School Dashboard", page: "manage-school-dashboard" },
      ],
    },
    { name: "Store", page: "store" },
    {
      name: "About",
      page: "about-us",
      dropdown: [
        { name: "About Us", page: "about-us" },
        { name: "Contact Us", page: "contact-us" },
        { name: "User Guide", page: "user-guide" },
        { name: "Our Prices", page: "our-prices" },
        { name: "Invest in IBNI", page: "invest-in-ibni" },
      ],
    },
  ]

  const handleNavigate = (page: string, initialTab: string | null = null, userType?: string) => {
    navigateTo(page, initialTab)
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    if (userType) {
      setUserType(userType)
    }
  }

  const handleMobileDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0
    const isDropdownOpen = openDropdown === item.name
    const itemBasePage = item.page?.split("-")[0]
    const currentBasePage = currentPage?.split("-")[0]
    const isCurrentSection =
      currentPage &&
      (currentPage === item.page ||
        (itemBasePage && currentBasePage === itemBasePage) ||
        (currentPage === "find-resources" && (item.name === "Parents" || item.name === "Students")) ||
        (hasDropdown && item.dropdown?.some((sub) => sub.page === currentPage)))

    // Check if this is a landing page link
    const isLandingPage =
      item.page.startsWith("/") && ["/parents", "/students", "/teachers", "/institutions"].includes(item.page)

    return (
      <li
        key={item.page || item.name}
        className={`relative ${isMobile ? "w-full" : ""}`}
        onMouseEnter={() => !isMobile && hasDropdown && setOpenDropdown(item.name)}
        onMouseLeave={() => !isMobile && setOpenDropdown(null)}
      >
        {isLandingPage ? (
          <Link
            href={item.page}
            className={`
            flex items-center gap-1 w-full text-left rounded transition-colors duration-150 ease-in-out
            ${isMobile ? "p-4 justify-between hover:bg-gray-50 text-base" : "px-4 py-2 text-sm"}
            ${isCurrentSection ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600 font-medium"}
          `}
            onClick={() => {
              setIsMobileMenuOpen(false)
              setOpenDropdown(null)
            }}
          >
            {item.name}
            {hasDropdown && (
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            )}
          </Link>
        ) : (
          <button
            onClick={(e) => {
              if (isMobile && hasDropdown) {
                e.preventDefault()
                handleMobileDropdownToggle(item.name)
              } else {
                handleNavigate(item.page, item.initialTab || null, item.userType)
              }
            }}
            className={`
            flex items-center gap-1 w-full text-left rounded transition-colors duration-150 ease-in-out
            ${isMobile ? "p-4 justify-between hover:bg-gray-50 text-base" : "px-4 py-2 text-sm"}
            ${isCurrentSection ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600 font-medium"}
          `}
            aria-haspopup={hasDropdown ? "true" : undefined}
            aria-expanded={isDropdownOpen}
          >
            {item.name}
            {hasDropdown && (
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            )}
          </button>
        )}

        {hasDropdown && (
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: isMobile ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isMobile ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className={`
                ${
                  isMobile
                    ? "pl-4 space-y-1 bg-gray-50"
                    : "absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg p-2 w-64 z-[110] space-y-1"
                }
              `}
                onMouseEnter={() => !isMobile && setOpenDropdown(item.name)}
                onMouseLeave={() => !isMobile && setOpenDropdown(null)}
              >
                {item.dropdown?.map((subItem) => (
                  <li key={subItem.page + (subItem.initialTab || "")}>
                    <button
                      onClick={() => handleNavigate(subItem.page, subItem.initialTab || null)}
                      className={`
                      w-full text-left text-sm px-3 py-2 rounded transition-colors duration-150 ease-in-out
                      ${
                        currentPage === subItem.page
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                      }
                    `}
                    >
                      {subItem.name}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </li>
    )
  }

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-sm py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-[100] border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={() => handleNavigate("home")}
          className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors"
        >
          IBNI
        </button>

        <ul className="hidden md:flex items-center space-x-1">{navItems.map((item) => renderNavItem(item, false))}</ul>

        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => handleNavigate("login")}
            className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate("signup")}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => handleNavigate("book-demo")}
            className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition-colors"
          >
            Book a Demo
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-green-700" /> : <Menu className="w-6 h-6 text-green-700" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 overflow-hidden"
            style={{ zIndex: 99 }}
          >
            <ul className="flex flex-col divide-y divide-gray-100">
              {navItems.map((item) => renderNavItem(item, true))}
              <li className="p-4 space-y-3">
                <button
                  onClick={() => handleNavigate("login")}
                  className="w-full px-4 py-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigate("signup")}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavigate("book-demo")}
                  className="w-full px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition-colors text-left"
                >
                  Book a Demo
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
