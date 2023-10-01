const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

// const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

/* Router */
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const payRoutes = require("./routes/payRoutes");
const orderRoutes = require("./routes/orderRoutes");
const trackerRoutes = require("./routes/trackerRoutes");
const addressRoute = require("./routes/addressRoute");
const adminRoutes = require("./routes/adminRoutes");
const mypageRoutes = require("./routes/mypageRoute");

// Database
const { sequelize } = require("../models");
const { admin } = require("./middlewares/authMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet.frameguard({ action: "deny" }));
app.use(
  // cors({})
  cors(
    {
      credentials: true,
      origin: "http://react-ui:3000",
      methods: ["GET", "PUT", "POST"],
      allowedHeaders: { "Content-Type": "application/json" },
    }

    // {
    //   origin: "https://kapi.kakao.com",
    //   methods: ["GET", "PUT", "POST"],
    // }
  )
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* 초기 라우터 */
// app.get("/", (req, res) => {
//   res.json("hi");
// });

// app.use(
//   cookieSession({
//     name: "SSaple",
//     keys: ["ssaple_project_21"],
//     maxAge: 24 * 60 * 60 * 1000, // miliseconds of a day
//   })
// );

app.use(
  cookieParser(
    cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true }) // samesite 에러 하기 위해 설정
  )
);

// cors
// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
/* Router */
app.get("/", (req, res) => {
  res.send("you are not login");
});
app.use("/api/users", userRoutes); // 이거는 안쓴다
app.use("/api/product/", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/address", addressRoute);
app.use("/api/admin", admin, adminRoutes);
app.use("/api/mypage", mypageRoutes);

// app.use("/api/logout", (req, res) => {
//   req.session = null;
//   req.logOut();
//   res.send(req.user);
// });

/* Error Handler */
app.use(notFound);
app.use(errorHandler);

/* Listen */
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log(`Server started on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

// let retries;

// while (retries >= 0) {
//   console.log(`Database Connected Tried: ${retries}`);
//   async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Database Connected".green);
//       app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`.blue);
//         // await sequelize.sync({ force: true });
//       });
//     } catch (err) {
//       console.log(err);
//       retries -= 1;
//       console.log(`retries left ${retries}`);
//     }
//   };
//   break;
// }
