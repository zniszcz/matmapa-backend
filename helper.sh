# source this file in your ~/.bashrc or ~/.bash_profile or ~/.zshrc

_matmapa-backend_usage()
{
cat << EOF
usage: matmapa-backend COMMAND PARAMS

Matmapa Backend Docker Compose helper

Available CONTAINERS:
- matmapa_node
- matmapa_db

COMMAND:
   help      Show this message
   setup     Runs project docker setup
   install   Install dependencies
   run       Runs project
   sync      Restart server
   node      Enter node command line

EOF
}

function matmapa-backend
{
    case "${1}" in
        'setup')
            printf %"s\n" "Running matmapa-backend setup"
            ./bin/SETUP_CONTAINERS.sh
            ;;

        'install')
            printf %"s\n" "Running matmapa-backend install"
            docker exec matmapa_node sh /matmapa/bin/INSTALL_DEPENDENCIES.sh
            ;;

        'run')
            printf %"s\n" "Running matmapa-backend run"
            cd .docker
            docker-compose up
            cd ..
            docker exec matmapa_node sh /matmapa/bin/RUN_PROJECT.sh
            ;;

        'sync')
            printf %"s\n" "Running matmapa-backend sync"
            docker exec matmapa_node sh /matmapa/bin/SYNC_PROJECT.sh
            ;;

        'node')
            printf %"s\n" "Running node command-line"
            docker exec -ti matmapa_node bash
            ;;

        *)
            _matmapa-backend_usage
            return 0
            ;;
    esac
}
