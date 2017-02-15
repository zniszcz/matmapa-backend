SAMPLE="docker-compose.sample.yml"
COMPOSE="docker-compose.yml"
PROJECT_DIR=`pwd`

cd docker

cp $SAMPLE $COMPOSE

sed -i "s|<<<project_dir>>>|$PROJECT_DIR|g" "$COMPOSE"

docker-compose up

cd ..
