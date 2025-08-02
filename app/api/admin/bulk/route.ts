import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { action, ids, data } = body

    if (!action || !ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Action and IDs array are required" }, { status: 400 })
    }

    switch (action) {
      case "deleteUsers":
        await prisma.user.deleteMany({
          where: { id: { in: ids } },
        })
        return NextResponse.json({ message: `${ids.length} users deleted` })

      case "updateUserRoles":
        if (!data?.role) {
          return NextResponse.json({ error: "Role is required for user role update" }, { status: 400 })
        }
        await prisma.user.updateMany({
          where: { id: { in: ids } },
          data: { role: data.role },
        })
        return NextResponse.json({ message: `${ids.length} user roles updated` })

      case "deleteProducts":
        await prisma.product.deleteMany({
          where: { id: { in: ids } },
        })
        return NextResponse.json({ message: `${ids.length} products deleted` })

      case "deleteOrders":
        await prisma.order.deleteMany({
          where: { id: { in: ids } },
        })
        return NextResponse.json({ message: `${ids.length} orders deleted` })

      case "updateOrderStatus":
        if (!data?.status) {
          return NextResponse.json({ error: "Status is required for order status update" }, { status: 400 })
        }
        await prisma.order.updateMany({
          where: { id: { in: ids } },
          data: { status: data.status },
        })
        return NextResponse.json({ message: `${ids.length} order statuses updated` })

      case "deleteCategories":
        await prisma.category.deleteMany({
          where: { id: { in: ids } },
        })
        return NextResponse.json({ message: `${ids.length} categories deleted` })

      case "renameCategories":
        if (!data?.name) {
          return NextResponse.json({ error: "Name is required for category rename" }, { status: 400 })
        }
        await prisma.category.updateMany({
          where: { id: { in: ids } },
          data: { name: data.name },
        })
        return NextResponse.json({ message: `${ids.length} categories renamed` })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Admin bulk operations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 