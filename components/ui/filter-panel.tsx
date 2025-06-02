"use client"

import React from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface FilterPanelProps {
  type: "schools" | "teachers"
  onSearch: (query: string) => void
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
  activeFilters: string[]
  isExpanded: boolean
  onToggleExpand: () => void
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  type,
  onSearch,
  onFilterChange,
  onClearFilters,
  activeFilters,
  isExpanded,
  onToggleExpand,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder={`Search ${type === "schools" ? "schools" : "teachers"}...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="font-medium">Filters</h3>
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters.length}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleExpand} className="text-green-600">
            {isExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1">
                {filter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => {
                    // Remove this filter
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="text-green-600 h-6" onClick={onClearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {/* Location Filter */}
            <div>
              <Label htmlFor="location" className="mb-1 block">
                Location
              </Label>
              <Select>
                <SelectTrigger id="location" className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="algiers">Algiers</SelectItem>
                  <SelectItem value="oran">Oran</SelectItem>
                  <SelectItem value="constantine">Constantine</SelectItem>
                  <SelectItem value="tlemcen">Tlemcen</SelectItem>
                  <SelectItem value="annaba">Annaba</SelectItem>
                  <SelectItem value="setif">Sétif</SelectItem>
                  <SelectItem value="batna">Batna</SelectItem>
                  <SelectItem value="blida">Blida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div>
              <Label className="mb-1 block">Rating</Label>
              <div className="pl-2 pr-2">
                <Slider defaultValue={[0]} max={5} step={0.5} className="mt-6" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Any</span>
                  <span>5.0</span>
                </div>
              </div>
            </div>

            {/* Type-specific filters */}
            {type === "schools" ? (
              <div>
                <Label htmlFor="school-type" className="mb-1 block">
                  School Type
                </Label>
                <Select>
                  <SelectTrigger id="school-type" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="charter">Charter</SelectItem>
                    <SelectItem value="magnet">Magnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <Label htmlFor="subject" className="mb-1 block">
                  Subject
                </Label>
                <Select>
                  <SelectTrigger id="subject" className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Advanced Filters Accordion */}
            <div className="md:col-span-2 lg:col-span-3">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced-filters">
                  <AccordionTrigger className="text-sm font-medium">Advanced Filters</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                      {type === "schools" ? (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Facilities</Label>
                            <div className="space-y-2">
                              {["Library", "Science Lab", "Computer Lab", "Sports Field", "Auditorium"].map(
                                (facility) => (
                                  <div key={facility} className="flex items-center space-x-2">
                                    <Checkbox id={`facility-${facility}`} />
                                    <Label htmlFor={`facility-${facility}`} className="text-sm font-normal">
                                      {facility}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Programs</Label>
                            <div className="space-y-2">
                              {["Special Education", "Gifted Program", "ESL", "Arts Focus", "STEM Focus"].map(
                                (program) => (
                                  <div key={program} className="flex items-center space-x-2">
                                    <Checkbox id={`program-${program}`} />
                                    <Label htmlFor={`program-${program}`} className="text-sm font-normal">
                                      {program}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Certifications</Label>
                            <div className="space-y-2">
                              {["State Certified", "National Board", "Special Education", "ESL", "Advanced Degree"].map(
                                (cert) => (
                                  <div key={cert} className="flex items-center space-x-2">
                                    <Checkbox id={`cert-${cert}`} />
                                    <Label htmlFor={`cert-${cert}`} className="text-sm font-normal">
                                      {cert}
                                    </Label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Experience Level</Label>
                            <div className="space-y-2">
                              {["0-2 years", "3-5 years", "6-10 years", "11-20 years", "20+ years"].map((exp) => (
                                <div key={exp} className="flex items-center space-x-2">
                                  <Checkbox id={`exp-${exp}`} />
                                  <Label htmlFor={`exp-${exp}`} className="text-sm font-normal">
                                    {exp}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Availability</Label>
                        <div className="space-y-2">
                          {[
                            "Accepting New Students",
                            "Online Sessions",
                            "In-Person",
                            "Weekend Availability",
                            "Evening Availability",
                          ].map((avail) => (
                            <div key={avail} className="flex items-center space-x-2">
                              <Checkbox id={`avail-${avail}`} />
                              <Label htmlFor={`avail-${avail}`} className="text-sm font-normal">
                                {avail}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
