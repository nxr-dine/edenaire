import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log("[SETTINGS] Session:", session)
    
    if (!session?.user?.id) {
      console.error("[SETTINGS] No user ID in session")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    console.log("[SETTINGS] Request body:", body)
    const { personalInfo, notifications } = body

    // Update user personal information
    if (personalInfo) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          phone: personalInfo.phone || null,
          // Note: email updates might need special handling for verification
        }
      })
    }

    // Update notification preferences (you might want to create a separate table for this)
    // For now, we'll store it in a JSON field or create a UserPreferences model
    
    return NextResponse.json({ 
      success: true, 
      message: "Settings updated successfully" 
    })

  } catch (error) {
    console.error("[SETTINGS] Update error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to update settings" }, 
      { status: 500 }
    )
  }
} 