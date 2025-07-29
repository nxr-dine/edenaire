const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    })
    
    if (users.length === 0) {
      console.log('❌ No users found in the database.')
      return
    }
    
    console.log(`✅ Found ${users.length} user(s):`)
    console.log('')
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'No name'}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`)
      console.log('')
    })
    
    console.log('To check a specific user\'s role, run:')
    console.log('node scripts/check-user-role.js <email>')
    console.log('')
    console.log('To make a user an admin, run:')
    console.log('node scripts/make-admin.js <email>')
    
  } catch (error) {
    console.error('❌ Error listing users:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers() 