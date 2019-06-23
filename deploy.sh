#!/bin/bash
npm run build
scp -r ./dist/* root@120.78.177.9:/usr/local/nginx/clipboard-front
