"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ElementInfo {
  element: HTMLElement
  zIndex: string
  position: string
  selector: string
  rect: DOMRect
}

export default function ZIndexDebugger() {
  const [elements, setElements] = useState<ElementInfo[]>([])
  const [selector, setSelector] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const analyzeElement = (element: HTMLElement): ElementInfo => {
    const computedStyle = window.getComputedStyle(element)
    return {
      element,
      zIndex: computedStyle.zIndex,
      position: computedStyle.position,
      selector: generateSelector(element),
      rect: element.getBoundingClientRect(),
    }
  }

  const generateSelector = (element: HTMLElement): string => {
    let selector = element.tagName.toLowerCase()
    if (element.id) {
      selector += `#${element.id}`
    }
    if (element.className && typeof element.className === "string") {
      selector += `.${element.className.split(" ").join(".")}`
    }
    return selector
  }

  const findElementsWithZIndex = () => {
    try {
      setError(null)
      const allElements = document.querySelectorAll("*")
      const zIndexElements: ElementInfo[] = []

      allElements.forEach((el) => {
        const element = el as HTMLElement
        const computedStyle = window.getComputedStyle(element)
        
        if (computedStyle.zIndex !== "auto" && computedStyle.position !== "static") {
          zIndexElements.push(analyzeElement(element))
        }
      })

      // Sort by z-index (highest first)
      zIndexElements.sort((a, b) => {
        const aZIndex = parseInt(a.zIndex) || 0
        const bZIndex = parseInt(b.zIndex) || 0
        return bZIndex - aZIndex
      })

      setElements(zIndexElements)
    } catch (err) {
      setError(`Error analyzing elements: ${err}`)
    }
  }

  const findElementsBySelector = () => {
    try {
      setError(null)
      if (!selector) {
        setError("Please enter a selector")
        return
      }

      const matchedElements = document.querySelectorAll(selector)
      if (matchedElements.length === 0) {
        setError("No elements found matching this selector")
        return
      }

      const elementInfos: ElementInfo[] = []
      matchedElements.forEach((el) => {
        elementInfos.push(analyzeElement(el as HTMLElement))
      })

      setElements(elementInfos)
    } catch (err) {
      setError(`Error with selector: ${err}`)
    }
  }

  const highlightElement = (info: ElementInfo) => {
    // Remove any existing highlights
    const existingHighlights = document.querySelectorAll(".z-index-highlight")
    existingHighlights.forEach((el) => el.remove())

    // Create highlight element
    const highlight = document.createElement("div")
    highlight.className = "z-index-highlight"
    highlight.style.position = "absolute"
    highlight.style.border = "2px solid red"
    highlight.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
    highlight.style.zIndex = "999999"
    highlight.style.pointerEvents = "none"
    
    // Position the highlight
    highlight.style.top = `${info.rect.top + window.scrollY}px`
    highlight.style.left = `${info.rect.left + window.scrollX}px`
    highlight.style.width = `${info.rect.width}px`
    highlight.style.height = `${info.rect.height}px`
    
    document.body.appendChild(highlight)
    
    // Remove after 3 seconds
    setTimeout(() => {
      highlight.remove()
    }, 3000)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Z-Index Debugger</CardTitle>
          <CardDescription>Find elements with z-index that might be causing button issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Button onClick={findElementsWithZIndex} className="mb-4">
                Find All Elements with Z-Index
              </Button>
            </div>

            <div className="flex gap-2 items-end">
              <div className="flex-grow">
                <Label htmlFor="selector">CSS Selector</Label>
                <Input
                  id="selector"
                  value={selector}
                  onChange={(e) => setSelector(e.target.value)}
                  placeholder="e.g. .dropdown-menu, #navbar"
                />
              </div>
              <Button onClick={findElementsBySelector}>Find Elements</Button>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="mt-4">
              <h3 className="font-medium mb-2">Results ({elements.length} elements)</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Element
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Z-Index
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {elements.map((info, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[200px]">
                          {info.selector}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">{info.zIndex}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{info.position}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          <Button variant="outline" size="sm" onClick={() => highlightElement(info)}>
                            Highlight
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
