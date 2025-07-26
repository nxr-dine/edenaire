import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const { productId, quantity } = await req.json()
    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Missing productId or quantity" }, { status: 400 })
    }
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    const cartItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } })
    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    })
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 })
    }
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    const cartItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } })
    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    await prisma.cartItem.delete({ where: { id: cartItem.id } })
    return NextResponse.json({ message: "Cart item removed" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
} 