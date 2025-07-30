import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if request has content
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }
    
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    const { name, email, phone, service, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Phone validation (optional but if provided, should be valid)
    if (phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        return NextResponse.json(
          { error: 'Please provide a valid phone number' },
          { status: 400 }
        )
      }
    }

    // Service validation
    const validServices = [
      "General Inquiry",
      "Bespoke Design", 
      "Jewelry Appraisal",
      "Repair Services",
      "Collection Viewing",
      "Product Information"
    ]

    if (service && !validServices.includes(service)) {
      return NextResponse.json(
        { error: 'Please select a valid service' },
        { status: 400 }
      )
    }

    // Create contact submission object
    const contactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      service: service || null,
      message: message.trim(),
      userId: session?.user?.id || null,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Log the submission

    // For now, we'll simulate saving to database and sending emails
    console.log('Contact form submission:', contactSubmission)

    // Simulate email sending
    const adminEmail = {
      to: 'admin@edenaire.com',
      subject: `New Contact Form Submission - ${contactSubmission.service || 'General Inquiry'}`,
      body: `
        New contact form submission received:
        
        Name: ${contactSubmission.name}
        Email: ${contactSubmission.email}
        Phone: ${contactSubmission.phone || 'Not provided'}
        Service: ${contactSubmission.service || 'General Inquiry'}
        Message: ${contactSubmission.message}
        
        Submitted at: ${new Date().toLocaleString()}
        User ID: ${contactSubmission.userId || 'Guest'}
      `
    }

    const userEmail = {
      to: contactSubmission.email,
      subject: 'Thank you for contacting Edenaire',
      body: `
        Dear ${contactSubmission.name},
        
        Thank you for reaching out to Edenaire. We have received your inquiry and our team will get back to you within 24-48 hours.
        
        Your submission details:
        Service: ${contactSubmission.service || 'General Inquiry'}
        Message: ${contactSubmission.message}
        
        If you have any urgent questions, please don't hesitate to call us directly.
        
        Best regards,
        The Edenaire Team
      `
    }

    console.log('Admin notification email:', adminEmail)
    console.log('User confirmation email:', userEmail)

    // In production, you would use a service like SendGrid, AWS SES, or Resend
    // await sendEmail(adminEmail)
    // await sendEmail(userEmail)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24-48 hours.',
      submissionId: contactSubmission.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
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