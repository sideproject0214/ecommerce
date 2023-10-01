const dotenv = require("dotenv");
const path = require("path");
switch (process.env.NODE_ENV) {
  case "production":
    envPath = path.join(__dirname, "../../src/config/.env.prod");
    break;
  default:
    envPath = path.join(__dirname, "../../src/config/.env.dev");
    break;
}

console.log(envPath, "envPath");
dotenv.config({ path: envPath });
// express는 거의 맨먼저 model의 index 부터 읽는다. 그래서 여기에서 먼저 환경설정을 해주면 서버쪽도 모두 적용된다.

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};
