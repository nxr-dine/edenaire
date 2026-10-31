"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Package,
  Heart,
  Settings,
  Crown,
  Diamond,
  Star,
  Download,
  Eye,
  Shield,
  Bell,
  LogOut,
  Calendar,
  DollarSign,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import useSWR from "swr"
import { useToast } from "@/hooks/use-toast"
import { PasswordChangeModal } from "@/components/password-change-modal"
import { DeleteAccountModal } from "@/components/delete-account-modal"
import { mutate } from "swr"
import { useAuth } from "@/contexts/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const fetcher = (url: string) => fetch(url).then(res => res.json())

// SWR configuration to prevent constant refetching
const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
  refreshInterval: 0, // No auto refresh
}

const demoProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "",
  address: "",
  memberSince: "Today",
  tierColor: "yellow",
  currentTier: "Iconic",
  totalSpent: 0,
  nextTier: "Prestige Collection",
  tierProgress: 0,
}

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const { isAuthenticated, isDemoUser, isLoading: loadingAuth, logout, refreshUser } = useAuth()

  // Settings state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isUpdatingSubscription, setIsUpdatingSubscription] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      router.replace("/auth/login")
    }
  }, [isAuthenticated, loadingAuth, router])

  const { data: apiProfile, isLoading: loadingProfile } = useSWR(isDemoUser || !isAuthenticated ? null : "/api/account", fetcher, swrOptions)
  const { data: orders, isLoading: loadingOrders } = useSWR(isDemoUser || !isAuthenticated ? null : "/api/orders", fetcher, swrOptions)
  const { data: wishlist, isLoading: loadingWishlist } = useSWR(isDemoUser || !isAuthenticated ? null : "/api/wishlist", fetcher, swrOptions)
  const { data: subscriptionData, isLoading: loadingSubscription } = useSWR(isDemoUser || !isAuthenticated ? null : "/api/subscription", fetcher, swrOptions)

  const profile = apiProfile || (isDemoUser ? demoProfile : null)

  // Provide fallback data for orders and wishlist
  const ordersData = orders || []
  const wishlistData = wishlist || []
  const subscription = subscriptionData?.subscription || null

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      const [firstName, ...lastNameParts] = (profile.name || "").split(" ")
      const lastName = lastNameParts.join(" ")
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || ""
      })
    }
  }, [profile])

  // Settings handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (type: string) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type as keyof typeof prev] }))
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: formData,
          notifications
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Settings saved successfully!" })
        // Refresh profile data to show updated information
        mutate("/api/account", undefined, { revalidate: true })
        // Refresh auth context to update dropdown menu
        refreshUser()
      } else {
        toast({ title: data.error || "Failed to save settings", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Failed to save settings", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSecurityAction = (action: string) => {
    switch (action) {
      case "changePassword":
        setIsPasswordModalOpen(true)
        break
      case "twoFactor":
        toast({ title: "Two-factor authentication coming soon!" })
        break
      case "downloadData":
        // Generate and download user data
        const userData = {
          profile: formData,
          notifications,
          orders: ordersData,
          wishlist: wishlistData
        }
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "account-data.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast({ title: "Account data downloaded!" })
        break
      case "deleteAccount":
        setIsDeleteModalOpen(true)
        break
    }
  }

  // Subscription management functions
  const handleUpgradeSubscription = async (targetTier: string) => {
    setIsUpdatingSubscription(true)
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: targetTier })
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: `Successfully upgraded to ${targetTier}!` })
        // Refresh subscription data and profile data
        mutate("/api/subscription", undefined, { revalidate: true })
        mutate("/api/account", undefined, { revalidate: true })
        // Refresh auth context to update dropdown
        refreshUser()
      } else {
        toast({ title: data.error || "Failed to upgrade subscription", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Failed to upgrade subscription", variant: "destructive" })
    } finally {
      setIsUpdatingSubscription(false)
    }
  }

  const handleCancelSubscription = () => {
    setShowCancelDialog(true)
  }

  const confirmCancelSubscription = async () => {
    setIsUpdatingSubscription(true)
    setShowCancelDialog(false)

    try {
      const response = await fetch("/api/subscription", {
        method: "DELETE"
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Subscription cancelled successfully" })
        // Refresh subscription data and profile data
        mutate("/api/subscription", undefined, { revalidate: true })
        mutate("/api/account", undefined, { revalidate: true })
        // Refresh auth context to update dropdown
        refreshUser()
      } else {
        toast({ title: data.error || "Failed to cancel subscription", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Failed to cancel subscription", variant: "destructive" })
    } finally {
      setIsUpdatingSubscription(false)
    }
  }

  const handleUpdatePaymentMethod = async () => {
    try {
      // In a real application, this would integrate with a payment processor
      // For now, we'll simulate the process
      toast({ title: "Redirecting to payment method update..." })

      // Simulate a delay for the payment update process
      setTimeout(() => {
        toast({ title: "Payment method updated successfully!" })
        // Refresh subscription data to show updated payment info
        mutate("/api/subscription", undefined, { revalidate: true })
      }, 2000)
    } catch (error) {
      toast({ title: "Failed to update payment method", variant: "destructive" })
    }
  }

  if (loadingAuth || loadingProfile || loadingOrders || loadingWishlist || loadingSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Loading account...</div>
    )
  }
  if (!isAuthenticated) {
    return null
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Account not found.</div>
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Ultra-Exclusive":
        return Crown
      case "Prestige Collection":
        return Diamond
      default:
        return Star
    }
  }

  const getTierColorClasses = (color: string) => {
    switch (color) {
      case "yellow":
        return "from-yellow-400 to-yellow-600"
      case "purple":
        return "from-purple-600 to-indigo-800"
      case "blue":
        return "from-blue-600 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-black" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white mb-2">
                      Welcome back, {profile.name}
                    </h1>
                    <p className="text-gray-300 mb-4">Member since {profile.memberSince}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Badge
                        className={`bg-gradient-to-r ${getTierColorClasses(profile.tierColor)} text-white px-4 py-2 w-fit`}
                      >
                        <Diamond className="h-4 w-4 mr-2" />
                        {profile.currentTier}
                      </Badge>
                      <div className="text-sm text-gray-300">
                        Total Spent: <span className="text-yellow-400 font-medium">{profile.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={logout}
                    className="mt-6 sm:mt-0 bg-yellow-500 text-black hover:bg-yellow-600 transition"
                  >
                    <LogOut className="mr-2" /> Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Content */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto p-1 bg-white border">
                <TabsTrigger value="overview" className="flex items-center gap-2 py-3 text-xs sm:text-sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2 py-3 text-xs sm:text-sm">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3 text-xs sm:text-sm">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center gap-2 py-3 text-xs sm:text-sm">
                  <Crown className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscription</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 py-3 text-xs sm:text-sm">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Package className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                          <div className="text-2xl font-light text-gray-900 mb-1">{ordersData.length}</div>
                          <div className="text-sm text-gray-600">Total Orders</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                          <div className="text-2xl font-light text-gray-900 mb-1">{wishlistData.length}</div>
                          <div className="text-sm text-gray-600">Wishlist Items</div>
                        </CardContent>
                      </Card>

                    </div>

                    {/* Recent Orders */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Recent Orders
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {ordersData.length > 0 ? (
                            ordersData.slice(0, 3).map((order) => (
                              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 mb-1">{order.id}</div>
                                  <div className="text-sm text-gray-600 mb-2">{order.items.join(", ")}</div>
                                  <div className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-gray-900 mb-2">{order.total}</div>
                                  <Badge
                                    className={`${order.statusColor === "green"
                                        ? "bg-green-100 text-green-800"
                                        : order.statusColor === "blue"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                              <p>No orders yet</p>
                              <p className="text-sm">Start shopping to see your order history</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tier Progress */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="h-5 w-5" />
                          Membership Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-6">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${getTierColorClasses(profile.tierColor)} rounded-full flex items-center justify-center`}
                          >
                            <Diamond className="h-8 w-8 text-white" />
                          </div>
                          <div className="font-medium text-gray-900 mb-1">{profile.currentTier}</div>
                          <div className="text-sm text-gray-600">Current Tier</div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress to {profile.nextTier}</span>
                            <span>{profile.tierProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${profile.tierProgress}%` }}
                            />
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 text-center">
                          Spend ${((200000 - profile.totalSpent) / 1000).toFixed(0)}k more to reach {profile.nextTier}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => setActiveTab("orders")}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Track Orders
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => setActiveTab("wishlist")}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          View Wishlist
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ordersData.length > 0 ? (
                        ordersData.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                              <div>
                                <div className="font-medium text-gray-900 mb-1">{order.id}</div>
                                <div className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</div>
                              </div>
                              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                <Badge
                                  className={`${order.statusColor === "green"
                                      ? "bg-green-100 text-green-800"
                                      : order.statusColor === "blue"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                  {order.status}
                                </Badge>
                                <span className="font-medium text-gray-900">{order.total}</span>
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="text-sm text-gray-600 mb-2">Items:</div>
                              <div className="text-gray-900">{order.items.join(", ")}</div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toast({ title: `Order details for ${order.id}`, description: `Status: ${order.status}, Total: ${order.total}` })}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Generate receipt data
                                  const receiptData = {
                                    orderId: order.id,
                                    date: order.date,
                                    items: order.items,
                                    total: order.total,
                                    status: order.status
                                  }
                                  const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: "application/json" })
                                  const url = URL.createObjectURL(blob)
                                  const a = document.createElement("a")
                                  a.href = url
                                  a.download = `receipt-${order.id}.json`
                                  document.body.appendChild(a)
                                  a.click()
                                  document.body.removeChild(a)
                                  URL.revokeObjectURL(url)
                                  toast({ title: "Receipt downloaded!" })
                                }}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Receipt
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                          <p className="text-sm mb-4">Start shopping to see your order history</p>
                          <Button
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                            onClick={() => router.push("/shop")}
                          >
                            Start Shopping
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Your Wishlist ({wishlistData.length} items)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistData.length > 0 ? (
                        wishlistData.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="relative h-32 mb-4 overflow-hidden rounded-lg">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-lg font-light text-gray-900 mb-4">{item.price}</p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                                onClick={async () => {
                                  try {
                                    const response = await fetch("/api/cart", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ productId: item.id, quantity: 1 })
                                    })
                                    if (response.ok) {
                                      toast({ title: "Added to cart!" })
                                    } else {
                                      toast({ title: "Failed to add to cart", variant: "destructive" })
                                    }
                                  } catch (error) {
                                    toast({ title: "Failed to add to cart", variant: "destructive" })
                                  }
                                }}
                              >
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/wishlist?productId=${item.id}`, {
                                      method: "DELETE"
                                    })
                                    if (response.ok) {
                                      toast({ title: "Removed from wishlist!" })
                                      // Refresh wishlist data
                                      mutate("/api/wishlist")
                                    } else {
                                      toast({ title: "Failed to remove from wishlist", variant: "destructive" })
                                    }
                                  } catch (error) {
                                    toast({ title: "Failed to remove from wishlist", variant: "destructive" })
                                  }
                                }}
                              >
                                <Heart className="h-4 w-4 fill-current text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                          <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                          <p className="text-sm mb-4">Start adding items to your wishlist</p>
                          <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black" onClick={() => router.push("/shop")}>
                            Browse Collection
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5" />
                      Membership Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="text-center mb-6">
                          <div
                            className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${getTierColorClasses(profile.tierColor)} rounded-full flex items-center justify-center`}
                          >
                            <Diamond className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-xl font-light text-gray-900 mb-2">
                            {subscription?.tier || profile.currentTier || "No Active Subscription"}
                          </h3>
                          <p className="text-gray-600">
                            {subscription?.tier === "Ultra-Exclusive" ? "$299/month" :
                              subscription?.tier === "Prestige Collection" ? "$199/month" :
                                "Free"}
                          </p>
                          {subscription && (
                            <p className="text-sm text-gray-500 mt-1">
                              Status: <span className={`font-medium ${subscription.status === "active" ? "text-green-600" : "text-red-600"}`}>
                                {subscription.status}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                            <span className="text-sm">10% discount on all purchases</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                            <span className="text-sm">Priority customer service</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                            <span className="text-sm">Express shipping included</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                            <span className="text-sm">Early access to new collections</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Billing Information</h4>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next billing date:</span>
                            <span className="text-gray-900">
                              {subscription?.renewedAt
                                ? new Date(new Date(subscription.renewedAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
                                : "N/A"
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment method:</span>
                            <span className="text-gray-900">•••• •••• •••• 4242</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="text-gray-900">
                              {subscription?.tier === "Ultra-Exclusive" ? "$299.00" :
                                subscription?.tier === "Prestige Collection" ? "$199.00" :
                                  "Free"}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {!subscription || subscription.status !== "active" ? (
                            <div className="space-y-2">
                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 hover:from-purple-500 hover:to-indigo-700 text-white"
                                onClick={() => handleUpgradeSubscription("Ultra-Exclusive")}
                                disabled={isUpdatingSubscription}
                              >
                                {isUpdatingSubscription ? "Processing..." : "Subscribe to Ultra-Exclusive - $299/month"}
                              </Button>
                              <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                                onClick={() => handleUpgradeSubscription("Prestige Collection")}
                                disabled={isUpdatingSubscription}
                              >
                                {isUpdatingSubscription ? "Processing..." : "Subscribe to Prestige Collection - $199/month"}
                              </Button>
                            </div>
                          ) : subscription.tier === "iconic" ? (
                            <div className="space-y-2">
                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 hover:from-purple-500 hover:to-indigo-700 text-white"
                                onClick={() => handleUpgradeSubscription("Ultra-Exclusive")}
                                disabled={isUpdatingSubscription}
                              >
                                {isUpdatingSubscription ? "Processing..." : "Upgrade to Ultra-Exclusive - $299/month"}
                              </Button>
                              <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                                onClick={() => handleUpgradeSubscription("Prestige Collection")}
                                disabled={isUpdatingSubscription}
                              >
                                {isUpdatingSubscription ? "Processing..." : "Upgrade to Prestige Collection - $199/month"}
                              </Button>
                            </div>
                          ) : subscription.tier === "Prestige Collection" ? (
                            <div className="space-y-2">
                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-800 hover:from-purple-500 hover:to-indigo-700 text-white"
                                onClick={() => handleUpgradeSubscription("Ultra-Exclusive")}
                                disabled={isUpdatingSubscription}
                              >
                                {isUpdatingSubscription ? "Processing..." : "Upgrade to Ultra-Exclusive - $299/month"}
                              </Button>
                              <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                disabled
                              >
                                Already Prestige Collection
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                              disabled
                            >
                              Already Ultra-Exclusive
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={handleUpdatePaymentMethod}
                          >
                            Update Payment Method
                          </Button>
                          {subscription?.status === "active" && (
                            <Button
                              variant="outline"
                              className="w-full text-red-600 hover:text-red-700 bg-transparent"
                              onClick={handleCancelSubscription}
                              disabled={isUpdatingSubscription}
                            >
                              {isUpdatingSubscription ? "Processing..." : "Cancel Subscription"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                      </div>
                      <Button onClick={handleSaveChanges} disabled={isSaving} className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black">
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Preferences & Security */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-gray-600">
                              Receive updates about orders and new collections
                            </div>
                          </div>
                          <Switch checked={notifications.email} onCheckedChange={() => handleNotificationToggle("email")} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-gray-600">Get text updates for order status</div>
                          </div>
                          <Switch checked={notifications.sms} onCheckedChange={() => handleNotificationToggle("sms")} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Marketing Communications</div>
                            <div className="text-sm text-gray-600">Exclusive offers and event invitations</div>
                          </div>
                          <Switch checked={notifications.marketing} onCheckedChange={() => handleNotificationToggle("marketing")} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Security
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => handleSecurityAction("changePassword")}>
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => handleSecurityAction("twoFactor")}>
                          Enable Two-Factor Authentication
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => handleSecurityAction("downloadData")}>
                          Download Account Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleSecurityAction("deleteAccount")}
                        >
                          Delete Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
      <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl">Cancel Subscription</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Are you sure you want to cancel your <span className="font-semibold">{profile?.currentTier}</span> subscription?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">What happens when you cancel:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  You'll lose access to {profile?.currentTier === "Ultra-Exclusive" ? "25%" : "15%"} member discounts
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Your tier will be reset to Iconic Collection (Free)
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  You'll lose priority customer service
                </li>
                {profile?.currentTier === "Ultra-Exclusive" && (
                  <>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      You'll lose personal concierge service
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      You'll lose complimentary worldwide shipping
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">You can always reactivate:</h4>
              <p className="text-sm text-yellow-700">
                You can upgrade your subscription again at any time from your account settings.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="flex-1"
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancelSubscription}
              disabled={isUpdatingSubscription}
              className="flex-1"
            >
              {isUpdatingSubscription ? "Cancelling..." : "Cancel Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
