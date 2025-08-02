import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const session = await auth()
    
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Categories GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { name } = await req.json()
    if (!name) {
      return NextResponse.json({ error: "Missing category name" }, { status: 400 })
    }
    const category = await prisma.category.create({ data: { name } })
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
} 