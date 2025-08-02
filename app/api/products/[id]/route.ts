import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, price, image, categoryId, quantity, discount } = body

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: name || undefined,
        description: description || undefined,
        price: price ? parseFloat(price) : undefined,
        image: image || undefined,
        categoryId: categoryId || undefined,
        quantity: quantity ? parseInt(quantity) : undefined,
        discount: discount ? parseFloat(discount) : undefined,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Product PUT error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
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