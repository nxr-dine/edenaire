const { PrismaClient } = require("../lib/generated/prisma")

const prisma = new PrismaClient()

const products = [
  {
    name: "Celestial Diamond Necklace",
    category: "Necklaces",
    image: "/products/necklace.jpg",
    price: 2490,
    description: "A refined statement necklace designed to bring luminous elegance to every occasion.",
    quantity: 12,
  },
  {
    name: "Golden Aurora Necklace",
    category: "Necklaces",
    image: "/products/necklless.jpg",
    price: 1890,
    description: "Warm golden tones and graceful lines create a timeless signature piece.",
    quantity: 10,
  },
  {
    name: "Royal Sapphire Ring",
    category: "Rings",
    image: "/products/ring.jpg",
    price: 3290,
    description: "A distinguished sapphire ring framed by brilliant accents and polished precious metal.",
    quantity: 8,
  },
  {
    name: "Celestial Diamond Ring",
    category: "Rings",
    image: "/products/ring 1.jpg",
    price: 2790,
    description: "A sophisticated diamond ring with a clean silhouette and radiant finish.",
    quantity: 9,
  },
  {
    name: "Golden Aurora Earrings",
    category: "Earrings",
    image: "/products/earrings.jpg",
    price: 1490,
    description: "Elegant gold earrings shaped to catch and reflect the light.",
    quantity: 15,
  },
  {
    name: "Celestial Drop Earrings",
    category: "Earrings",
    image: "/products/earrings 1.jpg",
    price: 1690,
    description: "Delicate drop earrings that add a luminous finishing touch to formal looks.",
    quantity: 14,
  },
  {
    name: "Heritage Gold Bracelet",
    category: "Bracelets",
    image: "/products/bracllet.jpg",
    price: 2190,
    description: "A polished bracelet inspired by classic jewelry-making traditions.",
    quantity: 11,
  },
]

async function main() {
  for (const product of products) {
    const category = await prisma.category.upsert({
      where: { name: product.category },
      update: {},
      create: { name: product.category },
    })

    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      categoryId: category.id,
    }

    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    })

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data,
      })
    } else {
      await prisma.product.create({ data })
    }
  }

  console.log(`Seeded ${products.length} products.`)
}

main()
  .catch((error) => {
    console.error("Product seed failed:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
