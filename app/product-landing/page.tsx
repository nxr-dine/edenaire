"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Shield, Award, Gem, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductLandingPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
  ]

  const reviews = [
    {
      name: "Catherine Beaumont",
      rating: 5,
      comment:
        "The Edenaire Prestige exceeded every expectation. The craftsmanship is absolutely flawless, and the attention to detail is remarkable. This piece has become the centerpiece of my collection.",
      verified: true,
      location: "Monaco",
    },
    {
      name: "James Whitmore",
      rating: 5,
      comment:
        "Purchased this as an anniversary gift for my wife. The quality is exceptional, and the personal service from Edenaire was outstanding. Worth every penny.",
      verified: true,
      location: "London",
    },
    {
      name: "Maria Santos",
      rating: 5,
      comment:
        "As a jewelry collector, I can confidently say this is one of the finest pieces I own. The materials, the design, the execution - everything is perfect.",
      verified: true,
      location: "São Paulo",
    },
  ]

  const relatedProducts = [
    {
      id: 1,
      name: "Edenaire Elite",
      price: "$32,500",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Edenaire Signature",
      price: "$28,900",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Limited",
    },
    {
      id: 3,
      name: "Edenaire Classic",
      price: "$24,200",
      image: "/placeholder.svg?height=300&width=300",
      badge: "Heritage",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Black Marble Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Luxury Black Marble Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          {/* Gold Accent Elements */}
          <div className="absolute top-32 left-32 w-40 h-40 border border-yellow-400/20 rotate-45 animate-pulse" />
          <div className="absolute bottom-40 right-40 w-32 h-32 border border-yellow-400/15 rotate-12" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
          {/* Product Content */}
          <div className="text-white">
            <Badge className="bg-yellow-500 text-black mb-6 px-4 py-2 text-sm font-medium tracking-wide">
              LIMITED EDITION • HANDCRAFTED
            </Badge>

            <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wider bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Edenaire Prestige
            </h1>

            <p className="text-2xl md:text-3xl mb-8 font-light tracking-wide text-yellow-200">
              Crafted to Define Presence
            </p>

            <p className="text-lg mb-8 opacity-90 leading-relaxed font-light max-w-lg">
              A masterpiece of unparalleled artistry, featuring rare gemstones and precious metals, meticulously crafted
              by our master jewelers in Geneva. Only 50 pieces will ever be created.
            </p>

            <div className="flex items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-light text-yellow-400">$89,500</div>
                <div className="text-sm text-gray-300">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-yellow-400">50</div>
                <div className="text-sm text-gray-300">Pieces Only</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-yellow-400">30</div>
                <div className="text-sm text-gray-300">Days to Craft</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
              >
                Reserve Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg transition-all duration-500 bg-transparent backdrop-blur-sm"
              >
                Schedule Private Viewing
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt="Edenaire Prestige"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute inset-0 ring-2 ring-yellow-400/30 rounded-2xl" />
            </div>

            {/* Image Thumbnails */}
            <div className="flex justify-center space-x-4 mt-6">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-yellow-400 scale-110" : "border-white/30 hover:border-white/60"
                  }`}
                >
                  <Image src={image || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Exceptional Details</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-light mb-8 text-gray-900">Crafted for Perfection</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                The Edenaire Prestige represents the pinnacle of our artisanal expertise. Each piece is individually
                crafted over 30 days by our master jewelers, using techniques passed down through generations combined
                with modern precision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gem className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Premium Materials</h4>
                    <p className="text-gray-600 font-light">
                      18k gold setting with conflict-free diamonds and rare gemstones sourced from our trusted partners
                      worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Master Craftsmanship</h4>
                    <p className="text-gray-600 font-light">
                      Hand-finished by certified master jewelers with over 20 years of experience in luxury jewelry
                      creation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Lifetime Guarantee</h4>
                    <p className="text-gray-600 font-light">
                      Comprehensive lifetime warranty covering craftsmanship, with complimentary annual maintenance and
                      cleaning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Limited Edition</h4>
                    <p className="text-gray-600 font-light">
                      Only 50 pieces will ever be created, each individually numbered and accompanied by a certificate
                      of authenticity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-light mb-8 text-yellow-400">Specifications</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Metal</span>
                  <span className="font-light">18k White Gold</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Primary Stone</span>
                  <span className="font-light">3.2ct Diamond (VVS1)</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Accent Stones</span>
                  <span className="font-light">24 Diamonds (0.8ct total)</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Setting Style</span>
                  <span className="font-light">Pavé with Halo</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Dimensions</span>
                  <span className="font-light">18mm x 12mm</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Weight</span>
                  <span className="font-light">8.5 grams</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Origin</span>
                  <span className="font-light">Geneva, Switzerland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Client Testimonials</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-2xl font-light text-gray-900 ml-4">5.0</span>
            </div>
            <p className="text-lg text-gray-600 font-light">Based on 47 verified reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed font-light italic">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                    {review.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Verified Purchase</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pairs Well With Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Pairs Well With</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Complete your collection with these complementary pieces from our exclusive range
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden bg-white hover:bg-gray-50"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-yellow-500 text-black font-medium">{product.badge}</Badge>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-10 w-10 p-0 bg-white/95 hover:bg-white shadow-lg"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-light mb-4 text-gray-900 tracking-wide">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-gray-900">{product.price}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">Reserve Your Edenaire Prestige</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed">
            Only 50 pieces will ever be created. Secure your place in Edenaire's legacy with a fully refundable
            reservation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
            >
              Reserve Now - $5,000 Deposit
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg transition-all duration-500 bg-transparent"
            >
              Speak to a Concierge
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Fully Refundable</h4>
              <p className="text-gray-400 text-sm font-light">30-day money-back guarantee</p>
            </div>
            <div>
              <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Certified Authentic</h4>
              <p className="text-gray-400 text-sm font-light">With certificate of authenticity</p>
            </div>
            <div>
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Personal Delivery</h4>
              <p className="text-gray-400 text-sm font-light">White-glove delivery service</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
