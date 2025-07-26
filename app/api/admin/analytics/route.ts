import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Sales and orders per month for last 12 months
    const now = new Date()
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      return { year: d.getFullYear(), month: d.getMonth() + 1 }
    }).reverse()

    const salesPerMonth = await Promise.all(
      months.map(async ({ year, month }) => {
        const start = new Date(year, month - 1, 1)
        const end = new Date(year, month, 1)
        const orders = await prisma.order.findMany({
          where: {
            createdAt: { gte: start, lt: end },
            status: { in: ["completed", "processing"] },
          },
        })
        const total = orders.reduce((sum, o) => sum + o.total, 0)
        return { year, month, total, count: orders.length }
      })
    )

    // User registrations per month
    const userRegistrations = await Promise.all(
      months.map(async ({ year, month }) => {
        const start = new Date(year, month - 1, 1)
        const end = new Date(year, month, 1)
        const count = await prisma.user.count({
          where: { createdAt: { gte: start, lt: end } },
        })
        return { year, month, count }
      })
    )

    // Top 5 products by sales (all time)
    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    })
    const productIds = topProducts.map(p => p.productId)
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } })
    const topProductsDetailed = topProducts.map(tp => {
      const product = products.find(p => p.id === tp.productId)
      return {
        name: product?.name || "Unknown",
        quantity: tp._sum.quantity || 0,
        revenue: tp._sum.price || 0,
      }
    })

    // Category sales
    const allCategories = await prisma.category.findMany()
    const categorySales = await Promise.all(
      allCategories.map(async (cat) => {
        const products = await prisma.product.findMany({ where: { categoryId: cat.id } })
        const productIds = products.map(p => p.id)
        if (productIds.length === 0) return { name: cat.name, revenue: 0 }
        const orderItems = await prisma.orderItem.findMany({ where: { productId: { in: productIds } } })
        const revenue = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return { name: cat.name, revenue }
      })
    )

    return NextResponse.json({ salesPerMonth, topProducts: topProductsDetailed, userRegistrations, categorySales })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
} 