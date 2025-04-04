const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', '_redirects');
const destPath = path.join(__dirname, 'dist', 'coreui-free-angular-admin-template', '_redirects');

fs.copyFileSync(srcPath, destPath);
console.log('✅ _redirects file copied to dist folder');
