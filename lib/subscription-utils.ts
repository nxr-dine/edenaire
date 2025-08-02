import { useAuth } from "@/contexts/auth-context"

export interface SubscriptionBenefits {
  discountPercentage: number
  shippingType: string
  customerService: string
  conciergeService: boolean
  privateAppointments: boolean
  customDesign: boolean
  worldwideShipping: boolean
  jewelryAppraisal: boolean
  earlyAccess: boolean
  jewelryCleaning: boolean
}

export const getSubscriptionBenefits = (tier: string): SubscriptionBenefits => {
  switch (tier) {
    case "Ultra-Exclusive":
      return {
        discountPercentage: 25,
        shippingType: "Complimentary Worldwide",
        customerService: "Dedicated Personal Concierge",
        conciergeService: true,
        privateAppointments: true,
        customDesign: true,
        worldwideShipping: true,
        jewelryAppraisal: true,
        earlyAccess: true,
        jewelryCleaning: true,
      }
    case "Prestige Collection":
      return {
        discountPercentage: 15,
        shippingType: "Express",
        customerService: "Priority",
        conciergeService: false,
        privateAppointments: false,
        customDesign: false,
        worldwideShipping: false,
        jewelryAppraisal: false,
        earlyAccess: true,
        jewelryCleaning: true,
      }
    case "iconic":
    default:
      return {
        discountPercentage: 0,
        shippingType: "Standard",
        customerService: "Standard",
        conciergeService: false,
        privateAppointments: false,
        customDesign: false,
        worldwideShipping: false,
        jewelryAppraisal: false,
        earlyAccess: false,
        jewelryCleaning: false,
      }
  }
}

export const calculateDiscountedPrice = (originalPrice: number, tier: string): number => {
  const benefits = getSubscriptionBenefits(tier)
  if (benefits.discountPercentage === 0) return originalPrice
  
  const discount = (originalPrice * benefits.discountPercentage) / 100
  return Math.round(originalPrice - discount)
}

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`
}

export const getTierDisplayName = (tier: string): string => {
  switch (tier) {
    case "Ultra-Exclusive":
      return "Ultra-Exclusive"
    case "Prestige Collection":
      return "Prestige Collection"
    case "iconic":
    default:
      return "Iconic Collection"
  }
}

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case "Ultra-Exclusive":
      return "from-purple-600 to-indigo-600"
    case "Prestige Collection":
      return "from-yellow-400 to-yellow-600"
    case "iconic":
    default:
      return "from-gray-400 to-gray-600"
  }
}

export const getTierBadgeColor = (tier: string): string => {
  switch (tier) {
    case "Ultra-Exclusive":
      return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
    case "Prestige Collection":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
    case "iconic":
    default:
      return "bg-gray-500 text-white"
  }
} 