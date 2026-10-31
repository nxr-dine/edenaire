"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

function TestimonialAvatar({ name, size }: { name: string; size: "small" | "large" }) {
  const initial = name.charAt(0).toUpperCase()
  const dimensions = size === "large" ? "w-20 h-20 text-3xl mr-6" : "w-16 h-16 text-2xl mr-4"

  return (
    <div
      className={`${dimensions} rounded-full ring-2 ring-yellow-400/50 bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-gray-900 font-medium`}
      aria-label={`${name} profile picture`}
    >
      {initial}
    </div>
  )
}

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Isabella Rothschild",
      title: "Art Collector",
      quote:
        "Edenaire doesn't just create jewelry; they craft dreams into reality. Each piece I own tells a story of unparalleled artistry.",
      location: "Geneva",
      product: "Celestial Diamond Collection",
    },
    {
      id: 2,
      name: "Marcus Wellington",
      title: "Investment Banker",
      quote:
        "The attention to detail and craftsmanship is extraordinary. My wife's anniversary gift from Edenaire exceeded all expectations.",
      location: "London",
      product: "Heritage Sapphire Ring",
    },
    {
      id: 3,
      name: "Sophia Chen",
      title: "Fashion Designer",
      quote:
        "As someone who appreciates fine craftsmanship, Edenaire's work is simply incomparable. True luxury in every detail.",
      location: "New York",
      product: "Bespoke Emerald Necklace",
    },
    {
      id: 4,
      name: "Alessandro Medici",
      title: "Art Patron",
      quote:
        "Edenaire understands that jewelry is art. Each piece in my collection represents the pinnacle of luxury and sophistication.",
      location: "Milan",
      product: "Limited Edition Watch",
    },
    {
      id: 5,
      name: "Victoria Ashworth",
      title: "Philanthropist",
      quote:
        "The personal service and attention to detail is remarkable. Edenaire creates pieces that become family treasures.",
      location: "Paris",
      product: "Diamond Tennis Bracelet",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border border-yellow-400/20 rotate-45" />
        <div className="absolute bottom-32 right-32 w-32 h-32 border border-yellow-400/15 rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-yellow-400/10 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-wide">What Our Clients Say</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Discover why discerning collectors worldwide choose Edenaire for their most precious moments
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Previous Testimonial (Hidden on mobile) */}
            <div className="hidden lg:block opacity-40 transform scale-90">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <TestimonialAvatar
                      name={testimonials[(currentSlide - 1 + testimonials.length) % testimonials.length].name}
                      size="small"
                    />
                    <div>
                      <h4 className="text-white font-medium">
                        {testimonials[(currentSlide - 1 + testimonials.length) % testimonials.length].name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonials[(currentSlide - 1 + testimonials.length) % testimonials.length].title}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-yellow-400 mb-4" />
                  <p className="text-gray-300 leading-relaxed font-light line-clamp-4">
                    {testimonials[(currentSlide - 1 + testimonials.length) % testimonials.length].quote}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Current Testimonial */}
            <div className="transform scale-100 transition-all duration-700">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-400/30 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    <TestimonialAvatar name={testimonials[currentSlide].name} size="large" />
                    <div>
                      <h4 className="text-white text-xl font-medium mb-1">{testimonials[currentSlide].name}</h4>
                      <p className="text-gray-400 mb-2">{testimonials[currentSlide].title}</p>
                      <p className="text-yellow-400 text-sm">{testimonials[currentSlide].location}</p>
                    </div>
                  </div>



                  <Quote className="h-12 w-12 text-yellow-400 mb-6" />
                  <p className="text-white text-lg leading-relaxed font-light mb-6">
                    {testimonials[currentSlide].quote}
                  </p>
                  <p className="text-gray-400 text-sm font-light">Purchased: {testimonials[currentSlide].product}</p>
                </CardContent>
              </Card>
            </div>

            {/* Next Testimonial (Hidden on mobile) */}
            <div className="hidden lg:block opacity-40 transform scale-90">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <TestimonialAvatar
                      name={testimonials[(currentSlide + 1) % testimonials.length].name}
                      size="small"
                    />
                    <div>
                      <h4 className="text-white font-medium">
                        {testimonials[(currentSlide + 1) % testimonials.length].name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonials[(currentSlide + 1) % testimonials.length].title}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-yellow-400 mb-4" />
                  <p className="text-gray-300 leading-relaxed font-light line-clamp-4">
                    {testimonials[(currentSlide + 1) % testimonials.length].quote}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-yellow-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
