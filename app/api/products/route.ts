import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
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
    
    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json({ error: "Product name must be at least 2 characters long" }, { status: 400 })
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
    
    // Check for duplicate product names
    const existingProduct = await prisma.product.findFirst({
      where: { 
        name: { equals: name.trim(), mode: 'insensitive' }
      }
    })
    
    if (existingProduct) {
      return NextResponse.json({ error: "A product with this name already exists" }, { status: 409 })
    }
    
    const product = await prisma.product.create({
      data: { 
        name: name.trim(),
        description: description?.trim() || null,
        price,
        image: image?.trim() || null,
        categoryId: categoryId || null,
      },
      include: { category: true }
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
} 