"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Star, Shield, Truck, Award, Users, Globe, Heart, ShoppingBag, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { ClientOnly } from "@/components/client-only"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

const tiers = [
  {
    name: "Iconic Collection",
    subtitle: "Essential Luxury",
    price: "Free",
    description: "Access to our curated selection of timeless pieces",
    features: [
      "Curated jewelry collection",
      "Standard customer support",
      "Basic product information",
      "Regular promotions",
    ],
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gray-50",
    textColor: "text-gray-900",
    buttonColor: "bg-gray-900 hover:bg-gray-800",
    tier: "iconic",
  },
  {
    name: "Prestige Collection",
    subtitle: "Elevated Experience",
    price: "$199/month",
    description: "Premium access with exclusive benefits and priority service",
    features: [
      "Everything in Iconic Collection",
      "15% discount on all purchases",
      "Priority customer support",
      "Early access to new collections",
      "Complimentary jewelry cleaning",
      "Express shipping",
    ],
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-900",
    buttonColor: "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
    popular: true,
    tier: "Prestige Collection",
  },
  {
    name: "Ultra-Exclusive",
    subtitle: "Unparalleled Luxury",
    price: "$299/month",
    description: "The ultimate luxury experience with white-glove service",
    features: [
      "Everything in Prestige Collection",
      "25% discount on all purchases",
      "Dedicated personal concierge",
      "Exclusive limited edition pieces",
      "Private showroom appointments",
      "Custom jewelry design service",
      "Complimentary worldwide shipping",
      "Annual jewelry appraisal",
    ],
    color: "from-purple-600 to-indigo-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-900",
    buttonColor: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
    tier: "Ultra-Exclusive",
  },
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroImages = [
    "/background.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const { data: products, isLoading } = useSWR("/api/products", fetcher)

  // Filter for featured products (e.g., those with a badge or featured property)
  const featuredProducts = products && Array.isArray(products) ? products.filter(
    (product: any) => product && (product.badge || product.featured)
  ).slice(0, 4) : []

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "iconic":
        return "border-gray-300 bg-gray-50"
      case "prestige":
        return "border-yellow-300 bg-yellow-50"
      case "ultra-exclusive":
        return "border-purple-300 bg-purple-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ClientOnly>
        <Header />
      </ClientOnly>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {heroImages && Array.isArray(heroImages) && heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Hero ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 tracking-wide">
            Timeless <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Elegance</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our exquisite collection of handcrafted jewelry, where each piece tells a story of luxury and
            sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/shop">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-medium px-8 py-3 text-lg">
                Explore Collection
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/subscription">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg bg-transparent"
              >
                View Memberships
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-gray-900">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
                Collection
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that embody the essence of luxury and craftsmanship
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading featured products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredProducts && Array.isArray(featuredProducts) && featuredProducts.map((product: any) => (
                <Card
                  key={product.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${getTierColor(
                    product.tier,
                  )}`}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                          {product.badge}
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                        <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Link href={`/product/${product.slug}`}>
                          <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl sm:text-2xl font-light text-gray-900">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3">
                View All Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tier Showcase */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/5 to-purple-600/5 rounded-full blur-3xl animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-white">
              Membership{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-600">
                Tiers
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your level of luxury and unlock exclusive benefits tailored to your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {tiers && Array.isArray(tiers) && tiers.map((tier, index) => (
              <Card
                key={tier.name}
                className={`relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  tier.popular
                    ? "ring-2 ring-yellow-400 shadow-2xl shadow-yellow-400/20"
                    : "hover:ring-2 hover:ring-white/20"
                } bg-white/5 backdrop-blur-sm border-white/10`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <CardContent className="p-6 sm:p-8 text-white">
                  <div className={`mb-6 ${tier.popular ? "mt-4" : ""}`}>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-center mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-center mb-4">{tier.subtitle}</p>
                    <div className="text-center mb-6">
                      <span className="text-3xl sm:text-4xl font-light">{tier.price}</span>
                      {tier.price !== "Free" && <span className="text-gray-400 ml-1">/month</span>}
                    </div>
                    <p className="text-gray-300 text-center text-sm mb-6">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features && Array.isArray(tier.features) && tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/subscription" className="block">
                    <Button
                      className={`w-full ${tier.buttonColor} text-white font-medium py-3 transition-all duration-300`}
                    >
                      {tier.price === "Free" ? "Get Started" : "Choose Plan"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/subscription">
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 bg-transparent"
              >
                Compare All Plans
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-gray-900">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
                  Edenaire
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For over three decades, Edenaire has been synonymous with exceptional craftsmanship and timeless
                elegance. Our master artisans combine traditional techniques with contemporary design to create jewelry
                that transcends trends.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Each piece in our collection is meticulously crafted using only the finest materials - from ethically
                sourced diamonds to precious metals that meet the highest standards of purity and quality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Lifetime Warranty</h3>
                    <p className="text-sm text-gray-600">Every piece comes with our comprehensive lifetime warranty</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Master Craftsmanship</h3>
                    <p className="text-sm text-gray-600">Handcrafted by skilled artisans with decades of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Ethical Sourcing</h3>
                    <p className="text-sm text-gray-600">Responsibly sourced materials from trusted suppliers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Personal Service</h3>
                    <p className="text-sm text-gray-600">Dedicated concierge service for all our valued clients</p>
                  </div>
                </div>
              </div>

              <Link href="/about">
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3">
                  Learn More About Us
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Artisan+Crafting"
                    alt="Master artisan at work"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg object-cover w-full h-48"
                  />
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Luxury+Workshop"
                    alt="Luxury workshop"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg object-cover w-full h-32"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Diamond+Selection"
                    alt="Diamond selection process"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg object-cover w-full h-32"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Finished+Jewelry"
                    alt="Finished jewelry pieces"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg object-cover w-full h-48"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-gray-900">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
                Edenaire
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference that comes with choosing a heritage brand committed to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Lifetime Guarantee</h3>
              <p className="text-gray-600">
                Every piece comes with our comprehensive lifetime warranty and free maintenance service.
              </p>
            </Card>

            <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">
                Complimentary worldwide shipping with secure, insured delivery on all orders.
              </p>
            </Card>

            <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Handcrafted by master artisans with over 30 years of experience in fine jewelry.
              </p>
            </Card>

            <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Personal Concierge</h3>
              <p className="text-gray-600">
                Dedicated personal service to help you find the perfect piece for any occasion.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-gray-900">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
                Clients Say
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why thousands of customers trust Edenaire for their most precious moments
            </p>
          </div>
          <ClientOnly>
            <TestimonialCarousel />
          </ClientOnly>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            Ready to Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Piece?
            </span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-gray-300 max-w-2xl mx-auto">
            Explore our exclusive collection and discover jewelry that will be treasured for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/shop">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-medium px-8 py-3 text-lg">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg bg-transparent"
              >
                Join VIP Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  )
}
