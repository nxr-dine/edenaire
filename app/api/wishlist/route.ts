import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlist: {
          include: {
            products: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      products: user.wishlist?.products || [],
    })
  } catch (error) {
    console.error("Wishlist GET error:", error)
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
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlist: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get or create wishlist
    let wishlist = user.wishlist
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id },
      })
    }

    // Add product to wishlist
    await prisma.wishlist.update({
      where: { id: wishlist.id },
      data: {
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
    const session = await auth()
    
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
      include: {
        wishlist: true,
      },
    })

    if (!user || !user.wishlist) {
      return NextResponse.json({ error: "Wishlist not found" }, { status: 404 })
    }

    // Remove product from wishlist
    await prisma.wishlist.update({
      where: { id: user.wishlist.id },
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