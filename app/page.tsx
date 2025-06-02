"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/layout/nav-bar"
import HomePage from "@/components/pages/home-page"
import UserTypePage from "@/components/pages/user-type-page"
import SignUpPage from "@/components/pages/signup-page"
import LoginPage from "@/components/pages/login-page"
import BookDemoPage from "@/components/pages/book-demo-page"
import FindResourcePage from "@/components/pages/find-resource-page"
import TrackKidPage from "@/components/pages/track-kid-page"
import MyCoursesPage from "@/components/pages/my-courses-page"
import TrackProgressPage from "@/components/pages/track-progress-page"
import IntegratedStorePage from "@/components/pages/integrated-store-page"
import IntegratedBulkPurchasePage from "@/components/pages/integrated-bulk-purchase-page"
import IntegratedBackpackBuilderPage from "@/components/pages/integrated-backpack-builder-page"
import IntegratedSpecialOffersPage from "@/components/pages/integrated-special-offers-page"
import TeacherProfilePage from "@/components/pages/teacher-profile-page"
import TeachersProfilePage from "@/components/pages/teachers-profile-page"
import TeacherProfileKazi from "@/components/pages/teacher-profile-kazi"
import TeacherProfileBenali from "@/components/pages/teacher-profile-benali"
import TeacherProfileHadj from "@/components/pages/teacher-profile-hadj"
import TeacherProfileMansouri from "@/components/pages/teacher-profile-mansouri"
import TeacherProfileBouaziz from "@/components/pages/teacher-profile-bouaziz"
import ManageClassesPage from "@/components/pages/manage-classes-page"
import SchoolProfilePage from "@/components/pages/school-profile-page"
import SchoolProfileEIA from "@/components/pages/school-profile-eia"
import SchoolProfileElFeth from "@/components/pages/school-profile-elfeth"
import SchoolProfileDescartes from "@/components/pages/school-profile-descartes"
import SchoolProfilePolytechnique from "@/components/pages/school-profile-polytechnique"
import SchoolProfileAnnaba from "@/components/pages/school-profile-annaba"
import SchoolProfileLittleCoder from "@/components/pages/school-profile-littlecoder"
import ManageSchoolPage from "@/components/pages/manage-school-page"

import AboutUsPage from "@/components/pages/about-us-page"
import ContactUsPage from "@/components/pages/contact-us-page"
import UserGuidePage from "@/components/pages/user-guide-page"
import OurPricesPage from "@/components/pages/our-prices-page"
import ComparePage from "@/components/pages/compare-page"
import InvestInIBNIPage from "@/components/pages/invest-in-ibni-page"
import TeacherProfileHaddad from "@/components/pages/teacher-profile-haddad"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [userType, setUserType] = useState<"parent" | "student" | "teacher" | "institution" | null>(null)
  const [initialTab, setInitialTab] = useState<string | undefined>(undefined)

  // Check for page query parameter on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const pageParam = urlParams.get('page')
      const typeParam = urlParams.get('type')

      if (pageParam) {
        setCurrentPage(pageParam)

        // If we have a type parameter for find-resources, set it as the initial tab
        if (pageParam === 'find-resources' && typeParam) {
          setInitialTab(typeParam)
        }

        // Clean up the URL
        window.history.replaceState({}, '', '/')
      }
    }
  }, [])

  const navigateTo = (page: string, query?: string | null, showBackButton?: boolean) => {
    // Check if this is a user type page
    if (page === "parents" || page === "students" || page === "teachers" || page === "institutions") {
      setCurrentPage("user-type")
      setUserType(page.slice(0, -1) as "parent" | "student" | "teacher" | "institution")
      return
    }

    // Special handling for find-resources page
    if (page === "find-resources") {
      setCurrentPage(page)
      // If a tab is provided, use it, otherwise keep the current tab
      setInitialTab(query || initialTab)
      window.scrollTo(0, 0)
      return
    }

    // For teacher and school profile pages, preserve the query parameters
    if (page.startsWith("teacher-profile-") || page.startsWith("school-profile-")) {
      setCurrentPage(page)
      // Store the query parameters in the URL
      if (query) {
        const url = new URL(window.location.href)
        url.searchParams.set("fromFindResources", "true")
        window.history.replaceState({}, "", url.toString())
      }
      window.scrollTo(0, 0)
      return
    }

    setCurrentPage(page)
    setInitialTab(query || undefined)
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} />
      case "user-type":
        return userType ? (
          <UserTypePage userType={userType} navigateTo={navigateTo} />
        ) : (
          <HomePage navigateTo={navigateTo} />
        )
      case "signup":
        return <SignUpPage navigateTo={navigateTo} />
      case "login":
        return <LoginPage navigateTo={navigateTo} />
      case "book-demo":
        return <BookDemoPage navigateTo={navigateTo} />
      case "find-resources":
        return <FindResourcePage initialTab={initialTab} navigateTo={navigateTo} />
      case "parents-track-kid":
        return <TrackKidPage />
      case "parents-my-courses":
        return <MyCoursesPage userType="parent" />
      case "students-track-progress":
        return <TrackProgressPage />
      case "students-my-courses":
        return <MyCoursesPage userType="student" />
      case "teachers-profile":
        return <TeachersProfilePage navigateTo={navigateTo} />
      case "teacher-profile-kazi":
        return <TeacherProfileKazi navigateTo={navigateTo} showBackButton={true} />
      case "teacher-profile-benali":
        return <TeacherProfileBenali navigateTo={navigateTo} showBackButton={true} />
      case "teacher-profile-hadj":
        return <TeacherProfileHadj navigateTo={navigateTo} showBackButton={true} />
      case "teacher-profile-mansouri":
        return <TeacherProfileMansouri navigateTo={navigateTo} showBackButton={true} />
      case "teacher-profile-bouaziz":
        return <TeacherProfileBouaziz navigateTo={navigateTo} showBackButton={true} />
      case "teacher-profile-haddad":
        return <TeacherProfileHaddad navigateTo={navigateTo} userType={userType} showBackButton={true} />
      case "teachers-manage-classes":
        return <ManageClassesPage />
      case "institutions-profile":
        return <SchoolProfilePage userType="school" navigateTo={navigateTo} showBackButton={false} />
      case "school-profile-eia":
        return <SchoolProfileEIA navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-elfeth":
        return <SchoolProfileElFeth navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-descartes":
        return <SchoolProfileDescartes navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-polytechnique":
        return <SchoolProfilePolytechnique navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-annaba":
        return <SchoolProfileAnnaba navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-littlecoder":
        return <SchoolProfileLittleCoder navigateTo={navigateTo} showBackButton={true} />
      case "school-profile-1":
        return <SchoolProfilePage userType="parent" navigateTo={navigateTo} showBackButton={true} />
      case "manage-school-dashboard":
        return <ManageSchoolPage />
      case "store":
        return <IntegratedStorePage navigateTo={navigateTo} />
      case "store-bulk-purchase":
        return <IntegratedBulkPurchasePage navigateTo={navigateTo} />
      case "backpack-builder":
        return <IntegratedBackpackBuilderPage navigateTo={navigateTo} />
      case "store-special-offers":
        return <IntegratedSpecialOffersPage navigateTo={navigateTo} />
      case "about-us":
        return <AboutUsPage navigateTo={navigateTo} />
      case "contact-us":
        return <ContactUsPage />
      case "our-prices":
        return <OurPricesPage userType={userType || "general"} navigateTo={navigateTo} />
      case "user-guide":
        return <UserGuidePage userType={userType || "general"} navigateTo={navigateTo} />
      case "compare":
        return <ComparePage type={initialTab as "schools" | "teachers" | undefined} />
      case "invest-in-ibni":
        return <InvestInIBNIPage />
      default:
        // Handle category routes
        if (currentPage.startsWith("store-category-")) {
          const categoryPath = currentPage.replace("store-category-", "")
          return <IntegratedStorePage navigateTo={navigateTo} initialCategory={categoryPath} />
        }
        return <HomePage navigateTo={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar navigateTo={navigateTo} currentPage={currentPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
