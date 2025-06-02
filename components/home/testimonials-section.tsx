"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Samira Benali",
      role: "Parent",
      content:
        "IBNI has transformed how I stay involved in my child's education. The ability to track progress and communicate with teachers has been invaluable.",
      rating: 5,
    },
    {
      name: "Bilal Mansouri",
      role: "Student",
      content:
        "As a student, I love how easy it is to access all my courses and track my progress. The interface is intuitive and helps me stay organized.",
      rating: 5,
    },
    {
      name: "Mr. Mourad Haddad",
      role: "Teacher",
      content:
        "Managing my classes has never been easier. The platform streamlines communication with both students and parents, saving me valuable time.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from parents, students, and educators who have transformed their educational experience with IBNI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-green-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
