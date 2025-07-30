"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from "swr"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  // Fetch latest user data from API
  const { data: profileData, mutate: refreshProfile } = useSWR(
    session?.user?.email ? "/api/account" : null,
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

  const logout = () => {
    signOut({ callbackUrl: "/" })
  }

  const refreshUser = () => {
    refreshProfile()
  }

  // Use profile data if available, otherwise fall back to session data
  const user: User | null = profileData ? {
    id: profileData.id || "",
    name: profileData.name || "",
    email: profileData.email || "",
  } : session?.user ? {
    id: (session.user as any).id || "",
    name: session.user.name || "",
    email: session.user.email || "",
  } : null

  const value = {
    user,
    isLoading,
    login,
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
