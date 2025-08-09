
'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';

import toast from 'react-hot-toast';
import { ShoppingCart, CreditCard } from 'lucide-react';

interface StripeCheckoutItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

interface StripeCheckoutProps {
  items: StripeCheckoutItem[];
  onSuccess?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children?: React.ReactNode;
}

const stripePromise = (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
                     !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder'))
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function StripeCheckout({ 
  items, 
  onSuccess, 
  className,
  variant = 'default',
  size = 'default',
  children 
}: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Check if Stripe is configured
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder')) {
      toast.error('Payment processing is not set up yet. Please contact us directly to place your order.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: window.location.href,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className={className}
      variant={variant}
      size={size}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : children || (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Checkout ${totalAmount.toFixed(2)}
        </>
      )}
    </Button>
  );
}
