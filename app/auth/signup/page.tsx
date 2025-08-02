"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, User, Phone, Star, Diamond, Crown, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedTier, setSelectedTier] = useState("iconic")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeMarketing: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const tiers = [
    {
      id: "iconic",
      name: "Iconic Collection",
      price: "Free",
      icon: Star,
      color: "gray",
      description: "Essential luxury access",
      features: ["Access to signature collections", "Standard customer service", "Regular shipping"]
    },
    {
      id: "Prestige Collection",
      name: "Prestige Collection",
      price: "$199/month",
      icon: Diamond,
      color: "yellow",
      description: "Enhanced luxury experience",
      popular: true,
      features: ["Everything in Iconic", "15% discount on purchases", "Priority customer service", "Express shipping"]
    },
    {
      id: "Ultra-Exclusive",
      name: "Ultra-Exclusive",
      price: "$299/month",
      icon: Crown,
      color: "purple",
      description: "Ultimate luxury concierge",
      features: ["Everything in Prestige", "25% discount on purchases", "Personal jewelry concierge", "Private atelier visits"]
    }
  ]

  const getTierColorClasses = (color: string, selected: boolean) => {
    if (selected) {
      switch (color) {
        case 'yellow':
          return 'border-yellow-500 bg-yellow-50'
        case 'purple':
          return 'border-purple-500 bg-purple-50'
        default:
          return 'border-gray-500 bg-gray-50'
      }
    }
    return 'border-gray-200 hover:border-gray-300'
  }

  const getIconColorClasses = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'from-yellow-400 to-yellow-600'
      case 'purple':
        return 'from-purple-600 to-indigo-800'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          tier: selectedTier,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Registration failed")
      } else {
        setSuccess("Registration successful! Logging you in...")
        // Automatically log in the user after successful registration
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })
        
        if (signInResult?.error) {
          setError("Registration successful but login failed. Please try logging in manually.")
          setTimeout(() => router.push("/auth/login"), 2000)
        } else {
          // Redirect to account page after successful auto-login
          setTimeout(() => router.push("/account"), 1000)
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 border border-yellow-400/10 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-yellow-400/5 rotate-12" />
        <div className="absolute top-1/2 left-10 w-2 h-40 bg-gradient-to-b from-yellow-400/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-light tracking-wider text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">EDEN</span>
              AIRE
            </div>
          </Link>
          <p className="text-gray-400 mt-2 font-light">Join the world of luxury</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-light text-gray-900">Create Account</CardTitle>
            <p className="text-gray-600 font-light">Begin your luxury journey with Edenaire</p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Tier Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Your Membership Tier</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier) => {
                  const IconComponent = tier.icon
                  const isSelected = selectedTier === tier.id
                  
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-300 ${getTierColorClasses(tier.color, isSelected)}`}
                    >
                      {tier.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                          Most Popular
                        </Badge>
                      )}
                      
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${getIconColorClasses(tier.color)} rounded-full flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{tier.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                        <p className="text-lg font-light text-gray-900">{tier.price}</p>
                      </div>
                      
                      <div className="space-y-2">
                        {tier.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Enter your first name"
                      className="pl-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Enter your last name"
                      className="pl-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    className="pl-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>



              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline text-yellow-500 hover:text-yellow-600">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
