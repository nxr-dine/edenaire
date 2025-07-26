"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingBag, Shield, Truck, RotateCcw, Award, Gem, Sun, Sparkles } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function GoldenAuroraEarringsPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const product = {
    id: 3,
    name: "Golden Aurora Earrings",
    price: 18200,
    originalPrice: 21500,
    rating: 5,
    reviews: 32,
    badge: "New Arrival",
    sku: "EDE-AUR-003",
    description:
      "Inspired by the ethereal beauty of the aurora borealis, these exquisite earrings capture the dancing lights of the northern sky. Each aurora-cut gemstone displays a mesmerizing play of colors that shift and shimmer with every movement.",
    longDescription:
      "These extraordinary earrings showcase our exclusive aurora-cut gemstones, a revolutionary cutting technique that creates an unprecedented display of spectral colors. Set in 18k rose gold with delicate milgrain detailing, each earring features a 2.1-carat aurora-cut tourmaline that exhibits the full spectrum of colors found in nature's most beautiful light show.",
    features: [
      "18k Rose Gold Setting with Milgrain Details",
      "Aurora-Cut Tourmalines (2.1 ct each)",
      "Exclusive Edenaire Cut Technology",
      "Full Spectrum Color Display",
      "Secure Lever-Back Closures",
      "Hand-Finished in Geneva",
      "Hypoallergenic Materials",
      "Lifetime Warranty Included",
    ],
    specifications: {
      "Metal Type": "18k Rose Gold",
      "Primary Stones": "Aurora-Cut Tourmalines",
      "Stone Weight": "4.2 ct total (2.1 ct each)",
      "Stone Origin": "Brazil (Paraíba)",
      "Cut Type": "Exclusive Aurora Cut",
      "Earring Length": "18mm",
      "Earring Width": "12mm",
      "Closure Type": "Secure Lever-Back",
      Finish: "High Polish with Milgrain",
      "Crafting Location": "Geneva, Switzerland",
    },
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
  }

  const relatedProducts = [
    {
      id: 8,
      name: "Golden Aurora Necklace",
      price: 32500,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 9,
      name: "Golden Aurora Ring",
      price: 15800,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 10,
      name: "Golden Aurora Bracelet",
      price: 24200,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
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
            alt="Aurora Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-800/60 to-orange-900/80" />

          {/* Aurora Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 animate-pulse" />
            <div className="absolute top-20 left-20 w-32 h-32 border border-orange-400/30 rotate-45 animate-pulse" />
            <div className="absolute bottom-32 right-32 w-24 h-24 border border-pink-400/20 rotate-12" />
            <Sun className="absolute top-1/4 right-1/4 h-8 w-8 text-orange-400/30 animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
          {/* Product Content */}
          <div className="text-white">
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white mb-4 px-4 py-2 text-sm font-medium tracking-wide">
                NEW ARRIVAL • AURORA CUT
              </Badge>
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-300">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-extralight mb-6 tracking-wider bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
              Golden Aurora Earrings
            </h1>

            <p className="text-2xl md:text-3xl mb-8 font-light tracking-wide text-orange-200">
              Dancing Lights of Nature
            </p>

            <p className="text-lg mb-8 opacity-90 leading-relaxed font-light max-w-lg">{product.description}</p>

            <div className="flex items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-light text-orange-400">${product.price.toLocaleString()}</div>
                <div className="text-sm text-gray-300 line-through">${product.originalPrice.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-pink-300">4.2</div>
                <div className="text-sm text-gray-300">Total Carats</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-300">18k</div>
                <div className="text-sm text-gray-300">Rose Gold</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg transition-all duration-500 bg-transparent backdrop-blur-sm"
              >
                <Heart className="mr-3 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute inset-0 ring-2 ring-orange-400/30 rounded-2xl" />

              {/* Aurora Effects */}
              <div className="absolute inset-0">
                <Sun className="absolute top-8 right-8 h-6 w-6 text-orange-400 animate-pulse" />
                <Sparkles
                  className="absolute bottom-12 left-8 h-5 w-5 text-pink-300 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <Gem
                  className="absolute top-1/2 right-12 h-4 w-4 text-purple-300 animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex justify-center space-x-4 mt-6">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-orange-400 scale-110" : "border-white/30 hover:border-white/60"
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extralight mb-8 text-gray-900 tracking-wide">Aurora Brilliance</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">{product.longDescription}</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sun className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Aurora Cut Technology</h4>
                    <p className="text-gray-600 font-light">
                      Our revolutionary cutting technique creates a full spectrum of colors that dance and shift with
                      light.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gem className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Paraíba Tourmalines</h4>
                    <p className="text-gray-600 font-light">
                      Sourced from the legendary mines of Brazil, these tourmalines exhibit exceptional color and
                      clarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Rose Gold Elegance</h4>
                    <p className="text-gray-600 font-light">
                      18k rose gold provides the perfect warm backdrop to enhance the aurora stones' natural beauty.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900 via-pink-900 to-purple-900 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-light mb-8 text-orange-300">Technical Specifications</h3>
              <div className="space-y-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-orange-700/50 pb-4">
                    <span className="text-orange-200 font-light">{key}</span>
                    <span className="font-light text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Aurora Features</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-light leading-relaxed">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the Collection */}
      <section className="py-32 px-6 bg-gradient-to-b from-orange-900 via-pink-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">Complete the Aurora Collection</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mx-auto mb-8" />
            <p className="text-xl text-orange-200 max-w-3xl mx-auto font-light leading-relaxed">
              Create your own aurora with matching pieces from our exclusive Golden Aurora Collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden bg-orange-900/50 hover:bg-orange-800/50 backdrop-blur-sm"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0">
                    <Sun className="absolute top-8 right-8 h-5 w-5 text-orange-400 animate-pulse" />
                    <Sparkles
                      className="absolute bottom-12 left-8 h-4 w-4 text-pink-300 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
                <CardContent className="p-8 text-white">
                  <h3 className="text-xl font-light mb-4 tracking-wide">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-orange-300">${product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-orange-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Lifetime Warranty</h4>
              <p className="text-sm text-gray-600 font-light">Guaranteed craftsmanship</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-orange-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Free Worldwide Shipping</h4>
              <p className="text-sm text-gray-600 font-light">Secure delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-12 w-12 text-orange-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">30-Day Returns</h4>
              <p className="text-sm text-gray-600 font-light">Hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-orange-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Aurora Cut Exclusive</h4>
              <p className="text-sm text-gray-600 font-light">Unique to Edenaire</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
