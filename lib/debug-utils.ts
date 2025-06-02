/**
 * Utility function to debug click events
 * This can be used to wrap onClick handlers to see if they're being called
 */
export function debugClick(handler?: (e: React.MouseEvent) => void, label = "Button") {
  return (e: React.MouseEvent) => {
    console.log(`[DEBUG] ${label} clicked`, e)
    
    // Call the original handler if provided
    if (handler) {
      handler(e)
    }
  }
}

/**
 * Utility function to debug event propagation
 * This can be used to see if events are being stopped from propagating
 */
export function debugEventPropagation(element: HTMLElement) {
  const originalAddEventListener = element.addEventListener
  
  element.addEventListener = function(type, listener, options) {
    const wrappedListener = function(e: Event) {
      console.log(`[DEBUG] Event '${type}' on`, element, e)
      // @ts-ignore
      return listener.apply(this, arguments)
    }
    
    // @ts-ignore
    return originalAddEventListener.call(this, type, wrappedListener, options)
  }
}

/**
 * Utility function to check if an element is being overlapped
 * This can help identify z-index issues
 */
export function checkElementOverlap(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // Get the element at the center point of our target element
  const elementAtPoint = document.elementFromPoint(centerX, centerY)
  
  if (elementAtPoint !== element && !element.contains(elementAtPoint)) {
    console.warn('[DEBUG] Element is being overlapped by:', elementAtPoint)
    return {
      isOverlapped: true,
      overlappingElement: elementAtPoint
    }
  }
  
  return {
    isOverlapped: false,
    overlappingElement: null
  }
}

/**
 * Highlights elements with z-index values to debug overlap issues
 * @param enabled Whether to enable the highlighting
 */
export function highlightZIndexElements(enabled: boolean = true) {
  if (enabled) {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const element = el as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      
      if (computedStyle.zIndex !== 'auto' && computedStyle.position !== 'static') {
        // Store original outline if needed for restoration
        element.dataset.originalOutline = element.style.outline;
        
        // Add outline based on z-index value (higher z-index = more intense color)
        const zIndex = parseInt(computedStyle.zIndex) || 0;
        const intensity = Math.min(255, Math.max(100, zIndex * 10));
        element.style.outline = `2px solid rgba(255, ${255 - intensity}, 0, 0.7)`;
        
        // Add z-index label
        const label = document.createElement('div');
        label.className = 'z-index-debug-label';
        label.textContent = `z: ${zIndex}`;
        label.style.cssText = 'position: absolute; background: black; color: white; font-size: 10px; padding: 2px 4px; border-radius: 2px; pointer-events: none;';
        element.appendChild(label);
      }
    });
  } else {
    // Remove highlighting
    document.querySelectorAll('[data-original-outline]').forEach(el => {
      const element = el as HTMLElement;
      element.style.outline = element.dataset.originalOutline || '';
      delete element.dataset.originalOutline;
    });
    document.querySelectorAll('.z-index-debug-label').forEach(el => el.remove());
  }
}

