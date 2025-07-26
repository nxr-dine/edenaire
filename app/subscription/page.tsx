"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Crown, Star, Diamond, Check, X, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState("tier2")
  const [billingCycle, setBillingCycle] = useState("annual")

  const subscriptionTiers = [
    {
      id: "tier1",
      name: "Iconic Collection",
      subtitle: "Entry-Level Luxury",
      price: { monthly: 0, annual: 0 },
      color: "from-gray-400 to-gray-600",
      icon: Star,
      description: "Accessible yet luxurious pieces that embody timeless elegance",
      features: [
        "Access to Iconic Collection (50+ pieces)",
        "Entry-level luxury jewelry",
        "Basic customer support",
        "Standard shipping",
        "Product catalog access",
        "Email newsletters",
      ],
      limitations: ["No exclusive previews", "No personal concierge", "No custom designs", "No VIP events"],
      priceRange: "$500 - $5,000",
      badge: "FREE",
      popular: false,
    },
    {
      id: "tier2",
      name: "Prestige Collection",
      subtitle: "Aspirational Excellence",
      price: { monthly: 299, annual: 2990 },
      color: "from-yellow-400 to-yellow-600",
      icon: Diamond,
      description: "Worldwide recognized pieces for quality and prestige",
      features: [
        "Everything in Iconic Collection",
        "Access to Prestige Collection (100+ pieces)",
        "Priority customer support",
        "Free worldwide shipping",
        "Exclusive collection previews",
        "Quarterly style consultations",
        "Member-only events",
        "10% discount on all purchases",
      ],
      limitations: ["No bespoke services", "Limited edition access varies"],
      priceRange: "$5,000 - $50,000",
      badge: "MOST POPULAR",
      popular: true,
    },
    {
      id: "tier3",
      name: "Ultra-Exclusive",
      subtitle: "Bespoke Mastery",
      price: { monthly: 999, annual: 9990 },
      color: "from-purple-600 to-indigo-800",
      icon: Crown,
      description: "Ultra-exclusive craftsmanship with limited edition and bespoke pieces",
      features: [
        "Everything in Prestige Collection",
        "Access to Ultra-Exclusive Collection",
        "Unlimited bespoke design services",
        "Personal jewelry concierge",
        "Private atelier visits",
        "Limited edition priority access",
        "VIP event invitations worldwide",
        "20% discount on all purchases",
        "Complimentary annual appraisal",
        "White-glove delivery service",
        "Lifetime warranty on all pieces",
      ],
      limitations: [],
      priceRange: "$50,000 - $500,000+",
      badge: "ULTRA EXCLUSIVE",
      popular: false,
    },
  ]

  const tierBenefits = {
    tier1: [
      "Classic diamond studs and tennis bracelets",
      "Signature gold chains and pendants",
      "Timeless engagement rings",
      "Heritage-inspired timepieces",
    ],
    tier2: [
      "Designer collaboration pieces",
      "Award-winning collections",
      "Celebrity-endorsed jewelry",
      "Investment-grade timepieces",
    ],
    tier3: [
      "One-of-a-kind masterpieces",
      "Museum-quality artifacts",
      "Royal family commissions",
      "Astronomical auction pieces",
    ],
  }

  const currentTier = subscriptionTiers.find((tier) => tier.id === selectedTier)
  const currentPrice = billingCycle === "annual" ? currentTier?.price.annual : currentTier?.price.monthly

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Luxury Subscription Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <Badge className="bg-yellow-500 text-black mb-6 px-6 py-2 text-sm font-medium tracking-wider">
              EXCLUSIVE ACCESS TIERS
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-wider">Edenaire Access</h1>

          <p className="text-2xl md:text-3xl mb-6 font-light tracking-wide text-yellow-200">Three Tiers of Luxury</p>

          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed font-light">
            From iconic entry-level luxury to ultra-exclusive bespoke masterpieces, choose your level of access to the
            world's finest jewelry collections.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
          >
            Explore Tiers
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annual
                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 17%</Badge>
              </button>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="grid lg:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative border-0 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                  tier.popular ? "transform scale-105 ring-2 ring-yellow-400/50" : "hover:shadow-3xl"
                } ${selectedTier === tier.id ? "ring-2 ring-yellow-500" : ""}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-center py-2 text-sm font-medium">
                    {tier.badge}
                  </div>
                )}

                <CardHeader className={`bg-gradient-to-r ${tier.color} text-white p-8 ${tier.popular ? "pt-12" : ""}`}>
                  <div className="text-center">
                    <tier.icon className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-2xl font-light mb-2">{tier.name}</CardTitle>
                    <p className="text-sm opacity-90 mb-6">{tier.subtitle}</p>
                    <div className="mb-4">
                      {tier.price.monthly === 0 ? (
                        <div className="text-4xl font-extralight">FREE</div>
                      ) : (
                        <>
                          <div className="text-4xl font-extralight">
                            ${billingCycle === "annual" ? tier.price.annual : tier.price.monthly}
                          </div>
                          <div className="text-sm opacity-80">
                            {billingCycle === "annual" ? "per year" : "per month"}
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-sm opacity-90">{tier.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <p className="text-2xl font-light text-gray-700">{tier.priceRange}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-light text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.limitations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Limitations</h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <X className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 font-light text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                      selectedTier === tier.id
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                        : tier.price.monthly === 0
                          ? "bg-gray-900 hover:bg-gray-800 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {tier.price.monthly === 0 ? "Get Started Free" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Benefits */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">What Each Tier Offers</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {subscriptionTiers.map((tier, index) => (
              <Card key={tier.id} className="bg-gray-900 border-gray-800 text-white">
                <CardHeader className="text-center p-8">
                  <tier.icon className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                  <CardTitle className="text-2xl font-light text-yellow-400">{tier.name}</CardTitle>
                  <p className="text-gray-300 font-light">{tier.subtitle}</p>
                </CardHeader>
                <CardContent className="p-8">
                  <h4 className="font-medium mb-4 text-white">Featured Collections:</h4>
                  <ul className="space-y-3">
                    {tierBenefits[tier.id as keyof typeof tierBenefits].map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <Sparkles className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Plan Summary */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Complete Your Subscription</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-light mb-6 text-gray-900">Selected Plan</h3>
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {currentTier && <currentTier.icon className="h-8 w-8 text-yellow-600" />}
                        <div>
                          <h4 className="text-xl font-medium text-gray-900">{currentTier?.name}</h4>
                          <p className="text-gray-600">{currentTier?.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-light text-gray-900">
                          {currentPrice === 0 ? "FREE" : `$${currentPrice?.toLocaleString()}`}
                        </div>
                        {currentPrice !== 0 && (
                          <div className="text-sm text-gray-600">
                            {billingCycle === "annual" ? "per year" : "per month"}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 font-light">{currentTier?.description}</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input type="email" className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input type="tel" className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your jewelry preferences
                      </label>
                      <Textarea
                        rows={4}
                        className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder="Share your style preferences, favorite pieces, and what you're looking for..."
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                    >
                      {currentPrice === 0 ? "Start Free Access" : "Subscribe Now"}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </form>
                </div>

                <div>
                  <h3 className="text-2xl font-light mb-6 text-gray-900">Plan Benefits</h3>
                  <div className="space-y-4">
                    {currentTier?.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">Why Choose {currentTier?.name}?</h4>
                    <p className="text-sm text-yellow-800 font-light">
                      {currentTier?.id === "tier1" &&
                        "Perfect for those beginning their luxury jewelry journey with accessible yet sophisticated pieces."}
                      {currentTier?.id === "tier2" &&
                        "Ideal for collectors seeking prestigious pieces with worldwide recognition and exclusive access."}
                      {currentTier?.id === "tier3" &&
                        "The ultimate choice for connoisseurs who demand the finest bespoke craftsmanship and ultra-exclusive access."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
