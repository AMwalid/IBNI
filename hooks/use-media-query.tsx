import * as React from "react"

export function useMediaQuery(query: string): boolean {
  // Initialize with false for SSR to avoid hydration mismatch
  const [matches, setMatches] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true);
    
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const mql = window.matchMedia(query);
    
    const onChange = () => {
      setMatches(mql.matches);
    };
    
    // Set initial value
    setMatches(mql.matches);
    
    // Add listener with proper cleanup
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]); // query is correctly listed as a dependency

  // Return false during SSR to avoid hydration mismatch
  return mounted ? matches : false
}

