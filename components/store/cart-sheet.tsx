import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CartItem } from "@/types"

type CartSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  cartItems: CartItem[]
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

export function CartSheet({
  isOpen,
  onOpenChange,
  cartItems,
  removeFromCart,
  updateQuantity,
}: CartSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl">Your Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-start py-4 border-b">
                  <img
                    src={item.product.image || "/placeholder.svg?height=300&width=300"}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (total, item) => total + item.product.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <Button className="w-full mt-4">Checkout</Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
