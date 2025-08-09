
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // You can fetch order details here if needed
      console.log('Payment successful with session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-green-800">
            You will receive an email confirmation with your order details and tracking information.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/products" className="block">
            <Button className="w-full" variant="outline">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Link href="/" className="block">
            <Button className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
