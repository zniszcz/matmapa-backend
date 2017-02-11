echo "Initialising matmapa setup file"
cd /matmapa
nvm install
npm install
npm install -g pm2
pm2 start src/app.js
