"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface FindResourcesFooterProps {
  handleNavigate?: (path: string) => void
}

export default function FindResourcesFooter({ handleNavigate }: FindResourcesFooterProps) {
  const router = useRouter()

  const navigate = (path: string) => {
    if (handleNavigate) {
      handleNavigate(path)
    } else {
      router.push(path)
    }
  }

  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">IBNI Education</h3>
            <p className="text-gray-600 text-sm">
              Connect with qualified teachers and discover educational institutions. Find the perfect match for your learning journey.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("find-resources/teachers")} className="text-gray-600 hover:text-green-600">
                  Find Teachers
                </button>
              </li>
              <li>
                <button onClick={() => navigate("find-resources/schools")} className="text-gray-600 hover:text-green-600">
                  Find Schools
                </button>
              </li>
              <li>
                <button onClick={() => navigate("store")} className="text-gray-600 hover:text-green-600">
                  Educational Store
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("blog")} className="text-gray-600 hover:text-green-600">
                  Blog & Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigate("resources/teaching-materials")} className="text-gray-600 hover:text-green-600">
                  Teaching Materials
                </button>
              </li>
              <li>
                <button onClick={() => navigate("resources/curriculum")} className="text-gray-600 hover:text-green-600">
                  Curriculum Resources
                </button>
              </li>
              <li>
                <button onClick={() => navigate("resources/events")} className="text-gray-600 hover:text-green-600">
                  Educational Events
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">About & Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("about-us")} className="text-gray-600 hover:text-green-600">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("contact-us")} className="text-gray-600 hover:text-green-600">
                  Contact Us
                </button>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">📍</span>
                <span className="text-gray-600">TLEMCEN, Algeria</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">📞</span>
                <span className="text-gray-600">+213 555309404</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✉️</span>
                <span className="text-gray-600">ibni.2025dz@gmail.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.82 7.6c.004.1.007.198.007.298 0 3.045-2.318 6.56-6.56 6.56a6.529 6.529 0 01-3.532-1.033 4.618 4.618 0 003.407-.954 2.303 2.303 0 01-2.15-1.6 2.295 2.295 0 001.04-.04 2.302 2.302 0 01-1.847-2.256v-.029c.31.173.666.277 1.044.289a2.294 2.294 0 01-.713-3.07 6.54 6.54 0 004.749 2.407 2.302 2.302 0 013.926-2.098 4.602 4.602 0 001.463-.559 2.31 2.31 0 01-1.013 1.275 4.59 4.59 0 001.324-.363 4.66 4.66 0 01-1.147 1.195z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">© 2025 IBNI Educational Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 