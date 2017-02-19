if [ ! -z "$1" ]
    then
        if [ $1 = "--env=production" ]
          then
            echo "Run in prodction mode"
            export NODE_ENV=production
    fi
fi

pm2 start /matmapa/server.js --name="matmapa-backend"
