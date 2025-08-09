
'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductSearchProps {
  onSearchChange: (query: string) => void
}

export function ProductSearch({ onSearchChange }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(searchQuery)
  }

  const handleInputChange = (query: string) => {
    setSearchQuery(query)
    onSearchChange(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    onSearchChange('')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fertilizers, soil amendments, plant types..."
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit">
          Search
        </Button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'liquid fertilizer',
            'tomato fertilizer', 
            'houseplant food',
            'soil amendment',
            'organic fertilizer',
            'hydroponic nutrients'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleInputChange(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
