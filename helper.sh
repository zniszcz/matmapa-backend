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
   sync      Restart server

EOF
}

function in_array # ( needle, haystack )
{
  local value
  for value in "${@:2}"; do
    [[ "$value" == "$1" ]] && return 0;
  done
  return 1
}

function matmapa-backend # command from ${available_args} array, params
{
    declare -a available_args=('setup', 'use', 'install', 'run', 'sync');

    if ! in_array "$1" ${available_args[@]}; then
        _matmapa-backend_usage
        return 0
    fi

    # cd to dir containing .env file
    local CURRENT_DIR="$( pwd )"

    case "${1}" in
        'setup')
            printf %"s\n" "Running matmapa-backend setup"
            ;;

        'use')
            printf %"s\n" "Running matmapa-backend use"
            ;;

        'install')
            printf %"s\n" "Running matmapa-backend install"
            ;;

        'run')
            printf %"s\n" "Running matmapa-backend run"
            ;;

        'sync')
            printf %"s\n" "Running matmapa-backend sync"
            ;;

        *)
            _matmapa-backend_usage
            return 0
            ;;
    esac

    # go back go to previous dir
    cd ${CURRENT_DIR}
}
