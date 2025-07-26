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
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
      include: { products: true },
    })
    return NextResponse.json(wishlist)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
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
    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 })
    }
    let wishlist = await prisma.wishlist.findUnique({ where: { userId: user.id } })
    if (!wishlist) {
      wishlist = await prisma.wishlist.create({ data: { userId: user.id } })
    }
    await prisma.wishlist.update({
      where: { id: wishlist.id },
      data: { products: { connect: { id: productId } } },
    })
    return NextResponse.json({ message: "Product added to wishlist" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
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
    const wishlist = await prisma.wishlist.findUnique({ where: { userId: user.id } })
    if (!wishlist) return NextResponse.json({ error: "Wishlist not found" }, { status: 404 })
    await prisma.wishlist.update({
      where: { id: wishlist.id },
      data: { products: { disconnect: { id: productId } } },
    })
    return NextResponse.json({ message: "Product removed from wishlist" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
  }
} 