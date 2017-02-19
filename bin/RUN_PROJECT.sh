if [ $1 = "--env=production" ]
  then
    echo "Run in prodction mode"
    export NODE_ENV=production
fi

pm2 start /matmapa/src/app.js --name="matmapa-backend"
