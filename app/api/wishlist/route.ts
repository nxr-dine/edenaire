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

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
      include: {
        products: true,
      },
    })

    if (!wishlist) {
      return NextResponse.json([])
    }

    // Transform wishlist items for the frontend
    const transformedWishlist = wishlist.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: `$${product.price.toFixed(2)}`,
      image: product.image || "/placeholder.svg",
    }))

    return NextResponse.json(transformedWishlist)
  } catch (error) {
    console.error("Wishlist GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { productId } = body

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

    // Add product to wishlist
    await prisma.wishlist.upsert({
      where: { userId: user.id },
      update: {
        products: {
          connect: { id: productId },
        },
      },
      create: {
        userId: user.id,
        products: {
          connect: { id: productId },
        },
      },
    })

    return NextResponse.json({ message: "Product added to wishlist" })
  } catch (error) {
    console.error("Wishlist POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

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

    // Remove product from wishlist
    await prisma.wishlist.update({
      where: { userId: user.id },
      data: {
        products: {
          disconnect: { id: productId },
        },
      },
    })

    return NextResponse.json({ message: "Product removed from wishlist" })
  } catch (error) {
    console.error("Wishlist DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 