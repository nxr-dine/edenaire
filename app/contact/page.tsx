"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, Loader2, CheckCircle } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ClientOnly } from "@/components/client-only"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24-48 hours.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        toast({
          title: "Failed to send message",
          description: data.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Failed to send message",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "General Inquiry",
    "Bespoke Design",
    "Jewelry Appraisal",
    "Repair Services",
    "Collection Viewing",
    "Product Information",
  ]

  const locations = [
    {
      city: "Geneva",
      address: "Rue du Rhône 45, 1204 Geneva, Switzerland",
      phone: "+41 22 123 4567",
      email: "geneva@edenaire.com",
      hours: "Mon-Sat: 10:00-19:00",
    },
    {
      city: "Paris",
      address: "Place Vendôme 12, 75001 Paris, France",
      phone: "+33 1 42 86 1234",
      email: "paris@edenaire.com",
      hours: "Mon-Sat: 10:00-19:00",
    },
    {
      city: "New York",
      address: "Fifth Avenue 567, New York, NY 10022",
      phone: "+1 212 555 0123",
      email: "newyork@edenaire.com",
      hours: "Mon-Sat: 10:00-18:00",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <ClientOnly>
        <Header />
      </ClientOnly>

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-us.jpg"
            alt="Contact Edenaire"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-light mb-4 tracking-wide">Contact Us</h1>
          <p className="text-xl opacity-90">Your personal concierge awaits</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-light mb-4 text-gray-900">Get in Touch</h2>
              <p className="text-lg text-gray-600">
                Our dedicated concierge team is here to assist you with any inquiries or to schedule a private
                inquiry.
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24-48 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service of Interest</label>
                      <Select onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, "-")}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements or questions..."
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Message Sent!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light mb-4 text-gray-900">Visit Our Boutiques</h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience our collections in person at one of our exclusive boutiques worldwide.
              </p>
            </div>

            <div className="space-y-6">
              {locations.map((location, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4 text-gray-900">{location.city}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <span className="text-gray-600">{location.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600">{location.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600">{location.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600">{location.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900">Quick Actions</h3>
              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Book Appointment</div>
                    <div className="text-sm text-gray-500">Get in touch with our team</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-500">Chat with our concierge team</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 bg-transparent"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Call Now</div>
                    <div className="text-sm text-gray-500">Speak directly with our team</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  )
}
