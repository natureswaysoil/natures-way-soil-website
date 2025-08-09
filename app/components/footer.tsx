
import Link from 'next/link'
import { Leaf, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 rounded-full p-2">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold">Nature's Way Soil</span>
                <p className="text-sm text-gray-400">Premium Organic Fertilizers</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Professional-grade organic fertilizers and soil amendments made fresh weekly 
              for exceptional plant nutrition and sustainable growing.
            </p>
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Shipping to Lower 48 States Only
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              Made Fresh Weekly
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/expert-advice"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Expert Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=liquid-fertilizers" className="text-gray-400 hover:text-white transition-colors">
                  Liquid Fertilizers
                </Link>
              </li>
              <li>
                <Link href="/products?category=soil-amendments" className="text-gray-400 hover:text-white transition-colors">
                  Soil Amendments
                </Link>
              </li>
              <li>
                <Link href="/products?category=potting-mixes" className="text-gray-400 hover:text-white transition-colors">
                  Potting Mixes
                </Link>
              </li>
              <li>
                <Link href="/products?category=hydroponic-nutrients" className="text-gray-400 hover:text-white transition-colors">
                  Hydroponic Nutrients
                </Link>
              </li>
              <li>
                <Link href="/products?category=specialty-products" className="text-gray-400 hover:text-white transition-colors">
                  Specialty Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Support Available
              </li>
              <li className="text-gray-400">
                Response within 24 hours
              </li>
              <li className="text-gray-400 mt-4">
                <strong>Shipping & Returns:</strong>
              </li>
              <li className="text-gray-400">
                • FREE shipping on all orders
              </li>
              <li className="text-gray-400">
                • Lower 48 states only
              </li>
              <li className="text-gray-400">
                • 1-2 day processing
              </li>
              <li className="text-gray-400">
                • No-hassle refunds, no returns needed
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Nature's Way Soil. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Premium organic fertilizers made fresh weekly. Professional-grade plant nutrition for sustainable gardening.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
