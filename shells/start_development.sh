#!/bin/bash

npm install

npm run docker:start

npm run db:clear

npm run db:seed

npm run dev
