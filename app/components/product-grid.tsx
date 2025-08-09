
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products, searchProducts, getProductsByCategory } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Leaf, Plus } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/products'

interface ProductGridProps {
  selectedCategory: string
  searchQuery: string
  priceRange: [number, number]
}

export function ProductGrid({ selectedCategory, searchQuery, priceRange }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const { addItem, setIsOpen } = useCart()
  const [addingProduct, setAddingProduct] = useState<string | null>(null)

  useEffect(() => {
    let result = products

    // Filter by category
    if (selectedCategory !== 'All Products') {
      result = getProductsByCategory(selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery)
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery, priceRange])

  const handleAddToCart = (product: Product) => {
    setAddingProduct(product.id)
    addItem(product)
    
    setTimeout(() => {
      setAddingProduct(null)
    }, 1000)
  }

  const handleBuyNow = (product: Product) => {
    addItem(product)
    setIsOpen(true) // Open cart sidebar for immediate checkout
  }



  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {selectedCategory !== 'All Products' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Leaf className="h-20 w-20 text-green-600" />
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">{product.description}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-green-600">${product.price}</div>
                {product.npkRatio && (
                  <Badge variant="outline">NPK: {product.npkRatio}</Badge>
                )}
              </div>
              <div className="text-sm text-gray-500">{product.size}</div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="outline"
                  className="flex items-center justify-center"
                  disabled={addingProduct === product.id}
                >
                  {addingProduct === product.id ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-600 mr-1"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => handleBuyNow(product)}
                  className="bg-green-600 hover:bg-green-700 text-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Buy Now
                </Button>
              </div>
              <Button variant="ghost" className="w-full text-sm" asChild>
                <Link href={`/products/${product.slug}`}>
                  View Details & Usage Guide
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Leaf className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or browse all products.
          </p>
          <Button onClick={() => window.location.reload()}>
            Show All Products
          </Button>
        </div>
      )}
    </div>
  )
}
