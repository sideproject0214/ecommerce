const express = require("express");

const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes"); //ch3;
const addressRoutes = require("./routes/addressRoutes"); // ch6
const payRoutes = require("./routes/payRoutes"); // ch6
const orderRoutes = require("./routes/orderRoutes"); // ch6

const { logger } = require("./middleware/logMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const path = require("path");

const app = express();

switch (process.env.NODE_ENV) {
  case "production":
    envPath = path.join(__dirname, "../../src/config/.env.prod");
    break;
  default:
    envPath = path.join(__dirname, "../../src/config/.env.dev");
    break;
}

dotenv.config({ path: envPath });

app.use(helmet.frameguard({ action: "sameorigin" }));

const port = process.env.PORT || 8080;

// custom middleware logger
app.use(logger);

/* DB */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors 설정을 통해 특정도메인만 내 api에 접속하도록 한다.
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_ADDRESS,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: { "Content-Type": "application/json" },
  })
);

morgan((process.env.NODE_ENV = "production" ? "combined" : "dev"), {
  skip: function (req, res) {
    return res.statusCode < 400; // 에러시에만 morgan 통해 출력됨
  },
});

app.use(
  cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true }) // samesite 에러 하기 위해 설정
);

/* Router */
/* 라우터는 언제나 app.use(express.json()) app.use(express.urlencoded({ extended: true })) 다음에 써줘야 한다. 
   즉, 언제나 맨 마지막에 써줘야 함을 기억하자. 만약 순서가 뒤바뀌면 json 파일로 넘어오는 것을 해석하지 못한다. 언제나 undefined라고 나온다 */

app.get("/api", (req, res) => {
  res.send("you are not login!!!");
});
app.use("/api/post/", postRoutes);
app.use("/api/auth/", authRoutes); //ch3
app.use("/api/address/", addressRoutes); // ch6
app.use("/api/pay", payRoutes); // ch6
app.use("/api/order", orderRoutes); //ch6

/* Error Handler */
app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`🚀 Express server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});
