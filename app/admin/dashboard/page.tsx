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
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Crown,
  Diamond,
  Gem,
  Watch,
  Heart,
  Share2,
  Download,
  Upload,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Zap,
  Shield,
  Lock,
  Unlock,
  RefreshCw,
  RotateCcw,
  Save,
  Copy,
  Link,
  ExternalLink,
  Home,
  Grid,
  List,
  Columns,
  Maximize,
  Minimize,
  Move,
  GripVertical,
  Hash,
  Percent,
  Minus,
  Equal,
  Divide,
  Plus as PlusIcon,
  X,
  Check,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Folder,
  File,
  FolderOpen,
  FolderPlus,
  FilePlus,
  FileEdit,
  FileX,
  FileCheck,
  FileSearch,
  FileDown,
  FileUp,
  FileMinus,
  FilePlus2,
  FileText2,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileCsv,
  FileJson,
  FileXml,
  FileYaml,
  FileMarkdown,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileReact,
  FileAngular,
  FileSvelte,
  FileNext,
  FileNuxt,
  FileVite,
  FileWebpack,
  FileRollup,
  FileParcel,
  FileBabel,
  FileEslint,
  FilePrettier,
  FileJest,
  FileCypress,
  FilePlaywright,
  FileStorybook,
  FileTailwind,
  FileBootstrap,
  FileMaterial,
  FileAntd,
  FileChakra,
  FileMui,
  FileShadcn,
  FileRadix,
  FileFramer,
  FileThree,
  FileD3,
  FileChart,
  FileTable,
  FileDatabase,
  FileServer,
  FileApi,
  FileGraphql,
  FileRest,
  FileSwagger,
  FileOpenapi,
  FileGrpc,
  FileWebsocket,
  FileSocket,
  FileRedis,
  FileMongo,
  FilePostgres,
  FileMysql,
  FileSqlite,
  FileOracle,
  FileSql,
  FileNosql,
  FileFirebase,
  FileSupabase,
  FileAuth0,
  FileStripe,
  FilePaypal,
  FileSquare,
  FileCoinbase,
  FileBitcoin,
  FileEthereum,
  FileCrypto,
  FileNft,
  FileBlockchain,
  FileWeb3,
  FileMetamask,
  FileWallet,
  FileExchange,
  FileTrading,
  FileChart2,
  FileCandlestick,
  FileTrending,
  FileAnalytics,
  FileMetrics,
  FileKpi,
  FileDashboard,
  FileReport,
  FileInsights,
  FileData,
  FileBigdata,
  FileAi,
  FileMl,
  FileNeural,
  FileRobot,
  FileAutomation,
  FileBot,
  FileChat,
  FileGpt,
  FileOpenai,
  FileClaude,
  FileBard,
  FileCopilot,
  FileAssistant,
  FileVoice,
  FileSpeech,
  FileAudio2,
  FileVideo2,
  FileStream,
  FileBroadcast,
  FilePodcast,
  FileRadio,
  FileTv,
  FileMovie,
  FilePhoto,
  FileCamera,
  FileScan,
  FileQr,
  FileBarcode,
  FileFingerprint,
  FileFace,
  FileEye,
  FileEar,
  FileNose,
  FileMouth,
  FileTongue,
  FileBrain,
  FileHeart,
  FileLungs,
  FileLiver,
  FileKidney,
  FileStomach,
  FileIntestine,
  FileBone,
  FileMuscle,
  FileSkin,
  FileHair,
  FileNail,
  FileTooth,
  FileDna,
  FileGene,
  FileCell,
  FileVirus,
  FileBacteria,
  FileParasite,
  FileDisease,
  FileMedicine,
  FilePill,
  FileSyringe,
  FileBandage,
  FileThermometer,
  FileStethoscope,
  FileXray,
  FileMri,
  FileCt,
  FileUltrasound,
  FileEcg,
  FileEeg,
  FileEmg,
  FileEog,
  FileEpg,
  FileErg,
  FileVep,
  FileBera,
  FileOae,
  FileTympanometry,
  FileAudiometry,
  FileSpirometry,
  FilePeak,
  FileFev,
  FileFvc,
  FileTlc,
  FileRv,
  FileFrc,
  FileIc,
  FileErv,
  FileTv2,
  FileVt,
  FileVd,
  FileVa,
  FileQ,
  FileV,
  FileP,
  FileT,
  FileR,
  FileS,
  FileU,
  FileW,
  FileX,
  FileY,
  FileZ,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientOnly } from "@/components/client-only"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
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

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user?.role !== "admin")) {
      router.replace("/auth/login")
    }
  }, [status, session, router])

  if (status === "loading" || (session && session.user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500" />
      </div>
    )
  }

  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Subscribers",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Orders This Month",
      value: "342",
      change: "-2.1%",
      trend: "down",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const subscriptionStats = [
    {
      tier: "Tier 1 (Free)",
      count: 892,
      percentage: 71.5,
      revenue: "$0",
      icon: Star,
      color: "bg-gray-100 text-gray-800",
    },
    {
      tier: "Tier 2 (Prestige)",
      count: 284,
      percentage: 22.8,
      revenue: "$849,160",
      icon: Diamond,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      tier: "Tier 3 (Ultra-Exclusive)",
      count: 71,
      percentage: 5.7,
      revenue: "$709,290",
      icon: Crown,
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-2024-001",
      customer: "Isabella Rothschild",
      product: "Celestial Diamond Necklace",
      amount: "$45,000",
      status: "Completed",
      tier: "Tier 3",
      date: "2024-01-15",
    },
    {
      id: "ORD-2024-002",
      customer: "Marcus Wellington",
      product: "Royal Sapphire Ring",
      amount: "$35,800",
      status: "Processing",
      tier: "Tier 2",
      date: "2024-01-14",
    },
    {
      id: "ORD-2024-003",
      customer: "Sophia Chen",
      product: "Golden Aurora Earrings",
      amount: "$18,200",
      status: "Shipped",
      tier: "Tier 2",
      date: "2024-01-13",
    },
    {
      id: "ORD-2024-004",
      customer: "Alessandro Medici",
      product: "Heritage Pearl Bracelet",
      amount: "$22,400",
      status: "Completed",
      tier: "Tier 3",
      date: "2024-01-12",
    },
  ]

  const topProducts = [
    {
      name: "Celestial Diamond Necklace",
      sales: 24,
      revenue: "$1,080,000",
      tier: "Tier 3",
      trend: "up",
    },
    {
      name: "Royal Sapphire Ring",
      sales: 18,
      revenue: "$644,400",
      tier: "Tier 2",
      trend: "up",
    },
    {
      name: "Golden Aurora Earrings",
      sales: 32,
      revenue: "$582,400",
      tier: "Tier 2",
      trend: "down",
    },
    {
      name: "Heritage Pearl Bracelet",
      sales: 15,
      revenue: "$336,000",
      tier: "Tier 1",
      trend: "up",
    },
  ]

  // User Management Section
  const { data: users, mutate } = useSWR(session && session.user?.role === "admin" ? "/api/admin/users" : null, fetcher)

  async function handleRoleChange(userId: string, role: string) {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    })
    mutate()
  }

  async function handleDeleteUser(userId: string) {
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
    mutate()
  }

  const { data: products, mutate: mutateProducts } = useSWR(session && session.user?.role === "admin" ? "/api/products" : null, fetcher)

  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: "", categoryId: "" })

  async function handleDeleteProduct(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    mutateProducts()
  }

  async function handleEditProduct(product: any) {
    setEditingProduct(product)
  }

  async function handleUpdateProduct() {
    await fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    })
    setEditingProduct(null)
    mutateProducts()
  }

  async function handleCreateProduct(e: any) {
    e.preventDefault()
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
    })
    setNewProduct({ name: "", description: "", price: "", image: "", categoryId: "" })
    mutateProducts()
  }

  const { data: orders, mutate: mutateOrders } = useSWR(session && session.user?.role === "admin" ? "/api/admin/orders" : null, fetcher)

  async function handleUpdateOrderStatus(orderId: string, status: string) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    })
    mutateOrders()
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
        method: "PATCH",
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

  const { data: categories, mutate: mutateCategories } = useSWR(session && session.user?.role === "admin" ? "/api/categories" : null, fetcher)
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
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
    setNewCategory({ name: "" })
    mutateCategories()
    toast({ title: "Category created", description: "The category was created successfully." })
  }

  async function handleEditCategory(category: any) {
    setEditingCategory(category)
  }

  async function handleUpdateCategory() {
    await fetch(`/api/categories/${editingCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingCategory),
    })
    setEditingCategory(null)
    mutateCategories()
    toast({ title: "Category updated", description: "The category was updated successfully." })
  }

  async function confirmDeleteCategory() {
    try {
      await fetch(`/api/categories/${deleteCategoryId}`, { method: "DELETE" })
      mutateCategories()
      toast({ title: "Category deleted", description: "The category was deleted successfully." })
    } catch {
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" })
    }
    closeDeleteCategoryDialog()
  }

  const { data: analytics } = useSWR(session && session.user?.role === "admin" ? "/api/admin/analytics" : null, fetcher)

  const [userSearch, setUserSearch] = useState("")
  const [productSearch, setProductSearch] = useState("")
  const [orderSearch, setOrderSearch] = useState("")
  const [categorySearch, setCategorySearch] = useState("")

  const [userPage, setUserPage] = useState(1)
  const USERS_PER_PAGE = 10

  const [productPage, setProductPage] = useState(1)
  const PRODUCTS_PER_PAGE = 10

  const [orderPage, setOrderPage] = useState(1)
  const ORDERS_PER_PAGE = 10

  const [categoryPage, setCategoryPage] = useState(1)
  const CATEGORIES_PER_PAGE = 10

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const allUsersSelected = users && users.length > 0 && users.every((user: any) => selectedUserIds.includes(user.id))

  function toggleUserSelection(userId: string) {
    setSelectedUserIds(ids => ids.includes(userId) ? ids.filter(id => id !== userId) : [...ids, userId])
  }
  function toggleSelectAllUsers() {
    if (allUsersSelected) {
      setSelectedUserIds(ids => ids.filter(id => !users.some((user: any) => user.id === id)))
    } else {
      setSelectedUserIds(ids => [...ids, ...users.filter((user: any) => !ids.includes(user.id)).map((user: any) => user.id)])
    }
  }

  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  async function confirmBulkDeleteUsers() {
    try {
      await Promise.all(selectedUserIds.map(userId => fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })))
      mutate()
      toast({ title: "Users deleted", description: "Selected users were deleted successfully." })
      setSelectedUserIds([])
    } catch {
      toast({ title: "Error", description: "Failed to delete users.", variant: "destructive" })
    }
    setBulkDeleteDialogOpen(false)
  }

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const allProductsSelected = products && products.length > 0 && products.every((product: any) => selectedProductIds.includes(product.id))

  function toggleProductSelection(productId: string) {
    setSelectedProductIds(ids => ids.includes(productId) ? ids.filter(id => id !== productId) : [...ids, productId])
  }
  function toggleSelectAllProducts() {
    if (allProductsSelected) {
      setSelectedProductIds(ids => ids.filter(id => !products.some((product: any) => product.id === id)))
    } else {
      setSelectedProductIds(ids => [...ids, ...products.filter((product: any) => !ids.includes(product.id)).map((product: any) => product.id)])
    }
  }

  const [bulkDeleteProductsDialogOpen, setBulkDeleteProductsDialogOpen] = useState(false)

  async function confirmBulkDeleteProducts() {
    try {
      await Promise.all(selectedProductIds.map(productId => fetch(`/api/products/${productId}`, { method: "DELETE" })))
      mutateProducts()
      toast({ title: "Products deleted", description: "Selected products were deleted successfully." })
      setSelectedProductIds([])
    } catch {
      toast({ title: "Error", description: "Failed to delete products.", variant: "destructive" })
    }
    setBulkDeleteProductsDialogOpen(false)
  }

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
  const allOrdersSelected = orders && orders.length > 0 && orders.every((order: any) => selectedOrderIds.includes(order.id))

  function toggleOrderSelection(orderId: string) {
    setSelectedOrderIds(ids => ids.includes(orderId) ? ids.filter(id => id !== orderId) : [...ids, orderId])
  }
  function toggleSelectAllOrders() {
    if (allOrdersSelected) {
      setSelectedOrderIds(ids => ids.filter(id => !orders.some((order: any) => order.id === id)))
    } else {
      setSelectedOrderIds(ids => [...ids, ...orders.filter((order: any) => !ids.includes(order.id)).map((order: any) => order.id)])
    }
  }

  const [bulkDeleteOrdersDialogOpen, setBulkDeleteOrdersDialogOpen] = useState(false)

  async function confirmBulkDeleteOrders() {
    try {
      await Promise.all(selectedOrderIds.map(orderId => fetch(`/api/admin/orders`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })))
      mutateOrders()
      toast({ title: "Orders deleted", description: "Selected orders were deleted successfully." })
      setSelectedOrderIds([])
    } catch {
      toast({ title: "Error", description: "Failed to delete orders.", variant: "destructive" })
    }
    setBulkDeleteOrdersDialogOpen(false)
  }

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const allCategoriesSelected = categories && categories.length > 0 && categories.every((category: any) => selectedCategoryIds.includes(category.id))

  function toggleCategorySelection(categoryId: string) {
    setSelectedCategoryIds(ids => ids.includes(categoryId) ? ids.filter(id => id !== categoryId) : [...ids, categoryId])
  }
  function toggleSelectAllCategories() {
    if (allCategoriesSelected) {
      setSelectedCategoryIds(ids => ids.filter(id => !categories.some((category: any) => category.id === id)))
    } else {
      setSelectedCategoryIds(ids => [...ids, ...categories.filter((category: any) => !ids.includes(category.id)).map((category: any) => category.id)])
    }
  }

  const [bulkDeleteCategoriesDialogOpen, setBulkDeleteCategoriesDialogOpen] = useState(false)

  async function confirmBulkDeleteCategories() {
    try {
      await Promise.all(selectedCategoryIds.map(categoryId => fetch(`/api/categories/${categoryId}`, { method: "DELETE" })))
      mutateCategories()
      toast({ title: "Categories deleted", description: "Selected categories were deleted successfully." })
      setSelectedCategoryIds([])
    } catch {
      toast({ title: "Error", description: "Failed to delete categories.", variant: "destructive" })
    }
    setBulkDeleteCategoriesDialogOpen(false)
  }

  const [bulkRole, setBulkRole] = useState("")
  const [bulkRoleDialogOpen, setBulkRoleDialogOpen] = useState(false)

  async function confirmBulkRoleUpdate() {
    try {
      await Promise.all(selectedUserIds.map(userId => fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: bulkRole }),
      })))
      mutate()
      toast({ title: "Roles updated", description: `Selected users were updated to role: ${bulkRole}.` })
      setSelectedUserIds([])
      setBulkRole("")
    } catch {
      toast({ title: "Error", description: "Failed to update user roles.", variant: "destructive" })
    }
    setBulkRoleDialogOpen(false)
  }

  const [bulkOrderStatus, setBulkOrderStatus] = useState("")
  const [bulkOrderStatusDialogOpen, setBulkOrderStatusDialogOpen] = useState(false)

  async function confirmBulkOrderStatusUpdate() {
    try {
      await Promise.all(selectedOrderIds.map(orderId => fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: bulkOrderStatus }),
      })))
      mutateOrders()
      toast({ title: "Order statuses updated", description: `Selected orders were updated to status: ${bulkOrderStatus}.` })
      setSelectedOrderIds([])
      setBulkOrderStatus("")
    } catch {
      toast({ title: "Error", description: "Failed to update order statuses.", variant: "destructive" })
    }
    setBulkOrderStatusDialogOpen(false)
  }

  const [bulkCategoryName, setBulkCategoryName] = useState("")
  const [bulkCategoryRenameDialogOpen, setBulkCategoryRenameDialogOpen] = useState(false)

  async function confirmBulkCategoryRename() {
    try {
      await Promise.all(selectedCategoryIds.map(categoryId => fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bulkCategoryName }),
      })))
      mutateCategories()
      toast({ title: "Categories renamed", description: `Selected categories were renamed to: ${bulkCategoryName}.` })
      setSelectedCategoryIds([])
      setBulkCategoryName("")
    } catch {
      toast({ title: "Error", description: "Failed to rename categories.", variant: "destructive" })
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
                      labels: analytics.salesPerMonth.map((m: any) => `${m.year}-${String(m.month).padStart(2, "0")}`),
                      datasets: [
                        {
                          label: "Sales ($)",
                          data: analytics.salesPerMonth.map((m: any) => m.total),
                          borderColor: "#f59e0b",
                          backgroundColor: "rgba(251,191,36,0.2)",
                          tension: 0.4,
                          fill: true,
                        },
                        {
                          label: "Orders",
                          data: analytics.salesPerMonth.map((m: any) => m.count),
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
                      labels: analytics.topProducts.map((p: any) => p.name),
                      datasets: [
                        {
                          label: "Units Sold",
                          data: analytics.topProducts.map((p: any) => p.quantity),
                          backgroundColor: "#f59e0b",
                        },
                        {
                          label: "Revenue ($)",
                          data: analytics.topProducts.map((p: any) => p.revenue),
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
                      labels: analytics.userRegistrations.map((m: any) => `${m.year}-${String(m.month).padStart(2, "0")}`),
                      datasets: [
                        {
                          label: "Registrations",
                          data: analytics.userRegistrations.map((m: any) => m.count),
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
                      labels: analytics.categorySales.map((c: any) => c.name),
                      datasets: [
                        {
                          label: "Revenue ($)",
                          data: analytics.categorySales.map((c: any) => c.revenue),
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
                          <p className="text-sm text-gray-600">{tier.count} subscribers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={tier.color}>{tier.percentage}%</Badge>
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
                  <Button className="w-full justify-start bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Subscribers
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="h-4 w-4 mr-2" />
                    Inventory Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tier</th>
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
                              order.tier === "Tier 3"
                                ? "bg-purple-100 text-purple-800"
                                : order.tier === "Tier 2"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {order.tier}
                          </Badge>
                        </td>
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
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-light">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="border rounded px-3 py-2 w-64"
                />
              </div>
              {selectedUserIds.length > 0 && (
                <div className="mb-4 flex items-center gap-2">
                  <select value={bulkRole} onChange={e => setBulkRole(e.target.value)} className="border rounded px-2 py-1">
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
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-light">Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Create Product Form */}
              <form className="mb-6 flex flex-wrap gap-2 items-end" onSubmit={handleCreateProduct}>
                <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="border rounded px-2 py-1" required />
                <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border rounded px-2 py-1" />
                <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="border rounded px-2 py-1" required />
                <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="border rounded px-2 py-1" />
                <input type="text" placeholder="Category ID" value={newProduct.categoryId} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} className="border rounded px-2 py-1" />
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length > 0 ? products
                      .filter((product: any) =>
                        product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
                        product.description?.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((product: any) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4"><input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => toggleProductSelection(product.id)} /></td>
                        <td className="py-4 px-4 font-medium text-gray-900">
                          {editingProduct && editingProduct.id === product.id ? (
                            <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="border rounded px-2 py-1" />
                          ) : product.name}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {editingProduct && editingProduct.id === product.id ? (
                            <input type="text" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border rounded px-2 py-1" />
                          ) : product.description}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {editingProduct && editingProduct.id === product.id ? (
                            <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} className="border rounded px-2 py-1" />
                          ) : product.price}
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
                      <tr><td colSpan={6} className="py-4 px-4 text-center text-gray-500">No products found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {selectedProductIds.length > 0 && (
                <div className="mb-4 flex items-center gap-2">
                  <Button variant="destructive" size="sm" onClick={() => setBulkDeleteProductsDialogOpen(true)}>
                    Delete Selected ({selectedProductIds.length})
                  </Button>
                </div>
              )}
              {/* Pagination for Products */}
              {products && products.length > 0 && (
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
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="border rounded px-3 py-2 w-64"
                />
              </div>
              {selectedOrderIds.length > 0 && (
                <div className="mb-4 flex items-center gap-2">
                  <select value={bulkOrderStatus} onChange={e => setBulkOrderStatus(e.target.value)} className="border rounded px-2 py-1">
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
              {/* Create Category Form */}
              <form className="mb-6 flex flex-wrap gap-2 items-end" onSubmit={handleCreateCategory}>
                <input type="text" placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ name: e.target.value })} className="border rounded px-2 py-1" required />
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
                            <input type="text" value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} className="border rounded px-2 py-1" />
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
                    value={bulkCategoryName}
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

          {/* Order Details Modal */}
          <Dialog open={orderModalOpen} onOpenChange={closeOrderModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>Order ID: {selectedOrder?.id}</DialogDescription>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">User:</span> {selectedOrder.user?.name || selectedOrder.user?.email}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {selectedOrder.status}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {new Date(selectedOrder.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Total:</span> ${selectedOrder.total.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Products:</span>
                    <ul className="ml-4 mt-2 list-disc">
                      {selectedOrder.items.map((item: any) => (
                        <li key={item.id}>
                          {item.product?.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete User Confirmation Dialog */}
          <Dialog open={deleteUserDialogOpen} onOpenChange={closeDeleteUserDialog}>
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
          <Dialog open={deleteProductDialogOpen} onOpenChange={closeDeleteProductDialog}>
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

          {/* Order Status Change Confirmation Dialog */}
          <Dialog open={orderStatusDialogOpen} onOpenChange={closeOrderStatusDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Order Status</DialogTitle>
                <DialogDescription>Are you sure you want to change the order status to <span className="font-semibold">{orderStatusChange?.newStatus}</span>?</DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={closeOrderStatusDialog}>Cancel</Button>
                <Button variant="default" onClick={confirmOrderStatusChange}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Category Confirmation Dialog */}
          <Dialog open={deleteCategoryDialogOpen} onOpenChange={closeDeleteCategoryDialog}>
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

          {/* Bulk Delete User Confirmation Dialog */}
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
}
