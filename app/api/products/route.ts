import { NextResponse } from 'next/server'
import { Product } from '@/types/store'

// Mock data - replace with your actual data source
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Math Textbook',
    price: 49.99,
    image: '/products/math-textbook.jpg',
    category: 'Books',
    rating: 4.5,
    reviewCount: 120,
    description: 'Comprehensive math textbook for high school',
    stock: 100,
    deliveryTime: '2-3 days',
    audience: ['students', 'teachers'],
    gradeLevel: 'High School'
  },
  {
    id: '2',
    name: 'Science Kit',
    price: 29.99,
    image: '/products/science-kit.jpg',
    category: 'Supplies',
    rating: 4.2,
    reviewCount: 85,
    description: 'Hands-on science experiment kit',
    stock: 50,
    deliveryTime: '1-2 days',
    audience: ['students', 'parents'],
    ageRange: '8-12 years'
  }
]

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return NextResponse.json(mockProducts)
}
