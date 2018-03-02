#!/bin/bash

docker stop karstenjakobsen-dk
docker rm karstenjakobsen-dk

docker run --hostname=niels01-4GB-fra1-01 --name=karstenjakobsen-dk --net=host --restart=always -v /root/projects/karstenjakobsen-dk/packages/html:/var/www/html -e WEBROOT=/var/www/html -e DOMAIN=www.karstenjakobsen.dk -e GIT_EMAIL=karsten@karstenjakobsen.dk -d richarvey/nginx-php-fpm
