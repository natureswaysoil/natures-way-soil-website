
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Leaf, Tag, ArrowRight, ShoppingCart, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { useCart } from '@/components/cart-context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  
  const formatPrice = (price: number | null | undefined) => {
    return price ? `$${price.toFixed(2)}` : 'Contact for Price'
  }
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.sellingPrice) return
    
    setIsAdding(true)
    
    // Convert product to cart format matching Product interface from lib/products
    const cartProduct = {
      id: product.id,
      name: product.shortName || product.title,
      description: product.description || 'Premium organic product',
      price: product.sellingPrice,
      category: product.category || 'Fertilizer',
      type: 'Fertilizer',
      benefits: [],
      usage: [],
      applicationRate: 'Follow package directions',
      size: '1 unit',
      ingredients: 'Organic ingredients',
      seoKeywords: [],
      slug: product.id
    }
    
    addItem(cartProduct)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const getCategoryColor = (category: string | null | undefined) => {
    switch (category) {
      case 'Liquid Fertilizers':
        return 'bg-green-100 text-green-800'
      case 'Specialized Fertilizers':
        return 'bg-blue-100 text-blue-800'
      case 'Organic Supplements':
        return 'bg-purple-100 text-purple-800'
      case 'Soil Amendments':
        return 'bg-yellow-100 text-yellow-800'
      case 'Lawn Care':
        return 'bg-emerald-100 text-emerald-800'
      case 'Hydroponic Fertilizers':
        return 'bg-cyan-100 text-cyan-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-4">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg overflow-hidden mb-4 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
            <Leaf className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          {product.category && (
            <Badge className={getCategoryColor(product.category)}>
              {product.category}
            </Badge>
          )}
          <CardTitle className="text-lg text-gray-900 line-clamp-2">
            {product.shortName || product.title}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <CardDescription className="text-gray-600 line-clamp-3">
            {product.description || 'Premium organic product for healthy plant growth and soil improvement.'}
          </CardDescription>
          
          {product.features && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Features:</span> {product.features.split('•').slice(0, 2).join('•')}
            </div>
          )}
          
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(product.sellingPrice)}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href={`/products/${product.id}`}>
                  View Details <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </Button>
              
              {product.sellingPrice && (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 px-3"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
