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
    
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        products: true,
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Category GET error:", error)
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
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: { name },
      include: {
        products: true,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Category PUT error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
      include: { products: true }
    })
    
    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }
    
    // Check if category has products
    if (existingCategory.products.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete category with existing products. Please reassign or delete the products first." 
      }, { status: 400 })
    }
    
    await prisma.category.delete({ where: { id: params.id } })
    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
} 