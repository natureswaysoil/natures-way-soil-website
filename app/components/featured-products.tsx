
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getFeaturedProducts } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Leaf, Plus } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { useState } from 'react'

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts()
  const { addItem, setIsOpen } = useCart()
  const [addingProduct, setAddingProduct] = useState<string | null>(null)

  const handleAddToCart = (product: any) => {
    setAddingProduct(product.id)
    addItem(product)
    
    setTimeout(() => {
      setAddingProduct(null)
      setIsOpen(true) // Open cart sidebar
    }, 500)
  }

  const handleBuyNow = (product: any) => {
    addItem(product)
    setIsOpen(true)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular organic fertilizers and soil amendments, 
            each crafted to deliver exceptional results for your plants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <Leaf className="h-16 w-16 text-green-600" />
                    </div>
                  )}
                </div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-green-600">${product.price}</div>
                {product.npkRatio && (
                  <div className="text-sm text-gray-500">NPK: {product.npkRatio}</div>
                )}
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
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

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
