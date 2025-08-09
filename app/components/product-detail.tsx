
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Leaf, Info, Users, Clock, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { UsageGuide } from '@/components/usage-guide'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/products'
import { useState } from 'react'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, setIsOpen } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Product is already in the correct format from lib/products
    addItem(product)
    
    // Show feedback and open cart
    setTimeout(() => {
      setIsAdding(false)
      setIsOpen(true)
    }, 500)
  }

  const handleBuyNow = () => {
    handleAddToCart()
  }

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Product Image */}
      <div>
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-6">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="product-detail-image"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <Leaf className="h-32 w-32 text-green-600" />
            </div>
          )}
          <div className="absolute inset-0 w-full h-full hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center rounded-lg">
            <Leaf className="h-32 w-32 text-green-600" />
          </div>
        </div>
        
        {/* Key Features */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Why Choose This Product?</h3>
          <ul className="space-y-2">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-green-600">${product.price}</div>
            {product.npkRatio && (
              <Badge variant="outline" className="text-lg px-3 py-1">
                NPK: {product.npkRatio}
              </Badge>
            )}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Size:</span> {product.size}
          </div>
        </div>

        {/* Buy Buttons */}
        <div className="mb-8 space-y-3">
          <Button 
            onClick={handleBuyNow}
            className="w-full text-lg py-4 bg-green-600 hover:bg-green-700"
            size="lg"
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Adding to Cart...
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-3" />
                Buy Now - ${product.price}
              </>
            )}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleAddToCart}
            className="w-full text-lg py-3"
            size="lg"
            disabled={isAdding}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-4">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Ships in 1-2 days
              </span>
              <span>Ships to lower 48 states only</span>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Leaf className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">100% Organic</span>
            </div>
            <p className="text-sm text-gray-600">Made from premium organic ingredients</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium">Fresh Weekly</span>
            </div>
            <p className="text-sm text-gray-600">Manufactured fresh for maximum potency</p>
          </div>
        </div>

        {/* Expert Advice CTA */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="font-semibold text-gray-900">Need Growing Advice?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Get personalized recommendations and growing tips from our AI-powered expert system.
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="https://natureswaysoil.com/chat" target="_blank" rel="noopener noreferrer">
              Get Expert Advice
            </Link>
          </Button>
        </div>
      </div>
    </div>
    <UsageGuide product={product} />
    </>
  )
}
