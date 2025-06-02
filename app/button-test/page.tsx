"use client"

import { useState } from "react"
import ButtonTest from "@/components/debug/button-test"
import ZIndexDebugger from "@/components/debug/z-index-debugger"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ButtonTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Button Functionality Test Page</h1>
      <p className="mb-8 text-gray-600">
        This page helps diagnose issues with button functionality in the application.
        Use the tabs below to test different aspects of button behavior.
      </p>

      <Tabs defaultValue="button-test">
        <TabsList className="mb-4">
          <TabsTrigger value="button-test">Button Test</TabsTrigger>
          <TabsTrigger value="z-index">Z-Index Debugger</TabsTrigger>
        </TabsList>

        <TabsContent value="button-test">
          <ButtonTest />
        </TabsContent>

        <TabsContent value="z-index">
          <ZIndexDebugger />
        </TabsContent>
      </Tabs>
    </div>
  )
}
