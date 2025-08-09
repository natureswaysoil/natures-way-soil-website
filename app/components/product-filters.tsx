
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/lib/products'

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function ProductFilters({ 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceRangeChange 
}: ProductFiltersProps) {
  const clearFilters = () => {
    onCategoryChange('All Products')
    onPriceRangeChange([0, 50])
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Products</h3>
      
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            <button
              onClick={() => onPriceRangeChange([0, 25])}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                priceRange[0] === 0 && priceRange[1] === 25
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              $0 - $25
            </button>
            <button
              onClick={() => onPriceRangeChange([25, 35])}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                priceRange[0] === 25 && priceRange[1] === 35
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              $25 - $35
            </button>
            <button
              onClick={() => onPriceRangeChange([35, 50])}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                priceRange[0] === 35 && priceRange[1] === 50
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              $35+
            </button>
          </div>
        </div>

        {/* Product Type */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Product Type</h4>
          <div className="space-y-2">
            {['Liquid Fertilizer', 'Soil Amendment', 'Potting Mix', 'Concentrate'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Use Case */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Best For</h4>
          <div className="space-y-2">
            {['Vegetables', 'Houseplants', 'Flowers', 'Hydroponic', 'Containers'].map((useCase) => (
              <label key={useCase} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">{useCase}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'All Products' || priceRange[0] !== 0 || priceRange[1] !== 50) && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All Products' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => onCategoryChange('All Products')}>
                {selectedCategory} ×
              </Badge>
            )}
            {(priceRange[0] !== 0 || priceRange[1] !== 50) && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => onPriceRangeChange([0, 50])}>
                ${priceRange[0]} - ${priceRange[1]} ×
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
