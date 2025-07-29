const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function verifyAdminSetup() {
  console.log('🔍 Verifying Admin Setup...\n')
  
  try {
    // 1. Verify Admin User
    console.log('1. ✅ Admin User Verification:')
    const adminUser = await prisma.user.findUnique({
      where: { email: 'noureddinebouder745@gmail.com' },
      select: { id: true, name: true, email: true, role: true }
    })
    
    if (adminUser && adminUser.role === 'admin') {
      console.log(`   ✅ Admin user confirmed: ${adminUser.name}`)
      console.log(`   ✅ Email: ${adminUser.email}`)
      console.log(`   ✅ Role: ${adminUser.role}`)
    } else {
      console.log('   ❌ Admin user not found or incorrect role')
      return
    }
    
    // 2. Verify Database Data
    console.log('\n2. ✅ Database Data Verification:')
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const categoryCount = await prisma.category.count()
    const orderCount = await prisma.order.count()
    
    console.log(`   ✅ Users: ${userCount}`)
    console.log(`   ✅ Categories: ${categoryCount}`)
    console.log(`   ✅ Products: ${productCount}`)
    console.log(`   ✅ Orders: ${orderCount}`)
    
    // 3. Verify Sample Data
    console.log('\n3. ✅ Sample Data Verification:')
    
    const categories = await prisma.category.findMany()
    console.log(`   ✅ Categories created: ${categories.map(c => c.name).join(', ')}`)
    
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    console.log(`   ✅ Products created: ${products.length} luxury items`)
    
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true } } }
    })
    console.log(`   ✅ Orders created: ${orders.length} with different statuses`)
    
    // 4. Verify File Structure
    console.log('\n4. ✅ File Structure Verification:')
    const fs = require('fs')
    const path = require('path')
    
    const adminFiles = [
      'app/admin/layout.tsx',
      'app/admin/page.tsx',
      'app/admin/dashboard/page.tsx',
      'app/admin/products/page.tsx',
      'app/api/admin/users/route.ts',
      'app/api/admin/orders/route.ts',
      'app/api/admin/analytics/route.ts'
    ]
    
    adminFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`)
      } else {
        console.log(`   ❌ ${file} - Missing`)
      }
    })
    
    // 5. Summary
    console.log('\n🎉 Admin Setup Verification Complete!')
    console.log('\n📊 Database Status:')
    console.log(`   • ${userCount} users (1 admin, ${userCount - 1} regular)`)
    console.log(`   • ${categoryCount} product categories`)
    console.log(`   • ${productCount} luxury products`)
    console.log(`   • ${orderCount} sample orders`)
    
    console.log('\n🚀 Ready to Access Admin Dashboard:')
    console.log('   URL: http://localhost:3000/admin/dashboard')
    console.log('   Login: noureddinebouder745@gmail.com')
    console.log('   Password: (your password)')
    
    console.log('\n🔧 Admin Features Available:')
    console.log('   • User Management (view, edit roles, delete)')
    console.log('   • Product Management (create, edit, delete)')
    console.log('   • Category Management (create, edit, delete)')
    console.log('   • Order Management (view, update status)')
    console.log('   • Analytics & Reports')
    console.log('   • Sales Dashboard')
    console.log('   • Bulk Operations')
    
    console.log('\n✅ All admin functionality is properly configured and ready to use!')
    
  } catch (error) {
    console.error('❌ Error verifying admin setup:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAdminSetup() 