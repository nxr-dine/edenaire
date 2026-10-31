"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  Eye,
  Edit,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientOnly } from "@/components/client-only"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const fetcher = (url: string) => fetch(url).then(res => res.json())
const demoUsers = [{ id: "demo-user", name: "Alex Morgan", email: "alex.morgan@example.com", role: "user", tier: "iconic", createdAt: "2026-10-01T00:00:00.000Z" }]
const demoProducts = [{ id: "demo-product", name: "Celestial Diamond Necklace", description: "18k white gold with brilliant-cut diamonds", price: 4200, quantity: 4, discount: 0, categoryId: "demo-category", category: { name: "Necklaces" } }]
const demoOrders = [{ id: "DEMO-1042", user: { name: "Alex Morgan", email: "alex.morgan@example.com" }, items: [{ product: { name: "Celestial Diamond Necklace" } }], total: 4200, status: "processing", createdAt: "2026-10-30T00:00:00.000Z" }]
const demoCategories = [{ id: "demo-category", name: "Necklaces" }]
const demoAnalytics = {
  salesPerMonth: [{ year: 2026, month: 10, total: 4200, count: 1 }],
  topProducts: [{ name: "Celestial Diamond Necklace", quantity: 1, revenue: 4200 }],
  userRegistrations: [{ year: 2026, month: 10, count: 1 }],
  categorySales: [{ name: "Necklaces", revenue: 4200 }],
}

export default function AdminDashboard() {
  try {
    const { user, isAuthenticated, isDemoAdmin, isLoading } = useAuth()
    const router = useRouter()

    // Data fetching hooks - moved to top to avoid initialization errors
    const canLoadAdminData = isAuthenticated && user?.role === "admin" && !isDemoAdmin
    const { data: apiUsers, mutate: mutateUsers } = useSWR(canLoadAdminData ? "/api/admin/users" : null, fetcher)
    const { data: apiProducts, mutate: mutateProducts } = useSWR(canLoadAdminData ? "/api/admin/products" : null, fetcher)
    const { data: apiOrders, mutate: mutateOrders } = useSWR(canLoadAdminData ? "/api/admin/orders" : null, fetcher)
    const { data: apiCategories, mutate: mutateCategories } = useSWR(canLoadAdminData ? "/api/admin/categories" : null, fetcher)
    const users = isDemoAdmin ? demoUsers : apiUsers
    const products = isDemoAdmin ? demoProducts : apiProducts
    const orders = isDemoAdmin ? demoOrders : apiOrders
    const categories = isDemoAdmin ? demoCategories : apiCategories

    useEffect(() => {
      if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
        router.replace("/auth/login?callbackUrl=/admin/dashboard")
      }
    }, [isAuthenticated, isLoading, user, router])

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500" />
        </div>
      )
    }

    if (isAuthenticated && user?.role !== "admin") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">Checking admin permissions...</p>
          </div>
        </div>
      )
    }

    const [timeRange, setTimeRange] = useState("30d")

    // Calculate real stats from data
    const totalRevenue = orders && Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0
    const totalUsers = users && Array.isArray(users) ? users.length : 0
    const totalOrders = orders && Array.isArray(orders) ? orders.length : 0
    const totalProducts = products && Array.isArray(products) ? products.length : 0

    // Calculate conversion rate (orders per user)
    const conversionRate = totalUsers > 0 ? ((totalOrders / totalUsers) * 100).toFixed(2) : 0

    const stats = [
      {
        title: "Total Revenue",
        value: `$${(totalRevenue || 0).toLocaleString()}`,
        change: "+0%",
        trend: "up",
        icon: DollarSign,
        color: "text-green-600",
      },
      {
        title: "Total Users",
        value: totalUsers.toString(),
        change: "+0%",
        trend: "up",
        icon: Users,
        color: "text-blue-600",
      },
      {
        title: "Total Orders",
        value: totalOrders.toString(),
        change: "+0%",
        trend: "up",
        icon: ShoppingCart,
        color: "text-orange-600",
      },
      {
        title: "Conversion Rate",
        value: `${conversionRate}%`,
        change: "+0%",
        trend: "up",
        icon: TrendingUp,
        color: "text-purple-600",
      },
    ]

    // Calculate real subscription stats from users
    const userTiers = (() => {
      try {
        if (!users || !Array.isArray(users)) {
          return {}
        }

        return users.reduce((acc, user) => {
          try {
            const tier = user && user.tier && typeof user.tier === 'string' ? user.tier : 'iconic'
            // Additional safety check to ensure tier is a valid string
            if (!tier || typeof tier !== 'string' || tier.trim() === '') {
              acc['iconic'] = (acc['iconic'] || 0) + 1
            } else {
              acc[tier] = (acc[tier] || 0) + 1
            }
            return acc
          } catch (error) {
            console.error('Error processing user tier:', error)
            acc['iconic'] = (acc['iconic'] || 0) + 1
            return acc
          }
        }, {})
      } catch (error) {
        console.error('Error calculating user tiers:', error)
        return {}
      }
    })()

    const totalUserCount = users && Array.isArray(users) ? users.length : 0

    const subscriptionStats = (() => {
      try {
        if (!userTiers || typeof userTiers !== 'object' || Object.keys(userTiers).length === 0) {
          return []
        }

        return Object.entries(userTiers).map(([tier, count]) => {
          try {
            // Additional safety check for tier parameter
            if (tier === undefined || tier === null) {
              console.warn('Tier is undefined or null, using default')
              tier = 'unknown'
            }

            const percentage = totalUserCount > 0 ? ((count || 0) / totalUserCount * 100).toFixed(1) : 0
            const revenue = tier === 'iconic' ? 0 : (count || 0) * 1000 // Mock revenue calculation

            // Safety check for tier
            const safeTier = tier && typeof tier === 'string' ? tier : 'unknown'
            const tierDisplayName = (() => {
              try {
                if (!safeTier || typeof safeTier !== 'string' || safeTier.length === 0) {
                  return 'Unknown'
                }
                return safeTier.charAt(0).toUpperCase() + safeTier.slice(1)
              } catch (error) {
                console.error('Error processing tier display name:', error)
                return 'Unknown'
              }
            })()

            return {
              tier: `Tier ${tierDisplayName}`,
              users: count || 0,
              percentage: `${percentage}%`,
              revenue: `$${(revenue || 0).toLocaleString()}`,
              trend: Math.random() > 0.5 ? "up" : "down",
              icon: Users, // Add icon property
            }
          } catch (error) {
            console.error('Error processing subscription stats item:', error)
            return {
              tier: 'Tier Unknown',
              users: 0,
              percentage: '0%',
              revenue: '$0',
              trend: 'up',
              icon: Users,
            }
          }
        })
      } catch (error) {
        console.error('Error processing subscription stats:', error)
        return []
      }
    })()

    // Calculate real recent orders from orders data
    const recentOrders = orders && Array.isArray(orders) ? orders.slice(0, 5).map(order => ({
      id: order.id,
      customer: order.user?.name || order.user?.email || 'Unknown',
      product: order.items?.[0]?.product?.name || 'Multiple items',
      amount: `$${(order.total || 0).toLocaleString()}`,
      status: order.status,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown',
    })) : []

    // Calculate real top products from products data
    const topProducts = products && Array.isArray(products) ? products.slice(0, 4).map(product => ({
      name: product.name,
      sales: Math.floor(Math.random() * 50) + 1, // Mock sales data since we don't have order items
      revenue: `$${((product.price || 0) * (Math.floor(Math.random() * 50) + 1)).toLocaleString()}`,
      tier: product.category?.name || 'General',
      trend: Math.random() > 0.5 ? "up" : "down",
    })) : []

    // User Management Section
    async function handleRoleChange(userId: string, role: string) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, role }),
        })
        if (response.ok) {
          mutateUsers()
          toast({ title: "Success", description: "User role updated successfully" })
        } else {
          toast({ title: "Error", description: "Failed to update user role", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update user role", variant: "destructive" })
      }
    }

    async function handleDeleteUser(userId: string) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        })
        if (response.ok) {
          mutateUsers()
          toast({ title: "Success", description: "User deleted successfully" })
        } else {
          toast({ title: "Error", description: "Failed to delete user", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete user", variant: "destructive" })
      }
    }

    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", quantity: "", discount: "", image: "", categoryId: "" })

    async function handleDeleteProduct(id: string) {
      try {
        const response = await fetch("/api/admin/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          mutateProducts()
          toast({ title: "Success", description: "Product deleted successfully" })
        } else {
          toast({ title: "Error", description: "Failed to delete product", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete product", variant: "destructive" })
      }
    }

    async function handleEditProduct(product: any) {
      setEditingProduct({
        ...product,
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        discount: product.discount || "",
        categoryId: product.categoryId || ""
      })
    }

    async function handleUpdateProduct() {
      try {
        const response = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProduct),
        })
        if (response.ok) {
          setEditingProduct(null)
          mutateProducts()
          toast({ title: "Success", description: "Product updated successfully" })
        } else {
          toast({ title: "Error", description: "Failed to update product", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update product", variant: "destructive" })
      }
    }

    async function handleCreateProduct(e: any) {
      e.preventDefault()
      try {
        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newProduct,
            price: parseFloat(newProduct.price),
            quantity: parseInt(newProduct.quantity),
            discount: parseFloat(newProduct.discount)
          }),
        })
        if (response.ok) {
          setNewProduct({ name: "", description: "", price: "", quantity: "", discount: "", image: "", categoryId: "" })
          mutateProducts()
          toast({ title: "Success", description: "Product created successfully" })
        } else {
          const errorData = await response.json().catch(() => ({}))
          toast({
            title: "Error",
            description: errorData.error || "Failed to create product",
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error("Product creation error:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to create product",
          variant: "destructive"
        })
      }
    }

    async function handleUpdateOrderStatus(orderId: string, status: string) {
      try {
        const response = await fetch("/api/admin/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, status }),
        })
        if (response.ok) {
          mutateOrders()
          toast({ title: "Success", description: "Order status updated successfully" })
        } else {
          toast({ title: "Error", description: "Failed to update order status", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update order status", variant: "destructive" })
      }
    }

    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [orderModalOpen, setOrderModalOpen] = useState(false)

    function openOrderModal(order: any) {
      setSelectedOrder(order)
      setOrderModalOpen(true)
    }
    function closeOrderModal() {
      setOrderModalOpen(false)
      setSelectedOrder(null)
    }

    const { toast } = useToast()
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)

    function openDeleteUserDialog(userId: string) {
      setDeleteUserId(userId)
      setDeleteUserDialogOpen(true)
    }
    function closeDeleteUserDialog() {
      setDeleteUserDialogOpen(false)
      setDeleteUserId(null)
    }

    async function confirmDeleteUser() {
      try {
        await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: deleteUserId }),
        })
        mutate()
        toast({ title: "User deleted", description: "The user was deleted successfully." })
      } catch {
        toast({ title: "Error", description: "Failed to delete user.", variant: "destructive" })
      }
      closeDeleteUserDialog()
    }

    const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
    const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false)

    function openDeleteProductDialog(productId: string) {
      setDeleteProductId(productId)
      setDeleteProductDialogOpen(true)
    }
    function closeDeleteProductDialog() {
      setDeleteProductDialogOpen(false)
      setDeleteProductId(null)
    }

    async function confirmDeleteProduct() {
      try {
        await fetch(`/api/products/${deleteProductId}`, { method: "DELETE" })
        mutateProducts()
        toast({ title: "Product deleted", description: "The product was deleted successfully." })
      } catch {
        toast({ title: "Error", description: "Failed to delete product.", variant: "destructive" })
      }
      closeDeleteProductDialog()
    }

    const [orderStatusChange, setOrderStatusChange] = useState<{ orderId: string, newStatus: string } | null>(null)
    const [orderStatusDialogOpen, setOrderStatusDialogOpen] = useState(false)

    function openOrderStatusDialog(orderId: string, newStatus: string) {
      setOrderStatusChange({ orderId, newStatus })
      setOrderStatusDialogOpen(true)
    }
    function closeOrderStatusDialog() {
      setOrderStatusDialogOpen(false)
      setOrderStatusChange(null)
    }

    async function confirmOrderStatusChange() {
      try {
        await fetch("/api/admin/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderStatusChange),
        })
        mutateOrders()
        toast({ title: "Order status updated", description: `Order status changed to ${orderStatusChange?.newStatus}.` })
      } catch {
        toast({ title: "Error", description: "Failed to update order status.", variant: "destructive" })
      }
      closeOrderStatusDialog()
    }

    const [editingCategory, setEditingCategory] = useState<any>(null)
    const [newCategory, setNewCategory] = useState({ name: "" })
    const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null)
    const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = useState(false)

    function openDeleteCategoryDialog(categoryId: string) {
      setDeleteCategoryId(categoryId)
      setDeleteCategoryDialogOpen(true)
    }
    function closeDeleteCategoryDialog() {
      setDeleteCategoryDialogOpen(false)
      setDeleteCategoryId(null)
    }

    async function handleCreateCategory(e: any) {
      e.preventDefault()
      try {
        const response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        })
        if (response.ok) {
          setNewCategory({ name: "" })
          mutateCategories()
          toast({ title: "Success", description: "Category created successfully" })
        } else {
          toast({ title: "Error", description: "Failed to create category", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to create category", variant: "destructive" })
      }
    }

    async function handleEditCategory(category: any) {
      setEditingCategory({
        ...category,
        name: category.name || ""
      })
    }

    async function handleUpdateCategory() {
      try {
        const response = await fetch("/api/admin/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCategory),
        })
        if (response.ok) {
          setEditingCategory(null)
          mutateCategories()
          toast({ title: "Success", description: "Category updated successfully" })
        } else {
          toast({ title: "Error", description: "Failed to update category", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update category", variant: "destructive" })
      }
    }

    async function confirmDeleteCategory() {
      try {
        const response = await fetch("/api/admin/categories", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: deleteCategoryId }),
        })
        if (response.ok) {
          mutateCategories()
          toast({ title: "Success", description: "Category deleted successfully" })
        } else {
          toast({ title: "Error", description: "Failed to delete category", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete category", variant: "destructive" })
      }
      closeDeleteCategoryDialog()
    }

    const { data: apiAnalytics } = useSWR(canLoadAdminData ? "/api/admin/analytics" : null, fetcher)
    const analytics = isDemoAdmin ? demoAnalytics : apiAnalytics

    const [userSearch, setUserSearch] = useState("")
    const [productSearch, setProductSearch] = useState("")
    const [orderSearch, setOrderSearch] = useState("")
    const [categorySearch, setCategorySearch] = useState("")

    const [userPage, setUserPage] = useState(1)
    const USERS_PER_PAGE = 10
    const totalUserPages = users ? Math.ceil(users.length / USERS_PER_PAGE) : 1

    const [productPage, setProductPage] = useState(1)
    const PRODUCTS_PER_PAGE = 10
    const totalProductPages = products ? Math.ceil(products.length / PRODUCTS_PER_PAGE) : 1

    const [orderPage, setOrderPage] = useState(1)
    const ORDERS_PER_PAGE = 10
    const totalOrderPages = orders ? Math.ceil(orders.length / ORDERS_PER_PAGE) : 1

    const [categoryPage, setCategoryPage] = useState(1)
    const CATEGORIES_PER_PAGE = 10
    const totalCategoryPages = categories ? Math.ceil(categories.length / CATEGORIES_PER_PAGE) : 1

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
    const allUsersSelected = users && users.length > 0 && users.every((user: any) => selectedUserIds.includes(user.id))

    function toggleUserSelection(userId: string) {
      setSelectedUserIds(ids => ids.includes(userId) ? ids.filter(id => id !== userId) : [...ids, userId])
    }
    function toggleSelectAllUsers() {
      if (allUsersSelected) {
        setSelectedUserIds(ids => ids.filter(id => !(users && Array.isArray(users) ? users.some((user: any) => user.id === id) : false)))
      } else {
        setSelectedUserIds(ids => [...ids, ...(users && Array.isArray(users) ? users.filter((user: any) => !ids.includes(user.id)).map((user: any) => user.id) : [])])
      }
    }

    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

    async function confirmBulkDeleteUsers() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "deleteUsers",
            ids: selectedUserIds
          }),
        })
        if (response.ok) {
          mutateUsers()
          toast({ title: "Success", description: "Selected users deleted successfully" })
          setSelectedUserIds([])
        } else {
          toast({ title: "Error", description: "Failed to delete users", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete users", variant: "destructive" })
      }
      setBulkDeleteDialogOpen(false)
    }

    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const allProductsSelected = products && Array.isArray(products) && products.length > 0 && products.every((product: any) => selectedProductIds.includes(product.id))

    function toggleProductSelection(productId: string) {
      setSelectedProductIds(ids => ids.includes(productId) ? ids.filter(id => id !== productId) : [...ids, productId])
    }
    function toggleSelectAllProducts() {
      if (allProductsSelected) {
        setSelectedProductIds(ids => ids.filter(id => !(products && Array.isArray(products) ? products.some((product: any) => product.id === id) : false)))
      } else {
        setSelectedProductIds(ids => [...ids, ...(products && Array.isArray(products) ? products.filter((product: any) => !ids.includes(product.id)).map((product: any) => product.id) : [])])
      }
    }

    const [bulkDeleteProductsDialogOpen, setBulkDeleteProductsDialogOpen] = useState(false)

    async function confirmBulkDeleteProducts() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "deleteProducts",
            ids: selectedProductIds
          }),
        })
        if (response.ok) {
          mutateProducts()
          toast({ title: "Success", description: "Selected products deleted successfully" })
          setSelectedProductIds([])
        } else {
          toast({ title: "Error", description: "Failed to delete products", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete products", variant: "destructive" })
      }
      setBulkDeleteProductsDialogOpen(false)
    }

    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
    const allOrdersSelected = orders && Array.isArray(orders) && orders.length > 0 && orders.every((order: any) => selectedOrderIds.includes(order.id))

    function toggleOrderSelection(orderId: string) {
      setSelectedOrderIds(ids => ids.includes(orderId) ? ids.filter(id => id !== orderId) : [...ids, orderId])
    }
    function toggleSelectAllOrders() {
      if (allOrdersSelected) {
        setSelectedOrderIds(ids => ids.filter(id => !(orders && Array.isArray(orders) ? orders.some((order: any) => order.id === id) : false)))
      } else {
        setSelectedOrderIds(ids => [...ids, ...(orders && Array.isArray(orders) ? orders.filter((order: any) => !ids.includes(order.id)).map((order: any) => order.id) : [])])
      }
    }

    const [bulkDeleteOrdersDialogOpen, setBulkDeleteOrdersDialogOpen] = useState(false)

    async function confirmBulkDeleteOrders() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "deleteOrders",
            ids: selectedOrderIds
          }),
        })
        if (response.ok) {
          mutateOrders()
          toast({ title: "Success", description: "Selected orders deleted successfully" })
          setSelectedOrderIds([])
        } else {
          toast({ title: "Error", description: "Failed to delete orders", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete orders", variant: "destructive" })
      }
      setBulkDeleteOrdersDialogOpen(false)
    }

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
    const allCategoriesSelected = categories && Array.isArray(categories) && categories.length > 0 && categories.every((category: any) => selectedCategoryIds.includes(category.id))

    function toggleCategorySelection(categoryId: string) {
      setSelectedCategoryIds(ids => ids.includes(categoryId) ? ids.filter(id => id !== categoryId) : [...ids, categoryId])
    }
    function toggleSelectAllCategories() {
      if (allCategoriesSelected) {
        setSelectedCategoryIds(ids => ids.filter(id => !(categories && Array.isArray(categories) ? categories.some((category: any) => category.id === id) : false)))
      } else {
        setSelectedCategoryIds(ids => [...ids, ...(categories && Array.isArray(categories) ? categories.filter((category: any) => !ids.includes(category.id)).map((category: any) => category.id) : [])])
      }
    }

    const [bulkDeleteCategoriesDialogOpen, setBulkDeleteCategoriesDialogOpen] = useState(false)

    async function confirmBulkDeleteCategories() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "deleteCategories",
            ids: selectedCategoryIds
          }),
        })
        if (response.ok) {
          mutateCategories()
          toast({ title: "Success", description: "Selected categories deleted successfully" })
          setSelectedCategoryIds([])
        } else {
          toast({ title: "Error", description: "Failed to delete categories", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete categories", variant: "destructive" })
      }
      setBulkDeleteCategoriesDialogOpen(false)
    }

    const [bulkRole, setBulkRole] = useState("")
    const [bulkRoleDialogOpen, setBulkRoleDialogOpen] = useState(false)

    async function confirmBulkRoleUpdate() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "updateUserRoles",
            ids: selectedUserIds,
            data: { role: bulkRole }
          }),
        })
        if (response.ok) {
          mutateUsers()
          toast({ title: "Success", description: "User roles updated successfully" })
          setSelectedUserIds([])
          setBulkRole("")
        } else {
          toast({ title: "Error", description: "Failed to update user roles", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update user roles", variant: "destructive" })
      }
      setBulkRoleDialogOpen(false)
    }

    const [bulkOrderStatus, setBulkOrderStatus] = useState("")
    const [bulkOrderStatusDialogOpen, setBulkOrderStatusDialogOpen] = useState(false)

    async function confirmBulkOrderStatusUpdate() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "updateOrderStatus",
            ids: selectedOrderIds,
            data: { status: bulkOrderStatus }
          }),
        })
        if (response.ok) {
          mutateOrders()
          toast({ title: "Success", description: "Order statuses updated successfully" })
          setSelectedOrderIds([])
          setBulkOrderStatus("")
        } else {
          toast({ title: "Error", description: "Failed to update order statuses", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to update order statuses", variant: "destructive" })
      }
      setBulkOrderStatusDialogOpen(false)
    }

    const [bulkCategoryName, setBulkCategoryName] = useState("")
    const [bulkCategoryRenameDialogOpen, setBulkCategoryRenameDialogOpen] = useState(false)

    async function confirmBulkCategoryRename() {
      try {
        const response = await fetch("/api/admin/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "renameCategories",
            ids: selectedCategoryIds,
            data: { name: bulkCategoryName }
          }),
        })
        if (response.ok) {
          mutateCategories()
          toast({ title: "Success", description: "Categories renamed successfully" })
          setSelectedCategoryIds([])
          setBulkCategoryName("")
        } else {
          toast({ title: "Error", description: "Failed to rename categories", variant: "destructive" })
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to rename categories", variant: "destructive" })
      }
      setBulkCategoryRenameDialogOpen(false)
    }

    return (
      <ClientOnly>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-extralight text-gray-900 tracking-wide">Admin Dashboard</h1>
                  <p className="text-gray-600 font-light">Edenaire Luxury Jewelry Management</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            {analytics && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Sales Over Time Chart */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Sales Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line
                      data={{
                        labels: analytics?.salesPerMonth && Array.isArray(analytics.salesPerMonth) ? analytics.salesPerMonth.map((m: any) => `${m.year}-${String(m.month).padStart(2, "0")}`) : [],
                        datasets: [
                          {
                            label: "Sales ($)",
                            data: analytics?.salesPerMonth && Array.isArray(analytics.salesPerMonth) ? analytics.salesPerMonth.map((m: any) => m.total) : [],
                            borderColor: "#f59e0b",
                            backgroundColor: "rgba(251,191,36,0.2)",
                            tension: 0.4,
                            fill: true,
                          },
                          {
                            label: "Orders",
                            data: analytics?.salesPerMonth && Array.isArray(analytics.salesPerMonth) ? analytics.salesPerMonth.map((m: any) => m.count) : [],
                            borderColor: "#6366f1",
                            backgroundColor: "rgba(99,102,241,0.2)",
                            yAxisID: "y1",
                            type: "line",
                            tension: 0.4,
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" as const },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true, title: { display: true, text: "Sales ($)" } },
                          y1: {
                            beginAtZero: true,
                            position: "right" as const,
                            grid: { drawOnChartArea: false },
                            title: { display: true, text: "Orders" },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                {/* Top Products Chart */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bar
                      data={{
                        labels: analytics?.topProducts && Array.isArray(analytics.topProducts) ? analytics.topProducts.map((p: any) => p.name) : [],
                        datasets: [
                          {
                            label: "Units Sold",
                            data: analytics?.topProducts && Array.isArray(analytics.topProducts) ? analytics.topProducts.map((p: any) => p.quantity) : [],
                            backgroundColor: "#f59e0b",
                          },
                          {
                            label: "Revenue ($)",
                            data: analytics?.topProducts && Array.isArray(analytics.topProducts) ? analytics.topProducts.map((p: any) => p.revenue) : [],
                            backgroundColor: "#6366f1",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" as const },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                {/* User Registrations Chart */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">User Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line
                      data={{
                        labels: analytics?.userRegistrations && Array.isArray(analytics.userRegistrations) ? analytics.userRegistrations.map((m: any) => `${m.year}-${String(m.month).padStart(2, "0")}`) : [],
                        datasets: [
                          {
                            label: "Registrations",
                            data: analytics?.userRegistrations && Array.isArray(analytics.userRegistrations) ? analytics.userRegistrations.map((m: any) => m.count) : [],
                            borderColor: "#10b981",
                            backgroundColor: "rgba(16,185,129,0.2)",
                            tension: 0.4,
                            fill: true,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" as const },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true, title: { display: true, text: "Registrations" } },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                {/* Category Sales Chart */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Category Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bar
                      data={{
                        labels: analytics?.categorySales && Array.isArray(analytics.categorySales) ? analytics.categorySales.map((c: any) => c.name) : [],
                        datasets: [
                          {
                            label: "Revenue ($)",
                            data: analytics?.categorySales && Array.isArray(analytics.categorySales) ? analytics.categorySales.map((c: any) => c.revenue) : [],
                            backgroundColor: "#0ea5e9",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" as const },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true, title: { display: true, text: "Revenue ($)" } },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-light text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span
                            className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Subscription Tiers */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Subscription Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionStats.map((tier, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <tier.icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{tier.tier}</p>
                            <p className="text-sm text-gray-600">{tier.users} subscribers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={tier.color}>{tier.percentage}</Badge>
                          <p className="text-sm text-gray-600 mt-1">{tier.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {product.tier}
                            </Badge>
                            <span className="text-sm text-gray-600">{product.sales} sales</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{product.revenue}</p>
                          <div className="flex items-center mt-1">
                            {product.trend === "up" ? (
                              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={`text-xs ${product.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                              {product.trend === "up" ? "+12%" : "-5%"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-light">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                      onClick={() => {
                        // Scroll to product management section
                        const productSection = document.querySelector('[data-section="products"]');
                        if (productSection) {
                          productSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        toast({ title: "Quick Action", description: "Navigated to Product Management section" });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        // Scroll to user management section
                        const userSection = document.querySelector('[data-section="users"]');
                        if (userSection) {
                          userSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        toast({ title: "Quick Action", description: "Navigated to User Management section" });
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Subscribers
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        // Scroll to product management section (inventory)
                        const productSection = document.querySelector('[data-section="products"]');
                        if (productSection) {
                          productSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        toast({ title: "Quick Action", description: "Navigated to Inventory Management section" });
                      }}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Inventory Management
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        // Show analytics/reports section
                        toast({
                          title: "Reports",
                          description: "Reports feature coming soon. Use the Analytics section for current data insights."
                        });
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-light">Recent Orders</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium text-gray-900">{order.id}</td>
                          <td className="py-4 px-4 text-gray-700">{order.customer}</td>
                          <td className="py-4 px-4 text-gray-700">{order.product}</td>
                          <td className="py-4 px-4 font-medium text-gray-900">{order.amount}</td>
                          <td className="py-4 px-4">
                            <Badge
                              className={
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-orange-100 text-orange-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{order.date}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* User Management Table */}
            <Card className="border-0 shadow-lg mt-8" data-section="users">
              <CardHeader>
                <CardTitle className="text-xl font-light">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={userSearch || ""}
                    onChange={e => setUserSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-64"
                  />
                </div>
                {selectedUserIds.length > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <select value={bulkRole || ""} onChange={e => setBulkRole(e.target.value)} className="border rounded px-2 py-1">
                      <option value="">Change role to...</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <Button size="sm" disabled={!bulkRole} onClick={() => setBulkRoleDialogOpen(true)}>
                      Change Role ({selectedUserIds.length})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
                      Delete Selected ({selectedUserIds.length})
                    </Button>
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4"><input type="checkbox" checked={allUsersSelected} onChange={toggleSelectAllUsers} /></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.length > 0 ? users
                        .filter((user: any) =>
                          user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
                          user.email?.toLowerCase().includes(userSearch.toLowerCase())
                        )
                        .map((user: any) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4"><input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleUserSelection(user.id)} /></td>
                            <td className="py-4 px-4 font-medium text-gray-900">{user.name}</td>
                            <td className="py-4 px-4 text-gray-700">{user.email}</td>
                            <td className="py-4 px-4">
                              <select
                                value={user.role}
                                onChange={e => handleRoleChange(user.id, e.target.value)}
                                className="border rounded px-2 py-1"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 px-4">
                              <Button variant="destructive" size="sm" onClick={() => openDeleteUserDialog(user.id)}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        )) : (
                        <tr><td colSpan={6} className="py-4 px-4 text-center text-gray-500">No users found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Product Management Table */}
            <Card className="border-0 shadow-lg mt-8" data-section="products">
              <CardHeader>
                <CardTitle className="text-xl font-light">Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <input
                    type="text"
                    placeholder="Search products by name or description..."
                    value={productSearch || ""}
                    onChange={e => setProductSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-64"
                  />
                </div>
                {/* Create Product Form */}
                <form className="mb-6 flex flex-wrap gap-2 items-end" onSubmit={handleCreateProduct}>
                  <input type="text" placeholder="Name" value={newProduct.name || ""} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="border rounded px-2 py-1" required />
                  <input type="text" placeholder="Description" value={newProduct.description || ""} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border rounded px-2 py-1" />
                  <input type="number" placeholder="Price" value={newProduct.price || ""} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="border rounded px-2 py-1" required />
                  <input type="number" placeholder="Quantity" value={newProduct.quantity || ""} onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })} className="border rounded px-2 py-1" required />
                  <input type="number" placeholder="Discount %" value={newProduct.discount || ""} onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })} className="border rounded px-2 py-1" min="0" max="100" step="0.1" />
                  <input type="text" placeholder="Image URL" value={newProduct.image || ""} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="border rounded px-2 py-1" />
                  <input type="text" placeholder="Category ID" value={newProduct.categoryId || ""} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} className="border rounded px-2 py-1" />
                  <Button type="submit" size="sm">Add Product</Button>
                </form>
                {/* Product Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4"><input type="checkbox" checked={allProductsSelected} onChange={toggleSelectAllProducts} /></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Discount %</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && Array.isArray(products) && products.length > 0 ? products
                        .filter((product: any) =>
                          product && product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
                          product && product.description?.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((product: any) => product && (
                          <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4"><input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => toggleProductSelection(product.id)} /></td>
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="text" value={editingProduct.name || ""} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="border rounded px-2 py-1" />
                              ) : product.name}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="text" value={editingProduct.description || ""} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border rounded px-2 py-1" />
                              ) : product.description}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="number" value={editingProduct.price || ""} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} className="border rounded px-2 py-1" />
                              ) : product.price}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="number" value={editingProduct.quantity || ""} onChange={e => setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) || 0 })} className="border rounded px-2 py-1" />
                              ) : (product.quantity || 0)}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="number" value={editingProduct.discount || ""} onChange={e => setEditingProduct({ ...editingProduct, discount: parseFloat(e.target.value) || 0 })} className="border rounded px-2 py-1" min="0" max="100" step="0.1" />
                              ) : (product.discount || 0)}
                            </td>
                            <td className="py-4 px-4 text-gray-700">
                              {editingProduct && editingProduct.id === product.id ? (
                                <input type="text" value={editingProduct.categoryId || ""} onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })} className="border rounded px-2 py-1" />
                              ) : (product.category?.name || product.categoryId || "")}
                            </td>
                            <td className="py-4 px-4">
                              {editingProduct && editingProduct.id === product.id ? (
                                <>
                                  <Button size="sm" onClick={handleUpdateProduct}>Save</Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => openDeleteProductDialog(product.id)}>Delete</Button>
                                </>
                              )}
                            </td>
                          </tr>
                        )) : (
                        <tr><td colSpan={8} className="py-4 px-4 text-center text-gray-500">No products found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {selectedProductIds && selectedProductIds.length > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <Button variant="destructive" size="sm" onClick={() => setBulkDeleteProductsDialogOpen(true)}>
                      Delete Selected ({selectedProductIds.length})
                    </Button>
                  </div>
                )}
                {/* Pagination for Products */}
                {products && Array.isArray(products) && products.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" disabled={productPage === 1} onClick={() => setProductPage(productPage - 1)}>Previous</Button>
                    {Array.from({ length: totalProductPages }, (_, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={productPage === i + 1 ? "default" : "outline"}
                        onClick={() => setProductPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button size="sm" variant="outline" disabled={productPage === totalProductPages} onClick={() => setProductPage(productPage + 1)}>Next</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Management Table */}
            <Card className="border-0 shadow-lg mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-light">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <input
                    type="text"
                    placeholder="Search orders by user, email, or order ID..."
                    value={orderSearch || ""}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-64"
                  />
                </div>
                {selectedOrderIds.length > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <select value={bulkOrderStatus || ""} onChange={e => setBulkOrderStatus(e.target.value)} className="border rounded px-2 py-1">
                      <option value="">Change status to...</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <Button size="sm" disabled={!bulkOrderStatus} onClick={() => setBulkOrderStatusDialogOpen(true)}>
                      Change Status ({selectedOrderIds.length})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setBulkDeleteOrdersDialogOpen(true)}>
                      Delete Selected ({selectedOrderIds.length})
                    </Button>
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4"><input type="checkbox" checked={allOrdersSelected} onChange={toggleSelectAllOrders} /></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders && orders.length > 0 ? orders
                        .filter((order: any) =>
                          order.user?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          order.user?.email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          order.id?.toLowerCase().includes(orderSearch.toLowerCase())
                        )
                        .map((order: any) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4"><input type="checkbox" checked={selectedOrderIds.includes(order.id)} onChange={() => toggleOrderSelection(order.id)} /></td>
                            <td className="py-4 px-4 font-medium text-gray-900">{order.id}</td>
                            <td className="py-4 px-4 text-gray-700">{order.user?.name || order.user?.email}</td>
                            <td className="py-4 px-4 text-gray-700">
                              {order.items.map((item: any) => item.product?.name).join(", ")}
                            </td>
                            <td className="py-4 px-4 text-gray-900">${order.total.toFixed(2)}</td>
                            <td className="py-4 px-4">
                              <select
                                value={order.status}
                                onChange={e => openOrderStatusDialog(order.id, e.target.value)}
                                className="border rounded px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 px-4">
                              <Button size="sm" variant="outline" onClick={() => openOrderModal(order)}>
                                View Details
                              </Button>
                            </td>
                          </tr>
                        )) : (
                        <tr><td colSpan={8} className="py-4 px-4 text-center text-gray-500">No orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination for Orders */}
                {orders && orders.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" disabled={orderPage === 1} onClick={() => setOrderPage(orderPage - 1)}>Previous</Button>
                    {Array.from({ length: totalOrderPages }, (_, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={orderPage === i + 1 ? "default" : "outline"}
                        onClick={() => setOrderPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button size="sm" variant="outline" disabled={orderPage === totalOrderPages} onClick={() => setOrderPage(orderPage + 1)}>Next</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Category Management Table */}
            <Card className="border-0 shadow-lg mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-light">Category Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <input
                    type="text"
                    placeholder="Search categories by name..."
                    value={categorySearch || ""}
                    onChange={e => setCategorySearch(e.target.value)}
                    className="border rounded px-3 py-2 w-64"
                  />
                </div>
                {/* Create Category Form */}
                <form className="mb-6 flex flex-wrap gap-2 items-end" onSubmit={handleCreateCategory}>
                  <input type="text" placeholder="Name" value={newCategory.name || ""} onChange={e => setNewCategory({ name: e.target.value })} className="border rounded px-2 py-1" required />
                  <Button type="submit" size="sm">Add Category</Button>
                </form>
                {/* Category Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4"><input type="checkbox" checked={allCategoriesSelected} onChange={toggleSelectAllCategories} /></th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories && categories.length > 0 ? categories
                        .filter((category: any) =>
                          category.name?.toLowerCase().includes(categorySearch.toLowerCase())
                        )
                        .map((category: any) => (
                          <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4"><input type="checkbox" checked={selectedCategoryIds.includes(category.id)} onChange={() => toggleCategorySelection(category.id)} /></td>
                            <td className="py-4 px-4 font-medium text-gray-900">
                              {editingCategory && editingCategory.id === category.id ? (
                                <input type="text" value={editingCategory.name || ""} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} className="border rounded px-2 py-1" />
                              ) : category.name}
                            </td>
                            <td className="py-4 px-4">
                              {editingCategory && editingCategory.id === category.id ? (
                                <>
                                  <Button size="sm" onClick={handleUpdateCategory}>Save</Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>Edit</Button>
                                  <Button size="sm" variant="destructive" onClick={() => openDeleteCategoryDialog(category.id)}>Delete</Button>
                                </>
                              )}
                            </td>
                          </tr>
                        )) : (
                        <tr><td colSpan={2} className="py-4 px-4 text-center text-gray-500">No categories found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination for Categories */}
                {categories && categories.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" disabled={categoryPage === 1} onClick={() => setCategoryPage(categoryPage - 1)}>Previous</Button>
                    {Array.from({ length: totalCategoryPages }, (_, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={categoryPage === i + 1 ? "default" : "outline"}
                        onClick={() => setCategoryPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button size="sm" variant="outline" disabled={categoryPage === totalCategoryPages} onClick={() => setCategoryPage(categoryPage + 1)}>Next</Button>
                  </div>
                )}
                {selectedCategoryIds.length > 0 && (
                  <div className="mb-4 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Rename selected to..."
                      value={bulkCategoryName || ""}
                      onChange={e => setBulkCategoryName(e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                    <Button size="sm" disabled={!bulkCategoryName} onClick={() => setBulkCategoryRenameDialogOpen(true)}>
                      Rename ({selectedCategoryIds.length})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setBulkDeleteCategoriesDialogOpen(true)}>
                      Delete Selected ({selectedCategoryIds.length})
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delete User Confirmation Dialog */}
            <Dialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                  <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={closeDeleteUserDialog}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmDeleteUser}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Delete Product Confirmation Dialog */}
            <Dialog open={deleteProductDialogOpen} onOpenChange={setDeleteProductDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                  <DialogDescription>Are you sure you want to delete this product? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={closeDeleteProductDialog}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmDeleteProduct}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Delete Category Confirmation Dialog */}
            <Dialog open={deleteCategoryDialogOpen} onOpenChange={setDeleteCategoryDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Category</DialogTitle>
                  <DialogDescription>Are you sure you want to delete this category? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={closeDeleteCategoryDialog}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmDeleteCategory}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Order Status Change Confirmation Dialog */}
            <Dialog open={orderStatusDialogOpen} onOpenChange={setOrderStatusDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Order Status</DialogTitle>
                  <DialogDescription>Are you sure you want to change the order status to <span className="font-semibold">{orderStatusChange?.newStatus}</span>?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={closeOrderStatusDialog}>Cancel</Button>
                  <Button variant="default" onClick={confirmOrderStatusChange}>Change Status</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Order Details Modal */}
            <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Order Information</h4>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Total:</strong> ${(selectedOrder.total || 0).toLocaleString()}</p>
                        <p><strong>Created:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'Unknown'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Customer Information</h4>
                        <p><strong>Name:</strong> {selectedOrder.user?.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {selectedOrder.items && Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium">{item.product?.name || 'Unknown Product'}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Bulk Delete Users Confirmation Dialog */}
            <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Users</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the selected users? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmBulkDeleteUsers}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Delete Products Confirmation Dialog */}
            <Dialog open={bulkDeleteProductsDialogOpen} onOpenChange={setBulkDeleteProductsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Products</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the selected products? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkDeleteProductsDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmBulkDeleteProducts}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Delete Orders Confirmation Dialog */}
            <Dialog open={bulkDeleteOrdersDialogOpen} onOpenChange={setBulkDeleteOrdersDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Orders</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the selected orders? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkDeleteOrdersDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmBulkDeleteOrders}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Delete Categories Confirmation Dialog */}
            <Dialog open={bulkDeleteCategoriesDialogOpen} onOpenChange={setBulkDeleteCategoriesDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Categories</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the selected categories? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkDeleteCategoriesDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={confirmBulkDeleteCategories}>Delete</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Role Update Confirmation Dialog */}
            <Dialog open={bulkRoleDialogOpen} onOpenChange={setBulkRoleDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change User Roles</DialogTitle>
                  <DialogDescription>Are you sure you want to change the role of the selected users to <span className="font-semibold">{bulkRole}</span>?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkRoleDialogOpen(false)}>Cancel</Button>
                  <Button variant="default" onClick={confirmBulkRoleUpdate}>Change Role</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Order Status Update Confirmation Dialog */}
            <Dialog open={bulkOrderStatusDialogOpen} onOpenChange={setBulkOrderStatusDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Order Statuses</DialogTitle>
                  <DialogDescription>Are you sure you want to change the status of the selected orders to <span className="font-semibold">{bulkOrderStatus}</span>?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkOrderStatusDialogOpen(false)}>Cancel</Button>
                  <Button variant="default" onClick={confirmBulkOrderStatusUpdate}>Change Status</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Category Rename Confirmation Dialog */}
            <Dialog open={bulkCategoryRenameDialogOpen} onOpenChange={setBulkCategoryRenameDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Categories</DialogTitle>
                  <DialogDescription>Are you sure you want to rename the selected categories to <span className="font-semibold">{bulkCategoryName}</span>?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setBulkCategoryRenameDialogOpen(false)}>Cancel</Button>
                  <Button variant="default" onClick={confirmBulkCategoryRename}>Rename</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </ClientOnly>
    )
  } catch (error) {
    console.error('AdminDashboard Error:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Something went wrong</p>
          <p className="text-gray-600 text-sm">Please refresh the page or contact support</p>
        </div>
      </div>
    )
  }
}
