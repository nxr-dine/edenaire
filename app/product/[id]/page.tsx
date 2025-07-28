"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingBag, Share2, Shield, Truck, RotateCcw, Award } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import useSWR from "swr"
import { useParams } from "next/navigation"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductPage() {
  const params = useParams()
  const productId = params?.id
  const { data: product, isLoading } = useSWR(productId ? `/api/products/${productId}` : null, fetcher)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Optionally, fetch related products based on category or similar property
  // const { data: relatedProducts } = useSWR(product?.categoryId ? `/api/products?categoryId=${product.categoryId}` : null, fetcher)

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading product...</div>
  }
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found.</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-500 text-black">{product.badge}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-yellow-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light mb-4 text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-light text-gray-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  Save ${(product.originalPrice! - product.price).toLocaleString()}
                </Badge>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <Button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-3 text-lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Lifetime Warranty</p>
                  <p className="text-xs text-gray-600">Guaranteed craftsmanship</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">Worldwide delivery</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">30-Day Returns</p>
                  <p className="text-xs text-gray-600">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Certified Authentic</p>
                  <p className="text-xs text-gray-600">With certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Jewelry Care Instructions</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li>• Store in the provided luxury jewelry box when not wearing</li>
                      <li>• Clean gently with a soft, lint-free cloth</li>
                      <li>• Avoid contact with perfumes, lotions, and harsh chemicals</li>
                      <li>• Remove before swimming, showering, or exercising</li>
                      <li>• Have professionally cleaned and inspected annually</li>
                      <li>• Contact our concierge for professional cleaning services</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-light mb-8 text-center">Complete the Collection</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* relatedProducts.map((product) => ( */}
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-light">${product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            {/* ))} */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
