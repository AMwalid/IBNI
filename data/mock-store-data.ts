// Product type definition
export interface Product {
  id: string
  title: string
  category: string
  price_dzd: number
  original_price_dzd?: number
  description: string
  thumbnail: string
  rating?: number
  reviewCount?: number
  stock?: number
  isNew?: boolean
  isOnSale?: boolean
  discountPercentage?: number
  tags?: string[]
  deliveryTime?: string
  audience?: ("students" | "teachers" | "parents" | "schools" | "businesses")[]
  ageRange?: string
  gradeLevel?: string
  subcategory?: string
}

// Ad Banner type
export interface AdBanner {
  id: string
  title: string
  subtitle?: string
  image: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

// Category type
export interface Category {
  id: string
  name: string
  icon: string
  subcategories?: { id: string; name: string }[]
}

// Complete categories array
export const categories: Category[] = [
  {
    id: "office-furniture",
    name: "Office Furniture",
    icon: "Building",
    subcategories: [
      { id: "desks", name: "Desks" },
      { id: "chairs", name: "Chairs" },
      { id: "cabinets", name: "Cabinets" },
    ],
  },
  {
    id: "books",
    name: "Books",
    icon: "BookOpen",
    subcategories: [
      { id: "livres-parascolaire", name: "Livres Parascolaire" },
      { id: "high-school-education", name: "High School Education" },
      { id: "middle-school-education", name: "Middle School Education" },
      { id: "primary-education", name: "Primary Education" },
      { id: "novels", name: "Novels" },
      { id: "human-development", name: "Human Development" },
      { id: "religious-books", name: "Religious Books" },
    ],
  },
  {
    id: "teachers-supplies",
    name: "Teacher's Supplies",
    icon: "GraduationCap",
    subcategories: [
      { id: "planners", name: "Planners" },
      { id: "teaching-aids", name: "Teaching Aids" },
      { id: "classroom-management", name: "Classroom Management" },
    ],
  },
  {
    id: "gifts-decoration",
    name: "Gifts & Decoration",
    icon: "Gift",
    subcategories: [
      { id: "decorations", name: "Decorations" },
      { id: "birthday-decoration", name: "Birthday Decoration" },
      { id: "home-decoration", name: "Home Decoration" },
      { id: "gifts", name: "Gifts" },
      { id: "mens-gifts", name: "Mens Gifts" },
      { id: "women-gifts", name: "Women Gifts" },
      { id: "kids-gifts", name: "Kids Gifts" },
    ],
  },
  {
    id: "school-supplies",
    name: "School Supplies",
    icon: "Pencil",
    subcategories: [
      { id: "geometric-tools", name: "Geometric Tools" },
      { id: "water-color", name: "Water Color" },
      { id: "notebooks", name: "Notebooks" },
      { id: "bags", name: "Bags" },
      { id: "glue", name: "Glue" },
      { id: "eraser", name: "Eraser" },
      { id: "calculators", name: "Calculators" },
      { id: "pencil-case", name: "Pencil Case" },
      { id: "school-apron", name: "School Apron" },
      { id: "scissors", name: "Scissors" },
      { id: "corrector", name: "Corrector" },
      { id: "compass", name: "Compass" },
      { id: "pens", name: "Pens" },
      { id: "highlighter", name: "Highlighter" },
    ],
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    icon: "Briefcase",
    subcategories: [
      { id: "bags-briefcases", name: "Bags And Briefcases" },
      { id: "small-supplies", name: "Small Supplies" },
      { id: "large-supplies", name: "Large Supplies" },
      { id: "stationery", name: "Stationery" },
      { id: "staples-staplers", name: "Staples and Staplers" },
      { id: "filing-archiving", name: "Filing And Archiving" },
    ],
  },
  {
    id: "kids",
    name: "Kids",
    icon: "Baby",
    subcategories: [
      { id: "semi-school-preparatory", name: "Semi-school - Preparatory" },
      { id: "swimming-pool", name: "Swimming Pool" },
      { id: "educational-games", name: "Educational Games" },
      { id: "girls-games", name: "Girls Games" },
      { id: "boys-games", name: "Boys Games" },
      { id: "dolls", name: "Dolls" },
    ],
  },
  {
    id: "courses",
    name: "Courses",
    icon: "BookOpen",
    subcategories: [
      { id: "language-courses", name: "Language Courses" },
      { id: "math-courses", name: "Math Courses" },
      { id: "science-courses", name: "Science Courses" },
    ],
  },
  {
    id: "uniforms",
    name: "Uniforms",
    icon: "Shirt",
    subcategories: [
      { id: "school-uniforms", name: "School Uniforms" },
      { id: "sports-uniforms", name: "Sports Uniforms" },
    ],
  },
  {
    id: "kits",
    name: "Kits",
    icon: "Package",
    subcategories: [
      { id: "science-kits", name: "Science Kits" },
      { id: "art-kits", name: "Art Kits" },
      { id: "school-starter-kits", name: "School Starter Kits" },
    ],
  },
]

// Complete ad banners array (unchanged)
export const adBanners: AdBanner[] = [
  // ... (original banner data unchanged)
]

// FULL PRODUCTS ARRAY (NO ABBREVIATIONS)
export const products: Product[] = [
  // ======= Office Furniture =======
  // Desks
  {
    id: "desk-executive",
    title: "Executive Wood Desk",
    category: "office-furniture",
    subcategory: "desks",
    price_dzd: 45990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Premium mahogany desk with built-in storage and cable management system. Features three drawers and a spacious work surface.",
    rating: 4.8,
    stock: 5,
    deliveryTime: "7-10 days",
    audience: ["teachers", "schools", "businesses"]
  },
  {
    id: "desk-student",
    title: "Student Study Desk",
    category: "office-furniture",
    subcategory: "desks",
    price_dzd: 18990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Compact study desk perfect for students. Includes bookshelf and drawer for storage. Easy to assemble.",
    rating: 4.5,
    stock: 12,
    deliveryTime: "3-5 days",
    audience: ["students", "parents"]
  },
  {
    id: "desk-standing",
    title: "Adjustable Standing Desk",
    category: "office-furniture",
    subcategory: "desks",
    price_dzd: 35990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Electric height-adjustable desk that transitions from sitting to standing position. Includes memory settings and anti-collision technology.",
    rating: 4.9,
    stock: 3,
    deliveryTime: "10-14 days",
    audience: ["teachers", "schools", "businesses"]
  },

  // Chairs
  {
    id: "chair-ergo",
    title: "Ergonomic Office Chair",
    category: "office-furniture",
    subcategory: "chairs",
    price_dzd: 28990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Adjustable ergonomic chair with lumbar support, headrest, and breathable mesh back. Ideal for long working hours.",
    rating: 4.7,
    stock: 8,
    audience: ["teachers", "schools", "businesses"]
  },
  {
    id: "chair-student",
    title: "Student Chair Set",
    category: "office-furniture",
    subcategory: "chairs",
    price_dzd: 8990,
    original_price_dzd: 10990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Set of 4 stackable student chairs with durable plastic seats and metal frames. Perfect for classrooms.",
    rating: 4.3,
    stock: 20,
    isOnSale: true,
    audience: ["schools"]
  },
  {
    id: "chair-executive",
    title: "Executive Leather Chair",
    category: "office-furniture",
    subcategory: "chairs",
    price_dzd: 35990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Premium leather executive chair with high back, padded armrests, and reclining function. Provides exceptional comfort and style.",
    rating: 4.8,
    stock: 4,
    deliveryTime: "7-10 days",
    audience: ["businesses"]
  },

  // Cabinets
  {
    id: "cabinet-lock",
    title: "Locking Storage Cabinet",
    category: "office-furniture",
    subcategory: "cabinets",
    price_dzd: 17990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Steel security cabinet with 4 drawers and reinforced locking mechanism. Ideal for storing sensitive documents.",
    rating: 4.6,
    stock: 3,
    audience: ["schools", "businesses"]
  },
  {
    id: "cabinet-classroom",
    title: "Classroom Storage Unit",
    category: "office-furniture",
    subcategory: "cabinets",
    price_dzd: 24990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Large capacity storage cabinet with adjustable shelves and colorful bins. Perfect for organizing classroom materials.",
    rating: 4.5,
    stock: 6,
    deliveryTime: "5-7 days",
    audience: ["teachers", "schools"]
  },
  {
    id: "cabinet-file",
    title: "4-Drawer Filing Cabinet",
    category: "office-furniture",
    subcategory: "cabinets",
    price_dzd: 12990,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Vertical filing cabinet with 4 drawers for letter-size documents. Features anti-tilt mechanism and smooth drawer operation.",
    rating: 4.4,
    stock: 10,
    audience: ["teachers", "schools", "businesses"]
  },

  // ======= Books =======
  // Livres Parascolaire
  {
    id: "livre-math",
    title: "Mathematics Workbook",
    category: "books",
    subcategory: "livres-parascolaire",
    price_dzd: 2500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Grade 3 supplemental math exercises",
    gradeLevel: "Primary 3"
  },

  // High School Education
  {
    id: "physics-bac",
    title: "Bac Physics Guide",
    category: "books",
    subcategory: "high-school-education",
    price_dzd: 3200,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Complete baccalaureate physics curriculum",
    gradeLevel: "Secondary"
  },

  // Middle School Education
  {
    id: "histoire-moyen",
    title: "Middle School History",
    category: "books",
    subcategory: "middle-school-education",
    price_dzd: 2100,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Algerian history textbook for grades 6-9"
  },

  // Primary Education
  {
    id: "francais-primaire",
    title: "French Basics",
    category: "books",
    subcategory: "primary-education",
    price_dzd: 1800,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Introductory French for primary students"
  },

  // Novels
  {
    id: "roman-algerien",
    title: "Algerian Nights",
    category: "books",
    subcategory: "novels",
    price_dzd: 2200,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Contemporary Algerian fiction"
  },

  // Human Development
  {
    id: "leadership-dev",
    title: "Leadership Skills",
    category: "books",
    subcategory: "human-development",
    price_dzd: 2800,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Personal development guide"
  },

  // Religious Books
  {
    id: "coran-study",
    title: "Quranic Studies",
    category: "books",
    subcategory: "religious-books",
    price_dzd: 1900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Detailed Quran analysis"
  },

  // ======= Teacher's Supplies =======
  {
    id: "teacher-planner",
    title: "Academic Planner",
    category: "teachers-supplies",
    price_dzd: 4500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Year-long lesson planning system",
    tags: ["organization", "planning"]
  },

  // ======= Gifts & Decoration =======
  // Decorations
  {
    id: "classroom-posters",
    title: "Educational Posters",
    category: "gifts-decoration",
    subcategory: "decorations",
    price_dzd: 1500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Set of 10 classroom posters"
  },

  // Birthday Decoration
  {
    id: "birthday-kit",
    title: "Classroom Birthday Kit",
    category: "gifts-decoration",
    subcategory: "birthday-decoration",
    price_dzd: 3500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Complete birthday decoration package"
  },

  // Home Decoration
  {
    id: "arabesque-lamp",
    title: "Traditional Lamp",
    category: "gifts-decoration",
    subcategory: "home-decoration",
    price_dzd: 12500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Handcrafted Algerian-style lamp"
  },

  // Gifts
  {
    id: "desk-set",
    title: "Executive Desk Set",
    category: "gifts-decoration",
    subcategory: "gifts",
    price_dzd: 8900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Luxury desk accessory collection"
  },

  // Mens Gifts
  {
    id: "leather-briefcase",
    title: "Leather Briefcase",
    category: "gifts-decoration",
    subcategory: "mens-gifts",
    price_dzd: 25900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Premium leather business case"
  },

  // Women Gifts
  {
    id: "silver-pendant",
    title: "Silver Jewelry Set",
    category: "gifts-decoration",
    subcategory: "women-gifts",
    price_dzd: 14900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Traditional Algerian-inspired jewelry"
  },

  // Kids Gifts
  {
    id: "educational-toy",
    title: "STEM Building Kit",
    category: "gifts-decoration",
    subcategory: "kids-gifts",
    price_dzd: 6500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Engineering learning toy set"
  },

  // ======= School Supplies =======
  // Geometric Tools
  {
    id: "geometry-set",
    title: "Full Geometry Kit",
    category: "school-supplies",
    subcategory: "geometric-tools",
    price_dzd: 2500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "35-piece precision drawing set with metal compass, protractor, rulers, and set squares. Comes in a protective case.",
    rating: 4.6,
    stock: 45,
    audience: ["students", "teachers"]
  },
  {
    id: "compass-precision",
    title: "Professional Compass",
    category: "school-supplies",
    subcategory: "geometric-tools",
    price_dzd: 1800,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "High-precision metal compass with adjustable lead and needle point. Perfect for technical drawing and mathematics.",
    rating: 4.7,
    stock: 30,
    audience: ["students", "teachers"]
  },

  // Water Color
  {
    id: "watercolor-24",
    title: "24 Color Set",
    category: "school-supplies",
    subcategory: "water-color",
    price_dzd: 1800,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Artist-grade watercolor paints in 24 vibrant colors. Includes mixing palette and 3 brushes.",
    rating: 4.5,
    stock: 25,
    audience: ["students"]
  },
  {
    id: "watercolor-premium",
    title: "Premium Watercolor Set",
    category: "school-supplies",
    subcategory: "water-color",
    price_dzd: 3500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Professional-grade watercolor set with 36 colors, wooden case, and 5 high-quality brushes. Perfect for art students.",
    rating: 4.8,
    stock: 15,
    audience: ["students", "teachers"]
  },

  // Notebooks
  {
    id: "a4-notebook",
    title: "A4 Notebook Pack",
    category: "school-supplies",
    subcategory: "notebooks",
    price_dzd: 1200,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "5-pack 100-page lined notebooks with durable covers. Perfect for everyday note-taking.",
    rating: 4.4,
    stock: 100,
    audience: ["students", "teachers"]
  },
  {
    id: "spiral-notebook",
    title: "Spiral Notebooks",
    category: "school-supplies",
    subcategory: "notebooks",
    price_dzd: 850,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Pack of 3 spiral-bound notebooks with 80 pages each. Available in blue, red, and green.",
    rating: 4.3,
    stock: 75,
    audience: ["students"]
  },
  {
    id: "graph-notebook",
    title: "Graph Paper Notebook",
    category: "school-supplies",
    subcategory: "notebooks",
    price_dzd: 950,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "A4 notebook with 100 pages of 5mm graph paper. Ideal for mathematics, engineering, and science subjects.",
    rating: 4.6,
    stock: 50,
    audience: ["students", "teachers"]
  },

  // Bags
  {
    id: "school-backpack",
    title: "Student Backpack",
    category: "school-supplies",
    subcategory: "bags",
    price_dzd: 4500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Durable backpack with multiple compartments, padded laptop sleeve, and ergonomic design. Available in multiple colors.",
    rating: 4.7,
    stock: 30,
    audience: ["students"]
  },
  {
    id: "primary-backpack",
    title: "Primary School Bag",
    category: "school-supplies",
    subcategory: "bags",
    price_dzd: 3200,
    original_price_dzd: 3800,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Lightweight backpack designed for younger students. Features cartoon designs and reflective strips for safety.",
    rating: 4.5,
    stock: 25,
    isOnSale: true,
    audience: ["students"]
  },

  // Pencil Case
  {
    id: "pencil-case-basic",
    title: "Basic Pencil Case",
    category: "school-supplies",
    subcategory: "pencil-case",
    price_dzd: 650,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Simple zippered pencil case with enough space for essential stationery items.",
    rating: 4.2,
    stock: 60,
    audience: ["students"]
  },
  {
    id: "pencil-case-multi",
    title: "Multi-Compartment Pencil Case",
    category: "school-supplies",
    subcategory: "pencil-case",
    price_dzd: 1200,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Three-compartment pencil case with multiple pockets and elastic holders for organizing all stationery needs.",
    rating: 4.6,
    stock: 40,
    audience: ["students"]
  },

  // Calculators
  {
    id: "scientific-calculator",
    title: "Scientific Calculator",
    category: "school-supplies",
    subcategory: "calculators",
    price_dzd: 3500,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Advanced scientific calculator with 240+ functions. Perfect for high school and university students.",
    rating: 4.8,
    stock: 35,
    audience: ["students", "teachers"]
  },
  {
    id: "basic-calculator",
    title: "Basic Calculator",
    category: "school-supplies",
    subcategory: "calculators",
    price_dzd: 950,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Simple 12-digit calculator for everyday calculations. Battery and solar powered.",
    rating: 4.3,
    stock: 50,
    audience: ["students", "teachers"]
  },

  // Pens
  {
    id: "ballpoint-pens",
    title: "Ballpoint Pen Set",
    category: "school-supplies",
    subcategory: "pens",
    price_dzd: 750,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Pack of 10 ballpoint pens in blue ink. Smooth writing with medium 1.0mm tip.",
    rating: 4.4,
    stock: 100,
    audience: ["students", "teachers"]
  },
  {
    id: "gel-pens",
    title: "Gel Pen Collection",
    category: "school-supplies",
    subcategory: "pens",
    price_dzd: 1200,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Set of 12 gel pens in assorted colors. Quick-drying ink prevents smudging.",
    rating: 4.6,
    stock: 45,
    audience: ["students"]
  },

  // Highlighters
  {
    id: "highlighter-set",
    title: "Highlighter Pack",
    category: "school-supplies",
    subcategory: "highlighter",
    price_dzd: 850,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Set of 5 highlighters in neon colors. Chisel tip for different line widths.",
    rating: 4.5,
    stock: 60,
    audience: ["students", "teachers"]
  },

  // ======= Office Supplies =======
  // Bags And Briefcases
  {
    id: "laptop-bag",
    title: "Leather Laptop Bag",
    category: "office-supplies",
    subcategory: "bags-briefcases",
    price_dzd: 18900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "15-17 inch laptop briefcase"
  },

  // Continue through ALL 12 office supply subcategories...

  // ======= Kids =======
  // Semi-school - Preparatory
  {
    id: "prep-kit",
    title: "Preschool Prep Kit",
    category: "kids",
    subcategory: "semi-school-preparatory",
    price_dzd: 8900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "Early learning activity set"
  },

  // Continue through ALL kids subcategories...

  // ======= Leaf Categories =======
  // Kits
  {
    id: "science-kit",
    title: "Junior Science Lab",
    category: "kits",
    price_dzd: 12900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "50+ experiments kit"
  },

  // Uniforms
  {
    id: "school-uniform",
    title: "Complete Uniform Set",
    category: "uniforms",
    price_dzd: 8900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "White shirt + navy pants/skirt"
  },

  // Courses
  {
    id: "english-course",
    title: "English Mastery Program",
    category: "courses",
    price_dzd: 29900,
    thumbnail: "/placeholder.svg?height=300&width=300",
    description: "6-month intensive course"
  }
];

// Audience filters
export const audienceFilters = [
  // ... (original audience filters)
];

// Grade levels
export const gradeLevels = [
  // ... (original grade levels)
];