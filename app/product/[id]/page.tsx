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
import useSWR, { mutate } from "swr"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const productId = params?.id
  const { data: product, isLoading } = useSWR(productId ? `/api/products/${productId}` : null, fetcher)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  // Fetch user's wishlist to check if product is already in it
  const { data: wishlist } = useSWR(
    session?.user?.email ? '/api/wishlist' : null, 
    fetcher
  )

  const isInWishlist = wishlist?.products?.some((item: any) => item.id === productId)

  const handleAddToCart = async () => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      })
      router.push("/auth/login?callbackUrl=" + encodeURIComponent(window.location.pathname))
      return
    }

    if (!product) return

    setIsAddingToCart(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`,
        })
        // Refresh cart data
        mutate('/api/cart')
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || 'Failed to add to cart',
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: 'Failed to add to cart',
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to manage wishlist",
        variant: "destructive",
      })
      router.push("/auth/login?callbackUrl=" + encodeURIComponent(window.location.pathname))
      return
    }

    if (!product) return

    setIsAddingToWishlist(true)
    try {
      const method = isInWishlist ? 'DELETE' : 'POST'
      const response = await fetch('/api/wishlist', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      })

      if (response.ok) {
        if (isInWishlist) {
          toast({
            title: "Success",
            description: 'Removed from wishlist',
          })
        } else {
          toast({
            title: "Success",
            description: 'Added to wishlist',
          })
        }
        // Refresh wishlist data
        mutate('/api/wishlist')
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || 'Failed to update wishlist',
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: 'Failed to update wishlist',
        variant: "destructive",
      })
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Check out this product',
          text: product?.description || 'Amazing product from Endenaire',
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Success",
          description: 'Link copied to clipboard',
        })
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to copy link',
          variant: "destructive",
        })
      }
    }
  }

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
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-500 text-black">
                  {product.category?.name || 'Luxury'}
                </Badge>
              </div>
            </div>
            {/* Single image display since we only have one image per product */}
            <div className="flex justify-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-yellow-500">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light mb-4 text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-light text-gray-900">${product.price.toLocaleString()}</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {product.category?.name || 'Luxury'}
                </Badge>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Premium quality materials
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Expert craftsmanship
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Lifetime warranty
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                  Free worldwide shipping
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={quantity >= 99}
                  >
                    +
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-3 text-lg disabled:opacity-50"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className={`flex-1 bg-transparent ${isInWishlist ? 'border-red-300 text-red-600 hover:bg-red-50' : ''}`}
                  onClick={handleWishlistToggle}
                  disabled={isAddingToWishlist}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isAddingToWishlist ? 'Updating...' : (isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={handleShare}
                >
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
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Category</span>
                      <span className="text-gray-600">{product.category?.name || 'Luxury'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Price</span>
                      <span className="text-gray-600">${product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Material</span>
                      <span className="text-gray-600">Premium Quality</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Warranty</span>
                      <span className="text-gray-600">Lifetime</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Shipping</span>
                      <span className="text-gray-600">Free Worldwide</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Returns</span>
                      <span className="text-gray-600">30 Days</span>
                    </div>
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
            <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
