/**
 * Wraps event handlers to detect stopPropagation usage
 * @param handler The original event handler
 * @returns A wrapped handler that logs stopPropagation calls
 */
export function monitorEventPropagation<E extends React.SyntheticEvent>(
  handler?: (e: E) => void,
  componentName: string = "Unknown"
) {
  return (e: E) => {
    // Store the original stopPropagation
    const originalStopPropagation = e.stopPropagation;
    
    // Override stopPropagation to log usage
    e.stopPropagation = function() {
      console.warn(
        `[WARNING] stopPropagation called in ${componentName}. ` +
        `This may prevent click events from reaching parent elements.`,
        new Error().stack
      );
      return originalStopPropagation.apply(this);
    };
    
    // Call the original handler
    if (handler) {
      handler(e);
    }
    
    // Restore original method
    e.stopPropagation = originalStopPropagation;
  };
}