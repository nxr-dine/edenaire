"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingBag, User, Menu, X, Heart, LogIn, LogOut, Settings, Package } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated, logout } = useAuth()

  // Fetch cart data for dynamic cart count
  const { data: cart } = useSWR(isAuthenticated ? "/api/cart" : null, fetcher)
  const cartItemCount = cart?.items?.length || 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    if (isMobileMenuOpen || isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen, isSearchOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-black/20 backdrop-blur-sm"
      )}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={cn(
              "text-xl sm:text-2xl font-light tracking-wider transition-colors duration-300",
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">EDEN</span>
              AIRE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className={cn(
                "transition-colors font-medium text-sm uppercase tracking-wider",
                isScrolled 
                  ? "text-gray-700 hover:text-yellow-600" 
                  : "text-white/90 hover:text-yellow-400"
              )}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={cn(
                "transition-colors font-medium text-sm uppercase tracking-wider",
                isScrolled 
                  ? "text-gray-700 hover:text-yellow-600" 
                  : "text-white/90 hover:text-yellow-400"
              )}
            >
              Collections
            </Link>
            <button
              onClick={() => scrollToSection("about")}
              className={cn(
                "transition-colors font-medium text-sm uppercase tracking-wider cursor-pointer",
                isScrolled 
                  ? "text-gray-700 hover:text-yellow-600" 
                  : "text-white/90 hover:text-yellow-400"
              )}
            >
              About
            </button>
            <Link
              href="/contact"
              className={cn(
                "transition-colors font-medium text-sm uppercase tracking-wider",
                isScrolled 
                  ? "text-gray-700 hover:text-yellow-600" 
                  : "text-white/90 hover:text-yellow-400"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <div className="relative" ref={searchRef}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-2 transition-colors",
                  isScrolled 
                    ? "text-gray-700 hover:text-yellow-600" 
                    : "text-white/90 hover:text-yellow-400"
                )}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-slide-in">
                  <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search luxury jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                  <div className="mt-3 text-xs text-gray-500">
                    Popular searches: Diamond rings, Gold necklaces, Sapphire earrings
                  </div>
                </div>
              )}
            </div>

            <Link href="/wishlist">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "p-2 transition-colors",
                  isScrolled 
                    ? "text-gray-700 hover:text-yellow-600" 
                    : "text-white/90 hover:text-yellow-400"
                )}
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>

            {/* Authentication Button/Profile */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "p-1 transition-colors",
                      isScrolled 
                        ? "text-gray-700 hover:text-yellow-600" 
                        : "text-white/90 hover:text-yellow-400"
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "p-2 flex items-center gap-2 transition-colors",
                    isScrolled 
                      ? "text-gray-700 hover:text-yellow-600" 
                      : "text-white/90 hover:text-yellow-400"
                  )}
                >
                  <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xl:inline text-sm">Login</span>
                </Button>
              </Link>
            )}

            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "relative p-2 transition-colors",
                  isScrolled 
                    ? "text-gray-700 hover:text-yellow-600" 
                    : "text-white/90 hover:text-yellow-400"
                )}
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 bg-yellow-500 text-black text-xs flex items-center justify-center font-bold">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "lg:hidden p-2 transition-colors",
              isScrolled 
                ? "text-gray-700" 
                : "text-white/90"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden bg-white border-t border-gray-200 py-4 animate-slide-in">
            {/* Mobile Search */}
            <div className="px-4 pb-4 border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search luxury jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-4 py-2 text-sm uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-4 py-2 text-sm uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-4 py-2 text-sm uppercase tracking-wider text-left"
              >
                About
              </button>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-4 py-2 text-sm uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Actions */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 p-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Mobile Authentication */}
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-700 p-1">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/account?tab=orders"
                          className="cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/account?tab=settings"
                          className="cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 p-2 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="h-5 w-5" />
                    </Button>
                  </Link>
                )}

                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 relative p-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-yellow-500 text-black text-xs flex items-center justify-center font-bold">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
