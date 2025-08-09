
'use client'

import React, { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/types'

interface ProductsClientProps {
  products: Product[]
  categories: Array<{ name: string | null; count: number }>
}

export function ProductsClient({ products, categories }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

      // Price range filter
      const matchesPrice = (() => {
        if (priceRange === 'all' || !product.sellingPrice) return true
        const price = product.sellingPrice
        switch (priceRange) {
          case 'under-25': return price < 25
          case '25-50': return price >= 25 && price <= 50
          case '50-75': return price >= 50 && price <= 75
          case 'over-75': return price > 75
          default: return true
        }
      })()

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.shortName || a.title).localeCompare(b.shortName || b.title)
        case 'price-low':
          return (a.sellingPrice || 0) - (b.sellingPrice || 0)
        case 'price-high':
          return (b.sellingPrice || 0) - (a.sellingPrice || 0)
        case 'category':
          return (a.category || '').localeCompare(b.category || '')
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Find Your Perfect Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.name || 'unknown'} value={category.name || 'unknown'}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-25">Under $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50-75">$50 - $75</SelectItem>
                <SelectItem value="over-75">Over $75</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredAndSortedProducts?.length || 0} Products Found
          </h2>
          <p className="text-gray-600">
            {searchTerm && `Results for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="bg-green-600 hover:bg-green-700"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="bg-green-600 hover:bg-green-700"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts?.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <SlidersHorizontal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setPriceRange('all')
              }}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <section className="mt-16 bg-green-50 rounded-lg p-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Organic Fertilizer Application Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to get the best results from your Nature's Way Soil products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Spring Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Apply liquid fertilizers at the start of growing season for maximum plant vigor. 
                Dilute concentrates according to label directions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Soil Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Use soil amendments to improve structure and drainage before planting. 
                Mix compost and biochar into top 6 inches of soil.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-green-800">Maintenance Feeding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Regular feeding every 2-3 weeks during growing season maintains optimal nutrition. 
                Reduce frequency in fall and winter.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
