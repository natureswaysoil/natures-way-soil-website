
'use client'

import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import StripeCheckout from '@/components/stripe-checkout'

export function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, isOpen, setIsOpen } = useCart()
  const handleCheckoutSuccess = () => {
    clearCart()
    setIsOpen(false)
  }

  // Convert cart items to the format expected by StripeCheckout
  const cartItems = items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    description: item.product.description || item.product.category,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image
  }))

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Shopping Cart ({items.length})
          </h2>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {item.product.category}
                  </Badge>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${item.product.price} each
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold text-green-600">
                ${getTotal().toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2">
              <StripeCheckout 
                items={cartItems}
                onSuccess={handleCheckoutSuccess}
                className="w-full"
              >
                {(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
                  !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder'))
                  ? 'Checkout with Stripe' 
                  : 'Request Quote'
                }
              </StripeCheckout>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              {(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
                !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder'))
                ? 'Secure checkout with Stripe'
                : 'Payment processing will be available soon'
              }
            </p>
          </div>
        )}
      </div>
    </>
  )
}
