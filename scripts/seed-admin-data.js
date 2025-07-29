const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function seedAdminData() {
  console.log('🌱 Seeding admin data...\n')
  
  try {
    // 1. Create Categories
    console.log('1. Creating categories...')
    const categories = [
      { name: 'Necklaces' },
      { name: 'Rings' },
      { name: 'Earrings' },
      { name: 'Bracelets' },
      { name: 'Watches' }
    ]
    
    const createdCategories = []
    for (const category of categories) {
      const created = await prisma.category.create({
        data: category
      })
      createdCategories.push(created)
      console.log(`   ✅ Created category: ${category.name}`)
    }
    
    // 2. Create Products
    console.log('\n2. Creating products...')
    const products = [
      {
        name: 'Celestial Diamond Necklace',
        description: 'A stunning diamond necklace featuring celestial-inspired design with premium diamonds.',
        price: 45000.00,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
        categoryId: createdCategories[0].id
      },
      {
        name: 'Royal Sapphire Ring',
        description: 'Exquisite sapphire ring with royal blue stones set in white gold.',
        price: 35800.00,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
        categoryId: createdCategories[1].id
      },
      {
        name: 'Golden Aurora Earrings',
        description: 'Elegant golden earrings with aurora borealis crystal accents.',
        price: 18200.00,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
        categoryId: createdCategories[2].id
      },
      {
        name: 'Heritage Pearl Bracelet',
        description: 'Timeless pearl bracelet with heritage design and premium materials.',
        price: 22400.00,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
        categoryId: createdCategories[3].id
      },
      {
        name: 'Luxury Diamond Watch',
        description: 'Premium diamond-encrusted watch with Swiss movement.',
        price: 125000.00,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
        categoryId: createdCategories[4].id
      }
    ]
    
    for (const product of products) {
      const created = await prisma.product.create({
        data: product,
        include: { category: true }
      })
      console.log(`   ✅ Created product: ${created.name} ($${created.price}) - ${created.category.name}`)
    }
    
    // 3. Create Sample Orders
    console.log('\n3. Creating sample orders...')
    const adminUser = await prisma.user.findUnique({
      where: { email: 'noureddinebouder745@gmail.com' }
    })
    
    if (adminUser) {
      const orders = [
        {
          userId: adminUser.id,
          total: 45000.00,
          status: 'completed'
        },
        {
          userId: adminUser.id,
          total: 35800.00,
          status: 'processing'
        },
        {
          userId: adminUser.id,
          total: 18200.00,
          status: 'shipped'
        }
      ]
      
      for (const order of orders) {
        const created = await prisma.order.create({
          data: order,
          include: { user: { select: { name: true } } }
        })
        console.log(`   ✅ Created order: $${created.total} - ${created.status} - ${created.user.name}`)
      }
    }
    
    // 4. Summary
    console.log('\n📊 Database Summary:')
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const categoryCount = await prisma.category.count()
    const orderCount = await prisma.order.count()
    
    console.log(`   Users: ${userCount}`)
    console.log(`   Categories: ${categoryCount}`)
    console.log(`   Products: ${productCount}`)
    console.log(`   Orders: ${orderCount}`)
    
    console.log('\n🎉 Admin data seeding completed successfully!')
    console.log('\n📋 You can now:')
    console.log('1. Access admin dashboard: http://localhost:3000/admin/dashboard')
    console.log('2. Login with: noureddinebouder745@gmail.com')
    console.log('3. See the admin interface with:')
    console.log('   - 5 categories (Necklaces, Rings, Earrings, Bracelets, Watches)')
    console.log('   - 5 luxury products with images and descriptions')
    console.log('   - 3 sample orders with different statuses')
    console.log('   - User management for your 2 users')
    console.log('   - Full analytics and reporting')
    
  } catch (error) {
    console.error('❌ Error seeding admin data:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

seedAdminData() 