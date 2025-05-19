#!/bin/bash

nginx -c $(pwd)/nginx.conf &

PORT=3001 node catalog-server/server.js &
PORT=3002 node catalog-server/server.js &
PORT=3003 node catalog-server/server.js &

node admin-server/server.js &

node chat-server/server.js &

wait