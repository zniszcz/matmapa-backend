#!/bin/bash

TMP_COMPOSE=".docker/tmp-docker-compose.yml"
COMPOSE=".docker/docker-compose.yml"
PROJECT_DIR=`pwd`

cp $TMP_COMPOSE $COMPOSE
sed -i "s|<<<project_dir>>>|$PROJECT_DIR|g" "$COMPOSE"
docker build -t matmapa-nvm . # ".docker/docker_node_app"
