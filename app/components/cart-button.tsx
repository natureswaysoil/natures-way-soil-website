
'use client'

import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function CartButton() {
  const { getItemCount, setIsOpen } = useCart()
  const itemCount = getItemCount()

  return (
    <Button
      variant="outline"
      className="relative"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  )
}
