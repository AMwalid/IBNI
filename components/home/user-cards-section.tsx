"use client"

import { motion } from "framer-motion"
import { ArrowRight, Building, GraduationCap, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserCardsSectionProps {
  navigateTo: (page: string) => void
}

export function UserCardsSection({ navigateTo }: UserCardsSectionProps) {
  const userCards = [
    {
      title: "Parents",
      description: "Track academic progress, connect with teachers, and stay informed.",
      page: "parents",
      icon: Users,
    },
    {
      title: "Students",
      description: "Access resources, monitor performance, and build your future.",
      page: "students",
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      description: "Manage classes, evaluate students, and engage with parents.",
      page: "teachers",
      icon: User,
    },
    {
      title: "Institutions",
      description: "Streamline operations, enhance communication, and grow your reach.",
      page: "institutions",
      icon: Building,
    },
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12 px-6 pb-20">
      {userCards.map((item, i) => (
        <motion.div
          key={item.page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}
          className="h-full"
        >
          <Card className="hover:shadow-xl transition duration-300 h-full flex flex-col">
            <CardHeader className="flex items-center gap-3 !pb-3">
              <item.icon className="w-6 h-6 text-green-600" />
              <CardTitle className="text-xl !mb-0">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow !pt-0">
              <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
              <Button
                variant="link"
                className="text-green-600 flex items-center gap-1 mt-auto self-start px-0 h-auto"
                onClick={() => {
                  if (
                    item.page === "parents" ||
                    item.page === "students" ||
                    item.page === "teachers" ||
                    item.page === "institutions"
                  ) {
                    navigateTo(item.page)
                  } else if (item.page === "find-resources") {
                    window.location.href = `/find-resources${item.initialTab ? `?tab=${item.initialTab}` : ""}`
                  } else {
                    navigateTo(item.page)
                  }
                }}
              >
                Explore <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  )
}
