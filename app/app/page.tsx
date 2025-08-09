
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Nature&apos;s Way Soil
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Premium organic liquid fertilizers and soil amendments for sustainable gardening.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Shop Products
              </Button>
            </Link>
            <Link href="/expert-advice">
              <Button variant="outline" className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
