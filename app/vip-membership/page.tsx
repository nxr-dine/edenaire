"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Crown, Star, Gift, Calendar, Plane, Shield, Diamond, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function VIPMembershipPage() {
  const [selectedTier, setSelectedTier] = useState("platinum")

  const membershipTiers = [
    {
      id: "gold",
      name: "Gold Circle",
      price: "$2,500",
      period: "annually",
      color: "from-yellow-400 to-yellow-600",
      icon: Star,
      description: "Exclusive access to our curated collections",
      features: [
        "10% discount on all purchases",
        "Priority customer service",
        "Exclusive collection previews",
        "Complimentary jewelry cleaning",
        "Birthday gift selection",
        "Quarterly style consultation",
      ],
    },
    {
      id: "platinum",
      name: "Platinum Elite",
      price: "$7,500",
      period: "annually",
      color: "from-gray-400 to-gray-600",
      icon: Diamond,
      description: "Premium benefits for the discerning collector",
      features: [
        "15% discount on all purchases",
        "Dedicated personal concierge",
        "Private shopping appointments",
        "Complimentary annual appraisal",
        "Exclusive event invitations",
        "Custom design consultations",
        "Complimentary worldwide shipping",
        "Priority repair services",
      ],
      popular: true,
    },
    {
      id: "diamond",
      name: "Diamond Prestige",
      price: "$15,000",
      period: "annually",
      color: "from-blue-400 to-purple-600",
      icon: Crown,
      description: "The ultimate luxury experience",
      features: [
        "20% discount on all purchases",
        "24/7 personal concierge service",
        "Private atelier visits in Geneva",
        "Bespoke design services included",
        "VIP event access worldwide",
        "Complimentary insurance coverage",
        "Annual luxury travel experience",
        "Legacy collection access",
        "Personal jewelry curator",
        "Lifetime warranty on all pieces",
      ],
    },
  ]

  const exclusivePerks = [
    {
      icon: Calendar,
      title: "Private Events",
      description: "Exclusive access to trunk shows, designer meet-and-greets, and luxury lifestyle events",
    },
    {
      icon: Plane,
      title: "Global Concierge",
      description: "Personal shopping assistance and jewelry services available in major cities worldwide",
    },
    {
      icon: Gift,
      title: "Curated Gifts",
      description: "Personalized gift recommendations and complimentary gift wrapping for special occasions",
    },
    {
      icon: Shield,
      title: "Insurance & Protection",
      description: "Comprehensive coverage and protection plans for your entire jewelry collection",
    },
  ]

  const testimonials = [
    {
      name: "Victoria Ashworth",
      tier: "Diamond Prestige",
      quote:
        "The Diamond Prestige membership has transformed my jewelry collecting experience. The personal curator understands my taste perfectly.",
      image: "/placeholder.svg?height=80&width=80",
      location: "London",
    },
    {
      name: "Alessandro Medici",
      tier: "Platinum Elite",
      quote: "The private shopping appointments and exclusive previews make me feel truly valued as a collector.",
      image: "/placeholder.svg?height=80&width=80",
      location: "Milan",
    },
    {
      name: "Catherine Beaumont",
      tier: "Gold Circle",
      quote: "Even at the Gold level, the service is exceptional. The quarterly consultations have elevated my style.",
      image: "/placeholder.svg?height=80&width=80",
      location: "Monaco",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="VIP Membership Background"
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
              EXCLUSIVE MEMBERSHIP
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-wider">VIP Circle</h1>

          <p className="text-2xl md:text-3xl mb-6 font-light tracking-wide text-yellow-200">
            Where Luxury Meets Exclusivity
          </p>

          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed font-light">
            Join an elite community of collectors and connoisseurs. Experience unparalleled service, exclusive access,
            and personalized luxury that transcends ordinary shopping.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
          >
            Explore Membership
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Membership Tiers</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Choose the membership level that matches your lifestyle and collecting passion
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative border-0 shadow-2xl transition-all duration-500 overflow-hidden ${
                  tier.popular ? "transform scale-105 ring-2 ring-yellow-400/50" : "hover:shadow-3xl"
                } ${selectedTier === tier.id ? "ring-2 ring-yellow-500" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}

                <CardHeader className={`bg-gradient-to-r ${tier.color} text-white p-8 ${tier.popular ? "pt-12" : ""}`}>
                  <div className="text-center">
                    <tier.icon className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-2xl font-light mb-2">{tier.name}</CardTitle>
                    <p className="text-sm opacity-90 mb-6">{tier.description}</p>
                    <div className="text-4xl font-extralight mb-2">{tier.price}</div>
                    <div className="text-sm opacity-80">{tier.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                      selectedTier === tier.id
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {selectedTier === tier.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Perks */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">Exclusive Perks</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Beyond discounts, enjoy privileges that money can't buy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exclusivePerks.map((perk, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-all duration-500"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <perk.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">{perk.title}</h3>
                  <p className="text-gray-300 font-light leading-relaxed">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Member Experiences</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs mt-1">{testimonial.tier}</Badge>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-light italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">Apply for Membership</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-300 font-light leading-relaxed">Begin your journey into exclusive luxury</p>
          </div>

          <Card className="bg-gray-900 border-gray-800 shadow-2xl">
            <CardContent className="p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Full Name *</label>
                    <Input className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Email Address *</label>
                    <Input type="email" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Phone Number *</label>
                    <Input type="tel" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Membership Tier *</label>
                    <select className="w-full h-12 bg-gray-800 border border-gray-700 text-white rounded-md px-3">
                      <option value="gold">Gold Circle - $2,500/year</option>
                      <option value="platinum">Platinum Elite - $7,500/year</option>
                      <option value="diamond">Diamond Prestige - $15,000/year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Tell us about your jewelry interests and collecting preferences
                  </label>
                  <Textarea
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    placeholder="Share your style preferences, favorite pieces, and what you're looking for in a luxury jewelry experience..."
                  />
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-12 py-4 text-lg font-medium tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/25"
                  >
                    Submit Application
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                  <p className="text-gray-400 text-sm mt-4">
                    Applications are reviewed within 48 hours. You'll receive a personal call from our membership team.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
