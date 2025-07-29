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
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { name } = await req.json()
    if (!name) {
      return NextResponse.json({ error: "Missing category name" }, { status: 400 })
    }
    const category = await prisma.category.create({
      data: { name },
      include: {
        _count: {
          select: { products: true }
        }
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, name } = await req.json()
    if (!id || !name) {
      return NextResponse.json({ error: "Missing category ID or name" }, { status: 400 })
    }
    const category = await prisma.category.update({
      where: { id },
      data: { name },
      include: {
        _count: {
          select: { products: true }
        }
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
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
      return NextResponse.json({ error: "Missing category ID" }, { status: 400 })
    }
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ message: "Category deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
} 