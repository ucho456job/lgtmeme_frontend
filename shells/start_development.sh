#!/bin/bash

function wait_for_postgresql() {
    until docker exec supabase-db psql -h localhost -U postgres -c '\q' &>/dev/null; do
        echo -ne "Waiting for PostgreSQL... \033[0K\r"
        sleep 1
    done
    echo "Waiting for PostgreSQL... Done        "
}

npm install

npm run docker:start

wait_for_postgresql

npm run prisma:migrate:dev

npm run db:clear

npm run db:seed

npm run dev
