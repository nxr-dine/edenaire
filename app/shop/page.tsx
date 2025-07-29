"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Heart, Eye, ShoppingBag, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ClientOnly } from "@/components/client-only"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 100000])

  const { data: products, isLoading } = useSWR("/api/products", fetcher)

  const filteredProducts = products && Array.isArray(products) ? products.filter(
    (product: any) => product && product.price >= priceRange[0] && product.price <= priceRange[1],
  ) : []

  return (
    <ClientOnly>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative h-64 flex items-center justify-center mt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-light mb-4 tracking-wide">Collections</h1>
            <p className="text-xl opacity-90">Discover our exquisite jewelry masterpieces</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="necklaces">Necklaces</SelectItem>
                      <SelectItem value="rings">Rings</SelectItem>
                      <SelectItem value="earrings">Earrings</SelectItem>
                      <SelectItem value="bracelets">Bracelets</SelectItem>
                      <SelectItem value="watches">Watches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={0}
                    step={1000}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-medium mb-3">Sort By</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0} of {products && Array.isArray(products) ? products.length : 0} products
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading products...</div>
              ) : (
                <div className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                  {filteredProducts && Array.isArray(filteredProducts) && filteredProducts.map((product: any) => (
                    <Card
                      key={product.id}
                      className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white"
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "grid" ? "h-80" : "h-64 md:h-48"
                        } ${viewMode === "list" ? "md:w-64" : ""}`}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500 text-black">{product.badge}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <h3 className="text-lg font-medium mb-2 text-gray-900">{product.name}</h3>
                        {viewMode === "list" && <p className="text-gray-600 mb-4">{product.description}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-light text-gray-900">${product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <Link href={`/product/${product.id}`}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ClientOnly>
  )
}
