"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, Lock, CreditCard, Smartphone, Apple, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const { data: cart, isLoading } = useSWR("/api/cart", fetcher)
  const cartItems = cart?.items?.map((item: any) => ({
    ...item.product,
    quantity: item.quantity,
    id: item.productId,
    tier: item.product?.tier || "",
  })) || []

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (isLoading) {
    return <div className="text-center py-16 text-gray-500">Loading cart...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Back to Cart */}
        <div className="mb-8">
          <Link href="/cart">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-12">
            {[
              { number: 1, label: "Shipping", icon: Truck },
              { number: 2, label: "Payment", icon: CreditCard },
              { number: 3, label: "Confirmation", icon: CheckCircle },
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                      step >= stepItem.number
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <stepItem.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`mt-3 text-sm font-medium ${step >= stepItem.number ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {stepItem.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-24 h-0.5 mx-6 transition-all duration-500 ${step > stepItem.number ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <CardTitle className="text-3xl font-extralight text-gray-900 tracking-wide">
                    Shipping Information
                  </CardTitle>
                  <p className="text-gray-600 font-light">
                    Please provide your delivery details for our white-glove service
                  </p>
                </CardHeader>
                <CardContent className="p-12 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">First Name *</label>
                      <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Last Name *</label>
                      <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Email Address *</label>
                    <Input
                      type="email"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Phone Number *</label>
                    <Input
                      type="tel"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Address *</label>
                    <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">City *</label>
                      <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">State/Province *</label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">ZIP Code *</label>
                      <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Country *</label>
                    <Select>
                      <SelectTrigger className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ch">Switzerland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <CardTitle className="text-3xl font-extralight text-gray-900 tracking-wide">
                    Payment Information
                  </CardTitle>
                  <p className="text-gray-600 font-light">Choose your preferred payment method</p>
                </CardHeader>
                <CardContent className="p-12 space-y-8">
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 text-lg">Bank-Level Security</p>
                      <p className="text-sm text-green-600">Your payment information is encrypted with 256-bit SSL</p>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-gray-900 mb-6">Select Payment Method</h3>

                    <div className="grid gap-4">
                      {/* Apple Pay */}
                      <div
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          paymentMethod === "apple"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("apple")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                            <Apple className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">Apple Pay</h4>
                            <p className="text-sm text-gray-600">Pay securely with Touch ID or Face ID</p>
                          </div>
                        </div>
                      </div>

                      {/* Credit Card */}
                      <div
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          paymentMethod === "card"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">Credit Card</h4>
                            <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer */}
                      <div
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          paymentMethod === "bank"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                            <Smartphone className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">Bank Transfer</h4>
                            <p className="text-sm text-gray-600">Direct bank transfer (3-5 business days)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form Based on Selection */}
                  {paymentMethod === "apple" && (
                    <div className="space-y-6">
                      <Button
                        size="lg"
                        className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium rounded-xl transition-all duration-300"
                      >
                        <Apple className="mr-3 h-6 w-6" />
                        Pay with Apple Pay
                      </Button>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Card Number *</label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Expiry Date *</label>
                          <Input
                            placeholder="MM/YY"
                            className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">CVV *</label>
                          <Input
                            placeholder="123"
                            className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Cardholder Name *</label>
                        <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-12 text-lg" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="space-y-6">
                      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Instructions</h4>
                        <p className="text-sm text-blue-700 mb-4">
                          You will receive detailed wire transfer instructions after placing your order. Your items will
                          be reserved for 7 business days.
                        </p>
                        <div className="text-sm text-blue-600">
                          <p>
                            <strong>Processing Time:</strong> 3-5 business days
                          </p>
                          <p>
                            <strong>Additional Fees:</strong> May apply based on your bank
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-6 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      size="lg"
                      className="flex-1 h-12 text-lg border-2 border-gray-300 hover:border-gray-400 bg-transparent"
                    >
                      Back to Shipping
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                    >
                      Complete Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-2xl bg-white">
                <CardContent className="p-16 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-extralight mb-6 text-gray-900 tracking-wide">Order Confirmed!</h2>
                  <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                    Thank you for choosing Edenaire. Your order has been confirmed and will be processed with the utmost
                    care.
                  </p>
                  <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl mb-8 border">
                    <p className="font-medium text-lg text-gray-900 mb-2">Order Number: #ED-2024-001234</p>
                    <p className="text-gray-600">You will receive a confirmation email with tracking details shortly</p>
                  </div>
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
                  <Link href="/shop">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-12 py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-2xl sticky top-24 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="text-2xl font-extralight text-gray-900 tracking-wide">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            item.tier === "Tier 3"
                              ? "bg-purple-100 text-purple-800"
                              : item.tier === "Tier 2"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.tier}
                        </Badge>
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-medium text-lg text-gray-900">${item.price.toLocaleString()}</span>
                  </div>
                ))}

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Shipping</span>
                    <span className="text-green-600 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-medium">${tax.toLocaleString()}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-2xl font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-yellow-500" />
                    <span>Complimentary worldwide white-glove delivery</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-yellow-500" />
                    <span>Lifetime warranty and annual maintenance</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Lock className="h-5 w-5 text-yellow-500" />
                    <span>Bank-level security and encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
