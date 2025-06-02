"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  navigateTo: (page: string) => void
}

export function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto text-center py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
      >
        Welcome to IBNI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
      >
        Your all-in-one EdTech platform connecting parents, students, teachers, and institutions seamlessly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center gap-4"
      >
        <Button size="lg" className="text-white bg-green-600 hover:bg-green-700" onClick={() => navigateTo("signup")}>
          Get Started
        </Button>
        <Button size="lg" variant="outline" onClick={() => navigateTo("about-us")}>
          Learn More
        </Button>
      </motion.div>
    </section>
  )
}

