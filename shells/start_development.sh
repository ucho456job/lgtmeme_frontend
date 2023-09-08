#!/bin/bash

function countdown() {
    secs=$1
    while [ $secs -gt 0 ]; do
        echo -ne "Waiting for PostgreSQL... $secs\033[0K\r"
        sleep 1
        : $((secs--))
    done
    echo "Waiting for PostgreSQL... Done        "
}

npm install

docker compose up -d

countdown 3

npm run prisma:generate

npm run prisma:migrate:dev

npm run db:clear

npm run db:seed

npm run dev
