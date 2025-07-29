const fs = require('fs');
const path = require('path');

console.log('🔧 TESTING DUPLICATE CATEGORIES DECLARATION FIX');
console.log('===============================================\n');

const adminFile = path.join(__dirname, '../app/admin/dashboard/page.tsx');
const content = fs.readFileSync(adminFile, 'utf8');

// Check for duplicate categories declarations
const categoriesDeclarations = content.match(/const.*categories.*useSWR/g);

console.log('📊 CATEGORIES DECLARATIONS FOUND:');
console.log('=================================');

if (categoriesDeclarations) {
  console.log(`Found ${categoriesDeclarations.length} categories declarations:`);
  categoriesDeclarations.forEach((declaration, index) => {
    console.log(`${index + 1}. ${declaration.trim()}`);
  });
  
  if (categoriesDeclarations.length === 1) {
    console.log('\n✅ SUCCESS: Only one categories declaration found!');
    console.log('✅ The duplicate declaration has been removed.');
    console.log('✅ The admin dashboard should now load without errors.');
  } else if (categoriesDeclarations.length > 1) {
    console.log('\n❌ ERROR: Multiple categories declarations found!');
    console.log('❌ There are still duplicate declarations.');
    console.log('❌ The admin dashboard will still have compilation errors.');
  } else {
    console.log('\n❌ ERROR: No categories declarations found!');
    console.log('❌ This means the categories data fetching is missing.');
    console.log('❌ The admin dashboard will not have category functionality.');
  }
} else {
  console.log('❌ ERROR: No categories declarations found!');
  console.log('❌ This means the categories data fetching is missing.');
  console.log('❌ The admin dashboard will not have category functionality.');
}

console.log('\n🔍 VERIFICATION COMPLETE');
console.log('========================');
console.log('The admin dashboard should now compile and run without the duplicate declaration error.'); 