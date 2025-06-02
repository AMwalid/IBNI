"use client"

import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChildInfo } from "../backpack-builder-page"

interface ChildInfoStepProps {
  childInfo: ChildInfo
  updateChildInfo: (info: ChildInfo) => void
  onNext: () => void
}

export default function ChildInfoStep({ childInfo, updateChildInfo, onNext }: ChildInfoStepProps) {
  const [name, setName] = useState(childInfo.name || "")
  const [gender, setGender] = useState<"boy" | "girl">(childInfo.gender as "boy" | "girl" || "boy")
  const [schoolType, setSchoolType] = useState(childInfo.grade.split('-')[0] || "")
  const [grade, setGrade] = useState(childInfo.grade.split('-')[1] || "")
  
  // Grade options based on school type
  const gradeOptions = {
    primary: [
      { value: "first-year", label: "First Year" },
      { value: "second-year", label: "Second Year" },
      { value: "third-year", label: "Third Year" },
      { value: "fourth-year", label: "Fourth Year" },
      { value: "fifth-year", label: "Fifth Year" },
    ],
    middle: [
      { value: "first-year", label: "First Year" },
      { value: "second-year", label: "Second Year" },
      { value: "third-year", label: "Third Year" },
      { value: "fourth-year", label: "Fourth Year" },
    ],
    high: [
      { value: "first-year", label: "First Year" },
      { value: "second-year", label: "Second Year" },
      { value: "third-year", label: "Third Year" },
    ],
  }
  
  const handleNext = () => {
    if (name && gender && schoolType && grade) {
      updateChildInfo({
        name,
        gender,
        grade: `${schoolType}-${grade}`,
      })
      onNext()
    }
  }

  const isFormValid = name.trim() !== "" && gender && schoolType && grade

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-green-800">Child Information</h2>
      
        <div className="space-y-6">
        {/* Name input */}
          <div className="space-y-2">
          <Label htmlFor="name" className="text-green-800">Child's Name</Label>
            <Input
            id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            placeholder="Enter child's name"
            className="border-green-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        
        {/* Gender selection */}
        <div className="space-y-2">
          <Label className="text-green-800">Gender</Label>
          <RadioGroup value={gender} onValueChange={(value) => setGender(value as "boy" | "girl")} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="boy" className="border-green-300 text-green-600" />
              <Label htmlFor="boy" className="text-green-800">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="girl" className="border-green-300 text-green-600" />
              <Label htmlFor="girl" className="text-green-800">Girl</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* School type selection */}
        <div className="space-y-2">
          <Label className="text-green-800">School Type</Label>
          <RadioGroup value={schoolType} onValueChange={setSchoolType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="primary" id="primary" className="border-green-300 text-green-600" />
              <Label htmlFor="primary" className="text-green-800">Primary School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="middle" id="middle" className="border-green-300 text-green-600" />
              <Label htmlFor="middle" className="text-green-800">Middle School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" className="border-green-300 text-green-600" />
              <Label htmlFor="high" className="text-green-800">High School</Label>
            </div>
          </RadioGroup>
          </div>

        {/* Grade selection */}
        {schoolType && (
          <div className="space-y-2">
            <Label htmlFor="grade" className="text-green-800">Grade</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade" className="border-green-200 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions[schoolType as keyof typeof gradeOptions].map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="focus:bg-green-50 focus:text-green-800"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
          </div>

      {/* Navigation button */}
      <div className="mt-8 flex justify-end">
            <Button
          onClick={handleNext} 
          className="bg-green-600 hover:bg-green-700 text-white flex items-center"
          disabled={!isFormValid}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
    </div>
  )
}
