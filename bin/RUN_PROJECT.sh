case "${1}" in
    '--env')
        case ${2} in
            'production')
                echo "Run in production mode"
                export NODE_ENV=production
            ;;

            *)
                echo "Run in developer mode"
            ;;
        esac
    ;;

    *)
        echo "Run in developer mode"
    ;;

esac

pm2 start /matmapa/server.js --name="matmapa-backend"
