import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    })
    if (!cart || !cart.items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: cart.items.reduce((sum, item) => sum + item.quantity * (item.productPrice || 0), 0),
        status: "pending",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.productPrice || 0,
          })),
        },
      },
      include: { items: true },
    })
    // Clear the cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 })
  }
} 