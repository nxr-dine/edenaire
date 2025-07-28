# Stripe Payment Integration Setup

This guide will help you set up Stripe payment processing for your Endenaire e-commerce platform.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Your Stripe API keys
3. A webhook endpoint URL

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Public Stripe Key (for client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
```

## Getting Your Stripe Keys

1. **Publishable Key**: Go to your Stripe Dashboard → Developers → API Keys
2. **Secret Key**: Same location as above (keep this secret!)
3. **Webhook Secret**: Set up a webhook first (see below)

## Setting Up Webhooks

1. Go to your Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/payment/webhook`
4. Select the following events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
   - `charge.refunded`
5. Copy the webhook signing secret and add it to your environment variables

## Testing

### Test Cards

Use these test card numbers for testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`

### Test Mode vs Live Mode

- **Test Mode**: Use keys starting with `pk_test_` and `sk_test_`
- **Live Mode**: Use keys starting with `pk_live_` and `sk_live_`

## Features Implemented

### ✅ Payment Processing
- Secure payment form with Stripe Elements
- Real-time payment validation
- Support for multiple payment methods
- Automatic payment confirmation

### ✅ Order Management
- Order creation from cart items
- Payment intent creation and tracking
- Order status updates via webhooks
- Payment status tracking

### ✅ Security
- Webhook signature verification
- Server-side payment processing
- Client-side payment form security
- PCI compliance through Stripe

### ✅ User Experience
- Modern payment form design
- Real-time error handling
- Loading states and feedback
- Success/failure pages

## API Endpoints

### Payment
- `POST /api/payment/create-payment-intent` - Create payment intent
- `POST /api/payment/webhook` - Handle Stripe webhooks

### Orders
- `POST /api/orders/create` - Create order from cart
- `GET /api/orders/payment-intent/[id]` - Get order by payment intent

## Database Schema

The following models have been added:

- `PaymentIntent` - Tracks Stripe payment intents
- `PaymentMethod` - Stores saved payment methods
- Updated `Order` model with payment fields

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**: Check your webhook URL and secret
2. **Payment form not loading**: Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. **Payment failures**: Check Stripe Dashboard for error details
4. **Database errors**: Run `pnpm exec prisma migrate dev`

### Testing Checklist

- [ ] Environment variables set correctly
- [ ] Webhook endpoint accessible
- [ ] Test payments working
- [ ] Order creation successful
- [ ] Payment confirmation emails (if implemented)

## Production Deployment

1. Switch to live Stripe keys
2. Update webhook URL to production domain
3. Test with small amounts first
4. Monitor Stripe Dashboard for issues
5. Set up proper error logging

## Support

For Stripe-specific issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For application issues, check the project README or create an issue. 