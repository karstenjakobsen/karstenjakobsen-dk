#!/bin/bash

docker stop grav
docker rm grav

docker run \
  --hostname=niels01-4GB-fra1-01 \
  --name=grav \
  -p 3000:80 \
  -p 3001:443 \
  -v /Users/kj/Projects/docker/karstenjakobsen.dk/packages/html:/var/www/html_grav \
  -e WEBROOT=/var/www/html_grav \
  -d \
  richarvey/nginx-php-fpm