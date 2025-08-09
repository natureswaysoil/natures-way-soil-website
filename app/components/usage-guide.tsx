
import { Clock, Droplets, Thermometer, Calendar } from 'lucide-react'
import type { Product } from '@/lib/products'

interface UsageGuideProps {
  product: Product
}

export function UsageGuide({ product }: UsageGuideProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guide & Application Instructions</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Application Instructions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Droplets className="h-5 w-5 text-blue-600 mr-2" />
            How to Apply
          </h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">Application Rate:</p>
              <p className="text-gray-700">{product.applicationRate}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Best Uses:</p>
              <ul className="space-y-1">
                {product.usage.map((use, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ingredients & Composition */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Thermometer className="h-5 w-5 text-green-600 mr-2" />
            Ingredients & Analysis
          </h3>
          <div className="space-y-3">
            {product.npkRatio && (
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">NPK Analysis:</p>
                <p className="text-gray-700">{product.npkRatio}</p>
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 mb-2">Ingredients:</p>
              <p className="text-gray-700 text-sm">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Application Calendar */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 text-purple-600 mr-2" />
          Seasonal Application Guide
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Spring</h4>
            <p className="text-sm text-gray-700">Begin regular applications as plants start active growth. Ideal for establishing new plantings.</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Summer</h4>
            <p className="text-sm text-gray-700">Continue regular feeding schedule. Increase frequency during peak growing season if needed.</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Fall</h4>
            <p className="text-sm text-gray-700">Reduce application frequency. Focus on root development and winter preparation.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Winter</h4>
            <p className="text-sm text-gray-700">Minimal applications for houseplants only. Outdoor plants are generally dormant.</p>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="h-5 w-5 text-orange-600 mr-2" />
          Professional Growing Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Practices:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Apply in early morning or evening to avoid leaf burn</li>
              <li>• Water plants after application for best uptake</li>
              <li>• Store in cool, dry place away from direct sunlight</li>
              <li>• Shake well before each use</li>
              <li>• Don't apply to dry or stressed plants</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Common Mistakes to Avoid:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Over-fertilizing can damage plants</li>
              <li>• Don't apply during extreme heat</li>
              <li>• Avoid mixing with other chemicals</li>
              <li>• Don't apply to wet foliage</li>
              <li>• Always follow dilution instructions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
