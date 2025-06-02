import { Button } from "@/components/ui/button";
import { debugClick } from "./debug-utils";

/**
 * Creates a standardized button with debugging capabilities
 * @param props Button props including onClick handler
 * @returns A Button component with standardized behavior
 */
export function createStandardButton(props: {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  id?: string;
}) {
  const { onClick, children, id, ...rest } = props;
  
  // In development, wrap onClick with debugClick
  const handleClick = process.env.NODE_ENV === 'development' 
    ? debugClick(onClick, id || 'Button') 
    : onClick;
  
  return (
    <Button
      id={id}
      onClick={handleClick}
      data-testid={id ? `button-${id}` : undefined}
      {...rest}
    >
      {children}
    </Button>
  );
}