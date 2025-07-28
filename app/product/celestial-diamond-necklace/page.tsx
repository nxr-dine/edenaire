"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Shield, Truck, RotateCcw, Award, Diamond, Crown, Sparkles } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CelestialDiamondNecklacePage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: "Celestial Diamond Necklace",
    price: 45000,
    originalPrice: 52000,
    
    badge: "Limited Edition",
    sku: "EDN-CEL-001",
    description:
      "An extraordinary masterpiece from our Celestial Collection, this diamond necklace captures the ethereal beauty of a starlit sky. Each diamond is meticulously hand-selected and arranged in a constellation pattern that seems to dance with light. The celestial-cut diamonds, exclusive to Edenaire, create an unprecedented brilliance that transforms the wearer into a vision of celestial elegance.",
    longDescription:
      "Crafted in our Geneva atelier over 45 days, this necklace represents the pinnacle of our artisanal expertise. The central constellation features a rare 2.5-carat celestial-cut diamond, surrounded by 18 smaller diamonds that create a mesmerizing play of light. The 18k white gold setting is hand-forged using techniques passed down through generations of master jewelers.",
    features: [
      "18k White Gold Setting with Rhodium Plating",
      "5.2 Carat Total Diamond Weight (VVS1-VS1 Clarity)",
      "Exclusive Celestial-Cut Center Diamond (2.5ct)",
      "18 Accent Diamonds in Constellation Pattern",
      "Adjustable 16-18 inch Venetian Chain",
      "Handcrafted in Geneva, Switzerland",
      "Lifetime Warranty & Annual Maintenance",
      "Certificate of Authenticity Included",
    ],
    specifications: {
      "Metal Type": "18k White Gold",
      "Primary Stone": "Diamond (Celestial Cut)",
      "Total Carat Weight": "5.2 ct",
      "Center Stone": "2.5 ct (VVS1)",
      "Accent Stones": "18 diamonds (2.7 ct total)",
      "Chain Length": "16-18 inches (adjustable)",
      "Clasp Type": "Secure Lobster Clasp with Safety Chain",
      Origin: "Geneva, Switzerland",
      "Crafting Time": "45 days",
      "Limited Edition": "Only 50 pieces worldwide",
    },
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Celestial Diamond Earrings",
      price: 28500,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 3,
      name: "Celestial Diamond Bracelet",
      price: 32000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 4,
      name: "Celestial Diamond Ring",
      price: 18200,
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
            alt="Luxury Black Marble Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          {/* Animated Stars */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <div
              className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
          {/* Product Content */}
          <div className="text-white">
            <div className="mb-8">
              <Badge className="bg-yellow-500 text-black mb-4 px-4 py-2 text-sm font-medium tracking-wide">
                LIMITED EDITION • ONLY 50 PIECES
              </Badge>

            </div>

            <h1 className="text-6xl md:text-7xl font-extralight mb-6 tracking-wider bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Celestial Diamond Necklace
            </h1>

            <p className="text-2xl md:text-3xl mb-8 font-light tracking-wide text-yellow-200">
              Where Stars Meet Elegance
            </p>

            <p className="text-lg mb-8 opacity-90 leading-relaxed font-light max-w-lg">{product.description}</p>

            <div className="flex items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-light text-yellow-400">${product.price.toLocaleString()}</div>
                <div className="text-sm text-gray-300 line-through">${product.originalPrice.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-yellow-400">5.2</div>
                <div className="text-sm text-gray-300">Total Carats</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-yellow-400">45</div>
                <div className="text-sm text-gray-300">Days to Craft</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
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
              <div className="absolute inset-0 ring-2 ring-yellow-400/30 rounded-2xl" />

              {/* Sparkle Effects */}
              <div className="absolute inset-0">
                <Sparkles className="absolute top-8 right-8 h-6 w-6 text-yellow-400 animate-pulse" />
                <Sparkles
                  className="absolute bottom-12 left-8 h-4 w-4 text-white animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <Diamond
                  className="absolute top-1/2 right-12 h-5 w-5 text-yellow-300 animate-pulse"
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extralight mb-8 text-gray-900 tracking-wide">Celestial Artistry</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">{product.longDescription}</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Diamond className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Exclusive Celestial Cut</h4>
                    <p className="text-gray-600 font-light">
                      Our proprietary celestial cut maximizes brilliance and fire, creating a diamond that outshines
                      traditional cuts by 40%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Crown className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Master Craftsmanship</h4>
                    <p className="text-gray-600 font-light">
                      Hand-forged by our master jewelers in Geneva, each piece requires 45 days of meticulous
                      craftsmanship.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Lifetime Legacy</h4>
                    <p className="text-gray-600 font-light">
                      Comprehensive lifetime warranty with annual maintenance, ensuring your piece remains pristine for
                      generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-light mb-8 text-yellow-400">Technical Specifications</h3>
              <div className="space-y-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-gray-300 font-light">{key}</span>
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
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Exceptional Features</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-gray-700 font-light leading-relaxed">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Complete the Collection */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">
              Complete the Celestial Collection
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Create a constellation of elegance with matching pieces from our exclusive Celestial Collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden bg-gray-900 hover:bg-gray-800"
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
                    <Badge className="bg-yellow-500 text-black font-medium">{product.badge}</Badge>
                  </div>
                  <div className="absolute inset-0">
                    <Sparkles className="absolute top-8 right-8 h-5 w-5 text-yellow-400 animate-pulse" />
                    <Sparkles
                      className="absolute bottom-12 left-8 h-4 w-4 text-white animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
                <CardContent className="p-8 text-white">
                  <h3 className="text-xl font-light mb-4 tracking-wide">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-yellow-400">${product.price.toLocaleString()}</span>
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

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-yellow-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Lifetime Warranty</h4>
              <p className="text-sm text-gray-600 font-light">Guaranteed craftsmanship</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-yellow-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Free Worldwide Shipping</h4>
              <p className="text-sm text-gray-600 font-light">White-glove delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-12 w-12 text-yellow-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">30-Day Returns</h4>
              <p className="text-sm text-gray-600 font-light">Hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-yellow-500 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Certified Authentic</h4>
              <p className="text-sm text-gray-600 font-light">With certificate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
