"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Diamond,
  Crown,
  Package,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientOnly } from "@/components/client-only"
import Image from "next/image"

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTier, setFilterTier] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const products = [
    {
      id: 1,
      name: "Celestial Diamond Necklace",
      sku: "EDN-CEL-001",
      category: "Necklaces",
      tier: "Tier 3",
      price: 45000,
      originalPrice: 52000,
      stock: 12,
      sales: 24,
      revenue: 1080000,
      status: "Active",
      image: "/placeholder.svg?height=80&width=80",
      featured: true,
    },
    {
      id: 2,
      name: "Royal Sapphire Ring",
      sku: "EDR-ROY-004",
      category: "Rings",
      tier: "Tier 2",
      price: 35800,
      originalPrice: 42000,
      stock: 8,
      sales: 18,
      revenue: 644400,
      status: "Active",
      image: "/placeholder.svg?height=80&width=80",
      featured: true,
    },
    {
      id: 3,
      name: "Golden Aurora Earrings",
      sku: "EDE-AUR-003",
      category: "Earrings",
      tier: "Tier 2",
      price: 18200,
      originalPrice: 21500,
      stock: 15,
      sales: 32,
      revenue: 582400,
      status: "Active",
      image: "/placeholder.svg?height=80&width=80",
      featured: false,
    },
    {
      id: 4,
      name: "Heritage Pearl Bracelet",
      sku: "EDB-HER-005",
      category: "Bracelets",
      tier: "Tier 1",
      price: 22400,
      originalPrice: null,
      stock: 25,
      sales: 15,
      revenue: 336000,
      status: "Active",
      image: "/placeholder.svg?height=80&width=80",
      featured: false,
    },
    {
      id: 5,
      name: "Platinum Elegance Watch",
      sku: "EDW-PLA-002",
      category: "Watches",
      tier: "Tier 3",
      price: 28500,
      originalPrice: null,
      stock: 5,
      sales: 8,
      revenue: 228000,
      status: "Low Stock",
      image: "/placeholder.svg?height=80&width=80",
      featured: true,
    },
    {
      id: 6,
      name: "Diamond Eternity Band",
      sku: "EDR-ETE-006",
      category: "Rings",
      tier: "Tier 1",
      price: 15600,
      originalPrice: null,
      stock: 0,
      sales: 42,
      revenue: 655200,
      status: "Out of Stock",
      image: "/placeholder.svg?height=80&width=80",
      featured: false,
    },
  ]

  const stats = [
    {
      title: "Total Products",
      value: "156",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: "$3.5M",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Avg. Product Value",
      value: "$22,436",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return Star
      case "Tier 2":
        return Diamond
      case "Tier 3":
        return Crown
      default:
        return Star
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "bg-gray-100 text-gray-800"
      case "Tier 2":
        return "bg-yellow-100 text-yellow-800"
      case "Tier 3":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-orange-100 text-orange-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === "all" || product.tier === filterTier
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesTier && matchesCategory
  })

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extralight text-gray-900 tracking-wide">Product Management</h1>
              <p className="text-gray-600 font-light">Manage your luxury jewelry collection</p>
            </div>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-light text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterTier} onValueChange={setFilterTier}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Tier 1">Tier 1</SelectItem>
                  <SelectItem value="Tier 2">Tier 2</SelectItem>
                  <SelectItem value="Tier 3">Tier 3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Necklaces">Necklaces</SelectItem>
                  <SelectItem value="Rings">Rings</SelectItem>
                  <SelectItem value="Earrings">Earrings</SelectItem>
                  <SelectItem value="Bracelets">Bracelets</SelectItem>
                  <SelectItem value="Watches">Watches</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-light">Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Sales</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const TierIcon = getTierIcon(product.tier)
                    return (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {product.featured && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">Featured</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-mono text-sm">{product.sku}</td>
                        <td className="py-4 px-4 text-gray-700">{product.category}</td>
                        <td className="py-4 px-4">
                          <Badge className={getTierColor(product.tier)}>
                            <TierIcon className="h-3 w-3 mr-1" />
                            {product.tier}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">${product.price.toLocaleString()}</p>
                            {product.originalPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`font-medium ${
                              product.stock === 0
                                ? "text-red-600"
                                : product.stock < 10
                                  ? "text-orange-600"
                                  : "text-gray-900"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{product.sales}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">${product.revenue.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </ClientOnly>
  )
}
