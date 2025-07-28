"use client"

import { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  delay?: number
}

export function ClientOnly({ children, fallback = null, delay = 0 }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Special component for form elements that might be affected by browser extensions
export function FormSafe({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [isSafe, setIsSafe] = useState(false)

  useEffect(() => {
    // Wait for next tick to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      setIsSafe(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isSafe) {
    return <>{fallback}</>
  }

  return <>{children}</>
} 