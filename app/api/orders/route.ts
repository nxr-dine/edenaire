import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Transform orders for the frontend
    const transformedOrders = orders.map((order) => ({
      id: order.id,
      date: order.createdAt.toISOString(),
      total: `$${order.total.toFixed(2)}`,
      status: order.status,
      statusColor: order.status === "delivered" ? "green" : order.status === "shipped" ? "blue" : "yellow",
      items: order.items.map((item) => item.product.name),
    }))

    return NextResponse.json(transformedOrders)
  } catch (error) {
    console.error("Orders GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
      include: { 
        items: {
          include: { product: true }
        } 
      },
    })
    
    if (!cart || !cart.items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }
    
    // Validate all products still exist and have valid prices
    for (const item of cart.items) {
      if (!item.product) {
        return NextResponse.json({ 
          error: `Product ${item.productId} no longer exists` 
        }, { status: 400 })
      }
      
      if (item.productPrice <= 0) {
        return NextResponse.json({ 
          error: `Invalid price for product ${item.product.name}` 
        }, { status: 400 })
      }
    }
    
    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.quantity * (item.productPrice || 0))
    }, 0)
    
    if (total <= 0) {
      return NextResponse.json({ error: "Order total must be greater than 0" }, { status: 400 })
    }
    
    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: "pending",
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.productPrice || 0,
            })),
          },
        },
        include: { 
          items: {
            include: { product: { include: { category: true } } }
          } 
        },
      })
      
      // Clear the cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
      
      return newOrder
    })
    
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 })
  }
} 