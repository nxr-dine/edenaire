const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function makeAdmin(email) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
      select: { id: true, name: true, email: true, role: true }
    })
    
    console.log('✅ User updated successfully:')
    console.log(`Name: ${user.name}`)
    console.log(`Email: ${user.email}`)
    console.log(`Role: ${user.role}`)
    console.log('\n🎉 You can now access the admin dashboard at: http://localhost:3000/admin/dashboard')
  } catch (error) {
    if (error.code === 'P2025') {
      console.error('❌ User not found. Please check the email address.')
    } else {
      console.error('❌ Error updating user:', error.message)
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.log('Usage: node scripts/make-admin.js <email>')
  console.log('Example: node scripts/make-admin.js admin@example.com')
  process.exit(1)
}

makeAdmin(email) 