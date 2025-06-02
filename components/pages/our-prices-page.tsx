"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTitle } from "@/components/ui/page-title"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  GraduationCap,
  Building,
  User,
  DollarSign,
  CheckCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Crown,
  MessageCircle,
  BarChart,
  Bell,
  Database,
  Infinity,
  Award,
  Headphones,
  Percent,
  Settings,
  Rocket,
  Lightbulb,
} from "lucide-react"
import InstitutionsPricingPage from "@/app/instututions/pricing";

interface OurPricesPageProps {
  userType?: "parent" | "student" | "teacher" | "institution" | "general"
  navigateTo?: (page: string, tab?: string | null) => void
}

export default function OurPricesPage({ userType = "general", navigateTo }: OurPricesPageProps) {
  const [activeTab, setActiveTab] = useState<string>(userType !== "general" ? userType : "parent")
  const [isAnnual, setIsAnnual] = useState<boolean>(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Force re-render when billing period changes
  useEffect(() => {
    // This effect will run whenever isAnnual changes
    // The key in AnimatePresence will handle the animation
  }, [isAnnual])

  // Custom tab change handler to ensure it works properly
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  }

  // Format price in DZD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const pricingContent = {
    parent: {
      title: "Parent Plans",
      icon: Users,
      description: "Comprehensive plans to support your child's educational journey.",
      tiers: [
        {
          name: "Free",
          price: 0,
          billing: "monthly",
          description: "Basic tools for parents to get started",
          features: [
            "Track 1 child",
            "Basic progress monitoring",
            "Limited access to educational resources",
            "Message teachers (2 per month)",
            "Basic notification system",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Basic",
          price: 800,
          annualPrice: 7680, // 20% discount on annual billing
          billing: "monthly",
          description: "Essential tools for parents to monitor their child's education",
          features: [
            "Track up to 2 children",
            "Basic progress monitoring",
            "Access to educational resources",
            "Message teachers (10 per month)",
            "Basic notification system",
            "5% discount on IBNI store purchases",
            "Monthly progress reports",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Standard",
          price: 1500,
          annualPrice: 14400, // 20% discount on annual billing
          billing: "monthly",
          description: "Enhanced tools for active parents",
          features: [
            "Track up to 4 children",
            "Advanced progress monitoring",
            "Full access to educational resources",
            "Unlimited teacher messaging",
            "Priority notification system",
            "Schedule parent-teacher meetings",
            "10% discount on IBNI store purchases",
            "Weekly progress insights",
          ],
          isPopular: true,
          cta: "Choose Standard",
        },
        {
          name: "Premium",
          price: 2500,
          annualPrice: 24000, // 20% discount on annual billing
          billing: "monthly",
          description: "Comprehensive educational support for your family",
          features: [
            "Track unlimited children",
            "Comprehensive progress analytics",
            "Premium educational resources",
            "Priority support",
            "Advanced notification system",
            "Schedule unlimited meetings",
            "20% discount on IBNI store purchases",
            "Access to exclusive workshops",
            "Personalized learning recommendations",
          ],
          isPopular: false,
          cta: "Choose Premium",
        },
      ],
      faqs: [
        {
          question: "Can I switch between plans?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.",
        },
        {
          question: "Is there a family discount?",
          answer: "Yes, we offer a 15% discount for families with 3 or more children on our Standard and Premium plans.",
        },
        {
          question: "Do you offer annual billing?",
          answer: "Yes, we offer annual billing with a 20% discount compared to monthly billing.",
        },
        {
          question: "Can I try IBNI before subscribing?",
          answer: "Yes, our Free plan allows you to experience the basic features of IBNI without any cost.",
        },
      ],
    },
    student: {
      title: "Student Plans",
      icon: GraduationCap,
      description: "Tailored plans designed to enhance your learning experience.",
      tiers: [
        {
          name: "Free",
          price: 0,
          billing: "monthly",
          description: "Basic tools for students to get started",
          features: [
            "Limited access to learning resources",
            "Basic progress tracking",
            "Join 1 study group",
            "Basic course recommendations",
            "Access to free practice tests",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Basic",
          price: 500,
          annualPrice: 4800, // 20% discount on annual billing
          billing: "monthly",
          description: "Essential tools for students",
          features: [
            "Access to basic learning resources",
            "Track your academic progress",
            "Join up to 3 study groups",
            "Basic course recommendations",
            "Limited access to practice tests",
            "5% discount on IBNI store purchases",
            "Monthly study planner",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Standard",
          price: 900,
          annualPrice: 8640, // 20% discount on annual billing
          billing: "monthly",
          description: "Enhanced tools for dedicated students",
          features: [
            "Full access to learning resources",
            "Advanced progress tracking",
            "Join unlimited study groups",
            "Personalized course recommendations",
            "Full access to practice tests",
            "10% discount on IBNI store purchases",
            "Priority support",
            "Weekly study planner",
          ],
          isPopular: true,
          cta: "Choose Standard",
        },
        {
          name: "Premium",
          price: 1500,
          annualPrice: 14400, // 20% discount on annual billing
          billing: "monthly",
          description: "Comprehensive support for academic excellence",
          features: [
            "Premium learning resources",
            "Advanced analytics and insights",
            "Create and manage study groups",
            "AI-powered recommendations",
            "Unlimited practice tests",
            "20% discount on IBNI store purchases",
            "Priority support",
            "1-on-1 tutoring sessions (2 per month)",
            "Personalized study roadmap",
          ],
          isPopular: false,
          cta: "Choose Premium",
        },
      ],
      faqs: [
        {
          question: "Is there a student discount?",
          answer: "Yes, all our student plans are already discounted. Additionally, we offer special rates for students from public schools and universities.",
        },
        {
          question: "Can I access IBNI on multiple devices?",
          answer: "Yes, you can access your IBNI account on up to 3 devices simultaneously with any plan.",
        },
        {
          question: "Do you offer plans for university students?",
          answer: "Yes, our student plans are suitable for all education levels. University students receive additional resources specific to higher education and may qualify for special discounts.",
        },
        {
          question: "Is there a free option for students?",
          answer: "Yes, our Free plan allows students to access basic features without any cost, perfect for trying out the platform.",
        },
      ],
    },
    teacher: {
      title: "Teacher Plans",
      icon: User,
      description: "Professional tools to enhance your teaching and connect with students.",
      tiers: [
        {
          name: "Free",
          price: 0,
          billing: "monthly",
          description: "Basic tools for teachers to get started",
          features: [
            "Create a basic professional profile",
            "Manage 1 class",
            "Access to free teaching resources",
            "Basic student progress tracking",
            "Standard communication tools",
            "Limited file storage (1GB)",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Basic",
          price: 1500,
          annualPrice: 14400, // 20% discount on annual billing
          billing: "monthly",
          description: "Essential tools for individual teachers",
          features: [
            "Create a professional profile",
            "Manage up to 3 classes",
            "Basic teaching resources",
            "Student progress tracking",
            "Basic communication tools",
            "Limited file storage (5GB)",
            "5% discount on IBNI store purchases",
            "Basic lesson planning tools",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Professional",
          price: 2500,
          annualPrice: 24000, // 20% discount on annual billing
          billing: "monthly",
          description: "Enhanced tools for dedicated educators",
          features: [
            "Enhanced professional profile",
            "Manage up to 10 classes",
            "Full access to teaching resources",
            "Advanced student analytics",
            "Comprehensive communication tools",
            "Expanded file storage (20GB)",
            "Create and share custom resources",
            "10% commission on course sales",
            "10% discount on IBNI store purchases",
            "Advanced lesson planning tools",
          ],
          isPopular: true,
          cta: "Choose Professional",
        },
        {
          name: "Expert",
          price: 4000,
          annualPrice: 38400, // 20% discount on annual billing
          billing: "monthly",
          description: "Comprehensive tools for educational leaders",
          features: [
            "Premium professional profile",
            "Unlimited class management",
            "Premium teaching resources",
            "Comprehensive analytics dashboard",
            "Advanced communication suite",
            "Extensive file storage (50GB)",
            "Create and monetize custom courses",
            "5% commission on course sales",
            "Priority placement in search results",
            "Dedicated support representative",
            "20% discount on IBNI store purchases",
            "AI-powered teaching assistant",
          ],
          isPopular: false,
          cta: "Choose Expert",
        },
      ],
      faqs: [
        {
          question: "Can I sell my own courses on IBNI?",
          answer: "Yes, teachers on Professional and Expert plans can create and sell their own courses through our platform.",
        },
        {
          question: "How does the commission structure work?",
          answer: "We take a small commission on course sales to cover platform costs. Professional plan users pay 10% commission, while Expert plan users pay only 5%.",
        },
        {
          question: "Is there a discount for public school teachers?",
          answer: "Yes, we offer a 25% discount for teachers from public schools. Verification of employment will be required.",
        },
        {
          question: "Can I try IBNI before subscribing?",
          answer: "Yes, our Free plan allows teachers to experience the basic features of IBNI without any cost.",
        },
      ],
    },
    institution: {
      title: "Institution Plans",
      icon: Building,
      description: "Comprehensive solutions for schools and educational institutions.",
      tiers: [
        {
          name: "Free",
          price: 0,
          billing: "monthly",
          description: "Basic tools for small institutions to get started",
          features: [
            "Basic institutional profile",
            "Up to 3 teacher accounts",
            "Up to 50 student accounts",
            "Basic administrative tools",
            "Standard support",
            "Limited file storage (5GB)",
            "Basic analytics",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Basic",
          price: 10000,
          annualPrice: 96000, // 20% discount on annual billing
          billing: "monthly",
          description: "Essential tools for small institutions",
          features: [
            "Institutional profile",
            "Up to 10 teacher accounts",
            "Up to 200 student accounts",
            "Basic administrative tools",
            "Standard support",
            "Limited file storage (50GB)",
            "Basic analytics",
            "5% discount on bulk purchases",
            "Basic school management system",
          ],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Professional",
          price: 20000,
          annualPrice: 192000, // 20% discount on annual billing
          billing: "monthly",
          description: "Enhanced tools for growing institutions",
          features: [
            "Enhanced institutional profile",
            "Up to 30 teacher accounts",
            "Up to 500 student accounts",
            "Advanced administrative tools",
            "Priority support",
            "Expanded file storage (200GB)",
            "Comprehensive analytics",
            "Custom branding options",
            "API access",
            "10% discount on bulk purchases",
            "Advanced school management system",
          ],
          isPopular: true,
          cta: "Choose Professional",
        },
        {
          name: "Enterprise",
          price: 35000,
          annualPrice: 336000, // 20% discount on annual billing
          billing: "monthly",
          description: "Comprehensive solution for large institutions",
          features: [
            "Premium institutional profile",
            "Unlimited teacher accounts",
            "Unlimited student accounts",
            "Complete administrative suite",
            "24/7 dedicated support",
            "Unlimited file storage",
            "Advanced analytics and reporting",
            "Full customization and branding",
            "Advanced API access",
            "On-site training and setup",
            "Custom feature development",
            "20% discount on bulk purchases",
            "AI-powered educational insights",
          ],
          isPopular: false,
          cta: "Contact Sales",
        },
      ],
      faqs: [
        {
          question: "Can we integrate IBNI with our existing systems?",
          answer: "Yes, our Professional and Enterprise plans include API access for integration with your existing LMS, SIS, and other educational systems.",
        },
        {
          question: "Do you offer custom solutions for unique institutional needs?",
          answer: "Yes, our Enterprise plan includes custom feature development to address your specific requirements.",
        },
        {
          question: "Is there a discount for public schools and universities?",
          answer: "Yes, we offer a 30% discount for public educational institutions. Verification of status will be required.",
        },
        {
          question: "Can we try IBNI before subscribing?",
          answer: "Yes, our Free plan allows institutions to experience the basic features of IBNI without any cost, perfect for evaluating the platform.",
        },
      ],
    },
  }

  const currentPricing = pricingContent[activeTab as keyof typeof pricingContent]
  const PricingIcon = currentPricing.icon

  return (
    <div className="container mx-auto py-12 px-4 relative" style={{ isolation: "isolate" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle title="Our Prices" icon={DollarSign} />
      </motion.div>

      {/* Fallback Tab Navigation Buttons */}
      <div className="mb-4 relative z-[300]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handleTabChange("parent")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "parent" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <Users className="h-4 w-4" /> <span className="whitespace-nowrap">Parents</span>
          </button>
          <button
            onClick={() => handleTabChange("student")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "student" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <GraduationCap className="h-4 w-4" /> <span className="whitespace-nowrap">Students</span>
          </button>
          <button
            onClick={() => handleTabChange("teacher")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "teacher" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <User className="h-4 w-4" /> <span className="whitespace-nowrap">Teachers</span>
          </button>
          <button
            onClick={() => handleTabChange("institution")}
            className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === "institution" ? "bg-green-600 text-white" : "bg-green-50 text-gray-700 hover:bg-green-100"}`}
          >
            <Building className="h-4 w-4" /> <span className="whitespace-nowrap">Institutions</span>
          </button>
        </div>
      </div>


      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 relative z-[200] hidden" // Hide the original tabs but keep them for state management
        style={{ pointerEvents: "auto" }} // Ensure pointer events work
      >
        <div className="relative" style={{ pointerEvents: "auto" }}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-0 relative z-[200]">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-green-50 rounded-xl overflow-hidden shadow-sm border border-green-100 relative z-[200]" style={{ position: "relative", zIndex: 200, pointerEvents: "auto" }}>
              <TabsTrigger
                value="parent"
                className="flex items-center justify-center gap-2 py-4 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300 hover:bg-green-100 data-[state=inactive]:hover:text-green-700 relative z-[200]"
                style={{ pointerEvents: "auto" }}
                onClick={() => handleTabChange("parent")}
              >
                <Users className="h-4 w-4" /> <span className="whitespace-nowrap">Parents</span>
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="flex items-center justify-center gap-2 py-4 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300 hover:bg-green-100 data-[state=inactive]:hover:text-green-700 relative z-[200]"
                style={{ pointerEvents: "auto" }}
                onClick={() => handleTabChange("student")}
              >
                <GraduationCap className="h-4 w-4" /> <span className="whitespace-nowrap">Students</span>
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="flex items-center justify-center gap-2 py-4 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300 hover:bg-green-100 data-[state=inactive]:hover:text-green-700 relative z-[200]"
                style={{ pointerEvents: "auto" }}
                onClick={() => handleTabChange("teacher")}
              >
                <User className="h-4 w-4" /> <span className="whitespace-nowrap">Teachers</span>
              </TabsTrigger>
              <TabsTrigger
                value="institution"
                className="flex items-center justify-center gap-2 py-4 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white transition-all duration-300 hover:bg-green-100 data-[state=inactive]:hover:text-green-700 relative z-[200]"
                style={{ pointerEvents: "auto" }}
                onClick={() => handleTabChange("institution")}
              >
                <Building className="h-4 w-4" /> <span className="whitespace-nowrap">Institutions</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {/* Billing Toggle */}
      {activeTab !== "institution" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 relative z-[50]"
        >
          <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-50 hover:shadow-md transition-all duration-300 inline-flex">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-md ${!isAnnual ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-500 hover:text-green-600 hover:bg-green-50/50'}`}
                  aria-pressed={!isAnnual}
                >
                  Monthly
                </button>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={() => setIsAnnual(!isAnnual)}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-600 data-[state=checked]:to-green-500 data-[state=unchecked]:bg-gray-200 transition-all duration-300"
                  aria-label="Toggle annual billing"
                />
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-md ${isAnnual ? 'text-green-600 bg-green-50 shadow-sm' : 'text-gray-500 hover:text-green-600 hover:bg-green-50/50'}`}
                  aria-pressed={isAnnual}
                >
                  Annual
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-[40]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border-green-50 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4 bg-gradient-to-r from-green-50 to-white">
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-full shadow-sm">
                <PricingIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-green-700">{currentPricing.title}</CardTitle>
                <CardDescription className="text-gray-600">{currentPricing.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <AnimatePresence mode="wait">
                {activeTab === "institution" ? (
                  <InstitutionsPricingPage />
                ) : (
                <motion.div
                  key={activeTab + (isAnnual ? "-annual" : "-monthly")}
                  initial={{ opacity: 0, x: isAnnual ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAnnual ? -20 : 20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                  {currentPricing.tiers.map((tier, index) => (
                    <div
                      key={index}
                      className="opacity-0 animate-fadeIn hover:-translate-y-2 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card
                        className={`h-full flex flex-col relative transition-all duration-300
                          ${tier.isPopular
                            ? 'border-green-400 shadow-lg z-10 bg-gradient-to-b from-white to-green-50'
                            : hoveredCard === index
                              ? 'border-green-200 shadow-md'
                              : 'hover:border-green-100 hover:shadow-md border-green-50'
                          }`}
                      >
                        {tier.isPopular && (
                          <div className="absolute -top-4 left-0 right-0 mx-auto w-32 bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-1 rounded-full text-sm font-medium shadow-md">
                            <div className="flex items-center justify-center">
                              <Crown className="h-3 w-3 mr-1" />
                              Most Popular
                            </div>
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <CardTitle className={`text-xl ${tier.isPopular ? 'text-green-700' : 'text-green-600'}`}>{tier.name}</CardTitle>
                          <CardDescription className="min-h-[40px] text-gray-500">{tier.description}</CardDescription>
                          <div className="mt-4 pb-2 border-b border-green-50">
                            {tier.price === 0 ? (
                              <span className="text-3xl font-bold text-green-600">Free</span>
                            ) : (
                              <div>
                                <div className="flex items-baseline">
                                  <span className="text-3xl font-bold text-green-600">
                                    {formatPrice(isAnnual ? (tier.annualPrice || Math.round(tier.price * 12 * 0.8)) : tier.price)}
                                  </span>
                                  <span className="text-gray-500 ml-2 text-sm">/ {isAnnual ? 'year' : 'month'}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow pt-4">
                          <ul className="space-y-3">
                            {tier.features.map((feature, i) => {
                              // Determine which icon to use based on the feature text
                              let FeatureIcon = CheckCircle;
                              if (feature.toLowerCase().includes("unlimited")) FeatureIcon = Infinity;
                              else if (feature.toLowerCase().includes("priority")) FeatureIcon = Rocket;
                              else if (feature.toLowerCase().includes("advanced")) FeatureIcon = Award;
                              else if (feature.toLowerCase().includes("analytics")) FeatureIcon = BarChart;
                              else if (feature.toLowerCase().includes("storage")) FeatureIcon = Database;
                              else if (feature.toLowerCase().includes("support")) FeatureIcon = Headphones;
                              else if (feature.toLowerCase().includes("discount")) FeatureIcon = Percent;
                              else if (feature.toLowerCase().includes("message")) FeatureIcon = MessageCircle;
                              else if (feature.toLowerCase().includes("notification")) FeatureIcon = Bell;
                              else if (feature.toLowerCase().includes("profile")) FeatureIcon = User;
                              else if (feature.toLowerCase().includes("custom")) FeatureIcon = Settings;
                              else if (feature.toLowerCase().includes("ai")) FeatureIcon = Sparkles;

                              return (
                                <li
                                  key={i}
                                  className="flex items-start hover:translate-x-1 transition-transform duration-200"
                                >
                                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-1 rounded-full mr-2 flex-shrink-0">
                                    <FeatureIcon className="h-4 w-4 text-green-600" />
                                  </div>
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </CardContent>
                        <CardFooter className="pt-4">
                          <Button
                            className={`w-full transition-all duration-300 ${
                              tier.isPopular
                                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg'
                                : 'bg-white text-green-600 border border-green-100 hover:bg-green-50 hover:border-green-200'
                            }`}
                            onClick={() => navigateTo && navigateTo("signup")}
                          >
                            {tier.cta}
                            <span
                              className={`ml-2 inline-flex items-center transition-all duration-300 ${
                                hoveredCard === index ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-1'
                              }`}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {currentPricing.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="border border-green-50 rounded-lg mb-3 overflow-hidden shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left px-5 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-white hover:no-underline data-[state=open]:bg-gradient-to-r data-[state=open]:from-green-50 data-[state=open]:to-white transition-all duration-300">
                        <span className="font-medium text-green-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 py-4 bg-gradient-to-r from-green-50/30 to-white text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 mb-6 shadow-sm border border-green-50 hover:shadow-md transition-all duration-300 relative z-[30]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-green-700">
          <Sparkles className="h-5 w-5 text-green-600 mr-2" />
          Special Offers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Calendar,
              title: "Annual Subscription Discount",
              description: "Save 20% when you choose annual billing on any of our paid plans.",
              badge: "20% OFF",
              delay: 0.1
            },
            {
              icon: Building,
              title: "Public Educational Institution Discount",
              description: "Special rates for public schools, universities, and educational non-profits.",
              badge: "30% OFF",
              delay: 0.2
            },
            {
              icon: User,
              title: "Public School Teacher Discount",
              description: "Special discount for teachers employed at public schools in Algeria.",
              badge: "25% OFF",
              delay: 0.3
            },
            {
              icon: GraduationCap,
              title: "Free Tier Available",
              description: "Try IBNI with our free tier - available for all user types with basic functionality.",
              badge: "FREE",
              delay: 0.4
            }
          ].map((offer, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 border border-green-50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: offer.delay }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h4 className="font-semibold text-lg mb-3 flex items-center text-green-700">
                <div className="bg-gradient-to-br from-green-100 to-green-50 p-2 rounded-full mr-3 shadow-sm">
                  <offer.icon className="h-5 w-5 text-green-600" />
                </div>
                {offer.title}
              </h4>
              <p className="text-gray-600 mb-4">
                {offer.description}
              </p>
              <Badge className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 hover:bg-green-100 px-3 py-1 text-sm font-medium border border-green-100 shadow-sm">
                {offer.badge}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-center bg-white rounded-xl p-10 shadow-sm border border-green-50 hover:shadow-md transition-all duration-300 relative z-[20]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-700">Need a custom solution?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our sales team to discuss your specific requirements and get a tailored quote for your organization.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg transition-all duration-300 px-10 py-6 text-lg"
            onClick={() => navigateTo && navigateTo("contact-us")}
          >
            <Headphones className="mr-3 h-5 w-5" />
            Contact Sales
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}