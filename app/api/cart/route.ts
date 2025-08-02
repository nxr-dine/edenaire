import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

// Helper function to calculate discount percentage based on tier
const getDiscountPercentage = (tier: string): number => {
  switch (tier) {
    case "Ultra-Exclusive":
      return 25
    case "Prestige Collection":
      return 15
    default:
      return 0
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, tier: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart) {
      return NextResponse.json({ 
        items: [], 
        total: 0, 
        discountedTotal: 0,
        discountPercentage: 0,
        userTier: user.tier 
      })
    }

    const discountPercentage = getDiscountPercentage(user.tier)
    const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const discountAmount = (subtotal * discountPercentage) / 100
    const discountedTotal = Math.round(subtotal - discountAmount)

    return NextResponse.json({
      items: cart.items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        discountedPrice: discountPercentage > 0 ? Math.round(item.product.price * (1 - discountPercentage / 100)) : item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      total: subtotal,
      discountedTotal,
      discountPercentage,
      discountAmount: Math.round(discountAmount),
      userTier: user.tier,
    })
  } catch (error) {
    console.error("Cart GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { productId, quantity = 1 } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ message: "Item added to cart" })
  } catch (error) {
    console.error("Cart POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 