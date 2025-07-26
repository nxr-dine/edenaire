"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingBag, Shield, Truck, RotateCcw, Award, Gem, Crown, Sparkles } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RoyalSapphireRingPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("7")

  const product = {
    id: 4,
    name: "Royal Sapphire Ring",
    price: 35800,
    originalPrice: 42000,
    rating: 5,
    reviews: 18,
    badge: "Exclusive",
    sku: "EDR-ROY-004",
    description:
      "A magnificent testament to royal elegance, this sapphire ring features a rare Ceylon sapphire of exceptional color and clarity. The deep cornflower blue stone is surrounded by a halo of brilliant-cut diamonds, creating a piece worthy of royalty.",
    longDescription:
      "This extraordinary ring showcases a 4.2-carat Ceylon sapphire, renowned for its vivid cornflower blue color and exceptional transparency. The sapphire is ethically sourced from the legendary mines of Sri Lanka and has been certified by the Gübelin Gem Lab. The surrounding diamond pavé setting amplifies the sapphire's natural beauty while the platinum band ensures lasting durability.",
    features: [
      "4.2 Carat Ceylon Sapphire (Cornflower Blue)",
      "Platinum 950 Setting with Rhodium Finish",
      "Diamond Pavé Halo (1.8 ct total weight)",
      "Gübelin Certified Sapphire",
      "Ethically Sourced Gemstones",
      "Hand-Engraved Band Details",
      "Comfort Fit Interior",
      "Lifetime Warranty & Resizing",
    ],
    specifications: {
      "Center Stone": "Ceylon Sapphire (4.2 ct)",
      "Sapphire Color": "Cornflower Blue",
      "Sapphire Clarity": "VVS",
      "Metal Type": "Platinum 950",
      "Diamond Weight": "1.8 ct (Pavé Setting)",
      "Diamond Quality": "F-G Color, VS1-VS2 Clarity",
      "Ring Width": "12mm at center",
      "Available Sizes": "4-12 (including half sizes)",
      Certification: "Gübelin Gem Lab",
      Origin: "Sri Lanka (Sapphire)",
    },
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
  }

  const sizes = [
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
  ]

  const relatedProducts = [
    {
      id: 5,
      name: "Royal Sapphire Earrings",
      price: 28500,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 6,
      name: "Royal Sapphire Necklace",
      price: 65000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Matching Set",
    },
    {
      id: 7,
      name: "Royal Sapphire Bracelet",
      price: 42000,
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
            alt="Royal Blue Velvet Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-black/80" />

          {/* Royal Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400/30 rotate-45 animate-pulse" />
            <div className="absolute bottom-32 right-32 w-24 h-24 border border-blue-400/20 rotate-12" />
            <Crown className="absolute top-1/4 right-1/4 h-8 w-8 text-yellow-400/30 animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
          {/* Product Content */}
          <div className="text-white">
            <div className="mb-8">
              <Badge className="bg-blue-600 text-white mb-4 px-4 py-2 text-sm font-medium tracking-wide">
                EXCLUSIVE • GÜBELIN CERTIFIED
              </Badge>
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-300">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-extralight mb-6 tracking-wider bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Royal Sapphire Ring
            </h1>

            <p className="text-2xl md:text-3xl mb-8 font-light tracking-wide text-blue-200">
              Crowned in Cornflower Blue
            </p>

            <p className="text-lg mb-8 opacity-90 leading-relaxed font-light max-w-lg">{product.description}</p>

            <div className="flex items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-light text-yellow-400">${product.price.toLocaleString()}</div>
                <div className="text-sm text-gray-300 line-through">${product.originalPrice.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-blue-300">4.2</div>
                <div className="text-sm text-gray-300">Carat Sapphire</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-blue-300">1.8</div>
                <div className="text-sm text-gray-300">Carat Diamonds</div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-white">Select Ring Size</h3>
              <div className="grid grid-cols-6 gap-2 max-w-md">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-2 text-sm border rounded transition-all duration-300 ${
                      selectedSize === size
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-white/30 text-white hover:border-white/60"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-300 mt-2">Free resizing within 30 days</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-medium px-12 py-6 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
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
              <div className="absolute inset-0 ring-2 ring-blue-400/30 rounded-2xl" />

              {/* Royal Effects */}
              <div className="absolute inset-0">
                <Crown className="absolute top-8 right-8 h-6 w-6 text-yellow-400 animate-pulse" />
                <Gem
                  className="absolute bottom-12 left-8 h-5 w-5 text-blue-300 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <Sparkles
                  className="absolute top-1/2 right-12 h-4 w-4 text-white animate-pulse"
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
                    selectedImage === index ? "border-blue-400 scale-110" : "border-white/30 hover:border-white/60"
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
              <h2 className="text-4xl font-extralight mb-8 text-gray-900 tracking-wide">Royal Heritage</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">{product.longDescription}</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gem className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Ceylon Sapphire Excellence</h4>
                    <p className="text-gray-600 font-light">
                      Sourced from the legendary mines of Sri Lanka, this cornflower blue sapphire represents the
                      pinnacle of natural beauty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Crown className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Gübelin Certification</h4>
                    <p className="text-gray-600 font-light">
                      Certified by the world's most prestigious gemological laboratory, ensuring authenticity and
                      quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-gray-900">Platinum Perfection</h4>
                    <p className="text-gray-600 font-light">
                      Crafted in platinum 950, the most precious and durable metal, ensuring your ring lasts for
                      generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-black rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-light mb-8 text-blue-300">Gemological Details</h3>
              <div className="space-y-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-blue-700/50 pb-4">
                    <span className="text-blue-200 font-light">{key}</span>
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
            <h2 className="text-5xl font-extralight mb-8 text-gray-900 tracking-wide">Royal Features</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-light leading-relaxed">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the Collection */}
      <section className="py-32 px-6 bg-gradient-to-b from-blue-900 via-blue-800 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight mb-8 text-white tracking-wide">Complete the Royal Collection</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8" />
            <p className="text-xl text-blue-200 max-w-3xl mx-auto font-light leading-relaxed">
              Create a royal ensemble with matching pieces from our exclusive Royal Sapphire Collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden bg-blue-900/50 hover:bg-blue-800/50 backdrop-blur-sm"
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
                    <Badge className="bg-blue-600 text-white font-medium">{product.badge}</Badge>
                  </div>
                  <div className="absolute inset-0">
                    <Crown className="absolute top-8 right-8 h-5 w-5 text-yellow-400 animate-pulse" />
                    <Gem
                      className="absolute bottom-12 left-8 h-4 w-4 text-blue-300 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
                <CardContent className="p-8 text-white">
                  <h3 className="text-xl font-light mb-4 tracking-wide">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-blue-300">${product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Lifetime Warranty</h4>
              <p className="text-sm text-gray-600 font-light">Guaranteed craftsmanship</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Free Worldwide Shipping</h4>
              <p className="text-sm text-gray-600 font-light">Insured delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">30-Day Returns</h4>
              <p className="text-sm text-gray-600 font-light">Hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <h4 className="font-medium text-gray-900 mb-2">Gübelin Certified</h4>
              <p className="text-sm text-gray-600 font-light">Authenticity guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
