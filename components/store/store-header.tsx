import { Search, ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type StoreHeaderProps = {
  title: string
  cartItemCount: number
  onCartClick: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onFiltersClick: () => void
}

export function StoreHeader({
  title,
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  onFiltersClick,
}: StoreHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 className="text-2xl font-bold mb-4 md:mb-0 text-green-600">{title}</h1>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <Button variant="outline" size="icon" onClick={onFiltersClick}>
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="relative" onClick={onCartClick}>
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
