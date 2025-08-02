"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, Heart, Shield, Truck, RotateCcw, Gift, Tag, ShoppingBag, Crown, Diamond, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { getSubscriptionBenefits, getTierDisplayName, getTierBadgeColor } from "@/lib/subscription-utils"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("")
  const { user } = useAuth()
  const { data: cart, isLoading, mutate } = useSWR("/api/cart", fetcher)
  
  const userTier = user?.tier || "iconic"
  const benefits = getSubscriptionBenefits(userTier)
  
  const cartItems = (cart?.items || []).map((item: any) => ({
    ...item,
    price: item.price || 0,
    discountedPrice: item.discountedPrice || item.price || 0,
    quantity: item.quantity || 1,
    inStock: true,
    estimatedDelivery: benefits.shippingType === "Complimentary Worldwide" ? "1-2 business days" : "3-5 business days",
  }))

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(id)
      return
    }
    await fetch("/api/cart/item", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, quantity: newQuantity }),
    })
    mutate()
  }

  const removeItem = async (id: string) => {
    await fetch("/api/cart/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    })
    mutate()
  }

  const moveToWishlist = async (id: string) => {
    // Optionally, implement move to wishlist
    await removeItem(id)
  }

  const subtotal = cart?.total || 0
  const discountedTotal = cart?.discountedTotal || subtotal
  const discountAmount = cart?.discountAmount || 0
  const discountPercentage = cart?.discountPercentage || 0
  
  const savings = cartItems.reduce((sum: number, item: any) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0) + discountAmount
  
  const shipping = 0 // Free shipping
  const tax = discountedTotal * 0.08 // 8% tax
  const total = discountedTotal + shipping + tax

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "bg-gray-100 text-gray-800"
      case "Tier 2":
        return "bg-yellow-100 text-yellow-800"
      case "Tier 3":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Ultra-Exclusive":
        return Crown
      case "Prestige Collection":
        return Diamond
      default:
        return Star
    }
  }

  const TierIcon = getTierIcon(userTier)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extralight text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 font-light">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Subscription Benefits Banner */}
        {benefits.discountPercentage > 0 && (
          <div className={`mb-6 p-4 rounded-lg ${getTierBadgeColor(userTier)} text-center`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <TierIcon className="h-5 w-5" />
              <span className="font-medium">{getTierDisplayName(userTier)} Member</span>
            </div>
            <p className="text-sm">
              Enjoy {benefits.discountPercentage}% off all products + {benefits.shippingType} shipping
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16 text-gray-500">Loading cart...</div>
        ) : cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-red-500 text-white text-xs">Out of Stock</Badge>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">{item.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTierColor(item.tier)}>{item.tier}</Badge>
                              <span className="text-sm text-gray-600">Delivery: {item.estimatedDelivery}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {benefits.discountPercentage > 0 ? (
                                <>
                                  <span className="text-2xl font-light text-gray-900">${(item.discountedPrice || item.price || 0).toLocaleString()}</span>
                                  <span className="text-lg text-gray-500 line-through">
                                    ${(item.price || 0).toLocaleString()}
                                  </span>
                                  <Badge className={`text-xs ${getTierBadgeColor(userTier)}`}>
                                    {benefits.discountPercentage}% OFF
                                  </Badge>
                                </>
                              ) : (
                                <span className="text-2xl font-light text-gray-900">${(item.price || 0).toLocaleString()}</span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={!item.inStock}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={!item.inStock}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Item Actions */}
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item.id)}
                            className="text-gray-600 hover:text-yellow-600"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Move to Wishlist
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-600 hover:text-red-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Promo Code */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-12 px-8 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Apply Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-extralight text-gray-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    {discountPercentage > 0 && (
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-700">Member Discount ({discountPercentage}%)</span>
                        <span className="font-medium text-green-600">-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {savings > discountAmount && (
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-700">Additional Savings</span>
                        <span className="font-medium text-green-600">-${(savings - discountAmount).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-700">Shipping</span>
                      <span className="font-medium text-green-600">{benefits.shippingType}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-700">Tax</span>
                      <span className="font-medium">${tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-2xl font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>

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
                      <RotateCcw className="h-5 w-5 text-yellow-500" />
                      <span>30-day hassle-free returns</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Gift className="h-5 w-5 text-yellow-500" />
                      <span>Complimentary luxury gift wrapping</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 font-light">
              Discover our exquisite collections and find your perfect piece
            </p>
            <Link href="/shop">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3">
                Explore Collections
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
