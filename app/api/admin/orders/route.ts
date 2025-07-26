import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

async function isAdmin(session: any) {
  return session && session.user?.role === "admin"
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { orderId, status } = await req.json()
    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 })
    }
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { user: true, items: true },
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
} 