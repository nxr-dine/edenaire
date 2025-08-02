import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    // Check Content-Type
    const contentType = req.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      )
    }

    let body
    try {
      body = await req.json()
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      )
    }

    const { name, email, message, service } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate service if provided
    const validServices = ["general", "support", "sales", "partnership"]
    if (service && !validServices.includes(service)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      )
    }

    // In a real application, you would send an email here
    // For now, we'll just log the contact form submission
    console.log("Contact form submission:", {
      name,
      email,
      message,
      service: service || "general",
      userId: session?.user?.id || "anonymous",
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 