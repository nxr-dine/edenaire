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
      include: {
        subscription: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return real subscription data from database
    if (user.subscription && user.subscription.active) {
      const subscription = {
        id: user.subscription.id,
        tier: user.subscription.plan,
        status: "active",
        renewedAt: user.subscription.startedAt.toISOString(),
        plan: user.subscription.plan,
      }
      return NextResponse.json({ subscription })
    } else {
      // No active subscription
      return NextResponse.json({ subscription: null })
    }
  } catch (error) {
    console.error("Subscription GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { tier } = body

    // Update user tier
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { tier: tier || "Ultra-Exclusive" },
      select: {
        id: true,
        tier: true,
      },
    })

    // Create or update subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId: updatedUser.id },
      update: {
        plan: tier || "Ultra-Exclusive",
        active: true,
      },
      create: {
        userId: updatedUser.id,
        plan: tier || "Ultra-Exclusive",
        active: true,
      },
    })

    return NextResponse.json({
      message: "Subscription created successfully",
      subscription: {
        id: subscription.id,
        tier: subscription.plan,
        status: "active",
        renewedAt: subscription.startedAt.toISOString(),
      },
    })
  } catch (error) {
    console.error("Subscription POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Cancel subscription
    await prisma.subscription.updateMany({
      where: { userId: user.id },
      data: { active: false },
    })

    // Reset user tier to free tier
    await prisma.user.update({
      where: { id: user.id },
      data: { tier: "iconic" },
    })

    return NextResponse.json({
      message: "Subscription cancelled successfully",
    })
  } catch (error) {
    console.error("Subscription DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 