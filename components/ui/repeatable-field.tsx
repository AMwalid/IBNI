"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RepeatableFieldProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, remove: () => void) => React.ReactNode
  defaultValue: T
  addButtonText?: string
  emptyMessage?: string
  maxItems?: number
  className?: string
}

export function RepeatableField<T>({
  items,
  onChange,
  renderItem,
  defaultValue,
  addButtonText = "Add Item",
  emptyMessage = "No items added yet",
  maxItems = 10,
  className,
}: RepeatableFieldProps<T>) {
  const handleAdd = () => {
    if (items.length < maxItems) {
      onChange([...items, { ...defaultValue }])
    }
  }

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6 pb-4">
                {renderItem(item, index, () => handleRemove(index))}
              </CardContent>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Card>
          ))}
        </div>
      )}
      
      {items.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      )}
      
      {items.length >= maxItems && (
        <p className="text-xs text-muted-foreground text-center">
          Maximum of {maxItems} items allowed
        </p>
      )}
    </div>
  )
}
