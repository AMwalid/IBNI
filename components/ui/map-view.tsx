"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SchoolType } from "@/components/ui/school-card"
import type { TeacherType } from "@/components/ui/teacher-card"

interface MapViewProps {
  data: (SchoolType | TeacherType)[]
  type: "schools" | "teachers"
  onSelectItem: (id: string) => void
}

export const MapView: React.FC<MapViewProps> = ({ data, type, onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // This is a placeholder for actual map implementation
  // In a real app, you would use a library like Google Maps, Mapbox, or Leaflet
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleItemClick = (id: string) => {
    setSelectedItem(id)
  }

  const handleViewProfile = (id: string) => {
    onSelectItem(id)
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border shadow-sm">
      {/* Map Container */}
      <div className="absolute inset-0 bg-green-50">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-green-50 relative">
            {/* This is a placeholder for the actual map */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover opacity-20"></div>

            {/* Map Markers */}
            {data.map((item, index) => {
              // Generate pseudo-random positions for demo purposes
              const left = `${20 + ((index * 123) % 60)}%`
              const top = `${15 + ((index * 87) % 70)}%`
              
              // Determine if the marker is in the top third of the map
              const isNearTop = parseFloat(top) < 33

              return (
                <div
                  key={item.id}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    selectedItem === item.id ? "z-10 scale-125" : "z-0 hover:scale-110"
                  }`}
                  style={{ left, top }}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`p-2 rounded-full ${
                        selectedItem === item.id ? "bg-green-600 text-white" : "bg-white text-green-600"
                      } shadow-md`}
                    >
                      <MapPin className="h-5 w-5" />
                    </div>
                    {selectedItem === item.id && (
                      <div 
                        className="mt-2 bg-white p-3 rounded-lg shadow-lg w-48 animate-in fade-in slide-in-from-bottom-2 duration-200"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          ...(isNearTop ? {
                            top: '100%',
                            marginTop: '8px'
                          } : {
                            bottom: '100%',
                            marginBottom: '8px'
                          })
                        }}
                      >
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{item.locationDisplayText}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-medium">{item.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({item.reviewCount})</span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-2 text-xs h-7"
                          onClick={() => handleViewProfile(item.id)}
                        >
                          View Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="text-lg font-medium">+</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="text-lg font-medium">−</span>
        </Button>
      </div>
    </div>
  )
}
