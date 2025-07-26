import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@/lib/generated/prisma"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { password } = await req.json()

    if (!password) {
      return NextResponse.json(
        { error: "Password is required to delete account" }, 
        { status: 400 }
      )
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" }, 
        { status: 400 }
      )
    }

    // Delete user and all related data (cascade delete)
    await prisma.user.delete({
      where: { id: session.user.id }
    })

    return NextResponse.json({ 
      success: true, 
      message: "Account deleted successfully" 
    })

  } catch (error) {
    console.error("Account deletion error:", error)
    return NextResponse.json(
      { error: "Failed to delete account" }, 
      { status: 500 }
    )
  }
} 