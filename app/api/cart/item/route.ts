import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    
    const { productId, quantity } = await req.json()
    
    // Validate required fields
    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }
    
    // Validate quantity
    if (quantity <= 0 || quantity > 99) {
      return NextResponse.json({ error: "Quantity must be between 1 and 99" }, { status: 400 })
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    
    const cartItem = await prisma.cartItem.findFirst({ 
      where: { cartId: cart.id, productId } 
    })
    
    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    
    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { 
        quantity,
        productPrice: product.price // Update price in case it changed
      },
      include: { product: { include: { category: true } } }
    })
    
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Cart item update error:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    
    const { productId } = await req.json()
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }
    
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    
    const cartItem = await prisma.cartItem.findFirst({ 
      where: { cartId: cart.id, productId } 
    })
    
    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    
    await prisma.cartItem.delete({ where: { id: cartItem.id } })
    return NextResponse.json({ message: "Cart item removed successfully" })
  } catch (error) {
    console.error("Cart item deletion error:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
} 