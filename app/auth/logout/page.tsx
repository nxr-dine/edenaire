"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Automatically sign out and redirect to home
    signOut({ callbackUrl: "/" })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Signing you out...</p>
      </div>
    </div>
  )
} 