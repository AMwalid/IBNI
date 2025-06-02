"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface CategoriesDropdownProps {
  handleNavigate: (path: string) => void
}

export default function CategoriesDropdown({ handleNavigate }: CategoriesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-600 hover:text-green-700">
        Categories <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[100]">
        {/* Office Furniture */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Office Furniture</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-furniture/desks")}>
              Desks
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-furniture/chairs")}>
              Chairs
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-furniture/cabinets")}>
              Cabinets
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Books */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Books</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Livres Parascolaire</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>High School Education</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/high-school/first-year")}>
                      First Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/high-school/second-year")}>
                      Second Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/high-school/third-year")}>
                      Third Year
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Middle School Education</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/middle-school/first-year")}>
                      First Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/middle-school/second-year")}>
                      Second Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/middle-school/third-year")}>
                      Third Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/middle-school/fourth-year")}>
                      Fourth Year
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Primary Education</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/primary/first-year")}>
                      First Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/primary/second-year")}>
                      Second Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/primary/third-year")}>
                      Third Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/primary/fourth-year")}>
                      Fourth Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/primary/fifth-year")}>
                      Fifth Year
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/novels")}>
              Novels
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/human-development")}>
              Human Development
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/books/religious")}>
              Religious Books
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Teacher's Supplies */}
        <DropdownMenuItem onClick={() => handleNavigate("/store/category/teachers-supplies")}>
          Teacher's Supplies
        </DropdownMenuItem>

        {/* Gifts and Decoration */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Gifts and Decoration</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Decorations</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleNavigate("/store/category/decorations/birthday")}>
                  Birthday Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/store/category/decorations/home")}>
                  Home Decoration
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Gifts</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleNavigate("/store/category/gifts/mens")}>
                  Mens Gifts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/store/category/gifts/womens")}>
                  Women Gifts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/store/category/gifts/kids")}>
                  Kids Gifts
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* School Supplies */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>School Supplies</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56">
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/geometric-tools")}>
              Geometric Tools
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/water-color")}>
              Water Color
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/notebooks")}>
              Notebooks
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/bags")}>
              Bags
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/glue")}>
              Glue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/eraser")}>
              Eraser
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/calculators")}>
              Calculators
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/pencil-case")}>
              Pencil Case
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/school-apron")}>
              School Apron
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/scissors")}>
              Scissors
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/corrector")}>
              Corrector
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/compass")}>
              Compass
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/pens")}>
              Pens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/ballpoint-pen")}>
              Ballpoint Pen
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/colored-pens")}>
              Colored Pens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/highlighter")}>
              Highlighter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/felt-pens")}>
              Felt Pens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/wax-pens")}>
              Wax Pens
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/playdough")}>
              Playdough
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/educational-board")}>
              Educational Board
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/brush-board")}>
              Brush Board
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/chalk")}>
              Chalk
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/oil-paint")}>
              Oil Paint
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/acrylic-paint")}>
              Acrylic Paint
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/pencil-sharpener")}>
              Pencil Sharpener
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/projects-supplies")}>
              Projects Supplies
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/school-supplies/fine-arts")}>
              Fine Arts
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Office Supplies */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Office Supplies</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/bags-briefcases")}>
              Bags And Briefcases
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/small-supplies")}>
              Small Supplies
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/large-supplies")}>
              Large Supplies
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/stationery")}>
              Stationery
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/staples-staplers")}>
              Staples and Staplers
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/certificate-holder")}>
              Certificate Holder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/certificates-templates")}>
              Certificates Templates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/stamps-ink")}>
              Stamps and Ink
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/filing-archiving")}>
              Filing And Archiving
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/trophies")}>
              Trophies
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/calculators")}>
              Calculators
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/office-supplies/administration-register")}>
              Administration Register
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Kids */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Kids</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/semi-school-preparatory")}>
              Semi-school - preparatory
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/swimming-pool")}>
              Swimming pool
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/educational-games")}>
              Educational games
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/girls-games")}>
              Girls games
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/boys-games")}>
              Boys games
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/store/category/kids/dolls")}>
              Dolls
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Courses */}
        <DropdownMenuItem onClick={() => handleNavigate("/store/category/courses")}>
          Courses
        </DropdownMenuItem>

        {/* Uniforms */}
        <DropdownMenuItem onClick={() => handleNavigate("/store/category/uniforms")}>
          Uniforms
        </DropdownMenuItem>

        {/* Kits */}
        <DropdownMenuItem onClick={() => handleNavigate("/store/category/kits")}>
          Kits
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
