"use client"

import * as React from "react"
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Image } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ className, value, onChange, ...props }: RichTextEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleCommand = (command: string, value?: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let newText = ""

    switch (command) {
      case "bold":
        newText = `**${selectedText}**`
        break
      case "italic":
        newText = `*${selectedText}*`
        break
      case "unordered-list":
        newText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n")
        break
      case "ordered-list":
        newText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      case "align-left":
        newText = selectedText
        break
      case "align-center":
        newText = selectedText
          .split("\n")
          .map((line) => `:center:${line}:center:`)
          .join("\n")
        break
      case "align-right":
        newText = selectedText
          .split("\n")
          .map((line) => `:right:${line}:right:`)
          .join("\n")
        break
      case "link":
        const url = value || prompt("Enter URL:")
        if (url) {
          newText = `[${selectedText || "Link text"}](${url})`
        } else {
          return
        }
        break
      case "image":
        const imageUrl = value || prompt("Enter image URL:")
        if (imageUrl) {
          newText = `![${selectedText || "Image alt text"}](${imageUrl})`
        } else {
          return
        }
        break
      default:
        return
    }

    const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    onChange(newValue)

    // Set selection to after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + newText.length, start + newText.length)
    }, 0)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-md border">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("bold")}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("italic")}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("unordered-list")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("ordered-list")}
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("link")}
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={() => handleCommand("image")}
        >
          <Image className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] font-mono text-sm"
        {...props}
      />
    </div>
  )
}
