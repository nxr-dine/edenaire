export interface DemoProduct {
    id: string
    name: string
    price: number
    image?: string | null
    description?: string | null
    tier?: string | null
    discount?: number | null
    category?: { name?: string | null } | null
}

export interface DemoCartItem extends DemoProduct {
    quantity: number
}

export interface DemoWishlistItem extends DemoProduct {
    tier: string
    tierColor: string
    inStock: boolean
    dateAdded: string
    estimatedDelivery: string
}

const cartKey = "edenaire-demo-cart"
const wishlistKey = "edenaire-demo-wishlist"

function readItems<T>(key: string): T[] {
    try {
        const storedItems = window.localStorage.getItem(key)
        return storedItems ? JSON.parse(storedItems) as T[] : []
    } catch {
        return []
    }
}

function writeItems<T>(key: string, items: T[]) {
    window.localStorage.setItem(key, JSON.stringify(items))
}

export function getDemoCart() {
    const items = readItems<DemoCartItem>(cartKey)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { items, total, discountedTotal: total, discountAmount: 0, discountPercentage: 0 }
}

export function addDemoCartItem(product: DemoProduct, quantity: number) {
    const items = readItems<DemoCartItem>(cartKey)
    const existingItem = items.find((item) => item.id === product.id)

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        items.push({ ...product, quantity })
    }

    writeItems(cartKey, items)
    return getDemoCart()
}

export function updateDemoCartItem(productId: string, quantity: number) {
    const items = readItems<DemoCartItem>(cartKey)
    const updatedItems = items
        .map((item) => item.id === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)

    writeItems(cartKey, updatedItems)
    return getDemoCart()
}

export function removeDemoCartItem(productId: string) {
    const items = readItems<DemoCartItem>(cartKey).filter((item) => item.id !== productId)
    writeItems(cartKey, items)
    return getDemoCart()
}

export function getDemoWishlist() {
    return readItems<DemoWishlistItem>(wishlistKey)
}

export function addDemoWishlistItem(product: DemoProduct) {
    const items = getDemoWishlist()
    if (!items.some((item) => item.id === product.id)) {
        const tier = product.tier?.toLowerCase()
        items.push({
            ...product,
            tier: tier === "prestige" ? "Prestige Collection" : tier === "ultra-exclusive" ? "Ultra-Exclusive" : "Iconic Collection",
            tierColor: "yellow",
            inStock: true,
            dateAdded: new Date().toISOString(),
            estimatedDelivery: "3-5 business days",
        })
        writeItems(wishlistKey, items)
    }
    return getDemoWishlist()
}

export function removeDemoWishlistItem(productId: string) {
    const items = getDemoWishlist().filter((item) => item.id !== productId)
    writeItems(wishlistKey, items)
    return items
}