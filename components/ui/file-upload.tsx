"use client"

import * as React from "react"
import { UploadCloud, X, FileText, Image as ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: File | null
  onChange: (file: File | null) => void
  previewUrl?: string
  onPreviewUrlChange?: (url: string) => void
  accept?: string
  maxSize?: number // in bytes
  className?: string
  previewClassName?: string
  buttonText?: string
  dropzoneText?: string
}

export function FileUpload({
  value,
  onChange,
  previewUrl,
  onPreviewUrlChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  previewClassName,
  buttonText = "Select File",
  dropzoneText = "or drag and drop",
  ...props
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [localPreviewUrl, setLocalPreviewUrl] = React.useState<string | null>(previewUrl || null)

  // Update local preview URL when prop changes
  React.useEffect(() => {
    if (previewUrl !== undefined) {
      setLocalPreviewUrl(previewUrl)
    }
  }, [previewUrl])

  // Generate preview URL when file changes
  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value)
      setLocalPreviewUrl(url)
      if (onPreviewUrlChange) {
        onPreviewUrlChange(url)
      }
      return () => URL.revokeObjectURL(url)
    }
  }, [value, onPreviewUrlChange])

  const handleChange = (file: File | null) => {
    setError(null)
    
    if (!file) {
      onChange(null)
      setLocalPreviewUrl(null)
      return
    }
    
    // Validate file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`)
      return
    }
    
    // Validate file type
    if (accept && !accept.split(",").some(type => {
      if (type.trim() === "*") return true
      if (type.trim().endsWith("/*")) {
        const mainType = type.trim().replace("/*", "")
        return file.type.startsWith(mainType)
      }
      return file.type === type.trim()
    })) {
      setError(`File type not accepted. Please upload ${accept}`)
      return
    }
    
    onChange(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files[0])
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files[0])
    }
  }

  const handleRemove = () => {
    handleChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const isImage = value?.type.startsWith("image/") || (localPreviewUrl && !value?.type.startsWith("video/"))

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50",
          error && "border-red-500 bg-red-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept={accept}
          {...props}
        />
        
        {localPreviewUrl && isImage ? (
          <div className="relative">
            <img
              src={localPreviewUrl}
              alt="Preview"
              className={cn("mx-auto max-h-48 rounded-md object-contain", previewClassName)}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ) : localPreviewUrl && !isImage ? (
          <div className="relative flex items-center justify-center">
            <div className="flex items-center p-2 bg-white rounded-md shadow-sm">
              <FileText className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-sm font-medium">{value?.name || "File"}</span>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="rounded-full bg-gray-100 p-3">
              {accept.includes("image") ? (
                <ImageIcon className="h-6 w-6 text-gray-500" />
              ) : (
                <UploadCloud className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <div className="space-y-1">
              <Button type="button" variant="outline" onClick={handleButtonClick}>
                {buttonText}
              </Button>
              <p className="text-xs text-gray-500">{dropzoneText}</p>
              <p className="text-xs text-gray-500">
                {accept === "image/*" 
                  ? "PNG, JPG or GIF" 
                  : accept.split(",").map(t => t.replace(".", "").toUpperCase()).join(", ")}
                {maxSize && ` up to ${maxSize / (1024 * 1024)}MB`}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
