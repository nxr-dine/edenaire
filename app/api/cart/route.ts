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
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    })
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
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
    const { productId, quantity } = await req.json()
    if (!productId || !quantity) {
      return NextResponse.json({ error: "Missing productId or quantity" }, { status: 400 })
    }
    let cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } })
    }
    const existingItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } })
    let cartItem
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
      })
    } else {
      cartItem = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      })
    }
    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
} 