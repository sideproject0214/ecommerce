const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend2:5000",

      changeOrigin: true,
    })
  );
  // app.use(
  //   "https://mockup-pg-web.kakao.com",
  //   createProxyMiddleware({
  //     target: "https://mockup-pg-web.kakao.com",
  //     changeOrigin: true,
  //     secure: false,
  //   })
  // );
};
