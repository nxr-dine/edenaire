import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Transform user data to match frontend expectations
    const getNextTier = (currentTier: string) => {
      switch (currentTier) {
        case 'iconic':
          return 'Prestige Collection'
        case 'Prestige Collection':
          return 'Ultra-Exclusive'
        case 'Ultra-Exclusive':
          return 'Ultra-Exclusive' // Already at highest tier
        default:
          return 'Prestige Collection'
      }
    }

    const getTierColor = (tier: string) => {
      switch (tier) {
        case 'Ultra-Exclusive':
          return 'purple'
        case 'Prestige Collection':
          return 'blue'
        case 'iconic':
        default:
          return 'yellow'
      }
    }

    const profileData = {
      ...user,
      memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }) : 'Unknown',
      totalSpent: '$0', // This would come from orders in a real app
      currentTier: user.tier || 'iconic',
      nextTier: getNextTier(user.tier || 'iconic'),
      tierProgress: 0, // This would be calculated based on spending
      tierColor: getTierColor(user.tier || 'iconic')
    }

    return NextResponse.json(profileData)
  } catch (error) {
    console.error("Account API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, phone, tier } = body

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        tier: tier || undefined,
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

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Account update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 