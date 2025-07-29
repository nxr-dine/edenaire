import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

async function isAdmin(session: any) {
  return session && session.user?.role === "admin"
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { action, ids, data } = await req.json()
    
    if (!action || !ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    switch (action) {
      case "deleteUsers":
        await prisma.user.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case "updateUserRoles":
        if (!data?.role) {
          return NextResponse.json({ error: "Missing role" }, { status: 400 })
        }
        await prisma.user.updateMany({
          where: { id: { in: ids } },
          data: { role: data.role }
        })
        break

      case "deleteProducts":
        await prisma.product.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case "deleteOrders":
        await prisma.order.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case "updateOrderStatus":
        if (!data?.status) {
          return NextResponse.json({ error: "Missing status" }, { status: 400 })
        }
        await prisma.order.updateMany({
          where: { id: { in: ids } },
          data: { status: data.status }
        })
        break

      case "deleteCategories":
        await prisma.category.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case "renameCategories":
        if (!data?.name) {
          return NextResponse.json({ error: "Missing name" }, { status: 400 })
        }
        await prisma.category.updateMany({
          where: { id: { in: ids } },
          data: { name: data.name }
        })
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ message: "Bulk operation completed successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to perform bulk operation" }, { status: 500 })
  }
} 