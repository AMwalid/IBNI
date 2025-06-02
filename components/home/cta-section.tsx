"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CTASectionProps {
  navigateTo: (page: string) => void
}

export function CTASection({ navigateTo }: CTASectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-green-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of parents, students, teachers, and institutions who are already benefiting from IBNI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-700 hover:bg-green-800" onClick={() => navigateTo("signup")}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50" onClick={() => navigateTo("book-demo")}>
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


