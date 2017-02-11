echo "Initialising matmapa setup file"
cd /matmapa
version=$(<.nvmrc)
/home/.nvm/nvm.sh install
"/home/.nvm/versions/node/v$version/bin/npm" install
"/home/.nvm/versions/node/v$version/bin/node" src/app.js
