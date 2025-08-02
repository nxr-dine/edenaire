import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { auth } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { personalInfo, notifications } = body

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: personalInfo.firstName && personalInfo.lastName 
          ? `${personalInfo.firstName} ${personalInfo.lastName}` 
          : undefined,
        phone: personalInfo.phone || undefined,
        address: personalInfo.address || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        tier: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // In a real application, you would also save notification preferences
    // For now, we'll just return success

    return NextResponse.json({
      message: "Settings updated successfully",
      user: updatedUser
    })
  } catch (error) {
    console.error("Settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 