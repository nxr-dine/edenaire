import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

async function isAdmin(session: any) {
  return session && session.user?.role === "admin"
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { name, description, price, quantity, discount, image, categoryId } = await req.json()
    if (!name || !description || !price || !quantity || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        discount: parseFloat(discount || "0"),
        image: image || "/placeholder.svg",
        categoryId,
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, name, description, price, quantity, discount, image, categoryId } = await req.json()
    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 })
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(quantity && { quantity: parseInt(quantity) }),
        ...(discount !== undefined && { discount: parseFloat(discount) }),
        ...(image && { image }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 })
    }
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ message: "Product deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
} 