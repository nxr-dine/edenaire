import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      case 'payment_intent.canceled':
        await handlePaymentCanceled(event.data.object);
        break;
      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  try {
    const orderId = paymentIntent.metadata.orderId;
    
    if (!orderId) {
      console.error('No order ID in payment intent metadata');
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'confirmed',
        paymentStatus: 'succeeded',
      },
    });

    // Update payment intent status
    await prisma.paymentIntent.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: paymentIntent.status },
    });

    // Clear user's cart
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (order?.user) {
      await prisma.cartItem.deleteMany({
        where: { cart: { userId: order.user.id } },
      });
    }

    console.log(`Payment succeeded for order: ${orderId}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  try {
    const orderId = paymentIntent.metadata.orderId;
    
    if (!orderId) {
      console.error('No order ID in payment intent metadata');
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'failed',
        paymentStatus: 'failed',
      },
    });

    // Update payment intent status
    await prisma.paymentIntent.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: paymentIntent.status },
    });

    console.log(`Payment failed for order: ${orderId}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePaymentCanceled(paymentIntent: any) {
  try {
    const orderId = paymentIntent.metadata.orderId;
    
    if (!orderId) {
      console.error('No order ID in payment intent metadata');
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'canceled',
        paymentStatus: 'canceled',
      },
    });

    // Update payment intent status
    await prisma.paymentIntent.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: paymentIntent.status },
    });

    console.log(`Payment canceled for order: ${orderId}`);
  } catch (error) {
    console.error('Error handling payment cancellation:', error);
  }
}

async function handleRefund(charge: any) {
  try {
    const paymentIntentId = charge.payment_intent;
    
    if (!paymentIntentId) {
      console.error('No payment intent ID in charge');
      return;
    }

    // Find the order associated with this payment intent
    const paymentIntent = await prisma.paymentIntent.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
      include: { order: true },
    });

    if (!paymentIntent?.order) {
      console.error('No order found for payment intent:', paymentIntentId);
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: paymentIntent.order.id },
      data: {
        status: 'refunded',
        paymentStatus: 'refunded',
      },
    });

    console.log(`Refund processed for order: ${paymentIntent.order.id}`);
  } catch (error) {
    console.error('Error handling refund:', error);
  }
} 