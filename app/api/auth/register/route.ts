import { PrismaClient } from "@/lib/generated/prisma"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, password, tier } = body
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }
    const hashedPassword = await hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        phone: phone || null,
        tier: tier || "iconic",
      },
    })
    return NextResponse.json({ message: "User registered successfully", user: { id: user.id, email: user.email, name: user.name } }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 