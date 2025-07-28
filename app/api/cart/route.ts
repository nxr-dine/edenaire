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
      include: { 
        items: { 
          include: { 
            product: {
              include: { category: true }
            } 
          } 
        } 
      },
    })
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      const newCart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: { include: { product: { include: { category: true } } } } }
      })
      return NextResponse.json(newCart)
    }
    
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart fetch error:", error)
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
    
    // Validate required fields
    if (!productId || !quantity) {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }
    
    // Validate quantity
    if (typeof quantity !== 'number' || quantity <= 0 || quantity > 99) {
      return NextResponse.json({ error: "Quantity must be a positive number between 1 and 99" }, { status: 400 })
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    // Get or create cart
    let cart = await prisma.cart.findUnique({ where: { userId: user.id } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: user.id } })
    }
    
    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({ 
      where: { cartId: cart.id, productId } 
    })
    
    let cartItem
    if (existingItem) {
      // Update existing item
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { 
          quantity,
          productPrice: product.price // Update price in case it changed
        },
        include: { product: { include: { category: true } } }
      })
    } else {
      // Create new item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          productPrice: product.price
        },
        include: { product: { include: { category: true } } }
      })
    }
    
    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    console.error("Cart update error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
} 