# source this file in your ~/.bashrc or ~/.bash_profile or ~/.zshrc

_matmapa-backend_usage()
{
cat << EOF
usage: matmapa-backend COMMAND PARAMS

Matmapa Backend Docker Compose helper

Available CONTAINERS:
- matmapa_nvm
- matmapa_db

COMMAND:
   help      Show this message
   setup     Runs project docker setup
   use       Set enviroment
   install   Install dependencies
   run       Runs project
   sync      Restart server

EOF
}

function matmapa-backend
{
    case "${1}" in
        'setup')
            printf %"s\n" "Running matmapa-backend setup"
            ./bin/SETUP_CONTAINERS.sh
            ;;

        'use')
            printf %"s\n" "Running matmapa-backend use"
            ./bin/SETUP_ENVIROMENT.sh
            ;;

        'install')
            printf %"s\n" "Running matmapa-backend install"
            ./bin/INSTALL_DEPENDENCIES.sh
            ;;

        'run')
            printf %"s\n" "Running matmapa-backend run"
            ./bin/RUN_PROJECT.sh
            ;;

        'sync')
            printf %"s\n" "Running matmapa-backend sync"
            ;;

        *)
            _matmapa-backend_usage
            return 0
            ;;
    esac
}
