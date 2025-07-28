import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  throw new Error('STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
};

export const formatAmountForStripe = (amount: number, currency: string): number => {
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const multiplier = currencies.includes(currency.toUpperCase()) ? 100 : 1;
  return Math.round(amount * multiplier);
};

export const formatAmountFromStripe = (amount: number, currency: string): number => {
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const divisor = currencies.includes(currency.toUpperCase()) ? 100 : 1;
  return amount / divisor;
}; 