import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Admin categories GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
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

    const newCategory = await prisma.category.create({
      data: { name },
      include: {
        products: true,
      },
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error("Admin categories POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { categoryId, name } = body

    if (!categoryId || !name) {
      return NextResponse.json({ error: "Category ID and name are required" }, { status: 400 })
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
      include: {
        products: true,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Admin categories PUT error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { categoryId } = body

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id: categoryId },
    })

    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Admin categories DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 