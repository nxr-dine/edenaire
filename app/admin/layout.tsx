"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, isDemoAdmin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (!isDemoAdmin && user?.role !== "admin"))) {
      router.replace("/auth/login?callbackUrl=/admin/dashboard")
    }
  }, [isAuthenticated, isDemoAdmin, isLoading, user, router])

  if (isLoading || !isAuthenticated || (!isDemoAdmin && user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500" />
      </div>
    )
  }

  return <>{children}</>
} 