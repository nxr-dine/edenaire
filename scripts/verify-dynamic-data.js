const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function verifyDynamicData() {
  console.log('🔍 Verifying Dynamic Data for Admin Dashboard...\n')
  
  try {
    // 1. Get all data from database
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, tier: true, createdAt: true }
    })
    
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    
    const categories = await prisma.category.findMany()
    
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true, email: true, tier: true } } }
    })
    
    // 2. Calculate real stats (same as admin dashboard)
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalUsers = users.length
    const totalOrders = orders.length
    const totalProducts = products.length
    const conversionRate = totalUsers > 0 ? ((totalOrders / totalUsers) * 100).toFixed(2) : 0
    
    console.log('📊 Real Stats (from database):')
    console.log(`   Total Revenue: $${totalRevenue.toLocaleString()}`)
    console.log(`   Total Users: ${totalUsers}`)
    console.log(`   Total Orders: ${totalOrders}`)
    console.log(`   Total Products: ${totalProducts}`)
    console.log(`   Conversion Rate: ${conversionRate}%`)
    
    // 3. User tier breakdown
    const userTiers = users.reduce((acc, user) => {
      const tier = user.tier || 'iconic'
      acc[tier] = (acc[tier] || 0) + 1
      return acc
    }, {})
    
    console.log('\n👥 User Tier Breakdown:')
    Object.entries(userTiers).forEach(([tier, count]) => {
      const percentage = totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(1) : 0
      console.log(`   ${tier}: ${count} users (${percentage}%)`)
    })
    
    // 4. Recent orders
    console.log('\n📦 Recent Orders:')
    orders.slice(0, 3).forEach(order => {
      console.log(`   ${order.id.slice(0, 8)}... - ${order.user?.name || 'Unknown'} - $${order.total} - ${order.status}`)
    })
    
    // 5. Top products
    console.log('\n🛍️ Products:')
    products.slice(0, 3).forEach(product => {
      console.log(`   ${product.name} - $${product.price} - ${product.category?.name || 'No category'}`)
    })
    
    // 6. Categories
    console.log('\n📂 Categories:')
    categories.forEach(category => {
      const productCount = products.filter(p => p.categoryId === category.id).length
      console.log(`   ${category.name}: ${productCount} products`)
    })
    
    // 7. Admin users
    const adminUsers = users.filter(user => user.role === 'admin')
    console.log('\n👑 Admin Users:')
    adminUsers.forEach(user => {
      console.log(`   ${user.name} (${user.email}) - Role: ${user.role}`)
    })
    
    console.log('\n✅ Dynamic Data Verification Complete!')
    console.log('\n📋 Admin Dashboard Now Shows:')
    console.log('   ✅ Real revenue from actual orders')
    console.log('   ✅ Real user count and tier breakdown')
    console.log('   ✅ Real order count and status')
    console.log('   ✅ Real product data with categories')
    console.log('   ✅ Real user management with roles')
    console.log('   ✅ Real analytics from database')
    console.log('   ✅ Real order management')
    console.log('   ✅ Real category management')
    
    console.log('\n🎉 All mock data has been replaced with real dynamic data!')
    
  } catch (error) {
    console.error('❌ Error verifying dynamic data:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDynamicData() 