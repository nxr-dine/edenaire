import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { name, description, price, image, categoryId } = body
    
    // Validate required fields
    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 })
    }
    
    // Validate price is a positive number
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 })
    }
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })
    
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    // Validate category exists if provided
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })
      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 })
      }
    }
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: { 
        name: name.trim(),
        description: description?.trim() || null,
        price,
        image: image?.trim() || null,
        categoryId: categoryId || null,
      },
      include: { category: true }
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        orderItems: true,
        cartItems: true
      }
    })
    
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    
    // Check if product is in any orders or carts
    if (existingProduct.orderItems.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete product that has been ordered. Consider marking it as discontinued instead." 
      }, { status: 400 })
    }
    
    // Remove from carts first
    if (existingProduct.cartItems.length > 0) {
      await prisma.cartItem.deleteMany({
        where: { productId: params.id }
      })
    }
    
    await prisma.product.delete({ where: { id: params.id } })
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
} 