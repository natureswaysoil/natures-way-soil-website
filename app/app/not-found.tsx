
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
              Go Home
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Shop Products
              </Button>
            </Link>
            <Link href="/expert-advice" className="flex-1">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Get Advice
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
