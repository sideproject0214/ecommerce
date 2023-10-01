npx wait-port db:5432 
npx sequelize db:migrate 
npx sequelize db:seed:all 
npm run start:dev
echo "API Server Migrate Complete! Start server"
