
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Package, Truck } from 'lucide-react'
import Link from 'next/link'

function CheckoutSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  
  const orderId = searchParams.get('orderId')
  const transactionId = searchParams.get('transactionId')

  useEffect(() => {
    // Clear cart from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }

    // Fetch order details if needed
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/square/order/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Order Confirmed!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-600 mb-2">
                Thank you for your order! We've received your payment and will process your order shortly.
              </p>
              {orderId && (
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-mono">{orderId}</span>
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600 mr-2" />
                <div className="text-left">
                  <div className="font-medium text-blue-600">Processing</div>
                  <div className="text-sm text-gray-600">1-2 business days</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                <Truck className="h-6 w-6 text-green-600 mr-2" />
                <div className="text-left">
                  <div className="font-medium text-green-600">Shipping</div>
                  <div className="text-sm text-gray-600">3-7 business days</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• You'll receive an order confirmation email</li>
                <li>• We'll send tracking information once shipped</li>
                <li>• Questions? Contact us at orders@natureswaysoil.com</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/expert-advice">Get Growing Tips</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
