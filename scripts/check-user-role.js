const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function checkUserRole(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
    
    if (!user) {
      console.log('❌ User not found. Please check the email address.')
      return
    }
    
    console.log('✅ User found:')
    console.log(`Name: ${user.name}`)
    console.log(`Email: ${user.email}`)
    console.log(`Role: ${user.role}`)
    console.log(`Created: ${user.createdAt}`)
    
    if (user.role === 'admin') {
      console.log('\n🎉 This user has admin access!')
      console.log('You should be able to access: http://localhost:3000/admin/dashboard')
    } else {
      console.log('\n⚠️  This user does NOT have admin access.')
      console.log('To make this user an admin, run:')
      console.log(`node scripts/make-admin.js ${email}`)
    }
  } catch (error) {
    console.error('❌ Error checking user:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.log('Usage: node scripts/check-user-role.js <email>')
  console.log('Example: node scripts/check-user-role.js admin@example.com')
  process.exit(1)
}

checkUserRole(email) 