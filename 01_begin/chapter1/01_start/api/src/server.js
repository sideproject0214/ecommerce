const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("you are not login!!!");
});

app.listen(port, () => {
  console.log(`🚀 Express server is running at http://localhost:${port}`);
});
