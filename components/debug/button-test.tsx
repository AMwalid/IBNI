"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus, Heart, ArrowRight, Trash2 } from "lucide-react"
import { debugClick, checkElementOverlap } from "@/lib/debug-utils"

export default function ButtonTest() {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({
    button1: 0,
    button2: 0,
    button3: 0,
    button4: 0,
    button5: 0,
    button6: 0,
    button7: 0,
  })

  const [overlapStatus, setOverlapStatus] = useState<Record<string, boolean>>({})
  const buttonRefs = {
    button1: useRef<HTMLButtonElement>(null),
    button2: useRef<HTMLButtonElement>(null),
    button3: useRef<HTMLButtonElement>(null),
    button4: useRef<HTMLButtonElement>(null),
    button5: useRef<HTMLButtonElement>(null),
    button6: useRef<HTMLButtonElement>(null),
    button7: useRef<HTMLButtonElement>(null),
  }

  // Check for overlapping elements that might block button clicks
  useEffect(() => {
    const checkOverlaps = () => {
      const newOverlapStatus: Record<string, boolean> = {}

      Object.entries(buttonRefs).forEach(([buttonId, ref]) => {
        if (ref.current) {
          const { isOverlapped } = checkElementOverlap(ref.current)
          newOverlapStatus[buttonId] = isOverlapped
        }
      })

      setOverlapStatus(newOverlapStatus)
    }

    // Check initially and on window resize
    checkOverlaps()
    window.addEventListener('resize', checkOverlaps)

    return () => {
      window.removeEventListener('resize', checkOverlaps)
    }
  }, [])

  const handleClick = (buttonId: string) => {
    console.log(`Button ${buttonId} clicked`)
    setClickCounts((prev) => ({
      ...prev,
      [buttonId]: prev[buttonId] + 1,
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Button Test Page</h1>
      <p className="mb-4">
        This page tests various button configurations to identify any issues with button functionality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Button Test */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Buttons</CardTitle>
            <CardDescription>Testing basic button functionality with different variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button
                ref={buttonRefs.button1}
                onClick={debugClick(() => handleClick("button1"), "Default Button")}
                className="mb-2 w-full"
              >
                Default Button
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button1} times</div>
                {overlapStatus.button1 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>

            <div>
              <Button
                ref={buttonRefs.button2}
                onClick={debugClick(() => handleClick("button2"), "Outline Button")}
                variant="outline"
                className="mb-2 w-full"
              >
                Outline Button
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button2} times</div>
                {overlapStatus.button2 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>

            <div>
              <Button
                ref={buttonRefs.button3}
                onClick={debugClick(() => handleClick("button3"), "Ghost Button")}
                variant="ghost"
                className="mb-2 w-full"
              >
                Ghost Button
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button3} times</div>
                {overlapStatus.button3 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons with Icons Test */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons with Icons</CardTitle>
            <CardDescription>Testing buttons with SVG icons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button
                ref={buttonRefs.button4}
                onClick={debugClick(() => handleClick("button4"), "Button with Icon")}
                className="mb-2 w-full"
              >
                <Plus className="mr-2" /> Button with Icon
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button4} times</div>
                {overlapStatus.button4 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>

            <div>
              <Button
                ref={buttonRefs.button5}
                onClick={debugClick(() => handleClick("button5"), "Icon Button Outline")}
                variant="outline"
                className="mb-2 w-full"
              >
                <Heart className="mr-2" /> Icon Button Outline
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button5} times</div>
                {overlapStatus.button5 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>

            <div>
              <Button
                ref={buttonRefs.button6}
                onClick={debugClick(() => handleClick("button6"), "Icon Button Ghost")}
                variant="ghost"
                className="mb-2 w-full"
              >
                <ArrowRight className="mr-2" /> Icon Button Ghost
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button6} times</div>
                {overlapStatus.button6 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nested Content Button Test */}
        <Card>
          <CardHeader>
            <CardTitle>Complex Button Content</CardTitle>
            <CardDescription>Testing buttons with complex nested content</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Button
                ref={buttonRefs.button7}
                onClick={debugClick(() => handleClick("button7"), "Complex Button")}
                className="mb-2 w-full flex items-center justify-between"
              >
                <span>Button with Complex Content</span>
                <div className="flex items-center">
                  <Check className="mr-1" />
                  <span>Status</span>
                </div>
              </Button>
              <div className="flex justify-between">
                <div>Clicked: {clickCounts.button7} times</div>
                {overlapStatus.button7 && (
                  <div className="text-red-500">⚠️ Button may be overlapped</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Propagation Test */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Propagation Test</CardTitle>
            <CardDescription>Testing if event propagation is being stopped</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="p-4 border rounded-md bg-gray-50"
              onClick={() => console.log("Outer container clicked")}
            >
              <div
                className="p-4 border rounded-md bg-white mb-4"
                onClick={(event) => {
                  console.log("Middle container clicked")
                  // Uncomment to test stopPropagation
                  // event.stopPropagation()
                }}
              >
                <Button
                  onClick={() => {
                    console.log("Button inside containers clicked")
                    handleClick("button7")
                  }}
                  className="w-full"
                >
                  Test Event Bubbling
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Check the console to see if events are propagating correctly.
                When you click the button, you should see logs for the button, middle container, and outer container.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debug Information */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Browser:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'}</p>
              <p><strong>Viewport Size:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown'}</p>
              <p><strong>Button CSS Classes:</strong> Check the button component for any CSS that might affect clickability</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Check for <code>pointer-events: none</code> on buttons or parent elements</li>
                <li>Check for z-index issues with overlapping elements</li>
                <li>Check for event handlers that call <code>stopPropagation()</code> or <code>preventDefault()</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
