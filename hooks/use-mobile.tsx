import * as React from "react"
import { useMediaQuery } from "./use-media-query"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Use the more generic useMediaQuery hook
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  return isMobile
}

