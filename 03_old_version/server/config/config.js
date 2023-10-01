const dotenv = require("dotenv");

dotenv.config();

// module.exports = {
//   [process.env.NODE_ENV]: {
//     username: "postgres",
//     password: "postgres",
//     database: "ecommerce",
//     host: "db",
//     dialect: "postgres",
//   },
// };
module.exports = {
  [process.env.NODE_ENV]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
// module.exports = {
//   [process.env.development]: {
//     username: process.env.DEVELOPMENT_DB_USERNAME,
//     password: process.env.DEVELOPMENT_DB_PASSWORD,
//     database: process.env.DEVELOPMENT_DB_DATABASE,
//     host: process.env.DEVELOPMENT_DB_HOST,
//     dialect: process.env.DEVELOPMENT_DB_DIALECT,
//   },
//   [process.env.production]: {
//     username: process.env.PRODUCTION_DB_USERNAME,
//     password: process.env.PRODUCTION_DB_PASSWORD,
//     database: process.env.PRODUCTION_DB_DATABASE,
//     host: process.env.PRODUCTION_DB_HOST,
//     dialect: process.env.PRODUCTION_DB_DIALECT,
//   },
// };
