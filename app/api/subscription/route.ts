import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  return NextResponse.json({ subscription })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { tier } = await req.json()
  if (!tier) {
    return NextResponse.json({ error: "Tier is required" }, { status: 400 })
  }
  // Upsert subscription
  const subscription = await prisma.subscription.upsert({
    where: { userId: session.user.id },
    update: { tier, status: "active", renewedAt: new Date() },
    create: {
      userId: session.user.id,
      tier,
      status: "active",
      renewedAt: new Date(),
    },
  })
  return NextResponse.json({ subscription, message: "Subscription updated" })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await prisma.subscription.updateMany({
    where: { userId: session.user.id, status: "active" },
    data: { status: "cancelled" },
  })
  return NextResponse.json({ message: "Subscription cancelled" })
} 