"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Globe, Lightbulb, MessageSquare, Users } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Comprehensive Platform",
      description: "All educational needs in one place for seamless learning experiences.",
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Connect with teachers, students, and institutions in your area.",
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      description: "Access a vast library of educational resources and materials.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Stay connected with instant messaging and updates.",
    },
    {
      icon: Lightbulb,
      title: "Personalized Learning",
      description: "Tailored educational experiences based on individual needs.",
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description: "Monitor academic growth with detailed analytics and insights.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Why Choose IBNI?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers a comprehensive suite of tools designed to enhance the educational experience for all
            stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <feature.icon className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
