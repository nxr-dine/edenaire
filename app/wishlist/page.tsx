"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, X, Grid3X3, List, Search, Filter, Share2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ClientOnly } from "@/components/client-only"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("date-added")
  const [filterTier, setFilterTier] = useState("all")

  const { data: wishlist, isLoading } = useSWR("/api/wishlist", fetcher)
  const wishlistItems = wishlist?.products || []

  const filteredItems = wishlistItems.filter((item: any) => {
    if (filterTier === "all") return true
    return item.tier === filterTier
  })

  const getTierColorClasses = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-500 text-black"
      case "purple":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="pt-20 sm:pt-24">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 mr-3" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide">
                  Your Wishlist
                </h1>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Curate your collection of extraordinary pieces and bring your luxury dreams to life
              </p>
              <div className="mt-8">
                <Badge className="bg-yellow-500 text-black px-4 py-2 text-sm font-medium">
                  {filteredItems.length} Items Saved
                </Badge>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="py-6 sm:py-8 px-4 sm:px-6 bg-white border-b">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search your wishlist..."
                      className="pl-10 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <Select value={filterTier} onValueChange={setFilterTier}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="Iconic Collection">Iconic Collection</SelectItem>
                      <SelectItem value="Prestige Collection">Prestige Collection</SelectItem>
                      <SelectItem value="Ultra-Exclusive">Ultra-Exclusive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 sm:w-48 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-added">Date Added</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none border-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none border-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Wishlist Items */}
          <section className="py-8 sm:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <div className="text-center py-16 sm:py-20 text-gray-500">Loading wishlist...</div>
              ) : filteredItems.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16 sm:py-20">
                  <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Discover our exquisite collections and save your favorite pieces for later
                  </p>
                  <Link href="/shop">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-3">
                      Explore Collections
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
                      : "space-y-4 sm:space-y-6"
                  }
                >
                  {filteredItems.map((item: any) => (
                    <Card
                      key={item.id}
                      className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "w-full sm:w-48 h-48 sm:h-32 flex-shrink-0" : "h-64 sm:h-80"
                        }`}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Stock Status */}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary" className="bg-red-500 text-white">
                              Out of Stock
                            </Badge>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Tier Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${getTierColorClasses(item.tierColor)} text-xs font-medium`}>
                            {item.tier}
                          </Badge>
                        </div>

                        {/* Discount Badge */}
                        {item.discount && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-red-500 text-white text-xs font-medium">-{item.discount}%</Badge>
                          </div>
                        )}
                      </div>

                      <CardContent
                        className={`p-4 sm:p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}
                      >
                        <div className="mb-4">
                          <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xl sm:text-2xl font-light text-gray-900">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span>Added: {new Date(item.dateAdded).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className={item.inStock ? "text-green-600" : "text-red-600"}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                          {item.inStock && (
                            <p className="text-sm text-gray-600">Estimated delivery: {item.estimatedDelivery}</p>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Button
                            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                            disabled={!item.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3 border-gray-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Recommendations */}
          {filteredItems.length > 0 && (
            <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-100">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-900 mb-4">
                    You Might Also Like
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Based on your wishlist, we've curated these exceptional pieces just for you
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=300&width=300&query=luxury jewelry recommendation ${i}`}
                          alt={`Recommendation ${i}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-light text-gray-900 mb-2">Recommended Piece {i}</h3>
                        <p className="text-lg font-light text-gray-900">${(15000 + i * 5000).toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <Footer />
      </div>
    </ClientOnly>
  )
}
