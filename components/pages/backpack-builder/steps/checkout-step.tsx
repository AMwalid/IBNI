"use client"

import React, { useState } from "react"
import { ArrowLeft, ShoppingCart, CreditCard, Truck, Calendar, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BackpackState } from "../backpack-builder-page"

interface CheckoutStepProps {
  backpackState: BackpackState
  onBack: () => void
  clearBackpack: () => void
}

export default function CheckoutStep({ 
  backpackState, 
  onBack,
  clearBackpack
}: CheckoutStepProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryOption, setDeliveryOption] = useState("standard")
  
  // Calculate totals
  const calculateTotal = () => {
    return [
      ...backpackState.uniform,
      ...backpackState.backpack,
      ...backpackState.stationery,
      ...backpackState.books,
      ...backpackState.creative,
      ...backpackState.tech,
    ].reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
  
  const totalCost = calculateTotal()
  const shippingCost = deliveryOption === "express" ? 500 : 200
  const finalTotal = totalCost + shippingCost
  
  // Calculate total items
  const totalItems = [
    ...backpackState.uniform,
    ...backpackState.backpack,
    ...backpackState.stationery,
    ...backpackState.books,
    ...backpackState.creative,
    ...backpackState.tech,
  ].reduce((sum, item) => sum + item.quantity, 0)
  
  // Handle add to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
      setIsComplete(true)
    }, 1500)
  }
  
  // Handle build another backpack
  const handleBuildAnother = () => {
    clearBackpack()
  }
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Checkout</h2>
      
      {!isComplete ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Checkout options */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {/* Payment method */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label htmlFor="payment-card" className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-8 h-5 bg-blue-600 rounded"></div>
                          <div className="w-8 h-5 bg-red-500 rounded"></div>
                          <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="cash" id="payment-cash" />
                        <Label htmlFor="payment-cash" className="flex items-center">
                          <ShoppingCart className="h-4 w-4 mr-2 text-gray-500" />
                          Cash on Delivery
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="yassir" id="payment-yassir" />
                        <Label htmlFor="payment-yassir" className="flex items-center">
                          <ShoppingCart className="h-4 w-4 mr-2 text-gray-500" />
                          Yassir Cash
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {/* Delivery options */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Delivery Options</h3>
                  
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="delivery-standard" />
                          <Label htmlFor="delivery-standard" className="flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-gray-500" />
                            Regular Delivery (2 days)
                          </Label>
                        </div>
                        <div className="font-medium">
                          {shippingCost.toFixed(2)} DZD
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="delivery-express" />
                          <Label htmlFor="delivery-express" className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            Express Delivery (1 day)
                          </Label>
                        </div>
                        <div className="font-medium">
                          {shippingCost.toFixed(2)} DZD
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {/* Estimated delivery */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Estimated Delivery</h3>
                  
                  <div className="flex items-center space-x-2 text-green-600">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">
                      {deliveryOption === "express" 
                        ? "Estimated delivery within 1 business day" 
                        : "Estimated delivery within 2 business days"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Your items will be delivered to your registered address. You'll receive a confirmation email with tracking information once your order ships.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="md:col-span-1">
            <div className="bg-green-50 rounded-lg border p-4 sticky top-24">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items ({totalItems}):</span>
                  <span>{totalCost.toFixed(2)} DZD</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingCost.toFixed(2)} DZD</span>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span>{finalTotal.toFixed(2)} DZD</span>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 mb-2"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All to Cart
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Backpack Added to Cart!
            </h3>
            
            <p className="text-gray-600 mb-6">
              {backpackState.childInfo.name}'s backpack has been successfully added to your cart.
              You can now proceed to checkout or continue shopping.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart & Checkout
              </Button>
              
              <Button variant="outline" onClick={handleBuildAnother}>
                Build Another Backpack
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-green-100/50 p-4 text-sm text-gray-600 text-center">
            Thank you for using our Backpack Builder! Your items will be ready for checkout.
          </CardFooter>
        </Card>
      )}
      
      {/* Navigation buttons */}
      {!isComplete && (
        <div className="mt-8 flex justify-start">
          <Button variant="outline" onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Review
          </Button>
        </div>
      )}
    </div>
  )
}
