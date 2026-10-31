"use client"

import { useEffect, useState } from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Truck, Shield, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent")
    
    if (paymentIntentId) {
      // Fetch order details based on payment intent
      fetchOrderDetails(paymentIntentId)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchOrderDetails = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/orders/payment-intent/${paymentIntentId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data)
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <Card className="border-0 shadow-2xl bg-white">
          <CardContent className="p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-extralight mb-6 text-gray-900 tracking-wide">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
              Thank you for your purchase. Your order has been confirmed and will be processed with the utmost care.
            </p>

            {orderDetails && (
              <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl mb-8 border">
                <p className="font-medium text-lg text-gray-900 mb-2">
                  Order Number: #{orderDetails.orderId}
                </p>
                <p className="text-gray-600 mb-4">
                  Total: ${orderDetails.total?.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  You will receive a confirmation email with tracking details shortly
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Truck className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">White-Glove Delivery</p>
                <p className="text-sm text-gray-600">3-5 business days</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Fully Insured</p>
                <p className="text-sm text-gray-600">Complete protection</p>
              </div>
              <div className="text-center">
                <Lock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Lifetime Warranty</p>
                <p className="text-sm text-gray-600">Included with purchase</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/account/orders">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-gray-400 bg-transparent px-8 py-4 text-lg"
                >
                  View Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
} 

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}