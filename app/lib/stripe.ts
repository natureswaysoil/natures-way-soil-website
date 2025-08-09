
import Stripe from 'stripe';

const stripe = (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder'))
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default stripe;

export const getStripe = () => {
  if (typeof window !== 'undefined' && 
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
      !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder')) {
    return import('@stripe/stripe-js').then(({ loadStripe }) =>
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    );
  }
  return null;
};
