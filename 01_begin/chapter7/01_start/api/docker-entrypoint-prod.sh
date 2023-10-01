npx wait-port db:5432 
npm run build 
npx sequelize db:migrate 
npx sequelize db:seed:all 
npm run start:prod 
echo "API Server Migrate Complete! Start server"
