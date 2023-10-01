#!/bin/bash
dockerize -wait tcp://db:5433 -timeout 20s

echo "Start server"

# 1번만 작동시키자
# apk add tzdata
# cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime
# echo "Asia/Seoul" > /etc/timezone
# apk del tzdata

# npx sequelize-cli db:migrate



npm run dev