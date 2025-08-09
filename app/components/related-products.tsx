

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Leaf, Plus } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/products'

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { addItem, setIsOpen } = useCart()
  const [addingProduct, setAddingProduct] = useState<string | null>(null)

  // Get related products from the same category, excluding current product
  const relatedProducts = products
    .filter(product => 
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    )
    .slice(0, 3)

  // If not enough products in same category, add some from other categories
  if (relatedProducts.length < 3) {
    const additionalProducts = products
      .filter(product => 
        product.category !== currentProduct.category && 
        product.id !== currentProduct.id
      )
      .slice(0, 3 - relatedProducts.length)
    
    relatedProducts.push(...additionalProducts)
  }

  if (relatedProducts.length === 0) {
    return null
  }

  const handleAddToCart = (product: Product) => {
    setAddingProduct(product.id)
    addItem(product)
    
    setTimeout(() => {
      setAddingProduct(null)
    }, 1000)
  }

  const handleBuyNow = (product: Product) => {
    addItem(product)
    setIsOpen(true)
  }

  return (
    <section className="py-12 border-t">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
        <p className="text-gray-600">
          Discover other premium organic fertilizers that complement your growing needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`/images/products/${product.id}.jpg`}
                    alt={product.name}
                    className="product-card-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                )}
                <div className="w-full h-full hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            </div>

            <div className="mb-4">
              <div className="text-xl font-bold text-green-600">${product.price}</div>
              {product.npkRatio && (
                <div className="text-sm text-gray-500">NPK: {product.npkRatio}</div>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => handleBuyNow(product)}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={addingProduct === product.id}
              >
                {addingProduct === product.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now - ${product.price}
                  </>
                )}
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/products/${product.slug}`}>
                    View Details
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingProduct === product.id}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
