"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from "swr"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isDemoUser: boolean
  isDemoAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  loginAsDemo: (role?: "user" | "admin") => void
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const fetcher = (url: string) => fetch(url).then(res => res.json())
const demoStorageKey = "edenaire-demo-user"
const demoUser: User = {
  id: "demo-user",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  role: "user",
}
const demoAdmin: User = {
  id: "demo-admin",
  name: "Jordan Ellis",
  email: "jordan.ellis@example.com",
  role: "admin",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [demoRole, setDemoRole] = useState<"user" | "admin" | null>(null)
  const isDemoUser = demoRole !== null
  const isDemoAdmin = demoRole === "admin"

  useEffect(() => {
    const storedRole = window.localStorage.getItem(demoStorageKey)
    setDemoRole(storedRole === "admin" ? "admin" : storedRole === "user" || storedRole === "true" ? "user" : null)
  }, [])

  // Fetch latest user data from API
  const { data: profileData, mutate: refreshProfile } = useSWR(
    session?.user?.email && !isDemoUser ? "/api/account" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  )

  useEffect(() => {
    setIsLoading(status === "loading")
  }, [status])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      window.localStorage.removeItem(demoStorageKey)
      setDemoRole(null)
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        throw new Error("Login failed")
      }
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsDemo = (role: "user" | "admin" = "user") => {
    window.localStorage.setItem(demoStorageKey, role)
    setDemoRole(role)
  }

  const logout = () => {
    if (isDemoUser) {
      window.localStorage.removeItem(demoStorageKey)
      setDemoRole(null)
      window.location.assign("/")
      return
    }
    signOut({ callbackUrl: "/" })
  }

  const refreshUser = () => {
    refreshProfile()
  }

  // Use profile data if available, otherwise fall back to session data
  const user: User | null = isDemoAdmin ? demoAdmin : isDemoUser ? demoUser : profileData ? {
    id: profileData.id || "",
    name: profileData.name || "",
    email: profileData.email || "",
    role: profileData.role || "user",
  } : session?.user ? {
    id: (session.user as any).id || "",
    name: session.user.name || "",
    email: session.user.email || "",
    role: (session.user as any).role || "user",
  } : null

  const value = {
    user,
    isLoading,
    isDemoUser,
    isDemoAdmin,
    login,
    loginAsDemo,
    logout,
    isAuthenticated: !!user,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
