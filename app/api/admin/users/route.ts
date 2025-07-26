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
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { userId, role } = await req.json()
    if (!userId || !role) {
      return NextResponse.json({ error: "Missing userId or role" }, { status: 400 })
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { userId } = await req.json()
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }
    await prisma.user.delete({ where: { id: userId } })
    return NextResponse.json({ message: "User deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
} 