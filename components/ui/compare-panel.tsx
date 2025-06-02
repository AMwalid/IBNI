"use client"

import type React from "react"
import { X, School, GraduationCap, Star, MapPin, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SchoolType } from "@/components/ui/school-card"
import type { TeacherType } from "@/components/ui/teacher-card"
import { Badge } from "@/components/ui/badge"

interface ComparePanelProps {
  type: "schools" | "teachers"
  items: (SchoolType | TeacherType)[]
  onRemove: (id: string) => void
  onClear: () => void
  onViewProfile: (id: string) => void
}

export const ComparePanel: React.FC<ComparePanelProps> = ({ type, items, onRemove, onClear, onViewProfile }) => {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 transition-transform duration-300">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {type === "schools" ? (
              <School className="h-5 w-5 text-green-600" />
            ) : (
              <GraduationCap className="h-5 w-5 text-green-600" />
            )}
            Comparing {items.length} {type === "schools" ? "Schools" : "Teachers"}
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear All
            </Button>
            {items.length >= 2 && <Button size="sm">View Full Comparison</Button>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative border rounded-lg p-4 bg-green-50">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => onRemove(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{item.locationDisplayText}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({item.reviewCount})</span>
                </div>

                {type === "schools" ? (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{(item as SchoolType).studentCount} students</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{(item as TeacherType).school}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {type === "schools"
                  ? (item as SchoolType).specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {specialty}
                      </Badge>
                    ))
                  : (item as TeacherType).subjects.slice(0, 2).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {subject}
                      </Badge>
                    ))}
                {(type === "schools"
                  ? (item as SchoolType).specialties.length > 2
                  : (item as TeacherType).subjects.length > 2) && <span className="text-xs text-green-600">+more</span>}
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={() => onViewProfile(item.id)}>
                View Profile
              </Button>
            </div>
          ))}

          {items.length < 4 && (
            <div className="border rounded-lg p-4 flex items-center justify-center h-full border-dashed">
              <div className="text-center text-gray-500">
                <p className="text-sm font-medium mb-1">Add {type === "schools" ? "a school" : "a teacher"}</p>
                <p className="text-xs">You can compare up to 4 {type === "schools" ? "schools" : "teachers"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
